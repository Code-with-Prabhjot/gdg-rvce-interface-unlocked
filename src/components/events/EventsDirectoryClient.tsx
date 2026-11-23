'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
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
import { EventsCalendarView } from './EventsCalendarView';
import { EventsSceneStrip } from './EventsSceneStrip';
import { EventDetailDrawer } from './EventDetailDrawer';

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

  const handleCloseDrawer = useCallback(() => {
    setSelectedEventSlug(null);
    syncUrlParams(statusFilter, trackFilter, modeFilter, null);
  }, [syncUrlParams, statusFilter, trackFilter, modeFilter]);

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

      {/* 3. EVENTS DIRECTORY GRID / LIST / CALENDAR OR EMPTY STATE */}
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
          ) : viewMode === 'list' ? (
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
          ) : (
            <motion.div
              key="events-calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EventsCalendarView
                events={filteredEvents}
                onSelectEvent={handleSelectEvent}
              />
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
      {/* 4. EDITORIAL CAMPUS BUILD ROOM STRIP (Phase 11)              */}
      {/* ============================================================= */}
      <EventsSceneStrip />

      {/* ============================================================= */}
      {/* 5. FLAGSHIP EVENT DETAIL DRAWER (Phase 5)                     */}
      {/* ============================================================= */}
      <EventDetailDrawer
        event={selectedEvent}
        isOpen={!!selectedEvent}
        filteredEvents={filteredEvents}
        onClose={handleCloseDrawer}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
