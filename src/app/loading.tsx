import React from 'react';

/**
 * GDG on Campus RV College of Engineering (GDG RVCE)
 * Architectural Route Loading Skeleton
 *
 * Renders a crisp zero-CLS loading state across route transitions
 * and suspense boundaries with pulsing GDG chevrons and a 3-card skeleton grid.
 */
export default function Loading() {
  return (
    <div
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden"
      aria-label="Loading architectural view"
      role="status"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-canvas)]/40 via-transparent to-[var(--bg-canvas)]/80 pointer-events-none" />

      {/* Pulsing GDG Chevron Emblem & Telemetry */}
      <div className="relative z-10 flex flex-col items-center space-y-4 mb-12">
        <div className="w-28 h-14 sm:w-36 sm:h-18 flex items-center justify-center animate-pulse">
          <svg
            viewBox="0 0 120 64"
            fill="none"
            className="w-full h-full drop-shadow-sm"
            aria-hidden="true"
          >
            {/* Left Bracket `<` */}
            <path
              d="M46 11L22 32"
              stroke="#EA4335"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 32L46 53"
              stroke="#4285F4"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Bracket `>` */}
            <path
              d="M74 11L98 32"
              stroke="#34A853"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M98 32L74 53"
              stroke="#FBBC04"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-elevated)]/90 shadow-xs backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-ping shrink-0" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
            SYNCING // ARCHITECTURAL_VIEW
          </span>
        </div>
      </div>

      {/* Clean 3-Card Skeleton Grid matching var(--bg-elevated) & var(--border-hairline) */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-72 sm:h-80 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-6 flex flex-col justify-between animate-pulse"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-20 h-4 rounded-md bg-[var(--border-subtle)]" />
                <div className="w-12 h-4 rounded-md bg-[var(--border-subtle)]" />
              </div>
              <div className="w-3/4 h-6 rounded-md bg-[var(--border-subtle)]" />
              <div className="w-full h-12 rounded-md bg-[var(--border-hairline)]" />
            </div>
            <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between">
              <div className="w-28 h-4 rounded-md bg-[var(--border-subtle)]" />
              <div className="w-16 h-4 rounded-md bg-[var(--border-subtle)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
