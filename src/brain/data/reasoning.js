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
  }
];
