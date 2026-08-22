/**
 * The Philippines, in more than one line.
 *
 * The app already carried a facts card and the list of presidents. What a
 * student here actually gets asked for is the regions, the provinces, the
 * dates, and which of the "national symbols" everyone recites are real — so
 * those are here.
 *
 * A caution the rest of `data/` does not need: **regions and provinces do
 * change**, by law, every few years. Everything below is marked with when it
 * was true, because an app that may never be updated again should not present
 * a 2024 boundary as a permanent fact. Nothing here is election-dependent or
 * otherwise news-shaped.
 */

export const PHILIPPINES = [
  {
    id: 'ph-regions',
    q: [
      'philippine regions',
      'regions of the philippines',
      'how many regions in the philippines',
      'list of regions philippines',
      'mga rehiyon sa pilipinas',
    ],
    title: 'The 18 regions of the Philippines',
    body:
      '**Luzon**\n' +
      '- **NCR** — National Capital Region (Metro Manila)\n' +
      '- **CAR** — Cordillera Administrative Region · Baguio\n' +
      '- **I** — Ilocos Region · San Fernando, La Union\n' +
      '- **II** — Cagayan Valley · Tuguegarao\n' +
      '- **III** — Central Luzon · San Fernando, Pampanga\n' +
      '- **IV-A** — CALABARZON · Calamba\n' +
      '- **MIMAROPA** — Southwestern Tagalog Region · Calapan\n' +
      '- **V** — Bicol Region · Legazpi\n\n' +
      '**Visayas**\n' +
      '- **VI** — Western Visayas · Iloilo City\n' +
      '- **VII** — Central Visayas · Cebu City\n' +
      '- **VIII** — Eastern Visayas · Tacloban\n' +
      '- **NIR** — Negros Island Region · Bacolod\n\n' +
      '**Mindanao**\n' +
      '- **IX** — Zamboanga Peninsula · Pagadian\n' +
      '- **X** — Northern Mindanao · Cagayan de Oro\n' +
      '- **XI** — Davao Region · Davao City\n' +
      '- **XII** — SOCCSKSARGEN · Koronadal\n' +
      '- **XIII** — Caraga · Butuan\n' +
      '- **BARMM** — Bangsamoro Autonomous Region in Muslim Mindanao · Cotabato City\n\n' +
      '*Negros Island Region was re-established in 2024, taking Negros Occidental and ' +
      'Negros Oriental out of Regions VI and VII and adding Siquijor. Region counts move ' +
      'when a law says so, so check this one if it matters.*',
  },
  {
    id: 'ph-provinces',
    q: [
      'philippine provinces',
      'provinces of the philippines',
      'how many provinces in the philippines',
      'list of provinces philippines',
      'mga probinsya sa pilipinas',
    ],
    title: 'The 82 provinces, by island group',
    body:
      '**Luzon (38)**\n' +
      'Abra · Albay · Apayao · Aurora · Bataan · Batanes · Batangas · Benguet · Bulacan · ' +
      'Cagayan · Camarines Norte · Camarines Sur · Catanduanes · Cavite · Ifugao · ' +
      'Ilocos Norte · Ilocos Sur · Isabela · Kalinga · La Union · Laguna · Marinduque · ' +
      'Masbate · Mountain Province · Nueva Ecija · Nueva Vizcaya · Occidental Mindoro · ' +
      'Oriental Mindoro · Palawan · Pampanga · Pangasinan · Quezon · Quirino · Rizal · ' +
      'Romblon · Sorsogon · Tarlac · Zambales\n\n' +
      '**Visayas (16)**\n' +
      'Aklan · Antique · Biliran · Bohol · Capiz · Cebu · Eastern Samar · Guimaras · ' +
      'Iloilo · Leyte · Negros Occidental · Negros Oriental · Northern Samar · Samar · ' +
      'Siquijor · Southern Leyte\n\n' +
      '**Mindanao (28)**\n' +
      'Agusan del Norte · Agusan del Sur · Basilan · Bukidnon · Camiguin · Compostela ' +
      'Valley (Davao de Oro) · Cotabato · Davao del Norte · Davao del Sur · Davao ' +
      'Occidental · Davao Oriental · Dinagat Islands · Lanao del Norte · Lanao del Sur · ' +
      'Maguindanao del Norte · Maguindanao del Sur · Misamis Occidental · Misamis ' +
      'Oriental · Sarangani · South Cotabato · Sultan Kudarat · Sulu · Surigao del Norte · ' +
      'Surigao del Sur · Tawi-Tawi · Zamboanga del Norte · Zamboanga del Sur · ' +
      'Zamboanga Sibugay\n\n' +
      '*Metro Manila is not a province — it is a region of 16 cities and one municipality. ' +
      'Maguindanao split into two provinces in 2022, which is what took the count to 82.*',
  },
  {
    id: 'ph-history',
    q: [
      'philippine history',
      'history of the philippines',
      'important dates in philippine history',
      'kasaysayan ng pilipinas',
      'philippine history timeline',
    ],
    title: 'Philippine history, in dates',
    body:
      '| Year | What happened |\n| --- | --- |\n' +
      '| 1521 | Magellan lands at Homonhon; killed by Lapu-Lapu at Mactan on 27 April |\n' +
      '| 1565 | Legazpi founds the first Spanish settlement in Cebu |\n' +
      '| 1571 | Manila made the capital of the Spanish East Indies |\n' +
      '| 1872 | GomBurZa executed at Bagumbayan |\n' +
      '| 1892 | Rizal founds La Liga Filipina; Bonifacio founds the Katipunan |\n' +
      '| 1896 | The Revolution begins; Rizal executed 30 December |\n' +
      '| 1898 | Independence declared at Kawit on 12 June; Spain cedes the islands to the US |\n' +
      '| 1899 | First Philippine Republic at Malolos; Philippine–American War begins |\n' +
      '| 1935 | Commonwealth established; Quezon elected president |\n' +
      '| 1942 | Fall of Bataan and Corregidor; the Death March |\n' +
      '| 1945 | Liberation; Manila devastated |\n' +
      '| 1946 | Full independence recognised on 4 July |\n' +
      '| 1965 | Marcos elected |\n' +
      '| 1972 | Martial law declared (Proclamation 1081) |\n' +
      '| 1983 | Ninoy Aquino assassinated at Manila airport |\n' +
      '| 1986 | EDSA People Power, 22–25 February; Corazon Aquino becomes president |\n' +
      '| 1987 | The present Constitution ratified |\n' +
      '| 1991 | Mount Pinatubo erupts; the US bases treaty ends |',
  },
  {
    id: 'ph-symbols',
    q: [
      'philippine national symbols',
      'national symbols of the philippines',
      'national flower of the philippines',
      'national bird of the philippines',
      'pambansang sagisag',
    ],
    title: 'National symbols — the official ones',
    body:
      'Only these are declared by law or constitution:\n\n' +
      '- **Flag** — eight-rayed sun and three stars; flown blue-side-up in peace, ' +
      'red-side-up in war\n' +
      '- **Anthem** — *Lupang Hinirang*, music by Julián Felipe, 1898\n' +
      '- **Flower** — sampaguita (*Jasminum sambac*)\n' +
      '- **Tree** — narra (*Pterocarpus indicus*)\n' +
      '- **Bird** — Philippine eagle (*Pithecophaga jefferyi*)\n' +
      '- **Gem** — Philippine pearl\n' +
      '- **Martial art and sport** — arnis (RA 9850, 2009)\n' +
      '- **Language** — Filipino; Filipino Sign Language is the national sign language ' +
      '(RA 11106, 2018)\n\n' +
      '**Not official**, however often they are taught: the carabao, the mango, the ' +
      'anahaw, the bangus, the nipa hut, and the barong. The National Commission for ' +
      'Culture and the Arts has said so plainly — no law ever declared them.',
  },
  {
    id: 'ph-emergency',
    q: [
      'emergency numbers philippines',
      'emergency hotline',
      'what number to call in an emergency',
      'philippine emergency hotline',
      'hotline numbers',
    ],
    title: 'Emergency numbers in the Philippines',
    body:
      '- **911** — the national emergency hotline: police, fire, ambulance. Free from ' +
      'any phone, including one with no load.\n' +
      '- **143** — Philippine Red Cross\n' +
      '- **1555** — the national disaster and government service hotline\n\n' +
      'Say **where you are** first — the address, the barangay, a landmark. Everything ' +
      'else can be asked for; the location cannot be guessed.',
  },
]
