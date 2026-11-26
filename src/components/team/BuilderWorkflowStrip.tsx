'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  FileCode2,
  Terminal,
  Rocket,
  CheckCircle2,
  Code2,
  ListChecks,
} from 'lucide-react';
import { MagneticWrapper } from '@/components/ui/MagneticWrapper';

interface StageDef {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
  accentHex: string;
  badgeLabel: string;
  artifactFileName: string;
  artifactSnippet: string;
  checklist: { text: string; done: boolean; reviewer: string }[];
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
    badgeLabel: 'STAGE // 01 · RFC SPECIFICATION',
    artifactFileName: 'RFC-0042-gemini-streaming-mesh.md',
    artifactSnippet: `# RFC-0042: Low-Latency Multimodal Gemini Streaming Mesh
Status: APPROVED · Author: @gdg-rvce/core · Target: Cloud Run Edge
p95 Latency SLA: < 220ms · Memory Footprint: Distroless < 48MB
Contract: POST /api/agent/stream -> SSE Chunk Stream
Auth: Zero-Trust IAM Service Account Tokens`,
    checklist: [
      { text: 'API contract schema typed and backward-compatible', done: true, reviewer: 'Web & Cloud' },
      { text: 'Threat & security review passed (Zero-trust token handling)', done: true, reviewer: 'Core Lead' },
      { text: 'Round-trip latency budget validated < 250ms p95', done: true, reviewer: 'AI & ML' },
      { text: 'WCAG AAA token compatibility checked (>7:1 contrast)', done: true, reviewer: 'Design & UX' },
    ],
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
    badgeLabel: 'STAGE // 02 · TERMINAL EXECUTION',
    artifactFileName: 'Dockerfile.distroless',
    artifactSnippet: `# GDG RVCE Distroless Multi-Stage Build
FROM node:20-alpine AS builder
WORKDIR /app && COPY package*.json ./ && npm ci
COPY . . && npm run build:standalone

FROM gcr.io/distroless/nodejs20-debian12:nonroot
USER nonroot:nonroot
COPY --from=builder /app/.next/standalone /server
EXPOSE 3000
CMD ["/server/server.js"]`,
    checklist: [
      { text: 'Turbopack production build succeeds with zero compiler warnings', done: true, reviewer: 'Web & Cloud' },
      { text: 'Concurrency deadlock tests pass under 1,000 synthetic sockets', done: true, reviewer: 'Core Lead' },
      { text: 'Hardware-accelerated SVG shaders verified at 60fps', done: true, reviewer: 'Design & UX' },
      { text: 'Pair-programming checklist signed by mentor lead', done: true, reviewer: 'Community' },
    ],
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
    badgeLabel: 'STAGE // 03 · PRODUCTION SHIP',
    artifactFileName: '.github/workflows/deploy-canary.yml',
    artifactSnippet: `name: Production Canary Rollout
on:
  push:
    branches: [main]
jobs:
  canary-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate Strict License Compliance (MIT)
        run: npx license-checker --onlyAllow="MIT;Apache-2.0;ISC"
      - name: Canary Deploy to Google Cloud Run
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: gdg-rvce-core
          image: gcr.io/gdg-rvce/core:v1.0.0
          traffic: 10%`,
    checklist: [
      { text: '100% test pass rate across unit, integration, and a11y suites', done: true, reviewer: 'Web & Cloud' },
      { text: 'Permissive MIT open-source license and contributor handbook indexed', done: true, reviewer: 'Community' },
      { text: 'Google Cloud Run canary health probes responding 200 OK', done: true, reviewer: 'Core Lead' },
      { text: 'Public API documentation verified with live cURL examples', done: true, reviewer: 'AI & ML' },
    ],
  },
];

export function BuilderWorkflowStrip() {
  const [activeStageId, setActiveStageId] = useState<string>('01');
  const prefersReducedMotion = useReducedMotion();

  const activeStage = STAGES.find((s) => s.number === activeStageId) || STAGES[0];

  return (
    <section
      aria-label="Student Builder Workflow"
      className="relative w-full rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs overflow-hidden mt-10 p-5 sm:p-6 lg:p-7"
    >
      {/* 4-Colour Google Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4285F4] rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#EA4335] rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FBBC04] rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#34A853] rounded-br-2xl pointer-events-none" />

      {/* Blueprint Dot Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-50 dark:opacity-30 pointer-events-none" />

      <div className="relative space-y-5">
        {/* Section Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--border-hairline)]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              <span className="font-semibold text-[var(--accent-blue-text)]">
                [ 04 // OPEN BUILD WORKFLOW ]
              </span>
              <span className="text-[var(--text-muted)]">·</span>
              <span>ENGINEERING CADENCE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              How the Student Engineering Collective Ships.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              From open-source RFC proposals to verified production deployments. Click any stage to inspect its artifact and review checklist below.
            </p>
          </div>

          {/* CTA Link Button back to /events */}
          <div className="shrink-0">
            <MagneticWrapper maxOffset={6}>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[#1D4ED8] text-[var(--text-primary)] hover:text-white border border-[var(--border-strong)] hover:border-[#1D4ED8] text-xs sm:text-sm font-mono font-medium transition-all shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              >
                <span>Explore Upcoming Sprints</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        {/* Compact Interactive Stage Selector + Readout Panel (<= 480px total) */}
        <div className="space-y-3.5">
          {/* 3 Compact Clickable Stage Cards */}
          <div
            role="tablist"
            aria-label="Workflow engineering stages"
            className="grid grid-cols-1 md:grid-cols-3 gap-3.5"
          >
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStageId === stage.number;
              const stageTextColor =
                stage.accentHex === '#4285F4'
                  ? 'var(--accent-blue-text)'
                  : stage.accentHex === '#EA4335'
                  ? 'var(--accent-red-text)'
                  : 'var(--accent-green-text)';

              return (
                <motion.button
                  key={stage.number}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`stage-inspector-${stage.number}`}
                  onClick={() => setActiveStageId(stage.number)}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    delay: prefersReducedMotion ? 0 : idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative text-left flex flex-col justify-between rounded-xl bg-[var(--bg-elevated)] p-3.5 sm:p-4 shadow-xs transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                    isSelected
                      ? 'border-2 shadow-md'
                      : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)] hover:shadow-sm'
                  }`}
                  style={{
                    borderColor: isSelected ? stage.accentHex : undefined,
                  }}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-stage-top-glow"
                      className="absolute top-0 inset-x-0 h-1 rounded-t-xl"
                      style={{ backgroundColor: stage.accentHex }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded"
                      style={{
                        color: stageTextColor,
                        backgroundColor: `${stage.accentHex}15`,
                        border: `1px solid ${stage.accentHex}30`,
                      }}
                    >
                      {stage.number}. {stage.title}
                    </span>

                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border-hairline)] shrink-0"
                      style={{
                        backgroundColor: `${stage.accentHex}10`,
                        color: stageTextColor,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-snug mb-2">
                    {stage.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[var(--text-muted)] truncate">{stage.tagline}</span>
                    <span className="font-semibold shrink-0 ml-2" style={{ color: stageTextColor }}>
                      {isSelected ? 'Active ▾' : 'Inspect →'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic Bottom Telemetry Inspector Readout */}
          <div
            id={`stage-inspector-${activeStage.number}`}
            role="region"
            aria-label={`Detailed stage telemetry for Stage ${activeStage.number}: ${activeStage.title}`}
            className="rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-4 sm:p-5 space-y-3.5"
          >
            {/* Header of Inspector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: activeStage.accentHex }}
                />
                <span
                  className="text-xs font-mono font-bold tracking-wider"
                  style={{
                    color:
                      activeStage.accentHex === '#4285F4'
                        ? 'var(--accent-blue-text)'
                        : activeStage.accentHex === '#EA4335'
                        ? 'var(--accent-red-text)'
                        : 'var(--accent-green-text)',
                  }}
                >
                  [ {activeStage.badgeLabel} ]
                </span>
                <span className="hidden sm:inline text-xs font-display font-bold text-[var(--text-primary)]">
                  · {activeStage.title} Verification Gate
                </span>
              </div>

              <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded border border-[var(--border-hairline)] self-start sm:self-auto">
                Stage {activeStage.number} of 03
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.number}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4"
              >
                {/* Left Column: Sample Repository Artifact (Code Preview) */}
                <div className="lg:col-span-6 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <Code2 className="w-3.5 h-3.5 text-[var(--accent-blue-text)]" aria-hidden="true" />
                      <span className="font-semibold text-[var(--text-primary)] truncate">
                        {activeStage.artifactFileName}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono shrink-0">
                      Artifact
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#0F172A] border border-[var(--border-hairline)] p-3 overflow-x-auto text-[11px] font-mono text-[#E2E8F0] shadow-inner leading-relaxed max-h-[190px] overflow-y-auto">
                    <pre className="whitespace-pre">
                      <code>{activeStage.artifactSnippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Right Column: Review & Gate Checklist */}
                <div className="lg:col-span-6 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <ListChecks className="w-3.5 h-3.5 text-[var(--accent-green-text)]" aria-hidden="true" />
                      <span className="font-semibold text-[var(--text-primary)]">
                        Quality Gate Checklist
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--accent-green-text)] font-mono font-semibold">
                      All Gates Passed ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                    {activeStage.checklist.map((item) => (
                      <div
                        key={item.text}
                        className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-hairline)] flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-[var(--accent-green-text)] shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-[var(--text-primary)] leading-snug truncate">
                            {item.text}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)] shrink-0">
                          {item.reviewer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
