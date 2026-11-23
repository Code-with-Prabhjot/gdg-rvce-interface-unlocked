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
    tagClass: 'bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/30',
    description: 'Chapter leadership, release gates & architecture review',
  },
  {
    vertical: 'Web & Cloud',
    colorName: 'Google Blue',
    colorHex: '#4285F4',
    dotBg: 'bg-[#4285F4]',
    tagClass: 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/30',
    description: 'Cloud Run, Next.js runtimes & distributed microservices',
  },
  {
    vertical: 'AI & ML',
    colorName: 'Google Green',
    colorHex: '#34A853',
    dotBg: 'bg-[#34A853]',
    tagClass: 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/30',
    description: 'Gemini APIs, multimodal agents & edge TFLite models',
  },
  {
    vertical: 'Design & UX',
    colorName: 'Google Yellow',
    colorHex: '#FBBC04',
    dotBg: 'bg-[#FBBC04]',
    tagClass: 'bg-[#FBBC04] text-[#111827] font-semibold border-[#FBBC04]',
    description: 'Design tokens, Bauhaus geometry & WCAG AAA contrast',
  },
  {
    vertical: 'Community & Events',
    colorName: 'Google Green',
    colorHex: '#34A853',
    dotBg: 'bg-[#34A853]',
    tagClass: 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/30',
    description: 'Open-source sprints, hackathon matrices & peer pedagogy',
  },
];

export function TeamHeroHeader() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="relative w-full overflow-hidden rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs mb-10 sm:mb-12">
      {/* Google 4-colour top accent rule */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] z-10" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 dark:opacity-40 pointer-events-none" />

      {/* Hero Header Content */}
      <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-12">
        {/* Left Column: Eyebrow, Space Grotesk Headline, Subcopy & Sample Roster Notice */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-5"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            <span className="font-semibold tracking-wider text-[#34A853] dark:text-[#4ADE80]">
              [ 03 // CHAPTER BUILDERS ]
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)]">GDG ON CAMPUS RVCE</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.12]"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
          >
            The Builders Behind GDG RVCE.
          </h1>

          {/* Subcopy */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
            Student engineers, interface designers, and open-source contributors collaborating across
            R.V. College of Engineering.
          </p>

          {/* Architectural Sample Roster Notice Pill */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              <span className="text-[var(--text-muted)] font-semibold">NOTE //</span>
              <span>Sample chapter roster showcased for the Interface Unlocked UI Challenge.</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Compact Vertical Colour Key Card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-96 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-5 shadow-sm space-y-4 shrink-0"
        >
          {/* Card Title & Telemetry Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
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
          <div className="space-y-2.5">
            {VERTICAL_MAPPINGS.map((item) => (
              <div
                key={item.vertical}
                className="flex items-center justify-between gap-3 text-xs p-2 rounded-lg bg-[var(--bg-subtle)]/70 hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.dotBg}`}
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
                className="w-7 h-7 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] p-1 flex items-center justify-center"
                title="Terminal Wizard Emote"
              >
                <Image
                  src="/assets/emotes/terminal-wizard.svg"
                  alt="Terminal Wizard Emote"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              <div
                className="w-7 h-7 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] p-1 flex items-center justify-center"
                title="Merge Clean Emote"
              >
                <Image
                  src="/assets/emotes/merge-clean.svg"
                  alt="Merge Clean Emote"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
