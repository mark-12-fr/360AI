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
/**
 * `max` is a budget, not a limit on the answer: once the distance is known to
 * exceed it the exact value stops mattering to every caller here, and the
 * matrix can be abandoned. Callers that want the true distance leave it out.
 */
export function editDistance(a, b, max = Infinity) {
  if (a === b) return 0
  if (!a.length || !b.length) return Math.max(a.length, b.length)
  // A difference in length is a lower bound on the distance, so a pair already
  // too far apart never needs a matrix built for it at all.
  if (Math.abs(a.length - b.length) > max) return max + 1

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const row = [i]
    let least = i
    for (let j = 1; j <= b.length; j++) {
      const cell = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
      row[j] = cell
      if (cell < least) least = cell
    }
    // The smallest value in a row never falls as the rows go down, so once the
    // whole row is over budget the final cell will be too.
    if (least > max) return max + 1
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
 * `similarity(a, b) >= min`, without paying for the exact score.
 *
 * Identical in outcome to comparing `similarity` against `min`, but it can
 * usually answer from the two lengths alone: reaching `min` allows at most
 * `(1 - min) x max` edits, and two strings whose lengths differ by more than
 * that cannot possibly qualify. On a long question that rejects nearly every
 * pair before any matrix is built.
 */
export function similarAtLeast(a, b, min) {
  const max = Math.max(a.length, b.length)
  if (!max) return true
  // The nudge is for binary floating point: (1 - 0.8) * 5 is 1.0000000000000002
  // here and 0.9999999999999999 elsewhere, and the floor must not follow it.
  const budget = Math.floor((1 - min) * max + 1e-9)
  if (Math.abs(a.length - b.length) > budget) return false
  return editDistance(a, b, budget) <= budget
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
      if (cand.length > 3 && t.length > 3 && similarAtLeast(t, cand, 0.8)) {
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

/* --------------------------------------------------------- understanding */

/**
 * The scaffolding people wrap a question in. Stripping it leaves the part that
 * actually identifies what they want, so "can you please tell me what the
 * capital city of japan is?" reduces to "capital city japan".
 */
const QUESTION_FRAMES = [
  /^(hey|hi|hello|ok|okay|so|um|uh|well)\b[,\s]*/,
  /^(can|could|would|will)\s+(you|u)\s+(please\s+)?(tell|give|show|explain|say)\s*(me|us)?\s*/,
  /^(do|does|did)\s+you\s+know\s*(what|who|where|when|why|how|if)?\s*/,
  /^(please|pls|paki|palihog|pakisuyo)\s+/,
  /^(i\s+(want|need|would like)\s+to\s+know\s*(what|who|where|when|why|how)?)\s*/,
  /^(tell|give|show|explain|define|describe)\s+(me|us)?\s*(about|the|a|an)?\s*/,
  /^(what|whats|what's)\s+(is|are|was|were)\s+(the|a|an)?\s*/,
  /^(what|whats|what's|who|whos|who's|where|when|why|how|which)\s+/,
  /^(ano|anong|sino|sinong|saan|kailan|bakit|paano|ilan|magkano)\s+(ang|ba|po|yung)?\s*/,
  /^(sin-o|pila|diin|san-o|ngaa|paagi)\s+(ang|bala|ka)?\s*/,
  /^(the|a|an)\s+/,
  // Additional patterns for better question understanding
  /^(i'm wondering|wondering|curious about|interested in)\s+/,
  /^(help me understand|help me with|assist me with)\s+/,
  /^(what do you know about|tell me everything about)\s+/,
  /^(how do|how does|how can|how would|how should)\s+/,
  /^(why do|why does|why is|why are|why did|why would)\s+/,
  /^(when do|when does|when is|when are|when did|when will)\s+/,
  /^(where do|where does|where is|where are|where did|where can)\s+/,
  /^(which|whom|whose)\s+/,
  /^(is it|are they|is there|are there|does it|do they)\s+/,
  /^(can i|can we|should i|should we|may i)\s+/,
]

const TRAILING = /\s*(please|pls|po|ha|thanks|thank you|salamat|ba|bala|kaya|nga|daw)\s*[?!.]*\s*$/

export function coreQuestion(text) {
  let s = normalise(text).replace(/[?!.]+$/, '')
  let changed = true
  // Frames nest ("can you tell me what is the…"), so keep peeling.
  while (changed) {
    changed = false
    for (const frame of QUESTION_FRAMES) {
      const next = s.replace(frame, '')
      if (next !== s) {
        s = next.trim()
        changed = true
      }
    }
  }
  return s.replace(TRAILING, '').trim()
}

/**
 * Words that mean the same thing to a lookup. Normalising through this map is
 * what lets "how much people live in japan", "japan population" and "populasyon
 * sang japan" all reach the same field.
 */
export const SYNONYMS = {
  'capital city': 'capital',
  'capital of': 'capital',
  kapital: 'capital',
  kabisera: 'capital',
  punong: 'capital',
  populasyon: 'population',
  people: 'population',
  inhabitants: 'population',
  residents: 'population',
  pera: 'currency',
  money: 'currency',
  salapi: 'currency',
  lenguahe: 'language',
  wika: 'language',
  languages: 'language',
  'spoken language': 'language',
  dialect: 'language',
  size: 'area',
  kadakuon: 'area',
  laki: 'area',
  'land area': 'area',
  kontinente: 'continent',
  subjects: 'subject',
  asignatura: 'subject',
  curriculum: 'subject',
  'course content': 'subject',
  trabaho: 'career',
  jobs: 'career',
  job: 'career',
  work: 'career',
  careers: 'career',
  'kahulugan': 'meaning',
  ibig: 'meaning',
  definition: 'meaning',
  define: 'meaning',
  means: 'meaning',
  duration: 'years',
  'how long': 'years',
  'how many years': 'years',
  tagal: 'years',
  // Extended synonyms for better matching
  'error fix': 'troubleshooting',
  'fix error': 'troubleshooting',
  'solve problem': 'troubleshooting',
  'not working': 'troubleshooting',
  'broken': 'troubleshooting',
  'bug fix': 'troubleshooting',
  'code explanation': 'explain',
  'explain code': 'explain',
  'how does work': 'explain',
  'how to use': 'explain',
  'what does mean': 'explain',
  'difference between': 'compare',
  'versus': 'compare',
  'vs': 'compare',
  'compared to': 'compare',
  'better than': 'compare',
  'best practice': 'pattern',
  'design pattern': 'pattern',
  'architecture': 'pattern',
  'framework': 'library',
  'library': 'framework',
  'package': 'library',
  'module': 'library',
  'mobile app': 'react native',
  'android app': 'react native',
  'ios app': 'react native',
  'web app': 'pwa',
  'progressive web': 'pwa',
  'offline app': 'pwa',
  'database query': 'sql',
  'database language': 'sql',
  'version control system': 'git',
  'code repository': 'git',
  'code review': 'review',
  'code quality': 'clean code',
  'clean code': 'refactoring',
  'code smell': 'refactoring',
  'tech stack': 'technology stack',
  'technology choice': 'technology stack',
  'which technology': 'technology stack',
  // Additional synonyms
  'grabe': 'very',
  'ngaa': 'why',
  'ngano': 'why',
  'paano': 'how',
  'diin': 'where',
  'san-o': 'when',
  'pila': 'how many',
  'sin-o': 'who',
  'ano': 'what',
  'kabalo': 'know',
  'alam': 'know',
  'hibal-an': 'knowledge',
  // More bisaya/tagalog synonyms
  'makasabat': 'answer',
  'pangkot': 'question',
  'tudlu': 'teach',
  'bal-an': 'know',
  'maayo': 'good',
  'bati': 'bad',
  'daku': 'big',
  'diot': 'small',
  'haba': 'long',
  'paspas': 'fast',
  'langas': 'annoying',
  'gwapa': 'beautiful',
  'bibo': 'energetic',
  'seryoso': 'serious',
  'katuodan': 'truth',
  'bato': 'stone',
  'tubig': 'water',
  'kalibangon': 'emergency',
  'lakat': 'walk',
  'kaon': 'eat',
  'tulog': 'sleep',
  'linong': 'smart',
  'bukon': 'but',
  'kay': 'because',
  'pwede': 'can',
  'dili': 'not',
  'indi': 'not',
  'wala': 'none',
  'daghan': 'many',
  'gamay': 'few',
  'taas': 'tall',
  'mubo': 'short',
  'bag-o': 'new',
  'daan': 'old',
  'init': 'hot',
  'bugnaw': 'cold',
  'lamian': 'delicious',
  'lami': 'tasty',
  'sakit': 'pain',
  'kaluoy': 'pity',
  'higugma': 'love',
  'sining': 'art',
  'obra': 'work of art',
  'tula': 'poem',
  'kanta': 'song',
  'dula': 'play',
  'sugilanon': 'story',
  'kahibalo': 'knowledge',
  'tuo': 'believe',
  'doubt': 'doubt',
  'hunahuna': 'think',
  'damgo': 'dream',
  'tuyo': 'goal',
  'puyo': 'live',
  'matay': 'die',
  'mabuhi': 'life',
  'kamatayon': 'death',
  'kalibutan': 'world',
  'langit': 'heaven',
  'dagat': 'sea',
  'bukid': 'mountain',
  'subay': 'follow',
  'sundon': 'follow',
  'dumuli': 'return',
  'paalam': 'goodbye',
  'kumusta': 'hello',
  'salamat': 'thank you',
  'palihug': 'please',
  'kita': 'see',
  'dungog': 'hear',
  'hikap': 'touch',
  'amoy': 'smell',
  'tilaw': 'taste',
}

/** Applies the synonym map to a whole phrase, longest key first. */
const SYNONYM_KEYS = Object.keys(SYNONYMS).sort((a, b) => b.length - a.length)

export function canonicalise(text) {
  let s = normalise(text)
  for (const key of SYNONYM_KEYS) {
    s = s.replace(new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), SYNONYMS[key])
  }
  return s
}

/**
 * Dice coefficient over character bigrams: better than edit distance for
 * multi-word names, and cheap. "philipines" vs "philippines" scores ~0.95.
 */
function bigramsOf(str) {
  const out = new Map()
  for (let i = 0; i < str.length - 1; i++) {
    const g = str.slice(i, i + 2)
    out.set(g, (out.get(g) ?? 0) + 1)
  }
  return out
}

/** The shared body, so a caller holding a prepared bigram map can skip rebuilding it. */
function diceFrom(A, aTotal, B, bTotal) {
  let hits = 0
  for (const [g, count] of A) hits += Math.min(count, B.get(g) ?? 0)
  return (2 * hits) / (aTotal + bTotal)
}

/**
 * Can two strings of these bigram counts reach `min`?
 *
 * Overlap can never exceed the smaller of the two counts, so the score is at
 * most `2 x min(a, b) / (a + b)`. Checking that first rejects nothing that
 * would have qualified, and on a long question it rejects almost everything
 * before a single bigram is counted.
 */
function diceCanReach(aTotal, bTotal, min) {
  if (aTotal < 1 || bTotal < 1) return false
  return (2 * Math.min(aTotal, bTotal)) / (aTotal + bTotal) >= min
}

export function diceSimilarity(a, b) {
  if (a === b) return 1
  if (a.length < 2 || b.length < 2) return 0
  return diceFrom(bigramsOf(a), a.length - 1, bigramsOf(b), b.length - 1)
}

/**
 * Finds which of `names` the text is talking about.
 *
 * Exact substring wins, longest first, so "south korea" is not answered as
 * "korea"; otherwise the best fuzzy match above `threshold` is used, which is
 * what carries typos like "japn" or "phillipines".
 */
/**
 * Everything about a name that does not depend on the question.
 *
 * The name lists are module-level constants shared by every question, so
 * normalising them and building their word-boundary pattern and bigram counts
 * belongs once per name, not once per name per question.
 */
const NAME_CACHE = new Map()

function preparedName(name) {
  let prepared = NAME_CACHE.get(name)
  if (!prepared) {
    const n = normalise(name)
    prepared = {
      n,
      re: n.length < 3 ? null : new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`),
      grams: n.length < 2 ? null : bigramsOf(n),
      total: n.length - 1,
    }
    NAME_CACHE.set(name, prepared)
  }
  return prepared
}

/**
 * How far into a long message the fuzzy pass looks.
 *
 * The exact pass below scans all of it, so a name spelled correctly is found
 * wherever it sits. This bounds only where a *misspelled* one is looked for,
 * and it exists because the fuzzy pass compares every name against every word
 * and adjacent word-pair: on a pasted essay that is hundreds of thousands of
 * comparisons, seconds of a frozen page, and — on a phone, where the page is
 * killed for being unresponsive — a crash rather than an answer. A question's
 * subject is in its first few dozen words. Anything longer is not a question
 * with a typo in it.
 */
const FUZZY_WORDS = 60

export function findEntity(text, names, { threshold = 0.82 } = {}) {
  const haystack = normalise(text)
  const sorted = [...names].sort((a, b) => b.length - a.length)

  for (const name of sorted) {
    const { re } = preparedName(name)
    if (re && re.test(haystack)) return { name, exact: true, score: 1 }
  }

  // Fuzzy: compare each word (and each adjacent pair of words) to every name.
  const words = haystack.split(' ').filter((w) => w.length > 2).slice(0, FUZZY_WORDS)
  const candidates = [...words]
  for (let i = 0; i < words.length - 1; i++) candidates.push(`${words[i]} ${words[i + 1]}`)

  const prepared = candidates
    .filter((c) => c.length >= 2)
    .map((c) => ({ grams: bigramsOf(c), total: c.length - 1 }))

  let best = null
  for (const name of names) {
    const { grams, total } = preparedName(name)
    if (!grams) continue
    for (const candidate of prepared) {
      // Cheapest test first: most pairs are ruled out on their lengths alone.
      if (!diceCanReach(candidate.total, total, threshold)) continue
      const score = diceFrom(candidate.grams, candidate.total, grams, total)
      if (score >= threshold && (!best || score > best.score)) best = { name, exact: false, score }
    }
  }
  return best
}
