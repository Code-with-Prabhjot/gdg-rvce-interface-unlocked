'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface DemoAttendedSession {
  sessionId: string;
  title: string;
  date: string;
  trackBadge: string;
  badgeColor: string;
}

export interface DemoContribution {
  contributionId: string;
  title: string;
  kind: string;
}

export interface DemoSession {
  sessionToken: string;
  demoId: string;
  displayName: string;
  role: string;
  vertical: string;
  permissions: string[];
  badgeColor: string;
  attendedSessions: DemoAttendedSession[];
  contributions: DemoContribution[];
  featuredEventSlug: string;
  disclaimer: string;
}

const SESSION_STORAGE_KEY = 'gdg-rvce-demo-session';
const SPOTLIGHT_STORAGE_KEY = 'gdg-rvce-demo-spotlight';
const FEATURED_EVENT_STORAGE_KEY = 'gdg-rvce-featured-event';
const DEFAULT_SPOTLIGHT_NOTICE =
  '2026/2027 Campus Build Cycle Open — Sample developer passes include live QR verification.';
const DEFAULT_FEATURED_EVENT_SLUG = 'gemini-multimodal-buildathon';

function canCustomizeSpotlight(session: DemoSession | null): boolean {
  return Boolean(
    session &&
      (session.demoId === 'RVCE-DEV-2026' ||
        session.demoId === 'RVCE-WEB-2026' ||
        session.permissions.includes('chapter.banner.customize'))
  );
}

interface DemoAuthContextType {
  session: DemoSession | null;
  isHydrated: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  signInWithDemoId: (
    demoId: string
  ) => Promise<{ ok: boolean; error?: string; session?: DemoSession }>;
  signOut: () => void;
  isMaintainerRole: boolean;
  spotlightNotice: string;
  setSpotlightNotice: (notice: string) => void;
  resetSpotlightNotice: () => void;
  featuredEventSlug: string;
  setFeaturedEventSlug: (slug: string) => void;
  resetFeaturedEventSlug: () => void;
  isMaintainerBarDismissed: boolean;
  dismissMaintainerBar: () => void;
  restoreMaintainerBar: () => void;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spotlightNotice, setSpotlightNoticeState] = useState(DEFAULT_SPOTLIGHT_NOTICE);
  const [featuredEventSlug, setFeaturedEventSlugState] = useState(
    DEFAULT_FEATURED_EVENT_SLUG
  );
  const [isMaintainerBarDismissed, setIsMaintainerBarDismissed] = useState(false);

  // Hydrate strictly from sessionStorage on the client (zero PII, session-scoped only)
  useEffect(() => {
    try {
      const rawSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (rawSession) {
        const parsed = JSON.parse(rawSession) as DemoSession;
        if (parsed && parsed.demoId && parsed.sessionToken) {
          setSession(parsed);
        }
      }
      const rawSpotlight = sessionStorage.getItem(SPOTLIGHT_STORAGE_KEY);
      if (rawSpotlight && rawSpotlight.trim().length > 0) {
        setSpotlightNoticeState(rawSpotlight);
      }
      const rawFeatured = localStorage.getItem(FEATURED_EVENT_STORAGE_KEY);
      if (rawFeatured && rawFeatured.trim().length > 0) {
        setFeaturedEventSlugState(rawFeatured.trim());
      }
    } catch {
      // Ignore storage access failures in restricted environments
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const signInWithDemoId = useCallback(async (demoId: string) => {
    const trimmed = demoId.trim();
    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoId: trimmed }),
      });
      const json = await res.json();

      if (!res.ok || !json.data?.sessionToken) {
        return {
          ok: false,
          error: json.data?.error || 'Could not authenticate Demo ID.',
        };
      }

      const nextSession: DemoSession = {
        sessionToken: json.data.sessionToken,
        demoId: json.data.demoId,
        displayName: json.data.displayName,
        role: json.data.role,
        vertical: json.data.vertical,
        permissions: Array.isArray(json.data.permissions) ? json.data.permissions : [],
        badgeColor: json.data.badgeColor || '#4285F4',
        attendedSessions: Array.isArray(json.data.attendedSessions)
          ? json.data.attendedSessions
          : [],
        contributions: Array.isArray(json.data.contributions)
          ? json.data.contributions
          : [],
        featuredEventSlug:
          typeof json.data.featuredEventSlug === 'string'
            ? json.data.featuredEventSlug
            : DEFAULT_FEATURED_EVENT_SLUG,
        disclaimer: json.data.disclaimer,
      };

      setSession(nextSession);
      setIsMaintainerBarDismissed(false);

      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
        const storedFeatured = localStorage.getItem(FEATURED_EVENT_STORAGE_KEY);
        if (!storedFeatured && canCustomizeSpotlight(nextSession)) {
          const seeded = nextSession.featuredEventSlug || DEFAULT_FEATURED_EVENT_SLUG;
          setFeaturedEventSlugState(seeded);
          localStorage.setItem(FEATURED_EVENT_STORAGE_KEY, seeded);
        }
      } catch {
        // Ignore sessionStorage failures
      }

      return { ok: true, session: nextSession };
    } catch {
      return {
        ok: false,
        error: 'Network error while contacting POST /api/auth/demo.',
      };
    }
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    setIsMaintainerBarDismissed(false);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const setSpotlightNotice = useCallback((notice: string) => {
    const sanitized = notice.trim().slice(0, 140);
    const nextValue = sanitized || DEFAULT_SPOTLIGHT_NOTICE;
    setSpotlightNoticeState(nextValue);
    try {
      sessionStorage.setItem(SPOTLIGHT_STORAGE_KEY, nextValue);
    } catch {
      // Ignore
    }
  }, []);

  const resetSpotlightNotice = useCallback(() => {
    setSpotlightNoticeState(DEFAULT_SPOTLIGHT_NOTICE);
    try {
      sessionStorage.removeItem(SPOTLIGHT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const setFeaturedEventSlug = useCallback(
    (slug: string) => {
      if (!slug || !canCustomizeSpotlight(session)) return;
      setFeaturedEventSlugState(slug);
      try {
        localStorage.setItem(FEATURED_EVENT_STORAGE_KEY, slug);
      } catch {
        // Ignore
      }
    },
    [session]
  );

  const resetFeaturedEventSlug = useCallback(() => {
    const fallback = session?.featuredEventSlug || DEFAULT_FEATURED_EVENT_SLUG;
    setFeaturedEventSlugState(fallback);
    try {
      localStorage.setItem(FEATURED_EVENT_STORAGE_KEY, fallback);
    } catch {
      // Ignore
    }
  }, [session]);

  const dismissMaintainerBar = useCallback(() => {
    setIsMaintainerBarDismissed(true);
  }, []);

  const restoreMaintainerBar = useCallback(() => {
    setIsMaintainerBarDismissed(false);
  }, []);

  const isMaintainerRole = canCustomizeSpotlight(session);

  return (
    <DemoAuthContext.Provider
      value={{
        session,
        isHydrated,
        isModalOpen,
        openModal,
        closeModal,
        signInWithDemoId,
        signOut,
        isMaintainerRole,
        spotlightNotice,
        setSpotlightNotice,
        resetSpotlightNotice,
        featuredEventSlug,
        setFeaturedEventSlug,
        resetFeaturedEventSlug,
        isMaintainerBarDismissed,
        dismissMaintainerBar,
        restoreMaintainerBar,
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
}
