import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: { port: 5173, host: '127.0.0.1' },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 8000,
  },
  worker: { format: 'es' },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'favicon.svg'],
      manifest: {
        name: 'Bulig AI — Offline',
        short_name: 'Bulig AI',
        description:
          'Offline AI assistant that runs entirely on your own device. No internet, no accounts, no server.',
        lang: 'en',
        theme_color: '#0b0d12',
        background_color: '#0b0d12',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        scope: '/',
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
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,wasm}'],
        // The WebLLM runtime bundle is ~7 MB; the default 2 MB cap would silently
        // drop it from the precache and break offline start-up.
        maximumFileSizeToCacheInBytes: 24 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: 'index.html',
      },
      devOptions: { enabled: true, type: 'module' },
    }),
  ],
})
