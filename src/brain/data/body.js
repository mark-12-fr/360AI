/**
 * The human body: the systems, and the organs inside them.
 *
 * The glossary already defined the pieces — neuron, hormone, enzyme. What it
 * could not answer was "what are the systems of the human body", "what does
 * the liver do", "how many bones are there", which is most of what a biology
 * class actually asks for.
 *
 * Figures are the standard teaching ones for a healthy adult. Bodies vary, and
 * where a number is an average rather than a fact the card says so.
 */

export const BODY = [
  {
    id: 'body-systems',
    q: ['body systems', 'systems of the human body', 'organ systems', 'how many body systems'],
    title: 'The eleven systems of the human body',
    body:
      '| System | What it does | Main parts |\n| --- | --- | --- |\n' +
      '| Circulatory | moves blood, oxygen, nutrients | heart, blood vessels, blood |\n' +
      '| Respiratory | takes in oxygen, removes CO₂ | nose, trachea, lungs, diaphragm |\n' +
      '| Digestive | breaks food down and absorbs it | mouth, stomach, intestines, liver |\n' +
      '| Nervous | senses and controls | brain, spinal cord, nerves |\n' +
      '| Skeletal | supports and protects | bones, cartilage, ligaments |\n' +
      '| Muscular | movement and posture | skeletal, smooth and cardiac muscle |\n' +
      '| Endocrine | chemical messages | pituitary, thyroid, pancreas, adrenals |\n' +
      '| Excretory | removes waste | kidneys, bladder, ureters, urethra |\n' +
      '| Immune | defends against disease | white blood cells, lymph nodes, spleen |\n' +
      '| Integumentary | covers and protects | skin, hair, nails |\n' +
      '| Reproductive | produces offspring | ovaries and uterus; testes |',
  },
  {
    id: 'heart',
    q: ['heart', 'how does the heart work', 'chambers of the heart', 'what does the heart do'],
    title: 'The heart',
    body:
      'A muscular pump about the size of a fist, beating roughly 60–100 times a minute at rest and around 100,000 times a day.\n\n' +
      '**Four chambers:** right atrium → right ventricle → lungs → left atrium → left ventricle → the body.\n\n' +
      '**The two circuits:** the *pulmonary* circuit sends oxygen-poor blood to the lungs; the *systemic* circuit sends oxygen-rich blood everywhere else. The left ventricle has the thickest wall because it pushes blood the whole way round the body.\n\n' +
      '**Valves** stop backflow — the sound of them closing is the "lub-dub" of a heartbeat.',
  },
  {
    id: 'lungs',
    q: ['lungs', 'respiratory system', 'how do we breathe', 'how does breathing work'],
    title: 'The lungs and breathing',
    body:
      'Air enters through the nose or mouth, passes down the trachea, divides into two bronchi — one per lung — and branches into ever-smaller bronchioles, ending in about 300 million **alveoli**, tiny air sacs wrapped in capillaries.\n\n' +
      'Gas exchange happens there: oxygen crosses into the blood, carbon dioxide crosses out.\n\n' +
      '**The mechanism:** the diaphragm contracts and flattens, the chest cavity enlarges, pressure inside drops, and air flows in. Breathing out is mostly the diaphragm relaxing.\n\n' +
      'A resting adult breathes about 12–20 times a minute. The right lung has three lobes, the left only two — the heart takes the space.',
  },
  {
    id: 'brain',
    q: ['brain', 'parts of the brain', 'what does the brain do', 'nervous system'],
    title: 'The brain and nervous system',
    body:
      '**Cerebrum** — the largest part, in two hemispheres. Thought, language, memory, voluntary movement, and the senses. Its four lobes: frontal (planning, decisions), parietal (touch, space), temporal (hearing, memory), occipital (vision).\n\n' +
      '**Cerebellum** — balance, coordination, and learned movement.\n\n' +
      '**Brainstem** — breathing, heartbeat, blood pressure, swallowing. The things you never decide to do.\n\n' +
      'The **spinal cord** carries signals between brain and body; **nerves** reach the rest. Roughly 86 billion neurons, passing signals electrically along themselves and chemically across synapses.',
  },
  {
    id: 'digestion',
    q: ['digestive system', 'digestion', 'how does digestion work', 'how do we digest food'],
    title: 'Digestion, from mouth to out',
    body:
      '1. **Mouth** — teeth break food up; saliva starts on the starch.\n' +
      '2. **Oesophagus** — muscular waves (peristalsis) push it down.\n' +
      '3. **Stomach** — acid and enzymes turn it into a paste; protein digestion begins.\n' +
      '4. **Small intestine** — where almost all absorption happens, helped by bile from the liver and enzymes from the pancreas. About 6 m long, lined with villi that multiply its surface area.\n' +
      '5. **Large intestine** — absorbs water and salts; gut bacteria work on what is left.\n' +
      '6. **Rectum and anus** — what remains is passed.\n\n' +
      'The whole journey usually takes 24–72 hours.',
  },
  {
    id: 'bones',
    q: ['bones', 'how many bones', 'skeletal system', 'skeleton'],
    title: 'The skeleton',
    body:
      'An adult has **206 bones**. A newborn has around 270 — some fuse as they grow, especially in the skull and spine.\n\n' +
      '**What it does:** supports the body, protects the organs (skull, ribs, spine), anchors muscles so movement is possible, stores calcium, and makes blood cells in the bone marrow.\n\n' +
      '**Largest:** the femur, the thigh bone. **Smallest:** the stapes in the middle ear, about 3 mm.\n\n' +
      'Bone is living tissue — it is rebuilt continuously, which is why a break can heal and why weight-bearing exercise strengthens it.',
  },
  {
    id: 'blood',
    q: ['blood', 'blood types', 'what is blood made of', 'blood groups'],
    title: 'Blood and blood types',
    body:
      '**What it is made of:** plasma (about 55%, mostly water), red blood cells (carry oxygen using haemoglobin), white blood cells (defend against infection), and platelets (clotting).\n\n' +
      '**The ABO groups** depend on which antigens sit on the red cells; the Rh factor adds positive or negative.\n\n' +
      '| Type | Can receive from | Can give to |\n| --- | --- | --- |\n' +
      '| O− | O− | everyone |\n| O+ | O−, O+ | O+, A+, B+, AB+ |\n' +
      '| A− | O−, A− | A−, A+, AB−, AB+ |\n| B− | O−, B− | B−, B+, AB−, AB+ |\n' +
      '| AB+ | everyone | AB+ |\n\n' +
      '**O−** is the universal donor; **AB+** the universal recipient. An adult carries about 5 litres.',
  },
  {
    id: 'kidneys-liver',
    q: ['kidneys', 'liver', 'what does the liver do', 'what do the kidneys do', 'excretory system'],
    title: 'The liver and the kidneys',
    body:
      '**Liver** — the body\'s chemical plant, and its largest internal organ. It filters the blood coming from the gut, breaks down alcohol and drugs, stores glucose as glycogen and releases it when blood sugar falls, makes bile for digesting fat, makes the proteins that clot blood, and stores iron and several vitamins.\n\n' +
      '**Kidneys** — two, each about the size of a fist. They filter roughly 180 litres of blood a day, returning almost all of it and passing about 1–2 litres as urine. They also control blood pressure, the body\'s water and salt balance, and signal the marrow to make red blood cells.\n\n' +
      'Both can carry serious damage before symptoms appear, which is why they are checked by blood test rather than by feel.',
  },
  {
    id: 'senses',
    q: ['five senses', 'senses', 'how does the eye work', 'how does hearing work'],
    title: 'The senses',
    body:
      '**Sight** — light enters through the cornea and pupil, the lens focuses it on the retina, where rods (dim light, no colour) and cones (colour, detail) turn it into signals for the optic nerve.\n\n' +
      '**Hearing** — sound waves vibrate the eardrum, three small bones amplify it, and the cochlea turns the vibration into nerve signals. The inner ear also holds the organs of balance.\n\n' +
      '**Smell** — receptors high in the nose detect molecules in the air; it is the sense most tied to memory.\n\n' +
      '**Taste** — sweet, salty, sour, bitter and umami. Most of what is called flavour is actually smell.\n\n' +
      '**Touch** — receptors in the skin for pressure, temperature, vibration and pain.',
  },
]
