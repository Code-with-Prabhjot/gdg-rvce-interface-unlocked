'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code, ShieldCheck } from 'lucide-react';
import { KineticPrismStage } from './KineticPrismStage';
import { DEVELOPER_STICKERS } from '@/data/gdgData';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Easing curve specified in challenge requirements
  const easeOutQuart = [0.22, 1, 0.36, 1] as const;

  const maskTransition = (delay: number) => ({
    duration: prefersReducedMotion ? 0 : 0.85,
    delay: prefersReducedMotion ? 0 : delay,
    ease: easeOutQuart,
  });

  return (
    <section className="relative w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center py-10 lg:py-16 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Choreographed Masked Typography & CTAs       */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-7 z-10">
            {/* 0ms: Eyebrow Telemetry Pill */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0)}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] tracking-wide">
                  RVCE · BENGALURU // CHAPTER PORTAL
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>OFFICIAL GDG ON CAMPUS</span>
              </div>
            </motion.div>

            {/* 120ms - 420ms: Three Masked Display Lines */}
            <div className="space-y-1 sm:space-y-2">
              {/* Line 1: "Engineering the" */}
              <div className="overflow-hidden py-1">
                <motion.h1
                  initial={prefersReducedMotion ? { y: '0%' } : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={maskTransition(0.12)}
                  className="text-4xl sm:text-6xl xl:text-7xl font-display font-bold tracking-tight text-[var(--text-primary)] leading-[1.05]"
                >
                  Engineering the
                </motion.h1>
              </div>

              {/* Line 2: "open web at" */}
              <div className="overflow-hidden py-1">
                <motion.h2
                  initial={prefersReducedMotion ? { y: '0%' } : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={maskTransition(0.24)}
                  className="text-4xl sm:text-6xl xl:text-7xl font-display font-bold tracking-tight text-[var(--text-primary)] leading-[1.05]"
                >
                  open web at
                </motion.h2>
              </div>

              {/* Line 3: "GDG RVCE." + Google Spectrum Bar */}
              <div className="overflow-hidden py-1">
                <div className="relative inline-block">
                  <motion.h2
                    initial={prefersReducedMotion ? { y: '0%' } : { y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={maskTransition(0.36)}
                    className="text-4xl sm:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-[1.05]"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]">
                      GDG RVCE.
                    </span>
                  </motion.h2>

                  {/* 4px Segmented 4-Colour Spectrum Bar */}
                  <motion.div
                    initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.7,
                      delay: prefersReducedMotion ? 0 : 0.45,
                      ease: easeOutQuart,
                    }}
                    style={{ transformOrigin: 'left' }}
                    className="h-1 w-full mt-2.5 rounded-full overflow-hidden flex shadow-xs"
                  >
                    <div className="w-1/4 h-full bg-[#4285F4]" />
                    <div className="w-1/4 h-full bg-[#EA4335]" />
                    <div className="w-1/4 h-full bg-[#FBBC04]" />
                    <div className="w-1/4 h-full bg-[#34A853]" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* 480ms: Crisp 2-Line Mission Statement */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0.48)}
              className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl"
            >
              An open student developer community at R.V. College of Engineering building with AI, Cloud, Web, and Android through hands-on sprints and open-source craft.
            </motion.p>

            {/* 580ms: Dual Tactile Action CTAs */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0.58)}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link
                href="/events"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4]"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] hover:border-[#4285F4] hover:bg-[var(--bg-subtle)] shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4]"
              >
                <Code className="w-4 h-4 text-[#34A853]" />
                <span>Meet the Builders</span>
              </Link>
            </motion.div>

            {/* 680ms: Interactive Developer Sticker Strip */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0.68)}
              className="pt-2 flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-muted)] tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                <span>DEVELOPER EMOTE BADGES</span>
              </div>

              <div className="flex items-center gap-3">
                {DEVELOPER_STICKERS.map((sticker) => {
                  const isHovered = activeTooltip === sticker.id;

                  return (
                    <div
                      key={sticker.id}
                      className="relative"
                      onMouseEnter={() => setActiveTooltip(sticker.id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? {}
                            : {
                                scale: 1.18,
                                rotate: -6,
                              }
                        }
                        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs flex items-center justify-center p-2 cursor-pointer transition-colors hover:border-[#4285F4]"
                      >
                        <Image
                          src={`/assets/emotes/${sticker.file}`}
                          alt={sticker.label}
                          width={36}
                          height={36}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>

                      {/* Tooltip Tag */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-lg text-[11px] font-mono font-semibold whitespace-nowrap text-[var(--text-primary)] z-30 pointer-events-none flex items-center gap-1.5"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: sticker.accentHex }}
                          />
                          <span>{sticker.tooltip}</span>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Interactive 3D Kinetic Prism Stage          */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center w-full z-10">
            <KineticPrismStage />
          </div>
        </div>
      </div>
    </section>
  );
}
