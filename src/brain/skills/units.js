/**
 * Unit conversion.
 *
 * Every unit is stored as a factor to one base unit per dimension, so a
 * conversion is two multiplications. Temperature is the exception — it has
 * offsets, so it gets its own path.
 */

import { fmtNumber, normalise } from '../nlp.js'

/** dimension → base unit → aliases with their factor to the base. */
const UNITS = {
  length: {
    base: 'm',
    units: {
      nm: { f: 1e-9, names: ['nm', 'nanometer', 'nanometre'] },
      mm: { f: 0.001, names: ['mm', 'millimeter', 'millimetre', 'milimetro'] },
      cm: { f: 0.01, names: ['cm', 'centimeter', 'centimetre', 'sentimetro'] },
      m: { f: 1, names: ['m', 'meter', 'metre', 'metro'] },
      km: { f: 1000, names: ['km', 'kilometer', 'kilometre', 'kilometro'] },
      in: { f: 0.0254, names: ['in', 'inch', 'inches', 'pulgada'] },
      ft: { f: 0.3048, names: ['ft', 'foot', 'feet', 'talampakan'] },
      yd: { f: 0.9144, names: ['yd', 'yard', 'yards'] },
      mi: { f: 1609.344, names: ['mi', 'mile', 'miles', 'milya'] },
      nmi: { f: 1852, names: ['nmi', 'nautical mile', 'nautical miles'] },
    },
  },
  mass: {
    base: 'kg',
    units: {
      mg: { f: 1e-6, names: ['mg', 'milligram', 'milligrams'] },
      g: { f: 0.001, names: ['g', 'gram', 'grams', 'gramo'] },
      kg: { f: 1, names: ['kg', 'kilo', 'kilos', 'kilogram', 'kilograms'] },
      t: { f: 1000, names: ['t', 'tonne', 'tonnes', 'metric ton', 'tonelada'] },
      oz: { f: 0.028349523125, names: ['oz', 'ounce', 'ounces', 'onsa'] },
      lb: { f: 0.45359237, names: ['lb', 'lbs', 'pound', 'pounds', 'libra'] },
      st: { f: 6.35029318, names: ['st', 'stone', 'stones'] },
    },
  },
  volume: {
    base: 'l',
    units: {
      ml: { f: 0.001, names: ['ml', 'milliliter', 'millilitre'] },
      l: { f: 1, names: ['l', 'liter', 'litre', 'liters', 'litres', 'litro'] },
      tsp: { f: 0.00492892, names: ['tsp', 'teaspoon', 'teaspoons', 'kutsarita'] },
      tbsp: { f: 0.0147868, names: ['tbsp', 'tablespoon', 'tablespoons', 'kutsara'] },
      cup: { f: 0.236588, names: ['cup', 'cups', 'tasa'] },
      floz: { f: 0.0295735, names: ['floz', 'fl oz', 'fluid ounce', 'fluid ounces'] },
      pt: { f: 0.473176, names: ['pt', 'pint', 'pints'] },
      qt: { f: 0.946353, names: ['qt', 'quart', 'quarts'] },
      gal: { f: 3.785411784, names: ['gal', 'gallon', 'gallons', 'galon'] },
    },
  },
  data: {
    base: 'mb',
    units: {
      b: { f: 1e-6, names: ['b', 'byte', 'bytes'] },
      kb: { f: 0.001, names: ['kb', 'kilobyte', 'kilobytes'] },
      mb: { f: 1, names: ['mb', 'megabyte', 'megabytes'] },
      gb: { f: 1000, names: ['gb', 'gigabyte', 'gigabytes'] },
      tb: { f: 1e6, names: ['tb', 'terabyte', 'terabytes'] },
      kib: { f: 1024 / 1e6, names: ['kib', 'kibibyte'] },
      mib: { f: 1048576 / 1e6, names: ['mib', 'mebibyte'] },
      gib: { f: 1073741824 / 1e6, names: ['gib', 'gibibyte'] },
    },
  },
  speed: {
    base: 'kph',
    units: {
      kph: { f: 1, names: ['kph', 'kmh', 'km/h', 'kilometers per hour', 'kilometres per hour'] },
      mph: { f: 1.609344, names: ['mph', 'miles per hour', 'mi/h'] },
      mps: { f: 3.6, names: ['mps', 'm/s', 'meters per second', 'metres per second'] },
      knot: { f: 1.852, names: ['knot', 'knots', 'kn'] },
    },
  },
  area: {
    base: 'sqm',
    units: {
      sqm: { f: 1, names: ['sqm', 'm2', 'square meter', 'square meters', 'square metre', 'square metres'] },
      sqft: { f: 0.09290304, names: ['sqft', 'ft2', 'square foot', 'square feet'] },
      sqkm: { f: 1e6, names: ['sqkm', 'km2', 'square kilometer', 'square kilometers'] },
      ha: { f: 10000, names: ['ha', 'hectare', 'hectares', 'ektarya'] },
      acre: { f: 4046.8564224, names: ['acre', 'acres'] },
    },
  },
  time: {
    base: 'min',
    units: {
      ms: { f: 1 / 60000, names: ['ms', 'millisecond', 'milliseconds'] },
      s: { f: 1 / 60, names: ['s', 'sec', 'secs', 'second', 'seconds', 'segundo'] },
      min: { f: 1, names: ['min', 'mins', 'minute', 'minutes', 'minuto'] },
      h: { f: 60, names: ['h', 'hr', 'hrs', 'hour', 'hours', 'oras'] },
      d: { f: 1440, names: ['d', 'day', 'days', 'adlaw', 'araw'] },
      wk: { f: 10080, names: ['wk', 'week', 'weeks', 'semana'] },
      mo: { f: 43829.1, names: ['mo', 'month', 'months', 'bulan', 'buwan'] },
      yr: { f: 525949, names: ['yr', 'year', 'years', 'tuig', 'taon'] },
    },
  },
}

/** alias → { dim, key, factor }, longest alias first so "fl oz" beats "oz". */
const LOOKUP = new Map()
for (const [dim, group] of Object.entries(UNITS)) {
  for (const [key, unit] of Object.entries(group.units)) {
    for (const name of unit.names) LOOKUP.set(name, { dim, key, f: unit.f })
  }
}
const ALIASES = [...LOOKUP.keys()].sort((a, b) => b.length - a.length)

const TEMPERATURE = {
  c: ['c', 'celsius', 'centigrade', '°c'],
  f: ['f', 'fahrenheit', '°f'],
  k: ['k', 'kelvin'],
}

function findTemp(word) {
  for (const [key, names] of Object.entries(TEMPERATURE)) if (names.includes(word)) return key
  return null
}

function convertTemp(value, from, to) {
  const c = from === 'c' ? value : from === 'f' ? ((value - 32) * 5) / 9 : value - 273.15
  if (to === 'c') return c
  if (to === 'f') return (c * 9) / 5 + 32
  return c + 273.15
}

const TEMP_LABEL = { c: '°C', f: '°F', k: 'K' }

/** Finds the first alias that appears as a whole word after `from` index. */
function unitAt(text, startIndex) {
  const rest = text.slice(startIndex)
  for (const alias of ALIASES) {
    const re = new RegExp(`^\\s*${alias.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}\\b`)
    if (re.test(rest)) return { alias, ...LOOKUP.get(alias) }
  }
  return null
}

export default {
  id: 'units',
  label: { en: 'Conversions', tl: 'Conversion', hil: 'Conversion' },
  examples: ['5 km to miles', '30 C to F', '2.5 kg to lbs', '6 feet in cm'],

  match(ctx) {
    const s = normalise(ctx.text).replace(/°/g, ' ').replace(/\s+/g, ' ')

    // "<number> <unit> (to|in|sa|as) <unit>"
    const m = s.match(
      /(-?[\d.,]+)\s*([a-z/ ]{1,22}?)\s*(?:to|in|into|sa|as|=|->|kadto sa|pakadto sa)\s+([a-z/ ]{1,22})\b/,
    )
    if (!m) return null

    const value = Number(m[1].replace(/,/g, ''))
    if (!Number.isFinite(value)) return null

    const fromWord = m[2].trim()
    const toWord = m[3].trim().replace(/\b(please|paki|palihog)\b/, '').trim()

    const fromTemp = findTemp(fromWord)
    const toTemp = findTemp(toWord)
    if (fromTemp && toTemp) {
      const out = convertTemp(value, fromTemp, toTemp)
      return {
        score: 0.96,
        text:
          `**${fmtNumber(Number(out.toFixed(2)))}${TEMP_LABEL[toTemp]}**\n\n` +
          `${fmtNumber(value)}${TEMP_LABEL[fromTemp]} = ${fmtNumber(Number(out.toFixed(2)))}${TEMP_LABEL[toTemp]}`,
      }
    }

    const from = unitAt(fromWord, 0) ?? LOOKUP.get(fromWord)
    const to = unitAt(toWord, 0) ?? LOOKUP.get(toWord)
    if (!from || !to) return null
    if (from.dim !== to.dim) {
      return {
        score: 0.8,
        text: `Those are different kinds of unit — ${from.dim} and ${to.dim} — so they cannot be converted into each other.`,
      }
    }

    const out = (value * from.f) / to.f
    const label = to.alias ?? to.key
    return {
      score: 0.96,
      text:
        `**${fmtNumber(Number(out.toPrecision(8)))} ${label}**\n\n` +
        `${fmtNumber(value)} ${from.alias ?? from.key} = ${fmtNumber(Number(out.toPrecision(8)))} ${label}`,
    }
  },
}
