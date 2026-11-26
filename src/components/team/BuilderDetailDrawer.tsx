'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  GitBranch,
  Quote,
} from 'lucide-react';
import { GDGTeamMember, GoogleAccent } from '@/data/gdgData';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

interface BuilderDetailDrawerProps {
  member: GDGTeamMember | null;
  isOpen: boolean;
  membersList: GDGTeamMember[];
  onClose: () => void;
  onSelectMember: (memberId: string) => void;
  onSelectSkill?: (skill: string) => void;
}

interface EmoteParticle {
  id: number;
  deltaX: number;
  deltaY: number;
  rotation: number;
}

function getAccentConfig(color: GoogleAccent) {
  switch (color) {
    case 'red':
      return {
        hex: '#EA4335',
        badgeClass: 'bg-[#EA4335]/10 text-[var(--accent-red-text)] border-[#EA4335]/30',
        textVar: 'var(--accent-red-text)',
      };
    case 'blue':
      return {
        hex: '#4285F4',
        badgeClass: 'bg-[#4285F4]/10 text-[var(--accent-blue-text)] border-[#4285F4]/30',
        textVar: 'var(--accent-blue-text)',
      };
    case 'yellow':
      return {
        hex: '#FBBC04',
        badgeClass: 'bg-amber-500/12 border-amber-500/35 text-[var(--accent-yellow-text)]',
        textVar: 'var(--accent-yellow-text)',
      };
    case 'green':
    default:
      return {
        hex: '#34A853',
        badgeClass: 'bg-[#34A853]/10 text-[var(--accent-green-text)] border-[#34A853]/30',
        textVar: 'var(--accent-green-text)',
      };
  }
}

export function BuilderDetailDrawer({
  member,
  isOpen,
  membersList,
  onClose,
  onSelectMember,
  onSelectSkill,
}: BuilderDetailDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const [copiedHandle, setCopiedHandle] = useState(false);
  const [particles, setParticles] = useState<EmoteParticle[]>([]);

  // Reset transient state & scroll body cleanly when switching builders
  useEffect(() => {
    setCopiedHandle(false);
    setParticles([]);
    if (bodyScrollRef.current) {
      bodyScrollRef.current.scrollTop = 0;
    }
  }, [member?.id]);

  // Stepper calculations
  const currentIndex = member
    ? membersList.findIndex((m) => m.id === member.id)
    : -1;
  const hasPrev = membersList.length > 1 && currentIndex >= 0;
  const hasNext = membersList.length > 1 && currentIndex >= 0;

  const handlePrev = useCallback(() => {
    if (!hasPrev || membersList.length === 0) return;
    const prevIdx = (currentIndex - 1 + membersList.length) % membersList.length;
    onSelectMember(membersList[prevIdx].id);
  }, [hasPrev, currentIndex, membersList, onSelectMember]);

  const handleNext = useCallback(() => {
    if (!hasNext || membersList.length === 0) return;
    const nextIdx = (currentIndex + 1) % membersList.length;
    onSelectMember(membersList[nextIdx].id);
  }, [hasNext, currentIndex, membersList, onSelectMember]);

  // Refs for latest callbacks so keydown listener never tears down focus on stepping
  const stepperRef = useRef({ handlePrev, handleNext, onClose });
  stepperRef.current = { handlePrev, handleNext, onClose };

  // Save/restore focus strictly on open/close transitions
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      previousActiveElement.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  // Keyboard navigation & Focus trap while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        stepperRef.current.onClose();
        return;
      }

      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          stepperRef.current.handlePrev();
          return;
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          stepperRef.current.handleNext();
          return;
        }
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyHandle = useCallback(async () => {
    if (!member) return;
    const sampleHandles = [
      `@gdg-rvce/${member.id}`,
      `github.com/gdg-rvce-sample/${member.id}`,
      `linkedin.com/in/${member.id}-sample`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(sampleHandles);
      setCopiedHandle(true);
      setTimeout(() => setCopiedHandle(false), 2000);
    } catch {
      setCopiedHandle(true);
      setTimeout(() => setCopiedHandle(false), 2000);
    }
  }, [member]);

  const handleEmotePop = () => {
    const ts = Date.now();
    const nextParticles: EmoteParticle[] = [
      { id: ts + 1, deltaX: -18, deltaY: -44, rotation: -14 },
      { id: ts + 2, deltaX: 0, deltaY: -54, rotation: 6 },
      { id: ts + 3, deltaX: 18, deltaY: -42, rotation: 16 },
    ];
    setParticles((prev) => [...prev, ...nextParticles]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !nextParticles.some((np) => np.id === p.id))
      );
    }, 750);
  };

  if (!member) return null;

  const accent = getAccentConfig(member.googleColor);
  const devTag = member.id.replace('builder-', 'DEV // ');

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-builder-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <motion.div
            ref={drawerRef}
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="relative w-full max-w-xl bg-[var(--bg-elevated)] border-l border-[var(--border-strong)] shadow-2xl z-10 flex flex-col h-full overflow-hidden"
          >
            {/* Top Google-Coloured Accent Bar */}
            <div
              className="h-1 w-full shrink-0 transition-colors duration-300"
              style={{ backgroundColor: accent.hex }}
            />

            {/* ========================================================= */}
            {/* 1. STICKY ARCHITECTURAL HEADER                            */}
            {/* ========================================================= */}
            <div className="px-5 sm:px-6 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)]/95 backdrop-blur-md flex items-center justify-between gap-3 shrink-0 z-20">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: accent.hex }}
                />
                <span className="text-xs font-mono font-bold tracking-wider text-[var(--text-muted)] truncate">
                  BUILDER // {devTag}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Compact Header Stepper Controls */}
                <div className="flex items-center gap-1 mr-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={!hasPrev}
                    aria-label="Previous builder"
                    className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!hasNext}
                    aria-label="Next builder"
                    className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Copy Handle */}
                <button
                  type="button"
                  onClick={handleCopyHandle}
                  aria-label="Copy sample builder handle"
                  className={`min-h-[36px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                    copiedHandle
                      ? 'bg-[#34A853]/15 text-[#34A853] border-[#34A853]/40'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {copiedHandle ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#34A853]" />
                      <span className="hidden sm:inline text-[#34A853] font-semibold">Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Handle</span>
                    </>
                  )}
                </button>

                {/* Close Button (44px accessible target) */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close builder spec drawer"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-hairline)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. SCROLLABLE CONTENT BODY (Flicker-Free Transition)      */}
            {/* ========================================================= */}
            <div
              ref={bodyScrollRef}
              className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6"
            >
              <motion.div
                key={member.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.5, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-6"
              >
                {/* Hero Identity Block */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="relative shrink-0">
                    <div
                      className="w-24 h-24 rounded-2xl p-1 bg-[var(--bg-elevated)] border ring-2 overflow-hidden transition-all duration-300"
                      style={{
                        borderColor: accent.hex,
                        boxShadow: `0 0 18px ${accent.hex}30`,
                      }}
                    >
                      <Image
                        src={member.avatar}
                        alt={`${member.name} Bauhaus portrait`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Interactive Emote Reaction Sticker */}
                    <div className="absolute -bottom-2 -right-2">
                      <button
                        type="button"
                        onClick={handleEmotePop}
                        aria-label="Trigger developer emote reaction"
                        title="Click for developer emote burst"
                        className="relative w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-1 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                      >
                        <Image
                          src={member.emoteBadge}
                          alt="Developer emote sticker"
                          width={24}
                          height={24}
                          className="w-5 h-5 object-contain pointer-events-none select-none"
                        />
                      </button>

                      <AnimatePresence>
                        {particles.map((p) => (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0, rotate: 0 }}
                            animate={{
                              opacity: 0,
                              scale: 1.25,
                              x: p.deltaX,
                              y: p.deltaY,
                              rotate: p.rotation,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: prefersReducedMotion ? 0.2 : 0.75,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="absolute -top-1 -right-1 pointer-events-none z-50 w-6 h-6 select-none"
                          >
                            <Image
                              src={member.emoteBadge}
                              alt=""
                              width={24}
                              height={24}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${accent.badgeClass}`}
                      >
                        {member.vertical}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
                        {member.yearAndBranch}
                      </span>
                    </div>

                    <h2
                      id="drawer-builder-title"
                      className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-tight"
                    >
                      {member.name}
                    </h2>

                    <p className="text-xs sm:text-sm font-mono font-medium text-[var(--text-secondary)]">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Full Bio */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                    ENGINEERING BIO
                  </span>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Structured Builder Spec Sheet */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: accent.hex }} />
                    <span>TECHNICAL BUILDER SPEC</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {/* Current Focus */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5 text-[#4285F4]" />
                        <span>Current Focus</span>
                      </div>
                      <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                        {member.builderSpec.focusArea}
                      </p>
                    </div>

                    {/* Favorite Stack */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                        <Code2 className="w-3.5 h-3.5 text-[#EA4335]" />
                        <span>Favorite Stack</span>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] leading-snug">
                        {member.builderSpec.favoriteStack}
                      </p>
                    </div>

                    {/* Open Source Repo */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] flex items-center justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                          <GitBranch className="w-3.5 h-3.5 text-[#34A853]" />
                          <span>Open Source</span>
                        </div>
                        <p className="text-xs sm:text-sm font-mono text-[var(--text-primary)] truncate">
                          {member.builderSpec.openSourceContrib}
                        </p>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)]">
                        <span>Sample Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Build Motto */}
                    <div className="p-4 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-canvas)] space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                        <Quote className="w-3.5 h-3.5 text-[#FBBC04]" />
                        <span>Build Motto</span>
                      </div>
                      <p className="text-sm italic text-[var(--text-primary)] leading-relaxed">
                        &ldquo;{member.builderSpec.buildMotto}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Domain Focus Allocation Bars */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] space-y-3.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase font-bold">
                    <span>Domain Focus Allocation</span>
                    <span>Craft Index</span>
                  </div>

                  {member.competencies.map((comp) => (
                    <div key={comp.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[var(--text-primary)] font-medium truncate">
                          {comp.label}
                        </span>
                        <span
                          className="font-bold shrink-0 ml-2"
                          style={{ color: accent.textVar }}
                        >
                          {comp.level}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] overflow-hidden">
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? { scaleX: comp.level / 100 }
                              : { scaleX: 0 }
                          }
                          animate={{ scaleX: comp.level / 100 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.55,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="h-full rounded-full"
                          style={{
                            transformOrigin: 'left',
                            backgroundColor: accent.hex,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill & Stack Chips */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                    CORE STACK &amp; CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => {
                          if (onSelectSkill) {
                            onSelectSkill(skill);
                            onClose();
                          }
                        }}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#4285F4] hover:bg-[#4285F4]/10 border border-[var(--border-hairline)] transition-all cursor-pointer"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sample Profile Channels */}
                <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                      VERIFIED SAMPLE PROFILE HANDLES
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyHandle}
                      aria-label="Copy sample handle"
                      className={`min-h-[36px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                        copiedHandle
                          ? 'bg-[#34A853]/15 text-[#34A853] border-[#34A853]/40'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {copiedHandle ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#34A853]" />
                          <span className="text-[#34A853] font-semibold">Copied ✓</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Sample Handle</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-mono text-[var(--text-primary)]">
                      <span className="text-[var(--text-muted)]">CHAT // </span>@gdg-rvce/{member.id}
                    </p>
                    <p className="text-xs font-mono text-[var(--text-primary)] break-all">
                      <span className="text-[var(--text-muted)]">GITHUB // </span>github.com/gdg-rvce-sample/{member.id}
                    </p>
                    <p className="text-xs font-mono text-[var(--text-primary)] break-all">
                      <span className="text-[var(--text-muted)]">LINKEDIN // </span>linkedin.com/in/{member.id}-sample
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--border-hairline)]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)] text-xs font-mono">
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)] text-xs font-mono">
                      <LinkedinIcon className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </span>
                    {member.links.website && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)] text-xs font-mono">
                        <ExternalLink className="w-4 h-4" />
                        <span>Portfolio</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ========================================================= */}
            {/* 3. STICKY FOOTER STEPPER                                  */}
            {/* ========================================================= */}
            <div className="p-4 sm:p-5 border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)] flex items-center justify-between gap-3 shrink-0 z-20">
              <button
                type="button"
                onClick={handlePrev}
                disabled={!hasPrev}
                aria-label="Previous builder (ArrowLeft)"
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-[var(--text-muted)]">
                {currentIndex >= 0 ? (
                  <>
                    BUILDER{' '}
                    <span className="font-bold text-[var(--text-primary)]">
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>{' '}
                    OF {String(membersList.length).padStart(2, '0')}
                  </>
                ) : (
                  'BUILDER SPEC'
                )}
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={!hasNext}
                aria-label="Next builder (ArrowRight)"
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
