'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Waypoint {
  id: string;
  index: string;
  label: string;
  accent: string;
}

const WAYPOINTS: Waypoint[] = [
  { id: 'hero', index: '00', label: 'HERO', accent: '#4285F4' },
  { id: 'pillars', index: '01', label: 'PILLARS', accent: '#EA4335' },
  { id: 'tracks', index: '02', label: 'TRACKS', accent: '#FBBC04' },
  { id: 'upcoming-events', index: '03', label: 'SPRINTS', accent: '#34A853' },
  { id: 'community-scenes', index: '04', label: 'SCENES', accent: '#EA4335' },
  { id: 'recap-community', index: '05', label: 'RECAP', accent: '#4285F4' },
];

export function SectionScrollSpyRail() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>('hero');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    // Collect all existing section elements
    const elements: HTMLElement[] = [];
    WAYPOINTS.forEach((wp) => {
      const el = document.getElementById(wp.id);
      if (el) elements.push(el);
    });

    if (elements.length === 0) return;

    // Setup IntersectionObserver with center-viewport threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback scroll listener for top/bottom edge cases
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveId('hero');
        return;
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 250) {
        setActiveId('recap-community');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <aside
      aria-label="Section Navigation Rail"
      className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end pointer-events-auto select-none"
    >
      {/* Architectural Telemetry Header */}
      <div className="mb-3 pr-1 text-[9px] font-mono text-[var(--text-muted)] tracking-widest uppercase opacity-75">
        WAYPOINTS
      </div>

      <nav className="relative flex flex-col items-end space-y-4 py-2">
        {/* Subtle Vertical Connector Rail Line */}
        <div className="absolute right-[5px] top-2 bottom-2 w-px bg-[var(--border-hairline)] z-0" />

        {WAYPOINTS.map((wp) => {
          const isActive = activeId === wp.id;
          const isHovered = hoveredId === wp.id;

          return (
            <button
              key={wp.id}
              type="button"
              onClick={() => scrollToSection(wp.id)}
              onMouseEnter={() => setHoveredId(wp.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex items-center gap-3 py-1 px-1 focus:outline-none cursor-pointer z-10"
              aria-label={`Jump to ${wp.label} section`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Expanding Label Pill on Active / Hover */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] border shadow-xs transition-all duration-200 pointer-events-none ${
                  isActive
                    ? 'bg-[var(--bg-elevated)] border-[var(--border-strong)] text-[var(--text-primary)] opacity-100 translate-x-0'
                    : isHovered
                    ? 'bg-[var(--bg-elevated)] border-[var(--border-hairline)] text-[var(--text-secondary)] opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 pointer-events-none'
                }`}
              >
                <span style={{ color: wp.accent }} className="font-bold">
                  {wp.index}
                </span>
                <span className="font-semibold tracking-wider text-[var(--text-secondary)]">
                  {wp.label}
                </span>
              </div>

              {/* Waypoint Dot / Indicator */}
              <div className="relative flex items-center justify-center w-3 h-3">
                {/* Active Pulsing Ring */}
                {isActive && (
                  <motion.span
                    layoutId="scroll-spy-active-ring"
                    className="absolute inset-0 rounded-full opacity-30 animate-ping"
                    style={{ backgroundColor: wp.accent }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                {/* Core Dot Node */}
                <div
                  className={`rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-2.5 h-2.5 shadow-xs ring-2 ring-offset-2 ring-offset-[var(--bg-canvas)]'
                      : 'w-2 h-2 bg-[var(--text-muted)] opacity-50 group-hover:opacity-100 group-hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: isActive ? wp.accent : undefined,
                    boxShadow: isActive ? `0 0 10px ${wp.accent}` : undefined,
                  }}
                />
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
