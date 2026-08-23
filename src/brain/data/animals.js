/**
 * Animals — the other "what is a…" the brain had nothing for.
 *
 * "what is a carabao", "how long do elephants live", "what do pandas eat" and
 * "fastest animal" all came back empty. They are among the most-asked questions
 * a school child has, so this closes them for the animals a curriculum names,
 * with the Philippine ones first because no other reference bothers.
 *
 * Tuples, as elsewhere:
 *
 *   [ name, aliases, group, diet, habitat, lifespan, fact ]
 *
 * Lifespans are typical in the wild and are given as ranges — a single figure
 * would be a false precision, since captivity routinely doubles them.
 */

const ROWS = [
  /* ---------------------------------------------------------- Philippines */
  ['Carabao', 'carabao|water buffalo|kalabaw', 'Mammal', 'Herbivore — grass, rice straw', 'Farms and wetlands, Southeast Asia', '18–25 years',
   'The Philippine domestic water buffalo and the national animal in everything but law — no statute ever declared it. Pulls the plough and gives the milk that becomes carabao cheese and pastillas.'],
  ['Philippine eagle', 'philippine eagle|monkey eating eagle|haring ibon', 'Bird', 'Carnivore — monkeys, flying lemurs, snakes', 'Rainforest on Luzon, Samar, Leyte, Mindanao', '30–60 years',
   'The national bird, and one of the largest and rarest eagles on Earth — a two-metre wingspan. Critically endangered, with a few hundred left. Killing one carries a prison sentence.'],
  ['Philippine tarsier', 'tarsier|philippine tarsier|mamag', 'Mammal', 'Insectivore — insects, small lizards', 'Forests of Bohol, Samar, Leyte, Mindanao', '12–20 years',
   'One of the smallest primates, small enough to sit in a palm. Its eyes are each as large as its brain and cannot move in their sockets — so it turns its head almost 180°.'],
  ['Tamaraw', 'tamaraw', 'Mammal', 'Herbivore — grass and bamboo shoots', 'Mindoro only', '20–25 years',
   'A dwarf buffalo found nowhere but Mindoro. Critically endangered — down to a few hundred — and distinguished from the carabao by its V-shaped horns.'],
  ['Whale shark', 'whale shark|butanding', 'Fish', 'Filter feeder — plankton, small fish', 'Warm open ocean; Donsol and Oslob in the Philippines', '70–100 years',
   'The largest fish alive, up to 18 metres. Harmless: it filters plankton. Each one\'s spot pattern is unique, like a fingerprint.'],
  ['Dugong', 'dugong|sea cow', 'Mammal', 'Herbivore — seagrass', 'Shallow coastal waters', '50–70 years',
   'A marine mammal that grazes seagrass meadows, and the likely origin of mermaid stories. Endangered in Philippine waters.'],

  /* -------------------------------------------------------------- mammals */
  ['Elephant', 'elephant|elephants', 'Mammal', 'Herbivore — grass, bark, fruit', 'Savannah and forest in Africa and Asia', '60–70 years',
   'The largest land animal. Eats up to 150 kg a day, communicates in infrasound below human hearing, and is one of the few animals to recognise itself in a mirror.'],
  ['Blue whale', 'blue whale', 'Mammal', 'Filter feeder — krill', 'All oceans', '80–90 years',
   'The largest animal that has ever lived — up to 30 m and 150 tonnes. Its heart alone weighs about 180 kg, and its call carries for hundreds of kilometres.'],
  ['Cheetah', 'cheetah', 'Mammal', 'Carnivore', 'African grassland', '10–12 years',
   'The fastest land animal: 100–120 km/h in short bursts. It cannot roar, and cannot sustain the sprint for more than about 30 seconds.'],
  ['Lion', 'lion|lions', 'Mammal', 'Carnivore', 'African savannah; a small population in India', '10–14 years',
   'The only cat that lives in groups. The lionesses do most of the hunting; a male\'s roar carries about 8 km.'],
  ['Tiger', 'tiger|tigers', 'Mammal', 'Carnivore', 'Forests of Asia', '10–15 years',
   'The largest wild cat. Every tiger\'s stripes are unique, and the pattern is on the skin as well as the fur.'],
  ['Giant panda', 'panda|giant panda|pandas', 'Mammal', 'Herbivore — 99% bamboo', 'Mountain forests of central China', '15–20 years',
   'A bear with a carnivore\'s gut that eats bamboo, so it must eat 12–38 kg a day just to keep going. No longer endangered, but still vulnerable.'],
  ['Giraffe', 'giraffe|giraffes', 'Mammal', 'Herbivore — acacia leaves', 'African savannah', '20–25 years',
   'The tallest animal, up to 5.5 m. Its neck has seven vertebrae — the same number as a human\'s — and it sleeps around 30 minutes a day.'],
  ['Kangaroo', 'kangaroo|kangaroos', 'Mammal', 'Herbivore — grass', 'Australia', '15–20 years',
   'A marsupial: the young are born the size of a jellybean and finish growing in the pouch. It cannot walk backwards.'],
  ['Dolphin', 'dolphin|dolphins', 'Mammal', 'Carnivore — fish, squid', 'Oceans worldwide', '20–50 years',
   'Hunts by echolocation and sleeps with one half of the brain at a time, so it never stops surfacing to breathe.'],
  ['Bat', 'bat|bats|paniki', 'Mammal', 'Varies — insects, fruit, nectar', 'Everywhere but the polar regions', '10–30 years',
   'The only mammal that truly flies. Most navigate by echolocation, and the Philippines has over seventy species, including the golden-crowned flying fox.'],
  ['Wolf', 'wolf|wolves', 'Mammal', 'Carnivore', 'Forest and tundra of the northern hemisphere', '6–8 years',
   'Hunts in packs and is the ancestor of every domestic dog. A howl carries about 10 km.'],
  ['Bear', 'bear|bears', 'Mammal', 'Omnivore', 'Forests and Arctic', '20–30 years',
   'Most species den through the winter, dropping heart rate and temperature without truly hibernating. The polar bear is the largest land carnivore.'],
  ['Horse', 'horse|horses|kabayo', 'Mammal', 'Herbivore — grass and hay', 'Domesticated worldwide', '25–30 years',
   'Can sleep standing up, thanks to a locking mechanism in the legs, and has nearly 360° vision.'],
  ['Cow', 'cow|cattle|baka', 'Mammal', 'Herbivore — grass', 'Domesticated worldwide', '18–22 years',
   'A ruminant with a four-chambered stomach, chewing the cud for up to eight hours a day.'],
  ['Pig', 'pig|pigs|baboy', 'Mammal', 'Omnivore', 'Domesticated worldwide', '15–20 years',
   'Among the most intelligent domestic animals — it learns faster than a dog. It has no sweat glands, so it wallows in mud to cool down.'],
  ['Dog', 'dog|dogs|aso', 'Mammal', 'Omnivore', 'Domesticated worldwide', '10–13 years',
   'Domesticated from wolves at least 15,000 years ago. Its sense of smell is tens of thousands of times sharper than a human\'s.'],
  ['Cat', 'cat|cats|pusa', 'Mammal', 'Carnivore', 'Domesticated worldwide', '12–18 years',
   'Sleeps 12–16 hours a day, has 32 muscles in each ear, and purrs at a frequency associated with healing.'],
  ['Rat', 'rat|rats|daga', 'Mammal', 'Omnivore', 'Everywhere humans live', '2–3 years',
   'Its incisors never stop growing, so it must gnaw constantly. It cannot vomit.'],
  ['Monkey', 'monkey|monkeys|unggoy', 'Mammal', 'Omnivore — fruit, insects', 'Forests of Asia, Africa, the Americas', '15–35 years',
   'Most monkeys have tails; apes do not. The long-tailed macaque is the Philippines\' only native monkey.'],
  ['Whale', 'whale|whales', 'Mammal', 'Varies — krill or fish and squid', 'All oceans', '40–90 years',
   'A mammal that breathes air through a blowhole. Baleen whales filter krill; toothed whales, like the sperm whale, hunt.'],

  /* ---------------------------------------------------------------- birds */
  ['Eagle', 'eagle|eagles|agila', 'Bird', 'Carnivore', 'Worldwide', '20–30 years',
   'Sees perhaps four to eight times more sharply than a human, and can pick out prey from over three kilometres.'],
  ['Owl', 'owl|owls|kuwago', 'Bird', 'Carnivore — rodents, insects', 'Worldwide except Antarctica', '10–25 years',
   'Turns its head about 270°, and its feather edges are serrated so that flight is nearly silent.'],
  ['Penguin', 'penguin|penguins', 'Bird', 'Carnivore — fish, krill', 'Southern hemisphere; only some in Antarctica', '15–20 years',
   'A bird that cannot fly but swims at up to 35 km/h. The emperor penguin dives over 500 m.'],
  ['Ostrich', 'ostrich', 'Bird', 'Omnivore', 'African savannah', '40–45 years',
   'The largest and fastest-running bird — 70 km/h. Its eye is bigger than its brain, and it does not bury its head in sand.'],
  ['Hummingbird', 'hummingbird', 'Bird', 'Nectar and small insects', 'The Americas', '3–5 years',
   'The only bird that can fly backwards. Its wings beat up to 80 times a second and its heart runs above 1,200 beats a minute.'],
  ['Peacock', 'peacock|peafowl', 'Bird', 'Omnivore', 'South Asia', '15–20 years',
   'Only the male is a peacock — the female is a peahen, and she has no train. The display can be over two metres across.'],
  ['Chicken', 'chicken|manok', 'Bird', 'Omnivore', 'Domesticated worldwide', '5–10 years',
   'The most numerous bird on Earth, descended from the red junglefowl of Southeast Asia. It has full-colour vision, better than a human\'s.'],

  /* --------------------------------------------------- reptiles, amphibians */
  ['Crocodile', 'crocodile|crocodiles|buwaya', 'Reptile', 'Carnivore', 'Rivers and estuaries of the tropics', '70–100 years',
   'Has the strongest measured bite of any living animal. The saltwater crocodile, found in the Philippines, is the largest living reptile.'],
  ['Snake', 'snake|snakes|ahas', 'Reptile', 'Carnivore', 'Every continent but Antarctica', '10–25 years',
   'Smells with its tongue, delivering scent to an organ in the roof of the mouth. Of about 3,900 species, roughly 600 are venomous.'],
  ['Turtle', 'turtle|turtles|pawikan', 'Reptile', 'Varies — omnivore or herbivore', 'Oceans, rivers and land worldwide', '30–100+ years',
   'Among the longest-lived animals. Sea turtles return to the beach where they hatched to lay their own eggs, sometimes after crossing an ocean.'],
  ['Komodo dragon', 'komodo dragon|komodo', 'Reptile', 'Carnivore', 'A few Indonesian islands', '30 years',
   'The largest lizard alive, up to 3 m. Its bite carries venom that stops blood clotting.'],
  ['Frog', 'frog|frogs|palaka', 'Amphibian', 'Carnivore — insects', 'Fresh water and damp forest worldwide', '5–15 years',
   'Breathes partly through its skin, which is why it must stay moist — and why frogs are early warnings of pollution.'],

  /* ------------------------------------------------------- fish, sea life */
  ['Shark', 'shark|sharks|pating', 'Fish', 'Carnivore, mostly', 'All oceans', '20–70 years',
   'Older than trees — sharks have been around for over 400 million years. The skeleton is cartilage, not bone.'],
  ['Octopus', 'octopus', 'Mollusc', 'Carnivore — crabs, shellfish', 'All oceans', '1–5 years',
   'Has three hearts, blue blood, and nine brains of a sort — a central one plus a cluster of neurons in each arm. Changes colour and texture in under a second.'],
  ['Jellyfish', 'jellyfish|dikya', 'Cnidarian', 'Carnivore — plankton, small fish', 'All oceans', 'Months to years',
   'No brain, no heart, no bones — about 95% water. Older than dinosaurs by hundreds of millions of years.'],
  ['Seahorse', 'seahorse', 'Fish', 'Carnivore — tiny crustaceans', 'Shallow tropical and temperate water', '1–5 years',
   'The male carries the eggs and gives birth. It is the only fish that swims upright.'],
  ['Clownfish', 'clownfish|anemonefish', 'Fish', 'Omnivore', 'Coral reefs of the Indo-Pacific', '6–10 years',
   'Lives inside a sea anemone, immune to its sting, and all clownfish are born male — the dominant one becomes female.'],

  /* ------------------------------------------------------------- insects */
  ['Ant', 'ant|ants|langgam', 'Insect', 'Omnivore', 'Everywhere but Antarctica', 'Workers 1–3 years; queens up to 30',
   'Lifts many times its own weight and lives in colonies from dozens to millions. There are more than 12,000 species.'],
  ['Bee', 'bee|bees|bubuyog', 'Insect', 'Nectar and pollen', 'Worldwide', 'Workers about 6 weeks; queens 2–5 years',
   'Pollinates roughly a third of the food humans eat. A worker makes about a twelfth of a teaspoon of honey in her whole life, and the hive communicates by dancing.'],
  ['Butterfly', 'butterfly|butterflies|paruparo', 'Insect', 'Nectar', 'Worldwide', '2 weeks – 9 months',
   'Tastes with its feet, and completes a full metamorphosis: egg, caterpillar, chrysalis, adult.'],
  ['Mosquito', 'mosquito|lamok', 'Insect', 'Nectar; females also take blood', 'Worldwide, mostly the tropics', '2 weeks – 6 months',
   'The deadliest animal to humans, through malaria and dengue. Only the female bites, and only to get protein for her eggs.'],
  ['Spider', 'spider|spiders|gagamba', 'Arachnid', 'Carnivore — insects', 'Everywhere but Antarctica', '1–2 years',
   'Not an insect: eight legs, two body sections, no antennae. Its silk is, weight for weight, stronger than steel.'],
  ['Cockroach', 'cockroach|ipis', 'Insect', 'Omnivore', 'Worldwide', 'About 1 year',
   'Survives a week without its head — it breathes through its body and dies of thirst, not the injury.'],
]

export const ANIMALS = ROWS.map(([name, aliases, group, diet, habitat, lifespan, fact]) => ({
  name,
  aliases: aliases.split('|'),
  group,
  diet,
  habitat,
  lifespan,
  fact,
}))
