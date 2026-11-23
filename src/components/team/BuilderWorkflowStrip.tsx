'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileCode2, Terminal, Rocket } from 'lucide-react';

interface StageDef {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
  accentHex: string;
}

const STAGES: StageDef[] = [
  {
    number: '01',
    title: 'Ideate & RFC',
    tagline: 'System Architecture & Peer Review',
    description:
      'Student builders author Request for Comments (RFCs), debate API contracts, map data pipelines, and conduct cross-domain feasibility audits.',
    deliverables: ['System RFC Specs', 'Threat & Latency Modeling', 'API Prototypes'],
    icon: FileCode2,
    accentHex: '#4285F4',
  },
  {
    number: '02',
    title: 'Sprint & Pair-Build',
    tagline: 'Zero-Slide Live Terminal Execution',
    description:
      'Engineers collaborate in physical campus labs, running time-boxed build sprints, pair-debugging concurrency bugs, and benchmarking edge models.',
    deliverables: ['Live Terminal Coding', 'Dockerized Services', 'Continuous Review Gates'],
    icon: Terminal,
    accentHex: '#EA4335',
  },
  {
    number: '03',
    title: 'Ship Open Source',
    tagline: 'Automated CI & Production Deployments',
    description:
      'Artifacts are published under permissive MIT licenses with automated GitHub Actions testing, Cloud Run canary rollouts, and thorough documentation.',
    deliverables: ['MIT Repositories', 'Cloud Run Ingestion', 'Student Developer Docs'],
    icon: Rocket,
    accentHex: '#34A853',
  },
];

export function BuilderWorkflowStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Student Builder Workflow"
      className="relative w-full rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs overflow-hidden mt-12 sm:mt-16 p-6 sm:p-10 lg:p-12"
    >
      {/* 4-Colour Google Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4285F4] rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#EA4335] rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FBBC04] rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#34A853] rounded-br-2xl pointer-events-none" />

      {/* Blueprint Dot Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-50 dark:opacity-30 pointer-events-none" />

      <div className="relative space-y-8 lg:space-y-10">
        {/* Section Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-hairline)]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              <span className="font-semibold text-[#4285F4] dark:text-[#60A5FA]">
                [ 04 // OPEN BUILD WORKFLOW ]
              </span>
              <span className="text-[var(--text-muted)]">·</span>
              <span>ENGINEERING CADENCE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              How the Student Engineering Collective Ships.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              From open-source RFC proposals to verified production deployments—fostering deep technical
              rigor across Google Cloud, Gemini, and modern web architectures.
            </p>
          </div>

          {/* CTA Link Button back to /events */}
          <div className="shrink-0">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[#4285F4] text-[var(--text-primary)] hover:text-white border border-[var(--border-strong)] hover:border-[#4285F4] text-xs sm:text-sm font-mono font-medium transition-all shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
            >
              <span>Explore Upcoming Sprints</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Stages Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.number}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col justify-between rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Top stage header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-md"
                      style={{
                        color: stage.accentHex,
                        backgroundColor: `${stage.accentHex}15`,
                        border: `1px solid ${stage.accentHex}30`,
                      }}
                    >
                      STAGE // {stage.number}
                    </span>

                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--border-hairline)] transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${stage.accentHex}10`,
                        color: stage.accentHex,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                      {stage.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Deliverables Pills */}
                <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] space-y-2">
                  <div className="text-[10px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Core Artifacts
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
