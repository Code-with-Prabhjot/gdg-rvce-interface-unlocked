'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EVENTS_DATA, GDGEvent } from '@/data/gdgData';

// -----------------------------------------------------------------------------
// HELPER: Category Badge Colour-Coding
// Google Red for Hackathons, Blue for Workshops, Yellow for Study Jams, Green for Tech Talks
// -----------------------------------------------------------------------------
function getCategoryBadgeStyles(eventType: GDGEvent['eventType'] | string) {
  switch (eventType) {
    case 'Hackathon':
      return {
        pillClass: 'bg-[#EA4335]/90 text-white border-[#EA4335]',
        dotClass: 'bg-white',
      };
    case 'Workshop':
      return {
        pillClass: 'bg-[#4285F4]/90 text-white border-[#4285F4]',
        dotClass: 'bg-white',
      };
    case 'Study Jam':
      return {
        // Pairing #FBBC04 with #111827 dark ink for WCAG AAA compliance (>7:1)
        pillClass: 'bg-[#FBBC04] text-[#111827] font-bold border-[#FBBC04]',
        dotClass: 'bg-[#111827]',
      };
    case 'Tech Talk':
      return {
        pillClass: 'bg-[#34A853]/90 text-white border-[#34A853]',
        dotClass: 'bg-white',
      };
    default:
      return {
        pillClass: 'bg-[#4285F4]/90 text-white border-[#4285F4]',
        dotClass: 'bg-white',
      };
  }
}

// Format ISO date into strict JetBrains Mono readable timestamp
function formatEventDate(dateStr: string, timeStr: string) {
  try {
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = d.getFullYear();
    // Extract first time element, e.g. "09:30 AM"
    const startTimeMatch = timeStr.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?/i);
    const startTime = startTimeMatch ? startTimeMatch[0] : '09:30 IST';
    return `${day} ${month} ${year} · ${startTime}`;
  } catch {
    return dateStr;
  }
}

// -----------------------------------------------------------------------------
// EVENT CARD COMPONENT
// -----------------------------------------------------------------------------
interface EventCardProps {
  event: GDGEvent;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [viewType, setViewType] = useState<'cover' | 'scene'>('cover');
  const categoryStyles = getCategoryBadgeStyles(event.eventType);
  const formattedDateTime = formatEventDate(event.date, event.time);
  const activeImage =
    viewType === 'scene' && event.sceneImage ? event.sceneImage : event.coverImage;

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col justify-between rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group"
    >
      <div>
        {/* ============================================================= */}
        {/* 1. 16:9 ARCHITECTURAL COVER BANNER                            */}
        {/* Smooth hover zoom scale(1.04) over 0.6s cubic-bezier(...)     */}
        {/* ============================================================= */}
        <div className="relative w-full aspect-[16/9] bg-[var(--bg-subtle)] border-b border-[var(--border-hairline)] overflow-hidden">
          <Image
            src={activeImage}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />

          {/* Vignette Gradient for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* ============================================================= */}
          {/* 2. TOP OVERLAY PILLS                                          */}
          {/* Category Badge + Diagram / Scene Toggle + Mode Badge          */}
          {/* ============================================================= */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            {/* Category Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border backdrop-blur-md shadow-xs ${categoryStyles.pillClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${categoryStyles.dotClass}`} />
              {event.eventType}
            </span>

            <div className="flex items-center gap-2">
              {/* Diagram / Scene Toggle Pill */}
              {event.sceneImage && (
                <div className="inline-flex items-center p-0.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 shadow-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
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
                      e.preventDefault();
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

              {/* Mode Badge */}
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-black/60 dark:bg-black/80 backdrop-blur-md text-white/95 border border-white/20">
                {event.mode}
              </span>
            </div>
          </div>

          {/* Bottom Banner Accent Strip */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          {/* ============================================================= */}
          {/* 3. STRUCTURED METADATA                                        */}
          {/* JetBrains Mono Date/Time + RVCE Venue Indicator               */}
          {/* ============================================================= */}
          <div className="space-y-1.5 text-xs font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
              <span>{formattedDateTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#EA4335] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* ============================================================= */}
          {/* 4. TITLE & SUMMARY + 3 TECH STACK TAGS                        */}
          {/* Space Grotesk Title + 2-line Summary                          */}
          {/* ============================================================= */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)] group-hover:text-[#4285F4] transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* 3 Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.tags.slice(0, 3).map((tag, tagIdx) => (
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

      {/* ============================================================= */}
      {/* 5. ACTION FOOTER                                              */}
      {/* Speaker preview + Direct link to /events?event=${event.slug}  */}
      {/* Strictly NO RSVP counts or attendee numbers.                  */}
      {/* ============================================================= */}
      <div className="p-6 pt-4 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 flex items-center justify-between">
        {/* Speaker Info */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full overflow-hidden relative border border-[var(--border-strong)] shrink-0 bg-[var(--bg-canvas)]">
            <Image
              src={event.speaker.avatar || event.speaker.avatarUrl || '/assets/avatars/member-01.svg'}
              alt={event.speaker.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate max-w-[110px] sm:max-w-[130px]">
              {event.speaker.name}
            </p>
            <p className="text-[10px] font-mono text-[var(--text-muted)] truncate max-w-[110px] sm:max-w-[130px]">
              {event.speaker.role}
            </p>
          </div>
        </div>

        {/* Direct Action Link */}
        <Link
          href={`/events?event=${event.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4285F4] hover:text-[#3367D6] transition-all group/btn"
        >
          <span>Inspect Agenda &amp; Register</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

// -----------------------------------------------------------------------------
// MAIN SECTION: FeaturedEventsSection (Act IV)
// -----------------------------------------------------------------------------
export function FeaturedEventsSection() {
  const prefersReducedMotion = useReducedMotion();

  // Filter for top 3 upcoming sessions
  const featuredUpcomingEvents = EVENTS_DATA.filter((e) => e.status.toLowerCase() === 'upcoming').slice(0, 3);

  return (
    <section
      id="upcoming-events"
      className="py-20 lg:py-28 bg-[var(--bg-subtle)]/50 border-t border-[var(--border-hairline)] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14"
        >
          <div className="space-y-3">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
              <span className="font-mono text-xs font-semibold text-[#EA4335] tracking-wider">
                [ 03 // UPCOMING ON CAMPUS ]
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
              Next sprints &amp; workshops at RVCE.
            </h2>

            {/* Subcopy */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Hands-on architectural laboratories, 24-hour prototype buildathlons, and systems deep-dives hosted on campus.
            </p>
          </div>

          {/* Right-Aligned Directory Button with Subtle Hover Translation */}
          <Link
            href="/events"
            className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] hover:border-[#4285F4] transition-all duration-200 self-start md:self-auto shadow-xs hover:shadow-md"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#4285F4]" />
          </Link>
        </motion.div>

        {/* Curated Upcoming Sprints Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredUpcomingEvents.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
