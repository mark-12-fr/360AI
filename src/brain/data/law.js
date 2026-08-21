/**
 * Philippine law, in plain language.
 *
 * General information only — never advice on a specific situation, and never a
 * substitute for a lawyer. Every answer built from this file carries that note,
 * because the difference matters and the app cannot know anyone's facts.
 *
 * Laws are amended; the text here reflects the position as written and cites the
 * Republic Act number so anything important can be checked at the source.
 */

export const LAW_DISCLAIMER =
  '*General information only — not legal advice. For an actual case, consult a lawyer or the Public Attorney\'s Office (PAO).*'

const ROWS = [
  /* ------------------------------------------------------- the constitution */
  {
    id: 'constitution',
    name: 'The 1987 Constitution',
    aliases: ['constitution', '1987 constitution', 'philippine constitution', 'saligang batas'],
    about: 'The fundamental law of the Philippines, ratified on 2 February 1987.',
    points: [
      '**Article II** — state principles and policies',
      '**Article III** — the Bill of Rights',
      '**Article VI** — the Legislature: 24 senators (6-year terms, max 2) and district and party-list representatives (3-year terms, max 3)',
      '**Article VII** — the Executive: one 6-year presidential term, no re-election',
      '**Article VIII** — the Judiciary, headed by the Supreme Court (15 justices)',
      '**Article XI** — accountability of public officers, including impeachment',
      'It can be amended by Congress as a constituent assembly, a constitutional convention, or people’s initiative — then ratified by plebiscite.',
    ],
  },
  {
    id: 'bill-of-rights',
    name: 'The Bill of Rights (Article III)',
    aliases: ['bill of rights', 'article 3', 'article iii', 'my rights', 'constitutional rights'],
    about: 'The limits on state power and the rights every person in the Philippines holds against it.',
    points: [
      '**Sec. 1** — no deprivation of life, liberty or property without due process; equal protection',
      '**Sec. 2** — no unreasonable searches and seizures; warrants need probable cause determined personally by a judge',
      '**Sec. 3** — privacy of communication and correspondence',
      '**Sec. 4** — freedom of speech, expression, press, assembly and petition',
      '**Sec. 5** — free exercise of religion; no state religion',
      '**Sec. 7** — the right to information on matters of public concern',
      '**Sec. 11** — free access to the courts and adequate legal assistance',
      '**Sec. 12** — Miranda rights: to be informed, to remain silent, to competent and independent counsel',
      '**Sec. 14** — presumption of innocence; the right to be heard by counsel',
      '**Sec. 19** — no cruel, degrading or inhuman punishment',
      '**Sec. 21** — no double jeopardy',
    ],
  },
  {
    id: 'miranda',
    name: 'Rights when arrested (Miranda rights, RA 7438)',
    aliases: ['miranda rights', 'arrested', 'rights when arrested', 'ra 7438', 'police arrest'],
    about: 'What must happen when a person is taken into custody.',
    points: [
      'You must be **informed of the reason for the arrest** and of your rights, in a language you understand.',
      'You have the right to **remain silent** — anything you say can be used against you.',
      'You have the right to **competent and independent counsel**, preferably of your own choice; if you cannot afford one, the state must provide one.',
      'A confession is **inadmissible** unless it is in writing and made with counsel present.',
      'You may be visited by immediate family, a doctor, a priest or a lawyer.',
      'Without a warrant, arrest is lawful only *in flagrante delicto*, in hot pursuit, or for an escapee (Rule 113, Sec. 5).',
      'Ordinarily you must be delivered to judicial authority within 12, 18 or 36 hours depending on the gravity of the offence (Art. 125, RPC).',
    ],
  },

  /* ------------------------------------------------------------ labour law */
  {
    id: 'labor-code',
    name: 'The Labor Code (PD 442)',
    aliases: ['labor code', 'labour law', 'employment law', 'pd 442', 'worker rights'],
    about: 'The main law governing employment in the private sector.',
    points: [
      'Normal hours: **8 hours a day**; work beyond that is overtime at **+25%** (+30% on a rest day or holiday).',
      '**Night shift differential:** +10% for work between 10 p.m. and 6 a.m.',
      '**Rest day:** at least 24 consecutive hours after every 6 consecutive workdays.',
      '**Service Incentive Leave:** 5 paid days a year after one year of service.',
      '**Regular holiday:** 100% pay if unworked; 200% if worked. **Special non-working day:** no work no pay, +30% if worked.',
      'Probationary employment: **maximum 6 months**, and the standards for regularisation must be stated at hiring.',
      'Employees become **regular** by passing probation or by performing work usually necessary to the business.',
    ],
  },
  {
    id: 'thirteenth-month',
    name: '13th-month pay (PD 851)',
    aliases: ['13th month', 'thirteenth month pay', '13th month pay', 'pd 851'],
    about: 'A mandatory yearly benefit for rank-and-file employees in the private sector.',
    points: [
      'Equal to **1/12 of the basic salary earned during the calendar year**.',
      'Due on or before **24 December** each year.',
      'Owed to any rank-and-file employee who worked at least **one month** during the year, whatever the pay basis.',
      'Pro-rated if the employee resigned or was separated before December.',
      'Not the same as a bonus — a bonus is discretionary, this is required by law.',
      'Tax-exempt up to **₱90,000** combined with other benefits.',
    ],
  },
  {
    id: 'termination',
    name: 'Termination of employment',
    aliases: ['termination', 'dismissal', 'fired', 'illegal dismissal', 'separation pay', 'resignation'],
    about: 'When an employer may end employment, and what is owed.',
    points: [
      '**Just causes** (Art. 297) — serious misconduct, wilful disobedience, gross and habitual neglect, fraud or breach of trust, commission of a crime against the employer, or analogous causes. No separation pay.',
      '**Authorised causes** (Art. 298–299) — redundancy, retrenchment, closure, installation of labour-saving devices, or disease. Separation pay is due: one month or ½ month per year of service depending on the cause.',
      '**Due process for just causes:** two written notices and a real chance to be heard (the "twin-notice rule").',
      '**Due process for authorised causes:** 30 days’ written notice to both the employee and DOLE.',
      'Dismissal without just or authorised cause, or without due process, is **illegal dismissal** — remedies include reinstatement and back wages. File with the NLRC.',
      'Resignation normally requires **30 days’ notice** unless the employer waives it.',
    ],
  },
  {
    id: 'maternity-paternity',
    name: 'Parental leaves',
    aliases: ['maternity leave', 'paternity leave', 'solo parent leave', 'ra 11210', 'ra 8187', 'ra 11861'],
    about: 'Leave benefits around childbirth and parenting.',
    points: [
      '**Maternity leave (RA 11210):** 105 days paid for live childbirth, +15 more for a solo parent, 60 days for miscarriage or emergency termination. Up to 7 days may be transferred to the father.',
      '**Paternity leave (RA 8187):** 7 days with pay, for the first four deliveries of the legitimate spouse he is cohabiting with.',
      '**Solo parent leave (RA 11861):** 7 working days a year, with other benefits, for a qualified solo parent with at least one year of service.',
      '**Gynecological leave (RA 9710, Magna Carta of Women):** up to 2 months with pay after surgery for gynecological disorders.',
      '**VAWC leave (RA 9262):** 10 days paid leave for victims.',
    ],
  },
  {
    id: 'minimum-wage',
    name: 'Wages and mandatory contributions',
    aliases: ['minimum wage', 'sss', 'philhealth', 'pag-ibig', 'contributions', 'salary deductions'],
    about: 'What must be paid and withheld.',
    points: [
      'Minimum wage is **set per region** by the Regional Tripartite Wages and Productivity Boards, and changes by wage order — check the current order for your region.',
      'Wages must be paid at least **once every two weeks**, in legal tender, at or near the workplace.',
      'Mandatory employer-shared contributions: **SSS**, **PhilHealth** and **Pag-IBIG**.',
      'Illegal deductions are prohibited: an employer may not deduct for losses or breakage without the employee’s written consent and due process.',
      'Withholding of wages and kickbacks are punishable under Art. 116.',
    ],
  },

  /* ------------------------------------------------------------ family law */
  {
    id: 'marriage',
    name: 'Marriage (Family Code, EO 209)',
    aliases: ['marriage', 'getting married', 'family code', 'marriage requirements', 'kasal'],
    about: 'The requirements for a valid marriage in the Philippines.',
    points: [
      '**Essential requisites:** legal capacity of both parties (male and female, at least 18) and consent freely given before a solemnising officer.',
      '**Formal requisites:** authority of the solemnising officer, a valid marriage licence, and a ceremony with at least two witnesses of legal age.',
      'Ages 18–20 need **parental consent**; 21–24 need **parental advice** (a delay of 3 months if advice is unfavourable).',
      'The marriage licence is valid for **120 days** anywhere in the Philippines.',
      'Marriage under 18 is void, and **child marriage is a crime under RA 11596 (2021)**.',
      'Some marriages are exempt from the licence requirement — e.g. marriages *in articulo mortis* or among certain indigenous cultural communities.',
    ],
  },
  {
    id: 'annulment',
    name: 'Annulment, nullity and legal separation',
    aliases: ['annulment', 'divorce', 'legal separation', 'void marriage', 'psychological incapacity'],
    about: 'The three different remedies people usually mean by "divorce" — there is no absolute divorce for most Filipinos.',
    points: [
      '**Declaration of nullity** — the marriage was void from the start: no licence, bigamous, incestuous, below 18, or psychological incapacity (Art. 36).',
      '**Annulment** — the marriage was valid until annulled: lack of parental consent (18–20), unsound mind, fraud, force or intimidation, impotence, or a serious sexually transmissible disease. Prescriptive periods apply, generally 5 years.',
      '**Legal separation** — the spouses live apart and property is separated, but the marriage bond remains, so neither may remarry. Grounds include repeated physical violence, drug addiction, abandonment for more than a year, and marital infidelity. It must be filed within 5 years of the cause.',
      'Divorce is available to Filipino Muslims under the Code of Muslim Personal Laws (PD 1083).',
      'A foreign divorce validly obtained by a foreign spouse can be recognised here, freeing the Filipino spouse to remarry (Art. 26).',
    ],
  },
  {
    id: 'child-support',
    name: 'Child support and custody',
    aliases: ['child support', 'custody', 'sustento', 'parental authority'],
    about: 'Obligations to children, whether or not the parents are married.',
    points: [
      'Support covers **food, shelter, clothing, medical care, education and transport**, in proportion to the giver\'s means and the child\'s needs.',
      'Both parents are obliged to support their children, legitimate or illegitimate.',
      'The amount may be **adjusted** as needs or capacity change; it is never a fixed lifetime figure.',
      'Children under **7 years old** are ordinarily placed in the mother\'s custody unless she is unfit (Art. 213).',
      'Illegitimate children are under the sole parental authority of the mother.',
      'Refusing support can be **economic abuse** under RA 9262 when done against a woman or her child.',
    ],
  },

  /* -------------------------------------------------------- criminal law */
  {
    id: 'ra-9262',
    name: 'RA 9262 — Anti-Violence Against Women and Their Children (VAWC)',
    aliases: ['ra 9262', 'vawc', 'violence against women', 'anti vawc'],
    about: 'Protects women and their children from abuse by a spouse, partner, or former partner.',
    points: [
      'Covers **physical, sexual, psychological and economic abuse**.',
      'Applies to a husband, ex-husband, boyfriend, ex-boyfriend, live-in partner, or anyone with whom the woman has or had a sexual or dating relationship.',
      '**Protection orders:** Barangay (BPO, 15 days), Temporary (TPO, 30 days) and Permanent (PPO) — a BPO can be obtained the same day at the barangay.',
      'Economic abuse includes withdrawing financial support or preventing the woman from working.',
      'Penalties range from *arresto mayor* to *prision mayor*, plus damages and mandatory psychological counselling.',
    ],
  },
  {
    id: 'ra-7610',
    name: 'RA 7610 — Child Abuse Act',
    aliases: ['ra 7610', 'child abuse', 'child protection'],
    about: 'Special protection for children against abuse, exploitation and discrimination.',
    points: [
      'A "child" is anyone **below 18**, or older but unable to protect themselves.',
      'Punishes child prostitution, trafficking, obscene publications, and other acts of abuse or cruelty.',
      'Also covers children in situations of armed conflict and in hazardous work.',
      'Reporting is encouraged and protected; barangays, DSWD and the police all have duties under the law.',
    ],
  },
  {
    id: 'ra-9165',
    name: 'RA 9165 — Comprehensive Dangerous Drugs Act',
    aliases: ['ra 9165', 'drug law', 'dangerous drugs act', 'drugs'],
    about: 'The law on illegal drugs.',
    points: [
      'Punishes importation, sale, manufacture, possession and use of dangerous drugs.',
      'Penalties depend on the drug and the quantity; sale of dangerous drugs carries life imprisonment to death (now reclusion perpetua) and heavy fines.',
      'First-time minor offenders and those who use may qualify for **rehabilitation instead of imprisonment** in defined circumstances.',
      '**Section 21** requires a strict chain of custody for seized drugs — inventory and photographs immediately after seizure, with required witnesses. Failure often results in acquittal.',
      'Drug testing is required for certain applicants and workers, with privacy safeguards.',
    ],
  },
  {
    id: 'ra-10175',
    name: 'RA 10175 — Cybercrime Prevention Act',
    aliases: ['ra 10175', 'cybercrime', 'cybercrime law', 'online crime', 'cyber libel'],
    about: 'Crimes committed through computers and the internet.',
    points: [
      'Offences include **illegal access (hacking), data interference, cybersquatting, computer-related fraud and identity theft**.',
      '**Cyber libel** is libel under Art. 355 of the Revised Penal Code committed through a computer system, with a penalty one degree higher.',
      'Online child sexual abuse material is covered and heavily penalised.',
      'The Supreme Court struck down the provision punishing those who merely *like* or *share* a libellous post, and the real-time collection of traffic data without a warrant.',
      'Complaints go to the **PNP Anti-Cybercrime Group** or the **NBI Cybercrime Division**.',
    ],
  },
  {
    id: 'ra-10173',
    name: 'RA 10173 — Data Privacy Act',
    aliases: ['ra 10173', 'data privacy', 'privacy law', 'personal information'],
    about: 'How personal data must be collected, used and protected.',
    points: [
      'Personal data may be processed only with **consent** or another lawful basis, for a declared and legitimate purpose.',
      'Data subjects have the rights to **be informed, to access, to object, to erasure or blocking, to damages, and to data portability**.',
      'Organisations must appoint a **Data Protection Officer** and implement security measures.',
      '**Breaches** affecting sensitive personal information must be reported to the National Privacy Commission and the affected people within 72 hours.',
      'Sensitive personal information includes health, education, genetic, sexual life, offences, government IDs and religious or political affiliation.',
    ],
  },
  {
    id: 'ra-11313',
    name: 'RA 11313 — Safe Spaces Act ("Bawal Bastos")',
    aliases: ['ra 11313', 'safe spaces act', 'bawal bastos', 'catcalling', 'street harassment'],
    about: 'Punishes gender-based sexual harassment in streets, public spaces, online, workplaces and schools.',
    points: [
      'Covers **catcalling, wolf-whistling, misogynistic and homophobic slurs, persistent unwanted comments, stalking and public masturbation**.',
      'Online harassment — including unwanted sexual messages and non-consensual sharing of images — is covered.',
      'Penalties escalate from a fine and community service to imprisonment for repeat offences.',
      'Employers and schools must adopt a code of conduct and an internal committee to act on complaints.',
    ],
  },
  {
    id: 'ra-7877',
    name: 'RA 7877 — Anti-Sexual Harassment Act',
    aliases: ['ra 7877', 'sexual harassment', 'harassment at work'],
    about: 'Sexual harassment in employment, education and training.',
    points: [
      'Committed by a person with **authority, influence or moral ascendancy** — a boss, teacher, coach or trainer.',
      'Includes demanding a sexual favour as a condition of hiring, promotion, passing grades, or any benefit.',
      'Employers and school heads must create a **committee on decorum and investigation** and are solidarily liable if they fail to act.',
      'The action prescribes in **three years**. RA 11313 covers peer and subordinate harassment that this law does not.',
    ],
  },
  {
    id: 'ra-9995',
    name: 'RA 9995 — Anti-Photo and Video Voyeurism Act',
    aliases: ['ra 9995', 'voyeurism', 'scandal video', 'nude photos', 'revenge porn'],
    about: 'Taking or sharing intimate images without consent.',
    points: [
      'Punishes photographing or recording a person\'s private parts or sexual act **without consent**.',
      'Also punishes **copying, selling, distributing, publishing or broadcasting** such material — even if the recording itself was consensual.',
      'Consent to record is **not** consent to share.',
      'Penalty: 3 to 7 years imprisonment and a fine of ₱100,000 to ₱500,000. The material is inadmissible as evidence in any proceeding.',
    ],
  },
  {
    id: 'ra-10627',
    name: 'RA 10627 — Anti-Bullying Act',
    aliases: ['ra 10627', 'bullying', 'anti bullying', 'cyberbullying'],
    about: 'Requires all elementary and secondary schools to act against bullying.',
    points: [
      'Covers physical, verbal and social bullying, and **cyber-bullying**.',
      'Every school must adopt policies, keep records, and report incidents to the DepEd division office.',
      'Sanctions are administrative and educational, with interventions for both the bully and the victim.',
      'Serious acts may separately be crimes under the Revised Penal Code or RA 7610.',
    ],
  },
  {
    id: 'theft-estafa',
    name: 'Theft, robbery and estafa (Revised Penal Code)',
    aliases: ['theft', 'estafa', 'robbery', 'swindling', 'nakawan', 'scam'],
    about: 'The property crimes people ask about most, and how they differ.',
    points: [
      '**Theft (Art. 308)** — taking someone\'s property without violence, intimidation or force upon things, and without consent.',
      '**Robbery (Art. 293)** — the same taking, but with violence or intimidation against a person, or force upon things.',
      '**Estafa (Art. 315)** — obtaining money or property through **deceit or abuse of confidence**: bouncing cheques, failing to return goods held in trust, false pretences.',
      'Penalties scale with the amount involved; RA 10951 (2017) updated the thresholds to modern values.',
      'Online selling scams are usually estafa, and may also be **computer-related fraud** under RA 10175.',
    ],
  },
  {
    id: 'homicide-murder',
    name: 'Homicide vs murder',
    aliases: ['homicide', 'murder', 'killing', 'parricide'],
    about: 'The distinction is the presence of a qualifying circumstance.',
    points: [
      '**Homicide (Art. 249)** — killing another without any qualifying circumstance. Penalty: *reclusion temporal* (12 years and 1 day to 20 years).',
      '**Murder (Art. 248)** — killing qualified by treachery, evident premeditation, cruelty, price or reward, or use of fire, poison or explosion. Penalty: *reclusion perpetua* to death (now reclusion perpetua).',
      '**Parricide (Art. 246)** — killing a spouse, parent, child or other ascendant/descendant.',
      'Self-defence requires **unlawful aggression, reasonable necessity of the means used, and lack of sufficient provocation** — all three.',
    ],
  },
  {
    id: 'libel',
    name: 'Libel and slander',
    aliases: ['libel', 'slander', 'defamation', 'oral defamation', 'cyber libel'],
    about: 'Damage to reputation, criminal in the Philippines.',
    points: [
      '**Libel (Art. 353)** — a public and malicious imputation of a crime, vice, defect or any act tending to dishonour, made in writing or similar means.',
      'Four elements: **imputation, publication, identifiability of the victim, and malice**.',
      '**Slander** is the spoken form; grave oral defamation carries a heavier penalty.',
      '**Cyber libel** under RA 10175 raises the penalty one degree, and prescribes in a longer period.',
      'Defences: **truth published with good motives and justifiable ends**, privileged communication, and fair comment on public officials in their official conduct.',
    ],
  },
  {
    id: 'ra-9344',
    name: 'RA 9344 — Juvenile Justice and Welfare Act',
    aliases: ['ra 9344', 'juvenile justice', 'minor offender', 'age of criminal responsibility'],
    about: 'How the law treats children in conflict with the law.',
    points: [
      'A child **15 years old or younger** is exempt from criminal liability, but goes through an intervention programme.',
      'Above 15 and below 18 is exempt **unless they acted with discernment**.',
      'Children in conflict with the law must be handled through **diversion** where possible, not detention.',
      'Detention with adults is prohibited; records are confidential.',
    ],
  },

  /* ---------------------------------------------------------- procedure */
  {
    id: 'barangay',
    name: 'Barangay conciliation (Katarungang Pambarangay)',
    aliases: ['barangay case', 'katarungang pambarangay', 'barangay complaint', 'blotter'],
    about: 'For most disputes between neighbours, the barangay comes before the court.',
    points: [
      'Disputes between residents of the **same city or municipality** must usually go through barangay conciliation first.',
      'The Punong Barangay mediates; if that fails, a **Pangkat ng Tagapagkasundo** conciliates.',
      'If no settlement is reached, the barangay issues a **Certificate to File Action** — without it a court will normally dismiss the case.',
      'Exceptions include cases where the government is a party, offences with penalties above one year or a ₱5,000 fine, and cases needing urgent legal action.',
      'A settlement signed before the barangay has the force of a final judgment after 10 days.',
    ],
  },
  {
    id: 'small-claims',
    name: 'Small claims cases',
    aliases: ['small claims', 'utang case', 'collect debt', 'sue for money'],
    about: 'A simplified court process for money claims, with no lawyers.',
    points: [
      'Covers purely **money claims up to ₱1,000,000** (as amended in 2022), exclusive of interest and costs.',
      'Used for unpaid loans, unpaid rent, damages from a contract, and dishonoured cheques.',
      '**Lawyers are not allowed** to appear — the parties represent themselves, using standard forms.',
      'Filed with the Metropolitan or Municipal Trial Court where the plaintiff or defendant resides.',
      'Decided usually **on the day of the hearing**, and the decision is final and unappealable.',
    ],
  },
  {
    id: 'prescription',
    name: 'Prescription periods (deadlines to sue)',
    aliases: ['prescription', 'deadline to file', 'how long to file case', 'statute of limitations'],
    about: 'How long a right of action lasts before it expires.',
    points: [
      '**Written contracts:** 10 years. **Oral contracts:** 6 years.',
      '**Quasi-delict (negligence/damages):** 4 years.',
      '**Injury to rights:** 4 years. **Defamation:** 1 year.',
      'Crimes: light offences 2 months, less grave 5 years, grave offences 10–20 years; those punished by *reclusion perpetua*, 20 years.',
      'Labour money claims: **3 years**. Illegal dismissal: **4 years**.',
    ],
  },
  {
    id: 'ra-3019',
    name: 'RA 3019 — Anti-Graft and Corrupt Practices Act',
    aliases: ['ra 3019', 'graft', 'corruption', 'anti graft'],
    about: 'Corrupt practices of public officers.',
    points: [
      'Punishes persuading or allowing oneself to be persuaded to violate rules, accepting gifts in exchange for official action, and giving unwarranted benefits through **manifest partiality, evident bad faith or gross inexcusable negligence** (Sec. 3[e]).',
      'Public officers must file a **Statement of Assets, Liabilities and Net Worth (SALN)** yearly.',
      'RA 6713 adds a code of conduct: officials must respond to letters within 15 working days and act promptly on public transactions.',
      'Cases are tried by the **Sandiganbayan**; the Ombudsman investigates and prosecutes.',
    ],
  },
  {
    id: 'consumer',
    name: 'Consumer rights (RA 7394) and warranties',
    aliases: ['consumer rights', 'ra 7394', 'consumer act', 'refund', 'warranty', 'defective product'],
    about: 'What a buyer is entitled to.',
    points: [
      'The Consumer Act protects against **deceptive, unfair and unconscionable sales acts**.',
      '**No-return-no-exchange signs are illegal.** A buyer of a defective product may demand repair, replacement or refund.',
      'Implied warranty applies for **60 days** for used goods and generally **one year** for new ones unless a longer express warranty is given.',
      'Complaints go to the **DTI** (goods and services), the **FDA** (food, drugs, cosmetics), or the LGU.',
      'Price tags are required, and charging above the displayed price is punishable.',
    ],
  },
  {
    id: 'traffic',
    name: 'Traffic laws (RA 4136 and related)',
    aliases: ['traffic law', 'ra 4136', 'driving law', 'ra 10913', 'seat belt', 'motorcycle'],
    about: 'The rules of the road most often asked about.',
    points: [
      'Driving without a licence, or with an expired one, is punishable under **RA 4136**.',
      '**RA 10913 (Anti-Distracted Driving Act):** using a mobile phone or any device while driving is prohibited, including at a stop light.',
      '**RA 10586 (Anti-Drunk and Drugged Driving):** the limit is 0.05% blood alcohol for private vehicles, 0.0% for professional and public-utility drivers.',
      '**RA 8750:** seat belts are mandatory for the driver and front passengers; **RA 11229** requires child restraints for children under 12 or below 4\'11".',
      '**RA 10666:** children below the required height may not ride as back-riders on motorcycles on public roads.',
    ],
  },
  {
    id: 'ra-11032',
    name: 'RA 11032 — Ease of Doing Business Act',
    aliases: ['ra 11032', 'ease of doing business', 'government transaction', 'red tape'],
    about: 'Deadlines government offices must meet.',
    points: [
      'Simple transactions: **3 working days**. Complex: **7 working days**. Highly technical: **20 working days**.',
      'If an office fails to act within the period, the application is **deemed approved** (with conditions).',
      'A **Citizen\'s Charter** must be posted, listing requirements, fees and deadlines.',
      'The **Anti-Red Tape Authority (ARTA)** receives complaints; fixing and refusal to act carry administrative and criminal liability.',
    ],
  },
  {
    id: 'ra-11036',
    name: 'RA 11036 — Mental Health Act',
    aliases: ['ra 11036', 'mental health act', 'mental health law'],
    about: 'Rights of people with mental health needs, and state duties.',
    points: [
      'Guarantees access to mental health services at every level of the health system, including in schools and workplaces.',
      'Service users have rights to **confidentiality, informed consent, humane treatment and legal representation**.',
      'Discrimination on the basis of mental health condition is prohibited.',
      'Mental health promotion is required in schools and workplaces, with programmes and trained staff.',
    ],
  },
]

export const LAWS = ROWS
