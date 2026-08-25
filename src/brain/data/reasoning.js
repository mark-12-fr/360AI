export const REASONING_EXAMPLES = [
  {
    id: "syllogistic-reasoning",
    category: "Logic",
    q: ["What is syllogistic reasoning?", "Basic logical reasoning", "Syllogism examples"],
    title: "Syllogistic Reasoning",
    body: `Syllogistic reasoning draws conclusions from two premises. It is a fundamental form of deductive logic.

## Structure

1. Major Premise: General statement
2. Minor Premise: Specific statement
3. Conclusion: Logical deduction

## Example: Classic Syllogism

**Premise 1**: All humans are mortal.
**Premise 2**: Socrates is a human.
**Conclusion**: Therefore, Socrates is mortal.

## Example: Programming Context

**Premise 1**: All React components must return JSX or null.
**Premise 2**: This function returns a string.
**Conclusion**: Therefore, this function is not a valid React component.

## Step-by-Step Analysis

1. Identify the major premise (general rule)
2. Identify the minor premise (specific case)
3. Check if the specific case fits the general rule
4. Draw the logical conclusion

## Valid vs Invalid

\`\`\`
Valid:
All A are B
C is A
Therefore, C is B

Invalid (Undistributed Middle):
All A are B
All C are B
Therefore, all A are C
\`\`\`

Syllogistic reasoning is the foundation of logical thinking and argumentation.`
  },
  {
    id: "distance-word-problem",
    category: "Math",
    q: ["Distance word problem", "Rate time distance problem", "Travel word problem"],
    title: "Distance Word Problem",
    body: `Distance problems use the formula: Distance = Rate x Time (d = rt).

## Example Problem

Two cars start from the same point. Car A travels north at 60 mph, Car B travels south at 45 mph. How far apart are they after 3 hours?

## Step-by-Step Solution

**Step 1**: Identify the knowns
- Car A rate: 60 mph
- Car B rate: 45 mph
- Time: 3 hours
- Direction: Opposite (north vs south)

**Step 2**: Calculate distance for each car
- Car A: 60 x 3 = 180 miles
- Car B: 45 x 3 = 135 miles

**Step 3**: Since they travel in opposite directions, add distances
- Total distance: 180 + 135 = 315 miles

**Step 4**: Verify
- Combined rate: 60 + 45 = 105 mph
- Total distance: 105 x 3 = 315 miles

## Answer

The cars are 315 miles apart after 3 hours.

## Key Insight

When objects move in opposite directions, their distances add. When moving toward each other, use combined rate. When one is stationary, use only the moving object's rate.`
  },
  {
    id: "cause-and-effect",
    category: "Science",
    q: ["Why does ice float?", "Cause and effect reasoning", "Buoyancy explanation"],
    title: "Cause and Effect: Ice Floating",
    body: `Understanding why ice floats requires analyzing cause and effect relationships in physics.

## The Phenomenon

Ice floats on water, which is unusual because most solids sink in their liquid form.

## Cause and Effect Chain

**Cause 1**: Water molecules form hydrogen bonds
**Effect 1**: When water freezes, molecules arrange in a crystalline structure

**Cause 2**: The crystalline structure has more space between molecules
**Effect 2**: Ice is less dense than liquid water (0.917 g/cm3 vs 1.0 g/cm3)

**Cause 3**: Less dense objects float in more dense liquids
**Effect 3**: Ice floats on water

## Why This Matters

1. Lakes freeze from the top, not bottom
2. Aquatic life survives winter under ice
3. Insulating layer protects ecosystem

## Verification

- Density of ice: 0.917 g/cm3
- Density of water: 1.0 g/cm3
- Since 0.917 < 1.0, ice floats

## Counterfactual

If ice were denser than water, lakes would freeze from the bottom up, killing most aquatic life. This would drastically change Earth's ecosystem.

Cause and effect reasoning helps us understand natural phenomena and predict outcomes.`
  },
  {
    id: "comparative-analysis",
    category: "Technology",
    q: ["React vs Vue comparison", "Compare React and Vue", "Which framework is better?"],
    title: "Comparative Analysis: React vs Vue",
    body: `Comparative analysis evaluates options by examining features, trade-offs, and use cases.

## Criteria for Comparison

1. Learning curve
2. Performance
3. Ecosystem
4. Community support
5. Use cases

## Feature Comparison

### Learning Curve
- **React**: Moderate. JSX requires learning, hooks have a learning curve
- **Vue**: Gentle. Template syntax is familiar to HTML developers

### Performance
- **React**: Virtual DOM with reconciliation. Good for most apps
- **Vue**: Reactive system with fine-grained updates. Often faster out of the box

### Ecosystem
- **React**: Massive. Next.js, React Native, Redux, React Router
- **Vue**: Growing. Nuxt.js, Vuex/Pinia, Vue Router

### TypeScript Support
- **React**: Excellent, first-class support
- **Vue**: Good, improving with Vue 3

## Decision Framework

**Choose React when:**
- Building large-scale applications
- Need React Native for mobile
- Want maximum ecosystem flexibility
- Team has JavaScript experience

**Choose Vue when:**
- Rapid prototyping
- Small to medium teams
- Templates preferred over JSX
- Simplicity is priority

## Trade-offs

| Factor | React | Vue |
|--------|-------|-----|
| Flexibility | High | Moderate |
| Boilerplate | More | Less |
| Mobile | React Native | Capacitor/Quasar |
| State Management | Redux/Zustand | Pinia |

## Conclusion

Both are excellent choices. React offers more flexibility and ecosystem, while Vue provides a gentler learning curve and simpler API.`
  },
  {
    id: "multi-step-reasoning",
    category: "Strategy",
    q: ["MVP vs full product", "Build MVP first?", "Product development strategy"],
    title: "Multi-Step Reasoning: MVP vs Full Product",
    body: `Multi-step reasoning breaks complex decisions into sequential analysis steps.

## Problem Statement

Should we build an MVP (Minimum Viable Product) first, or invest in a full-featured product?

## Step 1: Define MVP

An MVP includes only core features needed to validate the product hypothesis.

**Example: E-commerce MVP**
- Product listing
- Basic search
- Shopping cart
- Checkout (single payment method)
- User accounts

**Excluded from MVP:**
- Advanced filters
- Multiple payment methods
- Loyalty program
- Mobile app
- Analytics dashboard

## Step 2: Analyze Risk

| Risk | MVP Approach | Full Product |
|------|--------------|--------------|
| Market fit | Low (validate early) | High (build unproven features) |
| Time to market | Fast (weeks) | Slow (months/years) |
| Cost | Low | High |
| User feedback | Early | Late |

## Step 3: Evaluate Resources

- Team size: 3 developers
- Budget: $50,000
- Timeline: 3 months
- Technical debt tolerance: Moderate

## Step 4: Decision Matrix

\`\`\`
Score: MVP wins on speed, cost, risk
Full product wins on completeness, user experience
\`\`\`

## Step 5: Recommended Approach

1. Build MVP with core features (8 weeks)
2. Launch to beta users (2 weeks)
3. Collect feedback and metrics (4 weeks)
4. Iterate based on data (ongoing)
5. Add features incrementally

## Step 6: Validation Criteria

- 100 beta users within first month
- 30% week-2 retention
- At least 1 paying customer
- NPS score > 30

Multi-step reasoning ensures thorough analysis before major decisions.`
  },
  {
    id: "systematic-debugging",
    category: "Debugging",
    q: ["How to debug systematically?", "Debugging methodology", "Debugging approach"],
    title: "Systematic Debugging",
    body: `Systematic debugging follows a structured process to identify and fix bugs efficiently.

## The Debugging Process

### Step 1: Reproduce the Bug

\`\`\`javascript
// Before fixing, ensure you can reproduce
function reproduce() {
  // Follow exact steps
  // Note input values
  // Record expected vs actual behavior
}
\`\`\`

### Step 2: Isolate the Problem

\`\`\`javascript
// Binary search approach
// Comment out half the code
// Does the bug still appear?
// Narrow down to the problematic section
\`\`\`

### Step 3: Analyze the Root Cause

Ask: "Why does this happen?"
- Check variable values at each step
- Verify assumptions
- Look for edge cases

### Step 4: Form a Hypothesis

\`\`\`javascript
// Hypothesis: "The bug occurs when input is null"
// Test: Pass null and observe behavior
\`\`\`

### Step 5: Test the Fix

\`\`\`javascript
// Before fix
function divide(a, b) {
  return a / b; // Infinity when b is 0
}

// After fix
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
\`\`\`

### Step 6: Verify and Document

1. Test with original failing input
2. Test with edge cases
3. Test with normal inputs
4. Document the fix

## Debugging Tools

\`\`\`javascript
// Console methods
console.log("Basic logging");
console.table([{ name: "Alice" }, { name: "Bob" }]);
console.time("Operation");
// ... code ...
console.timeEnd("Operation");

// Breakpoints
debugger; // Pauses execution in dev tools
\`\`\`

## Common Patterns

- **Check the data flow**: Trace values through the system
- **Check timing**: Async issues, race conditions
- **Check scope**: Variable shadowing, closures
- **Check state**: Mutations, side effects

Systematic debugging saves time by avoiding random guessing.`
  },
  {
    id: "constraint-optimization",
    category: "Problem Solving",
    q: ["Constraint optimization", "Optimize with constraints", "Resource allocation problem"],
    title: "Constraint Optimization",
    body: `Constraint optimization finds the best solution while satisfying all constraints.

## Problem: Task Scheduling

You have 5 tasks with durations and deadlines. Schedule them to maximize completed tasks before deadlines.

## Constraints

- Tasks cannot be interrupted
- Only one task at a time
- Must meet deadlines

## Data

\`\`\`
Task A: Duration 3, Deadline 5
Task B: Duration 2, Deadline 4
Task C: Duration 4, Deadline 8
Task D: Duration 1, Deadline 3
Task E: Duration 3, Deadline 7
\`\`\`

## Step-by-Step Approach

### Step 1: Identify Constraints

- Time constraint: Tasks must fit in available time
- Order constraint: Some tasks may depend on others
- Resource constraint: Limited resources available

### Step 2: Sort by Priority

Sort by deadline (earliest first):
1. Task D: Deadline 3
2. Task B: Deadline 4
3. Task A: Deadline 5
4. Task E: Deadline 7
5. Task C: Deadline 8

### Step 3: Schedule Using Greedy Algorithm

\`\`\`
Time 0-1: Task D (completes at time 1, deadline 3)
Time 1-3: Task B (completes at time 3, deadline 4)
Time 3-6: Task A (completes at time 6, deadline 5) -- MISS!
\`\`\`

### Step 4: Adjust Schedule

\`\`\`
Time 0-1: Task D (deadline 3) -- OK
Time 1-3: Task B (deadline 4) -- OK
Time 3-4: Task E (deadline 7) -- OK
Time 4-7: Task A (deadline 5) -- MISS!
\`\`\`

### Step 5: Optimal Solution

\`\`\`
Time 0-1: Task D (deadline 3) -- OK
Time 1-3: Task B (deadline 4) -- OK
Time 3-6: Task E (deadline 7) -- OK
Time 6-10: Task C (deadline 8) -- OK

Total tasks completed: 4 of 5
\`\`\`

## Verification

- All constraints satisfied? Yes
- All deadlines met? Yes
- Maximum tasks scheduled? Yes

Constraint optimization balances multiple requirements to find feasible solutions.`
  },
  {
    id: "deductive-reasoning",
    category: "Logic",
    q: ["Deductive reasoning example", "Logical deduction", "Top-down reasoning"],
    title: "Deductive Reasoning",
    body: `Deductive reasoning applies general rules to specific cases to reach certain conclusions.

## Structure

General Rule --> Specific Case --> Certain Conclusion

## Example: API Error Handling

**General Rule**: All API responses must have a 2xx status code for success.

**Specific Case**: The API returned status code 404.

**Conclusion**: Therefore, the API request failed.

## Step-by-Step Analysis

### Step 1: Establish the Rule

\`\`\`javascript
// General rule
function isSuccess(statusCode) {
  return statusCode >= 200 && statusCode < 300;
}
\`\`\`

### Step 2: Apply to Specific Case

\`\`\`javascript
// Specific case
const response = await fetch("/api/users");
const statusCode = response.status; // 404

// Apply rule
const success = isSuccess(404);
// Result: false
\`\`\`

### Step 3: Draw Conclusion

Since the status code is not in the 2xx range, the request failed.

## Another Example: Type Checking

**General Rule**: In TypeScript, all variables must be declared before use.

**Specific Case**: The variable "count" is used without declaration.

**Conclusion**: This will cause a compilation error.

\`\`\`typescript
// General rule enforced by TypeScript
let count = 0; // Must declare

// Specific case violates rule
console.log(total); // Error: 'total' is not declared
\`\`\`

## Validity Check

- Are the premises true?
- Does the conclusion follow logically?
- Is the reasoning structure valid?

Deductive reasoning provides certainty when premises are true and logic is valid.`
  },
  {
    id: "hypothetical-reasoning",
    category: "Critical Thinking",
    q: ["What if the internet shut down?", "Hypothetical scenario", "Thought experiment"],
    title: "Hypothetical Reasoning: Internet Shutdown",
    body: `Hypothetical reasoning explores "what if" scenarios to understand implications and dependencies.

## Scenario

What would happen if the internet shut down globally for 24 hours?

## Step 1: Identify Affected Systems

- Communication (email, messaging, social media)
- Commerce (online banking, e-commerce)
- Information (websites, search engines)
- Entertainment (streaming, gaming)
- Infrastructure (cloud services, IoT)

## Step 2: Immediate Effects (0-6 hours)

**Communication**
- Email stops working
- Messaging apps fail
- Social media inaccessible
- Phone calls (if cellular) still work

**Commerce**
- Online transactions halt
- ATMs may still work (some use satellite)
- Credit card processing stops
- Stock markets close

**Information**
- Search engines unavailable
- News websites down
- Wikipedia inaccessible
- Emergency alerts limited

## Step 3: Short-term Effects (6-24 hours)

**Business**
- Remote workers cannot connect
- Cloud services inaccessible
- Database connections fail
- E-commerce loses revenue

**Social**
- Panic buying in stores
- Isolation for remote communities
- Information vacuum
- Rumors spread through word of mouth

## Step 4: Long-term Implications

**If prolonged (days/weeks)**
- Supply chain disruption
- Financial system instability
- Emergency services strained
- Social unrest

## Step 5: Lessons Learned

1. Critical infrastructure depends on internet
2. Redundancy is essential
3. Offline alternatives needed
4. Digital literacy is important

## Counterfactual

If the internet had never existed, human communication and commerce would be fundamentally different -- more local, slower, but potentially more resilient.

Hypothetical reasoning helps us prepare for unlikely but impactful scenarios.`
  },
  {
    id: "error-detection",
    category: "Critical Thinking",
    q: ["Find the error in reasoning", "Error detection", "Logical error identification"],
    title: "Error Detection in Logic",
    body: `Error detection identifies flaws in arguments, code, or reasoning.

## Example: Code Error Detection

### Problem Code

\`\`\`javascript
function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}
\`\`\`

### Step 1: Identify the Error

The loop condition uses \`<=\` instead of \`<\`.

### Step 2: Trace the Execution

\`\`\`javascript
const arr = [1, 2, 3];
// i = 0: sum = 0 + 1 = 1
// i = 1: sum = 1 + 2 = 3
// i = 2: sum = 3 + 3 = 6
// i = 3: sum = 6 + undefined = NaN  <-- ERROR
\`\`\`

### Step 3: Explain the Error

When i equals 3 (equal to array length), \`numbers[3]\` is undefined. Adding undefined to a number produces NaN.

### Step 4: Fix the Error

\`\`\`javascript
function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) { // Changed <= to <
    sum += numbers[i];
  }
  return sum / numbers.length;
}
\`\`\`

## Example: Logical Error Detection

### Flawed Argument

"All programmers drink coffee. John drinks coffee. Therefore, John is a programmer."

### Step 1: Identify the Flaw

This is the fallacy of affirming the consequent.

### Step 2: Formalize

\`\`\`
Premise 1: If programmer, then drinks coffee
Premise 2: John drinks coffee
Conclusion: John is programmer (INVALID)
\`\`\`

### Step 3: Counterexample

Many non-programmers also drink coffee. The conclusion does not follow.

### Step 4: Correct Logic

\`\`\`
Valid form:
Premise 1: If programmer, then drinks coffee
Premise 2: John is a programmer
Conclusion: John drinks coffee (VALID)
\`\`\`

Error detection requires careful analysis of each step in reasoning or code execution.`
  },
  {
    id: "contradiction-detection",
    category: "Logic",
    q: ["Detect contradiction", "Find contradicting statements", "Logical inconsistency"],
    title: "Contradiction Detection",
    body: `Contradiction detection identifies statements or conditions that cannot both be true simultaneously.

## Example: Code Contradiction

### Problem Code

\`\`\`javascript
function processUser(user) {
  if (user.age >= 18) {
    console.log("User is an adult");
  }

  if (user.age < 18) {
    console.log("User is an adult"); // Contradiction!
  }

  if (user.role === "admin") {
    return "Admin access";
  }

  if (user.role !== "admin") {
    return "Admin access"; // Contradiction!
  }
}
\`\`\`

### Step 1: Identify Contradictions

The second if block contradicts the first. If age >= 18 is true, age < 18 cannot also be true.

### Step 2: Trace the Logic

\`\`\`
Test case: user.age = 25
Block 1: 25 >= 18 is TRUE -> prints "User is an adult"
Block 2: 25 < 18 is FALSE -> skipped
No contradiction in this execution path
\`\`\`

### Step 3: Determine Intent

The second block appears to be a copy-paste error. It should say "User is a minor" or should be removed.

### Step 4: Fix

\`\`\`javascript
function processUser(user) {
  if (user.age >= 18) {
    console.log("User is an adult");
  } else {
    console.log("User is a minor");
  }
}
\`\`\`

## Example: Requirements Contradiction

### Given Requirements

1. "All users must verify email before accessing the dashboard"
2. "New users can access the dashboard immediately after signup"

### Step 1: Identify Contradiction

Requirement 1 says verification is required. Requirement 2 says no verification needed. These cannot both be true.

### Step 2: Analyze Impact

If both are implemented, the system will either:
- Block new users (following requirement 1), or
- Allow unverified users (following requirement 2)

### Step 3: Resolution

Clarify with stakeholders which requirement takes precedence, or combine them:
- "New users get limited dashboard access immediately"
- "Full access requires email verification"

Contradiction detection prevents conflicting implementations and ensures logical consistency.`
  },
  {
    id: "decision-making",
    category: "Strategy",
    q: ["Decision making framework", "How to make decisions", "Structured decision process"],
    title: "Decision Making Framework",
    body: `A structured decision-making process ensures thorough analysis and reduces bias.

## Problem: Technology Stack Selection

Choose between PostgreSQL and MongoDB for a new application.

## Step 1: Define Criteria

1. Data structure complexity
2. Query requirements
3. Scalability needs
4. Team expertise
5. Cost

## Step 2: Gather Information

**PostgreSQL**
- Relational database
- Structured data with schemas
- Complex queries with joins
- ACID compliance
- Strong consistency

**MongoDB**
- Document database
- Flexible schema
- Simple queries
- Horizontal scaling
- Eventual consistency

## Step 3: Weight Criteria

| Criterion | Weight | PostgreSQL | MongoDB |
|-----------|--------|------------|---------|
| Data structure | 30% | 8 | 6 |
| Queries | 25% | 9 | 5 |
| Scalability | 20% | 6 | 9 |
| Team expertise | 15% | 7 | 5 |
| Cost | 10% | 7 | 8 |

## Step 4: Score and Calculate

**PostgreSQL Score**
\`\`\`
(8 x 0.30) + (9 x 0.25) + (6 x 0.20) + (7 x 0.15) + (7 x 0.10)
= 2.4 + 2.25 + 1.2 + 1.05 + 0.7
= 7.6
\`\`\`

**MongoDB Score**
\`\`\`
(6 x 0.30) + (5 x 0.25) + (9 x 0.20) + (5 x 0.15) + (8 x 0.10)
= 1.8 + 1.25 + 1.8 + 0.75 + 0.8
= 6.4
\`\`\`

## Step 5: Decision

PostgreSQL scores higher (7.6 vs 6.4). Choose PostgreSQL for this application.

## Step 6: Document Rationale

- Application requires complex queries and joins
- Data structure is well-defined
- Team has PostgreSQL experience
- Consistency is important

Structured decision-making reduces regret and improves outcomes.`
  },
  {
    id: "scenario-analysis",
    category: "Strategy",
    q: ["Traffic spike scenario", "What if traffic spikes?", "Scenario planning"],
    title: "Scenario Analysis: Traffic Spike",
    body: `Scenario analysis explores different futures to prepare strategies for each possibility.

## Problem

Your e-commerce site may experience a 10x traffic spike during a flash sale.

## Scenario 1: No Preparation

### What Happens
1. Server receives 10x normal traffic
2. Response times increase to 30+ seconds
3. Database connections exhausted
4. Users see error pages
5. Revenue loss and brand damage

### Impact
- 70% users abandon cart
- $50,000 estimated revenue loss
- Negative social media attention
- 3 months to recover user trust

## Scenario 2: Basic Preparation

### What Happens
1. Add more server instances
2. Implement caching
3. Optimize database queries

### Implementation
\`\`\`javascript
// Add caching layer
const redis = require("redis");
const client = redis.createClient();

async function getProduct(id) {
  const cached = await client.get("product:" + id);
  if (cached) return JSON.parse(cached);

  const product = await db.products.findById(id);
  await client.setex("product:" + id, 300, JSON.stringify(product));
  return product;
}
\`\`\`

### Impact
- 40% improvement in response time
- 50% reduction in database load
- $20,000 estimated revenue loss

## Scenario 3: Full Preparation

### What Happens
1. Auto-scaling infrastructure
2. CDN for static assets
3. Load balancing
4. Database read replicas
5. Graceful degradation

### Implementation
\`\`\`javascript
// Implement circuit breaker
class CircuitBreaker {
  constructor(options) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.failures = 0;
    this.state = "CLOSED";
  }

  async execute(fn) {
    if (this.state === "OPEN") {
      throw new Error("Circuit is open");
    }

    try {
      const result = await fn();
      this.failures = 0;
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures >= this.failureThreshold) {
        this.state = "OPEN";
        setTimeout(() => {
          this.state = "HALF_OPEN";
        }, this.resetTimeout);
      }
      throw error;
    }
  }
}
\`\`\`

### Impact
- 99.9% uptime maintained
- $0 estimated revenue loss
- Positive brand perception

## Scenario 4: Extreme Preparation (Over-engineering)

### What Happens
1. Multi-region deployment
2. Custom CDN
3. Real-time monitoring
4. Chaos engineering
5. Dedicated SRE team

### Impact
- 99.99% uptime
- $200,000 preparation cost
- Diminishing returns for most businesses

## Recommendation

Prepare for Scenario 3 (Full Preparation) with automated scaling and monitoring. This balances cost and reliability for most e-commerce applications.

    Scenario analysis helps organizations prepare for multiple possible futures.`
  },
  {
    id: "simple-math-word-problem",
    category: "Math",
    q: ["Math word problem", "Simple math problem", "Basic word problem"],
    title: "Simple Math Word Problem",
    body: `Word problems translate real-life situations into math equations.

## Example Problem

Maria has 24 apples. She gives 7 to her friend and buys 12 more. How many apples does she have now?

## Step-by-Step Solution

**Step 1**: Identify what you know
- Start: 24 apples
- Gave away: 7
- Bought: 12

**Step 2**: Set up the equation
- 24 - 7 + 12 = ?

**Step 3**: Solve left to right
- 24 - 7 = 17
- 17 + 12 = 29

**Step 4**: Check the answer
- Does 29 make sense? She gave some away but got more, so she should have fewer than 24 + 12 but more than 24 - 7. Yes, 29 fits.

## Answer

Maria has 29 apples.

## Key Strategy

1. Read the problem carefully
2. Identify what is given and what is asked
3. Write an equation
4. Solve and check
5. Include units in your final answer`
  },
  {
    id: "why-questions-everyday",
    category: "Everyday",
    q: ["Why do we yawn?", "Why is the sky blue?", "Why do we need sleep?"],
    title: "Why Do We Yawn?",
    body: `"Why" questions explore the reasons behind everyday phenomena.

## Question: Why do we yawn?

## The Science

Yawning is an involuntary opening of the mouth with a deep inhalation. Several theories explain it:

### Theory 1: Brain Cooling
- The jaw stretch increases blood flow to the brain
- Cool air inhalation helps lower brain temperature
- Like a radiator for your head

### Theory 2: Oxygen Regulation
- Older theory: body needs more oxygen
- Largely debunked: yawning does not significantly change blood oxygen levels

### Theory 3: Social Communication
- Yawning is contagious (seeing someone yawn makes you yawn)
- May signal tiredness or boredom to others
- Helps synchronize group behavior

### Theory 4: Ear Pressure
- Yawning opens the Eustachian tubes
- Equalizes pressure between the ear and throat

## How to Apply This Reasoning

When answering "why" questions:
1. Ask what is happening physically
2. Look for biological or chemical mechanisms
3. Consider evolutionary advantages
4. Check if multiple theories exist
5. Present the most accepted explanation

## Another Example

**Question**: Why do onions make us cry?
**Answer**: Onions release a sulfur compound (syn-propanethial-S-oxide) when cut. This gas reacts with moisture in your eyes to form a mild acid, triggering tear glands to flush it out.

"Why" questions build understanding by connecting effects to causes.`
  },
  {
    id: "comparison-reasoning",
    category: "Comparison",
    q: ["Compare two things", "Which is better comparison", "A versus B analysis"],
    title: "Comparison Reasoning",
    body: `Comparison reasoning evaluates two or more options by examining similarities, differences, strengths, and weaknesses.

## Example: Online Shopping vs In-Store Shopping

### Criteria for Comparison

1. Convenience
2. Price
3. Product inspection
4. Returns
5. Immediate gratification

### Side-by-Side Analysis

**Convenience**
- Online: Shop from anywhere, 24/7, no travel needed
- In-Store: Must travel, limited hours, but instant possession

**Price**
- Online: Easier to compare prices, frequent sales, no overhead markup
- In-Store: May have higher prices, but no shipping fees

**Product Inspection**
- Online: Rely on photos and reviews, cannot touch or try
- In-Store: Can touch, try, and inspect before buying

**Returns**
- Online: Must ship back, may take days
- In-Store: Return immediately for refund

**Immediate Gratification**
- Online: Must wait for delivery
- In-Store: Take it home right away

### When to Choose Each

**Choose Online When:**
- You know exactly what you want
- Price comparison is important
- Product is standardized (electronics, books)
- You are busy or far from stores

**Choose In-Store When:**
- You want to try before buying (clothes, furniture)
- You need it immediately
- You prefer personal customer service
- Product quality varies (fresh produce)

### Conclusion

Neither is universally better. The best choice depends on the product type, your priorities, and the situation.`
  },
  {
    id: "how-to-decision",
    category: "Decision Making",
    q: ["How to choose between options", "Decision making process", "How to decide"],
    title: "Decision Making Process",
    body: `Structured decision-making helps you evaluate options systematically and choose the best path forward.

## Example: Choosing a Programming Language to Learn

### Step 1: Define Your Goal
- What will you build?
- What is your timeline?
- What jobs are available?

### Step 2: List Options
- JavaScript (web development)
- Python (data science, AI)
- Java (enterprise, Android)
- Swift (iOS apps)

### Step 3: Evaluate Each Option

**JavaScript**
- Pros: Web front and back end, huge job market, many resources
- Cons: Can be confusing (async, type coercion), fast-changing ecosystem

**Python**
- Pros: Easy to learn, great for data science and AI, readable syntax
- Cons: Slower runtime, less common for mobile apps

**Java**
- Pros: Enterprise jobs, Android development, strong type system
- Cons: Verbose syntax, slower to write

**Swift**
- Pros: Beautiful syntax, Apple ecosystem, growing demand
- Cons: Limited to Apple platforms, smaller community

### Step 4: Apply Your Constraints
- Want a job fast? JavaScript has the most openings
- Interested in AI? Python is the standard
- Want to build iOS apps? Swift is the choice

### Step 5: Make a Decision
- Choose one and commit for at least 3 months
- You can always learn another language later

### Step 6: Review After Time
- Revisit your decision after 3 months
- Adjust if your goals changed

## General Framework

1. Define what "good" looks like
2. List all viable options
3. Create comparison criteria
4. Score each option
5. Consider constraints and trade-offs
6. Decide and commit
7. Review and adjust`
  },
  {
    id: "cause-and-effect-weather",
    category: "Science",
    q: ["Why does it rain?", "Cause of rain", "How does rain happen?"],
    title: "Cause and Effect: Why Does It Rain?",
    body: `Cause-and-effect reasoning traces the chain of events that produce a phenomenon.

## The Cause-and-Effect Chain

### Cause 1: Sun heats water bodies
- Oceans, lakes, and rivers absorb solar energy
- Water molecules gain kinetic energy

### Effect 1: Evaporation
- Water turns from liquid to water vapor
- Warm, moist air rises into the atmosphere

### Cause 2: Rising air cools
- Temperature decreases with altitude
- Air can hold less moisture when cold

### Effect 2: Condensation
- Water vapor forms tiny water droplets or ice crystals
- These become visible as clouds

### Cause 3: Droplets combine
- Small droplets collide and merge
- They become heavy enough to fall

### Effect 3: Precipitation
- Water falls as rain, snow, sleet, or hail
- Depends on temperature and conditions

## Verification

- Does this chain make physical sense? Yes
- Can we observe each step? Yes
- Are there exceptions? Yes (rain can also come from fronts and convection)

## Practical Application

Understanding cause and effect helps in:
- Weather forecasting
- Agriculture planning
- Disaster preparedness
- Understanding climate patterns`
  },
  {
    id: "logical-reasoning-puzzle",
    category: "Logic",
    q: ["Logical reasoning puzzle", "Logic puzzle", "Riddle solution"],
    title: "Logical Reasoning",
    body: `Logical reasoning applies rules of inference to draw conclusions from given information.

## Example Puzzle

If all cats are animals, and Tom is a cat, what can we conclude?

### Step 1: Identify Premises
- Premise 1: All cats are animals
- Premise 2: Tom is a cat

### Step 2: Apply Logic
- Since Tom is a cat, and all cats are animals
- Therefore, Tom is an animal

### Step 3: Verify
- The conclusion follows logically from the premises
- This is valid deductive reasoning

## Another Example

Some doctors are lawyers. All lawyers studied law. Does that mean all doctors studied law?

### Analysis
- Some doctors are lawyers (some overlap)
- All lawyers studied law
- But doctors who are not lawyers may not have studied law
- Conclusion: We cannot say all doctors studied law

## Common Logical Fallacies

1. **Affirming the Consequent**: "If it rains, the ground is wet. The ground is wet, so it rained." (Wrong: a sprinkler could cause it)

2. **Denying the Antecedent**: "If it rains, the ground is wet. It did not rain, so the ground is not wet." (Wrong: other things make ground wet)

3. **Ad Hominem**: Attacking the person instead of the argument

## Key Rules

- If the premises are true and the logic is valid, the conclusion must be true
- Always check if premises are actually true
- Watch out for hidden assumptions`
  },
  {
    id: "what-if-hypothetical",
    category: "Critical Thinking",
    q: ["What if I fail?", "Hypothetical question", "What would happen if"],
    title: "What-If Reasoning",
    body: `What-if reasoning explores hypothetical scenarios to understand potential outcomes and prepare for them.

## Framework for What-If Analysis

### Step 1: Define the Scenario
- What is the specific "what if" question?
- What are the assumptions?

### Step 2: Identify Possible Outcomes
- Best case scenario
- Worst case scenario
- Most likely scenario

### Step 3: Assess Likelihood and Impact
- How probable is each outcome?
- How severe would the impact be?

### Step 4: Plan Responses
- What can you do to increase positive outcomes?
- How can you mitigate negative outcomes?

## Example: What if I lose my job?

**Best Case**: Find a better job quickly with higher pay
**Worst Case**: Financial difficulty for several months
**Most Likely**: Take 1-3 months to find comparable employment

**Mitigation Steps**:
- Build an emergency fund (3-6 months of expenses)
- Keep skills updated
- Maintain professional network
- Have a backup plan (freelancing, part-time work)

## Benefits of What-If Thinking
1. Prepares you for unexpected events
2. Reduces anxiety through planning
3. Improves decision-making
4. Builds resilience`
  },
  {
    id: "practical-advice",
    category: "Practical Advice",
    q: ["How to save money", "Practical tips", "Life hack question"],
    title: "Practical Advice: Saving Money",
    body: `Practical advice applies knowledge to real-life situations for immediate benefit.

## The 50-30-20 Rule

### Framework
- 50% of income for needs (rent, food, utilities)
- 30% of income for wants (entertainment, dining out)
- 20% of income for savings and debt repayment

## Practical Steps

### Step 1: Track Spending
- Record every expense for one month
- Identify where money goes
- Find areas to cut back

### Step 2: Create a Budget
- Allocate money to categories
- Set spending limits
- Leave room for unexpected expenses

### Step 3: Automate Savings
- Set up automatic transfers on payday
- Pay yourself first
- Treat savings like a non-negotiable bill

### Step 4: Reduce Fixed Costs
- Negotiate bills (internet, phone, insurance)
- Switch to cheaper alternatives
- Downsize if possible

### Step 5: Build Emergency Fund
- Start with small goal: 1,000
- Build to 3-6 months of expenses
- Keep in easily accessible account

## Quick Wins
- Cancel unused subscriptions
- Cook at home more
- Use public transportation
- Buy generic brands
- Use cashback apps and rewards

## Common Mistakes
- Budgeting without tracking first
- Not accounting for irregular expenses
- Being too restrictive (leads to budget fatigue)
- Not having an emergency fund first

## Conclusion

Saving money is about consistent habits, not extreme deprivation. Start small, automate where possible, and review monthly.`
  },
  {
    id: "analyze-problem",
    category: "Problem Solving",
    q: ["How to analyze a problem", "Problem analysis", "Breaking down a problem"],
    title: "Problem Analysis",
    body: `Effective problem analysis breaks complex issues into manageable components.

## Framework: 5 Whys

### Origin
Developed by Sakichi Toyoda for Toyota. Used to find the root cause of problems.

### Example: Website is slow

**Why 1**: Why is the website slow?
- Because page load time exceeds 5 seconds

**Why 2**: Why does page load take 5 seconds?
- Because the database queries are slow

**Why 3**: Why are the database queries slow?
- Because there is no index on the user_id column

**Why 4**: Why is there no index?
- Because it was not included in the original schema

**Why 5**: Why was it not included?
- Because performance was not considered during design

### Root Cause
Lack of performance planning during schema design

### Solution
Add database index and implement performance reviews in development process

## Another Framework: Fishbone Diagram

### Categories to Investigate
1. People: Are people trained properly?
2. Process: Are processes efficient?
3. Technology: Are tools adequate?
4. Environment: Are external factors影响影响?

## Steps for Any Problem
1. Define the problem clearly
2. Gather relevant data
3. Brainstorm possible causes
4. Test each cause
5. Find the root cause
6. Develop solutions
7. Implement and monitor`
  },
  {
    id: "critical-thinking-media",
    category: "Critical Thinking",
    q: ["How to evaluate information", "Critical thinking about news", "Media literacy"],
    title: "Evaluating Information Critically",
    body: `Critical thinking about information helps distinguish reliable sources from misinformation.

## The CRAAP Test

### Currency
- When was the information published?
- Has it been updated?
- Are the links working?

### Relevance
- Does it relate to your question?
- Who is the intended audience?
- Is it at the right level for your needs?

### Authority
- Who is the author?
- What are their credentials?
- Is the publisher reputable?

### Accuracy
- Where does the information come from?
- Can you verify it with other sources?
- Are there citations or references?

### Purpose
- Why does this information exist?
- Is it to inform, persuade, sell, or entertain?
- Are there biases or conflicts of interest?

## Red Flags
1. No author or date listed
2. Emotional language instead of facts
3. No sources or citations
4. Too good to be true claims
5. Conspiracy theories without evidence
6. Urgency or pressure tactics

## Example Evaluation

**Claim**: "This food cures cancer!"

**Analysis**:
- Currency: Published 2 years ago, no updates
- Relevance: Related to health
- Authority: Written by a blogger, no medical credentials
- Accuracy: No scientific studies cited, contradicts medical consensus
- Purpose: Sells supplements (financial conflict)

**Verdict**: Unreliable. Seek information from medical institutions and peer-reviewed studies.

## Application
- Apply CRAAP to news articles, social media posts, and claims
- Cross-reference with multiple reliable sources
- Be especially skeptical of emotional or sensational claims`
  },
  {
    id: "sequential-reasoning",
    category: "Problem Solving",
    q: ["Step by step reasoning", "Sequential problem solving", "How to solve step by step"],
    title: "Sequential Reasoning",
    body: `Sequential reasoning breaks a process into ordered steps to ensure nothing is missed.

## Example: How to Learn a New Programming Language

### Step 1: Set a Clear Goal
- What will you build with this language?
- Set a specific project (e.g., "build a todo app")

### Step 2: Learn the Basics (Week 1-2)
- Variables and data types
- Control flow (if/else, loops)
- Functions
- Basic input/output

### Step 3: Build Something Simple (Week 3-4)
- Start with a small project
- Apply what you learned
- Google errors and problems
- Do not aim for perfection

### Step 4: Learn Key Concepts (Week 5-6)
- Data structures (arrays, objects)
- Error handling
- File I/O or API calls
- Testing basics

### Step 5: Build a Real Project (Week 7-8)
- Choose something meaningful to you
- Break it into small features
- Build one feature at a time
- Deploy it so others can use it

### Step 6: Join a Community
- Find others learning the same language
- Ask questions and help others
- Read other people's code
- Attend meetups or online groups

### Step 7: Keep Building
- Take on progressively harder projects
- Learn best practices and patterns
- Read the language documentation
- Stay curious and keep coding

## Key Principles
1. Start with why (purpose motivates learning)
2. Learn by doing, not just reading
3. Embrace errors as learning opportunities
4. Break large problems into small steps
5. Review and adjust your plan regularly`
  },
  {
    id: "cost-benefit-analysis",
    category: "Decision Making",
    q: ["Cost benefit analysis", "Is it worth it?", "Pros and cons analysis"],
    title: "Cost-Benefit Analysis",
    body: `Cost-benefit analysis compares the total expected costs against the total expected benefits of an action.

## Example: Should You Buy a Car?

### Step 1: Identify Costs
- Purchase price: 800,000
- Insurance: 20,000/year
- Gas: 3,000/month
- Maintenance: 15,000/year
- Parking: 1,000/month
- Total annual cost: approximately 71,000

### Step 2: Identify Benefits
- Convenience and time saved
- Comfort (air conditioning, personal space)
- Flexibility (go anywhere, anytime)
- Status or personal satisfaction

### Step 3: Quantify Benefits
- Time saved: 1 hour/day x 365 = 365 hours
- If your time is worth 200/hour, that is 73,000 in value
- Comfort and flexibility: subjective value

### Step 4: Compare
- Annual cost: 71,000
- Annual quantified benefit: 73,000
- Net benefit: 2,000 (plus unquantified benefits)

### Step 5: Consider Alternatives
- Public transport: 5,000/month = 60,000/year
- Ride-sharing: 40,000/year (depending on usage)
- Bicycle: 5,000/year (minimal)

### Step 6: Make Decision
- If convenience and flexibility are high priority: buy the car
- If cost savings are priority: use public transport
- If moderate usage: ride-sharing may be optimal

## Tips
- Quantify when possible, but acknowledge subjective factors
- Consider opportunity cost (what else could you do with the money?)
- Think long-term, not just immediate costs
- Include both monetary and non-monetary factors`
  },
  {
    id: "root-cause-analysis",
    category: "Problem Solving",
    q: ["Root cause analysis", "Finding the real problem", "Why is this happening"],
    title: "Root Cause Analysis",
    body: `Root cause analysis digs beneath surface symptoms to find the underlying cause of a problem.

## Methods

### Method 1: 5 Whys
Keep asking "why" until you reach the fundamental cause (see earlier example).

### Method 2: Pareto Analysis (80/20 Rule)
- 80% of problems come from 20% of causes
- Identify the most frequent issues
- Focus on fixing the top few causes

### Method 3: Fault Tree Analysis
- Start with the problem at the top
- Branch down into contributing factors
- Continue until you reach root causes

## Example: High Employee Turnover

**Symptom**: Employees are leaving at 40% annually

**Why 1**: Why are employees leaving?
- They receive better offers elsewhere

**Why 2**: Why do they get better offers?
- Our salaries are below market rate

**Why 3**: Why are salaries below market?
- We have not done a salary review in 3 years

**Why 4**: Why no salary review?
- Management does not see it as a priority

**Why 5**: Why is it not a priority?
- There is no system to track market rates and retention costs

**Root Cause**: Lack of a compensation review process

**Solution**: Implement annual salary benchmarking and review

## Benefits of Root Cause Analysis
1. Prevents recurring problems
2. Saves time and resources long-term
3. Improves processes and systems
4. Builds organizational learning`
  },
  {
    id: "ethical-reasoning",
    category: "Critical Thinking",
    q: ["Ethical dilemma", "Moral reasoning", "Right or wrong decision"],
    title: "Ethical Reasoning",
    body: `Ethical reasoning helps evaluate right and wrong in complex situations where values may conflict.

## Frameworks

### Framework 1: Utilitarianism
- Choose the action that produces the greatest good for the greatest number
- Focus on outcomes and consequences

### Framework 2: Deontological Ethics
- Focus on duties and rules
- Some actions are right or wrong regardless of outcome
- Example: lying is always wrong, even if it produces good results

### Framework 3: Virtue Ethics
- Focus on character and moral virtues
- Ask: "What would a virtuous person do?"
- Values: honesty, courage, compassion, justice

## Example: The Trolley Problem

A trolley is heading toward 5 people. You can pull a lever to divert it to a track where it will hit 1 person.

**Utilitarian View**: Pull the lever. Saving 5 lives at the cost of 1 produces the greatest good.

**Deontological View**: Do not pull the lever. Actively causing someone's death is wrong, even to save others.

**Virtue Ethics View**: What would a compassionate, courageous person do? Both options have merit.

## Application to Real Life

**Scenario**: You discover your company is polluting a river.

- **Utilitarian**: Report it. The environmental damage affects thousands.
- **Deontological**: You have a duty to tell the truth and protect the environment.
- **Virtue Ethics**: A courageous and honest person would report it.

## Key Questions
1. What are the consequences of each action?
2. What duties or rules apply?
3. What would a person of good character do?
4. Who are the stakeholders affected?
5. Are there any conflicting values?

Ethical reasoning does not always give clear answers, but it provides a structured way to think through difficult decisions.`
  },
  {
    id: "systems-thinking",
    category: "Problem Solving",
    q: ["Systems thinking", "How to think about complex problems", "Big picture thinking"],
    title: "Systems Thinking",
    body: `Systems thinking looks at how parts of a system interact to produce behavior, rather than looking at parts in isolation.

## Core Concepts

### Feedback Loops
- **Reinforcing loops**: Amplify change (snowball effect)
- **Balancing loops**: Stabilize the system (thermostat)

### Emergence
- The whole is greater than the sum of its parts
- System behavior cannot be predicted from individual components

### Mental Models
- How we think about the system affects our actions
- Challenging mental models leads to better solutions

## Example: Traffic Congestion

**Linear Thinking**: Build more roads to reduce traffic.

**Systems Thinking**:
- More roads attract more drivers (reinforcing loop)
- More drivers create more congestion
- Congestion pushes people to public transport (balancing loop)
- Better public transport reduces cars on road

**Better Solution**: Improve public transportation instead of just building roads.

## Another Example: Student Performance

**Linear Thinking**: Give more homework to improve grades.

**Systems Thinking**:
- More homework reduces sleep (reinforcing loop)
- Less sleep reduces focus and retention
- Lower grades lead to more homework assigned
- This creates a vicious cycle

**Better Solution**: Consider the whole system - sleep, nutrition, teaching quality, and manageable workload.

## Applying Systems Thinking
1. Map the system: identify components and connections
2. Look for feedback loops
3. Identify leverage points (places where small changes have big effects)
4. Consider second and third-order effects
5. Test mental models against reality`
  },
  {
    id: "probability-reasoning",
    category: "Math",
    q: ["Probability question", "Chance of happening", "Likelihood reasoning"],
    title: "Probability Reasoning",
    body: `Probability reasoning helps assess the likelihood of events and make informed decisions under uncertainty.

## Example: Should You Bring an Umbrella?

**Given Information**:
- 30% chance of rain today
- You will be outside for 4 hours
- Getting wet would ruin your day (high cost)

**Analysis**:
- 30% is not low enough to ignore (about 1 in 3 days like this, it rains)
- The cost of being unprepared is high
- The cost of carrying an umbrella is low (minor inconvenience)

**Decision**: Bring the umbrella

## Key Concepts

### Independent Events
- One event does not affect the other
- Example: flipping a coin twice

### Dependent Events
- One event affects the probability of the other
- Example: drawing cards without replacement

### Expected Value
- Multiply each outcome by its probability
- Sum all outcomes
- Helps make rational decisions under uncertainty

## Example: Lottery Ticket

- Cost: 100
- Prize: 1,000,000
- Odds of winning: 1 in 10,000,000

**Expected Value**:
- (1/10,000,000) x 1,000,000 = 0.10
- Minus cost: 0.10 - 100 = -99.90

**Conclusion**: On average, you lose 99.90 per ticket. Not a good investment.

## Common Probability Mistakes
1. **Gambler's Fallacy**: "I have lost 5 times, so I am due to win" - each event is independent
2. **Base Rate Ignorance**: Ignoring how common something is in general
3. **Confusing Probability with Frequency**: 50% chance does not mean it happens every other time
4. **Anchoring**: Being influenced by irrelevant numbers

## Application
- Assess risks before making decisions
- Use data and statistics, not gut feeling
- Consider both probability and impact
- Update your beliefs as new information arrives`
  },
  {
    id: "creative-problem-solving",
    category: "Problem Solving",
    q: ["How to think creatively", "Creative problem solving", "Brainstorming techniques"],
    title: "Creative Problem Solving",
    body: `Creative problem solving uses unconventional approaches to find solutions that traditional thinking misses.

## Techniques

### Technique 1: Brainstorming
- Generate as many ideas as possible
- No criticism during idea generation
- Build on others' ideas
- Wild ideas are encouraged

### Technique 2: SCAMPER Method
- **S**ubstitute: What can you replace?
- **C**ombine: What can you merge?
- **A**dapt: What can you modify?
- **M**odify/Magnify: What can you change the scale of?
- **P**ut to other uses: How else can it be used?
- **E**liminate: What can you remove?
- **R**everse: What if you did the opposite?

### Technique 3: Reverse Thinking
- Instead of asking "How do I solve X?"
- Ask "How do I cause X?" or "How do I make X worse?"
- Then reverse those answers

## Example: Improve Customer Retention

**SCAMPER Analysis**:
- Substitute: Replace annual contracts with monthly
- Combine: Combine product with free training
- Adapt: Adapt pricing for different customer segments
- Modify: Modify the onboarding experience
- Put to other uses: Use customer data for personalized recommendations
- Eliminate: Remove unnecessary steps in signup
- Reverse: Instead of customers contacting support, proactively reach out to them

**Creative Solution**: Implement a proactive customer success program that checks in with customers before problems arise.

## Why Creative Thinking Works
1. Challenges assumptions
2. Explores possibilities traditional analysis misses
3. Finds innovative solutions to persistent problems
4. Builds competitive advantage`
  },
  {
    id: "data-driven-reasoning",
    category: "Problem Solving",
    q: ["How to use data for decisions", "Data-driven decision making", "Analyzing data"],
    title: "Data-Driven Reasoning",
    body: `Data-driven reasoning uses evidence and metrics to guide decisions rather than intuition or opinion.

## Framework

### Step 1: Define the Question
- What decision are you trying to make?
- What data do you need?

### Step 2: Collect Data
- Internal data: sales, usage, customer feedback
- External data: market research, benchmarks
- Ensure data quality and relevance

### Step 3: Analyze Data
- Look for patterns and trends
- Calculate key metrics
- Identify significant findings

### Step 4: Draw Conclusions
- What does the data tell you?
- Are there alternative explanations?
- What are the limitations?

### Step 5: Take Action
- Implement the decision based on data
- Measure results
- Adjust if needed

## Example: Should We Launch Feature X?

**Data Collected**:
- Survey: 70% of users say they want it
- Competitor analysis: 3 of 5 competitors offer it
- Development cost: 2 months of engineering time
- Projected revenue increase: 15%

**Analysis**:
- Strong user demand (70%)
- Competitive pressure (3/5 have it)
- ROI calculation: revenue increase exceeds development cost

**Decision**: Launch Feature X

**Measurement**:
- Track feature usage after launch
- Compare revenue before and after
- Gather user feedback
- Adjust based on results

## Benefits
1. Reduces bias and gut-feeling decisions
2. Provides objective basis for discussion
3. Enables measurement of results
4. Builds organizational learning
5. Increases accountability`
  },
  {
    id: "analytical-reasoning",
    category: "Logic",
    q: ["How to analyze arguments", "Analytical reasoning", "Evaluating claims"],
    title: "Analytical Reasoning",
    body: `Analytical reasoning examines arguments and claims to determine their validity and soundness.

## Structure of an Argument

1. **Premise**: The evidence or reasons given
2. **Conclusion**: What the argument claims
3. **Assumption**: Unstated beliefs that support the argument

## Example

**Argument**: "We should ban social media for children under 13 because it harms their mental health."

### Analysis

**Premise 1**: Social media harms children's mental health
- Evidence: Studies show correlation between social media use and anxiety/depression in teens
- Quality: Multiple studies support this, though causation is debated

**Premise 2**: Children under 13 are particularly vulnerable
- Evidence: Brain development research shows limited self-regulation in young children
- Quality: Well-supported by developmental psychology

**Assumption**: Banning social media would effectively reduce harm
- Question: Would children find ways around the ban?
- Question: Would it push activity underground where it is less safe?

**Conclusion**: Banning social media for children under 13 would reduce mental health harm
- Valid if premises are true and assumption holds
- But enforcement and alternatives need consideration

## Red Flags in Arguments
1. **Emotional language**: "This is outrageous!" instead of facts
2. **False dilemma**: Presenting only two options when more exist
3. **Slippery slope**: "If X happens, then Y and Z will definitely follow"
4. **Appeal to authority**: "Expert X says so, therefore it is true"
5. **Ad hominem**: Attacking the person instead of the argument

## Application
- Identify the conclusion: What is being argued?
- List the premises: What evidence supports it?
- Check assumptions: What unstated beliefs are there?
- Evaluate evidence: Is it strong, relevant, and sufficient?
- Consider alternatives: Are there other explanations?
- Draw your own conclusion based on the analysis`
  },
  {
    id: "workplace-ethics-dilemma",
    category: "Ethics",
    q: ["Workplace ethics dilemma", "Ethical problem at work", "Should I report my boss?"],
    title: "Workplace Ethics Dilemma",
    body: `Workplace ethics dilemmas require balancing personal integrity with professional relationships and consequences.

## Scenario

You discover your manager is inflating expense reports, claiming personal meals as business meetings. You have a good relationship with them and they recently recommended you for a promotion.

## Stakeholders Affected

1. **You**: Your career, integrity, and relationship with manager
2. **Manager**: Job, reputation, and livelihood
3. **Company**: Financial resources and trust
4. **Team**: Work environment and morale
5. **Shareholders/Owners**: Company resources

## Ethical Frameworks Applied

### Utilitarian Analysis
- **Action**: Report the behavior
- **Consequences**: Company saves money, manager faces consequences, you may face retaliation
- **Net outcome**: Greater good for company, but personal cost

### Deontological Analysis
- **Duty**: You have a duty to be honest and protect company resources
- **Rule**: Falsifying expenses is wrong regardless of consequences
- **Action**: Report based on principle

### Virtue Ethics Analysis
- **Character**: What would an honest, courageous person do?
- **Values**: Integrity, loyalty, justice
- **Tension**: Loyalty to manager vs honesty to company

## Possible Actions

### Option 1: Confront Manager Directly
- Pros: Gives them chance to correct, preserves relationship
- Cons: They may deny or retaliate, no documentation

### Option 2: Report to HR or Compliance
- Pros: Proper channel, documentation, protects company
- Cons: Damages relationship, potential retaliation

### Option 3: Anonymous Tip
- Pros: Protects you, still addresses the issue
- Cons: Less direct, may not be taken seriously

### Option 4: Do Nothing
- Pros: Preserves relationship, avoids conflict
- Cons: Compromises your integrity, company continues losing money

## Recommended Approach

1. Document what you observed (dates, amounts, specifics)
2. Consult company ethics policy
3. Report through proper channels (HR, compliance hotline, or anonymous reporting)
4. Focus on facts, not accusations
5. Be prepared for any outcome

## Key Considerations

- Most companies have anti-retaliation policies
- Reporting protects the company and other employees
- Your integrity is your most valuable asset
- Doing the right thing is rarely easy but always right

Ethical dilemmas at work test our values. The best approach balances honesty, courage, and practical wisdom.`
  },
  {
    id: "supply-demand-problem",
    category: "Economics",
    q: ["Supply and demand problem", "Economic reasoning", "Price change analysis"],
    title: "Supply and Demand Analysis",
    body: `Supply and demand analysis helps understand how markets determine prices and quantities.

## Scenario

A popular smartphone manufacturer faces a situation where a key component (microchips) becomes scarce due to a factory fire. Meanwhile, a competitor launches a revolutionary new phone.

## Analysis Framework

### Step 1: Identify Supply Factors
- **Supply decrease**: Factory fire reduces microchip availability
- **Impact**: Production capacity reduced by 30%
- **Timeline**: 3-6 months to repair factory

### Step 2: Identify Demand Factors
- **Demand increase**: Competitor launch creates buzz for smartphones
- **Consumer interest**: Overall smartphone demand rises
- **Substitution**: Some consumers may switch brands

### Step 3: Determine Price Effects

**Supply Effect**:
- Lower supply with constant demand = higher prices
- Estimated price increase: 15-20%

**Demand Effect**:
- Higher demand with constant supply = higher prices
- Estimated price increase: 10-15%

**Combined Effect**:
- Both forces push prices up
- Estimated total price increase: 25-35%

### Step 4: Predict Quantity Effects

**Production**:
- Company produces fewer units
- Estimated reduction: 30%

**Sales Volume**:
- Higher prices reduce quantity demanded
- Estimated reduction: 15-20%

### Step 5: Market Response

**Short-term**:
- Prices rise immediately
- Scarcity creates urgency
- Scalpers may exploit shortage

**Medium-term**:
- Factory repairs increase supply
- Competitor production meets demand
- Prices stabilize

**Long-term**:
- Companies diversify suppliers
- New factories built
- Market equilibrium restored

## Conclusion

The simultaneous supply decrease and demand increase create strong upward pressure on prices. The company should manage inventory carefully, communicate with customers, and accelerate alternative sourcing.

Supply and demand analysis provides a framework for understanding market dynamics and making informed business decisions.`
  },
  {
    id: "time-management-problem",
    category: "Productivity",
    q: ["Time management problem", "How to manage time better", "Productivity analysis"],
    title: "Time Management Problem Analysis",
    body: `Effective time management requires analyzing how time is spent and optimizing for maximum productivity.

## Scenario

A college student works part-time, studies for exams, and wants to maintain a social life. They feel overwhelmed and consistently miss deadlines.

## Step 1: Time Audit

**Current Time Allocation** (per week):
- Sleep: 56 hours (8 hours/day)
- Classes: 15 hours
- Part-time work: 20 hours
- Commuting: 10 hours
- Social media: 14 hours (2 hours/day)
- Socializing: 7 hours
- Studying: 10 hours
- Personal care: 7 hours
- Free time: 3 hours

**Total accounted**: 142 hours
**Total available**: 168 hours (24 x 7)
**Unaccounted**: 26 hours (likely screen time and inefficiency)

## Step 2: Identify Problems

### Problem 1: Excessive Social Media
- 14 hours/week is excessive
- Creates distraction and comparison anxiety
- Contributes to procrastination

### Problem 2: Inefficient Study Time
- 10 hours for a full course load is low
- Likely includes distracted, unproductive time
- No structured study plan

### Problem 3: No Buffer Time
- Schedule is completely full
- No time for unexpected events
- Creates constant stress

## Step 3: Apply Time Management Frameworks

### Eisenhower Matrix
- **Urgent + Important**: Exam deadlines, work shifts
- **Important + Not Urgent**: Studying, exercise, relationships
- **Urgent + Not Important**: Some messages, minor requests
- **Neither**: Excessive social media, TV

### Pomodoro Technique
- 25-minute focused work sessions
- 5-minute breaks between sessions
- 15-30 minute break after 4 sessions
- Increases focus and reduces burnout

### Time Blocking
- Block specific hours for specific activities
- Protect study time like a class
- Schedule social media as a treat, not default

## Step 4: Develop New Schedule

**Optimized Time Allocation**:
- Sleep: 56 hours
- Classes: 15 hours
- Work: 20 hours
- Commuting: 10 hours
- Studying: 20 hours (structured, focused)
- Social media: 5 hours (restricted to breaks)
- Socializing: 7 hours
- Personal care: 7 hours
- Buffer time: 10 hours
- Free time: 18 hours

## Step 5: Implementation

### Week 1-2
- Install app blocker for social media during study time
- Create study schedule and stick to it
- Say no to one social commitment per week

### Week 3-4
- Review and adjust schedule
- Measure productivity improvement
- Celebrate small wins

## Results

- Study time doubled (10 to 20 hours)
- Social media cut by 65%
- Buffer time added for unexpected events
- Less stress, better performance

Time management is not about doing more things; it is about doing the right things efficiently.`
  },
  {
    id: "resource-allocation",
    category: "Problem Solving",
    q: ["How to allocate resources", "Resource allocation problem", "Limited resources decision"],
    title: "Resource Allocation Problem",
    body: `Resource allocation involves distributing limited resources to maximize outcomes.

## Scenario

A small business has 100,000 budget to invest. They can choose from three options:
1. New marketing campaign
2. Employee training program
3. Technology upgrade

## Step 1: Define Criteria

1. Return on Investment (ROI)
2. Time to see results
3. Risk level
4. Long-term vs short-term benefits
5. Employee impact

## Step 2: Analyze Each Option

### Option 1: Marketing Campaign (100,000)
- **ROI**: 200% within 6 months
- **Time**: 1-2 months to see results
- **Risk**: Medium (depends on execution)
- **Benefits**: Short-term revenue boost
- **Impact**: Minimal employee impact

### Option 2: Employee Training (100,000)
- **ROI**: 150% within 12 months
- **Time**: 3-6 months for full impact
- **Risk**: Low (employees may leave)
- **Benefits**: Long-term capability building
- **Impact**: High employee satisfaction

### Option 3: Technology Upgrade (100,000)
- **ROI**: 180% within 9 months
- **Time**: 2-3 months for implementation
- **Risk**: Low-Medium (integration challenges)
- **Benefits**: Efficiency gains, cost savings
- **Impact**: Moderate employee learning curve

## Step 3: Score Each Option (1-10)

| Criterion | Weight | Marketing | Training | Tech |
|-----------|--------|-----------|----------|------|
| ROI | 30% | 9 | 7 | 8 |
| Time to results | 20% | 8 | 5 | 7 |
| Risk | 20% | 6 | 8 | 7 |
| Long-term benefit | 15% | 5 | 9 | 8 |
| Employee impact | 15% | 3 | 10 | 6 |

## Step 4: Calculate Weighted Scores

**Marketing**: (9 x 0.3) + (8 x 0.2) + (6 x 0.2) + (5 x 0.15) + (3 x 0.15) = 6.75

**Training**: (7 x 0.3) + (5 x 0.2) + (8 x 0.2) + (9 x 0.15) + (10 x 0.15) = 7.35

**Tech**: (8 x 0.3) + (7 x 0.2) + (7 x 0.2) + (8 x 0.15) + (6 x 0.15) = 7.25

## Step 5: Decision

**Training scores highest (7.35)**

However, consider splitting the budget:
- 60,000 for Training (employee development)
- 40,000 for Tech upgrade (efficiency gains)

This balances short-term needs with long-term capability building.

## Conclusion

Resource allocation requires systematic analysis of options against clear criteria. The best decision balances multiple factors and considers creative solutions like splitting resources.`
  },
  {
    id: "risk-assessment",
    category: "Decision Making",
    q: ["Risk assessment analysis", "How to evaluate risk", "Risk vs reward analysis"],
    title: "Risk Assessment Analysis",
    body: `Risk assessment evaluates potential negative outcomes and their likelihood to inform decisions.

## Scenario

An entrepreneur considers starting an online food delivery business in a mid-sized Philippine city.

## Step 1: Identify Risks

### Market Risks
- Low customer adoption
- Competition from established players
- Economic downturn reducing spending

### Operational Risks
- Delivery delays
- Food quality issues
- Driver reliability

### Financial Risks
- High startup costs
- Low profit margins
- Cash flow problems

### Legal Risks
- Food safety regulations
- Business permit issues
- Liability for accidents

## Step 2: Assess Likelihood and Impact

| Risk | Likelihood | Impact | Risk Score |
|------|------------|--------|------------|
| Low adoption | Medium (3) | High (4) | 12 |
| Competition | High (4) | High (4) | 16 |
| Delivery delays | Medium (3) | Medium (3) | 9 |
| Cash flow issues | High (4) | High (4) | 16 |
| Food safety issues | Low (2) | High (4) | 8 |
| Driver reliability | Medium (3) | Medium (3) | 9 |

## Step 3: Develop Mitigation Strategies

### For High-Risk Items (Score 12+):

**Low Customer Adoption**
- Start with a small area
- Offer first-order discounts
- Partner with popular restaurants
- Use social media marketing

**Competition**
- Focus on underserved areas
- Offer better customer service
- Create loyalty programs
- Differentiate with unique features

**Cash Flow Problems**
- Start with minimal investment
- Secure backup funding
- Monitor expenses closely
- Maintain 3-month reserve

## Step 4: Calculate Expected Value

**Scenario Analysis**:

Best Case (30% probability):
- Revenue: 500,000/month
- Profit: 100,000/month
- Expected value: 30,000/month

Base Case (50% probability):
- Revenue: 300,000/month
- Profit: 50,000/month
- Expected value: 25,000/month

Worst Case (20% probability):
- Revenue: 100,000/month
- Loss: 20,000/month
- Expected value: -4,000/month

**Total Expected Value**: 30,000 + 25,000 - 4,000 = 51,000/month

## Step 5: Decision Framework

### Accept if:
- Expected value is positive
- Risks are manageable
- You have adequate reserves
- You understand the downsides

### Reject if:
- Risk exceeds your tolerance
- Downside is catastrophic
- Better opportunities exist
- You cannot afford to lose the investment

## Conclusion

This business opportunity has a positive expected value of 51,000/month. With proper mitigation strategies and adequate reserves, the risks are manageable. The entrepreneur should proceed with a phased approach, starting small and scaling based on results.

Risk assessment does not eliminate risk; it helps you understand and manage it effectively.`
  },
  {
    id: "comparative-advantage",
    category: "Economics",
    q: ["Comparative advantage", "Should I specialize?", "Division of labor reasoning"],
    title: "Comparative Advantage Analysis",
    body: `Comparative advantage explains why specialization and trade benefit everyone.

## Concept

A person or country has comparative advantage when they can produce something at a lower opportunity cost than others. Even if one person is better at everything, both benefit from specializing.

## Example: Freelancer Decision

**Maria** is a talented web designer who is also good at accounting.

**Monthly Work Output**:
- Web design: 4 projects at 5,000 each = 20,000
- Bookkeeping: 10 clients at 2,000 each = 20,000
- Total if doing both: 40,000

**Opportunity Costs**:
- 1 web design project = 2.5 bookkeeping clients (4/10)
- 1 bookkeeping client = 0.4 web design projects (10/4)

**Maria** has comparative advantage in **web design** (lower opportunity cost).

**Juan** is a bookkeeper who also does basic web design.

**Monthly Work Output**:
- Web design: 2 projects at 5,000 each = 10,000
- Bookkeeping: 8 clients at 2,000 each = 16,000
- Total if doing both: 26,000

**Opportunity Costs**:
- 1 web design project = 4 bookkeeping clients (2/8)
- 1 bookkeeping client = 0.25 web design projects (8/2)

**Juan** has comparative advantage in **bookkeeping** (lower opportunity cost).

## Specialization Outcome

**Maria** specializes in web design: 4 x 5,000 = 20,000
**Juan** specializes in bookkeeping: 8 x 2,000 = 16,000
**Total combined output**: 36,000

They can then trade services. If Maria pays Juan 3,000 for bookkeeping:
- Maria gains: 3,000 saved vs doing it herself
- Juan gains: 1,000 more than his usual rate

## Key Insight

Both parties benefit when each specializes in what they do best relative to alternatives. This is true even when one person is objectively better at everything.

## Application

- **Individuals**: Focus on your strengths, outsource weaknesses
- **Businesses**: Specialize in core competencies
- **Countries**: Trade for goods they produce less efficiently

Comparative advantage is one of the most powerful economic concepts, explaining why specialization and trade create wealth.`
  },
  {
    id: "game-theory-prisoners-dilemma",
    category: "Logic",
    q: ["Prisoners dilemma", "Game theory reasoning", "Cooperation vs competition"],
    title: "Game Theory: Prisoner's Dilemma",
    body: `The Prisoner's Dilemma illustrates why individuals might not cooperate even when it is in their best interest.

## The Scenario

Two criminals are arrested and questioned separately. They have two options: **cooperate** (stay silent) or **defect** (betray the other).

## Payoff Matrix

|  | Prisoner B Stays Silent | Prisoner B Betrays |
|--|------------------------|-------------------|
| **A Stays Silent** | Both get 1 year | A gets 3 years, B goes free |
| **A Betrays** | A goes free, B gets 3 years | Both get 2 years |

## Analysis

### Individual Rationality

From Prisoner A's perspective:
- If B stays silent: I should betray (0 vs 1 year)
- If B betrays: I should betray (2 vs 3 years)

**Betraying is always better for the individual**, regardless of what B does.

### Collective Outcome

- Both stay silent: 2 total years (best collective outcome)
- Both betray: 4 total years
- One betrays: 3 total years

**Both staying silent is best collectively**, but both betraying is the individual rational choice.

## Real-World Examples

### Business Pricing
- Two companies can keep prices high (cooperate) or lower them (defect)
- Both lowering prices leads to a price war (worse for both)

### Arms Race
- Two countries can limit weapons (cooperate) or build more (defect)
- Both building more leads to expensive arms race

### Environmental Agreements
- Countries can reduce emissions (cooperate) or continue polluting (defect)
- Free-riding on others' cooperation is tempting

## Repeated Games

In real life, interactions are repeated. This changes the calculus:
- Reputation matters
- Retaliation is possible
- Cooperation can emerge through tit-for-tat strategies

## Lessons

1. Individual rationality can lead to collective irrationality
2. Communication and enforcement help achieve cooperation
3. Long-term relationships promote cooperative behavior
4. Institutions and agreements help overcome the dilemma

The Prisoner's Dilemma explains many real-world situations where cooperation fails despite being mutually beneficial.`
  },
  {
    id: "decision-tree-analysis",
    category: "Decision Making",
    q: ["Decision tree analysis", "How to make complex decisions", "Structured decision making"],
    title: "Decision Tree Analysis",
    body: `Decision trees map out choices and their possible outcomes to find the optimal decision.

## Scenario

A company must decide whether to launch a new product.

## Decision Tree Structure

### Decision Node 1: Launch or Not?

**Option A**: Do not launch
- Outcome: No revenue, no cost
- Value: 0

**Option B**: Launch

### Chance Node 1: Market Response

**Branch B1**: High demand (40% probability)
- Revenue: 500,000
- Profit: 200,000

**Branch B2**: Medium demand (35% probability)
- Revenue: 300,000
- Profit: 50,000

**Branch B3**: Low demand (25% probability)
- Revenue: 100,000
- Loss: 50,000

## Calculate Expected Values

### Option A (Do Not Launch)
Expected Value = 0

### Option B (Launch)
Expected Value = (0.40 x 200,000) + (0.35 x 50,000) + (0.25 x -50,000)
= 80,000 + 17,500 - 12,500
= 85,000

## Decision

Since 85,000 > 0, the company should **launch the product**.

## Adding More Complexity

### Decision Node 2: Marketing Budget

**Branch B1a**: High marketing (100,000 budget)
- High demand: 55% probability
- Medium demand: 30% probability
- Low demand: 15% probability

**Branch B1b**: Low marketing (50,000 budget)
- High demand: 30% probability
- Medium demand: 40% probability
- Low demand: 30% probability

### Expected Values with Marketing Options

**High Marketing**:
(0.55 x 250,000) + (0.30 x 100,000) + (0.15 x 0) - 100,000
= 137,500 + 30,000 + 0 - 100,000
= 67,500

**Low Marketing**:
(0.30 x 200,000) + (0.40 x 50,000) + (0.30 x -50,000) - 50,000
= 60,000 + 20,000 - 15,000 - 50,000
= 15,000

## Revised Decision

Launch with **high marketing** (67,500 expected value).

## Benefits of Decision Trees

1. Visual representation of complex decisions
2. Quantifies uncertainty with probabilities
3. Considers multiple outcomes
4. Documents assumptions
5. Facilitates stakeholder communication

Decision trees turn gut-feeling decisions into structured, data-driven choices.`
  },
  {
    id: "systems-failure-analysis",
    category: "Problem Solving",
    q: ["Systems failure analysis", "Why did the system fail?", "Root cause of failure"],
    title: "Systems Failure Analysis",
    body: `Systems failure analysis examines how complex systems break down to prevent future failures.

## Scenario

A bank's online banking system experienced a 6-hour outage during peak hours.

## Step 1: Timeline Reconstruction

- 2:00 PM: Database server shows high CPU usage
- 2:15 PM: Response times increase to 10 seconds
- 2:30 PM: Error rates spike above 50%
- 2:45 PM: System becomes unresponsive
- 3:00 PM: Emergency team assembled
- 5:00 PM: Root cause identified
- 8:00 PM: System restored

## Step 2: Immediate Causes

### Technical Causes
- Database connection pool exhausted
- Memory overflow on application servers
- Cascading failure to dependent services

### Contributing Factors
- No circuit breaker implementation
- Insufficient load testing
- Missing auto-scaling rules

## Step 3: Root Cause Analysis (5 Whys)

**Why 1**: Why did the system become unresponsive?
- Because database connections were exhausted

**Why 2**: Why were connections exhausted?
- Because a slow query consumed all available connections

**Why 3**: Why was the slow query not terminated?
- Because there was no query timeout configuration

**Why 4**: Why was there no timeout?
- Because the feature was added without performance testing

**Why 5**: Why was it deployed without testing?
- Because there was no mandatory performance testing in the deployment process

## Step 4: Contributing Factors

### Process Failures
- No code review for performance impact
- No load testing requirement
- No deployment checklist

### Technical Debt
- Legacy connection pooling
- No monitoring alerts for slow queries
- No automatic query termination

### Human Factors
- Developer unfamiliar with performance best practices
- Time pressure to deliver feature
- No on-call performance engineer

## Step 5: Solutions

### Immediate Fixes (Week 1)
- Implement query timeout (30 seconds)
- Add connection pool monitoring
- Set up performance alerts

### Short-term (Month 1)
- Implement circuit breakers
- Add load testing to CI/CD
- Create performance review checklist

### Long-term (Quarter 1)
- Database optimization
- Auto-scaling implementation
- Performance engineering training

## Step 6: Prevention

### Process Changes
- Mandatory performance testing for database changes
- Code review includes performance checklist
- Canary deployments for risky changes

### Technical Changes
- Real-time performance monitoring
- Automated query optimization
- Graceful degradation under load

## Conclusion

This failure resulted from a combination of technical debt, process gaps, and human factors. The root cause was the lack of performance testing, but multiple layers of defense failed to prevent or detect the issue.

Systems failure analysis reveals that most failures are not caused by single events but by multiple small failures combining. Prevention requires addressing all layers.`
  },
  {
    id: "opportunity-cost-analysis",
    category: "Economics",
    q: ["Opportunity cost analysis", "What am I giving up?", "Cost of choices"],
    title: "Opportunity Cost Analysis",
    body: `Opportunity cost is the value of the next best alternative foregone when making a choice.

## Concept

Every choice has a cost: what you give up by choosing that option. This cost is not always monetary.

## Example: Career Decision

**Situation**: Ana has two job offers after graduation.

**Offer A**: Software Developer at a startup
- Salary: 40,000/month
- Benefits: Stock options, flexible hours
- Learning: Fast-paced, varied technologies

**Offer B**: Corporate Analyst at a bank
- Salary: 50,000/month
- Benefits: Health insurance, bonuses
- Learning: Structured training, stable career

## Opportunity Cost Analysis

### If Ana Chooses Offer A (Startup):
- **Direct cost**: 40,000/month salary
- **Opportunity cost**: 50,000/month salary = 10,000/month lost
- **Total economic cost**: 50,000/month

### If Ana Chooses Offer B (Corporate):
- **Direct cost**: 50,000/month salary
- **Opportunity cost**: Stock options, flexibility, learning = unknown value
- **Total economic cost**: 50,000 + value of foregone options

## Hidden Opportunity Costs

### Time
- 10 hours/week commuting = 40 hours/month
- Could be used for learning, freelancing, or rest

### Energy
- High-stress job may reduce capacity for side projects
- Lower stress job may allow more personal development

### Network
- Startup: Tech entrepreneur network
- Corporate: Finance professional network

## Decision Framework

### Quantify What You Can
- Salary differences
- Benefit values
- Time costs

### Consider Intangibles
- Job satisfaction
- Work-life balance
- Career growth potential
- Personal alignment

### Think Long-term
- 5-year career trajectory
- Skills development
- Network building
- Financial security

## Conclusion

Ana should consider not just the salary difference but the total opportunity cost of each choice. If she values learning and flexibility, the startup may be worth the salary sacrifice. If she values stability and benefits, the corporate role may be better.

Understanding opportunity cost helps make more informed decisions by considering what you are giving up, not just what you are gaining.`
  },
  {
    id: "causal-reasoning-pandemic",
    category: "Science",
    q: ["How do pandemics spread?", "Pandemic cause and effect", "Virus transmission reasoning"],
    title: "Causal Reasoning: Pandemic Spread",
    body: `Causal reasoning traces the chain of events that lead to pandemic spread.

## The Phenomenon

A new virus emerges and spreads rapidly across the globe, causing a pandemic.

## Causal Chain

### Step 1: Virus Emergence
- **Cause**: Virus jumps from animal to human (zoonotic spillover)
- **Effect**: First human cases appear
- **Factors**: Wet markets, habitat encroachment, wildlife trade

### Step 2: Local Transmission
- **Cause**: Infected people contact others
- **Effect**: Community spread begins
- **Factors**: Close contact, poor ventilation, asymptomatic carriers

### Step 3: Exponential Growth
- **Cause**: Each infected person infects 2-3 others (R0 = 2-3)
- **Effect**: Case numbers double every few days
- **Factors**: No immunity, highly contagious, modern travel

### Step 4: International Spread
- **Cause**: Infected travelers cross borders
- **Effect**: Virus reaches multiple countries
- **Factors**: Global aviation, asymptomatic transmission, delayed detection

### Step 5: Healthcare Overload
- **Cause**: Cases exceed hospital capacity
- **Effect**: Higher mortality, overwhelmed healthcare workers
- **Factors**: Limited beds, equipment, staff

## Mitigation Points

### Prevention (Step 1-2)
- Wildlife trade regulation
- Early surveillance systems
- Rapid testing and isolation

### Containment (Step 3-4)
- Contact tracing
- Quarantine measures
- Travel restrictions

### Mitigation (Step 5)
- Healthcare capacity expansion
- Vaccination campaigns
- Public health messaging

## Verification

- Does this causal chain make biological sense? Yes
- Can we observe each step in real pandemics? Yes
- Are there alternative explanations? Yes (some viruses do not cause pandemics)

## Lessons

1. Prevention is more effective than response
2. Early action saves lives and resources
3. Global cooperation is essential
4. Healthcare capacity is critical
5. Communication and trust matter

Causal reasoning helps us understand how pandemics unfold and where to intervene for maximum impact.`
  },
  {
    id: "weighted-decision-matrix",
    category: "Decision Making",
    q: ["Weighted decision matrix", "How to choose between options", "Structured decision making"],
    title: "Weighted Decision Matrix",
    body: `A weighted decision matrix evaluates options by scoring them against weighted criteria.

## Scenario

Choosing a new laptop for work and personal use.

## Step 1: Identify Options

- **Option A**: MacBook Air M2
- **Option B**: Dell XPS 13
- **Option C**: Lenovo ThinkPad X1

## Step 2: Identify Criteria

1. Performance
2. Portability
3. Battery life
4. Price
5. Build quality
6. Keyboard

## Step 3: Assign Weights (Total = 100%)

| Criterion | Weight | Reason |
|-----------|--------|--------|
| Performance | 25% | Primary work tool |
| Portability | 20% | Travel frequently |
| Battery life | 20% | Work remotely |
| Price | 15% | Budget matters |
| Build quality | 10% | Durability |
| Keyboard | 10% | Lots of typing |

## Step 4: Score Each Option (1-10)

| Criterion | MacBook | Dell | Lenovo |
|-----------|---------|------|--------|
| Performance | 9 | 8 | 8 |
| Portability | 9 | 8 | 7 |
| Battery life | 10 | 7 | 8 |
| Price | 5 | 7 | 7 |
| Build quality | 9 | 8 | 9 |
| Keyboard | 7 | 8 | 10 |

## Step 5: Calculate Weighted Scores

### MacBook Air M2
(9 x 0.25) + (9 x 0.20) + (10 x 0.20) + (5 x 0.15) + (9 x 0.10) + (7 x 0.10)
= 2.25 + 1.80 + 2.00 + 0.75 + 0.90 + 0.70
= **8.40**

### Dell XPS 13
(8 x 0.25) + (8 x 0.20) + (7 x 0.20) + (7 x 0.15) + (8 x 0.10) + (8 x 0.10)
= 2.00 + 1.60 + 1.40 + 1.05 + 0.80 + 0.80
= **7.65**

### Lenovo ThinkPad X1
(8 x 0.25) + (7 x 0.20) + (8 x 0.20) + (7 x 0.15) + (9 x 0.10) + (10 x 0.10)
= 2.00 + 1.40 + 1.60 + 1.05 + 0.90 + 1.00
= **7.95**

## Step 6: Decision

**MacBook Air M2 scores highest (8.40)**

Choose MacBook Air M2 for best combination of performance, portability, and battery life.

## Benefits of Weighted Decision Matrix

1. Makes subjective decisions more objective
2. Forces you to consider all relevant factors
3. Documents your reasoning
4. Allows comparison on equal footing
5. Can be shared and discussed with others

A weighted decision matrix turns complex choices into structured, defensible decisions.`
  },
  {
    id: "feedback-loop-reasoning",
    category: "Systems Thinking",
    q: ["Feedback loops", "Reinforcing vs balancing loops", "Systems dynamics"],
    title: "Feedback Loop Reasoning",
    body: `Feedback loops are circular cause-and-effect chains that amplify or stabilize systems.

## Types of Feedback Loops

### Reinforcing Loops (Positive Feedback)
- Amplify change
- Push systems away from equilibrium
- Create exponential growth or collapse

### Balancing Loops (Negative Feedback)
- Stabilize systems
- Push systems toward equilibrium
- Create self-correcting behavior

## Example 1: Social Media Growth (Reinforcing)

**Loop**:
1. User creates content
2. Content gets likes and shares
3. Algorithm shows content to more users
4. More users follow the creator
5. More followers means more engagement
6. More engagement means more content creation

**Result**: Viral growth, exponential follower increase

## Example 2: Thermostat (Balancing)

**Loop**:
1. Room temperature rises above set point
2. Thermostat detects deviation
3. Air conditioning turns on
4. Room cools down
5. Temperature reaches set point
6. Air conditioning turns off

**Result**: Temperature stability

## Example 3: Population Growth (Reinforcing with Balancing)

**Reinforcing Loop**:
1. More people
2. More births
3. More people
4. (Exponential growth)

**Balancing Loop**:
1. More people
2. More resource consumption
3. Resource scarcity
4. Increased mortality
5. Fewer people
6. (Population stabilization)

## Real-World Example: Business Growth

### Reinforcing Loop (Growth)
1. Good product
2. Happy customers
3. Word-of-mouth referrals
4. More customers
5. More revenue
6. More investment in product
7. Better product

### Balancing Loop (Constraints)
1. Growing customer base
2. Increased support requests
3. Support quality drops
4. Customer satisfaction falls
5. Referrals decrease
6. Growth slows

## Identifying Leverage Points

### In Reinforcing Loops
- Amplify positive loops (invest in what works)
- Break negative loops (address root causes)

### In Balancing Loops
- Shift the set point (raise standards)
- Reduce resistance (remove obstacles)
- Strengthen the feedback signal (better monitoring)

## Application

1. Map your systems to identify loops
2. Look for reinforcing loops driving growth or decline
3. Identify balancing loops maintaining stability
4. Find leverage points for intervention
5. Monitor feedback delays

Understanding feedback loops helps you see how small actions can create large effects over time.`
  },
  {
    id: "counterfactual-reasoning",
    category: "Critical Thinking",
    q: ["What if history was different?", "Counterfactual reasoning", "Alternative history thinking"],
    title: "Counterfactual Reasoning",
    body: `Counterfactual reasoning explores what might have happened if key events had turned out differently.

## Concept

Counterfactuals are "what if" scenarios about the past. They help us understand causation by imagining alternatives.

## Example: What If the Internet Was Never Invented?

### Scenario
Imagine the ARPANET project was defunded in the 1970s and the internet was never developed.

### Immediate Effects
- No World Wide Web
- No email
- No social media
- No online shopping
- No streaming services

### Long-term Effects

**Economy**:
- Slower globalization
- Local businesses dominate
- No tech giants (Google, Facebook, Amazon)
- Slower innovation cycles

**Communication**:
- Letters and phone calls remain primary
- Long-distance relationships harder
- Information spreads slowly
- Local news remains dominant

**Education**:
- Libraries remain primary knowledge source
- Online courses do not exist
- Research is slower
- Knowledge less accessible

**Social**:
- Stronger local communities
- Less global awareness
- Slower cultural exchange
- More face-to-face interaction

### What Would Be Different?

1. **Economy**: More manufacturing, less digital
2. **Politics**: Less political polarization from social media
3. **Culture**: More local, less globalized
4. **Education**: More equal access (no digital divide)
5. **Privacy**: Much greater privacy

## Why Counterfactuals Matter

1. **Understanding causation**: Shows what events truly mattered
2. **Learning from history**: Shows how choices have consequences
3. **Strategic planning**: Helps anticipate future scenarios
4. **Creativity**: Explores alternative possibilities
5. **Humility**: Shows how contingent outcomes are

## Limitations

- History is complex (many variables)
- One change can have unpredictable effects
- We tend to imagine better outcomes
- Cannot be tested or verified

Counterfactual reasoning helps us appreciate how contingent history is and how small changes can have large effects.`
  },
  {
    id: "multi-criteria-decision",
    category: "Decision Making",
    q: ["Multi-criteria decision making", "How to weigh trade-offs", "Complex decision analysis"],
    title: "Multi-Criteria Decision Analysis",
    body: `Multi-criteria decision analysis helps evaluate options when multiple factors matter.

## Scenario

A city must choose a location for a new park.

## Options

- **Option A**: Downtown location
- **Option B**: Suburban location
- **Option C**: Waterfront location

## Criteria

1. Accessibility (25%)
2. Cost (20%)
3. Environmental impact (20%)
4. Community benefit (20%)
5. Safety (15%)

## Evaluation

### Option A: Downtown

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Accessibility | 9 | 0.25 | 2.25 |
| Cost | 5 | 0.20 | 1.00 |
| Environmental | 6 | 0.20 | 1.20 |
| Community | 8 | 0.20 | 1.60 |
| Safety | 7 | 0.15 | 1.05 |
| **Total** | | | **7.10** |

### Option B: Suburban

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Accessibility | 5 | 0.25 | 1.25 |
| Cost | 8 | 0.20 | 1.60 |
| Environmental | 7 | 0.20 | 1.40 |
| Community | 6 | 0.20 | 1.20 |
| Safety | 8 | 0.15 | 1.20 |
| **Total** | | | **6.65** |

### Option C: Waterfront

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Accessibility | 6 | 0.25 | 1.50 |
| Cost | 4 | 0.20 | 0.80 |
| Environmental | 9 | 0.20 | 1.80 |
| Community | 9 | 0.20 | 1.80 |
| Safety | 6 | 0.15 | 0.90 |
| **Total** | | | **6.80** |

## Sensitivity Analysis

What if we change weights?

### Scenario 1: Cost becomes more important (30%)
- Downtown: 6.60
- Suburban: 6.85 (becomes best)
- Waterfront: 6.40

### Scenario 2: Environment becomes more important (30%)
- Downtown: 6.85
- Suburban: 6.75
- Waterfront: 7.15 (becomes best)

## Decision

**Option A (Downtown) scores highest (7.10)**

The downtown location provides the best balance of accessibility, community benefit, and safety despite higher cost.

## Conclusion

Multi-criteria analysis reveals that the best choice depends on how you weight different factors. By making weights explicit, the decision becomes transparent and defensible. Sensitivity analysis shows how robust the decision is to changes in priorities.`
  },
  {
    id: "ethics-of-ai",
    category: "Ethics",
    q: ["Ethics of artificial intelligence", "AI ethics dilemma", "Should AI make decisions?"],
    title: "Ethics of Artificial Intelligence",
    body: `AI ethics examines the moral implications of creating and deploying artificial intelligence systems.

## Key Ethical Issues

### 1. Bias and Fairness

**Problem**: AI systems can perpetuate or amplify human biases.

**Example**: An AI hiring tool trained on historical data may discriminate against women because past hires were predominantly male.

**Questions**:
- Who is responsible for biased AI outcomes?
- How do we detect and correct bias?
- Should we use AI for high-stakes decisions?

### 2. Privacy and Surveillance

**Problem**: AI enables mass surveillance and data collection.

**Example**: Facial recognition technology can track people's movements without consent.

**Questions**:
- Where is the line between security and privacy?
- Who should have access to AI surveillance?
- How do we protect individual rights?

### 3. Transparency and Accountability

**Problem**: AI decisions are often opaque ("black box").

**Example**: A loan application is denied by AI, but no one can explain why.

**Questions**:
- Should AI decisions be explainable?
- Who is accountable when AI fails?
- How do we audit AI systems?

### 4. Job Displacement

**Problem**: AI automation replaces human workers.

**Example**: Self-driving trucks could eliminate millions of driving jobs.

**Questions**:
- What is our responsibility to displaced workers?
- How do we distribute AI's economic benefits?
- Should we limit AI automation?

### 5. Autonomous Weapons

**Problem**: AI-powered weapons can make kill decisions without human input.

**Example**: Drones that autonomously select and engage targets.

**Questions**:
- Should machines decide who lives or dies?
- Who is responsible for autonomous weapon actions?
- Should we ban lethal autonomous weapons?

## Ethical Frameworks

### Utilitarian Approach
- Maximize overall good
- Consider all consequences
- Balance benefits and harms

### Rights-Based Approach
- Protect individual rights
- Ensure dignity and autonomy
- Prevent harm to individuals

### Virtue Ethics Approach
- What would a wise person do?
- Consider character and values
- Focus on human flourishing

## Recommendations

1. **Transparency**: AI decisions should be explainable
2. **Accountability**: Clear responsibility for AI outcomes
3. **Fairness**: Regular audits for bias
4. **Human oversight**: Humans should supervise high-stakes AI
5. **Inclusive development**: Diverse teams building AI

## Conclusion

AI ethics is not just about technology; it is about the kind of society we want to live in. As AI becomes more powerful, we must ensure it serves human values and interests.`
  },
];
