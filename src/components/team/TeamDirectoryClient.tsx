'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_DATA } from '@/data/gdgData';
import { TeamHeroHeader } from './TeamHeroHeader';
import { TeamFilterBar, TeamFilterOption } from './TeamFilterBar';
import { TeamMemberCard } from './TeamMemberCard';
import { BuilderWorkflowStrip } from './BuilderWorkflowStrip';

export function TeamDirectoryClient() {
  const [selectedVertical, setSelectedVertical] = useState<TeamFilterOption>('All Builders');
  const [inspectAll, setInspectAll] = useState<boolean>(false);
  const [flippedOverrides, setFlippedOverrides] = useState<Record<string, boolean>>({});

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

      {/* 2. Interactive Filter Bar */}
      <TeamFilterBar
        selectedVertical={selectedVertical}
        onSelectVertical={setSelectedVertical}
        inspectAll={inspectAll}
        onToggleInspectAll={handleToggleInspectAll}
      />

      {/* 3. Team Member Cards Grid */}
      <div
        role="region"
        aria-label="Student Builder Profiles"
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
      </div>

      {/* 4. Architectural Builder Workflow Strip */}
      <BuilderWorkflowStrip />
    </div>
  );
}
