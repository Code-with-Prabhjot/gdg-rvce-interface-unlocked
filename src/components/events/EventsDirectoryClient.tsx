'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import {
  EVENTS_DATA,
  EventCategory,
  DeliveryMode,
  GDGEvent,
} from '@/data/gdgData';
import { EventsHeroHeader } from './EventsHeroHeader';
import { TrackFormatComparator } from './TrackFormatComparator';
import {
  EventsFilterBar,
  StatusFilter,
  TrackFilter,
  ModeFilter,
  ViewMode,
  DataSourceMode,
  EventSortOrder,
} from './EventsFilterBar';
import { EventDirectoryCard } from './EventDirectoryCard';
import { EventsCalendarView } from './EventsCalendarView';
import { EventsSceneStrip } from './EventsSceneStrip';
import { EventDetailDrawer } from './EventDetailDrawer';
import { useSavedEvents } from '@/context/SavedEventsContext';
import { useApiInspector } from '@/context/ApiInspectorContext';
import { useDemoAuth } from '@/context/DemoAuthContext';
import { downloadBundleIcs } from '@/utils/calendarExport';
import { MaintainerPreviewBar } from '@/components/ui/MaintainerPreviewBar';

export function EventsDirectoryClient() {
  const searchParams = useSearchParams();
  const { savedSlugs } = useSavedEvents();
  const { openWithPreset } = useApiInspector();
  const { featuredEventSlug } = useDemoAuth();
  const [sortOrder, setSortOrder] = useState<EventSortOrder>('asc');

  // Read initial URL params
  const paramStatus = searchParams.get('status');
  const paramTrack = searchParams.get('track');
  const paramMode = searchParams.get('mode');
  const paramEvent = searchParams.get('event');
  const paramPassId = searchParams.get('passId');
  const paramVerify = searchParams.get('verify');

  const [qrVerifyParams, setQrVerifyParams] = useState<{
    passId: string | null;
    autoVerify: boolean;
  }>(() => ({
    passId: paramPassId,
    autoVerify: paramVerify === '1',
  }));

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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Phase 18: Live /api/events Query Mode & Personal Saved Sprints
  const [dataSourceMode, setDataSourceMode] = useState<DataSourceMode>('static');
  const [onlySaved, setOnlySaved] = useState(false);
  const [liveEvents, setLiveEvents] = useState<GDGEvent[]>(EVENTS_DATA);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const [liveTelemetry, setLiveTelemetry] = useState<{
    endpoint: string;
    status: number;
    latencyMs: number;
  } | null>(null);

  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(() => {
    if (!paramEvent) return null;
    const exists = EVENTS_DATA.some((e) => e.slug === paramEvent);
    return exists ? paramEvent : null;
  });

  // Debounce search query by 220ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 220);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // URL Query Synchronization helper (uses window.history.replaceState to avoid router transition flicker)
  const syncUrlParams = useCallback(
    (
      newStatus: StatusFilter,
      newTrack: TrackFilter,
      newMode: ModeFilter,
      newEventSlug: string | null
    ) => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams();
      if (newStatus !== 'All') params.set('status', newStatus);
      if (newTrack !== 'All') params.set('track', newTrack);
      if (newMode !== 'All') params.set('mode', newMode);
      if (newEventSlug) params.set('event', newEventSlug);

      const queryString = params.toString();
      const targetUrl = queryString ? `/events?${queryString}` : '/events';
      window.history.replaceState(null, '', targetUrl);
    },
    []
  );

  // Sync external URL changes (e.g. Next.js Link navigations or browser back/forward)
  const searchParamsKey = searchParams.toString();
  useEffect(() => {
    const curStatus = searchParams.get('status');
    if (curStatus) {
      if (curStatus.toLowerCase() === 'upcoming') setStatusFilter('Upcoming');
      else if (curStatus.toLowerCase() === 'past') setStatusFilter('Past');
    }
    const curEvent = searchParams.get('event');
    const curPassId = searchParams.get('passId');
    const curVerify = searchParams.get('verify');
    if (curEvent && EVENTS_DATA.some((e) => e.slug === curEvent)) {
      setSelectedEventSlug(curEvent);
      setQrVerifyParams({
        passId: curPassId,
        autoVerify: curVerify === '1',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsKey]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const curEvent = params.get('event');
      const curPassId = params.get('passId');
      const curVerify = params.get('verify');
      setSelectedEventSlug(
        curEvent && EVENTS_DATA.some((e) => e.slug === curEvent) ? curEvent : null
      );
      setQrVerifyParams({
        passId: curPassId,
        autoVerify: curVerify === '1',
      });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Execute real fetch against /api/events when in Live API mode
  useEffect(() => {
    if (dataSourceMode !== 'live') return;

    let isCurrent = true;
    setIsFetchingLive(true);

    const params = new URLSearchParams();
    if (statusFilter !== 'All') params.set('status', statusFilter.toLowerCase());
    if (trackFilter !== 'All') params.set('track', trackFilter);
    if (modeFilter !== 'All') params.set('mode', modeFilter);
    if (debouncedSearchQuery.trim()) params.set('q', debouncedSearchQuery.trim());

    const queryString = params.toString();
    const endpoint = queryString ? `/api/events?${queryString}` : '/api/events';

    const startTime = performance.now();

    fetch(endpoint)
      .then(async (res) => {
        const json = await res.json();
        return { ok: res.ok, status: res.status, json };
      })
      .then(({ ok, status, json }) => {
        if (!isCurrent) return;
        const elapsed = Number((performance.now() - startTime).toFixed(1));
        const latencyMs =
          typeof json.meta?.executionMs === 'number' ? json.meta.executionMs : elapsed;

        setLiveTelemetry({
          endpoint,
          status,
          latencyMs,
        });

        if (ok && Array.isArray(json.data?.events)) {
          setLiveEvents(json.data.events);
        } else {
          setLiveEvents(EVENTS_DATA);
        }
      })
      .catch(() => {
        if (!isCurrent) return;
        const elapsed = Number((performance.now() - startTime).toFixed(1));
        setLiveTelemetry({
          endpoint,
          status: 500,
          latencyMs: elapsed,
        });
        setLiveEvents(EVENTS_DATA);
      })
      .finally(() => {
        if (isCurrent) {
          setIsFetchingLive(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [dataSourceMode, statusFilter, trackFilter, modeFilter, debouncedSearchQuery]);

  const handleCloseDrawer = useCallback(() => {
    setSelectedEventSlug(null);
    setQrVerifyParams({ passId: null, autoVerify: false });
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

  const handleSelectEvent = useCallback(
    (slug: string) => {
      setSelectedEventSlug(slug);
      setQrVerifyParams({ passId: null, autoVerify: false });
      syncUrlParams(statusFilter, trackFilter, modeFilter, slug);
    },
    [syncUrlParams, statusFilter, trackFilter, modeFilter]
  );

  const handleResetFilters = () => {
    setStatusFilter('All');
    setTrackFilter('All');
    setModeFilter('All');
    setSearchQuery('');
    setOnlySaved(false);
    syncUrlParams('All', 'All', 'All', selectedEventSlug);
  };

  const handleInspectQuery = (endpoint: string) => {
    openWithPreset({
      method: 'GET',
      endpoint,
    });
  };

  const hasActiveFilters =
    statusFilter !== 'All' ||
    trackFilter !== 'All' ||
    modeFilter !== 'All' ||
    searchQuery.trim().length > 0 ||
    onlySaved;

  // Filtered Events Calculation for Static Edge mode
  const staticFilteredEvents = useMemo(() => {
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
        const matchesSpeaker =
          event.speaker.name.toLowerCase().includes(q) ||
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

  // Final filtered & chronologically sorted list based on Active Data Source Mode + Saved Sprints
  const filteredEvents = useMemo(() => {
    const baseList = dataSourceMode === 'live' ? liveEvents : staticFilteredEvents;
    const savedFiltered = onlySaved
      ? baseList.filter((ev) => savedSlugs.includes(ev.slug))
      : [...baseList];

    // Upcoming is strictly ascending (soonest sprint / fewest days remaining first).
    // All Sessions & Past Recaps obey the Chronological / Latest First toggle.
    const direction = statusFilter === 'Upcoming' ? 1 : sortOrder === 'asc' ? 1 : -1;
    return savedFiltered.sort(
      (a, b) =>
        (new Date(a.isoStart).getTime() - new Date(b.isoStart).getTime()) *
        direction
    );
  }, [
    dataSourceMode,
    liveEvents,
    staticFilteredEvents,
    onlySaved,
    savedSlugs,
    statusFilter,
    sortOrder,
  ]);

  // Export multi-session bundle .ics
  const handleExportSavedBundle = useCallback(() => {
    const savedItems = EVENTS_DATA.filter((ev) => savedSlugs.includes(ev.slug));
    if (savedItems.length > 0) {
      downloadBundleIcs(savedItems);
    }
  }, [savedSlugs]);

  // Current selected event for drawer
  const selectedEvent = useMemo(() => {
    if (!selectedEventSlug) return null;
    return EVENTS_DATA.find((e) => e.slug === selectedEventSlug) || null;
  }, [selectedEventSlug]);

  return (
    <div className="w-full">
      {/* 0. Role-Based Chapter Maintainer Preview Bar (Phase 23) */}
      <MaintainerPreviewBar surfaceLabel="Events Directory" />

      {/* ============================================================= */}
      {/* 1. ARCHITECTURAL HERO HEADER                                  */}
      {/* ============================================================= */}
      <EventsHeroHeader />

      {/* ============================================================= */}
      {/* 1.5 INTERACTIVE 4-TRACK FORMAT MATRIX (Phase 18)              */}
      {/* ============================================================= */}
      <TrackFormatComparator
        activeTrack={trackFilter}
        onSelectTrack={handleTrackChange}
      />

      {/* ============================================================= */}
      {/* 2. MULTI-AXIS FILTER BAR WITH LIVE API TELEMETRY              */}
      {/* ============================================================= */}
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
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        totalResultsCount={filteredEvents.length}
        dataSourceMode={dataSourceMode}
        onDataSourceModeChange={setDataSourceMode}
        liveTelemetry={liveTelemetry}
        isFetchingLive={isFetchingLive}
        onInspectQuery={handleInspectQuery}
        onlySaved={onlySaved}
        onOnlySavedChange={setOnlySaved}
        savedCount={savedSlugs.length}
        onExportSavedBundle={handleExportSavedBundle}
      />

      {/* ============================================================= */}
      {/* 3. EVENTS DIRECTORY GRID / LIST / CALENDAR OR EMPTY STATE     */}
      {/* ============================================================= */}
      {isFetchingLive ? (
        /* Subtle 3-Card Shimmer Skeleton while Live API Query is In Flight */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-pulse mb-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] overflow-hidden p-5 space-y-4"
            >
              <div className="w-full aspect-[16/9] rounded-xl bg-[var(--bg-subtle)]" />
              <div className="space-y-2.5">
                <div className="w-24 h-4 rounded-full bg-[var(--bg-subtle)]" />
                <div className="w-4/5 h-6 rounded-md bg-[var(--bg-subtle)]" />
                <div className="w-full h-10 rounded-md bg-[var(--bg-subtle)]/70" />
              </div>
              <div className="pt-2 flex justify-between items-center">
                <div className="w-28 h-4 rounded-md bg-[var(--bg-subtle)]" />
                <div className="w-24 h-8 rounded-lg bg-[var(--bg-subtle)]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
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
                    isSpotlight={event.slug === featuredEventSlug}
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
                    isSpotlight={event.slug === featuredEventSlug}
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
                  {onlySaved
                    ? 'No saved sprints yet'
                    : 'No matching sessions found'}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  {onlySaved
                    ? 'Bookmark sessions using the bookmark icon on any session card or drawer to build your personal sprint schedule.'
                    : "We couldn't find any sessions matching your filter criteria. Try adjusting your search keyword, selecting \"All Tracks\", or resetting all filters."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

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
        initialPassId={qrVerifyParams.passId}
        autoVerify={qrVerifyParams.autoVerify}
      />
    </div>
  );
}
