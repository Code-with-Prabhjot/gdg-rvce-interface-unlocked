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
  Terminal,
  Bookmark,
  ShieldAlert,
  QrCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GDGEvent, EventCategory } from '@/data/gdgData';
import { downloadEventIcs } from '@/utils/calendarExport';
import { downloadSamplePassPng } from '@/utils/passExport';
import { generateBrandedQrDataUrl } from '@/utils/qrGenerator';
import { useApiInspector } from '@/context/ApiInspectorContext';
import { useSavedEvents } from '@/context/SavedEventsContext';
import { useDemoAuth } from '@/context/DemoAuthContext';
import {
  useIssuedPasses,
  IssuedSamplePass,
} from '@/context/IssuedPassesContext';

interface EventDetailDrawerProps {
  event: GDGEvent | null;
  isOpen: boolean;
  filteredEvents: GDGEvent[];
  onClose: () => void;
  onSelectEvent: (slug: string) => void;
  initialPassId?: string | null;
  autoVerify?: boolean;
}

// 4 official Google colours for timeline and badges
const GOOGLE_TIMELINE_COLORS = [
  {
    border: '#4285F4',
    bg: 'rgba(66, 133, 244, 0.12)',
    textClass: 'text-[var(--accent-blue-text)]',
    name: 'Blue',
  },
  {
    border: '#EA4335',
    bg: 'rgba(234, 67, 53, 0.12)',
    textClass: 'text-[var(--accent-red-text)]',
    name: 'Red',
  },
  {
    border: '#FBBC04',
    bg: 'rgba(251, 188, 4, 0.15)',
    textClass: 'text-[var(--accent-yellow-text)]',
    name: 'Yellow',
  },
  {
    border: '#34A853',
    bg: 'rgba(52, 168, 83, 0.12)',
    textClass: 'text-[var(--accent-green-text)]',
    name: 'Green',
  },
];

function getCategoryBadge(category: EventCategory) {
  switch (category) {
    case 'Hackathon':
      return {
        pillClass: 'bg-[#EA4335]/15 text-[var(--accent-red-text)] border border-[#EA4335]/35',
        dotClass: 'bg-[var(--accent-red-text)]',
        label: 'Hackathon',
      };
    case 'Workshop':
      return {
        pillClass: 'bg-[#4285F4]/15 text-[var(--accent-blue-text)] border border-[#4285F4]/35',
        dotClass: 'bg-[var(--accent-blue-text)]',
        label: 'Workshop',
      };
    case 'Study Jam':
      return {
        pillClass: 'bg-amber-500/15 text-[var(--accent-yellow-text)] border border-amber-500/35',
        dotClass: 'bg-[var(--accent-yellow-text)]',
        label: 'Study Jam',
      };
    case 'Tech Talk':
      return {
        pillClass: 'bg-[#34A853]/15 text-[var(--accent-green-text)] border border-[#34A853]/35',
        dotClass: 'bg-[var(--accent-green-text)]',
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
  initialPassId = null,
  autoVerify = false,
}: EventDetailDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const { openWithPreset } = useApiInspector();
  const { isSaved, toggleSave } = useSavedEvents();
  const { session } = useDemoAuth();
  const {
    isHydrated,
    getPassForEvent,
    saveIssuedPass,
    revokePassForEvent,
  } = useIssuedPasses();
  const isEventSaved = event ? isSaved(event.slug) : false;
  const issuedPass = event ? getPassForEvent(event.slug) : null;

  // Local interactive state
  const [copiedLink, setCopiedLink] = useState(false);
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);
  const [passDownloaded, setPassDownloaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [savedPass, setSavedPass] = useState<IssuedSamplePass | null>(null);
  const [isIssuingPass, setIsIssuingPass] = useState(false);
  const [serverPassId, setServerPassId] = useState<string | null>(null);
  const [serverLatencyMs, setServerLatencyMs] = useState<number | null>(null);
  const [qrPreviewDataUrl, setQrPreviewDataUrl] = useState<string | null>(null);
  const [qrVerifyState, setQrVerifyState] = useState<{
    status: 'idle' | 'loading' | 'verified' | 'invalid';
    passId?: string;
    signaturePrefix?: string;
    reason?: string;
    latencyMs?: number;
  }>({ status: 'idle' });
  const [checkedPrereqs, setCheckedPrereqs] = useState<Set<number>>(new Set());
  const [artworkMode, setArtworkMode] = useState<'schematic' | 'scene'>('schematic');

  // Reset transient state & scroll body cleanly when event changes
  useEffect(() => {
    setCopiedLink(false);
    setCalendarDownloaded(false);
    setPassDownloaded(false);
    setIsRegistered(false);
    setSavedPass(null);
    setIsIssuingPass(false);
    setServerPassId(null);
    setServerLatencyMs(null);
    setQrPreviewDataUrl(null);
    setQrVerifyState({ status: 'idle' });
    setCheckedPrereqs(new Set());
    setArtworkMode('schematic');
    if (bodyScrollRef.current) {
      bodyScrollRef.current.scrollTop = 0;
    }
  }, [event?.id]);

  useEffect(() => {
    if (!isOpen || !isHydrated || !event || event.status !== 'Upcoming') return;
    const existingPass = getPassForEvent(event.slug);
    if (!existingPass) return;
    setSavedPass(existingPass);
    setIsRegistered(true);
    setServerPassId(existingPass.passId);
  }, [isOpen, isHydrated, event, getPassForEvent]);

  // Automatic URL Query Verification when opened via QR scan (?event=...&passId=...&verify=1)
  useEffect(() => {
    if (!isOpen || !event || !autoVerify || !initialPassId) {
      setQrVerifyState({ status: 'idle' });
      return;
    }

    let isCancelled = false;
    setQrVerifyState({ status: 'loading', passId: initialPassId });

    const startTime = performance.now();
    const verifyEndpoint = `/api/pass/verify?slug=${encodeURIComponent(
      event.slug
    )}&passId=${encodeURIComponent(initialPassId)}`;

    fetch(verifyEndpoint)
      .then(async (res) => {
        const json = await res.json();
        return { ok: res.ok, json };
      })
      .then(({ ok, json }) => {
        if (isCancelled) return;
        const elapsed = Number((performance.now() - startTime).toFixed(1));
        const latencyMs =
          typeof json.meta?.executionMs === 'number' ? json.meta.executionMs : elapsed;

        if (ok && json.data?.verified === true) {
          const fullSig =
            typeof json.data?.signature === 'string'
              ? json.data.signature
              : 'sha256:verified';
          setQrVerifyState({
            status: 'verified',
            passId: json.data.passId || initialPassId,
            signaturePrefix: fullSig.slice(0, 22),
            reason: json.data.matchReason,
            latencyMs,
          });
        } else {
          setQrVerifyState({
            status: 'invalid',
            passId: json.data?.passId || initialPassId,
            reason:
              json.data?.matchReason ||
              json.data?.reason ||
              'Pass ID does not match cryptographic signature for this event.',
            latencyMs,
          });
        }
      })
      .catch(() => {
        if (isCancelled) return;
        setQrVerifyState({
          status: 'invalid',
          passId: initialPassId,
          reason: 'Unable to reach /api/pass/verify verification endpoint.',
        });
      });

    return () => {
      isCancelled = true;
    };
  }, [isOpen, event, autoVerify, initialPassId]);

  // Generate live inline scannable QR code data URL when pass is issued
  useEffect(() => {
    if (!isRegistered || !event) {
      setQrPreviewDataUrl(null);
      return;
    }

    let isCancelled = false;
    const activePassId = serverPassId || 'RVCE-GDG-2026-DEV';
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://gdg-rvce-interface-unlocked.vercel.app';
    const verifyUrl = `${origin}/events?event=${encodeURIComponent(
      event.slug
    )}&passId=${encodeURIComponent(activePassId)}&verify=1`;

    generateBrandedQrDataUrl(verifyUrl, 136)
      .then((dataUrl) => {
        if (!isCancelled) {
          setQrPreviewDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setQrPreviewDataUrl(null);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [isRegistered, event, serverPassId]);

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

  // Keep latest stepper/close refs so keydown listener never tears down focus on stepping
  const navRefs = useRef({ hasPrev, hasNext, handlePrev, handleNext, onClose });
  navRefs.current = { hasPrev, hasNext, handlePrev, handleNext, onClose };

  // Save & restore trigger focus strictly on open/close transitions
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      previousActiveElement.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  // Keyboard navigation & Accessibility Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        navRefs.current.onClose();
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
        if (e.key === 'ArrowLeft' && navRefs.current.hasPrev) {
          e.preventDefault();
          navRefs.current.handlePrev();
        } else if (e.key === 'ArrowRight' && navRefs.current.hasNext) {
          e.preventDefault();
          navRefs.current.handleNext();
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
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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

  // Handle client-side PNG sample pass download with embedded scannable QR code
  const handleDownloadPass = useCallback(async () => {
    if (!event) return;
    await downloadSamplePassPng(
      event,
      serverPassId || undefined,
      session?.demoId
    );
    setPassDownloaded(true);
    setTimeout(() => setPassDownloaded(false), 3000);
  }, [event, serverPassId, session?.demoId]);

  // Handle real stateless sample pass issuance via POST /api/pass/verify
  const handleRegister = useCallback(async () => {
    if (!event) return;
    setIsIssuingPass(true);
    const startTime = performance.now();
    let issuedPassId: string | null = null;
    let issuedSignature = '';

    try {
      const res = await fetch('/api/pass/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: event.slug }),
      });
      const json = await res.json();
      const elapsed = Number((performance.now() - startTime).toFixed(1));

      if (res.ok && json.data?.passId) {
        issuedPassId = json.data.passId;
        issuedSignature =
          typeof json.data.signature === 'string'
            ? json.data.signature
            : `sha256:sample-${json.data.passId}`;
        setServerPassId(json.data.passId);
        setServerLatencyMs(
          typeof json.meta?.executionMs === 'number'
            ? json.meta.executionMs
            : elapsed
        );
      } else {
        issuedPassId = `RVCE-GDG-2026-${event.slug.slice(0, 6).toUpperCase()}`;
        issuedSignature = `sha256:sample-${issuedPassId}`;
        setServerPassId(issuedPassId);
        setServerLatencyMs(elapsed);
      }
    } catch {
      issuedPassId = `RVCE-GDG-2026-${event.slug.slice(0, 6).toUpperCase()}`;
      issuedSignature = `sha256:sample-${issuedPassId}`;
      setServerPassId(issuedPassId);
      setServerLatencyMs(null);
    } finally {
      setIsIssuingPass(false);
      setIsRegistered(true);

      if (issuedPassId) {
        const pass: IssuedSamplePass = {
          passId: issuedPassId,
          eventSlug: event.slug,
          eventTitle: event.title,
          category: event.category,
          date: event.date,
          time: event.time,
          venue: event.venue,
          holderName: session?.displayName || 'Sample Builder',
          holderId: session?.demoId || 'RVCE-GDG-2026',
          signature: issuedSignature,
          issuedAt: new Date().toISOString(),
        };
        saveIssuedPass(pass);
        setSavedPass(pass);
      }

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
    }
  }, [event, prefersReducedMotion, session, saveIssuedPass]);

  const handleReissue = useCallback(() => {
    if (!event) return;
    revokePassForEvent(event.slug);
    setSavedPass(null);
    setIsRegistered(false);
    setServerPassId(null);
    setServerLatencyMs(null);
    setQrPreviewDataUrl(null);
    void handleRegister();
  }, [event, revokePassForEvent, handleRegister]);

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

              {/* Top Bar Actions: Bookmark, Copy Link & Close Button (44x44px accessible target) */}
              <div className="flex items-center gap-2">
                {/* Personal Saved Sprints Bookmark Button */}
                <button
                  type="button"
                  onClick={() => event && toggleSave(event.slug)}
                  aria-label={isEventSaved ? 'Remove from saved sprints' : 'Save sprint locally'}
                  aria-pressed={isEventSaved}
                  title={isEventSaved ? 'Saved in personal schedule' : 'Save sprint locally'}
                  className={`inline-flex items-center gap-1.5 min-h-[44px] md:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer ${
                    isEventSaved
                      ? 'bg-[#FBBC04] text-[#111827] border-[#FBBC04] font-bold shadow-xs'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isEventSaved ? 'fill-[#111827]' : ''}`}
                  />
                  <span>{isEventSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy session link to clipboard"
                  className={`inline-flex items-center gap-1.5 min-h-[44px] md:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer ${
                    copiedLink
                      ? 'bg-[#34A853]/15 text-[var(--accent-green-text)] border-[#34A853]/40'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--accent-green-text)]" />
                      <span className="text-[var(--accent-green-text)] font-semibold">Copied ✓</span>
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
            <div
              ref={bodyScrollRef}
              className="flex-1 overflow-y-auto p-5 sm:p-7 custom-scrollbar"
            >
              <motion.div
                key={event.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.55 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: 'easeOut' }}
                className="space-y-7"
              >
              {/* Cover Artwork Container (16:9) with Corner Crosshairs & Scene Switcher */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-subtle)] shadow-xs select-none">
                <motion.div
                  key={`${event.id}-${artworkMode === 'scene' && event.sceneImage ? 'scene' : 'schematic'}`}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      artworkMode === 'scene' && event.sceneImage
                        ? event.sceneImage
                        : event.coverImage
                    }
                    alt={
                      artworkMode === 'scene'
                        ? `${event.title} build scene`
                        : event.title
                    }
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
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
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold shadow-xs tracking-wide border backdrop-blur-md ${categoryBadge.pillClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${categoryBadge.dotClass}`} />
                    {categoryBadge.label}
                  </span>

                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#0B0F17]/90 backdrop-blur-md text-[#F8FAFC] border border-white/20">
                    {event.mode}
                  </span>
                </div>

                {/* Interactive Schematic / Build Scene Switcher */}
                {event.sceneImage && (
                  <div className="absolute top-3.5 right-3.5 z-20 flex items-center p-0.5 rounded-lg bg-[#0B0F17]/90 backdrop-blur-md border border-white/20 shadow-md">
                    <button
                      type="button"
                      onClick={() => setArtworkMode('schematic')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                        artworkMode === 'schematic'
                          ? 'bg-[#FFFFFF] text-[#0F172A] font-bold shadow-xs'
                          : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                      }`}
                    >
                      Schematic
                    </button>
                    <button
                      type="button"
                      onClick={() => setArtworkMode('scene')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                        artworkMode === 'scene'
                          ? 'bg-[#FFFFFF] text-[#0F172A] font-bold shadow-xs'
                          : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                      }`}
                    >
                      Build Scene
                    </button>
                  </div>
                )}

                {/* Status Indicator */}
                <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-2 text-[#F8FAFC]">
                  {isUpcoming ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#1D4ED8] backdrop-blur-md text-white border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Upcoming Session
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#15803D] backdrop-blur-md text-white border border-white/20">
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
                  <span className="text-[var(--accent-blue-text)]">{event.category}</span>
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
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent-blue-text)]" />
                    <span>Session Date</span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    {event.date}
                  </p>
                </div>

                {/* Cell 2: Time */}
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-red-text)]" />
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
                      <Video className="w-3.5 h-3.5 text-[var(--accent-green-text)]" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-yellow-text)]" />
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
              {/* 2.5 AUTOMATIC QR SCAN VERIFICATION BANNER (?verify=1)   */}
              {/* ======================================================= */}
              {qrVerifyState.status !== 'idle' && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`p-4 rounded-2xl border-2 space-y-2 ${
                    qrVerifyState.status === 'verified'
                      ? 'bg-[#34A853]/12 border-[#34A853] text-[var(--text-primary)]'
                      : qrVerifyState.status === 'invalid'
                        ? 'bg-[#EA4335]/12 border-[#EA4335] text-[var(--text-primary)]'
                        : 'bg-[#4285F4]/10 border-[#4285F4]/40 text-[var(--text-primary)]'
                  }`}
                >
                  {qrVerifyState.status === 'loading' ? (
                    <div className="flex items-center gap-2.5 text-xs font-mono font-semibold text-[var(--accent-blue-text)]">
                      <div className="w-4 h-4 border-2 border-[#4285F4]/30 border-t-[#4285F4] rounded-full animate-spin shrink-0" />
                      <span>Verifying QR Pass Signature via GET /api/pass/verify...</span>
                    </div>
                  ) : qrVerifyState.status === 'verified' ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#15803D] text-white shrink-0">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-[#166534] dark:text-[#4ADE80] tracking-wide">
                            QR PASS CRYPTOGRAPHICALLY VERIFIED ✓
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#34A853]/15 text-[#166534] dark:text-[#4ADE80] border border-[#34A853]/40">
                          Verified via /api/pass/verify
                          {typeof qrVerifyState.latencyMs === 'number'
                            ? ` · ${qrVerifyState.latencyMs}ms`
                            : ''}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-secondary)]">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>
                            PASS ID:{' '}
                            <strong className="text-[var(--text-primary)]">
                              {qrVerifyState.passId}
                            </strong>
                          </span>
                          {qrVerifyState.signaturePrefix && (
                            <span>
                              SIG:{' '}
                              <strong className="text-[var(--text-primary)]">
                                {qrVerifyState.signaturePrefix}…
                              </strong>
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            openWithPreset({
                              method: 'GET',
                              endpoint: `/api/pass/verify?slug=${encodeURIComponent(
                                event.slug
                              )}&passId=${encodeURIComponent(qrVerifyState.passId || '')}`,
                            })
                          }
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-[var(--bg-elevated)] border border-[#34A853]/40 text-[#166534] dark:text-[#4ADE80] hover:bg-[#34A853]/10 transition-colors cursor-pointer"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Inspect Verify API</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C5221F] text-white shrink-0">
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#C5221F] dark:text-[#F87171] tracking-wide">
                          PASS SIGNATURE MISMATCH — INVALID TOKEN
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[var(--text-secondary)]">
                        Token <strong className="text-[var(--text-primary)]">{qrVerifyState.passId}</strong>:{' '}
                        {qrVerifyState.reason}
                      </p>
                    </div>
                  )}
                </div>
              )}

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
                        disabled={isIssuingPass}
                        className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-bold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.98] disabled:opacity-75 transition-all shadow-md hover:shadow-lg cursor-pointer"
                      >
                        {isIssuingPass ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Issuing Sample Pass...</span>
                          </>
                        ) : (
                          <>
                            <Ticket className="w-4 h-4" />
                            <span>Register for Session →</span>
                          </>
                        )}
                      </button>
                    )}

                    {!issuedPass && (
                      <a
                        href="#session-pass-registration"
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isRegistered && !isIssuingPass) {
                            void handleRegister();
                          }
                          setTimeout(() => {
                            const target = document.getElementById('session-pass-registration');
                            target?.scrollIntoView({
                              behavior: prefersReducedMotion ? 'auto' : 'smooth',
                              block: 'nearest',
                            });
                          }, 60);
                        }}
                        aria-label="Direct Registration Link — Register on-site and jump to Sample Pass"
                        title="Issue your on-site GDG RVCE Sample Pass & 4-Colour QR Code"
                        className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-bold text-white bg-[#15803D] hover:bg-[#166534] active:scale-[0.98] transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] cursor-pointer"
                      >
                        <Ticket className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Direct Registration Link ↓</span>
                      </a>
                    )}

                  </div>

                  {/* Inline Sample Developer Pass Confirmation Card */}
                  <div id="session-pass-registration" className="scroll-mt-4">
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
                            <div className="w-8 h-8 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                              &lt;&gt;
                            </div>
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-blue-text)] font-bold block">
                                OFFICIAL SAMPLE PASS
                              </span>
                              <p className="text-xs font-mono font-bold text-[var(--text-primary)]">
                                GDG on Campus RV College of Engineering
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {serverLatencyMs !== null && (
                              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#4285F4]/10 text-[var(--accent-blue-text)] border border-[#4285F4]/30">
                                <span>API 200</span>
                                <span>·</span>
                                <span>{serverLatencyMs}ms</span>
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#34A853]/15 text-[var(--accent-green-text)] font-bold border border-[#34A853]/30">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              CONFIRMED · SAVED IN PASSPORT ✓
                            </span>
                          </div>
                        </div>

                        {/* Pass Details + Live Scannable QR Code Preview */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-2 min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-xs font-mono text-[var(--text-muted)]">
                                SESSION ATTENDEE PASS //
                              </p>
                              {(session || savedPass) && (
                                <span
                                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white"
                                  style={{
                                    backgroundColor:
                                      session?.badgeColor === '#EA4335'
                                        ? '#C5221F'
                                        : session?.badgeColor === '#34A853'
                                          ? '#15803D'
                                          : '#1D4ED8',
                                  }}
                                >
                                  HOLDER: {savedPass?.holderId || session?.demoId}
                                </span>
                              )}
                            </div>
                            <h3 className="text-base sm:text-lg font-display font-bold text-[var(--text-primary)]">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-[var(--text-secondary)]">
                              <span>📅 {event.date}</span>
                              <span>⏰ {event.time}</span>
                              <span>📍 {event.venue}</span>
                            </div>
                          </div>

                          {/* Real Phone-Scannable 4-Colour GDG QR Code Preview */}
                          <div className="flex flex-col items-center gap-1.5 shrink-0 self-start sm:self-center">
                            <div className="w-[144px] h-[144px] rounded-xl bg-[#FFFFFF] p-1 border border-[var(--border-hairline)] shadow-sm flex items-center justify-center">
                              {qrPreviewDataUrl ? (
                                <Image
                                  src={qrPreviewDataUrl}
                                  alt={`Scannable QR pass code for ${event.title}`}
                                  width={136}
                                  height={136}
                                  unoptimized
                                  className="w-[136px] h-[136px] rounded-lg block"
                                />
                              ) : (
                                <div className="flex flex-col items-center gap-1 text-[#475569] text-[10px] font-mono">
                                  <QrCode className="w-6 h-6 text-[#4285F4] animate-pulse" />
                                  <span>Generating QR...</span>
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-[var(--text-muted)] text-center max-w-[152px] leading-tight">
                              Scan with phone camera to verify pass
                            </span>
                          </div>
                        </div>

                        {/* Barcode / Token Section */}
                        <div className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                                AUTHENTICATION TOKEN
                              </span>
                              {serverLatencyMs !== null && (
                                <span className="inline-flex sm:hidden items-center px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#4285F4]/10 text-[var(--accent-blue-text)] border border-[#4285F4]/30">
                                  {serverLatencyMs}ms
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-mono font-bold text-[var(--accent-blue-text)] tracking-wider block">
                              {serverPassId || 'RVCE-GDG-2026-DEV'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {/* Inspect in API Drawer Button */}
                            <button
                              type="button"
                              onClick={() => {
                                openWithPreset({
                                  method: 'POST',
                                  endpoint: '/api/pass/verify',
                                  body: JSON.stringify(
                                    { slug: event.slug, trackPreference: event.category },
                                    null,
                                    2
                                  ),
                                });
                              }}
                              className="inline-flex items-center gap-1.5 min-h-[44px] md:min-h-[34px] px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[var(--accent-blue-text)] border border-[#4285F4]/30 hover:border-[#4285F4]/60 transition-all cursor-pointer shadow-2xs"
                              title="Inspect this real POST issuance in the API Drawer"
                            >
                              <Terminal className="w-3.5 h-3.5" />
                              <span>Inspect in API Drawer</span>
                            </button>

                            {/* Download High-DPI PNG Sample Pass */}
                            <button
                              type="button"
                              onClick={handleDownloadPass}
                              className={`inline-flex items-center gap-1.5 min-h-[44px] md:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer border ${
                                passDownloaded
                                  ? 'bg-[#34A853]/15 text-[var(--accent-green-text)] border-[#34A853]/50 shadow-xs'
                                  : 'bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                              }`}
                            >
                              {passDownloaded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[var(--accent-green-text)]" />
                                  <span className="text-[var(--accent-green-text)] font-bold">Pass Saved ✓</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5 text-[var(--accent-blue-text)]" />
                                  <span>Download Sample Pass (.png)</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={handleDownloadCalendar}
                              className={`inline-flex items-center gap-1.5 min-h-[44px] md:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                                calendarDownloaded
                                  ? 'bg-[#34A853]/15 text-[var(--accent-green-text)] border border-[#34A853]/40'
                                  : 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                              }`}
                            >
                              {calendarDownloaded ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Download className="w-3 h-3" />
                              )}
                              <span>
                                {calendarDownloaded
                                  ? '.ics Downloaded!'
                                  : 'Add to Calendar (.ics)'}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={handleReissue}
                              disabled={isIssuingPass}
                              title="Revoke and re-issue sample pass"
                              className="inline-flex items-center gap-1 min-h-[44px] md:min-h-[34px] px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-red-text)] bg-[var(--bg-elevated)] hover:bg-[#EA4335]/10 border border-[var(--border-hairline)] hover:border-[#EA4335]/40 transition-all cursor-pointer disabled:opacity-60"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Re-issue</span>
                            </button>
                          </div>
                        </div>

                        {/* Pass Card Footer: Compliance Disclaimer */}
                        <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2">
                          <p className="text-[11px] font-mono text-[var(--text-muted)] italic">
                            * Sample UI confirmation for Interface Unlocked demonstration. No personal data stored.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Past Event Archive Recap Verified Banner */
                <div className="p-4 sm:p-5 rounded-2xl bg-[#34A853]/10 border border-[#34A853]/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                    <span className="text-xs font-mono font-bold tracking-wider text-[var(--accent-green-text)] uppercase">
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
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                  SESSION OVERVIEW
                </h3>
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
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      SESSION AGENDA TIMELINE
                    </h3>
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
                                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${color.textClass}`}
                                style={{
                                  backgroundColor: color.bg,
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
              {/* 5. UPCOMING READINESS CHECKLIST vs PAST TAKEAWAYS       */}
              {/* ======================================================= */}
              {isUpcoming ? (
                event.prerequisites &&
                event.prerequisites.length > 0 && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                          DEVELOPER READINESS CHECKLIST
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Click items to verify your environment setup
                        </p>
                      </div>

                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border transition-all shrink-0 ${
                          allPrereqsReady
                            ? 'bg-[#34A853]/15 text-[var(--accent-green-text)] border-[#34A853]/40'
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
                                  ? 'bg-[#15803D] border-[#15803D] text-white'
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
                      <div className="p-2.5 rounded-xl bg-[#34A853]/15 border border-[#34A853]/30 text-xs font-mono text-[var(--accent-green-text)] font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Ready for build sprint! All prerequisites verified.</span>
                      </div>
                    )}
                  </div>
                )
              ) : (
                /* Past Event: Clean Non-Clickable Session Takeaways & Covered Topics */
                <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                        KEY SESSION TAKEAWAYS &amp; TOPICS COVERED
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Core concepts, live demonstrations &amp; archived technical highlights
                      </p>
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-[var(--accent-green-text)] shrink-0">
                      ARCHIVED
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-1">
                    {(event.takeaways && event.takeaways.length > 0
                      ? event.takeaways
                      : event.agenda.map((item) => item.topic)
                    ).map((topic, idx) => {
                      const dotColor =
                        GOOGLE_TIMELINE_COLORS[idx % GOOGLE_TIMELINE_COLORS.length].border;
                      return (
                        <li
                          key={idx}
                          className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] flex items-start gap-3"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                            style={{ backgroundColor: dotColor }}
                            aria-hidden="true"
                          />
                          <span className="text-xs sm:text-sm text-[var(--text-primary)] leading-snug">
                            {topic}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
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
              </motion.div>
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
