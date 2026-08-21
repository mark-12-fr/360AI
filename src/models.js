/**
 * Curated model catalogue.
 *
 * Each entry ships two quantizations of the same weights:
 *   q4f16_1 — smaller + faster, but needs the WebGPU `shader-f16` feature.
 *   q4f32_1 — larger, works everywhere.
 *
 * Pascal-era cards (GTX 10xx) and most integrated GPUs do NOT expose
 * `shader-f16`, so picking the f16 build there fails at load time with an
 * opaque shader-compilation error. `pickVariant()` resolves this at runtime.
 */

export const MODELS = [
  {
    id: 'qwen3-1.7b',
    name: 'Qwen 3 — 1.7B',
    tag: 'Fastest',
    blurb: 'Light and quick. Good for simple questions and everyday writing.',
    f16: { model: 'Qwen3-1.7B-q4f16_1-MLC', vramMB: 2037 },
    f32: { model: 'Qwen3-1.7B-q4f32_1-MLC', vramMB: 2635 },
  },
  {
    id: 'llama32-3b',
    name: 'Llama 3.2 — 3B',
    tag: 'Balanced',
    blurb: 'A good balance of speed and quality, and strong on everyday chat.',
    f16: { model: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', vramMB: 2264 },
    f32: { model: 'Llama-3.2-3B-Instruct-q4f32_1-MLC', vramMB: 2952 },
  },
  {
    id: 'qwen3-4b',
    name: 'Qwen 3 — 4B',
    tag: 'Smart',
    blurb: 'Reasons and writes code noticeably better than the 3B. Recommended.',
    recommended: true,
    f16: { model: 'Qwen3-4B-q4f16_1-MLC', vramMB: 3432 },
    f32: { model: 'Qwen3-4B-q4f32_1-MLC', vramMB: 4328 },
  },
  {
    id: 'llama31-8b',
    name: 'Llama 3.1 — 8B',
    tag: 'Most capable',
    blurb: 'The most capable model that still fits in a browser. Wants ~6 GB of VRAM.',
    f16: { model: 'Llama-3.1-8B-Instruct-q4f16_1-MLC', vramMB: 5001 },
    f32: { model: 'Llama-3.1-8B-Instruct-q4f32_1-MLC', vramMB: 6101 },
  },
  {
    id: 'qwen3-8b',
    name: 'Qwen 3 — 8B',
    tag: 'Best at code',
    blurb: 'Strongest at maths and programming. Heavy on the GPU.',
    f16: { model: 'Qwen3-8B-q4f16_1-MLC', vramMB: 5696 },
    f32: { model: 'Qwen3-8B-q4f32_1-MLC', vramMB: 6853 },
  },
]

/** Cached result of the WebGPU capability probe. */
let gpuInfoPromise = null

/**
 * Probes the real adapter rather than trusting the user agent. Returns
 * `{ ok, f16, vendor, architecture, maxBufferMB, reason }`.
 */
export function probeGPU() {
  gpuInfoPromise ??= (async () => {
    if (!('gpu' in navigator)) {
      return {
        ok: false,
        f16: false,
        reason:
          'This browser has no WebGPU support. Use Chrome or Edge (version 113 or newer).',
      }
    }
    let adapter
    try {
      adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' })
    } catch (err) {
      return { ok: false, f16: false, reason: `WebGPU failed to start: ${err.message}` }
    }
    if (!adapter) {
      return {
        ok: false,
        f16: false,
        reason:
          'No GPU adapter found. Check chrome://gpu to see whether hardware acceleration is enabled.',
      }
    }
    const info = (await adapter.requestAdapterInfo?.()) ?? adapter.info ?? {}
    return {
      ok: true,
      f16: adapter.features.has('shader-f16'),
      vendor: info.vendor || 'unknown',
      architecture: info.architecture || '',
      description: info.description || '',
      maxBufferMB: Math.round(adapter.limits.maxBufferSize / (1024 * 1024)),
      maxStorageBindingMB: Math.round(adapter.limits.maxStorageBufferBindingSize / (1024 * 1024)),
    }
  })()
  return gpuInfoPromise
}

/**
 * Chooses the quantization for `entry` that this machine can actually run.
 * Returns `{ model, vramMB, precision }`.
 */
export function pickVariant(entry, gpu) {
  const v = gpu?.f16 ? entry.f16 : entry.f32
  return { ...v, precision: gpu?.f16 ? 'f16' : 'f32' }
}

export function findModel(id) {
  return MODELS.find((m) => m.id === id)
}

/**
 * Rough guide only — WebGPU never reports true VRAM, so we lean on the
 * storage-binding limit as a proxy and stay conservative.
 */
export function fitsComfortably(vramMB, gpu) {
  if (!gpu?.maxStorageBindingMB) return true
  return vramMB <= gpu.maxStorageBindingMB * 4
}
