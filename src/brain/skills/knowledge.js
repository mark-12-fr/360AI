/**
 * Looking things up, and being taught.
 *
 * Two halves of the same idea: the built-in facts in facts.js and the ones the
 * user teaches are stored in the same shape and searched together, so a taught
 * answer is indistinguishable from a shipped one — except that it wins ties,
 * since the user's own knowledge should beat the factory default.
 */

import { builtinEntries } from '../facts.js'
import { contentWords, normalise, overlapScore } from '../nlp.js'

const BUILTIN = builtinEntries()

/**
 * A phrase's normalised form and content words, computed once.
 *
 * The phrases are fixed data — the same few hundred every time — but they were
 * being normalised once and tokenised *twice* on every comparison against every
 * question. With the tables at their present size that is most of the work this
 * skill does, and none of it changes between questions.
 */
const PHRASE = new Map()

function prepared(phrase) {
  let p = PHRASE.get(phrase)
  if (!p) {
    const norm = normalise(phrase)
    p = { norm, words: contentWords(phrase) }
    PHRASE.set(phrase, p)
  }
  return p
}

/**
 * How much of a question is used to score it against an entry.
 *
 * Scoring is a bag-of-words overlap, so every extra word is another pass over
 * every phrase of every entry. A question's subject is in its opening words;
 * a pasted essay's four-hundredth word is not what makes it match a card, it
 * is only what makes the match slow. Forty content words is far more than any
 * real question carries.
 */
const QUERY_WORDS = 40

/** The question, tokenised once, for scoring against many entries. */
export function queryWords(query) {
  return contentWords(query).slice(0, QUERY_WORDS)
}

/** How well `query` matches one entry, 0..1. `qWords` comes from `queryWords`. */
function scoreEntry(query, entry, qWords) {
  let best = 0
  for (const phrase of entry.q) {
    const { norm: p, words } = prepared(phrase)
    if (!p) continue
    if (query === p) return 1
    // A question that contains the whole phrasing is a strong signal.
    if (query.includes(p) && p.length > 6) best = Math.max(best, 0.95)
    if (p.includes(query) && query.length > 6) best = Math.max(best, 0.85)
    const overlap = overlapScore(qWords, words)
    const reverse = overlapScore(words, qWords)
    best = Math.max(best, overlap * 0.75 + reverse * 0.25)
  }
  return best
}

const T = {

  learned: (q) => `Got it — I will remember **${q}** from now on.`,
  forgot: (q) => `Forgotten: **${q}**.`,
  notFound: (q) => `I have nothing stored under **${q}**.`,
  nothing: 'You have not taught me anything yet. Try `remember: my wifi password = ...`',
  known: (n) => `You have taught me **${n}** thing${n === 1 ? '' : 's'}:`,
  teachHint: 'Use `remember: <question> = <answer>` to teach me.',
  from: 'you taught me this',
  
}

const TEACH = /^(?:remember|memorise|memorize|learn|tandaan|dumduma|tandaan mo|note)\b\s*[:\-]?\s*([\s\S]+)$/i
const FORGET = /^(?:forget|kalimti|kalimutan|delete|remove)\b\s*[:\-]?\s*([\s\S]+)$/i
const LIST = /^(?:what do you know|list (?:what you know|memory|facts)|ano ang nahibal-an mo|ano ang alam mo|memory|my facts)\b/i

export default {
  id: 'knowledge',
  label: 'Knowledge',
  examples: ['what is 360AI', 'remember: my wifi = kitty123', 'what do you know', 'capital of the philippines'],

  match(ctx) {
    const t = T
    const raw = ctx.text.trim()
    const query = normalise(raw)
    const taught = ctx.memory?.taught ?? []

    /* --------------------------------------------------------- teaching */
    const teach = raw.match(TEACH)
    if (teach) {
      const body = teach[1].trim()
      const split = body.match(/^([\s\S]+?)\s*(?:=|:|\bis\b|\bamo\b|\bay\b)\s*([\s\S]+)$/)
      if (!split) {
        return {
          score: 0.99,
          text: `${t.teachHint}\n\n${'For example'}: \`remember: akon numero = 0917-000-0000\``,
        }
      }
      const key = split[1].trim()
      const value = split[2].trim()
      return {
        score: 0.99,
        text: t.learned(key),
        effect: { type: 'remember', q: key, a: value },
      }
    }

    const forget = raw.match(FORGET)
    if (forget) {
      const key = normalise(forget[1])
      const hit = taught.find((e) => e.q.some((p) => normalise(p) === key)) ??
        taught.find((e) => scoreEntry(key, e, queryWords(key)) > 0.7)
      if (!hit) return { score: 0.98, text: t.notFound(forget[1].trim()) }
      return { score: 0.99, text: t.forgot(hit.q[0]), effect: { type: 'forget', id: hit.id } }
    }

    if (LIST.test(raw)) {
      if (!taught.length) return { score: 0.97, text: t.nothing }
      const list = taught.map((e) => `- **${e.q[0]}** — ${e.a}`).join('\n')
      return { score: 0.97, text: `${t.known(taught.length)}\n\n${list}` }
    }

    /* ---------------------------------------------------------- look-up */
    let best = null
    const qWords = queryWords(query)
    for (const entry of [...taught, ...BUILTIN]) {
      const score = scoreEntry(query, entry, qWords) + (entry.source === 'taught' ? 0.05 : 0)
      if (!best || score > best.score) best = { entry, score }
    }
    if (!best || best.score < 0.62) return null

    const stored = best.entry.a
    const answer = stored === 'SKILL_LIST' ? ctx.skillList ?? stored : stored
    const note = best.entry.source === 'taught' ? `\n\n*(${t.from})*` : ''
    return { score: Math.min(0.92, best.score), text: answer + note }
  },
}
