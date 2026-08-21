/**
 * The model catalogue.
 *
 * 360AI answers with 360 Brain by default — a rules engine that ships inside
 * the app and needs no download at all. This file is the other half of the
 * offer: real language models that you download **once** over Wi-Fi and then
 * own. After that first download the weights live in the browser's Cache
 * Storage on this device, and every later launch runs with the network off.
 *
 * All of them are free and openly licensed; none of them phone home. The
 * download comes from the MLC CDN and is the only moment 360AI needs internet
 * in its entire life.
 *
 * Each entry ships two quantizations of the same weights:
 *   q4f16_1 — smaller and faster, but needs the WebGPU `shader-f16` feature.
 *   q4f32_1 — larger, works on adapters without it.
 * Most phone GPUs and every Pascal-era desktop card lack `shader-f16`, and
 * picking the f16 build there fails at load with an opaque shader error, so
 * `pickVariant()` resolves it against the real adapter at runtime.
 */

/** The always-available engine. Not a download — it is the app. */
export const BUILT_IN = {
  id: 'brain',
  name: '360 Brain',
  tag: 'Built in',
  tier: 'builtin',
  downloadMB: 0,
  blurb:
    'Instant, exact, and already here. Maths, conversions, dates, definitions, ' +
    'code snippets and everything you teach it — with nothing to download.',
}

/**
 * Tiers exist so the picker can lead with what this device can actually run,
 * rather than making the size figures a puzzle to solve.
 */
export const TIERS = [
  {
    id: 'pocket',
    label: 'Runs on most phones',
    hint: 'Under a gigabyte to download, and around one to run.',
  },
  {
    id: 'phone',
    label: 'Newer phones and tablets',
    hint: 'Needs about 2 GB of memory. A recent phone, or any tablet.',
  },
  {
    id: 'laptop',
    label: 'Laptops and computers',
    hint: 'Needs 3–4 GB of memory. Comfortable on a laptop, tight on a phone.',
  },
  {
    id: 'desktop',
    label: 'Desktops with a real GPU',
    hint: 'Needs over 5 GB of memory, so a dedicated graphics card.',
  },
]

/**
 * Two different numbers, and conflating them was the old mistake.
 *
 * `downloadMB` is what comes down the wire, measured from the MLC repository
 * itself. It is the same for both builds: q4f16_1 and q4f32_1 ship identical
 * quantized weights, and differ only in the dtype the runtime computes in.
 * This is the figure that costs somebody mobile data, so it is the one the
 * picker leads with.
 *
 * `ramMB` is MLC's figure for the memory the build needs while running, which
 * is where the two builds diverge - the f32 path carries bigger activation and
 * cache buffers. It decides whether a model will run at all, so it is quoted
 * only when it looks like a problem.
 */
export const MODELS = [
  {
    id: 'smollm2-360m',
    name: 'SmolLM2 — 360M',
    family: 'Hugging Face',
    tag: 'Tiniest',
    tier: 'pocket',
    blurb:
      'The smallest model here that still holds a conversation. For old phones, ' +
      'cheap phones, and anywhere storage is precious.',
    strengths: ['Chat', 'Short writing'],
    downloadMB: 198,
    f16: { model: 'SmolLM2-360M-Instruct-q4f16_1-MLC', ramMB: 376 },
    f32: { model: 'SmolLM2-360M-Instruct-q4f32_1-MLC', ramMB: 580 },
  },
  {
    id: 'llama32-1b',
    name: 'Llama 3.2 — 1B',
    family: 'Meta',
    tag: 'Best for phones',
    tier: 'pocket',
    recommendedFor: 'mobile',
    blurb:
      'Small enough for a phone, big enough to be genuinely useful. If you are ' +
      'downloading exactly one model on mobile data, make it this one.',
    strengths: ['Chat', 'Writing', 'Summarising'],
    downloadMB: 672,
    f16: { model: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', ramMB: 879 },
    f32: { model: 'Llama-3.2-1B-Instruct-q4f32_1-MLC', ramMB: 1129 },
  },
  {
    id: 'qwen25-coder-1_5b',
    name: 'Qwen 2.5 Coder — 1.5B',
    family: 'Alibaba',
    tag: 'Best at code',
    tier: 'phone',
    blurb:
      'Trained on code rather than trivia. Small, and far better at programming ' +
      'than anything else this size.',
    strengths: ['Code', 'Debugging'],
    downloadMB: 840,
    f16: { model: 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC', ramMB: 1630 },
    f32: { model: 'Qwen2.5-Coder-1.5B-Instruct-q4f32_1-MLC', ramMB: 1889 },
  },
  {
    id: 'gemma2-2b',
    name: 'Gemma 2 — 2B',
    family: 'Google',
    tag: 'Best writer',
    tier: 'phone',
    blurb:
      "Google's small model. Explains things and writes prose noticeably better " +
      'than its size suggests.',
    strengths: ['Writing', 'Explaining'],
    downloadMB: 1424,
    f16: { model: 'gemma-2-2b-it-q4f16_1-MLC', ramMB: 1895 },
    f32: { model: 'gemma-2-2b-it-q4f32_1-MLC', ramMB: 2509 },
  },
  {
    id: 'qwen3-1_7b',
    name: 'Qwen 3 — 1.7B',
    family: 'Alibaba',
    tag: 'Thinks first',
    tier: 'phone',
    reasoning: true,
    blurb:
      'Works a problem through before answering, and shows that reasoning. Slower ' +
      'per answer, but better on anything with steps in it.',
    strengths: ['Reasoning', 'Maths', 'Chat'],
    downloadMB: 939,
    f16: { model: 'Qwen3-1.7B-q4f16_1-MLC', ramMB: 2037 },
    f32: { model: 'Qwen3-1.7B-q4f32_1-MLC', ramMB: 2635 },
  },
  {
    id: 'llama32-3b',
    name: 'Llama 3.2 — 3B',
    family: 'Meta',
    tag: 'Balanced',
    tier: 'laptop',
    blurb:
      'The even-handed choice on a computer: quick enough to feel live, and solid ' +
      'across ordinary chat, writing and questions.',
    strengths: ['Chat', 'Writing', 'General knowledge'],
    downloadMB: 1733,
    f16: { model: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', ramMB: 2264 },
    f32: { model: 'Llama-3.2-3B-Instruct-q4f32_1-MLC', ramMB: 2952 },
  },
  {
    id: 'qwen3-4b',
    name: 'Qwen 3 — 4B',
    family: 'Alibaba',
    tag: 'Smartest for the size',
    tier: 'laptop',
    recommendedFor: 'desktop',
    reasoning: true,
    blurb:
      'Reasons and writes code clearly better than the 3B while still fitting on a ' +
      'laptop. The one to pick on a computer.',
    strengths: ['Reasoning', 'Code', 'Maths'],
    downloadMB: 2174,
    f16: { model: 'Qwen3-4B-q4f16_1-MLC', ramMB: 3432 },
    f32: { model: 'Qwen3-4B-q4f32_1-MLC', ramMB: 4328 },
  },
  {
    id: 'llama31-8b',
    name: 'Llama 3.1 — 8B',
    family: 'Meta',
    tag: 'Most capable',
    tier: 'desktop',
    blurb:
      'The most capable model that still fits inside a browser tab. Wants a ' +
      'dedicated graphics card, and patience on the first download.',
    strengths: ['Everything', 'Long answers'],
    downloadMB: 4317,
    f16: { model: 'Llama-3.1-8B-Instruct-q4f16_1-MLC', ramMB: 5001 },
    f32: { model: 'Llama-3.1-8B-Instruct-q4f32_1-MLC', ramMB: 6101 },
  },
]

export function findModel(id) {
  return MODELS.find((m) => m.id === id) ?? null
}

/* ------------------------------------------------------------- capability */

let gpuInfoPromise = null

/**
 * Probes the real adapter rather than trusting the user agent — WebGPU can be
 * present and still refuse to hand out a device, which is a different failure
 * with a different fix.
 *
 * Returns `{ ok, f16, vendor, maxStorageBindingMB, reason }`.
 */
export function probeGPU() {
  gpuInfoPromise ??= (async () => {
    if (!('gpu' in navigator)) {
      return {
        ok: false,
        f16: false,
        reason:
          'This browser cannot run downloaded models — it has no WebGPU. Chrome or ' +
          'Edge 113+ on Android and desktop can, and so can Safari 18+ on iOS. ' +
          '360 Brain works here either way.',
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
          'No GPU adapter was offered, usually because hardware acceleration is ' +
          'switched off. On desktop Chrome, check chrome://gpu.',
      }
    }
    // requestAdapterInfo() is the old spelling and is gone in newer Chrome;
    // adapter.info is the current one. Neither is guaranteed.
    const info = adapter.info ?? (await adapter.requestAdapterInfo?.().catch(() => null)) ?? {}
    return {
      ok: true,
      f16: adapter.features.has('shader-f16'),
      vendor: info.vendor || '',
      architecture: info.architecture || '',
      description: info.description || '',
      maxBufferMB: Math.round(adapter.limits.maxBufferSize / (1024 * 1024)),
      maxStorageBindingMB: Math.round(adapter.limits.maxStorageBufferBindingSize / (1024 * 1024)),
    }
  })()
  return gpuInfoPromise
}

/** The build of `entry` this machine can actually run. */
export function pickVariant(entry, gpu) {
  const v = gpu?.f16 ? entry.f16 : entry.f32
  return { ...v, precision: gpu?.f16 ? 'f16' : 'f32' }
}

/** Memory this device would need to run `entry`, in MB. */
export function ramFor(entry, gpu) {
  return pickVariant(entry, gpu).ramMB
}

export function fmtSize(mb) {
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`
}

/** The size to put in front of someone deciding whether to download. */
export function downloadSize(entry) {
  return fmtSize(entry.downloadMB)
}

/**
 * A guess at whether this will run, deliberately generous.
 *
 * WebGPU never reports true VRAM, so the storage-binding limit is the only
 * signal there is — and it caps one buffer rather than the total, which is why
 * it is multiplied out. Being wrong optimistically costs a failed load; being
 * wrong the other way hides models that would have worked fine.
 */
export function fitsDevice(entry, gpu, device) {
  const mb = ramFor(entry, gpu)
  if (device?.mobile && mb > 2600) return false
  if (!gpu?.maxStorageBindingMB) return true
  return mb <= gpu.maxStorageBindingMB * 4
}

/** The model a first-time visitor should probably take, given the device. */
export function suggestFor(device) {
  return findModel(device?.mobile ? 'llama32-1b' : 'qwen3-4b')
}

/* ----------------------------------------------------------------- storage */

/**
 * The WebLLM runtime is six megabytes of JavaScript, and someone who only ever
 * uses 360 Brain should never pay for it. Nothing above this line imports it;
 * everything below loads it on demand, which keeps the app itself a quarter of
 * a megabyte for the people the offline promise matters most to.
 */
let runtime = null
export function loadRuntime() {
  runtime ??= import('@mlc-ai/web-llm')
  return runtime
}

/**
 * Is this model already on the device? Both builds are checked, because the
 * download may have happened on a machine whose GPU has since been swapped or
 * whose driver stopped reporting `shader-f16`.
 */
export async function cachedVariant(entry) {
  const { hasModelInCache } = await loadRuntime()
  for (const key of ['f16', 'f32']) {
    const variant = entry[key]
    if (!variant) continue
    try {
      if (await hasModelInCache(variant.model)) return { ...variant, precision: key }
    } catch {
      // Cache Storage is unavailable (a private window, or a browser that has
      // walled it off). Treat that as "not downloaded" rather than as an error.
    }
  }
  return null
}

/**
 * Which models are genuinely on this device, as a Set of catalogue ids.
 *
 * The app keeps its own record of what it downloaded, which is what boot
 * trusts; this is the reconciliation against reality, because a browser is
 * free to evict Cache Storage whenever the device runs short of space.
 */
export async function listDownloaded() {
  const found = new Set()
  await Promise.all(
    MODELS.map(async (entry) => {
      if (await cachedVariant(entry)) found.add(entry.id)
    }),
  )
  return found
}

/** Frees the space a model takes, both builds of it. */
export async function deleteDownload(entry) {
  const { deleteModelAllInfoInCache } = await loadRuntime()
  for (const key of ['f16', 'f32']) {
    if (!entry[key]) continue
    await deleteModelAllInfoInCache(entry[key].model).catch(() => {})
  }
}
