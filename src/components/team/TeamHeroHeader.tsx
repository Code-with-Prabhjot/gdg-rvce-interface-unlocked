'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface VerticalMapping {
  vertical: string;
  colorName: string;
  colorHex: string;
  dotBg: string;
  tagClass: string;
  description: string;
}

const VERTICAL_MAPPINGS: VerticalMapping[] = [
  {
    vertical: 'Core Lead',
    colorName: 'Google Red',
    colorHex: '#EA4335',
    dotBg: 'bg-[#EA4335]',
    tagClass: 'bg-[#EA4335]/10 text-[var(--accent-red-text)] border-[#EA4335]/30',
    description: 'Chapter leadership, release gates & architecture review',
  },
  {
    vertical: 'Web & Cloud',
    colorName: 'Google Blue',
    colorHex: '#4285F4',
    dotBg: 'bg-[#4285F4]',
    tagClass: 'bg-[#4285F4]/10 text-[var(--accent-blue-text)] border-[#4285F4]/30',
    description: 'Cloud Run, Next.js runtimes & distributed microservices',
  },
  {
    vertical: 'AI & ML',
    colorName: 'Google Green',
    colorHex: '#34A853',
    dotBg: 'bg-[#34A853]',
    tagClass: 'bg-[#34A853]/10 text-[var(--accent-green-text)] border-[#34A853]/30',
    description: 'Gemini APIs, multimodal agents & edge TFLite models',
  },
  {
    vertical: 'Design & UX',
    colorName: 'Google Yellow',
    colorHex: '#FBBC04',
    dotBg: 'bg-[#FBBC04]',
    tagClass: 'bg-amber-500/12 border-amber-600/30 text-[#92400E] dark:bg-[#FBBC04]/12 dark:border-[#FBBC04]/35 dark:text-[#FCD34D] font-semibold',
    description: 'Design tokens, Bauhaus geometry & WCAG AAA contrast',
  },
  {
    vertical: 'Community & Events',
    colorName: 'Google Green',
    colorHex: '#34A853',
    dotBg: 'bg-[#34A853]',
    tagClass: 'bg-[#34A853]/10 text-[var(--accent-green-text)] border-[#34A853]/30',
    description: 'Open-source sprints, hackathon matrices & peer pedagogy',
  },
];

export function TeamHeroHeader() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="relative w-full overflow-hidden rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs mb-5 sm:mb-6">
      {/* Google 4-colour top accent rule */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] z-10" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 dark:opacity-40 pointer-events-none" />

      {/* Hero Header Content */}
      <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:py-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
        {/* Left Column: Eyebrow, Space Grotesk Headline, Subcopy & Sample Roster Notice */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-3.5"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            <span className="font-semibold tracking-wider text-[var(--accent-green-text)]">
              [ 03 // CHAPTER BUILDERS ]
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)]">GDG ON CAMPUS RVCE</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            The Builders Behind GDG RVCE.
          </h1>

          {/* Subcopy */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
            Student engineers, interface designers, and open-source contributors collaborating across
            R.V. College of Engineering.
          </p>

          {/* Architectural Sample Roster Notice Pill */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              <span className="text-[var(--text-muted)] font-semibold">NOTE //</span>
              <span>Sample chapter roster showcased for the Interface Unlocked UI Challenge.</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Compact Vertical Colour Key Card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-96 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-4 shadow-sm space-y-2.5 shrink-0"
        >
          {/* Card Title & Telemetry Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#4285F4] rounded-xs" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[var(--text-primary)] uppercase">
                Vertical Colour Key
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              SYS // 4-COLOR
            </span>
          </div>

          {/* Vertical Key Rows */}
          <div className="space-y-1.5">
            {VERTICAL_MAPPINGS.map((item) => (
              <div
                key={item.vertical}
                className="flex items-center justify-between gap-3 text-xs p-1.5 rounded-lg bg-[var(--bg-subtle)]/70 hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${item.dotBg}`}
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span className="font-medium text-[var(--text-primary)] truncate">
                    {item.vertical}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 ${item.tagClass}`}
                >
                  {item.colorName}
                </span>
              </div>
            ))}
          </div>

          {/* Emote Badges Footer Strip */}
          <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[11px]">CRAFT BADGES</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] p-1 flex items-center justify-center"
                title="Terminal Wizard Emote"
              >
                <Image
                  src="/assets/emotes/terminal-wizard.svg"
                  alt="Terminal Wizard Emote"
                  width={18}
                  height={18}
                  className="w-4 h-4"
                />
              </div>
              <div
                className="w-6 h-6 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] p-1 flex items-center justify-center"
                title="Merge Clean Emote"
              >
                <Image
                  src="/assets/emotes/merge-clean.svg"
                  alt="Merge Clean Emote"
                  width={18}
                  height={18}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
