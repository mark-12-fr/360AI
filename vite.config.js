import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * GitHub Pages serves a project site from /<repo>/, so the base path has to be
 * injectable — the deploy workflow sets BASE_PATH=/360AI/, local dev keeps /.
 * The manifest's id, scope and start_url all follow it, otherwise an installed
 * PWA launches at the wrong path and shows a 404 instead of the app.
 */
const base = process.env.BASE_PATH ?? '/'

/**
 * Which build this is, stamped in at compile time.
 *
 * An offline-first app is by design running from a cache, which means "have
 * you got the fix yet?" is a real question with no way to answer it from the
 * outside. A visible stamp turns a screenshot into evidence.
 */
const build = new Date().toISOString().slice(0, 16).replace('T', ' ')

export default defineConfig({
  base,
  define: { __BUILD__: JSON.stringify(build) },
  // 0.0.0.0 so a phone on the same Wi-Fi can reach `npm run dev` directly —
  // the brain needs no secure context, so plain http:// over the LAN is fine.
  // Installing it as an app still wants the deployed HTTPS build.
  server: { port: 5173, host: '0.0.0.0' },
  build: {
    target: 'esnext',
    // The WebLLM runtime is one large chunk by design; warning about it on
    // every build is noise.
    chunkSizeWarningLimit: 8000,
    rollupOptions: {
      output: {
        // Pinning the runtime to its own named chunk is what lets the service
        // worker treat it differently from the app: see the workbox config
        // below, where it is kept out of the precache.
        manualChunks: (id) => (id.includes('@mlc-ai/web-llm') ? 'webllm' : undefined),
      },
    },
  },
  // The model runs in a module worker, which needs the ES output format.
  worker: { format: 'es' },
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
        theme_color: '#262624',
        background_color: '#262624',
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
        globPatterns: ['**/*.{js,css,html,png,svg,woff2,wasm}'],
        /**
         * The WebLLM runtime is six megabytes of JavaScript, and most people
         * here will only ever use 360 Brain. Precaching it would make the
         * install a 12 MB download for everyone, which is exactly the cost
         * this app exists to avoid — so it is excluded from the precache and
         * cached at runtime instead, on the first occasion a model is used.
         * That occasion is by definition online, because it is a download.
         */
        globIgnores: ['**/webllm-*.js', '**/llm-worker-*.js'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\/assets\/(webllm|llm-worker)-[\w-]+\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: '360ai-runtime',
              expiration: { maxEntries: 6 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: 'index.html',
      },
      devOptions: { enabled: true, type: 'module' },
    }),
  ],
})
