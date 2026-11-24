'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { TEAM_DATA, GDGTeamMember, TeamVertical } from '@/data/gdgData';
import { TeamHeroHeader } from './TeamHeroHeader';
import { VerticalCollaborationMatrix } from './VerticalCollaborationMatrix';
import {
  TeamFilterBar,
  TeamFilterOption,
  TeamViewMode,
  DataSourceMode,
} from './TeamFilterBar';
import { TeamMemberCard } from './TeamMemberCard';
import { ChapterTopologyView } from './ChapterTopologyView';
import { TeamCultureStrip } from './TeamCultureStrip';
import { BuilderWorkflowStrip } from './BuilderWorkflowStrip';
import { useApiInspector } from '@/context/ApiInspectorContext';

export function TeamDirectoryClient() {
  const [viewMode, setViewMode] = useState<TeamViewMode>('grid');
  const [selectedVertical, setSelectedVertical] = useState<TeamFilterOption>('All Builders');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [inspectAll, setInspectAll] = useState<boolean>(false);
  const [flippedOverrides, setFlippedOverrides] = useState<Record<string, boolean>>({});

  // Phase 19: Live /api/team Query Mode & Latency Telemetry
  const [dataSourceMode, setDataSourceMode] = useState<DataSourceMode>('static');
  const [liveBuilders, setLiveBuilders] = useState<GDGTeamMember[]>(TEAM_DATA);
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);
  const [liveTelemetry, setLiveTelemetry] = useState<{
    endpoint: string;
    status: number;
    latencyMs: number;
  } | null>(null);

  const { openWithPreset } = useApiInspector();
  const prefersReducedMotion = useReducedMotion();

  // Debounce search query by 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Static edge filtering calculation
  const filteredStaticMembers = useMemo(() => {
    let result = [...TEAM_DATA];

    // Vertical department filter
    if (selectedVertical !== 'All Builders') {
      result = result.filter((member) => member.vertical === selectedVertical);
    }

    // Quick-select skill or stack chip filter
    if (selectedSkill && selectedSkill !== 'All Stacks') {
      const s = selectedSkill.trim().toLowerCase();
      result = result.filter((m) => {
        const skillsMatch = m.skills?.some((sk) => {
          const skLower = sk.toLowerCase();
          return skLower === s || skLower.includes(s) || s.includes(skLower);
        });
        const stackMatch = m.builderSpec?.favoriteStack?.toLowerCase().includes(s);
        const focusMatch = m.builderSpec?.focusArea?.toLowerCase().includes(s);
        const roleMatch = m.role?.toLowerCase().includes(s);
        const osMatch = m.builderSpec?.openSourceContrib?.toLowerCase().includes(s);

        const isDesignSystemsQuery = s.includes('design') || s.includes('tokens');
        const designMatch =
          isDesignSystemsQuery &&
          (m.vertical === 'Design & UX' ||
            m.skills?.some(
              (sk) => sk.toLowerCase().includes('design') || sk.toLowerCase().includes('tokens')
            ));

        return Boolean(skillsMatch || stackMatch || focusMatch || roleMatch || osMatch || designMatch);
      });
    }

    // Real-time search query filter (name, role, bio, skills, or stack)
    if (debouncedSearchQuery.trim()) {
      const q = debouncedSearchQuery.trim().toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.bio.toLowerCase().includes(q) ||
          m.skills?.some((sk) => sk.toLowerCase().includes(q)) ||
          m.builderSpec?.focusArea?.toLowerCase().includes(q) ||
          m.builderSpec?.favoriteStack?.toLowerCase().includes(q) ||
          m.builderSpec?.openSourceContrib?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedVertical, selectedSkill, debouncedSearchQuery]);

  // Execute real backend query against /api/team when in Live API mode
  useEffect(() => {
    if (dataSourceMode !== 'live') return;

    let isCurrent = true;
    setIsFetchingLive(true);

    const params = new URLSearchParams();
    if (selectedVertical !== 'All Builders') {
      params.set('vertical', selectedVertical);
    }
    if (selectedSkill && selectedSkill !== 'All Stacks') {
      params.set('skill', selectedSkill);
    }
    if (debouncedSearchQuery.trim()) {
      params.set('q', debouncedSearchQuery.trim());
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/api/team?${queryString}` : '/api/team';

    const startTime = performance.now();

    fetch(endpoint)
      .then(async (res) => {
        const json = await res.json();
        return { ok: res.ok, status: res.status, json };
      })
      .then(({ ok, status, json }) => {
        if (!isCurrent) return;
        const elapsed = Number((performance.now() - startTime).toFixed(1));
        const latencyMs =
          typeof json.meta?.executionMs === 'number' ? json.meta.executionMs : elapsed;

        setLiveTelemetry({
          endpoint,
          status,
          latencyMs,
        });

        if (ok && Array.isArray(json.data?.builders)) {
          setLiveBuilders(json.data.builders);
        } else {
          setLiveBuilders(filteredStaticMembers);
        }
      })
      .catch(() => {
        if (!isCurrent) return;
        const elapsed = Number((performance.now() - startTime).toFixed(1));
        setLiveTelemetry({
          endpoint,
          status: 500,
          latencyMs: elapsed,
        });
        setLiveBuilders(filteredStaticMembers);
      })
      .finally(() => {
        if (isCurrent) {
          setIsFetchingLive(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [
    dataSourceMode,
    selectedVertical,
    selectedSkill,
    debouncedSearchQuery,
    filteredStaticMembers,
  ]);

  // Which builders to display
  const displayedMembers = dataSourceMode === 'live' ? liveBuilders : filteredStaticMembers;

  const hasActiveFilters =
    selectedVertical !== 'All Builders' ||
    (Boolean(selectedSkill) && selectedSkill !== 'All Stacks') ||
    searchQuery.trim().length > 0;

  // Global flip/inspect toggle
  const handleToggleInspectAll = () => {
    const nextInspectAll = !inspectAll;
    setInspectAll(nextInspectAll);
    const newOverrides: Record<string, boolean> = {};
    TEAM_DATA.forEach((member) => {
      newOverrides[member.id] = nextInspectAll;
    });
    setFlippedOverrides(newOverrides);
  };

  // Individual card flip toggle
  const handleToggleCardFlip = (memberId: string) => {
    setFlippedOverrides((prev) => {
      const current = prev[memberId] ?? inspectAll;
      return {
        ...prev,
        [memberId]: !current,
      };
    });
  };

  // Reset all search and filter criteria
  const handleResetFilters = () => {
    setSelectedVertical('All Builders');
    setSelectedSkill('');
    setSearchQuery('');
  };

  // Open active query in API Inspector modal
  const handleInspectQuery = (endpoint: string) => {
    openWithPreset({
      method: 'GET',
      endpoint,
    });
  };

  // Handle vertical selection from Collaboration Matrix
  const handleSelectVerticalFromMatrix = (vertical: TeamVertical) => {
    setSelectedVertical(vertical);
  };

  return (
    <div className="w-full">
      {/* 1. Hero Header */}
      <TeamHeroHeader />

      {/* 2. Interactive Cross-Vertical Collaboration Matrix */}
      <VerticalCollaborationMatrix onSelectVertical={handleSelectVerticalFromMatrix} />

      {/* 3. Interactive Filter Bar with Segmented View Switcher & Live API Mode */}
      <TeamFilterBar
        selectedVertical={selectedVertical}
        onSelectVertical={setSelectedVertical}
        selectedSkill={selectedSkill}
        onSelectSkill={setSelectedSkill}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inspectAll={inspectAll}
        onToggleInspectAll={handleToggleInspectAll}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        dataSourceMode={dataSourceMode}
        onDataSourceModeChange={setDataSourceMode}
        liveTelemetry={liveTelemetry}
        isFetchingLive={isFetchingLive}
        onInspectQuery={handleInspectQuery}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 4. Toggleable Main View: Roster Grid | Chapter Topology */}
      <div id="team-directory-grid" className="w-full">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            /* ========================================================= */
            /* VIEW A: Roster Grid Mode                                 */
            /* ========================================================= */
            <motion.div
              key="roster-grid-view"
              role="region"
              aria-label="Student Builder Profiles"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full"
            >
              {/* Shimmer Loading Skeleton while Live API Query is In-Flight */}
              {dataSourceMode === 'live' && isFetchingLive ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse"
                  aria-hidden="true"
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-6 min-h-[530px] flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
                        <div className="w-20 h-4 rounded bg-[var(--bg-subtle)]" />
                        <div className="w-16 h-7 rounded-lg bg-[var(--bg-subtle)]" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-24 h-24 rounded-2xl bg-[var(--bg-subtle)] shrink-0" />
                          <div className="w-20 h-5 rounded bg-[var(--bg-subtle)]" />
                        </div>
                        <div className="w-3/4 h-6 rounded bg-[var(--bg-subtle)]" />
                        <div className="w-1/2 h-4 rounded bg-[var(--bg-subtle)]" />
                        <div className="w-full h-12 rounded bg-[var(--bg-subtle)]" />
                      </div>
                      <div className="flex gap-2">
                        <div className="w-14 h-5 rounded bg-[var(--bg-subtle)]" />
                        <div className="w-16 h-5 rounded bg-[var(--bg-subtle)]" />
                        <div className="w-14 h-5 rounded bg-[var(--bg-subtle)]" />
                      </div>
                      <div className="pt-4 border-t border-[var(--border-hairline)] flex justify-between">
                        <div className="w-16 h-3 rounded bg-[var(--bg-subtle)]" />
                        <div className="w-20 h-8 rounded bg-[var(--bg-subtle)]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedMembers.length === 0 ? (
                /* Empty State Card with Terminal Wizard Emote */
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                  className="w-full rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-xs"
                >
                  <div className="w-20 h-20 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] flex items-center justify-center p-3 shadow-inner">
                    <Image
                      src="/assets/emotes/terminal-wizard.svg"
                      alt="Terminal Wizard emote"
                      width={56}
                      height={56}
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)]">
                      No matching builder profiles
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      No fictional builders match the active filter combination. Try clearing your search query, selecting another stack, or resetting filters.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs sm:text-sm font-mono font-medium transition-all shadow-xs flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </motion.div>
              ) : (
                /* Builder Cards Grid */
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {displayedMembers.map((member, index) => {
                      const isFlipped = flippedOverrides[member.id] ?? inspectAll;
                      return (
                        <TeamMemberCard
                          key={member.id}
                          member={member}
                          isFlipped={isFlipped}
                          onToggleFlip={() => handleToggleCardFlip(member.id)}
                          index={index}
                          onSelectSkill={(skill) => setSelectedSkill(skill)}
                        />
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* ========================================================= */
            /* VIEW B: Chapter Circuit Topology View                    */
            /* ========================================================= */
            <motion.div
              key="chapter-topology-view"
              role="region"
              aria-label="Chapter Circuit Topology Network"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full"
            >
              <ChapterTopologyView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Emote Sticker Showcase Strip: Developer Culture Ethos */}
      <TeamCultureStrip />

      {/* 6. Architectural Builder Workflow Strip */}
      <BuilderWorkflowStrip />
    </div>
  );
}
