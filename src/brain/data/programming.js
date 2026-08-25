export const PROGRAMMING_CONCEPTS = [
  {
    id: "html-basics",
    category: "HTML",
    q: ["What is HTML?", "Explain HTML structure", "HTML tags basics"],
    title: "HTML Fundamentals",
    body: `HTML (HyperText Markup Language) is the standard markup language for creating web pages.

## Basic Structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

## Key Elements

- \`<head>\` - Contains metadata, title, links to styles/scripts
- \`<body>\` - Contains visible page content
- Semantic tags: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<footer>\`

## Common Tags

\`\`\`html
<a href="https://example.com">Link</a>
<img src="photo.jpg" alt="Description">
<ul><li>Item 1</li><li>Item 2</li></ul>
<form><input type="text" name="user"></form>
\`\`\`

HTML provides the structural foundation for all web content.`
  },
  {
    id: "css-basics",
    category: "CSS",
    q: ["What is CSS?", "How does CSS work?", "CSS basics"],
    title: "CSS Fundamentals",
    body: `CSS (Cascading Style Sheets) controls the visual presentation of HTML elements.

## Selectors

\`\`\`css
/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector */
#header { font-size: 24px; }

/* Descendant selector */
.nav a { text-decoration: none; }
\`\`\`

## Box Model

Every element has: content, padding, border, margin.

\`\`\`css
.box {
  width: 200px;
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
  box-sizing: border-box;
}
\`\`\`

## Flexbox Layout

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
\`\`\`

CSS separates presentation from structure, enabling responsive and attractive designs.`
  },
  {
    id: "js-core",
    category: "JavaScript",
    q: ["Explain JavaScript basics", "What are JS variables?", "JavaScript functions"],
    title: "JavaScript Core Concepts",
    body: `JavaScript is the programming language of the web, enabling interactive and dynamic content.

## Variables

\`\`\`javascript
// var - function scoped, hoisted
var name = "Alice";

// let - block scoped, can be reassigned
let count = 0;

// const - block scoped, cannot be reassigned
const API_URL = "https://api.example.com";
\`\`\`

## Functions

\`\`\`javascript
// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => a + b;

// Default parameters
function greetUser(name = "Guest") {
  return "Hello, " + name;
}
\`\`\`

## Arrays and Objects

\`\`\`javascript
const fruits = ["apple", "banana", "cherry"];
fruits.push("date");

const user = {
  name: "Bob",
  age: 30,
  greet() {
    return "Hi, I am " + this.name;
  }
};
\`\`\`

## Promises and Async/Await

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed:", error);
  }
}
\`\`\`

JavaScript uses prototypal inheritance and first-class functions.`
  },
  {
    id: "typescript-basics",
    category: "TypeScript",
    q: ["What is TypeScript?", "TypeScript vs JavaScript", "Why use TypeScript?"],
    title: "TypeScript Basics",
    body: `TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript.

## Basic Types

\`\`\`typescript
let name: string = "Alice";
let age: number = 25;
let active: boolean = true;
let items: string[] = ["a", "b"];
let mixed: (string | number)[] = [1, "two"];
\`\`\`

## Interfaces

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  role?: string; // optional
}

function createUser(data: User): User {
  return { ...data, role: data.role || "user" };
}
\`\`\`

## Generics

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
\`\`\`

## Benefits

- Catch errors at compile time instead of runtime
- Better IDE support with autocompletion and refactoring
- Self-documenting code through explicit types
- Safer refactoring in large codebases`
  },
  {
    id: "react-fundamentals",
    category: "React",
    q: ["What is React?", "How do React components work?", "React basics"],
    title: "React Fundamentals",
    body: `React is a JavaScript library for building user interfaces with a component-based architecture.

## Functional Components

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
    </div>
  );
}
\`\`\`

## State with Hooks

\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Effects

\`\`\`jsx
import { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/users/" + userId)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return <h2>{user.name}</h2>;
}
\`\`\`

React uses a virtual DOM for efficient re-rendering.`
  },
  {
    id: "react-patterns",
    category: "React",
    q: ["React design patterns", "React best practices", "React performance patterns"],
    title: "React Patterns",
    body: `Common React patterns improve code organization, reusability, and performance.

## Custom Hooks

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [theme, setTheme] = useLocalStorage("theme", "light");
\`\`\`

## Composition Pattern

\`\`\`jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
<Card title="User Info">
  <p>Name: Alice</p>
</Card>
\`\`\`

## Memoization

\`\`\`jsx
import { useMemo, useCallback } from "react";

function ExpensiveList({ items, filter }) {
  const filtered = useMemo(
    () => items.filter(i => i.category === filter),
    [items, filter]
  );

  const handleClick = useCallback((id) => {
    console.log("Clicked:", id);
  }, []);

  return filtered.map(item => (
    <Item key={item.id} data={item} onClick={handleClick} />
  ));
}
\`\`\`

Patterns help manage complexity in growing applications.`
  },
  {
    id: "nextjs-fundamentals",
    category: "Next.js",
    q: ["What is Next.js?", "Next.js routing", "Next.js server components"],
    title: "Next.js Fundamentals",
    body: `Next.js is a React framework providing server-side rendering, static generation, and file-based routing.

## File-Based Routing

\`\`\`
app/
  page.js          -> /
  about/page.js    -> /about
  blog/
    page.js        -> /blog
    [slug]/page.js -> /blog/:slug
\`\`\`

## Server Components

\`\`\`jsx
// app/page.js (Server Component by default)
async function HomePage() {
  const posts = await fetch("https://api.example.com/posts");
  const data = await posts.json();

  return (
    <main>
      <h1>Blog</h1>
      {data.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}

export default HomePage;
\`\`\`

## Client Components

\`\`\`jsx
"use client";

import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
\`\`\`

Next.js optimizes performance through automatic code splitting and prefetching.`
  },
  {
    id: "git-basics",
    category: "Git",
    q: ["What is Git?", "Git commands basics", "How to use Git?"],
    title: "Git Basics",
    body: `Git is a distributed version control system for tracking changes in source code.

## Initial Setup

\`\`\`bash
git init
git config user.name "Your Name"
git config user.email "you@example.com"
\`\`\`

## Basic Workflow

\`\`\`bash
# Check status
git status

# Stage changes
git add filename.js
git add .

# Commit changes
git commit -m "Add new feature"

# View history
git log --oneline
\`\`\`

## Branching

\`\`\`bash
# Create and switch to branch
git checkout -b feature/login

# List branches
git branch -a

# Merge branch
git checkout main
git merge feature/login
\`\`\`

## Remote Repositories

\`\`\`bash
git remote add origin https://github.com/user/repo.git
git push -u origin main
git pull origin main
\`\`\`

Git tracks content as snapshots, not diffs, making it fast and reliable.`
  },
  {
    id: "data-structures",
    category: "Computer Science",
    q: ["What are data structures?", "Common data structures", "Data structures in JavaScript"],
    title: "Data Structures",
    body: `Data structures are organized formats for storing and accessing data efficiently.

## Array

\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
arr.push(6);      // O(1) amortized
arr.pop();        // O(1)
arr.includes(3);  // O(n)
\`\`\`

## Hash Map (Object/Map)

\`\`\`javascript
const map = new Map();
map.set("key1", "value1");
map.get("key1");   // O(1)
map.has("key1");   // O(1)
map.delete("key1");
\`\`\`

## Linked List

\`\`\`javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }
}
\`\`\`

## Stack and Queue

\`\`\`javascript
// Stack - LIFO
const stack = [];
stack.push("a");
stack.push("b");
stack.pop(); // "b"

// Queue - FIFO
const queue = [];
queue.push("a");
queue.push("b");
queue.shift(); // "a"
\`\`\`

## Tree

\`\`\`javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
\`\`\`

Choose data structures based on your operation requirements.`
  },
  {
    id: "algorithms",
    category: "Computer Science",
    q: ["What are algorithms?", "Basic algorithms", "Algorithm complexity"],
    title: "Algorithms",
    body: `Algorithms are step-by-step procedures for solving problems or performing computations.

## Big O Notation

- O(1) - Constant time
- O(log n) - Logarithmic (binary search)
- O(n) - Linear (simple loop)
- O(n log n) - Linearithmic (merge sort)
- O(n^2) - Quadratic (nested loops)

## Binary Search

\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
\`\`\`

## Sorting: Quick Sort

\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = arr.filter((v, i) => v < pivot && i < arr.length - 1);
  const right = arr.filter((v, i) => v >= pivot && i < arr.length - 1);

  return [...quickSort(left), pivot, ...quickSort(right)];
}
\`\`\`

## Graph Traversal

\`\`\`javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}
\`\`\`

Understanding algorithms is fundamental to writing efficient code.`
  },
  {
    id: "cybersecurity-basics",
    category: "Security",
    q: ["What is cybersecurity?", "Basic security practices", "Web security basics"],
    title: "Cybersecurity Basics",
    body: `Cybersecurity protects systems, networks, and data from digital attacks and unauthorized access.

## Common Threats

- **SQL Injection**: Malicious SQL inserted into queries
- **XSS (Cross-Site Scripting)**: Injecting scripts into web pages
- **Phishing**: Deceptive attempts to steal credentials
- **Brute Force**: Automated password guessing

## Input Validation

\`\`\`javascript
// NEVER trust user input
function sanitize(input) {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Use parameterized queries
const query = "SELECT * FROM users WHERE id = ?";
db.run(query, [userId]);
\`\`\`

## Authentication Best Practices

\`\`\`javascript
const bcrypt = require("bcrypt");

// Hash passwords
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify passwords
async function verify(password, hash) {
  return await bcrypt.compare(password, hash);
}
\`\`\`

## HTTPS and Headers

\`\`\`javascript
// Always use HTTPS in production
// Set security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
\`\`\`

Security is not optional -- it is a requirement for every application.`
  },
  {
    id: "networking-basics",
    category: "Networking",
    q: ["What is networking?", "HTTP basics", "How the internet works"],
    title: "Networking Basics",
    body: `Networking enables communication between devices and systems across the internet and local networks.

## HTTP Methods

\`\`\`
GET    - Retrieve data
POST   - Create new resource
PUT    - Update entire resource
PATCH  - Partial update
DELETE - Remove resource
\`\`\`

## HTTP Status Codes

\`\`\`
200 OK
201 Created
301 Moved Permanently
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
\`\`\`

## REST API Example

\`\`\`javascript
// Express.js endpoints
app.get("/api/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});
\`\`\`

## DNS Resolution

1. Browser checks local cache
2. OS checks hosts file
3. Query goes to DNS resolver
4. Resolver queries root servers
5. Resolver returns IP address
6. Browser connects to IP

## TCP/IP Model

- Application Layer (HTTP, DNS)
- Transport Layer (TCP, UDP)
- Internet Layer (IP)
- Network Access Layer (Ethernet)

Understanding networking is essential for building web applications.`
  },
  {
    id: "database-basics",
    category: "Databases",
    q: ["What is a database?", "SQL vs NoSQL", "Database basics"],
    title: "Database Basics",
    body: `Databases store, organize, and retrieve structured data efficiently.

## SQL (Relational)

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM users WHERE name = 'Alice';

INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');

UPDATE users SET name = 'Alice Smith' WHERE id = 1;

DELETE FROM users WHERE id = 1;
\`\`\`

## NoSQL (MongoDB)

\`\`\`javascript
// Create document
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  preferences: { theme: "dark" }
});

// Query
db.users.find({ "preferences.theme": "dark" });

// Update
db.users.updateOne(
  { name: "Alice" },
  { $set: { "preferences.theme": "light" } }
);
\`\`\`

## SQL vs NoSQL

| Feature | SQL | NoSQL |
|---------|-----|-------|
| Structure | Fixed schema | Flexible schema |
| Scaling | Vertical | Horizontal |
| Transactions | ACID | Eventual consistency |
| Query Language | SQL | Varies |

## ORMs (Prisma Example)

\`\`\`javascript
const user = await prisma.user.create({
  data: {
    name: "Alice",
    posts: {
      create: [{ title: "First Post" }]
    }
  }
});
\`\`\`

Choose your database based on data structure, scalability needs, and query patterns.`
  },
  {
    id: "ai-ml-basics",
    category: "AI/ML",
    q: ["What is machine learning?", "AI basics", "How does AI work?"],
    title: "AI/ML Basics",
    body: `Artificial Intelligence and Machine Learning enable computers to learn from data and make decisions.

## Types of Machine Learning

- **Supervised**: Labeled data (classification, regression)
- **Unsupervised**: No labels (clustering, dimensionality reduction)
- **Reinforcement**: Learning through rewards and penalties

## Simple Neural Network Concept

\`\`\`python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# Training data
inputs = np.array([[0,0],[0,1],[1,0],[1,1]])
expected = np.array([[0],[1],[1],[0]])

# Initialize weights
weights = np.random.random((2, 1))
bias = np.random.random((1))

# Training loop
for epoch in range(10000):
    output = sigmoid(np.dot(inputs, weights) + bias)
    error = expected - output
    adjustment = error * sigmoid_derivative(output)
    weights += np.dot(inputs.T, adjustment)
    bias += np.mean(adjustment, axis=0)
\`\`\`

## Key Concepts

- **Training Data**: Data used to teach the model
- **Features**: Input variables
- **Labels**: Expected outputs
- **Loss Function**: Measures prediction error
- **Gradient Descent**: Optimization algorithm

## Using AI APIs

\`\`\`javascript
async function askAI(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });
  return await response.json();
}
\`\`\`

AI is transforming every industry by automating complex decision-making.`
  },
  {
    id: "responsive-design",
    category: "CSS",
    q: ["What is responsive design?", "Media queries", "Mobile-first design"],
    title: "Responsive Design",
    body: `Responsive design ensures web pages look good on all devices and screen sizes.

## Media Queries

\`\`\`css
/* Mobile first approach */
.container {
  padding: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 32px;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}
\`\`\`

## Flexible Grids

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
\`\`\`

## Responsive Images

\`\`\`html
<img
  srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 900px) 768px, 1200px"
  src="medium.jpg"
  alt="Responsive image"
>
\`\`\`

## Fluid Typography

\`\`\`css
html {
  font-size: 16px;
}

h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

p {
  font-size: clamp(0.875rem, 2vw, 1.125rem);
}
\`\`\`

## Viewport Meta Tag

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

Responsive design is essential for modern web development across all devices.`
  },
  {
    id: "accessibility",
    category: "Web Standards",
    q: ["What is web accessibility?", "WCAG basics", "Accessible HTML"],
    title: "Accessibility",
    body: `Web accessibility ensures content is usable by people with disabilities.

## Semantic HTML

\`\`\`html
<!-- Good -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Bad -->
<div class="nav">
  <div onclick="goHome()">Home</div>
</div>
\`\`\`

## ARIA Labels

\`\`\`html
<button aria-label="Close menu">X</button>
<div role="alert">Error: Invalid input</div>
<input aria-describedby="email-help" type="email">
<span id="email-help">Enter your email address</span>
\`\`\`

## Color Contrast

- Normal text: minimum 4.5:1 contrast ratio
- Large text: minimum 3:1 contrast ratio
- Use tools to verify contrast

## Keyboard Navigation

\`\`\`javascript
function handleKeyDown(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    activateButton();
  }
  if (event.key === "Escape") {
    closeModal();
  }
}
\`\`\`

## Form Accessibility

\`\`\`html
<form>
  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid="false"
  >
  <span id="email-error" role="alert" aria-live="polite"></span>
</form>
\`\`\`

Accessibility benefits all users, not just those with disabilities.`
  },
  {
    id: "performance-optimization",
    category: "Performance",
    q: ["How to optimize performance?", "Web performance tips", "Fast loading websites"],
    title: "Performance Optimization",
    body: `Performance optimization improves speed, responsiveness, and user experience.

## Lazy Loading

\`\`\`html
<img src="photo.jpg" loading="lazy" alt="Lazy loaded image">

<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach(img => {
  observer.observe(img);
});
</script>
\`\`\`

## Code Splitting

\`\`\`javascript
// React lazy loading
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

## Memoization

\`\`\`javascript
// React.memo for component memoization
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* complex rendering */}</div>;
});

// useMemo for expensive calculations
const sorted = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// useCallback for stable function references
const handleSubmit = useCallback((data) => {
  sendToAPI(data);
}, []);
\`\`\`

## Bundle Optimization

\`\`\`javascript
// Tree shaking - import only what you need
import { debounce } from "lodash-es";

// Dynamic imports
const module = await import("./heavy-module.js");
\`\`\`

## Performance Metrics

- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

Performance directly impacts user retention and conversion rates.`
  },
  {
    id: "software-design-principles",
    category: "Software Engineering",
    q: ["What are SOLID principles?", "Software design patterns", "Clean code principles"],
    title: "Software Design Principles",
    body: `Design principles guide developers in writing maintainable, scalable, and clean code.

## SOLID Principles

**Single Responsibility**: Each class/function has one job.

\`\`\`javascript
// Bad
class User {
  constructor(name) { this.name = name; }
  saveToDatabase() { /* ... */ }
  sendEmail() { /* ... */ }
}

// Good
class User {
  constructor(name) { this.name = name; }
}

class UserRepository {
  save(user) { /* ... */ }
}

class EmailService {
  send(user, message) { /* ... */ }
}
\`\`\`

**Open/Closed**: Open for extension, closed for modification.

\`\`\`javascript
// Add new shapes without modifying existing code
class Circle {
  area() { return Math.PI * this.radius * this.radius; }
}

class Rectangle {
  area() { return this.width * this.height; }
}

function calculateArea(shape) {
  return shape.area();
}
\`\`\`

## DRY (Don't Repeat Yourself)

\`\`\`javascript
// Bad
function validateEmail(email) {
  return email.includes("@") && email.includes(".");
}

function validateUsername(username) {
  return username.length >= 3 && username.length <= 20;
}

// Good
function validate(value, rules) {
  return rules.every(rule => rule(value));
}

const emailRules = [v => v.includes("@"), v => v.includes(".")];
\`\`\`

## KISS (Keep It Simple, Stupid)

- Prefer simple solutions over complex ones
- Avoid premature optimization
- Write code that is easy to understand

## YAGNI (You Aren't Gonna Need It)

- Don't build features until they are needed
- Avoid over-engineering
- Focus on current requirements

    Good design principles reduce technical debt and improve team productivity.`
  },
  {
    id: "css-grid",
    category: "CSS",
    q: ["What is CSS Grid?", "How does CSS Grid work?", "Grid layout explained"],
    title: "CSS Grid Layout",
    body: `CSS Grid is a two-dimensional layout system for creating complex web layouts with rows and columns.

## Basic Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
\`\`\`

## Key Properties

### Define Columns

\`\`\`css
/* Fixed and flexible columns */
.grid {
  grid-template-columns: 200px 1fr 2fr;
  /* 200px fixed, middle takes 1 part, right takes 2 parts */
}

/* Repeat syntax */
.grid {
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

### Place Items

\`\`\`css
/* By line numbers */
.item {
  grid-column: 1 / 3;  /* Start at line 1, end at line 3 */
  grid-row: 1 / 2;
}

/* Span across columns */
.item {
  grid-column: span 2;  /* Takes up 2 columns */
}
\`\`\`

### Named Areas

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }
\`\`\`

## Grid vs Flexbox

- **Grid**: Two-dimensional (rows AND columns)
- **Flexbox**: One-dimensional (row OR column)
- Use Grid for page layouts, Flexbox for component layouts

## Responsive Grid

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
/* Automatically adjusts columns based on available space */
\`\`\`

CSS Grid is the most powerful layout tool for modern web design.`
  },
  {
    id: "flexbox-deep-dive",
    category: "CSS",
    q: ["How does Flexbox work?", "Flexbox explained", "Flex properties"],
    title: "Flexbox Deep Dive",
    body: `Flexbox provides efficient alignment and distribution of space among items in a container.

## Container Properties

\`\`\`css
.container {
  display: flex;

  /* Main axis direction */
  flex-direction: row;          /* Left to right (default) */
  flex-direction: column;       /* Top to bottom */

  /* Wrap behavior */
  flex-wrap: nowrap;            /* Single line (default) */
  flex-wrap: wrap;              /* Multiple lines */

  /* Alignment on main axis */
  justify-content: flex-start;  /* Start */
  justify-content: center;      /* Center */
  justify-content: space-between; /* Space between items */
  justify-content: space-around;  /* Space around items */

  /* Alignment on cross axis */
  align-items: stretch;         /* Fill container height */
  align-items: center;          /* Center vertically */
  align-items: flex-start;      /* Top */
  align-items: flex-end;        /* Bottom */

  /* Gap between items */
  gap: 16px;
}
\`\`\`

## Item Properties

\`\`\`css
.item {
  /* Grow to fill space */
  flex-grow: 1;    /* Take up available space */
  flex-grow: 0;    /* Don't grow (default) */

  /* Shrink when space is limited */
  flex-shrink: 1;  /* Can shrink (default) */
  flex-shrink: 0;  /* Don't shrink */

  /* Base size before growing/shrinking */
  flex-basis: 200px;

  /* Shorthand: grow shrink basis */
  flex: 1 1 200px;

  /* Override container alignment */
  align-self: center;
  align-self: flex-end;
}
\`\`\`

## Common Patterns

### Center Everything

\`\`\`css
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

### Equal Width Columns

\`\`\`css
.equal-columns {
  display: flex;
  gap: 16px;
}

.column {
  flex: 1;  /* All columns equal width */
}
\`\`\`

### Sidebar Layout

\`\`\`css
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px;  /* Fixed width */
}

.main {
  flex: 1;  /* Takes remaining space */
}
\`\`\`

## Key Insight

Flexbox works along one axis at a time. Use flex-direction to choose whether items flow horizontally (row) or vertically (column).`
  },
  {
    id: "js-array-methods",
    category: "JavaScript",
    q: ["JavaScript array methods", "Array methods explained", "JS array functions"],
    title: "JavaScript Array Methods",
    body: `Array methods are essential for manipulating data in JavaScript.

## Transform Methods (Return New Array)

### map - Transform each element

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]
\`\`\`

### filter - Keep elements that pass a test

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6]
\`\`\`

### reduce - Combine into single value

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 10
\`\`\`

### flatMap - Map then flatten

\`\`\`javascript
const sentences = ["hello world", "foo bar"];
const words = sentences.flatMap(s => s.split(" "));
// ["hello", "world", "foo", "bar"]
\`\`\`

## Search Methods

### find - Get first match

\`\`\`javascript
const users = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
const user = users.find(u => u.id === 2);
// {id: 2, name: "Bob"}
\`\`\`

### some / every - Check conditions

\`\`\`javascript
const numbers = [2, 4, 6, 8];
numbers.every(n => n % 2 === 0);  // true (all even)
numbers.some(n => n > 5);         // true (some > 5)
\`\`\`

## Mutation Methods (Modify Original)

\`\`\`javascript
const arr = [1, 2, 3];
arr.push(4);        // [1, 2, 3, 4]
arr.pop();          // [1, 2]
arr.unshift(0);     // [0, 1, 2]
arr.splice(1, 1);   // [0, 2] - removes 1 item at index 1
\`\`\`

## Utility Methods

\`\`\`javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];

arr.includes(5);    // true
arr.indexOf(4);     // 2
arr.join(", ");     // "3, 1, 4, 1, 5, 9, 2, 6"
arr.slice(2, 5);    // [4, 1, 5] - copy portion
arr.flat();         // Flatten nested arrays
arr.sort((a, b) => a - b);  // Sort numbers ascending
\`\`\`

## Chaining

\`\`\`javascript
const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 === 0)
  .map(n => n * 10)
  .reduce((sum, n) => sum + n, 0);
// 60 (20 + 40)
\`\`\`

Master these methods to write clean, functional JavaScript.`
  },
  {
    id: "react-hooks-deep-dive",
    category: "React",
    q: ["React hooks explained", "How do hooks work?", "useState useEffect explained"],
    title: "React Hooks Deep Dive",
    body: `Hooks let React components use state and lifecycle features without classes.

## useState - Managing State

\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // With initial function (for expensive computation)
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("savedData"));
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Add 1</button>
      <button onClick={() => setCount(c => c - 1)}>Subtract 1</button>
    </div>
  );
}
\`\`\`

## useEffect - Side Effects

\`\`\`jsx
import { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Run when userId changes
  useEffect(() => {
    let cancelled = false;

    fetch("/api/users/" + userId)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setUser(data);
      });

    // Cleanup function
    return () => { cancelled = true; };
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return <h2>{user.name}</h2>;
}
\`\`\`

## useRef - DOM Access and Mutable Values

\`\`\`jsx
import { useRef, useEffect } from "react";

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto focused" />;
}
\`\`\`

## useMemo and useCallback - Performance

\`\`\`jsx
import { useMemo, useCallback } from "react";

function ProductList({ products, filter }) {
  // Memoize expensive computation
  const filtered = useMemo(
    () => products.filter(p => p.category === filter),
    [products, filter]
  );

  // Memoize function reference
  const handleClick = useCallback((id) => {
    console.log("Clicked:", id);
  }, []);

  return filtered.map(p => (
    <Product key={p.id} data={p} onClick={handleClick} />
  ));
}
\`\`\`

## Custom Hooks

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [theme, setTheme] = useLocalStorage("theme", "light");
\`\`\`

## Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Custom hooks must start with "use"

Hooks make React components simpler and more reusable.`
  },
  {
    id: "typescript-generics",
    category: "TypeScript",
    q: ["TypeScript generics", "Generics in TypeScript", "Generic types explained"],
    title: "TypeScript Generics",
    body: `Generics allow you to write flexible, reusable code that works with multiple types while maintaining type safety.

## Basic Generic Function

\`\`\`typescript
// Without generics - loses type info
function identity(arg: any): any {
  return arg;
}

// With generics - preserves type
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");  // Type: string
const num = identity<number>(42);          // Type: number
\`\`\`

## Generic Interface

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with different types
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success"
};

const postResponse: ApiResponse<Post> = {
  data: { id: 1, title: "Hello" },
  status: 200,
  message: "Success"
};
\`\`\`

## Generic Constraints

\`\`\`typescript
// Constrain T to have a .length property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");       // OK: string has length
logLength([1, 2, 3]);     // OK: array has length
logLength({ length: 10 }); // OK: has length property
// logLength(42);          // Error: number has no length
\`\`\`

## Generic Classes

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
// numberStack.push("hello");  // Error: string not allowed
\`\`\`

## Generic Utility Types

\`\`\`typescript
// Partial - all properties optional
type UserUpdate = Partial<User>;

// Required - all properties required
type CompleteUser = Required<User>;

// Pick - select specific properties
type UserBasic = Pick<User, "id" | "name">;

// Omit - remove specific properties
type UserWithoutEmail = Omit<User, "email">;
\`\`\`

## When to Use Generics

1. Writing reusable utility functions
2. Creating type-safe data structures
3. Building library/framework code
4. When the type depends on input

Generics are one of TypeScript's most powerful features for writing flexible, type-safe code.`
  },
  {
    id: "git-commands-advanced",
    category: "Git",
    q: ["Git commands", "Advanced git", "Git workflow"],
    title: "Git Commands Reference",
    body: `Git commands for version control and collaboration.

## Essential Commands

### Status and Changes

\`\`\`bash
git status                    # See what changed
git diff                      # See unstaged changes
git diff --staged             # See staged changes
git log --oneline --graph     # Visual commit history
\`\`\`

### Staging and Committing

\`\`\`bash
git add file.js               # Stage specific file
git add .                     # Stage all changes
git commit -m "message"       # Commit staged changes
git commit --amend            # Edit last commit
\`\`\`

### Branching

\`\`\`bash
git branch                    # List branches
git branch feature/login      # Create branch
git checkout feature/login    # Switch branch
git checkout -b feature/login # Create and switch
git branch -d feature/login   # Delete branch
\`\`\`

### Merging and Rebasing

\`\`\`bash
git checkout main
git merge feature/login       # Merge branch into main
git rebase main               # Rebase current branch onto main
\`\`\`

### Remote Operations

\`\`\`bash
git remote add origin URL     # Add remote
git push -u origin main       # Push and set upstream
git pull origin main          # Fetch and merge
git fetch origin              # Fetch without merge
\`\`\`

## Useful Shortcuts

\`\`\`bash
git stash                     # Save uncommitted changes
git stash pop                 # Restore stashed changes
git reset HEAD file.js        # Unstage a file
git revert HEAD               # Undo last commit (creates new commit)
git reset --hard HEAD         # Discard all changes (dangerous)
\`\`\`

## Commit Message Convention

\`\`\`
feat: add login page          # New feature
fix: resolve form submission  # Bug fix
docs: update README           # Documentation
style: format code            # Formatting changes
refactor: extract utils       # Code restructuring
test: add unit tests          # Adding tests
\`\`\`

## Branching Strategy

\`\`\`
main (production)
  |
  +-- feature/login (new feature)
  +-- feature/signup (new feature)
  +-- fix/header-bug (bug fix)
\`\`\`

Git is essential for tracking changes and collaborating with other developers.`
  },
  {
    id: "api-concepts",
    category: "Web Development",
    q: ["What is an API?", "How do APIs work?", "REST API concepts"],
    title: "API Concepts",
    body: `APIs (Application Programming Interfaces) allow different software systems to communicate with each other.

## What is an API?

An API is a set of rules that defines how one program can request data or services from another.

## REST API Basics

### HTTP Methods

\`\`\`
GET    - Retrieve data (read)
POST   - Create new resource
PUT    - Update entire resource
PATCH  - Partial update
DELETE - Remove resource
\`\`\`

### Example with Express.js

\`\`\`javascript
const express = require("express");
const app = express();

// GET all users
app.get("/api/users", async (req, res) => {
  const users = await db.users.findMany();
  res.json(users);
});

// GET single user
app.get("/api/users/:id", async (req, res) => {
  const user = await db.users.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

// POST create user
app.post("/api/users", async (req, res) => {
  const user = await db.users.create({ data: req.body });
  res.status(201).json(user);
});

// PUT update user
app.put("/api/users/:id", async (req, res) => {
  const user = await db.users.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  });
  res.json(user);
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
  await db.users.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.status(204).send();
});
\`\`\`

## Status Codes

\`\`\`
200 OK                    - Success
201 Created               - Resource created
204 No Content            - Success, no response body
400 Bad Request           - Invalid input
401 Unauthorized          - Authentication required
403 Forbidden             - No permission
404 Not Found             - Resource does not exist
500 Internal Server Error - Server error
\`\`\`

## Authentication

\`\`\`javascript
// API Key
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== VALID_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  next();
});

// JWT Token
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});
\`\`\`

## Fetch API (Client Side)

\`\`\`javascript
// GET request
const response = await fetch("https://api.example.com/users");
const data = await response.json();

// POST request
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" })
});
\`\`\`

APIs are the backbone of modern web and mobile applications.`
  },
  {
    id: "database-queries",
    category: "Databases",
    q: ["SQL queries", "Database queries", "How to query a database"],
    title: "Database Query Basics",
    body: `Database queries retrieve, insert, update, and delete data using SQL.

## SELECT Queries

\`\`\`sql
-- Basic select
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE age > 18;

-- Multiple conditions
SELECT * FROM users WHERE age > 18 AND active = true;

-- Sort results
SELECT * FROM users ORDER BY name ASC;

-- Limit results
SELECT * FROM users LIMIT 10;
\`\`\`

## INSERT Queries

\`\`\`sql
-- Insert single row
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 25);

-- Insert multiple rows
INSERT INTO users (name, email, age) VALUES
  ('Bob', 'bob@example.com', 30),
  ('Charlie', 'charlie@example.com', 35);
\`\`\`

## UPDATE Queries

\`\`\`sql
-- Update specific row
UPDATE users
SET name = 'Alice Smith', age = 26
WHERE id = 1;

-- Update multiple rows
UPDATE users
SET active = false
WHERE last_login < '2024-01-01';
\`\`\`

## DELETE Queries

\`\`\`sql
-- Delete specific row
DELETE FROM users WHERE id = 1;

-- Delete with condition
DELETE FROM users WHERE active = false;
\`\`\`

## JOIN Queries

\`\`\`sql
-- Inner join: only matching records
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Left join: all from left table
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Multiple tables
SELECT users.name, orders.total, products.name
FROM users
INNER JOIN orders ON users.id = orders.user_id
INNER JOIN products ON orders.product_id = products.id;
\`\`\`

## Aggregation

\`\`\`sql
-- Count rows
SELECT COUNT(*) FROM users;

-- Group and count
SELECT role, COUNT(*) as count
FROM users
GROUP BY role;

-- Average
SELECT AVG(age) FROM users;

-- Sum
SELECT SUM(total) FROM orders;
\`\`\`

## Indexing for Performance

\`\`\`sql
-- Create index on frequently queried column
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
\`\`\`

SQL is the standard language for working with relational databases.`
  },
  {
    id: "web-security",
    category: "Security",
    q: ["Web security basics", "How to secure a website", "Security best practices"],
    title: "Web Security Basics",
    body: `Web security protects your application and users from attacks and data breaches.

## Common Attacks

### XSS (Cross-Site Scripting)

\`\`\`javascript
// Problem: User input injected into page
element.innerHTML = userInput;  // Dangerous!

// Solution: Sanitize input
function sanitize(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}
\`\`\`

### SQL Injection

\`\`\`javascript
// Problem: Direct string concatenation
const query = "SELECT * FROM users WHERE name = '" + name + "'";

// Solution: Use parameterized queries
const query = "SELECT * FROM users WHERE name = ?";
db.run(query, [name]);
\`\`\`

### CSRF (Cross-Site Request Forgery)

\`\`\`javascript
// Solution: Use CSRF tokens
app.post("/transfer", (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  // Process transfer
});
\`\`\`

## Security Headers

\`\`\`javascript
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000");
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});
\`\`\`

## Password Security

\`\`\`javascript
const bcrypt = require("bcrypt");

// Hash password
async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

// Verify password
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
\`\`\`

## Input Validation

\`\`\`javascript
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8
    && /[A-Z]/.test(password)
    && /[a-z]/.test(password)
    && /[0-9]/.test(password);
}
\`\`\`

## HTTPS

- Always use HTTPS in production
- Obtain SSL certificates (Let's Encrypt is free)
- Redirect HTTP to HTTPS
- Use HSTS header

## Checklist

1. Validate all user input
2. Use parameterized queries
3. Hash passwords with bcrypt
4. Set security headers
5. Use HTTPS
6. Implement CSRF protection
7. Keep dependencies updated
8. Limit login attempts
9. Use Content Security Policy
10. Regular security audits

Security is not optional. Implement these practices in every web application.`
  },
  {
    id: "package-management",
    category: "Tools",
    q: ["What is npm?", "Package management", "How to use npm"],
    title: "Package Management",
    body: `Package managers install, update, and manage dependencies (libraries and tools) for your project.

## npm (Node Package Manager)

### Initialize a Project

\`\`\`bash
npm init -y          # Create package.json with defaults
\`\`\`

### Install Packages

\`\`\`bash
npm install express         # Install and save to dependencies
npm install --save-dev jest  # Install as dev dependency
npm install -g nodemon       # Install globally
\`\`\`

### package.json

\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest",
    "build": "vite build"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^3.0.0"
  }
}
\`\`\`

### Common Commands

\`\`\`bash
npm install               # Install all dependencies
npm update                # Update packages
npm run start             # Run start script
npm run dev               # Run dev script
npm run build             # Run build script
npm list                  # List installed packages
npm outdated              # Check for updates
\`\`\`

## Yarn

\`\`\`bash
yarn init                 # Initialize project
yarn add express          # Install package
yarn add --dev jest       # Dev dependency
yarn remove express       # Uninstall package
yarn install              # Install all dependencies
yarn run start            # Run script
\`\`\`

## pnpm

\`\`\`bash
pnpm init                 # Initialize project
pnpm add express          # Install package
pnpm add -D jest          # Dev dependency
pnpm install              # Install all dependencies
\`\`\`

## Choosing a Package Manager

- **npm**: Default, comes with Node.js, widely used
- **yarn**: Faster installs, deterministic lockfile
- **pnpm**: Most efficient disk usage, strict

## Best Practices

1. Lock your dependencies (package-lock.json, yarn.lock)
2. Use specific versions in production
3. Review packages before installing
4. Keep dependencies updated
5. Remove unused packages

Package managers save time and ensure consistent environments across teams.`
  }
];
