'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { RotateCw, Globe, Sparkles } from 'lucide-react';
import { GDGTeamMember, GoogleAccent } from '@/data/gdgData';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

interface TeamMemberCardProps {
  member: GDGTeamMember;
  isFlipped: boolean;
  onToggleFlip: () => void;
  index: number;
}

interface AccentStyleConfig {
  hex: string;
  badgeClass: string;
  ringClass: string;
  glowClass: string;
  hoverBorderClass: string;
  socialHoverClass: string;
}

function getAccentConfig(color: GoogleAccent): AccentStyleConfig {
  switch (color) {
    case 'red':
      return {
        hex: '#EA4335',
        badgeClass: 'bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/30',
        ringClass: 'ring-[#EA4335]/30 group-hover:ring-[#EA4335]',
        glowClass: 'shadow-[0_0_12px_rgba(234,67,53,0.15)]',
        hoverBorderClass: 'hover:border-[#EA4335]/50',
        socialHoverClass: 'hover:text-[#EA4335] hover:border-[#EA4335]',
      };
    case 'blue':
      return {
        hex: '#4285F4',
        badgeClass: 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/30',
        ringClass: 'ring-[#4285F4]/30 group-hover:ring-[#4285F4]',
        glowClass: 'shadow-[0_0_12px_rgba(66,133,244,0.15)]',
        hoverBorderClass: 'hover:border-[#4285F4]/50',
        socialHoverClass: 'hover:text-[#4285F4] hover:border-[#4285F4]',
      };
    case 'yellow':
      return {
        hex: '#FBBC04',
        // WCAG AAA: Pair #FBBC04 with #111827 dark ink on yellow fills for >7:1 contrast
        badgeClass: 'bg-[#FBBC04] text-[#111827] font-semibold border-[#FBBC04]',
        ringClass: 'ring-[#FBBC04]/40 group-hover:ring-[#FBBC04]',
        glowClass: 'shadow-[0_0_12px_rgba(251,188,4,0.15)]',
        hoverBorderClass: 'hover:border-[#FBBC04]/50',
        socialHoverClass: 'hover:text-[#B45309] dark:hover:text-[#FBBC04] hover:border-[#FBBC04]',
      };
    case 'green':
    default:
      return {
        hex: '#34A853',
        badgeClass: 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/30',
        ringClass: 'ring-[#34A853]/30 group-hover:ring-[#34A853]',
        glowClass: 'shadow-[0_0_12px_rgba(52,168,83,0.15)]',
        hoverBorderClass: 'hover:border-[#34A853]/50',
        socialHoverClass: 'hover:text-[#34A853] hover:border-[#34A853]',
      };
  }
}

export function TeamMemberCard({
  member,
  isFlipped,
  onToggleFlip,
  index,
}: TeamMemberCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const accent = getAccentConfig(member.googleColor);
  const devIdTag = member.id.replace('builder-', 'DEV // ');

  return (
    <motion.article
      layout
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex flex-col justify-between rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] ${accent.hoverBorderClass} p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 min-h-[490px] overflow-hidden`}
    >
      {/* Subtle top indicator bar */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: accent.hex }}
      />

      {/* Top Architectural Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--border-hairline)]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[11px] font-semibold text-[var(--text-muted)] tracking-wider">
            {devIdTag}
          </span>
          <span className="text-[var(--text-muted)] text-[10px]">·</span>
          <span className="font-mono text-[10px] text-[var(--text-secondary)] px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-hairline)] truncate">
            {member.yearAndBranch}
          </span>
        </div>

        {/* Tactile Flip-Inspect Button (44px hit target) */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onToggleFlip}
            aria-label={
              isFlipped
                ? `Show profile for ${member.name}`
                : `Inspect technical builder spec for ${member.name}`
            }
            className="min-h-[44px] min-w-[44px] -my-1 -mr-1 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] rounded-lg"
          >
            <span
              className={`min-h-[34px] px-2.5 rounded-lg text-[11px] font-mono font-medium flex items-center gap-1.5 transition-all border ${
                isFlipped
                  ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] border-[var(--border-strong)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{isFlipped ? 'Profile ↺' : 'Spec ↻'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Animated Card Body: Toggle between Front (Profile) and Back (Builder Spec) */}
      <div className="flex-1 flex flex-col justify-between">
        <AnimatePresence mode="wait" initial={false}>
          {!isFlipped ? (
            /* ============================================================= */
            /* FRONT VIEW: Profile & Bauhaus Geometric Avatar               */
            /* ============================================================= */
            <motion.div
              key="profile-view"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                {/* Avatar with Bauhaus Geometric Ring & Emote Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="relative shrink-0">
                    <div
                      className={`w-24 h-24 rounded-2xl p-1 bg-[var(--bg-subtle)] border border-[var(--border-hairline)] ring-2 ${accent.ringClass} transition-transform duration-300 group-hover:scale-105 overflow-hidden`}
                    >
                      <Image
                        src={member.avatar}
                        alt={`${member.name} Bauhaus portrait`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Overlapping Developer Emote Badge (32x32) */}
                    <div
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-1 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      title={`${member.name}'s craft badge`}
                    >
                      <Image
                        src={member.emoteBadge}
                        alt="Emote badge"
                        width={24}
                        height={24}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  </div>

                  {/* Vertical Department Pill */}
                  <div className="pt-1">
                    <span
                      className={`inline-block text-[10px] font-mono px-2.5 py-1 rounded-md border tracking-wider uppercase ${accent.badgeClass}`}
                    >
                      {member.vertical}
                    </span>
                  </div>
                </div>

                {/* Name & Specific Role */}
                <div className="space-y-1">
                  <h2 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[#4285F4] transition-colors">
                    {member.name}
                  </h2>
                  <p className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                    {member.role}
                  </p>
                </div>

                {/* Bio (Crisp 2 lines) */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {member.bio}
                </p>
              </div>

              {/* 3 Technical Skill Chips */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ============================================================= */
            /* BACK VIEW: Structured Builder Spec Sheet                     */
            /* ============================================================= */
            <motion.div
              key="spec-view"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-3">
                {/* Spec Sheet Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--text-primary)]">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: accent.hex }} />
                    <span>BUILDER SPEC</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border ${accent.badgeClass}`}
                  >
                    {member.vertical}
                  </span>
                </div>

                {/* Focus Area */}
                <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] space-y-1">
                  <div className="text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Current Focus
                  </div>
                  <div className="text-xs font-medium text-[var(--text-primary)] leading-tight">
                    {member.builderSpec.focusArea}
                  </div>
                </div>

                {/* Favorite Stack */}
                <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] space-y-1">
                  <div className="text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Favorite Stack
                  </div>
                  <div className="text-xs font-mono text-[var(--text-secondary)] leading-tight">
                    {member.builderSpec.favoriteStack}
                  </div>
                </div>

                {/* Open Source Contribution */}
                <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] space-y-1">
                  <div className="text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Open Source
                  </div>
                  <div className="text-xs font-mono text-[var(--text-secondary)] truncate">
                    {member.builderSpec.openSourceContrib}
                  </div>
                </div>

                {/* Build Motto */}
                <div className="p-2.5 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                    Build Motto
                  </div>
                  <div className="text-xs italic text-[var(--text-primary)] leading-snug">
                    &ldquo;{member.builderSpec.buildMotto}&rdquo;
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Card Footer: Accessible Social Links */}
      <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] flex items-center justify-between">
        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          {isFlipped ? 'SPEC SHEET' : 'CONNECT'}
        </span>

        <div className="flex items-center gap-1.5">
          {/* GitHub Link */}
          <a
            href={member.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} sample GitHub profile`}
            className={`min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)] ${accent.socialHoverClass} transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          {/* LinkedIn Link */}
          <a
            href={member.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} sample LinkedIn profile`}
            className={`min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)] ${accent.socialHoverClass} transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]`}
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>

          {/* Optional Website / Portfolio Link */}
          {member.links.website && (
            <a
              href={member.links.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} sample portfolio website`}
              className={`min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)] ${accent.socialHoverClass} transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]`}
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
