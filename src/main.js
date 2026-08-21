import './styles.css'
import { MODELS, findModel, fitsComfortably, pickVariant, probeGPU } from './models.js'
import { OllamaBackend } from './backends/ollama.js'
import {
  createChat, deleteChat, deriveTitle, exportAll, getChat, getSettings,
  importAll, latestChat, listChats, saveChat, setSetting,
} from './db.js'
import {
  addAction, createBubble, decorateCodeBlocks, fmtBytes, renderMarkdown, splitThinking,
} from './ui.js'

const $ = (sel) => document.querySelector(sel)

const SUGGESTIONS = [
  'Explain how a large language model works, in plain language.',
  'Draft a short, polite follow-up email about an unpaid invoice.',
  'Write a Python script that renames files by their creation date.',
  'What are the trade-offs of running an AI model locally instead of in the cloud?',
]

const state = {
  settings: null,
  chat: null,
  backend: null,
  busy: false,
  gpu: null,
  chats: [],
  filter: '',
  autoScroll: true,
}

/**
 * The WebLLM runtime is ~6 MB of JS. Importing it eagerly would block first
 * paint even though it is not needed until the user actually picks a model, so
 * it is pulled in on demand. The service worker still precaches the chunk, so
 * the offline path is unaffected.
 */
async function newWebLLMBackend() {
  const { WebLLMBackend } = await import('./backends/webllm.js')
  return new WebLLMBackend()
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
      'Could not open the local database. If Bulig AI is open in another tab, ' +
        'close it and reload this page.',
    )
  } catch (err) {
    showFatal(err.message)
    return
  }

  state.gpu = await probeGPU()

  applyTheme(state.settings.theme)
  applySettingsToForm()
  wireEvents()
  // Resume where the user left off rather than dropping them into a blank chat.
  const resume = await latestChat()
  await openChat(resume?.id ?? null)
  renderModelList()
  updateNetStatus()
  refreshStorageInfo()

  if (!state.gpu.ok) {
    showSystemNote(
      `⚠️ ${state.gpu.reason}\n\nYou can still use **Turbo mode** (Ollama) from the Model menu.`,
    )
    return
  }

  showSystemNote(
    `Ready. Pick a model from the **Model** button above to get started.\n\n` +
      `GPU: ${state.gpu.description || state.gpu.vendor} · ` +
      `${state.gpu.f16 ? 'f16 supported' : 'no f16 — the larger f32 builds will be used'}`,
  )

  // Only auto-load a model whose weights this device has already downloaded;
  // silently pulling several gigabytes on start-up would be hostile.
  const last = state.settings.lastModelId
  if (state.settings.autoLoadModel && last && state.settings.cachedModels.includes(last)) {
    loadModel(last)
  }
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
  h.textContent = 'Bulig AI'
  const p = document.createElement('p')
  p.textContent = 'A private AI assistant that runs entirely on this device.'
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

  if (stats?.decodeTps) {
    meta.hidden = false
    meta.textContent = `${stats.decodeTps.toFixed(1)} tokens/sec`
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

function requireBackend() {
  if (state.backend?.ready) return true
  showSystemNote('No model is loaded yet. Pick one from the **Model** button first.')
  $('#models-dialog').showModal()
  return false
}

function setBusy(busy) {
  state.busy = busy
  $('#send').hidden = busy
  $('#stop').hidden = !busy
  $('#input').disabled = busy
}

async function send(text) {
  const trimmed = text.trim()
  if (state.busy || !trimmed) return
  if (!requireBackend()) return

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

  // Only the tail of the conversation is sent — small models have a 4k window
  // and overflowing it makes the runtime drop the system prompt first.
  const windowSize = state.settings.contextWindow
  const history = state.chat.messages.slice(-windowSize)
  const payload = [
    { role: 'system', content: state.settings.systemPrompt },
    ...history.map(({ role, content }) => ({ role, content })),
  ]

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
    for await (const chunk of state.backend.stream(payload, {
      temperature: state.settings.temperature,
    })) {
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

  if (stats?.decodeTps) {
    handles.meta.hidden = false
    handles.meta.textContent = `${stats.decodeTps.toFixed(1)} tokens/sec`
  }

  state.chat.messages.push({ role: 'assistant', content: raw, stats })
  await saveChat(state.chat)
  wireActions(handles, 'assistant', state.chat.messages.length - 1)

  setBusy(false)
  $('#input').focus()
}

/* ---------------------------------------------------------- model picker */

function renderModelList() {
  const list = $('#model-list')
  list.innerHTML = ''

  $('#gpu-note').textContent = state.gpu.ok
    ? `GPU: ${state.gpu.description || state.gpu.vendor}${
        state.gpu.f16 ? '' : ' — no f16 support, so the larger f32 builds are used'
      }`
    : state.gpu.reason

  for (const m of MODELS) {
    const v = pickVariant(m, state.gpu)
    const cached = state.settings.cachedModels.includes(m.id)
    const card = document.createElement('button')
    card.type = 'button'
    card.className = 'model-card'
    if (state.backend?.modelId === v.model) card.classList.add('active')
    if (!fitsComfortably(v.vramMB, state.gpu)) card.classList.add('heavy')

    card.innerHTML = `
      <div class="model-head">
        <span class="model-name"></span>
        <span class="model-tag"></span>
      </div>
      <p class="model-blurb"></p>
      <div class="model-size"></div>`
    card.querySelector('.model-name').textContent = m.name
    card.querySelector('.model-tag').textContent = m.recommended ? `★ ${m.tag}` : m.tag
    card.querySelector('.model-blurb').textContent = m.blurb
    card.querySelector('.model-size').textContent = cached
      ? `downloaded · ${(v.vramMB / 1024).toFixed(1)} GB · ${v.precision}`
      : `~${(v.vramMB / 1024).toFixed(1)} GB download · ${v.precision}`

    card.disabled = !state.gpu.ok
    card.addEventListener('click', () => loadModel(m.id))
    list.appendChild(card)
  }
}

async function loadModel(id) {
  const entry = findModel(id)
  if (!entry || state.busy) return

  $('#models-dialog').close()
  const bar = $('#load-bar')
  bar.hidden = false
  $('#engine-badge').textContent = 'loading…'

  try {
    if (state.backend?.kind !== 'webllm') state.backend = await newWebLLMBackend()
    const info = await state.backend.load(entry, ({ progress, text }) => {
      $('#load-fill').style.width = `${Math.round((progress ?? 0) * 100)}%`
      $('#load-text').textContent = text ?? ''
    })
    $('#engine-badge').textContent = info.label
    await setSetting('lastModelId', id)
    state.settings.lastModelId = id
    await rememberDownload(id)
    showSystemNote(`✅ **${entry.name}** is loaded. Ask away.`)
  } catch (err) {
    $('#engine-badge').textContent = 'failed'
    showSystemNote(`⚠️ Could not load the model: ${err.message}`)
  } finally {
    bar.hidden = true
    $('#load-fill').style.width = '0%'
    renderModelList()
    refreshStorageInfo()
  }
}

async function rememberDownload(id) {
  if (state.settings.cachedModels.includes(id)) return
  state.settings.cachedModels = [...state.settings.cachedModels, id]
  await setSetting('cachedModels', state.settings.cachedModels)
}

async function checkOllama() {
  const url = $('#ollama-url').value.trim()
  const out = $('#ollama-result')
  out.textContent = 'Checking…'
  try {
    const models = await OllamaBackend.listModels(url)
    await setSetting('ollamaUrl', url)
    state.settings.ollamaUrl = url
    if (!models.length) {
      out.textContent = 'Connected, but no models are installed. Run: ollama pull qwen3:8b'
      return
    }
    out.innerHTML = ''
    for (const m of models) {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'btn btn-ghost btn-block'
      b.textContent = `${m.name}${m.sizeGB ? ` · ${m.sizeGB} GB` : ''}`
      b.addEventListener('click', async () => {
        state.backend = new OllamaBackend(url, m.name)
        const info = await state.backend.load()
        $('#engine-badge').textContent = info.label
        $('#models-dialog').close()
        showSystemNote(`✅ Turbo mode: connected to **${m.name}** through Ollama.`)
      })
      out.appendChild(b)
    }
  } catch (err) {
    // A running Ollama still refuses browser requests unless this page's
    // origin is allowed, and that rejection looks identical to "not installed".
    out.innerHTML = renderMarkdown(
      `Could not connect (${err.message}).\n\n` +
        '**If Ollama is not installed yet:** get it from ollama.com, then run ' +
        '`ollama pull qwen3:8b`.\n\n' +
        '**If it is already running:** it has to allow this page. Restart it with ' +
        `\`OLLAMA_ORIGINS=${location.origin}\` set, then check again.`,
    )
  }
}

/* -------------------------------------------------------------- settings */

function applySettingsToForm() {
  $('#sys-prompt').value = state.settings.systemPrompt
  $('#temp').value = state.settings.temperature
  $('#temp-val').textContent = state.settings.temperature
  $('#ctx').value = state.settings.contextWindow
  $('#ctx-val').textContent = state.settings.contextWindow
  $('#ollama-url').value = state.settings.ollamaUrl
  $('#theme').value = state.settings.theme
  $('#auto-load').checked = state.settings.autoLoadModel
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

async function clearModelCache() {
  if (!confirm('Delete every downloaded model? You will have to download them again.')) return
  await state.backend?.unload().catch(() => {})
  for (const key of await caches.keys()) {
    if (/webllm|mlc/i.test(key)) await caches.delete(key)
  }
  state.backend = null
  state.settings.cachedModels = []
  await setSetting('cachedModels', [])
  $('#engine-badge').textContent = 'no model loaded'
  renderModelList()
  await refreshStorageInfo()
  showSystemNote('🧹 Model cache cleared.')
}

function updateNetStatus() {
  const el = $('#net-status')
  const online = navigator.onLine
  el.textContent = online ? '● Online (downloads available)' : '● Offline — still working'
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
  $('#open-models').addEventListener('click', () => {
    renderModelList()
    $('#models-dialog').showModal()
  })
  $('#open-settings').addEventListener('click', () => {
    refreshStorageInfo()
    $('#settings-dialog').showModal()
  })
  $('#ollama-check').addEventListener('click', checkOllama)
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

  $('#sys-prompt').addEventListener('change', async (e) => {
    state.settings.systemPrompt = e.target.value
    await setSetting('systemPrompt', e.target.value)
  })
  $('#temp').addEventListener('input', async (e) => {
    const v = Number(e.target.value)
    state.settings.temperature = v
    $('#temp-val').textContent = v.toFixed(2)
    await setSetting('temperature', v)
  })
  $('#ctx').addEventListener('input', async (e) => {
    const v = Number(e.target.value)
    state.settings.contextWindow = v
    $('#ctx-val').textContent = v
    await setSetting('contextWindow', v)
  })
  $('#theme').addEventListener('change', async (e) => {
    state.settings.theme = e.target.value
    applyTheme(e.target.value)
    await setSetting('theme', e.target.value)
  })
  $('#auto-load').addEventListener('change', async (e) => {
    state.settings.autoLoadModel = e.target.checked
    await setSetting('autoLoadModel', e.target.checked)
  })

  $('#clear-models').addEventListener('click', clearModelCache)

  $('#export-chats').addEventListener('click', async () => {
    const blob = new Blob([JSON.stringify(await exportAll(), null, 2)], {
      type: 'application/json',
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `bulig-ai-backup-${new Date().toISOString().slice(0, 10)}.json`
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
  $('#install-app').addEventListener('click', async () => {
    if (!installPrompt) return
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
