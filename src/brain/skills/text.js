/**
 * Text tools: counting, reshaping and extractive summarising.
 *
 * The summariser scores sentences by how much of the document's own vocabulary
 * they carry and keeps the best few *in their original order*. It never writes
 * a new sentence, so it cannot invent anything — a useful property for a tool
 * that has no model behind it.
 */

import { STOPWORDS, contentWords, fmtNumber, normalise, sentences, tokenise } from '../nlp.js'

/** Pulls out the text the command applies to: after a colon, or in quotes. */
function payload(raw) {
  const colon = raw.match(/^[^:]{0,40}:\s*([\s\S]+)$/)
  if (colon) return colon[1].trim()
  const quoted = raw.match(/"([\s\S]+)"|'([\s\S]+)'/)
  if (quoted) return (quoted[1] ?? quoted[2]).trim()
  // Otherwise: everything after the command word.
  const after = raw.replace(
    /^\s*(please\s+|paki\s*|palihog\s+)?(summarise|summarize|summary( of)?|i-?summarize|count|bilang(?:a)?|uppercase|lowercase|title case|capitalize|reverse|sort|unique|slug(?:ify)?|keywords?)\b[:\s]*/i,
    '',
  )
  return after.trim()
}

function titleCase(s) {
  return s.replace(/\w[^\s]*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

function summarise(text, wanted) {
  const list = sentences(text)
  if (list.length <= wanted) return list.join(' ')

  const freq = new Map()
  for (const w of tokenise(text)) {
    if (STOPWORDS.has(w) || w.length < 3) continue
    freq.set(w, (freq.get(w) ?? 0) + 1)
  }
  const scored = list.map((sentence, index) => {
    const words = tokenise(sentence).filter((w) => !STOPWORDS.has(w) && w.length >= 3)
    const score = words.reduce((sum, w) => sum + (freq.get(w) ?? 0), 0) / (words.length || 1)
    // A small nudge for the opening sentence: it is usually the thesis.
    return { sentence, index, score: score * (index === 0 ? 1.25 : 1) }
  })
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, wanted)
    .sort((a, b) => a.index - b.index)
    .map((s) => s.sentence)
    .join(' ')
}

const T = {

  stats: 'Text stats',
  words: 'Words', chars: 'Characters', charsNoSpace: 'Characters (no spaces)',
  sentencesLabel: 'Sentences', lines: 'Lines', reading: 'Reading time',
  min: 'min', summary: 'Summary', keywords: 'Keywords', needMore: 'Give me some text to work on — put it after a colon, like `summarize: your text here`.',
  tooShort: 'That is already short enough to read as it is.',
  
}

export default {
  id: 'text',
  label: 'Text tools',
  examples: [
    'summarize: <paste a long paragraph>',
    'count words: hello world',
    'uppercase: hello world',
    'keywords: <paste some text>',
  ],

  match(ctx) {
    const t = T
    const raw = ctx.text.trim()
    const s = normalise(raw)

    const wants = (re) => re.test(s)

    if (wants(/^(summarise|summarize|summary|i-?summarize|buod|sumaryo|pamubu)\b/)) {
      const body = payload(raw)
      if (body.length < 40) return { score: 0.9, text: t.needMore }
      const list = sentences(body)
      if (list.length < 3) return { score: 0.9, text: t.tooShort }
      const wanted = Math.max(1, Math.min(4, Math.round(list.length / 3)))
      return {
        score: 0.95,
        text: `**${t.summary}** (${wanted} of ${list.length} sentences)\n\n${summarise(body, wanted)}`,
      }
    }

    if (wants(/^(count|bilanga?|ilan|pila)\b.*\b(word|character|letter|sentence|line|pulong|salita|letra)/)) {
      const body = payload(raw)
      if (!body) return { score: 0.85, text: t.needMore }
      const words = body.split(/\s+/).filter(Boolean).length
      const lines = body.split(/\n/).length
      return {
        score: 0.95,
        text:
          `**${t.stats}**\n\n` +
          `- **${t.words}:** ${fmtNumber(words)}\n` +
          `- **${t.chars}:** ${fmtNumber(body.length)}  ·  **${t.charsNoSpace}:** ${fmtNumber(body.replace(/\s/g, '').length)}\n` +
          `- **${t.sentencesLabel}:** ${fmtNumber(sentences(body).length)}  ·  **${t.lines}:** ${fmtNumber(lines)}\n` +
          `- **${t.reading}:** ~${Math.max(1, Math.round(words / 200))} ${t.min}`,
      }
    }

    if (wants(/^(keywords?|key words|mga keyword)\b/)) {
      const body = payload(raw)
      if (body.length < 20) return { score: 0.85, text: t.needMore }
      const freq = new Map()
      for (const w of contentWords(body)) freq.set(w, (freq.get(w) ?? 0) + 1)
      const top = [...freq.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 10)
      if (!top.length) return { score: 0.85, text: t.needMore }
      return {
        score: 0.94,
        text: `**${t.keywords}**\n\n${top.map(([w, n]) => `- ${w} — ${n}×`).join('\n')}`,
      }
    }

    const shapes = [
      [/^(uppercase|all caps|upper case|malaki nga letra)\b/, (b) => b.toUpperCase()],
      [/^(lowercase|lower case|gamay nga letra)\b/, (b) => b.toLowerCase()],
      [/^(title case|capitalize|capitalise)\b/, titleCase],
      [/^(reverse)\b/, (b) => [...b].reverse().join('')],
      [/^(sort lines|sort)\b/, (b) => b.split(/\n/).map((x) => x.trim()).filter(Boolean).sort().join('\n')],
      [/^(unique|dedupe|remove duplicates)\b/, (b) => [...new Set(b.split(/\n/).map((x) => x.trim()).filter(Boolean))].join('\n')],
      [/^(slug|slugify)\b/, (b) => normalise(b).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')],
    ]
    for (const [re, fn] of shapes) {
      if (wants(re)) {
        const body = payload(raw)
        if (!body) return { score: 0.85, text: t.needMore }
        return { score: 0.94, text: `\`\`\`\n${fn(body)}\n\`\`\`` }
      }
    }

    return null
  },
}
