import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({ gfm: true, breaks: true })

// Model output is untrusted text that we inject as HTML, so every rendered
// string goes through DOMPurify. Without this a model could be steered into
// emitting an <img onerror> and running script in the app's origin.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer nofollow')
  }
})

export function renderMarkdown(text) {
  return DOMPurify.sanitize(marked.parse(text ?? ''), {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'del', 'code', 'pre', 'blockquote',
      'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span',
    ],
    ALLOWED_ATTR: ['href', 'title', 'class'],
  })
}

/**
 * Reasoning models (Qwen 3 among them) wrap chain-of-thought in <think> tags.
 * Showing that raw is noisy, so split it out and let the user expand it.
 * Handles the streaming case where the closing tag has not arrived yet.
 *
 * 360 Brain never emits these; the downloadable models do, which is why this
 * came back when the model picker did.
 */
export function splitThinking(raw) {
  const text = raw ?? ''
  const open = text.indexOf('<think>')
  if (open === -1) return { thinking: '', answer: text, streamingThought: false }

  const close = text.indexOf('</think>', open)
  if (close === -1) {
    return {
      thinking: text.slice(open + 7),
      answer: text.slice(0, open),
      streamingThought: true,
    }
  }
  return {
    thinking: text.slice(open + 7, close),
    answer: (text.slice(0, open) + text.slice(close + 8)).trim(),
    streamingThought: false,
  }
}

/**
 * Builds the DOM for one message and returns handles for streaming.
 *
 * The assistant's turn is headed by the orbit — the app's mark — followed by
 * its name and, once the answer lands, how long it took and which skill
 * answered. Keeping the telemetry in the header rather than under the text
 * makes it read as a property of the answer instead of a footnote to it.
 */
export function createBubble(role) {
  const el = document.createElement('article')
  el.className = `msg msg-${role}`

  const head = document.createElement('div')
  head.className = 'msg-head'

  if (role !== 'user') {
    const orbit = document.createElement('span')
    orbit.className = 'orbit'
    orbit.setAttribute('aria-hidden', 'true')
    head.appendChild(orbit)
  }

  const who = document.createElement('span')
  who.className = 'msg-who'
  who.textContent = role === 'user' ? 'You' : '360AI'

  const think = document.createElement('details')
  think.className = 'thinking'
  think.hidden = true
  const summary = document.createElement('summary')
  summary.textContent = "The AI's reasoning"
  const thinkBody = document.createElement('div')
  thinkBody.className = 'thinking-body'
  think.append(summary, thinkBody)

  const body = document.createElement('div')
  body.className = 'msg-body'

  const meta = document.createElement('span')
  meta.className = 'msg-meta'
  meta.hidden = true

  const actions = document.createElement('div')
  actions.className = 'msg-actions'

  head.append(who, meta)
  el.append(head, think, body, actions)
  return { el, body, think, thinkBody, meta, actions }
}

/**
 * Adds a small text button to a message's action row. `onClick` may return a
 * confirmation label, which is shown briefly before the original label returns.
 */
export function addAction(actions, label, title, onClick) {
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'msg-action'
  btn.textContent = label
  btn.title = title
  btn.addEventListener('click', async () => {
    const confirmLabel = await onClick()
    if (!confirmLabel) return
    btn.textContent = confirmLabel
    setTimeout(() => (btn.textContent = label), 1500)
  })
  actions.appendChild(btn)
  return btn
}

/**
 * Labels every code block with its language and gives it a copy button.
 *
 * The label comes from the `language-*` class marked puts on the <code>; a
 * snippet without its language named is a riddle, and the app hands out code
 * in eighteen of them.
 */
export function decorateCodeBlocks(container) {
  for (const pre of container.querySelectorAll('pre')) {
    if (pre.querySelector('.copy-btn')) continue

    const code = pre.querySelector('code')
    const tagged = [...(code?.classList ?? [])].find((c) => c.startsWith('language-'))
    pre.dataset.lang = tagged ? tagged.slice('language-'.length) : 'text'

    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.type = 'button'
    btn.textContent = 'Copy'
    btn.addEventListener('click', async () => {
      await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? '')
      btn.textContent = 'Copied!'
      setTimeout(() => (btn.textContent = 'Copy'), 1500)
    })
    pre.appendChild(btn)
  }
}

export function fmtBytes(bytes) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(i > 1 ? 1 : 0)} ${units[i]}`
}


/* ------------------------------------------------------------------ toasts */

/**
 * A short, non-blocking message.
 *
 * This replaces `alert()` for anything that is merely news — an import that
 * worked, a download that finished. A modal for that steals the keyboard and
 * has to be dismissed before the app is usable again, which is a heavy price
 * for a sentence nobody needs to act on.
 */
export function toast(message, kind = 'info', ms = 3600) {
  const host = document.getElementById('toasts')
  if (!host) return null

  const el = document.createElement('div')
  el.className = `toast toast-${kind}`
  el.role = 'status'
  el.textContent = message
  host.appendChild(el)

  const close = () => {
    el.classList.add('leaving')
    el.addEventListener('animationend', () => el.remove(), { once: true })
    // A toast whose animation never fires (reduced motion, a background tab)
    // would otherwise sit there forever.
    setTimeout(() => el.remove(), 400)
  }
  el.addEventListener('click', close)
  const timer = setTimeout(close, ms)
  return () => {
    clearTimeout(timer)
    close()
  }
}

/* ----------------------------------------------------------------- confirm */

/**
 * An in-app replacement for `confirm()`, styled like the rest of the app and,
 * on a phone, a bottom sheet you can reach with your thumb. Resolves to a
 * boolean; Escape and the backdrop both count as "no".
 */
export function confirmSheet({ title, body, confirmLabel = 'Confirm', danger = false }) {
  const dialog = document.getElementById('confirm-dialog')
  if (!dialog) return Promise.resolve(window.confirm(`${title}

${body ?? ''}`))

  dialog.querySelector('#confirm-title').textContent = title
  dialog.querySelector('#confirm-body').textContent = body ?? ''

  const go = dialog.querySelector('#confirm-go')
  go.textContent = confirmLabel
  go.className = `btn ${danger ? 'btn-danger' : 'btn-primary'}`

  return new Promise((resolve) => {
    dialog.addEventListener('close', () => resolve(dialog.returnValue === 'go'), { once: true })
    dialog.showModal()
  })
}

/* ------------------------------------------------------- chat list grouping */

const DAY = 86_400_000

/**
 * Buckets chats by when they were last touched.
 *
 * A flat list of forty titles is a wall; the same forty under "Today" and
 * "Earlier" is a history. The boundaries are calendar days rather than rolling
 * 24-hour windows, because "yesterday" means yesterday to a person.
 */
export function groupChats(chats, now = new Date()) {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const buckets = new Map([
    ['Today', []],
    ['Yesterday', []],
    ['Previous 7 days', []],
    ['Older', []],
  ])

  for (const chat of chats) {
    const at = chat.updatedAt ?? chat.createdAt ?? 0
    const key =
      at >= startOfToday
        ? 'Today'
        : at >= startOfToday - DAY
          ? 'Yesterday'
          : at >= startOfToday - 7 * DAY
            ? 'Previous 7 days'
            : 'Older'
    buckets.get(key).push(chat)
  }

  return [...buckets].filter(([, rows]) => rows.length)
}
