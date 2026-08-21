/**
 * Philippine law.
 *
 * Two ways in: by Republic Act number ("RA 9262", "republic act 10175") and by
 * topic ("13th month pay", "what are my rights when arrested"). Every answer
 * carries the disclaimer, without exception — the app has none of the facts of
 * anyone's actual case, and general information presented as advice would be
 * worse than no answer at all.
 */

import { LAW_DISCLAIMER, LAWS } from '../data/law.js'
import { canonicalise, contentWords, diceSimilarity, normalise, overlapScore } from '../nlp.js'

/** Every phrase that should reach an entry. */
const ENTRIES = LAWS.map((law) => ({
  ...law,
  phrases: [law.name, ...law.aliases].map(normalise),
}))

/** "ra 9262", "r.a. 9262", "republic act no. 9262" all give "9262". */
function raNumber(text) {
  const m = normalise(text).match(/\b(?:r\.?\s?a\.?|republic act)\s*(?:no\.?|number)?\s*(\d{3,5})\b/)
  return m ? m[1] : null
}

function scoreEntry(query, entry) {
  const words = contentWords(query)
  let best = 0
  for (const phrase of entry.phrases) {
    if (!phrase) continue
    if (query === phrase) return 1
    if (query.includes(phrase) && phrase.length > 5) best = Math.max(best, 0.95)
    best = Math.max(
      best,
      overlapScore(words, contentWords(phrase)) * 0.85,
      diceSimilarity(query, phrase) * 0.8,
    )
  }
  return best
}

const bullets = (points) => points.map((p) => `- ${p}`).join('\n')

function render(law, { short = false } = {}) {
  const body = short ? bullets(law.points.slice(0, 3)) : bullets(law.points)
  return `**${law.name}**\n\n${law.about}\n\n${body}\n\n${LAW_DISCLAIMER}`
}

export default {
  id: 'law',
  label: 'Philippine law',
  examples: [
    'what is RA 9262',
    'my rights when arrested',
    '13th month pay',
    'requirements for marriage',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = canonicalise(raw)
    const query = normalise(raw)

    /* ------------------------------------------------------- by RA number */
    const number = raNumber(raw)
    if (number) {
      const hit = ENTRIES.find((law) => law.phrases.some((p) => p.includes(`ra ${number}`)))
      if (hit) return { score: 0.97, subject: hit.name, text: render(hit) }
      return {
        score: 0.6,
        text:
          `I don't have Republic Act ${number} written into me. The laws I do know are:\n\n` +
          ENTRIES.filter((l) => /ra \d/.test(l.phrases.join(' ')))
            .map((l) => `- ${l.name}`)
            .join('\n') +
          `\n\n${LAW_DISCLAIMER}`,
      }
    }

    /* ----------------------------------------------------------- by topic */
    let best = null
    for (const law of ENTRIES) {
      const score = scoreEntry(query, law)
      if (!best || score > best.score) best = { law, score }
    }
    if (!best || best.score < 0.62) return null

    // Legal questions are asked in many shapes; a strong topic match is enough,
    // but a bare mention of a word like "marriage" should not outrank a skill
    // that has a precise answer.
    const legalContext = /\b(law|legal|rights?|ra \d|republic act|penalt|case|court|file|complaint|illegal|punish)\b/.test(s)
    const score = Math.min(0.93, best.score + (legalContext ? 0.05 : 0))

    return { score, subject: best.law.name, text: render(best.law) }
  },
}
