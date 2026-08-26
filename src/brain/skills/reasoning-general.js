import { normalise, contentWords, coreQuestion, overlapScore } from '../nlp.js'

const REASONING_QA = [
  {
    q: ['what is the meaning of life', 'purpose of life', 'why are we here', 'meaning of existence'],
    a: `## The Meaning of Life

This is one of humanity's oldest questions. Different perspectives:

**Philosophical:**
- Existentialism: You create your own meaning
- Absurdism: Life has no inherent meaning, but you can find purpose
- Nihilism: No objective meaning exists
- Humanism: Meaning comes from human welfare and growth

**Religious:**
- Christianity: To love and serve God and others
- Buddhism: To achieve enlightenment and end suffering
- Islam: To worship Allah and live righteously
- Hinduism: To fulfill dharma and achieve moksha

**Scientific:**
- Biology: To survive and reproduce
- Evolution: To pass on genes
- Psychology: To find happiness and fulfillment

**Practical:**
- Find what you love
- Help others
- Learn and grow
- Create something meaningful
- Build relationships

There is no single answer. The meaning of life is what you make it.`
  },
  {
    q: ['how to think critically', 'critical thinking tips', 'how to analyze information', 'how to evaluate arguments'],
    a: `## How to Think Critically

**1. Question Everything**
- Don't accept claims at face value
- Ask: Who says this? Why?
- What evidence supports it?

**2. Identify Assumptions**
- What is being assumed?
- Are the assumptions valid?
- What if they're wrong?

**3. Evaluate Evidence**
- Is it reliable?
- Is it sufficient?
- Is it relevant?
- Is there bias?

**4. Consider Alternatives**
- What are other explanations?
- What am I missing?
- What would change my mind?

**5. Logic Check**
- Are there logical fallacies?
- Does the conclusion follow from the premises?
- Are there contradictions?

**6. Form Your Own Conclusion**
- Based on evidence, not emotion
- Be willing to change your mind
- Acknowledge uncertainty

**Critical Thinking Tools:**
- Socratic questioning
- Devil's advocate
- Thought experiments
- Bayesian reasoning
- First principles thinking`
  },
  {
    q: ['how to make decisions', 'decision making process', 'how to choose wisely', 'how to evaluate options'],
    a: `## How to Make Better Decisions

**Step 1: Define the Decision**
- What exactly are you deciding?
- What is at stake?
- What is the deadline?

**Step 2: Gather Information**
- What do you need to know?
- What are the facts?
- What are the opinions?

**Step 3: Identify Options**
- What are all possible choices?
- Are there creative alternatives?
- What would others do?

**Step 4: Evaluate Each Option**
- Pros and cons
- Risks and rewards
- Short-term vs long-term
- Alignment with values

**Step 5: Make the Decision**
- Trust your analysis
- Don't overthink
- Commit to the choice
- Accept responsibility

**Decision-Making Frameworks:**
- Pros/Cons list
- Decision matrix
- Cost-benefit analysis
- Risk assessment
- Intuition check
- 10/10/10 rule (how will I feel in 10 minutes, 10 months, 10 years?)

**Common Decision Traps:**
- Analysis paralysis
- Emotional decisions
- Groupthink
- Confirmation bias
- Sunk cost fallacy`
  },
  {
    q: ['how to solve problems', 'problem solving steps', 'problem solving framework', 'how to approach problems'],
    a: `## Problem-Solving Framework

**Step 1: Understand the Problem**
- What is the actual problem?
- What are the symptoms vs root cause?
- What constraints exist?
- What does success look like?

**Step 2: Break It Down**
- What are the sub-problems?
- What can be solved independently?
- What has the most impact?

**Step 3: Generate Solutions**
- Brainstorm without judging
- Consider multiple approaches
- Think creatively
- Learn from similar problems

**Step 4: Evaluate Solutions**
- Feasibility
- Cost
- Time
- Risk
- Effectiveness

**Step 5: Choose and Implement**
- Pick the best option
- Create an action plan
- Execute step by step
- Monitor progress

**Step 6: Review and Learn**
- Did it work?
- What would you do differently?
- What did you learn?
- How to prevent it in the future?

**Problem-Solving Techniques:**
- 5 Whys
- Fishbone diagram
- Mind mapping
- SCAMPER
- First principles
- Analogical reasoning`
  },
  {
    q: ['how to learn effectively', 'study tips', 'learning strategies', 'how to remember things'],
    a: `## Effective Learning Strategies

**1. Active Learning**
- Don't just read, engage
- Take notes by hand
- Explain to someone else
- Ask questions

**2. Spaced Repetition**
- Review at increasing intervals
- Don't cram
- Use flashcards
- Quiz yourself

**3. Interleaving**
- Mix different topics
- Don't study one thing too long
- Switch between subjects
- Connect concepts

**4. Elaboration**
- Ask "why" and "how"
- Connect to what you know
- Create examples
- Build mental models

**5. Dual Coding**
- Use words AND images
- Draw diagrams
- Create mind maps
- Visualize concepts

**6. Concrete Examples**
- Abstract + examples = understanding
- Apply to real situations
- Create your own examples
- Use analogies

**Memory Techniques:**
- Mnemonics
- Memory palace
- Chunking
- Story method
- Association

**Study Environment:**
- Minimize distractions
- Take breaks (Pomodoro)
- Get enough sleep
- Exercise regularly`
  },
  {
    q: ['how to communicate better', 'communication skills', 'how to express ideas', 'effective communication'],
    a: `## Better Communication Skills

**1. Listen First**
- Pay full attention
- Don't interrupt
- Ask clarifying questions
- Show you understand

**2. Be Clear**
- One idea at a time
- Use simple language
- Avoid jargon
- Be specific

**3. Structure Your Message**
- State your point first
- Give supporting details
- Summarize at the end
- Use examples

**4. Non-Verbal**
- Eye contact
- Body language
- Tone of voice
- Facial expressions

**5. Adapt to Your Audience**
- Technical vs non-technical
- Formal vs casual
- Written vs spoken
- One-on-one vs group

**6. Give Feedback**
- Be specific
- Be constructive
- Be timely
- Be kind

**Communication Frameworks:**
- STAR (Situation, Task, Action, Result)
- PREP (Point, Reason, Example, Point)
- What? So what? Now what?
- Bottom Line Up Front (BLUF)

**Common Mistakes:**
- Talking too much
- Not listening
- Being unclear
- Assuming understanding
- Emotional reactions`
  },
  {
    q: ['how to be productive', 'productivity hacks', 'how to get more done', 'time management strategies'],
    a: `## Maximum Productivity

**1. Prioritize Ruthlessly**
- Eisenhower Matrix (Urgent/Important)
- 80/20 Rule (Pareto Principle)
- Top 3 priorities daily
- Say no to non-essentials

**2. Time Block**
- Deep work blocks (2-4 hours)
- Batch similar tasks
- Buffer time between tasks
- Protect your focus time

**3. Eliminate Distractions**
- Phone on silent
- Close unnecessary tabs
- Block social media
- Use website blockers

**4. Energy Management**
- Work when you're fresh
- Take strategic breaks
- Exercise regularly
- Sleep 7-8 hours

**5. Systems and Habits**
- Automate recurring tasks
- Create templates
- Build routines
- Use checklists

**6. Review and Adjust**
- Weekly review
- Track your time
- Measure results
- Adjust strategies

**Productivity Tools:**
- Todoist / Notion
- Calendar time blocking
- Pomodoro timer
- Focus apps
- Automation (Zapier, IFTTT)

**Mindset:**
- Progress over perfection
- Done is better than perfect
- Focus on outcomes, not activity
- Rest is productive`
  },
  {
    q: ['how to be creative', 'creativity tips', 'how to generate ideas', 'how to think creatively'],
    a: `## Unleash Your Creativity

**1. Change Your Perspective**
- Look at problems from different angles
- Ask "what if?"
- Challenge assumptions
- Think like a beginner

**2. Expose Yourself to New Things**
- Read widely
- Travel
- Talk to different people
- Learn new skills

**3. Create Conditions**
- Allow messy thinking
- Take breaks
- Walk in nature
- Reduce stress

**4. Brainstorm Techniques**
- Mind mapping
- SCAMPER (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse)
- Random word association
- Six thinking hats

**5. Build Creative Habits**
- Write daily
- Sketch ideas
- Carry a notebook
- Capture everything

**6. Overcome Blocks**
- Start small
- Lower expectations
- Just begin
- Embrace failure

**Creativity Boosters:**
- Change environment
- Listen to music
- Exercise
- Meditate
- Sleep on it

**Remember:**
- Creativity is a muscle
- Quantity leads to quality
- Nothing is truly original
- Combine existing ideas in new ways`
  },
]

const REASONING_PATTERNS = [
  /\b(meaning of life|purpose of existence|why are we here|what is the point)\b/i,
  /\b(think critically|critical thinking|analyze information|evaluate arguments)\b/i,
  /\b(make decisions|decision making|choose wisely|evaluate options|decide between)\b/i,
  /\b(solve problems|problem solving|approach problems|work through)\b/i,
  /\b(learn effectively|study tips|learning strategies|remember things|how to study)\b/i,
  /\b(communicate better|communication skills|express ideas|effective communication)\b/i,
  /\b(be productive|productivity|get more done|time management|manage time)\b/i,
  /\b(be creative|creativity|generate ideas|think creatively|creative thinking)\b/i,
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
  id: 'reasoning-general',
  label: 'General reasoning and life skills',
  examples: [
    'what is the meaning of life',
    'how to think critically',
    'how to make decisions',
    'how to solve problems',
    'how to learn effectively',
    'how to communicate better',
    'how to be productive',
    'how to be creative',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    const hasPattern = REASONING_PATTERNS.some(p => p.test(s))
    if (!hasPattern) return null

    let best = null
    for (const entry of REASONING_QA) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.3) return null

    return {
      score: Math.min(0.85, best.score),
      subject: 'Life Skills',
      text: best.entry.a,
    }
  },
}
