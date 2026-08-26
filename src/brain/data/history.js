/**
 * World history: the eras, and the events people are actually asked to place.
 *
 * The app already carried a Philippine timeline. What a student also gets set
 * is "when was World War II", "what was the Renaissance", "who discovered
 * America" — and the brain had nothing for any of it.
 *
 * Only settled dates are here. Where historians genuinely disagree, or where a
 * date is conventional rather than exact, the card says so rather than picking
 * one and sounding certain. Nothing in this file changes with the news, which
 * is the condition for belonging in an app that cannot be updated once it is
 * installed.
 */

export const HISTORY = [
  {
    id: 'history-eras',
    q: ['history eras', 'periods of history', 'historical periods', 'ages of history', 'timeline of history'],
    title: 'The periods of world history',
    body:
      '| Period | Roughly | Marked by |\n| --- | --- | --- |\n' +
      '| Prehistory | before ~3000 BC | no writing; stone, then bronze tools |\n' +
      '| Ancient | ~3000 BC – 500 AD | first cities, writing, Egypt, Greece, Rome |\n' +
      '| Medieval | ~500 – 1500 | kingdoms, feudalism, the spread of Islam and Christianity |\n' +
      '| Early modern | ~1500 – 1800 | exploration, printing, Renaissance, Reformation |\n' +
      '| Modern | ~1800 – 1945 | industry, empires, two world wars |\n| Contemporary | 1945 – now | Cold War, decolonisation, computers |\n\n' +
      'The boundaries are conventions, not events — historians place them differently, and they fit Europe better than the rest of the world.',
  },
  {
    id: 'ww1',
    q: ['world war 1', 'world war i', 'ww1', 'first world war', 'when was world war 1'],
    title: 'World War I (1914–1918)',
    body:
      '**When:** 28 July 1914 – 11 November 1918.\n\n' +
      '**Trigger:** the assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo on 28 June 1914 — the spark, on top of years of alliances, militarism and imperial rivalry.\n\n' +
      '**Sides:** the Allies (France, Britain, Russia, later Italy and the United States) against the Central Powers (Germany, Austria-Hungary, the Ottoman Empire, Bulgaria).\n\n' +
      '**How it was fought:** trench warfare on the Western Front, machine guns, artillery, poison gas, the first military aircraft and tanks.\n\n' +
      '**Ended:** with the armistice of 11 November 1918; the Treaty of Versailles followed in 1919. Around 17 million died.',
  },
  {
    id: 'ww2',
    q: ['world war 2', 'world war ii', 'ww2', 'second world war', 'when was world war 2'],
    title: 'World War II (1939–1945)',
    body:
      '**When:** 1 September 1939 (Germany invades Poland) – 2 September 1945 (Japan surrenders).\n\n' +
      '**Sides:** the Allies (Britain, the Soviet Union, the United States, China and others) against the Axis (Germany, Italy, Japan).\n\n' +
      '**Turning points:** the Battle of Britain (1940), Pearl Harbor bringing in the United States (7 December 1941), Stalingrad (1942–43), D-Day in Normandy (6 June 1944).\n\n' +
      '**In the Philippines:** invaded by Japan from December 1941; Bataan fell in April 1942 and the Death March followed. Liberation began with the Leyte landing in October 1944.\n\n' +
      '**Ended:** Germany surrendered 8 May 1945; atomic bombs fell on Hiroshima (6 August) and Nagasaki (9 August); Japan surrendered. The deadliest war in history — roughly 70–85 million dead, most of them civilians.',
  },
  {
    id: 'renaissance',
    q: ['renaissance', 'what was the renaissance', 'when was the renaissance'],
    title: 'The Renaissance (c. 1300–1600)',
    body:
      'A rebirth of interest in the art, writing and ideas of ancient Greece and Rome, beginning in the Italian city-states — Florence above all — and spreading across Europe.\n\n' +
      '- **Art:** Leonardo da Vinci, Michelangelo, Raphael; perspective, anatomy, realism.\n' +
      '- **Ideas:** humanism — the study of human beings and their works, not only theology.\n' +
      '- **Science:** Copernicus put the Sun at the centre; Galileo turned a telescope on the sky.\n' +
      '- **Technology:** Gutenberg\'s printing press (c. 1440) made books cheap enough to spread all of it.',
  },
  {
    id: 'industrial-revolution',
    q: ['industrial revolution', 'when was the industrial revolution', 'what was the industrial revolution'],
    title: 'The Industrial Revolution (c. 1760–1840)',
    body:
      'The shift from goods made by hand at home to goods made by machine in factories, beginning in Britain.\n\n' +
      '**What drove it:** the steam engine (James Watt improved it in 1776), coal, iron and steel, the textile machines, and later the railway.\n\n' +
      '**What it changed:** people moved from countryside to city; wages became the normal way to live; production and population both rose sharply.\n\n' +
      '**What it cost:** child labour, 14-hour days, slums, and the first industrial air and water pollution. Trade unions and factory laws grew out of the response.',
  },
  {
    id: 'ancient-civilisations',
    q: ['ancient civilizations', 'ancient civilisations', 'first civilizations', 'oldest civilization'],
    title: 'The earliest civilisations',
    body:
      '| Civilisation | Where | From about |\n| --- | --- | --- |\n' +
      '| Sumer (Mesopotamia) | Iraq, between the Tigris and Euphrates | 4500 BC |\n' +
      '| Ancient Egypt | the Nile valley | 3100 BC |\n' +
      '| Indus Valley | Pakistan and north-west India | 3300 BC |\n' +
      '| Ancient China | the Yellow River | 2070 BC |\n' +
      '| Norte Chico | coastal Peru | 3000 BC |\n' +
      '| Olmec | southern Mexico | 1200 BC |\n\n' +
      'All of them began where farming produced a surplus: enough food that not everyone had to farm, so cities, writing and specialists became possible.',
  },
  {
    id: 'exploration',
    q: ['age of exploration', 'age of discovery', 'who discovered america', 'magellan'],
    title: 'The Age of Exploration (15th–17th century)',
    body:
      '- **1492** — Christopher Columbus reaches the Caribbean, sailing for Spain. He did not reach the American mainland, and people had lived there for tens of thousands of years; "discovery" means only that Europe learned of it.\n' +
      '- **1498** — Vasco da Gama sails from Portugal to India around Africa.\n' +
      '- **1519–1522** — the expedition Ferdinand Magellan led becomes the first to sail around the world. Magellan himself was killed at Mactan in the Philippines on 27 April 1521 by Lapu-Lapu\'s forces; Juan Sebastián Elcano completed the voyage.\n\n' +
      'What drove it: spices, gold, and a sea route to Asia that avoided the overland middlemen. What followed it: colonisation, the slave trade, and the exchange of crops and diseases between hemispheres.',
  },
  {
    id: 'cold-war',
    q: ['cold war', 'what was the cold war', 'when was the cold war'],
    title: 'The Cold War (1947–1991)',
    body:
      'A rivalry between the United States and the Soviet Union — and the systems they stood for — fought through proxy wars, arms races and propaganda rather than direct battle between them.\n\n' +
      '**Landmarks:** the Berlin Blockade (1948–49), the Korean War (1950–53), the Cuban Missile Crisis (1962), the Vietnam War, the Space Race (Sputnik 1957, Apollo 11 in 1969), the Berlin Wall (built 1961, fell 9 November 1989).\n\n' +
      '**Ended:** with the dissolution of the Soviet Union on 26 December 1991.',
  },
  {
    id: 'french-revolution',
    q: ['french revolution', 'when was the french revolution'],
    title: 'The French Revolution (1789–1799)',
    body:
      'Began 14 July 1789 with the storming of the Bastille, after years of debt, famine and an absolute monarchy that taxed those least able to pay.\n\n' +
      '**Ideas:** *liberté, égalité, fraternité* — liberty, equality, brotherhood — and the Declaration of the Rights of Man and of the Citizen.\n\n' +
      '**Course:** the monarchy abolished in 1792; Louis XVI executed in 1793; the Reign of Terror under Robespierre; Napoleon Bonaparte took power in 1799.\n\n' +
      '**Why it matters:** it made popular sovereignty — the idea that authority comes from the people — a force in world politics.',
  },
  {
    id: 'human-rights',
    q: ['universal declaration of human rights', 'human rights', 'udhr'],
    title: 'The Universal Declaration of Human Rights (1948)',
    body:
      'Adopted by the United Nations General Assembly on 10 December 1948, in the aftermath of World War II. Thirty articles, not a treaty in itself but the basis of most human-rights law since.\n\n' +
      'Among them: everyone is born free and equal in dignity and rights; no one shall be held in slavery or subjected to torture; everyone has the right to life, liberty and security of person, to a nationality, to education, to work, to a fair trial, and to freedom of thought, conscience, religion and expression.\n\n' +
      '10 December is Human Rights Day.',
  },
]
