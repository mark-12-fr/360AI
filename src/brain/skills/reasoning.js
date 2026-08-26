/**
 * Reasoning and problem-solving skill.
 *
 * Matches questions that require logical reasoning, multi-step problem solving,
 * comparative analysis, or critical thinking.
 */

import { REASONING_EXAMPLES } from '../data/reasoning.js'
import { contentWords, coreQuestion, normalise, overlapScore } from '../nlp.js'

/** Scores how well a reasoning entry matches the query. */
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

const REASONING_PATTERNS = [
  // "why" questions often need reasoning
  /\b(why|how does|how do|explain why|explain how)\b/i,
  // comparative
  /\b(compare|difference between|versus|vs|which is better|pros and cons|trade-?offs)\b/i,
  // hypothetical
  /\b(what would happen|what if|hypothetically|suppose|imagine)\b/i,
  // logical
  /\b(if all|therefore|conclude|logic|logical|reasoning)\b/i,
  // problem solving
  /\b(how to decide|how to choose|how to approach|step by step|systematic)\b/i,
  // multi-step
  /\b(solve|problem|equation|calculate|word problem)\b/i,
  // general knowledge
  /\b(tell me about|what do you know about|describe|give me information about)\b/i,
  // cause and effect
  /\b(why is|why do|why does|cause|effect|happen|occur)\b/i,
  // when questions
  /\b(when did|when was|when were|history of)\b/i,
  // where questions
  /\b(where is|where are|where do|location|place)\b/i,
]

export default {
  id: 'reasoning',
  label: 'Reasoning and problem-solving',
  examples: [
    'if all roses are flowers do roses need water',
    'react vs vue which is better',
    'what would happen if internet stopped',
    'how to debug systematically',
    'why does ice float on water',
    'should I build MVP first',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    // Check if this looks like a reasoning question
    const isReasoningRelated = REASONING_PATTERNS.some(p => p.test(s))
    if (!isReasoningRelated) return null

    let best = null
    for (const entry of REASONING_EXAMPLES) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.4) return null

    return {
      score: Math.min(0.93, best.score),
      subject: best.entry.category,
      text: `**${best.entry.title}**\n\n${best.entry.body}`,
    }
  },
}
