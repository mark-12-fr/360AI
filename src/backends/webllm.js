import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm'
import { cachedVariant, pickVariant, probeGPU } from '../models.js'

/**
 * The downloaded-model backend.
 *
 * Weights are fetched once from the MLC CDN and then live in the browser's
 * Cache Storage, so every launch after the first is fully offline — which is
 * the whole reason this path exists alongside 360 Brain. Nothing is ever sent
 * anywhere: the model runs on this device's GPU through WebGPU.
 */

/**
 * Who the model thinks it is. Small models drift badly without this — a 1B
 * asked "what are you?" will happily claim to be ChatGPT with a knowledge
 * cutoff and a moderation team, none of which is true here.
 */
const IDENTITY =
  'You are 360AI, a helpful assistant running entirely on the user\'s own device — ' +
  'their phone, tablet or computer. You were downloaded once and now work with no ' +
  'internet connection, no account and no server. Nothing the user types leaves ' +
  'their device.\n' +
  'Answer in the same language the user writes in. Be direct and concrete. ' +
  'If you do not know something, say so plainly rather than inventing it, and never ' +
  'claim to have looked anything up — you have no way to.'

const LENGTH_RULE = {
  short: 'Keep answers to a few sentences unless asked for more.',
  normal: 'Match the length of your answer to the question.',
  detailed: 'Give thorough answers, with the reasoning and the examples spelled out.',
}

/** Added for a vision model, so it describes what is there rather than what it expects. */
const SIGHT_RULE =
  'You can see pictures the user attaches. Describe only what is actually visible, ' +
  'read any text in the image exactly as written, and say when the picture is too ' +
  'blurred or cropped to tell.'

/**
 * Turns one of our messages into the shape WebLLM wants.
 *
 * Array content is a vision-model-only feature: sending it to a text model
 * throws `UserMessageContentErrorForNonVLM` inside the worker, which surfaces
 * as an opaque failure a long way from the picture that caused it. So the
 * decision is made here, once, from what is actually loaded.
 *
 * `keepImages` is false for every turn but the newest. Phi-3.5 Vision has a
 * 4096-token window and one embedded image fills most of it, so carrying the
 * pictures of a whole conversation forward would push out the question being
 * asked. Older turns keep a note that a picture was there instead.
 */
function toWebLLM(message, { canSee, keepImages }) {
  const images = message.images ?? []
  if (message.role !== 'user' || !images.length) {
    return { role: message.role, content: message.content }
  }

  if (canSee && keepImages) {
    // At most one text part per message, which is WebLLM's rule, not ours.
    const parts = images.map((img) => ({ type: 'image_url', image_url: { url: img.url } }))
    parts.push({ type: 'text', text: message.content?.trim() || 'What is in this picture?' })
    return { role: message.role, content: parts }
  }

  const count = `${images.length} picture${images.length === 1 ? '' : 's'}`
  const note = canSee
    ? `[${count} from earlier in this conversation, no longer in view.]`
    : `[The user attached ${count}. You cannot see ${images.length === 1 ? 'it' : 'them'}; ` +
      'say so plainly rather than describing what you imagine is there.]'
  return { role: message.role, content: `${message.content ?? ''}\n\n${note}`.trim() }
}

/** Raised when the user cancels a download; the caller treats it as routine. */
export class LoadCancelled extends Error {
  constructor() {
    super('Download cancelled.')
    this.name = 'LoadCancelled'
  }
}

export class WebLLMBackend {
  constructor() {
    this.kind = 'webllm'
    this.engine = null
    this.worker = null
    this.entry = null
    this.modelId = null
    this.label = ''
    this.precision = null
    this.rejectLoad = null
  }

  get ready() {
    return this.engine !== null
  }

  /**
   * Downloads (first time) and loads `entry`, reporting `{ progress, text }`.
   *
   * The build is chosen from the adapter's real feature set, except where the
   * other build is already on disk — re-downloading two gigabytes to gain the
   * f16 path would be a poor trade for a user who has already waited once.
   */
  async load(entry, onProgress) {
    const gpu = await probeGPU()
    if (!gpu.ok) throw new Error(gpu.reason)

    const onDisk = await cachedVariant(entry)
    const variant = onDisk ?? pickVariant(entry, gpu)

    // A cached f16 build is unusable without the feature; fall back and let it
    // download rather than failing with a shader-compilation error.
    const usable = variant.precision === 'f16' && !gpu.f16 ? pickVariant(entry, gpu) : variant

    // Reuse the worker across model swaps — spawning one costs a fresh module
    // parse, and reload() already tears the old model off the GPU.
    try {
      this.worker ??= new Worker(new URL('../llm-worker.js', import.meta.url), { type: 'module' })
    } catch (err) {
      throw new Error(`This browser could not start the model worker: ${err.message}`)
    }

    // Terminating the worker mid-load leaves WebLLM's promise pending forever,
    // so cancellation is a race rather than an abort.
    const cancelled = new Promise((_, reject) => {
      this.rejectLoad = () => reject(new LoadCancelled())
    })

    const report = (r) =>
      onProgress?.({
        progress: typeof r.progress === 'number' ? r.progress : 0,
        text: r.text ?? '',
      })

    try {
      if (this.engine) {
        report({ progress: 0, text: `Switching to ${entry.name}…` })
        await Promise.race([this.engine.reload(usable.model), cancelled])
      } else {
        this.engine = await Promise.race([
          CreateWebWorkerMLCEngine(this.worker, usable.model, {
            initProgressCallback: report,
          }),
          cancelled,
        ])
      }
    } catch (err) {
      if (err instanceof LoadCancelled) this.#teardownWorker()
      throw err
    } finally {
      this.rejectLoad = null
    }

    this.entry = entry
    this.modelId = usable.model
    this.precision = usable.precision
    this.label = entry.name
    return { label: this.label, precision: usable.precision }
  }

  /** Aborts a download in flight. Bytes already fetched stay cached. */
  cancelLoad() {
    this.rejectLoad?.()
  }

  #teardownWorker() {
    this.worker?.terminate()
    this.worker = null
    this.engine = null
    this.modelId = null
    this.entry = null
  }

  /** True when the loaded model can actually read an attached picture. */
  get canSee() {
    return this.entry?.vision === true
  }

  /** Yields `{ text }` deltas, then one `{ done, stats }`. */
  async *stream(messages, { temperature = 0.7, verbosity = 'normal' } = {}) {
    if (!this.engine) throw new Error('No model is loaded yet.')

    const canSee = this.canSee
    const system = {
      role: 'system',
      content: [IDENTITY, canSee ? SIGHT_RULE : null, LENGTH_RULE[verbosity] ?? LENGTH_RULE.normal]
        .filter(Boolean)
        .join('\n'),
    }

    const history = messages.filter((m) => m.role !== 'system')
    const newest = history.reduce((at, m, i) => (m.images?.length ? i : at), -1)

    const chunks = await this.engine.chat.completions.create({
      messages: [
        system,
        ...history.map((m, i) => toWebLLM(m, { canSee, keepImages: i === newest })),
      ],
      stream: true,
      temperature,
      stream_options: { include_usage: true },
    })

    for await (const chunk of chunks) {
      const delta = chunk.choices?.[0]?.delta
      if (delta?.content) yield { text: delta.content }
      if (chunk.usage) {
        const tps = chunk.usage.extra?.decode_tokens_per_s
        yield {
          done: true,
          stats: {
            decodeTps: tps,
            completionTokens: chunk.usage.completion_tokens,
            note: [
              this.label,
              tps ? `${tps.toFixed(1)} tok/s` : null,
              this.precision ? `${this.precision}` : null,
            ]
              .filter(Boolean)
              .join(' · '),
          },
        }
      }
    }
  }

  stop() {
    this.engine?.interruptGenerate()
  }

  async unload() {
    this.rejectLoad?.()
    try {
      await this.engine?.unload()
    } catch {
      // Unload is best-effort; the worker teardown below is what actually
      // guarantees the GPU memory goes back.
    }
    this.#teardownWorker()
  }
}
