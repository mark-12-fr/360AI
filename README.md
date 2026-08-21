# Bulig AI — Offline

A chat assistant that runs a large language model **entirely inside your browser**,
on your own GPU. No API keys, no accounts, no server, no cost. After the first
model download the whole thing works with the network switched off.

Installable as a PWA, so it launches from the Start menu / home screen like a
native app.

## How it works

| Piece | What it does |
| --- | --- |
| [WebLLM](https://github.com/mlc-ai/web-llm) | Runs the model on WebGPU, inside a dedicated Web Worker so the UI never freezes. |
| Cache Storage | Holds the model weights (2–7 GB). Downloaded once, reused forever. |
| IndexedDB | Holds your chats and settings. Nothing leaves the device. |
| Workbox service worker | Precaches the app shell and the WebLLM runtime so cold starts work offline. |

## Requirements

- **Chrome or Edge 113+** — WebGPU is required. Firefox and Safari are not there yet.
- A GPU with roughly 2 GB of spare VRAM for the smallest model, ~6 GB for the largest.
- Hardware acceleration enabled (check `chrome://gpu`).

Cards without the WebGPU `shader-f16` feature — GTX 10xx and most integrated
GPUs — automatically get the larger `q4f32_1` builds instead, because the f16
builds fail there with an unreadable shader-compilation error.

## Getting started

```bash
npm install
npm run dev      # http://127.0.0.1:5173
```

Open the app, click **Model**, and pick one. The first load downloads the
weights; every later load reads them from cache.

```bash
npm run build    # production bundle into dist/
npm run preview  # serve the built bundle on 127.0.0.1:4173
npm run icons    # regenerate the PWA icons in public/icons/
```

## Models

| Model | Download | Best for |
| --- | --- | --- |
| Qwen 3 — 1.7B | ~2.0 GB | Fastest; simple questions and everyday writing |
| Llama 3.2 — 3B | ~2.2 GB | Balanced speed and quality |
| **Qwen 3 — 4B** | ~3.4 GB | **Recommended** — noticeably better reasoning and code |
| Llama 3.1 — 8B | ~4.9 GB | The most capable model that still fits in a browser |
| Qwen 3 — 8B | ~5.6 GB | Strongest at maths and programming |

Sizes shown are the f16 builds; f32 builds are roughly 20–25% larger.

## Turbo mode (optional)

If you have [Ollama](https://ollama.com) installed, the app can talk to it
instead and use models far larger than WebGPU allows — still entirely offline.

Ollama has to be told to accept requests from the page's origin:

```bash
# Windows (PowerShell)
$env:OLLAMA_ORIGINS = "http://127.0.0.1:4173"; ollama serve

# macOS / Linux
OLLAMA_ORIGINS=http://127.0.0.1:4173 ollama serve
```

Then open **Model → Turbo mode → Check**.

## Features

- Streaming replies with tokens/sec, and a **Stop** button that actually interrupts the GPU.
- Reasoning models' `<think>` output is folded into a collapsible section.
- Per-message **Copy**, **Regenerate**, and **Edit and send again**.
- Full-text search across every saved chat (`Ctrl+K`), inline chat renaming.
- Dark / light / follow-system themes.
- Export and import everything as JSON.
- Optional auto-load of your last model on start — only when it is already downloaded.

### Responsive layout

Verified from 280px (Galaxy Fold closed) up to 1920px, in portrait and
landscape, with no horizontal scrolling at any size:

| Width | Layout |
| --- | --- |
| ≥ 1025px | Docked 260px sidebar |
| 761–1024px | Docked 216px sidebar, so the reading column keeps its width |
| ≤ 760px | Sidebar becomes an overlay with a tap-to-dismiss backdrop; dialogs become bottom sheets |
| ≤ 400px | Tighter spacing and a smaller welcome heading |
| ≤ 360px | The model badge yields the topbar to the chat title |

Short and landscape viewports (≤ 520px tall) get a compact welcome panel so the
composer always stays on screen. On touch devices, controls that a mouse would
reveal on hover are always visible, tap targets grow to ~44px, and text fields
render at 16px so iOS does not zoom when you focus them. Notch and home-bar safe
areas are respected on all four edges.

### Keyboard

| Key | Action |
| --- | --- |
| `Enter` | Send |
| `Shift+Enter` | New line |
| `Ctrl+K` | Search chats |
| `Ctrl+B` | Toggle the sidebar |
| `Esc` | Close the sidebar |

## Privacy

Prompts and replies never leave the machine. The only network traffic the app
ever makes is downloading model weights from the MLC CDN, and fetching the app
itself. Turbo mode talks to `127.0.0.1` only.

Model output is rendered as Markdown through DOMPurify with a strict tag
allow-list, so a model cannot inject script into the page's origin.

## Caveats

Small quantized models get things wrong and make things up. Don't rely on this
for medical, legal, financial, or breaking-news questions.
