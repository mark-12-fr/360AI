/**
 * Code snippets.
 *
 * Reads a question as (language × task): "how to write a for loop in java" is
 * the same lookup as "java loop example". With a language but no task it
 * prints the whole syntax card for that language.
 *
 * The card is long now — eighteen tasks — so the answer-length control earns
 * its keep here: say "shorter" and only the head of it comes back.
 *
 * It never claims to write code to order — a rules engine cannot — so when the
 * task is not one it holds, it says so and shows what it does have.
 */

import { LANGUAGES, TASKS } from '../data/code.js'
import { canonicalise, findEntity, normalise } from '../nlp.js'

const LOOKUP = new Map()
for (const lang of LANGUAGES) {
  LOOKUP.set(normalise(lang.name), lang)
  for (const alias of lang.aliases) LOOKUP.set(normalise(alias), lang)
}
const KEYS = [...LOOKUP.keys()]

/**
 * The short names, matched separately — and this is why "go loop" and "c loop"
 * had never worked.
 *
 * `findEntity` skips any name under three characters, deliberately: a bare
 * "in" or "as" would otherwise hit an element symbol in another skill. But it
 * takes Go, C, R and every two-letter alias with it, and those are among the
 * most-taught languages there are.
 *
 * So they are matched here instead, and only where a short word actually reads
 * as the subject: at the start ("go array"), or introduced by a preposition
 * ("a loop in c", "show me c basics"). "vitamin c" and "how to take vitamin c"
 * match neither, which is the whole point of not simply lowering the limit.
 */
const SHORT = [...LOOKUP.entries()].filter(([alias]) => alias.length < 3)

const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function findShortLanguage(text) {
  for (const [alias, lang] of SHORT) {
    const a = esc(alias)
    if (new RegExp(`^${a}\\b`).test(text) || new RegExp(`\\b(?:in|using|with|for|me)\\s+${a}\\b`).test(text)) {
      return { name: alias, lang }
    }
  }
  return null
}

/**
 * Phrasings that point at each task. **Order decides ties**, so the specific
 * ones come first: "switch" would otherwise be swallowed by the `condition`
 * pattern, and "json file" by `file`.
 */
const TASK_PATTERNS = [
  ['fizzbuzz', /\bfizz ?buzz\b/],
  ['json', /\bjson\b|\bserial(?:i[sz]e|isation|ization)\b|\bparse json\b/],
  ['datetime', /\b(date|time|timestamp|datetime|clock|today|now)\b|\bcurrent date\b/],
  ['error', /\btry ?\/? ?catch\b|\berrors?\b|\bexceptions?\b|\bhandle (?:an )?error\b|\bthrow\b|\bcrash(?:es)?\b/],
  ['switch', /\bswitch\b|\bcase statement\b|\bmatch\b|\bwhen\b/],
  ['math', /\bmaths?\b|\bmathematics\b|\brandom\b|\bsqrt\b|\bsquare root\b|\bround(?:ing)?\b|\babsolute\b|\bpower\b|\bmodulo\b/],
  ['string', /\bstrings?\b|\btext\b|\bsubstring\b|\bconcat(?:enate)?\b|\bupper ?case\b|\blower ?case\b|\bsplit\b|\bformat\b/],
  ['hello', /\bhello world\b|\bfirst program\b|\bprint (?:a )?(?:message|text|hello)\b/],
  ['comment', /\bcomments?\b|\bcomment syntax\b/],
  ['variables', /\bvariables?\b|\bdeclare\b|\bconstants?\b|\bdata types?\b/],
  ['condition', /\bif\b|\belse\b|\bcondition(?:al|s)?\b|\bcompare\b/],
  ['loop', /\bloops?\b|\bfor loop\b|\bwhile\b|\biterate\b|\brepeat\b|\bforeach\b/],
  ['function', /\bfunctions?\b|\bmethods?\b|\bdef\b|\bprocedure\b/],
  ['list', /\barrays?\b|\blists?\b|\bvectors?\b|\bslice\b/],
  ['map', /\bdictionar\w*\b|\b(dict|maps?|hash ?maps?|key ?value|objects?)\b/],
  ['class', /\bclass(?:es)?\b|\bobject oriented\b|\boop\b|\bstructs?\b/],
  ['input', /\b(user )?input\b|\bread (?:from )?(?:the )?(?:user|keyboard|console)\b|\bscanner\b|\bprompt\b/],
  ['file', /\bfiles?\b|\bread a file\b|\bfile (?:handling|io|reading)\b/],
]

const TASK_LABELS = Object.fromEntries(TASKS)

function detectTask(text) {
  for (const [task, pattern] of TASK_PATTERNS) if (pattern.test(text)) return task
  return null
}

const fence = (lang, code) => `\`\`\`${lang}\n${code}\n\`\`\``

function syntaxCard(lang) {
  const sections = TASKS.filter(([task]) => lang.snippets[task]).map(
    ([task, label]) => `**${label}**\n${fence(lang.ext, lang.snippets[task])}`,
  )
  return (
    `**${lang.name} — the basics**\n\n${lang.note}\n\n${sections.join('\n\n')}\n\n` +
    `*Ask for one on its own, e.g. "${lang.name} class example".*`
  )
}

export default {
  id: 'code',
  label: `Code in ${LANGUAGES.length} languages`,
  examples: [
    'python for loop',
    'how do I read a file in Java',
    'javascript try catch',
    'python string methods',
    'go switch statement',
    'javascript json parse',
    'show me C++ basics',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = canonicalise(raw)

    /* ------------------------------------------------- which languages? */
    if (/\b(languages?|programming)\b/.test(s) && /\b(what|which|list|all|support|know)\b/.test(s)) {
      return {
        score: 0.93,
        text:
          `**I have code for ${LANGUAGES.length} languages**\n\n` +
          LANGUAGES.map((l) => `- ${l.name}`).join('\n') +
          `\n\nFor each I can show: ${TASKS.map(([, label]) => label.toLowerCase()).join(', ')}.\n\n` +
          `*Ask like "python for loop" or "show me Java basics".*`,
      }
    }

    const short = findShortLanguage(s)
    const hit = short ? { name: short.name, exact: true, score: 1 } : findEntity(raw, KEYS, { threshold: 0.9 })
    if (!hit) return null
    const lang = short?.lang ?? LOOKUP.get(normalise(hit.name))
    if (!lang) return null

    // A bare language name in a sentence about something else is not a request
    // for code; require either an exact mention or a coding word.
    const codeContext =
      /\b(code|syntax|example|snippet|how (?:do|to)|write|program|print|declare|basics?)\b/.test(s) ||
      detectTask(s) !== null
    if (!hit.exact && !codeContext) return null

    const task = detectTask(s)

    if (task && lang.snippets[task]) {
      return {
        score: 0.95,
        subject: lang.name,
        text:
          `**${TASK_LABELS[task]} in ${lang.name}**\n\n${fence(lang.ext, lang.snippets[task])}`,
        detail: `*${lang.note}*`,
      }
    }

    if (task && !lang.snippets[task]) {
      return {
        score: 0.8,
        subject: lang.name,
        text:
          `I don't have that one for ${lang.name}. What I do have: ` +
          `${TASKS.filter(([t]) => lang.snippets[t]).map(([, label]) => label.toLowerCase()).join(', ')}.`,
      }
    }

    if (!codeContext) return null
    return { score: 0.9, subject: lang.name, text: syntaxCard(lang) }
  },
}
