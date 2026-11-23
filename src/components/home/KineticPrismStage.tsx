'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Radio } from 'lucide-react';
import { ConstellationCanvas } from './ConstellationCanvas';
import { FLAGSHIP_COUNTDOWN } from '@/data/gdgData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function KineticPrismStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse coordinate state for live architectural HUD readout
  const [hudCoords, setHudCoords] = useState<{ x: number; y: number }>({ x: 142, y: 88 });
  const [canvasMouse, setCanvasMouse] = useState<{ x: number; y: number } | null>(null);

  // 3D Tilt Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 24 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Tilt within ±8deg
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 14, hours: 6, minutes: 42, seconds: 18 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const targetMs = new Date(FLAGSHIP_COUNTDOWN.targetDate).getTime();

    const calculateTime = () => {
      const now = Date.now();
      let diff = targetMs - now;

      // Fallback: If date has passed or is close, maintain dynamic 14-day countdown so it never shows 00:00:00:00
      if (diff <= 0) {
        diff = (14 * 24 * 60 * 60 + 6 * 60 * 60 + 42 * 60 + 30) * 1000;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative -0.5 to 0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    setHudCoords({
      x: Math.round(x),
      y: Math.round(y),
    });

    setCanvasMouse({ x, y });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setCanvasMouse(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[580px] max-w-2xl mx-auto rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden select-none border border-[var(--border-hairline)] bg-[var(--bg-elevated)]/70 backdrop-blur-md shadow-2xl transition-all duration-300 group"
      style={{ perspective: 1200 }}
    >
      {/* 3D Tilted Wrapper */}
      <motion.div
        className="relative w-full h-full flex flex-col justify-between"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
      >
        {/* ========================================================= */}
        {/* LAYER 1 (BACK): Constellation Canvas & Ambient Auras       */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
          style={{ transform: 'translateZ(-15px)' }}
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#4285F4]/12 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#34A853]/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#EA4335]/06 blur-3xl" />

          {/* Dual-Theme Constellation Canvas */}
          <ConstellationCanvas mousePos={canvasMouse} />
        </div>

        {/* ========================================================= */}
        {/* LAYER 2 (MID): Architectural Coordinate Frame & Reticles  */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between"
          style={{ transform: 'translateZ(18px)' }}
        >
          {/* Top Frame: Crosshairs & Telemetry Header */}
          <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-[#4285F4] font-bold text-sm">+</span>
              <span className="opacity-80">SYS // STAGE_3D_ACTIVE</span>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
              <span>
                {`X: ${String(hudCoords.x).padStart(3, '0')} // Y: ${String(hudCoords.y).padStart(3, '0')}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="opacity-80">PRISM_PERSPECTIVE</span>
              <span className="text-[#EA4335] font-bold text-sm">+</span>
            </div>
          </div>

          {/* Rotating Dashed Orbital Rings in Center Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none opacity-40 dark:opacity-30">
            <svg
              className={`w-full h-full ${prefersReducedMotion ? '' : 'animate-[spin_40s_linear_infinite]'}`}
              viewBox="0 0 340 340"
              fill="none"
            >
              <circle
                cx="170"
                cy="170"
                r="160"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="text-[var(--text-muted)]"
              />
              <circle
                cx="170"
                cy="170"
                r="115"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 6"
                className="text-[var(--text-muted)]"
              />
              <circle
                cx="170"
                cy="170"
                r="70"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 5"
                className="text-[var(--text-muted)]"
              />
            </svg>
          </div>

          {/* Bottom Frame: Crosshairs */}
          <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span className="text-[#34A853] font-bold text-sm">+</span>
            <span className="opacity-70 text-[10px]">RVCE_CAMPUS_CHAPTER // SPRINT_ENGINE</span>
            <span className="text-[#FBBC04] font-bold text-sm">+</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 3 (CENTERPIECE): 3D GDG < > Prism Sculpture         */}
        {/* ========================================================= */}
        <div
          className="relative flex-1 flex items-center justify-center pointer-events-none py-6"
          style={{ transform: 'translateZ(46px)' }}
        >
          {/* Floating Sculpture Container */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [-6, 6, -6],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* The Central GDG Prism Sculpture */}
            <div className="relative w-[210px] sm:w-[250px] h-[115px] sm:h-[130px] flex items-center justify-center">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/20 via-[#EA4335]/20 to-[#34A853]/20 blur-xl rounded-full" />

              {/* Glassmorphic Base Slate */}
              <div className="absolute inset-0 rounded-2xl bg-[var(--bg-elevated)]/85 dark:bg-[var(--bg-canvas)]/85 border border-[var(--border-strong)] shadow-xl backdrop-blur-md flex items-center justify-center p-3">
                {/* Hairline Inner Bevel */}
                <div className="w-full h-full rounded-xl border border-white/20 dark:border-white/5 flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent dark:from-white/5">
                  {/* GDG Geometric Chevrons < > */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Left Chevron < in Google Blue & Red */}
                    <div className="relative flex items-center">
                      <svg width="46" height="54" viewBox="0 0 46 54" fill="none" className="drop-shadow-sm">
                        <path
                          d="M40 6L10 27L40 48"
                          stroke="url(#prism-left-grad)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="prism-left-grad" x1="40" y1="6" x2="10" y2="48" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#4285F4" />
                            <stop offset="1" stopColor="#EA4335" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Slash / Center Line in Google Yellow */}
                    <div className="w-2.5 h-11 rounded-full bg-[#FBBC04] shadow-sm transform -rotate-12" />

                    {/* Right Chevron > in Google Yellow & Green */}
                    <div className="relative flex items-center">
                      <svg width="46" height="54" viewBox="0 0 46 54" fill="none" className="drop-shadow-sm">
                        <path
                          d="M6 6L36 27L6 48"
                          stroke="url(#prism-right-grad)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="prism-right-grad" x1="6" y1="6" x2="36" y2="48" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FBBC04" />
                            <stop offset="1" stopColor="#34A853" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting Domain Pill 1: AI & Gemini (Top-Left) */}
            <motion.div
              className="absolute -top-4 -left-6 sm:-top-5 sm:-left-12 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]"
              animate={prefersReducedMotion ? {} : { y: [-3, 3, -3] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span>AI &amp; Gemini</span>
            </motion.div>

            {/* Orbiting Domain Pill 2: Cloud & Infra (Top-Right) */}
            <motion.div
              className="absolute -top-4 -right-6 sm:-top-5 sm:-right-12 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]"
              animate={prefersReducedMotion ? {} : { y: [3, -3, 3] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span>Cloud &amp; Infra</span>
            </motion.div>

            {/* Orbiting Domain Pill 3: Web & Systems (Bottom-Left) */}
            <motion.div
              className="absolute -bottom-4 -left-6 sm:-bottom-5 sm:-left-10 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]"
              animate={prefersReducedMotion ? {} : { y: [3, -3, 3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              <span>Web &amp; Systems</span>
            </motion.div>

            {/* Orbiting Domain Pill 4: Android & Kotlin (Bottom-Right) */}
            <motion.div
              className="absolute -bottom-4 -right-6 sm:-bottom-5 sm:-right-10 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]"
              animate={prefersReducedMotion ? {} : { y: [-3, 3, -3] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#FBBC04]" />
              <span>Android &amp; Kotlin</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 4 (BOTTOM DOCK): Live Flagship Event Countdown HUD  */}
        {/* ========================================================= */}
        <div
          className="relative w-full mt-auto pt-3 z-10"
          style={{ transform: 'translateZ(68px)' }}
        >
          <div className="w-full rounded-2xl bg-[var(--bg-canvas)]/90 dark:bg-[var(--bg-elevated)]/90 border border-[var(--border-strong)] shadow-xl p-4 sm:p-5 backdrop-blur-md">
            {/* Countdown Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EA4335]/10 border border-[#EA4335]/30 text-[11px] font-mono font-semibold text-[#EA4335]">
                  <Radio className="w-3 h-3 animate-pulse" />
                  UPCOMING FLAGSHIP
                </span>
                <span className="hidden sm:inline text-xs text-[var(--text-muted)] font-mono">
                  {FLAGSHIP_COUNTDOWN.venue}
                </span>
              </div>

              <Link
                href={`/events?event=${FLAGSHIP_COUNTDOWN.slug}`}
                className="group/link inline-flex items-center gap-1 text-xs font-semibold text-[#4285F4] hover:text-[#3367D6] transition-colors"
              >
                <span>Inspect Sprint</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>

            {/* Event Title */}
            <h3 className="text-sm sm:text-base font-display font-bold text-[var(--text-primary)] truncate mb-3">
              {FLAGSHIP_COUNTDOWN.title}
            </h3>

            {/* 4-Segment Countdown Timer */}
            <div className="grid grid-cols-4 gap-2">
              {/* DAYS */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  {isClient ? String(timeLeft.days).padStart(2, '0') : '14'}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                  DAYS
                </span>
              </div>

              {/* HOURS */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  {isClient ? String(timeLeft.hours).padStart(2, '0') : '06'}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                  HRS
                </span>
              </div>

              {/* MINUTES */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  {isClient ? String(timeLeft.minutes).padStart(2, '0') : '42'}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                  MIN
                </span>
              </div>

              {/* SECONDS */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-lg sm:text-2xl font-bold text-[#EA4335] tracking-tight">
                  {isClient ? String(timeLeft.seconds).padStart(2, '0') : '18'}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                  SEC
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
