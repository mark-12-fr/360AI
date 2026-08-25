import { normalise, contentWords, coreQuestion, overlapScore } from '../nlp.js'

const GENERAL_QA = [
  {
    q: ['how to define problems in hackathons', 'define problems hackathon', 'hackathon problem definition', 'how to pick a problem for hackathon'],
    a: `## Defining Problems in Hackathons

### Step 1: Pick a Real Problem
- Talk to real users (even 3-5 people)
- Find a problem YOU personally experience
- Check if existing solutions are bad or missing
- Avoid "cool tech" without real need

### Step 2: Scope It Down
- Ask: "What is the ONE thing this must do?"
- Cut features to MVP (Minimum Viable Product)
- Time-box: "What can we build in 24-48 hours?"
- If you can't explain it in 1 sentence, it's too big

### Step 3: Define Success
- What does "done" look like?
- What is the demo flow?
- What metric proves it works?

### Step 4: Validate Fast
- Can you solve it with paper first?
- Is there a 10x improvement over existing solutions?
- Would someone actually use this?

### Common Hackathon Problem Areas
- **Accessibility**: Making things easier for disabled people
- **Education**: Better learning tools
- **Health**: Wellness tracking, mental health
- **Environment**: Sustainability, waste reduction
- **Productivity**: Saving time on boring tasks
- **Community**: Connecting people locally
- **Philippines-specific**: Traffic, farming, disaster prep`
  },
  {
    q: ['how to start a project', 'start a new project', 'begin a project', 'how do i start building something'],
    a: `## How to Start a Project

### Step 1: Define the Problem
- What problem are you solving?
- Who is it for?
- Why does it matter?

### Step 2: Research
- What solutions exist already?
- What can you learn from them?
- What's missing?

### Step 3: Plan Your MVP
- What is the MINIMUM version?
- What features are essential?
- What can wait?

### Step 4: Choose Your Tech
- What do you already know?
- What's fastest to build with?
- What's scalable?

### Step 5: Start Building
- Set up your environment
- Create a basic structure
- Build one feature at a time
- Test as you go

### Step 6: Ship It
- Don't wait for perfection
- Get feedback early
- Iterate based on users`
  },
  {
    q: ['how to learn programming', 'learn to code', 'how to learn coding', 'beginner programming', 'how to start coding'],
    a: `## How to Learn Programming

### Step 1: Pick ONE Language
- **Python**: Best for beginners, AI, data science
- **JavaScript**: Best for web development, apps
- **Java**: Best for enterprise, Android apps
- Don't learn multiple languages at once

### Step 2: Learn the Basics
- Variables, data types
- If/else statements
- Loops
- Functions
- Arrays/lists

### Step 3: Practice Daily
- 30 minutes minimum
- Type code, don't just read
- Solve small problems
- Build tiny projects

### Step 4: Build Projects
- Calculator
- To-do list
- Simple game
- Personal website
- Weather app

### Step 5: Learn From Others
- Read other people's code
- Join communities (Reddit, Discord)
- Ask questions
- Contribute to open source

### Free Resources
- freeCodeCamp.org
- The Odin Project
- CS50 (Harvard)
- Codecademy
- W3Schools`
  },
  {
    q: ['how to make a resume', 'how to build a resume', 'create a resume', 'resume tips', 'how to write a resume'],
    a: `## How to Make a Resume

### Structure
1. **Contact Info**: Name, email, phone, LinkedIn, GitHub
2. **Summary**: 2-3 sentences about you
3. **Skills**: Technical and soft skills
4. **Experience**: Work history
5. **Projects**: What you've built
6. **Education**: School and degree

### Tips
- Keep it 1 page (2 max for experienced)
- Use action verbs: "Built", "Developed", "Led"
- Quantify results: "Improved speed by 50%"
- Tailor it to each job
- Use clean, simple design
- No spelling errors
- Include links to your work

### For Students/No Experience
- Include class projects
- List relevant coursework
- Show personal projects
- Highlight volunteer work
- Include certifications`
  },
  {
    q: ['how to prepare for interview', 'interview tips', 'how to ace an interview', 'job interview preparation'],
    a: `## How to Prepare for an Interview

### Before the Interview
- Research the company
- Study the job description
- Prepare your stories (STAR method)
- Practice common questions
- Prepare questions to ask

### Common Questions
- Tell me about yourself
- Why this company?
- What are your strengths/weaknesses?
- Tell me about a time you failed
- Where do you see yourself in 5 years?
- Why should we hire you?

### STAR Method
- **Situation**: Set the context
- **Task**: What was your responsibility
- **Action**: What did you do
- **Result**: What happened

### Technical Interview
- Practice coding problems (LeetCode, HackerRank)
- Explain your thought process
- Ask clarifying questions
- Test your solution
- Talk through your approach

### Day of Interview
- Dress professionally
- Arrive 10-15 minutes early
- Bring copies of your resume
- Turn off phone
- Be confident but humble`
  },
  {
    q: ['how to manage time', 'time management tips', 'how to be productive', 'productivity tips', 'how to stop procrastinating'],
    a: `## Time Management & Productivity

### The 2-Minute Rule
If it takes less than 2 minutes, do it now.

### Time Blocking
- Block 2-3 hours for deep work
- Batch similar tasks together
- Leave buffer time between tasks

### Prioritization
- **Urgent + Important**: Do now
- **Important + Not Urgent**: Schedule it
- **Urgent + Not Important**: Delegate
- **Neither**: Eliminate

### Beat Procrastination
- Break tasks into tiny steps
- Start with the hardest task (eat the frog)
- Use timers (Pomodoro: 25 min work, 5 min break)
- Remove distractions (phone, social media)
- Reward yourself after completing tasks

### Daily Habits
- Plan tomorrow tonight
- Review your goals weekly
- Say no to non-essential tasks
- Take breaks to recharge
- Sleep 7-8 hours`
  },
  {
    q: ['how to learn english', 'tips to learn english', 'improve english skills', 'how to become fluent in english'],
    a: `## How to Learn English

### 4 Skills to Practice
1. **Listening**: Podcasts, YouTube, movies
2. **Speaking**: Practice with people, talk to yourself
3. **Reading**: Books, articles, news
4. **Writing**: Journal, social media, essays

### Daily Practice
- 15 minutes listening
- 15 minutes reading
- 10 minutes writing
- 10 minutes speaking

### Best Resources
- **YouTube**: BBC Learning English, English with Lucy
- **Podcasts**: All Ears English, 6 Minute English
- **Apps**: Duolingo, HelloTalk, Tandem
- **Netflix**: Watch with English subtitles
- **Books**: Start with children's books, then young adult

### Tips
- Don't be afraid of mistakes
- Think in English
- Learn phrases, not just words
- Practice every day
- Find a language partner`
  },
  {
    q: ['how to start a business', 'start a small business', 'entrepreneurship tips', 'how to become an entrepreneur'],
    a: `## How to Start a Business

### Step 1: Find Your Idea
- What problem can you solve?
- What are you good at?
- What do people need?

### Step 2: Validate
- Talk to potential customers
- Would they pay for this?
- Who are your competitors?

### Step 3: Plan
- Write a simple business plan
- Define your target market
- Set your pricing
- Calculate costs

### Step 4: Build
- Start with MVP
- Test with real users
- Get feedback
- Iterate

### Step 5: Launch
- Build online presence
- Market on social media
- Network with others
- Start small, grow big

### Philippines Tips
- Register with DTI or SEC
- Get BIR registration
- Start from home to save costs
- Use social media for marketing
- Join startup communities`
  },
  {
    q: ['how to invest money', 'investment tips for beginners', 'how to grow money', 'personal finance tips'],
    a: `## Investment Tips for Beginners

### Golden Rules
1. Pay off debt first
2. Build emergency fund (3-6 months expenses)
3. Only invest money you can afford to lose
4. Start early, time is your friend
5. Diversify (don't put all eggs in one basket)

### Investment Options (Philippines)
- **Banks**: Time deposits, UITF
- **Stocks**: PSE, COL Financial, PhilStocks
- **Mutual Funds**: GCash, BPI
- **Bonds**: Government bonds (RTB)
- **Real Estate**: REITs (low minimum)
- **Crypto**: Risky, only invest what you can lose

### How to Start
1. Open a stock/mutual fund account
2. Start with small amounts (PHP 500-1000/month)
3. Invest consistently (monthly)
4. Don't panic sell when market drops
5. Learn continuously

### Common Mistakes
- Investing without emergency fund
- Putting all money in one stock
- Trying to time the market
- Following hype without research
- Selling when scared`
  },
  {
    q: ['how to make friends', 'how to be more social', 'how to meet new people', 'social skills tips'],
    a: `## How to Make Friends

### Be the Kind of Friend You Want
- Be interested in others
- Listen more than you talk
- Be reliable and trustworthy
- Show up when you say you will

### Where to Meet People
- School or work
- Clubs and organizations
- Sports teams
- Volunteer work
- Online communities
- Classes and workshops

### Start Conversations
- "How are you doing?"
- "What are you working on?"
- "Have you seen/heard...?"
- Compliment something specific
- Ask for their opinion

### Build Relationships
- Follow up after meeting
- Suggest hanging out
- Remember details about them
- Be consistent
- Be vulnerable (share about yourself)

### Tips
- Quality over quantity
- Be yourself
- Don't try too hard
- Give people time
- Join groups around your interests`
  },
  {
    q: ['how to stay healthy', 'health tips', 'how to be fit', 'wellness tips', 'healthy lifestyle'],
    a: `## How to Stay Healthy

### Daily Habits
- Drink 8 glasses of water
- Sleep 7-8 hours
- Eat breakfast
- Move for 30 minutes
- Take breaks from screens

### Nutrition
- Eat more vegetables and fruits
- Limit processed food
- Control portion sizes
- Don't skip meals
- Reduce sugar and salt

### Exercise
- Walking 30 minutes daily
- Stretching in the morning
- Strength training 2-3x/week
- Find activities you enjoy
- Start small, increase gradually

### Mental Health
- Practice gratitude
- Talk about your feelings
- Spend time in nature
- Connect with others
- Take breaks when stressed

### Philippines Tips
- Eat more local vegetables
- Drink buko juice for hydration
- Walk or bike for short trips
- Join community fitness groups
- Limit eating out`
  },
  {
    q: ['how to be confident', 'how to build confidence', 'confidence tips', 'how to overcome fear'],
    a: `## How to Be Confident

### Understand Confidence
- Confidence is a skill, not talent
- It comes from action, not waiting
- Everyone feels insecure sometimes
- Fake it until you make it works

### Build It Step by Step
1. Start with small challenges
2. Celebrate small wins
3. Keep promises to yourself
4. Learn new skills
5. Help others

### Body Language
- Stand up straight
- Make eye contact
- Smile
- Speak clearly
- Take up space

### Mindset
- Stop comparing to others
- Focus on progress, not perfection
- Accept you'll make mistakes
- Talk to yourself positively
- Remember your strengths

### Overcome Fear
- Ask: What's the worst that can happen?
- Do it scared
- Learn from failure
- Remember past successes
- Surround yourself with supportive people`
  },
  {
    q: ['how to write an essay', 'essay writing tips', 'how to write better', 'academic writing tips'],
    a: `## How to Write an Essay

### Structure
1. **Introduction**: Hook + thesis statement
2. **Body**: 3 paragraphs with evidence
3. **Conclusion**: Summary + final thought

### Steps
1. Brainstorm ideas
2. Create an outline
3. Write the first draft
4. Revise and edit
5. Proofread

### Tips
- Start with what you know
- Use clear, simple language
- Support claims with evidence
- Vary sentence length
- Use transitions between paragraphs
- Read aloud to check flow

### Common Mistakes
- Too many adjectives
- Passive voice
- Long, complex sentences
- No clear thesis
- Repeating the same idea`
  },
  {
    q: ['how to deal with stress', 'stress management tips', 'how to relax', 'mental health tips'],
    a: `## How to Deal with Stress

### Quick Relief
- Deep breathing (4-7-8 technique)
- Take a walk
- Listen to music
- Talk to someone
- Write down your feelings

### Long-term Strategies
- Exercise regularly
- Sleep 7-8 hours
- Set boundaries
- Say no to extra commitments
- Make time for hobbies

### 4-7-8 Breathing
1. Breathe in for 4 seconds
2. Hold for 7 seconds
3. Breathe out for 8 seconds
4. Repeat 3-4 times

### Reduce Stressors
- Organize your time
- Break big tasks into small ones
- Ask for help
- Limit news and social media
- Focus on what you can control

### Warning Signs
- Constant worry
- Trouble sleeping
- Irritability
- Fatigue
- Difficulty concentrating
- Seek professional help if needed`
  },
  {
    q: ['how to use git', 'git tutorial', 'git commands', 'how to use github'],
    a: `## How to Use Git

### Basic Commands
\`\`\`bash
git init              # Start new repo
git add .             # Stage all files
git commit -m "msg"   # Commit changes
git push              # Push to remote
git pull              # Pull from remote
git status            # Check status
git log               # View history
\`\`\`

### Branching
\`\`\`bash
git branch            # List branches
git branch dev        # Create branch
git checkout dev      # Switch branch
git checkout -b dev   # Create and switch
git merge dev         # Merge branch
\`\`\`

### Workflow
1. Create a branch for new feature
2. Make changes
3. Stage and commit
4. Push to remote
5. Create pull request
6. Code review
7. Merge to main

### Tips
- Commit often with clear messages
- Never commit directly to main
- Pull before you push
- Use .gitignore for secrets
- Write good commit messages`
  },
  {
    q: ['how to use chatgpt', 'chatgpt tips', 'how to use ai', 'ai tools tips', 'how to use ai tools'],
    a: `## How to Use AI Tools Effectively

### Writing Good Prompts
- Be specific and clear
- Provide context
- Give examples
- State the format you want
- Set constraints

### Prompt Formula
\`\`\`
[Task] + [Context] + [Format] + [Constraints]
\`\`\`

### Example
Bad: "Write about dogs"
Good: "Write a 200-word article about the top 5 dog breeds for families with children, using simple language and including personality traits for each breed"

### Tips
- Iterate on prompts
- Break complex tasks into steps
- Use AI as a starting point, not the end
- Always verify important information
- Be creative with use cases

### Common Uses
- Writing and editing
- Coding and debugging
- Learning new topics
- Brainstorming ideas
- Data analysis
- Translation
- Summarization`
  },
  {
    q: ['how to be a good leader', 'leadership tips', 'how to lead a team', 'leadership skills'],
    a: `## How to Be a Good Leader

### Core Qualities
- Communication
- Empathy
- Decision-making
- Integrity
- Vision

### Lead by Example
- Do what you expect from others
- Be accountable
- Admit mistakes
- Stay humble
- Work hard

### Team Management
- Give clear directions
- Trust your team
- Provide feedback regularly
- Recognize achievements
- Support growth

### Communication
- Listen more than you talk
- Be clear and direct
- Ask for input
- Share the why, not just the what
- Handle conflicts fairly

### Develop Others
- Mentor team members
- Delegate meaningful work
- Create growth opportunities
- Celebrate wins together
- Learn from failures as a team`
  },
  {
    q: ['how to overcome procrastination', 'stop procrastinating', 'how to be disciplined', 'discipline tips'],
    a: `## How to Overcome Procrastination

### Why We Procrastinate
- Fear of failure
- Perfectionism
- Overwhelm
- Lack of motivation
- Unclear goals

### Immediate Action
- Start with 2 minutes (just begin)
- Use Pomodoro technique (25 min work, 5 min break)
- Remove distractions
- Set a timer
- Tell someone your deadline

### Build Habits
- Same time, same place
- Start small, increase gradually
- Track your progress
- Reward yourself
- Be consistent

### Mental Tricks
- "Don't think, just do"
- Focus on starting, not finishing
- Visualize the result
- Think of consequences of not doing
- Remember why it matters

### System Setup
- Break tasks into small steps
- Schedule specific times
- Remove temptations
- Have accountability partner
- Review progress weekly`
  },
  {
    q: ['how to make money online', 'online income ideas', 'ways to earn money online', 'side hustle ideas'],
    a: `## Ways to Make Money Online

### Freelancing
- Writing and editing
- Graphic design
- Web development
- Virtual assistant
- Video editing

### Content Creation
- YouTube (ads, sponsors)
- Blogging (ads, affiliates)
- Social media influencing
- Podcasting
- Online courses

### E-commerce
- Shopee/Lazada selling
- Print on demand
- Dropshipping
- Digital products (templates, courses)
- Handmade goods

### Skills-Based
- Online tutoring
- Consulting
- Translation
- Programming
- Data analysis

### Philippines Tips
- Start with what you know
- Use social media for marketing
- Be patient (takes time to build)
- Provide real value
- Avoid get-rich-quick scams`
  },
  {
    q: ['how to travel cheap', 'budget travel tips', 'how to save money for travel', 'travel tips for students'],
    a: `## Budget Travel Tips

### Save Before Traveling
- Set a travel budget
- Book flights early
- Travel during off-peak
- Use fare alerts
- Be flexible with dates

### Accommodation
- Hostels (cheapest)
- Home stays
- Airbnb
- Couch surfing
- House sitting

### Save on Food
- Eat local street food
- Cook your own meals
- Pack snacks
- Drink tap water (if safe)
- Avoid tourist restaurants

### Transportation
- Walk when possible
- Use public transport
- Share rides
- Rent bikes
- Book overnight buses/trains

### Philippines Budget Travel
- Visit during rainy season (fewer tourists)
- Stay in provincial areas
- Eat at carinderias
- Use Jeepneys and tricycles
- Camp on beaches`
  },

  /* --------------------------------------------------- Philippines */
  {
    q: ['how to apply for philhealth', 'philhealth application', 'how to get philhealth', 'philhealth registration'],
    a: `## How to Apply for PhilHealth

### Who Can Apply
- Employed individuals (employer registers you)
- Self-employed professionals
- Voluntary-paying members
- Senior citizens (subsidized)
- Indigent sponsored by LGU

### Requirements
- Valid government ID
- Birth certificate
- TIN (Tax Identification Number)
- Community Tax Certificate (cedula)

### Steps for Self-Employed/Voluntary
1. Visit nearest PhilHealth branch
2. Fill out Member Registration Form (ER1)
3. Submit requirements
4. Pay premium contribution
5. Receive your PhilHealth number

### How to Pay
- Over-the-counter at accredited banks
- Bayad Center
- GCash or Maya
- Online via PhilHealth portal

### Tips
- Keep your PhilHealth number safe
- Pay premiums on time to avoid penalties
- Check your records annually
- Use PhilHealth for hospitalization benefits`
  },
  {
    q: ['how to get sss', 'sss application', 'how to register sss', 'sss membership'],
    a: `## How to Register with SSS

### Who Can Register
- Employed individuals (employer does this)
- Self-employed individuals
- Voluntary members
- Overseas Filipino Workers (OFW)
- Non-working spouses

### Requirements
- Valid government ID
- Birth certificate or passport
- TIN (Tax Identification Number)
- Community Tax Certificate

### Steps for Self-Employed/Voluntary
1. Visit nearest SSS branch
2. Fill out Form E1 (Personal Record)
3. Submit with valid ID
4. Receive your SSS number
5. Start paying contributions

### How to Pay Contributions
- Online via My.SSS portal
- GCash or Maya
- Bayad Center
- Over-the-counter at banks
- SSS mobile app

### Key Benefits
- Maternity leave benefits
- Sickness and disability benefits
- Retirement pension
- Death benefits
- Salary and housing loans

### Tips
- Pay contributions regularly for higher benefits
- Create a My.SSS online account
- Check your contributions quarterly
- Apply for loans when eligible`
  },
  {
    q: ['how to file taxes Philippines', 'how to file itr', 'tax filing steps', 'how to pay taxes'],
    a: `## How to File Taxes in the Philippines

### Who Needs to File
- Self-employed individuals
- Freelancers earning more than 250,000
- Business owners
- Professionals
- Mixed income earners

### Requirements
- BIR Form 2316 (for employees)
- BIR Form 1701 or 1701A (for self-employed)
- Certificate of Registration (COR)
- Books of accounts
- Official receipts

### Steps for Self-Employed
1. Register with BIR (get TIN)
2. Book your books of accounts
3. Keep all receipts and invoices
4. Compute your income and deductions
5. Fill out the appropriate BIR form
6. File and pay at authorized banks
7. Submit confirmation to BIR

### Deadlines
- April 15: Annual income tax return
- Monthly: VAT and withholding tax returns
- Quarterly: Percentage tax (if not VAT)

### Tips
- Keep all receipts for at least 3 years
- Use BIR eFPS for online filing
- Consult an accountant for complex situations
- Pay on time to avoid penalties`
  },
  {
    q: ['how to register a business Philippines', 'how to start a business Philippines', 'business registration steps'],
    a: `## How to Register a Business in the Philippines

### Step 1: Plan Your Business
- Choose a business name
- Decide on business structure (sole proprietor, partnership, corporation)
- Create a simple business plan

### Step 2: Register with DTI or SEC
- **Sole Proprietor**: Register with DTI (Department of Trade and Industry)
- **Partnership/Corporation**: Register with SEC (Securities and Exchange Commission)

### Step 3: Get Business Permits
- Barangay clearance
- Mayor's permit from your city/municipality
- Fire safety certificate
- Sanitary permit (for food businesses)

### Step 4: Register with BIR
- Get your Tax Identification Number (TIN)
- Register books of accounts
- Get official receipts printed
- Register for VAT if earning over 1,500,000 annually

### Step 5: Open a Business Bank Account
- DTI or SEC certificate
- BIR registration
- Mayor's permit
- Valid IDs of owners

### Estimated Costs
- DTI registration: 200-500
- SEC registration: 2,000-5,000
- Mayor's permit: 5,000-50,000 (depends on business size)
- BIR registration: Free

### Tips
- Start small and register as sole proprietor first
- Use online platforms (eBay, Shopee, Lazada) before registering
- Keep accurate financial records from day one
- Consult with an accountant`
  },
  {
    q: ['how to get passport Philippines', 'passport application', 'how to apply passport', 'passport requirements'],
    a: `## How to Get a Philippine Passport

### Requirements
- PSA birth certificate (original and photocopy)
- Valid government ID (at least one)
- Passport application form (accomplished online)
- Passport fee: 950 (regular), 1,200 (expedited)

### Steps
1. Schedule an appointment online (passport.gov.ph)
2. Choose your preferred DFA branch
3. Print your application form
4. Go to your appointment on time
5. Submit documents and biometrics
6. Wait for your passport (10-15 days regular)

### Processing Time
- Regular: 10-15 working days
- Expedited: 5-7 working days
- Rush processing available for urgent travel

### Tips
- Schedule appointment 2-3 weeks before travel
- Arrive 30 minutes before your schedule
- Bring all original documents
- Check for available slots regularly (they fill up fast)
- Renew passport 6 months before expiration`
  },
  {
    q: ['how to renew drivers license Philippines', 'renewal of drivers license', 'driving license renewal'],
    a: `## How to Renew Your Driver's License in the Philippines

### Requirements
- Current driver's license (even if expired)
- Medical certificate from LTO-accredited clinic
- TIN (Tax Identification Number)
- Valid government ID

### Steps
1. Get a medical examination at an LTO-accredited clinic
2. Go to LTO branch
3. Submit requirements
4. Take the photo and signature
5. Pay renewal fee: 520 (non-professional), 585 (professional)
6. Receive your license (same day)

### Important Notes
- Renewal is every 5 years (under 60 years old)
- Renewal every 3 years (60 years old and above)
- Expired over 2 years requires examination
- Late renewal has additional penalties

### Tips
- Book online appointment (lto.gov.ph)
- Renew before expiration to avoid penalties
- Keep your medical certificate
- Check LTO website for current fees`
  },
  {
    q: ['how to vote Philippines', 'how to register to vote', 'voter registration', 'election guide'],
    a: `## How to Vote in the Philippines

### Step 1: Register to Vote
- Visit your local COMELEC office
- Bring valid ID and birth certificate
- Fill out the Comelec registration form
- Have your biometrics taken
- Receive your voter's ID

### Step 2: Find Your Precinct
- Check Comelec website for precinct assignment
- Go to your assigned polling place on election day
- Bring your voter's ID or any valid ID

### Step 3: Vote on Election Day
- Bring your ID to the precinct
- Sign the voters' list
- Receive your ballot
- Fill out the ballot (shade the circles)
- Feed ballot into the vote counting machine
- Get your voting receipt

### Tips
- Registration is ongoing (but check deadlines)
- Check COMELEC website for schedules
- Research candidates before election day
- Vote early to avoid long lines
- Keep your voting receipt as proof

### Important Dates
- Registration: Usually 6 months before election
- Election Day: Second Monday of May every 3 years
- National Elections: Every 6 years (president and VP)`
  },
  {
    q: ['how to apply Pag-IBIG', 'Pag-IBIG registration', 'how to join Pag-IBIG', 'Pag-IBIG membership'],
    a: `## How to Apply for Pag-IBIG (HDMF)

### Who Can Register
- Employed individuals (employer registers you)
- Self-employed individuals
- Voluntary members
- Overseas Filipino Workers (OFW)
- Non-working spouses

### Requirements
- Valid government ID
- Birth certificate
- TIN (Tax Identification Number)
- 2x2 ID picture

### Steps for Self-Employed/Voluntary
1. Visit nearest Pag-IBIG branch
2. Fill out membership registration form (MR1)
3. Submit requirements
4. Pay your first contribution
5. Receive your Pag-IBIG MID number

### How to Pay Contributions
- Online via Virtual Pag-IBIG
- GCash or Maya
- Bayad Center
- Over-the-counter at banks
- Pag-IBIG mobile app

### Key Benefits
- Housing loan (up to 6 million)
- Multi-purpose loan
- MP2 (Modified Pag-IBIG II) savings
- Calamity fund
- End of service benefit

### Tips
- Pay at least 24 months before applying for housing loan
- Check your MP2 dividends annually
- Use Virtual Pag-IBIG for online transactions
- Keep your MID number safe`
  },
  {
    q: ['how to open bank account Philippines', 'bank account opening', 'how to get a bank account'],
    a: `## How to Open a Bank Account in the Philippines

### Requirements
- Valid government ID (at least 2)
- Proof of billing address
- Initial deposit (varies by bank)
- TIN (Tax Identification Number)

### Steps
1. Choose a bank (BDO, BPI, Metrobank, etc.)
2. Go to your preferred branch
3. Fill out the application form
4. Submit requirements
5. Make initial deposit
6. Receive your ATM card and passbook

### Types of Accounts
- **Savings Account**: Basic account for daily use
- **Time Deposit**: Higher interest, money locked for period
- **Checking Account**: For issuing checks
- **Digital Account**: Open via app, no branch visit needed

### Minimum Deposits
- BDO: 2,000
- BPI: 3,000
- Metrobank: 2,000
- Security Bank: 5,000
- Digital banks: 0-500

### Tips
- Digital banks (Maya, GCash, Tonik) have lower requirements
- Keep your passbook safe
- Set up online banking for convenience
- Monitor your balance regularly
- Use bill payment features to pay bills on time`
  },
  {
    q: ['how to send money Philippines', 'how to remit money', 'money transfer Philippines', 'how to send money abroad'],
    a: `## How to Send Money in the Philippines

### Online Options
- **GCash**: Instant transfer to any GCash user
- **Maya**: Instant transfer to any Maya user
- **InstaPay/PESONet**: Bank-to-bank transfer
- **PayPal**: For international transfers
- **Wise (TransferWise)**: Best for international transfers

### Over-the-Counter
- **Cebuana Lhuillier**: Nationwide remittance center
- **Palawan Pawnshop**: Widely available
- **Western Union**: International transfers
- **MoneyGram**: International transfers
- **Banks**: Direct bank transfers

### Steps for GCash Transfer
1. Open GCash app
2. Tap "Send Money"
3. Choose "Bank Transfer" or "Send to another GCash"
4. Enter recipient details
5. Enter amount
6. Confirm with MPIN

### Fees
- GCash to GCash: Free
- GCash to bank: 15 per transaction
- Bank to bank: 10-50 per transaction
- Western Union: 1-5% of amount

### Tips
- Compare exchange rates for international transfers
- Use online transfers for convenience
- Keep transaction receipts
- Double-check recipient details before sending`
  },
  {
    q: ['how to cook adobo', 'adobo recipe', 'how to make adobo', 'adobo cooking instructions'],
    a: `## How to Cook Chicken Adobo

### Ingredients
- 1 kg chicken (cut into pieces)
- 1/4 cup soy sauce
- 1/4 cup vinegar (cane or white)
- 1 head garlic (crushed)
- 1 tsp whole peppercorns
- 3-4 bay leaves
- 1 cup water
- 2 tbsp cooking oil
- Salt to taste

### Steps
1. Marinate chicken in soy sauce, vinegar, garlic, and bay leaves for 30 minutes
2. Heat oil in a pan
3. Brown the chicken pieces
4. Pour in the marinade and water
5. Add peppercorns and bay leaves
6. Bring to boil, then simmer for 30-40 minutes
7. Adjust seasoning with salt
8. Serve with hot rice

### Tips
- Marinate overnight for deeper flavor
- Let the vinegar boil before stirring to avoid raw vinegar taste
- Add potatoes or hard-boiled eggs for variation
- Serve with pickled papaya (atchara)`
  },
  {
    q: ['how to cook sinigang', 'sinigang recipe', 'how to make sinigang', 'sinigang cooking instructions'],
    a: `## How to Cook Sinigang na Baboy

### Ingredients
- 500g pork belly (or ribs)
- 1 packet sinigang mix (or fresh tamarind)
- 1 tomato (quartered)
- 1 onion (quartered)
- 1 radish (sliced)
- 1 bunch kangkong (water spinach)
- 1 long green pepper
- 2 cups water
- Salt to taste

### Steps
1. Boil water with pork until tender (30-40 minutes)
2. Add tomato and onion
3. Add sinigang mix or mashed tamarind
4. Add radish and cook for 5 minutes
5. Add kangkong and green pepper
6. Simmer for 2 minutes
7. Season with salt
8. Serve hot with rice and fish sauce

### Tips
- Use fresh tamarind for best flavor
- Add other vegetables like eggplant, string beans, or gabi
- Serve immediately to keep vegetables crisp
- Adjust sourness to your taste`
  },
  {
    q: ['how to use GCash', 'GCash tutorial', 'how to send money GCash', 'GCash guide'],
    a: `## How to Use GCash

### Getting Started
1. Download GCash app from App Store or Google Play
2. Register with your mobile number
3. Verify your identity (upload ID and selfie)
4. Cash in at partner outlets

### How to Cash In
- Over-the-counter: 7-Eleven, SM, Robinsons
- Bank transfer: BDO, BPI, Metrobank
- Remittance centers: Cebuana, Palawan
- Cards: Visa or Mastercard

### Key Features
- **Send Money**: Transfer to other GCash users
- **Pay Bills**: Electricity, water, internet, tuition
- **Buy Load**: Mobile load for all networks
- **Scan to Pay**: QR code payments
- **GCash Mastercard**: Withdraw from ATMs

### How to Send Money
1. Tap "Send Money"
2. Enter recipient's mobile number
3. Enter amount
4. Add a note (optional)
5. Confirm with MPIN

### How to Pay Bills
1. Tap "Pay Bills"
2. Choose biller category
3. Enter account number and amount
4. Confirm payment

### Tips
- Keep your MPIN secret
- Enable notifications for transactions
- Check for promos and cashback offers
- Use GCash for government payments too`
  },
  {
    q: ['how to use Maya', 'Maya tutorial', 'Maya wallet guide', 'how to send money Maya'],
    a: `## How to Use Maya (PayMaya)

### Getting Started
1. Download Maya app from App Store or Google Play
2. Register with your mobile number
3. Verify your identity
4. Cash in at partner outlets

### How to Cash In
- Over-the-counter: SM, Robinsons, Bayad Center
- Bank transfer: Any bank via InstaPay
- Cards: Visa or Mastercard
- Other e-wallets: GCash, GrabPay

### Key Features
- **Send Money**: Transfer to other Maya users
- **Pay Bills**: Utilities, credit cards, government
- **Buy Load**: All networks
- **Scan to Pay**: QR code payments
- **Savings**: Maya Savings with interest
- **Cards**: Visa debit card

### How to Send Money
1. Tap "Send Money"
2. Enter recipient's mobile number or bank account
3. Enter amount
4. Confirm with MPIN

### How to Pay Bills
1. Tap "Pay Bills"
2. Choose biller
3. Enter details
4. Confirm payment

### Tips
- Maya Savings has higher interest than traditional banks
- Use Maya for online shopping payments
- Set up auto-debit for bills
- Keep your MPIN secure`
  },
  {
    q: ['how to shop online safely', 'online shopping tips', 'how to avoid scams online', 'safe online shopping guide'],
    a: `## How to Shop Online Safely

### Before Buying
- Check seller ratings and reviews
- Look for secure payment options
- Read product descriptions carefully
- Compare prices across platforms
- Check return and refund policies

### Safe Payment Methods
- Credit cards (better buyer protection)
- GCash or Maya (cashless)
- Cash on delivery (try before paying)
- PayPal (buyer protection)

### Red Flags
- Prices too good to be true
- Seller with no reviews or ratings
- No return policy
- Unsecure website (no HTTPS)
- Only bank transfer payment
- No customer service contact

### After Purchase
- Save order confirmation and receipts
- Track your package
- Inspect item upon delivery
- Report issues immediately
- Leave honest reviews

### Platform Tips
- **Shopee**: Use ShopeePay for cashback
- **Lazada**: Check LazMall for genuine products
- **Facebook Marketplace**: Meet in safe locations
- **Instagram**: Verify seller authenticity

### If Scammed
1. Report to the platform immediately
2. Contact your bank or payment provider
3. File a complaint with DTI
4. Post on social media (companies respond to public complaints)
5. Report to PNP Anti-Cybercrime Group`
  },
  {
    q: ['how to write a research paper', 'research paper format', 'how to write research', 'research paper steps'],
    a: `## How to Write a Research Paper

### Step 1: Choose a Topic
- Pick something you are interested in
- Make sure it is researchable
- Narrow down to a specific question
- Check available sources

### Step 2: Do Research
- Use academic databases (Google Scholar, JSTOR)
- Take notes on key findings
- Record all sources for citation
- Look for peer-reviewed articles

### Step 3: Create an Outline
- Introduction (background and thesis)
- Literature Review (existing research)
- Methodology (how you gathered data)
- Results (your findings)
- Discussion (what results mean)
- Conclusion (summary and implications)

### Step 4: Write the First Draft
- Start with the body (easier than introduction)
- Use clear, formal language
- Cite sources as you write
- Do not worry about perfection

### Step 5: Revise and Edit
- Check for logical flow
- Ensure each paragraph has a clear point
- Fix grammar and spelling
- Verify citations and references
- Read aloud to check clarity

### Formatting Tips
- Follow your required style (APA, MLA, Chicago)
- Use consistent font and spacing
- Include page numbers
- Create a proper bibliography
- Use headings and subheadings`
  },
  {
    q: ['how to study effectively', 'study tips', 'how to study better', 'effective study methods'],
    a: `## How to Study Effectively

### The Pomodoro Technique
- Study for 25 minutes
- Take a 5-minute break
- After 4 sessions, take a 15-30 minute break
- Repeat

### Active Recall
- Close your notes and try to remember
- Use flashcards for testing
- Explain concepts out loud
- Practice with past exams

### Spaced Repetition
- Review material at increasing intervals
- Day 1: Learn new material
- Day 2: Review
- Day 4: Review again
- Day 7: Review again
- Day 14: Final review

### Study Environment
- Quiet, well-lit space
- No distractions (phone on silent)
- Comfortable chair and desk
- Good ventilation
- Study materials organized

### Note-Taking Methods
- Cornell Method: Divide page into cues, notes, summary
- Mind Mapping: Visual diagrams connecting ideas
- Outline Method: Hierarchical bullet points
- Charting Method: Tables comparing information

### Tips
- Study in short, focused sessions
- Get enough sleep before studying
- Stay hydrated and eat well
- Exercise regularly
- Join study groups for discussion
- Teach what you learn to others`
  },
  {
    q: ['how to choose a college course', 'what course to take', 'how to pick a college major', 'college course guide'],
    a: `## How to Choose a College Course

### Step 1: Know Yourself
- What are your interests and hobbies?
- What subjects do you enjoy?
- What are your strengths?
- What kind of work environment do you prefer?

### Step 2: Research Options
- List courses that match your interests
- Research job prospects for each field
- Check curriculum and subjects
- Look at salary ranges

### Step 3: Consider Practical Factors
- Job market demand
- Tuition cost and duration
- Career growth potential
- Location opportunities (local or abroad)

### Popular Courses with Good Prospects
- **STEM**: Engineering, IT, Computer Science
- **Healthcare**: Nursing, Medical Technology, Pharmacy
- **Business**: Accountancy, Business Administration, Marketing
- **Education**: Teaching (high demand)
- **Arts**: Architecture, Graphic Design, Multimedia

### Tips
- Talk to professionals in fields you are considering
- Take career assessment tests
- Consider double major or minor options
- Remember you can shift courses later
- Choose based on passion AND practicality
- Do not let peer pressure decide for you`
  },
  {
    q: ['how to apply for scholarship', 'scholarship application', 'how to get scholarship', 'scholarship tips'],
    a: `## How to Apply for a Scholarship

### Step 1: Find Scholarships
- School guidance office
- Government scholarships (CHED, DOST, TESDA)
- Private company scholarships
- University merit scholarships
- International scholarships (Fulbright, Chevening)

### Step 2: Check Requirements
- Academic records (transcript of records)
- Recommendation letters
- Personal statement or essay
- Income certificate
- Community service records
- Test scores (if required)

### Step 3: Prepare Application
- Write a compelling personal statement
- Get strong recommendation letters
- Prepare all documents early
- Meet all deadlines

### Step 4: Apply
- Fill out application forms completely
- Double-check all requirements
- Submit before the deadline
- Keep copies of everything

### Tips
- Apply to multiple scholarships
- Highlight leadership and community service
- Proofread your essays multiple times
- Practice for interviews
- Follow up on your application
- Be honest in all your submissions

### Philippine Scholarships to Check
- DOST Scholarship
- CHED Scholarship
- TESDA Scholarship
- SM Foundation Scholarship
- Jollibee Foundation Scholarship
- Ayala Foundation Scholarship`
  },
  {
    q: ['how to lose weight', 'weight loss tips', 'how to lose weight fast', 'diet tips'],
    a: `## How to Lose Weight

### The Basics
- Calories in must be less than calories out
- Aim to lose 0.5-1 kg per week (sustainable)
- Do not crash diet (it backfires long term)

### Nutrition
- Eat more vegetables and fruits
- Control portion sizes
- Drink water before meals
- Limit sugary drinks and snacks
- Eat protein with every meal
- Avoid eating late at night

### Exercise
- Cardio: Walking, jogging, cycling (30 min/day)
- Strength training: Build muscle (2-3x/week)
- Stay active throughout the day
- Find activities you enjoy

### Lifestyle
- Sleep 7-8 hours (lack of sleep increases hunger)
- Manage stress (stress eating is real)
- Track your food intake
- Find an accountability partner
- Be patient and consistent

### Common Mistakes
- Skipping meals (leads to overeating later)
- Only doing cardio (miss muscle-building benefits)
- Drinking your calories (soda, juice, alcohol)
- Expecting too fast results
- Giving up after one bad day

### When to See a Doctor
- If you have medical conditions
- If BMI is over 30
- If you have tried and failed multiple times
- If you have eating disorder symptoms`
  },
  {
    q: ['how to gain muscle', 'muscle building tips', 'how to build muscle', 'workout for muscle'],
    a: `## How to Gain Muscle

### Training
- Lift heavy weights (progressive overload)
- Train each muscle group 2x per week
- Focus on compound movements (squat, deadlift, bench press)
- Rest 48-72 hours between training same muscle
- Keep workouts under 60-90 minutes

### Nutrition
- Eat protein: 1.6-2.2g per kg of body weight
- Eat enough calories (slight surplus)
- Carbs fuel your workouts (do not skip them)
- Eat within 1-2 hours after workout
- Spread protein intake throughout the day

### Recovery
- Sleep 7-9 hours per night
- Take rest days (muscles grow during rest)
- Stretch after workouts
- Stay hydrated
- Manage stress

### Sample Workout Plan
- **Monday**: Chest and Triceps
- **Tuesday**: Back and Biceps
- **Wednesday**: Rest or light cardio
- **Thursday**: Legs
- **Friday**: Shoulders and Arms
- **Saturday**: Rest
- **Sunday**: Active recovery (walking, stretching)

### Tips
- Be consistent (results take months, not days)
- Track your workouts and progress
- Take progress photos
- Do not compare yourself to others
- Consider a personal trainer for beginners
- Be patient`
  },
  {
    q: ['how to reduce anxiety', 'anxiety relief', 'how to manage anxiety', 'anxiety tips'],
    a: `## How to Reduce Anxiety

### Immediate Relief
- Deep breathing (4-7-8 technique)
- Grounding technique (5-4-3-2-1 senses)
- Progressive muscle relaxation
- Take a cold shower or splash cold water
- Physical movement (walk, stretch)

### Lifestyle Changes
- Regular exercise (30 min, 5x per week)
- Limit caffeine and alcohol
- Get enough sleep (7-9 hours)
- Eat a balanced diet
- Reduce screen time before bed

### Mindfulness Techniques
- Meditation (start with 5 minutes daily)
- Journaling your thoughts
- Yoga or tai chi
- Practice gratitude
- Stay present (avoid worrying about future)

### Social Support
- Talk to someone you trust
- Join a support group
- Limit isolation
- Set boundaries with toxic people
- Ask for help when needed

### When to See a Professional
- Anxiety interferes with daily life
- Panic attacks occur regularly
- Physical symptoms (racing heart, chest pain)
- You use substances to cope
- You have thoughts of self-harm

### Important Notes
- Anxiety is common and treatable
- Do not be ashamed to seek help
- Medication may help in some cases
- Therapy (CBT) is very effective
- You are not alone`
  },
  {
    q: ['how to improve sleep', 'sleep tips', 'how to sleep better', 'better sleep guide'],
    a: `## How to Improve Your Sleep

### Sleep Hygiene Basics
- Go to bed and wake up at the same time daily
- Keep bedroom cool, dark, and quiet
- Use your bed only for sleep
- Avoid screens 1 hour before bed

### Before Bed Routine
- Take a warm shower or bath
- Read a book (not on screen)
- Do light stretching
- Write in a journal
- Practice deep breathing

### Things to Avoid
- Caffeine after 2 PM
- Heavy meals before bed
- Alcohol close to bedtime
- Intense exercise 2-3 hours before sleep
- Naps longer than 30 minutes

### If You Cannot Sleep
- Do not look at the clock
- Get up and do something boring (read)
- Return to bed when sleepy
- Do not force sleep
- Practice relaxation techniques

### Daily Habits for Better Sleep
- Get sunlight exposure in the morning
- Exercise regularly (not too close to bedtime)
- Manage stress during the day
- Limit caffeine to morning only
- Keep a sleep diary to track patterns

### How Much Sleep Do You Need?
- Adults: 7-9 hours
- Teenagers: 8-10 hours
- Children: 9-12 hours
- Toddlers: 11-14 hours`
  },
  {
    q: ['how to write a cover letter', 'cover letter tips', 'how to write cover letter', 'cover letter format'],
    a: `## How to Write a Cover Letter

### Structure
1. Header: Your contact info and date
2. Greeting: Dear [Hiring Manager]
3. Opening paragraph: Why you are writing
4. Body paragraphs: Your qualifications
5. Closing: Call to action and thank you
6. Signature: Sincerely, [Your Name]

### Opening Paragraph
- State the position you are applying for
- Mention how you found the job
- Hook them with your most relevant achievement

### Body Paragraphs
- Highlight relevant experience
- Show you understand the company
- Provide specific examples of success
- Connect your skills to their needs

### Closing Paragraph
- Express enthusiasm for the role
- Thank them for their time
- Offer to discuss further
- Include your phone number and email

### Tips
- Keep it to one page
- Customize for each job application
- Use keywords from the job description
- Quantify achievements (numbers and percentages)
- Proofread multiple times
- Send as PDF format`
  },
  {
    q: ['how to negotiate salary', 'salary negotiation tips', 'how to ask for raise', 'negotiate pay raise'],
    a: `## How to Negotiate Salary

### Before Negotiating
- Research market rates for your position
- Document your accomplishments
- Know your minimum acceptable salary
- Practice your pitch

### During Negotiation
- Be confident but professional
- State your desired salary with justification
- Use data to support your request
- Be open to other benefits if salary is fixed
- Take your time before accepting

### Key Strategies
- Never give your number first
- Let them make the first offer
- Consider the full package (benefits, vacation, etc.)
- Be willing to walk away
- Get the offer in writing

### If They Say No
- Ask what you need to do to earn a raise
- Request a performance review in 3-6 months
- Negotiate other benefits (remote work, training)
- Consider if the job is still right for you

### Common Mistakes
- Accepting the first offer
- Being apologetic about asking
- Comparing yourself to coworkers
- Making ultimatums
- Focusing on personal needs rather than value

### Tips
- Negotiate before accepting a job offer
- Time it right (after a big win or during review)
- Be prepared to explain your reasoning
- Keep the tone positive and collaborative`
  },
  {
    q: ['how to build a portfolio', 'portfolio tips', 'how to create a portfolio', 'portfolio for jobs'],
    a: `## How to Build a Portfolio

### What to Include
- Your best 5-10 projects
- Brief description of each project
- Your role and contribution
- Technologies used
- Results or impact
- Links to live demos or code

### For Different Fields
- **Design**: Mockups, UI/UX projects, brand identities
- **Development**: GitHub repositories, web apps, code samples
- **Writing**: Published articles, blog posts, copywriting samples
- **Marketing**: Campaign results, social media metrics
- **Photography**: Best photos organized by category

### Building Your Portfolio Website
- Use platforms like GitHub Pages, WordPress, or Wix
- Keep it clean and professional
- Make it mobile-friendly
- Include a contact page
- Update regularly with new work

### Tips
- Quality over quantity
- Show your process, not just final results
- Include personal projects
- Get feedback from peers
- Tailor it to your target job
- Add a personal statement about your goals
- Keep the design simple and easy to navigate`
  },
  {
    q: ['how to start freelancing', 'freelancing tips', 'how to become a freelancer', 'freelancing guide'],
    a: `## How to Start Freelancing

### Step 1: Choose Your Service
- What skills do you have?
- What can you offer?
- What do you enjoy doing?
- What is in demand?

### Step 2: Set Up Your Business
- Register as self-employed (BIR)
- Create a professional email
- Set up payment methods (PayPal, GCash)
- Create profiles on freelancing platforms

### Step 3: Build Your Profile
- Create a compelling bio
- Showcase your best work
- Set competitive rates (start lower, increase with experience)
- Get testimonials from clients

### Step 4: Find Clients
- Online platforms: Upwork, Fiverr, Freelancer
- Social media: LinkedIn, Facebook groups
- Local businesses: Offer your services
- Referrals: Ask satisfied clients

### Step 5: Deliver Great Work
- Communicate clearly
- Meet deadlines
- Overdeliver when possible
- Ask for reviews and referrals
- Build long-term relationships

### Popular Freelancing Skills
- Web development and design
- Content writing and copywriting
- Graphic design
- Virtual assistance
- Social media management
- Video editing
- Translation

### Tips
- Start with smaller projects to build your portfolio
- Set clear boundaries with clients
- Keep learning and upgrading skills
- Save for taxes (set aside 20-30% of income)
- Network with other freelancers`
  },
  {
    q: ['how to deal with breakup', 'breakup advice', 'how to get over ex', 'dealing with heartbreak'],
    a: `## How to Deal with a Breakup

### Allow Yourself to Feel
- It is okay to be sad
- Cry if you need to
- Do not suppress emotions
- Talk to someone you trust
- Write in a journal

### Self-Care
- Eat regular meals
- Get enough sleep
- Exercise regularly
- Avoid excessive alcohol
- Maintain your routine

### Moving Forward
- Remove or hide reminders
- Unfollow or mute your ex on social media
- Do not stalk their profiles
- Delete old messages if needed
- Give away gifts if they hurt to keep

### Rebuilding
- Rediscover your interests
- Spend time with friends and family
- Try new activities
- Set new goals
- Learn from the relationship

### When to Seek Help
- Cannot function normally
- Thoughts of self-harm
- Using substances to cope
- Cannot stop checking on them
- Feeling stuck after months

### Timeline
- Everyone heals differently
- There is no set time to get over someone
- Some days will be harder than others
- Eventually it gets easier
- You will be okay`
  },
  {
    q: ['how to communicate better', 'communication skills', 'how to talk to people', 'effective communication tips'],
    a: `## How to Communicate Better

### Active Listening
- Give full attention
- Do not interrupt
- Ask clarifying questions
- Paraphrase what you heard
- Show empathy

### Speaking Clearly
- Be direct but kind
- Use I statements (I feel, I think)
- Avoid blaming language
- Be specific, not vague
- Match your tone to your message

### Non-Verbal Communication
- Maintain eye contact
- Use open body language
- Smile when appropriate
- Mirror the other person
- Pay attention to gestures

### Written Communication
- Be clear and concise
- Proofread before sending
- Use proper grammar and spelling
- Consider tone (written words lack context)
- Respond promptly

### Difficult Conversations
- Stay calm
- Use facts, not emotions
- Listen to understand, not to respond
- Find common ground
- Be willing to compromise

### Tips
- Practice with low-stakes situations
- Ask for feedback from trusted people
- Read books on communication
- Take a public speaking class
- Be patient with yourself`
  },
  {
    q: ['how to set boundaries', 'setting boundaries tips', 'personal boundaries guide', 'how to say no'],
    a: `## How to Set Boundaries

### Why Boundaries Matter
- Protect your time and energy
- Maintain healthy relationships
- Prevent burnout and resentment
- Define what is acceptable to you

### Types of Boundaries
- **Physical**: Personal space and touch
- **Emotional**: What you share and listen to
- **Time**: How you spend your time
- **Energy**: What you can handle
- **Digital**: Online availability and privacy

### How to Set Boundaries
1. Identify what bothers you
2. Decide what you need
3. Communicate clearly and kindly
4. Be consistent
5. Do not apologize for your boundaries

### Scripts for Common Situations
- "I am not available for that right now."
- "I need some time alone."
- "That does not work for me."
- "I appreciate you thinking of me, but I cannot."
- "I care about you, but I cannot help with that today."

### When Others Push Back
- Stand firm but calm
- Explain your reasoning briefly
- Do not over-explain or justify
- Some people will not respect your boundaries
- That is their problem, not yours

### Tips
- Start with small boundaries
- Practice with close people first
- Be kind but firm
- Expect some resistance
- Review and adjust as needed`
  },
  {
    q: ['how to fix a leaky faucet', 'leaky faucet repair', 'how to stop faucet dripping', 'faucet repair guide'],
    a: `## How to Fix a Leaky Faucet

### Tools Needed
- Adjustable wrench
- Screwdriver (flathead and Phillips)
- Replacement washers or O-rings
- Plumber's tape
- Plumber's grease

### Steps
1. Turn off water supply (under sink)
2. Open faucet to drain remaining water
3. Remove the handle (usually a screw underneath)
4. Remove the packing nut
5. Remove the stem
6. Replace the washer or O-ring
7. Reassemble the faucet
8. Turn water supply back on
9. Test for leaks

### Common Causes
- Worn out washer
- Damaged O-ring
- Corroded valve seat
- Worn out cartridge

### When to Call a Plumber
- If the leak persists after repair
- If the faucet is very old
- If you are not comfortable with repairs
- If the problem is in the pipes

### Tips
- Take photos as you disassemble
- Bring old parts to hardware store for matching
- Use plumber's tape on threads
- Tighten gently (overtightening causes more leaks)`
  },
  {
    q: ['how to unclog a drain', 'drain clog fix', 'how to clear a blocked drain', 'drain cleaning tips'],
    a: `## How to Unclog a Drain

### Method 1: Boiling Water
- Boil a kettle of water
- Pour directly down the drain
- Wait 5-10 minutes
- Repeat if needed

### Method 2: Baking Soda and Vinegar
- Pour 1/2 cup baking soda down drain
- Follow with 1/2 cup vinegar
- Cover drain and wait 15 minutes
- Flush with hot water

### Method 3: Plunger
- Fill sink with a few inches of water
- Place plunger over drain
- Push and pull vigorously for 20-30 seconds
- Repeat if needed

### Method 4: Clean the Trap
- Place bucket under the P-trap
- Loosen the nuts with wrench
- Remove and clean the trap
- Reassemble and test

### Prevention
- Use drain strainers
- Do not pour grease down the drain
- Run hot water after use
- Clean drains monthly
- Avoid putting hair down bathroom drains

### When to Call a Plumber
- Multiple drains are clogged
- Water backs up into other drains
- Foul smell persists
- You cannot clear it yourself
- Signs of a deeper pipe issue`
  },
  {
    q: ['how to paint a wall', 'painting walls guide', 'how to paint a room', 'wall painting steps'],
    a: `## How to Paint a Wall

### Materials Needed
- Paint (latex for walls)
- Primer (if needed)
- Paint roller and tray
- Paintbrushes (for edges)
- Painter's tape
- Drop cloth
- Sandpaper
- Spackle (for holes)

### Steps
1. Prepare the room (move furniture, cover floor)
2. Clean the walls (remove dust and dirt)
3. Fill holes with spackle, let dry, and sand smooth
4. Apply painter's tape to edges and trim
5. Apply primer if changing color significantly
6. Start with cutting in (edges with brush)
7. Roll the main wall areas in W pattern
8. Apply second coat if needed
9. Remove tape while paint is slightly wet
10. Let dry completely before moving furniture back

### Tips
- Buy 10% more paint than you think you need
- Use good quality brushes and rollers
- Work in good lighting
- Paint one wall at a time
- Keep a wet edge (do not let paint dry mid-wall)
- Clean tools immediately after use
- Let each coat dry before applying next`
  },
  {
    q: ['how to organize a closet', 'closet organization tips', 'how to declutter closet', 'closet storage ideas'],
    a: `## How to Organize Your Closet

### Step 1: Declutter
- Take everything out
- Sort into keep, donate, and discard piles
- Ask: Have I worn this in the last year?
- Ask: Does it fit and look good on me?
- Let go of sentimental items you do not use

### Step 2: Organize by Category
- Group similar items together
- Separate casual and formal wear
- Group by season if needed
- Keep work clothes together

### Step 3: Maximize Space
- Use slim hangers (saves 50% space)
- Add shelf dividers
- Use bins for small items
- Install hooks on doors
- Use over-door organizers

### Step 4: Arrange Strategically
- Keep daily wear at eye level
- Store seasonal items higher or lower
- Put shoes on a rack or in boxes
- Fold heavy sweaters (do not hang)
- Use clear bins for accessories

### Maintenance Tips
- Do the one-in-one-out rule
- Reorganize seasonally
- Put things back in their place
- Regularly declutter
- Do not overstuff`
  },
  {
    q: ['how to meal prep', 'meal prep guide', 'how to prep meals', 'meal planning tips'],
    a: `## How to Meal Prep

### Benefits
- Saves time during the week
- Saves money (less eating out)
- Healthier choices
- Reduces food waste
- Less stress about cooking

### Getting Started
- Plan your meals for the week
- Write a shopping list
- Set aside 2-3 hours on a Sunday
- Invest in good containers

### Meal Prep Methods
1. **Batch cooking**: Cook large portions and freeze
2. **Pre-cut ingredients**: Wash and chop vegetables
3. **Component prep**: Prepare ingredients separately
4. **Ready-to-eat meals**: Full meals ready to heat

### What to Prep
- Rice and grains
- Proteins (chicken, beef, tofu)
- Roasted vegetables
- Washed and cut fruits
- Portioned snacks
- Sauces and dressings

### Storage Tips
- Use airtight containers
- Label with date and contents
- Refrigerate meals for 3-4 days
- Freeze meals for up to 3 months
- Let food cool before storing

### Easy Meal Prep Ideas
- Overnight oats for breakfast
- Mason jar salads
- Stir-fry components
- Soups and stews
- Burrito bowls
- Pasta with sauce

### Tips
- Start with simple recipes
- Invest in quality containers
- Prep what you will actually eat
- Keep it varied to avoid boredom`
  },
  {
    q: ['how to grow Instagram', 'Instagram growth tips', 'how to get more followers', 'Instagram marketing'],
    a: `## How to Grow Your Instagram

### Content Strategy
- Post consistently (3-5 times per week)
- Focus on a specific niche
- Create high-quality content
- Use Reels (they get more reach)
- Share valuable and educational content

### Hashtag Strategy
- Use 5-15 relevant hashtags
- Mix popular and niche hashtags
- Research hashtags in your field
- Create a branded hashtag
- Put hashtags in first comment

### Engagement Strategy
- Reply to all comments
- Engage with accounts in your niche
- Like and comment on related posts
- Use Stories to interact (polls, questions)
- Collaborate with other creators

### Profile Optimization
- Clear profile picture
- Compelling bio with keywords
- Link to your website or link tree
- Highlight your best Stories
- Use a consistent visual theme

### Analytics
- Track which posts perform best
- Note best posting times
- Monitor follower growth
- Adjust strategy based on data
- Focus on what works

### Tips
- Be authentic and genuine
- Quality over quantity
- Build community, not just followers
- Stay patient (growth takes time)
- Avoid buying followers`
  },
  {
    q: ['how to make YouTube videos', 'YouTube content creation', 'how to start YouTube channel', 'YouTube tips for beginners'],
    a: `## How to Make YouTube Videos

### Getting Started
- Choose your niche
- Create a YouTube channel
- Plan your first 10 videos
- Start with what you have (phone is fine)

### Equipment (Start Simple)
- Smartphone (good enough for starting)
- Tripod or phone stand
- Microphone (audio is more important than video)
- Natural lighting or ring light
- Free editing software (DaVinci Resolve, iMovie)

### Video Structure
1. Hook: Grab attention in first 5 seconds
2. Intro: Brief channel introduction
3. Content: Deliver on the video title
4. Call to action: Ask to like and subscribe
5. End screen: Link to other videos

### SEO for YouTube
- Keyword research (TubeBuddy, VidIQ)
- Compelling titles with keywords
- Detailed descriptions (200+ words)
- Relevant tags
- Custom thumbnails
- Closed captions

### Tips
- Consistency is more important than perfection
- Focus on providing value
- Engage with your audience in comments
- Study successful creators in your niche
- Be patient (growth takes time)
- Enjoy the process`
  },
  {
    q: ['how to create TikTok content', 'TikTok tips', 'how to go viral on TikTok', 'TikTok content ideas'],
    a: `## How to Create TikTok Content

### Content Ideas
- Trending sounds and challenges
- Educational tips and tutorials
- Behind-the-scenes content
- Day-in-the-life videos
- Before and after transformations
- Storytelling (personal experiences)
- Product reviews
- Comedy and skits

### Tips for Better Videos
- Hook viewers in the first 1-2 seconds
- Keep videos short (15-60 seconds)
- Use trending sounds
- Add text overlays
- Use good lighting
- Film vertically

### Growth Strategies
- Post 1-3 times daily
- Use relevant hashtags (3-5)
- Engage with comments
- Duet and stitch with others
- Follow trends early
- Be authentic

### Technical Tips
- Clean your camera lens
- Use natural lighting
- Stabilize your phone
- Keep background clean
- Edit with CapCut or InShot
- Add captions for accessibility

### Monetization
- TikTok Creator Fund
- Brand partnerships
- Affiliate marketing
- Selling your own products
- Live gifts
- Cross-promote on other platforms

### Common Mistakes
- Poor video quality
- Ignoring trends
- Not engaging with audience
- Inconsistent posting
- Being inauthentic`
  },
  {
    q: ['how to build personal brand online', 'personal branding tips', 'how to brand yourself', 'online presence guide'],
    a: `## How to Build Your Personal Brand

### Step 1: Define Your Brand
- What are you known for?
- What value do you provide?
- Who is your target audience?
- What makes you different?

### Step 2: Create Your Presence
- Professional profile picture
- Consistent username across platforms
- Compelling bio
- Portfolio or website
- Content that reflects your expertise

### Step 3: Create Content
- Share your knowledge
- Tell your story
- Be consistent
- Add value to your audience
- Be authentic

### Step 4: Build Relationships
- Engage with your community
- Collaborate with others
- Respond to comments and messages
- Network with industry professionals
- Help others without expecting anything

### Step 5: Monitor and Adjust
- Google yourself regularly
- Track what content resonates
- Adjust your strategy
- Stay current with trends
- Keep learning and growing

### Platforms to Focus On
- LinkedIn: Professional networking
- Twitter/X: Thought leadership
- Instagram: Visual content
- YouTube: Long-form video
- TikTok: Short-form video
- Personal website: Portfolio

### Tips
- Be patient (branding takes time)
- Be consistent in messaging
- Share your authentic self
- Provide value before asking for anything
- Keep learning and evolving`
  },
  {
    q: ['how to plan a trip', 'trip planning guide', 'how to plan vacation', 'travel planning steps'],
    a: `## How to Plan a Trip

### Step 1: Choose Destination
- Where do you want to go?
- What is your budget?
- When do you want to travel?
- How long can you go?

### Step 2: Set Budget
- Transportation
- Accommodation
- Food
- Activities
- Emergency fund

### Step 3: Book Transportation
- Compare flight prices (Google Flights, Skyscanner)
- Consider alternative airports
- Book trains or buses if cheaper
- Arrange airport transfers

### Step 4: Book Accommodation
- Compare on Booking.com, Agoda, Airbnb
- Consider location and safety
- Read recent reviews
- Check amenities (WiFi, breakfast)

### Step 5: Plan Activities
- Research top attractions
- Book popular tours in advance
- Leave time for spontaneous exploration
- Check opening hours and holidays

### Step 6: Prepare Documents
- Passport validity (6+ months)
- Visa requirements
- Travel insurance
- Vaccination records
- Copies of all bookings

### Tips
- Book early for better prices
- Be flexible with dates
- Download offline maps
- Learn basic local phrases
- Notify your bank of travel
- Pack light`
  },
  {
    q: ['how to travel solo', 'solo travel tips', 'solo travel guide', 'traveling alone tips'],
    a: `## How to Travel Solo

### Benefits
- Complete freedom and flexibility
- Meet new people more easily
- Build confidence
- Do what you want, when you want
- Self-discovery and independence

### Safety Tips
- Research your destination thoroughly
- Share your itinerary with someone
- Keep copies of important documents
- Trust your instincts
- Stay in well-reviewed accommodations
- Avoid walking alone at night in unfamiliar areas

### Making Friends
- Stay in hostels (social atmosphere)
- Join walking tours
- Use Meetup or Couchsurfing
- Eat at local restaurants
- Take group tours
- Chat with locals

### Practical Tips
- Start with easier destinations
- Learn basic local phrases
- Keep a flexible schedule
- Bring a book or journal
- Take yourself on dates
- Document your journey

### Dealing with Loneliness
- It is normal to feel lonely sometimes
- Call friends and family
- Journal your thoughts
- Engage with locals and other travelers
- Join group activities
- Embrace the solitude

### Best Solo Travel Destinations
- Japan (safe, efficient, interesting)
- Thailand (affordable, friendly)
- Portugal (safe, beautiful, affordable)
- New Zealand (safe, adventure-friendly)
- Iceland (safe, stunning nature)

### Tips
- Start small (weekend trips)
- Trust yourself
- Be open to new experiences
- Do not compare your trip to others`
  },
  {
    q: ['how to pack for travel', 'packing tips', 'what to pack for trip', 'travel packing guide'],
    a: `## How to Pack for Travel

### Packing Basics
- Make a packing list
- Choose a color palette (mix and match)
- Roll clothes to save space
- Use packing cubes
- Wear your heaviest items on the plane

### Essential Items
- Passport and documents
- Phone and charger
- Medications
- Toiletries (travel size)
- Change of clothes in carry-on
- Snacks
- Entertainment

### Clothing Strategy
- Pack versatile pieces
- Choose wrinkle-resistant fabrics
- Layer for different weather
- Bring a lightweight jacket
- Comfortable walking shoes

### Toiletries
- Use travel-size containers
- Solid shampoo and soap bars
- Reusable toiletry bottles
- Consider what is available at destination

### Electronics
- Phone and charger
- Power bank
- Universal adapter
- Headphones
- Camera (if needed)

### Packing Mistakes to Avoid
- Overpacking
- Forgetting chargers
- Not checking weather
- Packing too many shoes
- Not leaving room for souvenirs

### Pro Tips
- Weigh your bag before leaving
- Keep valuables in carry-on
- Take photos of your packed bag
- Leave non-essentials behind
- Pack one outfit less than you think you need`
  },
  {
    q: ['how to find cheap flights', 'cheap flight tips', 'how to get flight deals', 'flight booking tips'],
    a: `## How to Find Cheap Flights

### Best Booking Tools
- Google Flights (price tracking)
- Skyscanner (compare all airlines)
- Momondo (budget airline deals)
- Kayak (price alerts)
- Hopper (price predictions)

### When to Book
- Domestic: 1-3 months in advance
- International: 2-8 months in advance
- Best days to book: Tuesday and Wednesday
- Best days to fly: Tuesday, Wednesday, Saturday

### Tips for Finding Deals
- Be flexible with dates
- Consider nearby airports
- Use incognito mode when searching
- Set price alerts
- Follow airline social media for flash sales
- Book connecting flights (sometimes cheaper)

### Budget Airlines
- AirAsia
- Cebu Pacific
- Scoot
- Jetstar
- Spirit Airlines
- Frontier Airlines

### Additional Savings
- Use credit card points or miles
- Book one-way tickets (sometimes cheaper)
- Avoid checked baggage
- Pack carry-on only
- Use airline partnerships

### Important Notes
- Read the fine print (fees, restrictions)
- Check baggage allowances
- Know cancellation policies
- Verify transit visa requirements
- Factor in airport transfers`
  },
  {
    q: ['how to stay safe while traveling', 'travel safety tips', 'how to be safe traveling', 'travel security guide'],
    a: `## How to Stay Safe While Traveling

### Before You Go
- Research your destination
- Register with your embassy
- Get travel insurance
- Share itinerary with family
- Make copies of important documents

### At the Airport
- Keep valuables in carry-on
- Never leave bags unattended
- Keep documents accessible
- Be aware of your surroundings

### Accommodation Safety
- Choose well-reviewed places
- Check fire exits
- Use hotel safes
- Lock your door
- Know emergency procedures

### Personal Safety
- Be aware of your surroundings
- Avoid displaying valuables
- Use money belt or hidden pouch
- Keep phone charged
- Share your location with someone

### Transportation Safety
- Use official taxis or ride-sharing
- Avoid traveling alone at night
- Sit near the driver
- Keep belongings close
- Trust your instincts

### Health Safety
- Drink bottled water
- Eat at clean establishments
- Carry basic medications
- Know local emergency numbers
- Get necessary vaccinations

### If Something Goes Wrong
- Stay calm
- Contact your embassy
- Reach out to local police
- Use emergency contacts
- Contact your bank if cards are stolen`
  },

  /* ----------------------------------------------- More General Q&A */
  {
    q: ['how to deal with toxic people', 'toxic people tips', 'how to handle toxic person', 'dealing with toxic relationships'],
    a: `## How to Deal with Toxic People

### Recognize Toxic Behavior
- Constant criticism and negativity
- Manipulation and guilt-tripping
- Lack of respect for boundaries
- Drama and chaos creation
- Never taking responsibility

### Strategies
- Set clear boundaries and enforce them
- Do not take their behavior personally
- Limit contact when possible
- Do not engage in arguments
- Stay calm and do not react emotionally

### Protect Yourself
- Keep conversations surface-level
- Do not share personal information
- Document interactions if needed
- Build a support network
- Remember you cannot change them

### When to Cut Ties
- They consistently disrespect your boundaries
- The relationship affects your mental health
- They refuse to acknowledge problems
- You feel drained after every interaction
- There is abuse of any kind`
  },
  {
    q: ['how to give constructive feedback', 'feedback tips', 'how to give feedback', 'constructive criticism guide'],
    a: `## How to Give Constructive Feedback

### The SBI Model
- **Situation**: Describe the specific situation
- **Behavior**: State the observed behavior
- **Impact**: Explain the impact of the behavior

### Do
- Be specific, not general
- Focus on behavior, not personality
- Offer suggestions for improvement
- Time it appropriately
- Balance positive and areas to improve

### Do Not
- Use "you always" or "you never"
- Make it personal
- Give vague feedback
- Wait too long to give feedback
- Give feedback when angry

### Example
Bad: "You are always late."
Good: "In yesterday's meeting, you arrived 15 minutes late. The team had to wait, which affected our schedule. Can we work on being on time?"

### Tips
- Ask if they are open to feedback first
- Be empathetic and respectful
- Listen to their perspective
- Follow up on progress`
  },
  {
    q: ['how to make decision', 'decision making tips', 'how to decide', 'decision making framework'],
    a: `## How to Make Better Decisions

### Step 1: Define the Decision
- What exactly are you deciding?
- What is the timeline?
- What are the constraints?

### Step 2: Gather Information
- What do you know?
- What do you need to find out?
- Who can help you?

### Step 3: Consider Options
- List all possible options
- Pros and cons of each
- What are the consequences?
- What is the worst case scenario?

### Step 4: Make the Decision
- Trust your instincts
- Consider your values
- Think long-term
- Accept that no decision is perfect

### Step 5: Act and Review
- Commit to your decision
- Take action
- Review the results
- Learn from the outcome

### Decision-Making Frameworks
- Pro/Con List: Simple but effective
- 10/10/10 Rule: How will you feel in 10 minutes, 10 months, 10 years?
- Reversibility: Is this decision reversible? If yes, decide faster.
- Regret Minimization: Which choice will you regret less?`
  },
  {
    q: ['how to handle failure', 'dealing with failure tips', 'how to bounce back from failure', 'failure and success'],
    a: `## How to Handle Failure

### Reframe Failure
- Failure is feedback, not final
- Every successful person has failed many times
- Failure shows you are trying
- It is a learning opportunity

### After Failure
1. Allow yourself to feel disappointed
2. Analyze what went wrong
3. Identify what you can control
4. Extract lessons learned
5. Create a new plan

### Mindset Shift
- "I failed" vs "I am a failure" are different things
- Focus on effort, not just results
- Progress is not linear
- Setbacks are temporary

### Build Resilience
- Practice self-compassion
- Talk to supportive people
- Maintain perspective
- Keep taking action
- Celebrate small wins

### Famous Failures
- J.K. Rowling: Rejected 12 times before Harry Potter
- Michael Jordan: Cut from high school basketball team
- Walt Disney: Fired for "lacking imagination"
- Steve Jobs: Fired from his own company
- Oprah Winfrey: Fired from her first TV job`
  },
  {
    q: ['how to be more creative', 'creativity tips', 'how to boost creativity', 'creative thinking tips'],
    a: `## How to Be More Creative

### Daily Habits
- Journal every morning (write 3 pages)
- Take walks without headphones
- Try new things regularly
- Read widely and diversely
- Allow yourself to daydream

### Techniques
- Brainstorming: Write 20 ideas daily (quantity over quality)
- SCAMPER: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse
- Mind Mapping: Visual brainstorming around a central idea
- Random Input: Pick a random word and connect it to your problem
- Reversal: Ask the opposite question

### Environment
- Change your surroundings
- Listen to different music
- Surround yourself with creative people
- Reduce stress and pressure
- Allow boredom (creativity needs empty space)

### Overcome Blocks
- Start with small, easy tasks
- Do not judge your work while creating
- Take breaks when stuck
- Collaborate with others
- Set constraints to spark creativity`
  },
  {
    q: ['how to learn a new skill fast', 'learn new skill quickly', 'skill learning tips', 'how to acquire new skills'],
    a: `## How to Learn a New Skill Fast

### The 80/20 Rule
- Focus on the 20% that gives 80% of results
- Identify the most important sub-skills
- Learn what experts actually use

### Learning Framework
1. Deconstruct: Break the skill into small parts
2. Learn enough to self-correct: Know what good looks like
3. Remove barriers: Distractions, fear, overwhelm
4. Practice 20 hours: Commit to minimum practice
5. Get feedback: Find a coach or mentor

### Tips
- Practice deliberately, not mindlessly
- Focus on one skill at a time
- Use spaced repetition
- Teach what you learn
- Find a community of practitioners
- Track your progress`
  },
  {
    q: ['how to deal with rejection', 'handling rejection tips', 'how to cope with rejection', 'rejection advice'],
    a: `## How to Deal with Rejection

### Understand Rejection
- Rejection is part of life
- It is not always personal
- Sometimes timing or fit is wrong
- It redirects you to better opportunities

### Immediate Coping
- Allow yourself to feel hurt
- Talk to someone you trust
- Do not isolate yourself
- Practice self-care
- Do not make impulsive decisions

### Long-term Strategies
- Build self-worth independent of approval
- Learn from the experience
- Keep trying (persistence matters)
- Diversify your opportunities
- Focus on what you can control

### Reframe Rejection
- "Not yet" instead of "no"
- "Not the right fit" instead of "not good enough"
- "One step closer to yes"
- "This freed me up for something better"`
  },
  {
    q: ['how to manage money as student', 'student money management', 'student budget tips', 'money tips for students'],
    a: `## How to Manage Money as a Student

### Create a Simple Budget
- List your income (allowance, part-time job)
- List fixed expenses (transport, food, supplies)
- Set a weekly spending limit
- Track every peso you spend

### Save Money
- Use student discounts everywhere
- Buy second-hand textbooks
- Cook instead of eating out
- Use public transport
- Share costs with classmates

### Avoid Debt
- Do not use credit cards unless necessary
- If you borrow, have a repayment plan
- Avoid unnecessary subscriptions
- Distinguish needs from wants

### Build Good Habits
- Save at least 10% of any money you receive
- Set financial goals
- Review spending weekly
- Use free apps to track expenses
- Avoid impulse purchases (24-hour rule)

### Income Ideas
- Part-time tutoring
- Freelancing (writing, design, coding)
- Online selling
- Campus jobs
- Paid surveys and tasks`
  },
  {
    q: ['how to prepare for exams', 'exam preparation tips', 'how to study for exams', 'exam study guide'],
    a: `## How to Prepare for Exams

### Start Early
- Begin reviewing 2-3 weeks before the exam
- Break material into daily study sessions
- Do not cram the night before

### Study Strategies
- Active Recall: Test yourself without looking at notes
- Past Exams: Practice with previous exams
- Flashcards: Use Anki or handwritten cards
- Teach Someone: Explain concepts out loud
- Summary Notes: Condense notes into key points

### Day Before Exam
- Review summary notes
- Prepare materials (pens, calculator, ID)
- Get a full night of sleep
- Avoid studying new material
- Relax and stay calm

### During Exam
- Read all instructions first
- Answer easy questions first
- Manage your time
- Review answers if time permits
- Stay calm and focused

### Tips
- Sleep 7-8 hours before the exam
- Eat a healthy breakfast
- Arrive early
- Stay hydrated
- Take deep breaths if anxious`
  },
  {
    q: ['how to build healthy habits', 'habit building tips', 'how to form good habits', 'habit formation guide'],
    a: `## How to Build Healthy Habits

### The Habit Loop
1. Cue: Trigger that starts the habit
2. Routine: The behavior itself
3. Reward: The benefit you get from it

### Steps to Build a Habit
1. Start incredibly small (2 minutes or less)
2. Attach it to an existing habit (habit stacking)
3. Design your environment for success
4. Track your progress
5. Celebrate small wins

### Tips
- One habit at a time
- Same time, same place every day
- Never miss twice in a row
- Focus on identity, not outcomes
- Make it obvious, attractive, easy, satisfying

### Break Bad Habits
- Identify your triggers
- Replace the habit with a better one
- Change your environment
- Make it harder to do the bad habit
- Get accountability`
  },
  {
    q: ['how to negotiate in business', 'business negotiation tips', 'negotiation strategies', 'how to negotiate a deal'],
    a: `## How to Negotiate in Business

### Preparation
- Research the other party
- Know your bottom line
- Prepare alternatives (BATNA)
- Set your ideal outcome
- Anticipate their needs

### During Negotiation
- Listen more than you talk
- Ask open-ended questions
- Find common ground
- Be willing to walk away
- Focus on win-win outcomes

### Key Techniques
- Anchoring: Make the first offer
- Silence: Pause after making a point
- Chunking: Break large numbers into smaller parts
- Nibbling: Ask for small extras at the end
- Flinching: React visibly to extreme offers

### Tips
- Build rapport first
- Separate people from the problem
- Focus on interests, not positions
- Use objective criteria
- Get agreements in writing`
  },
  {
    q: ['how to create a startup', 'startup guide', 'how to launch a startup', 'startup tips'],
    a: `## How to Create a Startup

### Step 1: Find a Problem Worth Solving
- Talk to potential customers
- Identify a painful, frequent problem
- Validate that people will pay for a solution
- Check the market size

### Step 2: Build an MVP
- Create the simplest version that solves the problem
- Launch fast, learn fast
- Use no-code tools if possible
- Focus on core features only

### Step 3: Get Users
- Start with manual outreach
- Use social media and content
- Offer it free to first users
- Get feedback and iterate

### Step 4: Monetize
- Choose a pricing model
- Test different price points
- Offer value before charging
- Focus on recurring revenue

### Step 5: Scale
- Hire carefully
- Build systems and processes
- Raise funding if needed
- Expand to new markets

### Common Mistakes
- Building in isolation
- Focusing on product, not distribution
- Running out of cash
- Co-founder conflicts
- Scaling too fast`
  },
  {
    q: ['how to give a presentation', 'presentation tips', 'how to present well', 'public speaking tips'],
    a: `## How to Give a Great Presentation

### Preparation
- Know your audience
- Structure: Hook, Content, Call to action
- Rehearse multiple times
- Prepare for questions

### Slides Tips
- One idea per slide
- Use visuals over text
- Large, readable fonts
- Minimal text (6 words per line max)
- Consistent design

### Delivery
- Make eye contact
- Speak slowly and clearly
- Use gestures
- Move around naturally
- Show enthusiasm

### Handle Nerves
- Practice deep breathing
- Arrive early to test equipment
- Start with something you are confident about
- Remember the audience wants you to succeed
- Accept that some nervousness is normal

### Tips
- Tell stories to connect
- Pause for emphasis
- Ask the audience questions
- End with a clear call to action
- Practice in front of a mirror or record yourself`
  },
  {
    q: ['how to learn from mistakes', 'learning from mistakes tips', 'how to turn mistakes into lessons', 'mistake learning guide'],
    a: `## How to Learn from Mistakes

### Step 1: Acknowledge the Mistake
- Admit it happened
- Do not make excuses
- Take responsibility

### Step 2: Analyze What Happened
- What went wrong?
- What was your role?
- What factors were beyond your control?
- What would you do differently?

### Step 3: Extract the Lesson
- What did you learn?
- How can you prevent this in the future?
- What skills do you need to develop?

### Step 4: Apply the Lesson
- Change your behavior
- Share what you learned with others
- Create systems to prevent repeat mistakes

### Mindset
- Mistakes are data, not failures
- Every expert was once a beginner
- The only real mistake is not learning from it
- Be kind to yourself in the process`
  },
  {
    q: ['how to build trust', 'trust building tips', 'how to earn trust', 'building trust in relationships'],
    a: `## How to Build Trust

### Key Principles
- Be consistent (do what you say)
- Be honest (even when it is hard)
- Be reliable (show up when you say you will)
- Be vulnerable (share your true self)
- Be respectful (honor boundaries)

### In Relationships
- Listen without judging
- Keep confidences
- Apologize when wrong
- Support without conditions
- Give people the benefit of the doubt

### In Teams
- Follow through on commitments
- Communicate openly
- Admit mistakes quickly
- Give credit to others
- Ask for feedback

### Rebuilding Broken Trust
- Acknowledge what happened
- Take full responsibility
- Be patient (it takes time)
- Show change through actions, not words
- Accept that some trust may never return`
  },
  {
    q: ['how to handle criticism', 'dealing with criticism tips', 'how to accept criticism', 'handling negative feedback'],
    a: `## How to Handle Criticism

### Pause Before Reacting
- Do not respond immediately
- Take a deep breath
- Ask yourself: Is this true?

### Separate the Message from the Delivery
- Even rude feedback may contain useful truth
- Focus on the content, not the tone
- Extract what is useful, discard the rest

### Ask Clarifying Questions
- "Can you give me a specific example?"
- "What would you suggest I do differently?"
- "What would good look like to you?"

### When Criticism is Unfair
- Stay calm and professional
- Do not take it personally
- Consider the source
- Address it if it affects your work
- Let it go if it is just negativity

### Use Criticism to Grow
- Keep a feedback journal
- Look for patterns in criticism
- Set improvement goals
- Thank people for honest feedback`
  },
  {
    q: ['how to make a plan', 'planning tips', 'how to plan effectively', 'goal planning guide'],
    a: `## How to Make a Plan

### Step 1: Define Your Goal
- What exactly do you want to achieve?
- Why does it matter?
- When do you want to achieve it?

### Step 2: Break It Down
- Divide the goal into milestones
- Create actionable steps for each milestone
- Prioritize the steps
- Assign deadlines

### Step 3: Identify Resources
- What skills do you need?
- Who can help you?
- What tools or materials do you need?
- What is your budget?

### Step 4: Anticipate Obstacles
- What could go wrong?
- What is your backup plan?
- What habits or beliefs might hold you back?

### Step 5: Review and Adjust
- Check progress weekly
- Adjust the plan as needed
- Celebrate milestones
- Learn from setbacks`
  },
  {
    q: ['how to improve memory', 'memory improvement tips', 'how to remember things better', 'memory techniques'],
    a: `## How to Improve Memory

### Lifestyle Changes
- Sleep 7-9 hours (memory consolidates during sleep)
- Exercise regularly (increases blood flow to brain)
- Eat brain-healthy foods (fish, nuts, blueberries)
- Stay hydrated
- Manage stress

### Memory Techniques
- Spaced Repetition: Review at increasing intervals
- Active Recall: Test yourself instead of re-reading
- Memory Palace: Associate info with locations
- Chunking: Break info into smaller groups
- Acronyms: Create words from first letters

### Daily Practices
- Learn something new every day
- Do puzzles and brain games
- Read regularly
- Write things down
- Teach what you learn

### Tips
- Pay attention (focus is the first step to memory)
- Connect new info to what you already know
- Use all senses (see, hear, do)
- Repeat and practice
- Stay socially active`
  },
  {
    q: ['how to change career', 'career change tips', 'how to switch careers', 'career transition guide'],
    a: `## How to Change Careers

### Step 1: Self-Assessment
- What are your transferable skills?
- What are you passionate about?
- What are your non-negotiables (salary, schedule, location)?
- What kind of work environment do you thrive in?

### Step 2: Explore Options
- Research industries that match your skills
- Talk to people in those fields
- Try side projects or volunteering
- Take online courses to test interest

### Step 3: Bridge the Gap
- Identify skill gaps
- Take courses or certifications
- Build a portfolio of relevant work
- Network in your target industry

### Step 4: Make the Move
- Update your resume for the new field
- Highlight transferable skills
- Start applying or freelancing
- Consider a gradual transition
- Build financial cushion (3-6 months expenses)

### Tips
- Do not quit your job before securing the next one
- Leverage your existing network
- Be open to starting at a lower level
- Tell your story (why you are switching)
- Stay persistent (career changes take time)`
  },
  {
    q: ['how to be a better listener', 'active listening tips', 'listening skills guide', 'how to listen effectively'],
    a: `## How to Be a Better Listener

### Active Listening Techniques
- Give full attention (put phone away)
- Maintain eye contact
- Do not interrupt
- Nod and use verbal affirmations ("I see", "right")
- Paraphrase what you heard

### Show You Are Listening
- Ask follow-up questions
- Reflect their emotions ("That sounds frustrating")
- Summarize their main points
- Do not immediately give advice
- Be comfortable with silence

### Common Barriers
- Planning your response while they talk
- Being distracted by your phone
- Jumping to conclusions
- Making it about yourself
- Not tolerating different viewpoints

### Tips
- Listen to understand, not to respond
- Practice with low-stakes conversations
- Be patient and curious
- Acknowledge their feelings
- Follow up later on what they shared`
  },
  {
    q: ['how to save for retirement', 'retirement planning tips', 'how to prepare for retirement', 'retirement savings guide'],
    a: `## How to Save for Retirement

### Start Now
- Time is your biggest advantage
- Even small amounts grow significantly with compound interest
- Do not wait until you earn more

### How Much to Save
- Aim for 15-20% of gross income
- Start with whatever you can and increase gradually
- At minimum, get any employer match (free money)

### Retirement Options (Philippines)
- SSS: Government pension, mandatory for employed
- GSIS: For government employees
- Pag-IBIG MP2: Voluntary savings with dividends
- Private Plans: Company retirement plans
- Personal Investments: Stocks, mutual funds

### Rules of Thumb
- By 30: Have 1x your annual salary saved
- By 40: Have 3x your annual salary saved
- By 50: Have 6x your annual salary saved
- By 60: Have 8-10x your annual salary saved

### Tips
- Automate savings (pay yourself first)
- Increase savings with every raise
- Avoid early withdrawal
- Diversify investments
- Review and adjust annually`
  },
  {
    q: ['how to think critically', 'critical thinking tips', 'how to think better', 'critical thinking guide'],
    a: `## How to Think Critically

### What is Critical Thinking
- Evaluating information objectively
- Questioning assumptions
- Considering multiple perspectives
- Making reasoned judgments

### Steps
1. Ask: What is the claim?
2. Ask: What is the evidence?
3. Ask: What are the assumptions?
4. Ask: Are there alternative explanations?
5. Ask: What are the implications?

### Common Logical Fallacies
- Ad Hominem: Attacking the person, not the argument
- Straw Man: Misrepresenting someone's argument
- Appeal to Authority: "Experts say..." without evidence
- False Dilemma: Only two options when more exist
- Slippery Slope: Extreme consequences without justification

### Tips
- Consider the source of information
- Look for evidence, not just opinions
- Be aware of your own biases
- Seek out opposing viewpoints
- Change your mind when presented with better evidence`
  },
  {
    q: ['how to set goals', 'goal setting tips', 'how to set and achieve goals', 'goal setting guide'],
    a: `## How to Set and Achieve Goals

### SMART Goals
- Specific: Clear and defined
- Measurable: You can track progress
- Achievable: Realistic given your resources
- Relevant: Aligned with your values
- Time-bound: Has a deadline

### Steps
1. Write down your goal
2. Break it into smaller goals
3. Create action steps for each
4. Set deadlines
5. Track progress regularly
6. Adjust as needed

### Types of Goals
- Short-term: 1-3 months
- Medium-term: 6-12 months
- Long-term: 1-5 years

### Tips
- Write goals down (makes them real)
- Share goals with someone (accountability)
- Review goals weekly
- Focus on one goal at a time
- Celebrate progress, not just completion`
  },
  {
    q: ['how to manage anger', 'anger management tips', 'how to control anger', 'anger control guide'],
    a: `## How to Manage Anger

### Immediate Strategies
- Take deep breaths (4-7-8 technique)
- Count to 10 before responding
- Walk away from the situation
- Use grounding techniques (5-4-3-2-1)
- Release physical tension (exercise)

### Long-term Strategies
- Identify your triggers
- Practice relaxation techniques
- Improve communication skills
- Exercise regularly
- Get enough sleep

### Communication When Angry
- Use I statements ("I feel frustrated when...")
- Do not blame or attack
- Listen to understand
- Take breaks during heated discussions
- Focus on solutions, not blame

### When to Seek Help
- Anger leads to violence or threats
- You damage property
- It affects your relationships
- You feel out of control
- It leads to depression or anxiety`
  },
  {
    q: ['how to be a good friend', 'friendship tips', 'how to maintain friendships', 'friendship advice'],
    a: `## How to Be a Good Friend

### Key Qualities
- Be reliable and trustworthy
- Listen without judging
- Show up during difficult times
- Celebrate their wins genuinely
- Respect their boundaries

### Maintain Friendships
- Reach out regularly
- Remember important dates
- Make time despite busy schedules
- Be there in good and bad times
- Show appreciation

### When Friends Need Help
- Ask how you can support them
- Listen more than you talk
- Do not try to fix everything
- Check in regularly
- Offer practical help

### Healthy Friendships
- Both people give and receive
- Mutual respect and trust
- Space for individual growth
- Honest communication
- No competition or jealousy`
  },
  {
    q: ['how to forgive someone', 'forgiveness tips', 'how to let go of grudges', 'forgiveness guide'],
    a: `## How to Forgive Someone

### Why Forgive
- It frees you from anger and resentment
- It improves your mental health
- It does not mean what they did was okay
- It is for your peace, not theirs

### Steps to Forgiveness
1. Acknowledge your pain
2. Make a conscious decision to forgive
3. Understand their perspective (if possible)
4. Release the desire for revenge
5. Focus on your healing

### Things to Know
- Forgiveness is a process, not instant
- You can forgive and still set boundaries
- You do not need to reconcile
- It may take time, and that is okay
- Professional help can assist

### Tips
- Write a letter (you do not have to send it)
- Practice empathy
- Focus on the present, not the past
- Seek support from others
- Be patient with yourself`
  },
]

const GENERAL_PATTERNS = [
  /\b(how to|how do i|how can i|how do you)\b/i,
  /\b(what is|what are|what was|what were)\b/i,
  /\b(why do|why is|why are|why does|why did|why should|why would)\b/i,
  /\b(tell me about|explain|describe|inform me about)\b/i,
  /\b(help me with|help me understand|help me learn)\b/i,
  /\b(give me advice|what should i|what can i do|what do you think)\b/i,
  /\b(best ways to|tips for|steps to|guide to|how to approach)\b/i,
  /\b(start learning|begin learning|how to start|how to begin)\b/i,
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
  id: 'general',
  label: 'General knowledge and advice',
  examples: [
    'how to define problems in hackathons',
    'how to start a project',
    'how to learn programming',
    'how to make a resume',
    'how to prepare for interview',
    'how to manage time',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    const hasPattern = GENERAL_PATTERNS.some(p => p.test(s))
    if (!hasPattern) return null

    let best = null
    for (const entry of GENERAL_QA) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.35) return null

    return {
      score: Math.min(0.9, best.score),
      subject: 'General Knowledge',
      text: best.entry.a,
    }
  },
}
