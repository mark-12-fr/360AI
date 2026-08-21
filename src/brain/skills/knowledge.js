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

/** How well `query` matches one entry, 0..1. */
function scoreEntry(query, entry) {
  const qWords = contentWords(query)
  let best = 0
  for (const phrase of entry.q) {
    const p = normalise(phrase)
    if (!p) continue
    if (query === p) return 1
    // A question that contains the whole phrasing is a strong signal.
    if (query.includes(p) && p.length > 6) best = Math.max(best, 0.95)
    if (p.includes(query) && query.length > 6) best = Math.max(best, 0.85)
    const overlap = overlapScore(qWords, contentWords(phrase))
    const reverse = overlapScore(contentWords(phrase), qWords)
    best = Math.max(best, overlap * 0.75 + reverse * 0.25)
  }
  return best
}

const T = {
  en: {
    learned: (q) => `Got it — I will remember **${q}** from now on.`,
    forgot: (q) => `Forgotten: **${q}**.`,
    notFound: (q) => `I have nothing stored under **${q}**.`,
    nothing: 'You have not taught me anything yet. Try `remember: my wifi password = ...`',
    known: (n) => `You have taught me **${n}** thing${n === 1 ? '' : 's'}:`,
    teachHint: 'Use `remember: <question> = <answer>` to teach me.',
    from: 'you taught me this',
  },
  tl: {
    learned: (q) => `Tandaan ko na — **${q}** mula ngayon.`,
    forgot: (q) => `Nakalimutan ko na: **${q}**.`,
    notFound: (q) => `Wala akong nakaimbak para sa **${q}**.`,
    nothing: 'Wala ka pang itinuturo sa akin. Subukan: `remember: password ng wifi = ...`',
    known: (n) => `**${n}** bagay ang itinuro mo sa akin:`,
    teachHint: 'Gamitin ang `remember: <tanong> = <sagot>` para turuan ako.',
    from: 'itinuro mo ito sa akin',
  },
  hil: {
    learned: (q) => `Sige — dumdumon ko na ang **${q}** halin subong.`,
    forgot: (q) => `Ginkalimtan ko na: **${q}**.`,
    notFound: (q) => `Wala ako sing natago para sa **${q}**.`,
    nothing: 'Wala ka pa sing gintudlo sa akon. Tilawi: `remember: password sang wifi = ...`',
    known: (n) => `**${n}** ka butang ang gintudlo mo sa akon:`,
    teachHint: 'Gamita ang `remember: <pamangkot> = <sabat>` para tudluan ako.',
    from: 'gintudlo mo ini sa akon',
  },
}

const TEACH = /^(?:remember|memorise|memorize|learn|tandaan|dumduma|tandaan mo|note)\b\s*[:\-]?\s*([\s\S]+)$/i
const FORGET = /^(?:forget|kalimti|kalimutan|delete|remove)\b\s*[:\-]?\s*([\s\S]+)$/i
const LIST = /^(?:what do you know|list (?:what you know|memory|facts)|ano ang nahibal-an mo|ano ang alam mo|memory|my facts)\b/i

export default {
  id: 'knowledge',
  label: { en: 'Knowledge', tl: 'Kaalaman', hil: 'Kinaalam' },
  examples: ['what is 360AI', 'remember: my wifi = kitty123', 'what do you know', 'capital of the philippines'],

  match(ctx) {
    const t = T[ctx.lang] ?? T.en
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
          text: `${t.teachHint}\n\n${ctx.lang === 'en' ? 'For example' : 'Halimbawa'}: \`remember: akon numero = 0917-000-0000\``,
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
        taught.find((e) => scoreEntry(key, e) > 0.7)
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
    for (const entry of [...taught, ...BUILTIN]) {
      const score = scoreEntry(query, entry) + (entry.source === 'taught' ? 0.05 : 0)
      if (!best || score > best.score) best = { entry, score }
    }
    if (!best || best.score < 0.62) return null

    // An entry's answer may be a plain string or one string per language.
    const stored = best.entry.a
    const localised = typeof stored === 'string' ? stored : stored[ctx.lang] ?? stored.en
    const answer = localised === 'SKILL_LIST' ? ctx.skillList ?? localised : localised
    const note = best.entry.source === 'taught' ? `\n\n*(${t.from})*` : ''
    return { score: Math.min(0.92, best.score), text: answer + note }
  },
}
