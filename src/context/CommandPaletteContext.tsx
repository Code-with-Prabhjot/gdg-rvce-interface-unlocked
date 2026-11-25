'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface CommandPaletteContextType {
  isOpen: boolean;
  open: () => void;
  close: (options?: { skipFocusRestore?: boolean }) => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const skipFocusRestoreRef = useRef<boolean>(false);

  const open = useCallback(() => {
    skipFocusRestoreRef.current = false;
    if (typeof document !== 'undefined') {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback((options?: { skipFocusRestore?: boolean }) => {
    if (options?.skipFocusRestore) {
      skipFocusRestoreRef.current = true;
    }
    setIsOpen(false);
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

  return (
    <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
  }
  return context;
}
