/**
 * Senior High School strands.
 *
 * Kept separate from the college-course skill because the questions look alike
 * ("subjects in STEM" vs "subjects in BSIT") but the answers come from a
 * different structure — tracks, strands, and the core every student shares.
 */

import { APPLIED_SUBJECTS, CORE_SUBJECTS, STRANDS } from '../data/strands.js'
import { canonicalise, findEntity, normalise } from '../nlp.js'

const LOOKUP = new Map()
for (const strand of STRANDS) {
  LOOKUP.set(normalise(strand.code), strand)
  LOOKUP.set(normalise(strand.name), strand)
  for (const alias of strand.aliases) LOOKUP.set(normalise(alias), strand)
}
const KEYS = [...LOOKUP.keys()]

const list = (items) => items.map((i) => `- ${i}`).join('\n')

/** Mentions of senior high, without which "STEM" might mean something else. */
const SHS_CONTEXT = /\b(strand|shs|senior high|grade 11|grade 12|track|k-?12)\b/

function overview(s) {
  return (
    `**${s.code} — ${s.name}**\n\n${s.about}\n\n` +
    `- **Track:** ${s.track}\n\n` +
    `**Specialised subjects**\n${list(s.specialized)}\n\n` +
    `**Usually leads to:** ${s.leadsTo.join(', ')}.`
  )
}

export default {
  id: 'strands',
  label: 'Senior high strands',
  examples: [
    'what is the STEM strand',
    'subjects in ABM',
    'what strands are there',
    'HUMSS leads to what course',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = canonicalise(raw)

    // A named strand wins over the catalogue: "what is the STEM strand" is a
    // question about STEM, not a request for the list of strands.
    const hit = findEntity(raw, KEYS, { threshold: 0.88 })
    const named = hit ? LOOKUP.get(normalise(hit.name)) : null

    /* ------------------------------------------------------ all the strands */
    if (!named && /\b(strands?|tracks?)\b/.test(s) && /\b(what|which|list|all|available|show|give)\b/.test(s)) {
      const byTrack = {}
      for (const strand of STRANDS) (byTrack[strand.track] ??= []).push(strand)
      const body = Object.entries(byTrack)
        .map(
          ([track, items]) =>
            `**${track} track**\n${items.map((i) => `- ${i.code} — ${i.name}`).join('\n')}`,
        )
        .join('\n\n')
      return {
        score: 0.94,
        text: `**Senior High School tracks and strands**\n\n${body}\n\n*Ask about any one — for example "subjects in STEM".*`,
      }
    }

    /* ------------------------------------------------- the shared subjects */
    const asksCore = /\b(core subjects?|common subjects?)\b/.test(s)
    const asksApplied = /\b(applied subjects?)\b/.test(s)
    if ((asksCore || asksApplied) && (SHS_CONTEXT.test(s) || /\bsenior\b/.test(s) || true)) {
      if (asksCore) {
        return {
          score: 0.93,
          text: `**SHS core subjects** — taken by every strand\n\n${list(CORE_SUBJECTS)}`,
        }
      }
      return {
        score: 0.93,
        text: `**SHS applied subjects** — same list for every strand, taught in the strand's context\n\n${list(APPLIED_SUBJECTS)}`,
      }
    }

    if (!named) return null
    const strand = named

    // "STEM" alone is ambiguous outside a school question; require a hint.
    if (!hit.exact && !SHS_CONTEXT.test(s)) return null

    const detail = overview(strand)

    if (/\bsubject\b|\bcurriculum\b|\bstudy\b|\btake\b/.test(s)) {
      return {
        score: 0.95,
        subject: strand.code,
        detail,
        text:
          `**Specialised subjects in ${strand.code}** *(${strand.name})*\n\n${list(strand.specialized)}\n\n` +
          `Every strand also takes the **core subjects** (${CORE_SUBJECTS.slice(0, 3).join(', ')}, and others) ` +
          `and the **applied subjects** — ask me for either list.`,
      }
    }

    if (/\bcollege\b|\bcourse\b|\bafter\b|\bleads?\b|\bcareer\b/.test(s)) {
      return {
        score: 0.95,
        subject: strand.code,
        detail,
        text: `**After ${strand.code}** the usual paths are: ${strand.leadsTo.join(', ')}.`,
      }
    }

    return { score: 0.9, subject: strand.code, text: overview(strand) }
  },
}
