'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Home, Calendar, Users, Terminal } from 'lucide-react';
import { MagneticWrapper } from '@/components/ui/MagneticWrapper';

export default function NotFound() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-[calc(100vh-12rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-blueprint-grid">
      {/* Decorative Radial Ambient Glow */}
      <div
        className="absolute w-96 h-96 rounded-full bg-[#4285F4]/10 blur-3xl pointer-events-none -top-12 -left-12"
        aria-hidden="true"
      />
      <div
        className="absolute w-96 h-96 rounded-full bg-[#EA4335]/10 blur-3xl pointer-events-none -bottom-12 -right-12"
        aria-hidden="true"
      />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-2xl p-8 sm:p-12 text-center overflow-hidden"
      >
        {/* 4-Colour Google Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4285F4] rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#EA4335] rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FBBC04] rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#34A853] rounded-br-2xl pointer-events-none" />

        {/* Emote Badge: bug-squashed.svg (72x72px) */}
        <div className="flex justify-center mb-6">
          <div className="relative w-[72px] h-[72px] p-3 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] shadow-inner flex items-center justify-center group">
            <Image
              src="/assets/emotes/bug-squashed.svg"
              alt="Bug Squashed Emote"
              width={72}
              height={72}
              className="object-contain transition-transform group-hover:scale-110 duration-300"
              priority
            />
          </div>
        </div>

        {/* JetBrains Mono Status Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[#EA4335] mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-semibold">[ ERROR 404 // ROUTE_NOT_FOUND ]</span>
        </div>

        {/* Bold Space Grotesk Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-3">
          Looks like this route hasn&apos;t shipped yet.
        </h1>

        {/* Concise Subcopy */}
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-8">
          The requested endpoint doesn&apos;t exist in the GDG on Campus RV College of Engineering portal architecture or is scheduled for a future release cycle.
        </p>

        {/* 3 Clean Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MagneticWrapper maxOffset={5}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </MagneticWrapper>

          <MagneticWrapper maxOffset={5}>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[#EA4335] text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA4335]"
            >
              <Calendar className="w-4 h-4 text-[#EA4335]" />
              <span>Events &amp; Sprints</span>
            </Link>
          </MagneticWrapper>

          <MagneticWrapper maxOffset={5}>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[#34A853] text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34A853]"
            >
              <Users className="w-4 h-4 text-[#34A853]" />
              <span>Core Builders</span>
            </Link>
          </MagneticWrapper>
        </div>

        {/* Footer Technical Note */}
        <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] flex items-center justify-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <span>GDG RVCE</span>
          <span>·</span>
          <span>Bengaluru, KA</span>
          <span>·</span>
          <span className="text-[#34A853]">READY FOR DEPLOY</span>
        </div>
      </motion.div>
    </div>
  );
}
