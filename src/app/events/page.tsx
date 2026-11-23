import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Hackathon' | 'Workshop' | 'Study Jam' | 'Open Source';
  date: string;
  time: string;
  venue: string;
  coverImage: string;
  tagColor: string;
  textColor?: string;
  trackBadge: string;
  description: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'neuralsprint-2026',
    title: 'NeuralSprint 2026',
    subtitle: '36-Hour Autonomous Agent & ML Hackathon',
    category: 'Hackathon',
    date: 'March 14–15, 2026',
    time: '09:00 AM – 09:00 PM IST',
    venue: 'RVCE Tech Auditorium, Bengaluru',
    coverImage: '/assets/covers/hackathon-neural.svg',
    tagColor: '#EA4335',
    trackBadge: 'HACKATHON // FLAGSHIP SPRINT',
    description:
      'Compete with over 50 multidisciplinary student squads building autonomous multi-agent systems and real-world intelligence pipelines.',
  },
  {
    id: 'cloud-kubernetes',
    title: 'Cloud Architecture & K8s',
    subtitle: 'Production Kubernetes on Google Cloud Platform',
    category: 'Workshop',
    date: 'April 04, 2026',
    time: '10:00 AM – 02:00 PM IST',
    venue: 'Civil & CS Lab Complex, RVCE',
    coverImage: '/assets/covers/cloud-kubernetes.svg',
    tagColor: '#4285F4',
    trackBadge: 'WORKSHOP // GKE & CLOUD RUN',
    description:
      'Hands-on deployment of production cluster manifests, zero-downtime rolling updates, and distributed telemetry tracing.',
  },
  {
    id: 'android-compose',
    title: 'Modern Android & Compose',
    subtitle: 'Declarative UI Engineering with Kotlin & Material 3',
    category: 'Workshop',
    date: 'April 18, 2026',
    time: '02:00 PM – 05:30 PM IST',
    venue: 'Multimedia Seminar Hall, RVCE',
    coverImage: '/assets/covers/android-compose.svg',
    tagColor: '#34A853',
    trackBadge: 'CODELAB // JETPACK COMPOSE',
    description:
      'Architect fluid, reactive Android applications using Kotlin Coroutines, StateFlow, dynamic theme tokens, and Material You.',
  },
  {
    id: 'opensource-git',
    title: 'Git & Open Source Summit',
    subtitle: 'Demystifying PRs, CI Workflows & Global Collaboration',
    category: 'Open Source',
    date: 'May 02, 2026',
    time: '11:00 AM – 03:00 PM IST',
    venue: 'IEM Innovation Hub, RVCE',
    coverImage: '/assets/covers/opensource-git.svg',
    tagColor: '#34A853',
    trackBadge: 'OPEN SOURCE // GITHUB ACTIONS',
    description:
      'Master trunk-based development, rebase etiquette, GitHub Actions CI pipelines, and landing your first upstream pull request.',
  },
  {
    id: 'ai-multimodal',
    title: 'Multimodal AI with Gemini',
    subtitle: 'Audio, Vision, Code & Real-Time Function Calling',
    category: 'Study Jam',
    date: 'May 16, 2026',
    time: '03:00 PM – 06:30 PM IST',
    venue: 'ECE Seminar Hall, RVCE',
    coverImage: '/assets/covers/ai-multimodal.svg',
    tagColor: '#4285F4',
    trackBadge: 'STUDY JAM // GEMINI API',
    description:
      'Explore prompt caching, structured JSON schemas, multimodal tokens, and building high-speed agentic interfaces.',
  },
  {
    id: 'web-perf',
    title: 'Web Performance at Scale',
    subtitle: 'Zero-CLS, Core Web Vitals & Next.js Turbopack',
    category: 'Workshop',
    date: 'June 06, 2026',
    time: '10:00 AM – 01:00 PM IST',
    venue: 'Virtual RVCE Tech Commons',
    coverImage: '/assets/covers/web-perf.svg',
    tagColor: '#FBBC04',
    textColor: '#111827',
    trackBadge: 'CLINIC // CORE WEB VITALS',
    description:
      'Profiling client-side frame drops, INP optimization, streaming server components, and architecting sub-second load times.',
  },
  {
    id: 'design-systems',
    title: 'Design Systems & Tokens',
    subtitle: 'Crafting Scalable Architectural UI Component Libraries',
    category: 'Study Jam',
    date: 'June 20, 2026',
    time: '02:00 PM – 05:00 PM IST',
    venue: 'Design Studio Lab, RVCE',
    coverImage: '/assets/covers/design-systems.svg',
    tagColor: '#EA4335',
    trackBadge: 'DESIGN // TOKEN ARCHITECTURE',
    description:
      'Bridging Figma variable tokens with Tailwind CSS v4, accessible color contrast ratios, and building cohesive design primitives.',
  },
  {
    id: 'devfest-recap',
    title: 'DevFest Bengaluru Recap',
    subtitle: 'Celebrating 1,200+ Student Builders & Keynote Sprints',
    category: 'Open Source',
    date: 'July 11, 2026',
    time: '04:00 PM – 07:30 PM IST',
    venue: 'Main Campus Quadrangle, RVCE',
    coverImage: '/assets/covers/devfest-recap.svg',
    tagColor: '#FBBC04',
    textColor: '#111827',
    trackBadge: 'SUMMIT // ANNUAL RECAP',
    description:
      'An architectural retrospective covering key takeaways from Google I/O, community lightning talks, and student showcase awards.',
  },
];

export default function EventsPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-xs font-['JetBrains_Mono',monospace] text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
            <span>GDG RVCE SPRINT CALENDAR 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-['Space_Grotesk',sans-serif] font-bold text-[var(--text-primary)] tracking-tight">
            Technical Sprints, Workshops &amp; Hackathons
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Engineered exclusively for hands-on builders. Every session emphasizes production codebase exercises, live coding labs, and zero-bullshit engineering practice.
          </p>
        </div>

        {/* Four Semantic Categories Filter Bar (Static Visual Showcase) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[var(--border-hairline)] text-xs font-['JetBrains_Mono',monospace]">
          <span className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] font-semibold text-[var(--text-primary)]">
            ALL SESSIONS (8)
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-[rgba(234,67,53,0.08)] border border-[#EA4335]/30 text-[#EA4335] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
            HACKATHONS
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-[rgba(66,133,244,0.08)] border border-[#4285F4]/30 text-[#4285F4] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
            WORKSHOPS
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-[rgba(251,188,4,0.12)] border border-[#FBBC04]/40 text-[#B45309] dark:text-[#FBBC04] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]" />
            STUDY JAMS
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-[rgba(52,168,83,0.08)] border border-[#34A853]/30 text-[#34A853] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
            OPEN SOURCE
          </span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS_DATA.map((event) => (
            <article
              key={event.id}
              className="group rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Cover Artwork Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0D12]">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Category Pill Tag Overlay */}
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-['JetBrains_Mono',monospace] font-bold tracking-wider shadow-md backdrop-blur-md"
                    style={{
                      backgroundColor: event.tagColor,
                      color: event.textColor || '#FFFFFF',
                    }}
                  >
                    ● {event.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Event Body Info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-['JetBrains_Mono',monospace] text-[var(--text-muted)] tracking-wider">
                    {event.trackBadge}
                  </div>

                  <h2 className="text-2xl font-['Space_Grotesk',sans-serif] font-bold text-[var(--text-primary)] group-hover:text-[#4285F4] transition-colors">
                    {event.title}
                  </h2>

                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {event.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Date & Venue Metadata */}
                <div className="pt-4 border-t border-[var(--border-hairline)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[var(--text-secondary)]">
                    <Calendar className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[var(--text-muted)]">
                    <MapPin className="w-3.5 h-3.5 text-[#EA4335] shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
