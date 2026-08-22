import './styles.css'
import { BrainBackend } from './backends/brain.js'
import { SKILLS } from './brain/index.js'
import { detectDevice, installHelp } from './device.js'
import {
  BUILT_IN, MODELS, TIERS, deleteDownload, downloadSize, findModel, fitsDevice, fmtSize,
  listDownloaded, probeGPU, ramFor, suggestFor, visionModel,
} from './models.js'
import { MAX_IMAGES, prepareImage } from './images.js'
import {
  STRIKE_LIMIT, beginRisk, clearStrikes, deathKind, endRisk, isUnsafe, strikesFor,
  takeUncleanExit,
} from './survival.js'

import {
  DEFAULT_SETTINGS, clearFacts, createChat, deleteChat, deleteFact, deriveTitle, exportAll,
  getChat, getSettings, importAll, latestChat, listChats, listFacts, saveChat, saveFact,
  setSetting,
} from './db.js'
import {
  addAction, confirmSheet, createBubble, decorateCodeBlocks, fmtBytes, groupChats,
  renderAttachedImages, renderMarkdown, splitThinking, toast,
} from './ui.js'

const $ = (sel) => document.querySelector(sel)

/**
 * Opening examples. 360 Brain answers a narrow, exact set of things, so its
 * examples are the map of what it knows; a downloaded model is open-ended, so
 * its examples are prompts rather than a menu.
 */
const BRAIN_SUGGESTIONS = [
  ['Work it out', ['17% of 4,850', '5 km to miles', 'How many days until Christmas?']],
  ['Look it up', ['What is the capital of Japan?', 'Major subjects in BSIT', 'What is RA 9262?']],
  ['Write code', ['python for loop', 'Show me C++ basics']],
  ['Teach it', ['remember: my wifi password = ...', 'What do you know?']],
]

const MODEL_SUGGESTIONS = [
  ['Write', ['Write a short thank-you letter to my teacher', 'Rewrite this to sound friendlier']],
  ['Explain', ['Explain photosynthesis to a 10-year-old', 'Why is the sky blue?']],
  ['Code', ['Write a Python script that renames files', 'What does this error mean?']],
  ['Think', ['Help me plan a 3-day trip on a small budget', 'Give me 5 ideas for a science project']],
]

/**
 * Only shown for a model that can see. The examples are prompts to send *with*
 * a picture, so they lead the user to the 🖼 button rather than leaving the one
 * feature they downloaded gigabytes for undiscovered.
 */
const VISION_SUGGESTIONS = [
  ['With a picture', ['What is in this picture?', 'Read the text in this photo']],
]

const state = {
  settings: null,
  chat: null,
  busy: false,
  device: detectDevice(),
  // What the user has taught the brain. Kept in memory so a question costs no
  // database round-trip, and rewritten whenever it changes.
  facts: [],
  chats: [],
  filter: '',
  autoScroll: true,
  /** Pictures picked but not yet sent. See images.js for the shape. */
  attachments: [],

  /* --- engines --- */
  brain: null,
  llm: null,
  /** 'brain', or the catalogue id of a downloaded model. */
  engineId: 'brain',
  /** Catalogue id currently downloading/loading, or null. */
  loadingId: null,
  /** `{ id, message }` for the last failed load, shown on that model's card. */
  loadError: null,
  /** `{ kind, model, strikes }` when the previous session was killed, else null. */
  died: null,
  gpu: null,
  downloaded: new Set(),
  storageBlocked: false,
}

/**
 * The brain's view of what it has been taught. `remember` and `forget` write
 * through to IndexedDB and refresh the in-memory copy, so the next question
 * already sees the change.
 */
function createMemory() {
  return {
    get taught() {
      return state.facts
    },
    remember: async (q, a) => {
      await saveFact(q, a)
      state.facts = await listFacts()
      renderFactList()
    },
    forget: async (id) => {
      await deleteFact(id)
      state.facts = await listFacts()
      renderFactList()
    },
  }
}

/* ---------------------------------------------------------------- engines */

/**
 * The WebLLM backend lives behind a dynamic import for the same reason the
 * runtime does: a 360 Brain user must never download a megabyte they will not
 * use. This resolves the first time a model is chosen and is cached after.
 */
let llmModulePromise = null
function loadLLMModule() {
  llmModulePromise ??= import('./backends/webllm.js').catch((err) => {
    // Forget the failure rather than caching it. The usual cause is being
    // offline while this chunk is not in the runtime cache yet, and then
    // reconnecting has to be enough — a memoized rejection would keep failing
    // for the rest of the session no matter what the network did.
    llmModulePromise = null
    throw err
  })
  return llmModulePromise
}

/** The engine that will answer the next question. */
function backend() {
  return state.engineId === 'brain' ? state.brain : state.llm
}

/** The catalogue entry behind the current engine — `BUILT_IN` or a model. */
function activeEntry() {
  return state.engineId === 'brain' ? BUILT_IN : (findModel(state.engineId) ?? BUILT_IN)
}

/**
 * A readable message out of whatever was thrown.
 *
 * Errors that cross a worker boundary arrive structured-cloned, and WebLLM
 * sometimes rejects with a plain object or a bare string, so reading
 * `err.message` alone put the word "undefined" in front of the user exactly
 * where the reason should have been.
 */
function reason(err) {
  if (!err) return 'Unknown error.'
  if (typeof err === 'string') return err
  const text = err.message || err.msg || err.name || err.detail
  if (text) return String(text)
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

/** Refuses a turn while a model is still coming down the wire. */
function requireBackend() {
  if (state.busy) return false
  const engine = backend()
  if (!engine?.ready) {
    toast('That model is still loading. 360 Brain can answer in the meantime.', 'warn')
    return false
  }
  return true
}

/* ------------------------------------------------------------------ boot */

/**
 * An IndexedDB open request that another tab is blocking never settles and
 * never rejects, so an unguarded `await` here leaves a permanently blank page
 * with nothing on screen to explain it.
 */
function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ])
}

/**
 * Boot in two beats.
 *
 * 360 Brain needs no storage and no download to answer, so the interface is
 * painted and usable immediately, and the saved chats, settings, taught facts
 * and any downloaded model are loaded after. Waiting on IndexedDB first meant
 * a blank screen wherever it is slow or unavailable — private windows,
 * locked-down browsers, a database another tab is blocking — which is the
 * wrong failure for an app whose whole promise is that it works everywhere.
 */
async function boot() {
  // First thing, before anything can start a risky span of its own: did the
  // last session die mid-load or mid-answer? On iOS that is how a model too
  // big for the device ends — the process is killed outright — and restoring
  // that model now would just do it again.
  state.died = takeUncleanExit()

  state.settings = { ...DEFAULT_SETTINGS }
  state.brain = new BrainBackend(createMemory())
  state.chat = createChat()

  applyTheme(state.settings.theme)
  applySettingsToForm()
  wireEvents()
  renderMessages()
  renderSkillList()
  updateNetStatus()
  renderEngineLabels()

  try {
    state.settings = await withTimeout(
      getSettings(),
      8000,
      'The local database did not open, so this session will not be saved. ' +
        'If 360AI is open in another tab, close it and reload.',
    )
    applyTheme(state.settings.theme)
    applySettingsToForm()

    state.facts = await listFacts()
    // Resume where the user left off rather than dropping them into a blank chat.
    const resume = await latestChat()
    if (resume) await openChat(resume.id)
    else await refreshChatList()
  } catch (err) {
    // Answering still works; only the history does not.
    state.storageBlocked = true
    showSystemNote(`⚠️ ${err.message}`)
  }

  renderFactList()
  refreshStorageInfo()

  // What we believe is downloaded, from our own record. Checking the real
  // cache would mean pulling the WebLLM runtime on every visit, including for
  // the many people who will only ever use 360 Brain.
  state.downloaded = new Set(state.settings.downloaded ?? [])
  renderEngineLabels()

  // Cheap - it touches navigator.gpu and nothing else - but it decides which
  // build of every model gets quoted, so nothing on screen is right until it
  // has run.
  state.gpu = await probeGPU()
  renderEngineLabels()
  if (!state.chat.messages.length) renderMessages()

  await restoreChosenModel()
}

/**
 * Puts the user back on the model they chose last time — but only if it is
 * genuinely on the device. Re-downloading gigabytes because someone opened the
 * app on mobile data would be an unforgivable surprise.
 */
async function restoreChosenModel() {
  const wanted = state.settings.engine
  if (!wanted || wanted === 'brain') return

  const entry = findModel(wanted)
  if (!entry) {
    await setSetting('engine', 'brain')
    return
  }
  if (!state.downloaded.has(entry.id)) {
    showSystemNote(
      `**${entry.name}** is no longer on this device, so 360 Brain is answering. ` +
        'Open **Choose your AI** to download it again.',
    )
    state.settings.engine = 'brain'
    await setSetting('engine', 'brain')
    renderEngineLabels()
    return
  }

  // The whole point of the survival record: a model that has taken this tab
  // down twice is not loaded again on its own. Restoring it here is what turned
  // one crash into a page that could never be opened at all.
  if (isUnsafe(entry.id)) {
    showSystemNote(unsafeNote(entry))
    state.settings.engine = 'brain'
    await setSetting('engine', 'brain')
    renderEngineLabels()
    return
  }

  await useModel(entry, { silent: true })
}

/**
 * The explanation for a model this device cannot actually run.
 *
 * It has to say what happened, because from the outside a killed tab looks
 * like the app breaking rather than the model being too big — and it has to
 * name the way out, because the model is still sitting there taking up space
 * and will be picked again otherwise.
 */
function unsafeNote(entry) {
  const smaller = smallerThan(entry)
  return (
    `⚠️ **${entry.name} is too big for this device.** Loading it ran the browser ` +
    'out of memory and closed the page — twice — so 360 Brain is answering instead ' +
    'and that model will not be loaded again on its own.\n\n' +
    'This is a limit of the browser, not a fault you can clear: it hands one page ' +
    'a fixed amount of memory and stops the page dead when it is passed. ' +
    (smaller
      ? `Open **Choose your AI**, remove it to free the space, and try **${smaller.name}** ` +
        `(${downloadSize(smaller)}) instead — it needs about ` +
        `${fmtSize(ramFor(smaller, state.gpu))} to run.`
      : 'Open **Choose your AI** and remove it to free the space. 360 Brain needs no ' +
        'memory at all and answers everything it knows instantly.')
  )
}

/** The largest model that is meaningfully lighter than `entry`, if any. */
function smallerThan(entry) {
  const ceiling = ramFor(entry, state.gpu)
  return (
    [...MODELS]
      .filter((m) => m.id !== entry.id && ramFor(m, state.gpu) < ceiling * 0.6)
      .sort((a, b) => ramFor(b, state.gpu) - ramFor(a, state.gpu))[0] ?? null
  )
}

/* --------------------------------------------------------------- chat io */

async function refreshChatList() {
  state.chats = await listChats()
  renderChatList()
}

function matchesFilter(chat, needle) {
  if (!needle) return true
  if (chat.title.toLowerCase().includes(needle)) return true
  return chat.messages.some((m) => m.content.toLowerCase().includes(needle))
}

/** The sidebar, bucketed by day so a long history stays readable. */
function renderChatList() {
  const list = $('#chat-list')
  const needle = state.filter.trim().toLowerCase()
  const shown = state.chats.filter((c) => matchesFilter(c, needle))
  list.innerHTML = ''

  if (!shown.length) {
    const empty = document.createElement('p')
    empty.className = 'muted list-empty'
    empty.textContent = needle ? 'No chats match that search.' : 'No saved chats yet.'
    list.appendChild(empty)
    return
  }

  for (const [heading, rows] of groupChats(shown)) {
    const label = document.createElement('h3')
    label.className = 'chat-group'
    label.textContent = heading
    list.appendChild(label)
    for (const chat of rows) list.appendChild(buildChatRow(chat))
  }
}

function buildChatRow(c) {
  const row = document.createElement('div')
  row.className = `chat-row${c.id === state.chat?.id ? ' active' : ''}`

  const open = document.createElement('button')
  open.type = 'button'
  open.className = 'chat-open'
  open.textContent = c.title
  open.title = c.title
  open.addEventListener('click', () => {
    openChat(c.id)
    setSidebar(false)
  })

  const del = document.createElement('button')
  del.type = 'button'
  del.className = 'chat-del'
  del.title = 'Delete'
  del.textContent = '×'
  del.addEventListener('click', async (e) => {
    e.stopPropagation()
    const ok = await confirmSheet({
      title: 'Delete this chat?',
      body: c.title,
      confirmLabel: 'Delete',
      danger: true,
    })
    if (!ok) return
    await deleteChat(c.id)
    const wasOpen = state.chat?.id === c.id
    if (wasOpen) state.chat = null
    await refreshChatList()
    if (wasOpen) await openChat(null)
  })

  row.append(open, del)
  return row
}

async function openChat(id) {
  state.chat = (id ? await getChat(id) : null) ?? createChat()
  cancelRename()
  $('#chat-title').textContent = state.chat.title
  renderMessages()
  await refreshChatList()
}

/** Rebuilds every bubble in the open chat from scratch. */
function renderMessages() {
  const box = $('#messages')
  box.innerHTML = ''
  if (!state.chat.messages.length) {
    box.appendChild(buildEmptyState())
  } else {
    state.chat.messages.forEach((m, i) => appendMessage(m.role, m.content, m.stats, i, m.images))
  }
  state.autoScroll = true
  scrollToBottom(true)
}

/**
 * The opening screen: the mark, one line on what is answering, and examples
 * grouped by the kind of question they are. The grouping is the point — it
 * tells you what this engine can actually do before you spend a question
 * finding out, and the two engines can do very different things.
 */
function buildEmptyState() {
  const entry = activeEntry()
  const isBrain = state.engineId === 'brain'

  const wrap = document.createElement('div')
  wrap.className = 'empty-state'

  const mark = document.createElement('div')
  mark.className = 'orbit orbit-lg'
  mark.setAttribute('aria-hidden', 'true')

  const h = document.createElement('h1')
  h.textContent = '360AI'

  const p = document.createElement('p')
  p.textContent = isBrain
    ? 'Your own AI, running on this device. Nothing to download, no account, no internet — ' +
      'and it says so plainly when it does not know.'
    : `${entry.name} is running on this device. It was downloaded once and now answers ` +
      'with no internet, no account and nothing leaving your phone.'

  wrap.append(mark, h, p)

  const groups = document.createElement('div')
  groups.className = 'suggestion-groups'

  const suggestions = isBrain
    ? BRAIN_SUGGESTIONS
    : [...(entry.vision ? VISION_SUGGESTIONS : []), ...MODEL_SUGGESTIONS]

  for (const [heading, examples] of suggestions) {
    const group = document.createElement('section')
    group.className = 'suggestion-group'

    const title = document.createElement('h2')
    title.textContent = heading
    group.appendChild(title)

    for (const example of examples) {
      const chip = document.createElement('button')
      chip.type = 'button'
      chip.className = 'suggestion'
      chip.textContent = example
      chip.addEventListener('click', () => {
        const input = $('#input')
        input.value = example
        autosize(input)
        input.focus()
      })
      group.appendChild(chip)
    }
    groups.appendChild(group)
  }

  wrap.appendChild(groups)

  // On 360 Brain there is a whole other tier of ability one tap away, and no
  // way to discover it from the chat itself.
  if (isBrain) {
    const upsell = document.createElement('button')
    upsell.type = 'button'
    upsell.className = 'empty-upsell'
    const pick = suggestFor(state.device)
    upsell.innerHTML =
      `<strong>Want a real language model?</strong> ` +
      `<span>Download a free one — ${pick.name} is a ` +
      `${fmtSize(pick.downloadMB)} download — and it works offline too.</span>`
    upsell.addEventListener('click', openModels)
    wrap.appendChild(upsell)
  }

  return wrap
}

function clearEmptyState() {
  $('#messages').querySelector('.empty-state')?.remove()
}

function appendMessage(role, content, stats, index, images) {
  const handles = createBubble(role)
  const { el, body, think, thinkBody, media, meta } = handles
  const { thinking, answer } = splitThinking(content)

  renderAttachedImages(media, images)

  if (thinking.trim()) {
    think.hidden = false
    thinkBody.innerHTML = renderMarkdown(thinking)
  }
  body.innerHTML = renderMarkdown(answer)
  decorateCodeBlocks(body)

  if (stats?.note) {
    meta.hidden = false
    meta.textContent = stats.note
  }

  if (index !== null && index !== undefined) wireActions(handles, role, index)

  $('#messages').appendChild(el)
  return handles
}

/** Copy / regenerate / edit, depending on who sent the message. */
function wireActions(handles, role, index) {
  handles.actions.innerHTML = ''

  addAction(handles.actions, 'Copy', 'Copy this message', async () => {
    const raw = state.chat.messages[index]?.content ?? ''
    const text = role === 'assistant' ? splitThinking(raw).answer : raw
    await navigator.clipboard.writeText(text)
    return 'Copied!'
  })

  if (role === 'assistant') {
    addAction(handles.actions, 'Regenerate', 'Answer this again', () => {
      regenerateFrom(index)
      return null
    })
  } else {
    addAction(handles.actions, 'Edit', 'Edit and send again', () => {
      if (state.busy) return null
      editFrom(index)
      return null
    })
  }
}

/**
 * Writes the open chat back, or drops it entirely when truncation has left it
 * empty — an empty row with a stale title is just clutter in the sidebar.
 */
async function persistChat() {
  if (state.chat.messages.length) {
    await saveChat(state.chat)
  } else {
    await deleteChat(state.chat.id)
    if (!state.chat.renamed) {
      state.chat.title = 'New chat'
      $('#chat-title').textContent = state.chat.title
    }
  }
  await refreshChatList()
}

/** Drops the assistant reply at `index` (and everything after) and re-answers. */
async function regenerateFrom(index) {
  if (!requireBackend()) return
  state.chat.messages.length = index
  await persistChat()
  renderMessages()
  await runCompletion()
}

/** Pulls the user message at `index` back into the composer for another try. */
async function editFrom(index) {
  const text = state.chat.messages[index]?.content ?? ''
  state.chat.messages.length = index
  await persistChat()
  renderMessages()
  const input = $('#input')
  input.value = text
  autosize(input)
  input.focus()
  input.setSelectionRange(text.length, text.length)
}

function showSystemNote(md) {
  const el = document.createElement('div')
  el.className = 'system-note'
  el.innerHTML = renderMarkdown(md)
  $('#messages').appendChild(el)
  scrollToBottom(true)
}

/* ------------------------------------------------------------- scrolling */

function nearBottom() {
  const box = $('#messages')
  return box.scrollHeight - box.scrollTop - box.clientHeight < 120
}

/**
 * Follows the stream only while the user is already at the bottom — yanking
 * the viewport back down while they are reading earlier output is maddening.
 */
function scrollToBottom(force = false) {
  const box = $('#messages')
  if (!force && !state.autoScroll) return
  box.scrollTop = box.scrollHeight
  state.autoScroll = true
  $('#scroll-bottom').hidden = true
}

/* ------------------------------------------------------------ generation */

function setBusy(busy) {
  state.busy = busy
  $('#send').hidden = busy
  $('#stop').hidden = !busy
  $('#input').disabled = busy
  $('#attach').disabled = busy
}

async function send(text) {
  const trimmed = text.trim()
  const images = state.attachments
  if (state.busy || (!trimmed && !images.length)) return
  if (!backend()?.ready) {
    toast('That model is still loading — give it a moment.', 'warn')
    return
  }

  clearEmptyState()
  const message = { role: 'user', content: trimmed }
  if (images.length) message.images = images
  state.chat.messages.push(message)
  appendMessage('user', trimmed, null, state.chat.messages.length - 1, images)

  // The composer is emptied only once the message is safely in the thread, so
  // a refusal above never loses the picture the user just picked.
  state.attachments = []
  renderAttachments()

  if (state.chat.messages.length === 1 && !state.chat.renamed) {
    state.chat.title = deriveTitle(trimmed || (images.length ? 'A picture' : ''))
    $('#chat-title').textContent = state.chat.title
  }
  await saveChat(state.chat)
  await refreshChatList()
  scrollToBottom(true)

  await runCompletion()
}

/** Streams one assistant turn for the current message history. */
async function runCompletion() {
  setBusy(true)
  clearEmptyState()

  const handles = appendMessage('assistant', '')
  handles.el.classList.add('streaming')
  scrollToBottom(true)

  // 360 Brain answers the latest question and ignores the rest; a downloaded
  // model reads the whole thread. Both get the same payload.
  const payload = state.chat.messages.map(({ role, content, images }) =>
    images?.length ? { role, content, images } : { role, content },
  )

  let raw = ''
  let stats = null
  let pending = false

  const paint = () => {
    pending = false
    const { thinking, answer } = splitThinking(raw)
    if (thinking.trim()) {
      handles.think.hidden = false
      handles.thinkBody.textContent = thinking
    }
    handles.body.innerHTML = renderMarkdown(answer)
    scrollToBottom()
  }

  // Generating is the other span that can take the process down: the weights
  // are already resident and the KV cache grows on top of them, so a model that
  // loaded comfortably can still die on the first long answer.
  const risky = state.engineId !== 'brain'
  if (risky) beginRisk('answer', state.engineId)

  try {
    const stream = backend().stream(payload, { verbosity: state.settings.replyLength })
    for await (const chunk of stream) {
      if (chunk.text) {
        raw += chunk.text
        // Coalesce paints to one per frame; repainting on every token turns
        // markdown re-parsing into the bottleneck instead of the GPU.
        if (!pending) {
          pending = true
          requestAnimationFrame(paint)
        }
      }
      if (chunk.done) stats = chunk.stats
    }
  } catch (err) {
    raw += `\n\n**⚠️ Error:** ${reason(err)}`
  } finally {
    if (risky) {
      endRisk()
      // An answer that arrived in full is proof this model runs here, so any
      // earlier suspicion — a backgrounded tab counted as a crash — is dropped.
      clearStrikes(state.engineId)
    }
  }

  paint()
  decorateCodeBlocks(handles.body)
  handles.el.classList.remove('streaming')

  if (stats?.note) {
    handles.meta.hidden = false
    handles.meta.textContent = stats.note
  }

  // Saying "shorter" or "elaborate" mid-chat is a real preference, so it moves
  // the Settings control rather than silently disagreeing with it.
  if (stats?.verbosity && stats.verbosity !== state.settings.replyLength) {
    state.settings.replyLength = stats.verbosity
    applySettingsToForm()
    setSetting('replyLength', stats.verbosity).catch(() => {})
  }

  state.chat.messages.push({ role: 'assistant', content: raw, stats })
  await saveChat(state.chat)
  wireActions(handles, 'assistant', state.chat.messages.length - 1)

  setBusy(false)
  if (!state.device.mobile) $('#input').focus()
}

/* ------------------------------------------------------------ attachments */

/** True when whatever is answering right now can actually read a picture. */
function engineCanSee() {
  return activeEntry().vision === true
}

/**
 * The strip of pictures waiting to be sent, plus the one line that stops a
 * picture being sent into a void.
 *
 * Only one model in the catalogue has eyes, so most of the time the honest
 * answer is "this engine cannot see it" — and it is far better to say that
 * before the message is sent than to let the user watch an answer arrive that
 * has nothing to do with their photo.
 */
function renderAttachments() {
  const host = $('#attachments')
  host.innerHTML = ''
  host.hidden = !state.attachments.length
  $('#attach').classList.toggle('on', state.attachments.length > 0)
  if (!state.attachments.length) return

  for (const [i, img] of state.attachments.entries()) {
    const chip = document.createElement('div')
    chip.className = 'attachment'

    const thumb = document.createElement('img')
    thumb.src = img.url
    thumb.alt = img.name
    chip.appendChild(thumb)

    const name = document.createElement('span')
    name.className = 'attachment-name'
    name.textContent = `${img.name} · ${img.w} × ${img.h}`
    chip.appendChild(name)

    const drop = document.createElement('button')
    drop.type = 'button'
    drop.className = 'attachment-del'
    drop.textContent = '×'
    drop.title = 'Remove this picture'
    drop.setAttribute('aria-label', `Remove ${img.name}`)
    drop.addEventListener('click', () => {
      state.attachments.splice(i, 1)
      renderAttachments()
    })
    chip.appendChild(drop)
    host.appendChild(chip)
  }

  if (!engineCanSee()) {
    const note = document.createElement('p')
    note.className = 'attachment-note'
    const have = visionModel(state.downloaded)
    note.innerHTML = renderMarkdown(
      have
        ? `**${activeEntry().name} cannot see pictures.** Switch to **${have.name}**, ` +
            'which is already on this device, to have it read.'
        : `**${activeEntry().name} cannot see pictures.** It will say what it can work ` +
            'out about the file, and read any QR code in it. To have the picture ' +
            'itself read, download **Phi-3.5 Vision**.',
    )
    const change = document.createElement('button')
    change.type = 'button'
    change.className = 'btn btn-ghost btn-compact'
    change.textContent = have ? `Use ${have.name}` : 'Choose your AI'
    change.addEventListener('click', () => (have ? useModel(have) : openModels()))
    note.appendChild(change)
    host.appendChild(note)
  }
}

/** Runs picked files through the scaler and into the composer. */
async function attachFiles(files) {
  const room = MAX_IMAGES - state.attachments.length
  if (room <= 0) {
    toast(
      MAX_IMAGES === 1
        ? 'One picture per message — remove that one to send a different picture.'
        : `Up to ${MAX_IMAGES} pictures per message.`,
      'warn',
    )
    return
  }

  for (const file of [...files].slice(0, room)) {
    try {
      state.attachments.push(await prepareImage(file))
    } catch (err) {
      toast(reason(err), 'error', 6000)
    }
  }
  renderAttachments()
  $('#input').focus()
}

/* ----------------------------------------------------- the model picker */

async function openModels() {
  setSidebar(false)
  $('#models-dialog').showModal()
  renderModels()
  state.gpu ??= await probeGPU()
  renderModels()
  await refreshDownloads()
  renderModels()
  refreshStorageInfo()
}

/**
 * Reconciles our record of what is downloaded against the actual cache.
 *
 * Only when we believe something is there: with nothing recorded there is
 * nothing to disagree about, and the check would cost a six-megabyte import
 * for no reason. A browser under storage pressure is free to evict a model, so
 * the record alone cannot be trusted forever.
 */
async function refreshDownloads() {
  state.gpu ??= await probeGPU()
  if (!state.downloaded.size) return
  try {
    state.downloaded = await listDownloaded()
    await rememberDownloads()
  } catch {
    // Leave the record as it stands; a failed check is not evidence of
    // anything, and wiping the list here would hide models that are present.
  }
}

/** Writes the downloaded-model record back, so the next boot starts from it. */
async function rememberDownloads() {
  const ids = [...state.downloaded]
  state.settings.downloaded = ids
  await setSetting('downloaded', ids).catch(() => {})
}

/** One line about this device, so the size figures below mean something. */
function renderDeviceNote() {
  const note = $('#device-note')
  const gpu = state.gpu

  // The probe is asynchronous and the dialog opens instantly. Saying nothing
  // yet beats asserting "full-precision builds" and correcting it a beat later.
  if (!gpu) {
    note.className = 'device-note'
    note.textContent = 'Checking what this device can run…'
    return
  }

  if (!gpu.ok) {
    note.className = 'device-note warn'
    note.innerHTML = renderMarkdown(
      `**Downloaded models cannot run here.** ${gpu.reason}`,
    )
    return
  }

  const bits = []
  if (gpu?.description || gpu?.vendor) bits.push(gpu.description || gpu.vendor)
  bits.push(gpu?.f16 ? 'half-precision supported' : 'full-precision builds')

  // The one platform where the memory limit has to be said before anything is
  // chosen, rather than warned about per card: on iOS the penalty for picking
  // wrong is the page closing, and someone scrolling a list of nine models
  // should know that before the first tap.
  const ios = state.device.ios
    ? ' **Safari hands one page a limited amount of memory and closes it when that ' +
      'is passed**, so only the smallest models here run on an iPhone or iPad — the ' +
      'rest are marked.'
    : ''

  note.className = state.device.ios ? 'device-note warn' : 'device-note'
  note.innerHTML = renderMarkdown(
    `Detected **${state.device.name}** — ${bits.join(' · ')}. ` +
      'The first download needs Wi-Fi; everything after that is offline.' +
      ios,
  )
}

function renderModels() {
  renderDeviceNote()
  const host = $('#model-groups')
  host.innerHTML = ''

  host.appendChild(buildBuiltInCard())

  const usable = state.gpu?.ok !== false
  for (const tier of TIERS) {
    const entries = MODELS.filter((m) => m.tier === tier.id)
    if (!entries.length) continue

    const section = document.createElement('section')
    section.className = 'model-group'

    const head = document.createElement('div')
    head.className = 'model-group-head'
    const h = document.createElement('h3')
    h.textContent = tier.label
    const hint = document.createElement('span')
    hint.className = 'muted'
    hint.textContent = tier.hint
    head.append(h, hint)
    section.appendChild(head)

    for (const entry of entries) section.appendChild(buildModelCard(entry, usable))
    host.appendChild(section)
  }
}

function buildBuiltInCard() {
  const card = document.createElement('article')
  const active = state.engineId === 'brain'
  card.className = `model-card builtin${active ? ' active' : ''}`

  card.innerHTML = `
    <div class="model-top">
      <span class="orbit" aria-hidden="true"></span>
      <div class="model-id">
        <h4>${BUILT_IN.name}</h4>
        <span class="model-family">Ships with the app</span>
      </div>
      <span class="pill pill-ok">0 MB</span>
    </div>
    <p class="model-blurb">${BUILT_IN.blurb}</p>
  `

  const actions = document.createElement('div')
  actions.className = 'model-actions'
  const use = document.createElement('button')
  use.type = 'button'
  use.className = active ? 'btn btn-active' : 'btn btn-primary'
  use.textContent = active ? '✓ Answering now' : 'Use 360 Brain'
  use.disabled = active
  use.addEventListener('click', () => useBrain())
  actions.appendChild(use)
  card.appendChild(actions)
  return card
}

function buildModelCard(entry, usable) {
  const active = state.engineId === entry.id
  const have = state.downloaded.has(entry.id)
  const loading = state.loadingId === entry.id
  const fits = fitsDevice(entry, state.gpu, state.device)
  const size = downloadSize(entry)

  const card = document.createElement('article')
  card.className = [
    'model-card',
    active ? 'active' : '',
    have ? 'have' : '',
    !fits || !usable ? 'tight' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const recommended =
    (entry.recommendedFor === 'mobile' && state.device.mobile) ||
    (entry.recommendedFor === 'desktop' && !state.device.mobile)

  const pills = [
    have
      ? `<span class="pill pill-ok">On this device · ${size}</span>`
      : `<span class="pill">${size} download</span>`,
    recommended ? '<span class="pill pill-star">Recommended</span>' : '',
    entry.vision ? '<span class="pill pill-star">Reads pictures</span>' : '',
    entry.reasoning ? '<span class="pill pill-soft">Shows its thinking</span>' : '',
  ]
    .filter(Boolean)
    .join('')

  card.innerHTML = `
    <div class="model-top">
      <div class="model-id">
        <h4>${entry.name}</h4>
        <span class="model-family">${entry.family} · ${entry.tag}</span>
      </div>
      <div class="model-pills">${pills}</div>
    </div>
    <p class="model-blurb">${entry.blurb}</p>
    <div class="model-strengths">${entry.strengths
      .map((s) => `<span class="tagline">${s}</span>`)
      .join('')}</div>
  `

  const strikes = strikesFor(entry.id)

  if (!usable) {
    const why = document.createElement('p')
    why.className = 'model-warn'
    why.textContent = 'Needs WebGPU, which this browser does not have.'
    card.appendChild(why)
  } else if (strikes >= STRIKE_LIMIT) {
    // Said in the past tense and without hedging, because this is not a
    // prediction from a specification — it is what already happened here.
    const why = document.createElement('p')
    why.className = 'model-error'
    why.innerHTML = renderMarkdown(
      `**This model closed the page on this device.** It ran the browser out of ` +
        `memory while ${deathKind(entry.id) === 'answer' ? 'answering' : 'loading'}, ` +
        `${strikes} times. Removing it frees ${size}; something smaller, or 360 Brain, ` +
        'will work where this cannot.',
    )
    card.appendChild(why)
  } else if (!fits) {
    const why = document.createElement('p')
    why.className = 'model-warn'
    const needs = fmtSize(ramFor(entry, state.gpu))
    // iOS gets its own sentence because its failure mode is different in kind:
    // the page is killed rather than told, so "you can still try it" would be
    // inviting someone to close their own app without saying so.
    why.textContent = state.device.ios
      ? `Needs about ${needs} of memory, more than Safari gives one page. It will very ` +
        'likely close 360AI while loading rather than refuse.'
      : state.device.mobile
        ? `Needs about ${needs} of memory, which is probably more than this phone has. You can still try it.`
        : `Needs about ${needs} of memory, which may be more than this GPU can hold. You can still try it.`
    card.appendChild(why)
  }

  // Why the last attempt failed, said where the user is looking. `showSystemNote`
  // writes into the chat behind this dialog, which nobody can read from here.
  if (state.loadError?.id === entry.id && !loading) {
    const failed = document.createElement('p')
    failed.className = 'model-error'
    failed.innerHTML = renderMarkdown(state.loadError.message)
    card.appendChild(failed)
  }

  // The progress bar above the composer is behind this dialog's backdrop, so a
  // download started from here used to show nothing at all but a greyed-out
  // button — for as long as it took several hundred megabytes to arrive. The
  // card carries its own copy.
  if (loading) card.appendChild(buildCardProgress())

  const actions = document.createElement('div')
  actions.className = 'model-actions'

  const use = document.createElement('button')
  use.type = 'button'
  if (active) {
    use.className = 'btn btn-active'
    use.textContent = '✓ Answering now'
    use.disabled = true
  } else if (loading) {
    use.className = 'btn'
    use.textContent = have ? 'Loading…' : 'Downloading…'
    use.disabled = true
  } else {
    use.className = have ? 'btn btn-primary' : 'btn'
    use.textContent = have
      ? 'Use this model'
      : `${state.loadError?.id === entry.id ? 'Try again' : 'Download'} · ${size}`
    use.disabled = !usable || state.loadingId !== null
    use.addEventListener('click', () => useModel(entry))
  }
  actions.appendChild(use)

  if (loading) {
    const cancel = document.createElement('button')
    cancel.type = 'button'
    cancel.className = 'btn btn-ghost model-del'
    cancel.textContent = 'Cancel'
    cancel.addEventListener('click', () => state.llm?.cancelLoad())
    actions.appendChild(cancel)
  } else if (have) {
    const del = document.createElement('button')
    del.type = 'button'
    del.className = 'btn btn-ghost model-del'
    del.textContent = 'Remove'
    del.title = `Free the ${size} this model takes`
    del.disabled = state.loadingId !== null
    del.addEventListener('click', () => removeModel(entry))
    actions.appendChild(del)
  }

  card.appendChild(actions)
  return card
}

function buildCardProgress() {
  const box = document.createElement('div')
  box.className = 'card-load'
  box.innerHTML = `
    <div class="card-load-head">
      <span id="card-load-text" class="load-text">Starting…</span>
      <span id="card-load-pct" class="load-pct">0%</span>
    </div>
    <div class="load-bar-fill"><i id="card-load-fill"></i></div>
  `
  return box
}

async function useBrain() {
  state.engineId = 'brain'
  state.settings.engine = 'brain'
  await setSetting('engine', 'brain').catch(() => {})
  renderEngineLabels()
  renderModels()
  if (!state.chat.messages.length) renderMessages()
  toast('360 Brain is answering — instant, exact, nothing downloaded.')
}

/**
 * Downloads `entry` if it is not here yet, then makes it the answering engine.
 *
 * The confirmation before a first download is not ceremony: on mobile data
 * this is a real cost, and it is the single moment in the app's life that
 * needs the internet at all.
 */
async function useModel(entry, { silent = false } = {}) {
  if (state.loadingId) return

  const gpu = (state.gpu ??= await probeGPU())
  if (!gpu.ok) {
    failLoad(entry, gpu.reason)
    return
  }

  const have = state.downloaded.has(entry.id)
  const size = downloadSize(entry)

  state.loadError = null
  renderModels()

  // Picking it by hand after it has killed the tab is allowed — a device can
  // free up, and refusing outright would be the app deciding for them — but not
  // silently, and not without saying what happened last time.
  if (isUnsafe(entry.id) && !silent) {
    const ok = await confirmSheet({
      title: `Try ${entry.name} again?`,
      body:
        'This model ran the browser out of memory and closed the page here before. ' +
        'It may well do it again — nothing is lost if it does, but the app will ' +
        'close and reopen on 360 Brain.',
      confirmLabel: 'Try it anyway',
      danger: true,
    })
    if (!ok) return
  }

  if (!have && !silent) {
    if (!navigator.onLine) {
      failLoad(
        entry,
        `**${entry.name} has not been downloaded yet, and this device is offline.** ` +
          'The one and only time 360AI needs the internet is this first download — ' +
          'connect to Wi-Fi and try again.',
      )
      return
    }
    const ok = await confirmSheet({
      title: `Download ${entry.name}?`,
      body:
        `A one-time download of ${size}. Use Wi-Fi if you can: after this it is stored ` +
        'on this device and never needs the internet again.',
      confirmLabel: `Download ${size}`,
    })
    if (!ok) return
  }

  // The runtime is a separate chunk, deliberately kept out of the offline
  // precache so 360 Brain users never download it. That leaves one narrow
  // window where it can be missing: the app updated, giving the chunk a new
  // filename, and this is the first launch since — offline. Saying that
  // plainly beats an unhandled rejection and a model that silently never
  // starts.
  let WebLLMBackend
  try {
    ;({ WebLLMBackend } = await loadLLMModule())
  } catch {
    const why = navigator.onLine
      ? `Could not load the engine that runs ${entry.name}. Reload 360AI and try again.`
      : `**360AI has updated since you last used ${entry.name}.** Go online once to ` +
        'finish the update — after that the model works with no internet again.'
    failLoad(entry, why, 'The model engine is not available offline yet.')
    return
  }

  state.llm ??= new WebLLMBackend()
  state.loadingId = entry.id
  guardDownload(!have)
  renderModels()
  showLoad(have ? `Loading ${entry.name}` : `Downloading ${entry.name}`, silent)

  try {
    // Marked before the load, not after: if the device kills the process while
    // the weights go onto the GPU there is no `catch` to reach, and this mark
    // is the only thing that will still be there at the next launch.
    beginRisk('load', entry.id)
    await state.llm.load(entry, ({ progress, text }) => updateLoad(progress, text))

    state.engineId = entry.id
    state.settings.engine = entry.id
    await setSetting('engine', entry.id).catch(() => {})
    state.downloaded.add(entry.id)
    await rememberDownloads()

    if (!silent) {
      toast(`${entry.name} is ready, and now works offline.`, 'ok', 5000)
      // Hand the user back to the chat: the model they just chose is the thing
      // they wanted, and leaving the picker up hides it behind a backdrop.
      $('#models-dialog').close()
    }
  } catch (err) {
    if (err?.name === 'LoadCancelled') {
      toast('Download cancelled. What arrived is kept, so resuming is quicker.', 'warn', 5000)
    } else {
      console.error(err)
      failLoad(
        entry,
        `**${entry.name} could not start.** ${reason(err)}\n\n` +
          'A dropped connection during the download is the usual cause. Whatever ' +
          'arrived is kept, so trying again picks up where it stopped.',
        `Could not load ${entry.name}: ${reason(err)}`,
      )
    }
    // A half-loaded model must never be left as the chosen engine.
    if (state.engineId === entry.id) state.engineId = 'brain'
  } finally {
    // Reached at all — success or a caught error — means the page is still
    // alive, which is the only thing the mark was ever asking about.
    endRisk()
    state.loadingId = null
    guardDownload(false)
    hideLoad()
    renderEngineLabels()
    renderModels()
    if (!state.chat.messages.length) renderMessages()
    refreshStorageInfo()
  }
}

/**
 * Reports a load that did not happen, in whichever place the user is actually
 * looking.
 *
 * The model picker is a modal dialog, so the chat behind it — where system
 * notes go — is not readable while it is open. Every reason a download can
 * fail to start arrives while it *is* open, which is precisely how tapping
 * Download came to look like it did nothing. So the message goes on the card
 * when the picker is up, and into the chat when it is not.
 */
function failLoad(entry, message, short) {
  state.loadError = { id: entry.id, message }
  const picker = $('#models-dialog')
  if (picker.open) {
    renderModels()
    // Scroll the card back into view: on a phone the failed one is often well
    // below the fold by the time the message lands.
    picker.querySelector('.model-error')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  } else {
    showSystemNote(`⚠️ ${message}\n\n360 Brain is answering in the meantime.`)
  }
  toast(short ?? message.replace(/\*\*/g, ''), 'error', 8000)
}

async function removeModel(entry) {
  const size = downloadSize(entry)
  const ok = await confirmSheet({
    title: `Remove ${entry.name}?`,
    body: `This frees ${size} on this device. You can download it again later, over Wi-Fi.`,
    confirmLabel: 'Remove',
    danger: true,
  })
  if (!ok) return

  if (state.engineId === entry.id) {
    await state.llm?.unload()
    state.engineId = 'brain'
    state.settings.engine = 'brain'
    await setSetting('engine', 'brain').catch(() => {})
  }
  await deleteDownload(entry)
  state.downloaded.delete(entry.id)
  await rememberDownloads()
  renderEngineLabels()
  renderModels()
  refreshStorageInfo()
  toast(`${entry.name} removed — ${size} freed.`, 'ok')
}

/* ------------------------------------------------------------- load bar */

/**
 * How long the download may go quiet before the app stops pretending it is
 * fine. WebLLM reports progress per shard, and on a slow connection a shard can
 * legitimately take a while — but a minute of a frozen bar and no explanation
 * is indistinguishable from a broken app, which is the reading to avoid.
 */
const STALL_MS = 45_000

const STALL_NOTE =
  'Nothing has arrived for a while — the connection may have dropped. ' +
  'Cancelling is safe: what already came down is kept.'

let stallTimer = null

function armStall() {
  clearTimeout(stallTimer)
  stallTimer = setTimeout(() => setLoadText(STALL_NOTE, 'stalled'), STALL_MS)
}

/** Writes one line of progress text to both copies of the bar. */
function setLoadText(text, kind = '') {
  for (const el of [$('#load-text'), $('#card-load-text')]) {
    if (!el) continue
    el.textContent = text
    el.classList.toggle('stalled', kind === 'stalled')
  }
}

function showLoad(title, quiet) {
  $('#load-title').textContent = title
  $('#load-pct').textContent = '0%'
  $('#load-fill').style.width = '0%'
  $('#load-bar').hidden = false
  setLoadText(quiet ? 'Reading from this device…' : 'Starting…')
  armStall()
}

/**
 * Paints progress in both places it can be seen: the bar above the composer,
 * and — when the model picker is open on top of it — the card being downloaded.
 */
function updateLoad(progress, text) {
  const pct = Math.max(0, Math.min(100, Math.round((progress ?? 0) * 100)))
  for (const [fill, label] of [
    [$('#load-fill'), $('#load-pct')],
    [$('#card-load-fill'), $('#card-load-pct')],
  ]) {
    if (fill) fill.style.width = `${pct}%`
    if (label) label.textContent = `${pct}%`
  }
  // MLC's own progress text names the shard and the elapsed time, which is
  // exactly the reassurance a long download needs.
  if (text) setLoadText(text)
  armStall()
}

function hideLoad() {
  clearTimeout(stallTimer)
  $('#load-bar').hidden = true
}

/* ------------------------------------------------------ engine labelling */

/** Keeps the topbar chip, the sidebar card and the disclaimer in step. */
function renderEngineLabels() {
  const entry = activeEntry()
  const isBrain = state.engineId === 'brain'

  $('#engine-chip-name').textContent = entry.name
  $('#engine-chip').classList.toggle('chip-model', !isBrain)
  $('#engine-card-name').textContent = entry.name
  $('#engine-card-note').textContent = isBrain
    ? 'Built in · nothing to download'
    : `${downloadSize(entry)} · on this device`

  // Whether the engine can see decides what the composer says about a picture
  // that is already attached, so the two are kept in step.
  if ($('#attachments')) renderAttachments()

  $('#disclaimer').innerHTML = renderMarkdown(
    isBrain
      ? '360AI runs entirely on this device — **nothing downloaded, no internet, no account**. ' +
          'It knows what is built into it and what you teach it, and says so plainly when it ' +
          'does not know. Do not rely on it for medical, legal or financial decisions.'
      : `**${entry.name}** is running on this device — **offline, and nothing you type leaves it**. ` +
          'Small models get things wrong confidently, so check anything that matters. Do not rely ' +
          'on it for medical, legal or financial decisions.',
  )
}

/* ----------------------------------------------------------- what I can do */

/**
 * The capability list, built from the skills themselves. Each example is
 * clickable: tapping one drops it into the composer, which is the fastest way
 * to learn what an offline assistant will and will not answer.
 */
function renderSkillList() {
  const list = $('#skill-list')
  if (!list) return
  list.innerHTML = ''
  for (const skill of SKILLS) {
    const card = document.createElement('div')
    card.className = 'skill-card'

    const head = document.createElement('h4')
    head.className = 'skill-name'
    head.textContent = skill.label ?? skill.id
    card.appendChild(head)

    const examples = document.createElement('div')
    examples.className = 'skill-examples'
    for (const example of skill.examples) {
      const chip = document.createElement('button')
      chip.type = 'button'
      chip.className = 'skill-example'
      chip.textContent = example
      chip.addEventListener('click', () => {
        $('#skills-dialog').close()
        const input = $('#input')
        input.value = example
        autosize(input)
        input.focus()
      })
      examples.appendChild(chip)
    }
    card.appendChild(examples)
    list.appendChild(card)
  }
}

/** The user's own facts, with a delete button on each. */
function renderFactList() {
  const list = $('#fact-list')
  if (!list) return
  list.innerHTML = ''

  const count = $('#fact-count')
  if (count) {
    count.textContent = state.facts.length
      ? `${state.facts.length} thing${state.facts.length === 1 ? '' : 's'} you have taught me`
      : 'You have not taught me anything yet.'
  }

  for (const fact of state.facts) {
    const row = document.createElement('div')
    row.className = 'fact-row'

    const text = document.createElement('div')
    text.className = 'fact-text'
    const q = document.createElement('strong')
    q.textContent = fact.q[0]
    const a = document.createElement('span')
    a.textContent = ` — ${fact.a}`
    text.append(q, a)

    const del = document.createElement('button')
    del.type = 'button'
    del.className = 'btn btn-ghost fact-del'
    del.textContent = '×'
    del.title = 'Forget this'
    del.addEventListener('click', async () => {
      await deleteFact(fact.id)
      state.facts = await listFacts()
      renderFactList()
    })

    row.append(text, del)
    list.appendChild(row)
  }
}

async function forgetEverything() {
  if (!state.facts.length) {
    toast('There is nothing taught to forget.')
    return
  }
  const ok = await confirmSheet({
    title: 'Forget everything you taught 360AI?',
    body: `${state.facts.length} fact${state.facts.length === 1 ? '' : 's'} will be deleted. This cannot be undone.`,
    confirmLabel: 'Forget it all',
    danger: true,
  })
  if (!ok) return
  await clearFacts()
  state.facts = []
  renderFactList()
  toast('Everything you taught me has been forgotten.', 'ok')
}

/* -------------------------------------------------------------- settings */

function applySettingsToForm() {
  $('#theme').value = state.settings.theme
  for (const seg of document.querySelectorAll('.seg')) {
    seg.classList.toggle('on', seg.dataset.length === state.settings.replyLength)
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  const dark =
    theme === 'dark' ||
    (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  $('#theme-color').content = dark ? '#0a0e15' : '#ffffff'
}

async function refreshStorageInfo() {
  if (!navigator.storage?.estimate) return
  const { usage, quota } = await navigator.storage.estimate()
  const pct = quota ? Math.min(100, (usage / quota) * 100) : 0

  const fill = $('#storage-fill')
  if (fill) fill.style.width = `${Math.max(pct, usage ? 1.5 : 0)}%`

  const line = `${fmtBytes(usage)} used of ${fmtBytes(quota)} available on this device`
  $('#storage-info').textContent = line
  $('#model-storage').textContent = line
}

/**
 * With 360 Brain there is nothing to download and nothing to call, so the
 * network state is pure reassurance. With a model chosen it matters exactly
 * once — the first download — and never again.
 */
function updateNetStatus() {
  const el = $('#net-status')
  const online = navigator.onLine
  el.textContent = online ? '● Online — not that I need it' : '● Offline — working normally'
  el.className = `net-status ${online ? 'on' : 'off'}`
}

/* --------------------------------------------------------------- sidebar */

/**
 * On phones the sidebar is an overlay, so its open state also drives the
 * backdrop and the toggle's aria state. Everything goes through here to keep
 * those three in step.
 */
function setSidebar(open) {
  $('#sidebar').classList.toggle('open', open)
  $('#scrim').hidden = !open
  $('#toggle-sidebar').setAttribute('aria-expanded', String(open))
}

function toggleSidebar() {
  setSidebar(!$('#sidebar').classList.contains('open'))
}

/* ---------------------------------------------------------------- rename */

let renaming = false

function startRename() {
  if (renaming) return
  renaming = true
  const input = $('#chat-title-input')
  input.value = state.chat.title
  $('#chat-title').hidden = true
  input.hidden = false
  input.focus()
  input.select()
}

function cancelRename() {
  renaming = false
  $('#chat-title-input').hidden = true
  $('#chat-title').hidden = false
}

async function commitRename() {
  if (!renaming) return
  const name = $('#chat-title-input').value.trim()
  cancelRename()
  if (!name || name === state.chat.title) return

  state.chat.title = name
  // Marks the title as user-chosen so the first message does not overwrite it.
  state.chat.renamed = true
  $('#chat-title').textContent = name
  // An empty chat is not in IndexedDB yet; writing it now would leave a blank
  // row in the sidebar. The name rides along with the first saved message.
  if (state.chat.messages.length) {
    await saveChat(state.chat)
    await refreshChatList()
  }
}

/* ---------------------------------------------------------------- events */

function autosize(el) {
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 200)}px`
}

const narrow = matchMedia('(max-width: 760px)')

/**
 * The keyboard hint does not fit one line on a phone — and Shift+Enter means
 * nothing on a soft keyboard anyway — so it is dropped rather than wrapped and
 * clipped inside a one-row textarea.
 */
function applyComposerPlaceholder() {
  $('#input').placeholder = narrow.matches
    ? 'Ask anything…'
    : 'Ask anything…  (Enter to send, Shift+Enter for a new line)'
}

function wireEvents() {
  const input = $('#input')
  const messages = $('#messages')

  applyComposerPlaceholder()
  narrow.addEventListener('change', () => {
    applyComposerPlaceholder()
    // Leaving the overlay open as the layout returns to a docked rail leaves a
    // stale backdrop over the chat.
    if (!narrow.matches) setSidebar(false)
  })

  // Every dialog closes from its × and its footer button; <form method="dialog">
  // is not used because these dialogs hold real controls of their own.
  for (const btn of document.querySelectorAll('[data-close]')) {
    btn.addEventListener('click', () => btn.closest('dialog')?.close())
  }

  $('#composer').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = input.value
    input.value = ''
    input.style.height = 'auto'
    send(text)
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      $('#composer').requestSubmit()
    }
  })

  input.addEventListener('input', () => autosize(input))

  /* --- pictures --- */

  $('#attach').addEventListener('click', () => $('#attach-file').click())
  $('#attach-file').addEventListener('change', async (e) => {
    await attachFiles(e.target.files ?? [])
    // Clearing it is what lets the same picture be picked twice in a row.
    e.target.value = ''
  })

  // Pasting a screenshot is how this gets used on a laptop, and dragging one in
  // is how it gets used on a desktop. Both are the same path as the button.
  input.addEventListener('paste', (e) => {
    const files = [...(e.clipboardData?.files ?? [])].filter((f) => f.type.startsWith('image/'))
    if (!files.length) return
    e.preventDefault()
    attachFiles(files)
  })

  const composer = $('#composer')
  for (const type of ['dragover', 'dragenter']) {
    composer.addEventListener(type, (e) => {
      if (![...(e.dataTransfer?.types ?? [])].includes('Files')) return
      e.preventDefault()
      composer.classList.add('dropping')
    })
  }
  for (const type of ['dragleave', 'dragend']) {
    composer.addEventListener(type, () => composer.classList.remove('dropping'))
  }
  composer.addEventListener('drop', (e) => {
    const files = [...(e.dataTransfer?.files ?? [])].filter((f) => f.type.startsWith('image/'))
    composer.classList.remove('dropping')
    if (!files.length) return
    e.preventDefault()
    attachFiles(files)
  })

  messages.addEventListener('scroll', () => {
    state.autoScroll = nearBottom()
    $('#scroll-bottom').hidden = state.autoScroll
  })
  $('#scroll-bottom').addEventListener('click', () => scrollToBottom(true))

  $('#stop').addEventListener('click', () => backend()?.stop())
  $('#load-cancel').addEventListener('click', () => state.llm?.cancelLoad())

  $('#new-chat').addEventListener('click', () => {
    openChat(null)
    setSidebar(false)
    if (!state.device.mobile) input.focus()
  })
  $('#open-skills').addEventListener('click', () => {
    renderSkillList()
    renderFactList()
    $('#skills-dialog').showModal()
  })
  $('#open-settings').addEventListener('click', () => {
    refreshStorageInfo()
    $('#settings-dialog').showModal()
  })
  $('#settings-models').addEventListener('click', () => {
    $('#settings-dialog').close()
    openModels()
  })
  $('#engine-chip').addEventListener('click', openModels)
  $('#engine-card').addEventListener('click', openModels)

  $('#toggle-sidebar').addEventListener('click', toggleSidebar)
  $('#close-sidebar').addEventListener('click', () => setSidebar(false))
  $('#scrim').addEventListener('click', () => setSidebar(false))

  $('#chat-search').addEventListener('input', (e) => {
    state.filter = e.target.value
    renderChatList()
  })

  $('#chat-title').addEventListener('click', startRename)
  $('#chat-title').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      startRename()
    }
  })
  $('#chat-title-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitRename()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancelRename()
    }
  })
  $('#chat-title-input').addEventListener('blur', commitRename)

  $('#theme').addEventListener('change', async (e) => {
    state.settings.theme = e.target.value
    applyTheme(e.target.value)
    await setSetting('theme', e.target.value)
  })

  for (const seg of document.querySelectorAll('.seg')) {
    seg.addEventListener('click', async () => {
      state.settings.replyLength = seg.dataset.length
      applySettingsToForm()
      await setSetting('replyLength', seg.dataset.length).catch(() => {})
    })
  }

  $('#forget-all').addEventListener('click', forgetEverything)

  $('#export-chats').addEventListener('click', async () => {
    const blob = new Blob([JSON.stringify(await exportAll(), null, 2)], {
      type: 'application/json',
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `360ai-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    toast('Backup saved to your downloads.', 'ok')
  })

  $('#import-chats').addEventListener('click', () => $('#import-file').click())
  $('#import-file').addEventListener('change', async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const count = await importAll(JSON.parse(await file.text()))
      await refreshChatList()
      state.facts = await listFacts()
      renderFactList()
      toast(`Imported ${count} chat${count === 1 ? '' : 's'}.`, 'ok')
    } catch (err) {
      toast(`Import failed: ${reason(err)}`, 'error', 6000)
    }
    e.target.value = ''
  })

  window.addEventListener('keydown', (e) => {
    const mod = e.ctrlKey || e.metaKey
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      setSidebar(true)
      $('#chat-search').focus()
      $('#chat-search').select()
    } else if (mod && e.key.toLowerCase() === 'b') {
      e.preventDefault()
      toggleSidebar()
    } else if (mod && e.key.toLowerCase() === 'm') {
      e.preventDefault()
      openModels()
    } else if (e.key === 'Escape') {
      setSidebar(false)
    }
  })

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.settings.theme === 'system') applyTheme('system')
  })

  window.addEventListener('online', updateNetStatus)
  window.addEventListener('offline', updateNetStatus)

  let installPrompt = null
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installPrompt = e
    $('#install-app').hidden = false
  })
  // Safari on iOS has no install prompt event at all, so the button would stay
  // hidden on exactly the platform whose install gesture is hardest to find.
  if (state.device.ios && !state.device.standalone) $('#install-app').hidden = false
  $('#install-app').addEventListener('click', async () => {
    if (!installPrompt) {
      showSystemNote(`📲 ${installHelp(state.device)}`)
      setSidebar(false)
      return
    }
    installPrompt.prompt()
    await installPrompt.userChoice
    installPrompt = null
    $('#install-app').hidden = true
  })

}

/**
 * Guards a download in flight against a stray tab close.
 *
 * The listener is attached only while one is running and removed the moment it
 * finishes: a permanently registered `beforeunload` handler makes some
 * browsers treat every navigation away as risky, and a spurious "Leave site?"
 * on an app people close a dozen times a day is worse than the rare lost
 * download it would prevent.
 */
function warnBeforeLeaving(e) {
  e.preventDefault()
  e.returnValue = ''
}

function guardDownload(on) {
  if (on) window.addEventListener('beforeunload', warnBeforeLeaving)
  else window.removeEventListener('beforeunload', warnBeforeLeaving)
}

/**
 * Holds the page at 1x.
 *
 * `user-scalable=no` in the viewport meta covers Android and an installed iOS
 * app, but Safari has ignored it in a normal tab since iOS 10 — there, the
 * pinch arrives as a `gesture*` event and has to be refused directly. Between
 * this and `touch-action` in the stylesheet, the layout stays put on both.
 */
for (const type of ['gesturestart', 'gesturechange', 'gestureend']) {
  document.addEventListener(type, (e) => e.preventDefault(), { passive: false })
}

navigator.storage?.persist?.().catch(() => {})

boot()
