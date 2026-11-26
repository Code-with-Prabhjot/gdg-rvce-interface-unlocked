'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  Trophy,
  BookOpen,
  Mic,
  ArrowRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { EventCategory } from '@/data/gdgData';
import { TrackFilter } from './EventsFilterBar';

interface TrackFormatSpec {
  category: EventCategory;
  name: string;
  badgeLabel: string;
  accentHex: string;
  pillBg: string;
  pillText: string;
  cadence: string;
  handsOnRatio: string;
  handsOnPercentage: number;
  prerequisite: string;
  artifact: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TRACK_SPECS: TrackFormatSpec[] = [
  {
    category: 'Workshop',
    name: 'Hands-On Workshop',
    badgeLabel: 'WORKSHOP',
    accentHex: '#4285F4',
    pillBg: 'bg-[#4285F4]/15 border border-[#4285F4]/35',
    pillText: 'text-[var(--accent-blue-text)]',
    cadence: '2.5–3 Hrs · Guided Code-Along',
    handsOnRatio: '85% Hands-On Code',
    handsOnPercentage: 85,
    prerequisite: 'Laptop + Starter Repo',
    artifact: 'Deployed Cloud/Web Microservice',
    description: 'Interactive live-coding laboratories where student builders clone a repository and build production-ready services.',
    icon: Cpu,
  },
  {
    category: 'Hackathon',
    name: 'Architectural Hackathon',
    badgeLabel: 'HACKATHON',
    accentHex: '#EA4335',
    pillBg: 'bg-[#EA4335]/15 border border-[#EA4335]/35',
    pillText: 'text-[var(--accent-red-text)]',
    cadence: '24 Hrs · Team Build Sprint',
    handsOnRatio: '90% Rapid Prototyping',
    handsOnPercentage: 90,
    prerequisite: '2–4 Builder Squad',
    artifact: 'Working Prototype & Live Stage Demo',
    description: 'High-intensity overnight build sprints solving real-world challenges across AI, Web3, cloud, and open-source stacks.',
    icon: Trophy,
  },
  {
    category: 'Study Jam',
    name: 'Certification Study Jam',
    badgeLabel: 'STUDY JAM',
    accentHex: '#FBBC04',
    pillBg: 'bg-amber-500/15 border border-amber-500/35',
    pillText: 'text-[var(--accent-yellow-text)]',
    cadence: 'Multi-Week · Structured Cohort',
    handsOnRatio: '65% Practical Labs',
    handsOnPercentage: 65,
    prerequisite: 'Beginner Friendly',
    artifact: 'Skill Badges & Core Pathway Mastery',
    description: 'Self-paced and cohort-mentored learning journeys across Google Cloud Skills Boost, Android Studio, and Firebase.',
    icon: BookOpen,
  },
  {
    category: 'Tech Talk',
    name: 'Technical Keynote & RFC',
    badgeLabel: 'TECH TALK',
    accentHex: '#34A853',
    pillBg: 'bg-[#34A853]/15 border border-[#34A853]/35',
    pillText: 'text-[var(--accent-green-text)]',
    cadence: '90 Mins · Deep-Dive & Teardown',
    handsOnRatio: '30% Interactive Demos',
    handsOnPercentage: 30,
    prerequisite: 'Open to All Branches',
    artifact: 'Architecture Blueprints & RFC Notes',
    description: 'Industry engineering leaders dissect distributed systems, browser rendering engines, and production scale architectures.',
    icon: Mic,
  },
];

interface TrackFormatComparatorProps {
  activeTrack: TrackFilter;
  onSelectTrack: (track: TrackFilter) => void;
}

export function TrackFormatComparator({
  activeTrack,
  onSelectTrack,
}: TrackFormatComparatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTrackFilterClick = (track: EventCategory) => {
    onSelectTrack(track);
    // Smooth scroll down to the filter bar or directory section
    const filterBar = document.getElementById('events-filter-bar');
    if (filterBar) {
      filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      aria-label="Track Format Matrix Comparator"
      className="w-full mb-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs transition-all overflow-hidden"
    >
      {/* ============================================================= */}
      {/* 1. COMPACT ARCHITECTURAL HEADER BAR                           */}
      {/* ============================================================= */}
      <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-blue-text)]">
              [ TRACK MATRIX // COMPARE FORMATS ]
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[var(--border-strong)]" />
            <span className="hidden sm:inline font-mono text-xs text-[var(--text-muted)]">
              4 Disciplines
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans max-w-xl">
            Not sure which GDG RVCE session format fits your schedule? Compare all four tracks.
          </p>
        </div>

        {/* Expand / Collapse Action Button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls="track-comparator-content"
          className="min-h-[44px] md:min-h-[40px] min-w-[44px] inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all cursor-pointer shrink-0 self-end sm:self-auto"
        >
          <Layers className="w-4 h-4 text-[var(--accent-blue-text)]" />
          <span>{isExpanded ? 'Collapse Matrix' : 'Compare 4 Formats'}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
          )}
        </button>
      </div>

      {/* ============================================================= */}
      {/* 2. EXPANDABLE RESPONSIVE 4-TRACK COMPARISON MATRIX            */}
      {/* ============================================================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="track-comparator-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]/40"
          >
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {TRACK_SPECS.map((track) => {
                const IconComponent = track.icon;
                const isCurrentFilter = activeTrack === track.category;

                return (
                  <div
                    key={track.category}
                    className={`relative flex flex-col justify-between rounded-xl p-4 sm:p-5 bg-[var(--bg-elevated)] border transition-all duration-200 ${
                      isCurrentFilter
                        ? 'border-2 shadow-md'
                        : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)] shadow-2xs hover:shadow-xs'
                    }`}
                    style={{
                      borderColor: isCurrentFilter ? track.accentHex : undefined,
                    }}
                  >
                    {/* Top Decorative Color Bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                      style={{ backgroundColor: track.accentHex }}
                    />

                    <div className="space-y-4">
                      {/* Track Header & Pill */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono shadow-2xs ${track.pillBg} ${track.pillText}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              track.category === 'Study Jam'
                                ? 'bg-[var(--accent-yellow-text)]'
                                : track.category === 'Hackathon'
                                ? 'bg-[var(--accent-red-text)]'
                                : track.category === 'Tech Talk'
                                ? 'bg-[var(--accent-green-text)]'
                                : 'bg-[var(--accent-blue-text)]'
                            }`}
                          />
                          {track.badgeLabel}
                        </span>

                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${track.accentHex}15`,
                            color:
                              track.category === 'Study Jam'
                                ? 'var(--accent-yellow-text)'
                                : track.category === 'Hackathon'
                                ? 'var(--accent-red-text)'
                                : track.category === 'Tech Talk'
                                ? 'var(--accent-green-text)'
                                : 'var(--accent-blue-text)',
                          }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Track Full Title & Description */}
                      <div>
                        <h2 className="text-base font-display font-bold text-[var(--text-primary)]">
                          {track.name}
                        </h2>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                          {track.description}
                        </p>
                      </div>

                      {/* Technical Comparison Dimensions */}
                      <div className="space-y-2.5 pt-2 border-t border-[var(--border-hairline)] text-xs font-mono">
                        {/* 1. Cadence */}
                        <div>
                          <span className="text-[10px] uppercase text-[var(--text-muted)] tracking-wider block">
                            Cadence & Duration
                          </span>
                          <span className="font-semibold text-[var(--text-primary)]">
                            {track.cadence}
                          </span>
                        </div>

                        {/* 2. Hands-On Ratio with Mini Meter */}
                        <div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="uppercase text-[var(--text-muted)] tracking-wider">
                              Hands-On Ratio
                            </span>
                            <span
                              className="font-bold"
                              style={{
                                color:
                                  track.category === 'Study Jam'
                                    ? 'var(--accent-yellow-text)'
                                    : track.category === 'Hackathon'
                                    ? 'var(--accent-red-text)'
                                    : track.category === 'Tech Talk'
                                    ? 'var(--accent-green-text)'
                                    : 'var(--accent-blue-text)',
                              }}
                            >
                              {track.handsOnRatio}
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[var(--bg-subtle)] mt-1 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${track.handsOnPercentage}%`,
                                backgroundColor: track.accentHex,
                              }}
                            />
                          </div>
                        </div>

                        {/* 3. Prerequisite */}
                        <div>
                          <span className="text-[10px] uppercase text-[var(--text-muted)] tracking-wider block">
                            Prerequisite Depth
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {track.prerequisite}
                          </span>
                        </div>

                        {/* 4. Shipped Artifact */}
                        <div>
                          <span className="text-[10px] uppercase text-[var(--text-muted)] tracking-wider block">
                            Shipped Artifact
                          </span>
                          <span className="inline-flex items-center gap-1 text-[var(--text-primary)] font-medium">
                            <CheckCircle2
                              className="w-3 h-3 shrink-0"
                              style={{
                                color:
                                  track.category === 'Study Jam'
                                    ? 'var(--accent-yellow-text)'
                                    : track.category === 'Hackathon'
                                      ? 'var(--accent-red-text)'
                                      : track.category === 'Tech Talk'
                                        ? 'var(--accent-green-text)'
                                        : 'var(--accent-blue-text)',
                              }}
                            />
                            <span className="truncate">{track.artifact}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA: One-Click Track Filter */}
                    <div className="pt-4 mt-4 border-t border-[var(--border-hairline)]">
                      <button
                        type="button"
                        onClick={() => handleTrackFilterClick(track.category)}
                        className={`w-full min-h-[44px] md:min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                          isCurrentFilter
                            ? 'bg-[#0F172A] text-[#FFFFFF] dark:bg-[#F8FAFC] dark:text-[#0A0D12] shadow-xs'
                            : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <span>{isCurrentFilter ? `Viewing ${track.category}` : `Filter ${track.category}`}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
