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
  chips: string[];
  indexTag: string;
  pillBadge: string;
  emoteBadge?: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  avatar: string;
  avatarUrl?: string;
  company?: string;
}

export interface EventAgendaItem {
  time: string;
  topic: string;
  detail: string;
  title?: string;
  description?: string;
}

export type EventCategory = 'Hackathon' | 'Workshop' | 'Study Jam' | 'Tech Talk';
export type EventStatus = 'Upcoming' | 'Past';
export type DeliveryMode = 'In-Person' | 'Hybrid' | 'Online';

export interface GDGEvent {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  eventType?: EventCategory;
  status: EventStatus;
  googleColor: GoogleAccent;
  accent?: GoogleAccent;
  date: string;
  time: string;
  isoStart: string;
  isoEnd: string;
  mode: DeliveryMode;
  venue: string;
  coverImage: string;
  sceneImage?: string;
  summary: string;
  description: string;
  speaker: EventSpeaker;
  agenda: EventAgendaItem[];
  prerequisites: string[];
  tags: string[];
  subtitle?: string;
  displayDate?: string;
  badgeText?: string;
  registrationStatus?: 'open' | 'waitlist' | 'concluded';
}

export type SceneCategory =
  | 'Keynote Broadcast'
  | 'Hackathon Sprint'
  | 'Livestream Studio'
  | 'Hands-On Lab'
  | 'Demo Day'
  | 'Open Source Jam'
  | 'Design Systems Studio'
  | 'Architecture War Room'
  | 'Mobile Device Lab'
  | 'Release Party';

export interface CommunityScene {
  id: string;
  code: string;
  title: string;
  category: SceneCategory;
  venue: string;
  googleColor: GoogleAccent;
  image: string;
  caption: string;
  highlights: string[];
}

export interface RecapHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface RecapTabItem {
  id: 'keynotes' | 'labs' | 'artifacts';
  label: string;
  tagline: string;
  narrative: string;
  takeaways: string[];
  badges: string[];
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
  tabs: RecapTabItem[];
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
    title: 'Hands-On Build Labs',
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
    chips: ['Cloud Run', 'Next.js 15', 'Android Compose'],
    indexTag: '01 // BLUE',
    pillBadge: 'SYSTEMS LAB',
  },
  {
    id: 'flagship-hackathons',
    title: 'Campus Hackathons',
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
    chips: ['Gemini APIs', 'Vertex AI', '24h Prototype'],
    indexTag: '02 // RED',
    pillBadge: 'RAPID SPRINT',
    emoteBadge: '/assets/emotes/trophy-build.svg',
  },
  {
    id: 'study-jams',
    title: 'Study Jams & Pathways',
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
    chips: ['Cloud Boost', 'TensorFlow', 'Peer Reviews'],
    indexTag: '03 // YELLOW',
    pillBadge: 'LEARNING TRACK',
    emoteBadge: '/assets/emotes/gemini-spark.svg',
  },
  {
    id: 'open-source-builds',
    title: 'Open Source & Research',
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
    chips: ['MIT / Apache', 'GitHub Actions', 'Monorepos'],
    indexTag: '04 // GREEN',
    pillBadge: 'OPEN PROTOCOL',
    emoteBadge: '/assets/emotes/merge-clean.svg',
  },
];

// -----------------------------------------------------------------------------
// 5. EVENTS DATA (8 Events: 4 Upcoming, 4 Past)
// Evenly covering 4 tracks (Hackathon, Workshop, Study Jam, Tech Talk)
// and 3 delivery modes (In-Person, Hybrid, Online)
// -----------------------------------------------------------------------------
export const EVENTS_DATA: GDGEvent[] = [
  // --- UPCOMING EVENTS ---
  {
    id: 'event-01',
    slug: 'gemini-multimodal-buildathon',
    title: "Gemini Multimodal Buildathon '26",
    subtitle: '24-Hour Prototype Sprint with Gemini 1.5 Pro & Flash',
    category: 'Hackathon',
    eventType: 'Hackathon',
    status: 'Upcoming',
    googleColor: 'red',
    accent: 'red',
    date: '12 DEC 2026',
    displayDate: '12 DEC 2026',
    time: '09:30 – 09:30 IST (+24h)',
    isoStart: '2026-12-12T09:30:00+05:30',
    isoEnd: '2026-12-13T09:30:00+05:30',
    mode: 'In-Person',
    venue: 'IEM Auditorium, RVCE',
    coverImage: '/assets/covers/ai-multimodal.svg',
    sceneImage: '/assets/scenes/hackathon-table-sprint.svg',
    summary: '24-hour rapid prototyping arena architecting next-gen multimodal apps using Gemini 1.5 Pro and Vertex AI.',
    description:
      'An intensive 24-hour on-campus development sprint challenging student engineers to architect multimodal applications fusing audio, vision, long-context text, and structured tool-calling with the Gemini API. Compete in multidisciplinary teams with direct API credits and mentor code checkpoints.',
    prerequisites: [
      'Proficiency in Python 3.11+ or TypeScript / Node.js',
      'Familiarity with REST APIs, streaming responses, and JSON schemas',
      'Configured Git environment with SSH key authentication',
      'Active laptop with Docker or Node runtime installed',
    ],
    speaker: {
      name: 'Dr. Ananya Rao',
      role: 'Staff AI Research Fellow',
      company: 'Google Developer Expert Guild',
      avatar: '/assets/avatars/member-01.svg',
      avatarUrl: '/assets/avatars/member-01.svg',
    },
    agenda: [
      {
        time: '09:30 AM',
        topic: 'Opening Keynote & Problem Statements',
        detail: 'Deep dive into Gemini 1.5 long context caching and system instruction crafting.',
        title: 'Opening Keynote & Problem Statements',
        description: 'Deep dive into Gemini 1.5 long context caching and system instruction crafting.',
      },
      {
        time: '11:00 AM',
        topic: 'Sprint Ignition & Cloud Sandbox Live',
        detail: 'Teams spin up git repositories and configure streaming endpoint pipelines.',
        title: 'Sprint Ignition & Cloud Sandbox Live',
        description: 'Teams spin up git repositories and configure streaming endpoint pipelines.',
      },
      {
        time: '07:30 PM',
        topic: 'Architecture & Token Benchmark Review',
        detail: 'Hands-on debugging of token latency, system prompts, and rate limits.',
        title: 'Architecture & Token Benchmark Review',
        description: 'Hands-on debugging of token latency, system prompts, and rate limits.',
      },
      {
        time: '02:00 AM',
        topic: 'Midnight Crucible & Mentor Desk',
        detail: 'Dry-run API integrations with live function calling verification.',
        title: 'Midnight Crucible & Mentor Desk',
        description: 'Dry-run API integrations with live function calling verification.',
      },
      {
        time: '08:00 AM',
        topic: 'Code Freeze & Live Jury Pitches',
        detail: 'Final commit tag submission and 3-minute technical jury demonstrations.',
        title: 'Code Freeze & Live Jury Pitches',
        description: 'Final commit tag submission and 3-minute technical jury demonstrations.',
      },
    ],
    tags: ['Gemini 1.5', 'Multimodal', 'Vertex AI', 'Python'],
    badgeText: 'FLAGSHIP SPRINT',
    registrationStatus: 'open',
  },
  {
    id: 'event-02',
    slug: 'cloud-native-k8s-cloudrun',
    title: 'Cloud-Native Microservices on K8s & Cloud Run',
    subtitle: 'Containerization, Traffic Splitting, and Zero-Scale Serverless',
    category: 'Workshop',
    eventType: 'Workshop',
    status: 'Upcoming',
    googleColor: 'blue',
    accent: 'blue',
    date: '09 JAN 2027',
    displayDate: '09 JAN 2027',
    time: '10:00 – 14:00 IST',
    isoStart: '2027-01-09T10:00:00+05:30',
    isoEnd: '2027-01-09T14:00:00+05:30',
    mode: 'Hybrid',
    venue: 'Kotlin & Cloud Lab, RVCE',
    coverImage: '/assets/covers/cloud-kubernetes.svg',
    sceneImage: '/assets/scenes/cloud-workshop-lab.svg',
    summary: 'Architect and deploy resilient microservices on GKE and Google Cloud Run with canary traffic splits.',
    description:
      'Hands-on production laboratory exploring twelve-factor systems, multi-stage distroless container packaging, gRPC internal service meshes, and automated zero-downtime canary rollouts on Google Cloud Platform.',
    prerequisites: [
      'Docker Desktop or Podman installed locally',
      'Fundamental grasp of containerization and Linux CLI commands',
      'Google Cloud SDK (gcloud CLI) initialized on your machine',
      'Familiarity with YAML and microservice architecture',
    ],
    speaker: {
      name: 'Sneha Mukherjee',
      role: 'Cloud Infrastructure Specialist',
      company: 'Google Cloud Platform',
      avatar: '/assets/avatars/member-03.svg',
      avatarUrl: '/assets/avatars/member-03.svg',
    },
    agenda: [
      {
        time: '10:00 AM',
        topic: 'Twelve-Factor Cloud Run Architecture',
        detail: 'Stateless concurrency, revision management, and VPC peering topologies.',
        title: 'Twelve-Factor Cloud Run Architecture',
        description: 'Stateless concurrency, revision management, and VPC peering topologies.',
      },
      {
        time: '11:15 AM',
        topic: 'Distroless Multi-Stage Container Builds',
        detail: 'Trimming image layers from 800MB to 24MB for sub-second cold starts.',
        title: 'Distroless Multi-Stage Container Builds',
        description: 'Trimming image layers from 800MB to 24MB for sub-second cold starts.',
      },
      {
        time: '12:30 PM',
        topic: 'Canary Traffic Splitting & Cloud Build CI',
        detail: 'Automating zero-downtime progressive rollouts with health telemetry.',
        title: 'Canary Traffic Splitting & Cloud Build CI',
        description: 'Automating zero-downtime progressive rollouts with health telemetry.',
      },
      {
        time: '01:30 PM',
        topic: 'GKE Autopilot Workload Hardening',
        detail: 'Configuring network policies, secrets management, and least-privilege IAM.',
        title: 'GKE Autopilot Workload Hardening',
        description: 'Configuring network policies, secrets management, and least-privilege IAM.',
      },
    ],
    tags: ['Kubernetes', 'Cloud Run', 'Docker', 'GCP'],
    badgeText: 'ARCHITECTURE LAB',
    registrationStatus: 'open',
  },
  {
    id: 'event-03',
    slug: 'android-compose-kotlin',
    title: 'Modern Android with Jetpack Compose & Kotlin',
    subtitle: 'Declarative UI Pipelines, State Hoisting, and Coroutines',
    category: 'Study Jam',
    eventType: 'Study Jam',
    status: 'Upcoming',
    googleColor: 'yellow',
    accent: 'yellow',
    date: '19 DEC 2026',
    displayDate: '19 DEC 2026',
    time: '14:00 – 17:30 IST',
    isoStart: '2026-12-19T14:00:00+05:30',
    isoEnd: '2026-12-19T17:30:00+05:30',
    mode: 'In-Person',
    venue: 'CSE Seminar Hall, RVCE',
    coverImage: '/assets/covers/android-compose.svg',
    sceneImage: '/assets/scenes/demo-day-showcase.svg',
    summary: 'Declarative UI engineering, state hoisting pipelines, and reactive coroutine architecture in Kotlin 2.0.',
    description:
      'An interactive study jam exploring modern Android architecture: building dynamic Material You interfaces, managing unidirectional state flows with Kotlin StateFlow, and optimizing recomposition trees.',
    prerequisites: [
      'Android Studio Ladybug installed on personal laptop',
      'Basic knowledge of Kotlin syntax and object-oriented principles',
      'An Android device or configured AVD emulator',
      'Understanding of basic reactive UI concepts',
    ],
    speaker: {
      name: 'Karthik Subramanian',
      role: 'Staff Mobile Architect',
      company: 'Android GDE Guild',
      avatar: '/assets/avatars/member-02.svg',
      avatarUrl: '/assets/avatars/member-02.svg',
    },
    agenda: [
      {
        time: '02:00 PM',
        topic: 'Compose Slot APIs & Recomposition Trees',
        detail: 'Understanding compiler optimization flags, remembered lambdas, and derived state.',
        title: 'Compose Slot APIs & Recomposition Trees',
        description: 'Understanding compiler optimization flags, remembered lambdas, and derived state.',
      },
      {
        time: '03:15 PM',
        topic: 'Unidirectional Data Flow & State Hosting',
        detail: 'Wiring Android ViewModels with StateFlow and immutable UI states.',
        title: 'Unidirectional Data Flow & State Hosting',
        description: 'Wiring Android ViewModels with StateFlow and immutable UI states.',
      },
      {
        time: '04:15 PM',
        topic: 'Kotlin Coroutines & Flow Channels',
        detail: 'Handling asynchronous network pipelines without thread blocking.',
        title: 'Kotlin Coroutines & Flow Channels',
        description: 'Handling asynchronous network pipelines without thread blocking.',
      },
      {
        time: '05:00 PM',
        topic: 'Dynamic Theming & Contrast Auditing',
        detail: 'Pairing system palette tokens with accessible dark mode overrides.',
        title: 'Dynamic Theming & Contrast Auditing',
        description: 'Pairing system palette tokens with accessible dark mode overrides.',
      },
    ],
    tags: ['Jetpack Compose', 'Kotlin 2.0', 'Coroutines', 'Material 3'],
    badgeText: 'HANDS-ON LAB',
    registrationStatus: 'open',
  },
  {
    id: 'event-04',
    slug: 'high-performance-web-nextjs15',
    title: 'High-Performance Web: Next.js 15 & Edge Runtimes',
    subtitle: 'Server Components, Streaming SSR, and Core Web Vitals at Scale',
    category: 'Tech Talk',
    eventType: 'Tech Talk',
    status: 'Upcoming',
    googleColor: 'green',
    accent: 'green',
    date: '23 JAN 2027',
    displayDate: '23 JAN 2027',
    time: '14:30 – 17:30 IST',
    isoStart: '2027-01-23T14:30:00+05:30',
    isoEnd: '2027-01-23T17:30:00+05:30',
    mode: 'Online',
    venue: 'Google Meet Live',
    coverImage: '/assets/covers/web-perf.svg',
    sceneImage: '/assets/scenes/broadcast-livestream-studio.svg',
    summary: 'Server Components, Streaming SSR, and Core Web Vitals optimization on edge runtimes.',
    description:
      'Dive into bleeding-edge web engineering with React 19 Compiler, Next.js 15 App Router, streaming Suspense boundaries, and surgical Core Web Vitals profiling for sub-50ms interaction latencies.',
    prerequisites: [
      'Solid grasp of TypeScript and modern React hooks',
      'Node.js 20+ runtime installed on your machine',
      'Familiarity with HTTP/2, streaming, and CDN edge caching',
      'Active Google account for Google Meet stream access',
    ],
    speaker: {
      name: 'Rohan Deshmukh',
      role: 'Principal Frontend Engineer',
      company: 'Open Web Collective',
      avatar: '/assets/avatars/member-04.svg',
      avatarUrl: '/assets/avatars/member-04.svg',
    },
    agenda: [
      {
        time: '02:30 PM',
        topic: 'React 19 Compiler & Server Action Mechanics',
        detail: 'How React Server Components eliminate clientside JavaScript payload overhead.',
        title: 'React 19 Compiler & Server Action Mechanics',
        description: 'How React Server Components eliminate clientside JavaScript payload overhead.',
      },
      {
        time: '03:30 PM',
        topic: 'Interaction to Next Paint (INP) Deep Dive',
        detail: 'Diagnosing main-thread micro-stutters with Chrome DevTools trace profiles.',
        title: 'Interaction to Next Paint (INP) Deep Dive',
        description: 'Diagnosing main-thread micro-stutters with Chrome DevTools trace profiles.',
      },
      {
        time: '04:30 PM',
        topic: 'Edge Middleware & Distributed KV Caching',
        detail: 'Executing low-latency sub-10ms routing rules across global edge locations.',
        title: 'Edge Middleware & Distributed KV Caching',
        description: 'Executing low-latency sub-10ms routing rules across global edge locations.',
      },
      {
        time: '05:00 PM',
        topic: 'Live Q&A & Architecture Review',
        detail: 'Live teardown of participant web applications and Lighthouse scores.',
        title: 'Live Q&A & Architecture Review',
        description: 'Live teardown of participant web applications and Lighthouse scores.',
      },
    ],
    tags: ['Next.js 15', 'React 19', 'Performance', 'Web Vitals'],
    badgeText: 'TECH LAB',
    registrationStatus: 'waitlist',
  },

  // --- PAST EVENTS ---
  {
    id: 'event-05',
    slug: 'neural-hack-sprint-edge-ml',
    title: 'Neural Hack Sprint: Edge ML & TensorFlow Lite',
    subtitle: 'Deploying Quantized Neural Networks on Embedded Devices',
    category: 'Hackathon',
    eventType: 'Hackathon',
    status: 'Past',
    googleColor: 'red',
    accent: 'red',
    date: '15 NOV 2026',
    displayDate: '15 NOV 2026',
    time: '09:00 – 18:00 IST',
    isoStart: '2026-11-15T09:00:00+05:30',
    isoEnd: '2026-11-15T18:00:00+05:30',
    mode: 'In-Person',
    venue: 'IEM Auditorium, RVCE',
    coverImage: '/assets/covers/hackathon-neural.svg',
    sceneImage: '/assets/scenes/hackathon-table-sprint.svg',
    summary: 'Full-day hardware sprint deploying quantized vision and audio models onto microcontrollers.',
    description:
      'Student teams trained custom neural networks, applied post-training 8-bit integer quantization, and flashed models onto Raspberry Pi and ESP32 targets with sub-20ms inference times.',
    prerequisites: [
      'Python 3.10+ with NumPy and TensorFlow packages',
      'Basic understanding of convolutional neural networks',
      'Familiarity with serial communication protocols (UART/I2C)',
      'Personal laptop with hardware flashing tools configured',
    ],
    speaker: {
      name: 'Arjun Natarajan',
      role: 'Edge AI Systems Engineer',
      company: 'TensorFlow User Group',
      avatar: '/assets/avatars/member-05.svg',
      avatarUrl: '/assets/avatars/member-05.svg',
    },
    agenda: [
      {
        time: '09:00 AM',
        topic: 'Model Pruning and Quantization Fundamentals',
        detail: 'Converting float32 models to int8 with zero noticeable accuracy degradation.',
        title: 'Model Pruning and Quantization Fundamentals',
        description: 'Converting float32 models to int8 with zero noticeable accuracy degradation.',
      },
      {
        time: '11:00 AM',
        topic: 'TFLite Micro & Sensor Streaming Harness',
        detail: 'Interfacing continuous accelerometer and camera frames over I2C/SPI.',
        title: 'TFLite Micro & Sensor Streaming Harness',
        description: 'Interfacing continuous accelerometer and camera frames over I2C/SPI.',
      },
      {
        time: '02:00 PM',
        topic: 'Hardware Build Sprint & Benchmarking',
        detail: 'Measuring power draw and inference latency on physical edge hardware.',
        title: 'Hardware Build Sprint & Benchmarking',
        description: 'Measuring power draw and inference latency on physical edge hardware.',
      },
      {
        time: '05:00 PM',
        topic: 'Showcase Demonstrations & Evaluation',
        detail: 'Live hardware proof-of-concept showcases judged on latency and accuracy.',
        title: 'Showcase Demonstrations & Evaluation',
        description: 'Live hardware proof-of-concept showcases judged on latency and accuracy.',
      },
    ],
    tags: ['TensorFlow Lite', 'Edge AI', 'Quantization', 'Python'],
    badgeText: 'ARCHIVED SPRINT',
    registrationStatus: 'concluded',
  },
  {
    id: 'event-06',
    slug: 'open-source-architecture-git',
    title: 'Open Source Architecture & Git Mastery Sprint',
    subtitle: 'Interactive Rebasing, Monorepo Plumbing, and GitHub Actions CI',
    category: 'Workshop',
    eventType: 'Workshop',
    status: 'Past',
    googleColor: 'blue',
    accent: 'blue',
    date: '10 OCT 2026',
    displayDate: '10 OCT 2026',
    time: '11:00 – 16:00 IST',
    isoStart: '2026-10-10T11:00:00+05:30',
    isoEnd: '2026-10-10T16:00:00+05:30',
    mode: 'Hybrid',
    venue: 'CSE Seminar Hall, RVCE',
    coverImage: '/assets/covers/opensource-git.svg',
    sceneImage: '/assets/scenes/open-source-night-jam.svg',
    summary: 'Deep dive into Git internals, DAG commit graphs, interactive rebasing, and CI automation.',
    description:
      'An engineering breakdown of Git internals: dissecting the object database, tree objects, SHA-1 commit graphs, cherry-picking, interactive rebase conflict resolution, and creating enterprise GitHub Actions.',
    prerequisites: [
      'Git CLI installed on Linux, macOS, or Windows WSL',
      'Active GitHub account with two-factor authentication',
      'Basic knowledge of git add, commit, push, and branching',
      'Bash or Zsh shell comfort',
    ],
    speaker: {
      name: 'Vikramaditya Hegde',
      role: 'Open Source Systems Maintainer',
      company: 'Linux Foundation Fellow',
      avatar: '/assets/avatars/member-07.svg',
      avatarUrl: '/assets/avatars/member-07.svg',
    },
    agenda: [
      {
        time: '11:00 AM',
        topic: 'Git Internals: Blobs, Trees, and Commits',
        detail: 'Dissecting the .git folder and inspecting hash pointers and index states.',
        title: 'Git Internals: Blobs, Trees, and Commits',
        description: 'Dissecting the .git folder and inspecting hash pointers and index states.',
      },
      {
        time: '12:30 PM',
        topic: 'Interactive Rebasing & History Rewriting',
        detail: 'Squashing, splitting, and reordering commits without losing upstream state.',
        title: 'Interactive Rebasing & History Rewriting',
        description: 'Squashing, splitting, and reordering commits without losing upstream state.',
      },
      {
        time: '02:30 PM',
        topic: 'Crafting Automated Release Workflows',
        detail: 'Semantic release automation, changelog generation, and package publishing.',
        title: 'Crafting Automated Release Workflows',
        description: 'Semantic release automation, changelog generation, and package publishing.',
      },
      {
        time: '03:45 PM',
        topic: 'Monorepo Tooling & Upstream PR Reviews',
        detail: 'Setting up Turborepo workspaces and managing large multi-package codebases.',
        title: 'Monorepo Tooling & Upstream PR Reviews',
        description: 'Setting up Turborepo workspaces and managing large multi-package codebases.',
      },
    ],
    tags: ['Git', 'GitHub Actions', 'CI/CD', 'Open Source'],
    badgeText: 'ARCHIVED WORKSHOP',
    registrationStatus: 'concluded',
  },
  {
    id: 'event-07',
    slug: 'design-systems-tokens-code',
    title: 'Design Systems at Scale: Tokens to Code',
    subtitle: 'Figma Variables, Semantic Primitives, and Tailwind PostCSS Architecture',
    category: 'Study Jam',
    eventType: 'Study Jam',
    status: 'Past',
    googleColor: 'yellow',
    accent: 'yellow',
    date: '28 OCT 2026',
    displayDate: '28 OCT 2026',
    time: '15:00 – 18:00 IST',
    isoStart: '2026-10-28T15:00:00+05:30',
    isoEnd: '2026-10-28T18:00:00+05:30',
    mode: 'In-Person',
    venue: 'Kotlin & Cloud Lab, RVCE',
    coverImage: '/assets/covers/design-systems.svg',
    sceneImage: '/assets/scenes/cloud-workshop-lab.svg',
    summary: 'Bridging Figma variables with Tailwind CSS v4, semantic primitives, and WCAG AAA compliance.',
    description:
      'Explored how modern frontend teams construct maintainable design systems with automated token transforms, style dictionaries, fluid typography scales, and accessible color contrast modeling.',
    prerequisites: [
      'Figma account and understanding of components/variants',
      'CSS custom properties and modern styling experience',
      'Basic React or Next.js development workflow',
      'Passion for accessible UI engineering',
    ],
    speaker: {
      name: 'Meera Menon',
      role: 'Senior Design Technologist',
      company: 'Material Design Guild',
      avatar: '/assets/avatars/member-06.svg',
      avatarUrl: '/assets/avatars/member-06.svg',
    },
    agenda: [
      {
        time: '03:00 PM',
        topic: 'Design Token Taxonomy & Primitive Scales',
        detail: 'Organizing semantic layers across spacing, color, and elevation.',
        title: 'Design Token Taxonomy & Primitive Scales',
        description: 'Organizing semantic layers across spacing, color, and elevation.',
      },
      {
        time: '04:00 PM',
        topic: 'Exporting Tokens into Tailwind v4 Theme Variables',
        detail: 'Automating CSS variable distribution with zero manual drift.',
        title: 'Exporting Tokens into Tailwind v4 Theme Variables',
        description: 'Automating CSS variable distribution with zero manual drift.',
      },
      {
        time: '05:00 PM',
        topic: 'WCAG AAA Contrast & Fluid Type Scales',
        detail: 'Calculating perceptual lightness and contrast curves across themes.',
        title: 'WCAG AAA Contrast & Fluid Type Scales',
        description: 'Calculating perceptual lightness and contrast curves across themes.',
      },
      {
        time: '05:30 PM',
        topic: 'Building Accessible Primitives in React',
        detail: 'Developing keyboard-navigable dialogs, switches, and tabs.',
        title: 'Building Accessible Primitives in React',
        description: 'Developing keyboard-navigable dialogs, switches, and tabs.',
      },
    ],
    tags: ['Design Systems', 'Figma', 'Tokens', 'Tailwind CSS'],
    badgeText: 'ARCHIVED MASTERCLASS',
    registrationStatus: 'concluded',
  },
  {
    id: 'event-08',
    slug: 'devfest-campus-warmup-26',
    title: "DevFest Campus Warmup '26",
    subtitle: 'Annual Chapter Launch, Architecture Keynote & Technology Showcase',
    category: 'Tech Talk',
    eventType: 'Tech Talk',
    status: 'Past',
    googleColor: 'green',
    accent: 'green',
    date: '20 SEP 2026',
    displayDate: '20 SEP 2026',
    time: '09:30 – 17:30 IST',
    isoStart: '2026-09-20T09:30:00+05:30',
    isoEnd: '2026-09-20T17:30:00+05:30',
    mode: 'Online',
    venue: 'Google Meet Live',
    coverImage: '/assets/covers/devfest-recap.svg',
    sceneImage: '/assets/scenes/auditorium-keynote.svg',
    summary: 'Inaugural keynote broadcast previewing engineering roadmaps across AI, Cloud, Web, and Mobile.',
    description:
      'The chapter ignition event bringing student builders, faculty mentors, and industry practitioners together to broadcast the year’s engineering roadmaps, live code demonstrations, and open-source project launches.',
    prerequisites: [
      'Open to all RVCE engineering students across all semesters',
      'Curiosity about emerging developer ecosystems and cloud platforms',
      'Active Google account for online stream access',
      'No prior specialized prerequisites required',
    ],
    speaker: {
      name: 'Pooja Sundaram',
      role: 'Community Ecosystem Lead',
      company: 'Google Developers Guild',
      avatar: '/assets/avatars/member-08.svg',
      avatarUrl: '/assets/avatars/member-08.svg',
    },
    agenda: [
      {
        time: '09:30 AM',
        topic: 'Opening Keynote: The Multi-Disciplinary Engineer',
        detail: 'Navigating rapid shifts in developer tooling and AI-native software.',
        title: 'Opening Keynote: The Multi-Disciplinary Engineer',
        description: 'Navigating rapid shifts in developer tooling and AI-native software.',
      },
      {
        time: '11:30 AM',
        topic: 'Four-Vertical Live Code Demonstrations',
        detail: 'Simultaneous deep-dives in Gemini APIs, Jetpack Compose, Next.js, and Cloud Run.',
        title: 'Four-Vertical Live Code Demonstrations',
        description: 'Simultaneous deep-dives in Gemini APIs, Jetpack Compose, Next.js, and Cloud Run.',
      },
      {
        time: '02:30 PM',
        topic: 'Campus Open Source Guild Launch',
        detail: 'Announcing student working groups and upcoming buildathlon schedules.',
        title: 'Campus Open Source Guild Launch',
        description: 'Announcing student working groups and upcoming buildathlon schedules.',
      },
      {
        time: '04:30 PM',
        topic: 'Student Builder Showcase & Lightning Talks',
        detail: 'Five student projects showcased live to the global community.',
        title: 'Student Builder Showcase & Lightning Talks',
        description: 'Five student projects showcased live to the global community.',
      },
    ],
    tags: ['Keynote', 'Architecture', 'AI', 'Cloud', 'Android'],
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
    avatar: '/assets/avatars/member-08.svg',
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
  tabs: [
    {
      id: 'keynotes',
      label: 'Keynote Highlights',
      tagline: 'Engineering Leadership & Modern Systems Philosophy',
      narrative:
        'Four technical keynotes delivered foundational blueprints on building production-grade AI systems, zero-trust cloud infrastructure, declarative mobile runtimes, and accessible web systems without commercial hype.',
      takeaways: [
        'System prompt engineering & multimodal tool-calling architectures for real-time streaming latency',
        'Distroless container builds reducing cold starts from 800MB to 24MB on Google Cloud Run',
        'Declarative UI state isolation with unidirectional data flow in Kotlin 2.0 & Jetpack Compose',
      ],
      badges: ['Gemini 1.5', 'Cloud Run', 'Compose', 'Next.js 15'],
    },
    {
      id: 'labs',
      label: 'Hands-On Labs',
      tagline: 'Zero-Slide Live Terminal Implementation',
      narrative:
        'RVCE student engineers engaged in concurrent zero-slide workshops where laptops remained open, terminal sessions were live-streamed, and participants wrote and deployed test suites against real APIs.',
      takeaways: [
        'Live deployment of containerized microservices to Google Cloud Run with canary traffic routing',
        'On-device quantized neural net inference using TensorFlow Lite Micro and continuous sensor streams',
        'Interactive Git rebase surgeries, monorepo plumbing, and automated GitHub Actions release workflows',
      ],
      badges: ['Docker', 'TFLite Micro', 'GitHub Actions', 'gRPC'],
    },
    {
      id: 'artifacts',
      label: 'Shipped Artifacts',
      tagline: 'Production Open-Source Student Codebases',
      narrative:
        'Beyond conceptual learning, DevFest Campus Warmup incubated and initialized three open-source utility codebases maintained under MIT license by RVCE student developer guilds.',
      takeaways: [
        'Multimodal Sensor Hub: Telemetry dashboard fusing Gemini Flash with Next.js 15 App Router',
        'RVCE Campus Transit: Offline-first Android navigational companion with Room DB & Compose',
        'Cloud Run CI Pipeline: Reusable GitHub Actions template for automated container verification',
      ],
      badges: ['MIT License', 'Open Source', 'TypeScript', 'Kotlin'],
    },
  ],
};

// -----------------------------------------------------------------------------
// 7. COMMUNITY SCENES METADATA (PHASE 9)
// -----------------------------------------------------------------------------
export const COMMUNITY_SCENES: CommunityScene[] = [
  {
    id: 'auditorium-keynote',
    code: 'SCENE // 01',
    title: 'Campus Auditorium Keynote',
    category: 'Keynote Broadcast',
    venue: 'IEM Auditorium · RVCE',
    googleColor: 'blue',
    image: '/assets/scenes/auditorium-keynote.svg',
    caption:
      'Wide-angle tiered amphitheater illuminated by the luminous GDG chevron projection and architecture slides. Student developers and builders collaborate across terraced seating with glowing laptops during the annual DevFest kickoff.',
    highlights: ['Tiered Amphitheater', 'Multi-Agent Keynote', 'Live Arch Demo'],
  },
  {
    id: 'hackathon-table-sprint',
    code: 'SCENE // 02',
    title: '24-Hour Hackathon Build Table',
    category: 'Hackathon Sprint',
    venue: 'CSE Systems Lab · RVCE',
    googleColor: 'red',
    image: '/assets/scenes/hackathon-table-sprint.svg',
    caption:
      'Late-night collaborative engineering table bustling with active pair-programming, external monitors, and rapid terminal feedback loops. Teams orchestrate Gemini multimodal endpoints and microservices against a 24-hour sprint deadline.',
    highlights: ['24-Hour Crucible', 'Dual 27" Displays', 'Gemini Streaming'],
  },
  {
    id: 'broadcast-livestream-studio',
    code: 'SCENE // 03',
    title: 'Hybrid Tech Broadcast & Livestream',
    category: 'Livestream Studio',
    venue: 'GDG Broadcast Desk · Hybrid',
    googleColor: 'blue',
    image: '/assets/scenes/broadcast-livestream-studio.svg',
    caption:
      'State-of-the-art hybrid broadcasting studio featuring real-time telemetry, dynamic audio waveforms, and developer anchor discussions. Student hosts stream architecture breakdowns to global viewers with sub-10ms edge latency.',
    highlights: ['1080p60 Stream', 'Real-Time Telemetry', 'Zero-Downtime Edge'],
  },
  {
    id: 'cloud-workshop-lab',
    code: 'SCENE // 04',
    title: 'Hands-On Cloud & AI Lab',
    category: 'Hands-On Lab',
    venue: 'Kotlin & Cloud Lab (Room 304) · RVCE',
    googleColor: 'green',
    image: '/assets/scenes/cloud-workshop-lab.svg',
    caption:
      'Rigorous systems laboratory where student developers pair-program through Kubernetes cluster deployments and Vertex AI pipelines. Instructors walk through live declarative topologies while student benches debug container manifests.',
    highlights: ['Kubernetes Autopilot', 'Pair Programming', 'Distroless Containers'],
  },
  {
    id: 'demo-day-showcase',
    code: 'SCENE // 05',
    title: 'Prototype Demo Day Stage',
    category: 'Demo Day',
    venue: 'Exhibition Showcase Stage · RVCE',
    googleColor: 'yellow',
    image: '/assets/scenes/demo-day-showcase.svg',
    caption:
      'Stage exhibition showcasing live prototype demonstrations before an amphitheater of peer builders and industry mentors. Presenters demonstrate real-time AI function calling on giant vertical device interfaces.',
    highlights: ['Live App Pitch', 'INP < 24ms', 'WCAG AAA Accessible'],
  },
  {
    id: 'open-source-night-jam',
    code: 'SCENE // 06',
    title: 'Evening Open-Source Code Jam',
    category: 'Open Source Jam',
    venue: 'Campus Terrace Lounge · RVCE',
    googleColor: 'yellow',
    image: '/assets/scenes/open-source-night-jam.svg',
    caption:
      'Atmospheric twilight campus terrace with panoramic architectural arches overlooking the Bengaluru skyline. Builders cluster on beanbags and high benches around a central Git commit-tree projection, reviewing community pull requests.',
    highlights: ['100% Open Source', 'Git PR Reviews', 'Twilight Terrace'],
  },
  {
    id: 'design-system-critique',
    code: 'SCENE // 07',
    title: 'UI/UX Design Systems Critique',
    category: 'Design Systems Studio',
    venue: 'Design & Architecture Studio · RVCE',
    googleColor: 'blue',
    image: '/assets/scenes/design-system-critique.svg',
    caption:
      'Architectural critique studio where student designers audit color token contrast ratios, typography scale rulers in Space Grotesk and JetBrains Mono, and responsive viewport wireframes across mobile, tablet, and desktop breakpoints.',
    highlights: ['Design Tokens', 'WCAG AAA Ratios', 'Responsive Grid'],
  },
  {
    id: 'api-architecture-warroom',
    code: 'SCENE // 08',
    title: 'Distributed Systems & API War Room',
    category: 'Architecture War Room',
    venue: 'Cloud & Systems Incubator · RVCE',
    googleColor: 'red',
    image: '/assets/scenes/api-architecture-warroom.svg',
    caption:
      'High-intensity engineering war room centered around an architectural glass whiteboard mapping microservice topologies, JSON payloads, and distributed tracing graphs with sub-10ms edge latency metrics.',
    highlights: ['Microservices', 'Sub-10ms Latency', 'JSON Schemas'],
  },
  {
    id: 'mobile-compose-jam',
    code: 'SCENE // 09',
    title: 'Android & Jetpack Compose Device Lab',
    category: 'Mobile Device Lab',
    venue: 'Mobile Engineering Suite · RVCE',
    googleColor: 'green',
    image: '/assets/scenes/mobile-compose-jam.svg',
    caption:
      'Collaborative multi-device hardware lab testing Material 3 composables, reactive StateFlow pipelines, and recomposition trees across phones, foldables, and tablets tethered to real-time Android Studio test rigs.',
    highlights: ['Jetpack Compose', 'Material 3', 'StateFlow Reactive'],
  },
  {
    id: 'open-source-release-party',
    code: 'SCENE // 10',
    title: 'Open-Source Release & Maintainer Night',
    category: 'Release Party',
    venue: 'Central Auditorium Foyer · RVCE',
    googleColor: 'yellow',
    image: '/assets/scenes/open-source-release-party.svg',
    caption:
      'Festive campus release night celebrating the v1.0.0 production merge with all 128 green CI checks passing, celebratory geometric confetti, and student maintainers shipping open-source code to global repositories.',
    highlights: ['v1.0.0 Release', '100% Green CI', 'MIT License'],
  },
];

// -----------------------------------------------------------------------------
// 8. DEVELOPER STICKERS & BADGES METADATA
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
    id: 'pair-program',
    file: 'pair-program.svg',
    label: 'Pair Program',
    tooltip: 'Pair Dev & Review',
    accent: 'green',
    accentHex: '#34A853',
  },
  {
    id: 'lgtm-stamp',
    file: 'lgtm-stamp.svg',
    label: 'LGTM Stamp',
    tooltip: 'LGTM Approved',
    accent: 'yellow',
    accentHex: '#FBBC04',
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

// -----------------------------------------------------------------------------
// 8. TEAM & BUILDER ARCHITECTURES (PHASE 6)
// -----------------------------------------------------------------------------
export type TeamVertical =
  | 'Core Lead'
  | 'Web & Cloud'
  | 'AI & ML'
  | 'Design & UX'
  | 'Community & Events';

export interface BuilderCompetency {
  label: string;
  level: number;
}

export interface BuilderSpec {
  focusArea: string;
  favoriteStack: string;
  buildMotto: string;
  openSourceContrib: string;
}

export interface GDGTeamMember {
  id: string;
  name: string;
  role: string;
  vertical: TeamVertical;
  yearAndBranch: string;
  googleColor: GoogleAccent;
  avatar: string;
  emoteBadge: string;
  bio: string;
  skills: string[];
  competencies: BuilderCompetency[];
  builderSpec: BuilderSpec;
  links: {
    github: string;
    linkedin: string;
    website?: string;
  };
}

export const TEAM_DATA: GDGTeamMember[] = [
  {
    id: 'builder-01',
    name: 'Aarav Kulkarni',
    role: 'Chapter Lead · Sample',
    vertical: 'Core Lead',
    yearAndBranch: '3rd Year · CSE',
    googleColor: 'red',
    avatar: '/assets/avatars/member-01.svg',
    emoteBadge: '/assets/emotes/terminal-wizard.svg',
    bio: 'Architecting campus engineering roadmaps and steering distributed open-source sprints with strict zero-hype focus.',
    skills: ['Go', 'Distributed Systems', 'GCP'],
    competencies: [
      { label: 'Systems & Cloud Architecture', level: 94 },
      { label: 'Distributed Peer Protocols', level: 90 },
      { label: 'Open Source & Mentorship', level: 92 },
    ],
    builderSpec: {
      focusArea: 'Distributed Consensus & Peer Protocols',
      favoriteStack: 'Go 1.23, gRPC, Cloud Run, Raft',
      buildMotto: 'Ship boring architectures that withstand real traffic.',
      openSourceContrib: 'rvce-distributed/consensus-mesh (Maintainer)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
      website: '#sample-profile',
    },
  },
  {
    id: 'builder-02',
    name: 'Meera Nair',
    role: 'Technical Lead · Sample',
    vertical: 'Core Lead',
    yearAndBranch: '3rd Year · ISE',
    googleColor: 'red',
    avatar: '/assets/avatars/member-02.svg',
    emoteBadge: '/assets/emotes/clean-architecture.svg',
    bio: 'Enforcing strict code review gates, monorepo tooling ergonomics, and zero-downtime deployment pipelines.',
    skills: ['Rust', 'Kubernetes', 'CI/CD'],
    competencies: [
      { label: 'Systems & Concurrency Craft', level: 93 },
      { label: 'CI/CD & Monorepo Tooling', level: 91 },
      { label: 'Code Review & Security Gates', level: 89 },
    ],
    builderSpec: {
      focusArea: 'Safe Concurrency & Developer Ergonomics',
      favoriteStack: 'Rust, Tokio, Docker, GitHub Actions',
      buildMotto: 'Clean git trees and reproducible builds define engineering craft.',
      openSourceContrib: 'cargo-rvce/audit-pipeline (Lead)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
    },
  },
  {
    id: 'builder-03',
    name: 'Rohan Deshmukh',
    role: 'Web & Cloud Lead',
    vertical: 'Web & Cloud',
    yearAndBranch: '3rd Year · CSE',
    googleColor: 'blue',
    avatar: '/assets/avatars/member-03.svg',
    emoteBadge: '/assets/emotes/cloud-deploy.svg',
    bio: 'Engineering resilient event-driven cloud topologies and sub-millisecond API gateways on Google Cloud Run.',
    skills: ['Next.js 15', 'Cloud Run', 'TypeScript'],
    competencies: [
      { label: 'Frontend & Interactive Craft', level: 95 },
      { label: 'Edge Networks & Cloud Run', level: 91 },
      { label: 'Turbopack & Performance DX', level: 88 },
    ],
    builderSpec: {
      focusArea: 'Zero-Trust Edge Networks & Turbopack Optimization',
      favoriteStack: 'Next.js App Router, Tailwind, Cloudflare Workers',
      buildMotto: 'Eliminate waterfalls; every millisecond on the wire matters.',
      openSourceContrib: 'rvce-edge/distroless-k8s-action (Contributor)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
      website: '#sample-profile',
    },
  },
  {
    id: 'builder-04',
    name: 'Kavya Subramanian',
    role: 'Distributed Systems Builder',
    vertical: 'Web & Cloud',
    yearAndBranch: '2nd Year · ISE',
    googleColor: 'blue',
    avatar: '/assets/avatars/member-04.svg',
    emoteBadge: '/assets/emotes/ship-it.svg',
    bio: 'Building declarative infrastructure, event streams with Pub/Sub, and high-concurrency microservices.',
    skills: ['GKE', 'Terraform', 'Kafka'],
    competencies: [
      { label: 'Stream Ingestion & Pub/Sub', level: 92 },
      { label: 'Infrastructure as Code', level: 88 },
      { label: 'Resilient Microservices', level: 90 },
    ],
    builderSpec: {
      focusArea: 'Stream Ingestion & Resilient Microservices',
      favoriteStack: 'Terraform, Google Cloud Pub/Sub, Node.js, ClickHouse',
      buildMotto: 'Idempotent workers make distributed systems sleep soundly.',
      openSourceContrib: 'cloud-stream/pubsub-bench (Author)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
    },
  },
  {
    id: 'builder-05',
    name: 'Siddharth Menon',
    role: 'AI Systems Lead',
    vertical: 'AI & ML',
    yearAndBranch: '3rd Year · AI & ML',
    googleColor: 'green',
    avatar: '/assets/avatars/member-05.svg',
    emoteBadge: '/assets/emotes/gemini-spark.svg',
    bio: 'Deploying streaming multimodal agents with Gemini 1.5 Pro and low-latency structured output function pipelines.',
    skills: ['Gemini API', 'PyTorch', 'Vector Search'],
    competencies: [
      { label: 'Multimodal Agent Architecture', level: 96 },
      { label: 'Vector Search & Grounding', level: 92 },
      { label: 'Structured Tool Calling', level: 94 },
    ],
    builderSpec: {
      focusArea: 'Multimodal Agent Workflows & Grounding Verification',
      favoriteStack: 'Python, Gemini Flash/Pro, FastAPI, ChromaDB',
      buildMotto: 'Ground every generation with verifiable tool executions.',
      openSourceContrib: 'gemini-agent-toolkit/rvce-sensors (Maintainer)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
      website: '#sample-profile',
    },
  },
  {
    id: 'builder-06',
    name: 'Diya Chatterjee',
    role: 'Multimodal ML Researcher',
    vertical: 'AI & ML',
    yearAndBranch: '2nd Year · CSE',
    googleColor: 'green',
    avatar: '/assets/avatars/member-06.svg',
    emoteBadge: '/assets/emotes/hotfix-fire.svg',
    bio: 'Researching on-device model quantization, TFLite Micro runtimes, and low-latency audio feature extraction.',
    skills: ['TFLite', 'JAX', 'On-Device ML'],
    competencies: [
      { label: 'Edge ML & Model Quantization', level: 93 },
      { label: 'TFLite Micro Silicon Runtime', level: 89 },
      { label: 'Embedded Signal Processing', level: 87 },
    ],
    builderSpec: {
      focusArea: 'Embedded Edge ML & 8-bit Integer Quantization',
      favoriteStack: 'TensorFlow Lite Micro, C++, Python, ESP32',
      buildMotto: 'Intelligence belongs on edge silicon, not just in server farms.',
      openSourceContrib: 'tflite-micro/rvce-edge-audio (Author)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
    },
  },
  {
    id: 'builder-07',
    name: 'Vikramaditya Joshi',
    role: 'Design Systems Architect',
    vertical: 'Design & UX',
    yearAndBranch: '3rd Year · ECE',
    googleColor: 'yellow',
    avatar: '/assets/avatars/member-07.svg',
    emoteBadge: '/assets/emotes/lgtm-stamp.svg',
    bio: 'Architecting multi-brand design tokens, accessible color math, and mathematical Bauhaus geometric layout systems.',
    skills: ['Design Tokens', 'Figma API', 'WCAG AAA'],
    competencies: [
      { label: 'Design Tokens & Bauhaus Scale', level: 95 },
      { label: 'WCAG AAA Accessibility Math', level: 94 },
      { label: 'UI / DX Component Craft', level: 90 },
    ],
    builderSpec: {
      focusArea: 'Design Token Compilation & Fluid Spatial Scales',
      favoriteStack: 'Style Dictionary, Figma Tokens, CSS Next, SVG',
      buildMotto: 'Accessibility is not a feature; it is the structural foundation.',
      openSourceContrib: 'rvce-tokens/bauhaus-primitives (Lead)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
      website: '#sample-profile',
    },
  },
  {
    id: 'builder-08',
    name: 'Nandini Rao',
    role: 'Interactive UI Engineer',
    vertical: 'Design & UX',
    yearAndBranch: '2nd Year · ISE',
    googleColor: 'yellow',
    avatar: '/assets/avatars/member-08.svg',
    emoteBadge: '/assets/emotes/kotlin-android.svg',
    bio: 'Crafting fluid tactile micro-interactions, hardware-accelerated SVG shaders, and zero-CLS web interfaces.',
    skills: ['Kotlin', 'Framer Motion', 'Accessibility'],
    competencies: [
      { label: 'Kinetic Physics & Motion', level: 94 },
      { label: 'Hardware-Accelerated UI', level: 90 },
      { label: 'Reduced-Motion Ergonomics', level: 92 },
    ],
    builderSpec: {
      focusArea: 'Kinetic Physics Models & Reduced Motion Ergonomics',
      favoriteStack: 'React, Kotlin Compose, Framer Motion, Canvas API',
      buildMotto: 'Interfaces should feel tactile, responsive, and respectful of user focus.',
      openSourceContrib: 'rvce-motion/accessible-springs (Maintainer)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
    },
  },
  {
    id: 'builder-09',
    name: 'Karthik Iyer',
    role: 'Developer Relations & Ops',
    vertical: 'Community & Events',
    yearAndBranch: '3rd Year · ECE',
    googleColor: 'green',
    avatar: '/assets/avatars/member-09.svg',
    emoteBadge: '/assets/emotes/rvce-crest.svg',
    bio: 'Running cross-campus technical workshops, open-source documentation sprints, and hardware laboratory logistics.',
    skills: ['DevRel', 'Technical Writing', 'Open Source'],
    competencies: [
      { label: 'RFC & System Documentation', level: 94 },
      { label: 'Peer Pedagogy & Labs', level: 92 },
      { label: 'Community Infrastructure', level: 89 },
    ],
    builderSpec: {
      focusArea: 'Peer-Led Pedagogy & RFC Documentation Pipelines',
      favoriteStack: 'Markdown/MDX, Git, Astro, Python',
      buildMotto: 'Clear documentation unlocks more builders than clever code ever will.',
      openSourceContrib: 'gdg-rvce/developer-handbook (Lead)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
      website: '#sample-profile',
    },
  },
  {
    id: 'builder-10',
    name: 'Tanya Verma',
    role: 'Hackathon Experience Lead',
    vertical: 'Community & Events',
    yearAndBranch: '2nd Year · CSE',
    googleColor: 'green',
    avatar: '/assets/avatars/member-10.svg',
    emoteBadge: '/assets/emotes/pair-program.svg',
    bio: 'Directing buildathon judging matrices, mentor code checkpointing, and live-streaming technical demonstrations.',
    skills: ['Event Architecture', 'Judging Rubrics', 'Live Ops'],
    competencies: [
      { label: 'Buildathon Operations & DX', level: 93 },
      { label: 'Judging Rubric Verification', level: 91 },
      { label: 'Open Source Mentorship', level: 90 },
    ],
    builderSpec: {
      focusArea: 'Real-Time Buildathon Ops & Hacker Onboarding',
      favoriteStack: 'Next.js, Supabase, WebSockets, Python',
      buildMotto: 'Hackathons thrive on unblocked APIs, hot coffee, and fast mentor reviews.',
      openSourceContrib: 'rvce-hack/matrix-scoring-engine (Contributor)',
    },
    links: {
      github: '#sample-profile',
      linkedin: '#sample-profile',
    },
  },
];

// =============================================================================
// PHASE 10: 4-VERTICAL DEVELOPER LEARNING TRACKS DATASET
// 100% curriculum and engineering progression — zero student counts or metrics.
// =============================================================================

export interface LearningTrackStage {
  step: string;
  stepTitle: string;
  name: string;
  description: string;
}

export interface LearningTrack {
  id: 'ai-gemini' | 'cloud-k8s' | 'web-nextjs' | 'android-kotlin';
  title: string;
  category: string;
  tagline: string;
  googleColor: GoogleAccent;
  accentHex: string;
  emote: string;
  recommendedFilterTrack: EventCategory;
  tools: string[];
  stages: LearningTrackStage[];
}

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'ai-gemini',
    title: 'AI & Gemini Systems',
    category: 'Artificial Intelligence & Machine Learning',
    googleColor: 'red',
    accentHex: '#EA4335',
    emote: '/assets/emotes/gemini-spark.svg',
    recommendedFilterTrack: 'Hackathon',
    tagline: 'From prompt engineering to multimodal agentic workflows and edge inference.',
    tools: ['Gemini 2.5 API', 'Vertex AI', 'LangGraph', 'TensorFlow Lite', 'Python'],
    stages: [
      {
        step: '01',
        stepTitle: 'Foundations',
        name: 'Structured Outputs & Multimodal Context',
        description:
          'Mastering JSON schemas, vision/audio token pipelines, and system instructions.',
      },
      {
        step: '02',
        stepTitle: 'Architecture',
        name: 'RAG Pipelines & Tool-Calling Agents',
        description:
          'Building grounded vector retrieval and deterministic function-calling loops.',
      },
      {
        step: '03',
        stepTitle: 'Campus Lab',
        name: '24-Hour Multimodal Prototype Build',
        description:
          'Hands-on team sprint in CSE Labs deploying real-time campus assistants.',
      },
      {
        step: '04',
        stepTitle: 'Open Source Ship',
        name: 'Public GitHub Reference Blueprint',
        description:
          'Publishing documented, reproducible starter templates with evaluation harnesses.',
      },
    ],
  },
  {
    id: 'cloud-k8s',
    title: 'Cloud & Distributed Systems',
    category: 'Cloud Engineering & Infrastructure',
    googleColor: 'blue',
    accentHex: '#4285F4',
    emote: '/assets/emotes/cloud-deploy.svg',
    recommendedFilterTrack: 'Workshop',
    tagline: 'Containerized microservices, serverless scale, and production observability.',
    tools: ['Cloud Run', 'Kubernetes (GKE)', 'Docker', 'Terraform', 'Firebase'],
    stages: [
      {
        step: '01',
        stepTitle: 'Foundations',
        name: 'Linux Containers & Multi-Stage Dockerfiles',
        description:
          'Crafting slim, reproducible container images with zero-root security posture.',
      },
      {
        step: '02',
        stepTitle: 'Architecture',
        name: 'Event-Driven Services on Cloud Run',
        description:
          'Designing stateless HTTP/gRPC services with autoscaling and Pub/Sub queues.',
      },
      {
        step: '03',
        stepTitle: 'Campus Lab',
        name: 'Zero-Downtime Cluster Deployment',
        description:
          'Live infrastructure lab configuring health probes, secrets, and CI/CD pipelines.',
      },
      {
        step: '04',
        stepTitle: 'Open Source Ship',
        name: 'Infrastructure-as-Code Modules',
        description:
          'Releasing reusable Terraform & GitHub Actions templates for student projects.',
      },
    ],
  },
  {
    id: 'web-nextjs',
    title: 'Modern Web & Design Systems',
    category: 'Frontend Engineering & Web Vitals',
    googleColor: 'yellow',
    accentHex: '#FBBC04',
    emote: '/assets/emotes/clean-architecture.svg',
    recommendedFilterTrack: 'Study Jam',
    tagline: 'Sub-second React Server Components, accessible tokens, and 60fps motion.',
    tools: ['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Web Vitals'],
    stages: [
      {
        step: '01',
        stepTitle: 'Foundations',
        name: 'Semantic HTML, WCAG Contrast & Type Safety',
        description:
          'Building keyboard-first, screen-reader-verified UI primitives.',
      },
      {
        step: '02',
        stepTitle: 'Architecture',
        name: 'App Router Streaming & Design Tokens',
        description:
          'Architecting multi-theme CSS variable engines and zero-CLS server layouts.',
      },
      {
        step: '03',
        stepTitle: 'Campus Lab',
        name: 'Core Web Vitals & INP Optimization',
        description:
          'Profiling bundle graphs, GPU-composited transforms, and edge caching.',
      },
      {
        step: '04',
        stepTitle: 'Open Source Ship',
        name: 'Component Registry & Documentation',
        description:
          'Shipping accessible, tested UI kits under MIT open-source licenses.',
      },
    ],
  },
  {
    id: 'android-kotlin',
    title: 'Android & Cross-Platform Craft',
    category: 'Mobile & On-Device Systems',
    googleColor: 'green',
    accentHex: '#34A853',
    emote: '/assets/emotes/kotlin-android.svg',
    recommendedFilterTrack: 'Tech Talk',
    tagline: 'Declarative Jetpack Compose UIs, offline-first sync, and on-device ML.',
    tools: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Flutter', 'MediaPipe'],
    stages: [
      {
        step: '01',
        stepTitle: 'Foundations',
        name: 'Idiomatic Kotlin & Coroutine Flows',
        description:
          'Asynchronous state management with structured concurrency and clean architecture.',
      },
      {
        step: '02',
        stepTitle: 'Architecture',
        name: 'Declarative Compose & Material 3 Motion',
        description:
          'Crafting adaptive phone-to-tablet layouts with shared-element transitions.',
      },
      {
        step: '03',
        stepTitle: 'Campus Lab',
        name: 'On-Device Vision with MediaPipe',
        description:
          'Running low-latency gesture and object detection models locally on Android hardware.',
      },
      {
        step: '04',
        stepTitle: 'Open Source Ship',
        name: 'Play-Ready Sample Applications',
        description:
          'Publishing modular open-source Android repositories with automated UI tests.',
      },
    ],
  },
];

