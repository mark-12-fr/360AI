/**
 * Generates the PWA PNG icons procedurally.
 *
 * Written against Node's built-in zlib rather than pulling in a raster library:
 * the icons are simple signed-distance shapes, and this keeps the dependency
 * tree (and the audit surface) small.
 *
 *   node scripts/make-icons.mjs
 */
import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/icons')

/* --------------------------------------------------------- PNG encoding */

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(buf) {
  let c = 0xffffffff
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function encodePNG(width, height, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // colour type: RGBA
  // 10..12 = compression, filter, interlace — all zero

  // One filter byte (0 = None) per scanline, then the raw pixels.
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ------------------------------------------------- signed distance math */

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const mix = (a, b, t) => a + (b - a) * t

function sdRoundedRect(px, py, cx, cy, hw, hh, r) {
  const dx = Math.abs(px - cx) - (hw - r)
  const dy = Math.abs(py - cy) - (hh - r)
  const ox = Math.max(dx, 0)
  const oy = Math.max(dy, 0)
  return Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0) - r
}

const sdCircle = (px, py, cx, cy, r) => Math.hypot(px - cx, py - cy) - r

/** Coverage in [0,1] for a distance field, antialiased over ~1px. */
const cover = (d) => clamp01(0.5 - d)

function overlay(dst, i, r, g, b, a) {
  if (a <= 0) return
  dst[i] = mix(dst[i], r, a)
  dst[i + 1] = mix(dst[i + 1], g, a)
  dst[i + 2] = mix(dst[i + 2], b, a)
  dst[i + 3] = Math.max(dst[i + 3], Math.round(a * 255))
}

/* -------------------------------------------------------------- drawing */

/**
 * @param size    output edge length in px
 * @param maskable when true the background is full-bleed and the glyph is
 *                 inset into the 80% safe zone Android crops to.
 */
function drawIcon(size, maskable) {
  const px = Buffer.alloc(size * size * 4)
  const s = size / 512 // design-space scale

  const bgRadius = maskable ? size / 2 : 112 * s
  const bgHalf = size / 2

  // Glyph shrinks for maskable so the crop never clips it.
  const gs = maskable ? 0.78 : 1
  const cx = size / 2
  const cy = size / 2

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const fx = x + 0.5
      const fy = y + 0.5

      // Background: diagonal indigo -> violet gradient inside a rounded square.
      const bgA = cover(sdRoundedRect(fx, fy, cx, cy, bgHalf, bgHalf, bgRadius))
      if (bgA <= 0) continue
      const t = clamp01((fx / size) * 0.5 + (fy / size) * 0.5)
      overlay(px, i, mix(0x7c, 0x44, t), mix(0x6c, 0x33, t), mix(0xff, 0xcc, t), bgA)

      // Chat bubble body.
      const bw = 150 * s * gs
      const bh = 112 * s * gs
      const by = cy - 14 * s * gs
      let d = sdRoundedRect(fx, fy, cx, by, bw, bh, 40 * s * gs)

      // Tail: a small rounded square rotated 45°, unioned into the body.
      const tx = cx - 52 * s * gs
      const ty = by + bh + 12 * s * gs
      const rx = (fx - tx) * Math.SQRT1_2 + (fy - ty) * Math.SQRT1_2
      const ry = -(fx - tx) * Math.SQRT1_2 + (fy - ty) * Math.SQRT1_2
      d = Math.min(d, sdRoundedRect(rx, ry, 0, 0, 30 * s * gs, 30 * s * gs, 8 * s * gs))

      const bubbleA = cover(d) * bgA
      overlay(px, i, 255, 255, 255, bubbleA)

      // Three dots, punched out of the bubble by drawing in the bg colour.
      if (bubbleA > 0.01) {
        const dotR = 15 * s * gs
        const gap = 44 * s * gs
        let dotD = Infinity
        for (const k of [-1, 0, 1]) {
          dotD = Math.min(dotD, sdCircle(fx, fy, cx + k * gap, by, dotR))
        }
        const dotA = cover(dotD) * bubbleA
        overlay(px, i, mix(0x7c, 0x44, t), mix(0x6c, 0x33, t), mix(0xff, 0xcc, t), dotA)
      }
    }
  }
  return px
}

/* ----------------------------------------------------------------- main */

mkdirSync(OUT, { recursive: true })

for (const [file, size, maskable] of [
  ['icon-192.png', 192, false],
  ['icon-512.png', 512, false],
  ['maskable-512.png', 512, true],
]) {
  const png = encodePNG(size, size, drawIcon(size, maskable))
  writeFileSync(resolve(OUT, file), png)
  console.log(`${file.padEnd(20)} ${size}x${size}  ${(png.length / 1024).toFixed(1)} KB`)
}
