/**
 * General reference: a definitions glossary and the world's standing facts.
 *
 * Everything here is stable — definitions, physical constants, geography,
 * anatomy, historical dates. Nothing that changes with the news belongs in this
 * file, because there is no way to update it once someone has installed the app.
 *
 * The reference lists are assembled from here plus the topic files beside it:
 * formulas, the Philippines, and first aid. They are separate files because
 * each is a sheet somebody would look up as a whole, and because a 400-line
 * array of unrelated cards is nobody's idea of maintainable.
 */

import { FIRST_AID } from './firstaid.js'
import { FORMULAS } from './formulas.js'
import { PHILIPPINES } from './philippines.js'

/** term → definition. Keys are lowercase; the skill matches them fuzzily. */
export const GLOSSARY = {
  /* ------------------------------------------------------------- biology */
  photosynthesis:
    'How plants make food: using sunlight, they turn carbon dioxide and water into glucose and release oxygen. It is the base of almost every food chain.',
  respiration:
    'How cells release energy from food. Aerobic respiration uses oxygen and produces carbon dioxide, water and ATP.',
  mitosis: 'Cell division that makes two identical cells, used for growth and repair.',
  meiosis:
    'Cell division that makes sex cells (egg and sperm), each with half the chromosomes, so offspring get a mix from both parents.',
  dna: 'Deoxyribonucleic acid — the double-helix molecule carrying genetic instructions. Its four bases are A, T, G and C.',
  rna: 'A single-stranded relative of DNA that carries genetic messages and helps build proteins.',
  gene: 'A stretch of DNA coding for one trait or protein. Humans have roughly 20,000 of them.',
  chromosome: 'A packaged strand of DNA. Humans have 46, in 23 pairs.',
  enzyme: 'A protein that speeds up a chemical reaction in a living thing without being used up.',
  protein: 'A chain of amino acids folded into a shape. Proteins build tissue, carry oxygen and run cell chemistry.',
  bacteria: 'Single-celled organisms without a nucleus. Most are harmless or useful; some cause disease.',
  virus:
    'A packet of genetic material in a protein coat. It is not alive on its own — it must hijack a living cell to copy itself.',
  ecosystem: 'A community of living things plus the non-living environment they interact with.',
  evolution:
    'Change in the inherited traits of a population over generations. Natural selection is its main mechanism: traits that help survival become more common.',
  homeostasis: 'A body keeping its internal conditions steady — temperature, blood sugar, water balance.',
  osmosis: 'Water moving across a membrane from where it is less concentrated in solutes to where it is more.',
  diffusion: 'Particles spreading from a crowded area to a less crowded one until evenly spread.',
  antibiotic: 'A medicine that kills bacteria or stops them multiplying. It has no effect on viruses.',
  vaccine: 'A preparation that teaches the immune system to recognise a pathogen before a real infection arrives.',
  antibody: 'A protein the immune system makes to lock onto and mark a specific invader.',
  metabolism: 'All the chemical reactions keeping an organism alive — building up and breaking down.',
  hormone: 'A chemical messenger carried in the blood that tells distant organs what to do.',
  neuron: 'A nerve cell. It carries electrical signals and passes them on chemically at synapses.',

  /* ----------------------------------------------------------- chemistry */
  atom: 'The smallest unit of an element: a nucleus of protons and neutrons with electrons around it.',
  molecule: 'Two or more atoms bonded together, such as H₂O or O₂.',
  element: 'A substance made of one kind of atom. There are 118 known elements.',
  compound: 'A substance made of two or more different elements chemically bonded in fixed proportions.',
  mixture: 'Substances physically combined but not chemically bonded — they keep their own properties.',
  'periodic table':
    "Mendeleev's arrangement of the elements by atomic number, where columns share chemical behaviour.",
  ion: 'An atom that has gained or lost electrons, giving it a negative or positive charge.',
  acid: 'A substance that donates hydrogen ions in water; pH below 7. Vinegar and stomach acid are examples.',
  base: 'A substance that accepts hydrogen ions; pH above 7. Soap and baking soda are examples.',
  ph: 'A 0–14 scale of acidity. 7 is neutral, below 7 acidic, above 7 basic. Each step is a tenfold change.',
  catalyst: 'Something that speeds up a reaction without being consumed by it.',
  oxidation: 'A reaction where a substance loses electrons — rusting and burning are common examples.',
  'chemical bond': 'The force holding atoms together — ionic (transferred electrons), covalent (shared) or metallic.',
  mole: 'The chemist\'s counting unit: 6.022 × 10²³ particles, called Avogadro\'s number.',
  isotope: 'Atoms of the same element with different numbers of neutrons, and so different masses.',

  /* ------------------------------------------------------------- physics */
  gravity:
    'The attraction between anything with mass. On Earth it accelerates falling objects at about 9.8 m/s².',
  force: 'A push or pull that changes an object\'s motion. Measured in newtons: force = mass × acceleration.',
  energy: 'The capacity to do work. It cannot be created or destroyed, only changed in form.',
  work: 'Force applied over a distance: work = force × distance, measured in joules.',
  power: 'How fast work is done: power = work ÷ time, measured in watts.',
  velocity: 'Speed in a given direction — a vector, unlike plain speed.',
  acceleration: 'How quickly velocity changes, in metres per second squared.',
  momentum: 'Mass × velocity. In a closed system, total momentum is conserved.',
  friction: 'The force resisting motion between surfaces in contact.',
  inertia: "An object's resistance to a change in its motion — Newton's first law.",
  'newtons laws':
    "1) An object stays at rest or in uniform motion unless a force acts. 2) F = ma. 3) Every action has an equal and opposite reaction.",
  electricity: 'The flow of electric charge, usually electrons through a conductor.',
  voltage: 'The electrical pressure pushing charge through a circuit, in volts. Ohm\'s law: V = I × R.',
  current: 'The rate of flow of electric charge, in amperes.',
  resistance: 'How much a material opposes current, in ohms.',
  magnetism: 'The force produced by moving charges, and by certain materials whose atoms align.',
  wave: 'A disturbance that transfers energy without transferring matter. Described by wavelength, frequency and amplitude.',
  frequency: 'How many wave cycles pass a point per second, in hertz.',
  'speed of light': '299,792,458 metres per second in a vacuum — the universal speed limit.',
  relativity:
    "Einstein's theory: measurements of space and time depend on the observer's motion, and mass and energy are equivalent (E = mc²).",
  'quantum mechanics':
    'The physics of the very small, where energy comes in discrete packets and particles behave as waves and probabilities.',
  thermodynamics:
    'The physics of heat and energy. Its first law: energy is conserved. Its second: entropy (disorder) always increases overall.',
  entropy: 'A measure of disorder in a system. Left alone, it increases.',

  /* ---------------------------------------------------------------- maths */
  algebra: 'The branch of mathematics that uses letters for unknown numbers and studies the rules for manipulating them.',
  geometry: 'The mathematics of shape, size, position and space.',
  trigonometry: 'The mathematics of triangles and the relationships between their angles and sides — sine, cosine, tangent.',
  calculus:
    'The mathematics of continuous change. Differential calculus deals with rates of change; integral calculus with accumulation.',
  derivative: 'The instantaneous rate of change of a function — the slope of its curve at a point.',
  integral: 'The accumulation of a quantity — the area under a curve.',
  'pythagorean theorem': 'In a right triangle, a² + b² = c², where c is the hypotenuse.',
  'prime number': 'A whole number greater than 1 divisible only by 1 and itself: 2, 3, 5, 7, 11, 13…',
  pi: 'π ≈ 3.14159 — the ratio of a circle\'s circumference to its diameter. It never ends and never repeats.',
  mean: 'The average: add the values and divide by how many there are.',
  median: 'The middle value when the numbers are sorted.',
  mode: 'The value that appears most often.',
  probability: 'How likely something is, from 0 (impossible) to 1 (certain).',
  percentage: 'A part per hundred. 25% means 25 out of every 100, or 0.25.',
  ratio: 'A comparison of two quantities, written a : b.',
  factorial: 'n! is the product of all whole numbers from 1 to n. 5! = 120.',
  fraction: 'A part of a whole, written as a numerator over a denominator.',
  'standard deviation': 'A measure of how spread out numbers are from their mean.',

  /* ------------------------------------------------------------ computing */
  algorithm: 'A precise, finite set of steps for solving a problem.',
  'programming language': 'A formal language for writing instructions a computer can execute — Python, JavaScript, C, Java.',
  javascript: 'The programming language browsers run. 360AI itself is written entirely in it.',
  python: 'A readable, general-purpose programming language, dominant in data science and automation.',
  html: 'HyperText Markup Language — the structure of a web page.',
  css: 'Cascading Style Sheets — how a web page looks.',
  database: 'An organised store of data that can be queried and updated efficiently.',
  sql: 'Structured Query Language — the standard way to ask a relational database for data.',
  api: 'Application Programming Interface — an agreed way for one program to ask another for something.',
  'operating system': 'The software managing a computer\'s hardware and running its programs — Windows, macOS, Linux, Android, iOS.',
  cpu: 'Central Processing Unit — the chip that executes instructions. Its speed is measured in gigahertz.',
  gpu: 'Graphics Processing Unit — a chip with thousands of small cores, ideal for graphics and parallel maths.',
  ram: 'Random Access Memory — fast temporary working memory, emptied when power is lost.',
  'ssd': 'Solid State Drive — storage with no moving parts, much faster than a hard disk.',
  binary: 'Base-2 counting with only 0 and 1, each place worth twice the one to its right. 1011 = 11.',
  bit: 'The smallest unit of data: a single 0 or 1. Eight bits make a byte.',
  byte: 'Eight bits — roughly one character of text.',
  encryption: 'Scrambling data so only someone with the key can read it.',
  'machine learning': 'Software that improves at a task by finding patterns in data instead of being explicitly programmed.',
  'artificial intelligence':
    'Any system doing tasks we associate with human reasoning. It covers trained models and rules engines like 360AI alike.',
  'neural network': 'A model loosely inspired by brain cells: layers of weighted connections tuned by training data.',
  llm: 'Large Language Model — a neural network trained to predict text, with knowledge stored in billions of weights.',
  server: 'A computer that provides data or services to other computers over a network.',
  cloud: "Computing done on someone else's servers, rented over the internet.",
  'ip address': 'The numeric address identifying a device on a network.',
  cache: 'A small fast store of recently used data, kept so it need not be fetched again.',
  cookie: 'A small file a website stores in your browser to remember you between visits.',
  firewall: 'A barrier that filters network traffic according to rules.',
  malware: 'Software written to damage or intrude — viruses, worms, ransomware, spyware.',
  phishing: 'Tricking someone into giving up passwords or money by impersonating someone they trust.',
  'open source': 'Software whose source code anyone may read, modify and share.',
  git: 'A version control system that records every change to a project and lets people work in parallel.',

  /* ------------------------------------------------------------- business */
  economics: 'The study of how people and societies allocate limited resources.',
  inflation: 'A general rise in prices over time, which reduces what each peso buys.',
  gdp: 'Gross Domestic Product — the total value of goods and services a country produces in a year.',
  recession: 'A significant, sustained decline in economic activity, often two consecutive quarters of shrinking GDP.',
  'supply and demand':
    'The core price mechanism: when supply rises or demand falls, price tends to drop, and vice versa.',
  capital: 'Money or assets put to work to produce more value.',
  asset: 'Anything of value that a person or business owns.',
  liability: 'Anything a person or business owes.',
  equity: 'What is left of the assets after liabilities are paid — the owner\'s share.',
  revenue: 'Total money earned from sales before any costs are subtracted.',
  profit: 'Revenue minus all costs. Gross profit subtracts only direct costs; net profit subtracts everything.',
  'break even': 'The point where revenue exactly covers costs — no profit, no loss.',
  roi: 'Return on Investment — gain minus cost, divided by cost, expressed as a percentage.',
  interest: 'The price of borrowing money. Simple interest is on the principal only; compound interest is on the accumulated total.',
  'compound interest': 'Interest earned on interest. It is why savings and debt both grow faster than they first appear.',
  depreciation: 'The gradual loss in value of an asset over its useful life.',
  'balance sheet': 'A snapshot of what a business owns and owes at one moment: assets = liabilities + equity.',
  'income statement': 'A record of revenue, expenses and profit over a period.',
  'cash flow': 'The actual movement of money in and out of a business — profitable businesses still fail without it.',
  budget: 'A plan of expected income and spending over a period.',
  tax: 'A compulsory payment to government, levied on income, sales, property or transfers.',
  vat: 'Value Added Tax — a consumption tax added at each stage of production. In the Philippines it is 12%.',
  marketing: 'Everything done to understand a market and bring a product to it — the 4 Ps: product, price, place, promotion.',
  entrepreneurship: 'Identifying an opportunity and building an organisation to pursue it, carrying the risk.',
  franchise: 'A licence to run a business under an established brand and system, for a fee and royalties.',
  logistics: 'Planning and executing the movement and storage of goods.',
  'supply chain': 'The whole network from raw materials to the customer\'s hands.',

  /* --------------------------------------------------- society, law, misc */
  democracy: 'A system where power comes from the people, usually exercised through elected representatives.',
  republic: 'A state where the head of state is elected rather than inherited.',
  constitution: 'The fundamental law setting out how a state is organised and what rights it guarantees.',
  'human rights': 'Rights every person holds simply by being human — life, liberty, expression, due process, and more.',
  federalism: 'A system dividing power between a national government and regional governments.',
  'separation of powers': 'Splitting government into executive, legislative and judicial branches so each checks the others.',
  'due process': 'The requirement that the state follow fair legal procedure before depriving anyone of life, liberty or property.',
  contract: 'A legally binding agreement — offer, acceptance and consideration.',
  culture: 'The shared beliefs, practices and artefacts of a group, passed on by learning rather than genes.',
  globalization: 'The growing interconnection of economies, cultures and populations across borders.',
  urbanization: 'The shift of population from rural areas into cities.',
  sustainability: 'Meeting present needs without leaving future generations unable to meet theirs.',
  'climate change':
    'Long-term shifts in temperature and weather patterns, driven since the 1800s mainly by burning fossil fuels.',
  'greenhouse effect':
    'Gases such as CO₂ and methane trapping heat in the atmosphere. Without it Earth would freeze; too much of it warms the planet.',
  'renewable energy': 'Energy from sources that replenish naturally — solar, wind, hydro, geothermal, biomass.',
  pandemic: 'An epidemic that has spread across countries or continents.',
  'first aid': 'Immediate help given to an injured or ill person before professional care arrives.',
  bmi: 'Body Mass Index — weight in kg divided by height in metres squared. A rough screen, not a diagnosis.',
  'blood pressure':
    'The force of blood against artery walls, written systolic over diastolic. Around 120/80 mmHg is considered normal.',
  diabetes: 'A condition where blood sugar stays too high, because the body makes too little insulin or resists it.',
  hypertension: 'Persistently high blood pressure, a major risk factor for stroke and heart disease.',
  pedagogy: 'The method and practice of teaching.',
  curriculum: 'The planned content and sequence of what is taught in a course or school.',
  thesis: 'A substantial piece of original research written to complete a degree.',
  plagiarism: 'Presenting someone else\'s work or ideas as your own.',
  bibliography: 'The list of sources consulted for a piece of work.',
  hypothesis: 'A testable proposed explanation, stated before the evidence is gathered.',
  'scientific method':
    'Observe, form a hypothesis, predict, test by experiment, analyse, and revise — with results checked by others.',
  variable:
    'Anything that can change in an experiment. The independent variable is changed on purpose; the dependent one is measured.',
  'qualitative research': 'Research into meaning and experience, using interviews, observation and text rather than numbers.',
  'quantitative research': 'Research using measurement and statistics to test relationships between variables.',
}

/**
 * Reference lists — the answers to "what are the…" and "which is the biggest…"
 * questions. Each entry is a title plus rows, rendered as a table or list.
 */
const CORE = [
  {
    id: 'planets',
    q: ['planets', 'solar system', 'planets in order', 'how many planets'],
    title: 'The eight planets, in order from the Sun',
    body:
      '1. **Mercury** — smallest, no atmosphere, 88-day year\n' +
      '2. **Venus** — hottest at ~465 °C, thick CO₂ atmosphere\n' +
      '3. **Earth** — the only known life; 1 moon\n' +
      '4. **Mars** — the red planet; 2 small moons\n' +
      '5. **Jupiter** — largest; a gas giant with 95+ moons\n' +
      '6. **Saturn** — the ring system; least dense planet\n' +
      '7. **Uranus** — ice giant, tilted on its side\n' +
      '8. **Neptune** — farthest, windiest, 165-year orbit\n\n' +
      'Pluto has been classed a dwarf planet since 2006.',
  },
  {
    id: 'continents',
    q: ['continents', 'how many continents', 'list of continents'],
    title: 'The seven continents',
    body:
      '| Continent | Area (km²) | Countries |\n| --- | --- | --- |\n' +
      '| Asia | 44,579,000 | 49 |\n| Africa | 30,370,000 | 54 |\n' +
      '| North America | 24,709,000 | 23 |\n| South America | 17,840,000 | 12 |\n' +
      '| Antarctica | 14,200,000 | 0 |\n| Europe | 10,180,000 | 44 |\n| Oceania | 8,526,000 | 14 |',
  },
  {
    id: 'oceans',
    q: ['oceans', 'how many oceans', 'largest ocean'],
    title: 'The five oceans',
    body:
      '1. **Pacific** — 165.2 million km², deepest point Challenger Deep at 10,935 m\n' +
      '2. **Atlantic** — 106.4 million km²\n' +
      '3. **Indian** — 70.6 million km²\n' +
      '4. **Southern (Antarctic)** — 21.9 million km²\n' +
      '5. **Arctic** — 14.1 million km², smallest and shallowest',
  },
  {
    id: 'tallest-mountains',
    q: ['tallest mountain', 'highest mountain', 'mount everest height', 'highest peaks'],
    title: 'The highest mountains',
    body:
      '1. **Everest** (Nepal/China) — 8,849 m\n2. **K2** (Pakistan/China) — 8,611 m\n' +
      '3. **Kangchenjunga** (Nepal/India) — 8,586 m\n4. **Lhotse** — 8,516 m\n5. **Makalu** — 8,485 m\n\n' +
      'The highest in the Philippines is **Mount Apo**, 2,954 m.',
  },
  {
    id: 'longest-rivers',
    q: ['longest river', 'longest rivers in the world', 'nile length'],
    title: 'The longest rivers',
    body:
      '1. **Nile** (Africa) — 6,650 km\n2. **Amazon** (South America) — 6,400 km, by far the largest by volume\n' +
      '3. **Yangtze** (China) — 6,300 km\n4. **Mississippi–Missouri** (USA) — 6,275 km\n5. **Yenisei** (Russia) — 5,539 km\n\n' +
      'The longest in the Philippines is the **Cagayan River**, 505 km.',
  },
  {
    id: 'largest-countries',
    q: ['largest country', 'biggest country', 'largest countries by area'],
    title: 'The largest countries by area',
    body:
      '1. **Russia** — 17,098,246 km²\n2. **Canada** — 9,984,670 km²\n3. **United States** — 9,833,520 km²\n' +
      '4. **China** — 9,596,961 km²\n5. **Brazil** — 8,515,767 km²\n\n' +
      'The smallest is **Vatican City** at 0.49 km².',
  },
  {
    id: 'body-systems',
    q: ['body systems', 'organ systems', 'systems of the human body'],
    title: 'The human body systems',
    body:
      '- **Circulatory** — heart, blood, vessels; moves oxygen and nutrients\n' +
      '- **Respiratory** — lungs and airways; gas exchange\n' +
      '- **Digestive** — mouth to intestines; breaks down food\n' +
      '- **Nervous** — brain, spinal cord, nerves; control and sensation\n' +
      '- **Skeletal** — 206 bones; structure and protection\n' +
      '- **Muscular** — over 600 muscles; movement\n' +
      '- **Endocrine** — glands and hormones; long-term regulation\n' +
      '- **Immune/Lymphatic** — defence against infection\n' +
      '- **Urinary** — kidneys and bladder; filtering waste\n' +
      '- **Integumentary** — skin, hair, nails; the outer barrier\n' +
      '- **Reproductive** — producing offspring',
  },
  {
    id: 'ph-facts',
    q: ['philippines facts', 'about the philippines', 'philippine information'],
    title: 'The Philippines at a glance',
    body:
      '- **Capital:** Manila · **Largest city:** Quezon City\n' +
      '- **Islands:** 7,641 · **Regions:** 18 · **Provinces:** 82\n' +
      '- **Population:** about 114 million\n' +
      '- **Official languages:** Filipino and English, with around 175 living languages\n' +
      '- **Currency:** Philippine peso (PHP)\n' +
      '- **Independence:** declared 12 June 1898; recognised by the US on 4 July 1946\n' +
      '- **Highest point:** Mount Apo (2,954 m) · **Longest river:** Cagayan (505 km)',
  },
  {
    id: 'ph-presidents',
    q: ['philippine presidents', 'presidents of the philippines', 'list of presidents'],
    title: 'Presidents of the Philippines',
    body:
      'Emilio Aguinaldo (1899–1901) · Manuel L. Quezon (1935–1944) · José P. Laurel (1943–1945) · ' +
      'Sergio Osmeña (1944–1946) · Manuel Roxas (1946–1948) · Elpidio Quirino (1948–1953) · ' +
      'Ramon Magsaysay (1953–1957) · Carlos P. Garcia (1957–1961) · Diosdado Macapagal (1961–1965) · ' +
      'Ferdinand E. Marcos (1965–1986) · Corazon C. Aquino (1986–1992) · Fidel V. Ramos (1992–1998) · ' +
      'Joseph Estrada (1998–2001) · Gloria Macapagal Arroyo (2001–2010) · Benigno Aquino III (2010–2016) · ' +
      'Rodrigo Duterte (2016–2022) · Ferdinand Marcos Jr. (2022– )\n\n' +
      '*This list ends where my knowledge was written; I cannot see anything after that.*',
  },
  {
    id: 'seven-wonders',
    q: ['seven wonders', 'wonders of the world', 'new seven wonders'],
    title: 'The New Seven Wonders of the World (2007)',
    body:
      '- **Great Wall of China**\n- **Petra**, Jordan\n- **Christ the Redeemer**, Brazil\n' +
      '- **Machu Picchu**, Peru\n- **Chichén Itzá**, Mexico\n- **Colosseum**, Italy\n- **Taj Mahal**, India\n\n' +
      'The Great Pyramid of Giza — the only surviving ancient wonder — was given honorary status.',
  },
  {
    id: 'water-cycle',
    q: ['water cycle', 'hydrologic cycle', 'stages of the water cycle'],
    title: 'The water cycle',
    body:
      '1. **Evaporation** — the sun turns surface water to vapour\n' +
      '2. **Transpiration** — plants release vapour through their leaves\n' +
      '3. **Condensation** — vapour cools and forms clouds\n' +
      '4. **Precipitation** — rain, snow or hail falls\n' +
      '5. **Collection / Runoff** — water returns to rivers, lakes, oceans and groundwater',
  },
  {
    id: 'states-of-matter',
    q: ['states of matter', 'solid liquid gas', 'phases of matter'],
    title: 'The states of matter',
    body:
      '- **Solid** — fixed shape and volume; particles vibrate in place\n' +
      '- **Liquid** — fixed volume, takes the shape of its container\n' +
      '- **Gas** — fills whatever contains it; particles move freely\n' +
      '- **Plasma** — ionised gas, the most common state in the universe (stars, lightning)\n\n' +
      'Changes: melting, freezing, evaporation, condensation, sublimation, deposition.',
  },
  {
    id: 'parts-of-speech',
    q: ['parts of speech', 'grammar parts of speech'],
    title: 'The eight parts of speech',
    body:
      '- **Noun** — a person, place, thing or idea\n- **Pronoun** — stands in for a noun\n' +
      '- **Verb** — an action or state of being\n- **Adjective** — describes a noun\n' +
      '- **Adverb** — describes a verb, adjective or another adverb\n' +
      '- **Preposition** — shows relation (in, on, under, between)\n' +
      '- **Conjunction** — joins words or clauses (and, but, because)\n' +
      '- **Interjection** — an exclamation (oh!, wow!)',
  },
  {
    id: 'world-wars',
    q: ['world war', 'world war 1', 'world war 2', 'ww2', 'ww1'],
    title: 'The two World Wars',
    body:
      '**World War I (1914–1918)** — triggered by the assassination of Archduke Franz Ferdinand; ' +
      'Allies against the Central Powers; roughly 17 million dead; ended with the Treaty of Versailles.\n\n' +
      '**World War II (1939–1945)** — began with Germany\'s invasion of Poland; Allies against the Axis; ' +
      'roughly 70–85 million dead including the Holocaust; ended with Germany\'s surrender in May 1945 and ' +
      "Japan's in September 1945. The Philippines was occupied from 1942 to 1945.",
  },
  {
    id: 'solar-eclipse',
    q: ['eclipse', 'solar eclipse', 'lunar eclipse'],
    title: 'Eclipses',
    body:
      'A **solar eclipse** happens when the Moon passes between the Sun and Earth, blocking the Sun. ' +
      'A **lunar eclipse** happens when Earth passes between the Sun and Moon, casting its shadow on the Moon. ' +
      'They do not happen monthly because the Moon\'s orbit is tilted about 5° from Earth\'s.',
  },
]

/**
 * Everything the "what are the…" lookup searches. Order matters only for ties,
 * and the core list is first because it holds the broadest questions.
 */
export const REFERENCE = [...CORE, ...FORMULAS, ...PHILIPPINES, ...FIRST_AID]
