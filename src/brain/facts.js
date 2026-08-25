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

  /* ------------------------------------------------------- more science */
  {
    q: ['what is photosynthesis', 'how do plants make food', 'ano ang photosynthesis'],
    a: '**Photosynthesis** is how plants convert sunlight, water, and carbon dioxide into glucose and oxygen. It happens in chloroplasts using chlorophyll. 6CO2 + 6H2O + light = C6H12O6 + 6O2.',
  },
  {
    q: ['what is osmosis', 'osmosis explained', 'ano ang osmosis'],
    a: '**Osmosis** is the movement of water across a semipermeable membrane from low solute concentration to high solute concentration. It is how cells absorb water and nutrients.',
  },
  {
    q: ['what is mitosis', 'mitosis explained', 'ano ang mitosis'],
    a: '**Mitosis** is cell division that produces two identical daughter cells. It is used for growth and repair. Stages: prophase, metaphase, anaphase, telophase.',
  },
  {
    q: ['what is meiosis', 'meiosis explained', 'ano ang meiosis'],
    a: '**Meiosis** produces four genetically unique sex cells (gametes) with half the chromosomes. It involves two divisions and creates genetic diversity through crossing over.',
  },
  {
    q: ['what is cell', 'what is a cell', 'ano ang cell'],
    a: 'A **cell** is the basic unit of life. All living things are made of cells. They have a membrane, cytoplasm, and DNA. Animal cells and plant cells have different structures.',
  },
  {
    q: ['what is ecosystem', 'ecosystem explained', 'ano ang ecosystem'],
    a: 'An **ecosystem** is a community of living organisms interacting with their physical environment. It includes biotic (plants, animals) and abiotic (water, soil, sunlight) components.',
  },
  {
    q: ['what is food chain', 'food chain explained', 'ano ang food chain'],
    a: 'A **food chain** shows how energy moves through organisms: producers (plants) -> primary consumers (herbivores) -> secondary consumers (carnivores) -> decomposers.',
  },
  {
    q: ['what is natural selection', 'natural selection explained', 'ano ang natural selection'],
    a: '**Natural selection** is the process where organisms with favorable traits survive and reproduce more. Over time, these traits become more common in the population.',
  },
  {
    q: ['what is genetic mutation', 'mutation explained', 'ano ang mutation'],
    a: 'A **genetic mutation** is a change in DNA sequence. Mutations can be caused by radiation, chemicals, or errors in DNA replication. Some are harmful, some neutral, some beneficial.',
  },
  {
    q: ['what is solar system', 'solar system facts', 'ano ang solar system'],
    a: 'The **Solar System** consists of the Sun and everything orbiting it: 8 planets, dwarf planets, moons, asteroids, and comets. It formed about 4.6 billion years ago.',
  },
  {
    q: ['what is galaxy', 'galaxy explained', 'ano ang galaxy'],
    a: 'A **galaxy** is a massive system of stars, gas, dust, and dark matter held together by gravity. Our Milky Way galaxy contains 100-400 billion stars.',
  },
  {
    q: ['what is black hole', 'black hole explained', 'ano ang black hole'],
    a: 'A **black hole** is a region of space where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their life.',
  },
  {
    q: ['what is DNA replication', 'how does DNA replicate', 'DNA replication process'],
    a: '**DNA replication** is the process of copying DNA before cell division. The double helix unwinds, each strand serves as a template, and enzymes build new complementary strands.',
  },
  {
    q: ['what is chromosomes', 'chromosomes explained', 'ano ang chromosomes'],
    a: '**Chromosomes** are structures of DNA and proteins that carry genetic information. Humans have 23 pairs (46 total). They determine traits like eye color and blood type.',
  },
  {
    q: ['what is enzyme', 'enzyme explained', 'ano ang enzyme'],
    a: 'An **enzyme** is a protein that speeds up chemical reactions in the body. They are specific to substrates (like a key fits a lock). Without enzymes, reactions would be too slow for life.',
  },
  {
    q: ['what is pH', 'pH scale explained', 'ano ang pH'],
    a: 'The **pH scale** measures how acidic or basic a solution is, from 0 to 14. Below 7 is acidic, 7 is neutral, above 7 is basic. Stomach acid is about pH 2; baking soda is about pH 9.',
  },
  {
    q: ['what is chemical reaction', 'chemical reaction explained', 'ano ang chemical reaction'],
    a: 'A **chemical reaction** is a process that transforms substances into new ones. It involves breaking and forming chemical bonds. Examples: burning, rusting, cooking, digestion.',
  },

  /* ------------------------------------------------------ more math */
  {
    q: ['what is perimeter', 'perimeter explained', 'ano ang perimeter'],
    a: '**Perimeter** is the total distance around the outside of a shape. For a rectangle: 2 x (length + width). For a circle: 2 x pi x radius.',
  },
  {
    q: ['what is area', 'area explained', 'ano ang area'],
    a: '**Area** is the amount of space inside a shape. Rectangle: length x width. Triangle: 1/2 x base x height. Circle: pi x radius squared.',
  },
  {
    q: ['what is volume', 'volume explained', 'ano ang volume'],
    a: '**Volume** is the amount of space inside a 3D object. Cube: side cubed. Cylinder: pi x radius squared x height. It is measured in cubic units.',
  },
  {
    q: ['what is integer', 'integer explained', 'ano ang integer'],
    a: 'An **integer** is a whole number (positive, negative, or zero). Examples: -3, -2, -1, 0, 1, 2, 3. Integers do not include fractions or decimals.',
  },
  {
    q: ['what is decimal', 'decimal explained', 'ano ang decimal'],
    a: 'A **decimal** is a number with a decimal point. The digits after the decimal represent tenths, hundredths, thousandths. Example: 3.14 = 3 + 1/10 + 4/100.',
  },
  {
    q: ['what is ratio', 'ratio explained', 'ano ang ratio'],
    a: 'A **ratio** compares two quantities. It can be written as 3:4, 3/4, or 3 to 4. Ratios are used in recipes, maps, and scaling.',
  },
  {
    q: ['what is proportion', 'proportion explained', 'ano ang proportion'],
    a: 'A **proportion** states that two ratios are equal. Example: 2/4 = 3/6. Cross-multiplication can solve for unknowns in proportions.',
  },
  {
    q: ['what is exponent', 'exponent explained', 'ano ang exponent'],
    a: 'An **exponent** tells you how many times to multiply a number by itself. 2^3 = 2 x 2 x 2 = 8. The base is 2, the exponent is 3.',
  },
  {
    q: ['what is slope', 'slope explained', 'ano ang slope'],
    a: '**Slope** measures the steepness of a line. It is the change in y divided by the change in x (rise/run). Positive slope goes up, negative goes down.',
  },
  {
    q: ['what is function', 'function in math', 'ano ang function'],
    a: 'A **function** is a rule that assigns each input exactly one output. Example: f(x) = 2x + 1 means for every x value, multiply by 2 and add 1.',
  },
  {
    q: ['what is standard deviation', 'standard deviation explained', 'ano ang standard deviation'],
    a: '**Standard deviation** measures how spread out numbers are from the average. A low standard deviation means data is close to the mean; high means it is spread out.',
  },
  {
    q: ['what is absolute value', 'absolute value explained', 'ano ang absolute value'],
    a: '**Absolute value** is the distance of a number from zero on the number line. It is always positive. |-5| = 5, |5| = 5, |0| = 0.',
  },
  {
    q: ['what is negative number', 'negative numbers explained', 'ano ang negative number'],
    a: 'A **negative number** is any number less than zero. It is written with a minus sign: -1, -2, -3. On a number line, negative numbers are to the left of zero.',
  },

  /* --------------------------------------------------- more tech */
  {
    q: ['what is programming', 'programming explained', 'ano ang programming'],
    a: '**Programming** is writing instructions for computers to follow. It uses specific languages (Python, JavaScript, Java) to create software, websites, and apps.',
  },
  {
    q: ['what is software', 'software explained', 'ano ang software'],
    a: '**Software** is a set of instructions that tells a computer what to do. It includes applications (Word, Chrome), operating systems (Windows, macOS), and apps.',
  },
  {
    q: ['what is hardware', 'hardware explained', 'ano ang hardware'],
    a: '**Hardware** is the physical parts of a computer: monitor, keyboard, mouse, processor, memory, storage. Without hardware, software cannot run.',
  },
  {
    q: ['what is cloud', 'what is the cloud', 'ano ang cloud computing'],
    a: 'The **cloud** means remote servers accessed over the internet. Instead of storing files on your computer, they are stored on servers owned by companies like Google, Amazon, or Microsoft.',
  },
  {
    q: ['what is wifi', 'wifi explained', 'ano ang wifi'],
    a: '**WiFi** is a wireless technology that lets devices connect to the internet using radio waves. It works within a limited range (about 30-50 meters indoors).',
  },
  {
    q: ['what is bluetooth', 'bluetooth explained', 'ano ang bluetooth'],
    a: '**Bluetooth** is a short-range wireless technology for connecting devices. It is used for headphones, speakers, keyboards, and file transfer. Range is about 10 meters.',
  },
  {
    q: ['what is url', 'url explained', 'ano ang url'],
    a: 'A **URL** (Uniform Resource Locator) is the address of a webpage. Example: https://www.google.com. It tells the browser where to find the website on the internet.',
  },
  {
    q: ['what is browser', 'browser explained', 'ano ang browser'],
    a: 'A **browser** is software for accessing websites. Popular browsers: Chrome, Firefox, Safari, Edge. They render HTML, CSS, and JavaScript into visual web pages.',
  },
  {
    q: ['what is operating system', 'operating system explained', 'ano ang operating system'],
    a: 'An **operating system** is software that manages computer hardware and provides a user interface. Examples: Windows, macOS, Linux, Android, iOS.',
  },
  {
    q: ['what is cpu', 'cpu explained', 'ano ang cpu'],
    a: 'The **CPU** (Central Processing Unit) is the brain of the computer. It executes instructions and performs calculations. Speed is measured in GHz (gigahertz).',
  },
  {
    q: ['what is ram', 'ram explained', 'ano ang ram'],
    a: '**RAM** (Random Access Memory) is temporary storage for data the computer is actively using. More RAM means more programs can run simultaneously without slowing down.',
  },
  {
    q: ['what is algorithm', 'what is an algorithm', 'ano ang algorithm'],
    a: 'An **algorithm** is a step-by-step procedure for solving a problem. In programming, algorithms are sets of instructions that process data and produce results.',
  },

  /* --------------------------------------------------- more health */
  {
    q: ['how many steps per day', 'daily step goal', 'pila ka lakad kada adlaw'],
    a: 'The recommended daily step count is **10,000 steps** for adults, though 7,500-10,000 is a good range. Walking 10,000 steps is about 8 km or 5 miles.',
  },
  {
    q: ['what is BMI', 'how to calculate BMI', 'body mass index'],
    a: '**BMI** = weight in kg divided by height in meters squared. Under 18.5 is underweight, 18.5-24.9 is normal, 25-29.9 is overweight, 30+ is obese.',
  },
  {
    q: ['what are macronutrients', 'macronutrients explained', 'ano ang macronutrients'],
    a: '**Macronutrients** are nutrients the body needs in large amounts: **protein** (builds muscle), **carbohydrates** (energy), and **fats** (hormones, cell structure).',
  },
  {
    q: ['what is metabolic rate', 'metabolism explained', 'ano ang metabolism'],
    a: '**Metabolism** is the process of converting food into energy. Your **basal metabolic rate** (BMR) is the calories your body burns at rest. It varies based on age, sex, and muscle mass.',
  },
  {
    q: ['what is immune system', 'immune system explained', 'ano ang immune system'],
    a: 'The **immune system** protects the body from infections. It includes white blood cells, antibodies, and lymph nodes. It has innate (general) and adaptive (specific) responses.',
  },
  {
    q: ['what is vitamin C', 'vitamin C explained', 'ano ang vitamin C'],
    a: '**Vitamin C** (ascorbic acid) is an antioxidant that supports the immune system, helps heal wounds, and aids iron absorption. Found in citrus fruits, tomatoes, and bell peppers.',
  },
  {
    q: ['what is vitamin D', 'vitamin D explained', 'ano ang vitamin D'],
    a: '**Vitamin D** helps the body absorb calcium and maintain bone health. The body produces it from sunlight. Found in fatty fish, egg yolks, and fortified foods.',
  },
  {
    q: ['what is iron', 'iron nutrient explained', 'ano ang iron'],
    a: '**Iron** is a mineral that helps red blood cells carry oxygen. Low iron causes anemia (fatigue, weakness). Found in red meat, spinach, beans, and fortified cereals.',
  },
  {
    q: ['what is dehydration', 'dehydration explained', 'ano ang dehydration'],
    a: '**Dehydration** occurs when the body loses more fluid than it takes in. Symptoms: thirst, dry mouth, dark urine, fatigue. Severe dehydration requires medical attention.',
  },
  {
    q: ['what is calories', 'calories explained', 'ano ang calories'],
    a: 'A **calorie** is a unit of energy. It measures how much energy food provides when your body breaks it down. The body needs about 2,000-2,500 calories per day.',
  },

  /* --------------------------------------------------- more history */
  {
    q: ['who invented the light bulb', 'inventor of light bulb', 'who made the light bulb'],
    a: '**Thomas Edison** is credited with inventing a practical incandescent light bulb in 1879. However, earlier inventors like **Humphry Davy** and **Joseph Swan** also worked on electric lighting.',
  },
  {
    q: ['what is Renaissance', 'Renaissance explained', 'ano ang Renaissance'],
    a: 'The **Renaissance** was a cultural movement (14th-17th century) that began in Italy. It marked a revival of art, science, and learning after the Middle Ages. Key figures: Leonardo da Vinci, Michelangelo.',
  },
  {
    q: ['what is Industrial Revolution', 'Industrial Revolution explained', 'ano ang Industrial Revolution'],
    a: 'The **Industrial Revolution** (1760-1840) was the transition to machine manufacturing. It began in Britain and spread worldwide. It changed farming, manufacturing, and transportation.',
  },
  {
    q: ['who invented the airplane', 'inventors of airplane', 'first flight'],
    a: '**Orville and Wilbur Wright** made the first successful airplane flight on December 17, 1903, at Kitty Hawk, North Carolina. The flight lasted 12 seconds and covered 120 feet.',
  },
  {
    q: ['what is ancient Egypt', 'ancient Egypt facts', 'ano ang ancient Egypt'],
    a: 'Ancient **Egypt** was a civilization along the Nile River (3100-30 BC). It is known for pyramids, pharaohs, hieroglyphics, and mummies. The Great Pyramid of Giza was built around 2560 BC.',
  },
  {
    q: ['what is World War II', 'WW2 facts', 'ano ang World War II'],
    a: 'World War II (1939-1945) was the deadliest conflict in history, involving most of the world. It ended with the defeat of Nazi Germany and Japan. Over 70 million people died.',
  },
  {
    q: ['who invented the computer', 'inventor of computer', 'who made the first computer'],
    a: '**Charles Babbage** designed the first mechanical computer (Analytical Engine) in the 1830s. **Alan Turing** laid the theoretical foundations. The first electronic computer was ENIAC (1945).',
  },
  {
    q: ['what is Cold War', 'Cold War explained', 'ano ang Cold War'],
    a: 'The **Cold War** (1947-1991) was a geopolitical tension between the US and Soviet Union. It involved proxy wars, arms races, and space competition but never direct military conflict.',
  },
  {
    q: ['who is Jose Rizal', 'Jose Rizal facts', 'ano ang Jose Rizal'],
    a: '**Jose Rizal** (1861-1896) is the national hero of the Philippines. He was a writer, physician, and reformist. His novels Noli Me Tangere and El Filibusterismo inspired the Philippine Revolution.',
  },
  {
    q: ['what is Katipunan', 'Katipunan explained', 'ano ang Katipunan'],
    a: 'The **Katipunan** (KKK) was a Philippine revolutionary society founded in 1892. It aimed for independence from Spain through armed revolt. Led by Andres Bonifacio.',
  },

  /* -------------------------------------------------- more geography */
  {
    q: ['what is the largest ocean', 'biggest ocean', 'largest ocean in the world'],
    a: 'The **Pacific Ocean** is the largest ocean, covering about 165 million square kilometers. It is larger than all land on Earth combined.',
  },
  {
    q: ['what is the largest desert', 'biggest desert', 'largest desert in the world'],
    a: 'The **Sahara** is the largest hot desert (9 million km2). The largest desert overall is **Antarctica** (14 million km2), as deserts are defined by low precipitation.',
  },
  {
    q: ['what is the largest island', 'biggest island', 'largest island in the world'],
    a: '**Greenland** is the largest island (2.17 million km2). Australia is sometimes considered a continent rather than an island.',
  },
  {
    q: ['what is the longest road', 'longest road in the world', 'longest highway'],
    a: 'The **Pan-American Highway** is the longest road at about 48,000 km, running from Alaska to Argentina. A gap in Panama (Darien Gap) breaks the road.',
  },
  {
    q: ['what is the deepest lake', 'deepest lake in the world', 'deepest lake'],
    a: '**Lake Baikal** in Russia is the deepest lake at 1,642 meters. It is also the oldest and largest freshwater lake by volume.',
  },
  {
    q: ['what is the largest country by population', 'most populated country', 'biggest population'],
    a: '**India** is the most populous country with over 1.4 billion people. China is second. Together they account for about 35% of the world population.',
  },
  {
    q: ['what is the smallest country by area', 'tiniest country', 'smallest country'],
    a: '**Vatican City** is the smallest country at 0.44 km2. It is the spiritual center of the Roman Catholic Church and home to the Pope.',
  },
  {
    q: ['what is the coldest place', 'coldest place on earth', 'coldest temperature'],
    a: '**Antarctica** is the coldest continent. The lowest temperature recorded was -89.2C at Vostok Station in 1983. The coldest inhabited place is Oymyakon, Russia (-67.7C).',
  },
  {
    q: ['what is the hottest place', 'hottest place on earth', 'highest temperature'],
    a: '**Death Valley**, California holds the record for highest air temperature: 56.7C (134F) in 1913. The hottest inhabited place is Dallol, Ethiopia.',
  },
  {
    q: ['what is the Philippines famous for', 'Philippines known for', 'what makes Philippines special'],
    a: 'The Philippines is known for: beautiful beaches (Boracay, Palawan), friendly people, jeepneys, karaoke, adobo and sinigang, festivals (Sinulog, Ati-Atihan), and call centers.',
  },

  /* ------------------------------------------------- everyday tips */
  {
    q: ['how to remove stains', 'stain removal tips', 'how to get stains out'],
    a: '**Stain removal tips**: Act quickly. Blot (do not rub). Use cold water for blood. Use warm water for grease. Pre-treat with detergent. Check garment label. Test hidden area first.',
  },
  {
    q: ['how to remove odors', 'odor removal tips', 'how to get rid of smell'],
    a: '**Odor removal**: Baking soda absorbs odors. Vinegar neutralizes smells. Sunlight kills bacteria. Coffee grounds deodorize. Activated charcoal absorbs odors. Lemon cuts grease smells.',
  },
  {
    q: ['how to clean silver', 'clean silver jewelry', 'silver polishing tips'],
    a: '**Clean silver** with baking soda paste (baking soda + water). Rub gently with a soft cloth. Rinse and dry. Or use a mixture of warm water and dish soap.',
  },
  {
    q: ['how to sharpen knives', 'knife sharpening tips', 'how to sharpen a knife'],
    a: '**Sharpen knives** with a whetstone (best), honing steel (maintenance), or pull-through sharpener. Hold at 20-degree angle. Use consistent strokes. Hone before each use.',
  },
  {
    q: ['how to remove fruit flies', 'get rid of fruit flies', 'fruit fly trap'],
    a: '**Remove fruit flies** with apple cider vinegar trap (bowl + vinegar + soap). Cover trash cans. Refrigerate ripe fruit. Clean drains. Check for rotting produce.',
  },
  {
    q: ['how to preserve food', 'food preservation tips', 'how to store food'],
    a: '**Food preservation**: Refrigerate within 2 hours. Freeze for long-term. Use airtight containers. Label with dates. Follow FIFO (first in, first out). Check for spoilage.',
  },

  /* -------------------------------------------------- more Philippines */
  {
    q: ['what is Philippine peso', 'Philippine currency', 'ano ang piso'],
    a: 'The **Philippine Peso** (PHP) is the currency of the Philippines. Coins come in 1, 5, 10, 25 centavos and 1, 5, 10, 20 pesos. Bills range from 20 to 1,000 pesos.',
  },
  {
    q: ['what is GCash', 'GCash explained', 'ano ang GCash'],
    a: '**GCash** is a mobile wallet in the Philippines. It allows sending money, paying bills, buying load, online shopping, and QR payments. It is widely used across the country.',
  },
  {
    q: ['what is Shopee', 'Shopee explained', 'ano ang Shopee'],
    a: '**Shopee** is an e-commerce platform popular in Southeast Asia. It allows buying and selling products online. It features flash sales, free shipping, and buyer protection.',
  },
  {
    q: ['what is jeepney', 'what is a jeepney', 'ano ang jeepney'],
    a: 'A **jeepney** is an iconic Filipino public utility vehicle. Originally from surplus US military jeps, they are known for colorful designs and crowded seating.',
  },
  {
    q: ['what is sari sari store', 'sari sari store explained', 'ano ang sari sari store'],
    a: 'A **sari-sari store** is a small neighborhood convenience store in the Philippines. It sells everyday essentials and operates from the owner\'s home.',
  },
  {
    q: ['what is palengke', 'palengke explained', 'ano ang palengke'],
    a: 'A **palengke** is a wet market in the Philippines where fresh produce, meat, and seafood are sold. It is usually cheaper than supermarkets.',
  },
  {
    q: ['what is kare kare', 'kare kare explained', 'ano ang kare kare'],
    a: '**Kare-kare** is a Filipino stew made with oxtail, peanut sauce, and vegetables (eggplant, string beans, banana blossom). Served with bagoong (shrimp paste).',
  },
  {
    q: ['what is lechon', 'lechon explained', 'ano ang lechon'],
    a: '**Lechon** is a whole roasted pig, a Filipino celebration dish. Known for its crispy skin and tender meat. Cebu and Pampanga are famous for their lechon.',
  },
  {
    q: ['what is halo halo', 'halo halo explained', 'ano ang halo halo'],
    a: '**Halo-halo** is a popular Filipino dessert with shaved ice, evaporated milk, sweet beans, jellies, fruits, leche flan, and ube ice cream. Mix everything before eating.',
  },
  {
    q: ['what is balut', 'balut explained', 'ano ang balut'],
    a: '**Balut** is a fertilized duck egg with a partially developed embryo, boiled and eaten from the shell. It is a popular street food in the Philippines.',
  },
  {
    q: ['what is teriyaki', 'teriyaki explained', 'ano ang teriyaki'],
    a: '**Teriyaki** is a Japanese cooking technique where food is grilled or broiled with a sweet soy sauce glaze. Common with chicken, beef, and fish.',
  },
  {
    q: ['what is sushi', 'sushi explained', 'ano ang sushi'],
    a: '**Sushi** is a Japanese dish of vinegared rice combined with seafood, vegetables, and sometimes tropical fruits. It is not raw fish (that is sashimi).',
  },
  {
    q: ['what is ramen', 'ramen explained', 'ano ang ramen'],
    a: '**Ramen** is a Japanese noodle soup with wheat noodles, broth, and toppings like pork, eggs, and seaweed. It originated from Chinese noodle soup.',
  },

  /* -------------------------------------------------- programming 2 */
  {
    q: ['what is variable', 'variable explained', 'ano ang variable'],
    a: 'A **variable** is a named container that stores data. In JavaScript: let name = "John";. Variables can hold numbers, strings, objects, and more.',
  },
  {
    q: ['what is array', 'array explained', 'ano ang array'],
    a: 'An **array** is an ordered list of items. In JavaScript: let colors = ["red", "blue", "green"]. Items are accessed by index starting from 0.',
  },
  {
    q: ['what is object', 'object explained', 'ano ang object'],
    a: 'An **object** stores data as key-value pairs. In JavaScript: let person = {name: "John", age: 30}. Objects organize related data together.',
  },
  {
    q: ['what is string', 'string explained', 'ano ang string'],
    a: 'A **string** is text data enclosed in quotes. Example: "Hello World". Strings can be manipulated (concatenated, sliced, searched) using built-in methods.',
  },
  {
    q: ['what is loop', 'loop explained', 'ano ang loop'],
    a: 'A **loop** repeats a block of code. Types: **for** (known iterations), **while** (condition-based), **for...of** (iterating arrays). Use break to exit early.',
  },
  {
    q: ['what is conditional', 'if else explained', 'ano ang conditional'],
    a: 'A **conditional** runs different code based on conditions. if (condition) { ... } else if (condition2) { ... } else { ... }. It is a fundamental programming concept.',
  },
  {
    q: ['what is function declaration', 'function explained', 'ano ang function'],
    a: 'A **function** is a reusable block of code. Declared with: function greet(name) { return "Hello " + name; }. Called with: greet("John").',
  },
  {
    q: ['what is class', 'class explained', 'ano ang class'],
    a: 'A **class** is a blueprint for creating objects. It defines properties and methods. In JavaScript: class Car { constructor(color) { this.color = color; } }.',
  },
  {
    q: ['what is DOM manipulation', 'DOM manipulation explained', 'ano ang DOM manipulation'],
    a: '**DOM manipulation** is using JavaScript to change HTML elements. Methods: getElementById, querySelector, addEventListener, innerHTML, style.',
  },
  {
    q: ['what is event listener', 'event listener explained', 'ano ang event listener'],
    a: 'An **event listener** waits for user actions (clicks, key presses, scrolls). In JavaScript: button.addEventListener("click", function() { ... }).',
  },
  {
    q: ['what is API call', 'API call explained', 'ano ang API call'],
    a: 'An **API call** is a request from one program to another. In JavaScript: fetch("https://api.example.com/data") returns a Promise with the response.',
  },
  {
    q: ['what is error handling', 'error handling explained', 'ano ang error handling'],
    a: '**Error handling** manages runtime errors. Use try { ... } catch (error) { ... } to handle errors gracefully. Always validate user input.',
  },

  /* ========================================================= MORE SCIENCE */
  {
    q: ['what is a telescope', 'telescope explained', 'ano ang telescope'],
    a: 'A **telescope** is an instrument that magnifies distant objects by collecting electromagnetic radiation. Refracting telescopes use lenses; reflecting telescopes use mirrors.',
  },
  {
    q: ['what is a microscope', 'microscope explained', 'ano ang microscope'],
    a: 'A **microscope** magnifies tiny objects invisible to the naked eye. Compound microscopes use multiple lenses and can achieve 1000x or more magnification.',
  },
  {
    q: ['what is voltage', 'voltage explained', 'ano ang voltage'],
    a: '**Voltage** is the electrical pressure that pushes electrons through a circuit, measured in volts (V). Think of it as water pressure in a pipe.',
  },
  {
    q: ['what is current', 'electric current explained', 'ano ang current'],
    a: '**Electric current** is the flow of electrons through a conductor, measured in amperes (A). It is like the amount of water flowing through a pipe.',
  },
  {
    q: ['what is resistance', 'resistance explained', 'ano ang resistance'],
    a: '**Resistance** opposes the flow of current, measured in ohms (ohm). It depends on material, length, thickness, and temperature.',
  },
  {
    q: ['what is Ohm\'s law', 'Ohms law explained', 'ano ang Ohms law'],
    a: '**Ohm\'s Law**: V = I x R (Voltage = Current x Resistance). If you know two values, you can calculate the third.',
  },
  {
    q: ['what is centripetal force', 'centripetal force explained', 'ano ang centripetal force'],
    a: '**Centripetal force** is the inward force that keeps an object moving in a circular path. Without it, the object would fly off in a straight line.',
  },
  {
    q: ['what is Newton\'s first law', 'Newton first law explained', 'ano ang Newtons first law'],
    a: '**Newton\'s First Law** (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by an external force.',
  },
  {
    q: ['what is Newton\'s second law', 'Newton second law explained', 'ano ang Newtons second law'],
    a: '**Newton\'s Second Law**: Force = Mass x Acceleration (F = ma). The acceleration of an object depends on the net force acting on it and its mass.',
  },
  {
    q: ['what is Newton\'s third law', 'Newton third law explained', 'ano ang Newtons third law'],
    a: '**Newton\'s Third Law**: For every action, there is an equal and opposite reaction. When you push a wall, the wall pushes back with equal force.',
  },
  {
    q: ['what is wavelength', 'wavelength explained', 'ano ang wavelength'],
    a: '**Wavelength** is the distance between successive crests of a wave. Visible light wavelengths range from about 400 nm (violet) to 700 nm (red).',
  },
  {
    q: ['what is frequency', 'frequency explained', 'ano ang frequency'],
    a: '**Frequency** is the number of wave cycles per second, measured in Hertz (Hz). Higher frequency means higher pitch (sound) or more energy (light).',
  },
  {
    q: ['what is conservation of energy', 'conservation of energy explained', 'ano ang conservation of energy'],
    a: '**Conservation of Energy**: Energy cannot be created or destroyed, only transformed from one form to another. Total energy in a closed system stays constant.',
  },
  {
    q: ['what is entropy', 'entropy explained', 'ano ang entropy'],
    a: '**Entropy** is a measure of disorder or randomness. The Second Law of Thermodynamics states that entropy in a closed system always increases.',
  },
  {
    q: ['what is catalyst', 'catalyst explained', 'ano ang catalyst'],
    a: 'A **catalyst** speeds up a chemical reaction without being consumed. Enzymes are biological catalysts. Industrial catalysts make reactions cheaper and faster.',
  },
  {
    q: ['what is oxidation', 'oxidation explained', 'ano ang oxidation'],
    a: '**Oxidation** is the loss of electrons by a substance. Rusting of iron and burning of fuel are examples. It often involves reaction with oxygen.',
  },
  {
    q: ['what is reduction', 'reduction explained', 'ano ang reduction'],
    a: '**Reduction** is the gain of electrons by a substance. It is the opposite of oxidation. Together, oxidation-reduction (redox) reactions power batteries and metabolism.',
  },

  /* ======================================================= MORE MATH */
  {
    q: ['what is a matrix', 'matrix explained', 'ano ang matrix'],
    a: 'A **matrix** is a rectangular array of numbers arranged in rows and columns. Used in linear algebra, physics, computer graphics, and data science.',
  },
  {
    q: ['what is a vector', 'vector explained', 'ano ang vector'],
    a: 'A **vector** has both magnitude and direction. In physics: velocity, force. In math: an ordered list of numbers. Vectors are used in physics and computer graphics.',
  },
  {
    q: ['what is a logarithm', 'logarithm explained', 'ano ang logarithm'],
    a: 'A **logarithm** answers the question: "To what power must we raise this base to get this number?" log base 10 of 100 = 2 because 10^2 = 100.',
  },
  {
    q: ['what is a set', 'set in math', 'ano ang set'],
    a: 'A **set** is a collection of distinct objects. Written in braces: {1, 2, 3}. Sets can be combined (union), compared (intersection), or subtracted.',
  },
  {
    q: ['what is a limit', 'limit in calculus', 'ano ang limit'],
    a: 'A **limit** describes what a function approaches as the input approaches a value. It is the foundation of calculus and defines continuity and derivatives.',
  },
  {
    q: ['what is a derivative', 'derivative explained', 'ano ang derivative'],
    a: 'A **derivative** measures the rate of change of a function. It gives the slope of the tangent line at any point. Used in physics for velocity and acceleration.',
  },
  {
    q: ['what is an integral', 'integral explained', 'ano ang integral'],
    a: 'An **integral** calculates the area under a curve. It is the reverse of a derivative. Used for finding areas, volumes, and total quantities from rates.',
  },
  {
    q: ['what is a triangle number', 'triangular number', 'ano ang triangular number'],
    a: 'A **triangular number** counts objects in a triangle: 1, 3, 6, 10, 15, 21... Formula: n(n+1)/2. The nth triangular number is the sum of 1 to n.',
  },
  {
    q: ['what is a perfect number', 'perfect number explained', 'ano ang perfect number'],
    a: 'A **perfect number** equals the sum of its proper divisors. 6 = 1 + 2 + 3; 28 = 1 + 2 + 4 + 7 + 14. Only 51 perfect numbers are known.',
  },
  {
    q: ['what is a factor', 'factor in math', 'ano ang factor'],
    a: 'A **factor** is a number that divides evenly into another number. Factors of 12: 1, 2, 3, 4, 6, 12. Factoring is key in algebra and number theory.',
  },
  {
    q: ['what is a multiple', 'multiple in math', 'ano ang multiple'],
    a: 'A **multiple** is the product of a number and an integer. Multiples of 3: 3, 6, 9, 12, 15... The least common multiple (LCM) is the smallest shared multiple.',
  },
  {
    q: ['what is congruence', 'congruence in geometry', 'ano ang congruence'],
    a: 'Two shapes are **congruent** if they have the same size and shape. All corresponding sides and angles are equal. Congruent triangles can be overlapped perfectly.',
  },
  {
    q: ['what is similarity', 'similarity in geometry', 'ano ang similarity'],
    a: 'Two shapes are **similar** if they have the same shape but different sizes. Corresponding angles are equal and sides are proportional.',
  },

  /* ==================================================== MORE TECH */
  {
    q: ['what is open source', 'open source explained', 'ano ang open source'],
    a: '**Open source** software has publicly available code that anyone can use, modify, and distribute. Examples: Linux, Firefox, WordPress. It promotes collaboration.',
  },
  {
    q: ['what is version control', 'version control explained', 'ano ang version control'],
    a: '**Version control** tracks changes to files over time. Git is the most popular. It lets multiple people work on the same project without overwriting each other.',
  },
  {
    q: ['what is machine code', 'machine code explained', 'ano ang machine code'],
    a: '**Machine code** is binary (0s and 1s) that the CPU directly executes. All other programming languages must be translated to machine code to run.',
  },
  {
    q: ['what is compiler', 'compiler explained', 'ano ang compiler'],
    a: 'A **compiler** translates entire source code to machine code before execution. Examples: GCC for C, javac for Java. Faster execution but slower build times.',
  },
  {
    q: ['what is interpreter', 'interpreter explained', 'ano ang interpreter'],
    a: 'An **interpreter** translates and executes code line by line. Examples: Python, JavaScript (in browsers). Slower execution but faster development cycle.',
  },
  {
    q: ['what is IDE', 'IDE explained', 'ano ang IDE'],
    a: 'An **IDE** (Integrated Development Environment) is software for writing code. It includes a text editor, compiler, debugger, and auto-complete. Examples: VS Code, IntelliJ.',
  },
  {
    q: ['what is framework', 'framework explained', 'ano ang framework'],
    a: 'A **framework** is a pre-built structure for developing software. It provides tools, libraries, and conventions. Examples: React, Django, Laravel, Angular.',
  },
  {
    q: ['what is library', 'library in programming', 'ano ang library'],
    a: 'A **library** is reusable code that you call from your program. It saves you from writing everything from scratch. Examples: Lodash, NumPy, jQuery.',
  },
  {
    q: ['what is recursion', 'recursion explained', 'ano ang recursion'],
    a: '**Recursion** is when a function calls itself. It needs a base case to stop. Common uses: tree traversal, factorials, Fibonacci sequence.',
  },
  {
    q: ['what is object oriented programming', 'OOP explained', 'ano ang OOP'],
    a: '**OOP** organizes code into objects that combine data and behavior. Four pillars: encapsulation, inheritance, polymorphism, and abstraction.',
  },
  {
    q: ['what is functional programming', 'functional programming explained', 'ano ang functional programming'],
    a: '**Functional programming** treats computation as evaluation of functions. It avoids changing state and mutable data. Key concepts: pure functions, immutability, higher-order functions.',
  },

  /* ================================================== MORE HEALTH */
  {
    q: ['what is a balanced diet', 'balanced diet explained', 'ano ang balanced diet'],
    a: 'A **balanced diet** includes the right amounts of carbohydrates, proteins, fats, vitamins, minerals, and water. The food pyramid or plate model guides portions.',
  },
  {
    q: ['what is antioxidants', 'antioxidants explained', 'ano ang antioxidants'],
    a: '**Antioxidants** neutralize free radicals that damage cells. Found in fruits, vegetables, tea, and dark chocolate. They help prevent aging and disease.',
  },
  {
    q: ['what is cholesterol HDL LDL', 'good and bad cholesterol', 'ano ang cholesterol'],
    a: '**HDL** (high-density lipoprotein) is "good" cholesterol that removes excess cholesterol. **LDL** (low-density lipoprotein) is "bad" cholesterol that clogs arteries.',
  },
  {
    q: ['what is insulin', 'insulin explained', 'ano ang insulin'],
    a: '**Insulin** is a hormone made by the pancreas that regulates blood sugar. It helps cells absorb glucose from the blood. Low insulin causes diabetes.',
  },
  {
    q: ['what is antibiotic', 'antibiotic explained', 'ano ang antibiotic'],
    a: 'An **antibiotic** fights bacterial infections. Examples: amoxicillin, azithromycin. Do not work on viruses (cold, flu). Overuse leads to antibiotic resistance.',
  },
  {
    q: ['what is vaccine', 'vaccine explained', 'ano ang vaccine'],
    a: 'A **vaccine** teaches the immune system to fight specific diseases without causing illness. It contains weakened or killed pathogens that trigger antibody production.',
  },
  {
    q: ['what is cholesterol', 'cholesterol and health', 'ano ang cholesterol sa katawan'],
    a: '**Cholesterol** is a waxy substance in blood. Your body needs it but too much (LDL) clogs arteries. Eat fiber, less saturated fat, and exercise regularly.',
  },
  {
    q: ['what is asthma', 'asthma explained', 'ano ang asthma'],
    a: '**Asthma** is a chronic lung condition where airways swell and narrow, making breathing difficult. Triggers include allergens, cold air, and exercise. Managed with inhalers.',
  },
  {
    q: ['what is hypertension', 'hypertension explained', 'ano ang hypertension'],
    a: '**Hypertension** (high blood pressure) means blood pushes too hard against artery walls. Normal is below 120/80. High readings increase heart attack and stroke risk.',
  },
  {
    q: ['what is anemia', 'anemia explained', 'ano ang anemia'],
    a: '**Anemia** is a condition where you lack enough healthy red blood cells to carry adequate oxygen. Symptoms: fatigue, weakness, pale skin. Often caused by iron deficiency.',
  },

  /* ================================================= MORE HISTORY */
  {
    q: ['who invented the telephone', 'telephone inventor', 'ano ang telephone'],
    a: '**Alexander Graham Bell** patented the telephone in 1876. However, Antonio Meucci and Elisha Gray also worked on similar devices around the same time.',
  },
  {
    q: ['what is the Stone Age', 'Stone Age explained', 'ano ang Stone Age'],
    a: 'The **Stone Age** was a prehistoric period when humans used stone tools. It lasted about 3.3 million years and ended when metal tools became common.',
  },
  {
    q: ['what is the Iron Age', 'Iron Age explained', 'ano ang Iron Age'],
    a: 'The **Iron Age** followed the Bronze Age when iron smelting became widespread. Iron tools and weapons were harder and cheaper than bronze.',
  },
  {
    q: ['what is feudalism', 'feudalism explained', 'ano ang feudalism'],
    a: '**Feudalism** was a medieval social system where land was exchanged for military service. Lords granted land (fiefs) to vassals who served them.',
  },
  {
    q: ['what is the Silk Road', 'Silk Road explained', 'ano ang Silk Road'],
    a: 'The **Silk Road** was an ancient trade route connecting China to the Mediterranean. It facilitated trade of silk, spices, ideas, and unfortunately, diseases.',
  },
  {
    q: ['what is colonialism', 'colonialism explained', 'ano ang colonialism'],
    a: '**Colonialism** is when a country takes control of another territory, exploiting its resources and people. Many African and Asian countries were colonized by European powers.',
  },
  {
    q: ['what is independence', 'independence explained', 'ano ang independence'],
    a: '**Independence** is when a country or people gains freedom from external control. Many nations gained independence from colonial powers in the 20th century.',
  },
  {
    q: ['what is revolution', 'revolution explained', 'ano ang revolution'],
    a: 'A **revolution** is a fundamental change in political power or organizational structures, usually involving popular uprising against the existing system.',
  },
  {
    q: ['what is democracy', 'democracy explained', 'ano ang democracy'],
    a: '**Democracy** is a system of government where citizens exercise power by voting. It can be direct (citizens vote on policies) or representative (citizens elect officials).',
  },
  {
    q: ['what is monarchy', 'monarchy explained', 'ano ang monarchy'],
    a: 'A **monarchy** is a system where a king or queen rules. Constitutional monarchies (UK, Japan) have limited royal power; absolute monarchies have unrestricted power.',
  },
  {
    q: ['what is communism', 'communism explained', 'ano ang communism'],
    a: '**Communism** is a political theory advocating classless society where all property is publicly owned and each person is paid according to need.',
  },
  {
    q: ['what is capitalism', 'capitalism explained', 'ano ang capitalism'],
    a: '**Capitalism** is an economic system where private individuals own property and businesses. Prices and production are determined by supply and demand.',
  },
  {
    q: ['what is socialism', 'socialism explained', 'ano ang socialism'],
    a: '**Socialism** is an economic system where the means of production are owned or regulated by the community as a whole. It aims to reduce inequality.',
  },

  /* ================================================= GEOGRAPHY */
  {
    q: ['what is latitude', 'latitude explained', 'ano ang latitude'],
    a: '**Latitude** measures how far north or south a point is from the Equator. It ranges from 0 at the Equator to 90 at the poles.',
  },
  {
    q: ['what is longitude', 'longitude explained', 'ano ang longitude'],
    a: '**Longitude** measures how far east or west a point is from the Prime Meridian. It ranges from 0 to 180 east and 180 west.',
  },
  {
    q: ['what is time zone', 'time zone explained', 'ano ang time zone'],
    a: 'A **time zone** is a region where the same standard time is used. The world is divided into 24 time zones, each roughly 15 degrees of longitude apart.',
  },
  {
    q: ['what is hemisphere', 'hemisphere explained', 'ano ang hemisphere'],
    a: 'A **hemisphere** is half of Earth. The Equator divides it into Northern and Southern hemispheres. The Prime Meridian divides it into Eastern and Western.',
  },
  {
    q: ['what is equator', 'equator explained', 'ano ang equator'],
    a: 'The **Equator** is the imaginary line at 0 degrees latitude, dividing Earth into Northern and Southern hemispheres. Countries on it include Ecuador, Kenya, and Indonesia.',
  },
  {
    q: ['what is prime meridian', 'prime meridian explained', 'ano ang prime meridian'],
    a: 'The **Prime Meridian** is the imaginary line at 0 degrees longitude, passing through Greenwich, England. It divides Eastern and Western hemispheres.',
  },
  {
    q: ['what is tectonic plate', 'tectonic plate explained', 'ano ang tectonic plate'],
    a: 'A **tectonic plate** is a massive slab of Earth\'s crust that moves slowly over the mantle. Their interactions cause earthquakes, volcanoes, and mountain formation.',
  },
  {
    q: ['what is volcano', 'volcano explained', 'ano ang bulkan'],
    a: 'A **volcano** is an opening in Earth\'s crust where molten rock (magma/lava), ash, and gases escape. There are active, dormant, and extinct volcanoes.',
  },
  {
    q: ['what is earthquake', 'earthquake explained', 'ano ang lindol'],
    a: 'An **earthquake** is the shaking of Earth\'s surface caused by sudden release of energy in the crust. Measured by the Richter scale. The Philippines sits on the Ring of Fire.',
  },
  {
    q: ['what is tsunami', 'tsunami explained', 'ano ang tsunami'],
    a: 'A **tsunami** is a series of large ocean waves caused by underwater earthquakes, volcanic eruptions, or landslides. They can travel at 800 km/h and cause massive flooding.',
  },
  {
    q: ['what is weather vs climate', 'weather and climate difference', 'weather climate difference'],
    a: '**Weather** is the short-term state of the atmosphere (today\'s rain). **Climate** is the long-term average of weather patterns in a region (annual rainfall).',
  },
  {
    q: ['what is monsoon', 'monsoon explained', 'ano ang monsoon'],
    a: 'A **monsoon** is a seasonal wind pattern that brings heavy rains. The Philippine monsoon (Habagat) brings rain from June to October; the Amihan brings dry, cool winds.',
  },

  /* ================================================== EVERYDAY TIPS */
  {
    q: ['how to save money', 'money saving tips', 'how to save more money'],
    a: '**Save money**: Track expenses. Pay yourself first (save before spending). Cut subscriptions you do not use. Cook at home. Use the 24-hour rule before big purchases.',
  },
  {
    q: ['how to budget', 'budgeting tips', 'how to create a budget'],
    a: '**Budgeting**: List all income. List all expenses. Subtract expenses from income. Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Track monthly.',
  },
  {
    q: ['how to do CPR', 'CPR steps', 'paano gumawa ng CPR'],
    a: '**Hands-only CPR**: Check response. Call 911. Push hard and fast on center of chest at 100-120 compressions per minute. Continue until help arrives. This is general guidance, not training.',
  },
  {
    q: ['how to clean a bathroom', 'bathroom cleaning tips', 'how to clean bathroom'],
    a: '**Bathroom cleaning**: Spray all surfaces. Clean from top to bottom. Scrub tiles with baking soda paste. Clean toilet inside and out. Rinse and dry. Do this weekly.',
  },
  {
    q: ['how to wash clothes', 'laundry tips', 'how to do laundry'],
    a: '**Laundry basics**: Sort by color and fabric. Check labels. Use right temperature. Do not overload. Use appropriate detergent. Dry properly. Fold and store promptly.',
  },
  {
    q: ['how to tie shoes', 'shoe tying methods', 'how to tie shoelaces'],
    a: '**Basic knot**: Cross laces, pull tight. Make a loop with one lace. Wrap other lace around, push through hole, pull tight. For kids: make two loops and tie together.',
  },
  {
    q: ['how to sew a button', 'sew button on', 'button sewing guide'],
    a: '**Sew a button**: Thread needle, double it, knot end. Push needle through fabric and buttonhole. Go through other hole. Repeat 4-6 times. Tie off on back.',
  },
  {
    q: ['how to do first aid', 'first aid basics', 'first aid guide'],
    a: '**First aid basics**: Stay calm. Check scene safety. Call for help. Control bleeding with pressure. Keep person warm and still. Do not move injured body parts.',
  },
  {
    q: ['how to treat a burn', 'burn treatment', 'first aid for burns'],
    a: '**Burn first aid**: Cool under running water for 10-20 minutes. Do not use ice. Cover with cling wrap. Do not pop blisters. Seek medical help for severe burns.',
  },
  {
    q: ['how to stop nosebleed', 'nosebleed first aid', 'nosebleed treatment'],
    a: '**Stop nosebleed**: Sit upright and lean forward slightly. Pinch soft part of nose for 10-15 minutes. Breathe through mouth. Do not tilt head back. Seek help if it does not stop.',
  },
  {
    q: ['how to treat a headache', 'headache remedies', 'headache treatment'],
    a: '**Headache remedies**: Rest in quiet, dark room. Apply cold or warm compress. Drink water. Take over-the-counter pain reliever. Manage stress. Get enough sleep.',
  },
  {
    q: ['how to reduce screen time', 'screen time tips', 'how to cut screen time'],
    a: '**Reduce screen time**: Set daily limits. Use app blockers. Turn off notifications. Keep devices out of bedroom. Find offline hobbies. Use grayscale mode. Set screen-free meals.',
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
