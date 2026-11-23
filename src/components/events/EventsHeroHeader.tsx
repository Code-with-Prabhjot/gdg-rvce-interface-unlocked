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
    tagText: 'text-[#4285F4]',
  },
  {
    track: 'Hackathon',
    color: '#EA4335',
    label: 'Red',
    dotBg: 'bg-[#EA4335]',
    tagBg: 'bg-[#EA4335]/10',
    tagBorder: 'border-[#EA4335]/30',
    tagText: 'text-[#EA4335]',
  },
  {
    track: 'Study Jam',
    color: '#FBBC04',
    label: 'Yellow',
    dotBg: 'bg-[#FBBC04]',
    tagBg: 'bg-[#FBBC04]/15',
    tagBorder: 'border-[#FBBC04]/40',
    tagText: 'text-[#B45309] dark:text-[#FBBC04]',
  },
  {
    track: 'Tech Talk',
    color: '#34A853',
    label: 'Green',
    dotBg: 'bg-[#34A853]',
    tagBg: 'bg-[#34A853]/10',
    tagBorder: 'border-[#34A853]/30',
    tagText: 'text-[#34A853]',
  },
];

export function EventsHeroHeader() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="relative w-full overflow-hidden rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs mb-10 sm:mb-12">
      {/* Subtle Google 4-colour top accent rule */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] z-10" />

      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 dark:opacity-40 pointer-events-none" />

      {/* Hero Header Content */}
      <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
        {/* Left Column: Eyebrow, Space Grotesk Headline & Subcopy */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-4"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="font-semibold tracking-wider text-[#4285F4] dark:text-[#60A5FA]">
              [ 02 // EVENT DIRECTORY ]
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)]">GDG ON CAMPUS RVCE</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.12]">
            Sprints, Workshops &amp; Build Sessions.
          </h1>

          {/* Subcopy */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
            Hands-on developer labs, campus hackathons, and technical deep dives hosted by GDG on Campus RV College of Engineering.
          </p>
        </motion.div>

        {/* Right Column: Track Colour Legend Card with Emotes */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 0.96 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-auto shrink-0"
        >
          <div className="rounded-2xl bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-hairline)] p-5 sm:p-6 shadow-md space-y-4 max-w-md">
            {/* Header / Telemetry indicator */}
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                TRACK COLOUR TAXONOMY
              </span>
              <span className="text-[10px] font-mono text-[#4285F4] bg-[#4285F4]/10 px-2 py-0.5 rounded border border-[#4285F4]/20">
                4 PILLARS
              </span>
            </div>

            {/* 4 Semantic Track Badges */}
            <div className="grid grid-cols-2 gap-2.5">
              {TRACK_LEGEND.map((item) => (
                <div
                  key={item.track}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${item.tagBorder} ${item.tagBg} transition-all`}
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
                <div className="w-6 h-6 relative shrink-0">
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
                <div className="w-6 h-6 relative shrink-0">
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
