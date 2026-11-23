'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { PILLARS_DATA, PillarItem, GoogleAccent } from '@/data/gdgData';

// -----------------------------------------------------------------------------
// HELPER: Google Accent Theme Tokens
// -----------------------------------------------------------------------------
function getPillarAccentStyles(accent: GoogleAccent) {
  switch (accent) {
    case 'blue':
      return {
        hex: '#4285F4',
        glowBg: 'rgba(66, 133, 244, 0.12)',
        borderColor: 'group-hover:border-[#4285F4]/50',
        badgeClass: 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/30',
        chipHover: 'hover:border-[#4285F4] hover:text-[#4285F4]',
        dotColor: 'bg-[#4285F4]',
      };
    case 'red':
      return {
        hex: '#EA4335',
        glowBg: 'rgba(234, 67, 53, 0.12)',
        borderColor: 'group-hover:border-[#EA4335]/50',
        badgeClass: 'bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/30',
        chipHover: 'hover:border-[#EA4335] hover:text-[#EA4335]',
        dotColor: 'bg-[#EA4335]',
      };
    case 'yellow':
      return {
        hex: '#FBBC04',
        glowBg: 'rgba(251, 188, 4, 0.14)',
        borderColor: 'group-hover:border-[#FBBC04]/50',
        badgeClass: 'bg-[#FBBC04]/20 text-[#111827] dark:text-[#FBBC04] border-[#FBBC04]/40 font-semibold',
        chipHover: 'hover:border-[#FBBC04] hover:text-[#B45309] dark:hover:text-[#FBBC04]',
        dotColor: 'bg-[#FBBC04]',
      };
    case 'green':
      return {
        hex: '#34A853',
        glowBg: 'rgba(52, 168, 83, 0.12)',
        borderColor: 'group-hover:border-[#34A853]/50',
        badgeClass: 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/30',
        chipHover: 'hover:border-[#34A853] hover:text-[#34A853]',
        dotColor: 'bg-[#34A853]',
      };
  }
}

// -----------------------------------------------------------------------------
// TILE 1: Hands-On Build Labs Schematic Diagram (Blue #4285F4)
// Node pipeline / API request flow
// -----------------------------------------------------------------------------
function HandsOnPipelineDiagram() {
  return (
    <div className="w-full h-36 sm:h-44 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 relative overflow-hidden flex items-center justify-center select-none group/diag">
      {/* Background architectural micro-grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="bento-grid-blue" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.8" fill="var(--color-border-strong)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-grid-blue)" />
      </svg>

      <svg
        viewBox="0 0 540 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[500px] z-10 transition-transform duration-500 group-hover:scale-[1.02]"
        aria-hidden="true"
      >
        {/* Connecting pipeline lines */}
        <line
          x1="100"
          y1="60"
          x2="210"
          y2="60"
          stroke="#4285F4"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="transition-all duration-300 group-hover:stroke-opacity-100 stroke-opacity-50"
        />
        <line
          x1="290"
          y1="60"
          x2="410"
          y2="60"
          stroke="#4285F4"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="transition-all duration-300 group-hover:stroke-opacity-100 stroke-opacity-50"
        />

        {/* Dynamic streaming pulses */}
        <circle cx="155" cy="60" r="3.5" fill="#4285F4" className="animate-pulse" />
        <circle cx="350" cy="60" r="3.5" fill="#4285F4" className="animate-pulse" />

        {/* Node 1: Client Ingest */}
        <g className="transition-transform duration-300 group-hover/diag:translate-y-[-2px]">
          <rect
            x="20"
            y="30"
            width="80"
            height="60"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="#4285F4"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="52"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fontWeight="600"
          >
            CLIENT
          </text>
          <text
            x="60"
            y="68"
            textAnchor="middle"
            fill="#4285F4"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            REST/gRPC
          </text>
          <circle cx="32" cy="40" r="2.5" fill="#34A853" />
        </g>

        {/* Node 2: API Gateway / Cloud Run */}
        <g className="transition-transform duration-300 group-hover/diag:scale-105 transform origin-center">
          <rect
            x="210"
            y="22"
            width="80"
            height="76"
            rx="10"
            fill="var(--bg-elevated)"
            stroke="#4285F4"
            strokeWidth="2"
            className="filter drop-shadow-[0_2px_8px_rgba(66,133,244,0.25)]"
          />
          <rect
            x="220"
            y="28"
            width="60"
            height="14"
            rx="3"
            fill="rgba(66,133,244,0.12)"
          />
          <text
            x="250"
            y="38"
            textAnchor="middle"
            fill="#4285F4"
            fontSize="8"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
          >
            CLOUD RUN
          </text>
          <text
            x="250"
            y="62"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fontWeight="600"
          >
            RUNTIME
          </text>
          <text
            x="250"
            y="78"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            LATENCY: 8ms
          </text>
        </g>

        {/* Node 3: Microservice / Storage */}
        <g className="transition-transform duration-300 group-hover/diag:translate-y-[-2px]">
          <rect
            x="410"
            y="30"
            width="80"
            height="60"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="#4285F4"
            strokeWidth="1.5"
          />
          <text
            x="450"
            y="52"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fontWeight="600"
          >
            STORAGE
          </text>
          <text
            x="450"
            y="68"
            textAnchor="middle"
            fill="#34A853"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            200 OK
          </text>
          <circle cx="478" cy="40" r="2.5" fill="#34A853" />
        </g>

        {/* Real-time telemetry badge */}
        <rect
          x="200"
          y="104"
          width="100"
          height="14"
          rx="7"
          fill="rgba(66,133,244,0.15)"
        />
        <text
          x="250"
          y="114"
          textAnchor="middle"
          fill="#4285F4"
          fontSize="8"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
        >
          [ PIPELINE // ACTIVE ]
        </text>
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TILE 2: Campus Hackathons Isometric Wireframe SVG (Red #EA4335)
// -----------------------------------------------------------------------------
function HackathonIsometricWireframe({ emoteBadge }: { emoteBadge?: string }) {
  return (
    <div className="w-full h-36 sm:h-44 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 relative overflow-hidden flex items-center justify-between select-none group/hack">
      {/* Emote Badge Stamp */}
      {emoteBadge && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-hairline)] shadow-xs">
          <Image
            src={emoteBadge}
            alt="Trophy Build Emote"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
          <span className="font-mono text-[10px] font-semibold text-[#EA4335]">
            24H SPRINT
          </span>
        </div>
      )}

      {/* Isometric Blueprint Wireframe */}
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full z-10 transition-transform duration-500 group-hover:scale-[1.03]"
        aria-hidden="true"
      >
        {/* Isometric Grid Surface */}
        <path
          d="M160 20 L270 65 L160 110 L50 65 Z"
          fill="var(--bg-elevated)"
          stroke="#EA4335"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />

        {/* Stage Isometric Platform 1 */}
        <path
          d="M160 38 L220 62 L160 86 L100 62 Z"
          fill="rgba(234,67,53,0.08)"
          stroke="#EA4335"
          strokeWidth="1.5"
        />

        {/* Pillars / Columns */}
        <line x1="100" y1="62" x2="100" y2="78" stroke="#EA4335" strokeWidth="1.5" />
        <line x1="220" y1="62" x2="220" y2="78" stroke="#EA4335" strokeWidth="1.5" />
        <line x1="160" y1="86" x2="160" y2="102" stroke="#EA4335" strokeWidth="1.5" />

        {/* Platform Bottom Lip */}
        <path
          d="M100 78 L160 102 L220 78"
          stroke="#EA4335"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Target Milestone Nodes */}
        <circle cx="160" cy="50" r="4" fill="#EA4335" className="animate-ping opacity-75" />
        <circle cx="160" cy="50" r="3" fill="#EA4335" />

        <circle cx="130" cy="62" r="2.5" fill="#EA4335" />
        <circle cx="190" cy="62" r="2.5" fill="#EA4335" />

        {/* Countdown Telemetry Pill inside SVG */}
        <rect
          x="12"
          y="14"
          width="114"
          height="20"
          rx="4"
          fill="var(--bg-elevated)"
          stroke="#EA4335"
          strokeWidth="1"
        />
        <text
          x="69"
          y="28"
          textAnchor="middle"
          fill="#EA4335"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
        >
          SPRINT // 24:00:00
        </text>

        {/* Jury Demo Tag */}
        <text
          x="160"
          y="72"
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="600"
        >
          LIVE JURY BENCH
        </text>
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TILE 3: Study Jams Stepped Learning-Track Staircase (Yellow #FBBC04)
// -----------------------------------------------------------------------------
function SteppedLearningStaircase({ emoteBadge }: { emoteBadge?: string }) {
  return (
    <div className="w-full h-36 sm:h-44 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 relative overflow-hidden flex items-center justify-between select-none group/jam">
      {/* Emote Badge Stamp */}
      {emoteBadge && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-hairline)] shadow-xs">
          <Image
            src={emoteBadge}
            alt="Gemini Spark Emote"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
          <span className="font-mono text-[10px] font-semibold text-[#111827] dark:text-[#FBBC04]">
            STUDY TRACK
          </span>
        </div>
      )}

      {/* Stepped Geometric Staircase Vector */}
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full z-10 transition-transform duration-500 group-hover:scale-[1.03]"
        aria-hidden="true"
      >
        {/* Step 1 */}
        <rect
          x="24"
          y="78"
          width="76"
          height="32"
          rx="4"
          fill="var(--bg-elevated)"
          stroke="#FBBC04"
          strokeWidth="1.5"
        />
        <text
          x="62"
          y="98"
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
        >
          01 // SYNTAX
        </text>

        {/* Step 2 */}
        <rect
          x="108"
          y="48"
          width="82"
          height="62"
          rx="4"
          fill="var(--bg-elevated)"
          stroke="#FBBC04"
          strokeWidth="1.5"
        />
        <text
          x="149"
          y="68"
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
        >
          02 // PATTERNS
        </text>
        <text
          x="149"
          y="82"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="8"
          fontFamily="var(--font-mono)"
        >
          SYSTEM DESIGN
        </text>

        {/* Step 3 */}
        <rect
          x="198"
          y="18"
          width="98"
          height="92"
          rx="4"
          fill="rgba(251,188,4,0.12)"
          stroke="#FBBC04"
          strokeWidth="2"
        />
        <text
          x="247"
          y="40"
          textAnchor="middle"
          fill="#111827"
          className="dark:fill-[#FBBC04]"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
        >
          03 // PRODUCTION
        </text>
        <text
          x="247"
          y="56"
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize="8"
          fontFamily="var(--font-mono)"
        >
          DEPLOY &amp; SCALE
        </text>

        {/* Ascending Path Line */}
        <path
          d="M62 78 L62 62 L149 62 L149 32 L247 32"
          fill="none"
          stroke="#FBBC04"
          strokeWidth="2"
          strokeDasharray="3 3"
        />

        {/* Checkpoint Nodes */}
        <circle cx="62" cy="78" r="3" fill="#FBBC04" />
        <circle cx="149" cy="48" r="3" fill="#FBBC04" />
        <circle cx="247" cy="18" r="4" fill="#FBBC04" className="animate-pulse" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TILE 4: Open Source Git Branch-and-Merge Vector Diagram (Green #34A853)
// -----------------------------------------------------------------------------
function GitBranchMergeDiagram({ emoteBadge }: { emoteBadge?: string }) {
  return (
    <div className="w-full h-36 sm:h-44 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 relative overflow-hidden flex items-center justify-center select-none group/git">
      {/* Emote Badge Stamp */}
      {emoteBadge && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-hairline)] shadow-xs">
          <Image
            src={emoteBadge}
            alt="Merge Clean Emote"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
          <span className="font-mono text-[10px] font-semibold text-[#34A853]">
            MAIN // MERGED
          </span>
        </div>
      )}

      {/* Interactive Git Graph Vector */}
      <svg
        viewBox="0 0 540 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[500px] z-10 transition-transform duration-500 group-hover:scale-[1.02]"
        aria-hidden="true"
      >
        {/* Main Trunk Line */}
        <line
          x1="30"
          y1="60"
          x2="500"
          y2="60"
          stroke="#34A853"
          strokeWidth="3"
        />

        {/* Feature Branch 1: Upward curve */}
        <path
          d="M120 60 C150 60, 160 26, 200 26 L320 26 C360 26, 370 60, 400 60"
          fill="none"
          stroke="#34A853"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="transition-all duration-300 group-hover:stroke-opacity-100 stroke-opacity-70"
        />

        {/* Feature Branch 2: Downward curve */}
        <path
          d="M220 60 C240 60, 250 94, 280 94 L350 94 C380 94, 390 60, 420 60"
          fill="none"
          stroke="#4285F4"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="transition-all duration-300 group-hover:stroke-opacity-100 stroke-opacity-70"
        />

        {/* Commits on Main Trunk */}
        <g>
          <circle cx="50" cy="60" r="5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2.5" />
          <circle cx="120" cy="60" r="5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2.5" />
          <circle cx="220" cy="60" r="5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2.5" />
          <circle cx="400" cy="60" r="6" fill="#34A853" />
          <circle cx="470" cy="60" r="7" fill="#34A853" className="animate-pulse" />
        </g>

        {/* Commits on Feature Branch 1 (Green) */}
        <g>
          <circle cx="230" cy="26" r="4.5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2" />
          <circle cx="290" cy="26" r="4.5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2" />
          <text
            x="260"
            y="18"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            feat/multimodal
          </text>
        </g>

        {/* Commits on Feature Branch 2 (Blue) */}
        <g>
          <circle cx="310" cy="94" r="4.5" fill="var(--bg-elevated)" stroke="#4285F4" strokeWidth="2" />
          <text
            x="310"
            y="108"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            feat/telemetry-v2
          </text>
        </g>

        {/* Release Tag Pill on Main */}
        <rect
          x="440"
          y="74"
          width="62"
          height="16"
          rx="4"
          fill="rgba(52,168,83,0.15)"
          stroke="#34A853"
          strokeWidth="1"
        />
        <text
          x="471"
          y="85"
          textAnchor="middle"
          fill="#34A853"
          fontSize="8"
          fontFamily="var(--font-mono)"
          fontWeight="bold"
        >
          v1.0.0 TAG
        </text>
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BENTO TILE WRAPPER COMPONENT
// -----------------------------------------------------------------------------
interface BentoTileProps {
  pillar: PillarItem;
  colSpanClass: string;
  index: number;
}

function BentoTile({ pillar, colSpanClass, index }: BentoTileProps) {
  const styles = getPillarAccentStyles(pillar.accent);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${colSpanClass} flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] ${styles.borderColor} transition-all duration-300 relative overflow-hidden group shadow-xs hover:shadow-lg`}
    >
      {/* Subtle Radial Glow on Hover */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-0"
        style={{ background: styles.glowBg }}
      />

      {/* Content Container */}
      <div className="space-y-5 relative z-10">
        {/* Top Header Row: Index Tag + Pill Badge */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold tracking-wider text-[var(--text-muted)]">
            {pillar.indexTag}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border whitespace-nowrap ${styles.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor} shrink-0`} />
            <span>{pillar.pillBadge}</span>
          </span>
        </div>

        {/* Embedded Interactive Vector Diagram */}
        {index === 0 && <HandsOnPipelineDiagram />}
        {index === 1 && <HackathonIsometricWireframe emoteBadge={pillar.emoteBadge} />}
        {index === 2 && <SteppedLearningStaircase emoteBadge={pillar.emoteBadge} />}
        {index === 3 && <GitBranchMergeDiagram emoteBadge={pillar.emoteBadge} />}

        {/* Title & Tagline */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
            {pillar.title}
          </h3>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            {pillar.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {pillar.description}
        </p>

        {/* Interactive Curriculum Chips */}
        <div className="pt-2 flex flex-wrap gap-2">
          {pillar.chips.map((chip, chipIdx) => (
            <span
              key={chipIdx}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)] ${styles.chipHover} transition-all duration-200 cursor-default select-none shadow-2xs`}
            >
              #{chip}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div className="pt-5 mt-5 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)] relative z-10">
        <span className="truncate">{pillar.techSpec}</span>
        <span className="shrink-0 text-[10px] text-[var(--text-muted)]">RVCE &apos;26</span>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// MAIN SECTION: BentoPillarsSection (Act III)
// -----------------------------------------------------------------------------
export function BentoPillarsSection() {
  const prefersReducedMotion = useReducedMotion();

  // Asymmetric 12-column bento mapping
  // Tile 1: md:col-span-7 (Blue)
  // Tile 2: md:col-span-5 (Red)
  // Tile 3: md:col-span-5 (Yellow)
  // Tile 4: md:col-span-7 (Green)
  const colSpans = [
    'md:col-span-7',
    'md:col-span-5',
    'md:col-span-5',
    'md:col-span-7',
  ];

  return (
    <section
      id="pillars"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative"
    >
      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14"
      >
        <div className="space-y-3">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
            <span className="font-mono text-xs font-semibold text-[#4285F4] tracking-wider">
              [ 01 // ENGINEERING PILLARS ]
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
            Four verticals. One open build culture.
          </h2>

          {/* Subcopy */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            How RVCE student builders move from first-principles systems theory to deployed, production-grade open-source repositories and cloud architectures.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3.5 py-2 rounded-xl border border-[var(--border-hairline)] self-start md:self-auto shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
          <span>ACTIVE SPRINT TRACKS // 2026</span>
        </div>
      </motion.div>

      {/* Asymmetric 12-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {PILLARS_DATA.map((pillar, idx) => (
          <BentoTile
            key={pillar.id}
            pillar={pillar}
            colSpanClass={colSpans[idx] || 'md:col-span-6'}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
