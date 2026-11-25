'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { LEARNING_TRACKS, LearningTrack, GoogleAccent } from '@/data/gdgData';

function getTrackAccentStyles(accent: GoogleAccent) {
  switch (accent) {
    case 'red':
      return {
        hex: '#EA4335',
        border: 'border-[#EA4335]',
        borderGlow: 'hover:border-[#EA4335]/70 shadow-[0_0_20px_rgba(234,67,53,0.12)]',
        bgPill: 'bg-[#EA4335]/10 text-[var(--accent-red-text)] border-[#EA4335]/30',
        activePill: 'bg-[#EA4335] text-white',
        activeTabBorder: 'border-[#EA4335]',
        cardHover: 'hover:border-[#EA4335]/50 hover:shadow-[0_4px_24px_rgba(234,67,53,0.1)]',
        stepColor: 'text-[var(--accent-red-text)]',
        lineColor: 'from-[#EA4335]/40 via-[#EA4335]/20 to-transparent',
        dotBg: 'bg-[#EA4335]',
      };
    case 'blue':
      return {
        hex: '#4285F4',
        border: 'border-[#4285F4]',
        borderGlow: 'hover:border-[#4285F4]/70 shadow-[0_0_20px_rgba(66,133,244,0.12)]',
        bgPill: 'bg-[#4285F4]/10 text-[var(--accent-blue-text)] border-[#4285F4]/30',
        activePill: 'bg-[#4285F4] text-white',
        activeTabBorder: 'border-[#4285F4]',
        cardHover: 'hover:border-[#4285F4]/50 hover:shadow-[0_4px_24px_rgba(66,133,244,0.1)]',
        stepColor: 'text-[var(--accent-blue-text)]',
        lineColor: 'from-[#4285F4]/40 via-[#4285F4]/20 to-transparent',
        dotBg: 'bg-[#4285F4]',
      };
    case 'yellow':
      return {
        hex: '#FBBC04',
        border: 'border-[#FBBC04]',
        borderGlow: 'hover:border-[#FBBC04]/70 shadow-[0_0_20px_rgba(251,188,4,0.15)]',
        bgPill: 'bg-[#FBBC04]/15 text-[var(--accent-yellow-text)] border-[#FBBC04]/30',
        activePill: 'bg-[#FBBC04] text-[#111827] font-bold',
        activeTabBorder: 'border-[#FBBC04]',
        cardHover: 'hover:border-[#FBBC04]/50 hover:shadow-[0_4px_24px_rgba(251,188,4,0.12)]',
        stepColor: 'text-[var(--accent-yellow-text)]',
        lineColor: 'from-[#FBBC04]/40 via-[#FBBC04]/20 to-transparent',
        dotBg: 'bg-[#FBBC04]',
      };
    case 'green':
      return {
        hex: '#34A853',
        border: 'border-[#34A853]',
        borderGlow: 'hover:border-[#34A853]/70 shadow-[0_0_20px_rgba(52,168,83,0.12)]',
        bgPill: 'bg-[#34A853]/10 text-[var(--accent-green-text)] border-[#34A853]/30',
        activePill: 'bg-[#34A853] text-white',
        activeTabBorder: 'border-[#34A853]',
        cardHover: 'hover:border-[#34A853]/50 hover:shadow-[0_4px_24px_rgba(52,168,83,0.1)]',
        stepColor: 'text-[var(--accent-green-text)]',
        lineColor: 'from-[#34A853]/40 via-[#34A853]/20 to-transparent',
        dotBg: 'bg-[#34A853]',
      };
  }
}

export function LearningTracksExplorer() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTrackId, setActiveTrackId] = useState<string>(LEARNING_TRACKS[0].id);

  const activeTrack: LearningTrack =
    LEARNING_TRACKS.find((t) => t.id === activeTrackId) || LEARNING_TRACKS[0];
  const styles = getTrackAccentStyles(activeTrack.googleColor);

  return (
    <section
      id="tracks"
      className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6 lg:space-y-8 scroll-mt-24 relative"
    >
      {/* ============================================================= */}
      {/* 1. SECTION HEADER WITH TELEMETRY EYEBROW                      */}
      {/* ============================================================= */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="space-y-2">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="font-mono text-xs font-semibold text-[var(--accent-blue-text)] tracking-wider">
              [ 02 // LEARNING TRACKS ]
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Structured pathways from first commit to shipped systems.
          </h2>

          {/* Subcopy */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Select an engineering vertical to inspect our four-stage campus progression, core toolchain, and open-source deliverables.
          </p>
        </div>

        {/* Live Curriculum Spec Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3.5 py-2 rounded-xl border border-[var(--border-hairline)] self-start md:self-auto shrink-0 shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-[var(--accent-blue-text)]" />
          <span>4 VERTICALS // 16 STAGES</span>
        </div>
      </motion.div>

      {/* ============================================================= */}
      {/* 2. COMPACT SIDE-BY-SIDE INTERACTIVE WORKSPACE (<= 640px)      */}
      {/* ============================================================= */}
      <div className="space-y-3.5">
        {/* 4-TRACK SELECTOR TABS */}
        <div
          role="tablist"
          aria-label="Engineering Learning Tracks"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 select-none"
        >
          {LEARNING_TRACKS.map((track) => {
            const isActive = track.id === activeTrackId;
            const trackStyles = getTrackAccentStyles(track.googleColor);

            return (
              <button
                key={track.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${track.id}`}
                id={`tab-${track.id}`}
                type="button"
                onClick={() => setActiveTrackId(track.id)}
                className={`relative flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                  isActive
                    ? `bg-[var(--bg-elevated)] ${trackStyles.border} shadow-md`
                    : 'bg-[var(--bg-elevated)]/60 border-[var(--border-hairline)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                {/* Emote Icon Badge */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isActive
                      ? 'scale-105 border-[var(--border-strong)] bg-[var(--bg-subtle)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)]'
                  }`}
                >
                  <Image
                    src={track.emote}
                    alt={track.title}
                    width={22}
                    height={22}
                    className="w-5 h-5 object-contain"
                  />
                </div>

                {/* Title & Category */}
                <div className="truncate min-w-0">
                  <span className="block font-display font-semibold text-xs sm:text-sm text-[var(--text-primary)] truncate">
                    {track.title}
                  </span>
                  <span className="block font-mono text-[10px] text-[var(--text-muted)] truncate">
                    {track.recommendedFilterTrack}
                  </span>
                </div>

                {/* Active Tab Accent Bar */}
                {isActive && (
                  <motion.div
                    layoutId="learning-track-active"
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: track.accentHex }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE TRACK STAGE DETAILS & PIPELINE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack.id}
            id={`panel-${activeTrack.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTrack.id}`}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl sm:rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-4 sm:p-6 shadow-xl space-y-4 relative overflow-hidden"
          >
            {/* Subtle Ambient Background Gradient */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-15"
              style={{ backgroundColor: activeTrack.accentHex }}
            />

            {/* Top Metadata Banner */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[var(--border-hairline)]">
              <div className="flex items-start sm:items-center gap-3.5">
                {/* Emote Badge */}
                <div className="w-11 h-11 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] flex items-center justify-center shrink-0 shadow-inner">
                  <Image
                    src={activeTrack.emote}
                    alt={activeTrack.title}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)]">
                      {activeTrack.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[11px] border ${styles.bgPill}`}
                    >
                      {activeTrack.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-snug max-w-2xl">
                    {activeTrack.tagline}
                  </p>
                </div>
              </div>

              {/* Direct CTA Button linking to filtered events */}
              <div className="shrink-0">
                <Link
                  href={`/events?track=${encodeURIComponent(activeTrack.recommendedFilterTrack)}`}
                  className="min-h-[40px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm bg-[var(--bg-canvas)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[#4285F4] transition-all group/cta shadow-2xs whitespace-nowrap"
                >
                  <span>Explore {activeTrack.recommendedFilterTrack} Sessions</span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-[var(--accent-blue-text)] transition-transform group-hover/cta:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Tools & Frameworks Pills */}
            <div className="flex flex-wrap items-center gap-1.5 relative z-10">
              <span className="font-mono text-[11px] text-[var(--text-muted)] mr-1 flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: activeTrack.accentHex }} />
                CORE TOOLCHAIN:
              </span>
              {activeTrack.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)] shadow-2xs whitespace-nowrap"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* 4-Stage Connected Progression Pipeline */}
            <div className="relative pt-1">
              {/* Desktop Connector Line Behind Stages */}
              <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-0.5 bg-[var(--border-hairline)] z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
                {activeTrack.stages.map((stg, sIdx) => {
                  return (
                    <motion.div
                      key={stg.step}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        delay: prefersReducedMotion ? 0 : sIdx * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`group/stage rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] p-4 flex flex-col justify-between space-y-2.5 transition-all duration-300 ${styles.cardHover} relative overflow-hidden`}
                    >
                      {/* Stage Header & Number Badge */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-hairline)] font-mono text-[10px] font-semibold text-[var(--text-secondary)]">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: activeTrack.accentHex }}
                            />
                            <span>STAGE {stg.step}</span>
                          </div>

                          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider truncate">
                            {stg.stepTitle}
                          </span>
                        </div>

                        {/* Stage Name */}
                        <h4 className="font-display font-bold text-sm text-[var(--text-primary)] leading-snug">
                          {stg.name}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                          {stg.description}
                        </p>
                      </div>

                      {/* Stage Footer Status */}
                      <div className="pt-2.5 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: activeTrack.accentHex }}
                          />
                          <span>Phase {sIdx + 1} of 4</span>
                        </div>
                        <span className="text-[var(--text-muted)]">RVCE &apos;26</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
