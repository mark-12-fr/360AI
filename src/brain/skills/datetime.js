/**
 * Dates, countdowns and ages.
 *
 * Everything is computed from the device clock, so this skill is correct
 * offline and correct forever — no lookup table to go stale.
 */

import { fmtNumber, normalise } from '../nlp.js'

const MS_DAY = 86400000

const MONTHS = [
  ['january', 'jan', 'enero'],
  ['february', 'feb', 'pebrero', 'febrero'],
  ['march', 'mar', 'marso'],
  ['april', 'apr', 'abril'],
  ['may', 'mayo'],
  ['june', 'jun', 'hunyo', 'junio'],
  ['july', 'jul', 'hulyo', 'julio'],
  ['august', 'aug', 'agosto'],
  ['september', 'sep', 'sept', 'setyembre', 'septiembre'],
  ['october', 'oct', 'oktubre', 'octubre'],
  ['november', 'nov', 'nobyembre', 'noviembre'],
  ['december', 'dec', 'disyembre', 'diciembre'],
]

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function monthIndex(word) {
  const w = word.toLowerCase()
  return MONTHS.findIndex((names) => names.includes(w))
}

export function formatDate(d) {
  return `${DAY_NAMES[d.getDay()]}, ${
    MONTH_NAMES[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()}`
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

/** Whole days between two dates, ignoring the time of day and DST. */
function daysBetween(a, b) {
  return Math.round((startOfDay(b) - startOfDay(a)) / MS_DAY)
}

/**
 * The date forms people write: 2026-12-25, Dec 25 2026, 25 December,
 * 12/25/2026. Returns null when nothing parses — never a wrong guess.
 */
export function parseDate(text, now) {
  const s = normalise(text)

  const iso = s.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/)
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3])

  const monthAlt = MONTHS.flat().join('|')

  // "december 25 2026" / "dec 25" / "disyembre 25"
  const mdy = s.match(new RegExp(`\\b(${monthAlt})\\.?\\s+(\\d{1,2})(?:\\s*,?\\s*(\\d{4}))?\\b`))
  if (mdy) {
    const mi = monthIndex(mdy[1])
    const year = mdy[3] ? +mdy[3] : now.getFullYear()
    return new Date(year, mi, +mdy[2])
  }

  // "25 december 2026"
  const dmy = s.match(new RegExp(`\\b(\\d{1,2})\\s+(${monthAlt})\\.?(?:\\s*,?\\s*(\\d{4}))?\\b`))
  if (dmy) {
    const mi = monthIndex(dmy[2])
    const year = dmy[3] ? +dmy[3] : now.getFullYear()
    return new Date(year, mi, +dmy[1])
  }

  // "12/25/2026" — month first unless the first part cannot be a month.
  const slash = s.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/)
  if (slash) {
    let [, a, b, y] = slash
    const year = y.length === 2 ? 2000 + +y : +y
    let month = +a - 1
    let day = +b
    if (+a > 12) {
      month = +b - 1
      day = +a
    }
    return new Date(year, month, day)
  }

  return null
}

/** Easter Sunday, by the anonymous Gregorian algorithm. */
function easter(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

/** Occasions worth counting down to, including the Philippine holidays. */
const OCCASIONS = [
  { names: ['christmas', 'pasko', 'xmas'], label: 'Christmas', md: [11, 25] },
  { names: ['new year', 'bag-ong tuig', 'bagong taon'], label: 'New Year', md: [0, 1] },
  { names: ['valentine', "valentine's", 'araw ng puso'], label: "Valentine's Day", md: [1, 14] },
  { names: ['halloween'], label: 'Halloween', md: [9, 31] },
  { names: ['all saints', 'undas', 'todos los santos'], label: "All Saints' Day", md: [10, 1] },
  { names: ['independence day', 'araw ng kalayaan'], label: 'Independence Day (PH)', md: [5, 12] },
  { names: ['labor day', 'labour day', 'araw ng manggagawa'], label: 'Labor Day', md: [4, 1] },
  { names: ['bonifacio day'], label: 'Bonifacio Day', md: [10, 30] },
  { names: ['rizal day'], label: 'Rizal Day', md: [11, 30] },
  { names: ['araw ng kagitingan'], label: 'Araw ng Kagitingan', md: [3, 9] },
  { names: ['edsa'], label: 'EDSA People Power Anniversary', md: [1, 25] },
  { names: ['easter', 'pasko sang pagkabanhaw'], label: 'Easter Sunday', easter: true },
]

function nextOccurrence(occasion, now) {
  if (occasion.easter) {
    const thisYear = easter(now.getFullYear())
    return startOfDay(thisYear) >= startOfDay(now) ? thisYear : easter(now.getFullYear() + 1)
  }
  const [m, d] = occasion.md
  const thisYear = new Date(now.getFullYear(), m, d)
  return startOfDay(thisYear) >= startOfDay(now) ? thisYear : new Date(now.getFullYear() + 1, m, d)
}

const T = {

  today: (d) => `Today is **${d}**.`,
  time: (t, d) => `It is **${t}** — ${d}.`,
  until: (n, label, d) =>
    n === 0
      ? `**${label} is today** (${d}).`
      : `**${fmtNumber(n)} day${n === 1 ? '' : 's'}** from today until ${label} (${d}).`,
  since: (n, d) => `**${fmtNumber(n)} day${n === 1 ? '' : 's'}** since ${d}.`,
  between: (n, a, b) => `**${fmtNumber(n)} day${n === 1 ? '' : 's'}** between ${a} and ${b}.`,
  weekday: (d, name) => `${d} falls on a **${name}**.`,
  age: (y, m, dd) => `You are **${y} years old** — ${y} years, ${m} months and ${dd} days.`,
  fromNow: (n, d) => `${fmtNumber(Math.abs(n))} days from today is **${d}**.`,
  away: (n) =>
    n > 0
      ? `That is ${fmtNumber(n)} day${n === 1 ? '' : 's'} from today.`
      : `That was ${fmtNumber(-n)} day${n === -1 ? '' : 's'} ago.`,
  ago: (n, d) => `${fmtNumber(Math.abs(n))} days ago was **${d}**.`,
  
}

export default {
  id: 'datetime',
  label: 'Dates and time',
  examples: [
    'how many days until Christmas',
    'what day is December 25, 2026',
    'days between 2026-01-01 and 2026-12-25',
    'age if born May 4, 1998',
  ],

  match(ctx) {
    const t = T
    const s = normalise(ctx.text)
    const now = ctx.now ?? new Date()

    const asksTime = /\b(what time|anong oras|ano nga oras|oras subong|time (?:is it|now))\b/.test(s)
    const asksDate = /\b(what(?:'s| is)? (?:the )?date|today|petsa|ano nga adlaw subong|anong araw|adlaw subong|date today)\b/.test(s)

    if (asksTime) {
      const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
      return { score: 0.96, text: t.time(time, formatDate(now)) }
    }

    // Age: "born May 4 1998", "edad if born 1998-05-04"
    if (/\b(age|edad|tuig na|born|natawo|ipinanganak|birthday|kaadlawan)\b/.test(s)) {
      const born = parseDate(s, now)
      if (born && born <= now) {
        let years = now.getFullYear() - born.getFullYear()
        let months = now.getMonth() - born.getMonth()
        let days = now.getDate() - born.getDate()
        if (days < 0) {
          months--
          days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
        }
        if (months < 0) {
          years--
          months += 12
        }
        return { score: 0.95, text: t.age(years, months, days) }
      }
    }

    // Countdown to a named occasion.
    const wantsCountdown = /\b(until|till|til|tubtob|hangang|hanggang|countdown|how many days|pila ka adlaw|ilang araw|days to)\b/.test(s)
    if (wantsCountdown) {
      for (const occ of OCCASIONS) {
        if (occ.names.some((n) => s.includes(n))) {
          const when = nextOccurrence(occ, now)
          return {
            score: 0.96,
            text: t.until(daysBetween(now, when), occ.label, formatDate(when)),
          }
        }
      }
    }

    // Between two explicit dates.
    const twoDates = s.match(
      /(\d{4}-\d{1,2}-\d{1,2}|\d{1,2}\/\d{1,2}\/\d{2,4})\D+(\d{4}-\d{1,2}-\d{1,2}|\d{1,2}\/\d{1,2}\/\d{2,4})/,
    )
    if (twoDates) {
      const a = parseDate(twoDates[1], now)
      const b = parseDate(twoDates[2], now)
      if (a && b) {
        return {
          score: 0.95,
          text: t.between(Math.abs(daysBetween(a, b)), formatDate(a), formatDate(b)),
        }
      }
    }

    // "45 days from today" / "30 days ago"
    const offset = s.match(/(-?\d+)\s*(?:days?|adlaw|araw)\s*(from (?:now|today)|ago|halin subong|ang nagligad|nakalipas)/)
    if (offset) {
      const n = +offset[1]
      const forward = /from/.test(offset[2]) || /halin/.test(offset[2])
      const target = new Date(now.getTime() + (forward ? n : -n) * MS_DAY)
      return {
        score: 0.94,
        text: forward
          ? t.fromNow(n, formatDate(target))
          : t.ago(n, formatDate(target)),
      }
    }

    // A date on its own: what weekday, and how far away.
    const date = parseDate(s, now)
    if (date) {
      const delta = daysBetween(now, date)
      const name = DAY_NAMES[date.getDay()]
      const head = `**${name}** — ${formatDate(date)}.`
      const tail = delta === 0 ? '' : `\n\n${t.away(delta)}`
      return { score: 0.9, text: head + tail }
    }

    if (asksDate) return { score: 0.95, text: t.today(formatDate(now)) }

    return null
  },
}
