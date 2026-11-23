import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Terminal, Cpu, GitBranch, ShieldCheck } from 'lucide-react';

const GOOGLE_PILLARS = [
  {
    title: 'Core Workshops',
    color: '#4285F4',
    bgLight: 'rgba(66, 133, 244, 0.08)',
    borderColor: '#4285F4',
    icon: Cpu,
    desc: 'Deep architectural sessions in Cloud, Distributed Systems, Web Performance & Kotlin Android.',
  },
  {
    title: 'Flagship Hackathons',
    color: '#EA4335',
    bgLight: 'rgba(234, 67, 53, 0.08)',
    borderColor: '#EA4335',
    icon: Terminal,
    desc: 'High-intensity 36-hour sprints solving real-world challenges with generative AI and scalable backend backbones.',
  },
  {
    title: 'Study Jams',
    color: '#FBBC04',
    darkInk: '#111827',
    bgLight: 'rgba(251, 188, 4, 0.12)',
    borderColor: '#FBBC04',
    icon: Sparkles,
    desc: 'Peer-led study groups, code walkthroughs, and practical hands-on Google Cloud certifications.',
  },
  {
    title: 'Open Source Builds',
    color: '#34A853',
    bgLight: 'rgba(52, 168, 83, 0.08)',
    borderColor: '#34A853',
    icon: GitBranch,
    desc: 'Collaborative student-crafted software libraries, public repositories, and community utility tools.',
  },
];

const EMOTE_BADGES = [
  { file: 'ship-it.svg', label: 'Ship It' },
  { file: 'bug-squashed.svg', label: 'Bug Squashed' },
  { file: 'coffee-compile.svg', label: 'Coffee Compile' },
  { file: 'gemini-spark.svg', label: 'Gemini Spark' },
  { file: 'cloud-deploy.svg', label: 'Cloud Deploy' },
  { file: 'pixel-heart.svg', label: 'Pixel Heart' },
  { file: 'merge-clean.svg', label: 'Merge Clean' },
  { file: 'terminal-wizard.svg', label: 'Terminal Wizard' },
  { file: 'kotlin-android.svg', label: 'Kotlin Android' },
  { file: 'rvce-bengaluru.svg', label: 'RVCE Bengaluru' },
  { file: 'night-owl.svg', label: 'Night Owl' },
  { file: 'trophy-build.svg', label: 'Trophy Build' },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden py-12 lg:py-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-[var(--text-secondary)]">
              PHASE 1 // ARCHITECTURAL FOUNDATION ACTIVE
            </span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-['JetBrains_Mono',monospace] text-[var(--text-muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>RVCE BENGALURU</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-['Space_Grotesk',sans-serif] font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
            Architecting the future with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]">
              GDG on Campus
            </span>{' '}
            RV College of Engineering.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            A high-craft student engineering community in Bengaluru dedicated to deep code mastery, open-source creation, machine learning, and cloud architecture.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4]"
            >
              <span>Explore Sprints &amp; Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
            >
              <span>Meet Core Collective</span>
            </Link>
          </div>
        </div>

        {/* Semantic Google Pillars */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-['JetBrains_Mono',monospace] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                ENGINEERING PILLARS
              </div>
              <h2 className="text-2xl font-['Space_Grotesk',sans-serif] font-bold text-[var(--text-primary)]">
                Rooted in Google&apos;s Four Core Semantic Colours
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOOGLE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between"
                  style={{
                    borderTopColor: pillar.color,
                    borderTopWidth: '3px',
                  }}
                >
                  <div className="space-y-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: pillar.bgLight,
                        color: pillar.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-['Space_Grotesk',sans-serif] font-bold text-[var(--text-primary)]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-['JetBrains_Mono',monospace]">
                    <span style={{ color: pillar.color }}>● ACTIVE TRACK</span>
                    <span className="text-[var(--text-muted)]">RVCE 2026</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emote Studio Badge Gallery */}
        <div className="mt-20 p-8 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border-hairline)]">
            <div>
              <span className="text-xs font-['JetBrains_Mono',monospace] uppercase font-bold tracking-wider text-[#34A853]">
                LOCAL ASSET STUDIO
              </span>
              <h2 className="text-2xl font-['Space_Grotesk',sans-serif] font-bold text-[var(--text-primary)]">
                Bespoke Developer Emote &amp; Sticker Suite
              </h2>
            </div>
            <span className="text-xs font-['JetBrains_Mono',monospace] text-[var(--text-muted)] bg-[var(--bg-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] self-start sm:self-auto">
              12 GENERATED ASSETS // 128x128 SVG
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {EMOTE_BADGES.map((emote) => (
              <div
                key={emote.file}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all duration-150 group"
              >
                <div className="w-16 h-16 relative mb-2 transition-transform duration-200 group-hover:scale-110">
                  <Image
                    src={`/assets/emotes/${emote.file}`}
                    alt={emote.label}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-['JetBrains_Mono',monospace] font-semibold text-[var(--text-secondary)] text-center group-hover:text-[var(--text-primary)]">
                  {emote.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
