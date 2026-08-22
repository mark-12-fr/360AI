# 360AI

Your own AI, running **entirely on your own device** — phone, tablet or computer.
No provider, no API key, no account, no server. Open it once and it works forever,
with the internet switched off.

There are two engines, and you choose between them at any time from **Answering
with → Change** in the sidebar.

## 1. 360 Brain — nothing to download

The default. A **rules engine with a knowledge base**, written in plain JavaScript
and shipped inside the app: about 380 KB, no WebGPU, no memory floor. It works out
what you are asking, computes the answer, and looks things up in the data that
ships with it or that you teach it. When it does not know something it says so — it
has no way to invent an answer, which is the point.

## 2. A free language model — downloaded once

For everything a rules engine cannot do — writing, explaining, open conversation —
pick one of nine free, openly licensed models. It downloads **once** over Wi-Fi,
straight from the MLC CDN, and then lives in your browser's Cache Storage on that
device. From then on it runs on your own GPU through WebGPU, offline, and nothing
you type ever leaves the machine. The picker groups them by what your device can
actually run and shows the real download size for each:

| Model | Download | Good at |
| --- | --- | --- |
| SmolLM2 — 360M | 198 MB | the smallest thing here that still talks |
| **Llama 3.2 — 1B** | **672 MB** | **the phone pick — small but genuinely useful** |
| Qwen 2.5 Coder — 1.5B | 840 MB | code |
| Qwen 3 — 1.7B | 939 MB | reasoning, and it shows its working |
| Gemma 2 — 2B | 1.4 GB | writing and explaining |
| Llama 3.2 — 3B | 1.7 GB | the balanced choice on a computer |
| **Qwen 3 — 4B** | **2.1 GB** | **the desktop pick — reasoning and code** |
| Phi-3.5 Vision | ≈2.3 GB | **pictures** — the only one here that can see |
| Llama 3.1 — 8B | 4.2 GB | the most capable that fits in a browser |

Sizes are the real repository figures, except where they are marked `≈`: MLC
publishes the memory a build needs but not always its download, and the app says
so rather than quoting a number it cannot stand behind. The memory a model needs
to *run* is larger than its download and differs between the half- and
full-precision builds; 360AI probes the GPU, picks the build it can actually use,
and warns you when a model looks too big for the device rather than failing
halfway through.

## 3. Pictures

The 🖼 button on the composer attaches a photo — from the camera or the gallery on
a phone, by paste or drag on a computer. It is scaled to 1024 px and stored with
the chat in IndexedDB, like everything else here: nothing is uploaded.

What happens next depends on what is answering, and 360AI says which **before** you
send, not after:

- **Phi-3.5 Vision** reads the picture and answers about it — what is in it, what
  the text in it says. It is the one model in the catalogue with an image encoder.
- **360 Brain** cannot see, and says so instead of guessing. It reports what it can
  establish — the file, its size, its dimensions — and reads any **QR code or
  barcode** in the picture where the browser supports it, which covers Chrome on
  Android.
- **Any other downloaded model** is told a picture was attached that it cannot see,
  so it answers the question rather than inventing a description.

One picture per message: Phi-3.5 Vision runs with a 4096-token window, and a single
embedded image already fills most of it.

The WebLLM runtime is six megabytes of JavaScript and is **not** part of the app
bundle or its offline precache — it is fetched the first time you choose a model,
so anyone who only ever uses 360 Brain never pays for it.

## Which to use

| | 360 Brain | A downloaded model |
| --- | --- | --- |
| Download | **none** | 198 MB – 4.2 GB, once |
| Answer speed | **instant (1–30 ms)** | seconds |
| Runs on old phones | **yes** | needs WebGPU and the memory for it |
| Knows the whole world | no — see below | mostly |
| Makes things up | **never** | sometimes |
| Writes an essay for you | no | **yes** |
| Reads a picture | QR codes only | **yes, on Phi-3.5 Vision** |

Both are offline. Neither sends anything anywhere.

## What 360 Brain knows

| Area | Coverage | Ask it |
| --- | --- | --- |
| **Countries** | all 195 — capital, currency, language, continent, area, population | `capital of Japan` · `what currency does Brazil use` · `which countries are in Europe` · `largest country in Asia` |
| **College courses** | 45 programs — description, length, major subjects, GE minors, careers | `what is BSIT` · `major subjects in nursing` · `how many years is architecture` · `careers after criminology` |
| **Chemistry** | all 118 elements — symbol, atomic number, mass, category | `chemical symbol of gold` · `what is element 26` · `list the noble gases` |
| **Definitions** | ~200 terms across biology, chemistry, physics, maths, computing, business, law, health | `what is photosynthesis` · `define compound interest` · `explain quantum mechanics` |
| **Reference lists** | planets, continents, oceans, rivers, mountains, body systems, water cycle, parts of speech, world wars, Philippine facts | `what are the planets` · `tallest mountain` · `parts of speech` |
| **Maths** | expressions, percentages, statistics | `17% of 4,850` · `(1250 + 380) * 3` · `average of 12, 19, 7, 30` |
| **Conversions** | length, mass, volume, temperature, data, speed, area, time | `5 km to miles` · `30 C to F` · `2.5 kg to lbs` |
| **Dates** | today, weekdays, countdowns, ages, date arithmetic | `how many days until Christmas` · `age if born May 4, 1998` |
| **Text tools** | summarise, count, keywords, case, sort, dedupe, slugify | `summarize: <long text>` · `count words: …` |
| **Senior high strands** | 10 strands across 4 tracks — specialised subjects, the shared core and applied subjects, where each leads | `what is the STEM strand` · `subjects in ABM` · `HUMSS leads to what course` |
| **Philippine law** | 30 topics — the Constitution, Bill of Rights, labour, family, criminal law, procedure, by RA number or by topic | `what is RA 9262` · `13th month pay` · `my rights when arrested` · `small claims` |
| **Code** | 18 languages x 12 tasks — Python, JavaScript, TypeScript, Java, C, C++, C#, PHP, Ruby, Go, Rust, Swift, Kotlin, Dart, SQL, Bash, HTML, CSS | `python for loop` · `how do I read a file in Java` · `show me C++ basics` |
| **Dice and picks** | coin, dice, random pick, password generator | `flip a coin` · `roll 2d6` · `password 16` |

It answers in **English**. It still understands questions written in Taglish —
`ano ang kapital ng japan` gets the same answer as `what is the capital of Japan`.

**What it does not know:** anything not in the lists above — current events, people,
prices, sports results, or the endless long tail of the world. Ask it something
outside its knowledge and it will tell you so, and often suggest the closest thing
it does have. That is the moment to switch to a downloaded model, which is exactly
why the choice exists.

## However you phrase it

The question is read in two independent parts — the subject, and the fact wanted
about it — so word order, politeness and typos barely matter. All of these give the
same answer:

```
capital of Japan
what is the capital of Japan
what's Japan's capital city?
can you please tell me the capital city of japan
japan capital
ano ang kapital ng japan
capital of phillipines      ← typo, still resolves
```

It also follows the thread. Ask `capital of France`, then just `and its currency?`
and it knows you still mean France.

## Answer length

Say **shorter** and it trims every answer to the point; say **elaborate** and it gives the
fuller version, including anything extra it holds on the subject. Either one also
re-answers the question you just asked, at the new length. **normal** puts it back.

```
> what is BSIT
[the full program overview]
> shorter
**Bachelor of Science in Information Technology** (BSIT)
*(shortened — say "elaborate" for the rest)*
```

## Teaching it

This is what makes it *yours*. Anything it does not know, you can give it:

```
remember: my wifi password = ilonggo123
remember: delivery schedule = Tuesday and Friday
```

Then just ask, and it answers from your own knowledge. `what do you know` lists
everything you have taught it; `forget: <question>` removes one. It is stored in
IndexedDB on that device only — never uploaded, because there is nowhere to upload
it to.

## Devices

**360 Brain** runs in any browser from the last few years, on anything: Android,
iPhone, iPad, Windows, Mac, Linux. No WebGPU requirement and no memory floor, so a
five-year-old phone runs it exactly as well as a desktop.

**Downloaded models** need WebGPU: Chrome or Edge 113+ on Android and desktop, or
Safari 18+ on iOS. Where it is missing, the picker says so plainly and 360 Brain
keeps working. Storage matters too — the browser can evict a cached model when the
device runs short of space, so 360AI checks on every launch and falls back to the
brain rather than silently re-downloading gigabytes.

Install it as an app:

- **iPhone / iPad** — Share → **Add to Home Screen**
- **Android** — ⋮ menu → **Add to Home screen**
- **Desktop** — the install icon in the address bar, or **Install app** in the sidebar

## How it is built

```
src/
  brain/
    index.js       the engine: every skill scores the question, the best one answers
    nlp.js         normalising, number parsing, fuzzy matching, entity lookup
    facts.js       hand-written Q&A entries about the app itself
    data/
      countries.js   195 countries
      elements.js    118 elements
      courses.js     45 college programs + the shared GE core
      strands.js     10 SHS strands + the core and applied subjects
      law.js         30 Philippine law topics
      code.js        18 languages x 12 tasks
      reference.js   the definitions glossary and reference lists
    skills/        knowledge · math · units · datetime · geography · chemistry
                   academics · strands · law · code · define · text · chance · smalltalk
  backends/
    brain.js       adapter between the chat UI and the brain
    webllm.js      the downloaded-model backend: load, stream, cancel
  llm-worker.js    hosts the model off the main thread, so the UI stays live
  models.js        the catalogue, the WebGPU probe, and the download cache
  images.js        scaling an attached picture, and what to say about one
  db.js            IndexedDB: chats, settings, and the facts you teach
  ui.js            markdown, message bubbles, toasts, confirm sheets
```

**To add knowledge**, edit the matching file in `data/` — a row in `countries.js`,
an entry in the `GLOSSARY`, another program in `courses.js`. Nothing else changes.

**To add an ability**, drop a module into `skills/` exporting `match(ctx)` that
returns `{ score, text }`, and register it in `brain/index.js`. The engine handles
the rest.

## Running it yourself

```bash
npm install
npm run dev      # http://127.0.0.1:5173 — and on your LAN IP, for phone testing
npm run build    # production bundle into dist/
npm run preview  # serve that bundle
npm run icons    # regenerate the PWA icons
```

## Deploying

Every push to `main` publishes to GitHub Pages via `.github/workflows/deploy.yml`.
Because a project site lives under `/<repo>/`, the build takes its base path from an
environment variable:

```bash
BASE_PATH=/360AI/ npm run build
```

Any static host works — there is no backend to deploy.

## Privacy

There is no server and no telemetry. With 360 Brain there is no network request
after the page loads, at all. Downloading a model is the single exception in the
app's life: it fetches weights from the MLC CDN, once, and sends nothing but the
request for them. After that the model runs on your own GPU and the network is
never touched again.

Your chats and taught facts live in IndexedDB on the device; **Settings → Export
everything** writes them to a JSON file if you want a backup or want to carry them
to another device. **Choose your AI → Remove** deletes a downloaded model and frees
the space.

## Licence

MIT
