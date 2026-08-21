/**
 * Senior High School under K–12: the four tracks and the strands inside them.
 *
 * The core and applied subjects are the same for every strand, so they live
 * here once. Each strand then lists only what makes it different — its
 * specialised subjects — plus where it usually leads afterwards.
 */

/** Taken by every SHS student, whatever the strand. */
export const CORE_SUBJECTS = [
  'Oral Communication',
  'Reading and Writing Skills',
  'Komunikasyon at Pananaliksik sa Wika at Kulturang Filipino',
  'Pagbasa at Pagsusuri ng Iba’t Ibang Teksto Tungo sa Pananaliksik',
  '21st Century Literature from the Philippines and the World',
  'Contemporary Philippine Arts from the Regions',
  'Media and Information Literacy',
  'General Mathematics',
  'Statistics and Probability',
  'Earth and Life Science (or Earth Science / Disaster Readiness for STEM)',
  'Physical Science',
  'Introduction to the Philosophy of the Human Person',
  'Physical Education and Health (1–4)',
  'Personal Development',
  'Understanding Culture, Society and Politics',
]

/** Applied subjects — same list, contextualised to each strand. */
export const APPLIED_SUBJECTS = [
  'English for Academic and Professional Purposes',
  'Practical Research 1 (Qualitative)',
  'Practical Research 2 (Quantitative)',
  'Filipino sa Piling Larangan',
  'Empowerment Technologies',
  'Entrepreneurship',
  'Inquiries, Investigations and Immersion',
  'Work Immersion (80 hours)',
]

const ROWS = [
  {
    code: 'STEM',
    name: 'Science, Technology, Engineering and Mathematics',
    track: 'Academic',
    aliases: ['stem', 'science strand', 'stem strand'],
    about:
      'The heaviest strand in mathematics and science. Built for students heading into engineering, medicine, computing or the pure sciences.',
    specialized: [
      'Pre-Calculus',
      'Basic Calculus',
      'General Biology 1 & 2',
      'General Chemistry 1 & 2',
      'General Physics 1 & 2',
      'Disaster Readiness and Risk Reduction',
      'Research/Capstone Project',
    ],
    leadsTo: [
      'Engineering (all branches)',
      'Computer Science / IT',
      'Medicine, Nursing, Pharmacy, Medical Technology',
      'Architecture',
      'Biology, Chemistry, Physics, Mathematics',
    ],
  },
  {
    code: 'ABM',
    name: 'Accountancy, Business and Management',
    track: 'Academic',
    aliases: ['abm', 'business strand', 'abm strand'],
    about:
      'Business, money and how organisations run. The direct path to accountancy, business administration and entrepreneurship.',
    specialized: [
      'Applied Economics',
      'Business Ethics and Social Responsibility',
      'Fundamentals of Accountancy, Business and Management 1 & 2',
      'Business Math',
      'Business Finance',
      'Organization and Management',
      'Principles of Marketing',
      'Work Immersion / Business Enterprise Simulation',
    ],
    leadsTo: [
      'BS Accountancy',
      'BS Business Administration',
      'BS Management Accounting',
      'BS Entrepreneurship',
      'BS Customs Administration, Economics',
    ],
  },
  {
    code: 'HUMSS',
    name: 'Humanities and Social Sciences',
    track: 'Academic',
    aliases: ['humss', 'humanities strand', 'humss strand'],
    about:
      'People, society, language and ideas. For students heading into law, teaching, journalism, psychology or public service.',
    specialized: [
      'Creative Writing',
      'Creative Nonfiction',
      'World Religions and Belief Systems',
      'Philippine Politics and Governance',
      'Community Engagement, Solidarity and Citizenship',
      'Trends, Networks and Critical Thinking in the 21st Century',
      'Disciplines and Ideas in the Social Sciences',
      'Disciplines and Ideas in the Applied Social Sciences',
    ],
    leadsTo: [
      'AB Political Science (and later Law)',
      'Education (BEEd, BSEd)',
      'AB Communication / Journalism',
      'Psychology, Social Work',
      'Public Administration, International Studies',
    ],
  },
  {
    code: 'GAS',
    name: 'General Academic Strand',
    track: 'Academic',
    aliases: ['gas', 'general academic', 'gas strand'],
    about:
      'For students who have not settled on a direction yet: a mix of subjects drawn from the other academic strands, keeping most college options open.',
    specialized: [
      'Humanities 1 & 2',
      'Social Science 1',
      'Applied Economics',
      'Organization and Management',
      'Disaster Readiness and Risk Reduction',
      'Elective 1 & 2 (chosen from any other strand)',
    ],
    leadsTo: [
      'Most non-STEM degrees',
      'Education, Business, Communication, Hospitality',
      'Any program whose prerequisites the electives covered',
    ],
  },
  {
    code: 'TVL-ICT',
    name: 'TVL — Information and Communications Technology',
    track: 'Technical-Vocational-Livelihood',
    aliases: ['tvl ict', 'ict strand', 'ict', 'computer strand'],
    about:
      'Hands-on computing with a TESDA National Certificate at the end, so a graduate can work straight out of senior high.',
    specialized: [
      'Computer Systems Servicing (NC II)',
      'Programming — Java, .NET, or Oracle Database (NC III)',
      'Animation (NC II)',
      'Illustration (NC II)',
      'Contact Center Services (NC II)',
      'Medical Transcription',
      'Technical Drafting (NC II)',
    ],
    leadsTo: ['IT / Computer Science', 'Work as technician, encoder, animator, support agent', 'Freelance web and graphics work'],
  },
  {
    code: 'TVL-HE',
    name: 'TVL — Home Economics',
    track: 'Technical-Vocational-Livelihood',
    aliases: ['tvl he', 'home economics', 'he strand'],
    about: 'Food, hospitality and personal services, each ending in a TESDA certificate.',
    specialized: [
      'Cookery (NC II)',
      'Bread and Pastry Production (NC II)',
      'Food and Beverage Services (NC II)',
      'Housekeeping (NC II)',
      'Tourism Promotion Services (NC II)',
      'Beauty Care / Nail Care (NC II)',
      'Dressmaking and Tailoring (NC II)',
      'Caregiving (NC II)',
    ],
    leadsTo: ['Hospitality Management, Tourism, Culinary Arts', 'Hotel, restaurant and cruise-ship work', 'Own food business'],
  },
  {
    code: 'TVL-IA',
    name: 'TVL — Industrial Arts',
    track: 'Technical-Vocational-Livelihood',
    aliases: ['tvl ia', 'industrial arts', 'ia strand'],
    about: 'The building and repair trades, with TESDA certification.',
    specialized: [
      'Automotive Servicing (NC I/II)',
      'Electrical Installation and Maintenance (NC II)',
      'Shielded Metal Arc Welding (NC I/II)',
      'Carpentry (NC II)',
      'Masonry (NC II)',
      'Plumbing (NC I/II)',
      'Machining (NC I/II)',
      'Consumer Electronics Servicing (NC II)',
    ],
    leadsTo: ['Engineering programs', 'Skilled trade work locally or abroad', 'Own contracting or repair business'],
  },
  {
    code: 'TVL-AFA',
    name: 'TVL — Agri-Fishery Arts',
    track: 'Technical-Vocational-Livelihood',
    aliases: ['tvl afa', 'agri fishery', 'agriculture strand', 'afa'],
    about: 'Farming, fishing and food production as certified trades.',
    specialized: [
      'Agricultural Crops Production (NC I/II)',
      'Animal Production (NC II)',
      'Aquaculture (NC II)',
      'Fish Capture (NC II)',
      'Organic Agriculture Production (NC II)',
      'Food Processing (NC II)',
      'Rubber Production / Horticulture',
    ],
    leadsTo: ['BS Agriculture, Fisheries, Agricultural Engineering', 'Farm and aquaculture work', 'Agribusiness'],
  },
  {
    code: 'Sports',
    name: 'Sports Track',
    track: 'Sports',
    aliases: ['sports track', 'sports strand'],
    about: 'For athletes and future coaches, trainers and PE teachers.',
    specialized: [
      'Safety and First Aid',
      'Human Movement',
      'Fundamentals of Coaching',
      'Sports Officiating and Activity Management',
      'Fitness, Sports and Recreation Leadership',
      'Psychosocial Aspects of Sports and Exercise',
      'Fitness Testing and Basic Exercise Programming',
    ],
    leadsTo: ['BS Physical Education, Sports Science', 'Coaching, fitness training, sports management', 'Physical Therapy'],
  },
  {
    code: 'Arts and Design',
    name: 'Arts and Design Track',
    track: 'Arts and Design',
    aliases: ['arts and design', 'arts strand', 'design track'],
    about: 'For performers, visual artists and designers.',
    specialized: [
      'Creative Industries 1: Arts and Design Appreciation and Production',
      'Creative Industries 2: Performing Arts',
      'Physical and Personal Development in the Arts',
      'Developing Filipino Identity in the Arts',
      'Integrating the Elements and Principles of Organization in the Arts',
      'Leadership and Management in Different Arts Fields',
      'Apprenticeship and Exploration of Different Arts Fields',
    ],
    leadsTo: ['Fine Arts, Multimedia Arts, Interior/Industrial Design', 'Performing arts, film, music', 'Advertising and creative studios'],
  },
]

export const STRANDS = ROWS
