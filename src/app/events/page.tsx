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
    <div className="w-full space-y-8 animate-pulse" aria-hidden="true">
      {/* Header Skeleton */}
      <div className="w-full h-72 sm:h-80 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)]" />

      {/* Filter Bar Skeleton */}
      <div className="w-full h-32 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)]" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[420px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] overflow-hidden"
          />
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
