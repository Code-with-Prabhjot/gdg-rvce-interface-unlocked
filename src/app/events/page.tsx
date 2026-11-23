import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { EventsDirectoryClient } from '@/components/events/EventsDirectoryClient';

export const metadata: Metadata = {
  title: 'Events & Sprints | GDG on Campus RVCE',
  description:
    'Hands-on developer laboratories, campus hackathons, and technical deep dives hosted by GDG on Campus RV College of Engineering (GDG RVCE).',
};

function EventsDirectorySkeleton() {
  return (
    <div className="w-full space-y-10 sm:space-y-12 animate-pulse" aria-hidden="true">
      {/* Header Skeleton matching EventsHeroHeader */}
      <div className="w-full rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="w-48 h-6 rounded-full bg-[var(--border-subtle)]" />
          <div className="w-full sm:w-96 h-10 sm:h-12 rounded-xl bg-[var(--border-subtle)]" />
          <div className="w-3/4 h-5 rounded-md bg-[var(--border-hairline)]" />
        </div>
        <div className="w-full lg:w-80 h-44 rounded-2xl bg-[var(--border-hairline)]" />
      </div>

      {/* Filter Bar Skeleton matching EventsFilterBar */}
      <div className="w-full h-32 sm:h-28 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-4 sm:p-6" />

      {/* Grid Skeleton matching EventDirectoryCard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[460px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] overflow-hidden flex flex-col justify-between p-5"
          >
            <div className="w-full h-44 rounded-xl bg-[var(--border-subtle)] mb-4" />
            <div className="space-y-3 flex-1">
              <div className="w-24 h-4 rounded-full bg-[var(--border-subtle)]" />
              <div className="w-5/6 h-6 rounded-md bg-[var(--border-subtle)]" />
              <div className="w-full h-10 rounded-md bg-[var(--border-hairline)]" />
            </div>
            <div className="w-full h-10 rounded-xl bg-[var(--border-subtle)] mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<EventsDirectorySkeleton />}>
          <EventsDirectoryClient />
        </Suspense>
      </div>
    </div>
  );
}
