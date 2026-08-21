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

/** Builds the DOM for one message bubble and returns handles for streaming. */
export function createBubble(role) {
  const el = document.createElement('article')
  el.className = `msg msg-${role}`

  const who = document.createElement('div')
  who.className = 'msg-role'
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

  const meta = document.createElement('div')
  meta.className = 'msg-meta'
  meta.hidden = true

  const actions = document.createElement('div')
  actions.className = 'msg-actions'

  el.append(who, think, body, meta, actions)
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

/** Adds a copy button to every <pre> that does not have one yet. */
export function decorateCodeBlocks(container) {
  for (const pre of container.querySelectorAll('pre')) {
    if (pre.querySelector('.copy-btn')) continue
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
