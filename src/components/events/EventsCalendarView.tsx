'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { GDGEvent, EventCategory } from '@/data/gdgData';

interface EventsCalendarViewProps {
  events: GDGEvent[];
  onSelectEvent: (slug: string) => void;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SHORT_MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WEEKDAY_HEADERS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

/**
 * Timezone-safe local date parser for ISO strings (e.g. 2026-12-12T09:30:00+05:30)
 */
function parseEventIsoDate(isoString: string) {
  const [datePart] = isoString.split('T');
  const [yearStr, monthStr, dayStr] = datePart.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10); // 1-12
  const day = parseInt(dayStr, 10);
  const yyyyMm = `${yearStr}-${monthStr.padStart(2, '0')}`;
  return { year, month, day, yyyyMm };
}

/**
 * Returns color tokens for Google tracks with WCAG AAA compliance for Yellow
 */
function getTrackColorTokens(category: EventCategory) {
  switch (category) {
    case 'Hackathon':
      return {
        accent: '#EA4335',
        bg: 'rgba(234, 67, 53, 0.14)',
        border: 'rgba(234, 67, 53, 0.45)',
        text: 'var(--accent-red-text)',
        badgeBg: '#C5221F',
        badgeText: '#FFFFFF',
      };
    case 'Workshop':
      return {
        accent: '#4285F4',
        bg: 'rgba(66, 133, 244, 0.14)',
        border: 'rgba(66, 133, 244, 0.45)',
        text: 'var(--accent-blue-text)',
        badgeBg: '#1D4ED8',
        badgeText: '#FFFFFF',
      };
    case 'Study Jam':
      return {
        accent: '#FBBC04',
        bg: 'rgba(251, 188, 4, 0.18)',
        border: 'rgba(251, 188, 4, 0.55)',
        text: 'var(--accent-yellow-text)',
        badgeBg: '#FBBC04',
        badgeText: '#111827', // Pair #FBBC04 with #111827 dark ink for WCAG AAA contrast
      };
    case 'Tech Talk':
      return {
        accent: '#34A853',
        bg: 'rgba(52, 168, 83, 0.14)',
        border: 'rgba(52, 168, 83, 0.45)',
        text: 'var(--accent-green-text)',
        badgeBg: '#15803D',
        badgeText: '#FFFFFF',
      };
  }
}

export function EventsCalendarView({ events, onSelectEvent }: EventsCalendarViewProps) {
  // 1. Extract all unique YYYY-MM months from filtered events (or fallback months)
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    events.forEach((ev) => {
      const { yyyyMm } = parseEventIsoDate(ev.isoStart);
      set.add(yyyyMm);
    });

    const sorted = Array.from(set).sort();
    if (sorted.length > 0) return sorted;
    // Fallback default months if no events match active filter
    return ['2026-11', '2026-12', '2027-01'];
  }, [events]);

  // 2. Default to month of the first upcoming event (e.g., December 2026), or earliest
  const defaultMonth = useMemo(() => {
    const upcoming = events.find((e) => e.status === 'Upcoming');
    if (upcoming) {
      return parseEventIsoDate(upcoming.isoStart).yyyyMm;
    }
    return availableMonths[0] || '2026-12';
  }, [events, availableMonths]);

  const [activeMonthKey, setActiveMonthKey] = useState<string>(defaultMonth);
  const activeMonthRef = useRef(activeMonthKey);
  activeMonthRef.current = activeMonthKey;

  useEffect(() => {
    const currentHasEvents = events.some(
      (ev) => parseEventIsoDate(ev.isoStart).yyyyMm === activeMonthRef.current
    );
    if (!currentHasEvents && defaultMonth) {
      setActiveMonthKey(defaultMonth);
    }
  }, [events, defaultMonth]);

  // Parse active year and month
  const [currentYear, currentMonth] = useMemo(() => {
    const [yStr, mStr] = (activeMonthKey || defaultMonth).split('-');
    return [parseInt(yStr, 10), parseInt(mStr, 10)];
  }, [activeMonthKey, defaultMonth]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    let nextMonth = currentMonth - 1;
    let nextYear = currentYear;
    if (nextMonth < 1) {
      nextMonth = 12;
      nextYear -= 1;
    }
    setActiveMonthKey(`${nextYear}-${String(nextMonth).padStart(2, '0')}`);
  };

  const handleNextMonth = () => {
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    setActiveMonthKey(`${nextYear}-${String(nextMonth).padStart(2, '0')}`);
  };

  // Filter events in currently active month
  const monthEvents = useMemo(() => {
    return events.filter((ev) => {
      const { yyyyMm } = parseEventIsoDate(ev.isoStart);
      return yyyyMm === activeMonthKey;
    });
  }, [events, activeMonthKey]);

  // Calendar matrix geometry calculation for current month (Monday = 0, Sunday = 6)
  const calendarCells = useMemo(() => {
    // First day of current month: 0=Sun, 1=Mon, ..., 6=Sat
    const firstDayJs = new Date(currentYear, currentMonth - 1, 1).getDay();
    // Convert to Monday-first (0=Mon ... 6=Sun)
    const firstDayIndex = (firstDayJs + 6) % 7;

    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();

    const cells: {
      type: 'prev' | 'current' | 'next';
      day: number;
      dateKey: string;
      events: GDGEvent[];
    }[] = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      cells.push({
        type: 'prev',
        day: dayNum,
        dateKey: `prev-${dayNum}`,
        events: [],
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dayEvents = monthEvents.filter((ev) => {
        const { day } = parseEventIsoDate(ev.isoStart);
        return day === d;
      });

      cells.push({
        type: 'current',
        day: d,
        dateKey: `${activeMonthKey}-${String(d).padStart(2, '0')}`,
        events: dayEvents,
      });
    }

    // Next month padding days to complete full week rows
    const remainder = cells.length % 7;
    if (remainder > 0) {
      const nextDaysNeeded = 7 - remainder;
      for (let n = 1; n <= nextDaysNeeded; n++) {
        cells.push({
          type: 'next',
          day: n,
          dateKey: `next-${n}`,
          events: [],
        });
      }
    }

    return cells;
  }, [currentYear, currentMonth, activeMonthKey, monthEvents]);

  // Group events for mobile chronological list
  const mobileGroupedEvents = useMemo(() => {
    const map = new Map<number, GDGEvent[]>();
    monthEvents.forEach((ev) => {
      const { day } = parseEventIsoDate(ev.isoStart);
      const list = map.get(day) || [];
      list.push(ev);
      map.set(day, list);
    });

    const sortedDays = Array.from(map.keys()).sort((a, b) => a - b);
    return sortedDays.map((day) => ({
      day,
      events: map.get(day) || [],
    }));
  }, [monthEvents]);

  return (
    <div className="w-full space-y-6">
      {/* ============================================================= */}
      {/* 1. MONTH SWITCHER HEADER                                      */}
      {/* ============================================================= */}
      <div className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
        {/* Left: Active Month Display & Telemetry Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 flex items-center justify-center text-[var(--accent-blue-text)] shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                {MONTH_NAMES[currentMonth - 1]} {currentYear}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
                {monthEvents.length} {monthEvents.length === 1 ? 'session' : 'sessions'}
              </span>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              CALENDAR MATRIX // GDG RVCE SESSION DIRECTORY
            </p>
          </div>
        </div>

        {/* Center/Right: Quick Month Pills & Step Buttons */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2">
          {/* Quick Month Selectors */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] overflow-x-auto">
            {availableMonths.map((mKey) => {
              const [y, m] = mKey.split('-');
              const shortLabel = `${SHORT_MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`;
              const isActive = mKey === activeMonthKey;

                return (
                <button
                  key={mKey}
                  type="button"
                  onClick={() => setActiveMonthKey(mKey)}
                  className={`min-h-[44px] md:min-h-[32px] inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0F172A] text-[#FFFFFF] dark:bg-[#F8FAFC] dark:text-[#0A0D12] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>

          {/* Previous / Next Month Arrows */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="min-w-[44px] min-h-[44px] md:min-w-[36px] md:min-h-[36px] inline-flex items-center justify-center p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-elevated)] border border-[var(--border-hairline)] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="min-w-[44px] min-h-[44px] md:min-w-[36px] md:min-h-[36px] inline-flex items-center justify-center p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-elevated)] border border-[var(--border-hairline)] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. DESKTOP 7-COLUMN ARCHITECTURAL CALENDAR GRID (md:grid)      */}
      {/* ============================================================= */}
      <div className="hidden md:block rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] overflow-hidden shadow-xs">
        {/* Weekday Column Headers */}
        <div className="grid grid-cols-7 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
          {WEEKDAY_HEADERS.map((weekday, i) => (
            <div
              key={weekday}
              className={`py-3 px-3 text-center text-xs font-mono font-bold tracking-wider ${
                i >= 5 ? 'text-[var(--accent-red-text)]' : 'text-[var(--text-muted)]'
              }`}
            >
              {weekday}
            </div>
          ))}
        </div>

        {/* 7-Column Day Matrix Cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-[var(--border-hairline)]">
          {calendarCells.map((cell) => {
            const isCurrentMonth = cell.type === 'current';
            const hasEvents = cell.events.length > 0;

            return (
              <div
                key={cell.dateKey}
                className={`min-h-[136px] p-2 sm:p-2.5 transition-colors flex flex-col justify-between ${
                  !isCurrentMonth
                    ? 'bg-[var(--bg-subtle)]/40 text-[var(--text-muted)]/40 opacity-40 select-none'
                    : hasEvents
                    ? 'bg-[var(--bg-subtle)]/60 text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                    : 'bg-transparent text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]/30'
                }`}
              >
                {/* Day Header Row */}
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                      hasEvents
                        ? 'bg-[#0F172A] text-[#FFFFFF] dark:bg-[#F8FAFC] dark:text-[#0A0D12] shadow-2xs'
                        : isCurrentMonth
                        ? 'text-[var(--text-secondary)]'
                        : 'text-[var(--text-muted)]/50'
                    }`}
                  >
                    {String(cell.day).padStart(2, '0')}
                  </span>

                  {hasEvents && (
                    <span className="text-[10px] font-mono font-bold text-[var(--accent-blue-text)]">
                      {cell.events.length} {cell.events.length === 1 ? 'EVT' : 'EVTS'}
                    </span>
                  )}
                </div>

                {/* Day Content: Session Chips */}
                <div className="space-y-1.5 flex-1">
                  {cell.events.map((ev) => {
                    const tokens = getTrackColorTokens(ev.category);
                    const isUpcoming = ev.status === 'Upcoming';

                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => onSelectEvent(ev.slug)}
                        aria-label={`Open details for ${ev.title}`}
                        className="w-full text-left p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group shadow-2xs"
                        style={{
                          backgroundColor: tokens.bg,
                          borderColor: tokens.border,
                        }}
                      >
                        {/* Top: Category Tag + Status Dot */}
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold tracking-wide uppercase truncate"
                            style={{
                              backgroundColor: tokens.badgeBg,
                              color: tokens.badgeText,
                            }}
                          >
                            {ev.category}
                          </span>

                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: isUpcoming ? '#4285F4' : '#34A853',
                            }}
                            title={isUpcoming ? 'Upcoming Session' : 'Past Recap'}
                          />
                        </div>

                        {/* Event Title */}
                        <p className="text-[11px] sm:text-xs font-sans font-semibold text-[var(--text-primary)] line-clamp-2 leading-tight group-hover:text-[var(--text-primary)]">
                          {ev.title}
                        </p>

                        {/* Event Time */}
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-[var(--text-muted)]">
                          <Clock className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{ev.time.split(' ')[0]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================= */}
      {/* 3. MOBILE CHRONOLOGICAL DATE MATRIX (< 768px)                  */}
      {/* ============================================================= */}
      <div className="block md:hidden space-y-4">
        {mobileGroupedEvents.length > 0 ? (
          mobileGroupedEvents.map((group) => (
            <div
              key={group.day}
              className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] overflow-hidden shadow-xs"
            >
              {/* Date Header Pill */}
              <div className="px-4 py-2.5 bg-[var(--bg-subtle)] border-b border-[var(--border-hairline)] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] tracking-wide">
                  {MONTH_NAMES[currentMonth - 1].toUpperCase()} {group.day}, {currentYear}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {group.events.length} {group.events.length === 1 ? 'SESSION' : 'SESSIONS'}
                </span>
              </div>

              {/* Day Events Stack */}
              <div className="p-3 space-y-3">
                {group.events.map((ev) => {
                  const tokens = getTrackColorTokens(ev.category);
                  const isUpcoming = ev.status === 'Upcoming';

                  return (
                    <div
                      key={ev.id}
                      className="p-3.5 rounded-xl border space-y-2.5 bg-[var(--bg-canvas)] transition-all"
                      style={{ borderColor: tokens.border }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase"
                          style={{
                            backgroundColor: tokens.badgeBg,
                            color: tokens.badgeText,
                          }}
                        >
                          {ev.category}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[var(--text-muted)]">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: isUpcoming ? '#4285F4' : '#34A853',
                            }}
                          />
                          {ev.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-sans font-bold text-[var(--text-primary)] leading-snug">
                        {ev.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[var(--text-secondary)]">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[var(--accent-blue-text)]" />
                          {ev.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[var(--accent-red-text)]" />
                          {ev.venue.split(',')[0]}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectEvent(ev.slug)}
                        className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-bold bg-[var(--bg-subtle)] hover:bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-[var(--text-primary)] transition-all cursor-pointer"
                      >
                        <span>Inspect Session Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          /* Empty Month State */
          <div className="p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-center space-y-3">
            <CalendarDays className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
            <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
              No sessions scheduled for this month
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              There are no matching sessions in {MONTH_NAMES[currentMonth - 1]} {currentYear}. Use
              the quick month selectors above to navigate to months with active sessions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
