'use client';

import React, { useEffect, useRef } from 'react';
import { Keyboard, X, Compass, ShieldCheck } from 'lucide-react';
import { useShortcuts } from '@/context/ShortcutsContext';
import { useGuidedTour } from '@/context/GuidedTourContext';

interface ShortcutEntry {
  id: string;
  keys: string[];
  description: React.ReactNode;
  accentHex: '#4285F4' | '#EA4335' | '#FBBC04' | '#34A853';
}

const SHORTCUT_ENTRIES: ShortcutEntry[] = [
  {
    id: 'command-palette',
    keys: ['⌘K', 'Ctrl+K'],
    description: 'Open Global Command Palette',
    accentHex: '#4285F4',
  },
  {
    id: 'dev-terminal',
    keys: ['`', '~'],
    description: 'Toggle Interactive Developer CLI Terminal',
    accentHex: '#34A853',
  },
  {
    id: 'xray-inspector',
    keys: ['Shift + X'],
    description: 'Toggle Blueprint X-Ray Design Token Inspector',
    accentHex: '#4285F4',
  },
  {
    id: 'shortcuts-sheet',
    keys: ['?'],
    description: 'Open Keyboard Shortcuts Cheat-Sheet',
    accentHex: '#FBBC04',
  },
  {
    id: 'instant-search',
    keys: ['/'],
    description: (
      <>
        Focus Instant Search (
        <span className="whitespace-nowrap">/events</span> &amp;{' '}
        <span className="whitespace-nowrap">/team</span>)
      </>
    ),
    accentHex: '#EA4335',
  },
  {
    id: 'arrow-stepping',
    keys: ['←', '→'],
    description: 'Step Through Scenes, Sessions & Builders',
    accentHex: '#34A853',
  },
  {
    id: 'escape-dismiss',
    keys: ['Esc'],
    description: 'Close Active Drawer, Modal, Lightbox, or Tour',
    accentHex: '#EA4335',
  },
];

export function ShortcutsModal() {
  const { isOpen, close } = useShortcuts();
  const { startTour } = useGuidedTour();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync React state with native top-layer <dialog> showModal() / close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Listen to native close event (Esc / light dismiss / form method="dialog")
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      close();
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [close]);

  // Fallback for browsers without native `closedby="any"` support (e.g. Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if ('closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    let pressedOutside = false;
    const handlePointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="shortcuts-modal-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-2xl p-0 z-50 overflow-hidden"
    >
      <div className="flex flex-col max-h-[88vh]">
        {/* Top Google 4-Color Spectrum Accent Strip */}
        <div className="h-1.5 w-full grid grid-cols-4 shrink-0" aria-hidden="true">
          <span className="bg-[#4285F4]" />
          <span className="bg-[#EA4335]" />
          <span className="bg-[#FBBC04]" />
          <span className="bg-[#34A853]" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]/50 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#4285F4]/12 border border-[#4285F4]/30 flex items-center justify-center shrink-0">
              <Keyboard className="w-5 h-5 text-[#4285F4]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent-blue-text)] block">
                KEYCAP MATRIX // GDG RVCE POWER CONTROLS
              </span>
              <h1
                id="shortcuts-modal-title"
                className="text-lg font-display font-bold text-[var(--text-primary)] truncate"
              >
                Keyboard Shortcuts Cheat-Sheet
              </h1>
            </div>
          </div>

          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            aria-label="Close Keyboard Shortcuts Cheat-Sheet"
            className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-hairline)] transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Architectural Keycap Matrix */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SHORTCUT_ENTRIES.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: entry.accentHex }}
                    aria-hidden="true"
                  />
                  <span className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] leading-snug">
                    {entry.description}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {entry.keys.map((keyLabel, idx) => (
                    <React.Fragment key={keyLabel}>
                      {idx > 0 && (
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">/</span>
                      )}
                      <kbd className="inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-lg font-mono text-[11px] font-bold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-[0_2px_0_0_var(--border-strong)] whitespace-nowrap">
                        {keyLabel}
                      </kbd>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Tip + Quick Launch Guided Tour */}
          <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
              <ShieldCheck className="w-4 h-4 text-[#34A853] shrink-0" />
              <span>Press Esc or click outside anytime to dismiss.</span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  dialogRef.current?.close();
                  setTimeout(() => startTour(0), 60);
                }}
                className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[var(--accent-blue-text)] border border-[#4285F4]/30 transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>Start Guided Tour</span>
              </button>

              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-hairline)] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
