/**
 * Arithmetic, percentages and the small statistics people actually ask for.
 *
 * The expression parser is hand-written rather than `eval`ed: user text goes
 * straight into it, and `eval` on user text in a page that holds every one of
 * the user's chats is not a trade worth making.
 */

import { extractNumbers, fmtNumber, normalise } from '../nlp.js'

/* ------------------------------------------------------------- tokeniser */

const FUNCTIONS = {
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
  ln: Math.log,
  log: Math.log10,
  log2: Math.log2,
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),
  exp: Math.exp,
}

const CONSTANTS = { pi: Math.PI, e: Math.E }

/** Words people use instead of symbols, in all three languages. */
const WORD_OPERATORS = [
  [/\b(plus|add|added to|dagdag(?:an)?|idagdag|sumahon|kag)\b/g, '+'],
  [/\b(minus|less|subtract(?:ed by)?|bawas(?:an)?|ibawas|kuhaon)\b/g, '-'],
  [/\b(times|multiplied by|multiply|beses|pilo|ipilo)\b/g, '*'],
  [/\b(divided by|divide|over|hatiin|bahinon|partihon)\b/g, '/'],
  [/\b(squared)\b/g, '^2'],
  [/\b(cubed)\b/g, '^3'],
  [/\b(to the power of|power of|sa power)\b/g, '^'],
  [/\b(square root of|root of|sqrt of|gamot sang)\b/g, 'sqrt'],
  [/\b(x)\b(?=\s*\d)/g, '*'],
]

function tokenise(expr) {
  const tokens = []
  let i = 0
  while (i < expr.length) {
    const ch = expr[i]
    if (ch === ' ') {
      i++
      continue
    }
    if (/[0-9.]/.test(ch)) {
      let j = i
      while (j < expr.length && /[0-9._,]/.test(expr[j])) j++
      const raw = expr.slice(i, j).replace(/[,_]/g, '')
      if (Number.isNaN(Number(raw))) return null
      tokens.push({ type: 'num', value: Number(raw) })
      i = j
      continue
    }
    if (/[a-z]/.test(ch)) {
      let j = i
      while (j < expr.length && /[a-z0-9]/.test(expr[j])) j++
      const word = expr.slice(i, j)
      if (FUNCTIONS[word]) tokens.push({ type: 'fn', value: word })
      else if (CONSTANTS[word] !== undefined) tokens.push({ type: 'num', value: CONSTANTS[word] })
      else return null
      i = j
      continue
    }
    if ('+-*/^%()'.includes(ch)) {
      tokens.push({ type: 'op', value: ch })
      i++
      continue
    }
    if (ch === '!') {
      tokens.push({ type: 'op', value: '!' })
      i++
      continue
    }
    return null
  }
  return tokens
}

/* ---------------------------------------------------------------- parser */

/**
 * Recursive descent over the usual precedence ladder. Returns null on anything
 * malformed rather than throwing, because "is this even maths?" is exactly the
 * question the caller is asking.
 */
function parse(tokens) {
  let pos = 0
  const peek = () => tokens[pos]
  const eat = (value) => {
    const t = peek()
    if (t && t.type === 'op' && t.value === value) {
      pos++
      return true
    }
    return false
  }

  function primary() {
    const t = peek()
    if (!t) return null
    if (t.type === 'num') {
      pos++
      return t.value
    }
    if (t.type === 'fn') {
      pos++
      const arg = eat('(') ? expression() : unary()
      if (arg === null) return null
      if (peek()?.value === ')') pos++
      return FUNCTIONS[t.value](arg)
    }
    if (eat('(')) {
      const v = expression()
      if (v === null || !eat(')')) return null
      return v
    }
    return null
  }

  /** Postfix: 5! and 20% (a bare percent is a hundredth). */
  function postfix() {
    let v = primary()
    if (v === null) return null
    for (;;) {
      if (eat('!')) {
        if (v < 0 || !Number.isInteger(v) || v > 170) return null
        let acc = 1
        for (let k = 2; k <= v; k++) acc *= k
        v = acc
      } else if (peek()?.value === '%' && !isBinaryPercent()) {
        pos++
        v = v / 100
      } else break
    }
    return v
  }

  // `%` is modulo when a value follows it, a percentage when nothing does.
  function isBinaryPercent() {
    const next = tokens[pos + 1]
    return !!next && (next.type === 'num' || next.type === 'fn' || next.value === '(')
  }

  function unary() {
    if (eat('-')) {
      const v = unary()
      return v === null ? null : -v
    }
    if (eat('+')) return unary()
    return postfix()
  }

  function power() {
    const base = unary()
    if (base === null) return null
    if (eat('^')) {
      const exp = power() // right associative
      return exp === null ? null : base ** exp
    }
    return base
  }

  function term() {
    let v = power()
    if (v === null) return null
    for (;;) {
      if (eat('*')) {
        const r = power()
        if (r === null) return null
        v *= r
      } else if (eat('/')) {
        const r = power()
        if (r === null) return null
        v /= r
      } else if (peek()?.value === '%' && isBinaryPercent()) {
        pos++
        const r = power()
        if (r === null) return null
        v %= r
      } else break
    }
    return v
  }

  function expression() {
    let v = term()
    if (v === null) return null
    for (;;) {
      if (eat('+')) {
        const r = term()
        if (r === null) return null
        v += r
      } else if (eat('-')) {
        const r = term()
        if (r === null) return null
        v -= r
      } else break
    }
    return v
  }

  const value = expression()
  if (value === null || pos !== tokens.length || !Number.isFinite(value)) return null
  return value
}

export function evaluate(expr) {
  const tokens = tokenise(expr)
  if (!tokens?.length) return null
  // A lone number is not a calculation; it is a number.
  if (tokens.length === 1 && tokens[0].type === 'num') return null
  return parse(tokens)
}

/* ----------------------------------------------------------- the skill */

const STRIP = /\b(what(?:'s| is)|how much is|compute|calculate|solve|equals?|kwenta(?:ha)?|pila|ang|is|sang|ka|please|paki)\b/g

const T = {
  en: {
    percentOf: (p, n, r) => `**${fmtNumber(r)}**\n\n${fmtNumber(p)}% of ${fmtNumber(n)} = ${fmtNumber(p / 100)} × ${fmtNumber(n)} = ${fmtNumber(r)}`,
    whatPercent: (a, b, r) => `**${fmtNumber(r)}%**\n\n${fmtNumber(a)} ÷ ${fmtNumber(b)} × 100 = ${fmtNumber(r)}%`,
    change: (from, to, pct) => `**${pct >= 0 ? '+' : ''}${fmtNumber(pct)}%**\n\nFrom ${fmtNumber(from)} to ${fmtNumber(to)} is a change of ${fmtNumber(to - from)}, which is ${fmtNumber(pct)}%.`,
    stats: 'Here is the breakdown',
    count: 'numbers',
    sum: 'Sum',
    mean: 'Average',
    median: 'Median',
    min: 'Smallest',
    max: 'Largest',
  },
  tl: {
    percentOf: (p, n, r) => `**${fmtNumber(r)}**\n\n${fmtNumber(p)}% ng ${fmtNumber(n)} = ${fmtNumber(p / 100)} × ${fmtNumber(n)} = ${fmtNumber(r)}`,
    whatPercent: (a, b, r) => `**${fmtNumber(r)}%**\n\n${fmtNumber(a)} ÷ ${fmtNumber(b)} × 100 = ${fmtNumber(r)}%`,
    change: (from, to, pct) => `**${pct >= 0 ? '+' : ''}${fmtNumber(pct)}%**\n\nMula ${fmtNumber(from)} papuntang ${fmtNumber(to)} ay ${fmtNumber(to - from)}, o ${fmtNumber(pct)}%.`,
    stats: 'Eto ang breakdown',
    count: 'na numero',
    sum: 'Kabuuan',
    mean: 'Average',
    median: 'Median',
    min: 'Pinakamaliit',
    max: 'Pinakamalaki',
  },
  hil: {
    percentOf: (p, n, r) => `**${fmtNumber(r)}**\n\n${fmtNumber(p)}% sang ${fmtNumber(n)} = ${fmtNumber(p / 100)} × ${fmtNumber(n)} = ${fmtNumber(r)}`,
    whatPercent: (a, b, r) => `**${fmtNumber(r)}%**\n\n${fmtNumber(a)} ÷ ${fmtNumber(b)} × 100 = ${fmtNumber(r)}%`,
    change: (from, to, pct) => `**${pct >= 0 ? '+' : ''}${fmtNumber(pct)}%**\n\nHalin sa ${fmtNumber(from)} pakadto sa ${fmtNumber(to)} amo ${fmtNumber(to - from)}, ukon ${fmtNumber(pct)}%.`,
    stats: 'Ari ang breakdown',
    count: 'ka numero',
    sum: 'Total',
    mean: 'Average',
    median: 'Median',
    min: 'Pinakagamay',
    max: 'Pinakadaku',
  },
}

function stats(nums, t) {
  const sorted = [...nums].sort((a, b) => a - b)
  const sum = nums.reduce((a, b) => a + b, 0)
  const mid = Math.floor(sorted.length / 2)
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  return [
    `- **${t.sum}:** ${fmtNumber(sum)}`,
    `- **${t.mean}:** ${fmtNumber(sum / nums.length)}`,
    `- **${t.median}:** ${fmtNumber(median)}`,
    `- **${t.min}:** ${fmtNumber(sorted[0])}  ·  **${t.max}:** ${fmtNumber(sorted.at(-1))}`,
  ].join('\n')
}

export default {
  id: 'math',
  label: { en: 'Maths', tl: 'Matematika', hil: 'Matematika' },
  examples: [
    '(1250 + 380) * 3',
    '17% of 4,850',
    'average of 12, 19, 7, 30',
    '15 is what percent of 240',
  ],

  match(ctx) {
    const t = T[ctx.lang] ?? T.en
    let s = normalise(ctx.text)

    // "17% of 4850", "17% sang 4850", "17 percent ng 4850"
    const pctOf = s.match(
      /(-?[\d.,]+)\s*(?:%|percent|porsyento|porsiyento)\s*(?:of|sang|ng|sa)\s*(-?[\d.,]+)/,
    )
    if (pctOf) {
      const p = Number(pctOf[1].replace(/,/g, ''))
      const n = Number(pctOf[2].replace(/,/g, ''))
      if (Number.isFinite(p) && Number.isFinite(n)) {
        return { score: 0.97, text: t.percentOf(p, n, (p / 100) * n) }
      }
    }

    // "15 is what percent of 240"
    const whatPct = s.match(
      /(-?[\d.,]+)\s*(?:is|ay|amo)?\s*(?:what|ano|pila|ilan)\s*(?:%|percent|porsyento)\s*(?:of|sang|ng|sa)\s*(-?[\d.,]+)/,
    )
    if (whatPct) {
      const a = Number(whatPct[1].replace(/,/g, ''))
      const b = Number(whatPct[2].replace(/,/g, ''))
      if (Number.isFinite(a) && Number.isFinite(b) && b !== 0) {
        return { score: 0.97, text: t.whatPercent(a, b, (a / b) * 100) }
      }
    }

    // "from 120 to 150 percent change" / "120 to 150 increase"
    const change = s.match(
      /(?:from|halin(?:\s+sa)?|mula(?:\s+sa)?)\s*(-?[\d.,]+)\s*(?:to|pakadto(?:\s+sa)?|papuntang|hangang|hanggang)\s*(-?[\d.,]+)/,
    )
    if (change && /(percent|%|porsyento|change|increase|decrease|taas|baba|dugang|kunhod)/.test(s)) {
      const from = Number(change[1].replace(/,/g, ''))
      const to = Number(change[2].replace(/,/g, ''))
      if (Number.isFinite(from) && Number.isFinite(to) && from !== 0) {
        return { score: 0.95, text: t.change(from, to, ((to - from) / from) * 100) }
      }
    }

    // "average of 3, 5, 9" and friends
    if (/\b(average|mean|sum|total|median|kabuuan|promedyo|kabilugan)\b/.test(s)) {
      const nums = extractNumbers(s)
      if (nums.length >= 2) {
        return { score: 0.9, text: `${t.stats} (${nums.length} ${t.count}):\n\n${stats(nums, t)}` }
      }
    }

    // Anything that reduces to an expression.
    for (const [re, sym] of WORD_OPERATORS) s = s.replace(re, sym)
    const expr = s
      .replace(STRIP, ' ')
      .replace(/[=?]/g, ' ')
      .replace(/\bpercent\b/g, '%')
      .replace(/[^0-9a-z.,+\-*/^%()!\s]/g, ' ')
      .trim()

    if (!/[+\-*/^%!]|sqrt|log|abs/.test(expr)) return null
    const value = evaluate(expr)
    if (value === null) return null

    const tidy = expr.replace(/\s+/g, ' ').replace(/\*/g, '×').replace(/\//g, '÷')
    return {
      score: 0.93,
      text: `**${fmtNumber(value)}**\n\n\`${tidy} = ${fmtNumber(value)}\``,
    }
  },
}
