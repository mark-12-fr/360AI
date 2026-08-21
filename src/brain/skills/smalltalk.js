/**
 * The conversational glue: greetings, thanks, goodbyes, and the handful of
 * questions people ask an assistant before they ask it anything real.
 *
 * Scores here are deliberately below the computational skills, so "kamusta ka,
 * pila ang 5 + 5" still gets the arithmetic.
 */

import { choose, normalise } from '../nlp.js'

const GREET = /^(hi|hey|hello|yo|hoy|kumusta|kamusta|musta|maayong (?:aga|hapon|gabi-i|adlaw)|magandang (?:umaga|hapon|gabi))\b/
const THANKS = /^(thanks|thank you|ty|salamat|maraming salamat|damo gid nga salamat|daghang salamat)\b/
const BYE = /^(bye|goodbye|see you|paalam|adios|halong|amo na)\b/
const HOWAREYOU = /(how are you|kamusta ka|kumusta ka|musta ka|ok(?:ay)? ka lang|ayos ka lang)/
const JOKE = /(tell me a joke|joke|pabinat|patawa|nakakatawa)/

const HOURS = (now) => now.getHours()

const T = {

  morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
  greetTail: ['What can I do for you?', 'What do you need?', 'How can I help?'],
  thanks: ['Any time.', 'Happy to help.', 'You are welcome.'],
  bye: ['See you.', 'Take care.', 'Bye for now.'],
  how: [
    'Running fine — instantly, and entirely on your device. What do you need?',
    'All good here. No server to be slow, no bill to run up. What can I do?',
  ],
  jokes: [
    'A programmer put two glasses by the bed: a full one in case they get thirsty, and an empty one in case they do not.',
    'There are only 10 kinds of people: those who understand binary and those who do not.',
    'I would tell you a UDP joke, but you might not get it.',
  ],
  
}

export default {
  id: 'smalltalk',
  label: 'Chat',
  examples: ['hello', 'thank you', 'tell me a joke', 'how are you'],

  match(ctx) {
    const t = T
    const s = normalise(ctx.text)
    const now = ctx.now ?? new Date()

    if (JOKE.test(s)) return { score: 0.9, text: choose(t.jokes) }
    if (HOWAREYOU.test(s)) return { score: 0.9, text: choose(t.how) }

    if (GREET.test(s)) {
      const h = HOURS(now)
      const part = h < 12 ? t.morning : h < 18 ? t.afternoon : t.evening
      return { score: 0.88, text: `${part}! ${choose(t.greetTail)}` }
    }
    if (THANKS.test(s)) return { score: 0.88, text: choose(t.thanks) }
    if (BYE.test(s)) return { score: 0.88, text: choose(t.bye) }

    return null
  },
}
