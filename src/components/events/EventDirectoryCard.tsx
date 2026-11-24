'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Video, ArrowRight, Bookmark } from 'lucide-react';
import { GDGEvent, EventCategory } from '@/data/gdgData';
import { useSavedEvents } from '@/context/SavedEventsContext';

interface EventDirectoryCardProps {
  event: GDGEvent;
  viewMode: 'grid' | 'list';
  onSelectEvent: (slug: string) => void;
  index: number;
}

function getCategoryBadgeData(category: EventCategory) {
  switch (category) {
    case 'Hackathon':
      return {
        pillClass: 'bg-[#EA4335] text-white border-[#EA4335]',
        accentHex: '#EA4335',
        dotClass: 'bg-white',
        hoverTextClass: 'group-hover:text-[#EA4335]',
      };
    case 'Workshop':
      return {
        pillClass: 'bg-[#4285F4] text-white border-[#4285F4]',
        accentHex: '#4285F4',
        dotClass: 'bg-white',
        hoverTextClass: 'group-hover:text-[#4285F4]',
      };
    case 'Study Jam':
      return {
        // Pair #FBBC04 with #111827 dark ink for WCAG AAA contrast (>7:1)
        pillClass: 'bg-[#FBBC04] text-[#111827] font-bold border-[#FBBC04]',
        accentHex: '#FBBC04',
        dotClass: 'bg-[#111827]',
        hoverTextClass: 'group-hover:text-[#FBBC04]',
      };
    case 'Tech Talk':
      return {
        pillClass: 'bg-[#34A853] text-white border-[#34A853]',
        accentHex: '#34A853',
        dotClass: 'bg-white',
        hoverTextClass: 'group-hover:text-[#34A853]',
      };
  }
}

export function EventDirectoryCard({
  event,
  viewMode,
  onSelectEvent,
  index,
}: EventDirectoryCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isSaved, toggleSave } = useSavedEvents();
  const saved = isSaved(event.slug);
  const [viewType, setViewType] = useState<'cover' | 'scene'>('cover');
  const categoryData = getCategoryBadgeData(event.category);
  const isUpcoming = event.status === 'Upcoming';
  const displayImage =
    viewType === 'scene' && event.sceneImage ? event.sceneImage : event.coverImage;

  // =========================================================================
  // 1. GRID CARD MODE
  // =========================================================================
  if (viewMode === 'grid') {
    return (
      <motion.article
        layout
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
          delay: prefersReducedMotion ? 0 : index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={() => onSelectEvent(event.slug)}
        className="group relative flex flex-col justify-between rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
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

            {/* Top Badges Row */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              {/* Google-colour category pill */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border backdrop-blur-md shadow-xs ${categoryData.pillClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${categoryData.dotClass}`} />
                {event.category}
              </span>

              <div className="flex items-center gap-2">
                {/* Diagram / Scene Toggle */}
                {event.sceneImage && (
                  <div className="inline-flex items-center p-0.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 shadow-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewType('cover');
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold transition-all ${
                        viewType === 'cover'
                          ? 'bg-white/25 text-white shadow-xs'
                          : 'text-white/60 hover:text-white'
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
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold transition-all ${
                        viewType === 'scene'
                          ? 'bg-[#4285F4] text-white shadow-xs'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Scene
                    </button>
                  </div>
                )}

                {/* Status Badge */}
                {isUpcoming ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-black/65 backdrop-blur-md text-white border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                    Upcoming
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-black/65 backdrop-blur-md text-white/80 border border-white/20">
                    Past Recap
                  </span>
                )}

                {/* Bookmark Toggle Button (Client-side private storage) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(event.slug);
                  }}
                  aria-label={saved ? 'Remove from saved sprints' : 'Save sprint locally'}
                  aria-pressed={saved}
                  title={saved ? 'Saved in personal schedule' : 'Save sprint locally'}
                  className={`min-w-[28px] min-h-[28px] p-1.5 rounded-md backdrop-blur-md border transition-all cursor-pointer flex items-center justify-center ${
                    saved
                      ? 'bg-[#FBBC04] text-[#111827] border-[#FBBC04] shadow-xs'
                      : 'bg-black/65 hover:bg-black/85 text-white/80 hover:text-white border-white/20'
                  }`}
                >
                  <Bookmark
                    className={`w-3 h-3 ${saved ? 'fill-[#111827]' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Delivery Mode Chip (Bottom right overlay) */}
            <div className="absolute bottom-2.5 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/75 backdrop-blur-md text-white/95 border border-white/15">
                {event.mode === 'Online' ? (
                  <Video className="w-3 h-3 text-[#34A853]" />
                ) : (
                  <MapPin className="w-3 h-3 text-[#EA4335]" />
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
          <div className="p-5 sm:p-6 space-y-4">
            {/* JetBrains Mono Date/Time + Venue */}
            <div className="space-y-1.5 text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                <span>
                  {event.date} · {event.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EA4335] shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            {/* Space Grotesk Title + 2-line Summary */}
            <div className="space-y-2">
              <h3
                className={`text-lg sm:text-xl font-display font-bold text-[var(--text-primary)] transition-colors line-clamp-2 ${categoryData.hoverTextClass}`}
              >
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {event.summary || event.description}
              </p>
            </div>

            {/* Tech Tag Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
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
        <div className="p-5 sm:p-6 pt-3.5 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 flex items-center justify-between gap-3">
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
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#4285F4] hover:text-[#3367D6] transition-all group/btn shrink-0 min-h-[36px] whitespace-nowrap"
          >
            <span>Inspect Event</span>
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
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onSelectEvent(event.slug)}
      className="group relative flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md gap-4 overflow-hidden pl-5 sm:pl-6"
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
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#34A853]/15 text-[#34A853] border border-[#34A853]/30">
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

          {/* Mode Pill */}
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
            {event.mode === 'Online' ? (
              <Video className="w-3 h-3 text-[#34A853]" />
            ) : (
              <MapPin className="w-3 h-3 text-[#EA4335]" />
            )}
            {event.mode}
          </span>
        </div>

        {/* Space Grotesk Title */}
        <h3
          className={`text-base sm:text-lg font-display font-bold text-[var(--text-primary)] transition-colors line-clamp-1 ${categoryData.hoverTextClass}`}
        >
          {event.title}
        </h3>

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
          className={`min-w-[40px] min-h-[40px] p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[var(--bg-subtle)] hover:bg-[#4285F4] text-[var(--text-primary)] hover:text-white border border-[var(--border-hairline)] hover:border-[#4285F4] transition-all duration-200 shadow-2xs hover:shadow-md group/btn min-h-[40px] whitespace-nowrap"
        >
          <span>Inspect Event</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}
