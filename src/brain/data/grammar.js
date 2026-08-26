/**
 * English grammar and writing.
 *
 * Every strand writes: research papers, position papers, application letters.
 * The brain could define a noun through the glossary but could not lay out the
 * tenses, settle its/it's, or say how a paragraph is built — which is the part
 * students are marked on.
 *
 * Rules here are the ones with a clear answer. Where usage genuinely varies —
 * the Oxford comma, splitting an infinitive — the card says it varies rather
 * than inventing a law.
 */

export const GRAMMAR = [
  {
    id: 'parts-of-speech',
    q: ['parts of speech', 'eight parts of speech', 'noun verb adjective', 'what are the parts of speech'],
    title: 'The eight parts of speech',
    body:
      '| Part | Does | Example |\n| --- | --- | --- |\n' +
      '| Noun | names a person, place, thing or idea | *teacher, Cebu, honesty* |\n' +
      '| Pronoun | stands in for a noun | *she, they, which* |\n' +
      '| Verb | an action or a state | *run, is, believe* |\n' +
      '| Adjective | describes a noun | *tall, blue, careful* |\n' +
      '| Adverb | describes a verb, adjective or adverb | *quickly, very, yesterday* |\n' +
      '| Preposition | relates a noun to something else | *in, on, between* |\n' +
      '| Conjunction | joins words or clauses | *and, but, because* |\n' +
      '| Interjection | a short exclamation | *oh, wow, ouch* |\n\n' +
      'A word\'s part of speech depends on its job in the sentence, not on the word itself: *book* is a noun in "read the book" and a verb in "book a room".',
  },
  {
    id: 'tenses',
    q: ['tenses', 'english tenses', '12 tenses', 'verb tenses', 'past present future tense'],
    title: 'The twelve tenses',
    body:
      'Three times × four aspects. Using *write*:\n\n' +
      '| | Simple | Continuous | Perfect | Perfect continuous |\n| --- | --- | --- | --- | --- |\n' +
      '| **Past** | wrote | was writing | had written | had been writing |\n' +
      '| **Present** | write / writes | am/is/are writing | have/has written | have/has been writing |\n' +
      '| **Future** | will write | will be writing | will have written | will have been writing |\n\n' +
      '**What each is for:**\n' +
      '- *Simple* — a fact, a habit, a completed act.\n' +
      '- *Continuous* — something in progress at that time.\n' +
      '- *Perfect* — finished, but relevant to the time being spoken of.\n' +
      '- *Perfect continuous* — went on for a while up to that time.',
  },
  {
    id: 'subject-verb-agreement',
    q: ['subject verb agreement', 'subject-verb agreement', 'singular plural verb'],
    title: 'Subject–verb agreement',
    body:
      'A singular subject takes a singular verb; a plural subject takes a plural verb. The traps:\n\n' +
      '- **Words between subject and verb do not change it.** *The box of books **is** heavy* — the subject is *box*, not *books*.\n' +
      '- **Either/neither… or/nor** — the verb follows the nearer subject. *Neither the teacher nor the students **are** ready.*\n' +
      '- **Each, every, everyone, somebody, nobody** are singular. *Everyone **has** a copy.*\n' +
      '- **A collective noun** takes a singular verb when it acts as one body. *The team **is** winning.*\n' +
      '- **"There is / there are"** agrees with what follows. *There **are** three reasons.*\n' +
      '- **Amounts** treated as one quantity are singular. *Twenty pesos **is** enough.*',
  },
  {
    id: 'common-errors',
    q: ['common grammar mistakes', 'your youre', 'their there theyre', 'its it\'s', 'commonly confused words'],
    title: 'Words people mix up',
    body:
      '| Confused | Which is which |\n| --- | --- |\n' +
      '| **its / it\'s** | *its* = belonging to it. *it\'s* = it is. |\n' +
      '| **your / you\'re** | *your* = belonging to you. *you\'re* = you are. |\n' +
      '| **their / there / they\'re** | belonging to them / a place / they are |\n' +
      '| **affect / effect** | *affect* is usually the verb, *effect* usually the noun |\n' +
      '| **then / than** | *then* = time. *than* = comparison. |\n' +
      '| **lose / loose** | *lose* = not win, misplace. *loose* = not tight. |\n' +
      '| **advice / advise** | *advice* is the noun, *advise* the verb |\n' +
      '| **principal / principle** | the head of a school / a rule or belief |\n' +
      '| **fewer / less** | *fewer* for things you can count, *less* for quantity |\n' +
      '| **who\'s / whose** | *who\'s* = who is. *whose* = belonging to whom. |\n\n' +
      'The apostrophe test settles half of these: if the long form fits, use the apostrophe.',
  },
  {
    id: 'punctuation',
    q: ['punctuation', 'when to use a comma', 'semicolon', 'punctuation rules', 'apostrophe'],
    title: 'Punctuation',
    body:
      '**Comma** — separates items in a list; after an introductory phrase; around an interruption; before *and, but, so* joining two full sentences.\n\n' +
      '**Full stop** — ends a statement.\n\n' +
      '**Semicolon** — joins two complete sentences that belong together: *It rained all week; the road flooded.*\n\n' +
      '**Colon** — introduces a list, an explanation or a quotation. What comes before it should be a complete sentence.\n\n' +
      '**Apostrophe** — possession (*the boy\'s bag*, *the boys\' bags*) or a contraction (*don\'t*). Never for a plain plural.\n\n' +
      '**Quotation marks** — direct speech and quoted words.\n\n' +
      '**Dash** — an abrupt break or an aside — like this one.\n\n' +
      '*The Oxford comma — the one before "and" in a list — is optional. Use it or not, but be consistent.*',
  },
  {
    id: 'sentence-types',
    q: ['types of sentences', 'simple compound complex', 'sentence structure', 'kinds of sentences'],
    title: 'Sentence types',
    body:
      '**By structure:**\n' +
      '- **Simple** — one independent clause. *She studied.*\n' +
      '- **Compound** — two independent clauses joined. *She studied, and she passed.*\n' +
      '- **Complex** — one independent, one dependent. *Because she studied, she passed.*\n' +
      '- **Compound-complex** — two independent plus a dependent. *Because she studied, she passed, and her parents were proud.*\n\n' +
      '**By purpose:** declarative (states), interrogative (asks), imperative (commands), exclamatory (exclaims).\n\n' +
      '**Two faults to avoid:** a **fragment** is missing a subject or verb; a **run-on** joins two sentences with no punctuation or with only a comma.',
  },
  {
    id: 'essay',
    q: ['essay structure', 'how to write an essay', 'parts of an essay', 'thesis statement'],
    title: 'Writing an essay',
    body:
      '**Introduction** — a hook, the context in a sentence or two, then the **thesis statement**: one sentence saying what you will argue. A thesis is arguable, specific, and not a statement of fact.\n\n' +
      '**Body** — one idea per paragraph, each built as:\n' +
      '1. topic sentence — the claim\n2. evidence — data, quotation, example\n3. explanation — why the evidence supports the claim\n4. link — to the next paragraph\n\n' +
      '**Conclusion** — restate the thesis in different words, draw the argument together, and end on what it means. No new evidence here.\n\n' +
      '**Then edit.** Cut what repeats, check every claim is supported, read it aloud to catch what does not run, and check the citations against the style you were asked for.',
  },
  {
    id: 'active-passive',
    q: ['active and passive voice', 'passive voice', 'active voice'],
    title: 'Active and passive voice',
    body:
      '**Active** — the subject does the action: *The researcher collected the data.*\n\n' +
      '**Passive** — the subject receives it: *The data were collected by the researcher.*\n\n' +
      '**To turn active into passive:** the object becomes the subject, the verb becomes *be* + past participle, and the old subject follows *by* — or is dropped.\n\n' +
      '**Which to use:** active is usually shorter and clearer, and most teachers prefer it. Passive earns its place when the doer is unknown, unimportant, or deliberately left out — *the samples were stored at 4 °C* — which is why methods sections are written in it.',
  },
  {
    id: 'figures-of-speech',
    q: ['figures of speech', 'simile metaphor', 'literary devices', 'personification'],
    title: 'Figures of speech',
    body:
      '| Figure | What it does | Example |\n| --- | --- | --- |\n' +
      '| Simile | compares using *like* or *as* | *as busy as a bee* |\n' +
      '| Metaphor | says one thing **is** another | *time is money* |\n' +
      '| Personification | gives human traits to a thing | *the wind whispered* |\n' +
      '| Hyperbole | deliberate exaggeration | *I have told you a million times* |\n' +
      '| Irony | the opposite of what is meant | *"lovely weather," in a storm* |\n' +
      '| Oxymoron | two contradictory words together | *deafening silence* |\n' +
      '| Alliteration | repeated opening sounds | *Peter Piper picked* |\n' +
      '| Onomatopoeia | a word that sounds like its meaning | *buzz, crash* |\n' +
      '| Euphemism | a mild word for a hard thing | *passed away* |\n' +
      '| Idiom | a phrase whose meaning is not literal | *break a leg* |',
  },
]
