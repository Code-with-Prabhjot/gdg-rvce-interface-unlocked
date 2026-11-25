'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ChevronDown,
  Layers,
  ArrowRight,
  Cpu,
  Palette,
  Users,
  Compass,
} from 'lucide-react';
import { TeamVertical } from '@/data/gdgData';

export interface SynergyPairing {
  id: string;
  verticalA: TeamVertical;
  colorA: string;
  verticalB: TeamVertical;
  colorB: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
  spotlightVertical: TeamVertical;
}

const COLLABORATION_PAIRS: SynergyPairing[] = [
  {
    id: 'ai-web',
    verticalA: 'AI & ML',
    colorA: '#34A853',
    verticalB: 'Web & Cloud',
    colorB: '#4285F4',
    title: 'Full-Stack Gemini Agents',
    tagline: 'Multimodal Streaming & Edge Cloud Run',
    description:
      'Pairing multimodal Gemini 1.5 pipelines with scalable Cloud Run and Next.js interfaces for sub-second function calling.',
    deliverables: ['Streaming RPC', 'SSE Handlers', 'Cloud Run Canary'],
    icon: Cpu,
    spotlightVertical: 'AI & ML',
  },
  {
    id: 'design-web',
    verticalA: 'Design & UX',
    colorA: '#FBBC04',
    verticalB: 'Web & Cloud',
    colorB: '#4285F4',
    title: 'Accessible Design Systems',
    tagline: 'Figma Tokens to WCAG AAA Primitives',
    description:
      'Translating Bauhaus geometric design tokens into WCAG AAA compliant Tailwind and CSS variable registries with reduced-motion ergonomics.',
    deliverables: ['Token Pipeline', 'CSS Primitives', 'Contrast Math'],
    icon: Palette,
    spotlightVertical: 'Design & UX',
  },
  {
    id: 'core-community',
    verticalA: 'Core Lead',
    colorA: '#EA4335',
    verticalB: 'Community & Events',
    colorB: '#34A853',
    title: '24-Hour Campus Sprints',
    tagline: 'Rapid Buildathons & Mentorship Logistics',
    description:
      'Orchestrating technical problem statements, student mentor checkpoints, automated code judging rubrics, and live demo stages.',
    deliverables: ['Rubric Matrix', 'Mentor Ops', 'Live Stage Ops'],
    icon: Users,
    spotlightVertical: 'Core Lead',
  },
  {
    id: 'ai-design',
    verticalA: 'AI & ML',
    colorA: '#34A853',
    verticalB: 'Design & UX',
    colorB: '#FBBC04',
    title: 'Human-Centered AI Interfaces',
    tagline: 'Transparent Streaming & Kinetic Feedback',
    description:
      'Designing transparent streaming UI states, real-time latency telemetry bars, and multimodal error recovery feedback loops.',
    deliverables: ['Latency Gauges', 'Stream Shaders', 'Confidence Chips'],
    icon: Compass,
    spotlightVertical: 'AI & ML',
  },
];

interface VerticalCollaborationMatrixProps {
  onSelectVertical: (vertical: TeamVertical) => void;
  activeVertical?: string;
}

const YELLOW_TAG_CLASS =
  'bg-amber-500/12 border-amber-600/30 text-[#92400E] dark:bg-[#FBBC04]/12 dark:border-[#FBBC04]/35 dark:text-[#FCD34D]';

export function VerticalCollaborationMatrix({
  onSelectVertical,
  activeVertical,
}: VerticalCollaborationMatrixProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSpotlight = (vertical: TeamVertical) => {
    onSelectVertical(vertical);
    const filterBar = document.getElementById('team-filter-bar');
    if (filterBar) {
      filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      aria-label="Cross-Vertical Collaboration Matrix"
      className="w-full rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs mb-4 overflow-hidden transition-all duration-300"
    >
      {/* Collapsible Panel Header */}
      <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40">
        <div className="space-y-0.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4285F4] shrink-0" />
            <span className="text-xs font-mono font-semibold tracking-wider text-[var(--accent-blue-text)]">
              [ VERTICAL SYNERGY // COLLABORATION MATRIX ]
            </span>
            <span className="text-[var(--text-muted)] text-xs hidden sm:inline">·</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)] hidden sm:inline">
              Campus Initiatives
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Inspect how GDG RVCE verticals pair up across campus hackathons, cloud labs, and open-source releases.
          </p>
        </div>

        {/* Tactile Toggle Button (44px Accessible Target) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="vertical-collaboration-content"
          aria-label={
            isOpen
              ? 'Collapse cross-vertical collaboration matrix'
              : 'Expand cross-vertical collaboration matrix'
          }
          className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-strong)] text-xs font-mono font-medium transition-all flex items-center gap-2 shrink-0 self-end sm:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
        >
          <Layers className="w-3.5 h-3.5 text-[var(--accent-blue-text)] shrink-0" aria-hidden="true" />
          <span>{isOpen ? 'Collapse Matrix' : 'Expand Matrix'}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-secondary)]" aria-hidden="true" />
          </motion.div>
        </button>
      </div>

      {/* Expandable Collaboration Cards Grid */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="vertical-collaboration-content"
            role="region"
            aria-label="Collaboration synergy cards"
            initial={
              prefersReducedMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: 'auto' }}
            exit={
              prefersReducedMotion ? { opacity: 1, height: 0 } : { opacity: 0, height: 0 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COLLABORATION_PAIRS.map((pair, idx) => {
                  const Icon = pair.icon;
                  // Handle WCAG AAA contrast on yellow tags
                  const isYellowA = pair.colorA === '#FBBC04';
                  const isYellowB = pair.colorB === '#FBBC04';
                  const isActive = activeVertical === pair.spotlightVertical;

                  return (
                    <motion.div
                      key={pair.id}
                      initial={
                        prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        delay: prefersReducedMotion ? 0 : idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group relative flex flex-col justify-between rounded-xl bg-[var(--bg-subtle)]/70 hover:bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] p-4 sm:p-4.5 transition-all duration-200 overflow-hidden"
                    >
                      {/* Dual-Color Accent Top Bar */}
                      <div className="absolute top-0 inset-x-0 h-1 flex">
                        <div className="w-1/2 h-full" style={{ backgroundColor: pair.colorA }} />
                        <div className="w-1/2 h-full" style={{ backgroundColor: pair.colorB }} />
                      </div>

                      <div className="space-y-3 pt-1">
                        {/* Dual Vertical Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                          <span
                            className={`px-2 py-0.5 rounded font-medium border ${isYellowA ? YELLOW_TAG_CLASS : ''}`}
                            style={
                              isYellowA
                                ? undefined
                                : {
                                    backgroundColor: `${pair.colorA}15`,
                                    color: pair.colorA,
                                    borderColor: `${pair.colorA}35`,
                                  }
                            }
                          >
                            {pair.verticalA}
                          </span>
                          <span className="text-[var(--text-muted)] font-bold">+</span>
                          <span
                            className={`px-2 py-0.5 rounded font-medium border ${isYellowB ? YELLOW_TAG_CLASS : ''}`}
                            style={
                              isYellowB
                                ? undefined
                                : {
                                    backgroundColor: `${pair.colorB}15`,
                                    color: pair.colorB,
                                    borderColor: `${pair.colorB}35`,
                                  }
                            }
                          >
                            {pair.verticalB}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-[var(--border-hairline)]"
                              style={{
                                backgroundColor: `${pair.colorA}15`,
                                color: isYellowA ? '#B45309' : pair.colorA,
                              }}
                            >
                              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                            </div>
                            <h3 className="text-sm font-display font-bold text-[var(--text-primary)] leading-tight group-hover:text-[#4285F4] transition-colors">
                              {pair.title}
                            </h3>
                          </div>
                          <p className="text-[11px] font-mono text-[var(--text-muted)]">
                            {pair.tagline}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {pair.description}
                        </p>

                        {/* Deliverables tags */}
                        <div className="pt-2 flex flex-wrap gap-1">
                          {pair.deliverables.map((item) => (
                            <span
                              key={item}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Spotlight Action Button */}
                      <div className="pt-3.5 mt-3.5 border-t border-[var(--border-hairline)]">
                        <button
                          type="button"
                          onClick={() => handleSpotlight(pair.spotlightVertical)}
                          aria-label={`Spotlight ${pair.spotlightVertical} builders in roster`}
                          className={`w-full min-h-[38px] px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all flex items-center justify-between group/btn cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                            isActive
                              ? 'border-[#4285F4] bg-[#4285F4] text-white'
                              : 'border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:border-[#4285F4] hover:bg-[#4285F4] hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles
                              className={`w-3 h-3 transition-colors ${
                                isActive
                                  ? 'text-white'
                                  : 'text-[#4285F4] group-hover/btn:text-white'
                              }`}
                            />
                            <span>Spotlight {pair.spotlightVertical}</span>
                          </span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
