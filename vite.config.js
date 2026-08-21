import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * GitHub Pages serves a project site from /<repo>/, so the base path has to be
 * injectable — the deploy workflow sets BASE_PATH=/360AI/, local dev keeps /.
 * The manifest's id, scope and start_url all follow it, otherwise an installed
 * PWA launches at the wrong path and shows a 404 instead of the app.
 */
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  // 0.0.0.0 so a phone on the same Wi-Fi can reach `npm run dev` directly —
  // the brain needs no secure context, so plain http:// over the LAN is fine.
  // Installing it as an app still wants the deployed HTTPS build.
  server: { port: 5173, host: '0.0.0.0' },
  build: { target: 'esnext' },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'favicon.svg'],
      manifest: {
        id: base,
        name: '360AI — your own offline AI',
        short_name: '360AI',
        description:
          'Your own AI, running entirely on your phone, tablet or computer. No provider, no account, no internet.',
        lang: 'en',
        theme_color: '#0b0d12',
        background_color: '#0b0d12',
        display: 'standalone',
        // Android and desktop honour the first entry they understand; iOS
        // falls back to the apple-* meta tags in index.html.
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'any',
        start_url: base,
        scope: base,
        categories: ['productivity', 'utilities'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: 'index.html',
      },
      devOptions: { enabled: true, type: 'module' },
    }),
  ],
})
