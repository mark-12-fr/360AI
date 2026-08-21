/**
 * Optional "turbo" backend: a locally installed Ollama server.
 *
 * Still fully offline — it just runs on the machine's GPU natively instead of
 * through WebGPU, which lifts the model-size ceiling considerably.
 */
export class OllamaBackend {
  constructor(baseUrl, model) {
    this.kind = 'ollama'
    this.baseUrl = baseUrl.replace(/\/+$/, '')
    this.modelId = model
    this.label = `${model} · Ollama`
    this.controller = null
  }

  get ready() {
    return true
  }

  static async listModels(baseUrl) {
    const url = `${baseUrl.replace(/\/+$/, '')}/api/tags`
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) })
    if (!res.ok) throw new Error(`Ollama replied with HTTP ${res.status}`)
    const data = await res.json()
    return (data.models ?? []).map((m) => ({
      name: m.name,
      sizeGB: m.size ? (m.size / 1e9).toFixed(1) : null,
    }))
  }

  async load(_entry, onProgress) {
    onProgress?.({ progress: 1, text: `Connected to Ollama (${this.modelId})` })
    return { label: this.label, precision: 'native' }
  }

  async *stream(messages, { temperature = 0.7 } = {}) {
    this.controller = new AbortController()
    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.modelId,
        messages,
        stream: true,
        options: { temperature },
      }),
      signal: this.controller.signal,
    })
    if (!res.ok || !res.body) throw new Error(`Ollama replied with HTTP ${res.status}`)

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        // Ollama streams newline-delimited JSON; the tail of a read is often a
        // partial object, so keep it buffered until its newline arrives.
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.trim()) continue
          let obj
          try {
            obj = JSON.parse(line)
          } catch {
            continue
          }
          if (obj.message?.content) yield { text: obj.message.content }
          if (obj.done) {
            yield {
              done: true,
              stats: {
                decodeTps:
                  obj.eval_count && obj.eval_duration
                    ? (obj.eval_count / obj.eval_duration) * 1e9
                    : undefined,
                completionTokens: obj.eval_count,
              },
            }
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') throw err
    } finally {
      reader.cancel().catch(() => {})
      this.controller = null
    }
  }

  stop() {
    this.controller?.abort()
  }

  async unload() {
    this.stop()
  }
}
