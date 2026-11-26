'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  RotateCw,
  LayoutGrid,
  Network,
  Search,
  X,
  RotateCcw,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';
import { TeamVertical } from '@/data/gdgData';
import { useShortcuts } from '@/context/ShortcutsContext';

export type TeamFilterOption = 'All Builders' | TeamVertical;
export type TeamViewMode = 'grid' | 'topology';
export type DataSourceMode = 'static' | 'live';

export interface TeamFilterBarProps {
  selectedVertical: TeamFilterOption;
  onSelectVertical: (vertical: TeamFilterOption) => void;
  selectedSkill: string;
  onSelectSkill: (skill: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  inspectAll: boolean;
  onToggleInspectAll: () => void;
  viewMode: TeamViewMode;
  onViewModeChange: (mode: TeamViewMode) => void;

  // Phase 19: Live /api/team query mode & telemetry
  dataSourceMode: DataSourceMode;
  onDataSourceModeChange: (mode: DataSourceMode) => void;
  liveTelemetry: {
    endpoint: string;
    status: number;
    latencyMs: number;
  } | null;
  isFetchingLive: boolean;
  onInspectQuery: (endpoint: string) => void;

  onResetFilters: () => void;
  hasActiveFilters: boolean;
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

export const QUICK_SKILL_CHIPS = [
  { id: 'All Stacks', label: 'All Stacks' },
  { id: 'Next.js', label: 'Next.js' },
  { id: 'Gemini', label: 'Gemini API' },
  { id: 'Kubernetes', label: 'Kubernetes' },
  { id: 'Kotlin', label: 'Kotlin' },
  { id: 'Design Systems', label: 'Design Systems' },
  { id: 'Open Source', label: 'Open Source' },
];

export function TeamFilterBar({
  selectedVertical,
  onSelectVertical,
  selectedSkill,
  onSelectSkill,
  searchQuery,
  onSearchChange,
  inspectAll,
  onToggleInspectAll,
  viewMode,
  onViewModeChange,
  dataSourceMode,
  onDataSourceModeChange,
  liveTelemetry,
  isFetchingLive,
  onInspectQuery,
  onResetFilters,
  hasActiveFilters,
}: TeamFilterBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isOpen: isShortcutsOpen, close: closeShortcuts } = useShortcuts();

  // Global '/' keyboard shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElementTag = (document.activeElement?.tagName || '').toUpperCase();
      if (e.key === '/' && activeElementTag !== 'INPUT' && activeElementTag !== 'TEXTAREA') {
        e.preventDefault();
        if (isShortcutsOpen) {
          closeShortcuts();
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 50);
        } else {
          searchInputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShortcutsOpen, closeShortcuts]);

  // Determine if active skill is one of the predefined chips
  const isPredefinedSkill = QUICK_SKILL_CHIPS.some(
    (chip) => chip.id.toLowerCase() === selectedSkill.toLowerCase()
  );

  return (
    <div
      id="team-filter-bar"
      data-tour="team-topology"
      className="w-full rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-3 sm:p-4 shadow-xs mb-6 space-y-2.5"
    >
      {/* ============================================================= */}
      {/* ROW 0: DATA SOURCE SEGMENTED SWITCHER & LIVE TELEMETRY STRIP  */}
      {/* ============================================================= */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[var(--border-hairline)]">
        {/* Left Telemetry Status Indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          {dataSourceMode === 'live' ? (
            <div className="flex items-center gap-2 overflow-hidden text-xs font-mono">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A853]" />
              </span>

              {isFetchingLive ? (
                <span className="text-[var(--accent-blue-text)] font-medium flex items-center gap-1.5 truncate">
                  <Activity className="w-3.5 h-3.5 animate-spin shrink-0" />
                  <span className="truncate">GET /api/team · Executing query...</span>
                </span>
              ) : liveTelemetry ? (
                <span className="text-[var(--text-secondary)] truncate flex items-center gap-1.5">
                  <span className="font-semibold text-[var(--text-primary)]">
                    GET {liveTelemetry.endpoint.split('?')[0]}
                  </span>
                  <span className="text-[var(--text-muted)]">·</span>
                  <span className="text-[var(--accent-green-text)] font-semibold">{liveTelemetry.status} OK</span>
                  <span className="text-[var(--text-muted)]">·</span>
                  <span className="text-[var(--text-primary)] font-bold">{liveTelemetry.latencyMs} ms</span>
                </span>
              ) : (
                <span className="text-[var(--text-muted)] truncate">
                  GET /api/team · Ready
                </span>
              )}

              {/* Inspect Query Button */}
              {liveTelemetry && (
                <button
                  type="button"
                  onClick={() => onInspectQuery(liveTelemetry.endpoint)}
                  aria-label="Inspect query in API Inspector"
                  title="Inspect real /api/team response payload"
                  className="ml-1 min-h-[44px] md:min-h-[28px] inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[var(--accent-blue-text)] border border-[#4285F4]/25 transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <Terminal className="w-3 h-3 shrink-0" />
                  <span>Inspect</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <span className="inline-flex rounded-full h-2 w-2 bg-[#4285F4] shrink-0" />
              <span>STATIC EDGE // ZERO_LATENCY (0.0 ms)</span>
              <span className="hidden md:inline px-1.5 py-0.2 rounded bg-[var(--bg-subtle)] text-[10px] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
                In-Memory
              </span>
            </div>
          )}
        </div>

        {/* Right Data Source Switcher: Static Edge vs Live API */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => onDataSourceModeChange('static')}
            aria-pressed={dataSourceMode === 'static'}
            className={`relative min-h-[44px] md:min-h-[34px] inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
              dataSourceMode === 'static'
                ? 'text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {dataSourceMode === 'static' && (
              <motion.div
                layoutId="team-datasource-pill"
                className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Zap className="w-3 h-3 text-[var(--accent-blue-text)] shrink-0" />
            <span>Static Edge</span>
          </button>

          <button
            type="button"
            onClick={() => onDataSourceModeChange('live')}
            aria-pressed={dataSourceMode === 'live'}
            className={`relative min-h-[44px] md:min-h-[34px] inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
              dataSourceMode === 'live'
                ? 'text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {dataSourceMode === 'live' && (
              <motion.div
                layoutId="team-datasource-pill"
                className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Activity className="w-3 h-3 text-[var(--accent-green-text)] shrink-0" />
            <span>Live /api/team</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* ROW 1: SEARCH INPUT & PRIMARY TOOLS (VIEW SWITCHER + SPECS)   */}
      {/* ============================================================= */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Real-Time Search Input with Clear Button */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            ref={searchInputRef}
            data-instant-search="true"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search fictional builders by name, role, or stack..."
            aria-label="Search fictional builders by name, role, or stack"
            className="w-full min-h-[40px] pl-10 pr-20 py-1.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-strong)] focus:border-[#4285F4] text-xs sm:text-sm font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] transition-all"
          />

          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd
              aria-hidden="true"
              className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--border-hairline)]"
            >
              /
            </kbd>
          </div>
        </div>

        {/* View Switcher, Specs Toggle & Reset Filters Button */}
        <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
          {/* Segmented View Mode Switcher (Roster Grid | Chapter Topology) */}
          <div
            role="group"
            aria-label="Team directory display view"
            className="flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]"
          >
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              aria-pressed={viewMode === 'grid'}
              aria-label="Switch to Roster Grid view"
              className={`relative min-h-[44px] md:min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                viewMode === 'grid'
                  ? 'text-[var(--text-primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {viewMode === 'grid' && (
                <motion.div
                  layoutId="team-view-mode-pill"
                  transition={{
                    type: 'spring',
                    stiffness: prefersReducedMotion ? 1000 : 400,
                    damping: 35,
                  }}
                  className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Roster Grid</span>
                <span className="sm:hidden">Grid</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange('topology')}
              aria-pressed={viewMode === 'topology'}
              aria-label="Switch to Chapter Topology circuit view"
              className={`relative min-h-[44px] md:min-h-[38px] px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                viewMode === 'topology'
                  ? 'text-[var(--text-primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {viewMode === 'topology' && (
                <motion.div
                  layoutId="team-view-mode-pill"
                  transition={{
                    type: 'spring',
                    stiffness: prefersReducedMotion ? 1000 : 400,
                    damping: 35,
                  }}
                  className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Chapter Topology</span>
                <span className="sm:hidden">Topology</span>
              </span>
            </button>
          </div>

          {/* Global Inspect All Specs Toggle */}
          <button
            type="button"
            onClick={onToggleInspectAll}
            aria-pressed={inspectAll}
            aria-label={
              inspectAll
                ? 'Show builder profiles for all cards'
                : 'Inspect technical builder specs for all cards'
            }
            className={`min-h-[44px] md:min-h-[42px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center justify-center gap-2 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
              inspectAll
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm hover:bg-[#1E40AF]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-primary)] border-[var(--border-strong)] hover:border-[#4285F4] hover:text-[var(--accent-blue-text)]'
            }`}
          >
            {inspectAll ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 shrink-0 text-white" aria-hidden="true" />
                <span className="hidden sm:inline">Show Profiles ↺</span>
                <span className="sm:hidden">Profiles ↺</span>
              </>
            ) : (
              <>
                <RotateCw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Inspect All Specs ↻</span>
                <span className="sm:hidden">Specs ↻</span>
              </>
            )}
          </button>

          {/* Reset Filters Button (Appears whenever any filter is active) */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              aria-label="Reset all search queries and active filters"
              className="min-h-[44px] md:min-h-[42px] px-3 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--accent-red-text)] border border-[var(--border-hairline)] hover:border-[#EA4335]/40 text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA4335]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================= */}
      {/* ROW 2: DEPARTMENT VERTICAL TABS                               */}
      {/* ============================================================= */}
      <div
        role="tablist"
        aria-label="Filter builders by department vertical"
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
              className={`relative min-h-[44px] md:min-h-[36px] px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors shrink-0 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                isActive
                  ? 'bg-[#0F172A] text-[#FFFFFF] dark:bg-[#F8FAFC] dark:text-[#0A0D12] font-semibold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]/70 border border-transparent'
              }`}
            >
              {/* Dot & Label */}
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-transform"
                  style={{
                    backgroundColor: tab.dotColor,
                    boxShadow: isActive ? `0 0 6px ${tab.dotColor}80` : 'none',
                  }}
                />
                <span className="whitespace-nowrap">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================= */}
      {/* ROW 3: QUICK SKILL & TECH STACK FILTER CHIPS                 */}
      {/* ============================================================= */}
      <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider shrink-0 mr-1">
          Stack:
        </span>

        {QUICK_SKILL_CHIPS.map((chip) => {
          const isActive =
            (chip.id === 'All Stacks' && (!selectedSkill || selectedSkill === 'All Stacks')) ||
            selectedSkill.toLowerCase() === chip.id.toLowerCase() ||
            (chip.id === 'Gemini' && selectedSkill.toLowerCase().includes('gemini'));

          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onSelectSkill(chip.id === 'All Stacks' ? '' : chip.id)}
              aria-pressed={isActive}
              className={`min-h-[44px] md:min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 whitespace-nowrap cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                isActive
                  ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] font-semibold shadow-xs'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {chip.label}
            </button>
          );
        })}

        {/* Custom skill chip if selected from a builder card and not in predefined list */}
        {selectedSkill && !isPredefinedSkill && (
          <div className="flex items-center gap-1 shrink-0">
            <span className="min-h-[44px] md:min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-mono bg-[#1D4ED8] text-white border border-[#1D4ED8] font-semibold shadow-xs flex items-center gap-1.5 whitespace-nowrap">
              <span>{selectedSkill}</span>
              <button
                type="button"
                onClick={() => onSelectSkill('')}
                aria-label={`Clear ${selectedSkill} filter`}
                className="hover:bg-white/20 rounded p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
