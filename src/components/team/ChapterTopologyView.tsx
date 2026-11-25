'use client';

import React, { useState, useId, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Cpu,
  Cloud,
  Palette,
  Users,
  Compass,
  Maximize2,
} from 'lucide-react';
import {
  TEAM_DATA,
  GDGTeamMember,
  TeamVertical,
  GoogleAccent,
} from '@/data/gdgData';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';

export interface ChapterTopologyViewProps {
  filteredMembers?: GDGTeamMember[];
  allMembers?: GDGTeamMember[];
  activeVertical?: string;
  activeSkill?: string;
  searchQuery?: string;
  onInspectMember?: (member: GDGTeamMember) => void;
}

interface AccentVisualConfig {
  hex: string;
  badgeClass: string;
  ringClass: string;
  glowClass: string;
  textClass: string;
}

function getAccentVisual(color: GoogleAccent): AccentVisualConfig {
  switch (color) {
    case 'red':
      return {
        hex: '#EA4335',
        badgeClass: 'bg-[#EA4335]/10 text-[var(--accent-red-text)] border-[#EA4335]/30',
        ringClass: 'ring-[#EA4335]',
        glowClass: 'shadow-[0_0_16px_rgba(234,67,53,0.35)]',
        textClass: 'text-[var(--accent-red-text)]',
      };
    case 'blue':
      return {
        hex: '#4285F4',
        badgeClass: 'bg-[#4285F4]/10 text-[var(--accent-blue-text)] border-[#4285F4]/30',
        ringClass: 'ring-[#4285F4]',
        glowClass: 'shadow-[0_0_16px_rgba(66,133,244,0.35)]',
        textClass: 'text-[var(--accent-blue-text)]',
      };
    case 'yellow':
      return {
        hex: '#FBBC04',
        // WCAG AAA: Pair #FBBC04 with #111827 dark ink on yellow fills
        badgeClass: 'bg-[#FBBC04] text-[#111827] font-semibold border-[#FBBC04]',
        ringClass: 'ring-[#FBBC04]',
        glowClass: 'shadow-[0_0_16px_rgba(251,188,4,0.35)]',
        textClass: 'text-[var(--accent-yellow-text)]',
      };
    case 'green':
    default:
      return {
        hex: '#34A853',
        badgeClass: 'bg-[#34A853]/10 text-[var(--accent-green-text)] border-[#34A853]/30',
        ringClass: 'ring-[#34A853]',
        glowClass: 'shadow-[0_0_16px_rgba(52,168,83,0.35)]',
        textClass: 'text-[var(--accent-green-text)]',
      };
  }
}

interface VerticalClusterDef {
  vertical: TeamVertical;
  label: string;
  shortLabel: string;
  accent: GoogleAccent;
  hex: string;
  icon: React.ElementType;
  pos: { x: number; y: number };
  hubPathD: string;
}

const VERTICAL_CLUSTERS: VerticalClusterDef[] = [
  {
    vertical: 'Core Lead',
    label: 'Core Lead & Strategy',
    shortLabel: 'Core Lead',
    accent: 'red',
    hex: '#EA4335',
    icon: Compass,
    pos: { x: 400, y: 130 },
    hubPathD: 'M 400 275 L 400 130',
  },
  {
    vertical: 'Web & Cloud',
    label: 'Web & Cloud Systems',
    shortLabel: 'Web & Cloud',
    accent: 'blue',
    hex: '#4285F4',
    icon: Cloud,
    pos: { x: 190, y: 180 },
    hubPathD: 'M 400 275 C 320 275, 250 220, 190 180',
  },
  {
    vertical: 'AI & ML',
    label: 'AI & Machine Learning',
    shortLabel: 'AI & ML',
    accent: 'green',
    hex: '#34A853',
    icon: Cpu,
    pos: { x: 610, y: 180 },
    hubPathD: 'M 400 275 C 480 275, 550 220, 610 180',
  },
  {
    vertical: 'Design & UX',
    label: 'Design Systems & UX',
    shortLabel: 'Design & UX',
    accent: 'yellow',
    hex: '#FBBC04',
    icon: Palette,
    pos: { x: 220, y: 410 },
    hubPathD: 'M 400 275 C 320 275, 260 360, 220 410',
  },
  {
    vertical: 'Community & Events',
    label: 'Community & DevRel',
    shortLabel: 'Community',
    accent: 'green',
    hex: '#34A853',
    icon: Users,
    pos: { x: 580, y: 410 },
    hubPathD: 'M 400 275 C 480 275, 540 360, 580 410',
  },
];

interface BuilderLeafPos {
  memberId: string;
  x: number;
  y: number;
  parentVertical: TeamVertical;
  clusterPathD: string;
}

const BUILDER_LEAF_POSITIONS: BuilderLeafPos[] = [
  // Core Lead (Parent at 400, 130)
  {
    memberId: 'builder-01',
    x: 310,
    y: 50,
    parentVertical: 'Core Lead',
    clusterPathD: 'M 400 130 C 400 80, 340 70, 310 50',
  },
  {
    memberId: 'builder-02',
    x: 490,
    y: 50,
    parentVertical: 'Core Lead',
    clusterPathD: 'M 400 130 C 400 80, 460 70, 490 50',
  },
  // Web & Cloud (Parent at 190, 180)
  {
    memberId: 'builder-03',
    x: 80,
    y: 110,
    parentVertical: 'Web & Cloud',
    clusterPathD: 'M 190 180 C 130 180, 110 130, 80 110',
  },
  {
    memberId: 'builder-04',
    x: 70,
    y: 250,
    parentVertical: 'Web & Cloud',
    clusterPathD: 'M 190 180 C 130 180, 110 230, 70 250',
  },
  // AI & ML (Parent at 610, 180)
  {
    memberId: 'builder-05',
    x: 720,
    y: 110,
    parentVertical: 'AI & ML',
    clusterPathD: 'M 610 180 C 670 180, 690 130, 720 110',
  },
  {
    memberId: 'builder-06',
    x: 730,
    y: 250,
    parentVertical: 'AI & ML',
    clusterPathD: 'M 610 180 C 670 180, 690 230, 730 250',
  },
  // Design & UX (Parent at 220, 410)
  {
    memberId: 'builder-07',
    x: 110,
    y: 480,
    parentVertical: 'Design & UX',
    clusterPathD: 'M 220 410 C 160 410, 140 450, 110 480',
  },
  {
    memberId: 'builder-08',
    x: 260,
    y: 505,
    parentVertical: 'Design & UX',
    clusterPathD: 'M 220 410 C 240 460, 250 480, 260 505',
  },
  // Community & Events (Parent at 580, 410)
  {
    memberId: 'builder-09',
    x: 540,
    y: 505,
    parentVertical: 'Community & Events',
    clusterPathD: 'M 580 410 C 560 460, 550 480, 540 505',
  },
  {
    memberId: 'builder-10',
    x: 690,
    y: 480,
    parentVertical: 'Community & Events',
    clusterPathD: 'M 580 410 C 640 410, 660 450, 690 480',
  },
];

export function ChapterTopologyView({
  filteredMembers,
  allMembers = TEAM_DATA,
  activeVertical: filterVertical,
  activeSkill,
  searchQuery,
  onInspectMember,
}: ChapterTopologyViewProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('builder-01');
  const prefersReducedMotion = useReducedMotion();
  const rawSvgId = useId();
  const svgId = rawSvgId.replace(/:/g, '');

  const effectiveFiltered = useMemo(
    () => filteredMembers ?? allMembers,
    [filteredMembers, allMembers]
  );

  const filteredIdSet = useMemo(
    () => new Set(effectiveFiltered.map((m) => m.id)),
    [effectiveFiltered]
  );

  const hasActiveFilter = Boolean(
    (filterVertical && filterVertical !== 'All Builders') ||
      (activeSkill && activeSkill !== 'All Stacks') ||
      (searchQuery && searchQuery.trim().length > 0)
  );

  // Automatically jump to the first matching builder whenever filters exclude current selection
  useEffect(() => {
    if (
      effectiveFiltered.length > 0 &&
      !effectiveFiltered.some((m) => m.id === selectedMemberId)
    ) {
      setSelectedMemberId(effectiveFiltered[0].id);
    }
  }, [effectiveFiltered, selectedMemberId]);

  const selectedMember =
    allMembers.find((m) => m.id === selectedMemberId) ??
    effectiveFiltered[0] ??
    allMembers[0];
  const selectedAccent = getAccentVisual(selectedMember.googleColor);

  const selectedLeaf = BUILDER_LEAF_POSITIONS.find(
    (l) => l.memberId === selectedMember.id
  );
  const activeVertical = selectedLeaf?.parentVertical ?? selectedMember.vertical;

  const cycleList = effectiveFiltered.length > 0 ? effectiveFiltered : allMembers;

  const handlePrevMember = () => {
    const currentIndex = cycleList.findIndex((m) => m.id === selectedMember.id);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const prevIndex = (safeIndex - 1 + cycleList.length) % cycleList.length;
    setSelectedMemberId(cycleList[prevIndex].id);
  };

  const handleNextMember = () => {
    const currentIndex = cycleList.findIndex((m) => m.id === selectedMember.id);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + 1) % cycleList.length;
    setSelectedMemberId(cycleList[nextIndex].id);
  };

  return (
    <div className="w-full space-y-6">
      {/* Topology Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================= */}
        {/* LEFT PANEL: Interactive Architectural Circuit Canvas (col-8)  */}
        {/* ============================================================= */}
        <section
          aria-label="Chapter Circuit Topology Network"
          className="relative lg:col-span-8 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs overflow-hidden flex flex-col"
        >
          {/* Architectural Blueprint Grid Background */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-50 dark:opacity-30 pointer-events-none" />

          {/* Corner Crosshair Marks */}
          <div className="absolute top-2 left-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none">
            +
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--text-muted)] select-none pointer-events-none">
            +
          </div>

          {/* Panel Header Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)]/80 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
              <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tracking-wide">
                [ CHAPTER TOPOLOGY // VERTICAL ARCHITECTURE ]
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-secondary)]">
              {hasActiveFilter && (
                <span className="px-2 py-0.5 rounded-full bg-[#4285F4]/10 text-[var(--accent-blue-text)] border border-[#4285F4]/30 font-semibold">
                  {effectiveFiltered.length} matching
                </span>
              )}
              <span className="hidden sm:inline">CENTRAL CORE</span>
              <span className="text-[var(--text-muted)]">➔</span>
              <span className="font-semibold" style={{ color: selectedAccent.hex }}>
                {activeVertical}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* DESKTOP TOPOLOGY CIRCUIT (SVG + Interactive HTML Nodes)        */}
          {/* ------------------------------------------------------------- */}
          <div className="hidden md:block relative w-full aspect-[800/500] max-h-[520px] p-4 select-none">
            {/* Background SVG Vector Circuit Paths & Pulse Glows */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 560"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id={`circuit-glow-${svgId}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id={`core-ring-grad-${svgId}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4285F4" />
                  <stop offset="33%" stopColor="#EA4335" />
                  <stop offset="66%" stopColor="#FBBC04" />
                  <stop offset="100%" stopColor="#34A853" />
                </linearGradient>
              </defs>

              {/* 1. Hub to Vertical Cluster Circuit Paths */}
              {VERTICAL_CLUSTERS.map((cluster) => {
                const isActiveCluster = cluster.vertical === activeVertical;
                const pathId = `hub-path-${cluster.vertical.replace(/[^a-zA-Z]/g, '')}-${svgId}`;
                return (
                  <g key={cluster.vertical}>
                    {/* Inactive Base Path */}
                    <path
                      id={pathId}
                      d={cluster.hubPathD}
                      stroke={isActiveCluster ? cluster.hex : 'var(--border-strong)'}
                      strokeWidth={isActiveCluster ? 2.5 : 1.5}
                      strokeDasharray={isActiveCluster ? 'none' : '4 4'}
                      strokeOpacity={isActiveCluster ? 0.95 : 0.4}
                      fill="none"
                      filter={isActiveCluster ? `url(#circuit-glow-${svgId})` : undefined}
                    />

                    {/* Animated Travelling Signal Pulse on Active Cluster */}
                    {isActiveCluster && !prefersReducedMotion && (
                      <circle r="4" fill={cluster.hex}>
                        <animateMotion
                          dur="2.4s"
                          repeatCount="indefinite"
                          path={cluster.hubPathD}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* 2. Vertical Cluster to Builder Leaf Paths */}
              {BUILDER_LEAF_POSITIONS.map((leaf) => {
                const isSelectedBuilder = leaf.memberId === selectedMember.id;
                const isVerticalPeer =
                  leaf.parentVertical === activeVertical && !isSelectedBuilder;
                const isMatching = filteredIdSet.has(leaf.memberId);
                const parentCluster = VERTICAL_CLUSTERS.find(
                  (c) => c.vertical === leaf.parentVertical
                );
                const clusterHex = parentCluster?.hex ?? '#4285F4';
                const leafPathId = `leaf-path-${leaf.memberId}-${svgId}`;

                const strokeColor =
                  isSelectedBuilder || isVerticalPeer
                    ? clusterHex
                    : isMatching && hasActiveFilter
                    ? clusterHex
                    : 'var(--border-strong)';

                const strokeWidth = isSelectedBuilder
                  ? 2.5
                  : isVerticalPeer
                  ? 1.75
                  : isMatching && hasActiveFilter
                  ? 1.5
                  : 1.2;

                const strokeDasharray = isSelectedBuilder
                  ? 'none'
                  : isVerticalPeer
                  ? '6 3'
                  : '3 3';

                const strokeOpacity = isSelectedBuilder
                  ? 1
                  : isVerticalPeer
                  ? isMatching
                    ? 0.78
                    : 0.35
                  : hasActiveFilter
                  ? isMatching
                    ? 0.65
                    : 0.16
                  : 0.35;

                return (
                  <g key={leaf.memberId}>
                    {/* Circuit Trace */}
                    <path
                      id={leafPathId}
                      d={leaf.clusterPathD}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDasharray}
                      strokeOpacity={strokeOpacity}
                      fill="none"
                      filter={
                        isSelectedBuilder || (isVerticalPeer && isMatching)
                          ? `url(#circuit-glow-${svgId})`
                          : undefined
                      }
                    />

                    {/* Active Builder Signal Flow Pulse */}
                    {isSelectedBuilder && !prefersReducedMotion && (
                      <circle r="3.5" fill={clusterHex}>
                        <animateMotion
                          dur="1.8s"
                          repeatCount="indefinite"
                          path={leaf.clusterPathD}
                        />
                      </circle>
                    )}

                    {/* Circuit Pad Dot at Builder Target */}
                    <circle
                      cx={leaf.x}
                      cy={leaf.y}
                      r={isSelectedBuilder ? 5 : isVerticalPeer ? 4 : 3}
                      fill={
                        isSelectedBuilder || isVerticalPeer
                          ? clusterHex
                          : 'var(--border-strong)'
                      }
                      opacity={
                        isSelectedBuilder
                          ? 0.95
                          : isVerticalPeer
                          ? 0.75
                          : hasActiveFilter && !isMatching
                          ? 0.2
                          : 0.5
                      }
                    />
                  </g>
                );
              })}
            </svg>

            {/* 3. HTML Nodes Overlaid at Exact Canvas Percentage Coordinates */}

            {/* CENTER HUB NODE (400, 275) */}
            <div
              className="absolute z-20"
              style={{
                left: `${(400 / 800) * 100}%`,
                top: `${(275 / 560) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Outer Multi-colour Architectural Halo */}
                <div
                  className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#34A853] shadow-lg flex items-center justify-center animate-spin-slow"
                  style={{ animationDuration: '24s' }}
                >
                  <div className="w-full h-full rounded-full bg-[var(--bg-elevated)] flex items-center justify-center border border-[var(--border-hairline)]">
                    <span className="font-mono text-base font-bold text-[var(--text-primary)] tracking-tighter">
                      &lt; &gt;
                    </span>
                  </div>
                </div>

                {/* Hub Badge */}
                <div className="absolute -bottom-4 px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-xs whitespace-nowrap">
                  <span className="font-mono text-[9px] font-bold text-[var(--text-primary)] tracking-wider">
                    GDG RVCE CORE
                  </span>
                </div>
              </div>
            </div>

            {/* 5 VERTICAL CLUSTER NODES */}
            {VERTICAL_CLUSTERS.map((cluster) => {
              const isActive = cluster.vertical === activeVertical;
              const IconComp = cluster.icon;
              return (
                <div
                  key={cluster.vertical}
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: `${(cluster.pos.x / 800) * 100}%`,
                    top: `${(cluster.pos.y / 560) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--bg-elevated)] border transition-all duration-300 shadow-sm ${
                      isActive
                        ? 'scale-105 border-current ring-2 shadow-md'
                        : 'border-[var(--border-hairline)] opacity-85'
                    }`}
                    style={{
                      borderColor: isActive ? cluster.hex : undefined,
                      boxShadow: isActive ? `0 0 16px ${cluster.hex}40` : undefined,
                    }}
                  >
                    <IconComp
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: cluster.hex }}
                    />
                    <span
                      className="font-mono text-[10px] font-bold tracking-tight whitespace-nowrap"
                      style={{
                        color: isActive ? cluster.hex : 'var(--text-primary)',
                      }}
                    >
                      {cluster.shortLabel}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* 10 BUILDER LEAF NODES (Clickable Bauhaus Portraits) */}
            {BUILDER_LEAF_POSITIONS.map((leaf) => {
              const member = allMembers.find((m) => m.id === leaf.memberId);
              if (!member) return null;
              const isSelected = member.id === selectedMember.id;
              const isVerticalPeer =
                leaf.parentVertical === activeVertical && !isSelected;
              const isMatching = filteredIdSet.has(member.id);
              const isDimmed = hasActiveFilter && !isMatching;
              const memberAccent = getAccentVisual(member.googleColor);

              return (
                <div
                  key={member.id}
                  className="absolute z-30"
                  style={{
                    left: `${(leaf.x / 800) * 100}%`,
                    top: `${(leaf.y / 560) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedMemberId(member.id)}
                    aria-label={`Inspect ${member.name}, ${member.role}`}
                    aria-pressed={isSelected}
                    className={`group relative min-w-[48px] min-h-[48px] p-0.5 rounded-2xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] cursor-pointer ${
                      isSelected
                        ? 'scale-115 ring-2 ring-offset-2 ring-offset-[var(--bg-elevated)]'
                        : isDimmed
                        ? 'opacity-30 grayscale hover:opacity-65 hover:grayscale-0 hover:scale-105'
                        : isVerticalPeer
                        ? 'scale-105 ring-2 ring-offset-1 ring-offset-[var(--bg-elevated)]'
                        : hasActiveFilter && isMatching
                        ? 'ring-2 ring-offset-1 ring-offset-[var(--bg-elevated)] hover:scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      boxShadow: isSelected
                        ? `0 0 18px ${memberAccent.hex}65`
                        : isVerticalPeer && !isDimmed
                        ? `0 0 12px ${memberAccent.hex}40`
                        : hasActiveFilter && isMatching
                        ? `0 0 10px ${memberAccent.hex}35`
                        : undefined,
                    }}
                  >
                    {/* Active Halo Pulse Ring */}
                    {isSelected && (
                      <motion.div
                        layoutId="active-builder-ring"
                        className="absolute inset-0 rounded-2xl -m-1 pointer-events-none"
                        style={{ border: `2px solid ${memberAccent.hex}` }}
                        transition={{
                          type: 'spring',
                          stiffness: prefersReducedMotion ? 1000 : 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Subtle Co-Builder / Filter Match Indicator Ring */}
                    {!isSelected &&
                      ((isVerticalPeer && !isDimmed) ||
                        (hasActiveFilter && isMatching)) && (
                        <div
                          className="absolute inset-0 rounded-2xl -m-0.5 pointer-events-none"
                          style={{
                            border: `1.5px ${isVerticalPeer ? 'dashed' : 'solid'} ${
                              memberAccent.hex
                            }`,
                            opacity: 0.75,
                          }}
                        />
                      )}

                    {/* Circular Bauhaus Portrait Card */}
                    <div
                      className="w-12 h-12 rounded-xl bg-[var(--bg-subtle)] border overflow-hidden p-0.5"
                      style={{
                        borderColor: isSelected
                          ? memberAccent.hex
                          : isVerticalPeer && !isDimmed
                          ? `${memberAccent.hex}99`
                          : 'var(--border-hairline)',
                      }}
                    >
                      <Image
                        src={member.avatar}
                        alt={`${member.name} avatar`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Mini Emote Badge */}
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-0.5 shadow-xs flex items-center justify-center"
                      title={member.name}
                    >
                      <Image
                        src={member.emoteBadge}
                        alt="Emote badge"
                        width={16}
                        height={16}
                        className="w-3.5 h-3.5 object-contain"
                      />
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-md text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none z-40">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {member.name}
                      </span>
                      <span className="text-[var(--text-muted)]"> · </span>
                      <span style={{ color: memberAccent.hex }}>{member.vertical}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* MOBILE TOPOLOGY VIEW (Vertical Tree Rail for zero overflow)    */}
          {/* ------------------------------------------------------------- */}
          <div className="md:hidden p-4 space-y-4">
            {/* Center Core Banner for Mobile */}
            <div className="p-3 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#4285F4] to-[#EA4335] p-0.5 flex items-center justify-center text-white font-mono font-bold text-xs">
                  &lt; &gt;
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
                    GDG RVCE CENTRAL CORE
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)]">
                    5 Engineering Verticals
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-[var(--text-secondary)]">
                Active: {selectedMember.name.split(' ')[0]}
              </span>
            </div>

            {/* Vertical Groups */}
            <div className="space-y-4">
              {VERTICAL_CLUSTERS.map((cluster) => {
                const clusterMembers = allMembers.filter(
                  (m) => m.vertical === cluster.vertical
                );
                const isCurrentActiveVertical =
                  cluster.vertical === activeVertical;
                const IconComponent = cluster.icon;

                return (
                  <div
                    key={cluster.vertical}
                    className={`p-3 rounded-2xl border transition-colors ${
                      isCurrentActiveVertical
                        ? 'bg-[var(--bg-subtle)] border-current/50'
                        : 'bg-[var(--bg-elevated)] border-[var(--border-hairline)]'
                    }`}
                    style={{
                      borderColor: isCurrentActiveVertical
                        ? cluster.hex
                        : undefined,
                    }}
                  >
                    {/* Vertical Header */}
                    <div className="flex items-center gap-2 pb-2 mb-2 border-b border-[var(--border-hairline)]">
                      <IconComponent
                        className="w-4 h-4 shrink-0"
                        style={{ color: cluster.hex }}
                      />
                      <span
                        className="text-xs font-mono font-bold tracking-tight"
                        style={{ color: cluster.hex }}
                      >
                        {cluster.label}
                      </span>
                    </div>

                    {/* Builder Buttons in this Vertical */}
                    <div className="grid grid-cols-2 gap-2">
                      {clusterMembers.map((member) => {
                        const isSelected = member.id === selectedMember.id;
                        const isDimmed =
                          hasActiveFilter && !filteredIdSet.has(member.id);
                        const memberVisual = getAccentVisual(member.googleColor);
                        return (
                          <button
                            key={member.id}
                            type="button"
                            onClick={() => setSelectedMemberId(member.id)}
                            aria-label={`Select ${member.name}, ${member.role}`}
                            aria-pressed={isSelected}
                            className={`min-h-[52px] p-2 rounded-xl text-left flex items-center gap-2 border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                              isSelected
                                ? 'bg-[var(--bg-elevated)] border-current shadow-xs'
                                : isDimmed
                                ? 'bg-[var(--bg-subtle)] border-[var(--border-hairline)] opacity-35 grayscale'
                                : 'bg-[var(--bg-subtle)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                            }`}
                            style={{
                              borderColor: isSelected
                                ? memberVisual.hex
                                : undefined,
                            }}
                          >
                            <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-[var(--border-hairline)]">
                              <Image
                                src={member.avatar}
                                alt={member.name}
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded bg-[var(--bg-elevated)] p-0.5 border border-[var(--border-strong)]">
                                <Image
                                  src={member.emoteBadge}
                                  alt="Emote"
                                  width={12}
                                  height={12}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-[var(--text-primary)] truncate">
                                {member.name}
                              </div>
                              <div className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                                {member.role.split('·')[0].trim()}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* RIGHT PANEL: Live Builder Spec Inspector Card (col-4)         */}
        {/* ============================================================= */}
        <aside
          aria-label="Live Builder Spec Inspector"
          className="relative lg:col-span-4 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs overflow-hidden flex flex-col justify-between"
        >
          {/* Top Google Colored Indicator Bar */}
          <div
            className="h-1 w-full transition-colors duration-300"
            style={{ backgroundColor: selectedAccent.hex }}
          />

          <div className="p-5 sm:p-6 space-y-5">
            {/* Inspector Header with Top-Level Prev / Next Builder Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--text-primary)]">
                <Sparkles className="w-4 h-4 shrink-0" style={{ color: selectedAccent.hex }} />
                <span>BUILDER SPEC</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-[var(--text-muted)] mr-1">
                  {selectedMember.id.replace('builder-', 'DEV // ')}
                </span>
                <button
                  type="button"
                  onClick={handlePrevMember}
                  aria-label="Previous builder"
                  className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[11px] font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#4285F4] transition-all flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextMember}
                  aria-label="Next builder"
                  className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[11px] font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#4285F4] transition-all flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>

            {/* Animated Profile & Spec Container (No blank-frame mode="wait" gap) */}
            <motion.div
              key={selectedMember.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0.4, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-4"
            >
                {/* Avatar & Vertical Identity */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div
                      className="w-20 h-20 rounded-2xl p-1 bg-[var(--bg-subtle)] border ring-2 overflow-hidden transition-all duration-300"
                      style={{
                        borderColor: selectedAccent.hex,
                        boxShadow: `0 0 14px ${selectedAccent.hex}30`,
                      }}
                    >
                      <Image
                        src={selectedMember.avatar}
                        alt={`${selectedMember.name} Bauhaus portrait`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Emote Badge */}
                    <div
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-1 shadow-md flex items-center justify-center"
                      title={selectedMember.name}
                    >
                      <Image
                        src={selectedMember.emoteBadge}
                        alt="Emote badge"
                        width={24}
                        height={24}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <span
                      className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${selectedAccent.badgeClass}`}
                    >
                      {selectedMember.vertical}
                    </span>
                    <h3 className="text-xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                      {selectedMember.role}
                    </p>
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">
                      {selectedMember.yearAndBranch}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {selectedMember.bio}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedMember.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Structured Spec Attributes */}
                <div className="space-y-2 pt-2 border-t border-[var(--border-hairline)]">
                  {/* Current Focus */}
                  <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] space-y-0.5">
                    <div className="text-[9px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Current Focus
                    </div>
                    <div className="text-xs font-medium text-[var(--text-primary)] leading-snug">
                      {selectedMember.builderSpec.focusArea}
                    </div>
                  </div>

                  {/* Favorite Stack */}
                  <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] space-y-0.5">
                    <div className="text-[9px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Favorite Stack
                    </div>
                    <div className="text-xs font-mono text-[var(--text-secondary)] leading-snug">
                      {selectedMember.builderSpec.favoriteStack}
                    </div>
                  </div>

                  {/* Open Source */}
                  <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)]/80 border border-[var(--border-hairline)] space-y-0.5">
                    <div className="text-[9px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Open Source
                    </div>
                    <div className="text-xs font-mono text-[var(--text-secondary)] truncate">
                      {selectedMember.builderSpec.openSourceContrib}
                    </div>
                  </div>

                  {/* Build Motto */}
                  <div className="p-2.5 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                    <div className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                      Build Motto
                    </div>
                    <div className="text-xs italic text-[var(--text-primary)] leading-snug">
                      &ldquo;{selectedMember.builderSpec.buildMotto}&rdquo;
                    </div>
                  </div>
                </div>

                {/* Animated Engineering Competency Allocation Bars */}
                <div className="space-y-2.5 pt-2 border-t border-[var(--border-hairline)]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase font-semibold">
                    <span>Domain Focus Allocation</span>
                    <span>Craft Index</span>
                  </div>

                  {selectedMember.competencies.map((comp) => (
                    <div key={comp.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[var(--text-secondary)] truncate">
                          {comp.label}
                        </span>
                        <span
                          className="font-bold shrink-0 ml-2"
                          style={{
                            color:
                              selectedMember.googleColor === 'yellow'
                                ? 'var(--accent-yellow-text)'
                                : selectedMember.googleColor === 'red'
                                ? 'var(--accent-red-text)'
                                : selectedMember.googleColor === 'green'
                                ? 'var(--accent-green-text)'
                                : 'var(--accent-blue-text)',
                          }}
                        >
                          {comp.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? { scaleX: comp.level / 100 }
                              : { scaleX: 0 }
                          }
                          animate={{ scaleX: comp.level / 100 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="h-full rounded-full"
                          style={{
                            transformOrigin: 'left',
                            backgroundColor: selectedAccent.hex,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Profile Social Links */}
                <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    VERIFIED SAMPLE PROFILE
                  </span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={selectedMember.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${selectedMember.name} sample GitHub`}
                      className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)] hover:text-[#4285F4] hover:border-[#4285F4] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={selectedMember.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${selectedMember.name} sample LinkedIn`}
                      className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)] hover:text-[#4285F4] hover:border-[#4285F4] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    {selectedMember.links.website && (
                      <a
                        href={selectedMember.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${selectedMember.name} sample portfolio`}
                        className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)] hover:text-[#4285F4] hover:border-[#4285F4] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
          </div>

          {/* Expand Full Spec Drawer Footer */}
          {onInspectMember && (
            <div className="p-4 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)] flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                {cycleList.length} {cycleList.length === 1 ? 'builder' : 'builders'} in scope
              </span>
              <button
                type="button"
                onClick={() => onInspectMember(selectedMember)}
                aria-label={`Inspect full spec drawer for ${selectedMember.name}`}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-mono font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" />
                <span>Expand Full Spec →</span>
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
