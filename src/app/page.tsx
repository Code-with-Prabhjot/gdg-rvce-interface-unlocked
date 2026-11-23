import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Cpu,
  Terminal,
  Sparkles,
  GitBranch,
  Layers,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { CampusTelemetryBar } from '@/components/home/CampusTelemetryBar';
import {
  PILLARS_DATA,
  EVENTS_DATA,
  RECAP_DATA,
  GoogleAccent,
} from '@/data/gdgData';

const PILLAR_ICON_MAP = {
  Cpu: Cpu,
  Terminal: Terminal,
  Sparkles: Sparkles,
  GitBranch: GitBranch,
};

function getGoogleAccentClasses(accent: GoogleAccent) {
  switch (accent) {
    case 'blue':
      return {
        pillBg: 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/30',
        badge: 'text-[#4285F4]',
        topBar: 'border-t-[#4285F4]',
        dot: 'bg-[#4285F4]',
      };
    case 'red':
      return {
        pillBg: 'bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/30',
        badge: 'text-[#EA4335]',
        topBar: 'border-t-[#EA4335]',
        dot: 'bg-[#EA4335]',
      };
    case 'yellow':
      return {
        pillBg: 'bg-[#FBBC04]/15 text-[#B45309] dark:text-[#FBBC04] border-[#FBBC04]/30',
        badge: 'text-[#B45309] dark:text-[#FBBC04]',
        topBar: 'border-t-[#FBBC04]',
        dot: 'bg-[#FBBC04]',
      };
    case 'green':
      return {
        pillBg: 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/30',
        badge: 'text-[#34A853]',
        topBar: 'border-t-[#34A853]',
        dot: 'bg-[#34A853]',
      };
  }
}

export default function HomePage() {
  const upcomingEvents = EVENTS_DATA.filter((e) => e.status === 'upcoming');

  return (
    <div className="w-full flex flex-col">
      {/* ============================================================= */}
      {/* ACT I: Kinetic Split Hero & Interactive 3D Prism Stage        */}
      {/* ============================================================= */}
      <HeroSection />

      {/* ============================================================= */}
      {/* ACT II: Architectural Campus Telemetry & Tech Marquee Bar     */}
      {/* ============================================================= */}
      <CampusTelemetryBar />

      {/* ============================================================= */}
      {/* ACT III PREVIEW: Community Pillars Bento (Foundations)        */}
      {/* ============================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-mono font-semibold text-[#4285F4]">
              <Layers className="w-3.5 h-3.5" />
              <span>ACT III // BENTO PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
              Four Pillars of Student Engineering
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-2xl">
              Rooted in Google&apos;s four core semantic colours, our community is organized into specialized engineering tracks.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-2 rounded-xl border border-[var(--border-hairline)] self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            <span>ALL VERTICALS RECRUITING &amp; ACTIVE</span>
          </div>
        </div>

        {/* 4 Bento Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS_DATA.map((pillar) => {
            const Icon = PILLAR_ICON_MAP[pillar.iconName as keyof typeof PILLAR_ICON_MAP] || Cpu;
            const styling = getGoogleAccentClasses(pillar.accent);

            return (
              <div
                key={pillar.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all duration-200 shadow-xs hover:shadow-md group border-t-4 ${styling.topBar}`}
              >
                <div className="space-y-5">
                  {/* Top Row: Icon + Tech Spec */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: pillar.accentBg, color: pillar.accentHex }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] font-semibold tracking-wider">
                      {pillar.techSpec}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-display font-bold text-[var(--text-primary)] group-hover:text-[#4285F4] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 pt-2 border-t border-[var(--border-hairline)]">
                    {pillar.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: pillar.accentHex }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono">
                  <span className={`inline-flex items-center gap-1.5 font-semibold ${styling.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${styling.dot}`} />
                    CURRICULUM ACTIVE
                  </span>
                  <span className="text-[var(--text-muted)]">RVCE &apos;26</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================= */}
      {/* ACT IV PREVIEW: Featured Upcoming Events                      */}
      {/* ============================================================= */}
      <section className="py-20 bg-[var(--bg-elevated)]/60 border-t border-[var(--border-hairline)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-mono font-semibold text-[#EA4335]">
                <Flame className="w-3.5 h-3.5" />
                <span>ACT IV // SPRINT SCHEDULE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
                Upcoming Architectural Sprints
              </h2>
              <p className="text-base text-[var(--text-secondary)] max-w-2xl">
                Hands-on workshops, 24-hour hackathons, and technical deep-dives led by industry engineers and student leads.
              </p>
            </div>

            <Link
              href="/events"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] hover:border-[#4285F4] transition-all duration-200 self-start md:self-auto"
            >
              <span>View All 8 Sprints</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Events Grid (Upcoming) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((evt) => {
              const styling = getGoogleAccentClasses(evt.accent);

              return (
                <div
                  key={evt.id}
                  className="flex flex-col justify-between rounded-3xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 group"
                >
                  {/* Event Cover Image */}
                  <div className="relative w-full aspect-[16/9] bg-[var(--bg-subtle)] border-b border-[var(--border-hairline)] overflow-hidden">
                    <Image
                      src={evt.coverImage}
                      alt={evt.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border backdrop-blur-md ${styling.pillBg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${styling.dot}`} />
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-display font-bold text-[var(--text-primary)] group-hover:text-[#4285F4] transition-colors line-clamp-2">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    {/* Metadata List */}
                    <div className="space-y-1.5 pt-3 border-t border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                        <span>{evt.displayDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#EA4335]" />
                        <span className="truncate">{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#34A853]" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>

                    {/* Footer / CTA Link */}
                    <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative border border-[var(--border-strong)]">
                          <Image
                            src={evt.speaker.avatarUrl}
                            alt={evt.speaker.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-[var(--text-secondary)] truncate max-w-[110px]">
                          {evt.speaker.name}
                        </span>
                      </div>

                      <Link
                        href={`/events?event=${evt.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#4285F4] hover:text-[#3367D6] transition-colors"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* ACT V PREVIEW: Latest Event Recap & Community Portal          */}
      {/* ============================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4285F4]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Recap Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-xs font-mono font-semibold text-[#4285F4]">
                <span>ACT V // CHAPTER ARCHIVE</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
                  {RECAP_DATA.title}
                </h3>
                <p className="text-sm sm:text-base font-mono text-[var(--text-muted)] mt-1">
                  {RECAP_DATA.subtitle} · {RECAP_DATA.date}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {RECAP_DATA.overview}
              </p>

              {/* 4 Architectural Highlights (NO attendee counters!) */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {RECAP_DATA.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]"
                  >
                    <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      {h.label}
                    </p>
                    <p className="text-base sm:text-lg font-display font-bold text-[var(--text-primary)] mt-0.5">
                      {h.value}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-1">
                      {h.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] transition-all shadow-xs hover:shadow-md"
                >
                  <span>Explore Recap Archive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] border border-[var(--border-hairline)] transition-all"
                >
                  <span>Meet Core Collective</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Cover Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-strong)] shadow-lg bg-[var(--bg-subtle)]">
                <Image
                  src={RECAP_DATA.coverImage}
                  alt={RECAP_DATA.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <p className="text-xs font-mono text-[#FBBC04] font-semibold">
                    KEYNOTE SPEAKER
                  </p>
                  <p className="text-sm font-display font-bold">
                    {RECAP_DATA.keynoteSpeaker.name}
                  </p>
                  <p className="text-xs text-white/80">
                    {RECAP_DATA.keynoteSpeaker.role} · {RECAP_DATA.keynoteSpeaker.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
