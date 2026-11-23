'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { COMMUNITY_SCENES, CommunityScene } from '@/data/gdgData';

const TARGET_SCENE_IDS = [
  'hackathon-table-sprint',
  'cloud-workshop-lab',
  'broadcast-livestream-studio',
];

const ACCENT_COLORS: Record<string, { hex: string; border: string; bg: string }> = {
  red: {
    hex: '#EA4335',
    border: 'rgba(234, 67, 53, 0.4)',
    bg: 'rgba(234, 67, 53, 0.1)',
  },
  blue: {
    hex: '#4285F4',
    border: 'rgba(66, 133, 244, 0.4)',
    bg: 'rgba(66, 133, 244, 0.1)',
  },
  green: {
    hex: '#34A853',
    border: 'rgba(52, 168, 83, 0.4)',
    bg: 'rgba(52, 168, 83, 0.1)',
  },
  yellow: {
    hex: '#FBBC04',
    border: 'rgba(251, 188, 4, 0.5)',
    bg: 'rgba(251, 188, 4, 0.15)',
  },
};

export function EventsSceneStrip() {
  const showcaseScenes: CommunityScene[] = TARGET_SCENE_IDS.map(
    (id) => COMMUNITY_SCENES.find((s) => s.id === id) || COMMUNITY_SCENES[0]
  ).filter(Boolean);

  return (
    <section
      aria-labelledby="events-scenes-heading"
      className="mt-16 pt-12 border-t border-[var(--border-hairline)]"
    >
      {/* Eyebrow & Headline Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] animate-pulse" />
            <span>[ CAMPUS ENVIRONMENTS // RVCE ]</span>
          </div>
          <h2
            id="events-scenes-heading"
            className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight"
          >
            Inside GDG RVCE Labs &amp; Stages.
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl">
            From the 24-hour sprint tables in CSE Systems Lab to high-throughput cloud workshops
            and hybrid livestream broadcasts.
          </p>
        </div>

        {/* CTA Link to Home Page Scene Gallery */}
        <Link
          href="/#community-scenes"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#4285F4] bg-[#4285F4]/10 hover:bg-[#4285F4]/20 border border-[#4285F4]/30 transition-all self-start md:self-auto shrink-0 group"
        >
          <span>Explore Full Scene Gallery on Home</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Architectural Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {showcaseScenes.map((scene) => {
          const accent = ACCENT_COLORS[scene.googleColor] || ACCENT_COLORS.blue;

          return (
            <div
              key={scene.id}
              className="group rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all overflow-hidden flex flex-col shadow-xs"
            >
              {/* 16:9 Visual Artwork Frame with Corner Crosshairs */}
              <div className="relative w-full aspect-[16/9] bg-[var(--bg-subtle)] overflow-hidden select-none border-b border-[var(--border-hairline)]">
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Corner Crosshairs */}
                <span className="absolute top-2 left-2 z-10 font-mono text-[10px] font-bold text-white/60 pointer-events-none">
                  +
                </span>
                <span className="absolute top-2 right-2 z-10 font-mono text-[10px] font-bold text-white/60 pointer-events-none">
                  +
                </span>

                {/* Code Eyebrow & Category Pill */}
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-white shadow-xs"
                    style={{ backgroundColor: accent.hex }}
                  >
                    {scene.code}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {scene.category}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                    <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                    <span className="truncate">{scene.venue}</span>
                  </div>

                  <h3 className="text-base font-display font-bold text-[var(--text-primary)] group-hover:text-[#4285F4] transition-colors leading-snug">
                    {scene.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {scene.caption}
                  </p>
                </div>

                {/* Highlights Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-hairline)]">
                  {scene.highlights.slice(0, 3).map((hl, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
