'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface ShortcutsContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const ShortcutsContext = createContext<ShortcutsContextType | undefined>(undefined);

export function ShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global '?' listener outside inputs/textareas/selects/contenteditable
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable ||
          target.getAttribute?.('contenteditable') === 'true' ||
          Boolean(target.closest('input, textarea, select, [contenteditable="true"]')));

      if (isInput) return;

      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // If another dialog (not our shortcuts modal) is open, don't stack on top
        const activeDialogs = document.querySelectorAll('dialog[open], [role="dialog"]');
        if (!isOpen && activeDialogs.length > 0) {
          return;
        }
        e.preventDefault();
        toggle();
      } else if (e.key === '/' && isOpen && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Auto-dismiss ShortcutsModal if '/' is pressed on a route without an instant search bar
        const searchEl = document.querySelector('[data-instant-search="true"]');
        if (!searchEl) {
          e.preventDefault();
          close();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle, close]);

  return (
    <ShortcutsContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </ShortcutsContext.Provider>
  );
}

export function useShortcuts() {
  const ctx = useContext(ShortcutsContext);
  if (!ctx) {
    throw new Error('useShortcuts must be used within a ShortcutsProvider');
  }
  return ctx;
}
