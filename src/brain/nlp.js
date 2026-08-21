/**
 * The small amount of language handling every skill needs.
 *
 * There is no model here and no training data — just normalisation, number
 * parsing and a cheap similarity measure. That is enough to route a question
 * to the right skill, which is the only "understanding" 360AI claims to do.
 */

/** Strips accents, collapses whitespace, lowercases. */
export function normalise(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

export function tokenise(text) {
  return normalise(text)
    .split(/[^a-z0-9'+.-]+/)
    .filter(Boolean)
}

/**
 * Words that carry no topic information, in the three languages this app is
 * used in. Filtered out before similarity scoring so that "ano ang X" and
 * "what is X" both reduce to X.
 */
export const STOPWORDS = new Set([
  // English
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'am', 'of', 'to', 'in', 'on',
  'at', 'for', 'and', 'or', 'but', 'if', 'then', 'so', 'that', 'this', 'these', 'those',
  'it', 'its', 'do', 'does', 'did', 'can', 'could', 'would', 'should', 'will', 'my', 'your',
  'me', 'you', 'i', 'we', 'they', 'he', 'she', 'about', 'with', 'from', 'as', 'by', 'please',
  'what', 'whats', 'who', 'whos', 'how', 'why', 'when', 'where', 'which', 'tell', 'give',
  // Tagalog
  'ang', 'ng', 'mga', 'sa', 'ay', 'na', 'at', 'ko', 'mo', 'niya', 'namin', 'natin', 'nila',
  'ako', 'ikaw', 'siya', 'kami', 'tayo', 'sila', 'po', 'ba', 'yung', 'ito', 'iyan', 'nga',
  'ano', 'sino', 'paano', 'bakit', 'kailan', 'saan', 'alin', 'lang', 'naman', 'din', 'rin',
  // Hiligaynon
  'kag', 'sang', 'sing', 'ka', 'gid', 'bala', 'ni', 'kay', 'halin', 'tubtob', 'subong',
  'akon', 'imo', 'iya', 'aton', 'amon', 'inyo', 'ini', 'ina', 'ato', 'diin',
  'sin-o', 'pila', 'ngaa', 'san-o', 'amo', 'man', 'ya',
])

/**
 * Which of the three languages the user is writing in.
 *
 * Tagalog and Hiligaynon share a lot of vocabulary, so only words fairly
 * distinctive to one of them count as evidence. English is the default,
 * because it is also the fallback when nothing scores.
 */
const MARKERS = {
  hil: [
    'gid', 'bala', 'sang', 'sin-o', 'pila', 'halin', 'tubtob', 'subong', 'akon', 'imo',
    'aton', 'amon', 'kag', 'indi', 'ngaa', 'diin', 'san-o', 'kabalo', 'ari', 'karon',
    'ambot', 'daw', 'ya', 'sabta', 'sabat', 'palihog', 'himua', 'ginahimo', 'maayong',
    'kamusta', 'musta', 'ok', 'lang', 'guro', 'basi', 'tani', 'pwede',
  ],
  tl: [
    'ng', 'mga', 'ang', 'yung', 'po', 'opo', 'hindi', 'ikaw', 'kailan', 'saan', 'bakit',
    'magkano', 'ilan', 'sino', 'pakisuyo', 'paki', 'naman', 'talaga', 'kasi', 'pala',
    'ngayon', 'bukas', 'kahapon', 'gusto', 'ayaw', 'meron', 'kailangan', 'mo', 'ako',
  ],
}

export function detectLanguage(text) {
  const words = new Set(tokenise(text))
  let hil = 0
  let tl = 0
  for (const w of MARKERS.hil) if (words.has(w)) hil++
  for (const w of MARKERS.tl) if (words.has(w)) tl++
  if (hil === 0 && tl === 0) return 'en'
  if (hil > tl) return 'hil'
  if (tl > hil) return 'tl'
  // A tie means shared vocabulary only. Hiligaynon is this app's home language.
  return 'hil'
}

/**
 * Parses the numbers people actually type: "4,850", "1.5k", "2 million",
 * "1/2", and the spelled-out small ones.
 */
const WORD_NUMBERS = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, dozen: 12, twenty: 20, fifty: 50,
  hundred: 100, thousand: 1000, million: 1e6, billion: 1e9,
  isa: 1, duha: 2, tatlo: 3, apat: 4, lima: 5, anum: 6, pito: 7, walo: 8, siyam: 9,
  napulo: 10, dalawa: 2, sampu: 10, libo: 1000, milyon: 1e6,
}

const SCALES = {
  k: 1e3, m: 1e6, b: 1e9, thousand: 1e3, million: 1e6, billion: 1e9, libo: 1e3, milyon: 1e6,
}

export function parseNumber(raw) {
  if (raw == null) return null
  const s = String(raw).trim().toLowerCase().replace(/,/g, '').replace(/\s+/g, ' ')

  if (WORD_NUMBERS[s] !== undefined) return WORD_NUMBERS[s]

  const fraction = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/)
  if (fraction) return Number(fraction[1]) / Number(fraction[2])

  const scaled = s.match(/^(-?\d+(?:\.\d+)?)\s*(k|m|b|thousand|million|billion|libo|milyon)$/)
  if (scaled) return Number(scaled[1]) * SCALES[scaled[2]]

  if (/^-?\d+(?:\.\d+)?$/.test(s)) return Number(s)

  return null
}

/** Every number mentioned in a sentence, in order. */
export function extractNumbers(text) {
  const out = []
  const re = /-?\d[\d,]*(?:\.\d+)?\s*(?:k\b|m\b|b\b|thousand|million|billion|libo|milyon)?/gi
  for (const m of normalise(text).matchAll(re)) {
    const n = parseNumber(m[0])
    if (n !== null && Number.isFinite(n)) out.push(n)
  }
  return out
}

/** Levenshtein distance — used for typo tolerance on short keys. */
export function editDistance(a, b) {
  if (a === b) return 0
  if (!a.length || !b.length) return Math.max(a.length, b.length)
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const row = [i]
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    prev = row
  }
  return prev[b.length]
}

/** 0..1 similarity that tolerates a typo or two. */
export function similarity(a, b) {
  const max = Math.max(a.length, b.length)
  if (!max) return 1
  return 1 - editDistance(a, b) / max
}

/**
 * Bag-of-words overlap, with a near-miss allowance so that a plural or a typo
 * still counts. Poor man's TF-IDF, and quite enough for a knowledge base of a
 * few hundred entries.
 */
export function overlapScore(queryTokens, targetTokens) {
  const target = new Set(targetTokens)
  if (!target.size) return 0
  let hits = 0
  let total = 0
  for (const t of queryTokens) {
    if (STOPWORDS.has(t)) continue
    total++
    if (target.has(t)) {
      hits++
      continue
    }
    for (const cand of target) {
      if (cand.length > 3 && t.length > 3 && similarity(t, cand) >= 0.8) {
        hits += 0.7
        break
      }
    }
  }
  return total ? hits / total : 0
}

/** Content words only, for matching and keyword extraction. */
export function contentWords(text) {
  return tokenise(text).filter((w) => !STOPWORDS.has(w) && w.length > 1)
}

/** Splits prose into sentences, keeping their order. */
export function sentences(text) {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'“])/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Rotates through `options` so repeated answers do not read like a robot. */
export function choose(options) {
  return options[Math.floor(Math.random() * options.length)]
}

/** Thousands separators and a sane number of decimals. */
export function fmtNumber(n, maxDecimals = 6) {
  if (!Number.isFinite(n)) return String(n)
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('en-US')
  const rounded = Number(n.toPrecision(12))
  return rounded.toLocaleString('en-US', { maximumFractionDigits: maxDecimals })
}
