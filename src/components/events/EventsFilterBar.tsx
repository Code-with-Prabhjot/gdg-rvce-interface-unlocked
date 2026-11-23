'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, LayoutGrid, List, CalendarDays, RotateCcw } from 'lucide-react';
import { EventCategory, DeliveryMode, EventStatus } from '@/data/gdgData';

export type StatusFilter = 'All' | EventStatus;
export type TrackFilter = 'All' | EventCategory;
export type ModeFilter = 'All' | DeliveryMode;
export type ViewMode = 'grid' | 'list' | 'calendar';

interface EventsFilterBarProps {
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
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalResultsCount: number;
}

const STATUS_OPTIONS: { id: StatusFilter; label: string }[] = [
  { id: 'All', label: 'All Sessions' },
  { id: 'Upcoming', label: 'Upcoming' },
  { id: 'Past', label: 'Past Recaps' },
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
  onResetFilters,
  hasActiveFilters,
  totalResultsCount,
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
    <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs p-4 sm:p-5 space-y-4 mb-8">
      {/* ============================================================= */}
      {/* ROW 1: STATUS SWITCH, REAL-TIME SEARCH, & VIEW MODE TOGGLE    */}
      {/* ============================================================= */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Status Segmented Control with Framer Motion spring pill */}
        <div className="inline-flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] self-start sm:self-auto shrink-0">
          {STATUS_OPTIONS.map((option) => {
            const isActive = statusFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onStatusChange(option.id)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 ${
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
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Search Input Container */}
        <div className="relative flex-1 max-w-2xl">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sessions, speakers, tech tags, venues... (Press '/' to focus)"
              aria-label="Search events"
              className="w-full pl-10 pr-20 py-2 sm:py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] focus:border-[#4285F4] focus:outline-hidden text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all font-sans"
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
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
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
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 ${
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
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            aria-label="Switch to schedule list view"
            title="Schedule List View"
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 ${
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
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('calendar')}
            aria-label="Calendar Matrix View"
            title="Calendar Matrix View"
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors z-10 ${
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
            <CalendarDays className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Calendar</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* ROW 2: TRACK & DELIVERY MODE PILLS + RESET ACTIVE FILTERS     */}
      {/* ============================================================= */}
      <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Track & Mode Pills Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Track Filter Pills */}
          <span className="text-[11px] font-mono font-semibold uppercase text-[var(--text-muted)] mr-1 hidden sm:inline">
            Track:
          </span>
          {TRACK_OPTIONS.map((track) => {
            const isSelected = trackFilter === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onTrackChange(track.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] font-bold shadow-xs'
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

          <div className="h-4 w-px bg-[var(--border-hairline)] mx-1 hidden sm:block" />

          {/* Delivery Mode Filter Pills */}
          <span className="text-[11px] font-mono font-semibold uppercase text-[var(--text-muted)] mr-1 hidden sm:inline">
            Mode:
          </span>
          {MODE_OPTIONS.map((mode) => {
            const isSelected = modeFilter === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onModeChange(mode.id)}
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] font-bold shadow-xs'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)]'
                }`}
              >
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Telemetry count & Clear All Filters button */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono">
          <span className="text-[var(--text-muted)]">
            {totalResultsCount} {totalResultsCount === 1 ? 'session' : 'sessions'}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#EA4335] hover:text-[#C5221F] bg-[#EA4335]/10 hover:bg-[#EA4335]/20 px-2.5 py-1 rounded-lg transition-colors border border-[#EA4335]/20"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
