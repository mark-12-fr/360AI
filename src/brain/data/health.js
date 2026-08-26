/**
 * Health: the illnesses a household here actually asks about, and nutrition.
 *
 * First aid covers the emergency. This covers the week before and the week
 * after — dengue season, a cough that will not go, what a blood-sugar number
 * means, what to feed a child.
 *
 * Every card is general information, and several say plainly when to stop
 * reading and see a doctor. That line is not a disclaimer bolted on: for
 * dengue and tuberculosis in particular, the useful answer is largely *when to
 * go*, and an offline app that talked someone out of going would be worse than
 * one that said nothing.
 */

export const HEALTH = [
  {
    id: 'dengue',
    q: ['dengue', 'dengue fever', 'dengue symptoms', 'signs of dengue'],
    title: 'Dengue',
    body:
      'A viral illness spread by the *Aedes* mosquito, which bites mostly by day and breeds in clean standing water. Common in the Philippines, and worst in the rainy season.\n\n' +
      '**Usual signs:** sudden high fever, severe headache, pain behind the eyes, muscle and joint pain, nausea, and a rash appearing a few days in.\n\n' +
      '**Go to a hospital immediately** if any warning sign appears, usually as the fever *falls* around day 3–7: severe abdominal pain, persistent vomiting, bleeding from the gums or nose, blood in vomit or stool, black stools, difficulty breathing, cold or clammy skin, restlessness or drowsiness.\n\n' +
      '**Care meanwhile:** rest and plenty of fluids. Paracetamol for fever. **Avoid aspirin, mefenamic acid and ibuprofen** — they raise the bleeding risk in dengue.\n\n' +
      '**Prevention:** empty, cover or scrub anything holding water weekly — pots, tyres, drums, plant saucers, roof gutters. Repellent, screens, and long sleeves at dawn and dusk.\n\n' +
      '*General information, not a diagnosis. Any suspected dengue should be seen by a doctor.*',
  },
  {
    id: 'tuberculosis',
    q: ['tuberculosis', 'tb', 'tb symptoms', 'signs of tuberculosis'],
    title: 'Tuberculosis (TB)',
    body:
      'A bacterial infection, usually of the lungs, spread through the air when someone with active TB coughs or sneezes. The Philippines has one of the higher TB burdens in the world, and it is curable.\n\n' +
      '**Signs:** a cough lasting **two weeks or more**, coughing up phlegm or blood, chest pain, fever, night sweats, losing weight without trying, and tiredness.\n\n' +
      '**What to do:** a cough of two weeks or more should be checked. Diagnosis is by sputum test and chest X-ray, and testing and treatment are free at DOH health centres in the Philippines.\n\n' +
      '**Treatment:** a course of antibiotics for **at least six months**. Stopping early is the main cause of drug-resistant TB, which is far harder to treat — the medicine must be finished even after the symptoms go.\n\n' +
      '*General information. A persistent cough needs a clinic, not a search.*',
  },
  {
    id: 'diabetes',
    q: ['diabetes', 'blood sugar', 'diabetes symptoms', 'signs of diabetes'],
    title: 'Diabetes',
    body:
      'The body cannot control blood glucose properly — either it makes too little insulin (**type 1**) or it stops responding to it (**type 2**, the common kind, tied to weight, diet and inactivity).\n\n' +
      '**Signs:** frequent urination, unusual thirst, unusual hunger, tiredness, blurred vision, cuts healing slowly, numbness or tingling in hands and feet, and losing weight without trying.\n\n' +
      '**The usual thresholds** (diagnosis is a doctor\'s, from repeated tests):\n\n' +
      '| Test | Normal | Prediabetes | Diabetes |\n| --- | --- | --- | --- |\n' +
      '| Fasting glucose | under 100 mg/dL | 100–125 | 126 or more |\n' +
      '| HbA1c | under 5.7% | 5.7–6.4% | 6.5% or more |\n\n' +
      '**Managing it:** food, movement, weight, and medicine where prescribed. Untreated it damages the eyes, kidneys, nerves and heart quietly, over years.\n\n' +
      '*General information, not a diagnosis or a prescription.*',
  },
  {
    id: 'hypertension',
    q: ['hypertension', 'high blood pressure', 'blood pressure', 'normal blood pressure'],
    title: 'Blood pressure and hypertension',
    body:
      'Written as systolic over diastolic — the pressure as the heart beats, over the pressure as it rests.\n\n' +
      '| Reading | Category |\n| --- | --- |\n' +
      '| under 120 / under 80 | normal |\n| 120–129 / under 80 | elevated |\n' +
      '| 130–139 / 80–89 | stage 1 hypertension |\n| 140+ / 90+ | stage 2 hypertension |\n' +
      '| over 180 / over 120 | crisis — seek care now |\n\n' +
      'High blood pressure usually has **no symptoms**, which is why it is called the silent killer and why it is found by measuring rather than by feeling unwell. Untreated it leads to stroke, heart attack and kidney damage.\n\n' +
      '**What helps:** less salt, more vegetables and fruit, regular movement, keeping weight down, less alcohol, no smoking, and taking prescribed medicine every day rather than only when a reading is high.\n\n' +
      '*General information. Categories vary slightly between guidelines; your doctor\'s target is the one that applies to you.*',
  },
  {
    id: 'nutrition',
    q: ['nutrition', 'nutrients', 'balanced diet', 'food groups', 'healthy diet'],
    title: 'The nutrients, and a balanced plate',
    body:
      '**Macronutrients** — needed in quantity:\n' +
      '- **Carbohydrates** — the body\'s main fuel. Rice, bread, corn, root crops. About 4 kcal per gram.\n' +
      '- **Protein** — builds and repairs tissue. Fish, meat, eggs, beans, tofu. About 4 kcal per gram.\n' +
      '- **Fat** — energy, and it carries vitamins A, D, E and K. Oil, nuts, fish. About 9 kcal per gram.\n\n' +
      '**Micronutrients** — needed in small amounts but not optional: vitamins and minerals such as iron, calcium, iodine, zinc and vitamin A.\n\n' +
      '**Also:** water, and fibre from vegetables, fruit and whole grains.\n\n' +
      '**A simple plate:** half vegetables and fruit, a quarter protein, a quarter carbohydrate. The Philippine guide *Pinggang Pinoy* uses the same idea, with water rather than a sugary drink.',
  },
  {
    id: 'vitamins',
    q: ['vitamins', 'vitamin deficiency', 'what does vitamin c do', 'sources of vitamins'],
    title: 'The vitamins, what they do, and where they come from',
    body:
      '| Vitamin | Does | Found in | Lack causes |\n| --- | --- | --- | --- |\n' +
      '| A | vision, immunity, skin | malunggay, carrots, squash, liver | night blindness |\n' +
      '| B1 thiamine | nerves, energy | whole grains, pork, beans | beriberi |\n' +
      '| B9 folate | making cells, pregnancy | leafy greens, beans | anaemia; birth defects |\n' +
      '| B12 | nerves, red blood cells | fish, meat, eggs, dairy | anaemia, nerve damage |\n' +
      '| C | immunity, collagen, iron uptake | guava, calamansi, citrus, kamote tops | scurvy |\n' +
      '| D | calcium uptake, bones | sunlight on skin, fish, eggs | rickets, weak bones |\n' +
      '| E | protects cells | nuts, seeds, oils | rare |\n' +
      '| K | blood clotting | leafy greens | bleeding that will not stop |\n\n' +
      '**Minerals worth naming:** iron (anaemia), calcium (bones), iodine (goitre — the reason salt is iodised), zinc (healing and immunity).\n\n' +
      'Guava has several times the vitamin C of an orange by weight, and malunggay is among the richest ordinary sources of vitamin A here.',
  },
  {
    id: 'handwashing',
    q: ['handwashing', 'how to wash hands', 'hand hygiene', 'proper handwashing'],
    title: 'Washing hands properly',
    body:
      'The single cheapest way to avoid passing on illness.\n\n' +
      '1. Wet hands with clean running water.\n2. Soap, and lather well.\n' +
      '3. Scrub for **at least 20 seconds** — palms, backs of hands, between the fingers, under the nails, and the thumbs, which are the part most often missed.\n' +
      '4. Rinse.\n5. Dry with a clean cloth or air-dry.\n\n' +
      '**When:** before eating or preparing food, after the toilet, after coughing, sneezing or blowing your nose, after touching animals or rubbish, and after being out.\n\n' +
      'Alcohol-based sanitiser of at least 60% works when hands are not visibly dirty — but soap and water beat it when they are.',
  },
  {
    id: 'sleep',
    q: ['sleep', 'how much sleep', 'sleep hours', 'why is sleep important'],
    title: 'Sleep',
    body:
      '| Age | Hours a night |\n| --- | --- |\n' +
      '| Newborn | 14–17 |\n| 1–2 years | 11–14 |\n| 3–5 years | 10–13 |\n' +
      '| 6–12 years | 9–12 |\n| 13–18 years | 8–10 |\n| Adult | 7–9 |\n| Over 65 | 7–8 |\n\n' +
      '**Why it matters:** memory is consolidated during sleep — the night after studying is part of the studying. Sleep also repairs tissue, regulates appetite hormones, and supports the immune system. Chronic short sleep is linked to weight gain, high blood pressure and poor concentration.\n\n' +
      '**What helps:** a consistent bedtime, a dark and cool room, no screens for the last hour, no caffeine after mid-afternoon, and using the bed for sleeping rather than for studying.',
  },
]
