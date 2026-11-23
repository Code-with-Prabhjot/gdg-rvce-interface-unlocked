'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { RECAP_DATA, RecapTabItem } from '@/data/gdgData';

// Google Checkmark Accent Palette
const CHECK_COLORS = ['#4285F4', '#EA4335', '#34A853'];

// Community Developer Emotes for Act V Part B
const COMMUNITY_EMOTES = [
  {
    src: '/assets/emotes/rvce-bengaluru.svg',
    label: 'RVCE Bengaluru',
    tag: 'CAMPUS HQ',
  },
  {
    src: '/assets/emotes/coffee-compile.svg',
    label: 'Coffee & Compile',
    tag: 'BUILD CADENCE',
  },
  {
    src: '/assets/emotes/cloud-deploy.svg',
    label: 'Cloud Deploy',
    tag: 'PROD SHIPPER',
  },
  {
    src: '/assets/emotes/night-owl.svg',
    label: 'Night Owl',
    tag: 'HACKATHONS',
  },
];

export function RecapAndCommunitySection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTabId, setActiveTabId] = useState<'keynotes' | 'labs' | 'artifacts'>('keynotes');

  const currentTab: RecapTabItem =
    RECAP_DATA.tabs.find((t) => t.id === activeTabId) || RECAP_DATA.tabs[0];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-20 lg:space-y-28">
      {/* ============================================================= */}
      {/* PART A: EDITORIAL EVENT RECAP SPOTLIGHT                       */}
      {/* Telemetry eyebrow: [ 03 // LATEST RECAP ]                     */}
      {/* Showcases "DevFest Campus Warmup '26"                         */}
      {/* ============================================================= */}
      <div id="recap" className="space-y-12">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
            <span className="font-mono text-xs font-semibold text-[#4285F4] tracking-wider">
              [ 03 // LATEST RECAP ]
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
                {RECAP_DATA.title}: Retrospective
              </h2>
              <p className="text-sm sm:text-base font-mono text-[var(--text-muted)] mt-1">
                {RECAP_DATA.subtitle} · {RECAP_DATA.date} · {RECAP_DATA.venue}
              </p>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-2 rounded-xl border border-[var(--border-hairline)] self-start md:self-auto">
              <Terminal className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>CHAPTER ARCHIVE // v1.0</span>
            </div>
          </div>
        </motion.div>

        {/* 2-Column Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ----------------------------------------------------------- */}
          {/* LEFT COLUMN: Visual Stage Blueprint Window                  */}
          {/* ----------------------------------------------------------- */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Architectural Blueprint Window */}
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-2.5 sm:p-3 shadow-xl relative overflow-hidden group">
              {/* Corner Crosshairs */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none z-20">
                +
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none z-20">
                +
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none z-20">
                +
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none z-20">
                +
              </div>

              {/* Mono Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]/70 rounded-t-xl mb-2 text-xs font-mono">
                <span className="font-semibold text-[var(--text-secondary)]">
                  RECAP ARCHIVE // 2026
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-[#34A853]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                  VERIFIED DEPLOY
                </span>
              </div>

              {/* Cover Banner with Blueprint Frame */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <Image
                  src={RECAP_DATA.coverImage}
                  alt={RECAP_DATA.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Bottom Overlay Gradient */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#4285F4]/30 border border-[#4285F4]/50 text-white">
                    INAUGURAL KEYNOTE
                  </span>
                  <p className="text-sm font-display font-bold mt-1.5">
                    {RECAP_DATA.keynoteSpeaker.name}
                  </p>
                  <p className="text-xs text-white/80 font-mono">
                    {RECAP_DATA.keynoteSpeaker.role} · {RECAP_DATA.keynoteSpeaker.company}
                  </p>
                </div>
              </div>

              {/* Technical Highlights Bar */}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[var(--border-hairline)]">
                <div className="p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                  <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Core Tracks
                  </p>
                  <p className="text-xs font-bold font-mono text-[var(--text-primary)] mt-0.5">
                    4 Deep Verticals
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                  <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Open Source
                  </p>
                  <p className="text-xs font-bold font-mono text-[var(--text-primary)] mt-0.5">
                    8 Repos Launched
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Developer Emote 1: ship-it.svg */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 sm:-right-6 z-30 p-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xl hidden sm:flex items-center gap-2 select-none"
            >
              <Image
                src="/assets/emotes/ship-it.svg"
                alt="Ship It Emote"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="font-mono text-[11px] font-bold text-[#4285F4]">
                #SHIP-IT
              </span>
            </motion.div>

            {/* Floating Developer Emote 2: bug-squashed.svg */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [3, -3, 3] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 sm:-left-6 z-30 p-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xl hidden sm:flex items-center gap-2 select-none"
            >
              <Image
                src="/assets/emotes/bug-squashed.svg"
                alt="Bug Squashed Emote"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="font-mono text-[11px] font-bold text-[#34A853]">
                #BUG-FREE
              </span>
            </motion.div>
          </motion.div>

          {/* ----------------------------------------------------------- */}
          {/* RIGHT COLUMN: Interactive Track Tabs                        */}
          {/* ----------------------------------------------------------- */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Interactive Tab Buttons with layoutId Indicator */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
              {RECAP_DATA.tabs.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className="relative flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 text-center cursor-pointer select-none focus:outline-hidden"
                  >
                    {/* Active sliding pill indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="recap-active-tab"
                        className="absolute inset-0 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-sm"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors ${
                        isActive
                          ? 'text-[#4285F4] font-bold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Crossfading Tab Panel Content */}
            <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-6 sm:p-7 min-h-[280px] shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                  className="space-y-5"
                >
                  {/* Tagline */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                    <p className="font-mono text-xs font-semibold text-[#4285F4] uppercase tracking-wider">
                      {currentTab.tagline}
                    </p>
                  </div>

                  {/* Narrative */}
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {currentTab.narrative}
                  </p>

                  {/* 3 Concrete Technical Takeaways with Google-Coloured Checkmarks */}
                  <div className="space-y-3 pt-2 border-t border-[var(--border-hairline)]">
                    <p className="text-xs font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Technical Takeaways:
                    </p>
                    <ul className="space-y-2.5">
                      {currentTab.takeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: CHECK_COLORS[idx % CHECK_COLORS.length] }}
                          />
                          <span className="leading-snug">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Badges */}
                  <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] mr-1">
                      STACK:
                    </span>
                    {currentTab.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Link to Past Event Recaps */}
            <div className="pt-1 flex items-center justify-between">
              <Link
                href="/events?status=Past"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#4285F4] hover:text-[#3367D6] transition-colors"
              >
                <span>Browse Past Event Recaps</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <span className="font-mono text-xs text-[var(--text-muted)]">
                RVCE CHAPTER ARCHIVE
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* PART B: HIGH-CONTRAST COMMUNITY PLUG-IN PORTAL                */}
      {/* Telemetry eyebrow: [ 04 // PLUG IN ]                          */}
      {/* Full-width architectural card with 4 Google corner accents    */}
      {/* ============================================================= */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-8 sm:p-12 lg:p-16 shadow-xl overflow-hidden"
      >
        {/* =========================================================== */}
        {/* Crisp 4-Colour Google Corner Bracket Accents                */}
        {/* #4285F4 top-left, #EA4335 top-right                         */}
        {/* #FBBC04 bottom-left, #34A853 bottom-right                   */}
        {/* =========================================================== */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#4285F4] rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#EA4335] rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#FBBC04] rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#34A853] rounded-br-2xl pointer-events-none" />

        {/* Blueprint Grid Utility Overlay */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

        {/* Ambient Subtle Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#4285F4]/10 blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#34A853]/10 blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)] shadow-xs">
            <span className="font-mono text-xs font-semibold text-[#34A853] tracking-wider">
              [ 04 // PLUG IN ]
            </span>
          </div>

          {/* Headline & Subcopy */}
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
              Ready to build with GDG RVCE?
            </h3>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              Explore upcoming campus sprints, inspect session agendas, or meet the student builders shaping our developer community.
            </p>
          </div>

          {/* Horizontal Row of 4 Local Developer Emotes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl py-2">
            {COMMUNITY_EMOTES.map((emote, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all duration-300 group/emote shadow-2xs hover:shadow-xs"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center transition-transform group-hover/emote:scale-110">
                  <Image
                    src={emote.src}
                    alt={emote.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)] mt-2">
                  {emote.label}
                </span>
                <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider uppercase mt-0.5">
                  {emote.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            {/* Primary CTA: Browse All Events (Google Blue #4285F4) */}
            <Link
              href="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] transition-all duration-200 shadow-md hover:shadow-lg group"
            >
              <span>Browse All Events</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA: Meet the Team (Outlined) */}
            <Link
              href="/team"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] hover:border-[#4285F4] transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <span>Meet the Team</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
