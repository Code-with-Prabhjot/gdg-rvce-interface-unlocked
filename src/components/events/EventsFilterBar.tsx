'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  X,
  LayoutGrid,
  List,
  CalendarDays,
  RotateCcw,
  Bookmark,
  Download,
  Terminal,
  Activity,
  Server,
  Zap,
} from 'lucide-react';
import { EventCategory, DeliveryMode, EventStatus } from '@/data/gdgData';

export type StatusFilter = 'All' | EventStatus;
export type TrackFilter = 'All' | EventCategory;
export type ModeFilter = 'All' | DeliveryMode;
export type ViewMode = 'grid' | 'list' | 'calendar';
export type DataSourceMode = 'static' | 'live';
export type EventSortOrder = 'asc' | 'desc';

export interface EventsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  trackFilter: TrackFilter;
  onTrackChange: (track: TrackFilter) => void;
  modeFilter: ModeFilter;
  onModeChange: (mode: ModeFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortOrder: EventSortOrder;
  onSortOrderChange: (order: EventSortOrder) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalResultsCount: number;

  // Phase 18: Live /api/events Backend Mode & Personal Saved Sprints
  dataSourceMode: DataSourceMode;
  onDataSourceModeChange: (mode: DataSourceMode) => void;
  liveTelemetry: {
    endpoint: string;
    status: number;
    latencyMs: number;
  } | null;
  isFetchingLive: boolean;
  onInspectQuery: (endpoint: string) => void;
  onlySaved: boolean;
  onOnlySavedChange: (saved: boolean) => void;
  savedCount: number;
  onExportSavedBundle: () => void;
}

const STATUS_OPTIONS: { id: StatusFilter; label: string; shortLabel: string }[] = [
  { id: 'All', label: 'All Sessions', shortLabel: 'All' },
  { id: 'Upcoming', label: 'Upcoming', shortLabel: 'Upcoming' },
  { id: 'Past', label: 'Past Recaps', shortLabel: 'Past' },
];

const TRACK_OPTIONS: { id: TrackFilter; label: string; dotColor?: string }[] = [
  { id: 'All', label: 'All Tracks' },
  { id: 'Hackathon', label: 'Hackathon', dotColor: '#EA4335' },
  { id: 'Workshop', label: 'Workshop', dotColor: '#4285F4' },
  { id: 'Study Jam', label: 'Study Jam', dotColor: '#FBBC04' },
  { id: 'Tech Talk', label: 'Tech Talk', dotColor: '#34A853' },
];

const MODE_OPTIONS: { id: ModeFilter; label: string }[] = [
  { id: 'All', label: 'All Modes' },
  { id: 'In-Person', label: 'In-Person' },
  { id: 'Hybrid', label: 'Hybrid' },
  { id: 'Online', label: 'Online' },
];

export function EventsFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  trackFilter,
  onTrackChange,
  modeFilter,
  onModeChange,
  viewMode,
  onViewModeChange,
  sortOrder,
  onSortOrderChange,
  onResetFilters,
  hasActiveFilters,
  totalResultsCount,
  dataSourceMode,
  onDataSourceModeChange,
  liveTelemetry,
  isFetchingLive,
  onInspectQuery,
  onlySaved,
  onOnlySavedChange,
  savedCount,
  onExportSavedBundle,
}: EventsFilterBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global '/' keyboard shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElementTag = (document.activeElement?.tagName || '').toUpperCase();
      if (e.key === '/' && activeElementTag !== 'INPUT' && activeElementTag !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      id="events-filter-bar"
      data-tour="events-controls"
      className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs p-3.5 sm:p-4 space-y-3 mb-6"
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
                  <span className="truncate">GET /api/events · Executing query...</span>
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
                  GET /api/events · Ready
                </span>
              )}

              {/* Inspect Query Button */}
              {liveTelemetry && (
                <button
                  type="button"
                  onClick={() => onInspectQuery(liveTelemetry.endpoint)}
                  aria-label="Inspect query in API Inspector"
                  title="Inspect real query response payload"
                  className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[var(--accent-blue-text)] border border-[#4285F4]/25 transition-all shrink-0 cursor-pointer"
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
            className={`relative min-h-[34px] inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer ${
              dataSourceMode === 'static'
                ? 'text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {dataSourceMode === 'static' && (
              <motion.div
                layoutId="events-datasource-pill"
                className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Zap className="w-3 h-3 text-[#4285F4] shrink-0" />
            <span>Static Edge</span>
          </button>

          <button
            type="button"
            onClick={() => onDataSourceModeChange('live')}
            aria-pressed={dataSourceMode === 'live'}
            className={`relative min-h-[34px] inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer ${
              dataSourceMode === 'live'
                ? 'text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {dataSourceMode === 'live' && (
              <motion.div
                layoutId="events-datasource-pill"
                className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Server className="w-3 h-3 text-[#34A853] shrink-0" />
            <span>Live API</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* ROW 1: STATUS SWITCH, REAL-TIME SEARCH, & VIEW MODE TOGGLE    */}
      {/* ============================================================= */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Status Segmented Control with Framer Motion spring pill */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] self-start sm:self-auto shrink-0 max-w-full overflow-x-auto no-scrollbar">
          {STATUS_OPTIONS.map((option) => {
            const isActive = statusFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onStatusChange(option.id)}
                className={`relative min-h-[38px] sm:min-h-[36px] inline-flex items-center justify-center px-2.5 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="events-status-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="hidden sm:inline">{option.label}</span>
                <span className="sm:hidden">{option.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input Container */}
        <div className="relative flex-1 max-w-2xl">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 pointer-events-none shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sessions, speakers, tech tags, venues... (Press '/' to focus)"
              aria-label="Search events"
              className="w-full min-h-[42px] pl-10 pr-20 py-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] focus:border-[#4285F4] focus:outline-hidden text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all font-sans"
            />

            {/* Clear Button & Shortcut Badge */}
            <div className="absolute right-3 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    searchInputRef.current?.focus();
                  }}
                  className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4 shrink-0" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] font-mono text-[10px] text-[var(--text-muted)] shadow-2xs">
                  /
                </kbd>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Toggle: Grid vs Schedule List vs Calendar Matrix */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            aria-label="Switch to grid view"
            title="Grid View"
            className={`relative min-h-[40px] sm:min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer ${
              viewMode === 'grid'
                ? 'text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {viewMode === 'grid' && (
              <motion.div
                layoutId="events-viewmode-pill"
                className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            aria-label="Switch to schedule list view"
            title="Schedule List View"
            className={`relative min-h-[40px] sm:min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer ${
              viewMode === 'list'
                ? 'text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {viewMode === 'list' && (
              <motion.div
                layoutId="events-viewmode-pill"
                className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <List className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('calendar')}
            aria-label="Calendar Matrix View"
            title="Calendar Matrix View"
            className={`relative min-h-[40px] sm:min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 whitespace-nowrap cursor-pointer ${
              viewMode === 'calendar'
                ? 'text-[var(--text-primary)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {viewMode === 'calendar' && (
              <motion.div
                layoutId="events-viewmode-pill"
                className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Calendar</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* ROW 2: TRACK & MODE PILLS, SAVED FILTER, BUNDLE EXPORT        */}
      {/* ============================================================= */}
      <div className="pt-2.5 border-t border-[var(--border-hairline)] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Side: Track & Mode Pills Group + Personal Saved Pill */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Personal Saved Sprints Bookmark Pill */}
          <button
            type="button"
            onClick={() => onOnlySavedChange(!onlySaved)}
            aria-pressed={onlySaved}
            aria-label={onlySaved ? 'Show all sessions' : 'Filter by saved sessions'}
            className={`min-h-[36px] inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
              onlySaved
                ? 'bg-[#FBBC04] text-[#111827] font-bold shadow-xs border border-[#FBBC04]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)]'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                onlySaved ? 'fill-[#111827] text-[#111827]' : 'text-[var(--text-muted)]'
              }`}
            />
            <span>Saved</span>
            {savedCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  onlySaved
                    ? 'bg-[#111827] text-white'
                    : 'bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-hairline)]'
                }`}
              >
                {savedCount}
              </span>
            )}
          </button>

          {/* Bundle .ics Export CTA when Saved filter is active and at least 1 session is saved */}
          {onlySaved && savedCount > 0 && (
            <button
              type="button"
              onClick={onExportSavedBundle}
              className="min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-[#4285F4] hover:bg-[#3367D6] text-white transition-all shadow-xs hover:shadow-md whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Export Saved Schedule (.ics)</span>
            </button>
          )}

          <div className="h-4 w-px bg-[var(--border-hairline)] mx-1 hidden sm:block shrink-0" />

          {/* Track Filter Pills */}
          <span className="text-[11px] font-mono font-semibold uppercase text-[var(--text-muted)] mr-1 hidden sm:inline whitespace-nowrap">
            Track:
          </span>
          {TRACK_OPTIONS.map((track) => {
            const isSelected = trackFilter === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onTrackChange(track.id)}
                className={`min-h-[34px] inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-[#FFFFFF] dark:bg-[#F8FAFC] dark:text-[#0A0D12] font-bold shadow-xs'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)]'
                }`}
              >
                {track.dotColor && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: track.dotColor }}
                  />
                )}
                <span>{track.label}</span>
              </button>
            );
          })}

          <div className="h-4 w-px bg-[var(--border-hairline)] mx-1 hidden sm:block shrink-0" />

          {/* Delivery Mode Filter Pills */}
          <span className="text-[11px] font-mono font-semibold uppercase text-[var(--text-muted)] mr-1 hidden sm:inline whitespace-nowrap">
            Mode:
          </span>
          {MODE_OPTIONS.map((mode) => {
            const isSelected = modeFilter === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onModeChange(mode.id)}
                className={`min-h-[34px] inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-[#FFFFFF] dark:bg-[#F8FAFC] dark:text-[#0A0D12] font-bold shadow-xs'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)]'
                }`}
              >
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Sort Toggle (All / Past), Telemetry count & Clear All Filters button */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5 text-xs font-mono">
          {(statusFilter === 'All' || statusFilter === 'Past') && (
            <div
              role="group"
              aria-label="Sort sessions chronologically"
              className="inline-flex items-center p-0.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)]"
            >
              <button
                type="button"
                onClick={() => onSortOrderChange('asc')}
                aria-pressed={sortOrder === 'asc'}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all whitespace-nowrap cursor-pointer ${
                  sortOrder === 'asc'
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold border border-[var(--border-strong)] shadow-2xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                Earliest First
              </button>
              <button
                type="button"
                onClick={() => onSortOrderChange('desc')}
                aria-pressed={sortOrder === 'desc'}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all whitespace-nowrap cursor-pointer ${
                  sortOrder === 'desc'
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] font-bold border border-[var(--border-strong)] shadow-2xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                Latest First
              </button>
            </div>
          )}

          <span className="text-[var(--text-muted)] whitespace-nowrap">
            {totalResultsCount} {totalResultsCount === 1 ? 'session' : 'sessions'}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="min-h-[34px] inline-flex items-center justify-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-red-text)] bg-[#EA4335]/10 hover:bg-[#EA4335]/20 px-2.5 py-1 rounded-lg transition-colors border border-[#EA4335]/25 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 shrink-0" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
