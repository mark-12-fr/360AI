/**
 * Debugging and troubleshooting skill.
 *
 * Matches error messages, debugging questions, and troubleshooting requests.
 * Provides systematic solutions with clear explanations.
 */

import { TROUBLESHOOTING } from '../data/troubleshooting.js'
import { contentWords, coreQuestion, normalise, overlapScore } from '../nlp.js'

/** Scores how well a troubleshooting entry matches the query. */
function scoreEntry(query, entry) {
  const q = normalise(query)
  const words = contentWords(q)
  let best = 0
  for (const phrase of entry.q) {
    const p = normalise(phrase)
    if (!p) continue
    if (q === p) return 1
    if (q.includes(p) && p.length > 6) best = Math.max(best, 0.95)
    if (p.includes(q) && q.length > 6) best = Math.max(best, 0.85)
    const overlap = overlapScore(words, contentWords(phrase))
    const reverse = overlapScore(contentWords(phrase), words)
    best = Math.max(best, overlap * 0.7 + reverse * 0.3)
  }
  return best
}

const ERROR_PATTERNS = [
  /\b(error|bug|issue|problem|failing|broken|crash|exception|TypeError|ReferenceError|SyntaxError|Warning)\b/i,
  /\b(not working|doesn't work|won't work|can't|cannot|unable)\b/i,
  /\b(how to fix|how do i fix|fix this|solve this|resolve)\b/i,
  /\b(debug|troubleshoot|diagnose)\b/i,
]

export default {
  id: 'debug',
  label: 'Debugging and troubleshooting',
  examples: [
    'cannot read property of undefined',
    'react hooks error',
    'merge conflict git',
    'css flexbox not working',
    'hydration error nextjs',
    'how to debug code',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    // Check if this looks like a debugging/troubleshooting question
    const isErrorRelated = ERROR_PATTERNS.some(p => p.test(s))
    if (!isErrorRelated) return null

    let best = null
    for (const entry of TROUBLESHOOTING) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.35) return null

    return {
      score: Math.min(0.95, best.score),
      subject: best.entry.category,
      text: `**${best.entry.title}**\n\n${best.entry.body}`,
    }
  },
}
