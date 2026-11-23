'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Video,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Ticket,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GDGEvent, EventCategory } from '@/data/gdgData';
import { downloadEventIcs } from '@/utils/calendarExport';

interface EventDetailDrawerProps {
  event: GDGEvent | null;
  isOpen: boolean;
  filteredEvents: GDGEvent[];
  onClose: () => void;
  onSelectEvent: (slug: string) => void;
}

// 4 official Google colours for timeline and badges
const GOOGLE_TIMELINE_COLORS = [
  {
    border: '#4285F4',
    bg: 'rgba(66, 133, 244, 0.12)',
    text: '#4285F4',
    name: 'Blue',
  },
  {
    border: '#EA4335',
    bg: 'rgba(234, 67, 53, 0.12)',
    text: '#EA4335',
    name: 'Red',
  },
  {
    border: '#FBBC04',
    bg: 'rgba(251, 188, 4, 0.15)',
    text: '#FBBC04',
    name: 'Yellow',
  },
  {
    border: '#34A853',
    bg: 'rgba(52, 168, 83, 0.12)',
    text: '#34A853',
    name: 'Green',
  },
];

function getCategoryBadge(category: EventCategory) {
  switch (category) {
    case 'Hackathon':
      return {
        bg: '#EA4335',
        text: '#FFFFFF',
        label: 'Hackathon',
      };
    case 'Workshop':
      return {
        bg: '#4285F4',
        text: '#FFFFFF',
        label: 'Workshop',
      };
    case 'Study Jam':
      // Pair #FBBC04 with #111827 dark ink for WCAG AAA contrast
      return {
        bg: '#FBBC04',
        text: '#111827',
        label: 'Study Jam',
      };
    case 'Tech Talk':
      return {
        bg: '#34A853',
        text: '#FFFFFF',
        label: 'Tech Talk',
      };
  }
}

export function EventDetailDrawer({
  event,
  isOpen,
  filteredEvents,
  onClose,
  onSelectEvent,
}: EventDetailDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Local interactive state
  const [copiedLink, setCopiedLink] = useState(false);
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkedPrereqs, setCheckedPrereqs] = useState<Set<number>>(new Set());

  // Reset transient state when event changes
  useEffect(() => {
    setCopiedLink(false);
    setCalendarDownloaded(false);
    setIsRegistered(false);
    setCheckedPrereqs(new Set());
  }, [event?.id]);

  // Stepper calculations
  const currentIndex = event
    ? filteredEvents.findIndex((e) => e.slug === event.slug)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredEvents.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      onSelectEvent(filteredEvents[currentIndex - 1].slug);
    }
  }, [hasPrev, currentIndex, filteredEvents, onSelectEvent]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      onSelectEvent(filteredEvents[currentIndex + 1].slug);
    }
  }, [hasNext, currentIndex, filteredEvents, onSelectEvent]);

  // Keyboard navigation & Accessibility Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore upon close
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Check if user is typing in an input
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput) {
        if (e.key === 'ArrowLeft' && hasPrev) {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'ArrowRight' && hasNext) {
          e.preventDefault();
          handleNext();
        }
      }

      // Focus trap on Tab
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, hasPrev, hasNext, handlePrev, handleNext, onClose]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Copy shareable link
  const handleCopyLink = useCallback(async () => {
    if (!event) return;
    try {
      const shareUrl = `${window.location.origin}/events?event=${event.slug}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  }, [event]);

  // Handle .ics export
  const handleDownloadCalendar = useCallback(() => {
    if (!event) return;
    downloadEventIcs(event);
    setCalendarDownloaded(true);
    setTimeout(() => setCalendarDownloaded(false), 3000);
  }, [event]);

  // Handle sample registration flow
  const handleRegister = useCallback(() => {
    setIsRegistered(true);
    if (!prefersReducedMotion) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [prefersReducedMotion]);

  // Toggle prerequisite checklist item
  const togglePrereq = useCallback((idx: number) => {
    setCheckedPrereqs((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);

  if (!event) return null;

  const categoryBadge = getCategoryBadge(event.category);
  const isUpcoming = event.status === 'Upcoming';
  const totalPrereqs = event.prerequisites?.length || 0;
  const readyPrereqs = checkedPrereqs.size;
  const allPrereqsReady = totalPrereqs > 0 && readyPrereqs === totalPrereqs;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-event-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <motion.div
            ref={drawerRef}
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-full sm:max-w-2xl bg-[var(--bg-elevated)] border-l border-[var(--border-strong)] shadow-2xl z-10 flex flex-col h-full overflow-hidden"
          >
            {/* ========================================================= */}
            {/* 1. STICKY ARCHITECTURAL TOP BAR                           */}
            {/* ========================================================= */}
            <div className="px-5 sm:px-6 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)]/95 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
              {/* Telemetry Tag */}
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: isUpcoming ? '#4285F4' : '#34A853',
                  }}
                />
                <span className="text-xs font-mono font-bold tracking-wider text-[var(--text-muted)] truncate">
                  SESSION // {event.id.toUpperCase()}
                </span>
              </div>

              {/* Top Bar Actions: Copy Link & Close Button (44x44px accessible target) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy session link to clipboard"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
                    copiedLink
                      ? 'bg-[#34A853]/15 text-[#34A853] border-[#34A853]/40'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#34A853]" />
                      <span className="text-[#34A853] font-semibold">Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close session details"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-hairline)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. DRAWER SCROLLABLE CONTENT BODY                         */}
            {/* ========================================================= */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 custom-scrollbar">
              {/* Cover Artwork Container (16:9) with Corner Crosshairs */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-subtle)] shadow-xs select-none">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Corner Crosshairs */}
                <span className="absolute top-2 left-2 z-20 font-mono text-xs font-bold text-white/70 select-none pointer-events-none drop-shadow-xs">
                  +
                </span>
                <span className="absolute top-2 right-2 z-20 font-mono text-xs font-bold text-white/70 select-none pointer-events-none drop-shadow-xs">
                  +
                </span>
                <span className="absolute bottom-2 left-2 z-20 font-mono text-xs font-bold text-white/70 select-none pointer-events-none drop-shadow-xs">
                  +
                </span>
                <span className="absolute bottom-2 right-2 z-20 font-mono text-xs font-bold text-white/70 select-none pointer-events-none drop-shadow-xs">
                  +
                </span>

                {/* Category Pill & Mode Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-20">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-bold shadow-xs tracking-wide"
                    style={{
                      backgroundColor: categoryBadge.bg,
                      color: categoryBadge.text,
                    }}
                  >
                    {categoryBadge.label}
                  </span>

                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/70 backdrop-blur-md text-white border border-white/20">
                    {event.mode}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-2 text-white">
                  {isUpcoming ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#4285F4]/90 backdrop-blur-md text-white border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Upcoming Session
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#34A853]/90 backdrop-blur-md text-white border border-white/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      Past Chapter Recap
                    </span>
                  )}
                </div>
              </div>

              {/* Event Title & Subtitle */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                  <span>GDG RVCE</span>
                  <span>{'//'}</span>
                  <span className="text-[#4285F4]">{event.category}</span>
                </div>
                <h2
                  id="drawer-event-title"
                  className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-tight"
                >
                  {event.title}
                </h2>
                {event.subtitle && (
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {event.subtitle}
                  </p>
                )}
              </div>

              {/* ======================================================= */}
              {/* 4-CELL STRUCTURED METADATA GRID                         */}
              {/* ======================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                {/* Cell 1: Date */}
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                    <span>Session Date</span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    {event.date}
                  </p>
                </div>

                {/* Cell 2: Time */}
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[#EA4335]" />
                    <span>Time Window</span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    {event.time}
                  </p>
                </div>

                {/* Cell 3: Venue / Delivery Mode */}
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    {event.mode === 'Online' ? (
                      <Video className="w-3.5 h-3.5 text-[#34A853]" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-[#FBBC04]" />
                    )}
                    <span>Venue &amp; Mode</span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)] truncate" title={`${event.venue} (${event.mode})`}>
                    {event.venue} ({event.mode})
                  </p>
                </div>

                {/* Cell 4: Session Lead */}
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[var(--border-strong)] shrink-0 bg-[var(--bg-canvas)]">
                    <Image
                      src={
                        event.speaker?.avatar ||
                        event.speaker?.avatarUrl ||
                        '/assets/avatars/member-01.svg'
                      }
                      alt={event.speaker?.name || 'Session Lead'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                      SESSION LEAD
                    </span>
                    <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                      {event.speaker?.name || 'GDG Technical Lead'}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] font-mono truncate">
                      {event.speaker?.role || 'Google Developer Expert'}
                    </p>
                  </div>
                </div>
              </div>

              {/* ======================================================= */}
              {/* 3. INTERACTIVE ACTION BAR (Upcoming vs. Past)           */}
              {/* ======================================================= */}
              {isUpcoming ? (
                <div className="space-y-4">
                  {/* Action Buttons Row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Primary CTA: Register for Session */}
                    {!isRegistered && (
                      <button
                        type="button"
                        onClick={handleRegister}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-bold text-white bg-[#4285F4] hover:bg-[#3367D6] active:scale-[0.98] transition-all shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>Register for Session →</span>
                      </button>
                    )}

                    {/* Secondary CTA: Add to Calendar (.ics) */}
                    <button
                      type="button"
                      onClick={handleDownloadCalendar}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-sm font-semibold transition-all border cursor-pointer ${
                        calendarDownloaded
                          ? 'bg-[#34A853]/15 text-[#34A853] border-[#34A853]/50'
                          : 'bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]/80 border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {calendarDownloaded ? (
                        <>
                          <Check className="w-4 h-4 text-[#34A853]" />
                          <span>.ics Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-[#4285F4]" />
                          <span>Add to Calendar (.ics)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Inline Sample Developer Pass Confirmation Card */}
                  <AnimatePresence>
                    {isRegistered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-2xl bg-[var(--bg-subtle)] border-2 border-[#4285F4]/40 overflow-hidden shadow-lg p-5 sm:p-6 space-y-4"
                      >
                        {/* Architectural Pass Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-dashed border-[var(--border-strong)]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#4285F4] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                              &lt;&gt;
                            </div>
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4285F4] font-bold block">
                                OFFICIAL SAMPLE PASS
                              </span>
                              <h4 className="text-xs font-mono font-bold text-[var(--text-primary)]">
                                GDG on Campus RV College of Engineering
                              </h4>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#34A853]/15 text-[#34A853] font-bold border border-[#34A853]/30">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            CONFIRMED
                          </span>
                        </div>

                        {/* Pass Details */}
                        <div className="space-y-2">
                          <p className="text-xs font-mono text-[var(--text-muted)]">
                            SESSION ATTENDEE PASS //
                          </p>
                          <h3 className="text-base sm:text-lg font-display font-bold text-[var(--text-primary)]">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-[var(--text-secondary)]">
                            <span>📅 {event.date}</span>
                            <span>⏰ {event.time}</span>
                            <span>📍 {event.venue}</span>
                          </div>
                        </div>

                        {/* Barcode / Token Section */}
                        <div className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                              AUTHENTICATION TOKEN
                            </span>
                            <span className="text-xs font-mono font-bold text-[#4285F4] tracking-wider">
                              RVCE-GDG-2026-DEV
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handleDownloadCalendar}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#4285F4] text-white hover:bg-[#3367D6] transition-all cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              <span>Export .ics</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsRegistered(false)}
                              title="Reset registration pass"
                              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-hairline)] transition-all cursor-pointer"
                              aria-label="Reset pass"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Strict Compliance Disclaimer */}
                        <p className="text-[11px] font-mono text-[var(--text-muted)] italic text-center">
                          * Sample UI confirmation for Interface Unlocked demonstration. No personal data stored.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Past Event Archive Recap Verified Banner */
                <div className="p-4 sm:p-5 rounded-2xl bg-[#34A853]/10 border border-[#34A853]/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                    <span className="text-xs font-mono font-bold tracking-wider text-[#34A853] uppercase">
                      ARCHIVE RECAP VERIFIED
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    This session has concluded on campus. Code walkthroughs, repository links, and
                    technical benchmarks remain permanently archived for RVCE student developers.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-elevated)] border border-[#34A853]/30 text-[var(--text-primary)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* SESSION OVERVIEW                                        */}
              {/* ======================================================= */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  SESSION OVERVIEW
                </span>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* ======================================================= */}
              {/* 4. 4-COLOUR SESSION AGENDA TIMELINE                     */}
              {/* ======================================================= */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      SESSION AGENDA TIMELINE
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {event.agenda.length} STEPS
                    </span>
                  </div>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--border-hairline)]">
                    {event.agenda.map((item, idx) => {
                      const color =
                        GOOGLE_TIMELINE_COLORS[idx % GOOGLE_TIMELINE_COLORS.length];
                      return (
                        <div key={idx} className="relative group">
                          {/* Animated 4-Colour Timeline Node */}
                          <div
                            className="absolute -left-[24px] top-1 w-4 h-4 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 flex items-center justify-center bg-[var(--bg-elevated)]"
                            style={{
                              borderColor: color.border,
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: color.border,
                              }}
                            />
                          </div>

                          {/* Agenda Content */}
                          <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="px-2 py-0.5 rounded text-[11px] font-mono font-bold"
                                style={{
                                  backgroundColor: color.bg,
                                  color: color.text,
                                }}
                              >
                                {item.time}
                              </span>
                              <h4 className="text-xs sm:text-sm font-display font-bold text-[var(--text-primary)]">
                                {item.topic || item.title}
                              </h4>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-0.5">
                              {item.detail || item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* 5. INTERACTIVE DEVELOPER READINESS CHECKLIST            */}
              {/* ======================================================= */}
              {event.prerequisites && event.prerequisites.length > 0 && (
                <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                        DEVELOPER READINESS CHECKLIST
                      </span>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Click items to verify your environment setup
                      </p>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border transition-all ${
                        allPrereqsReady
                          ? 'bg-[#34A853]/15 text-[#34A853] border-[#34A853]/40'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-hairline)]'
                      }`}
                    >
                      Ready: {readyPrereqs} / {totalPrereqs} items checked
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden border border-[var(--border-hairline)]">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${(readyPrereqs / totalPrereqs) * 100}%`,
                        backgroundColor: allPrereqsReady ? '#34A853' : '#4285F4',
                      }}
                    />
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-2 pt-1">
                    {event.prerequisites.map((req, idx) => {
                      const isChecked = checkedPrereqs.has(idx);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => togglePrereq(idx)}
                          className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-[#34A853]/10 border-[#34A853]/40 text-[var(--text-primary)]'
                              : 'bg-[var(--bg-elevated)] border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? 'bg-[#34A853] border-[#34A853] text-white'
                                : 'border-[var(--border-strong)] bg-transparent'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span
                            className={`text-xs sm:text-sm leading-snug ${
                              isChecked ? 'line-through opacity-85' : ''
                            }`}
                          >
                            {req}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {allPrereqsReady && (
                    <div className="p-2.5 rounded-xl bg-[#34A853]/15 border border-[#34A853]/30 text-xs font-mono text-[#34A853] font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Ready for build sprint! All prerequisites verified.</span>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================= */}
              {/* TECH STACK & VERTICAL TAGS                              */}
              {/* ======================================================= */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  TECH STACK &amp; VERTICALS
                </span>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 6. DRAWER FOOTER — PREVIOUS / NEXT SESSION STEPPER        */}
            {/* ========================================================= */}
            <div className="p-4 sm:p-5 border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)] flex items-center justify-between gap-3 shrink-0 z-20">
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={!hasPrev}
                aria-label="Previous session (ArrowLeft)"
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  hasPrev
                    ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]/80 cursor-pointer'
                    : 'bg-[var(--bg-subtle)]/40 text-[var(--text-muted)] border-transparent cursor-not-allowed opacity-40'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Stepper Index Indicator */}
              <div className="text-center">
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {currentIndex >= 0 ? (
                    <>
                      SESSION{' '}
                      <span className="font-bold text-[var(--text-primary)]">
                        {String(currentIndex + 1).padStart(2, '0')}
                      </span>{' '}
                      OF {String(filteredEvents.length).padStart(2, '0')}
                    </>
                  ) : (
                    'SESSION PREVIEW'
                  )}
                </span>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasNext}
                aria-label="Next session (ArrowRight)"
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  hasNext
                    ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]/80 cursor-pointer'
                    : 'bg-[var(--bg-subtle)]/40 text-[var(--text-muted)] border-transparent cursor-not-allowed opacity-40'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
