/**
 * Dedicated worker hosting the WebLLM engine.
 *
 * Inference is a long, GPU-bound loop; running it here keeps the main thread
 * free so the UI can stream tokens and stay responsive to the Stop button.
 */
import { WebWorkerMLCEngineHandler } from '@mlc-ai/web-llm'

const handler = new WebWorkerMLCEngineHandler()

self.onmessage = (msg) => {
  handler.onmessage(msg)
}
