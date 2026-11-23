'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  MapPin,
  Video,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  EVENTS_DATA,
  EventCategory,
  DeliveryMode,
} from '@/data/gdgData';
import { EventsHeroHeader } from './EventsHeroHeader';
import {
  EventsFilterBar,
  StatusFilter,
  TrackFilter,
  ModeFilter,
  ViewMode,
} from './EventsFilterBar';
import { EventDirectoryCard } from './EventDirectoryCard';

export function EventsDirectoryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial URL params
  const paramStatus = searchParams.get('status');
  const paramTrack = searchParams.get('track');
  const paramMode = searchParams.get('mode');
  const paramEvent = searchParams.get('event');

  // State initialization with URL param hydration
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(() => {
    if (!paramStatus) return 'All';
    if (paramStatus.toLowerCase() === 'upcoming') return 'Upcoming';
    if (paramStatus.toLowerCase() === 'past') return 'Past';
    return 'All';
  });

  const [trackFilter, setTrackFilter] = useState<TrackFilter>(() => {
    if (!paramTrack) return 'All';
    const found = (['Hackathon', 'Workshop', 'Study Jam', 'Tech Talk'] as EventCategory[]).find(
      (t) => t.toLowerCase() === paramTrack.toLowerCase()
    );
    return found || 'All';
  });

  const [modeFilter, setModeFilter] = useState<ModeFilter>(() => {
    if (!paramMode) return 'All';
    const found = (['In-Person', 'Hybrid', 'Online'] as DeliveryMode[]).find(
      (m) => m.toLowerCase() === paramMode.toLowerCase()
    );
    return found || 'All';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(() => {
    if (!paramEvent) return null;
    const exists = EVENTS_DATA.some((e) => e.slug === paramEvent);
    return exists ? paramEvent : null;
  });

  // URL Query Synchronization helper
  const syncUrlParams = useCallback(
    (
      newStatus: StatusFilter,
      newTrack: TrackFilter,
      newMode: ModeFilter,
      newEventSlug: string | null
    ) => {
      const params = new URLSearchParams();
      if (newStatus !== 'All') params.set('status', newStatus);
      if (newTrack !== 'All') params.set('track', newTrack);
      if (newMode !== 'All') params.set('mode', newMode);
      if (newEventSlug) params.set('event', newEventSlug);

      const queryString = params.toString();
      const targetUrl = queryString ? `/events?${queryString}` : '/events';
      router.replace(targetUrl, { scroll: false });
    },
    [router]
  );

  // Sync external URL changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const curStatus = searchParams.get('status');
    if (curStatus) {
      if (curStatus.toLowerCase() === 'upcoming') setStatusFilter('Upcoming');
      else if (curStatus.toLowerCase() === 'past') setStatusFilter('Past');
    }
    const curEvent = searchParams.get('event');
    if (curEvent !== selectedEventSlug) {
      setSelectedEventSlug(curEvent || null);
    }
  }, [searchParams, selectedEventSlug]);

  // Lock body scroll when modal drawer is active
  useEffect(() => {
    if (selectedEventSlug) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEventSlug]);

  const handleCloseDrawer = useCallback(() => {
    setSelectedEventSlug(null);
    syncUrlParams(statusFilter, trackFilter, modeFilter, null);
  }, [syncUrlParams, statusFilter, trackFilter, modeFilter]);

  // Escape key handler to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedEventSlug) {
        handleCloseDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventSlug, handleCloseDrawer]);

  // Action Handlers
  const handleStatusChange = (status: StatusFilter) => {
    setStatusFilter(status);
    syncUrlParams(status, trackFilter, modeFilter, selectedEventSlug);
  };

  const handleTrackChange = (track: TrackFilter) => {
    setTrackFilter(track);
    syncUrlParams(statusFilter, track, modeFilter, selectedEventSlug);
  };

  const handleModeChange = (mode: ModeFilter) => {
    setModeFilter(mode);
    syncUrlParams(statusFilter, trackFilter, mode, selectedEventSlug);
  };

  const handleSelectEvent = (slug: string) => {
    setSelectedEventSlug(slug);
    syncUrlParams(statusFilter, trackFilter, modeFilter, slug);
  };

  const handleResetFilters = () => {
    setStatusFilter('All');
    setTrackFilter('All');
    setModeFilter('All');
    setSearchQuery('');
    syncUrlParams('All', 'All', 'All', selectedEventSlug);
  };

  const hasActiveFilters =
    statusFilter !== 'All' ||
    trackFilter !== 'All' ||
    modeFilter !== 'All' ||
    searchQuery.trim().length > 0;

  // Filtered Events Calculation
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // 1. Status Filter
      if (statusFilter !== 'All' && event.status !== statusFilter) {
        return false;
      }

      // 2. Track Filter
      if (trackFilter !== 'All' && event.category.toLowerCase() !== trackFilter.toLowerCase()) {
        return false;
      }

      // 3. Mode Filter
      if (modeFilter !== 'All' && event.mode.toLowerCase() !== modeFilter.toLowerCase()) {
        return false;
      }

      // 4. Real-Time Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesSummary = (event.summary || '').toLowerCase().includes(q);
        const matchesDesc = (event.description || '').toLowerCase().includes(q);
        const matchesVenue = event.venue.toLowerCase().includes(q);
        const matchesSpeaker = event.speaker.name.toLowerCase().includes(q) ||
          event.speaker.role.toLowerCase().includes(q);
        const matchesCategory = event.category.toLowerCase().includes(q);
        const matchesTags = event.tags.some((t) => t.toLowerCase().includes(q));

        if (
          !matchesTitle &&
          !matchesSummary &&
          !matchesDesc &&
          !matchesVenue &&
          !matchesSpeaker &&
          !matchesCategory &&
          !matchesTags
        ) {
          return false;
        }
      }

      return true;
    });
  }, [statusFilter, trackFilter, modeFilter, searchQuery]);

  // Current selected event for drawer
  const selectedEvent = useMemo(() => {
    if (!selectedEventSlug) return null;
    return EVENTS_DATA.find((e) => e.slug === selectedEventSlug) || null;
  }, [selectedEventSlug]);

  return (
    <div className="w-full">
      {/* 1. ARCHITECTURAL HERO HEADER */}
      <EventsHeroHeader />

      {/* 2. MULTI-AXIS FILTER BAR */}
      <EventsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        trackFilter={trackFilter}
        onTrackChange={handleTrackChange}
        modeFilter={modeFilter}
        onModeChange={handleModeChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        totalResultsCount={filteredEvents.length}
      />

      {/* 3. EVENTS DIRECTORY GRID / LIST OR EMPTY STATE */}
      <AnimatePresence mode="popLayout">
        {filteredEvents.length > 0 ? (
          viewMode === 'grid' ? (
            <motion.div
              key="events-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredEvents.map((event, idx) => (
                <EventDirectoryCard
                  key={event.id}
                  event={event}
                  viewMode="grid"
                  onSelectEvent={handleSelectEvent}
                  index={idx}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="events-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredEvents.map((event, idx) => (
                <EventDirectoryCard
                  key={event.id}
                  event={event}
                  viewMode="list"
                  onSelectEvent={handleSelectEvent}
                  index={idx}
                />
              ))}
            </motion.div>
          )
        ) : (
          /* Zero-Results Tactile Architectural Empty State */
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center p-8 sm:p-14 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-center max-w-2xl mx-auto shadow-xs my-8"
          >
            {/* Architectural Emote */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-6">
              <Image
                src="/assets/emotes/bug-squashed.svg"
                alt="No events found"
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
                <span>QUERY // ZERO_MATCHES</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                No matching sessions found
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any sessions matching your filter criteria. Try adjusting your
                search keyword, selecting &quot;All Tracks&quot;, or resetting all filters.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] transition-all shadow-md hover:shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================= */}
      {/* 4. INTERACTIVE EVENT PREVIEW DRAWER FOUNDATION                */}
      {/* (Slide-over drawer; upgraded in Phase 5 into full deep dive)  */}
      {/* ============================================================= */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[var(--bg-elevated)] border-l border-[var(--border-strong)] shadow-2xl z-10 flex flex-col h-full overflow-hidden"
            >
              {/* Top Bar: Title & Close Button */}
              <div className="px-6 py-4 border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)]/90 backdrop-blur-md flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
                  <span className="text-xs font-mono font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                    SESSION PREVIEW // {selectedEvent.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  aria-label="Close session drawer"
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                {/* 16:9 Cover Image Banner */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-subtle)] shadow-xs">
                  <Image
                    src={selectedEvent.coverImage}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-bold text-white shadow-xs"
                      style={{
                        backgroundColor:
                          selectedEvent.category === 'Study Jam'
                            ? '#FBBC04'
                            : selectedEvent.category === 'Hackathon'
                            ? '#EA4335'
                            : selectedEvent.category === 'Workshop'
                            ? '#4285F4'
                            : '#34A853',
                        color: selectedEvent.category === 'Study Jam' ? '#111827' : '#FFFFFF',
                      }}
                    >
                      {selectedEvent.category}
                    </span>

                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/70 text-white border border-white/20">
                      {selectedEvent.mode}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xs font-mono text-white/80">
                      {selectedEvent.status === 'Upcoming' ? '● Upcoming Session' : 'Past Chapter Recap'}
                    </span>
                  </div>
                </div>

                {/* Event Heading & Metadata */}
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                    {selectedEvent.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border-hairline)]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#4285F4] shrink-0" />
                      <span>{selectedEvent.date} · {selectedEvent.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedEvent.mode === 'Online' ? (
                        <Video className="w-4 h-4 text-[#34A853] shrink-0" />
                      ) : (
                        <MapPin className="w-4 h-4 text-[#EA4335] shrink-0" />
                      )}
                      <span className="truncate">{selectedEvent.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Speaker Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-[var(--border-strong)] shrink-0 bg-[var(--bg-canvas)] shadow-2xs">
                    <Image
                      src={selectedEvent.speaker.avatar || selectedEvent.speaker.avatarUrl || '/assets/avatars/member-01.svg'}
                      alt={selectedEvent.speaker.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                      FEATURED SPEAKER
                    </span>
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                      {selectedEvent.speaker.name}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] font-mono truncate">
                      {selectedEvent.speaker.role} {selectedEvent.speaker.company ? `· ${selectedEvent.speaker.company}` : ''}
                    </p>
                  </div>
                </div>

                {/* Description & Overview */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] block">
                    SESSION OVERVIEW
                  </span>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Prerequisites Checklist */}
                {selectedEvent.prerequisites && selectedEvent.prerequisites.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] block">
                      TECHNICAL PREREQUISITES
                    </span>
                    <ul className="space-y-2">
                      {selectedEvent.prerequisites.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Agenda Timeline Preview */}
                {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] block">
                      SESSION AGENDA TIMELINE
                    </span>
                    <div className="space-y-3 border-l-2 border-[var(--border-hairline)] pl-4 ml-1">
                      {selectedEvent.agenda.map((item, idx) => (
                        <div key={idx} className="relative space-y-1">
                          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#4285F4] border-2 border-[var(--bg-elevated)]" />
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                            <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                              {item.time}
                            </span>
                            <span className="text-xs font-bold text-[var(--text-primary)]">
                              — {item.topic || item.title}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] pl-5">
                            {item.detail || item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] block">
                    TECH STACK &amp; VERTICALS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Phase 5 Coming Soon Telemetry Callout */}
                <div className="p-4 rounded-2xl bg-[#4285F4]/10 border border-[#4285F4]/30 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#4285F4] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-[var(--text-primary)]">
                      Phase 5 Deep-Dive Drawer Foundation
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Interactive .ics calendar downloads, live registration flow, and real-time agenda timeline synchronizer will unlock in Phase 5.
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)] flex items-center justify-between gap-4 shrink-0">
                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] transition-all"
                >
                  Close Preview
                </button>

                <button
                  type="button"
                  disabled
                  title="Unlocks in Phase 5"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-white/90 bg-[#4285F4]/80 cursor-not-allowed opacity-90 shadow-xs"
                >
                  <span>Register &amp; Export (.ics)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
