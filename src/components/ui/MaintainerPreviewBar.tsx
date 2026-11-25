'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Check, RotateCcw, X, PencilLine, Star } from 'lucide-react';
import { useDemoAuth } from '@/context/DemoAuthContext';
import { EVENTS_DATA } from '@/data/gdgData';

interface MaintainerPreviewBarProps {
  surfaceLabel: 'Events Directory' | 'Chapter Team';
}

export function MaintainerPreviewBar({ surfaceLabel }: MaintainerPreviewBarProps) {
  const {
    session,
    isHydrated,
    isMaintainerRole,
    spotlightNotice,
    setSpotlightNotice,
    resetSpotlightNotice,
    featuredEventSlug,
    setFeaturedEventSlug,
    resetFeaturedEventSlug,
    isMaintainerBarDismissed,
    dismissMaintainerBar,
  } = useDemoAuth();

  const [draftNotice, setDraftNotice] = useState(spotlightNotice);
  const [isEditing, setIsEditing] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setDraftNotice(spotlightNotice);
  }, [spotlightNotice]);

  const upcomingEvents = EVENTS_DATA.filter((event) => event.status === 'Upcoming');

  if (!isHydrated || !session || !isMaintainerRole || isMaintainerBarDismissed) {
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSpotlightNotice(draftNotice);
    setIsEditing(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <aside
      aria-label="Chapter Maintainer Preview"
      className="mb-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-4 sm:p-5 shadow-xs relative overflow-hidden"
    >
      {/* Top thin color bar matching signed-in role */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: session.badgeColor }}
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: session.badgeColor }}
            >
              <Sparkles className="w-3 h-3" />
              Chapter Maintainer Preview
            </span>
            <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
              {session.displayName} · {session.role}
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              ({surfaceLabel} · {session.demoId})
            </span>
          </div>

          {!isEditing ? (
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium leading-snug">
                <span className="font-mono text-[11px] text-[#4285F4] font-bold mr-1.5">
                  SPOTLIGHT NOTICE:
                </span>
                {spotlightNotice}
              </p>
              {justSaved && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#34A853]">
                  <Check className="w-3.5 h-3.5" />
                  Updated live
                </span>
              )}
            </div>
          ) : (
            <form onSubmit={handleSave} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="text"
                value={draftNotice}
                onChange={(e) => setDraftNotice(e.target.value)}
                maxLength={140}
                aria-label="Customize chapter spotlight notice"
                className="flex-1 px-3 py-2 rounded-xl text-xs font-mono bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-strong)] focus:border-[#4285F4] focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-[#4285F4] hover:bg-[#3367D6] transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraftNotice(spotlightNotice);
                    setIsEditing(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isEditing && (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <PencilLine className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>Customize Notice</span>
              </button>
              <button
                type="button"
                onClick={resetSpotlightNotice}
                title="Reset spotlight notice to default"
                aria-label="Reset spotlight notice"
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-subtle)] border border-[var(--border-hairline)] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={dismissMaintainerBar}
            aria-label="Dismiss maintainer preview bar"
            title="Dismiss maintainer preview bar"
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent hover:border-[var(--border-hairline)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Star className="w-4 h-4 text-[#FBBC04] shrink-0" />
          <label
            htmlFor="chapter-spotlight-event"
            className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0"
          >
            CHAPTER SPOTLIGHT EVENT
          </label>
          <select
            id="chapter-spotlight-event"
            value={featuredEventSlug}
            onChange={(e) => setFeaturedEventSlug(e.target.value)}
            className="min-w-0 flex-1 px-3 py-2 rounded-xl text-xs font-mono bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-strong)] focus:border-[#4285F4] focus:outline-none cursor-pointer"
          >
            {upcomingEvents.map((event) => (
              <option key={event.slug} value={event.slug}>
                {event.title} · {event.date}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={resetFeaturedEventSlug}
          title="Reset chapter spotlight to this persona's default"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold text-[var(--text-secondary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Spotlight</span>
        </button>
      </div>
    </aside>
  );
}
