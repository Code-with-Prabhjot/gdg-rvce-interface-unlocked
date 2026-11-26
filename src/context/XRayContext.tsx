'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useShortcuts } from '@/context/ShortcutsContext';

interface XRayContextType {
  isXRayActive: boolean;
  toggleXRay: () => void;
  enableXRay: () => void;
  disableXRay: () => void;
}

const XRayContext = createContext<XRayContextType | undefined>(undefined);

export function XRayProvider({ children }: { children: React.ReactNode }) {
  const [isXRayActive, setIsXRayActive] = useState<boolean>(false);
  const { isOpen: isShortcutsOpen, close: closeShortcuts } = useShortcuts();

  const toggleXRay = useCallback(() => {
    setIsXRayActive((prev) => !prev);
  }, []);

  const enableXRay = useCallback(() => {
    setIsXRayActive(true);
  }, []);

  const disableXRay = useCallback(() => {
    setIsXRayActive(false);
  }, []);

  // Global Keyboard listener: Shift + X toggles, Escape exits
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Input safety guard: NEVER trigger if user is actively typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.getAttribute?.('contenteditable') === 'true' ||
          Boolean(target.closest('input, textarea, [contenteditable="true"]')));

      // Clean Escape exit when X-Ray is active (do not steal Escape from ShortcutsModal)
      if (e.key === 'Escape' && isXRayActive && !isShortcutsOpen) {
        e.preventDefault();
        disableXRay();
        return;
      }

      // Shift + X toggle
      if (
        (e.key === 'X' || (e.key.toLowerCase() === 'x' && e.shiftKey)) &&
        e.shiftKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        if (!isInput) {
          e.preventDefault();
          if (isShortcutsOpen) {
            closeShortcuts();
          }
          toggleXRay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isXRayActive, toggleXRay, disableXRay, isShortcutsOpen, closeShortcuts]);

  return (
    <XRayContext.Provider
      value={{
        isXRayActive,
        toggleXRay,
        enableXRay,
        disableXRay,
      }}
    >
      {children}
    </XRayContext.Provider>
  );
}

export function useXRay() {
  const context = useContext(XRayContext);
  if (!context) {
    throw new Error('useXRay must be used within an XRayProvider');
  }
  return context;
}
