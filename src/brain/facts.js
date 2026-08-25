/**
 * The knowledge 360AI ships with.
 *
 * This file *is* the general knowledge — there is no model, so anything not
 * written down here or taught by the user is honestly answered with "I don't
 * know". Keep entries short, stable and checkable; nothing that goes out of
 * date within a year belongs here.
 *
 * `q` holds the phrasings that should hit the entry. Matching is fuzzy, so
 * three or four representative phrasings are plenty.
 */

export const FACTS = [
  /* ------------------------------------------------------- about the app */
  {
    q: ['what is 360ai', 'ano ang 360ai', 'about 360ai', 'sino ka', 'who are you', 'sin-o ka'],
    a:
      "I'm **360AI** — an assistant that runs completely on your own device, written in plain " +
      'JavaScript. No provider, no account, no server, and nothing to download. That also means ' +
      "my knowledge is only what's built into me plus whatever you teach me.",
  },
  {
    q: ['do you need internet', 'kailangan ba internet', 'nagakinahanglan bala sang internet', 'offline ka bala', 'work offline'],
    a:
      'No. Everything happens inside your browser on this device. You can switch the Wi-Fi off ' +
      'and I will keep working exactly the same — nothing is ever sent anywhere.',
  },
  {
    q: ['what can you do', 'ano ang kaya mo', 'ano ang mahimo mo', 'help', 'skills', 'commands'],
    a: 'SKILL_LIST', // replaced at runtime with the live skill list
  },
  {
    q: ['are you chatgpt', 'are you an llm', 'llm ka bala', 'ano nga model gingamit mo', 'what model do you use'],
    a:
      "No. I'm not a large language model and I have no weights to download. I'm a rules engine: " +
      'I recognise what you are asking, compute the answer, and look things up in my knowledge ' +
      'base. That is why I am instant and tiny — and also why I cannot answer everything.',
  },
  {
    q: ['why don\'t you know', 'ngaa indi ka kabalo', 'bakit hindi mo alam', 'you are limited'],
    a:
      "Because I have no trained model behind me — only the facts written into me and the ones " +
      'you teach me. If you tell me something with **remember: X = Y**, I will know it from then ' +
      'on, on this device, forever.',
  },
  {
    q: ['how do i teach you', 'paano kita matudluan', 'paano kita tuturuan', 'remember command', 'teach you'],
    a:
      'Type **remember: <question> = <answer>**. For example `remember: my number = 0917-000-0000`. ' +
      'Ask **what do you know** to see everything you have taught me, and **forget: <question>** to remove one.',
  },
  {
    q: [
      'answer length', 'make it shorter', 'shorter answers', 'too long', 'elaborate',
      'longer answers', 'control the length',
    ],
    a:
      'Say **shorter** and I will trim my answers to the point; say **elaborate** and I will give ' +
      'the fuller version, including anything extra I hold on the subject. Either one also ' +
      're-answers the question you just asked, at the new length. Say **normal** to go back.',
  },
  {
    q: ['is my data private', 'private bala', 'ligtas ba ang data ko', 'where are my chats stored'],
    a:
      "Your chats live in this browser's IndexedDB, on this device only. There is no server to " +
      'send them to. Settings → Export everything writes them to a file if you want a backup.',
  },
  {
    q: ['how do i install', 'paano i-install', 'add to home screen', 'install app'],
    a:
      'On **iPhone/iPad**: Share → Add to Home Screen. On **Android**: ⋮ menu → Add to Home screen. ' +
      'On a **computer**: the install icon in the address bar. After that it opens like a normal app, offline.',
  },

  /* ---------------------------------------------------------- Philippines */
  {
    q: ['capital of the philippines', 'kapital sang pilipinas', 'kabisera ng pilipinas'],
    a:
 'The capital of the Philippines is **Manila**. The largest city by population is Quezon City.',
  },
  {
    q: ['how many islands philippines', 'pila ka isla ang pilipinas', 'ilang isla ang pilipinas'],
    a:
 'The Philippines has **7,641 islands** (the 2016 survey added 534 to the long-quoted 7,107).',
  },
  {
    q: ['what is hiligaynon', 'ano ang hiligaynon', 'ilonggo language'],
    a:
      '**Hiligaynon** (Ilonggo) is a Visayan language spoken by around 9 million people, mainly in ' +
      'Iloilo, Negros Occidental, Capiz, Guimaras and Antique.',
  },
  {
    q: ['languages in the philippines', 'pila ka lenguahe sa pilipinas', 'ilang wika sa pilipinas'],
    a:
      'There are around **175 living languages** in the Philippines. Filipino and English are the ' +
      'official ones; Cebuano, Hiligaynon, Ilocano, Bikol, Waray, Kapampangan and Pangasinan are among the largest.',
  },
  {
    q: ['regions of the philippines', 'pila ka rehiyon', 'how many regions philippines'],
    a: 'The Philippines has **18 regions**, 82 provinces, and over 42,000 barangays.',
  },

  /* ------------------------------------------------------------- science */
  {
    q: ['speed of light', 'kadasig sang kasanag', 'bilis ng liwanag'],
    a: 'Light travels at **299,792,458 metres per second** in a vacuum — about 300,000 km/s.',
  },
  {
    q: ['boiling point of water', 'freezing point of water', 'init sang tubig'],
    a: 'At sea level water freezes at **0 °C (32 °F)** and boils at **100 °C (212 °F)**.',
  },
  {
    q: ['how many planets', 'pila ka planeta', 'planets in the solar system'],
    a:
      'Eight: **Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.** Pluto has been a ' +
      'dwarf planet since 2006.',
  },
  {
    q: ['how many continents', 'pila ka kontinente', 'ilang kontinente'],
    a: 'Seven: **Africa, Antarctica, Asia, Europe, North America, Oceania, South America.**',
  },
  {
    q: ['how many bones in the human body', 'pila ka tul-an', 'ilang buto sa katawan'],
    a: 'An adult human has **206 bones**. A newborn has about 270 — some fuse while growing.',
  },
  {
    q: ['how much water should i drink', 'pila ka tubig ang inumon', 'daily water intake'],
    a:
      'The common guidance is about **2–2.5 litres a day** for adults, including what comes from ' +
      'food. Needs vary with heat, size and activity — this is general information, not medical advice.',
  },
  {
    q: ['what is dna', 'ano ang dna'],
    a:
      '**DNA** (deoxyribonucleic acid) is the molecule carrying the genetic instructions of living ' +
      'things. Its four bases — A, T, G, C — pair up along a double helix.',
  },

  /* ---------------------------------------------------------- computing */
  {
    q: ['what is javascript', 'ano ang javascript'],
    a:
      '**JavaScript** is the programming language browsers run. Everything in 360AI — this answer ' +
      'included — is plain JavaScript executing on your device.',
  },
  {
    q: ['what is a pwa', 'ano ang pwa', 'progressive web app'],
    a:
      'A **Progressive Web App** is a website that can be installed like a native app: it gets an ' +
      'icon, opens without browser chrome, and works offline through a service worker.',
  },
  {
    q: ['what is ai', 'ano ang ai', 'artificial intelligence'],
    a:
      '**Artificial intelligence** is any system that performs tasks we associate with human ' +
      'reasoning. It covers both trained models (which learn patterns from data) and rules engines ' +
      'like me (which follow logic a person wrote).',
  },
  {
    q: ['what is an llm', 'ano ang llm', 'large language model'],
    a:
      'A **large language model** predicts the next piece of text from patterns learned over huge ' +
      'amounts of writing. Its knowledge lives in billions of numbers called weights — which is why ' +
      'an LLM needs a multi-gigabyte download and I do not.',
  },
  {
    q: ['what is indexeddb', 'ano ang indexeddb'],
    a: '**IndexedDB** is the browser\'s built-in database. 360AI keeps your chats and taught facts there, on this device.',
  },
  {
    q: ['binary to decimal', 'ano ang binary', 'what is binary'],
    a:
      '**Binary** counts with only 0 and 1, each place worth twice the one to its right: ' +
      '1011 = 8+0+2+1 = **11**. Computers use it because a circuit is either on or off.',
  },
  {
    q: ['how many bytes in a megabyte', 'pila ka byte sa megabyte'],
    a:
      '1 MB = 1,000,000 bytes in decimal (what storage makers use), or 1,048,576 bytes as a MiB ' +
      '(what operating systems often show). Ask me to convert and I will do the arithmetic.',
  },

  /* ------------------------------------------------------- everyday life */
  {
    q: ['how many days in a year', 'pila ka adlaw sa isa ka tuig'],
    a: 'A normal year has **365 days**; a leap year has 366. Leap years are divisible by 4, except centuries not divisible by 400.',
  },
  {
    q: ['days in each month', 'pila ka adlaw kada bulan'],
    a:
      '31 days: January, March, May, July, August, October, December. 30 days: April, June, ' +
      'September, November. February has 28, or 29 in a leap year.',
  },
  {
    q: ['how many hours of sleep', 'pila ka oras nga tulog', 'ilang oras na tulog'],
    a:
      'Adults generally do best on **7–9 hours** a night, teenagers on 8–10, and young children on ' +
      'more still. General information, not medical advice.',
  },
  {
    q: ['emergency number philippines', 'emergency hotline'],
    a: 'In the Philippines the national emergency hotline is **911**. The Red Cross is 143.',
  },
  {
    q: ['what is bmi', 'how to compute bmi'],
    a:
      '**BMI** = weight in kg ÷ (height in metres)². Roughly: under 18.5 underweight, 18.5–24.9 ' +
      'normal, 25–29.9 overweight, 30+ obese. It is a crude screen, not a diagnosis.',
  },
  {
    q: ['tip calculation', 'how much to tip', 'service charge'],
    a: 'Ask me directly — for example `15% of 850` — and I will work it out. In the Philippines a service charge is often already on the bill.',
  },

  /* ------------------------------------------------------- programming */
  {
    q: ['what is html', 'ano ang html', 'hypertext markup language'],
    a: '**HTML (HyperText Markup Language)** structures web content. It uses elements like `<h1>`, `<p>`, `<div>`, `<a>`, and `<img>` to define headings, paragraphs, links, and images.',
  },
  {
    q: ['what is css', 'ano ang css', 'cascading style sheets'],
    a: '**CSS (Cascading Style Sheets)** controls how HTML elements look — colors, layout, fonts, spacing. It uses selectors to target elements and properties to style them.',
  },
  {
    q: ['what is react', 'ano ang react', 'react js'],
    a: '**React** is a JavaScript library for building user interfaces. It uses components, JSX, and a virtual DOM to efficiently update the UI when data changes.',
  },
  {
    q: ['what is nextjs', 'ano ang nextjs', 'next js framework'],
    a: '**Next.js** is a React framework that adds server-side rendering, file-based routing, automatic code splitting, and optimized build settings.',
  },
  {
    q: ['what is typescript', 'ano ang typescript'],
    a: '**TypeScript** is JavaScript with static types. It catches errors at compile time, provides better autocomplete, and compiles to plain JavaScript.',
  },
  {
    q: ['what is nodejs', 'ano ang nodejs', 'node js'],
    a: '**Node.js** is a JavaScript runtime built on Chrome\'s V8 engine. It lets you run JavaScript on the server, enabling full-stack JavaScript development.',
  },
  {
    q: ['what is git', 'ano ang git', 'version control'],
    a: '**Git** is a version control system that tracks changes in code. It lets developers collaborate, branch for features, and maintain a complete history of changes.',
  },
  {
    q: ['what is npm', 'ano ang npm', 'node package manager'],
    a: '**npm (Node Package Manager)** is the default package manager for JavaScript. It manages project dependencies and provides access to over a million open-source packages.',
  },
  {
    q: ['what is webpack', 'ano ang webpack'],
    a: '**Webpack** is a module bundler that compiles JavaScript, CSS, and assets into optimized bundles for the browser. Vite is a faster alternative.',
  },
  {
    q: ['what is api', 'ano ang api', 'application programming interface'],
    a: '**API (Application Programming Interface)** is a set of rules that lets one program communicate with another. REST APIs use HTTP methods; GraphQL uses queries.',
  },
  {
    q: ['what is json', 'ano ang json', 'javascript object notation'],
    a: '**JSON (JavaScript Object Notation)** is a lightweight data format using key-value pairs. It\'s the standard for data exchange between servers and browsers.',
  },
  {
    q: ['what is a database', 'ano ang database'],
    a: '**Database** is an organized store of data. Relational databases (MySQL, PostgreSQL) use tables and SQL. NoSQL databases (MongoDB) use flexible documents.',
  },
  {
    q: ['what is rest api', 'rest api explained', 'restful api'],
    a: '**REST API** uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources identified by URLs. It\'s stateless and uses JSON for data.',
  },
  {
    q: ['what is graphql', 'graphql explained'],
    a: '**GraphQL** is a query language for APIs that lets clients request exactly the data they need. It uses a single endpoint and a strongly-typed schema.',
  },
  {
    q: ['what is docker', 'docker explained', 'containerization'],
    a: '**Docker** packages applications into lightweight, portable containers. Containers include everything needed to run, ensuring consistent behavior across environments.',
  },
  {
    q: ['what is responsive design', 'responsive web design explained'],
    a: '**Responsive design** makes websites work on all screen sizes using flexible grids, media queries, and relative units. Mobile-first is the recommended approach.',
  },
  {
    q: ['what is accessibility', 'web accessibility', 'a11y'],
    a: '**Web accessibility** ensures websites work for everyone, including people with disabilities. Use semantic HTML, alt text, keyboard navigation, and sufficient color contrast.',
  },
  {
    q: ['what is seo', 'search engine optimization'],
    a: '**SEO (Search Engine Optimization)** improves your website\'s visibility in search results through quality content, proper headings, meta tags, and fast loading.',
  },
  {
    q: ['what is dom', 'document object model'],
    a: '**DOM (Document Object Model)** is the tree structure a browser creates from HTML. JavaScript interacts with the DOM to dynamically change content and styles.',
  },
  {
    q: ['what is virtual dom', 'virtual dom explained'],
    a: '**Virtual DOM** is a lightweight copy of the real DOM used by React. It compares old and new versions to find the minimum changes needed, making updates faster.',
  },
  {
    q: ['what is closure', 'javascript closure', 'closures explained'],
    a: '**Closure** is when a function remembers variables from its outer scope even after the outer function has returned. Commonly used for data privacy and callbacks.',
  },
  {
    q: ['what is async', 'async javascript', 'asynchronous programming'],
    a: '**Asynchronous programming** lets code run without blocking. Use `async/await` or Promises for operations like API calls, file reading, or timers.',
  },
  {
    q: ['what is promise', 'javascript promise', 'promises explained'],
    a: '**Promise** is an object representing the eventual completion or failure of an async operation. Use `.then()` and `.catch()` or `async/await` to handle results.',
  },
  {
    q: ['what is hook', 'react hook', 'hooks in react'],
    a: '**Hooks** are functions that let React components use state and lifecycle features. `useState` manages state, `useEffect` handles side effects, `useContext` reads context.',
  },
  {
    q: ['what is state', 'react state', 'state in react'],
    a: '**State** is data managed inside a React component. When state changes, the component re-renders. Use `useState` for local state, context or external stores for global state.',
  },
  {
    q: ['what is props', 'react props', 'properties in react'],
    a: '**Props** are data passed from parent to child components. They are read-only. Use them to configure child components or pass callback functions.',
  },
  {
    q: ['what is component', 'react component', 'components in react'],
    a: '**Components** are reusable UI pieces in React. They are functions that return JSX. Keep them small, focused, and composed together for complex interfaces.',
  },
  {
    q: ['what is jsx', 'jsx explained', 'javascript xml'],
    a: '**JSX** is syntax that lets you write HTML-like code in JavaScript. It compiles to `React.createElement()` calls. Use `className` instead of `class`, and close self-closing tags.',
  },
  {
    q: ['what is typescript', 'ts explained', 'types in typescript'],
    a: '**TypeScript** adds static types to JavaScript. Define interfaces for object shapes, use union types for multiple possibilities, and generics for reusable types.',
  },
  {
    q: ['what is algorithm', 'algorithm explained'],
    a: '**Algorithm** is a step-by-step procedure for solving a problem. Common types: sorting (merge sort), searching (binary search), and graph traversal (BFS/DFS).',
  },
  {
    q: ['what is big o', 'big o notation', 'time complexity'],
    a: '**Big O notation** describes how performance scales with input size. O(1) is constant, O(log n) is logarithmic, O(n) is linear, O(n²) is quadratic.',
  },
  {
    q: ['what is recursion', 'recursion explained', 'recursive function'],
    a: '**Recursion** is when a function calls itself with a smaller input. It needs a base case to stop. Common uses: tree traversal, factorials, Fibonacci.',
  },
  {
    q: ['what is sorting', 'sorting algorithms', 'types of sorting'],
    a: '**Sorting** arranges data in order. Common algorithms: bubble sort (O(n²)), merge sort (O(n log n)), quick sort (O(n log n) average).',
  },
  {
    q: ['what is cybersecurity', 'cybersecurity explained', 'information security'],
    a: '**Cybersecurity** protects systems and data from digital attacks. Use strong passwords, enable 2FA, keep software updated, and never click suspicious links.',
  },
  {
    q: ['what is encryption', 'encryption explained', 'data encryption'],
    a: '**Encryption** scrambles data so only authorized parties can read it. Symmetric uses one key; asymmetric uses a public-private key pair.',
  },
  {
    q: ['what is https', 'https explained', 'ssl tls'],
    a: '**HTTPS** is HTTP with encryption (TLS). It verifies the server\'s identity and encrypts data in transit. Always use HTTPS for sensitive information.',
  },
  {
    q: ['what is dns', 'dns explained', 'domain name system'],
    a: '**DNS** translates domain names (google.com) to IP addresses (142.250.80.46). It works like a phone book for the internet.',
  },
  {
    q: ['what is tcp', 'tcp explained', 'transmission control protocol'],
    a: '**TCP** is a reliable transport protocol that ensures data arrives complete and in order. Used for web, email, and file transfer. UDP is faster but unreliable.',
  },
  {
    q: ['what is load balancer', 'load balancing explained'],
    a: '**Load balancer** distributes incoming traffic across multiple servers. It prevents any single server from being overwhelmed and improves availability.',
  },
  {
    q: ['what is cdn', 'content delivery network'],
    a: '**CDN** is a network of servers distributed globally. It caches static content closer to users, reducing latency and improving load times.',
  },
  {
    q: ['what is caching', 'caching explained', 'browser cache'],
    a: '**Caching** stores frequently accessed data in a fast-access location. Browser caching stores assets locally; server caching stores query results.',
  },
  {
    q: ['what is agile', 'agile methodology'],
    a: '**Agile** is a project management approach that delivers work in small increments. It emphasizes collaboration, customer feedback, and adapting to change.',
  },
  {
    q: ['what is scrum', 'scrum methodology'],
    a: '**Scrum** is an Agile framework with sprints (1-4 weeks), daily standups, and defined roles (Scrum Master, Product Owner, Team).',
  },
  {
    q: ['what is ci cd', 'ci cd explained', 'continuous integration'],
    a: '**CI/CD** automates code integration, testing, and deployment. CI runs tests on every commit; CD automatically deploys passing builds.',
  },
  {
    q: ['what is ux', 'user experience', 'ux design'],
    a: '**UX (User Experience)** is how easy and pleasant a product is to use. Good UX involves research, wireframing, testing, and iterative improvement.',
  },
  {
    q: ['what is ui', 'user interface', 'ui design'],
    a: '**UI (User Interface)** is the visual part of a product — buttons, colors, typography, layout. Good UI is consistent, accessible, and intuitive.',
  },
  {
    q: ['what is dark pattern', 'dark pattern ux', 'deceptive design'],
    a: '**Dark patterns** are deceptive UI designs that trick users into unintended actions — hidden costs, forced continuity, misdirection. They harm user trust.',
  },
  {
    q: ['what is mvp', 'minimum viable product'],
    a: '**MVP (Minimum Viable Product)** is a version with just enough features to test core assumptions with real users. It validates ideas before building the full product.',
  },
  {
    q: ['what is startup', 'startup explained'],
    a: '**Startup** is a company designed to grow fast, typically in tech. It operates with limited resources, tests ideas quickly, and scales successful ones.',
  },
  {
    q: ['what is pivot', 'startup pivot'],
    a: '**Pivot** is a fundamental change in a startup\'s direction based on market feedback. It keeps what works and changes what doesn\'t.',
  },
]

/**
 * Everything above, flattened into one lookup list. `source` distinguishes the
 * built-in entries from the ones the user taught, which matters for editing.
 */
export function builtinEntries() {
  return FACTS.map((f, i) => ({
    id: `builtin-${i}`,
    source: 'builtin',
    q: f.q,
    a: f.a,
  }))
}
