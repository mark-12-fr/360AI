/**
 * The periodic table, queried the way people ask about it.
 *
 * Symbols are matched only when written as their own capitalised token, so
 * "in Norway" is not read as iodine + nitrogen, and "He is here" is not helium.
 */

import { ELEMENTS } from '../data/elements.js'
import { canonicalise, findEntity, fmtNumber, normalise } from '../nlp.js'

const NAMES = ELEMENTS.map((e) => e.name)
const BY_NAME = new Map(ELEMENTS.map((e) => [normalise(e.name), e]))
const BY_SYMBOL = new Map(ELEMENTS.map((e) => [e.symbol.toLowerCase(), e]))

/** Longest first, so "post-transition metal" is not read as "transition metal". */
const CATEGORIES = [...new Set(ELEMENTS.map((e) => e.category))].sort((a, b) => b.length - a.length)

/** "noble gas" → "noble gases", "halogen" → "halogens". */
const plural = (word) => (/s$/.test(word) ? `${word}es` : `${word}s`)

/** Alternative spellings people actually type. */
const SPELLINGS = {
  aluminum: 'Aluminium',
  cesium: 'Caesium',
  sulphur: 'Sulfur',
}

function resolveElement(text) {
  const s = normalise(text)

  for (const [alt, real] of Object.entries(SPELLINGS)) {
    if (new RegExp(`\\b${alt}\\b`).test(s)) return BY_NAME.get(normalise(real))
  }

  // "element 26", "atomic number 79"
  const byNumber = s.match(/\b(?:element|atomic number|number)\s*#?\s*(\d{1,3})\b/)
  if (byNumber) {
    const found = ELEMENTS.find((e) => e.number === Number(byNumber[1]))
    if (found) return { ...found, byNumber: true }
  }

  const named = findEntity(text, NAMES, { threshold: 0.85 })
  if (named?.exact) return BY_NAME.get(normalise(named.name))

  // A symbol, written as its own token with its proper capitalisation.
  const symbolMatch = text.match(/\b([A-Z][a-z]?)\b/g) ?? []
  for (const token of symbolMatch) {
    const hit = BY_SYMBOL.get(token.toLowerCase())
    if (hit && hit.symbol === token) return hit
  }

  return named ? BY_NAME.get(normalise(named.name)) : null
}

function profile(e) {
  return (
    `**${e.name} (${e.symbol})**\n\n` +
    `- **Atomic number:** ${e.number}\n` +
    `- **Atomic mass:** ${fmtNumber(e.mass)}\n` +
    `- **Category:** ${e.category}`
  )
}

export default {
  id: 'chemistry',
  label: 'Chemistry and elements',
  examples: [
    'chemical symbol of gold',
    'atomic number of iron',
    'what is element 26',
    'list the noble gases',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = canonicalise(raw)

    const chemical = /\b(element|symbol|atomic|periodic table|noble gas|halogen|alkali|metalloid|lanthanide|actinide|transition metal)\b/.test(s)

    /* ------------------------------------------------------ whole families */
    // Plurals are handled by containment rather than by stripping suffixes:
    // "noble gases" contains "noble gas", "halogens" contains "halogen".
    const category = CATEGORIES.find((c) => s.includes(c))
    if (category && /\b(list|what|which|all|name|show)\b/.test(s)) {
      const group = ELEMENTS.filter((e) => e.category === category)
      if (group.length) {
        return {
          score: 0.94,
          text: `**The ${group.length} ${plural(category)}**\n\n${group
            .map((e) => `${e.name} (${e.symbol}, ${e.number})`)
            .join(' · ')}`,
        }
      }
    }

    const element = resolveElement(raw)
    if (!element) return null
    // A bare element name in a sentence about something else should not win.
    if (!chemical && !new RegExp(`^${normalise(element.name)}$`).test(normalise(raw))) {
      return { score: 0.6, text: profile(element) }
    }

    if (/\bsymbol\b/.test(s)) {
      return { score: 0.95, text: `The chemical symbol of **${element.name}** is **${element.symbol}**.` }
    }
    if (/\batomic number\b|\bnumber\b/.test(s)) {
      return { score: 0.95, text: `**${element.name} (${element.symbol})** has atomic number **${element.number}**.` }
    }
    if (/\b(atomic )?(mass|weight)\b/.test(s)) {
      return { score: 0.95, text: `The atomic mass of **${element.name}** is **${fmtNumber(element.mass)}**.` }
    }

    return { score: element.byNumber ? 0.96 : 0.9, subject: element.name, text: profile(element) }
  },
}
