/**
 * 360 Brain — the whole "AI", in plain JavaScript.
 *
 * Every skill gets a look at the question and reports how confident it is that
 * the answer belongs to it. The most confident one wins; if nobody clears the
 * bar, we say so plainly instead of inventing something, which is the one
 * behaviour that separates a useful offline assistant from a liar.
 *
 * Adding knowledge is a matter of editing `facts.js`, and adding an ability is
 * a matter of dropping another module into `skills/`.
 */

import { detectLanguage } from './nlp.js'
import chance from './skills/chance.js'
import datetime from './skills/datetime.js'
import knowledge from './skills/knowledge.js'
import math from './skills/math.js'
import smalltalk from './skills/smalltalk.js'
import text from './skills/text.js'
import units from './skills/units.js'

export const SKILLS = [knowledge, math, units, datetime, text, chance, smalltalk]

/** Below this, no skill is trusted and the honest fallback runs instead. */
const THRESHOLD = 0.5

const T = {
  en: {
    canDo: 'Here is what I can do, all of it offline and instant',
    unknown: [
      "I don't know that one.",
      "That is outside what I know.",
      "I have nothing on that.",
    ],
    because:
      'I have no trained model behind me — only what is written into me and what you teach me.',
    teach: 'You can teach me the answer: **remember: <question> = <answer>**',
    tryThese: 'Things I answer well',
    empty: 'Ask me something.',
  },
  tl: {
    canDo: 'Eto ang kaya ko, lahat offline at instant',
    unknown: ['Hindi ko alam iyan.', 'Wala ako niyan.', 'Wala akong sagot diyan.'],
    because:
      'Wala akong trained na model — kung ano lang ang nakasulat sa akin at ang itinuro mo.',
    teach: 'Pwede mo akong turuan: **remember: <tanong> = <sagot>**',
    tryThese: 'Mga bagay na kaya kong sagutin',
    empty: 'Magtanong ka.',
  },
  hil: {
    canDo: 'Ari ang akon masarangan, tanan offline kag instant',
    unknown: ['Wala ko kabalo sina.', 'Indi ko ini nahibal-an.', 'Wala ako sing sabat dira.'],
    because:
      'Wala ako sing trained nga model — ang nasulat lang sa akon kag ang gintudlo mo.',
    teach: 'Pwede mo ako tudluan: **remember: <pamangkot> = <sabat>**',
    tryThese: 'Mga butang nga masabat ko gid',
    empty: 'Pamangkot lang.',
  },
}

/** The capability list, built from the skills themselves so it cannot go stale. */
export function skillList(lang = 'en') {
  const t = T[lang] ?? T.en
  const rows = SKILLS.map((s) => {
    const label = s.label?.[lang] ?? s.label?.en ?? s.id
    return `- **${label}** — e.g. \`${s.examples[0]}\``
  })
  return `${t.canDo}:\n\n${rows.join('\n')}`
}

function fallback(ctx) {
  const t = T[ctx.lang] ?? T.en
  const examples = SKILLS.flatMap((s) => s.examples.slice(0, 1))
    .map((e) => `- \`${e}\``)
    .join('\n')
  return {
    skill: 'fallback',
    score: 0,
    text:
      `${t.unknown[Math.floor(Math.random() * t.unknown.length)]} ${t.because}\n\n` +
      `${t.teach}\n\n**${t.tryThese}:**\n${examples}`,
  }
}

/**
 * Answers one question.
 *
 * `memory.taught` supplies the user's own facts; a returned `effect` asks the
 * caller to write one back, because storage is the app's job, not the brain's.
 */
export function answer(input, options = {}) {
  const raw = String(input ?? '').trim()
  const lang =
    options.lang && options.lang !== 'auto' ? options.lang : detectLanguage(raw)

  if (!raw) return { skill: 'empty', score: 1, text: (T[lang] ?? T.en).empty, lang }

  const ctx = {
    text: raw,
    lang,
    now: options.now ?? new Date(),
    memory: options.memory ?? { taught: [] },
    skillList: skillList(lang),
  }

  let best = null
  for (const skill of SKILLS) {
    let result
    try {
      result = skill.match(ctx)
    } catch (err) {
      // One broken skill must not take the assistant down with it.
      console.warn(`360 Brain: skill "${skill.id}" threw`, err)
      continue
    }
    if (!result) continue
    if (!best || result.score > best.score) best = { ...result, skill: skill.id }
  }

  if (!best || best.score < THRESHOLD) return { ...fallback(ctx), lang }
  return { ...best, lang }
}
