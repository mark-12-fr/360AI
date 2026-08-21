import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm'
import { pickVariant, probeGPU } from '../models.js'

/**
 * Browser backend. Weights download once from the MLC CDN and then live in the
 * browser's Cache Storage, so every later launch is fully offline.
 */
export class WebLLMBackend {
  constructor() {
    this.kind = 'webllm'
    this.engine = null
    this.worker = null
    this.modelId = null
    this.label = ''
  }

  get ready() {
    return this.engine !== null
  }

  async load(entry, onProgress) {
    const gpu = await probeGPU()
    if (!gpu.ok) throw new Error(gpu.reason)

    const variant = pickVariant(entry, gpu)

    // Reuse the worker across model swaps — spawning one costs a fresh ~7 MB
    // module parse, and `reload()` already tears the old model off the GPU.
    this.worker ??= new Worker(new URL('../llm-worker.js', import.meta.url), {
      type: 'module',
    })

    if (this.engine) {
      onProgress?.({ progress: 0, text: `Switching to ${entry.name}…` })
      await this.engine.reload(variant.model)
    } else {
      this.engine = await CreateWebWorkerMLCEngine(this.worker, variant.model, {
        initProgressCallback: (r) =>
          onProgress?.({ progress: r.progress, text: r.text }),
      })
    }

    this.modelId = variant.model
    this.label = `${entry.name} · ${variant.precision}`
    return { label: this.label, precision: variant.precision }
  }

  /** Yields content deltas. `reasoning` marks chain-of-thought segments. */
  async *stream(messages, { temperature = 0.7 } = {}) {
    if (!this.engine) throw new Error('No model has been loaded yet.')

    const chunks = await this.engine.chat.completions.create({
      messages,
      stream: true,
      temperature,
      stream_options: { include_usage: true },
    })

    for await (const chunk of chunks) {
      const delta = chunk.choices?.[0]?.delta
      if (delta?.content) yield { text: delta.content }
      if (chunk.usage) {
        yield {
          done: true,
          stats: {
            prefillTps: chunk.usage.extra?.prefill_tokens_per_s,
            decodeTps: chunk.usage.extra?.decode_tokens_per_s,
            completionTokens: chunk.usage.completion_tokens,
          },
        }
      }
    }
  }

  stop() {
    this.engine?.interruptGenerate()
  }

  async unload() {
    await this.engine?.unload()
    this.engine = null
    this.modelId = null
  }
}
