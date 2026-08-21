# 360AI

Your own AI. It runs **entirely on your own device** — phone, tablet or computer —
and it is written in **plain JavaScript**, so there is no provider, no API key, no
account, no server, and **no model to download**. The whole app is about 200 KB.
Open it once and it works forever, with the internet switched off.

## What it actually is

Most "offline AI" apps still make you download a 2–7 GB model. 360AI does not,
because it is not a large language model — it is a **rules engine with a knowledge
base**. It recognises what you are asking, computes the answer, and looks things up
in facts that ship with the app or that you teach it.

The trade is honest and worth stating plainly:

| | 360AI | A local LLM |
| --- | --- | --- |
| Download | **none** | 2–7 GB |
| Answer speed | **instant (1–15 ms)** | seconds |
| Runs on old phones | **yes** | no — needs WebGPU and 2 GB+ of VRAM |
| Knows the world | **no** | mostly |
| Makes things up | **never** | sometimes |

When 360AI does not know something, it says so — it has no way to invent an answer.

## What it can do

| Skill | Ask it |
| --- | --- |
| **Maths** | `17% of 4,850` · `(1250 + 380) * 3` · `average of 12, 19, 7, 30` · `15 is what percent of 240` |
| **Conversions** | `5 km to miles` · `30 C to F` · `2.5 kg to lbs` · `500 mb to gb` |
| **Dates and time** | `pila ka adlaw tubtob Christmas` · `what day is December 25, 2026` · `age if born May 4, 1998` |
| **Text tools** | `summarize: <long text>` · `count words: …` · `keywords: …` · `uppercase:` / `sort` / `unique` / `slugify` |
| **Dice and picks** | `flip a coin` · `roll 2d6` · `pick one: adobo, sinigang, tinola` · `password 16` |
| **Knowledge** | `what is 360AI` · `capital of the philippines` · `how many islands philippines` |
| **Chat** | `kamusta` · `salamat` · `tell me a joke` |

It answers in the language you write in — **Hiligaynon, Tagalog or English** — and
you can pin one language in Settings.

## Teaching it

This is the part that makes it *yours*. Anything it does not know, you can give it:

```
remember: akon wifi password = ilonggo123
remember: schedule sang delivery = Martes kag Biyernes
```

Then just ask, and it answers from your own knowledge. `what do you know` lists
everything you have taught it; `forget: <question>` removes one. It is stored in
IndexedDB on that device only — never uploaded, because there is nowhere to upload
it to.

## Devices

Any browser from the last few years, on anything: Android, iPhone, iPad, Windows,
Mac, Linux. There is no WebGPU requirement and no memory floor, so a five-year-old
phone runs it exactly as well as a desktop.

Install it as an app:

- **iPhone / iPad** — Share → **Add to Home Screen**
- **Android** — ⋮ menu → **Add to Home screen**
- **Desktop** — the install icon in the address bar, or **Install app** in the sidebar

## How it is built

```
src/
  brain/
    index.js       the engine: every skill scores the question, the best one answers
    nlp.js         normalising, number parsing, fuzzy matching, language detection
    facts.js       the knowledge that ships with the app — edit this to add more
    skills/        math · units · datetime · text · chance · knowledge · smalltalk
  backends/brain.js  adapter between the chat UI and the brain
  db.js            IndexedDB: chats, settings, and the facts you teach
  ui.js            markdown rendering and message bubbles
```

Adding an ability means dropping another module into `skills/` that exports
`match(ctx)` and returning `{ score, text }`. Adding knowledge means adding an entry
to `facts.js`. Nothing else needs to change.

## Running it yourself

```bash
npm install
npm run dev      # http://127.0.0.1:5173 — and on your LAN IP, for phone testing
npm run build    # production bundle into dist/
npm run preview  # serve that bundle
npm run icons    # regenerate the PWA icons
```

## Deploying

Every push to `main` publishes to GitHub Pages via `.github/workflows/deploy.yml`
(enable it once under **Settings → Pages → Source: GitHub Actions**). Because a
project site lives under `/<repo>/`, the build takes its base path from an
environment variable:

```bash
BASE_PATH=/360AI/ npm run build
```

Any static host works — there is no backend to deploy.

## Privacy

There is no server, no telemetry, and no network request after the page loads. Your
chats and taught facts live in IndexedDB on the device; **Settings → Export
everything** writes them to a JSON file if you want a backup or want to carry them
to another device.

## Licence

MIT
