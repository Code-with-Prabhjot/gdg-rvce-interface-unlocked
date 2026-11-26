'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, ShieldCheck } from 'lucide-react';
import { KineticPrismStage } from './KineticPrismStage';
import { DEVELOPER_STICKERS } from '@/data/gdgData';
import { MagneticWrapper } from '@/components/ui/MagneticWrapper';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Easing curve specified in challenge requirements
  const easeOutQuart = [0.22, 1, 0.36, 1] as const;

  // Scroll-driven GPU-composited parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const rawGridParallaxY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const gridParallaxY = prefersReducedMotion ? 0 : rawGridParallaxY;

  const maskTransition = (delay: number) => ({
    duration: prefersReducedMotion ? 0 : 0.45,
    delay: prefersReducedMotion ? 0 : delay,
    ease: easeOutQuart,
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full flex items-center justify-center pt-5 pb-7 lg:pt-7 lg:pb-9 overflow-hidden"
    >
      {/* Background Architectural Blueprint Grid Parallax Layer */}
      <motion.div
        style={{ y: gridParallaxY }}
        className="absolute inset-0 bg-blueprint-grid opacity-60 dark:opacity-35 pointer-events-none will-change-transform -z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Choreographed Masked Typography & CTAs       */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-4 lg:space-y-5 z-10">
            {/* 0ms: Eyebrow Telemetry Pill */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0)}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] tracking-wide">
                  RVCE · BENGALURU // CHAPTER PORTAL
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-blue-text)]" />
                <span>OFFICIAL GDG ON CAMPUS</span>
              </div>
            </motion.div>

            {/* 120ms - 360ms: Three Masked Display Lines in one semantic <h1> */}
            <h1 className="space-y-0.5 sm:space-y-1 text-4xl sm:text-5xl xl:text-[3.5rem] font-display font-bold tracking-tight text-[var(--text-primary)] leading-[1.06]">
              {/* Line 1: "Engineering the" */}
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={prefersReducedMotion ? { y: '0%' } : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={maskTransition(0.08)}
                  className="block"
                >
                  Engineering the
                </motion.span>
              </span>

              {/* Line 2: "open web at" */}
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={prefersReducedMotion ? { y: '0%' } : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={maskTransition(0.16)}
                  className="block"
                >
                  open web at
                </motion.span>
              </span>

              {/* Line 3: "GDG RVCE." + Google Spectrum Bar */}
              <span className="block overflow-hidden py-0.5">
                <span className="relative inline-block">
                  <motion.span
                    initial={prefersReducedMotion ? { y: '0%' } : { y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={maskTransition(0.24)}
                    className="inline-block gdg-4color-text"
                  >
                    GDG RVCE.
                  </motion.span>

                  {/* 4px Segmented 4-Colour Spectrum Bar */}
                  <motion.span
                    initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.45,
                      delay: prefersReducedMotion ? 0 : 0.3,
                      ease: easeOutQuart,
                    }}
                    style={{ transformOrigin: 'left' }}
                    className="h-1 w-full mt-2 rounded-full overflow-hidden flex shadow-xs"
                  >
                    <span className="w-1/4 h-full bg-[#4285F4]" />
                    <span className="w-1/4 h-full bg-[#EA4335]" />
                    <span className="w-1/4 h-full bg-[#FBBC04]" />
                    <span className="w-1/4 h-full bg-[#34A853]" />
                  </motion.span>
                </span>
              </span>
            </h1>

            {/* Crisp 2-Line Mission Statement */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0.28)}
              className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed max-w-xl"
            >
              An open student developer community at RV College of Engineering building with AI, Cloud, Web, and Android through hands-on sprints and open-source craft.
            </motion.p>

            {/* Dual Tactile Action CTAs */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0.32)}
              className="flex flex-wrap items-center gap-3 pt-0.5"
            >
              <MagneticWrapper maxOffset={6}>
                <Link
                  href="/events"
                  className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 min-h-[44px] rounded-xl text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4]"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </MagneticWrapper>

              <MagneticWrapper maxOffset={6}>
                <Link
                  href="/team"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] hover:border-[#4285F4] hover:bg-[var(--bg-subtle)] shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4]"
                >
                  <Code className="w-4 h-4 shrink-0 text-[var(--accent-green-text)]" />
                  <span>Meet the Builders</span>
                </Link>
              </MagneticWrapper>
            </motion.div>

            {/* Interactive Developer Sticker Strip + Compact Scene Preview Pill */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={maskTransition(0.36)}
              className="pt-1 flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-[var(--text-muted)] tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                <span>DEVELOPER EMOTE BADGES</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
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
                                  scale: 1.12,
                                  rotate: -4,
                                }
                          }
                          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                          className="relative w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs flex items-center justify-center p-1.5 cursor-pointer transition-colors hover:border-[#4285F4]"
                        >
                          <Image
                            src={`/assets/emotes/${sticker.file}`}
                            alt={sticker.label}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain pointer-events-none select-none"
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

                {/* Compact Tactile "Latest Scene Preview" Pill Card */}
                <a
                  href="#community-scenes"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('community-scenes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group/scene-pill inline-flex items-center gap-2.5 p-1.5 pr-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[#4285F4] transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 max-w-full cursor-pointer"
                >
                  <div className="relative w-11 h-7 rounded-lg overflow-hidden border border-[var(--border-strong)] shrink-0 bg-[#090C10]">
                    <Image
                      src="/assets/scenes/auditorium-keynote.svg"
                      alt="Auditorium Keynote Preview"
                      fill
                      className="object-cover group-hover/scene-pill:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04] animate-pulse shrink-0" />
                      <span className="text-[10px] font-mono font-semibold text-[var(--text-muted)] tracking-wider uppercase">
                        IN THE BUILD ROOM
                      </span>
                    </div>
                    <span className="text-xs font-display font-bold text-[var(--text-primary)] group-hover/scene-pill:text-[var(--accent-blue-text)] transition-colors flex items-center gap-1 truncate">
                      <span>Auditorium Keynote · SCENE // 01</span>
                      <ArrowRight className="w-3 h-3 shrink-0 group-hover/scene-pill:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
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
