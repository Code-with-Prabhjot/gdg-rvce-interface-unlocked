'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface CultureCardDef {
  id: string;
  emote: string;
  title: string;
  subtitle: string;
  description: string;
  accentHex: string;
  tag: string;
}

const CULTURE_PILLARS: CultureCardDef[] = [
  {
    id: 'pair-programming',
    emote: '/assets/emotes/pair-program.svg',
    title: 'Pair Programming',
    subtitle: 'Cross-Track Terminal Collab',
    description:
      'Engineers pair across verticals—bridging systems and design to catch edge cases before the first commit.',
    accentHex: '#EA4335',
    tag: 'CULTURE // 01',
  },
  {
    id: 'clean-architecture',
    emote: '/assets/emotes/clean-architecture.svg',
    title: 'Clean Architecture',
    subtitle: 'Domain Boundaries & Decoupling',
    description:
      'Idempotent microservices, typed contracts, and immutable state trees designed to withstand production traffic.',
    accentHex: '#4285F4',
    tag: 'CULTURE // 02',
  },
  {
    id: 'lgtm-reviews',
    emote: '/assets/emotes/lgtm-stamp.svg',
    title: 'LGTM Code Reviews',
    subtitle: 'High-Signal Peer Audits',
    description:
      'Strict zero-hype code verification, benchmark thresholds, automated CI gates, and continuous RFC sign-offs.',
    accentHex: '#FBBC04',
    tag: 'CULTURE // 03',
  },
  {
    id: 'campus-open-source',
    emote: '/assets/emotes/rvce-crest.svg',
    title: 'Campus Open Source',
    subtitle: 'MIT Permissive Toolkits',
    description:
      'Every library, model scaffold, and UI primitive built by RVCE builders is published openly for the community.',
    accentHex: '#34A853',
    tag: 'CULTURE // 04',
  },
];

export function TeamCultureStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Student Developer Culture and Engineering Values"
      className="relative w-full rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs overflow-hidden mt-12 sm:mt-16 p-6 sm:p-8 lg:p-10"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-50 dark:opacity-30 pointer-events-none" />

      {/* 4-Colour Subtle Corner Notches */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#4285F4] rounded-tl-xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#EA4335] rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FBBC04] rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#34A853] rounded-br-xl pointer-events-none" />

      <div className="relative space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[var(--border-hairline)]">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
              <span className="font-semibold text-[#EA4335] dark:text-[#F87171]">
                [ 03 // BUILDER ETHOS ]
              </span>
              <span className="text-[var(--text-muted)]">·</span>
              <span>PEER COLLABORATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Developer Culture at GDG RVCE
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              How student engineers across Web, Cloud, AI, and Design collaborate to build
              reproducible systems with craft and humility.
            </p>
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)] self-start sm:self-end">
            ZERO HYPOTHESIS // 100% RUNTIME VERIFIED
          </span>
        </div>

        {/* 4 Culture Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CULTURE_PILLARS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl bg-[var(--bg-subtle)]/70 hover:bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              {/* Subtle top indicator */}
              <div
                className="absolute top-0 inset-x-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity rounded-t-2xl"
                style={{ backgroundColor: item.accentHex }}
              />

              <div className="space-y-3">
                {/* Header: Emote & Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-1.5 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Image
                      src={item.emote}
                      alt={`${item.title} sticker badge`}
                      width={28}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)]">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-0.5">
                  <h3 className="text-sm font-display font-bold text-[var(--text-primary)] group-hover:text-[#4285F4] transition-colors">
                    {item.title}
                  </h3>
                  <div
                    className="text-[11px] font-mono font-medium"
                    style={{ color: item.accentHex }}
                  >
                    {item.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
