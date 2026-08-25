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
  }
];
