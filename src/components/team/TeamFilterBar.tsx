'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RotateCw, LayoutGrid } from 'lucide-react';
import { TeamVertical } from '@/data/gdgData';

export type TeamFilterOption = 'All Builders' | TeamVertical;

interface TeamFilterBarProps {
  selectedVertical: TeamFilterOption;
  onSelectVertical: (vertical: TeamFilterOption) => void;
  inspectAll: boolean;
  onToggleInspectAll: () => void;
}

interface FilterTabDef {
  id: TeamFilterOption;
  label: string;
  dotColor: string;
}

const FILTER_TABS: FilterTabDef[] = [
  { id: 'All Builders', label: 'All Builders', dotColor: '#4285F4' },
  { id: 'Core Lead', label: 'Core Lead', dotColor: '#EA4335' },
  { id: 'Web & Cloud', label: 'Web & Cloud', dotColor: '#4285F4' },
  { id: 'AI & ML', label: 'AI & ML', dotColor: '#34A853' },
  { id: 'Design & UX', label: 'Design & UX', dotColor: '#FBBC04' },
  { id: 'Community & Events', label: 'Community & Events', dotColor: '#34A853' },
];

export function TeamFilterBar({
  selectedVertical,
  onSelectVertical,
  inspectAll,
  onToggleInspectAll,
}: TeamFilterBarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-2 sm:p-2.5 shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
      {/* Scrollable / Wrapping Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter builders by department"
        className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth p-0.5"
      >
        {FILTER_TABS.map((tab) => {
          const isActive = selectedVertical === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectVertical(tab.id)}
              className={`relative min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                isActive
                  ? 'text-[var(--text-primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]/70'
              }`}
            >
              {/* Active Tab Spring Indicator */}
              {isActive && (
                <motion.div
                  layoutId="team-vertical-pill"
                  transition={{
                    type: 'spring',
                    stiffness: prefersReducedMotion ? 1000 : 400,
                    damping: 35,
                  }}
                  className="absolute inset-0 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] shadow-xs"
                />
              )}

              {/* Dot & Label */}
              <span className="relative z-10 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-transform"
                  style={{
                    backgroundColor: tab.dotColor,
                    boxShadow: isActive ? `0 0 6px ${tab.dotColor}80` : 'none',
                  }}
                />
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Global Inspect All Specs / Show Profiles Toggle */}
      <div className="shrink-0 flex items-center justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border-hairline)]">
        <button
          type="button"
          onClick={onToggleInspectAll}
          aria-pressed={inspectAll}
          aria-label={
            inspectAll
              ? 'Show builder profiles for all cards'
              : 'Inspect technical builder specs for all cards'
          }
          className={`min-h-[44px] w-full md:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center justify-center gap-2.5 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
            inspectAll
              ? 'bg-[#4285F4] text-white border-[#4285F4] shadow-sm hover:bg-[#3367D6]'
              : 'bg-[var(--bg-subtle)] text-[var(--text-primary)] border-[var(--border-strong)] hover:border-[#4285F4] hover:text-[#4285F4]'
          }`}
        >
          {inspectAll ? (
            <>
              <LayoutGrid className="w-4 h-4 shrink-0 text-white" aria-hidden="true" />
              <span>Show Profiles ↺</span>
            </>
          ) : (
            <>
              <RotateCw className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Inspect All Specs ↻</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
