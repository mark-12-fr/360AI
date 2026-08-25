import { normalise, contentWords, coreQuestion, overlapScore } from '../nlp.js'

const CREATIVE_QA = [
  {
    q: ['what would happen if the sun disappeared', 'what if the sun vanished', 'sun disappears scenario'],
    a: `## What Would Happen If the Sun Disappeared

### Immediate Effects (8 minutes)
- Darkness falls (light takes 8 minutes to reach Earth)
- No more solar energy

### Within 1 Week
- Earth's surface temperature drops to about -18C
- Plants die without photosynthesis
- Most food chains collapse

### Within 1 Year
- Surface temperature drops to -73C
- Oceans freeze on the surface
- Most life is extinct

### Long-term
- Earth orbits through space as a dark, frozen rock
- Some deep-sea organisms near hydrothermal vents might survive
- Humanity would need underground or nuclear-powered habitats

### Key Insight
The sun provides 173,000 terawatts of energy continuously. Without it, Earth becomes a lifeless冰ball within months.`
  },
  {
    q: ['compare online learning and classroom learning', 'online vs classroom education', 'which is better online or in person learning'],
    a: `## Online Learning vs Classroom Learning

### Convenience
- **Online**: Learn from anywhere, anytime, at your own pace
- **Classroom**: Fixed schedule, must commute, but structured routine

### Interaction
- **Online**: Limited peer interaction, chat-based discussion
- **Classroom**: Face-to-face interaction, immediate feedback, group activities

### Cost
- **Online**: Generally cheaper, no commuting costs, many free resources
- **Classroom**: Higher tuition, transportation costs, but campus resources included

### Self-Discipline
- **Online**: Requires high self-motivation, easy to procrastinate
- **Classroom**: External accountability, scheduled classes help stay on track

### Hands-on Learning
- **Online**: Difficult for labs, arts, and physical skills
- **Classroom**: Better for experiments, workshops, and physical practice

### Which is Better?
Choose **online** if you are self-motivated, have a busy schedule, or want to save money.
Choose **classroom** if you need structure, hands-on practice, or thrive on social interaction.
Many people benefit from a hybrid approach.`
  },
  {
    q: ['what do you think about artificial intelligence', 'opinion on ai', 'is ai good or bad'],
    a: `## Thoughts on Artificial Intelligence

### Benefits
- Automates repetitive tasks, freeing humans for creative work
- Advances medicine (drug discovery, diagnostics, personalized treatment)
- Improves efficiency in many industries
- Makes technology more accessible (voice assistants, translation)

### Concerns
- Job displacement in certain sectors
- Privacy and surveillance issues
- Bias in AI systems can perpetuate inequality
- Potential for misuse (deepfakes, autonomous weapons)
- Concentration of power in few tech companies

### Balanced View
AI is a tool. Like any tool, its impact depends on how we use it. The key challenges are:
1. Ensuring fair and transparent AI systems
2. Providing education and retraining for displaced workers
3. Creating regulations that protect people while allowing innovation
4. Making AI benefits available broadly, not just to the wealthy

### Bottom Line
AI will transform society significantly. The question is not whether AI is good or bad, but how we choose to develop and deploy it responsibly.`
  },
  {
    q: ['what are the pros and cons of social media', 'advantages and disadvantages of social media', 'is social media good or bad'],
    a: `## Pros and Cons of Social Media

### Pros
- **Connection**: Stay in touch with friends and family worldwide
- **Information**: News and knowledge at your fingertips
- **Opportunities**: Job networking, business marketing, skill sharing
- **Community**: Find groups with shared interests
- **Voice**: Platform for expression and activism
- **Education**: Learning resources and tutorials

### Cons
- **Mental Health**: Anxiety, depression, low self-esteem from comparison
- **Addiction**: Designed to be addictive, wastes time
- **Privacy**: Personal data collected and sold
- **Misinformation**: False news spreads quickly
- **Cyberbullying**: Harassment and hate speech
- **Superficiality**: Focus on appearance over substance
- **Sleep Disruption**: Late-night scrolling affects rest

### Balanced Approach
- Set time limits for social media use
- Curate your feed to show positive content
- Avoid comparing your life to others
- Take regular digital detoxes
- Be mindful of what you share

Social media is a tool that can enhance or harm your life depending on how you use it.`
  },
  {
    q: ['imagine a world without technology', 'what if there was no technology', 'life without technology'],
    a: `## A World Without Modern Technology

### Daily Life
- No smartphones, internet, or computers
- Communication by letters, landline phones, or face-to-face
- Entertainment: books, board games, live performances
- Shopping at physical stores only, no online shopping

### Work
- Jobs done manually or with basic machines
- No remote work, everyone commutes
- Manufacturing is slower and more labor-intensive
- No software, apps, or digital tools

### Education
- Libraries and physical textbooks only
- In-person classes, no online courses
- Research requires physical visits to archives
- No educational apps or videos

### Healthcare
- Basic medical equipment
- No advanced imaging (MRI, CT scans)
- Limited remote diagnosis
- Medical records on paper

### Transportation
- Cars without GPS or entertainment systems
- No ride-sharing apps
- Public transit without real-time tracking
- Maps and compasses instead of navigation apps

### Social Impact
- Stronger local communities
- More face-to-face interaction
- Slower pace of life
- Less information overload
- Potentially more meaningful relationships

### Bottom Line
Technology has made life easier and more connected, but a world without it would force us to slow down, be more present, and rely on human connection.`
  },
  {
    q: ['which is better cats or dogs', 'cats vs dogs debate', 'are cats better than dogs'],
    a: `## Cats vs Dogs: The Great Debate

### Dogs - Advantages
- Loyal and affectionate companions
- Great for active lifestyles (walking, hiking, running)
- Trainable and eager to please
- Social animals that enjoy meeting new people
- Can be working partners (therapy, guide, search and rescue)

### Dogs - Challenges
- Require daily walks and outdoor time
- Need more training and attention
- Higher maintenance (grooming, exercise)
- Can be destructive if bored or anxious
- Require more space

### Cats - Advantages
- Independent and low-maintenance
- Perfect for small spaces and apartments
- Quiet and clean
- Self-grooming
- Great for busy professionals

### Cats - Challenges
- Less outwardly affectionate (varies by cat)
- Cannot be trained as easily
- Scratching furniture is common
- Some people are allergic
- Indoor cats need enrichment

### Which Should You Choose?
Choose a **dog** if you have time, space, and want an active, social companion.
Choose a **cat** if you have limited space, a busy schedule, or prefer a quieter pet.
Either way, you get a loving companion.`
  },
  {
    q: ['what are the pros and cons of working from home', 'advantages disadvantages remote work', 'is working from home better'],
    a: `## Pros and Cons of Working From Home

### Pros
- **No commute**: Save time and money on transportation
- **Flexibility**: Set your own schedule in many cases
- **Comfort**: Work in your own space
- **Productivity**: Fewer office distractions for many people
- **Cost savings**: Less spending on food, transport, and clothing
- **Better work-life balance**: More time with family

### Cons
- **Isolation**: Less social interaction with colleagues
- **Distractions at home**: Family, chores, entertainment
- **Blurred boundaries**: Hard to separate work and personal life
- **Communication challenges**: Misunderstandings in text-based communication
- **Career concerns**: Less visibility for promotions
- **Ergonomic issues**: Improper desk setup can cause health problems

### Tips for Success
1. Create a dedicated workspace
2. Set clear working hours
3. Dress professionally (at least from the waist up for video calls)
4. Take regular breaks
5. Communicate proactively with your team
6. Maintain social connections outside of work

### Best For
Remote work suits self-motivated people with good communication skills, stable home environments, and jobs that do not require physical presence.`
  },
  {
    q: ['what would happen if humans could fly', 'what if humans had wings', 'human flight scenario'],
    a: `## What If Humans Could Fly?

### Physical Changes Needed
- Wings would need 6-7 meter span for average adult
- Body would need to be much lighter (hollow bones like birds)
- Chest muscles would be enormous (like a bird's pectorals)
- Eyes would need protection from wind

### Daily Life Changes
- **Transportation**: No cars, trains, or planes needed for short distances
- **Housing**: Buildings would have landing pads instead of garages
- **Cities**: Architecture would change - vertical cities with flying lanes
- **Jobs**: Mail delivery, courier services, aerial construction

### Social Impact
- Borders would be harder to enforce
- Sports would be completely different (aerial sports dominate)
- Crime would be harder to police
- Tourism would boom (flying tours of landmarks)

### Challenges
- Weather would ground everyone during storms
- Air traffic control would be essential
- Exhaustion and weather limit long-distance travel
- Collisions with birds and buildings
- Noise pollution from millions of flyers

### Fun Possibilities
- Flying races as a major sport
- Aerial deliveries instead of trucks
- Flying to work in minutes
- Bird's-eye view of the world every day

### Bottom Line
Flight would be liberating but would fundamentally reshape civilization, architecture, transportation, and social structures.`
  },
  {
    q: ['what are the advantages and disadvantages of living in the city', 'city vs countryside living', 'is city life better'],
    a: `## City vs Country Living

### City - Advantages
- More job opportunities and higher salaries
- Better healthcare and education facilities
- Cultural diversity and entertainment options
- Public transportation available
- Social scene and networking opportunities
- Access to restaurants and shopping

### City - Disadvantages
- High cost of living (rent, food, transportation)
- Noise, pollution, and traffic
- Smaller living spaces
- Higher stress levels
- Less connection to nature
- Overcrowding

### Country - Advantages
- Lower cost of living
- More space and bigger homes
- Cleaner air and natural surroundings
- Quieter and slower pace
- Stronger sense of community
- Less crime

### Country - Disadvantages
- Fewer job opportunities
- Limited healthcare and education options
- Less entertainment and cultural events
- Requires a car for transportation
- Limited diversity
- Slower internet

### Which is Better?
- Choose the **city** if you want career opportunities, convenience, and a vibrant social scene
- Choose the **country** if you want space, nature, lower costs, and a quieter life
- Many people compromise by living in suburbs and commuting

### Tips for Either
- Visit before you move
- Consider your career stage and family needs
- Test the lifestyle for a few months if possible
- Build community wherever you go`
  },
  {
    q: ['compare digital books and physical books', 'ebooks vs printed books', 'which is better kindle or real book'],
    a: `## E-books vs Physical Books

### E-books - Advantages
- Thousands of books in one device
- Adjustable font size and brightness
- Built-in dictionary and translation
- Cheaper than physical books
- Instant download, no waiting
- Environmental: no paper used

### E-books - Disadvantages
- Eye strain from screen time
- Requires device and battery
- Cannot lend or resell easily
- Less tactile satisfaction
- No bookshelf display
- Cannot easily flip between pages

### Physical Books - Advantages
- No battery or device needed
- Better for deep reading and retention
- Can lend, borrow, and resell
- Tangible satisfaction of holding a book
- Beautiful bookshelves and collections
- Easier to annotate and highlight

### Physical Books - Disadvantages
- Heavy and bulky to carry
- Take up shelf space
- More expensive
- Environmental impact (paper, printing)
- Can get damaged by water, sunlight
- Takes time to acquire

### Which Should You Choose?
Use **e-books** for: Travel, convenience, quick reference, saving space, and accessibility features.
Use **physical books** for: Deep reading, collections, gifts, bedtime reading, and sharing.
Many readers use both depending on the situation.`
  },
  {
    q: ['what if dinosaurs never went extinct', 'what would the world be like if dinosaurs survived', 'dinosaur survival scenario'],
    a: `## What If Dinosaurs Never Went Extinct?

### The Theory
The asteroid impact 66 million years ago killed non-avian dinosaurs. Without it, dinosaurs might still dominate.

### How Earth Would Look
- **Mammals**: Would remain small, nocturnal creatures
- **No humans**: Primates would likely never evolve to intelligence
- **Diverse dinosaurs**: Many species would still roam the earth
- **Different ecosystems**: Forests, grasslands shaped by dinosaur behavior

### Daily Life (If Humans Existed)
- Walls and fences would need to be dinosaur-proof
- Agriculture would face dinosaur raids
- Cities would be built differently (high walls, underground)
- No open-field farming without protection

### Scientific Impact
- Paleontology would be different (dinosaurs would be alive)
- Biology would focus on reptilian intelligence
- No study of extinction events
- Different understanding of evolution

### Fun Possibilities
- Dinosaur riding as transportation
- Dinosaur farms for food
- Dinosaur racing as a sport
- Prehistoric theme parks in real life

### Bottom Line
Without the extinction event, mammals (and humans) would likely never have become dominant. The world would be ruled by reptilian giants, and we would not be here to wonder about it.`
  },
  {
    q: ['what are the pros and cons of fast food', 'advantages and disadvantages of fast food', 'is fast food bad for you'],
    a: `## Pros and Cons of Fast Food

### Pros
- **Convenience**: Quick and easy to get
- **Affordable**: Cheaper than restaurant dining
- **Consistent**: Same taste every time
- **Accessible**: Available almost everywhere
- **Variety**: Many options and cuisines
- **No cooking required**: Good for busy people

### Cons
- **Health risks**: High calories, sodium, sugar, and unhealthy fats
- **Obesity**: Linked to weight gain and related diseases
- **Low nutrition**: Few vitamins, minerals, and fiber
- **Addictive**: Designed to make you crave more
- **Environmental impact**: Excessive packaging, high carbon footprint
- **Social impact**: Reduced family meals and cooking skills

### Healthier Fast Food Tips
1. Choose grilled over fried
2. Skip the sugary drinks (water is free)
3. Ask for less sauce
4. Add a side salad instead of fries
5. Avoid super-sized meals
6. Check nutrition information online before going

### Bottom Line
Fast food is fine occasionally but should not be a regular part of your diet. Cooking at home gives you control over ingredients and nutrition.`
  },
  {
    q: ['imagine a world with no money', 'what if money did not exist', 'cashless society scenario'],
    a: `## A World Without Money

### How Would Trade Work?
- **Barter system**: Trade goods directly (chickens for shoes)
- **Time banking**: Exchange hours of work (1 hour of plumbing for 1 hour of teaching)
- **Gift economy**: People give freely and receive from others
- **Communal sharing**: Resources shared by community

### Daily Life Changes
- No prices, bills, or bank accounts
- People work for meaning, not paycheck
- No homelessness (no rent to pay)
- No extreme wealth inequality
- Everyone has basic needs met

### Challenges
- How to value different goods and services
- No incentive for undesirable work (garbage collection, etc.)
- Difficulty in large-scale trade
- No savings or investment
- No economic growth measurement

### Social Impact
- Stronger communities (reliance on each other)
- More time for art, relationships, and leisure
- Less stress about bills and financial security
- Potential for more equality
- May reduce innovation (no profit motive)

### Would It Work?
Some small communities function this way (indigenous tribes, communes). For a global society, it would require fundamental changes in how we think about value, work, and ownership.

### Bottom Line
A money-free world would eliminate financial stress but would require new systems for organizing society, distributing resources, and motivating people to contribute.`
  },
  {
    q: ['which is better living alone or with roommates', 'alone vs shared living', 'should i live alone'],
    a: `## Living Alone vs With Roommates

### Living Alone - Advantages
- Complete freedom and privacy
- No conflicts over chores or noise
- Your space, your rules
- Peace and quiet
- No need to coordinate schedules
- Personal growth and independence

### Living Alone - Disadvantages
- More expensive (full rent on one income)
- Can be lonely
- All chores fall on you
- No one to help in emergencies
- Less social interaction at home
- Bigger space to maintain

### Living With Roommates - Advantages
- Split rent and utilities (saves money)
- Built-in social interaction
- Help with chores (if fair)
- Safety in numbers
- Shared resources (furniture, kitchen items)
- Learn compromise and communication

### Living With Roommates - Disadvantages
- Less privacy
- Potential conflicts over cleaning, guests, noise
- Shared spaces can get messy
- Need to coordinate schedules
- Less control over living environment
- Possible roommate drama

### Which Should You Choose?
Choose **living alone** if: You value privacy, have a higher budget, are introverted, or have had bad roommate experiences.
Choose **roommates** if: You want to save money, enjoy social living, are extroverted, or want help with expenses.

### Tips for Either
- If living alone: Budget carefully, plan social activities outside home
- If with roommates: Set clear rules upfront, communicate openly, respect boundaries`
  },
  {
    q: ['what would happen if gravity was weaker', 'what if gravity was half as strong', 'low gravity scenario'],
    a: `## What If Gravity Was Weaker?

### Physical Changes
- Everything would weigh less (half as heavy if gravity was halved)
- Jumping higher and longer
- Objects fall slower
- Water behavior would change (splashes, waves)

### Daily Life
- **Walking**: You would bounce with each step
- **Sports**: Long jump records would be doubled, basketball would be vertical
- **Transportation**: Cars would need more grip, planes would fly differently
- **Construction**: Buildings could be taller with less structural support

### Nature
- Trees would grow taller (less gravity resistance)
- Animals would be larger and lighter
- Weather patterns would change
- Mountains could be taller
- Rivers and oceans would behave differently

### Human Body
- Bones and muscles would be weaker (less gravity to fight)
- Heart would work differently
- Blood circulation would change
- Humans might evolve to be taller and thinner

### Challenges
- Water would not stay in open containers easily
- Cooking and boiling would change
- Fire behavior would be different
- Space travel would be easier (less gravity to escape)

### Fun Possibilities
- Slam dunks from the free-throw line
- Human flight possible with wings
- Building incredible structures
- Amazing acrobatic sports

### Bottom Line
Weaker gravity would make life very different - easier in some ways, harder in others. Our bodies, architecture, and entire civilization would have evolved differently.`
  },
  {
    q: ['what are the pros and cons of renewable energy', 'advantages disadvantages of solar and wind energy', 'is renewable energy better'],
    a: `## Pros and Cons of Renewable Energy

### Pros
- **Environmentally friendly**: No greenhouse gas emissions during operation
- **Sustainable**: Sun, wind, and water will not run out
- **Lower operating costs**: No fuel to purchase
- **Energy independence**: Reduce reliance on imported fuels
- **Job creation**: Growing industry needs workers
- **Health benefits**: Less air pollution means better health

### Cons
- **High initial cost**: Solar panels and wind turbines are expensive
- **Intermittency**: Sun does not always shine, wind does not always blow
- **Storage challenges**: Batteries needed for when production is low
- **Space requirements**: Solar and wind farms need large areas
- **Location dependent**: Not all areas have equal sun or wind
- **Visual impact**: Some consider wind turbines unsightly

### Types of Renewable Energy
1. **Solar**: Panels convert sunlight to electricity
2. **Wind**: Turbines convert wind to electricity
3. **Hydroelectric**: Dams use water flow to generate power
4. **Geothermal**: Heat from Earth's interior produces steam
5. **Biomass**: Organic materials burned for energy

### Bottom Line
Renewable energy is essential for fighting climate change. While there are challenges, the technology is improving rapidly and costs are decreasing. A mix of renewable sources provides the most reliable supply.`
  },
  {
    q: ['what if everyone was vegetarian', 'what if no one ate meat', 'global vegetarian scenario'],
    a: `## What If Everyone Was Vegetarian?

### Environmental Impact
- **Land use**: 75% less farmland needed (livestock uses most farmland)
- **Water use**: 50% less water consumption
- **Greenhouse gases**: 25-50% reduction in food-related emissions
- **Deforestation**: Much less clearing for cattle grazing
- **Ocean health**: Fishing pressure would decrease dramatically

### Health Effects
- Lower rates of heart disease and certain cancers
- More fiber and plant nutrients in diet
- Need for careful planning (vitamin B12, iron, omega-3s)
- Potentially lower healthcare costs

### Economic Changes
- Meat industry workers would need retraining
- Farmers would shift to plant agriculture
- Restaurant menus would change dramatically
- Food prices might decrease (plant protein is cheaper)

### Social Impact
- Cultural traditions involving meat would change
- Religious and cultural practices affected
- Food diversity might decrease in some regions
- Hunting and fishing industries would disappear

### Challenges
- Protein diversity would be limited
- Some nutrients harder to get (B12, complete proteins)
- Not all land is suitable for crops
- Cultural resistance in meat-loving societies

### Bottom Line
A global shift to vegetarianism would benefit the environment significantly but would require major economic and cultural adjustments. A partial shift (less meat consumption) is more realistic and still beneficial.`
  },
  {
    q: ['compare studying alone vs studying in groups', 'solo study vs group study', 'which is better individual or group study'],
    a: `## Solo Study vs Group Study

### Solo Study - Advantages
- Learn at your own pace
- Choose your own schedule and location
- Deep focus without distractions
- Review material as many times as needed
- No social pressure or embarrassment
- Better for detailed memorization

### Solo Study - Disadvantages
- No immediate clarification of doubts
- Can become boring or monotonous
- Easy to procrastinate without accountability
- Miss different perspectives on topics
- Less motivation over long periods
- No one to quiz you

### Group Study - Advantages
- Immediate discussion and clarification
- Different perspectives deepen understanding
- Peer accountability keeps you on track
- Teaching others reinforces your learning
- More engaging and social
- Can divide work and share resources

### Group Study - Disadvantages
- Can become socializing instead of studying
- One person may dominate the group
- Scheduling is difficult
- May go too fast or too slow for you
- Distractions from group dynamics
- Less control over what to study

### Best Approach
- Use **solo study** for: Initial learning, memorization, deep focus work
- Use **group study** for: Review, problem-solving, discussion, test preparation
- Alternate between both for best results

### Tips
- Set clear goals for group sessions
- Choose group members who are serious about studying
- Use solo time to prepare for group discussions
- Don't rely solely on either method`
  },
  {
    q: ['what would happen if the internet was free for everyone', 'what if internet was a human right', 'free internet for all scenario'],
    a: `## What If Internet Was Free for Everyone?

### Immediate Impact
- 3+ billion more people online
- Global knowledge access for all
- Digital divide eliminated
- Massive increase in global communication

### Economic Changes
- E-commerce would boom in developing countries
- New businesses could start with no cost barriers
- Remote work would become truly global
- Education and training accessible to all

### Social Changes
- Greater equality of information access
- Cultural exchange would accelerate
- Political awareness and activism would increase
- Language barriers would reduce (better translation tools)

### Challenges
- Infrastructure costs still exist (someone must pay)
- Cybersecurity concerns increase with more users
- Digital literacy becomes essential
- Information overload for new users
- Privacy concerns on a massive scale

### Education Revolution
- Every student could access world-class resources
- Online courses available to everyone
- Research accessible to all, not just universities
- Self-learning becomes mainstream

### Business Impact
- More competition (global marketplaces)
- Small businesses can reach global customers
- Innovation increases with more minds contributing
- Traditional gatekeepers lose power

### Bottom Line
Free internet would be transformative for equality and opportunity. The main challenge is funding infrastructure while ensuring quality and security for all users.`
  },
  {
    q: ['what are the pros and cons of social media for teenagers', 'should teens use social media', 'social media effects on youth'],
    a: `## Social Media for Teens: Pros and Cons

### Pros
- **Connection**: Stay in touch with friends, especially distant ones
- **Self-expression**: Share creativity, thoughts, and talents
- **Learning**: Educational content and tutorials
- **Community**: Find like-minded people and support groups
- **Identity exploration**: Try different aspects of personality
- **Career prep**: Build digital presence and skills

### Cons
- **Mental health**: Comparison leads to anxiety and depression
- **Cyberbullying**: Harassment follows teens home
- **Addiction**: Designed to be addictive, wastes time
- **Sleep disruption**: Late-night scrolling affects rest
- **Privacy risks**: Personal data exposed and misused
- **Unrealistic standards**: Filtered images create false expectations
- **FOMO**: Fear of missing out causes stress

### Guidelines for Parents
1. Set screen time limits
2. Keep devices out of bedrooms at night
3. Monitor friend lists and interactions
4. Teach critical thinking about content
5. Model healthy social media use
6. Keep communication open and judgment-free

### Guidelines for Teens
1. Curate your feed to show positive content
2. Take regular breaks from social media
3. Remember: people post highlights, not full reality
4. Never share personal information publicly
5. Talk to a trusted adult about anything uncomfortable
6. Prioritize real-life friendships

### Bottom Line
Social media is not inherently bad for teens, but it requires guidance and boundaries. The key is using it mindfully while maintaining real-world connections and activities.`
  },
  {
    q: ['imagine life on mars', 'what would living on mars be like', 'mars colonization scenario'],
    a: `## Life on Mars

### Daily Life
- Living in sealed habitats (no breathable atmosphere outside)
- 24.6 hour day (almost same as Earth)
- 38% of Earth's gravity (you would weigh less)
- Temperature: average -60C, can reach -125C

### Challenges
- No breathable air (95% carbon dioxide atmosphere)
- Radiation exposure (no magnetic field or thick atmosphere)
- Dust storms that can last months
- Limited water (mostly ice underground)
- Communication delay: 4-24 minutes to Earth
- Isolation and psychological stress

### Resources
- Water: Extracted from ice and underground sources
- Oxygen: Extracted from CO2 using electrolysis
- Food: Greenhouse farming with artificial light
- Energy: Solar panels (less efficient than Earth) and nuclear
- Building: Use Martian soil (regolith) for construction

### Social Structure
- Small initial communities (colonists)
- Strict resource sharing and rationing
- Specialized roles (engineers, doctors, farmers)
- Democratic governance likely
- Strong community bonds due to isolation

### Psychological Impact
- Earth is just a bright dot in the sky
- No return trips for most colonists
- New generation born on Mars would call it home
- Unique culture would develop
- Sense of being pioneers and explorers

### Timeline
- First human landing: 2030s-2040s (optimistic)
- Permanent settlement: 2050s+
- Self-sustaining colony: 2100+

### Bottom Line
Living on Mars would be extremely challenging but not impossible. The first colonists would be pioneers facing hardship, but future generations could build a new branch of human civilization.`
  },
  {
    q: ['compare traditional education and homeschooling', 'traditional school vs homeschool', 'which is better public school or homeschool'],
    a: `## Traditional School vs Homeschooling

### Traditional School - Advantages
- Structured curriculum and schedule
- Social interaction with diverse peers
- Access to facilities (labs, sports, libraries)
- Qualified teachers and counselors
- Extracurricular activities (clubs, sports)
- Easier transition to college and careers
- Less work for parents

### Traditional School - Disadvantages
- One-size-fits-all approach
- Large class sizes limit individual attention
- Bullying and social pressures
- Fixed schedule and location
- Less control over curriculum
- May not suit different learning styles
- Safety concerns in some areas

### Homeschooling - Advantages
- Customized learning pace and style
- Flexible schedule
- Safe learning environment
- One-on-one attention
- Can focus on strengths and interests
- Stronger family bonds
- No peer pressure or bullying

### Homeschooling - Disadvantages
- Requires significant parent time and commitment
- Less social interaction (though homeschool groups exist)
- Parents may lack expertise in some subjects
- Fewer resources for specialized learning
- College admission can be more complex
- Can be isolating for some children
- Financial impact (one parent may not work)

### Which is Better?
- **Traditional school** works best for most families with structured learners who benefit from social interaction
- **Homeschooling** works best for self-directed learners, families with flexible schedules, or children with special needs

### Key to Success
Either approach can work if the child's needs are met, parents are involved, and there are opportunities for social interaction and growth.`
  },
  {
    q: ['what would happen if humans became immortal', 'what if people could not die', 'immortality scenario'],
    a: `## What If Humans Were Immortal?

### Immediate Impact
- No death from aging (accidents and disease still possible)
- Population would explode rapidly
- Retirement would not exist
- Generational knowledge would accumulate

### Social Changes
- Marriage would mean forever (divorce more important)
- Career changes would be common (centuries of the same job)
- Education would be continuous
- Relationships would evolve over centuries

### Economic Impact
- No inheritance (wealth stays with owners)
- Wealth inequality would increase dramatically
- Housing would become extremely scarce
- New industries would emerge (memory storage, identity verification)

### Psychological Impact
- Meaning of life would be questioned
- Boredom and existential crisis possible
- Risk aversion might increase (eternity to lose)
- Relationships might become more careful and selective
- Mental health challenges over centuries

### Population Concerns
- Earth cannot support unlimited people
- Strict birth control would be necessary
- Space colonization becomes essential
- Resource management becomes critical

### Potential Benefits
- Wisdom accumulates over centuries
- Long-term thinking becomes natural
- Relationships deepen over decades
- Scientific progress accelerates (experience compounds)
- No grief from losing loved ones to age

### Potential Downsides
- Loss of urgency and motivation
- Overpopulation and resource depletion
- Social stagnation (old ideas persist)
- New forms of inequality (age advantage)
- Meaninglessness without mortality

### Bottom Line
Immortality would solve some problems but create others. The human experience might lose meaning without the knowledge that our time is limited. Some believe mortality gives life its preciousness.`
  },
  {
    q: ['what would happen if all animals could talk', 'what if animals spoke human language', 'animals talking scenario'],
    a: `## What If All Animals Could Talk?

### Communication Revolution
- We would learn animal perspectives on the world
- Pets could tell us what they need and feel
- Wildlife researchers could interview animals directly
- Language barriers between species would emerge

### Ethical Implications
- Factory farming would face massive public outcry
- Animal rights movements would gain powerful advocates
- Hunting and fishing would become morally complex
- Zoos and aquariums would face ethical questions

### Daily Life Changes
- Pets could report neglect or abuse
- Farmers could negotiate with livestock
- Pest control would become a moral dilemma
- Birdsong would be literal poetry or complaints

### Scientific Impact
- Animal behavior research would be transformed
- We would understand ecosystems from the inside
- Conservation efforts would have animal input
- Medicine could benefit from animal self-reporting

### Challenges
- Every species would have a different language
- Some animals might not want to talk to us
- Noise pollution would be unbearable
- Privacy would be impossible in nature

### Fun Possibilities
- Pet reviews of their owners
- Animal Yelp reviews of restaurants
- Wildlife travel guides
- Animal stand-up comedy

### Bottom Line
The world would become much noisier and ethically complicated. We would gain incredible knowledge but also face uncomfortable truths about how we treat other species.`
  },
  {
    q: ['what would a day without internet be like', 'what if internet shut down for a day', 'no internet day scenario'],
    a: `## A Day Without Internet

### Morning
- No social media notifications
- No email access
- Alarm clocks would be phones only
- No news apps or websites

### Work
- No cloud computing or online collaboration
- No video calls or remote work
- Many businesses would shut down
- ATMs and online banking offline

### Communication
- No messaging apps (WhatsApp, Messenger, etc.)
- Text messages and calls would still work
- Face-to-face conversations would increase
- Landline phones would see a comeback

### Entertainment
- No streaming (Netflix, YouTube, Spotify)
- No online gaming
- Books, board games, and outdoor activities
- Radio and TV would be primary media

### Education
- No online courses or research
- Libraries would be crowded
- Students would need physical textbooks
- Teachers would lecture without digital aids

### Social Impact
- People would talk to neighbors and family
- Introverts might enjoy the break
- Extroverts might feel isolated
- Communities would come together

### Bottom Line
A day without internet would be inconvenient but might remind us of the value of face-to-face interaction, physical activities, and offline hobbies.`
  },
  {
    q: ['what if humans had tails', 'human tail scenario', 'what if people had tails'],
    a: `## What If Humans Had Tails?

### Physical Design
- Tail length: 2-3 feet for balance
- Prehensile (like monkeys) for gripping
- Muscles at base for movement
- Covered in hair like head hair

### Daily Life Changes
- Chairs would have tail holes
- Clothing would be designed differently
- Seating in restaurants and theaters
- Cars would have tail accommodations

### Social Impact
- Handshakes might include tail shakes
- Body language would include tail expressions
- Fashion would include tail accessories
- Grooming routines would include tail care

### Sports and Activities
- New sports centered around tail use
- Balance would improve (gymnastics, surfing)
- Martial arts would incorporate tail techniques
- Dancing would include tail movements

### Challenges
- Tail injuries would be common
- Crowded spaces would be more cramped
- Sleeping positions would change
- Pregnancy and childbirth would be more complex

### Fun Possibilities
- Tail-related fashion trends
- Tail wagging when happy
-Using tails to carry things
- Tail-based art and expression

### Bottom Line
Tails would be a fascinating addition to human anatomy, changing everything from fashion to sports to social interaction. We would find creative ways to use them, and they would become part of our identity.`
  },
  {
    q: ['what would happen if we could clone humans', 'human cloning scenario', 'what if human cloning was legal'],
    a: `## What If Human Cloning Was Legal?

### Ethical Debates
- What rights would clones have?
- Are they individuals or copies?
- Who is responsible for raising them?
- Can they inherit property or identity?

### Social Impact
- Family structures would change
- Identity questions would be complex
- Clones might face discrimination
- New forms of relationships would emerge

### Legal Challenges
- Citizenship for clones
- Inheritance and property rights
- Criminal responsibility
- Marriage and family law

### Medical Applications
- Organ harvesting from clones
- Treating diseases with cloned cells
- Extending life through cloning
- Research on aging and disease

### Psychological Impact
- Existential questions for clones
- Comparison to the original
- Finding their own identity
- Social acceptance issues

### Practical Concerns
- Cost of cloning technology
- Quality control and health issues
- Resource allocation
- Population management

### Bottom Line
Human cloning would raise profound ethical, legal, and social questions. Society would need to carefully consider the implications before allowing such technology.`
  },
  {
    q: ['what if we could communicate telepathically', 'telepathy scenario', 'what if mind reading was real'],
    a: `## What If Telepathy Was Real?

### Communication Changes
- No need for spoken or written language
- Thoughts would be shared directly
- Misunderstandings would decrease
- Privacy would be completely different

### Social Impact
- Lying would be nearly impossible
- Relationships would be more honest
- Social norms would change dramatically
- Courtship and dating would be different

### Professional Changes
- Meetings would be much shorter
- Negotiations would be transparent
- Education would be more efficient
- Creative collaboration would be easier

### Privacy Concerns
- Thoughts would be vulnerable to others
- Mental privacy would become precious
- New forms of crime (thought theft)
- Security for sensitive information

### Psychological Impact
- No internal monologue
- Thoughts would be shared automatically
- Mental health would be more visible
- Emotional boundaries would be different

### Ethical Questions
- Right to mental privacy
- Consent for reading thoughts
- Thought crimes and morality
- Power dynamics of telepathic ability

### Bottom Line
Telepathy would revolutionize human interaction, making communication more direct but privacy nearly impossible. Society would need new norms and laws to handle the implications.`
  },
  {
    q: ['what if we could travel back in time', 'time travel scenario', 'what if time travel existed'],
    a: `## What If Time Travel Was Possible?

### Paradoxes
- Grandfather Paradox: Could you prevent your own birth?
- Bootstrap Paradox: Information with no origin
- Butterfly Effect: Small changes causing big consequences
- Predestination Paradox: Time travel causing the events

### Historical Impact
- Witnessing historical events firsthand
- Potential to change history
- Tourism to the past
- Learning from past mistakes

### Scientific Implications
- Understanding of physics would change
- New laws of thermodynamics
- Causality and determinism questions
- Energy requirements for travel

### Social Changes
- History would be fluid
- Cultural preservation would be different
- Ancestral tourism would be popular
- Legal questions about changing the past

### Practical Uses
- Preventing disasters
- Rescuing endangered species
- Preserving lost knowledge
- Economic opportunities (predicting markets)

### Challenges
- Paradox prevention mechanisms
- Energy costs of time travel
- Timeline management
- Ethical restrictions on changing history

### Bottom Line
Time travel would fundamentally alter our relationship with history and causality. The potential benefits would be enormous, but the risks of paradoxes and unintended consequences would require extreme caution.`
  },
  {
    q: ['what if education was completely free', 'free education scenario', 'what if college was free for everyone'],
    a: `## What If All Education Was Free?

### Immediate Impact
- No student debt
- Equal access for all socioeconomic backgrounds
- Higher enrollment rates
- More career changes and lifelong learning

### Social Changes
- Reduced inequality of opportunity
- More educated population
- Better social mobility
- Cultural shift toward learning

### Economic Impact
- More skilled workforce
- Innovation would increase
- Higher taxes to fund education
- Reduced income inequality

### Challenges
- Funding would be massive
- Quality control across institutions
- Overcrowding in popular programs
- Some degrees might lose value

### Healthcare Impact
- More doctors and specialists
- Better public health
- Reduced healthcare costs through prevention
- Mental health awareness

### Innovation
- More research and development
- Cross-disciplinary breakthroughs
- Entrepreneurs with better education
- Scientific advancement accelerates

### Cultural Changes
- Lifelong learning becomes normal
- Education valued over credentials
- Knowledge sharing increases
- Critical thinking improves

### Bottom Line
Free education would be transformative for equality and innovation. The main challenge is funding, but the long-term benefits of a more educated society would likely outweigh the costs.`
  },
  {
    q: ['what if there was no electricity', 'no electricity scenario', 'what if power went out permanently'],
    a: `## A World Without Electricity

### Daily Life
- No lights after dark (candles and fire only)
- No refrigeration (food spoils quickly)
- No air conditioning or heating
- No powered appliances

### Communication
- No phones, internet, or TV
- Radio would work only with batteries or hand-crank
- Letters and face-to-face communication
- Community bulletin boards

### Transportation
- Cars would not work (no spark plugs)
- Horses and bicycles would be primary
- Walking for most trips
- Sailboats and rowboats only

### Work
- Most modern jobs would not exist
- Agriculture would be labor-intensive
- Manufacturing would revert to manual methods
- No office work as we know it

### Healthcare
- No modern medical equipment
- Surgeons would operate by candlelight
- No diagnostic machines
- Medicine would be limited

### Entertainment
- Live music and theater
- Board games and card games
- Storytelling and reading
- Outdoor activities

### Social Impact
- Communities would be more self-sufficient
- Nightlife would be minimal
- Sleep schedules would align with daylight
- Stronger local bonds

### Bottom Line
Without electricity, society would revert to pre-industrial times. Life would be harder, slower, and more local, but communities might be stronger and more self-reliant.`
  },
  {
    q: ['what if all borders were open', 'open borders scenario', 'what if there were no countries'],
    a: `## A World Without Borders

### Migration
- People could live anywhere
- Cultural exchange would accelerate
- Population shifts to opportunity
- No illegal immigration

### Economic Impact
- Labor markets would globalize
- Wage equalization across regions
- Economic inequality might decrease
- New economic zones would emerge

### Cultural Changes
- Language mixing would increase
- Cultural blending and fusion
- National identity would weaken
- Global citizenship would emerge

### Political Impact
- Nation-states would become obsolete
- New governance structures needed
- Global democracy might emerge
- Conflict over resources could increase

### Social Changes
- No nationalism or patriotism
- Mixed communities everywhere
- New forms of discrimination might emerge
- Shared global culture

### Challenges
- Who provides social services?
- How to handle crime across regions?
- Resource distribution and management
- Environmental protection across regions

### Benefits
- Freedom of movement for all
- Economic opportunity everywhere
- Cultural exchange and understanding
- Reduced conflict between nations

### Bottom Line
Open borders would create a more connected and equal world but would require new global governance structures to manage resources, services, and conflicts.`
  },
  {
    q: ['what if plants could move', 'mobile plants scenario', 'what if plants had legs'],
    a: `## What If Plants Could Move?

### Plant Behavior
- Plants would seek sunlight actively
- They could escape harmful environments
- Migration to better soil
- Avoiding herbivores

### Ecosystem Changes
- Forests would be mobile
- Plant distribution would be dynamic
- Competition for space would be intense
- Predator-prey relationships would change

### Agriculture
- Crops could move to better soil
- Weeds would be harder to control
- Farmers would need to contain plants
- New farming techniques would emerge

### Daily Life
- Gardens would be mobile
- Parks would shift locations
- Urban green spaces would move
- Allergies would be different

### Challenges
- Property rights for land would be complex
- Buildings would need protection
- Transportation would be affected
- Property values would fluctuate

### Fun Possibilities
- Plant races and competitions
- Mobile shade trees
- Self-arranging gardens
- Plant art and landscaping

### Bottom Line
Mobile plants would fundamentally change ecosystems, agriculture, and daily life. We would need to rethink property, urban planning, and our relationship with the natural world.`
  },
  {
    q: ['what if we could breathe underwater', 'underwater breathing scenario', 'what if humans had gills'],
    a: `## What If Humans Could Breathe Underwater?

### Exploration
- Deep sea exploration would be accessible
- Underwater cities could be built
- Marine life would be studied directly
- New resources would be discoverable

### Daily Life
- Underwater commuting
- Submerged housing
- Underwater sports and recreation
- Fishing and harvesting marine resources

### Economic Impact
- Underwater mining and energy production
- New industries would emerge
- Tourism would expand underwater
- Transportation routes would change

### Physical Changes
- Bodies would need gills or other adaptation
- Pressure tolerance would be needed
- Vision and senses would adapt
- Temperature regulation would change

### Social Changes
- Underwater communities would form
- New cultures and traditions
- Different architecture and infrastructure
- New forms of art and expression

### Challenges
- Pressure and depth limitations
- Communication underwater
- Light and visibility issues
- Predators and dangers

### Benefits
- Access to 71% of Earth's surface
- New food sources
- Reduced surface population pressure
- Unique living experiences

### Bottom Line
Underwater breathing would open up most of the planet for human habitation, creating new opportunities for exploration, industry, and community while presenting unique challenges.`
  },
]

const CREATIVE_PATTERNS = [
  /\b(what would happen|what if|suppose|imagine|hypothetically)\b/i,
  /\b(describe a world|picture a scenario|envision)\b/i,
  /\b(what do you think|what is your opinion|do you believe)\b/i,
  /\b(imagine a scenario|suppose that|pretend)\b/i,
  /\b(pros and cons|advantages and disadvantages|benefits and drawbacks)\b/i,
  /\b(compare|contrast|versus|vs|better than|worse than)\b/i,
  /\b(which is better|which is worse|which do you prefer)\b/i,
  /\b(what are the advantages|what are the disadvantages|what are the benefits)\b/i,
  /\b(debate|argue|discuss|analyze)\b/i,
  /\b(would you rather|would it be better|should we)\b/i,
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
  id: 'creative',
  label: 'Creative and hypothetical questions',
  examples: [
    'what would happen if the sun disappeared',
    'compare cats and dogs',
    'what do you think about social media',
    'pros and cons of working from home',
    'imagine a world without technology',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    const hasPattern = CREATIVE_PATTERNS.some(p => p.test(s))
    if (!hasPattern) return null

    let best = null
    for (const entry of CREATIVE_QA) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.35) return null

    return {
      score: Math.min(0.9, best.score),
      subject: 'Creative Thinking',
      text: best.entry.a,
    }
  },
}
