/**
 * College programs: what a degree is, how long it takes, what you study in it,
 * and where it leads.
 *
 * Curricula differ between universities, so every subject list is labelled as
 * typical rather than definitive — saying so is cheaper than being wrong.
 */

import { COURSES, GENERAL_EDUCATION } from '../data/courses.js'
import { canonicalise, findEntity, normalise } from '../nlp.js'

/** Every string that should resolve to a program. */
const LOOKUP = new Map()
for (const course of COURSES) {
  LOOKUP.set(normalise(course.code), course)
  LOOKUP.set(normalise(course.name), course)
  for (const alias of course.aliases) LOOKUP.set(normalise(alias), course)
}
const KEYS = [...LOOKUP.keys()]

const FIELDS = [...new Set(COURSES.map((c) => c.field))]

function resolveCourse(text) {
  const hit = findEntity(text, KEYS, { threshold: 0.85 })
  return hit ? LOOKUP.get(normalise(hit.name)) : null
}

const list = (items) => items.map((i) => `- ${i}`).join('\n')

function overview(c) {
  return (
    `**${c.name}**${c.code !== c.name ? ` (${c.code})` : ''}\n\n` +
    `${c.about}\n\n` +
    `- **Length:** ${c.years} years\n` +
    `- **Field:** ${c.field}\n\n` +
    `**Major subjects (typical)**\n${list(c.majors)}\n\n` +
    `**Where it leads:** ${c.careers.join(', ')}.\n\n` +
    `*Ask me for the minor subjects, or for the careers on their own.*`
  )
}

export default {
  id: 'academics',
  label: 'College courses',
  examples: [
    'what is BSIT',
    'subjects in nursing',
    'how many years is architecture',
    'what courses are there in engineering',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = canonicalise(raw)

    // Resolve the program first: "what are the major subjects in BSIT" names
    // one, and must not be read as a request for the whole catalogue.
    const course = resolveCourse(raw)

    const asksCourseList =
      !course &&
      !/\bsubjects?\b/.test(s) &&
      /\b(courses?|programs?|degrees?|majors?)\b/.test(s) &&
      /\b(what|which|list|all|available|offer|show|give)\b/.test(s)

    /* ---------------------------------------------- every course in a field */
    if (asksCourseList) {
      const field = FIELDS.find((f) => s.includes(normalise(f))) ??
        (/\bengineer/.test(s) ? 'Engineering' : null) ??
        (/\b(medical|health|nurse|doctor)\b/.test(s) ? 'Health' : null) ??
        (/\b(computer|it|tech)\b/.test(s) ? 'Computing' : null)

      const pool = field ? COURSES.filter((c) => c.field === field) : COURSES
      const grouped = {}
      for (const c of pool) (grouped[c.field] ??= []).push(c)

      const body = Object.entries(grouped)
        .map(
          ([name, items]) =>
            `**${name}**\n${items.map((c) => `- ${c.name} — ${c.years} years`).join('\n')}`,
        )
        .join('\n\n')

      return {
        score: 0.9,
        text:
          `**${pool.length} programs I know${field ? ` in ${field}` : ''}**\n\n${body}\n\n` +
          `*Ask about any one of them — for example "subjects in BSIT".*`,
      }
    }

    /* --------------------------------------------- the shared minor subjects */
    const asksMinors = /\b(minor|general education|ge subjects?|gen ed)\b/.test(s)
    if (asksMinors && !/\bmajor\b/.test(s)) {
      return {
        score: 0.92,
        text:
          `**General education subjects (the "minors")**\n\n` +
          `Every Philippine degree program shares this core, whatever the major:\n\n` +
          `${list(GENERAL_EDUCATION)}\n\n` +
          `Schools add their own — a religion or values sequence in Catholic universities, for instance.`,
      }
    }

    if (!course) return null

    const confident = 0.93
    // "elaborate" on any single fact gives the whole program overview.
    const detail = overview(course)

    if (/\byears\b|\bhow long\b|\blength\b/.test(s)) {
      return {
        score: confident,
        detail,
        text: `**${course.name}** normally takes **${course.years} years**.${
          course.code === 'MD' || course.code === 'JD'
            ? ' It is a graduate program — you need a bachelor\'s degree first.'
            : ''
        }`,
      }
    }

    if (asksMinors) {
      return {
        score: confident,
        text:
          `**Minor / general-education subjects for ${course.name}**\n\n${list(GENERAL_EDUCATION)}\n\n` +
          `The major subjects are the professional ones — ask "major subjects in ${course.code}".`,
      }
    }

    if (/\bsubject\b|\bmajor\b|\bstudy\b|\bcurriculum\b|\btake\b/.test(s)) {
      return {
        score: confident,
        detail,
        text:
          `**Major subjects in ${course.name}** *(typical — schools vary)*\n\n${list(course.majors)}\n\n` +
          `Plus the general-education core taken by every program: ${GENERAL_EDUCATION.slice(0, 4).join(', ')}, and others.`,
      }
    }

    if (/\bcareer\b|\bafter graduation\b|\bwhere.*lead\b|\bemploy\b/.test(s)) {
      return {
        score: confident,
        detail,
        text: `**After ${course.name}** you can work as: ${course.careers.join(', ')}.`,
      }
    }

    return { score: 0.88, subject: course.name, text: overview(course) }
  },
}
