import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CampusTelemetryBar } from '@/components/home/CampusTelemetryBar';
import { BentoPillarsSection } from '@/components/home/BentoPillarsSection';
import { LearningTracksExplorer } from '@/components/home/LearningTracksExplorer';
import { FeaturedEventsSection } from '@/components/home/FeaturedEventsSection';
import { CommunityScenesSection } from '@/components/home/CommunityScenesSection';
import { RecapAndCommunitySection } from '@/components/home/RecapAndCommunitySection';
import { SectionScrollSpyRail } from '@/components/home/SectionScrollSpyRail';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col relative">
      {/* ============================================================= */}
      {/* ACT I: Kinetic Split Hero & Interactive 3D Prism Stage        */}
      {/* ============================================================= */}
      <HeroSection />

      {/* ============================================================= */}
      {/* ACT II: Architectural Campus Telemetry & Tech Marquee Bar     */}
      {/* ============================================================= */}
      <CampusTelemetryBar />

      {/* ============================================================= */}
      {/* ACT III: Interactive 4-Pillar Architectural Bento Grid        */}
      {/* ============================================================= */}
      <BentoPillarsSection />

      {/* ============================================================= */}
      {/* ACT IV: 4-Vertical Developer Learning Tracks Explorer          */}
      {/* ============================================================= */}
      <LearningTracksExplorer />

      {/* ============================================================= */}
      {/* ACT V: Curated Upcoming Sprints & Workshops Showcase           */}
      {/* ============================================================= */}
      <FeaturedEventsSection />

      {/* ============================================================= */}
      {/* ACT VI: In the Build Room (Community Scenes & Lightbox)        */}
      {/* ============================================================= */}
      <CommunityScenesSection />

      {/* ============================================================= */}
      {/* ACT VII: Interactive Event Recap Spotlight & Community Portal */}
      {/* ============================================================= */}
      <RecapAndCommunitySection />

      {/* ============================================================= */}
      {/* ULTRA-WIDE DESKTOP SCROLL-SPY TELEMETRY RAIL (2XL+ ONLY)      */}
      {/* ============================================================= */}
      <SectionScrollSpyRail />
    </div>
  );
}
