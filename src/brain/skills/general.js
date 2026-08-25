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
  }
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
