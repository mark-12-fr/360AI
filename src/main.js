import './styles.css'
import { BrainBackend } from './backends/brain.js'
import { SKILLS, skillList } from './brain/index.js'
import { detectDevice, installHelp } from './device.js'
import {
  clearFacts, createChat, deleteChat, deleteFact, deriveTitle, exportAll, getChat,
  getSettings, importAll, latestChat, listChats, listFacts, saveChat, saveFact, setSetting,
} from './db.js'
import {
  addAction, createBubble, decorateCodeBlocks, fmtBytes, renderMarkdown, splitThinking,
} from './ui.js'

const $ = (sel) => document.querySelector(sel)

const SUGGESTIONS = [
  'What is the capital of Japan?',
  'Major subjects in BSIT',
  'How many days until Christmas?',
  'remember: my wifi password = ...',
]

const state = {
  settings: null,
  chat: null,
  backend: null,
  busy: false,
  device: detectDevice(),
  // What the user has taught the brain. Kept in memory so a question costs no
  // database round-trip, and rewritten whenever it changes.
  facts: [],
  chats: [],
  filter: '',
  autoScroll: true,
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

function showFatal(message) {
  const el = document.createElement('div')
  el.className = 'system-note'
  el.innerHTML = renderMarkdown(`⚠️ ${message}`)
  $('#messages').replaceChildren(el)
}

async function boot() {
  try {
    state.settings = await withTimeout(
      getSettings(),
      8000,
      'Could not open the local database. If 360AI is open in another tab, ' +
        'close it and reload this page.',
    )
  } catch (err) {
    showFatal(err.message)
    return
  }

  state.facts = await listFacts().catch(() => [])
  state.backend = new BrainBackend(createMemory())

  applyTheme(state.settings.theme)
  applySettingsToForm()
  wireEvents()
  // Resume where the user left off rather than dropping them into a blank chat.
  const resume = await latestChat()
  await openChat(resume?.id ?? null)
  renderSkillList()
  renderFactList()
  updateNetStatus()
  refreshStorageInfo()
  $('#engine-badge').textContent = state.backend.label

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

  for (const c of shown) {
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
      if (!confirm(`Delete "${c.title}"?`)) return
      await deleteChat(c.id)
      const wasOpen = state.chat?.id === c.id
      if (wasOpen) state.chat = null
      await refreshChatList()
      if (wasOpen) await openChat(null)
    })

    row.append(open, del)
    list.appendChild(row)
  }
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
    state.chat.messages.forEach((m, i) => appendMessage(m.role, m.content, m.stats, i))
  }
  state.autoScroll = true
  scrollToBottom(true)
}

function buildEmptyState() {
  const wrap = document.createElement('div')
  wrap.className = 'empty-state'

  const h = document.createElement('h1')
  h.textContent = '360AI'
  const p = document.createElement('p')
  p.textContent = 'Your own AI. It runs on this device — phone, tablet or computer — and works with the internet off.'
  wrap.append(h, p)

  const chips = document.createElement('div')
  chips.className = 'suggestions'
  for (const s of SUGGESTIONS) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'suggestion'
    b.textContent = s
    b.addEventListener('click', () => {
      const input = $('#input')
      input.value = s
      autosize(input)
      input.focus()
    })
    chips.appendChild(b)
  }
  wrap.appendChild(chips)
  return wrap
}

function clearEmptyState() {
  $('#messages').querySelector('.empty-state')?.remove()
}

function appendMessage(role, content, stats, index) {
  const handles = createBubble(role)
  const { el, body, think, thinkBody, meta } = handles
  const { thinking, answer } = splitThinking(content)

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
      if (state.busy) return null
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
}

async function send(text) {
  const trimmed = text.trim()
  if (state.busy || !trimmed) return

  clearEmptyState()
  state.chat.messages.push({ role: 'user', content: trimmed })
  appendMessage('user', trimmed, null, state.chat.messages.length - 1)

  if (state.chat.messages.length === 1 && !state.chat.renamed) {
    state.chat.title = deriveTitle(trimmed)
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

  // The brain answers the latest question; the history goes along only so
  // that the adapter can find it.
  const payload = state.chat.messages.map(({ role, content }) => ({ role, content }))

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

  try {
    for await (const chunk of state.backend.stream(payload)) {
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
    raw += `\n\n**⚠️ Error:** ${err.message}`
  }

  paint()
  decorateCodeBlocks(handles.body)
  handles.el.classList.remove('streaming')

  if (stats?.note) {
    handles.meta.hidden = false
    handles.meta.textContent = stats.note
  }

  state.chat.messages.push({ role: 'assistant', content: raw, stats })
  await saveChat(state.chat)
  wireActions(handles, 'assistant', state.chat.messages.length - 1)

  setBusy(false)
  $('#input').focus()
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
  if (!state.facts.length) return
  if (!confirm('Forget everything you have taught 360AI? This cannot be undone.')) return
  await clearFacts()
  state.facts = []
  renderFactList()
  showSystemNote('🧹 Everything you taught me has been forgotten.')
}

/* -------------------------------------------------------------- settings */

function applySettingsToForm() {
  $('#theme').value = state.settings.theme
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  const dark =
    theme === 'dark' ||
    (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  $('#theme-color').content = dark ? '#0b0d12' : '#ffffff'
}

async function refreshStorageInfo() {
  if (!navigator.storage?.estimate) return
  const { usage, quota } = await navigator.storage.estimate()
  $('#storage-info').textContent = `Storage used: ${fmtBytes(usage)} of ${fmtBytes(quota)}`
}

/**
 * There is nothing to download and nothing to call, so the network state is
 * only ever a reassurance — which is exactly why it is worth showing.
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

  messages.addEventListener('scroll', () => {
    state.autoScroll = nearBottom()
    $('#scroll-bottom').hidden = state.autoScroll
  })
  $('#scroll-bottom').addEventListener('click', () => scrollToBottom(true))

  $('#stop').addEventListener('click', () => state.backend?.stop())
  $('#new-chat').addEventListener('click', () => {
    openChat(null)
    setSidebar(false)
    input.focus()
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
  $('#toggle-sidebar').addEventListener('click', toggleSidebar)
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
  })

  $('#import-chats').addEventListener('click', () => $('#import-file').click())
  $('#import-file').addEventListener('change', async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const count = await importAll(JSON.parse(await file.text()))
      await refreshChatList()
      alert(`Imported ${count} chat${count === 1 ? '' : 's'}.`)
    } catch (err) {
      alert(`Import failed: ${err.message}`)
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

// Ask the browser to keep our data even under storage pressure — otherwise a
// multi-GB model cache is the first thing evicted.
navigator.storage?.persist?.().catch(() => {})

boot()
