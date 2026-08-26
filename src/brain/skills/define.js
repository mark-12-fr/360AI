/**
 * Definitions, formula sheets and reference lists.
 *
 * This is the widest net in the brain: several hundred terms across science,
 * maths, computing, business, law and health, plus every "what are the…" card —
 * the formula sheets, the Philippine regions and provinces and history, and the
 * first aid. When nothing matches well enough it offers the closest terms it
 * does have, which is far more useful than a bare "I don't know".
 */

import { GLOSSARY, REFERENCE } from '../data/reference.js'
import { canonicalise, contentWords, coreQuestion, diceSimilarity, normalise, overlapScore } from '../nlp.js'

const TERMS = Object.keys(GLOSSARY)

/** Scores every glossary term against the question and returns the best few. */
function rankTerms(query) {
  const q = normalise(query)
  const words = contentWords(q)
  return TERMS.map((term) => {
    const t = normalise(term)
    let score = diceSimilarity(q, t)
    // A question containing the term outright is a much stronger signal than
    // string similarity across the whole sentence.
    if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(q)) {
      score = Math.max(score, t.includes(' ') ? 0.97 : 0.93)
    }
    score = Math.max(score, overlapScore(words, contentWords(term)) * 0.9)
    return { term, score }
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

export default {
  id: 'define',
  label: 'Definitions, formulas and reference',
  // Spread deliberately across what this skill now covers: the Skills panel is
  // the app's map of what 360 Brain knows, and four biology-and-business
  // examples hid the formula sheets and the first aid entirely.
  examples: [
    'what is photosynthesis',
    'define compound interest',
    'quadratic formula',
    'volume of a cylinder',
    'regions of the philippines',
    'philippine history timeline',
    'what to do when someone is choking',
    'what are the parts of speech',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = canonicalise(raw)
    const core = coreQuestion(raw)

    /* ------------------------------------------------------ reference lists */
    /**
     * The longest matching phrase wins, not the first one found.
     *
     * Taking the first made the answer depend on the order of the array: a card
     * listing `blood` shadowed every later card whose phrase merely contained
     * the word, so "normal blood pressure" was answered with what blood is made
     * of. It was already doing this before this file grew — "surface area
     * formulas" came back as the area-and-perimeter sheet, because "area
     * formulas" sits earlier and is a substring of it.
     *
     * Length is the right tiebreak because a longer phrase that still matches
     * is by definition the more specific one. An exact substring outranks a
     * fuzzy hit of the same length, since fuzz is the weaker evidence.
     */
    const hay = normalise(s)
    let hit = null
    for (const entry of REFERENCE) {
      for (const phrase of entry.q) {
        const p = normalise(phrase)
        if (!p) continue
        const exact = hay.includes(p)
        if (!exact && diceSimilarity(core, p) <= 0.85) continue
        const strength = exact ? p.length : p.length - 0.5
        if (!hit || strength > hit.strength) hit = { entry, strength }
      }
    }
    if (hit) return { score: 0.94, text: `**${hit.entry.title}**\n\n${hit.entry.body}` }

    /* ------------------------------------------------------------ glossary */
    const asksDefinition = /\b(meaning|what is|what are|explain|describe|tell me about|ano ang)\b/.test(s) ||
      /^[a-z\s]{3,30}$/.test(core)

    const ranked = rankTerms(core || s)
    const best = ranked[0]
    if (!best) return null

    if (best.score >= 0.8) {
      return {
        score: Math.min(0.92, best.score),
        text: `**${best.term.replace(/^\w/, (c) => c.toUpperCase())}** — ${GLOSSARY[best.term]}`,
      }
    }

    // Close but not certain: offer what it does have rather than nothing.
    if (asksDefinition && best.score >= 0.45) {
      const suggestions = ranked
        .filter((r) => r.score >= 0.4)
        .slice(0, 4)
        .map((r) => `\`${r.term}\``)
        .join(' · ')
      if (!suggestions) return null
      return {
        score: 0.52,
        text:
          `I don't have that exact term. The closest things I can explain are: ${suggestions}.\n\n` +
          `Ask for one of those, or teach me yours with **remember: <term> = <definition>**.`,
      }
    }

    return null
  },
}
