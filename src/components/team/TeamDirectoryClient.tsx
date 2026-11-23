'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { TEAM_DATA } from '@/data/gdgData';
import { TeamHeroHeader } from './TeamHeroHeader';
import {
  TeamFilterBar,
  TeamFilterOption,
  TeamViewMode,
} from './TeamFilterBar';
import { TeamMemberCard } from './TeamMemberCard';
import { ChapterTopologyView } from './ChapterTopologyView';
import { TeamCultureStrip } from './TeamCultureStrip';
import { BuilderWorkflowStrip } from './BuilderWorkflowStrip';

export function TeamDirectoryClient() {
  const [viewMode, setViewMode] = useState<TeamViewMode>('grid');
  const [selectedVertical, setSelectedVertical] = useState<TeamFilterOption>('All Builders');
  const [inspectAll, setInspectAll] = useState<boolean>(false);
  const [flippedOverrides, setFlippedOverrides] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();

  // Filter members based on selected department tab
  const filteredMembers = useMemo(() => {
    if (selectedVertical === 'All Builders') {
      return TEAM_DATA;
    }
    return TEAM_DATA.filter((member) => member.vertical === selectedVertical);
  }, [selectedVertical]);

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

  return (
    <div className="w-full">
      {/* 1. Hero Header */}
      <TeamHeroHeader />

      {/* 2. Interactive Filter Bar with Segmented View Switcher */}
      <TeamFilterBar
        selectedVertical={selectedVertical}
        onSelectVertical={setSelectedVertical}
        inspectAll={inspectAll}
        onToggleInspectAll={handleToggleInspectAll}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* 3. Toggleable Main View: Roster Grid | Chapter Topology */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            /* ========================================================= */
            /* VIEW A: Roster Grid Mode                                 */
            /* ========================================================= */
            <motion.div
              key="roster-grid-view"
              role="region"
              aria-label="Student Builder Profiles"
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full"
            >
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredMembers.map((member, index) => {
                    const isFlipped = flippedOverrides[member.id] ?? inspectAll;
                    return (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        isFlipped={isFlipped}
                        onToggleFlip={() => handleToggleCardFlip(member.id)}
                        index={index}
                      />
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            /* ========================================================= */
            /* VIEW B: Chapter Circuit Topology View                    */
            /* ========================================================= */
            <motion.div
              key="chapter-topology-view"
              role="region"
              aria-label="Chapter Circuit Topology Network"
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }
              }
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

      {/* 4. Emote Sticker Showcase Strip: Developer Culture Ethos */}
      <TeamCultureStrip />

      {/* 5. Architectural Builder Workflow Strip */}
      <BuilderWorkflowStrip />
    </div>
  );
}
