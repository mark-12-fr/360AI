/**
 * Programming concepts and explanation skill.
 *
 * Matches questions about programming concepts, patterns, best practices,
 * and "how to" questions about web development, CS fundamentals, etc.
 */

import { PROGRAMMING_CONCEPTS } from '../data/programming.js'
import { contentWords, coreQuestion, normalise, overlapScore } from '../nlp.js'

/** Scores how well a programming concept matches the query. */
function scoreEntry(query, entry) {
  const q = normalise(query)
  const words = contentWords(q)
  let best = 0
  for (const phrase of entry.q) {
    const p = normalise(phrase)
    if (!p) continue
    if (q === p) return 1
    if (q.includes(p) && p.length > 6) best = Math.max(best, 0.95)
    if (p.includes(q) && q.length > 6) best = Math.max(best, 0.85)
    const overlap = overlapScore(words, contentWords(phrase))
    const reverse = overlapScore(contentWords(phrase), words)
    best = Math.max(best, overlap * 0.7 + reverse * 0.3)
  }
  return best
}

const CODE_EXPLAIN_PATTERNS = [
  // "what is" questions about tech
  /\b(what is|what are|explain|describe|tell me about|define)\b/i,
  // "how to" questions
  /\b(how to|how do i|how does|how can i|how should)\b/i,
  // concept questions
  /\b(concept|fundamental|basics|principle|pattern|architecture|design)\b/i,
  // best practices
  /\b(best practice|best practices|recommended|proper|correct way|proper way)\b/i,
  // specific tech
  /\b(html|css|javascript|typescript|react|next\.?js|vue|angular|node|git|npm|vite|webpack|tailwind|sass|json|rest|graphql|api|database|sql|mongodb|redis|docker|aws|netlify|vercel)\b/i,
  // CS topics
  /\b(data structure|algorithm|complexity|recursion|loop|function|class|object|variable|scope|closure|promise|async|await|hook|component|module|package|library|framework)\b/i,
  // web dev
  /\b(responsive|accessibility|a11y|seo|performance|optimization|layout|grid|flexbox|positioning)\b/i,
  // software engineering
  /\b(solid|dry|kiss|yagni|clean code|refactor|testing|debugging|version control)\b/i,
  // general knowledge patterns
  /\b(give me information|what do you know|inform me about|i want to learn|teach me about)\b/i,
  // science and math
  /\b(science|physics|chemistry|biology|math|algebra|geometry|calculus|probability|statistics)\b/i,
  // history and geography
  /\b(history|geography|continent|ocean|country|river|mountain|capital|civilization)\b/i,
  // health and business
  /\b(health|nutrition|exercise|vitamin|protein|business|marketing|investment|entrepreneurship)\b/i,
  // technology concepts
  /\b(blockchain|cryptocurrency|machine learning|artificial intelligence|quantum|5g|iot)\b/i,
  // more general patterns
  /\b(why does|why do|what causes|what happens|what is the difference|compare|contrast)\b/i,
  /\b(list|name|give examples|types of|kinds of|varieties)\b/i,
  /\b(reason|cause|effect|impact|benefit|advantage|disadvantage|pros and cons)\b/i,
  /\b(step by step|process|procedure|method|technique|approach|strategy)\b/i,
  /\b(recipe|ingredient|how to make|how to cook|how to prepare)\b/i,
  /\b(symptom|treatment|cure|prevention|remedy|remedy)\b/i,
  /\b(tip|trick|hack|shortcut|efficient|effective|better)\b/i,
  /\b(rule|law|regulation|requirement|guideline|standard)\b/i,
  /\b(definition|meaning|importance|purpose|function|role|job)\b/i,
]

export default {
  id: 'explain',
  label: 'Programming concepts and explanations',
  examples: [
    'what is react',
    'how does flexbox work',
    'explain closures in javascript',
    'css grid vs flexbox',
    'what are hooks in react',
    'nextjs server side rendering',
    'git branching strategy',
    'solid principles explained',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    // Check if this looks like a programming/concept question
    const isCodeRelated = CODE_EXPLAIN_PATTERNS.some(p => p.test(s))
    if (!isCodeRelated) return null

    let best = null
    for (const entry of PROGRAMMING_CONCEPTS) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.45) return null

    return {
      score: Math.min(0.94, best.score),
      subject: best.entry.category,
      text: `**${best.entry.title}**\n\n${best.entry.body}`,
    }
  },
}
