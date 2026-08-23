/**
 * Who is… and what is a… — people and animals.
 *
 * Both are the same shape of question: name a thing, then ask one fact about
 * it or ask for the lot. So they share a skill rather than duplicating the
 * resolve-then-answer machinery twice.
 *
 * The reason this exists is blunt: "who is Jose Rizal" and "what is a carabao"
 * used to return nothing at all, which is a strange hole in something a student
 * opens. They are among the most-asked questions there are.
 */

import { ANIMALS } from '../data/animals.js'
import { PEOPLE } from '../data/people.js'
import { canonicalise, findEntity, normalise } from '../nlp.js'

/** alias → record, for both tables at once. Longest aliases win. */
function index(rows) {
  const map = new Map()
  for (const row of rows) {
    map.set(normalise(row.name), row)
    for (const alias of row.aliases) map.set(normalise(alias), row)
  }
  return map
}

const PERSON_BY = index(PEOPLE)
const ANIMAL_BY = index(ANIMALS)
const PERSON_KEYS = [...PERSON_BY.keys()]
const ANIMAL_KEYS = [...ANIMAL_BY.keys()]

/**
 * Which fact is being asked for. Null means "tell me everything", which is
 * what a bare "who is X" wants.
 */
const PERSON_FACTS = [
  ['lived', /\b(born|birth|die[ds]?|death|when did .* live|how old|age|lifespan|dates?)\b/],
  ['field', /\b(job|work|profession|occupation|field|what (?:did|does) .* do)\b/],
  ['nationality', /\b(nationality|country|where (?:is|was) .* from|filipino|where.*born)\b/],
  ['known', /\b(known for|famous for|why .* famous|contribution|achievement|discover|invent|write|wrote)\b/],
]

/**
 * Order matters. "where do penguins live" is a habitat question that happens
 * to contain "live", so habitat has to be asked about before lifespan.
 */
const ANIMAL_FACTS = [
  ['diet', /\b(eat|eats|diet|food|feed|carnivore|herbivore|omnivore)\b/],
  ['habitat', /\b(habitat|live in|lives in|found|where)\b/],
  ['lifespan', /\b(lifespan|how long|live for|years|age)\b/],
  ['group', /\b(mammal|bird|reptile|fish|insect|class|group|kind of animal)\b/],
]

function detectFact(text, table) {
  for (const [key, pattern] of table) if (pattern.test(text)) return key
  return null
}

/**
 * Only answer when the question reads as a question *about* the named thing.
 * A bare mention — "rizal park", "the year of the tiger" — is not a request for
 * a biography, and answering one would be worse than saying nothing.
 *
 * Tested against the raw question as well as the canonical one, because
 * `canonicalise` rewrites "how long" to "years" — which is helpful for reading
 * the *fact* being asked for, and would otherwise have thrown away the only
 * word marking "how long do elephants live" as a question at all.
 */
const ASKING =
  /\b(who|what|when|where|why|how|which|tell me|about|describe|info|information|sino|ano|kilala|paano)\b|^(?:is|are|was|were|does|do)\s+(?:a|an|the)?\s*\w/

function personCard(p) {
  return (
    `**${p.name}**\n\n` +
    `- **Lived:** ${p.lived}\n` +
    `- **Known as:** ${p.field}\n` +
    `- **From:** ${p.nationality}\n\n` +
    p.known
  )
}

function animalCard(a) {
  return (
    `**${a.name}**\n\n` +
    `- **Group:** ${a.group}\n` +
    `- **Diet:** ${a.diet}\n` +
    `- **Found in:** ${a.habitat}\n` +
    `- **Lifespan:** ${a.lifespan} *(in the wild)*\n\n` +
    a.fact
  )
}

const PERSON_LABEL = {
  lived: (p) => `**${p.name}** lived ${p.lived}.`,
  field: (p) => `**${p.name}** was ${/^[aeiou]/i.test(p.field) ? 'an' : 'a'} ${p.field.toLowerCase()}.`,
  nationality: (p) => `**${p.name}** was ${p.nationality}.`,
  known: (p) => `**${p.name}** — ${p.known}`,
}

const ANIMAL_LABEL = {
  diet: (a) => `**${a.name}** — ${a.diet}.`,
  lifespan: (a) => `**${a.name}** lives ${a.lifespan} in the wild.`,
  habitat: (a) => `**${a.name}** is found in ${a.habitat.toLowerCase()}.`,
  group: (a) => `**${a.name}** is a ${a.group.toLowerCase()}.`,
}

export default {
  id: 'profiles',
  label: 'People and animals',
  examples: [
    'who is Jose Rizal',
    'who was Albert Einstein',
    'what is a carabao',
    'how long do elephants live',
    'what do pandas eat',
    'when did Rizal die',
  ],

  match(ctx) {
    const s = canonicalise(ctx.text)
    if (!ASKING.test(s) && !ASKING.test(normalise(ctx.text))) return null

    const person = findEntity(ctx.text, PERSON_KEYS, { threshold: 0.92 })
    const animal = findEntity(ctx.text, ANIMAL_KEYS, { threshold: 0.92 })

    // A name is a much stronger signal than an animal word, and several people
    // here share a word with something else, so an exact hit decides it.
    const best = [person, animal].filter(Boolean).sort((a, b) => b.score - a.score)[0]
    if (!best) return null

    const isPerson = best === person && PERSON_BY.has(normalise(best.name))
    const row = isPerson ? PERSON_BY.get(normalise(best.name)) : ANIMAL_BY.get(normalise(best.name))
    if (!row) return null

    const fact = detectFact(s, isPerson ? PERSON_FACTS : ANIMAL_FACTS)
    const labels = isPerson ? PERSON_LABEL : ANIMAL_LABEL

    if (fact && labels[fact]) {
      return {
        score: best.exact ? 0.95 : 0.88,
        subject: row.name,
        text: labels[fact](row),
        detail: isPerson ? row.known : row.fact,
      }
    }

    return {
      score: best.exact ? 0.94 : 0.86,
      subject: row.name,
      text: isPerson ? personCard(row) : animalCard(row),
    }
  },
}
