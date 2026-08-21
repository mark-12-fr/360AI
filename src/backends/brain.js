/**
 * Adapter between the chat UI and 360 Brain.
 *
 * The UI was written against a streaming LLM, and there is no reason to change
 * that: the brain answers in well under a millisecond, so the "streaming" here
 * is purely cosmetic — the answer is typed out at reading speed because a wall
 * of text appearing instantly reads as a canned response rather than a reply.
 */

import { answer } from '../brain/index.js'

/**
 * Typing pace. The brain answers in under a millisecond, so this is purely
 * cosmetic — but a 900-character subject list typed three characters at a time
 * would take ten seconds, which is worse than useless. The chunk grows with the
 * answer so that nothing ever takes much more than a second and a half.
 */
const TICK = 12
const MAX_TICKS = 110
const chunkFor = (length) => Math.max(3, Math.ceil(length / MAX_TICKS))

export class BrainBackend {
  /**
   * @param memory  { taught, remember(q, a), forget(id) } — supplied by the app,
   *                because persistence is the app's job, not the brain's.
   */
  constructor(memory) {
    this.kind = 'brain'
    this.modelId = '360-brain'
    this.label = '360 Brain · JS'
    this.memory = memory
    this.aborted = false
    // Carries the last subject between turns so "and its capital?" resolves.
    this.context = {}
  }

  get ready() {
    return true
  }

  async load() {
    return { label: this.label, precision: 'js' }
  }

  /**
   * Only the last user message is used. The brain is stateless by design: a
   * rules engine that pretended to follow a thread would be guessing, and
   * guessing is the thing this whole app is built to avoid.
   */
  async *stream(messages, options = {}) {
    this.aborted = false
    const last = [...messages].reverse().find((m) => m.role === 'user')
    const started = performance.now()

    const result = answer(last?.content ?? '', {
      memory: this.memory,
      context: this.context,
      now: new Date(),
    })

    // Side effects (teaching, forgetting) are the app's to carry out.
    if (result.effect) {
      try {
        if (result.effect.type === 'remember') {
          await this.memory?.remember?.(result.effect.q, result.effect.a)
        } else if (result.effect.type === 'forget') {
          await this.memory?.forget?.(result.effect.id)
        }
      } catch (err) {
        yield { text: `\n\n⚠️ Could not save that: ${err.message}` }
      }
    }

    const elapsed = performance.now() - started
    const text = result.text ?? ''

    const chunk = chunkFor(text.length)
    for (let i = 0; i < text.length; i += chunk) {
      if (this.aborted) break

      // A hidden tab clamps setTimeout to about a second, which would stretch
      // the animation into minutes — and nobody is watching it anyway. Hand
      // over the rest in one piece instead.
      if (typeof document !== 'undefined' && document.hidden) {
        yield { text: text.slice(i) }
        break
      }

      yield { text: text.slice(i, i + chunk) }
      // Punctuation gets a slightly longer beat on short answers, which is what
      // makes them read like typing rather than like a progress bar.
      const pause = chunk <= 4 && /[.!?\n]/.test(text[i + chunk - 1] ?? '') ? TICK * 3 : TICK
      await new Promise((r) => setTimeout(r, pause))
    }

    yield {
      done: true,
      stats: {
        ms: elapsed,
        skill: result.skill,
        note: `${elapsed < 1 ? '<1' : elapsed.toFixed(0)} ms · ${result.skill}`,
      },
    }
  }

  stop() {
    this.aborted = true
  }

  async unload() {
    this.aborted = true
  }
}
