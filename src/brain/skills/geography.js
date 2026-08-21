/**
 * Countries: capitals, currencies, languages, size, population, and the
 * comparisons people ask about them.
 *
 * The question is read in two independent halves — which country, and which
 * fact about it — so word order and phrasing barely matter. "japan capital",
 * "what's the capital of Japan", and "can you tell me Japan's capital city"
 * all take the same path.
 */

import { COUNTRIES, COUNTRY_ALIASES } from '../data/countries.js'
import { canonicalise, coreQuestion, findEntity, fmtNumber, normalise } from '../nlp.js'

const NAMES = COUNTRIES.map((c) => c.name)
const ALIAS_KEYS = Object.keys(COUNTRY_ALIASES)
const BY_NAME = new Map(COUNTRIES.map((c) => [normalise(c.name), c]))

function resolveCountry(text) {
  const direct = findEntity(text, NAMES)
  if (direct?.exact) return BY_NAME.get(normalise(direct.name))

  const alias = findEntity(text, ALIAS_KEYS, { threshold: 0.9 })
  if (alias?.exact) return BY_NAME.get(normalise(COUNTRY_ALIASES[alias.name]))

  // Neither matched exactly; take the better of the two fuzzy hits.
  const fuzzy = [direct, alias].filter(Boolean).sort((a, b) => b.score - a.score)[0]
  if (!fuzzy) return null
  const name = ALIAS_KEYS.includes(fuzzy.name) ? COUNTRY_ALIASES[fuzzy.name] : fuzzy.name
  return BY_NAME.get(normalise(name))
}

const CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania']

const fmtPop = (m) =>
  m >= 1 ? `${fmtNumber(Number(m.toFixed(1)))} million` : `${fmtNumber(Math.round(m * 1e6))}`

function profile(c) {
  return (
    `**${c.name}**\n\n` +
    `- **Capital:** ${c.capital}\n` +
    `- **Continent:** ${c.continent}\n` +
    `- **Currency:** ${c.currency}\n` +
    `- **Main language:** ${c.language}\n` +
    `- **Area:** ${fmtNumber(c.area)} km²\n` +
    `- **Population:** about ${fmtPop(c.population)} *(estimate)*`
  )
}

export default {
  id: 'geography',
  label: 'Countries and geography',
  examples: [
    'capital of Japan',
    'what currency does Brazil use',
    'which countries are in Europe',
    'largest country in Asia',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = canonicalise(raw)

    /* ------------------------------------------------- countries in a region */
    if (/\b(countries|nations|list)\b/.test(s)) {
      for (const continent of CONTINENTS) {
        if (s.includes(normalise(continent))) {
          const list = COUNTRIES.filter((c) => c.continent === continent)
          const names = list.map((c) => c.name).join(', ')
          return {
            score: 0.94,
            text: `**${list.length} countries in ${continent}**\n\n${names}`,
          }
        }
      }
    }

    /* ------------------------------------------------------- superlatives */
    const superlative = s.match(/\b(largest|biggest|smallest|most populous|least populous)\b/)
    if (superlative && /\b(country|countries|nation)\b/.test(s)) {
      const continent = CONTINENTS.find((c) => s.includes(normalise(c)))
      const pool = continent ? COUNTRIES.filter((c) => c.continent === continent) : COUNTRIES
      const byPopulation = /populous|population/.test(s)
      const key = byPopulation ? 'population' : 'area'
      const smallest = /smallest|least/.test(superlative[1])
      const sorted = [...pool].sort((a, b) => (smallest ? a[key] - b[key] : b[key] - a[key]))
      const top = sorted.slice(0, 5)
      const where = continent ? ` in ${continent}` : ' in the world'
      const rows = top
        .map(
          (c, i) =>
            `${i + 1}. **${c.name}** — ${
              byPopulation ? `about ${fmtPop(c.population)}` : `${fmtNumber(c.area)} km²`
            }`,
        )
        .join('\n')
      return {
        score: 0.95,
        text: `**${smallest ? 'Smallest' : 'Largest'} countries${where}** by ${
          byPopulation ? 'population' : 'area'
        }\n\n${rows}`,
      }
    }

    /* -------------------------------------------- reverse: capital → country */
    const capitalOf = s.match(/\b(capital)\b[^a-z]*(?:of|is)?\s*([a-z .'-]{3,30})/)
    if (capitalOf && /\b(which|what)\b.*\b(country|nation)\b/.test(s)) {
      const guess = capitalOf[2].trim()
      const hit = COUNTRIES.find((c) => normalise(c.capital) === normalise(guess))
      if (hit) return { score: 0.95, text: `**${hit.name}** — its capital is ${hit.capital}.` }
    }

    const country = resolveCountry(raw)
    if (!country) return null

    /* ------------------------------------------------------ one attribute */
    const confident = 0.93
    // Every single-fact answer can expand into the country's whole profile.
    const detail = profile(country)
    if (/\bcapital\b/.test(s)) {
      return { score: confident, subject: country.name, detail, text: `The capital of **${country.name}** is **${country.capital}**.` }
    }
    if (/\bcurrency\b/.test(s)) {
      return { score: confident, subject: country.name, detail, text: `**${country.name}** uses the **${country.currency}**.` }
    }
    if (/\blanguage\b/.test(s)) {
      return { score: confident, subject: country.name, detail, text: `The main language of **${country.name}** is **${country.language}**.` }
    }
    if (/\bpopulation\b/.test(s)) {
      return {
        score: confident,
        subject: country.name,
        detail,
        text: `**${country.name}** has about **${fmtPop(country.population)}** people *(estimate — populations change every year)*.`,
      }
    }
    if (/\barea\b|\bkm2\b|\bsquare (kilometers|kilometres)\b/.test(s)) {
      return { score: confident, subject: country.name, detail, text: `**${country.name}** covers **${fmtNumber(country.area)} km²**.` }
    }
    if (/\bcontinent\b|\bwhere is\b|\blocated\b/.test(s)) {
      return { score: confident, subject: country.name, detail, text: `**${country.name}** is in **${country.continent}**.` }
    }

    // The country is named but the fact asked for is not one we hold. Only
    // answer with the profile if the question was actually an open one --
    // otherwise stay quiet and let the honest fallback speak.
    const openQuestion =
      /(about|profile|info|information|details|describe|overview)/.test(s) ||
      coreQuestion(raw).replace(normalise(country.name), '').trim().length <= 3
    if (!openQuestion) return null
    return { score: 0.82, subject: country.name, text: profile(country) }
  },
}
