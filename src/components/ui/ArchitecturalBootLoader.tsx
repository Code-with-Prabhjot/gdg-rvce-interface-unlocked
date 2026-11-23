'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const BOOT_DURATION_MS = 900;
const SESSION_STORAGE_KEY = 'gdg-rvce-boot-seen';

export function ArchitecturalBootLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('INIT // GDG_RVCE_PORTAL');

  const dismissBoot = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors in sandboxed contexts
    }
    setIsVisible(false);
  }, []);

  const startBootSequence = useCallback(() => {
    if (prefersReducedMotion) {
      dismissBoot();
      return;
    }

    setIsVisible(true);
    setProgress(0);
    setStatusMessage('INIT // GDG_RVCE_PORTAL');

    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / BOOT_DURATION_MS) * 100));
      setProgress(pct);

      if (pct < 35) {
        setStatusMessage('INIT // GDG_RVCE_PORTAL');
      } else if (pct < 75) {
        setStatusMessage('LOADING // ARCHITECTURAL_MODULES');
      } else {
        setStatusMessage('READY // INTERFACE_UNLOCKED');
      }

      if (elapsed >= BOOT_DURATION_MS) {
        clearInterval(interval);
        setTimeout(() => {
          dismissBoot();
        }, 80);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, dismissBoot]);

  // Initial check on mount
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    try {
      const alreadySeen = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!alreadySeen) {
        startBootSequence();
      }
    } catch {
      // Fallback
      startBootSequence();
    }
  }, [prefersReducedMotion, startBootSequence]);

  // Listen for replay-boot event dispatched by CLI or evaluator
  useEffect(() => {
    const handleReplay = () => {
      startBootSequence();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        dismissBoot();
      }
    };

    window.addEventListener('gdg:replay-boot', handleReplay);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('gdg:replay-boot', handleReplay);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, startBootSequence, dismissBoot]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="architectural-boot-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: prefersReducedMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-canvas)] text-[var(--text-primary)] select-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle Architectural Blueprint Grid Background */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none" />

          {/* Vignette Depth Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-canvas)]/60 via-transparent to-[var(--bg-canvas)]/90 pointer-events-none" />

          {/* Corner Coordinate & Telemetry Ticks */}
          <div className="absolute top-6 left-6 font-mono text-[10px] text-[var(--text-muted)] tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] animate-ping" />
            <span>12.9237° N · 77.4987° E</span>
          </div>

          <div className="absolute top-6 right-6 font-mono text-[10px] text-[var(--text-muted)] tracking-wider hidden sm:flex items-center gap-2">
            <span>CAMPUS // RVCE_BENGALURU</span>
            <span className="text-[#34A853]">●</span>
          </div>

          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[var(--text-muted)] tracking-wider hidden sm:flex items-center gap-2">
            <span className="text-[#FBBC04]">▲</span>
            <span>GDG_RVCE // INTERFACE_UNLOCKED</span>
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            <button
              type="button"
              onClick={dismissBoot}
              className="px-2.5 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)]/80 hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              SKIP [ESC]
            </button>
          </div>

          {/* Center Stage: GDG < > Emblem & Progress Choreography */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 px-4">
            {/* The Official GDG Chevron Mark animating left & right brackets */}
            <div className="relative w-32 h-16 sm:w-40 sm:h-20 flex items-center justify-center">
              <svg
                viewBox="0 0 120 64"
                fill="none"
                className="w-full h-full drop-shadow-md overflow-visible"
              >
                {/* Left Bracket `<` (Red #EA4335 & Blue #4285F4) glides from -24px */}
                <motion.g
                  initial={{ x: prefersReducedMotion ? 0 : -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <path
                    d="M46 11L22 32"
                    stroke="#EA4335"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 32L46 53"
                    stroke="#4285F4"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.g>

                {/* Right Bracket `>` (Green #34A853 & Yellow #FBBC04) glides from +24px */}
                <motion.g
                  initial={{ x: prefersReducedMotion ? 0 : 24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <path
                    d="M74 11L98 32"
                    stroke="#34A853"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M98 32L74 53"
                    stroke="#FBBC04"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.g>
              </svg>
            </div>

            {/* JetBrains Mono Status Line cycling rapidly */}
            <div className="h-6 flex items-center justify-center">
              <motion.span
                key={statusMessage}
                initial={{ opacity: 0.4, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-xs font-semibold tracking-wider text-[var(--text-secondary)] text-center"
              >
                {statusMessage}
              </motion.span>
            </div>

            {/* Crisp 180px 4-Colour Progress Hairline */}
            <div className="relative w-[180px] h-[3px] rounded-full bg-[var(--border-hairline)] overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)',
                }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Architectural Chapter Designation */}
            <p className="font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase">
              GDG on Campus · RVCE Bengaluru
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
