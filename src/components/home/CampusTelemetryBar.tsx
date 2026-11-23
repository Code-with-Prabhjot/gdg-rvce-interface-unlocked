'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TELEMETRY_SPECS, TECH_MARQUEE_ITEMS, GoogleAccent } from '@/data/gdgData';

function getAccentClasses(accent: GoogleAccent) {
  switch (accent) {
    case 'blue':
      return {
        bar: 'bg-[#4285F4]',
        borderHover: 'hover:border-[#4285F4]/60 dark:hover:border-[#4285F4]/50',
        glow: 'group-hover:shadow-[0_0_24px_rgba(66,133,244,0.12)]',
        code: 'text-[#4285F4]',
      };
    case 'red':
      return {
        bar: 'bg-[#EA4335]',
        borderHover: 'hover:border-[#EA4335]/60 dark:hover:border-[#EA4335]/50',
        glow: 'group-hover:shadow-[0_0_24px_rgba(234,67,53,0.12)]',
        code: 'text-[#EA4335]',
      };
    case 'yellow':
      return {
        bar: 'bg-[#FBBC04]',
        borderHover: 'hover:border-[#FBBC04]/60 dark:hover:border-[#FBBC04]/50',
        glow: 'group-hover:shadow-[0_0_24px_rgba(251,188,4,0.12)]',
        code: 'text-[#FBBC04]',
      };
    case 'green':
      return {
        bar: 'bg-[#34A853]',
        borderHover: 'hover:border-[#34A853]/60 dark:hover:border-[#34A853]/50',
        glow: 'group-hover:shadow-[0_0_24px_rgba(52,168,83,0.12)]',
        code: 'text-[#34A853]',
      };
  }
}

// 4-Quadrant Google Diamond Glyph
function GoogleDiamondGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="inline-block shrink-0 mx-5 drop-shadow-xs"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="1"
        width="8.485"
        height="8.485"
        rx="1"
        transform="rotate(45 7 1)"
        stroke="var(--border-strong)"
        strokeWidth="0.75"
      />
      {/* 4 Quadrants */}
      <path d="M7 2.2L11.8 7H7V2.2Z" fill="#4285F4" />
      <path d="M11.8 7L7 11.8V7H11.8Z" fill="#EA4335" />
      <path d="M7 11.8L2.2 7H7V11.8Z" fill="#34A853" />
      <path d="M2.2 7L7 2.2V7H2.2Z" fill="#FBBC04" />
    </svg>
  );
}

export function CampusTelemetryBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-full border-y border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-colors relative z-20">
      {/* PART A: 4-Column Precision Telemetry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-hairline)]">
          {TELEMETRY_SPECS.map((spec, idx) => {
            const styling = getAccentClasses(spec.accent);

            return (
              <motion.div
                key={spec.code}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.08,
                }}
                className={`group relative p-5 sm:p-6 transition-all duration-200 border-l-2 border-transparent ${styling.borderHover} ${styling.glow} bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)]/50`}
              >
                {/* Header: Code & Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`font-mono text-xs font-semibold tracking-wider ${styling.code}`}>
                    {spec.code}
                  </span>
                  <div
                    className={`w-4 h-1 rounded-full ${styling.bar} opacity-80 group-hover:opacity-100 group-hover:scale-x-125 transition-all origin-right`}
                  />
                </div>

                {/* Sub-label */}
                <p className="text-xs font-medium text-[var(--text-muted)] font-mono uppercase tracking-wide mb-1">
                  {spec.label}
                </p>

                {/* Value */}
                <p className="text-base sm:text-lg font-display font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                  {spec.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* PART B: Infinite Seamless Tech-Stack Marquee */}
      <div className="w-full border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/60 overflow-hidden py-3 select-none">
        <div className="relative w-full flex overflow-x-hidden group/marquee">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center animate-marquee whitespace-nowrap group-hover/marquee:[animation-play-state:paused]">
            {TECH_MARQUEE_ITEMS.map((item, idx) => (
              <span key={`track1-${item}-${idx}`} className="inline-flex items-center">
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.14em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </span>
                <GoogleDiamondGlyph />
              </span>
            ))}
          </div>

          {/* Track 2 (Duplicate for infinite seamless loop) */}
          <div
            className="flex shrink-0 items-center animate-marquee whitespace-nowrap group-hover/marquee:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {TECH_MARQUEE_ITEMS.map((item, idx) => (
              <span key={`track2-${item}-${idx}`} className="inline-flex items-center">
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.14em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {item}
                </span>
                <GoogleDiamondGlyph />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
