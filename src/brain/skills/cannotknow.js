/**
 * The questions an offline app must refuse rather than answer.
 *
 * "What is the weather today" used to come back "Today is Wednesday, August
 * 26, 2026" — the date skill caught the word *today* and answered a question
 * nobody asked, with full confidence. "Weather" on its own came back with the
 * geology definition of *weathering*. Neither invented a forecast, so neither
 * was a lie exactly; both were worse than silence, because a confident answer
 * to the wrong question reads as an answer to the right one.
 *
 * There is no way for this app to know today's weather, this morning's news,
 * the current price of anything, or whether a shop is open. It has no internet
 * by design. So it says that, and says what it *can* do instead — which is the
 * only honest move and, for a user deciding whether to trust the thing, the
 * more useful one.
 *
 * This scores above every other skill deliberately. Being wrong quietly is the
 * failure mode the whole app exists to avoid, and a skill that only fires on
 * questions nobody offline can answer cannot steal a question from anyone.
 */

/** Subjects that only have an answer if you can see the outside world now. */
const LIVE_SUBJECT =
  /\b(weather|forecast|rain(?:ing|fall)?|temperature outside|typhoon|storm|flood(?:ing)?|earthquake|news|headlines?|score|who won|winner|standings|price|cost|rate|stock|shares|bitcoin|crypto|exchange rate|forex|traffic|jam|delayed|schedule|showing|in stock|available)\b/

/** Words that pin a question to right now rather than to how things work. */
const RIGHT_NOW =
  /\b(now|today|tonight|tomorrow|current(?:ly)?|latest|recent(?:ly)?|this (?:morning|afternoon|evening|week|month|year)|yesterday|last (?:night|week|game|match)|so far|subong|karon|gabi-i)\b/

/**
 * Phrasings that are asking about the live world whatever else they contain.
 * Kept separate because they need no "now" word to be unmistakable.
 */
const UNMISTAKABLE =
  /\b(?:what(?:'s| is) the weather|how(?:'s| is) the weather|is it raining|will it rain|weather forecast|latest news|breaking news|who won|what(?:'s| is) the score|price of|how much is .* (?:now|today)|is .* open|are .* open|stock market)\b/

/** A bare one- or two-word query for something that is only ever live. */
const BARE_LIVE = /^(?:the )?(?:weather|forecast|news|headlines|traffic|scores?)$/

const ANSWER =
  '**I have no way to know that.** 360AI runs entirely on this device with no ' +
  'internet, so anything happening right now — the weather, the news, prices, ' +
  'scores, whether somewhere is open — is outside what I can see. I would rather ' +
  'say so than answer confidently and be wrong.\n\n' +
  'For that you need something online. What I *can* do offline is maths and ' +
  'conversions, dates and calendars, definitions and formulas, code, first aid, ' +
  'and everything you teach me.'

export default {
  id: 'cannotknow',
  label: 'Things an offline app cannot know',
  examples: ['what is the weather today', 'latest news', 'price of bitcoin'],

  match(ctx) {
    const s = ` ${String(ctx.text ?? '').toLowerCase().trim()} `

    const live =
      BARE_LIVE.test(s.trim()) ||
      UNMISTAKABLE.test(s) ||
      (LIVE_SUBJECT.test(s) && RIGHT_NOW.test(s))

    if (!live) return null

    // Above every other skill: see the note at the top of this file.
    return { score: 0.99, text: ANSWER }
  },
}
