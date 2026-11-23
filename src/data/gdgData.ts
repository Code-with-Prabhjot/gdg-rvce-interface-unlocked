/**
 * GDG on Campus RV College of Engineering (GDG RVCE)
 * Central Architecture & Sample Dataset (Phases 2-6)
 *
 * BRAND COMPLIANCE & CHALLENGE CONSTRAINTS:
 * 1. Strict Exclusions: NO analytics counters, NO RSVP numbers ("X people going"),
 *    NO member/attendee counts, NO comment streams, NO live chat.
 * 2. Official Chapter Naming: Always "GDG on Campus RV College of Engineering" or "GDG RVCE".
 * 3. Official Four Google Colours:
 *    - Blue #4285F4
 *    - Red #EA4335
 *    - Yellow #FBBC04 (always paired with #111827 dark ink on yellow fills)
 *    - Green #34A853
 * 4. Dual-Theme Support: High-contrast tokens for Daylight Blueprint & Obsidian IDE.
 */

export type GoogleAccent = 'blue' | 'red' | 'yellow' | 'green';

export interface TelemetrySpec {
  code: string;
  label: string;
  value: string;
  accent: GoogleAccent;
  accentHex: string;
}

export interface FlagshipCountdown {
  title: string;
  subtitle: string;
  venue: string;
  targetDate: string; // ISO 8601 string
  slug: string;
}

export interface PillarItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  accent: GoogleAccent;
  accentHex: string;
  accentBg: string;
  iconName: string;
  features: string[];
  techSpec: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface GDGEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'AI & ML' | 'Android' | 'Cloud' | 'Web' | 'Open Source' | 'Design & Systems' | 'Flagship';
  status: 'upcoming' | 'past';
  accent: GoogleAccent;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  coverImage: string;
  description: string;
  prerequisites: string[];
  speaker: EventSpeaker;
  agenda: EventAgendaItem[];
  tags: string[];
  badgeText: string;
  registrationStatus: 'open' | 'waitlist' | 'concluded';
}

export interface RecapHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface EventRecap {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  venue: string;
  coverImage: string;
  overview: string;
  keynoteSpeaker: EventSpeaker;
  deliverables: {
    title: string;
    description: string;
    tech: string[];
  }[];
  highlights: RecapHighlight[];
}

// -----------------------------------------------------------------------------
// 1. FLAGSHIP COUNTDOWN
// Target date calibrated for upcoming flagship sprint
// -----------------------------------------------------------------------------
export const FLAGSHIP_COUNTDOWN: FlagshipCountdown = {
  title: "Gemini Multimodal Buildathon '26",
  subtitle: '24-Hour On-Campus Prototype Sprint',
  venue: 'IEM Auditorium · RVCE Campus',
  targetDate: '2026-12-12T09:30:00+05:30',
  slug: 'gemini-multimodal-buildathon',
};

// -----------------------------------------------------------------------------
// 2. TELEMETRY SPECS (Non-tracking architectural telemetry cards)
// -----------------------------------------------------------------------------
export const TELEMETRY_SPECS: TelemetrySpec[] = [
  {
    code: 'SPEC // 01',
    label: 'Core Verticals',
    value: 'AI · Cloud · Web · Android',
    accent: 'blue',
    accentHex: '#4285F4',
  },
  {
    code: 'SPEC // 02',
    label: 'Build Cadence',
    value: 'Bi-Weekly Hands-On Labs',
    accent: 'red',
    accentHex: '#EA4335',
  },
  {
    code: 'SPEC // 03',
    label: 'Code Philosophy',
    value: '100% Open-Source Repositories',
    accent: 'green',
    accentHex: '#34A853',
  },
  {
    code: 'SPEC // 04',
    label: 'Chapter Base',
    value: 'RVCE · Mysuru Rd, Bengaluru',
    accent: 'yellow',
    accentHex: '#FBBC04',
  },
];

// -----------------------------------------------------------------------------
// 3. TECH MARQUEE ITEMS
// -----------------------------------------------------------------------------
export const TECH_MARQUEE_ITEMS: string[] = [
  'GEMINI API',
  'NEXT.JS 15',
  'KUBERNETES',
  'JETPACK COMPOSE',
  'TENSORFLOW',
  'FIREBASE STUDIO',
  'FLUTTER',
  'CLOUD RUN',
  'TYPESCRIPT',
  'OPEN SOURCE',
];

// -----------------------------------------------------------------------------
// 4. PILLARS DATA (Bento Grid Foundations for Phase 3)
// -----------------------------------------------------------------------------
export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'core-workshops',
    title: 'Core Workshops',
    tagline: 'Deep-dive architectural bootcamps and systems labs',
    description:
      'Rigorous, instructor-led masterclasses diving deep into distributed cloud systems, modern Android app architectures, and high-performance Web Vitals.',
    accent: 'blue',
    accentHex: '#4285F4',
    accentBg: 'rgba(66, 133, 244, 0.08)',
    iconName: 'Cpu',
    features: [
      'Zero-slide live terminal and IDE coding environments',
      'Architectural blueprint breakdowns and design patterns',
      'Production deployment pipelines on Google Cloud Platform',
    ],
    techSpec: 'SYSTEMS // RUNTIME // INFRA',
  },
  {
    id: 'flagship-hackathons',
    title: 'Flagship Hackathons',
    tagline: '24-to-36 hour rapid prototyping arenas',
    description:
      'Immersive on-campus buildathlons where multi-disciplinary student teams build full-stack solutions with Gemini Multimodal APIs, Vertex AI, and scalable microservices.',
    accent: 'red',
    accentHex: '#EA4335',
    accentBg: 'rgba(234, 67, 53, 0.08)',
    iconName: 'Terminal',
    features: [
      'Real-world problem briefs vetted with industry mentors',
      'Direct API credits and sandboxed Google Cloud environments',
      'Peer-reviewed live demo pitch showcases',
    ],
    techSpec: 'SPRINT // DEMOS // BENCHMARKS',
  },
  {
    id: 'study-jams',
    title: 'Study Jams',
    tagline: 'Focused cohort study groups & credential tracks',
    description:
      'Structured weekly cohorts tackling machine learning models, cloud computing fundamentals, and native development with peer accountability and code reviews.',
    accent: 'yellow',
    accentHex: '#FBBC04',
    accentBg: 'rgba(251, 188, 4, 0.12)',
    iconName: 'Sparkles',
    features: [
      'Self-paced learning tracks with weekly peer code checkpoints',
      'Hands-on Google Cloud Skills Boost lab completions',
      'Senior student mentor office hours & guidance',
    ],
    techSpec: 'COHORTS // LABS // PEER REVIEW',
  },
  {
    id: 'open-source-builds',
    title: 'Open Source Builds',
    tagline: 'High-craft software created for public benefit',
    description:
      'Collaborative engineering projects maintaining public utility tools, student portals, and library packages under MIT and Apache-2.0 open-source licenses.',
    accent: 'green',
    accentHex: '#34A853',
    accentBg: 'rgba(52, 168, 83, 0.08)',
    iconName: 'GitBranch',
    features: [
      'Strict GitHub PR review standards and semantic versioning',
      'Automated CI/CD linting, typing, and unit test suites',
      'Open design systems with accessible Figma primitives',
    ],
    techSpec: 'REPOS // MIT // MONOREPO',
  },
];

// -----------------------------------------------------------------------------
// 5. EVENTS DATA (8 Events: 4 Upcoming, 4 Past)
// -----------------------------------------------------------------------------
export const EVENTS_DATA: GDGEvent[] = [
  // --- UPCOMING EVENTS ---
  {
    id: 'event-01',
    slug: 'gemini-multimodal-buildathon',
    title: "Gemini Multimodal Buildathon '26",
    subtitle: '24-Hour Prototype Sprint with Gemini 1.5 Pro & Flash',
    category: 'AI & ML',
    status: 'upcoming',
    accent: 'red',
    date: '2026-12-12',
    displayDate: 'Dec 12, 2026',
    time: '09:30 AM – Next Day 09:30 AM (24 Hours)',
    venue: 'IEM Auditorium · RVCE Campus',
    coverImage: '/assets/covers/ai-multimodal.svg',
    description:
      'An intensive 24-hour on-campus development sprint challenging student engineers to architect multimodal applications fusing audio, vision, long-context text, and tool-calling with the Gemini API.',
    prerequisites: [
      'Proficiency in Python 3.11+ or TypeScript / Node.js',
      'Basic familiarity with REST / streaming APIs and JSON schemas',
      'Active GitHub account with a configured SSH environment',
    ],
    speaker: {
      name: 'Dr. Ananya Rao',
      role: 'AI Research Staff Engineer',
      company: 'Google Developer Expert',
      avatarUrl: '/assets/avatars/member-01.svg',
    },
    agenda: [
      {
        time: '09:30 AM',
        title: 'Opening Keynote & Problem Brief Distribution',
        description: 'Deep dive into Gemini 1.5 long context caching and system instruction crafting.',
      },
      {
        time: '11:00 AM',
        title: 'Hacking Kickoff & Cloud Sandboxes Active',
        description: 'Teams set up repositories and wire streaming API endpoints.',
      },
      {
        time: '07:30 PM',
        title: 'Architecture Review & Mentor Checkpoint',
        description: 'Hands-on debugging of token latency, system prompts, and rate limits.',
      },
      {
        time: '08:00 AM (+1)',
        title: 'Code Freeze & Live Floor Demonstrations',
        description: 'Final commit tag submission and 3-minute technical jury demos.',
      },
    ],
    tags: ['Gemini 1.5', 'Multimodal', 'Vertex AI', 'Python', 'Hackathon'],
    badgeText: 'FLAGSHIP SPRINT',
    registrationStatus: 'open',
  },
  {
    id: 'event-02',
    slug: 'android-compose-kotlin',
    title: 'Modern Android with Jetpack Compose & Kotlin',
    subtitle: 'Declarative UI Pipelines, State Hosting, and Coroutines',
    category: 'Android',
    status: 'upcoming',
    accent: 'yellow',
    date: '2026-12-19',
    displayDate: 'Dec 19, 2026',
    time: '02:00 PM – 05:30 PM',
    venue: 'Computer Lab 4 · RVCE Campus',
    coverImage: '/assets/covers/android-compose.svg',
    description:
      'A hands-on code laboratory dedicated to building modern declarative Android applications using Jetpack Compose, Kotlin 2.0 Coroutines, StateFlow, and Material You design components.',
    prerequisites: [
      'Android Studio Ladybug installed on laptop',
      'Fundamental understanding of Kotlin syntax and OOP principles',
    ],
    speaker: {
      name: 'Karthik Subramanian',
      role: 'Staff Mobile Architect',
      company: 'Android GDE Guild',
      avatarUrl: '/assets/avatars/member-02.svg',
    },
    agenda: [
      {
        time: '02:00 PM',
        title: 'Compose Recomposition & Slot API Design',
        description: 'Understanding recomposition trees, remembered lambdas, and derived state.',
      },
      {
        time: '03:15 PM',
        title: 'Unidirectional Data Flow & State Hosting',
        description: 'Wiring ViewModels with StateFlow and immutable UI states.',
      },
      {
        time: '04:30 PM',
        title: 'Building a Dynamic Theme System',
        description: 'Pairing dynamic system palette accents with accessible dark mode overrides.',
      },
    ],
    tags: ['Jetpack Compose', 'Kotlin 2.0', 'Coroutines', 'Material 3'],
    badgeText: 'HANDS-ON LAB',
    registrationStatus: 'open',
  },
  {
    id: 'event-03',
    slug: 'cloud-native-k8s-cloudrun',
    title: 'Cloud-Native Microservices on K8s & Cloud Run',
    subtitle: 'Containerization, Traffic Splitting, and Zero-Scale Serverless',
    category: 'Cloud',
    status: 'upcoming',
    accent: 'blue',
    date: '2027-01-09',
    displayDate: 'Jan 09, 2027',
    time: '10:00 AM – 01:30 PM',
    venue: 'Seminar Hall 2 · RVCE Campus',
    coverImage: '/assets/covers/cloud-kubernetes.svg',
    description:
      'Discover how to design resilient microservices and deploy them onto Google Cloud Run and GKE. Learn canary traffic splits, gRPC communication, and secret management.',
    prerequisites: [
      'Docker Desktop or Podman installed locally',
      'Basic familiarity with command-line Linux and HTTP protocols',
    ],
    speaker: {
      name: 'Sneha Mukherjee',
      role: 'Cloud Infrastructure Specialist',
      company: 'Google Cloud Platform',
      avatarUrl: '/assets/avatars/member-03.svg',
    },
    agenda: [
      {
        time: '10:00 AM',
        title: 'Twelve-Factor App Architecture on Cloud Run',
        description: 'Stateless concurrency, revision management, and VPC access.',
      },
      {
        time: '11:15 AM',
        title: 'Container Multi-Stage Builds & Distroless Images',
        description: 'Optimizing container images from 800MB to 24MB for ultra-fast cold starts.',
      },
      {
        time: '12:30 PM',
        title: 'Traffic Splitting & Canary Deployment Demo',
        description: 'Automating zero-downtime progressive rollouts using Cloud Build.',
      },
    ],
    tags: ['Cloud Run', 'Kubernetes', 'Docker', 'GCP', 'DevOps'],
    badgeText: 'ARCHITECTURE WORKSHOP',
    registrationStatus: 'open',
  },
  {
    id: 'event-04',
    slug: 'high-performance-web-nextjs15',
    title: 'High-Performance Web: Next.js 15 & Edge Runtimes',
    subtitle: 'Server Components, Streaming SSR, and Core Web Vitals at Scale',
    category: 'Web',
    status: 'upcoming',
    accent: 'green',
    date: '2027-01-23',
    displayDate: 'Jan 23, 2027',
    time: '02:30 PM – 05:30 PM',
    venue: 'Civil Seminar Hall · RVCE Campus',
    coverImage: '/assets/covers/web-perf.svg',
    description:
      'Master the cutting edge of web engineering with React 19, Next.js 15 App Router, streaming Suspense architectures, and surgical Core Web Vitals optimization.',
    prerequisites: [
      'Proficiency in modern TypeScript & React hooks',
      'Node.js 20+ installed on personal machine',
    ],
    speaker: {
      name: 'Rohan Deshmukh',
      role: 'Principal Frontend Engineer',
      company: 'Open Web Collective',
      avatarUrl: '/assets/avatars/member-04.svg',
    },
    agenda: [
      {
        time: '02:30 PM',
        title: 'React 19 Compiler & Server Action Mechanics',
        description: 'How server components eliminate clientside JS payload bloat.',
      },
      {
        time: '03:45 PM',
        title: 'Optimizing INP, LCP, and Cumulative Layout Shift',
        description: 'Diagnosing micro-stutters and orchestrating font-display fallbacks.',
      },
      {
        time: '04:45 PM',
        title: 'Edge Middleware & Distributed KV Caching',
        description: 'Executing low-latency sub-10ms routing rules across global edge points.',
      },
    ],
    tags: ['Next.js 15', 'React 19', 'Performance', 'TypeScript', 'Web Vitals'],
    badgeText: 'TECH LAB',
    registrationStatus: 'waitlist',
  },

  // --- PAST EVENTS ---
  {
    id: 'event-05',
    slug: 'neural-hack-sprint-edge-ml',
    title: 'Neural Hack Sprint: Edge ML & TensorFlow Lite',
    subtitle: 'Deploying Quantized Neural Networks on Embedded Devices',
    category: 'AI & ML',
    status: 'past',
    accent: 'red',
    date: '2026-11-15',
    displayDate: 'Nov 15, 2026',
    time: '09:00 AM – 06:00 PM',
    venue: 'IEM Auditorium · RVCE Campus',
    coverImage: '/assets/covers/hackathon-neural.svg',
    description:
      'A deep dive into edge machine learning where students trained computer vision models, performed post-training integer quantization, and deployed them to Raspberry Pi and Android targets.',
    prerequisites: ['Python 3.10+', 'Basic linear algebra and NumPy basics'],
    speaker: {
      name: 'Arjun Natarajan',
      role: 'Edge ML Engineer',
      company: 'TensorFlow User Group',
      avatarUrl: '/assets/avatars/member-05.svg',
    },
    agenda: [
      {
        time: '09:00 AM',
        title: 'Model Pruning and Quantization Fundamentals',
        description: 'Converting float32 models to int8 with zero noticeable accuracy degradation.',
      },
      {
        time: '01:00 PM',
        title: 'TFLite Micro & Sensor Streaming',
        description: 'Real-time gesture recognition from continuous accelerometer streams.',
      },
    ],
    tags: ['TensorFlow Lite', 'Edge AI', 'Quantization', 'Python'],
    badgeText: 'ARCHIVED SPRINT',
    registrationStatus: 'concluded',
  },
  {
    id: 'event-06',
    slug: 'design-systems-tokens-code',
    title: 'Design Systems at Scale: Tokens to Code',
    subtitle: 'Figma Variables, Semantic Primitives, and Tailwind PostCSS Architecture',
    category: 'Design & Systems',
    status: 'past',
    accent: 'yellow',
    date: '2026-10-28',
    displayDate: 'Oct 28, 2026',
    time: '03:00 PM – 06:00 PM',
    venue: 'Design Studio · RVCE Architecture Block',
    coverImage: '/assets/covers/design-systems.svg',
    description:
      'Exploring how modern engineering organizations bridge design and code using automated design token pipelines, style dictionary transforms, and accessible WCAG AA+ contrast models.',
    prerequisites: ['Figma fundamentals & basic CSS variables knowledge'],
    speaker: {
      name: 'Meera Menon',
      role: 'Senior Design Technologist',
      company: 'Material Design Guild',
      avatarUrl: '/assets/avatars/member-06.svg',
    },
    agenda: [
      {
        time: '03:00 PM',
        title: 'Design Token Taxonomy & Primitive Scales',
        description: 'Organizing semantic layers across spacing, color, and elevation.',
      },
      {
        time: '04:30 PM',
        title: 'Exporting Tokens into Tailwind v4 Theme Variables',
        description: 'Automating CSS variable distribution with zero manual drift.',
      },
    ],
    tags: ['Design Systems', 'Figma', 'Tokens', 'Tailwind CSS', 'WCAG'],
    badgeText: 'ARCHIVED MASTERCLASS',
    registrationStatus: 'concluded',
  },
  {
    id: 'event-07',
    slug: 'open-source-architecture-git',
    title: 'Open Source Architecture & Git Mastery Sprint',
    subtitle: 'Interactive Rebasing, Monorepo Plumbing, and GitHub Actions CI',
    category: 'Open Source',
    status: 'past',
    accent: 'green',
    date: '2026-10-10',
    displayDate: 'Oct 10, 2026',
    time: '11:00 AM – 04:00 PM',
    venue: 'CSE Seminar Hall · RVCE Campus',
    coverImage: '/assets/covers/opensource-git.svg',
    description:
      'An architectural dive under the hood of Git: understanding the object database, commit graphs, interactive rebase surgery, and crafting bulletproof GitHub Actions workflows.',
    prerequisites: ['Git CLI installed and basic commit/push workflow experience'],
    speaker: {
      name: 'Vikramaditya Hegde',
      role: 'Open Source Maintainer',
      company: 'Linux Foundation Fellow',
      avatarUrl: '/assets/avatars/member-07.svg',
    },
    agenda: [
      {
        time: '11:00 AM',
        title: 'Git Internals: Blobs, Trees, and Commits',
        description: 'Dissecting the .git folder and inspecting SHA-1 hash pointers.',
      },
      {
        time: '02:00 PM',
        title: 'Crafting Automated Release Workflows',
        description: 'Semantic release automation, changelog generation, and NPM publish.',
      },
    ],
    tags: ['Git', 'GitHub Actions', 'CI/CD', 'Open Source', 'Bash'],
    badgeText: 'ARCHIVED SPRINT',
    registrationStatus: 'concluded',
  },
  {
    id: 'event-08',
    slug: 'devfest-campus-warmup-26',
    title: "DevFest Campus Warmup '26",
    subtitle: 'Annual Chapter Launch, Architecture Keynote & Technology Showcase',
    category: 'Flagship',
    status: 'past',
    accent: 'blue',
    date: '2026-09-20',
    displayDate: 'Sep 20, 2026',
    time: '09:30 AM – 05:30 PM',
    venue: 'Sir M. Visvesvaraya Hall · RVCE Campus',
    coverImage: '/assets/covers/devfest-recap.svg',
    description:
      'The inaugural campus keynote bringing together student developers, faculty mentors, and industry practitioners to preview the year’s engineering roadmaps across AI, Cloud, Web, and Mobile.',
    prerequisites: ['Open to all RVCE engineering students across all semesters'],
    speaker: {
      name: 'Pooja Sundaram',
      role: 'Community Ecosystem Lead',
      company: 'Google Developers',
      avatarUrl: '/assets/avatars/member-08.svg',
    },
    agenda: [
      {
        time: '09:30 AM',
        title: 'Opening Keynote: The Multi-Disciplinary Engineer',
        description: 'Navigating rapid shifts in developer tooling and AI-native software.',
      },
      {
        time: '11:30 AM',
        title: 'Four-Vertical Live Code Demonstrations',
        description: 'Simultaneous deep-dives in Gemini APIs, Jetpack Compose, Next.js, and Cloud Run.',
      },
      {
        time: '03:30 PM',
        title: 'Open Source Roadmap & Chapter Guild Launch',
        description: 'Announcing student working groups and upcoming buildathlon schedules.',
      },
    ],
    tags: ['DevFest', 'Keynote', 'Architecture', 'AI', 'Cloud', 'Android', 'Web'],
    badgeText: 'ANNUAL KEYNOTE',
    registrationStatus: 'concluded',
  },
];

// -----------------------------------------------------------------------------
// 6. RECAP DATA (For "DevFest Campus Warmup '26")
// -----------------------------------------------------------------------------
export const RECAP_DATA: EventRecap = {
  slug: 'devfest-campus-warmup-26',
  title: "DevFest Campus Warmup '26",
  subtitle: 'Chapter Launch & Architecture Keynote',
  date: 'September 20, 2026',
  venue: 'Sir M. Visvesvaraya Hall · RVCE Campus',
  coverImage: '/assets/covers/devfest-recap.svg',
  overview:
    'DevFest Campus Warmup ’26 marked the official chapter ignition for GDG on Campus RV College of Engineering. Featuring 4 technical keynotes, 12 live architecture demos, and student open-source repositories launched into production.',
  keynoteSpeaker: {
    name: 'Pooja Sundaram',
    role: 'Community Ecosystem Lead',
    company: 'Google Developers',
    avatarUrl: '/assets/avatars/member-08.svg',
  },
  deliverables: [
    {
      title: 'Multimodal Sensor Hub',
      description: 'An open-source telemetry dashboard powered by Gemini Flash and Next.js 15.',
      tech: ['Gemini API', 'Next.js 15', 'TypeScript'],
    },
    {
      title: 'RVCE Campus Transit Navigation',
      description: 'Offline-first Android application built with Jetpack Compose & SQLite.',
      tech: ['Kotlin', 'Compose', 'Room DB'],
    },
    {
      title: 'Distroless K8s Deployment Pipeline',
      description: 'Reusable GitHub Actions workflow template for zero-trust microservice builds.',
      tech: ['Kubernetes', 'Cloud Run', 'Docker'],
    },
  ],
  highlights: [
    {
      label: 'Core Tracks',
      value: '4 Deep Verticals',
      detail: 'AI/ML, Cloud Infrastructure, Modern Android, High-Perf Web',
    },
    {
      label: 'Open Source',
      value: '8 Repositories Initialized',
      detail: 'Published under MIT license with automated CI workflows',
    },
    {
      label: 'Live Demos',
      value: '12 Technical Showcases',
      detail: 'Presented live on stage with zero slide-only presentations',
    },
    {
      label: 'Engineering Philosophy',
      value: '100% Student-Driven',
      detail: 'Designed, architected, and delivered by RVCE student developers',
    },
  ],
};

// -----------------------------------------------------------------------------
// 7. DEVELOPER STICKERS & BADGES METADATA
// -----------------------------------------------------------------------------
export interface DeveloperSticker {
  id: string;
  file: string;
  label: string;
  tooltip: string;
  accent: GoogleAccent;
  accentHex: string;
}

export const DEVELOPER_STICKERS: DeveloperSticker[] = [
  {
    id: 'gemini-spark',
    file: 'gemini-spark.svg',
    label: 'Gemini Spark',
    tooltip: 'Build with Gemini',
    accent: 'red',
    accentHex: '#EA4335',
  },
  {
    id: 'ship-it',
    file: 'ship-it.svg',
    label: 'Ship It',
    tooltip: 'Ship Fast',
    accent: 'blue',
    accentHex: '#4285F4',
  },
  {
    id: 'terminal-wizard',
    file: 'terminal-wizard.svg',
    label: 'Terminal Wizard',
    tooltip: 'Open Source',
    accent: 'green',
    accentHex: '#34A853',
  },
  {
    id: 'kotlin-android',
    file: 'kotlin-android.svg',
    label: 'Kotlin Android',
    tooltip: 'Native Craft',
    accent: 'yellow',
    accentHex: '#FBBC04',
  },
];
