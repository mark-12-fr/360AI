/**
 * Pictures, on a device that has to hold them itself.
 *
 * A photo straight off a phone camera is four thousand pixels wide and several
 * megabytes, and it is going to three places that all hate that: IndexedDB,
 * which keeps the chat forever; the backup file, which the user may email to
 * themselves; and the model's prefill, where every extra pixel is time on a
 * GPU that is already the slowest part of the app. So every attachment is
 * decoded, scaled down and re-encoded before it is allowed into a message.
 *
 * Nothing here uploads anything. The picture is turned into a data URL and
 * stays in this browser, exactly like the rest of the app.
 */

import { fmtBytes } from './ui.js'

/**
 * One picture per message.
 *
 * Not an arbitrary limit: Phi-3.5 Vision runs with a 4096-token window, and a
 * single image already costs most of it once it is embedded. Two would push
 * the question itself out of context, which reads to the user as the model
 * ignoring what they asked.
 */
export const MAX_IMAGES = 1

/**
 * The long edge, in pixels. Phi-3.5 Vision crops to 336-pixel tiles, so past
 * roughly this size the extra detail buys nothing but prefill time.
 */
const MAX_EDGE = 1024

/** Anything larger than this before scaling is refused rather than decoded. */
const MAX_SOURCE_BYTES = 24 * 1024 * 1024

const JPEG_QUALITY = 0.85

/**
 * PNG is kept for pictures that have transparency or are screenshot-shaped —
 * JPEG turns a screenshot of text into mush at any quality worth the bytes.
 */
function encodingFor(type) {
  return type === 'image/png' || type === 'image/webp'
    ? { type: 'image/png', quality: undefined }
    : { type: 'image/jpeg', quality: JPEG_QUALITY }
}

async function decode(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file)
    } catch {
      // Safari and older Chrome cannot decode every format this way — HEIC off
      // an iPhone is the usual one. Fall through to the <img> path, which uses
      // the browser's ordinary image decoder and handles more.
    }
  }
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    return img
  } finally {
    // Revoking immediately is safe: decode() has already read the bytes.
    URL.revokeObjectURL(url)
  }
}

function scaledSize(w, h) {
  const longest = Math.max(w, h)
  if (longest <= MAX_EDGE) return { w, h }
  const factor = MAX_EDGE / longest
  return { w: Math.max(1, Math.round(w * factor)), h: Math.max(1, Math.round(h * factor)) }
}

function toDataURL(source, w, h, type) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  // JPEG has no alpha, so a transparent PNG would otherwise come out black.
  if (type.type === 'image/jpeg') {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
  }
  ctx.drawImage(source, 0, 0, w, h)
  return canvas.toDataURL(type.type, type.quality)
}

/**
 * Turns a picked file into the shape a message carries:
 * `{ url, name, type, bytes, w, h, sourceBytes }`.
 *
 * Throws with a sentence worth showing the user — a picture that will not open
 * is a thing they can act on (try a different one, take it again), so it must
 * not fail silently.
 */
export async function prepareImage(file) {
  if (!file.type.startsWith('image/')) {
    throw new Error(`${file.name || 'That file'} is not a picture.`)
  }
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error(
      `That picture is ${fmtBytes(file.size)}, which is too big to open on this device.`,
    )
  }

  let source
  try {
    source = await decode(file)
  } catch {
    throw new Error(
      `This browser could not open ${file.name || 'that picture'}. ` +
        'A JPEG or PNG will work — an iPhone HEIC photo often will not.',
    )
  }

  const w0 = source.width || source.naturalWidth
  const h0 = source.height || source.naturalHeight
  if (!w0 || !h0) throw new Error('That picture came out empty.')

  const { w, h } = scaledSize(w0, h0)
  const url = toDataURL(source, w, h, encodingFor(file.type))
  source.close?.()

  return {
    url,
    name: file.name || 'picture',
    type: file.type,
    // Rough, and honest about it: a base64 payload is four bytes per three.
    bytes: Math.round((url.length - url.indexOf(',') - 1) * 0.75),
    w,
    h,
    sourceBytes: file.size,
  }
}

/** A short human line about one attachment. */
export function describeImage(img) {
  const kind = (img.type || '').split('/')[1]?.toUpperCase() || 'image'
  return `**${img.name}** — ${kind}, ${img.w} × ${img.h}, ${fmtBytes(img.bytes)}`
}

/* ------------------------------------------------------------- code reading */

/**
 * QR codes and barcodes, where the browser can read them.
 *
 * This is the one thing about a picture that a device without a vision model
 * can still answer exactly, and Chrome on Android — which is most of the
 * phones this app is for — has shipped it for years. It runs on the device
 * like everything else here; nothing is uploaded to decode a code.
 */
async function readCodes(dataURL) {
  if (typeof BarcodeDetector !== 'function') return []
  try {
    const formats = await BarcodeDetector.getSupportedFormats()
    if (!formats?.length) return []
    const blob = await (await fetch(dataURL)).blob()
    const bitmap = await createImageBitmap(blob)
    const found = await new BarcodeDetector({ formats }).detect(bitmap)
    bitmap.close?.()
    return found.map((c) => ({ format: c.format, value: c.rawValue })).filter((c) => c.value)
  } catch {
    // Detection is a bonus, never the answer. A browser that has the API but
    // refuses to run it should read as "no codes found", not as an error.
    return []
  }
}

/**
 * What 360 Brain — or any model without eyes — can honestly say about a
 * picture: what the file is, and any code it can decode from it.
 *
 * The one thing it must never do is describe the contents. A rules engine
 * guessing at a photo is exactly the invention this whole app is built to
 * avoid, so it says plainly that it cannot see, and names the model that can.
 */
export async function describePictures(images, question, { canSee = false } = {}) {
  const many = images.length > 1
  const lines = []

  lines.push(
    canSee
      ? `I can see that you sent ${many ? 'pictures' : 'a picture'}, but the model that ` +
          'reads them is not loaded right now.'
      : `**I cannot see ${many ? 'pictures' : 'the picture'}.** 360 Brain is a rules ` +
          'engine — it works on text, and it will not guess at what is in a photo.',
  )

  lines.push('', `Here is what I can tell you about ${many ? 'them' : 'it'}:`, '')
  for (const img of images) lines.push(`- ${describeImage(img)}`)

  const codes = (await Promise.all(images.map((img) => readCodes(img.url)))).flat()
  if (codes.length) {
    lines.push('', 'And I could read this off it:', '')
    for (const code of codes) lines.push(`- **${code.format.toUpperCase()}** — \`${code.value}\``)
  }

  lines.push(
    '',
    'To have a picture actually looked at and answered, open **Choose your AI** and ' +
      'download **Phi-3.5 Vision** — it is the one model here that can see. It works ' +
      'offline like the rest, but it wants a laptop or a computer with a real graphics card.',
  )

  if (question?.trim()) {
    lines.push('', `Ask me **${question.trim()}** in words and I will answer what I can.`)
  }

  return lines.join('\n')
}
