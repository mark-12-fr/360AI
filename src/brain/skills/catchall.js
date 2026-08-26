import { normalise, contentWords, coreQuestion, overlapScore } from '../nlp.js'

const CATCHALL_QA = [
  {
    q: ['why might the average be misleading', 'average misleading', 'mean misleading', 'problems with average'],
    a: `## Why Average Can Be Misleading

The arithmetic mean (average) can give a wrong picture of data in several situations:

### 1. Outliers Skew the Average
**Example**: In a room of 9 people earning 50,000 and 1 billionaire, the average is 100 million. But nobody actually earns close to that.

### 2. Skewed Data
When data is not symmetric, the mean pulls toward the tail and does not represent typical values. **Use median instead.**

### 3. Bimodal Data
When there are two distinct groups (e.g., test scores with many 40s and many 90s), the average might be 65, which represents nobody.

### 4. Small Sample Size
With few data points, one extreme value dramatically changes the mean.

### 5. Non-Numeric Limitations
Average cannot capture patterns, distribution shape, or relationships.

### Better Alternatives:
- **Median**: Middle value, resistant to outliers
- **Mode**: Most common value
- **Range**: Shows spread
- **Standard deviation**: Shows consistency
- **Quartiles**: Shows distribution shape`
  },
  {
    q: ['how does the brain work', 'brain explained', 'how does thinking work', 'neuroscience basics'],
    a: `## How the Brain Works

### Basic Structure
- **Cerebrum**: Thinking, memory, language (85% of brain)
- **Cerebellum**: Movement, balance
- **Brainstem**: Breathing, heartbeat

### Neurons and Signals
- 86 billion neurons communicate via electrical signals
- Each neuron connects to ~7,000 others
- Signals travel at up to 268 mph

### Key Areas
- **Frontal lobe**: Decision-making, personality
- **Temporal lobe**: Memory, language
- **Parietal lobe**: Sensation, spatial awareness
- **Occipital lobe**: Vision

### How Thinking Works
1. Stimulus activates neurons
2. Neurons fire in patterns
3. Connections strengthen with use
4. Patterns form memories
5. Different areas work together

### Brain Facts
- Uses 20% of body energy
- 73% water
- Active during sleep
- Cannot feel pain (no pain receptors)
- Weighs about 3 pounds`
  },
  {
    q: ['how does memory work', 'types of memory', 'how to improve memory', 'memory explained'],
    a: `## How Memory Works

### Types of Memory
- **Sensory**: Lasts 1-3 seconds
- **Short-term**: Lasts 15-30 seconds, holds 7 items
- **Long-term**: Can last forever, unlimited capacity
- **Working memory**: Active manipulation of information

### Memory Formation
1. **Encoding**: Converting experience to neural signals
2. **Storage**: Maintaining neural connections
3. **Retrieval**: Accessing stored information

### Factors Affecting Memory
- Sleep (consolidation)
- Attention (focus)
- Emotion (stronger memories)
- Repetition (strengthens connections)
- Association (links to existing knowledge)

### Memory Tricks
- **Chunking**: Group information (123-456-7890)
- **Mnemonics**: Royal Purple Very Old Men Ate Nine Pies
- **Spaced repetition**: Review at increasing intervals
- **Active recall**: Test yourself
- **Story method**: Connect facts in a narrative`
  },
  {
    q: ['how does the internet work', 'internet explained', 'how does wifi work', 'internet basics'],
    a: `## How the Internet Works

### Basic Concept
Internet = network of networks connecting computers worldwide.

### How Data Travels
1. You request a webpage
2. Your device sends data packets
3. Packets travel through routers
4. Reach the destination server
5. Server sends data back
6. Your browser assembles the page

### Key Technologies
- **TCP/IP**: Rules for data transmission
- **DNS**: Translates domain names to IP addresses
- **HTTP/HTTPS**: Protocols for web pages
- **Fiber optics**: Light signals through glass cables
- **Wireless**: Radio waves (WiFi, cellular)

### Internet vs WWW
- Internet: Physical network infrastructure
- WWW: Service that runs on the internet

### Fun Facts
- 4.7 billion users worldwide
- First message: "LO" (crashed before sending "LOGIN")
- 500 hours of video uploaded to YouTube every minute
- Speed of light: Data travels 70% that speed in fiber`
  },
  {
    q: ['how does DNA work', 'DNA explained', 'what is DNA', 'genetics basics'],
    a: `## How DNA Works

### What is DNA?
Deoxyribonucleic acid - molecule that carries genetic instructions.

### Structure
- Double helix (twisted ladder)
- 4 bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C)
- A pairs with T, G pairs with C
- 3 billion base pairs in humans

### How It Works
1. **DNA** stores instructions
2. **RNA** copies the instructions
3. **Proteins** execute the instructions
4. Proteins build and maintain you

### Key Facts
- 20,000-25,000 genes
- 99.9% identical between all humans
- You share 60% with bananas
- 50% with bananas
- 70% with slugs
- 98.7% with chimpanzees

### DNA and Traits
- Eye color, hair color, height
- Susceptibility to diseases
- Metabolism rate
- Blood type
- Response to drugs`
  },
  {
    q: ['how does evolution work', 'evolution explained', 'natural selection', 'theory of evolution'],
    a: `## How Evolution Works

### Core Concept
Species change over time through natural selection.

### Natural Selection
1. **Variation**: Individuals differ
2. **Inheritance**: Traits pass to offspring
3. **Selection**: Some traits are advantageous
4. **Time**: Changes accumulate over generations

### Mechanisms of Evolution
- **Natural selection**: Survival of the fittest
- **Genetic drift**: Random changes
- **Gene flow**: Migration between populations
- **Mutation**: New genetic variations

### Evidence
- **Fossil record**: Shows gradual changes
- **Comparative anatomy**: Similar structures
- **Molecular biology**: DNA comparisons
- **Biogeography**: Island species distribution
- **Embryology**: Similar development stages

### Examples
- Antibiotic resistance in bacteria
- Darwin's finches (beak shapes)
- Peppered moths (color change)
- Dog breeds (artificial selection)

### Key Facts
- Earth is 4.5 billion years old
- Life began ~3.8 billion years ago
- All life shares common ancestor
- Evolution is not random (selection is not random)`
  },
  {
    q: ['how does climate change happen', 'climate change explained', 'global warming causes', 'greenhouse effect'],
    a: `## How Climate Change Happens

### The Greenhouse Effect
1. Sun heats Earth
2. Earth radiates heat back
3. Greenhouse gases trap some heat
4. This keeps Earth warm enough for life

### Human Activities Increasing Greenhouse Gases
- Burning fossil fuels (coal, oil, gas)
- Deforestation (less CO2 absorbed)
- Agriculture (methane from livestock)
- Industrial processes
- Waste decomposition

### Key Greenhouse Gases
- **CO2**: From burning fossil fuels
- **Methane**: From agriculture, natural gas
- **Nitrous oxide**: From fertilizers
- **Water vapor**: Most abundant greenhouse gas

### Effects
- Rising temperatures
- Melting ice caps
- Rising sea levels
- Extreme weather events
- Ocean acidification
- Ecosystem disruption

### What Can Be Done
- Renewable energy
- Energy efficiency
- Reforestation
- Sustainable agriculture
- Reduce, reuse, recycle`
  },
  {
    q: ['how does electricity work', 'electricity explained', 'what is electricity', 'electricity basics'],
    a: `## How Electricity Works

### What is Electricity?
Flow of electrons through a conductor.

### Key Concepts
- **Voltage (V)**: Pressure pushing electrons (like water pressure)
- **Current (I)**: Flow of electrons (like water flow)
- **Resistance (R)**: Opposition to flow (like pipe width)
- **Ohm's Law**: V = I x R

### Conductors vs Insulators
- **Conductors**: Allow electron flow (copper, aluminum, water)
- **Insulators**: Block electron flow (rubber, plastic, glass)

### How It's Generated
1. **Mechanical**: Turbine spins generator
2. **Chemical**: Battery chemical reactions
3. **Solar**: Light excites electrons
4. **Heat**: Temperature difference creates current

### Circuit Basics
- **Series**: One path for current
- **Parallel**: Multiple paths
- **Open circuit**: Broken path (no flow)
- **Closed circuit**: Complete path (current flows)

### Safety
- Never touch live wires
- Water conducts electricity
- Use fuses/circuit breakers
- Ground wires prevent shocks`
  },
]

const CATCHALL_PATTERNS = [
  /\b(why|how|what|when|where|who)\s+(might|could|would|does|do|is|are|was|were|will)\b/i,
  /\b(explain|describe|tell me about|inform me about|describe)\b/i,
  /\b(what is the|what are the|what causes|how does|how do)\b/i,
  /\b(why do|why is|why are|why does|why did|why would|why should)\b/i,
  /\b(is it true|is it possible|can you|could you|would you)\b/i,
  /\b(difference between|compare|versus|vs|or)\s+\w+/i,
  /\b(advantages|disadvantages|benefits|drawbacks|pros|cons)\s+(of|about|for)\b/i,
]

function scoreEntry(query, entry) {
  const q = normalise(query)
  const words = contentWords(q)
  let best = 0
  for (const phrase of entry.q) {
    const p = normalise(phrase)
    if (!p) continue
    if (q === p) return 1
    if (q.includes(p) && p.length > 6) best = Math.max(best, 0.95)
    if (p.includes(q) && q.length > 6) best = Math.max(best, 0.85)
    const overlap = overlapScore(words, contentWords(phrase))
    const reverse = overlapScore(contentWords(phrase), words)
    best = Math.max(best, overlap * 0.7 + reverse * 0.3)
  }
  return best
}

export default {
  id: 'catchall',
  label: 'General knowledge catch-all',
  examples: [
    'why might the average be misleading in some datasets?',
    'how does the brain work',
    'how does memory work',
    'how does the internet work',
    'how does DNA work',
    'how does evolution work',
    'how does climate change happen',
    'how does electricity work',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    const hasPattern = CATCHALL_PATTERNS.some(p => p.test(s))
    if (!hasPattern) return null

    let best = null
    for (const entry of CATCHALL_QA) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.3) return null

    return {
      score: Math.min(0.85, best.score),
      subject: 'General Knowledge',
      text: best.entry.a,
    }
  },
}
