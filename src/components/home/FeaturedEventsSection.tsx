'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EVENTS_DATA, GDGEvent } from '@/data/gdgData';
import { useIssuedPasses } from '@/context/IssuedPassesContext';

// -----------------------------------------------------------------------------
// HELPER: Category Badge Colour-Coding
// Google Red for Hackathons, Blue for Workshops, Yellow for Study Jams, Green for Tech Talks
// -----------------------------------------------------------------------------
function getCategoryBadgeStyles(eventType: GDGEvent['eventType'] | string) {
  switch (eventType) {
    case 'Hackathon':
      return {
        pillClass: 'bg-[#EA4335]/15 text-[var(--accent-red-text)] border border-[#EA4335]/35',
        dotClass: 'bg-[var(--accent-red-text)]',
      };
    case 'Workshop':
      return {
        pillClass: 'bg-[#4285F4]/15 text-[var(--accent-blue-text)] border border-[#4285F4]/35',
        dotClass: 'bg-[var(--accent-blue-text)]',
      };
    case 'Study Jam':
      return {
        pillClass: 'bg-amber-500/15 text-[var(--accent-yellow-text)] border border-amber-500/35',
        dotClass: 'bg-[var(--accent-yellow-text)]',
      };
    case 'Tech Talk':
      return {
        pillClass: 'bg-[#34A853]/15 text-[var(--accent-green-text)] border border-[#34A853]/35',
        dotClass: 'bg-[var(--accent-green-text)]',
      };
    default:
      return {
        pillClass: 'bg-[#4285F4]/15 text-[var(--accent-blue-text)] border border-[#4285F4]/35',
        dotClass: 'bg-[var(--accent-blue-text)]',
      };
  }
}

// Format ISO 8601 date into a WebKit/Safari-safe JetBrains Mono readable timestamp
function formatEventDate(isoStart: string, timeStr: string) {
  const d = new Date(isoStart);
  if (Number.isNaN(d.getTime())) {
    return 'DATE TBA';
  }
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  const startTimeMatch = timeStr.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?/i);
  const startTime = startTimeMatch ? startTimeMatch[0] : '09:30 IST';
  return `${day} ${month} ${year} · ${startTime}`;
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
  const { getPassForEvent } = useIssuedPasses();
  const issuedPass = getPassForEvent(event.slug);
  const [viewType, setViewType] = useState<'cover' | 'scene'>('cover');
  const categoryStyles = getCategoryBadgeStyles(event.eventType);
  const formattedDateTime = formatEventDate(event.isoStart, event.time);
  const activeImage =
    viewType === 'scene' && event.sceneImage ? event.sceneImage : event.coverImage;

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.08,
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#090C10]/70 via-transparent to-[#090C10]/40 pointer-events-none" />

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
                <div className="inline-flex items-center p-0.5 rounded-lg bg-[#0B0F17]/90 backdrop-blur-md border border-white/20 shadow-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setViewType('cover');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold transition-all cursor-pointer ${
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
                      e.preventDefault();
                      e.stopPropagation();
                      setViewType('scene');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                      viewType === 'scene'
                        ? 'bg-[#4285F4] text-white shadow-xs'
                        : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                    }`}
                  >
                    Scene
                  </button>
                </div>
              )}

              {/* Mode Badge */}
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[#0B0F17]/90 backdrop-blur-md text-[#F8FAFC] border border-white/20">
                {event.mode}
              </span>
            </div>
          </div>

          {/* Bottom Banner Accent Strip */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* ============================================================= */}
          {/* 3. STRUCTURED METADATA                                        */}
          {/* JetBrains Mono Date/Time + RVCE Venue Indicator               */}
          {/* ============================================================= */}
          <div className="space-y-1 text-xs font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-blue-text)] shrink-0" />
              <span>{formattedDateTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent-red-text)] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* ============================================================= */}
          {/* 4. TITLE & SUMMARY + 3 TECH STACK TAGS                        */}
          {/* Space Grotesk Title + 2-line Summary                          */}
          {/* ============================================================= */}
          <div className="space-y-1.5">
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue-text)] transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* 3 Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
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
      <div className="p-4 pt-3 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 flex items-center justify-between gap-2">
        {/* Speaker Info */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full overflow-hidden relative border border-[var(--border-strong)] shrink-0 bg-[var(--bg-canvas)]">
            <Image
              src={event.speaker.avatar || event.speaker.avatarUrl || '/assets/avatars/member-01.svg'}
              alt={event.speaker.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate max-w-[90px] xs:max-w-[110px] sm:max-w-[130px]">
              {event.speaker.name}
            </p>
            <p className="text-[10px] font-mono text-[var(--text-muted)] truncate max-w-[90px] xs:max-w-[110px] sm:max-w-[130px]">
              {event.speaker.role}
            </p>
          </div>
        </div>

        {/* Direct Action Link */}
        <Link
          href={`/events?event=${event.slug}`}
          className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold hover:underline transition-all group/btn whitespace-nowrap min-h-[36px] shrink-0 ${
            issuedPass
              ? 'text-[var(--accent-green-text)]'
              : 'text-[var(--accent-blue-text)]'
          }`}
        >
          {issuedPass ? (
            <span>Pass Issued ✓ · View Ticket</span>
          ) : (
            <>
              <span className="hidden sm:inline">Inspect Agenda &amp; Register</span>
              <span className="sm:hidden">Inspect</span>
            </>
          )}
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover/btn:translate-x-1" />
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
      className="py-12 lg:py-16 bg-[var(--bg-subtle)]/50 border-t border-[var(--border-hairline)] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 lg:mb-8"
        >
          <div className="space-y-2.5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs">
              <span className="font-mono text-xs font-semibold text-[var(--accent-red-text)] tracking-wider">
                [ 03 // UPCOMING ON CAMPUS ]
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[var(--text-primary)]">
              Next sprints &amp; workshops at RVCE.
            </h2>

            {/* Subcopy */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Hands-on architectural laboratories, 24-hour prototype buildathlons, and systems deep-dives hosted on campus.
            </p>
          </div>

          {/* Right-Aligned Directory Button with Subtle Hover Translation */}
          <Link
            href="/events"
            className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] hover:border-[#4285F4] transition-all duration-200 self-start md:self-auto shadow-xs hover:shadow-md whitespace-nowrap shrink-0"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 text-[var(--accent-blue-text)]" />
          </Link>
        </motion.div>

        {/* Curated Upcoming Sprints Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredUpcomingEvents.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
