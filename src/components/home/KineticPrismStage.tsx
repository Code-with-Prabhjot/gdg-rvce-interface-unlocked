'use client';

import React, { useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Radio, Box, Grid3X3, RotateCcw } from 'lucide-react';
import { ConstellationCanvas } from './ConstellationCanvas';
import { FLAGSHIP_COUNTDOWN } from '@/data/gdgData';

/* ================================================================
   KineticPrismStage — Phase 24
   ================================================================
   • Mounts <WebGLPrismCanvas /> in the center with 3D drag-to-orbit
   • CSS fallback when WebGL unavailable or reduced-motion
   • HUD micro-controls: Wireframe toggle + Reset View
   • Preserves lg:h-[470px] max-h-[490px] viewport budget
   ================================================================ */

const WebGLPrismCanvas = lazy(() =>
  import('./WebGLPrismCanvas').then(mod => ({ default: mod.WebGLPrismCanvas }))
);

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

  // 3D WebGL controls
  const [wireframeMode, setWireframeMode] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

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

  // ── Detect WebGL ──
  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const ctx = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      setWebglSupported(!!ctx);
    } catch {
      setWebglSupported(false);
    }
  }, []);

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

  const toggleWireframe = useCallback(() => {
    setWireframeMode(prev => !prev);
  }, []);

  const resetView = useCallback(() => {
    setResetTrigger(prev => prev + 1);
  }, []);

  // Show CSS fallback when WebGL not available or reduced motion
  const showCSSFallback = webglSupported === false || !!prefersReducedMotion;
  const showWebGL = webglSupported === true && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      data-tour="webgl-prism"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[455px] sm:min-h-[465px] lg:h-[470px] lg:max-h-[490px] max-w-2xl mx-auto rounded-3xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden select-none border border-[var(--border-hairline)] bg-[var(--bg-elevated)]/75 backdrop-blur-md shadow-2xl transition-all duration-300 group"
      style={{ perspective: 1200 }}
    >
      {/* 3D Tilted Wrapper */}
      <motion.div
        className="relative w-full h-full flex flex-col justify-between overflow-hidden"
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
          <div className="absolute top-1/4 left-1/4 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#4285F4]/12 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-44 h-44 sm:w-64 sm:h-64 rounded-full bg-[#34A853]/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-[#EA4335]/06 blur-3xl pointer-events-none" />

          {/* Dual-Theme Constellation Canvas */}
          <ConstellationCanvas mousePos={canvasMouse} />
        </div>

        {/* ========================================================= */}
        {/* LAYER 2 (MID): Architectural Coordinate Frame + HUD Ctrls  */}
        {/* ========================================================= */}
        <div
          className="relative pointer-events-none flex items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-[var(--text-muted)] tracking-wider z-20"
          style={{ transform: 'translateZ(18px)' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="text-[var(--accent-blue-text)] font-bold text-sm">+</span>
            <span>
              <span className="hidden sm:inline">SYS // </span>STAGE_3D
            </span>
          </div>

          {/* HUD Coordinate Readout */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[var(--bg-subtle)]/90 border border-[var(--border-hairline)] backdrop-blur-xs text-[var(--text-secondary)] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse shrink-0" />
            <span>
              {`X: ${String(hudCoords.x).padStart(3, '0')} // Y: ${String(hudCoords.y).padStart(3, '0')}`}
            </span>
          </div>

          {/* HUD Micro-Controls (Wireframe + Reset) */}
          <div className="flex items-center gap-1.5 pointer-events-auto shrink-0">
            <button
              type="button"
              onClick={toggleWireframe}
              aria-pressed={wireframeMode}
              aria-label={wireframeMode ? 'Disable wireframe mode' : 'Enable wireframe mode'}
              className={`min-h-[32px] inline-flex items-center gap-1 px-2 py-1 rounded-md font-mono text-[11px] font-semibold border transition-all duration-200 cursor-pointer ${
                wireframeMode
                  ? 'bg-[#4285F4]/15 border-[#4285F4]/50 text-[var(--accent-blue-text)]'
                  : 'bg-[var(--bg-subtle)]/90 border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {wireframeMode ? (
                <Grid3X3 className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Box className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="hidden sm:inline">Wire</span>
            </button>

            <button
              type="button"
              onClick={resetView}
              aria-label="Reset 3D view to default angle"
              className="min-h-[32px] inline-flex items-center gap-1 px-2 py-1 rounded-md font-mono text-[11px] font-semibold bg-[var(--bg-subtle)]/90 border border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-strong)] transition-all duration-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 3 (CENTERPIECE): 3D WebGL < > Monolith OR CSS Fallback */}
        {/* ========================================================= */}
        <div
          className="relative flex-1 min-h-[195px] sm:min-h-[215px] flex items-center justify-center my-1.5"
          style={{ transform: 'translateZ(46px)' }}
        >
          {/* 3D WebGL Canvas — mounted over center area */}
          {showWebGL && (
            <Suspense fallback={null}>
              <WebGLPrismCanvas
                wireframeMode={wireframeMode}
                resetTrigger={resetTrigger}
                reducedMotion={!!prefersReducedMotion}
              />
            </Suspense>
          )}

          {/* CSS Fallback Prism (when WebGL unavailable or reduced motion) */}
          {showCSSFallback && (
            <motion.div
              className="relative flex items-center justify-center pointer-events-none"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [-4, 4, -4],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* The Central GDG Prism Sculpture (CSS 3D Fallback) */}
              <div className="relative w-[176px] sm:w-[224px] h-[92px] sm:h-[112px] flex items-center justify-center">
                {/* Outer Glow Halo */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/20 via-[#EA4335]/20 to-[#34A853]/20 blur-xl rounded-full" />

                {/* Glassmorphic Base Slate */}
                <div className="absolute inset-0 rounded-2xl bg-[var(--bg-elevated)]/90 dark:bg-[var(--bg-canvas)]/90 border border-[var(--border-strong)] shadow-xl backdrop-blur-md flex items-center justify-center p-2.5 sm:p-3">
                  {/* Hairline Inner Bevel */}
                  <div className="w-full h-full rounded-xl border border-[var(--border-hairline)] flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent dark:from-white/5">
                    {/* GDG Geometric Chevrons < > */}
                    <div className="flex items-center gap-3 sm:gap-5">
                      {/* Left Chevron < in Google Blue & Red */}
                      <div className="relative flex items-center">
                        <svg width="36" height="44" viewBox="0 0 46 54" fill="none" className="w-7 h-8 sm:w-10 sm:h-11 drop-shadow-sm">
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
                      <div className="w-2 sm:w-2.5 h-7 sm:h-10 rounded-full bg-[#FBBC04] shadow-sm transform -rotate-12" />

                      {/* Right Chevron > in Google Yellow & Green */}
                      <div className="relative flex items-center">
                        <svg width="36" height="44" viewBox="0 0 46 54" fill="none" className="w-7 h-8 sm:w-10 sm:h-11 drop-shadow-sm">
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
            </motion.div>
          )}

          {/* Corner Domain Pills — always visible, z-30 above WebGL */}
          {/* Orbiting Domain Pill 1: AI & Gemini (Top-Left) */}
          <motion.div
            data-prism-pill="top-left"
            className="absolute top-1 left-0 sm:top-1.5 sm:left-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap z-30 pointer-events-none"
            animate={prefersReducedMotion ? {} : { y: [-2, 2, -2] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EA4335] shrink-0" />
            <span>AI &amp; Gemini</span>
          </motion.div>

          {/* Orbiting Domain Pill 2: Cloud & Infra (Top-Right) */}
          <motion.div
            data-prism-pill="top-right"
            className="absolute top-1 right-0 sm:top-1.5 sm:right-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap z-30 pointer-events-none"
            animate={prefersReducedMotion ? {} : { y: [2, -2, 2] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4285F4] shrink-0" />
            <span>Cloud &amp; Infra</span>
          </motion.div>

          {/* Orbiting Domain Pill 3: Web & Systems (Bottom-Left) */}
          <motion.div
            data-prism-pill="bottom-left"
            className="absolute bottom-1 left-0 sm:bottom-1.5 sm:left-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap z-30 pointer-events-none"
            animate={prefersReducedMotion ? {} : { y: [2, -2, 2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#34A853] shrink-0" />
            <span>Web &amp; Systems</span>
          </motion.div>

          {/* Orbiting Domain Pill 4: Android & Kotlin (Bottom-Right) */}
          <motion.div
            data-prism-pill="bottom-right"
            className="absolute bottom-1 right-0 sm:bottom-1.5 sm:right-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap z-30 pointer-events-none"
            animate={prefersReducedMotion ? {} : { y: [-2, 2, -2] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FBBC04] shrink-0" />
            <span>Android &amp; Kotlin</span>
          </motion.div>
        </div>

        {/* Interaction hint — above the countdown dock */}
        {showWebGL && (
          <div
            data-prism-hint="true"
            className="relative flex justify-center py-1 z-10 pointer-events-none"
            style={{ transform: 'translateZ(50px)' }}
          >
            <span className="font-mono text-[10px] text-[var(--text-muted)]/75 tracking-widest uppercase">
              DRAG TO ORBIT 3D · &lt; &gt;
            </span>
          </div>
        )}

        {/* ========================================================= */}
        {/* LAYER 4 (BOTTOM DOCK): Live Flagship Event Countdown HUD  */}
        {/* ========================================================= */}
        <div
          className="relative w-full mt-auto pt-1 z-20 pointer-events-auto"
          style={{ transform: 'translateZ(68px)' }}
        >
          <div className="w-full rounded-2xl bg-[var(--bg-canvas)]/95 dark:bg-[var(--bg-elevated)]/95 border border-[var(--border-strong)] shadow-xl p-3 sm:p-4 backdrop-blur-md">
            {/* Countdown Header */}
            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EA4335]/10 border border-[#EA4335]/30 text-[10px] sm:text-[11px] font-mono font-semibold text-[var(--accent-red-text)] whitespace-nowrap">
                  <Radio className="w-3 h-3 animate-pulse shrink-0" />
                  UPCOMING FLAGSHIP
                </span>
                <span className="hidden sm:inline text-xs text-[var(--text-muted)] font-mono truncate">
                  {FLAGSHIP_COUNTDOWN.venue}
                </span>
              </div>

              <Link
                href={`/events?event=${FLAGSHIP_COUNTDOWN.slug}`}
                className="group/link inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue-text)] hover:underline transition-colors whitespace-nowrap shrink-0 min-h-[32px]"
              >
                <span>Inspect Sprint</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>

            {/* Event Title */}
            <h3 className="text-xs sm:text-sm font-display font-bold text-[var(--text-primary)] truncate mb-2">
              {FLAGSHIP_COUNTDOWN.title}
            </h3>

            {/* 4-Segment Countdown Timer */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {/* DAYS */}
              <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-base sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  {isClient ? String(timeLeft.days).padStart(2, '0') : '14'}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                  DAYS
                </span>
              </div>

              {/* HOURS */}
              <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-base sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  {isClient ? String(timeLeft.hours).padStart(2, '0') : '06'}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                  HRS
                </span>
              </div>

              {/* MINUTES */}
              <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-base sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
                  {isClient ? String(timeLeft.minutes).padStart(2, '0') : '42'}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold text-[var(--text-muted)] tracking-wider">
                  MIN
                </span>
              </div>

              {/* SECONDS */}
              <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                <span className="font-mono text-base sm:text-xl font-bold text-[var(--accent-red-text)] tracking-tight">
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
