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
    a:
      '**Pivot** is a fundamental change in a startup\'s direction based on market feedback. It keeps what works and changes what doesn\'t.',
  },

  /* ------------------------------------------------------------- science */
  {
    q: ['what is gravity', 'gravity explained', 'ano ang grabidad'],
    a:
      '**Gravity** is the force that attracts objects with mass toward each other. On Earth it gives weight to objects and causes them to fall when dropped. The more massive the object, the stronger its gravitational pull.',
  },
  {
    q: ['what is evolution', 'theory of evolution', 'ano ang ebolusyon'],
    a:
      '**Evolution** is the process by which living things change over generations through natural selection. Organisms with traits suited to their environment survive and reproduce more, passing those traits to offspring.',
  },
  {
    q: ['what is photosynthesis', 'photosynthesis explained', 'ano ang photosynthesis'],
    a:
      '**Photosynthesis** is the process plants use to convert sunlight, water, and carbon dioxide into glucose (food) and oxygen. It is the basis of most food chains on Earth.',
  },
  {
    q: ['what is an atom', 'atom explained', 'ano ang atom'],
    a:
      '**Atoms** are the basic building blocks of matter. They consist of a nucleus (protons and neutrons) surrounded by electrons. Atoms bond together to form molecules and everything around us.',
  },
  {
    q: ['what is energy', 'energy explained', 'ano ang enerhiya'],
    a:
      '**Energy** is the ability to do work or cause change. It exists in forms like kinetic (motion), potential (stored), thermal (heat), chemical, electrical, and nuclear energy. Energy cannot be created or destroyed, only transformed.',
  },
  {
    q: ['what is electricity', 'electricity explained', 'ano ang kuryente'],
    a:
      '**Electricity** is the flow of electrical charge, usually through wires. It is caused by the movement of electrons and powers lights, devices, and machines throughout the world.',
  },
  {
    q: ['what is magnetism', 'magnetism explained', 'ano ang magnetismo'],
    a:
      '**Magnetism** is a force produced by moving electric charges. Magnets have north and south poles; like poles repel and opposite poles attract. Earth itself is a giant magnet, which is why compasses point north.',
  },
  {
    q: ['what is sound', 'how does sound work', 'ano ang tunog'],
    a:
      '**Sound** is a vibration that travels as a wave through a medium like air, water, or solids. It is produced by vibrating objects and detected by our ears. Sound waves have frequency (pitch) and amplitude (loudness).',
  },
  {
    q: ['what is light', 'what is sunlight', 'ano ang liwanag'],
    a:
      '**Light** is electromagnetic radiation visible to the human eye. It travels at about 300,000 km/s, the fastest speed in the universe. Light behaves as both a wave and a particle (photon).',
  },
  {
    q: ['what is matter', 'matter explained', 'ano ang bagay'],
    a:
      '**Matter** is anything that has mass and takes up space. It is made of atoms and exists in different states: solid, liquid, gas, and plasma. Everything you can touch is matter.',
  },
  {
    q: ['what are states of matter', 'states of matter', 'ano ang estado ng bagay'],
    a:
      'The four states of matter are **solid** (fixed shape and volume), **liquid** (fixed volume, takes shape of container), **gas** (no fixed shape or volume), and **plasma** (ionized gas, like stars).',
  },
  {
    q: ['what is the water cycle', 'water cycle explained', 'ano ang siklo ng tubig'],
    a:
      'The **water cycle** is the continuous movement of water. Water evaporates from surfaces, rises, forms clouds (condensation), falls as rain (precipitation), and collects in rivers, lakes, and oceans.',
  },
  {
    q: ['what is friction', 'friction explained', 'ano ang friksiyon'],
    a:
      '**Friction** is the force that resists motion when two surfaces rub against each other. It slows moving objects and generates heat. Without friction, walking or gripping anything would be impossible.',
  },
  {
    q: ['what is inertia', 'inertia explained', 'ano ang inersiya'],
    a:
      '**Inertia** is the tendency of an object to resist changes in its state of motion. A stationary object stays still, and a moving object keeps moving at the same speed and direction unless a force acts on it.',
  },
  {
    q: ['what is force', 'force explained', 'ano ang puwersa'],
    a:
      '**Force** is a push or pull on an object. It is measured in Newtons. Forces can change an object\'s speed, direction, or shape. Newton\'s second law: Force = Mass x Acceleration.',
  },
  {
    q: ['what is pressure', 'pressure explained', 'ano ang presyon'],
    a:
      '**Pressure** is force applied per unit area. It is measured in Pascals (Pa). Atmospheric pressure is the weight of air above us. Pressure increases with depth underwater.',
  },
  {
    q: ['what is temperature', 'temperature explained', 'ano ang temperatura'],
    a:
      '**Temperature** measures how hot or cold something is. It reflects the average kinetic energy of particles. Common scales: Celsius (water boils at 100, freezes at 0), Fahrenheit (212 and 32), and Kelvin (absolute scale).',
  },

  /* --------------------------------------------------------------- math */
  {
    q: ['what is pi', 'value of pi', 'ano ang pi', 'ano ang pi sa math'],
    a:
      '**Pi** is the ratio of a circle\'s circumference to its diameter, approximately **3.14159**. It is an irrational number, meaning its decimal digits never end or repeat.',
  },
  {
    q: ['what is a prime number', 'prime number', 'ano ang prime number'],
    a:
      'A **prime number** is a whole number greater than 1 that has exactly two factors: 1 and itself. Examples: 2, 3, 5, 7, 11, 13. Prime numbers are the building blocks of all numbers.',
  },
  {
    q: ['what is fibonacci', 'fibonacci sequence', 'ano ang fibonacci'],
    a:
      'The **Fibonacci sequence** is a series where each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34. It appears in nature in spiral patterns like sunflowers and shells.',
  },
  {
    q: ['what is pythagorean theorem', 'pythagorean theorem', 'ano ang pythagorean theorem'],
    a:
      'The **Pythagorean theorem** states that in a right triangle, the square of the hypotenuse (c) equals the sum of the squares of the other two sides (a and b): **a squared + b squared = c squared**.',
  },
  {
    q: ['what is square root', 'square root explained', 'ano ang square root'],
    a:
      'A **square root** of a number is a value that, when multiplied by itself, gives the original number. For example, the square root of 9 is 3 because 3 x 3 = 9. Written as the radical symbol.',
  },
  {
    q: ['what is percentage', 'how to compute percentage', 'ano ang porsyento'],
    a:
      'A **percentage** is a number expressed as a fraction of 100. For example, 25% means 25 out of 100. To calculate: (part / whole) x 100 = percentage.',
  },
  {
    q: ['what is a fraction', 'fraction explained', 'ano ang fraction'],
    a:
      'A **fraction** represents part of a whole. It has a numerator (top number, how many parts) and a denominator (bottom number, total parts). Example: 3/4 means 3 out of 4 parts.',
  },
  {
    q: ['what is algebra', 'algebra explained', 'ano ang algebra'],
    a:
      '**Algebra** is a branch of math that uses symbols (like x and y) to represent unknown values and create equations. It lets us solve problems by finding unknown quantities.',
  },
  {
    q: ['what is geometry', 'geometry explained', 'ano ang geometry'],
    a:
      '**Geometry** is the branch of math dealing with shapes, sizes, positions, and properties of space. It covers points, lines, angles, surfaces, and solids.',
  },
  {
    q: ['what is calculus', 'calculus explained', 'ano ang calculus'],
    a:
      '**Calculus** is a branch of math studying change and motion. It has two main parts: **differential calculus** (rates of change and slopes) and **integral calculus** (accumulation and areas).',
  },
  {
    q: ['what is probability', 'probability explained', 'ano ang probability'],
    a:
      '**Probability** measures how likely an event is to happen, ranging from 0 (impossible) to 1 (certain). It is calculated as: number of favorable outcomes divided by total possible outcomes.',
  },
  {
    q: ['what is statistics', 'statistics explained', 'ano ang statistics'],
    a:
      '**Statistics** is the science of collecting, analyzing, and interpreting data. It helps us understand trends, make predictions, and draw conclusions from numerical information.',
  },
  {
    q: ['what is mean median mode', 'mean median mode explained', 'ano ang mean median mode'],
    a:
      '**Mean** is the average (add all values, divide by count). **Median** is the middle value when sorted. **Mode** is the most frequently occurring value. Together they summarize a data set.',
  },

  /* ----------------------------------------------------------- history */
  {
    q: ['who invented the internet', 'who created the internet', 'inventor of internet'],
    a:
      'The internet was not invented by one person. It grew from **ARPANET** (1969, US Department of Defense) and was developed by scientists including **Vint Cerf** and **Bob Kahn**, who created TCP/IP. Tim Berners-Lee later invented the World Wide Web in 1989.',
  },
  {
    q: ['who invented electricity', 'who discovered electricity', 'inventor of electricity'],
    a:
      'Electricity is a natural phenomenon, not invented. **Benjamin Franklin** famously experimented with it in 1752. **Thomas Edison** developed practical electric light bulbs, and **Nikola Tesla** pioneered alternating current (AC) power systems.',
  },
  {
    q: ['who invented the telephone', 'inventor of telephone', 'who invented phone'],
    a:
      '**Alexander Graham Bell** is credited with inventing the telephone in 1876. There is controversy as other inventors like **Elisha Gray** and **Antonio Meucci** were working on similar devices around the same time.',
  },
  {
    q: ['what is world war 1', 'world war 1 explained', 'ano ang world war 1'],
    a:
      '**World War 1** (1914-1918) was a global conflict between the Allied Powers (UK, France, Russia, US) and the Central Powers (Germany, Austria-Hungary, Ottoman Empire). It was triggered by the assassination of Archduke Franz Ferdinand and caused over 17 million deaths.',
  },
  {
    q: ['what is world war 2', 'world war 2 explained', 'ano ang world war 2'],
    a:
      '**World War 2** (1939-1945) was the deadliest conflict in history, fought between the Allies (UK, US, Soviet Union, France, China) and the Axis Powers (Germany, Italy, Japan). It ended with the atomic bombings of Hiroshima and Nagasaki.',
  },
  {
    q: ['who is the first president of the philippines', 'first president pilipinas', 'unang pangulo ng pilipinas'],
    a:
      '**Emilio Aguinaldo** was the first president of the Philippines. He led the Philippine Revolution against Spain and declared independence on June 12, 1898.',
  },
  {
    q: ['what is EDSA', 'EDSA revolution', 'ano ang EDSA', 'people power'],
    a:
      '**EDSA** (Epifanio de los Santos Avenue) is the site of the 1986 **People Power Revolution** that peacefully overthrew dictator Ferdinand Marcos and installed **Corazon Aquino** as president.',
  },
  {
    q: ['what is martial law', 'martial law philippines', 'ano ang martial law'],
    a:
      '**Martial law** is when military rule replaces normal law. In the Philippines, President **Ferdinand Marcos** declared martial law in 1972, leading to widespread human rights abuses, censorship, and political repression until 1981.',
  },

  /* ---------------------------------------------------------- geography */
  {
    q: ['what is the largest country', 'biggest country in the world', 'largest country by area'],
    a:
      '**Russia** is the largest country in the world by area, covering about **17.1 million square kilometers**. It spans 11 time zones across Europe and Asia.',
  },
  {
    q: ['what is the smallest country', 'smallest country in the world', 'tiniest country'],
    a:
      '**Vatican City** is the smallest country in the world at about **0.44 square kilometers**. It is the spiritual center of the Roman Catholic Church and home to the Pope.',
  },
  {
    q: ['what is the longest river', 'longest river in the world', 'longest river'],
    a:
      'The **Nile River** in Africa is traditionally considered the longest at about **6,650 km**, though some measurements suggest the **Amazon River** may be longer at about 6,400 km.',
  },
  {
    q: ['what is the tallest mountain', 'tallest mountain in the world', 'highest mountain'],
    a:
      '**Mount Everest** is the tallest mountain above sea level at **8,849 meters** (29,032 feet). It sits on the border of Nepal and Tibet in the Himalayas.',
  },
  {
    q: ['what is the deepest ocean', 'deepest ocean in the world', 'deepest part of the ocean'],
    a:
      'The **Pacific Ocean** is the deepest ocean. The deepest point is the **Challenger Deep** in the Mariana Trench at about **10,935 meters** (35,876 feet) below sea level.',
  },
  {
    q: ['what are the continents', 'list of continents', 'pila ka kontinente'],
    a:
      'The seven continents are **Africa, Antarctica, Asia, Europe, North America, Oceania (Australia), and South America.** Asia is the largest; Australia is the smallest.',
  },
  {
    q: ['what are the oceans', 'list of oceans', 'pila ka dagat'],
    a:
      'The five oceans are **Pacific, Atlantic, Indian, Southern (Antarctic), and Arctic**. The Pacific is the largest and deepest, covering more area than all land combined.',
  },
  {
    q: ['what is climate change', 'climate change explained', 'ano ang climate change'],
    a:
      '**Climate change** refers to long-term shifts in global temperatures and weather patterns. Since the 1800s, human activities (burning fossil fuels, deforestation) have been the main driver, causing rising temperatures, extreme weather, and sea level rise.',
  },
  {
    q: ['what is greenhouse effect', 'greenhouse effect explained', 'ano ang greenhouse effect'],
    a:
      'The **greenhouse effect** is when certain gases in the atmosphere (CO2, methane) trap heat from the sun, warming the Earth. It is a natural process essential for life, but human activities have intensified it, leading to global warming.',
  },

  /* -------------------------------------------------------- technology */
  {
    q: ['what is blockchain', 'blockchain explained', 'ano ang blockchain'],
    a:
      '**Blockchain** is a decentralized digital ledger that records transactions across many computers. Each block contains data, a hash, and the previous block\'s hash, making it tamper-proof and transparent.',
  },
  {
    q: ['what is cryptocurrency', 'cryptocurrency explained', 'ano ang cryptocurrency'],
    a:
      '**Cryptocurrency** is digital or virtual currency that uses cryptography for security. It operates on blockchain technology and is not controlled by any central authority like a bank. Examples: Bitcoin, Ethereum.',
  },
  {
    q: ['what is bitcoin', 'bitcoin explained', 'ano ang bitcoin'],
    a:
      '**Bitcoin** is the first and most well-known cryptocurrency, created in 2009 by the pseudonymous **Satoshi Nakamoto**. It uses blockchain to enable peer-to-peer transactions without intermediaries.',
  },
  {
    q: ['what is cloud computing', 'cloud computing explained', 'ano ang cloud computing'],
    a:
      '**Cloud computing** delivers computing services (servers, storage, databases, networking) over the internet. Major providers include AWS, Google Cloud, and Microsoft Azure. It allows on-demand resources without owning hardware.',
  },
  {
    q: ['what is machine learning', 'machine learning explained', 'ano ang machine learning'],
    a:
      '**Machine learning** is a subset of AI where systems learn from data to improve their performance without being explicitly programmed. It uses algorithms to find patterns in data and make predictions.',
  },
  {
    q: ['what is deep learning', 'deep learning explained', 'ano ang deep learning'],
    a:
      '**Deep learning** is a subset of machine learning using neural networks with many layers (hence "deep"). It powers image recognition, natural language processing, and self-driving cars.',
  },
  {
    q: ['what is neural network', 'neural network explained', 'ano ang neural network'],
    a:
      '**Neural networks** are computing systems inspired by the human brain. They consist of layers of nodes (neurons) that process inputs, learn patterns from training data, and produce outputs for tasks like classification.',
  },
  {
    q: ['what is quantum computing', 'quantum computing explained', 'ano ang quantum computing'],
    a:
      '**Quantum computing** uses quantum mechanics (superposition and entanglement) to process information. Unlike classical bits (0 or 1), qubits can be both simultaneously, enabling massive parallel computation for complex problems.',
  },
  {
    q: ['what is 5G', '5G explained', 'ano ang 5G'],
    a:
      '**5G** is the fifth generation of mobile network technology. It offers faster speeds (up to 10 Gbps), lower latency (1ms), and the ability to connect more devices simultaneously compared to 4G.',
  },
  {
    q: ['what is IoT', 'internet of things explained', 'ano ang IoT'],
    a:
      '**IoT (Internet of Things)** refers to physical devices connected to the internet that collect and exchange data. Examples: smart home devices, wearable fitness trackers, industrial sensors, and connected vehicles.',
  },
  {
    q: ['what is AR', 'augmented reality explained', 'ano ang augmented reality'],
    a:
      '**Augmented Reality (AR)** overlays digital content (images, sounds, text) onto the real world. It enhances what you see and interact with through a phone, glasses, or headset. Examples: Pokemon GO, IKEA Place.',
  },
  {
    q: ['what is VR', 'virtual reality explained', 'ano ang virtual reality'],
    a:
      '**Virtual Reality (VR)** creates a completely immersive digital environment that replaces the real world. Users wear a headset and interact with a 3D simulation. Used in gaming, training, education, and therapy.',
  },

  /* ------------------------------------------------------------ health */
  {
    q: ['how many calories per day', 'daily calorie intake', 'pila ka calories kada adlaw'],
    a:
      'Most adults need about **2,000-2,500 calories per day** depending on age, gender, and activity level. Women generally need around 2,000 and men around 2,500. This is general information, not medical advice.',
  },
  {
    q: ['what is protein', 'protein explained', 'ano ang protina'],
    a:
      '**Protein** is a macronutrient essential for building and repairing tissues, making enzymes and hormones. Good sources: meat, fish, eggs, beans, nuts, and dairy. Adults need about 0.8g per kg of body weight daily.',
  },
  {
    q: ['what is cholesterol', 'cholesterol explained', 'ano ang cholesterol'],
    a:
      '**Cholesterol** is a waxy substance found in your blood. Your body needs it to build cells, but too much (especially LDL "bad" cholesterol) can increase heart disease risk. Eat more fiber, less saturated fat.',
  },
  {
    q: ['what is blood pressure', 'blood pressure explained', 'ano ang blood pressure'],
    a:
      '**Blood pressure** is the force of blood pushing against artery walls. Normal is around 120/80 mmHg. The top number (systolic) measures heart pressure; the bottom (diastolic) measures between beats.',
  },
  {
    q: ['what is diabetes', 'diabetes explained', 'ano ang diabetes'],
    a:
      '**Diabetes** is a chronic condition where the body cannot properly process blood sugar (glucose). Type 1 is autoimmune; Type 2 is when the body becomes resistant to insulin. It requires management through diet, exercise, and sometimes medication.',
  },
  {
    q: ['what are vitamins', 'vitamins explained', 'ano ang bitamina'],
    a:
      '**Vitamins** are organic compounds the body needs in small amounts for growth, digestion, and nerve function. There are 13 essential vitamins: A, C, D, E, K, and B vitamins (B1, B2, B3, B5, B6, B7, B9, B12).',
  },

  /* ----------------------------------------------------------- business */
  {
    q: ['what is entrepreneurship', 'entrepreneurship explained', 'ano ang entrepreneurship'],
    a:
      '**Entrepreneurship** is the process of starting and running a business, taking on financial risks in the hope of profit. It involves innovation, resource management, and building something from an idea.',
  },
  {
    q: ['what is marketing', 'marketing explained', 'ano ang marketing'],
    a:
      '**Marketing** is the activity of promoting and selling products or services. It includes market research, advertising, branding, social media, and understanding customer needs to drive sales.',
  },
  {
    q: ['what is branding', 'branding explained', 'ano ang branding'],
    a:
      '**Branding** is the process of creating a unique name, design, and identity for a product or company. It shapes how customers perceive and connect with your business.',
  },
  {
    q: ['what is supply chain', 'supply chain explained', 'ano ang supply chain'],
    a:
      'A **supply chain** is the network of organizations, people, and activities involved in producing and delivering a product, from raw materials to the final customer.',
  },
  {
    q: ['what is logistics', 'logistics explained', 'ano ang logistics'],
    a:
      '**Logistics** is the management of how resources are acquired, stored, and transported to their destination. It covers warehousing, inventory, shipping, and delivery.',
  },
  {
    q: ['what is franchising', 'franchising explained', 'ano ang franchising'],
    a:
      '**Franchising** is a business model where a franchisee buys the right to use a franchisor\'s brand and system. The franchisee gets an established brand and support; the franchisor gets fees and royalties.',
  },
  {
    q: ['what is investment', 'investment explained', 'ano ang investment'],
    a:
      '**Investment** is allocating money expecting future profit or income. Common types include stocks, bonds, real estate, and mutual funds. Investing carries risk but can build wealth over time.',
  },
  {
    q: ['what is stock market', 'stock market explained', 'ano ang stock market'],
    a:
      'The **stock market** is where shares of publicly traded companies are bought and sold. Prices fluctuate based on supply and demand, company performance, and economic conditions.',
  },
  {
    q: ['what is mutual fund', 'mutual fund explained', 'ano ang mutual fund'],
    a:
      'A **mutual fund** pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities. It is managed by professional fund managers and allows small investors to diversify.',
  },

  /* -------------------------------------------------------- everyday */
  {
    q: ['how to cook rice', 'paano magluto ng kanin', 'cooking rice instructions'],
    a:
      '**Stovetop method**: Rinse 1 cup rice. Add 1.5 cups water. Bring to boil, then cover and reduce heat to low. Cook 15-18 minutes. Remove from heat and let steam 5 minutes. Fluff with a fork. Ratio is roughly 1:1.5 (rice to water).',
  },
  {
    q: ['how to tie a tie', 'paano magtali ng necktie', 'tie a necktie'],
    a:
      '**Four-in-Hand knot**: Drape the tie with the wide end on the right, 12 inches lower. Cross wide over narrow. Wrap wide behind narrow. Bring wide up and through the loop. Slide the knot up to the collar.',
  },
  {
    q: ['how to change a tire', 'paano magpalit ng gulong', 'change a flat tire'],
    a:
      '1) Pull over safely and turn on hazards. 2) Place wheel chocks. 3) Loosen lug nuts. 4) Jack up the car. 5) Remove the flat tire. 6) Mount the spare. 7) Tighten lug nuts in a star pattern. 8) Lower the car and fully tighten.',
  },
  {
    q: ['how to do CPR', 'paano gumawa ng CPR', 'CPR steps'],
    a:
      '**Hands-only CPR**: 1) Check if the person responds. 2) Call emergency services. 3) Place the heel of your hand on the center of the chest. 4) Push hard and fast at 100-120 compressions per minute. 5) Continue until help arrives. This is general guidance, not a substitute for training.',
  },
  {
    q: ['how to make coffee', 'paano gumawa ng kape', 'brewing coffee'],
    a:
      '**Basic drip coffee**: Use 1 tablespoon ground coffee per 6 ounces of water. Place filter in maker, add grounds, pour cold water, and start the machine. For instant: add 1-2 teaspoons to a cup, pour hot water, and stir.',
  },
  {
    q: ['how to iron clothes', 'paano magplantsa', 'ironing clothes'],
    a:
      '1) Check the fabric label for heat settings. 2) Fill the iron with water if steaming. 3) Iron collars and cuffs first while flat. 4) Iron large areas (body) with long strokes. 5) Hang immediately to prevent wrinkles.',
  },

  /* ------------------------------------------------------- environment */
  {
    q: ['what is recycling', 'recycling explained', 'ano ang recycling'],
    a:
      '**Recycling** is converting waste materials into new products. Common recyclables: paper, glass, aluminum, plastic. It reduces landfill waste, saves energy, and conserves natural resources.',
  },
  {
    q: ['what is composting', 'composting explained', 'ano ang composting'],
    a:
      '**Composting** is the natural decomposition of organic waste (food scraps, leaves, paper) into nutrient-rich soil. It reduces landfill waste and produces free fertilizer for gardens.',
  },
  {
    q: ['what is renewable energy', 'renewable energy explained', 'ano ang renewable energy'],
    a:
      '**Renewable energy** comes from sources that replenish naturally: solar, wind, hydroelectric, geothermal, and biomass. Unlike fossil fuels, they produce little to no greenhouse gas emissions.',
  },
  {
    q: ['what is solar energy', 'solar energy explained', 'ano ang solar energy'],
    a:
      '**Solar energy** is power from the sun. Solar panels convert sunlight into electricity (photovoltaic) or heat water (thermal). It is clean, abundant, and increasingly affordable.',
  },
  {
    q: ['what is wind energy', 'wind energy explained', 'ano ang wind energy'],
    a:
      '**Wind energy** uses wind turbines to convert wind\'s kinetic energy into electricity. It is one of the fastest-growing and cheapest renewable energy sources worldwide.',
  },
  {
    q: ['what is deforestation', 'deforestation explained', 'ano ang deforestation'],
    a:
      '**Deforestation** is the clearing of forests for agriculture, logging, or development. It causes habitat loss, increases CO2 levels, disrupts water cycles, and contributes to climate change.',
  },
  {
    q: ['what is pollution', 'pollution explained', 'ano ang polusyon'],
    a:
      '**Pollution** is the introduction of harmful substances into the environment. Main types: air pollution (smog, emissions), water pollution (chemicals, plastics), soil contamination, and noise pollution.',
  },
  {
    q: ['what is global warming', 'global warming explained', 'ano ang global warming'],
    a:
      '**Global warming** is the long-term increase in Earth\'s average temperature, mainly caused by greenhouse gas emissions from burning fossil fuels. Effects include rising sea levels, extreme weather, and biodiversity loss.',
  },

  /* ------------------------------------------------------------- food */
  {
    q: ['what is carbohydrate', 'carbohydrate explained', 'ano ang carbohydrates'],
    a:
      '**Carbohydrates** are one of three macronutrients (along with protein and fat). They are the body\'s main source of energy. Found in grains, fruits, vegetables, and sugary foods. Complex carbs (whole grains) are healthier than simple carbs (sugar).',
  },
  {
    q: ['what is fiber', 'dietary fiber explained', 'ano ang fiber'],
    a:
      '**Fiber** is a type of carbohydrate the body cannot digest. It aids digestion, prevents constipation, and helps control blood sugar. Good sources: fruits, vegetables, whole grains, beans, and nuts.',
  },
  {
    q: ['what are minerals', 'minerals explained', 'ano ang minerals'],
    a:
      '**Minerals** are inorganic nutrients the body needs for functions like bone health, fluid balance, and nerve signaling. Key minerals include calcium, iron, potassium, sodium, zinc, and magnesium.',
  },

  /* -------------------------------------------------------- music/arts */
  {
    q: ['what is rhythm', 'rhythm in music', 'ano ang rhythm'],
    a:
      '**Rhythm** is the pattern of sounds and silences in music. It is created by the duration and accent of notes. Good rhythm gives music its groove and movement.',
  },
  {
    q: ['what is melody', 'melody explained', 'ano ang melody'],
    a:
      '**Melody** is a sequence of notes that form a recognizable tune. It is the part of music you hum or sing. A good melody has a clear shape, direction, and memorable phrases.',
  },
  {
    q: ['what is harmony', 'harmony in music', 'ano ang harmony'],
    a:
      '**Harmony** is when two or more notes sound together. It creates chords and supports the melody. Harmony adds richness and emotion to music.',
  },
  {
    q: ['what is oil painting', 'oil painting explained', 'ano ang oil painting'],
    a:
      '**Oil painting** uses pigments mixed with drying oils (usually linseed) as a medium. It allows rich colors, smooth blending, and slow drying, making it ideal for detailed work and layering.',
  },
  {
    q: ['what is sculpture', 'sculpture explained', 'ano ang sculpture'],
    a:
      '**Sculpture** is a three-dimensional art form created by shaping materials like stone, metal, wood, clay, or glass. Methods include carving, modeling, casting, and assembling.',
  },

  /* ---------------------------------------------------------- language */
  {
    q: ['what is a noun', 'noun explained', 'ano ang noun'],
    a:
      'A **noun** is a word that names a person, place, thing, or idea. Examples: dog, Manila, love, teacher. Types include common nouns (city), proper nouns (Tokyo), abstract nouns (happiness), and concrete nouns (table).',
  },
  {
    q: ['what is a verb', 'verb explained', 'ano ang verb'],
    a:
      'A **verb** is a word that expresses an action or state of being. Examples: run, eat, is, think. Verbs can be past tense (walked), present tense (walk), or future tense (will walk).',
  },
  {
    q: ['what is an adjective', 'adjective explained', 'ano ang adjective'],
    a:
      'An **adjective** is a word that describes or modifies a noun. Examples: big, blue, happy, fast. Adjectives tell us more about nouns: "The tall man wore a blue shirt."',
  },
  {
    q: ['what is a metaphor', 'metaphor explained', 'ano ang metaphor'],
    a:
      'A **metaphor** is a figure of speech that directly compares two unlike things without using "like" or "as." Example: "Time is money." It creates vivid imagery and deeper meaning.',
  },
  {
    q: ['what is a simile', 'simile explained', 'ano ang simile'],
    a:
      'A **simile** compares two things using "like" or "as." Example: "She runs like the wind" or "brave as a lion." It makes descriptions more vivid and relatable.',
  },
  {
    q: ['what is alliteration', 'alliteration explained', 'ano ang alliteration'],
    a:
      '**Alliteration** is the repetition of the same beginning consonant sound in nearby words. Example: "Peter Piper picked a peck of pickled peppers." It creates rhythm and emphasis.',
  },

  /* --------------------------------------------------------- education */
  {
    q: ['what is a thesis', 'thesis explained', 'ano ang thesis'],
    a:
      'A **thesis** is a long essay or research paper written as part of a university degree. It presents an argument or findings from original research on a specific topic.',
  },
  {
    q: ['what is research', 'research explained', 'ano ang research'],
    a:
      '**Research** is a systematic investigation to discover new facts, interpretations, or knowledge. It involves collecting data, analyzing information, and drawing conclusions.',
  },
  {
    q: ['what is methodology', 'methodology explained', 'ano ang methodology'],
    a:
      '**Methodology** is the system of methods and principles used in a particular study or research. It explains how you gathered and analyzed data to ensure reliable and valid results.',
  },
  {
    q: ['what is plagiarism', 'plagiarism explained', 'ano ang plagiarism'],
    a:
      '**Plagiarism** is using someone else\'s words, ideas, or work without proper credit. It is a serious academic offense. Always cite your sources and use quotation marks for direct quotes.',
  },
  {
    q: ['what is GPA', 'GPA explained', 'ano ang GPA'],
    a:
      'GPA (**Grade Point Average**) is a number representing your average grades. It usually ranges from 0 to 4.0. In the Philippines, a GPA of 1.0 is excellent and 3.0 is passing.',
  },

  /* -------------------------------------------------------- philippines */
  {
    q: ['what is a jeepney', 'jeepney explained', 'ano ang jeepney'],
    a:
      'The **jeepney** is an iconic Filipino public utility vehicle. Originally made from surplus US military jeeps after World War 2, they are known for their colorful designs, crowded seating, and being a symbol of Filipino culture.',
  },
  {
    q: ['what is barong', 'barong tagalog explained', 'ano ang barong'],
    a:
      'The **Barong Tagalog** is the national formal wear of the Philippines. It is a lightweight, embroidered shirt worn untucked over an undershirt. Usually made from piña (pineapple fiber) or jusi (banana fiber).',
  },
  {
    q: ['what is sinigang', 'sinigang explained', 'ano ang sinigang'],
    a:
      '**Sinigang** is a Filipino sour soup made with tamarind as the base souring agent. It typically contains meat (pork, fish, shrimp) and vegetables like kangkong, radish, tomatoes, and string beans.',
  },
  {
    q: ['what is adobo', 'adobo explained', 'ano ang adobo'],
    a:
      '**Adobo** is one of the most popular Filipino dishes. Meat (usually chicken or pork) is marinated in vinegar, soy sauce, garlic, and bay leaves, then browned and simmered. It is often considered the unofficial national dish.',
  },
  {
    q: ['what is karaoke', 'karaoke explained', 'ano ang karaoke'],
    a:
      '**Karaoke** is a form of entertainment where people sing along to instrumental tracks with lyrics displayed on a screen. It is extremely popular in Filipino culture and a staple at gatherings and parties.',
  },
  {
    q: ['what is filipino culture', 'filipino culture explained', 'ano ang kulturang pinoy'],
    a:
      '**Filipino culture** is a blend of Malay, Spanish, American, and Chinese influences. Key values: family (pamilya), hospitality (pakikisama), bayanihan (community spirit), respect for elders (paggalang), and faith.',
  },
  {
    q: ['what is bayanihan', 'bayanihan explained', 'ano ang bayanihan'],
    a:
      '**Bayanihan** is a Filipino term meaning community spirit and cooperation. Traditionally, it referred to neighbors helping a family move by literally carrying their house on bamboo poles. Today it means working together for a common goal.',
  },
  {
    q: ['what is pakikisama', 'pakikisama explained', 'ano ang pakikisama'],
    a:
      '**Pakikisama** is a Filipino value of smooth interpersonal relationships. It means getting along with others, being cooperative, avoiding conflict, and maintaining harmony in social interactions.',
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
