'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * GDG on Campus RV College of Engineering (GDG RVCE)
 * Client-Side Personal Saved Sprints Context
 * 
 * STRICT COMPLIANCE RULES:
 * 1. 100% Client-Side Private Storage: Stored exclusively in the user's browser localStorage ("gdg-rvce-saved-events").
 * 2. Zero Global Headcounts / Tracking: Zero server persistence, zero public metrics, zero attendee counters.
 * 3. Next.js 15 Hydration Safety: Reads localStorage exclusively inside useEffect to avoid SSR mismatch.
 */

const STORAGE_KEY = 'gdg-rvce-saved-events';

interface SavedEventsContextType {
  savedSlugs: string[];
  isSaved: (slug: string) => boolean;
  toggleSave: (slug: string) => void;
  clearSaved: () => void;
  isHydrated: boolean;
}

const SavedEventsContext = createContext<SavedEventsContextType | undefined>(undefined);

export function SavedEventsProvider({ children }: { children: React.ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Safe client-side hydration from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedSlugs(parsed.filter((item): item is string => typeof item === 'string'));
        }
      }
    } catch {
      // Graceful fallback for private browsing or disabled storage
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when savedSlugs changes after hydration
  const persistSlugs = useCallback((newSlugs: string[]) => {
    setSavedSlugs(newSlugs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlugs));
    } catch {
      // Storage quota or private mode fallback
    }
  }, []);

  const isSaved = useCallback(
    (slug: string) => {
      return savedSlugs.includes(slug);
    },
    [savedSlugs]
  );

  const toggleSave = useCallback(
    (slug: string) => {
      if (!slug) return;
      const exists = savedSlugs.includes(slug);
      const next = exists ? savedSlugs.filter((s) => s !== slug) : [...savedSlugs, slug];
      persistSlugs(next);
    },
    [savedSlugs, persistSlugs]
  );

  const clearSaved = useCallback(() => {
    persistSlugs([]);
  }, [persistSlugs]);

  return (
    <SavedEventsContext.Provider
      value={{
        savedSlugs,
        isSaved,
        toggleSave,
        clearSaved,
        isHydrated,
      }}
    >
      {children}
    </SavedEventsContext.Provider>
  );
}

export function useSavedEvents(): SavedEventsContextType {
  const context = useContext(SavedEventsContext);
  if (!context) {
    throw new Error('useSavedEvents must be used within a SavedEventsProvider');
  }
  return context;
}
