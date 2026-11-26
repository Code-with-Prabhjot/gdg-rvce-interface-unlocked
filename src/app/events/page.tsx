import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { EventsDirectoryClient } from '@/components/events/EventsDirectoryClient';

export const metadata: Metadata = {
  title: 'Events & Sprints | GDG on Campus RVCE',
  description:
    'Hands-on developer laboratories, campus hackathons, and technical deep dives hosted by GDG on Campus RV College of Engineering (GDG RVCE).',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Events & Sprints | GDG on Campus RV College of Engineering',
    description:
      'Hands-on developer laboratories, campus hackathons, and technical deep dives hosted by GDG on Campus RV College of Engineering (GDG RVCE).',
    url: '/events',
    siteName: 'GDG on Campus RV College of Engineering',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'GDG on Campus RV College of Engineering — Events & Sprints',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events & Sprints | GDG on Campus RV College of Engineering',
    description:
      'Hands-on developer laboratories, campus hackathons, and technical deep dives hosted by GDG RVCE.',
    images: ['/twitter-image'],
  },
};

function EventsDirectorySkeleton() {
  return (
    <div className="w-full space-y-10 sm:space-y-12 animate-pulse" aria-hidden="true">
      {/* Header Skeleton matching EventsHeroHeader */}
      <div className="w-full rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="w-48 h-6 rounded-full bg-[var(--bg-subtle)]" />
          <div className="w-full sm:w-96 h-10 sm:h-12 rounded-xl bg-[var(--bg-subtle)]" />
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
            className="h-[440px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] overflow-hidden flex flex-col justify-between p-5"
          >
            <div className="w-full h-44 rounded-xl bg-[var(--bg-subtle)] mb-4" />
            <div className="space-y-3 flex-1">
              <div className="w-24 h-4 rounded-full bg-[var(--bg-subtle)]" />
              <div className="w-5/6 h-6 rounded-md bg-[var(--bg-subtle)]" />
              <div className="w-full h-10 rounded-md bg-[var(--border-hairline)]" />
            </div>
            <div className="w-full h-10 rounded-xl bg-[var(--bg-subtle)] mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<EventsDirectorySkeleton />}>
          <EventsDirectoryClient />
        </Suspense>
      </div>
    </div>
  );
}
