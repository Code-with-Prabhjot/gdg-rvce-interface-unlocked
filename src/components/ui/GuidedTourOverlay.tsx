'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Compass, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useGuidedTour } from '@/context/GuidedTourContext';

export function GuidedTourOverlay() {
  const {
    isOpen,
    currentStepIndex,
    currentStep,
    steps,
    closeTour,
    nextStep,
    prevStep,
    goToStep,
  } = useGuidedTour();
  const prefersReducedMotion = useReducedMotion();

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;
  const progressPct = ((currentStepIndex + 1) / steps.length) * 100;

  // Pair solid #FBBC04 yellow with #111827 dark ink for >7:1 WCAG AAA contrast,
  // and ensure accessible >=5.0:1 shades behind #FFFFFF text
  const primaryBtnTextColor =
    currentStep.accentHex === '#FBBC04' ? '#111827' : '#FFFFFF';
  const stepPillTextColor =
    currentStep.accentHex === '#FBBC04' ? '#111827' : '#FFFFFF';
  const accessibleSolidHex =
    currentStep.accentHex === '#4285F4'
      ? '#1D4ED8'
      : currentStep.accentHex === '#EA4335'
        ? '#C5221F'
        : currentStep.accentHex === '#34A853'
          ? '#15803D'
          : currentStep.accentHex;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="guided-tour-dock"
          aria-label="Interactive Guided Tour"
          aria-live="polite"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[60] max-w-md w-[calc(100vw-2.5rem)] rounded-2xl bg-[var(--bg-elevated)]/95 backdrop-blur-xl border border-[var(--border-strong)] shadow-2xl overflow-hidden"
        >
          {/* Top Google-Coloured Progress Track */}
          <div className="h-1.5 w-full bg-[var(--bg-subtle)] overflow-hidden">
            <div
              className="h-full transition-all duration-300 ease-out"
              style={{
                width: `${progressPct}%`,
                backgroundColor: currentStep.accentHex,
              }}
            />
          </div>

          <div className="p-4 sm:p-5 space-y-3.5">
            {/* Header Row: Step Pill + Route Chip + Close */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase shadow-2xs shrink-0"
                  style={{
                    backgroundColor: accessibleSolidHex,
                    color: stepPillTextColor,
                  }}
                >
                  <Compass className="w-3 h-3 shrink-0" />
                  <span>STEP {currentStep.stepLabel}</span>
                </span>

                <span className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
                  {currentStep.route}
                </span>
              </div>

              <button
                type="button"
                onClick={closeTour}
                aria-label="Close Interactive Guided Tour"
                className="min-w-[44px] min-h-[44px] md:min-w-[36px] md:min-h-[36px] w-11 h-11 md:w-9 md:h-9 inline-flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-hairline)] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Title & Architectural Description */}
            <div className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-display font-bold text-[var(--text-primary)] leading-snug">
                {currentStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Stepper Dots Row */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Tour stops">
                {steps.map((step, idx) => {
                  const isActive = idx === currentStepIndex;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Jump to step ${idx + 1}: ${step.title}`}
                      onClick={() => goToStep(idx)}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                        isActive ? 'w-6' : 'w-2 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]'
                      }`}
                      style={isActive ? { backgroundColor: step.accentHex } : undefined}
                    />
                  );
                })}
              </div>

              <span className="hidden sm:inline font-mono text-[10px] text-[var(--text-muted)]">
                ← / → step · Esc exit
              </span>
            </div>

            {/* Footer Action Controls */}
            <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={isFirst}
                className="min-h-[44px] md:min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="min-h-[44px] md:min-h-[36px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-mono font-bold shadow-sm hover:opacity-95 transition-all cursor-pointer"
                style={{
                  backgroundColor: accessibleSolidHex,
                  color: primaryBtnTextColor,
                }}
              >
                {isLast ? (
                  <>
                    <span>Finish Tour</span>
                    <Check className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
