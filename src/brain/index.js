/**
 * 360 Brain — the whole "AI", in plain JavaScript.
 *
 * Every skill gets a look at the question and reports how confident it is that
 * the answer belongs to it. The most confident one wins; if nobody clears the
 * bar, we say so plainly instead of inventing something, which is the one
 * behaviour that separates a useful offline assistant from a liar.
 *
 * Two things make it forgiving about *how* a question is asked:
 *   - each skill reads the question in two halves — the subject and the fact
 *     wanted about it — so word order barely matters (see nlp.js);
 *   - a short-term memory of the last subject, so "and its capital?" works.
 *
 * Adding knowledge means editing `facts.js` or a file in `data/`. Adding an
 * ability means dropping another module into `skills/`.
 */

import academics from './skills/academics.js'
import chance from './skills/chance.js'
import chemistry from './skills/chemistry.js'
import code from './skills/code.js'
import datetime from './skills/datetime.js'
import define from './skills/define.js'
import geography from './skills/geography.js'
import knowledge from './skills/knowledge.js'
import law from './skills/law.js'
import math from './skills/math.js'
import profiles from './skills/profiles.js'
import smalltalk from './skills/smalltalk.js'
import strands from './skills/strands.js'
import text from './skills/text.js'
import units from './skills/units.js'

export const SKILLS = [
  knowledge,
  math,
  units,
  datetime,
  geography,
  chemistry,
  academics,
  strands,
  law,
  code,
  profiles,
  define,
  text,
  chance,
  smalltalk,
]

const now = () => (typeof performance === 'undefined' ? Date.now() : performance.now())

/** Below this, no skill is trusted and the honest fallback runs instead. */
const THRESHOLD = 0.5

/**
 * A question with no subject of its own — "and its capital?", "what about the
 * population?" — is answered against whatever was last asked about.
 */
const FOLLOW_UP =
  /^(?:and|what about|how about|ok(?:ay)?|then)?[,\s]*(?:what(?:'s| is| are)\s+)?(?:its|it's|their|the|his|her)?\s*(?:capital|currency|language|population|area|continent|symbol|atomic number|atomic mass|subjects?|majors?|minors?|careers?|years?|meaning|definition)\s*[?.!]*$/i

const PRONOUN_ONLY = /^\s*(and|what about|how about)?\s*(it|that|this|there|them|those)\s*[?.!]*\s*$/i

/* --------------------------------------------------------- answer length */

const SHORTER =
  /^(shorter|make it short(er)?|too long|be brief|briefly|in short|short(er)? version|tl;?dr|summari[sz]e (it|that|this)|condense|shorten (it|that|this)?)\s*[?.!]*$/i

const LONGER =
  /^(elaborate|expand( on (it|that|this))?|explain( it| that| this)?( more| further| in detail)?|more (details?|info(rmation)?)|in detail|longer|tell me more|go deeper|full( version| answer)?)\s*[?.!]*$/i

const NORMAL_LENGTH = /^(normal|default|reset|medium)( length| answers?| replies)?\s*[?.!]*$/i

const isHeading = (p) => /^\*{2}[^*]+\*{2}$/.test(p.trim())
const isListLine = (l) => /^\s*([-*]|\d+\.)\s/.test(l)

/**
 * Trims an answer to its point: the headline, the paragraph that carries the
 * substance, and at most three items of any list. Whatever is dropped is
 * announced, so a shortened answer never passes for the whole of what is known.
 */
function condense(text) {
  // A fenced code block often contains blank lines, so paragraphs inside one
  // are merged back together — cutting between them would leave the fence
  // unclosed and swallow whatever came after it.
  const paragraphs = []
  let openFence = false
  for (const part of text.split(/\n{2,}/)) {
    const piece = part.trim()
    if (!piece) continue
    if (openFence) paragraphs[paragraphs.length - 1] += `\n\n${piece}`
    else paragraphs.push(piece)
    if ((piece.match(/```/g) ?? []).length % 2 === 1) openFence = !openFence
  }

  const kept = []
  let index = 0
  // A heading alone says nothing, so it never counts as the answer.
  if (paragraphs[index] && isHeading(paragraphs[index])) kept.push(paragraphs[index++])
  if (paragraphs[index]) kept.push(paragraphs[index++])

  let trimmed = index < paragraphs.length

  const last = kept.length - 1
  if (last >= 0) {
    const lines = kept[last].split('\n')
    if (lines.filter(isListLine).length > 3) {
      kept[last] = lines.slice(0, 3).join('\n')
      trimmed = true
    }
  }

  const body = kept.join('\n\n')
  return trimmed ? `${body}\n\n*(shortened — say "elaborate" for the rest)*` : body
}

/**
 * `explicit` marks the turn where the user actually asked to elaborate. Later
 * answers still run long, but without the "that is everything" footer, which
 * would be noise on every message.
 */
function expand(result, explicit) {
  if (result.detail) return `${result.text}\n\n${result.detail}`
  return explicit ? `${result.text}\n\n*That is everything I have on this one.*` : result.text
}

function applyVerbosity(result, verbosity, explicit) {
  if (!result?.text || result.skill === 'fallback') return result
  if (verbosity === 'short') return { ...result, text: condense(result.text) }
  if (verbosity === 'detailed') return { ...result, text: expand(result, explicit) }
  return result
}

/** The capability list, built from the skills themselves so it cannot go stale. */
export function skillList() {
  const rows = SKILLS.map((s) => `- **${s.label ?? s.id}** — e.g. \`${s.examples[0]}\``)
  return `Here is what I can do, all of it offline and instant:\n\n${rows.join('\n')}`
}

const UNKNOWN = [
  "I don't know that one.",
  'That is outside what I know.',
  'I have nothing on that.',
]

function fallback() {
  const examples = SKILLS.flatMap((s) => s.examples.slice(0, 1))
    .map((e) => `- \`${e}\``)
    .join('\n')
  return {
    skill: 'fallback',
    score: 0,
    text:
      `${UNKNOWN[Math.floor(Math.random() * UNKNOWN.length)]} I have no trained model behind ` +
      `me — only what is written into me and what you teach me.\n\n` +
      `You can teach me the answer: **remember: <question> = <answer>**\n\n` +
      `**Things I answer well:**\n${examples}`,
  }
}

/**
 * Answers one question.
 *
 * `memory.taught` supplies the user's own facts; a returned `effect` asks the
 * caller to write one back, because storage is the app's job, not the brain's.
 * `context` carries the previous subject so follow-up questions resolve.
 */
/**
 * How long the engine may hold the main thread before handing it back.
 *
 * Long enough that an ordinary question — which is answered in a few
 * milliseconds — never yields at all and pays nothing for this.
 */
const YIELD_AFTER_MS = 25

export async function answer(input, options = {}) {
  const raw = String(input ?? '').trim()
  if (!raw) return { skill: 'empty', score: 1, text: 'Ask me something.' }

  const context = options.context ?? {}
  let question = raw
  let verbosity = options.verbosity ?? context.verbosity ?? 'normal'

  // "shorter" / "elaborate" are not questions — they re-answer the last one at
  // a different length, and the choice sticks until it is changed again.
  const lengthCommand = SHORTER.test(raw) || LONGER.test(raw) || NORMAL_LENGTH.test(raw)
  if (lengthCommand) {
    verbosity = SHORTER.test(raw) ? 'short' : LONGER.test(raw) ? 'detailed' : 'normal'
    context.verbosity = verbosity
    if (!context.lastQuestion) {
      const promise = {
        short: 'I will keep answers short from now on.',
        detailed: 'I will give the fuller version from now on.',
        normal: 'Back to normal-length answers.',
      }[verbosity]
      return { skill: 'verbosity', score: 1, text: `${promise} Ask me something.` }
    }
    question = context.lastQuestion
  } else {
    context.lastQuestion = raw
  }

  // Re-attach the previous subject to a question that has none of its own.
  const bare = FOLLOW_UP.test(question) || PRONOUN_ONLY.test(question)
  if (bare && context.subject) {
    question = PRONOUN_ONLY.test(question) ? context.subject : `${question} of ${context.subject}`
  }

  const ctx = {
    text: question,
    original: raw,
    now: options.now ?? new Date(),
    memory: options.memory ?? { taught: [] },
    skillList: skillList(),
  }

  let best = null
  let held = now()
  for (const skill of SKILLS) {
    // A long message can keep a single skill busy for tens of milliseconds,
    // and fifteen of those back to back is a page that has stopped responding.
    // iOS does not wait politely for that — it kills the tab — and a tab killed
    // on every prompt is an app that cannot be opened at all, which is exactly
    // what was reported. Handing the thread back keeps a slow answer slow
    // instead of fatal.
    if (now() - held > YIELD_AFTER_MS) {
      await new Promise((resolve) => setTimeout(resolve))
      held = now()
    }
    let result
    try {
      result = skill.match(ctx)
    } catch (err) {
      // One broken skill must not take the assistant down with it.
      console.warn(`360 Brain: skill "${skill.id}" threw`, err)
      continue
    }
    if (!result) continue
    if (!best || result.score > best.score) best = { ...result, skill: skill.id }
  }

  if (!best || best.score < THRESHOLD) return fallback()

  // Remember what this answer was about, for the next question.
  if (best.subject) context.subject = best.subject
  else if (!bare) context.subject = raw

  return applyVerbosity(best, verbosity, lengthCommand)
}
