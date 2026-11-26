import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TeamDirectoryClient } from '@/components/team/TeamDirectoryClient';

export const metadata: Metadata = {
  title: 'Team | GDG on Campus RVCE',
  description:
    'Meet the student builders, systems engineers, and open-source contributors leading GDG on Campus RV College of Engineering (GDG RVCE).',
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: 'Team & Builders | GDG on Campus RV College of Engineering',
    description:
      'Meet the student builders, systems engineers, and open-source contributors leading GDG on Campus RV College of Engineering (GDG RVCE).',
    url: '/team',
    siteName: 'GDG on Campus RV College of Engineering',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'GDG on Campus RV College of Engineering — Core Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team & Builders | GDG on Campus RV College of Engineering',
    description:
      'Meet the student builders, systems engineers, and open-source contributors leading GDG RVCE.',
    images: ['/twitter-image'],
  },
};

function TeamDirectorySkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse" aria-hidden="true">
      {/* Header Skeleton */}
      <div className="w-full h-72 sm:h-80 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)]" />

      {/* Filter Bar Skeleton */}
      <div className="w-full h-16 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)]" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[480px] rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)]"
          />
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<TeamDirectorySkeleton />}>
          <TeamDirectoryClient />
        </Suspense>
      </div>
    </div>
  );
}
