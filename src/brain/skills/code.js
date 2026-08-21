/**
 * Code snippets.
 *
 * Reads a question as (language × task): "how to write a for loop in java" is
 * the same lookup as "java loop example". With a language but no task it
 * prints the whole syntax card for that language.
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

/** Phrasings that point at each task. */
const TASK_PATTERNS = [
  ['hello', /\bhello world\b|\bfirst program\b|\bprint (?:a )?(?:message|text|hello)\b/],
  ['comment', /\bcomments?\b|\bcomment syntax\b/],
  ['variables', /\bvariables?\b|\bdeclare\b|\bconstants?\b|\bdata types?\b/],
  ['condition', /\bif\b|\belse\b|\bcondition(?:al|s)?\b|\bswitch\b|\bcompare\b/],
  ['loop', /\bloops?\b|\bfor loop\b|\bwhile\b|\biterate\b|\brepeat\b|\bforeach\b/],
  ['function', /\bfunctions?\b|\bmethods?\b|\bdef\b|\bprocedure\b/],
  ['list', /\barrays?\b|\blists?\b|\bvectors?\b|\bslice\b/],
  ['map', /\b(dictionar|dict|maps?|hash ?maps?|key ?value|objects?)\b/],
  ['class', /\bclass(?:es)?\b|\bobject oriented\b|\boop\b|\bstructs?\b/],
  ['input', /\b(user )?input\b|\bread (?:from )?(?:the )?(?:user|keyboard|console)\b|\bscanner\b|\bprompt\b/],
  ['file', /\bfiles?\b|\bread a file\b|\bfile (?:handling|io|reading)\b/],
  ['fizzbuzz', /\bfizz ?buzz\b/],
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
  label: 'Code in 18 languages',
  examples: [
    'python for loop',
    'how do I read a file in Java',
    'javascript class example',
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

    const hit = findEntity(raw, KEYS, { threshold: 0.9 })
    if (!hit) return null
    const lang = LOOKUP.get(normalise(hit.name))
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
