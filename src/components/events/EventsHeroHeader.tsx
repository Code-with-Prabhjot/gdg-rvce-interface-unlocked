'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const TRACK_LEGEND = [
  {
    track: 'Workshop',
    color: '#4285F4',
    label: 'Blue',
    dotBg: 'bg-[#4285F4]',
    tagBg: 'bg-[#4285F4]/10',
    tagBorder: 'border-[#4285F4]/30',
    tagText: 'text-[var(--accent-blue-text)]',
  },
  {
    track: 'Hackathon',
    color: '#EA4335',
    label: 'Red',
    dotBg: 'bg-[#EA4335]',
    tagBg: 'bg-[#EA4335]/10',
    tagBorder: 'border-[#EA4335]/30',
    tagText: 'text-[var(--accent-red-text)]',
  },
  {
    track: 'Study Jam',
    color: '#FBBC04',
    label: 'Yellow',
    dotBg: 'bg-[#FBBC04]',
    tagBg: 'bg-amber-500/12 dark:bg-[#FBBC04]/12',
    tagBorder: 'border-amber-600/30 dark:border-[#FBBC04]/35',
    tagText: 'text-[#92400E] dark:text-[#FCD34D]',
  },
  {
    track: 'Tech Talk',
    color: '#34A853',
    label: 'Green',
    dotBg: 'bg-[#34A853]',
    tagBg: 'bg-[#34A853]/10',
    tagBorder: 'border-[#34A853]/30',
    tagText: 'text-[var(--accent-green-text)]',
  },
];

export function EventsHeroHeader() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="relative w-full overflow-hidden rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs mb-5 sm:mb-6">
      {/* Subtle Google 4-colour top accent rule */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] z-10" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 dark:opacity-40 pointer-events-none" />

      {/* Hero Header Content */}
      <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:py-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
        {/* Left Column: Eyebrow, Space Grotesk Headline & Subcopy */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-3"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="font-semibold tracking-wider text-[var(--accent-blue-text)]">
              [ 02 // EVENT DIRECTORY ]
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)]">GDG ON CAMPUS RVCE</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
            Sprints, Workshops &amp; Build Sessions.
          </h1>

          {/* Subcopy */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
            Hands-on developer labs, campus hackathons, and technical deep dives hosted by GDG on Campus RV College of Engineering.
          </p>
        </motion.div>

        {/* Right Column: Track Colour Legend Card with Emotes */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 0.98 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-auto shrink-0"
        >
          <div className="rounded-2xl bg-[var(--bg-elevated)]/95 backdrop-blur-md border border-[var(--border-hairline)] p-4 shadow-md space-y-3 max-w-md">
            {/* Header / Telemetry indicator */}
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                TRACK COLOUR TAXONOMY
              </span>
              <span className="text-[10px] font-mono font-semibold text-[var(--accent-blue-text)] bg-[#4285F4]/10 px-2 py-0.5 rounded border border-[#4285F4]/20">
                4 PILLARS
              </span>
            </div>

            {/* 4 Semantic Track Badges */}
            <div className="grid grid-cols-2 gap-2">
              {TRACK_LEGEND.map((item) => (
                <div
                  key={item.track}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border ${item.tagBorder} ${item.tagBg} transition-all`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${item.dotBg} shadow-2xs`}
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="truncate">
                    <span className={`text-xs font-semibold ${item.tagText} block truncate`}>
                      {item.track}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Emotes Row */}
            <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 relative shrink-0">
                  <Image
                    src="/assets/emotes/ship-it.svg"
                    alt="Ship It"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-semibold text-[var(--text-primary)]">
                  #ShipItToProd
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 relative shrink-0">
                  <Image
                    src="/assets/emotes/gemini-spark.svg"
                    alt="Gemini Spark"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-semibold text-[var(--text-primary)]">
                  Gemini-Powered
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
