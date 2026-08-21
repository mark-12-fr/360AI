/**
 * The knowledge 360AI ships with.
 *
 * This file *is* the general knowledge — there is no model, so anything not
 * written down here or taught by the user is honestly answered with "I don't
 * know". Keep entries short, stable and checkable; nothing that goes out of
 * date within a year belongs here.
 *
 * `q` holds the phrasings that should hit the entry. Matching is fuzzy, so
 * three or four representative phrasings are plenty.
 */

export const FACTS = [
  /* ------------------------------------------------------- about the app */
  {
    q: ['what is 360ai', 'ano ang 360ai', 'about 360ai', 'sino ka', 'who are you', 'sin-o ka'],
    a:
      "I'm **360AI** — an assistant that runs completely on your own device, written in plain " +
      'JavaScript. No provider, no account, no server, and nothing to download. That also means ' +
      "my knowledge is only what's built into me plus whatever you teach me.",
  },
  {
    q: ['do you need internet', 'kailangan ba internet', 'nagakinahanglan bala sang internet', 'offline ka bala', 'work offline'],
    a:
      'No. Everything happens inside your browser on this device. You can switch the Wi-Fi off ' +
      'and I will keep working exactly the same — nothing is ever sent anywhere.',
  },
  {
    q: ['what can you do', 'ano ang kaya mo', 'ano ang mahimo mo', 'help', 'skills', 'commands'],
    a: 'SKILL_LIST', // replaced at runtime with the live skill list
  },
  {
    q: ['are you chatgpt', 'are you an llm', 'llm ka bala', 'ano nga model gingamit mo', 'what model do you use'],
    a:
      "No. I'm not a large language model and I have no weights to download. I'm a rules engine: " +
      'I recognise what you are asking, compute the answer, and look things up in my knowledge ' +
      'base. That is why I am instant and tiny — and also why I cannot answer everything.',
  },
  {
    q: ['why don\'t you know', 'ngaa indi ka kabalo', 'bakit hindi mo alam', 'you are limited'],
    a:
      "Because I have no trained model behind me — only the facts written into me and the ones " +
      'you teach me. If you tell me something with **remember: X = Y**, I will know it from then ' +
      'on, on this device, forever.',
  },
  {
    q: ['how do i teach you', 'paano kita matudluan', 'paano kita tuturuan', 'remember command', 'teach you'],
    a:
      'Type **remember: <question> = <answer>**. For example `remember: my number = 0917-000-0000`. ' +
      'Ask **what do you know** to see everything you have taught me, and **forget: <question>** to remove one.',
  },
  {
    q: ['is my data private', 'private bala', 'ligtas ba ang data ko', 'where are my chats stored'],
    a:
      "Your chats live in this browser's IndexedDB, on this device only. There is no server to " +
      'send them to. Settings → Export everything writes them to a file if you want a backup.',
  },
  {
    q: ['how do i install', 'paano i-install', 'add to home screen', 'install app'],
    a:
      'On **iPhone/iPad**: Share → Add to Home Screen. On **Android**: ⋮ menu → Add to Home screen. ' +
      'On a **computer**: the install icon in the address bar. After that it opens like a normal app, offline.',
  },

  /* ---------------------------------------------------------- Philippines */
  {
    q: ['capital of the philippines', 'kapital sang pilipinas', 'kabisera ng pilipinas'],
    a:
 'The capital of the Philippines is **Manila**. The largest city by population is Quezon City.',
  },
  {
    q: ['how many islands philippines', 'pila ka isla ang pilipinas', 'ilang isla ang pilipinas'],
    a:
 'The Philippines has **7,641 islands** (the 2016 survey added 534 to the long-quoted 7,107).',
  },
  {
    q: ['what is hiligaynon', 'ano ang hiligaynon', 'ilonggo language'],
    a:
      '**Hiligaynon** (Ilonggo) is a Visayan language spoken by around 9 million people, mainly in ' +
      'Iloilo, Negros Occidental, Capiz, Guimaras and Antique.',
  },
  {
    q: ['languages in the philippines', 'pila ka lenguahe sa pilipinas', 'ilang wika sa pilipinas'],
    a:
      'There are around **175 living languages** in the Philippines. Filipino and English are the ' +
      'official ones; Cebuano, Hiligaynon, Ilocano, Bikol, Waray, Kapampangan and Pangasinan are among the largest.',
  },
  {
    q: ['regions of the philippines', 'pila ka rehiyon', 'how many regions philippines'],
    a: 'The Philippines has **18 regions**, 82 provinces, and over 42,000 barangays.',
  },

  /* ------------------------------------------------------------- science */
  {
    q: ['speed of light', 'kadasig sang kasanag', 'bilis ng liwanag'],
    a: 'Light travels at **299,792,458 metres per second** in a vacuum — about 300,000 km/s.',
  },
  {
    q: ['boiling point of water', 'freezing point of water', 'init sang tubig'],
    a: 'At sea level water freezes at **0 °C (32 °F)** and boils at **100 °C (212 °F)**.',
  },
  {
    q: ['how many planets', 'pila ka planeta', 'planets in the solar system'],
    a:
      'Eight: **Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.** Pluto has been a ' +
      'dwarf planet since 2006.',
  },
  {
    q: ['how many continents', 'pila ka kontinente', 'ilang kontinente'],
    a: 'Seven: **Africa, Antarctica, Asia, Europe, North America, Oceania, South America.**',
  },
  {
    q: ['how many bones in the human body', 'pila ka tul-an', 'ilang buto sa katawan'],
    a: 'An adult human has **206 bones**. A newborn has about 270 — some fuse while growing.',
  },
  {
    q: ['how much water should i drink', 'pila ka tubig ang inumon', 'daily water intake'],
    a:
      'The common guidance is about **2–2.5 litres a day** for adults, including what comes from ' +
      'food. Needs vary with heat, size and activity — this is general information, not medical advice.',
  },
  {
    q: ['what is dna', 'ano ang dna'],
    a:
      '**DNA** (deoxyribonucleic acid) is the molecule carrying the genetic instructions of living ' +
      'things. Its four bases — A, T, G, C — pair up along a double helix.',
  },

  /* ---------------------------------------------------------- computing */
  {
    q: ['what is javascript', 'ano ang javascript'],
    a:
      '**JavaScript** is the programming language browsers run. Everything in 360AI — this answer ' +
      'included — is plain JavaScript executing on your device.',
  },
  {
    q: ['what is a pwa', 'ano ang pwa', 'progressive web app'],
    a:
      'A **Progressive Web App** is a website that can be installed like a native app: it gets an ' +
      'icon, opens without browser chrome, and works offline through a service worker.',
  },
  {
    q: ['what is ai', 'ano ang ai', 'artificial intelligence'],
    a:
      '**Artificial intelligence** is any system that performs tasks we associate with human ' +
      'reasoning. It covers both trained models (which learn patterns from data) and rules engines ' +
      'like me (which follow logic a person wrote).',
  },
  {
    q: ['what is an llm', 'ano ang llm', 'large language model'],
    a:
      'A **large language model** predicts the next piece of text from patterns learned over huge ' +
      'amounts of writing. Its knowledge lives in billions of numbers called weights — which is why ' +
      'an LLM needs a multi-gigabyte download and I do not.',
  },
  {
    q: ['what is indexeddb', 'ano ang indexeddb'],
    a: '**IndexedDB** is the browser\'s built-in database. 360AI keeps your chats and taught facts there, on this device.',
  },
  {
    q: ['binary to decimal', 'ano ang binary', 'what is binary'],
    a:
      '**Binary** counts with only 0 and 1, each place worth twice the one to its right: ' +
      '1011 = 8+0+2+1 = **11**. Computers use it because a circuit is either on or off.',
  },
  {
    q: ['how many bytes in a megabyte', 'pila ka byte sa megabyte'],
    a:
      '1 MB = 1,000,000 bytes in decimal (what storage makers use), or 1,048,576 bytes as a MiB ' +
      '(what operating systems often show). Ask me to convert and I will do the arithmetic.',
  },

  /* ------------------------------------------------------- everyday life */
  {
    q: ['how many days in a year', 'pila ka adlaw sa isa ka tuig'],
    a: 'A normal year has **365 days**; a leap year has 366. Leap years are divisible by 4, except centuries not divisible by 400.',
  },
  {
    q: ['days in each month', 'pila ka adlaw kada bulan'],
    a:
      '31 days: January, March, May, July, August, October, December. 30 days: April, June, ' +
      'September, November. February has 28, or 29 in a leap year.',
  },
  {
    q: ['how many hours of sleep', 'pila ka oras nga tulog', 'ilang oras na tulog'],
    a:
      'Adults generally do best on **7–9 hours** a night, teenagers on 8–10, and young children on ' +
      'more still. General information, not medical advice.',
  },
  {
    q: ['emergency number philippines', 'emergency hotline'],
    a: 'In the Philippines the national emergency hotline is **911**. The Red Cross is 143.',
  },
  {
    q: ['what is bmi', 'how to compute bmi'],
    a:
      '**BMI** = weight in kg ÷ (height in metres)². Roughly: under 18.5 underweight, 18.5–24.9 ' +
      'normal, 25–29.9 overweight, 30+ obese. It is a crude screen, not a diagnosis.',
  },
  {
    q: ['tip calculation', 'how much to tip', 'service charge'],
    a: 'Ask me directly — for example `15% of 850` — and I will work it out. In the Philippines a service charge is often already on the bill.',
  },
]

/**
 * Everything above, flattened into one lookup list. `source` distinguishes the
 * built-in entries from the ones the user taught, which matters for editing.
 */
export function builtinEntries() {
  return FACTS.map((f, i) => ({
    id: `builtin-${i}`,
    source: 'builtin',
    q: f.q,
    a: f.a,
  }))
}
