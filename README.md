# 360AI

Your own AI. It runs **entirely on your own device** — phone, tablet or computer —
and it is written in **plain JavaScript**, so there is no provider, no API key, no
account, no server, and **no model to download**. The whole app is about 345 KB.
Open it once and it works forever, with the internet switched off.

## What it actually is

Most "offline AI" apps still make you download a 2–7 GB model. 360AI does not,
because it is not a large language model — it is a **rules engine with a knowledge
base**. It works out what you are asking, computes the answer, and looks things up
in the data that ships with the app or that you teach it.

The trade is honest and worth stating plainly:

| | 360AI | A local LLM |
| --- | --- | --- |
| Download | **none** | 2–7 GB |
| Answer speed | **instant (1–30 ms)** | seconds |
| Runs on old phones | **yes** | no — needs WebGPU and 2 GB+ of VRAM |
| Knows the whole world | **no — see below** | mostly |
| Makes things up | **never** | sometimes |

When 360AI does not know something, it says so. It has no way to invent an answer,
which is the point.

## What it knows

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
prices, sports results, or the endless long tail of the world. That needs a trained
model, and a trained model needs the multi-gigabyte download this app exists to
avoid. Ask it something outside its knowledge and it will tell you so, and often
suggest the closest thing it does have.

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

Any browser from the last few years, on anything: Android, iPhone, iPad, Windows,
Mac, Linux. No WebGPU requirement and no memory floor, so a five-year-old phone runs
it exactly as well as a desktop.

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
  backends/brain.js  adapter between the chat UI and the brain
  db.js            IndexedDB: chats, settings, and the facts you teach
  ui.js            markdown rendering and message bubbles
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

There is no server, no telemetry, and no network request after the page loads. Your
chats and taught facts live in IndexedDB on the device; **Settings → Export
everything** writes them to a JSON file if you want a backup or want to carry them
to another device.

## Licence

MIT
