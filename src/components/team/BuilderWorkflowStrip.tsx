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
              rigor across Google Cloud, Gemini, and modern web architectures. Click any stage to inspect review telemetry.
            </p>
          </div>

          {/* CTA Link Button back to /events */}
          <div className="shrink-0">
            <MagneticWrapper maxOffset={6}>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[#4285F4] text-[var(--text-primary)] hover:text-white border border-[var(--border-strong)] hover:border-[#4285F4] text-xs sm:text-sm font-mono font-medium transition-all shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
              >
                <span>Explore Upcoming Sprints</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        {/* Animated SVG Signal Cadence Line (Desktop / Tablet view) */}
        <div className="hidden md:block w-full -mb-3 px-8" aria-hidden="true">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 1000 32" fill="none">
            <defs>
              <linearGradient id="workflow-cadence-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="50%" stopColor="#EA4335" />
                <stop offset="100%" stopColor="#34A853" />
              </linearGradient>
            </defs>
            {/* Background hairline dashed track */}
            <line
              x1="166"
              y1="16"
              x2="834"
              y2="16"
              stroke="var(--border-strong)"
              strokeWidth="2"
              strokeDasharray="6 6"
              opacity="0.6"
            />
            {/* Gradient glow track */}
            <line
              x1="166"
              y1="16"
              x2="834"
              y2="16"
              stroke="url(#workflow-cadence-gradient)"
              strokeWidth="2"
              opacity="0.8"
            />
            {/* Animated traveling data pulse dot */}
            {!prefersReducedMotion && (
              <motion.circle
                r="5"
                fill="#4285F4"
                animate={{
                  cx: [166, 500, 834],
                  fill: ['#4285F4', '#EA4335', '#34A853'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
            {/* Stage nodes */}
            <circle
              cx="166"
              cy="16"
              r="7"
              fill={activeStageId === '01' ? '#4285F4' : 'var(--bg-elevated)'}
              stroke="#4285F4"
              strokeWidth="2.5"
            />
            <circle
              cx="500"
              cy="16"
              r="7"
              fill={activeStageId === '02' ? '#EA4335' : 'var(--bg-elevated)'}
              stroke="#EA4335"
              strokeWidth="2.5"
            />
            <circle
              cx="834"
              cy="16"
              r="7"
              fill={activeStageId === '03' ? '#34A853' : 'var(--bg-elevated)'}
              stroke="#34A853"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* 3 Interactive Stages Workflow Grid */}
        <div
          role="tablist"
          aria-label="Workflow engineering stages"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStageId === stage.number;

            return (
              <motion.button
                key={stage.number}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`stage-inspector-${stage.number}`}
                onClick={() => setActiveStageId(stage.number)}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative text-left flex flex-col justify-between rounded-2xl bg-[var(--bg-elevated)] p-6 shadow-xs transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                  isSelected
                    ? 'border-2 shadow-md bg-[var(--bg-elevated)]'
                    : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)] hover:shadow-sm'
                }`}
                style={{
                  borderColor: isSelected ? stage.accentHex : undefined,
                }}
              >
                {/* Active Stage Indicator Glow Tag */}
                {isSelected && (
                  <motion.div
                    layoutId="active-stage-top-glow"
                    className="absolute top-0 inset-x-0 h-1 rounded-t-2xl"
                    style={{ backgroundColor: stage.accentHex }}
                  />
                )}

                {/* Top stage header */}
                <div className="space-y-4 w-full">
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
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-[var(--text-primary)] group-hover:text-[#4285F4] transition-colors">
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
                <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] space-y-2 w-full">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    <span>Core Artifacts</span>
                    <span className="text-[9px] text-[#4285F4] font-medium">
                      {isSelected ? 'Active Spec ▾' : 'Inspect →'}
                    </span>
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
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Bottom Telemetry Inspector Readout */}
        <div
          id={`stage-inspector-${activeStage.number}`}
          role="region"
          aria-label={`Detailed stage telemetry for Stage ${activeStage.number}: ${activeStage.title}`}
          className="rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-hairline)] p-5 sm:p-6 space-y-5"
        >
          {/* Header of Inspector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-hairline)]">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full shrink-0 animate-pulse"
                style={{ backgroundColor: activeStage.accentHex }}
              />
              <div>
                <span className="text-xs font-mono font-bold tracking-wider" style={{ color: activeStage.accentHex }}>
                  [ INSPECTOR TELEMETRY // {activeStage.badgeLabel} ]
                </span>
                <h4 className="text-base font-display font-bold text-[var(--text-primary)]">
                  {activeStage.title}: Technical Verification & Review Gate
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-1 rounded border border-[var(--border-hairline)]">
                Stage {activeStage.number} of 03
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.number}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Sample Repository Artifact (Code Preview) */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Code2 className="w-4 h-4 text-[#4285F4]" aria-hidden="true" />
                    <span className="font-semibold text-[var(--text-primary)]">
                      {activeStage.artifactFileName}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    Sample Repository Artifact
                  </span>
                </div>

                <div className="rounded-xl bg-[#0F172A] border border-[var(--border-hairline)] p-4 overflow-x-auto text-[11px] font-mono text-[#E2E8F0] shadow-inner leading-relaxed">
                  <pre className="whitespace-pre">
                    <code>{activeStage.artifactSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Right Column: Review & Gate Checklist */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <ListChecks className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
                    <span className="font-semibold text-[var(--text-primary)]">
                      Quality Gate Checklist
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    All Gates Passed
                  </span>
                </div>

                <div className="space-y-2">
                  {activeStage.checklist.map((item) => (
                    <div
                      key={item.text}
                      className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-[var(--text-primary)] leading-snug">
                          {item.text}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-hairline)] shrink-0">
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
    </section>
  );
}
