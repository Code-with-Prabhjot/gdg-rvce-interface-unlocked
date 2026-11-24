'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PILLARS_DATA, PillarItem, GoogleAccent } from '@/data/gdgData';

// -----------------------------------------------------------------------------
// HELPER: Google Accent Theme Tokens
// -----------------------------------------------------------------------------
function getPillarAccentStyles(accent: GoogleAccent) {
  switch (accent) {
    case 'blue':
      return {
        hex: '#4285F4',
        glowBg: 'rgba(66, 133, 244, 0.12)',
        borderColor: 'group-hover:border-[#4285F4]/50',
        badgeClass: 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/30',
        chipHover: 'hover:border-[#4285F4] hover:text-[#4285F4]',
        dotColor: 'bg-[#4285F4]',
      };
    case 'red':
      return {
        hex: '#EA4335',
        glowBg: 'rgba(234, 67, 53, 0.12)',
        borderColor: 'group-hover:border-[#EA4335]/50',
        badgeClass: 'bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/30',
        chipHover: 'hover:border-[#EA4335] hover:text-[#EA4335]',
        dotColor: 'bg-[#EA4335]',
      };
    case 'yellow':
      return {
        hex: '#FBBC04',
        glowBg: 'rgba(251, 188, 4, 0.14)',
        borderColor: 'group-hover:border-[#FBBC04]/50',
        badgeClass: 'bg-[#FBBC04]/20 text-[#111827] dark:text-[#FBBC04] border-[#FBBC04]/40 font-semibold',
        chipHover: 'hover:border-[#FBBC04] hover:text-[#B45309] dark:hover:text-[#FBBC04]',
        dotColor: 'bg-[#FBBC04]',
      };
    case 'green':
      return {
        hex: '#34A853',
        glowBg: 'rgba(52, 168, 83, 0.12)',
        borderColor: 'group-hover:border-[#34A853]/50',
        badgeClass: 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/30',
        chipHover: 'hover:border-[#34A853] hover:text-[#34A853]',
        dotColor: 'bg-[#34A853]',
      };
  }
}

// -----------------------------------------------------------------------------
// TILE 1: Hands-On Build Labs Simulator (Blue #4285F4)
// Interactive Cloud Run Request Pipeline Simulator
// -----------------------------------------------------------------------------
function HandsOnPipelineSimulator() {
  const [protocol, setProtocol] = useState<'REST' | 'SSE'>('REST');
  const [traceStep, setTraceStep] = useState<0 | 1 | 2 | 3>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const handleRunTrace = () => {
    if (isRunning) return;
    clearAllTimeouts();
    setIsRunning(true);
    setTraceStep(1); // 0ms: Node 1 Edge Ingress

    const t1 = setTimeout(() => {
      setTraceStep(2); // 400ms: Node 2 Cloud Run Runtime
    }, 400);

    const t2 = setTimeout(() => {
      setTraceStep(3); // 800ms: Node 3 Verified 200 OK
    }, 800);

    const t3 = setTimeout(() => {
      setIsRunning(false); // 1200ms: Completed
    }, 1200);

    timeoutsRef.current = [t1, t2, t3];
  };

  const handleReset = () => {
    clearAllTimeouts();
    setIsRunning(false);
    setTraceStep(0);
  };

  return (
    <div className="w-full rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 sm:p-4 relative flex flex-col justify-between select-none group/diag">
      {/* Background architectural micro-grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="bento-grid-blue" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.8" fill="var(--color-border-strong)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-grid-blue)" />
      </svg>

      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 z-20">
        {/* Protocol Mode Toggle */}
        <div className="inline-flex items-center p-0.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-2xs">
          <button
            type="button"
            onClick={() => setProtocol('REST')}
            className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md min-h-[36px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
              protocol === 'REST'
                ? 'bg-[#4285F4] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
            aria-label="Select REST protocol for trace"
          >
            REST
          </button>
          <button
            type="button"
            onClick={() => setProtocol('SSE')}
            className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md min-h-[36px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
              protocol === 'SSE'
                ? 'bg-[#4285F4] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
            aria-label="Select SSE Stream protocol for trace"
          >
            SSE Stream
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {traceStep > 0 && !isRunning && (
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all min-h-[36px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              aria-label="Reset Cloud Run Trace Simulator"
            >
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleRunTrace}
            disabled={isRunning}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all min-h-[36px] flex items-center gap-1.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4] ${
              isRunning
                ? 'bg-[#4285F4]/70 text-white cursor-wait'
                : 'bg-[#4285F4] hover:bg-[#3367D6] text-white hover:shadow-md'
            }`}
            aria-label="Run Cloud Run Request Pipeline Trace"
          >
            <span>{isRunning ? 'Tracing...' : 'Run Trace ▶'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Schematic SVG */}
      <div className="w-full h-32 sm:h-36 flex items-center justify-center relative z-10">
        <svg
          viewBox="0 0 540 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[500px] transition-transform duration-500 group-hover:scale-[1.01]"
          aria-hidden="true"
        >
          {/* Connecting Line 1 */}
          <line
            x1="105"
            y1="60"
            x2="210"
            y2="60"
            stroke={traceStep >= 1 ? '#4285F4' : 'var(--border-strong)'}
            strokeWidth={traceStep >= 1 ? '2.5' : '1.5'}
            strokeDasharray={traceStep >= 1 ? 'none' : '4 4'}
            className="transition-all duration-300"
          />

          {/* Connecting Line 2 */}
          <line
            x1="330"
            y1="60"
            x2="410"
            y2="60"
            stroke={traceStep >= 2 ? '#4285F4' : 'var(--border-strong)'}
            strokeWidth={traceStep >= 2 ? '2.5' : '1.5'}
            strokeDasharray={traceStep >= 2 ? 'none' : '4 4'}
            className="transition-all duration-300"
          />

          {/* Dynamic Traveling Pulses */}
          {isRunning && traceStep === 1 && (
            <circle cx="155" cy="60" r="4.5" fill="#4285F4" className="animate-ping" />
          )}
          {isRunning && traceStep === 2 && (
            <circle cx="370" cy="60" r="4.5" fill="#4285F4" className="animate-ping" />
          )}

          {/* Node 1: Client / Edge Ingress */}
          <g className="transition-all duration-300">
            <rect
              x="20"
              y="26"
              width="85"
              height="68"
              rx="8"
              fill={traceStep >= 1 ? 'rgba(66, 133, 244, 0.18)' : 'var(--bg-elevated)'}
              stroke={traceStep >= 1 ? '#4285F4' : 'var(--border-strong)'}
              strokeWidth={traceStep >= 1 ? '2' : '1.5'}
              className="transition-colors duration-300"
            />
            <text
              x="62"
              y="46"
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              EDGE INGRESS
            </text>
            <text
              x="62"
              y="62"
              textAnchor="middle"
              fill={traceStep >= 1 ? '#4285F4' : 'var(--text-muted)'}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fontWeight={traceStep >= 1 ? 'bold' : 'normal'}
            >
              {protocol}
            </text>
            <text
              x="62"
              y="78"
              textAnchor="middle"
              fill={traceStep >= 1 ? '#34A853' : 'var(--text-muted)'}
              fontSize="8"
              fontFamily="var(--font-mono)"
            >
              {traceStep >= 1 ? 'CONNECTED' : 'IDLE'}
            </text>
            <circle
              cx="32"
              cy="38"
              r="2.5"
              fill={traceStep >= 1 ? '#34A853' : 'var(--text-muted)'}
            />
          </g>

          {/* Node 2: Cloud Run Container Runtime */}
          <g className="transition-all duration-300">
            <rect
              x="210"
              y="18"
              width="120"
              height="84"
              rx="10"
              fill={traceStep >= 2 ? 'rgba(66, 133, 244, 0.22)' : 'var(--bg-elevated)'}
              stroke={traceStep >= 2 ? '#4285F4' : 'var(--border-strong)'}
              strokeWidth={traceStep >= 2 ? '2.5' : '1.5'}
              className="transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(66,133,244,0.18)]"
            />
            <rect
              x="220"
              y="24"
              width="100"
              height="16"
              rx="4"
              fill={traceStep >= 2 ? 'rgba(66, 133, 244, 0.3)' : 'rgba(66, 133, 244, 0.1)'}
            />
            <text
              x="270"
              y="36"
              textAnchor="middle"
              fill="#4285F4"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              CLOUD RUN RUNTIME
            </text>
            <text
              x="270"
              y="60"
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              {traceStep >= 2 ? (protocol === 'REST' ? 'CONTAINER // 8ms' : 'STREAM // 18ms') : 'CONTAINER STANDBY'}
            </text>
            <text
              x="270"
              y="76"
              textAnchor="middle"
              fill={traceStep >= 2 ? '#34A853' : 'var(--text-muted)'}
              fontSize="8"
              fontFamily="var(--font-mono)"
            >
              REGION: ASIA-SOUTH1 (BLR)
            </text>
            <text
              x="270"
              y="90"
              textAnchor="middle"
              fill="var(--text-muted)"
              fontSize="7.5"
              fontFamily="var(--font-mono)"
            >
              {traceStep >= 2 ? 'STATE: ACTIVE_EXEC' : 'STATE: SCALE_TO_ZERO'}
            </text>
          </g>

          {/* Node 3: Storage & Verified 200 OK */}
          <g className="transition-all duration-300">
            <rect
              x="410"
              y="26"
              width="105"
              height="68"
              rx="8"
              fill={traceStep === 3 ? 'rgba(52, 168, 83, 0.18)' : 'var(--bg-elevated)'}
              stroke={traceStep === 3 ? '#34A853' : 'var(--border-strong)'}
              strokeWidth={traceStep === 3 ? '2' : '1.5'}
              className="transition-colors duration-300"
            />
            <text
              x="462"
              y="46"
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              RESPONSE
            </text>
            <text
              x="462"
              y="62"
              textAnchor="middle"
              fill={traceStep === 3 ? '#34A853' : 'var(--text-muted)'}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              {traceStep === 3 ? '200 OK' : 'WAITING'}
            </text>
            <text
              x="462"
              y="78"
              textAnchor="middle"
              fill="var(--text-muted)"
              fontSize="8"
              fontFamily="var(--font-mono)"
            >
              {traceStep === 3 ? 'PAYLOAD VERIFIED' : 'NO INGRESS'}
            </text>
            <circle
              cx="495"
              cy="38"
              r="2.5"
              fill={traceStep === 3 ? '#34A853' : 'var(--text-muted)'}
            />
          </g>
        </svg>
      </div>

      {/* Telemetry Footer */}
      <div className="w-full pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono z-20">
        <span className="font-semibold text-[#4285F4]">
          {traceStep === 3
            ? 'STATUS: 200 OK · TRACE: CLOUD_RUN_BLR'
            : traceStep > 0
            ? `STATUS: STEP 0${traceStep} // IN_TRANSIT · TRACE: CLOUD_RUN_BLR`
            : `STATUS: IDLE · READY FOR TRACE [${protocol}]`}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">
          {traceStep === 3 ? 'VERIFIED ✓' : 'READY'}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TILE 2: Campus Hackathons Simulator (Red `#EA4335`)
// Interactive 24-Hour Sprint Milestone Switcher
// -----------------------------------------------------------------------------
function HackathonIsometricSimulator({ emoteBadge }: { emoteBadge?: string }) {
  const [phase, setPhase] = useState<'00H' | '12H' | '24H'>('12H');

  return (
    <div className="w-full rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 sm:p-4 relative flex flex-col justify-between select-none group/hack">
      {/* Top Controls Header with 3 Tactile Phase Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 z-20">
        <div className="inline-flex items-center p-0.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-2xs">
          {(['00H', '12H', '24H'] as const).map((p) => {
            const labels = {
              '00H': '00H Ideate',
              '12H': '12H Build',
              '24H': '24H Demo',
            };
            const isSelected = phase === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPhase(p)}
                className={`relative px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md min-h-[36px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA4335] ${
                  isSelected
                    ? 'text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-label={`Select sprint milestone ${labels[p]}`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="hackathon-phase-pill"
                    className="absolute inset-0 rounded-md bg-[#EA4335] shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{labels[p]}</span>
              </button>
            );
          })}
        </div>

        {/* Emote Stamp */}
        {emoteBadge && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-hairline)] shadow-xs">
            <Image
              src={emoteBadge}
              alt="Trophy Build Emote"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span className="font-mono text-[10px] font-bold text-[#EA4335]">
              24H SPRINT
            </span>
          </div>
        )}
      </div>

      {/* Isometric Blueprint Wireframe SVG */}
      <div className="w-full h-32 sm:h-36 flex items-center justify-center relative z-10">
        <svg
          viewBox="0 0 320 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[320px] transition-transform duration-500 group-hover:scale-[1.02]"
          aria-hidden="true"
        >
          {/* Tier 1: Isometric Grid Surface (Ideate) */}
          <path
            d="M160 20 L270 65 L160 110 L50 65 Z"
            fill={phase === '00H' ? 'rgba(234, 67, 53, 0.16)' : 'var(--bg-elevated)'}
            stroke="#EA4335"
            strokeWidth={phase === '00H' ? '2' : '1.2'}
            strokeDasharray={phase === '00H' ? 'none' : '2 2'}
            className="transition-all duration-300"
          />

          {/* Tier 2: Mid Isometric Platform (Prototype / Build) */}
          <path
            d="M160 38 L220 62 L160 86 L100 62 Z"
            fill={phase === '12H' ? 'rgba(234, 67, 53, 0.22)' : 'rgba(234, 67, 53, 0.08)'}
            stroke="#EA4335"
            strokeWidth={phase === '12H' ? '2.5' : '1.5'}
            className="transition-all duration-300"
          />

          {/* Columns / Pillars */}
          <line
            x1="100"
            y1="62"
            x2="100"
            y2="78"
            stroke="#EA4335"
            strokeWidth={phase === '12H' ? '2' : '1.5'}
            className="transition-all duration-300"
          />
          <line
            x1="220"
            y1="62"
            x2="220"
            y2="78"
            stroke="#EA4335"
            strokeWidth={phase === '12H' ? '2' : '1.5'}
            className="transition-all duration-300"
          />
          <line
            x1="160"
            y1="86"
            x2="160"
            y2="102"
            stroke="#EA4335"
            strokeWidth={phase === '12H' ? '2' : '1.5'}
            className="transition-all duration-300"
          />

          {/* Platform Bottom Lip */}
          <path
            d="M100 78 L160 102 L220 78"
            stroke="#EA4335"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Target Milestone Nodes */}
          {phase === '24H' && (
            <circle cx="160" cy="50" r="8" stroke="#EA4335" strokeWidth="1.5" fill="none" className="animate-ping" />
          )}
          <circle cx="160" cy="50" r={phase === '24H' ? '4.5' : '3.5'} fill="#EA4335" />

          <circle cx="130" cy="62" r={phase === '12H' ? '3.5' : '2.5'} fill="#EA4335" />
          <circle cx="190" cy="62" r={phase === '12H' ? '3.5' : '2.5'} fill="#EA4335" />

          {/* Countdown Telemetry Pill inside SVG */}
          <rect
            x="12"
            y="14"
            width="120"
            height="20"
            rx="4"
            fill="var(--bg-elevated)"
            stroke="#EA4335"
            strokeWidth="1"
          />
          <text
            x="72"
            y="28"
            textAnchor="middle"
            fill="#EA4335"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
          >
            {phase === '00H'
              ? 'SPRINT // 00:00:00'
              : phase === '12H'
              ? 'SPRINT // 12:00:00'
              : 'SPRINT // 24:00:00'}
          </text>

          {/* Jury Demo Tag */}
          <text
            x="160"
            y="72"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
          >
            {phase === '00H'
              ? 'BLUEPRINT DRAFT'
              : phase === '12H'
              ? 'BUILD LAB CLUSTER'
              : 'LIVE JURY BENCH'}
          </text>
        </svg>
      </div>

      {/* Deliverable Readout Footer */}
      <div className="w-full pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono z-20">
        <span className="font-semibold text-[#EA4335]">
          {phase === '00H'
            ? 'PHASE // RFC & Architecture'
            : phase === '12H'
            ? 'PHASE // Core API & UI Sprint'
            : 'PHASE // Live Stage Pitch'}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">
          {phase === '00H' ? 'SPEC READY' : phase === '12H' ? 'CORE SHIPPED' : 'FINAL DEMO'}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TILE 3: Study Jams & Pathways Simulator (Yellow `#FBBC04`)
// Interactive Stepped Staircase Explorer
// -----------------------------------------------------------------------------
function SteppedLearningStaircaseSimulator({ emoteBadge }: { emoteBadge?: string }) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(2);

  return (
    <div className="w-full rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 sm:p-4 relative flex flex-col justify-between select-none group/jam">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FBBC04]" />
          <span className="font-mono text-xs font-bold text-[#111827] dark:text-[#FBBC04]">
            STEPPED STAIRCASE EXPLORER
          </span>
        </div>

        {emoteBadge && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-hairline)] shadow-xs">
            <Image
              src={emoteBadge}
              alt="Gemini Spark Emote"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span className="font-mono text-[10px] font-bold text-[#111827] dark:text-[#FBBC04]">
              STUDY TRACK
            </span>
          </div>
        )}
      </div>

      {/* Stepped Geometric Staircase Vector SVG */}
      <div className="w-full h-28 sm:h-32 flex items-center justify-center relative z-10">
        <svg
          viewBox="0 0 320 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[320px] transition-transform duration-500 group-hover:scale-[1.02]"
          aria-hidden="true"
        >
          {/* Step 1 */}
          <g
            className="cursor-pointer transition-transform duration-200 hover:opacity-90"
            onClick={() => setActiveStep(1)}
          >
            <rect
              x="24"
              y="78"
              width="76"
              height="32"
              rx="4"
              fill={activeStep === 1 ? '#FBBC04' : 'var(--bg-elevated)'}
              stroke="#FBBC04"
              strokeWidth={activeStep === 1 ? '2' : '1.5'}
              className="transition-colors duration-200"
            />
            <text
              x="62"
              y="98"
              textAnchor="middle"
              fill={activeStep === 1 ? '#111827' : 'var(--text-primary)'}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              01 // SYNTAX
            </text>
          </g>

          {/* Step 2 */}
          <g
            className="cursor-pointer transition-transform duration-200 hover:opacity-90"
            onClick={() => setActiveStep(2)}
          >
            <rect
              x="108"
              y="48"
              width="82"
              height="62"
              rx="4"
              fill={activeStep === 2 ? '#FBBC04' : 'var(--bg-elevated)'}
              stroke="#FBBC04"
              strokeWidth={activeStep === 2 ? '2' : '1.5'}
              className="transition-colors duration-200"
            />
            <text
              x="149"
              y="68"
              textAnchor="middle"
              fill={activeStep === 2 ? '#111827' : 'var(--text-primary)'}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              02 // PATTERNS
            </text>
            <text
              x="149"
              y="82"
              textAnchor="middle"
              fill={activeStep === 2 ? '#111827' : 'var(--text-muted)'}
              fontSize="8"
              fontFamily="var(--font-mono)"
              fontWeight={activeStep === 2 ? '600' : 'normal'}
            >
              SYSTEM DESIGN
            </text>
          </g>

          {/* Step 3 */}
          <g
            className="cursor-pointer transition-transform duration-200 hover:opacity-90"
            onClick={() => setActiveStep(3)}
          >
            <rect
              x="198"
              y="18"
              width="98"
              height="92"
              rx="4"
              fill={activeStep === 3 ? '#FBBC04' : 'rgba(251,188,4,0.12)'}
              stroke="#FBBC04"
              strokeWidth={activeStep === 3 ? '2.5' : '1.5'}
              className="transition-colors duration-200"
            />
            <text
              x="247"
              y="40"
              textAnchor="middle"
              fill={activeStep === 3 ? '#111827' : '#B45309'}
              className={activeStep === 3 ? '' : 'dark:fill-[#FBBC04]'}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fontWeight="bold"
            >
              03 // SHIP
            </text>
            <text
              x="247"
              y="56"
              textAnchor="middle"
              fill={activeStep === 3 ? '#111827' : 'var(--text-secondary)'}
              fontSize="8"
              fontFamily="var(--font-mono)"
              fontWeight={activeStep === 3 ? '600' : 'normal'}
            >
              DEPLOY &amp; SCALE
            </text>
          </g>

          {/* Ascending Path Line */}
          <path
            d="M62 78 L62 62 L149 62 L149 32 L247 32"
            fill="none"
            stroke="#FBBC04"
            strokeWidth="2"
            strokeDasharray={activeStep === 3 ? 'none' : '3 3'}
            className="transition-all duration-300"
          />

          {/* Checkpoint Nodes */}
          <circle cx="62" cy="78" r={activeStep === 1 ? '4' : '3'} fill="#FBBC04" />
          <circle cx="149" cy="48" r={activeStep === 2 ? '4' : '3'} fill="#FBBC04" />
          <circle
            cx="247"
            cy="18"
            r={activeStep === 3 ? '5' : '4'}
            fill="#FBBC04"
            className={activeStep === 3 ? 'animate-pulse' : ''}
          />
        </svg>
      </div>

      {/* Accessible Step Buttons for Keyboard Users */}
      <div className="grid grid-cols-3 gap-1.5 pt-2 z-20">
        <button
          type="button"
          onClick={() => setActiveStep(1)}
          className={`min-h-[36px] px-2 py-1 text-[11px] font-mono font-bold rounded-lg border transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBC04] ${
            activeStep === 1
              ? 'bg-[#FBBC04] text-[#111827] border-[#FBBC04] shadow-xs'
              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:border-[#FBBC04]/50'
          }`}
          aria-label="Select Step 01: Syntax"
        >
          01 Syntax
        </button>
        <button
          type="button"
          onClick={() => setActiveStep(2)}
          className={`min-h-[36px] px-2 py-1 text-[11px] font-mono font-bold rounded-lg border transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBC04] ${
            activeStep === 2
              ? 'bg-[#FBBC04] text-[#111827] border-[#FBBC04] shadow-xs'
              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:border-[#FBBC04]/50'
          }`}
          aria-label="Select Step 02: Patterns"
        >
          02 Patterns
        </button>
        <button
          type="button"
          onClick={() => setActiveStep(3)}
          className={`min-h-[36px] px-2 py-1 text-[11px] font-mono font-bold rounded-lg border transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBC04] ${
            activeStep === 3
              ? 'bg-[#FBBC04] text-[#111827] border-[#FBBC04] shadow-xs'
              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:border-[#FBBC04]/50'
          }`}
          aria-label="Select Step 03: Ship"
        >
          03 Ship
        </button>
      </div>

      {/* Engineering Focus Chip Footer */}
      <div className="w-full pt-2 mt-1 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono z-20">
        <span className="font-semibold text-[#B45309] dark:text-[#FBBC04]">
          {activeStep === 1
            ? 'FOCUS // LANGUAGE SYNTAX & RUNTIME INTERNALS'
            : activeStep === 2
            ? 'FOCUS // ARCHITECTURAL PATTERNS & STATE'
            : 'FOCUS // PRODUCTION CI/CD & SCALE'}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">
          LEVEL_{activeStep}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// TILE 4: Open Source & Research Simulator (Green `#34A853`)
// Interactive Git Branch & PR Merge Simulator
// -----------------------------------------------------------------------------
function GitBranchMergeSimulator({ emoteBadge }: { emoteBadge?: string }) {
  const [isMerged, setIsMerged] = useState<boolean>(false);

  return (
    <div className="w-full rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-3 sm:p-4 relative flex flex-col justify-between select-none group/git">
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 z-20">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#34A853] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            <span>GIT GRAPH ENGINE</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-[var(--text-muted)]">
            branch: feat/multimodal
          </span>
        </div>

        {/* Action Toggle Button & Stamp */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMerged(!isMerged)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all min-h-[36px] flex items-center gap-1.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#34A853] ${
              isMerged
                ? 'bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-strong)]'
                : 'bg-[#34A853] hover:bg-[#2d9249] text-white hover:shadow-md'
            }`}
            aria-label={isMerged ? 'Reset branch simulator' : 'Merge PR into main branch'}
          >
            <span>{isMerged ? 'Reset Branch ↺' : 'Merge PR → main ⎇'}</span>
          </button>

          <AnimatePresence mode="wait">
            {isMerged ? (
              <motion.div
                key="lgtm-badge"
                initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#34A853]/15 border border-[#34A853] shadow-xs"
              >
                <Image
                  src="/assets/emotes/lgtm-stamp.svg"
                  alt="LGTM Stamp"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                />
                <span className="font-mono text-[10px] font-bold text-[#34A853]">
                  LGTM MERGED ✓
                </span>
              </motion.div>
            ) : emoteBadge ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-hairline)] shadow-xs">
                <Image
                  src={emoteBadge}
                  alt="Merge Clean Emote"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                />
                <span className="font-mono text-[10px] font-semibold text-[#34A853]">
                  PR #42 OPEN
                </span>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Git Graph Vector SVG */}
      <div className="w-full h-32 sm:h-36 flex items-center justify-center relative z-10">
        <svg
          viewBox="0 0 540 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[500px] transition-transform duration-500 group-hover:scale-[1.01]"
          aria-hidden="true"
        >
          {/* Main Trunk Line */}
          <line
            x1="30"
            y1="60"
            x2="500"
            y2="60"
            stroke="#34A853"
            strokeWidth="3"
            className="transition-colors duration-300"
          />

          {/* Feature Branch 1: Upward curve (feat/multimodal) */}
          <path
            d="M120 60 C150 60, 160 26, 200 26 L320 26 C360 26, 370 60, 400 60"
            fill="none"
            stroke="#34A853"
            strokeWidth={isMerged ? '3' : '2'}
            strokeDasharray={isMerged ? 'none' : '4 4'}
            className="transition-all duration-400"
          />

          {/* Feature Branch 2: Downward curve (feat/telemetry-v2) */}
          <path
            d="M220 60 C240 60, 250 94, 280 94 L350 94 C380 94, 390 60, 420 60"
            fill="none"
            stroke="#4285F4"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-70"
          />

          {/* Commits on Main Trunk */}
          <g>
            <circle cx="50" cy="60" r="5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2.5" />
            <circle cx="120" cy="60" r="5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2.5" />
            <circle cx="220" cy="60" r="5" fill="var(--bg-elevated)" stroke="#34A853" strokeWidth="2.5" />
            <circle cx="400" cy="60" r={isMerged ? '7' : '6'} fill="#34A853" className="transition-all duration-300" />
            {isMerged && (
              <circle cx="400" cy="60" r="11" stroke="#34A853" strokeWidth="1.5" fill="none" className="animate-ping" />
            )}
            <circle cx="470" cy="60" r="7" fill="#34A853" className="animate-pulse" />
          </g>

          {/* Commits on Feature Branch 1 (Green) */}
          <g>
            <circle
              cx="230"
              cy="26"
              r="4.5"
              fill={isMerged ? '#34A853' : 'var(--bg-elevated)'}
              stroke="#34A853"
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            <circle
              cx="290"
              cy="26"
              r="4.5"
              fill={isMerged ? '#34A853' : 'var(--bg-elevated)'}
              stroke="#34A853"
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            <text
              x="260"
              y="18"
              textAnchor="middle"
              fill={isMerged ? '#34A853' : 'var(--text-muted)'}
              fontSize="8"
              fontFamily="var(--font-mono)"
              fontWeight={isMerged ? 'bold' : 'normal'}
            >
              feat/multimodal
            </text>
          </g>

          {/* Commits on Feature Branch 2 (Blue) */}
          <g>
            <circle cx="310" cy="94" r="4.5" fill="var(--bg-elevated)" stroke="#4285F4" strokeWidth="2" />
            <text
              x="310"
              y="108"
              textAnchor="middle"
              fill="var(--text-muted)"
              fontSize="8"
              fontFamily="var(--font-mono)"
            >
              feat/telemetry-v2
            </text>
          </g>

          {/* Release Tag Pill on Main */}
          <rect
            x="430"
            y="74"
            width="80"
            height="18"
            rx="4"
            fill={isMerged ? 'rgba(52,168,83,0.22)' : 'rgba(52,168,83,0.12)'}
            stroke="#34A853"
            strokeWidth={isMerged ? '1.5' : '1'}
            className="transition-all duration-300"
          />
          <text
            x="470"
            y="86"
            textAnchor="middle"
            fill="#34A853"
            fontSize="8"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
          >
            {isMerged ? 'v1.0.0 · MERGED ✓' : 'v1.0.0 · READY'}
          </text>
        </svg>
      </div>

      {/* Telemetry Footer */}
      <div className="w-full pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono z-20">
        <span className="font-semibold text-[#34A853]">
          {isMerged
            ? 'GIT // MERGE COMMIT e7b40a9 INGESTED INTO MAIN · STATUS: CLEAN'
            : 'GIT // WORKING TREE DIRTY · COMMIT 8f3c21a ON feat/multimodal'}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">
          {isMerged ? 'PRODUCTION TAG LANDED' : 'AWAITING LGTM'}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BENTO TILE WRAPPER COMPONENT
// -----------------------------------------------------------------------------
interface BentoTileProps {
  pillar: PillarItem;
  colSpanClass: string;
  index: number;
}

function BentoTile({ pillar, colSpanClass, index }: BentoTileProps) {
  const styles = getPillarAccentStyles(pillar.accent);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${colSpanClass} flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] ${styles.borderColor} transition-all duration-300 relative overflow-hidden group shadow-xs hover:shadow-lg`}
    >
      {/* Subtle Radial Glow on Hover */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-0"
        style={{ background: styles.glowBg }}
      />

      {/* Content Container */}
      <div className="space-y-5 relative z-10">
        {/* Top Header Row: Index Tag + Pill Badge */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold tracking-wider text-[var(--text-muted)]">
            {pillar.indexTag}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border whitespace-nowrap ${styles.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor} shrink-0`} />
            <span>{pillar.pillBadge}</span>
          </span>
        </div>

        {/* Embedded Interactive Vector Simulator */}
        {index === 0 && <HandsOnPipelineSimulator />}
        {index === 1 && <HackathonIsometricSimulator emoteBadge={pillar.emoteBadge} />}
        {index === 2 && <SteppedLearningStaircaseSimulator emoteBadge={pillar.emoteBadge} />}
        {index === 3 && <GitBranchMergeSimulator emoteBadge={pillar.emoteBadge} />}

        {/* Title & Tagline */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
            {pillar.title}
          </h3>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            {pillar.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {pillar.description}
        </p>

        {/* Interactive Curriculum Chips */}
        <div className="pt-2 flex flex-wrap gap-2">
          {pillar.chips.map((chip, chipIdx) => (
            <span
              key={chipIdx}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)] ${styles.chipHover} transition-all duration-200 cursor-default select-none shadow-2xs`}
            >
              #{chip}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div className="pt-5 mt-5 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)] relative z-10">
        <span className="truncate">{pillar.techSpec}</span>
        <span className="shrink-0 text-[10px] text-[var(--text-muted)]">RVCE &apos;26</span>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// MAIN SECTION: BentoPillarsSection (Act III)
// -----------------------------------------------------------------------------
export function BentoPillarsSection() {
  const prefersReducedMotion = useReducedMotion();

  // Asymmetric 12-column bento mapping
  // Tile 1: md:col-span-7 (Blue)
  // Tile 2: md:col-span-5 (Red)
  // Tile 3: md:col-span-5 (Yellow)
  // Tile 4: md:col-span-7 (Green)
  const colSpans = [
    'md:col-span-7',
    'md:col-span-5',
    'md:col-span-5',
    'md:col-span-7',
  ];

  return (
    <section
      id="pillars"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative"
    >
      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14"
      >
        <div className="space-y-3">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
            <span className="font-mono text-xs font-semibold text-[#4285F4] tracking-wider">
              [ 01 // ENGINEERING PILLARS ]
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
            Four verticals. One open build culture.
          </h2>

          {/* Subcopy */}
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            How RVCE student builders move from first-principles systems theory to deployed, production-grade open-source repositories and cloud architectures.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3.5 py-2 rounded-xl border border-[var(--border-hairline)] self-start md:self-auto shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
          <span>ACTIVE SPRINT TRACKS // 2026</span>
        </div>
      </motion.div>

      {/* Asymmetric 12-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {PILLARS_DATA.map((pillar, idx) => (
          <BentoTile
            key={pillar.id}
            pillar={pillar}
            colSpanClass={colSpans[idx] || 'md:col-span-6'}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
