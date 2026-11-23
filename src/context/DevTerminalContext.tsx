'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface DevTerminalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DevTerminalContext = createContext<DevTerminalContextType | undefined>(undefined);

export function DevTerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    // Record active element before opening to restore focus on exit
    if (typeof document !== 'undefined') {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Smoothly restore focus to pre-terminal focus target
    if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
      setTimeout(() => {
        triggerElementRef.current?.focus();
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
          toggle();
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle, close]);

  return (
    <DevTerminalContext.Provider value={{ isOpen, open, close, toggle }}>
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
