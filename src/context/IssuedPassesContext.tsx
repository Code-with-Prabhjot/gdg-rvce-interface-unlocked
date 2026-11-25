'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface IssuedSamplePass {
  passId: string;
  eventSlug: string;
  eventTitle: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  holderName: string;
  holderId: string;
  signature: string;
  issuedAt: string;
}

interface IssuedPassesContextType {
  issuedPasses: IssuedSamplePass[];
  isHydrated: boolean;
  getPassForEvent: (slug: string) => IssuedSamplePass | null;
  saveIssuedPass: (pass: IssuedSamplePass) => void;
  revokePassForEvent: (slug: string) => void;
}

const STORAGE_KEY = 'gdg-rvce-issued-passes';

const IssuedPassesContext = createContext<IssuedPassesContextType | undefined>(
  undefined
);

function isIssuedSamplePass(value: unknown): value is IssuedSamplePass {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.passId === 'string' &&
    typeof candidate.eventSlug === 'string' &&
    typeof candidate.eventTitle === 'string'
  );
}

export function IssuedPassesProvider({ children }: { children: React.ReactNode }) {
  const [issuedPasses, setIssuedPasses] = useState<IssuedSamplePass[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setIssuedPasses(parsed.filter(isIssuedSamplePass));
        }
      }
    } catch {
      // Graceful fallback for private browsing or restricted storage
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persistPasses = useCallback((next: IssuedSamplePass[]) => {
    setIssuedPasses(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage quota or private mode fallback
    }
  }, []);

  const getPassForEvent = useCallback(
    (slug: string): IssuedSamplePass | null => {
      if (!slug) return null;
      return (
        issuedPasses.find((pass) => pass.eventSlug === slug) ?? null
      );
    },
    [issuedPasses]
  );

  const saveIssuedPass = useCallback(
    (pass: IssuedSamplePass) => {
      if (!pass?.eventSlug || !pass?.passId) return;
      const next = [
        ...issuedPasses.filter((item) => item.eventSlug !== pass.eventSlug),
        pass,
      ];
      persistPasses(next);
    },
    [issuedPasses, persistPasses]
  );

  const revokePassForEvent = useCallback(
    (slug: string) => {
      if (!slug) return;
      persistPasses(issuedPasses.filter((pass) => pass.eventSlug !== slug));
    },
    [issuedPasses, persistPasses]
  );

  return (
    <IssuedPassesContext.Provider
      value={{
        issuedPasses,
        isHydrated,
        getPassForEvent,
        saveIssuedPass,
        revokePassForEvent,
      }}
    >
      {children}
    </IssuedPassesContext.Provider>
  );
}

export function useIssuedPasses(): IssuedPassesContextType {
  const context = useContext(IssuedPassesContext);
  if (!context) {
    throw new Error('useIssuedPasses must be used within an IssuedPassesProvider');
  }
  return context;
}
