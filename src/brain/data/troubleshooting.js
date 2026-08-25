export const TROUBLESHOOTING = [
  {
    id: "cannot-read-property-undefined",
    category: "JavaScript",
    q: ["Cannot read property of undefined", "reading undefined error", "undefined property access"],
    title: "Cannot Read Property of Undefined",
    body: `This error occurs when you try to access a property or method on an undefined value.

## Common Causes

1. Accessing a property on an uninitialized variable
2. Accessing a property on a function return value that is undefined
3. Destructuring from an undefined object
4. Accessing nested properties without null checks

## Examples and Solutions

### Accessing Property on Undefined Variable

\`\`\`javascript
// Problem
const user = getUser();
console.log(user.name); // Cannot read properties of undefined (reading 'name')

// Solution: Check if user exists
if (user) {
  console.log(user.name);
}

// Or use optional chaining
console.log(user?.name);
\`\`\`

### Destructuring from Undefined

\`\`\`javascript
// Problem
const { name, age } = undefined; // TypeError

// Solution: Provide default value
const { name, age } = {}; // Works, values are undefined

// Or check first
const data = getData() || {};
const { name } = data;
\`\`\`

### Nested Property Access

\`\`\`javascript
// Problem
const street = user.address.street; // Error if address is undefined

// Solution: Optional chaining with nullish coalescing
const street = user?.address?.street ?? "Unknown";
\`\`\`

### Array Methods Returning Undefined

\`\`\`javascript
// Problem
const items = [1, 2, 3];
const found = items.find(x => x === 99);
console.log(found.toFixed(2)); // Error: found is undefined

// Solution: Check the result
const found = items.find(x => x === 99);
if (found !== undefined) {
  console.log(found.toFixed(2));
}
\`\`\`

Always validate data exists before accessing its properties.`
  },
  {
    id: "is-not-a-function",
    category: "JavaScript",
    q: ["is not a function", "not a function error", "TypeError: not a function"],
    title: "Is Not a Function Error",
    body: `This error means you are trying to call something as a function that is not actually a function.

## Common Causes

1. Variable name conflicts with a built-in method
2. Incorrect import or module reference
3. Calling a method before it is defined
4. Wrong destructuring of methods

## Examples and Solutions

### Variable Name Conflict

\`\`\`javascript
// Problem
const color = "red";
const color = () => console.log("painting"); // SyntaxError

// Or with different scope
const items = [1, 2, 3];
const map = items.map; // map is now the method reference
map(x => x * 2); // This works, but confusing

// Better: keep method attached
items.map(x => x * 2);
\`\`\`

### Incorrect Import

\`\`\`javascript
// Problem
import React from "react";
const [state, setState] = useState(); // Error: useState is not defined

// Solution: Destructure from React or import directly
import { useState } from "react";
const [state, setState] = useState();
\`\`\`

### Calling Non-Function

\`\`\`javascript
// Problem
const result = undefined();
const result = null();

// Solution: Ensure value is a function
const result = typeof myFunc === "function" ? myFunc() : null;
\`\`\`

### Wrong Method Reference

\`\`\`javascript
// Problem
const obj = {
  greet: function() { return "hello"; }
};
const greet = obj.greet;
greet(); // Works, but 'this' context is lost

// Solution: Bind the context
const greet = obj.greet.bind(obj);
greet();
\`\`\`

Always verify the type before calling a value as a function.`
  },
  {
    id: "cannot-access-before-initialization",
    category: "JavaScript",
    q: ["Cannot access before initialization", "temporal dead zone", "TDZ error"],
    title: "Cannot Access Before Initialization",
    body: `This error occurs when you try to use a \`let\` or \`const\` variable before its declaration is reached.

## What is the Temporal Dead Zone?

Variables declared with \`let\` and \`const\` exist in a TDZ from the start of their block until the declaration is processed. Accessing them in the TDZ throws an error.

## Examples and Solutions

### Basic TDZ

\`\`\`javascript
// Problem
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

// Solution: Declare before use
let x = 5;
console.log(x);
\`\`\`

### Function Parameters vs TDZ

\`\`\`javascript
// Problem
function greet(name = defaultName) {
  return "Hello, " + name;
}
const defaultName = "World";
greet(); // ReferenceError

// Solution: Define defaults before use
const defaultName = "World";
function greet(name = defaultName) {
  return "Hello, " + name;
}
\`\`\`

### In Loops

\`\`\`javascript
// Problem
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// Works fine, let is block scoped

// var would share the same variable
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// All log 5 because var is function scoped
\`\`\`

### Class Fields

\`\`\`javascript
// Problem
class Counter {
  count = this.initialCount; // Error if initialCount not defined
  initialCount = 0;
}

// Solution: Define in order
class Counter {
  initialCount = 0;
  count = this.initialCount;
}
\`\`\`

The TDZ prevents using variables before they are ready. Always declare variables before using them.`
  },
  {
    id: "invalid-hook-call",
    category: "React",
    q: ["Invalid hook call", "hooks can only be called inside", "React hook rules"],
    title: "Invalid Hook Call Error",
    body: `React hooks must follow specific rules. This error means a hook is being called incorrectly.

## Hook Rules

1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
2. Only call hooks from React functions (components or custom hooks)
3. Custom hooks must start with "use"

## Common Causes and Solutions

### Calling Hook Inside Condition

\`\`\`javascript
// Problem
function Component({ show }) {
  if (show) {
    const [value, setValue] = useState(""); // ERROR
  }
  return <div />;
}

// Solution: Always call hooks, conditionally use values
function Component({ show }) {
  const [value, setValue] = useState("");
  return show ? <div>{value}</div> : null;
}
\`\`\`

### Multiple React Instances

\`\`\`javascript
// Problem: Two copies of React loaded
// Check package.json for duplicate dependencies

// Solution: Deduplicate
npm dedupe
// Or use resolutions in package.json
{
  "resolutions": {
    "react": "^18.2.0"
  }
}
\`\`\`

### Hook in Event Handler

\`\`\`javascript
// Problem
function Component() {
  const handleClick = () => {
    const [data, setData] = useState(null); // ERROR
  };
  return <button onClick={handleClick}>Click</button>;
}

// Solution: Move hook to component level
function Component() {
  const [data, setData] = useState(null);

  const handleClick = () => {
    setData("new value");
  };

  return <button onClick={handleClick}>Click</button>;
}
\`\`\`

### Custom Hook Violation

\`\`\`javascript
// Problem: Not starting with "use"
function fetchData() {
  const [data, setData] = useState(null); // ERROR
  return data;
}

// Solution: Rename to follow convention
function useFetchData() {
  const [data, setData] = useState(null);
  return data;
}
\`\`\`

Always follow React hook rules to avoid runtime errors.`
  },
  {
    id: "react-memory-leak",
    category: "React",
    q: ["React memory leak", "Can't perform a React state update on unmounted component", "cleanup function"],
    title: "React Memory Leak",
    body: `Memory leaks occur when components set state after unmounting or fail to clean up subscriptions.

## Common Causes

1. Setting state in async callbacks after unmount
2. Not cleaning up timers and intervals
3. Not unsubscribing from event listeners
4. Not cleaning up WebSocket connections

## Examples and Solutions

### Async State Updates

\`\`\`javascript
// Problem
useEffect(() => {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => {
      setData(data); // Warning if component unmounted
    });
}, []);

// Solution: Use cleanup flag
useEffect(() => {
  let cancelled = false;

  fetch("/api/data")
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {
        setData(data);
      }
    });

  return () => { cancelled = true; };
}, []);

// Or use AbortController
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then(res => res.json())
    .then(setData);

  return () => controller.abort();
}, []);
\`\`\`

### Timers and Intervals

\`\`\`javascript
// Problem
useEffect(() => {
  setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
}, []);

// Solution: Clean up interval
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
\`\`\`

### Event Listeners

\`\`\`javascript
// Problem
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);

// Solution: Remove listener on cleanup
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
\`\`\`

### WebSocket Connections

\`\`\`javascript
// Problem
useEffect(() => {
  const ws = new WebSocket("wss://api.example.com");
  ws.onmessage = (event) => {
    setData(JSON.parse(event.data));
  };
}, []);

// Solution: Close connection on cleanup
useEffect(() => {
  const ws = new WebSocket("wss://api.example.com");
  ws.onmessage = (event) => {
    setData(JSON.parse(event.data));
  };

  return () => ws.close();
}, []);
\`\`\`

Always return cleanup functions from useEffect when dealing with subscriptions.`
  },
  {
    id: "key-prop-warning",
    category: "React",
    q: ["Warning: Each child in a list should have a unique key prop", "missing key prop", "React list key warning"],
    title: "Key Prop Warning",
    body: `React needs unique keys to efficiently track and update list items. Missing or duplicate keys cause warnings and potential bugs.

## Why Keys Matter

Keys help React identify which items changed, were added, or removed. Without proper keys, React may re-render incorrectly.

## Examples and Solutions

### Missing Keys

\`\`\`javascript
// Problem
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li>{item.name}</li> // Warning: Each child needs a key
      ))}
    </ul>
  );
}

// Solution: Add unique key
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Using Index as Key

\`\`\`javascript
// Problem: Index keys cause issues with reordering
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}

// Solution: Use stable, unique identifiers
{items.map(item => (
  <ListItem key={item.id} data={item} />
))}
\`\`\`

### Dynamic Lists

\`\`\`javascript
// Problem: Creating keys that change
{items.map(item => (
  <ListItem key={Math.random()} data={item} />
))}

// Solution: Use consistent identifiers
{items.map(item => (
  <ListItem key={item.id || item.name} data={item} />
))}
\`\`\`

### Nested Lists

\`\`\`javascript
// Problem: Keys must be unique among siblings
{groups.map(group => (
  <div>
    {group.items.map(item => (
      <ListItem key={item.id} /> // Must be unique within group
    ))}
  </div>
))}
\`\`\`

### Array Index Key Rules

\`\`\`javascript
// Acceptable: Static list that never reorders
const staticList = ["a", "b", "c"];
staticList.map((item, index) => (
  <span key={index}>{item}</span>
))

// Avoid: Dynamic lists that can reorder
const dynamicList = getItems(); // May change order
dynamicList.map((item, index) => (
  <span key={index}>{item}</span> // Bad practice
))
\`\`\`

Keys should be stable, predictable, and unique among siblings.`
  },
  {
    id: "flexbox-not-working",
    category: "CSS",
    q: ["Flexbox not working", "flex items not aligning", "CSS flex layout broken"],
    title: "Flexbox Not Working",
    body: `Flexbox layout issues usually stem from missing properties, incorrect values, or conflicting styles.

## Common Issues and Solutions

### Container Not Set to Flex

\`\`\`css
/* Problem: Parent not set as flex container */
.parent {
  display: block; /* Not flex */
}

/* Solution */
.parent {
  display: flex;
}
\`\`\`

### Items Not Expanding

\`\`\`css
/* Problem: Items stay at content width */
.parent {
  display: flex;
}

.child {
  /* Missing flex-grow */
}

/* Solution: Use flex shorthand */
.parent {
  display: flex;
}

.child {
  flex: 1; /* grow, shrink, basis */
}
\`\`\`

### Alignment Issues

\`\`\`css
/* Problem: Items not centered */
.parent {
  display: flex;
}

/* Solution: Use alignment properties */
.parent {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
  min-height: 100vh;       /* Need height for vertical */
}
\`\`\`

### Direction Problems

\`\`\`css
/* Problem: Items in wrong direction */
.parent {
  display: flex;
}

/* Solution: Set flex-direction */
.parent {
  display: flex;
  flex-direction: row;     /* Horizontal (default) */
  /* OR */
  flex-direction: column;  /* Vertical */
}
\`\`\`

### Wrapping Issues

\`\`\`css
/* Problem: Items overflow container */
.parent {
  display: flex;
}

/* Solution: Allow wrapping */
.parent {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
\`\`\`

### Order Not Working

\`\`\`css
/* Problem: Order property has no effect */
.child {
  order: 2; /* Without flex, this does nothing */
}

/* Solution: Ensure parent is flex container */
.parent {
  display: flex;
}

.child {
  order: 2;
}
\`\`\`

### Gap Not Working

\`\`\`css
/* Problem: Margin on flex items causes issues */
.child {
  margin-right: 16px; /* Last item has extra space */
}

/* Solution: Use gap property */
.parent {
  display: flex;
  gap: 16px;
}
\`\`\`

Always ensure the parent container has display: flex before using flex properties on children.`
  },
  {
    id: "merge-conflict",
    category: "Git",
    q: ["Git merge conflict", "merge conflict resolution", "conflict in git"],
    title: "Merge Conflict Resolution",
    body: `Merge conflicts occur when Git cannot automatically merge changes from different branches.

## Understanding Conflicts

\`\`\`
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
\`\`\`

## Resolution Steps

### 1. Identify Conflicts

\`\`\`bash
git status
# Shows files with conflicts
\`\`\`

### 2. Open and Resolve

Open conflicted files and look for conflict markers:

\`\`\`javascript
// Before conflict
function calculate(a, b) {
  return a + b;
}

<<<<<<< HEAD
function calculate(a, b) {
  return a + b + c; // Your change
}
=======
function calculate(a, b, c) {
  return a + b + c; // Their change
}
>>>>>>> feature-branch
\`\`\`

### 3. Choose Resolution

\`\`\`javascript
// Merged result
function calculate(a, b, c) {
  return a + b + c;
}
\`\`\`

### 4. Mark as Resolved

\`\`\`bash
git add filename.js
git commit -m "Resolve merge conflict in filename.js"
\`\`\`

## Prevention Strategies

\`\`\`bash
# Pull before pushing
git pull origin main --rebase

# Use feature branches
git checkout -b feature/new-feature

# Merge frequently
git fetch origin
git merge origin/main
\`\`\`

## Abort a Merge

\`\`\`bash
git merge --abort
\`\`\`

Conflicts are normal -- resolve them carefully and test after resolving.`
  },
  {
    id: "npm-eresolve-error",
    category: "npm",
    q: ["npm ERESOLVE error", "unable to resolve dependency tree", "npm dependency conflict"],
    title: "npm ERESOLVE Error",
    body: `ERESOLVE errors occur when npm cannot resolve conflicting dependency versions in your project.

## Common Causes

1. Two packages require different versions of the same dependency
2. Peer dependency conflicts
3. Outdated lock file

## Solutions

### Force Resolution

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### Use --force (Last Resort)

\`\`\`bash
npm install --force
\`\`\`

### Fix in package.json

\`\`\`json
{
  "dependencies": {
    "package-a": "^2.0.0",
    "package-b": "^2.0.0"
  },
  "overrides": {
    "shared-dep": "^3.0.0"
  }
}
\`\`\`

### Clean Install

\`\`\`bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
\`\`\`

### Check Dependency Tree

\`\`\`bash
# View the dependency tree
npm ls

# Find what depends on conflicting package
npm ls conflicting-package
\`\`\`

### Use npm Overrides

\`\`\`json
{
  "overrides": {
    "problematic-package": {
      "dependency": "^2.0.0"
    }
  }
}
\`\`\`

### Switch to pnpm or yarn

\`\`\`bash
# pnpm handles conflicts better
pnpm install

# Or yarn
yarn install
\`\`\`

### Manual Resolution

\`\`\`bash
# Check which package requires conflicting version
npm ls --all | grep conflicting-package

# Update the problematic package
npm update problematic-package
\`\`\`

ERESOLVE errors are package management challenges that require understanding dependency trees.`
  },
  {
    id: "vite-build-error",
    category: "Build Tools",
    q: ["Vite build error", "Vite compilation failed", "Vite build failed"],
    title: "Vite Build Error",
    body: `Vite build errors can stem from configuration issues, missing dependencies, or code problems.

## Common Errors and Solutions

### Missing Dependencies

\`\`\`bash
# Error: Module not found
npm install
# Or reinstall
rm -rf node_modules
npm install
\`\`\`

### Configuration Issues

\`\`\`javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      }
    }
  }
});
\`\`\`

### TypeScript Errors

\`\`\`javascript
// vite.config.js
export default defineConfig({
  build: {
    // Skip type checking during build
    typescript: {
      tsconfig: "./tsconfig.build.json"
    }
  }
});
\`\`\`

### Environment Variables

\`\`\`javascript
// Ensure env vars are properly loaded
// .env file should exist in project root

// In code, use import.meta.env
console.log(import.meta.env.VITE_API_URL);
\`\`\`

### Path Resolution

\`\`\`javascript
// vite.config.js
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
\`\`\`

### Build Size Warning

\`\`\`javascript
// vite.config.js
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    }
  }
});
\`\`\`

### Dynamic Import Issues

\`\`\`javascript
// Problem: Dynamic imports with variables
const module = await import("./modules/" + name + ".js");

// Solution: Use glob imports
const modules = import.meta.glob("./modules/*.js");
\`\`\`

Check Vite documentation for your specific error message.`
  },
  {
    id: "hydration-error",
    category: "React",
    q: ["Hydration error", "server client mismatch", "React hydration failed"],
    title: "Hydration Error",
    body: `Hydration errors occur when the server-rendered HTML does not match what React renders on the client.

## Common Causes

1. Browser-specific APIs used during SSR
2. Date/time differences between server and client
3. Math.random() producing different values
4. Conditional rendering based on window/document

## Examples and Solutions

### Browser APIs During SSR

\`\`\`javascript
// Problem
function Component() {
  const [width, setWidth] = useState(window.innerWidth); // Error
}

// Solution: Defer to client
function Component() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return <div>Width: {width}</div>;
}
\`\`\`

### Date/Time Mismatch

\`\`\`javascript
// Problem
function Component() {
  return <p>Time: {new Date().toLocaleTimeString()}</p>;
}

// Solution: Render on client only
function Component() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <p>Time: {time || "Loading..."}</p>;
}
\`\`\`

### Random Values

\`\`\`javascript
// Problem
function Component() {
  const id = Math.random();
  return <div id={id}>Content</div>;
}

// Solution: Generate consistent IDs
function Component() {
  const [id] = useState(() => Math.random().toString(36));
  return <div id={id}>Content</div>;
}
\`\`\`

### Dynamic Content

\`\`\`javascript
// Problem
function Component() {
  const isBrowser = typeof window !== "undefined";
  return <div>{isBrowser ? "Client" : "Server"}</div>;
}

// Solution: Use useEffect for browser-specific logic
function Component() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient ? "Client" : "Server"}</div>;
}
\`\`\`

### Suppressing Warnings

\`\`\`html
<!-- Use dangerouslySetInnerHTML for intentional mismatches -->
<div dangerouslySetInnerHTML={{ __html: serverContent }} />
\`\`\`

Ensure server and client render identical HTML to avoid hydration errors.`
  },
  {
    id: "positioning-issues",
    category: "CSS",
    q: ["CSS positioning issues", "position absolute not working", "element position wrong"],
    title: "Positioning Issues",
    body: `CSS positioning problems usually involve missing position property, wrong parent reference, or z-index issues.

## Position Types

\`\`\`css
/* Static - default, no positioning */
.element {
  position: static;
}

/* Relative - positioned relative to itself */
.element {
  position: relative;
  top: 10px; /* Moves 10px down from normal position */
}

/* Absolute - positioned relative to nearest positioned ancestor */
.element {
  position: absolute;
  top: 0;
  left: 0;
}

/* Fixed - positioned relative to viewport */
.element {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* Sticky - toggle between relative and fixed */
.element {
  position: sticky;
  top: 0;
}
\`\`\`

## Common Issues

### No Positioned Parent

\`\`\`css
/* Problem: No positioned ancestor */
.parent {
  /* Missing position property */
}

.child {
  position: absolute;
  top: 10px;
}

/* Solution: Add position to parent */
.parent {
  position: relative; /* Now child is positioned relative to parent */
}
\`\`\`

### Z-Index Not Working

\`\`\`css
/* Problem: z-index requires positioned element */
.element {
  z-index: 100; /* Does nothing without position */
}

/* Solution */
.element {
  position: relative; /* or absolute, fixed */
  z-index: 100;
}
\`\`\`

### Fixed Elements and Transforms

\`\`\`css
/* Problem: position: fixed not working */
.parent {
  transform: translateZ(0); /* Creates new stacking context */
}

.child {
  position: fixed; /* Now positioned relative to parent, not viewport */
}

/* Solution: Avoid transforms on parent or restructure */
\`\`\`

### Centering with Absolute

\`\`\`css
/* Problem: Not centered */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
}

/* Solution: Use transform */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Or use flexbox on parent */
.parent {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

### Sticky Header Issues

\`\`\`css
/* Problem: Sticky not working */
.header {
  position: sticky;
  top: 0;
}

/* Solution: Ensure parent allows overflow */
.parent {
  overflow: visible; /* Not hidden */
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
}
\`\`\`

Understanding the position property and its context is key to solving layout issues.`
  },
  {
    id: "cors-error",
    category: "Networking",
    q: ["CORS error", "Access-Control-Allow-Origin", "cross-origin request blocked"],
    title: "CORS Error",
    body: `CORS (Cross-Origin Resource Sharing) errors occur when a browser blocks requests to a different origin for security.

## What is CORS?

Browsers restrict HTTP requests between different origins (domain, protocol, port) by default. CORS headers control which origins can access resources.

## Common Errors

\`\`\`
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
\`\`\`

## Solutions

### Server-Side Configuration

\`\`\`javascript
// Express.js
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
\`\`\`

### Manual Headers

\`\`\`javascript
// Without cors package
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
\`\`\`

### Proxy During Development

\`\`\`javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  }
});
\`\`\`

### Environment Variables

\`\`\`javascript
// Use environment-based origin
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
\`\`\`

### Preflight Requests

\`\`\`javascript
// Handle OPTIONS requests
app.options("*", cors());
\`\`\`

CORS is a security feature -- configure it properly on the server, not bypass it.`
  },
  {
    id: "null-type-errors",
    category: "JavaScript",
    q: ["null is not an object", "cannot convert null to object", "null type error"],
    title: "Null Type Errors",
    body: `Null type errors happen when code expects an object or array but receives null.

## Common Causes

1. API calls returning null
2. DOM queries returning null
3. Destructuring from null
4. Accessing methods on null

## Examples and Solutions

### API Response is Null

\`\`\`javascript
// Problem
const response = await fetch("/api/user");
const user = await response.json();
console.log(user.name); // Error: Cannot read properties of null

// Solution: Check for null
if (user) {
  console.log(user.name);
}
\`\`\`

### DOM Element Not Found

\`\`\`javascript
// Problem
const element = document.getElementById("nonexistent");
element.addEventListener("click", handler); // Error

// Solution: Check if element exists
const element = document.getElementById("my-element");
if (element) {
  element.addEventListener("click", handler);
}
\`\`\`

### Destructuring Null

\`\`\`javascript
// Problem
const data = getData(); // Returns null
const { name } = data; // TypeError

// Solution: Provide defaults
const data = getData() || {};
const { name } = data;
\`\`\`

### Array Methods on Null

\`\`\`javascript
// Problem
const items = getItems(); // Returns null
items.map(x => x.name); // Error

// Solution: Default to empty array
const items = getItems() || [];
items.map(x => x.name);
\`\`\`

### Optional Chaining

\`\`\`javascript
// Modern solution using optional chaining
const name = user?.profile?.name ?? "Unknown";
const firstItem = array?.[0]?.value;
const result = fn?.();
\`\`\`

Always validate data before accessing properties or calling methods on it.`
  },
  {
    id: "async-error-handling",
    category: "JavaScript",
    q: ["async await error handling", "unhandled promise rejection", "async error catching"],
    title: "Async Error Handling",
    body: `Proper async error handling prevents unhandled rejections and ensures graceful failure.

## Common Mistakes

### Missing Try-Catch

\`\`\`javascript
// Problem: No error handling
async function fetchData() {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data;
}
// If fetch fails, error is unhandled

// Solution: Wrap in try-catch
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}
\`\`\`

### Unhandled Promise Rejection

\`\`\`javascript
// Problem
fetchData().then(data => console.log(data));
// If fetchData rejects, no handler

// Solution: Add catch handler
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Or use async/await
async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

### Error in forEach with Async

\`\`\`javascript
// Problem: forEach does not wait for async
const ids = [1, 2, 3];
ids.forEach(async (id) => {
  await processItem(id); // Errors are not caught
});

// Solution: Use Promise.all with map
const ids = [1, 2, 3];
await Promise.all(ids.map(async (id) => {
  await processItem(id);
}));
\`\`\`

### Global Error Handler

\`\`\`javascript
// Catch unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

// Catch uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
\`\`\`

### React Error Boundaries

\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}
\`\`\`

Always handle async errors to prevent silent failures.`
  },
  {
    id: "detached-head",
    category: "Git",
    q: ["detached HEAD state", "git detached HEAD", "HEAD is not at a branch"],
    title: "Detached HEAD State",
    body: `Detached HEAD means you are not on any branch -- you are viewing a specific commit directly.

## How It Happens

\`\`\`bash
# Checking out a specific commit
git checkout abc1234

# Checking out a tag
git checkout v1.0.0

# Checking out remote branch without creating local branch
git checkout origin/main
\`\`\`

## What It Means

- You are viewing a specific commit
- New commits will not be on any branch
- Switching branches may lose your work

## How to Fix

### Option 1: Create a Branch

\`\`\`bash
# Save current state to a new branch
git checkout -b my-branch

# Now you are on the new branch
\`\`\`

### Option 2: Return to Branch

\`\`\`bash
# Go back to the main branch
git checkout main

# Or master
git checkout master
\`\`\`

### Option 3: Abandon Changes

\`\`\`bash
# Just switch back, losing any changes
git checkout main
\`\`\`

## Prevention

\`\`\`bash
# Always create a branch when checking out commits
git checkout -b feature/work abc1234

# When checking out remote branches
git checkout -b main origin/main
\`\`\`

## See Current State

\`\`\`bash
# Check if detached
git status
# Output: HEAD detached at abc1234

# See what branch you are on
git branch
# Detached HEAD is highlighted
\`\`\`

Detached HEAD is a useful state for reviewing commits, but always create a branch if you plan to make changes.`
  },
  {
    id: "css-specificity",
    category: "CSS",
    q: ["CSS specificity", "style not applying", "CSS override not working"],
    title: "CSS Specificity Issues",
    body: `CSS specificity determines which styles win when multiple rules target the same element.

## Specificity Hierarchy

1. Inline styles (1000)
2. IDs (100)
3. Classes, attributes, pseudo-classes (10)
4. Elements, pseudo-elements (1)

## Common Problems

### Low Specificity Override

\`\`\`css
/* Problem: This does not override the ID selector */
.button {
  color: red;
}

#special-button {
  color: blue;
}
\`\`\`

### Inline Styles Win

\`\`\`html
<!-- Problem: Inline style cannot be overridden by CSS -->
<div style="color: red;" class="text">Text</div>

<style>
.text { color: blue; } /* Does not work */
</style>
\`\`\`

## Solutions

### Use Higher Specificity

\`\`\`css
/* Override with more specific selector */
.card .button {
  color: red;
}
\`\`\`

### Use !important (Last Resort)

\`\`\`css
.button {
  color: red !important;
}
\`\`\`

### Use CSS Custom Properties

\`\`\`css
:root {
  --primary-color: blue;
}

.button {
  color: var(--primary-color);
}

/* Override later */
.special {
  --primary-color: red;
}
\`\`\`

### Use More Specific Classes

\`\`\`css
/* Instead of just .button */
.button-primary {
  color: blue;
}
\`\`\`

### Reorder Styles

\`\`\`css
/* Later rules win when specificity is equal */
.button { color: red; }
.button { color: blue; } /* This wins */
\`\`\`

Understanding specificity prevents style conflicts and makes debugging easier.`
  }
];
