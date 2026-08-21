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
import datetime from './skills/datetime.js'
import define from './skills/define.js'
import geography from './skills/geography.js'
import knowledge from './skills/knowledge.js'
import math from './skills/math.js'
import smalltalk from './skills/smalltalk.js'
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
  define,
  text,
  chance,
  smalltalk,
]

/** Below this, no skill is trusted and the honest fallback runs instead. */
const THRESHOLD = 0.5

/**
 * A question with no subject of its own — "and its capital?", "what about the
 * population?" — is answered against whatever was last asked about.
 */
const FOLLOW_UP =
  /^(?:and|what about|how about|ok(?:ay)?|then)?[,\s]*(?:what(?:'s| is| are)\s+)?(?:its|it's|their|the|his|her)?\s*(?:capital|currency|language|population|area|continent|symbol|atomic number|atomic mass|subjects?|majors?|minors?|careers?|years?|meaning|definition)\s*[?.!]*$/i

const PRONOUN_ONLY = /^\s*(and|what about|how about)?\s*(it|that|this|there|them|those)\s*[?.!]*\s*$/i

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
export function answer(input, options = {}) {
  const raw = String(input ?? '').trim()
  if (!raw) return { skill: 'empty', score: 1, text: 'Ask me something.' }

  const context = options.context ?? {}
  let question = raw

  // Re-attach the previous subject to a question that has none of its own.
  const bare = FOLLOW_UP.test(raw) || PRONOUN_ONLY.test(raw)
  if (bare && context.subject) {
    question = PRONOUN_ONLY.test(raw) ? context.subject : `${raw} of ${context.subject}`
  }

  const ctx = {
    text: question,
    original: raw,
    now: options.now ?? new Date(),
    memory: options.memory ?? { taught: [] },
    skillList: skillList(),
  }

  let best = null
  for (const skill of SKILLS) {
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

  return best
}
