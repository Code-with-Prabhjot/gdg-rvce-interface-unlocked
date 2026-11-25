'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { COMMUNITY_SCENES, CommunityScene, GoogleAccent } from '@/data/gdgData';

function getGoogleAccentHex(accent: GoogleAccent) {
  switch (accent) {
    case 'blue':
      return '#4285F4';
    case 'red':
      return '#EA4335';
    case 'yellow':
      return '#FBBC04';
    case 'green':
      return '#34A853';
    default:
      return '#4285F4';
  }
}

function getCategoryBadgeClass(accent: GoogleAccent) {
  switch (accent) {
    case 'blue':
      return 'bg-[#4285F4] text-white border-[#4285F4]';
    case 'red':
      return 'bg-[#EA4335] text-white border-[#EA4335]';
    case 'yellow':
      // WCAG AAA high contrast with dark ink
      return 'bg-[#FBBC04] text-[#111827] font-bold border-[#FBBC04]';
    case 'green':
      return 'bg-[#34A853] text-white border-[#34A853]';
    default:
      return 'bg-[#4285F4] text-white border-[#4285F4]';
  }
}

export function CommunityScenesSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSceneId, setActiveSceneId] = useState<string>(COMMUNITY_SCENES[0].id);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const activeIndex = COMMUNITY_SCENES.findIndex((s) => s.id === activeSceneId);
  const currentScene: CommunityScene =
    activeIndex !== -1 ? COMMUNITY_SCENES[activeIndex] : COMMUNITY_SCENES[0];
  const accentHex = getGoogleAccentHex(currentScene.googleColor);

  const handleNextScene = useCallback(() => {
    const nextIdx = (activeIndex + 1) % COMMUNITY_SCENES.length;
    setActiveSceneId(COMMUNITY_SCENES[nextIdx].id);
  }, [activeIndex]);

  const handlePrevScene = useCallback(() => {
    const prevIdx = (activeIndex - 1 + COMMUNITY_SCENES.length) % COMMUNITY_SCENES.length;
    setActiveSceneId(COMMUNITY_SCENES[prevIdx].id);
  }, [activeIndex]);

  // Keyboard navigation when lightbox is active
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        handleNextScene();
      } else if (e.key === 'ArrowLeft') {
        handlePrevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isLightboxOpen, handleNextScene, handlePrevScene]);

  return (
    <section
      id="community-scenes"
      className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6 lg:space-y-8 scroll-mt-24"
    >
      {/* ============================================================= */}
      {/* 1. SECTION HEADER WITH TELEMETRY EYEBROW                      */}
      {/* ============================================================= */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2.5"
      >
        {/* Telemetry Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FBBC04] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] tracking-wider">
            [ 04 // IN THE BUILD ROOM ]
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
              Where RVCE builders ship together.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              From late-evening open-source code jams to auditorium broadcasts and hands-on lab
              sprints—select any scene on the right to inspect it live on stage.
            </p>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-2 rounded-xl border border-[var(--border-hairline)] self-start lg:self-auto shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-yellow-text)]" />
            <span>ORIGINAL VECTOR SUITE // 10 SCENES</span>
          </div>
        </div>
      </motion.div>

      {/* ============================================================= */}
      {/* 2. SIDE-BY-SIDE MASTER-DETAIL STUDIO LAYOUT                   */}
      {/* Left: 16:9 Cinema Stage (col-8) · Right: 10-Scene Rail (col-4)*/}
      {/* ============================================================= */}
      <motion.div
        data-tour="community-scenes"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
      >
        {/* LEFT COLUMN (lg:col-span-8): 16:9 Editorial Scene Cinema Frame */}
        <div className="lg:col-span-8 relative rounded-2xl border border-[var(--border-strong)] bg-[#090C10] overflow-hidden shadow-xl group flex flex-col justify-between">
          {/* Corner Crosshairs */}
          <div className="absolute top-3 left-3 text-[11px] font-mono text-[#CBD5E1]/70 select-none pointer-events-none z-30">
            +
          </div>
          <div className="absolute top-3 right-3 text-[11px] font-mono text-[#CBD5E1]/70 select-none pointer-events-none z-30">
            +
          </div>

          {/* Live Scene Telemetry Header Bar */}
          <div className="absolute top-0 inset-x-0 h-12 px-4 sm:px-5 z-30 flex items-center justify-between bg-gradient-to-b from-[#090C10]/90 via-[#090C10]/60 to-transparent">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: accentHex }}
              />
              <span className="font-mono text-xs font-bold text-[#F8FAFC] tracking-wider truncate">
                {currentScene.code} · {currentScene.venue.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(
                  currentScene.googleColor
                )}`}
              >
                {currentScene.category}
              </span>

              {/* Expand Fullscreen Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Expand scene illustration in fullscreen lightbox"
                className="min-w-[40px] min-h-[36px] inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B0F17]/90 hover:bg-[#0B0F17] text-[#F8FAFC] border border-white/25 backdrop-blur-md transition-all duration-200 text-xs font-mono font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand Fullscreen ⤢</span>
              </button>
            </div>
          </div>

          {/* 16:9 Cinema Aspect Stage */}
          <div
            className="relative w-full aspect-video max-h-[460px] bg-[#090C10] cursor-pointer overflow-hidden"
            onClick={() => setIsLightboxOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={currentScene.image}
                  alt={currentScene.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
                />
              </motion.div>
            </AnimatePresence>

            {/* High-Contrast Bottom Caption Scrim */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-[#090C10]/95 via-[#090C10]/80 to-transparent z-20 pointer-events-none">
              <div className="space-y-1.5 pointer-events-auto">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="sm:hidden inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[#0B0F17]/90 text-[#F8FAFC] border border-white/20">
                    {currentScene.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#CBD5E1]">
                    <MapPin className="w-3.5 h-3.5 text-[#F87171]" />
                    <span>{currentScene.venue}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-display font-bold text-[#F8FAFC] tracking-tight">
                  {currentScene.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-2xl line-clamp-2">
                  {currentScene.caption}
                </p>

                {/* 3 Technical Highlight Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentScene.highlights.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#0B0F17]/85 border border-white/20 text-[#F8FAFC] backdrop-blur-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 4-Color Accent Border */}
          <div
            className="h-1 w-full transition-colors duration-300 shrink-0"
            style={{ backgroundColor: accentHex }}
          />
        </div>

        {/* RIGHT COLUMN (lg:col-span-4): Scrollable 10-Scene Selector Rail */}
        <div className="lg:col-span-4 flex flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-3 shadow-lg max-h-[464px]">
          <div className="flex items-center justify-between px-1.5 pb-2.5 mb-2 border-b border-[var(--border-hairline)] shrink-0">
            <span className="font-mono text-[11px] font-bold tracking-wider text-[var(--text-primary)]">
              SCENE REEL // 10 SCENES
            </span>
            <span className="font-mono text-[10px] text-[var(--text-muted)]">
              {String(activeIndex + 1).padStart(2, '0')} / {COMMUNITY_SCENES.length}
            </span>
          </div>

          <div
            role="listbox"
            aria-label="Select campus build scene"
            className="flex-1 overflow-y-auto pr-1 space-y-2"
          >
            {COMMUNITY_SCENES.map((scene) => {
              const isActive = scene.id === activeSceneId;
              const sceneAccent = getGoogleAccentHex(scene.googleColor);

              return (
                <button
                  key={scene.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setActiveSceneId(scene.id)}
                  aria-label={`Switch to ${scene.title}`}
                  className={`w-full relative group/thumb rounded-xl overflow-hidden border transition-all duration-200 text-left p-2 flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                    isActive
                      ? 'bg-[var(--bg-subtle)] border-2 shadow-sm'
                      : 'bg-[var(--bg-canvas)]/70 border-[var(--border-hairline)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]/50'
                  }`}
                  style={isActive ? { borderColor: sceneAccent } : undefined}
                >
                  {/* 16:9 Mini-Thumbnail */}
                  <div className="relative w-20 sm:w-24 aspect-video rounded-lg overflow-hidden bg-[#090C10] shrink-0 border border-[var(--border-hairline)]">
                    <Image
                      src={scene.image}
                      alt={scene.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                    />
                    <span className="absolute bottom-1 left-1 px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-[#0B0F17]/90 text-[#F8FAFC] border border-white/20">
                      {scene.code.replace('SCENE // ', 'S//')}
                    </span>
                  </div>

                  {/* Scene Info */}
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider"
                        style={{
                          color:
                            scene.googleColor === 'yellow'
                              ? 'var(--accent-yellow-text)'
                              : scene.googleColor === 'red'
                              ? 'var(--accent-red-text)'
                              : scene.googleColor === 'green'
                              ? 'var(--accent-green-text)'
                              : 'var(--accent-blue-text)',
                        }}
                      >
                        {scene.code}
                      </span>
                      {isActive && (
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: sceneAccent }}
                        />
                      )}
                    </div>
                    <p
                      className="text-xs font-display font-bold text-[var(--text-primary)] truncate"
                      title={scene.title}
                    >
                      {scene.title}
                    </p>
                    <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                      {scene.category} · {scene.venue.split(',')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ============================================================= */}
      {/* 4. FULLSCREEN LIGHTBOX MODAL                                  */}
      {/* ============================================================= */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLightboxOpen(false);
              }
            }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`${currentScene.title} - Fullscreen Inspection`}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-20">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: accentHex }}
                  />
                  <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                    {currentScene.code} · {currentScene.venue.toUpperCase()}
                  </span>
                  <span className="text-white/40 font-mono text-xs hidden sm:inline">|</span>
                  <span className="font-mono text-xs text-[#94A3B8] hidden sm:inline">
                    {activeIndex + 1} of {COMMUNITY_SCENES.length}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                  {currentScene.title}
                </h3>
              </div>

              {/* Close Button (44x44px minimum tap target) */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close fullscreen lightbox (Escape)"
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Center Cinema Frame with Side Step Chevrons */}
            <div className="relative w-full max-w-6xl mx-auto my-auto aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-2xl flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentScene.image}
                    alt={currentScene.title}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev Button (44x44px tap target) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevScene();
                }}
                aria-label="Previous community scene (ArrowLeft)"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button (44x44px tap target) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextScene();
                }}
                aria-label="Next community scene (ArrowRight)"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer Bar */}
            <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/80 z-20 pt-2">
              <p className="line-clamp-2 max-w-3xl text-center sm:text-left text-white/90 font-sans text-xs sm:text-sm">
                {currentScene.caption}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden md:inline text-white/50 text-[11px]">
                  Use Arrow keys to step ·
                </span>
                <div className="flex gap-1.5">
                  {COMMUNITY_SCENES.map((scene, idx) => (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => setActiveSceneId(scene.id)}
                      aria-label={`Jump to scene ${idx + 1}`}
                      className={`min-w-[32px] min-h-[32px] w-8 h-8 rounded-lg flex items-center justify-center border transition-all text-[11px] font-bold ${
                        scene.id === activeSceneId
                          ? 'border-white bg-white text-black'
                          : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
