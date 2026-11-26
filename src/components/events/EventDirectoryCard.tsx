'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Video, ArrowRight, Bookmark } from 'lucide-react';
import { GDGEvent, EventCategory } from '@/data/gdgData';
import { useSavedEvents } from '@/context/SavedEventsContext';
import { useIssuedPasses } from '@/context/IssuedPassesContext';

interface EventDirectoryCardProps {
  event: GDGEvent;
  viewMode: 'grid' | 'list';
  onSelectEvent: (slug: string) => void;
  index: number;
  isSpotlight?: boolean;
}

function getCategoryBadgeData(category: EventCategory) {
  switch (category) {
    case 'Hackathon':
      return {
        pillClass: 'bg-[#FFFFFF]/95 dark:bg-[#0B0F17]/90 text-[var(--accent-red-text)] border border-[#EA4335]/45 shadow-sm backdrop-blur-md',
        accentHex: '#EA4335',
        dotClass: 'bg-[var(--accent-red-text)]',
        hoverTextClass: 'group-hover:text-[var(--accent-red-text)]',
      };
    case 'Workshop':
      return {
        pillClass: 'bg-[#FFFFFF]/95 dark:bg-[#0B0F17]/90 text-[var(--accent-blue-text)] border border-[#4285F4]/45 shadow-sm backdrop-blur-md',
        accentHex: '#4285F4',
        dotClass: 'bg-[var(--accent-blue-text)]',
        hoverTextClass: 'group-hover:text-[var(--accent-blue-text)]',
      };
    case 'Study Jam':
      return {
        pillClass: 'bg-[#FFFFFF]/95 dark:bg-[#0B0F17]/90 text-[var(--accent-yellow-text)] border border-amber-500/45 shadow-sm backdrop-blur-md',
        accentHex: '#FBBC04',
        dotClass: 'bg-[var(--accent-yellow-text)]',
        hoverTextClass: 'group-hover:text-[var(--accent-yellow-text)]',
      };
    case 'Tech Talk':
      return {
        pillClass: 'bg-[#FFFFFF]/95 dark:bg-[#0B0F17]/90 text-[var(--accent-green-text)] border border-[#34A853]/45 shadow-sm backdrop-blur-md',
        accentHex: '#34A853',
        dotClass: 'bg-[var(--accent-green-text)]',
        hoverTextClass: 'group-hover:text-[var(--accent-green-text)]',
      };
  }
}

export function EventDirectoryCard({
  event,
  viewMode,
  onSelectEvent,
  index,
  isSpotlight = false,
}: EventDirectoryCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isSaved, toggleSave } = useSavedEvents();
  const { getPassForEvent } = useIssuedPasses();
  const issuedPass = getPassForEvent(event.slug);
  const saved = isSaved(event.slug);
  const [viewType, setViewType] = useState<'cover' | 'scene'>('cover');
  const categoryData = getCategoryBadgeData(event.category);
  const isUpcoming = event.status === 'Upcoming';
  const displayImage =
    viewType === 'scene' && event.sceneImage ? event.sceneImage : event.coverImage;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  // =========================================================================
  // 1. GRID CARD MODE
  // =========================================================================
  if (viewMode === 'grid') {
    return (
      <motion.article
        layout
        onPointerMove={handlePointerMove}
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
          delay: prefersReducedMotion ? 0 : index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={() => onSelectEvent(event.slug)}
        className="group blueprint-spotlight relative flex flex-col justify-between rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div>
          {/* Cover Artwork Container (16:9) with smooth hover zoom */}
          <div className="relative w-full aspect-[16/9] bg-[var(--bg-subtle)] border-b border-[var(--border-hairline)] overflow-hidden">
            <Image
              src={displayImage}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />

            {/* Subtle Vignette Gradient for badge legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Top Badges Row — strictly single non-wrapping row */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
              {/* Google-colour category pill */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border backdrop-blur-md shadow-xs whitespace-nowrap shrink-0 ${categoryData.pillClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryData.dotClass}`} />
                {event.category}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Diagram / Scene Toggle */}
                {event.sceneImage && (
                  <div className="inline-flex items-center p-0.5 rounded-lg bg-[#0B0F17]/90 backdrop-blur-md border border-white/20 shadow-xs shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewType('cover');
                      }}
                      className={`relative px-2 py-1 rounded-md text-[10px] font-mono font-semibold leading-none whitespace-nowrap transition-all cursor-pointer after:content-[''] after:absolute after:-inset-y-2 after:inset-x-0 ${
                        viewType === 'cover'
                          ? 'bg-white/25 text-[#F8FAFC] shadow-xs'
                          : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                      }`}
                    >
                      Diagram
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewType('scene');
                      }}
                      className={`relative px-2 py-1 rounded-md text-[10px] font-mono font-semibold leading-none whitespace-nowrap transition-all cursor-pointer after:content-[''] after:absolute after:-inset-y-2 after:inset-x-0 ${
                        viewType === 'scene'
                          ? 'bg-[#1D4ED8] text-white shadow-xs'
                          : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                      }`}
                    >
                      Scene
                    </button>
                  </div>
                )}

                {/* Bookmark Toggle Button (Client-side private storage, 36px visual frame + hit-slop) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(event.slug);
                  }}
                  aria-label={saved ? 'Remove from saved sprints' : 'Save sprint locally'}
                  aria-pressed={saved}
                  title={saved ? 'Saved in personal schedule' : 'Save sprint locally'}
                  className={`relative w-9 h-9 rounded-lg backdrop-blur-md border transition-all cursor-pointer flex items-center justify-center shrink-0 after:content-[''] after:absolute after:-inset-1 ${
                    saved
                      ? 'bg-[#FBBC04] text-[#111827] border-[#FBBC04] shadow-xs'
                      : 'bg-[#0B0F17]/90 hover:bg-[#0B0F17] text-[#CBD5E1] hover:text-[#F8FAFC] border-white/20'
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${saved ? 'fill-[#111827]' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Delivery Mode Chip (Bottom right overlay) */}
            <div className="absolute bottom-2.5 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0B0F17]/90 backdrop-blur-md text-[#F8FAFC] border border-white/15">
                {event.mode === 'Online' ? (
                  <Video className="w-3 h-3 text-[#4ADE80]" />
                ) : (
                  <MapPin className="w-3 h-3 text-[#F87171]" />
                )}
                {event.mode}
              </span>
            </div>

            {/* Bottom Accent Line */}
            <div
              className="absolute bottom-0 inset-x-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: categoryData.accentHex }}
            />
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 space-y-3">
            {/* Dedicated Chapter Spotlight Banner Strip (above date & title, zero SVG overlap) */}
            {isSpotlight && (
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#FBBC04] text-[#111827] border border-[#F59E0B] shadow-2xs">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase whitespace-nowrap">
                  ★ CHAPTER SPOTLIGHT
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider opacity-85 whitespace-nowrap">
                  FEATURED SPRINT
                </span>
              </div>
            )}

            {/* JetBrains Mono Date/Time + Status + Venue */}
            <div className="space-y-1.5 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold min-w-0">
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent-blue-text)] shrink-0" />
                  <span className="truncate">
                    {event.date} · {event.time}
                  </span>
                </div>
                {isUpcoming ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[#34A853]/15 text-[var(--accent-green-text)] border border-[#34A853]/30 shrink-0 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                    Upcoming
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)] shrink-0 whitespace-nowrap">
                    Past Recap
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-red-text)] shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            {/* Space Grotesk Title + 2-line Summary */}
            <div className="space-y-1.5">
              <h2
                className={`text-lg font-display font-bold text-[var(--text-primary)] transition-colors line-clamp-2 ${categoryData.hoverTextClass}`}
              >
                {event.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {event.summary || event.description}
              </p>
            </div>

            {/* Tech Tag Chips */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {event.tags.slice(0, 4).map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Row: Speaker + Action CTA */}
        <div className="p-4 sm:p-5 pt-3 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 flex items-center justify-between gap-3">
          {/* Speaker Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full overflow-hidden relative border border-[var(--border-strong)] shrink-0 bg-[var(--bg-canvas)]">
              <Image
                src={event.speaker.avatar || event.speaker.avatarUrl || '/assets/avatars/member-01.svg'}
                alt={event.speaker.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate max-w-[120px] sm:max-w-[150px]">
                {event.speaker.name}
              </p>
              <p className="text-[10px] font-mono text-[var(--text-muted)] truncate max-w-[120px] sm:max-w-[150px]">
                {event.speaker.role}
              </p>
            </div>
          </div>

          {/* Inspect CTA */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectEvent(event.slug);
            }}
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold hover:underline transition-all group/btn shrink-0 min-h-[44px] md:min-h-[36px] whitespace-nowrap cursor-pointer ${
              issuedPass
                ? 'text-[var(--accent-green-text)]'
                : 'text-[var(--accent-blue-text)]'
            }`}
          >
            <span>
              {issuedPass ? 'Pass Issued ✓ · View Ticket' : 'Inspect Event'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </motion.article>
    );
  }

  // =========================================================================
  // 2. COMPACT SCHEDULE LIST MODE
  // =========================================================================
  return (
    <motion.article
      layout
      onPointerMove={handlePointerMove}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onSelectEvent(event.slug)}
      className="group blueprint-spotlight relative flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md gap-4 overflow-hidden pl-5 sm:pl-6"
    >
      {/* Left Google-colour accent stripe (4px) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 transition-all group-hover:w-2"
        style={{ backgroundColor: categoryData.accentHex }}
      />

      {/* Column 1: Date & Time + Status */}
      <div className="w-full md:w-44 shrink-0 space-y-1 font-mono">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
            {event.date}
          </span>
        </div>
        <p className="text-[11px] text-[var(--text-muted)] pl-5.5">
          {event.time}
        </p>
        <div className="pt-1 pl-5.5 flex items-center gap-2">
          {isUpcoming ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#34A853]/15 text-[var(--accent-green-text)] border border-[#34A853]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
              Upcoming
            </span>
          ) : (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
              Past Recap
            </span>
          )}
        </div>
      </div>

      {/* Column 2: Thumbnail Cover Preview (Hidden on mobile) */}
      <div className="w-24 h-16 rounded-xl overflow-hidden relative shrink-0 hidden sm:block border border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
        <Image
          src={displayImage}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Column 3: Main Info (Title, Category, Venue, Speaker) */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Pill */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${categoryData.pillClass}`}
          >
            <span className={`w-1 h-1 rounded-full ${categoryData.dotClass}`} />
            {event.category}
          </span>

          {isSpotlight && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FBBC04] text-[#111827] border border-[#FBBC04] shadow-xs">
              ★ CHAPTER SPOTLIGHT
            </span>
          )}

          {/* Mode Pill */}
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
            {event.mode === 'Online' ? (
              <Video className="w-3 h-3 text-[var(--accent-green-text)]" />
            ) : (
              <MapPin className="w-3 h-3 text-[var(--accent-red-text)]" />
            )}
            {event.mode}
          </span>
        </div>

        {/* Space Grotesk Title */}
        <h2
          className={`text-base sm:text-lg font-display font-bold text-[var(--text-primary)] transition-colors line-clamp-1 ${categoryData.hoverTextClass}`}
        >
          {event.title}
        </h2>

        {/* Venue & Speaker metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-1.5 truncate max-w-[220px]">
            <MapPin className="w-3 h-3 text-[var(--text-muted)] shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full overflow-hidden relative border border-[var(--border-strong)] shrink-0">
              <Image
                src={event.speaker.avatar || event.speaker.avatarUrl || '/assets/avatars/member-01.svg'}
                alt={event.speaker.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[var(--text-secondary)] font-sans text-xs">
              {event.speaker.name}
            </span>
          </div>
        </div>
      </div>

      {/* Column 4: Action Button CTA & Personal Bookmark Button */}
      <div className="shrink-0 self-end md:self-center pt-2 md:pt-0 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(event.slug);
          }}
          aria-label={saved ? 'Remove from saved sprints' : 'Save sprint locally'}
          aria-pressed={saved}
          title={saved ? 'Saved in personal schedule' : 'Save sprint locally'}
          className={`min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
            saved
              ? 'bg-[#FBBC04] text-[#111827] border-[#FBBC04] shadow-xs'
              : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#111827]' : ''}`} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectEvent(event.slug);
          }}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all duration-200 shadow-2xs hover:shadow-md group/btn min-h-[44px] md:min-h-[40px] whitespace-nowrap ${
            issuedPass
              ? 'bg-[var(--bg-subtle)] text-[var(--accent-green-text)] border-[var(--border-hairline)] font-semibold'
              : 'bg-[var(--bg-subtle)] hover:bg-[#1D4ED8] text-[var(--text-primary)] hover:text-white border border-[var(--border-hairline)] hover:border-[#1D4ED8]'
          }`}
        >
          <span>
            {issuedPass ? 'Pass Issued ✓ · View Ticket' : 'Inspect Event'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}
