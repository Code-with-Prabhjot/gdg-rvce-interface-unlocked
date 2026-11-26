'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  X,
  KeyRound,
  ShieldCheck,
  Sparkles,
  LogOut,
  ArrowRight,
  UserCheck,
  AlertCircle,
  Ticket,
  QrCode,
  CalendarDays,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { DemoSession, useDemoAuth } from '@/context/DemoAuthContext';
import {
  IssuedSamplePass,
  useIssuedPasses,
} from '@/context/IssuedPassesContext';

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

function getDefaultPersonaPass(session: DemoSession): IssuedSamplePass {
  return {
    passId: 'RVCE-GDG-2026-BC5395',
    eventSlug: 'gemini-multimodal-buildathon',
    eventTitle: "Gemini Multimodal Buildathon '26",
    category: 'Hackathon',
    date: '12 DEC 2026',
    time: '09:30 IST',
    venue: 'IEM Auditorium, RVCE',
    holderName: session.displayName,
    holderId: session.demoId,
    signature: 'sha256:bc5395-gdg-rvce-2026-sample',
    issuedAt: '2026-11-25T00:00:00.000Z',
  };
}

export function DemoAuthModal() {
  const { session, isModalOpen, closeModal, signInWithDemoId, signOut } = useDemoAuth();
  const { issuedPasses, isHydrated: passesHydrated } = useIssuedPasses();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [customDemoId, setCustomDemoId] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassport, setShowPassport] = useState(false);
  const [activeTab, setActiveTab] = useState<'passes' | 'activity'>('passes');

  // Sync React modal state with native top-layer <dialog> showModal() / close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalOpen) {
      setErrorMsg(null);
      setShowPassport(Boolean(session));
      setActiveTab('passes');
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isModalOpen, session]);

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
      setShowPassport(true);
      setActiveTab('passes');
    } else {
      setErrorMsg(result.error || 'Sample persona preview failed.');
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
      setShowPassport(true);
      setActiveTab('passes');
    } else {
      setErrorMsg(result.error || 'Invalid Demo ID format.');
    }
  };

  const handleSignOut = () => {
    signOut();
    setShowPassport(false);
    closeModal();
  };

  const isPassportView = Boolean(session && showPassport);
  const passportPasses: IssuedSamplePass[] = session
    ? [...issuedPasses, getDefaultPersonaPass(session)]
    : [];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="demo-auth-modal-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-2xl p-0 z-50 overflow-hidden"
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
              {isPassportView ? (
                <Ticket className="w-5 h-5 text-[#4285F4]" />
              ) : (
                <KeyRound className="w-5 h-5 text-[#4285F4]" />
              )}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4285F4] block">
                {isPassportView
                  ? 'LIVE BUILDER PASSPORT // SAMPLE PROFILE'
                  : 'SAMPLE PERSONA PREVIEW // LOCAL ONLY'}
              </span>
              <h1
                id="demo-auth-modal-title"
                className="text-lg font-display font-bold text-[var(--text-primary)]"
              >
                {isPassportView ? 'My Builder Passport' : 'Sample Builder Passport (Local Preview)'}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close Sample Builder Passport dialog"
            className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-hairline)] transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {errorMsg && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/40 text-xs font-mono text-[#EA4335] flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] flex items-center gap-2.5 text-[11px] font-mono text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-[#34A853] shrink-0" />
            <span>Client-side persona preview only · Zero authentication or tracking.</span>
          </div>

          {isPassportView && session ? (
            <div className="space-y-5">
              {/* Live Passport Identity */}
              <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: session.badgeColor }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-[var(--text-primary)]">
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
                        {session.demoId} · Vertical: {session.vertical}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#34A853]/15 text-[#34A853] border border-[#34A853]/30">
                    <ShieldCheck className="w-3 h-3" />
                    PASSPORT LIVE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                  Token: {session.sessionToken.slice(0, 20)}…
                </p>
              </div>

              {/* Dual Tabs */}
              <div
                role="tablist"
                aria-label="Builder Passport tabs"
                className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'passes'}
                  onClick={() => setActiveTab('passes')}
                  className={`flex-1 min-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'passes'
                      ? 'bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-xs'
                      : 'border border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Registered Passes</span>
                  <span className="px-1.5 rounded bg-[#4285F4]/12 text-[var(--accent-blue-text)] text-[10px]">
                    {passportPasses.length}
                  </span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'activity'}
                  onClick={() => setActiveTab('activity')}
                  className={`flex-1 min-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeTab === 'activity'
                      ? 'bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-xs'
                      : 'border border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Attended &amp; Contributions</span>
                </button>
              </div>

              {activeTab === 'passes' ? (
                <div className="space-y-2.5" role="tabpanel">
                  {passportPasses.map((pass, idx) => (
                    <div
                      key={`${pass.passId}-${idx}`}
                      className="p-3.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-[#4285F4]/12 border border-[#4285F4]/30 flex items-center justify-center shrink-0">
                            <Ticket className="w-3.5 h-3.5 text-[#4285F4]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                              {pass.eventTitle}
                            </p>
                            <p className="text-[10px] font-mono text-[#4285F4] font-bold truncate">
                              PASS ID: {pass.passId}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#34A853]/12 text-[#34A853] border border-[#34A853]/30 shrink-0">
                          {pass.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-[var(--text-secondary)]">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-3 h-3 text-[var(--text-muted)]" />
                          {pass.date} · {pass.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[var(--text-muted)]" />
                          {pass.venue}
                        </span>
                      </div>
                      <Link
                        href={`/events?event=${encodeURIComponent(
                          pass.eventSlug
                        )}&passId=${encodeURIComponent(pass.passId)}&verify=1`}
                        onClick={closeModal}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white bg-[#4285F4] hover:bg-[#3367D6] transition-colors cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Open QR Pass →</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                  {!passesHydrated && (
                    <p className="text-[10px] font-mono text-[var(--text-muted)] text-center">
                      Loading saved passes…
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4" role="tabpanel">
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      ATTENDED GDG RVCE SESSIONS
                    </h2>
                    {session.attendedSessions.map((item) => (
                      <div
                        key={item.sessionId}
                        className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-xs font-bold text-[var(--text-primary)]">
                            {item.title}
                          </p>
                          <p className="text-[10px] font-mono text-[var(--text-muted)]">
                            {item.date}
                          </p>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded text-[9px] font-mono font-bold border shrink-0"
                          style={{
                            backgroundColor: `${item.badgeColor}18`,
                            borderColor: `${item.badgeColor}55`,
                            color: item.badgeColor,
                          }}
                        >
                          {item.trackBadge}
                        </span>
                      </div>
                    ))}
                    {session.attendedSessions.length === 0 && (
                      <p className="text-xs font-mono text-[var(--text-muted)]">
                        No sample attendance logs for this persona.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      OPEN SOURCE &amp; CHAPTER CONTRIBUTIONS
                    </h2>
                    {session.contributions.map((item) => (
                      <div
                        key={item.contributionId}
                        className="p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex items-start justify-between gap-3"
                      >
                        <p className="text-xs font-bold text-[var(--text-primary)] min-w-0">
                          {item.title}
                        </p>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#4285F4]/12 text-[var(--accent-blue-text)] border border-[#4285F4]/30 shrink-0">
                          {item.kind}
                        </span>
                      </div>
                    ))}
                    {session.contributions.length === 0 && (
                      <p className="text-xs font-mono text-[var(--text-muted)]">
                        No sample contributions logged for this persona.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-hairline)]">
                    <button
                      type="button"
                      onClick={() => setShowPassport(false)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold text-[var(--text-primary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] border border-[var(--border-strong)] cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Switch Persona</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold text-[#EA4335] bg-[#EA4335]/10 hover:bg-[#EA4335]/20 border border-[#EA4335]/30 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] flex items-center gap-2.5 text-[11px] font-mono text-[var(--text-muted)]">
                <ShieldCheck className="w-4 h-4 text-[#34A853] shrink-0" />
                <span>
                  Fictional sample profile only · Zero personal data collected or stored.
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
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
                    className="flex-1 px-3.5 py-2.5 rounded-xl text-xs font-mono bg-[var(--bg-canvas)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-hairline)] focus:border-[#4285F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
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

              {session && (
                <button
                  type="button"
                  onClick={() => setShowPassport(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold text-[#4285F4] bg-[#4285F4]/10 hover:bg-[#4285F4]/20 border border-[#4285F4]/30 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Back to My Builder Passport</span>
                </button>
              )}

              {/* Strict Zero-PII Compliance Notice */}
              <div className="p-3 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] flex items-center gap-2.5 text-[11px] font-mono text-[var(--text-muted)]">
                <ShieldCheck className="w-4 h-4 text-[#34A853] shrink-0" />
                <span>
                  Demo Authentication Only · Fictional sample personas · Zero personal data collected.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
