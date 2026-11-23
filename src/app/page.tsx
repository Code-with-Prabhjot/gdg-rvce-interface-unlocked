import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CampusTelemetryBar } from '@/components/home/CampusTelemetryBar';
import { BentoPillarsSection } from '@/components/home/BentoPillarsSection';
import { FeaturedEventsSection } from '@/components/home/FeaturedEventsSection';
import { CommunityScenesSection } from '@/components/home/CommunityScenesSection';
import { RecapAndCommunitySection } from '@/components/home/RecapAndCommunitySection';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
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
      {/* ACT IV: Curated Upcoming Sprints & Workshops Showcase         */}
      {/* ============================================================= */}
      <FeaturedEventsSection />

      {/* ============================================================= */}
      {/* ACT V: In the Build Room (Community Scenes & Lightbox)        */}
      {/* ============================================================= */}
      <CommunityScenesSection />

      {/* ============================================================= */}
      {/* ACT VI: Interactive Event Recap Spotlight & Community Portal  */}
      {/* ============================================================= */}
      <RecapAndCommunitySection />
    </div>
  );
}
