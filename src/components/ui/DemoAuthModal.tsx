'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  KeyRound,
  ShieldCheck,
  Sparkles,
  LogOut,
  ArrowRight,
  UserCheck,
  AlertCircle,
} from 'lucide-react';
import { useDemoAuth } from '@/context/DemoAuthContext';

interface DemoPreset {
  demoId: string;
  displayName: string;
  role: string;
  badgeColor: string;
  unlocks: string;
}

const DEMO_PRESETS: DemoPreset[] = [
  {
    demoId: 'RVCE-DEV-2026',
    displayName: 'Aarav Kulkarni',
    role: 'Core Lead',
    badgeColor: '#EA4335',
    unlocks: 'Unlocks Chapter Banner Customizer & Full Spec Controls',
  },
  {
    demoId: 'RVCE-WEB-2026',
    displayName: 'Rohan Deshmukh',
    role: 'Web & Cloud Lead',
    badgeColor: '#4285F4',
    unlocks: 'Unlocks Track Spotlight & Pass Issuance',
  },
  {
    demoId: 'RVCE-STU-2026',
    displayName: 'Meera Nair',
    role: 'Student Builder',
    badgeColor: '#34A853',
    unlocks: 'Unlocks Personalized Sample Event Passes',
  },
];

export function DemoAuthModal() {
  const { session, isModalOpen, closeModal, signInWithDemoId, signOut } = useDemoAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [customDemoId, setCustomDemoId] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync React modal state with native top-layer <dialog> showModal() / close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalOpen) {
      setErrorMsg(null);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isModalOpen]);

  // Listen to native close event (Esc / light dismiss / form method="dialog")
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      closeModal();
    };

    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [closeModal]);

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

  const handlePresetSignIn = async (demoId: string) => {
    setErrorMsg(null);
    setLoadingId(demoId);
    const result = await signInWithDemoId(demoId);
    setLoadingId(null);

    if (result.ok) {
      closeModal();
    } else {
      setErrorMsg(result.error || 'Demo sign-in failed.');
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customDemoId.trim();
    if (!trimmed) {
      setErrorMsg('Enter a sample Demo ID (4–24 alphanumeric chars, e.g. RVCE-2026-TEST).');
      return;
    }
    setErrorMsg(null);
    setLoadingId('custom');
    const result = await signInWithDemoId(trimmed);
    setLoadingId(null);

    if (result.ok) {
      setCustomDemoId('');
      closeModal();
    } else {
      setErrorMsg(result.error || 'Invalid Demo ID format.');
    }
  };

  const handleSignOut = () => {
    signOut();
    closeModal();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="demo-auth-modal-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-2xl p-0 z-50 overflow-hidden"
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
              <KeyRound className="w-5 h-5 text-[#4285F4]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4285F4] block">
                STATELESS DEMO AUTH // POST /api/auth/demo
              </span>
              <h1
                id="demo-auth-modal-title"
                className="text-lg font-display font-bold text-[var(--text-primary)] truncate"
              >
                Chapter Demo Sign-In
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close Chapter Demo Sign-In dialog"
            className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-hairline)] transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {/* Active Session Banner if signed in */}
          {session && (
            <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: session.badgeColor }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {session.displayName}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white"
                      style={{ backgroundColor: session.badgeColor }}
                    >
                      {session.role}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-muted)] truncate">
                    Active ID: {session.demoId} · Token: {session.sessionToken.slice(0, 16)}…
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-semibold text-[#EA4335] bg-[#EA4335]/10 hover:bg-[#EA4335]/20 border border-[#EA4335]/30 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/40 text-xs font-mono text-[#EA4335] flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1-Click Fictional Demo Personas */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                1-CLICK FICTIONAL DEMO PERSONAS
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                sessionStorage only
              </span>
            </div>

            <div className="space-y-2.5">
              {DEMO_PRESETS.map((preset, idx) => {
                const isActive = session?.demoId === preset.demoId;
                const isBusy = loadingId === preset.demoId;
                return (
                  <button
                    key={preset.demoId}
                    type="button"
                    autoFocus={idx === 0}
                    disabled={loadingId !== null}
                    onClick={() => handlePresetSignIn(preset.demoId)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer disabled:opacity-60 ${
                      isActive
                        ? 'bg-[var(--bg-subtle)] border-[#4285F4] shadow-xs'
                        : 'bg-[var(--bg-canvas)] hover:bg-[var(--bg-subtle)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-mono font-bold text-xs shrink-0 mt-0.5"
                        style={{ backgroundColor: preset.badgeColor }}
                      >
                        {preset.displayName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-display font-bold text-[var(--text-primary)]">
                            {preset.displayName}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white"
                            style={{ backgroundColor: preset.badgeColor }}
                          >
                            {preset.role}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-muted)]">
                            {preset.demoId}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {preset.unlocks}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isBusy ? (
                        <div className="w-4 h-4 border-2 border-[#4285F4]/30 border-t-[#4285F4] rounded-full animate-spin" />
                      ) : isActive ? (
                        <UserCheck className="w-4 h-4 text-[#34A853]" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Demo ID Input */}
          <form onSubmit={handleCustomSubmit} className="space-y-2 pt-2 border-t border-[var(--border-hairline)]">
            <label
              htmlFor="custom-demo-id-input"
              className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block"
            >
              OR ENTER CUSTOM SAMPLE DEMO ID
            </label>
            <div className="flex items-stretch gap-2">
              <input
                id="custom-demo-id-input"
                type="text"
                value={customDemoId}
                onChange={(e) => setCustomDemoId(e.target.value)}
                placeholder="e.g. RVCE-2026-TEST"
                maxLength={24}
                className="flex-1 px-3.5 py-2.5 rounded-xl text-xs font-mono bg-[var(--bg-canvas)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-hairline)] focus:border-[#4285F4] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loadingId !== null}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-[#4285F4] hover:bg-[#3367D6] disabled:opacity-60 transition-colors cursor-pointer shrink-0"
              >
                {loadingId === 'custom' ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Strict Zero-PII Compliance Notice */}
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] flex items-center gap-2.5 text-[11px] font-mono text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-[#34A853] shrink-0" />
            <span>
              Demo Authentication Only · Fictional sample personas · Zero personal data collected.
            </span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
