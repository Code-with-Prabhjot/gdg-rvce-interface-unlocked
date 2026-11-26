'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useShortcuts } from '@/context/ShortcutsContext';

interface DevTerminalContextType {
  isOpen: boolean;
  open: () => void;
  close: (options?: { skipFocusRestore?: boolean }) => void;
  toggle: () => void;
  markSkipFocusRestore: () => void;
}

const DevTerminalContext = createContext<DevTerminalContextType | undefined>(undefined);

export function DevTerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isShortcutsOpen, close: closeShortcuts } = useShortcuts();
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const skipFocusRestoreRef = useRef<boolean>(false);

  const open = useCallback(() => {
    skipFocusRestoreRef.current = false;
    // Record active element before opening to restore focus on exit
    if (typeof document !== 'undefined') {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
    }
    setIsOpen(true);
  }, []);

  const markSkipFocusRestore = useCallback(() => {
    skipFocusRestoreRef.current = true;
  }, []);

  const close = useCallback((options?: { skipFocusRestore?: boolean }) => {
    if (options?.skipFocusRestore) {
      skipFocusRestoreRef.current = true;
    }
    setIsOpen(false);
    // Smoothly restore focus to pre-terminal focus target unless navigation/feature took over
    if (
      !skipFocusRestoreRef.current &&
      previousFocusRef.current &&
      typeof previousFocusRef.current.focus === 'function'
    ) {
      const target = previousFocusRef.current;
      setTimeout(() => {
        target.focus({ preventScroll: true });
      }, 50);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Global Keyboard shortcut listener (` or ~) with strict input safety
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Input safety guard: NEVER trigger if user is actively typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.getAttribute?.('contenteditable') === 'true');

      if ((e.key === '`' || e.key === '~') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (!isInput) {
          e.preventDefault();
          if (isShortcutsOpen) {
            closeShortcuts();
          }
          toggle();
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle, close, isShortcutsOpen, closeShortcuts]);

  return (
    <DevTerminalContext.Provider value={{ isOpen, open, close, toggle, markSkipFocusRestore }}>
      {children}
    </DevTerminalContext.Provider>
  );
}

export function useDevTerminal() {
  const context = useContext(DevTerminalContext);
  if (!context) {
    throw new Error('useDevTerminal must be used within a DevTerminalProvider');
  }
  return context;
}
