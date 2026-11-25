'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface DemoSession {
  sessionToken: string;
  demoId: string;
  displayName: string;
  role: string;
  vertical: string;
  permissions: string[];
  badgeColor: string;
  disclaimer: string;
}

const SESSION_STORAGE_KEY = 'gdg-rvce-demo-session';
const SPOTLIGHT_STORAGE_KEY = 'gdg-rvce-demo-spotlight';
const DEFAULT_SPOTLIGHT_NOTICE =
  '2026/2027 Campus Build Cycle Open — Sample developer passes include live QR verification.';

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
        disclaimer: json.data.disclaimer,
      };

      setSession(nextSession);
      setIsMaintainerBarDismissed(false);

      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
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

  const dismissMaintainerBar = useCallback(() => {
    setIsMaintainerBarDismissed(true);
  }, []);

  const restoreMaintainerBar = useCallback(() => {
    setIsMaintainerBarDismissed(false);
  }, []);

  const isMaintainerRole = Boolean(
    session &&
      (session.demoId === 'RVCE-DEV-2026' ||
        session.demoId === 'RVCE-WEB-2026' ||
        session.permissions.includes('chapter.banner.customize'))
  );

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
