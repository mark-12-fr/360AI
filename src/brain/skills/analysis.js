import { normalise, contentWords, coreQuestion, overlapScore } from '../nlp.js'

const ANALYSIS_QA = [
  {
    q: ['an IT team checks the number of users who log in each day before upgrading a system', 'IT team checks users before upgrade', 'checking user login count before system upgrade', 'why check user count before upgrade'],
    a: `## Why IT Teams Check User Login Count Before Upgrading

### Primary Reason: Minimize Disruption

The IT team checks daily active users to determine the **best time to upgrade** when the fewest people are affected.

### Key Reasons:

**1. Scheduling Maintenance Windows**
- Identify off-peak hours (usually late night/early morning)
- Avoid upgrading during high-traffic periods
- Plan downtime when most users are offline

**2. Risk Assessment**
- More active users = higher risk if upgrade fails
- If 10,000 users are logged in, a failure affects 10,000 people
- If 100 users are logged in, only 100 are affected

**3. Resource Planning**
- Estimate server load during upgrade
- Determine if they need extra staff on standby
- Plan rollback procedures if something goes wrong

**4. Communication**
- Notify users about planned downtime
- Set expectations for when service will resume
- Provide alternative access if critical

### Example Scenario:
- **Peak hours**: 9 AM - 5 PM (10,000 users)
- **Off-peak**: 2 AM - 4 AM (200 users)
- **Decision**: Upgrade at 3 AM to minimize impact

### Best Practice:
This is part of **change management** - a standard IT process to ensure system upgrades are safe and don't disrupt business operations.`
  },
  {
    q: ['what is the difference between', 'difference between X and Y', 'compare X and Y', 'how are X and Y different'],
    a: `## How to Answer Comparison Questions

When asked to compare two things, consider:

**1. Purpose/Function**
- What does each one do?
- What problem does it solve?

**2. Key Features**
- What are the main characteristics?
- What makes each unique?

**3. Use Cases**
- When would you use one vs the other?
- What situations favor each?

**4. Advantages/Disadvantages**
- What are the pros and cons of each?
- What are the trade-offs?

**5. Examples**
- Provide real-world examples
- Show practical applications

This framework helps analyze any comparison question systematically.`
  },
  {
    q: ['what are the advantages', 'advantages of', 'what are the benefits', 'benefits of', 'why is X good'],
    a: `## How to Analyze Advantages

When analyzing advantages of something:

**1. Functional Benefits**
- What does it do better than alternatives?
- What problems does it solve?

**2. Economic Benefits**
- Does it save money?
- Does it increase revenue?
- Is it cost-effective?

**3. Time Benefits**
- Does it save time?
- Does it increase efficiency?

**4. Quality Benefits**
- Does it improve quality?
- Does it reduce errors?

**5. User Benefits**
- Is it easier to use?
- Does it improve experience?

**6. Strategic Benefits**
- Does it provide competitive advantage?
- Does it enable growth?

Present advantages with specific examples and evidence.`
  },
  {
    q: ['what are the disadvantages', 'disadvantages of', 'drawbacks of', 'cons of', 'what is bad about'],
    a: `## How to Analyze Disadvantages

When analyzing disadvantages:

**1. Cost Issues**
- Is it expensive?
- Are there hidden costs?
- What is the total cost of ownership?

**2. Time Issues**
- Does it take more time?
- Is there a learning curve?

**3. Complexity Issues**
- Is it complicated to use?
- Does it require special training?

**4. Risk Issues**
- What can go wrong?
- What are the security concerns?

**5. Limitations**
- What can it NOT do?
- Where does it fall short?

**6. Dependencies**
- Does it rely on other things?
- What happens if those fail?

Present disadvantages honestly with specific examples.`
  },
  {
    q: ['what would happen if', 'what if', 'imagine if', 'suppose that', 'hypothetically'],
    a: `## How to Answer Hypothetical Questions

When answering "what if" questions:

**1. Identify the Change**
- What exactly is being changed?
- What is the scope of the change?

**2. Immediate Effects**
- What happens right away?
- What are the direct consequences?

**3. Short-term Effects**
- What happens in days/weeks?
- How do people react?

**4. Long-term Effects**
- What happens in months/years?
- What are the lasting impacts?

**5. Cascading Effects**
- What other things change as a result?
- What are the second and third-order effects?

**6. Edge Cases**
- What are the best and worst scenarios?
- What are the unexpected consequences?

Use logical reasoning and real-world knowledge to construct plausible scenarios.`
  },
  {
    q: ['explain the process', 'how does X work', 'walk me through', 'describe the steps', 'what is the workflow'],
    a: `## How to Explain Processes

When explaining how something works:

**1. Overview**
- Start with a high-level summary
- What is the overall purpose?

**2. Input**
- What goes into the process?
- What triggers it to start?

**3. Steps**
- Break it down into clear steps
- Number them in order
- Be specific about each step

**4. Decision Points**
- Where are there choices?
- What happens at each branch?

**5. Output**
- What comes out at the end?
- How do you know it succeeded?

**6. Error Handling**
- What can go wrong?
- How are errors handled?

Use clear, simple language and provide examples where helpful.`
  },
  {
    q: ['analyze this scenario', 'what do you think about', 'your opinion on', 'evaluate this', 'assess the situation'],
    a: `## How to Analyze Scenarios

When analyzing a scenario:

**1. Identify Key Factors**
- What are the main elements?
- Who are the stakeholders?
- What are the constraints?

**2. Consider Multiple Perspectives**
- What does each stakeholder want?
- What are their concerns?
- What are their motivations?

**3. Evaluate Options**
- What choices are available?
- What are the pros and cons of each?
- What are the trade-offs?

**4. Assess Risks**
- What could go wrong?
- What are the probabilities?
- What are the consequences?

**5. Make Recommendation**
- What is the best course of action?
- Why is it the best?
- What are the next steps?

Be balanced, consider multiple viewpoints, and support your analysis with reasoning.`
  },
  {
    q: ['what are the steps to', 'how do I approach', 'how to tackle', 'strategy for', 'plan for'],
    a: `## How to Create Action Plans

When providing steps or strategies:

**1. Define the Goal**
- What exactly do we want to achieve?
- What does success look like?

**2. Assess Current State**
- Where are we now?
- What resources do we have?
- What are the constraints?

**3. Identify Actions**
- What specific steps are needed?
- In what order should they be done?
- Who is responsible for each?

**4. Set Timeline**
- When should each step be completed?
- What are the milestones?
- What are the deadlines?

**5. Plan for Risks**
- What could go wrong?
- What is the backup plan?
- How will we handle obstacles?

**6. Measure Progress**
- How will we track success?
- What metrics matter?
- When should we review and adjust?

Present actionable, specific steps with clear timelines.`
  },
  {
    q: ['what are the best practices', 'best way to', 'optimal approach', 'recommended approach', 'how should I'],
    a: `## How to Provide Best Practices

When explaining best practices:

**1. Industry Standards**
- What do experts recommend?
- What is the proven approach?
- What works in practice?

**2. Common Pitfalls**
- What mistakes should be avoided?
- What are the anti-patterns?
- What have others learned the hard way?

**3. Tools and Resources**
- What tools help?
- What resources are available?
- What should you learn?

**4. Gradual Implementation**
- Where should you start?
- How to build up gradually?
- What to prioritize first?

**5. Measurement**
- How to know if it's working?
- What metrics to track?
- How to iterate and improve?

Provide practical, actionable advice with specific examples.`
  },
  {
    q: ['what is the impact of', 'how does X affect', 'consequences of', 'effects of', 'what happens to'],
    a: `## How to Analyze Impact

When analyzing impact:

**1. Scope of Impact**
- Who is affected?
- How many people/organizations?
- What is the geographic scope?

**2. Types of Impact**
- Economic impact
- Social impact
- Environmental impact
- Technical impact

**3. Short-term vs Long-term**
- What happens immediately?
- What happens over time?
- What are the lasting effects?

**4. Direct vs Indirect**
- What are the primary effects?
- What are the secondary effects?
- What are the unintended consequences?

**5. Magnitude**
- How significant is the impact?
- Is it temporary or permanent?
- Can it be reversed?

Provide balanced analysis with specific examples and evidence.`
  },
  {
    q: ['analyze the pros and cons', 'weigh the options', 'evaluate the trade-offs', 'consider the factors'],
    a: `## How to Weigh Options

When evaluating trade-offs:

**1. List Options**
- What are the available choices?
- Are there creative alternatives?

**2. Define Criteria**
- What matters most?
- What are the must-haves vs nice-to-haves?
- What are the constraints?

**3. Score Each Option**
- How does each option perform on each criterion?
- What are the strengths and weaknesses?

**4. Consider Risk**
- What are the risks of each option?
- What is the worst-case scenario?
- How likely are the risks?

**5. Make Decision**
- Which option best meets the criteria?
- What are you willing to sacrifice?
- What is the recommendation?

Present a balanced analysis that helps the user make an informed decision.`
  },
]

const ANALYSIS_PATTERNS = [
  /\b(an IT team|a team|the team|they)\s+(checks?|monitors?|reviews?|analyzes?|tracks?)\b/i,
  /\b(explain|describe|walk me through|tell me about)\s+(the|how|why|what|process|steps|workflow)\b/i,
  /\b(what would happen|what if|imagine|suppose|hypothetically)\b/i,
  /\b(advantages?|benefits?|pros?|good things?|positive)\s+(of|about|for)\b/i,
  /\b(disadvantages?|drawbacks?|cons?|bad things?|negative|risks?)\s+(of|about|for)\b/i,
  /\b(compare|difference between|how are|versus|vs\.?|or)\s+\w+/i,
  /\b(analyze|evaluate|assess|consider|weigh)\s+(the|this|these|options|factors|trade-offs?)\b/i,
  /\b(best practices?|optimal|recommended|approach|strategy|plan|steps? to)\b/i,
  /\b(impact|effect|consequence|result|outcome)\s+(of|on|from)\b/i,
  /\b(process|workflow|procedure|system|how does .+ work)\b/i,
  /\b(opinion|think about|feel about|your thoughts|perspective)\b/i,
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
  id: 'analysis',
  label: 'Complex analysis and reasoning',
  examples: [
    'an IT team checks the number of users who log in each day before upgrading a system?',
    'what are the advantages of cloud computing',
    'compare REST vs GraphQL',
    'what would happen if AI replaced programmers',
    'best practices for code review',
    'explain the software development lifecycle',
  ],

  match(ctx) {
    const raw = ctx.text
    const s = normalise(raw)
    const core = coreQuestion(raw)

    const hasPattern = ANALYSIS_PATTERNS.some(p => p.test(s))
    if (!hasPattern) return null

    let best = null
    for (const entry of ANALYSIS_QA) {
      const score = scoreEntry(core, entry)
      if (!best || score > best.score) best = { entry, score }
    }

    if (!best || best.score < 0.3) return null

    return {
      score: Math.min(0.9, best.score),
      subject: 'Analysis',
      text: best.entry.a,
    }
  },
}
