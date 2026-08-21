/**
 * Adapter between the chat UI and 360 Brain.
 *
 * The UI was written against a streaming LLM, and there is no reason to change
 * that: the brain answers in well under a millisecond, so the "streaming" here
 * is purely cosmetic — the answer is typed out at reading speed because a wall
 * of text appearing instantly reads as a canned response rather than a reply.
 */

import { answer } from '../brain/index.js'

/** Characters per tick and milliseconds per tick. */
const CHUNK = 3
const TICK = 12

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
      lang: options.lang ?? 'auto',
      memory: this.memory,
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

    for (let i = 0; i < text.length; i += CHUNK) {
      if (this.aborted) break
      yield { text: text.slice(i, i + CHUNK) }
      // Punctuation gets a slightly longer beat, which is what makes it read
      // like typing rather than like a progress bar.
      const pause = /[.!?\n]/.test(text[i + CHUNK - 1] ?? '') ? TICK * 4 : TICK
      await new Promise((r) => setTimeout(r, pause))
    }

    yield {
      done: true,
      stats: {
        ms: elapsed,
        skill: result.skill,
        lang: result.lang,
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
