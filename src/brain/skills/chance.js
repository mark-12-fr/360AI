/**
 * Coin flips, dice, picking from a list, and passwords.
 *
 * Randomness comes from `crypto.getRandomValues`, not `Math.random`, because
 * the password generator lives here and there is no reason to give the rest
 * anything weaker.
 */

import { normalise } from '../nlp.js'

/** Uniform integer in [0, max) without the modulo bias. */
function randomInt(max) {
  const limit = Math.floor(0xffffffff / max) * max
  const buf = new Uint32Array(1)
  let value
  do {
    crypto.getRandomValues(buf)
    value = buf[0]
  } while (value >= limit)
  return value % max
}

const pick = (list) => list[randomInt(list.length)]

const ALPHABET = {
  lower: 'abcdefghijkmnopqrstuvwxyz',
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  digit: '23456789',
  symbol: '!@#$%^&*-_=+?',
}

function password(length, withSymbols) {
  const pools = [ALPHABET.lower, ALPHABET.upper, ALPHABET.digit]
  if (withSymbols) pools.push(ALPHABET.symbol)
  const all = pools.join('')
  // One from each pool first, so every class is actually represented.
  const chars = pools.map((p) => p[randomInt(p.length)])
  while (chars.length < length) chars.push(all[randomInt(all.length)])
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}

const T = {
  en: { heads: 'Heads', tails: 'Tails', rolled: 'Rolled', picked: 'I picked', pwd: 'Here you go — copy it now, I do not keep a copy' },
  tl: { heads: 'Heads', tails: 'Tails', rolled: 'Lumabas', picked: 'Napili ko', pwd: 'Eto — kopyahin mo na, wala akong kopya nito' },
  hil: { heads: 'Heads', tails: 'Tails', rolled: 'Nagguwa', picked: 'Ginpili ko', pwd: 'Ari — kopyaha na subong, wala ko sing kopya sini' },
}

export default {
  id: 'chance',
  label: { en: 'Dice and picks', tl: 'Dice at pili', hil: 'Dice kag pili' },
  examples: ['flip a coin', 'roll 2d6', 'pick one: adobo, sinigang, tinola', 'password 16'],

  match(ctx) {
    const t = T[ctx.lang] ?? T.en
    const s = normalise(ctx.text)

    if (/\b(flip|toss|coin|barya|pitik)\b/.test(s) && !/\bpick\b/.test(s)) {
      return { score: 0.95, text: `**${pick([t.heads, t.tails])}**` }
    }

    const dice = s.match(/\b(?:roll\s*)?(\d{0,2})\s*d\s*(\d{1,3})\b/)
    if (dice && /\b(roll|dice|die|d\d)\b/.test(s)) {
      const count = Math.min(20, Math.max(1, +(dice[1] || 1)))
      const sides = Math.min(1000, Math.max(2, +dice[2]))
      const rolls = Array.from({ length: count }, () => randomInt(sides) + 1)
      const total = rolls.reduce((a, b) => a + b, 0)
      return {
        score: 0.95,
        text:
          count === 1
            ? `**${total}** (d${sides})`
            : `**${total}** — ${t.rolled} ${count}d${sides}: ${rolls.join(', ')}`,
      }
    }

    if (/\b(random number|random)\b/.test(s) && /\d/.test(s)) {
      const range = s.match(/(-?\d+)\s*(?:to|-|and|hantod|hanggang|tubtob)\s*(-?\d+)/)
      if (range) {
        const lo = Math.min(+range[1], +range[2])
        const hi = Math.max(+range[1], +range[2])
        return { score: 0.94, text: `**${lo + randomInt(hi - lo + 1)}** (${lo}–${hi})` }
      }
    }

    if (/\b(pick|choose|pili(?:a|i)?|piliin|random(?:ly)? (?:one|pick))\b/.test(s)) {
      const after = ctx.text.replace(/^[^:]*:\s*/, '')
      const options = after
        .split(/\s*(?:,|\bor\b|\bukon\b|\bo\b)\s*/i)
        .map((x) => x.trim())
        .filter((x) => x && x.length < 60)
      if (options.length >= 2) {
        return { score: 0.93, text: `${t.picked} **${pick(options)}**.` }
      }
    }

    if (/\b(password|passwd|pin code)\b/.test(s)) {
      const len = Math.min(64, Math.max(8, Number(s.match(/\b(\d{1,2})\b/)?.[1] ?? 16)))
      const symbols = !/\b(no symbols?|letters? only|simple)\b/.test(s)
      return { score: 0.94, text: `\`${password(len, symbols)}\`\n\n${t.pwd}.` }
    }

    return null
  },
}
