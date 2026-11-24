'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Terminal, Heart, Info, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from '@/components/icons/SocialIcons';
import { OPEN_SOURCE_ATTRIBUTIONS } from '@/data/attributions';
import { useDevTerminal } from '@/context/DevTerminalContext';
import { useApiInspector } from '@/context/ApiInspectorContext';
import { useXRay } from '@/context/XRayContext';

export function Footer() {
  const [showAttributions, setShowAttributions] = useState(false);
  const { toggle: toggleTerminal } = useDevTerminal();
  const { open: openApiInspector } = useApiInspector();
  const { isXRayActive, toggleXRay } = useXRay();

  return (
    <footer className="w-full border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)] transition-colors duration-200 mt-auto">
      {/* Top Architectural Blueprint Accent Border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* SVG GDG Emblem */}
              <div className="w-8 h-5 flex items-center justify-center">
                <svg viewBox="0 0 120 64" fill="none" className="w-8 h-5" aria-hidden="true">
                  <path d="M46 11L22 32" stroke="#EA4335" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 32L46 53" stroke="#4285F4" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M74 11L98 32" stroke="#34A853" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M98 32L74 53" stroke="#FBBC04" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-['Space_Grotesk',sans-serif] font-bold text-lg text-[var(--text-primary)]">
                GDG on Campus RV College of Engineering
              </span>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
              A student-driven developer collective at RV College of Engineering fostering open-source craft, machine learning engineering, cloud architecture, and collaborative technical growth.
            </p>

            {/* Campus Coordinates */}
            <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-[var(--text-muted)] bg-[var(--bg-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] w-fit">
              <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
              <span>RVCE Campus, Bengaluru • 12.9237° N, 77.4987° E</span>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-['JetBrains_Mono',monospace] uppercase font-bold tracking-wider text-[var(--text-muted)]">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[var(--text-secondary)] hover:text-[#4285F4] transition-colors focus:outline-none focus-visible:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-[var(--text-secondary)] hover:text-[#EA4335] transition-colors focus:outline-none focus-visible:underline"
                >
                  Events &amp; Sprints
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-[var(--text-secondary)] hover:text-[#34A853] transition-colors focus:outline-none focus-visible:underline"
                >
                  Core Team
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowAttributions(true)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer focus:outline-none"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Open Source Attributions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Community Channels */}
          <div className="space-y-3">
            <h3 className="text-xs font-['JetBrains_Mono',monospace] uppercase font-bold tracking-wider text-[var(--text-muted)]">
              Channels
            </h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/Code-with-Prabhjot/gdg-rvce-interface-unlocked"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                aria-label="GDG RVCE GitHub Repository"
              >
                <GithubIcon className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[#4285F4] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                aria-label="GDG RVCE LinkedIn Community"
              >
                <LinkedinIcon className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[#EA4335] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                aria-label="GDG RVCE Instagram"
              >
                <InstagramIcon className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[#EA4335] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                aria-label="GDG RVCE YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-['JetBrains_Mono',monospace] bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
                <Terminal className="w-3 h-3 text-[#34A853]" />
                Next.js 15 App Router
              </span>

              {/* Live Backend & API Inspector Drawer Trigger */}
              <button
                type="button"
                onClick={openApiInspector}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-['JetBrains_Mono',monospace] font-semibold bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[#4285F4] border border-[var(--border-hairline)] hover:border-[#4285F4]/50 transition-all cursor-pointer shadow-2xs active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
                aria-label="Open Live Backend API Inspector"
                title="Inspect Live Backend API (/api)"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                <span className="text-[#4285F4] font-bold">API</span>
                <span className="text-[var(--text-muted)] font-normal">{'//'}</span>
                <span className="text-[#34A853]">200 OK</span>
              </button>

              {/* Blueprint X-Ray Design Token Inspector Trigger */}
              <button
                type="button"
                onClick={toggleXRay}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-['JetBrains_Mono',monospace] font-semibold border transition-all cursor-pointer shadow-2xs active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                  isXRayActive
                    ? 'bg-[#4285F4]/15 border-[#4285F4] text-[#4285F4] shadow-xs'
                    : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[#4285F4] border-[var(--border-hairline)] hover:border-[#4285F4]/50'
                }`}
                aria-label={`Toggle Blueprint X-Ray Inspector (${isXRayActive ? 'On' : 'Off'})`}
                title="Toggle Blueprint X-Ray Inspector (Shift+X)"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isXRayActive ? 'bg-[#4285F4] animate-pulse' : 'bg-slate-400'
                  }`}
                />
                <span className="font-bold">X-RAY</span>
                <span className="text-[var(--text-muted)] font-normal">{'//'}</span>
                <span className={isXRayActive ? 'text-[#4285F4] font-bold' : 'text-[var(--text-muted)]'}>
                  {isXRayActive ? 'ON' : 'OFF'}
                </span>
                <kbd className="text-[9px] px-1 py-0.2 bg-[var(--bg-elevated)] border border-[var(--border-hairline)] rounded text-[var(--text-muted)] font-mono">
                  ⇧X
                </kbd>
              </button>

              {/* Signature Developer CLI Drawer Trigger */}
              <button
                type="button"
                onClick={toggleTerminal}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-['JetBrains_Mono',monospace] font-semibold bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[#34A853] border border-[var(--border-hairline)] hover:border-[#34A853]/50 transition-all cursor-pointer shadow-2xs active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34A853]"
                aria-label="Open Developer CLI Terminal"
                title="Toggle Developer Terminal (` or ~)"
              >
                <span className="text-[#34A853] font-bold group-hover:scale-110 transition-transform">&gt;_</span>
                <span>CLI</span>
                <kbd className="text-[9px] px-1 py-0.2 bg-[var(--bg-elevated)] border border-[var(--border-hairline)] rounded text-[var(--text-muted)] font-mono">
                  ~
                </kbd>
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Independence Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--border-hairline)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p className="text-center md:text-left leading-relaxed">
            GDG on Campus RVCE is an independent student developer community and is not an official Google product.
          </p>

          <div className="flex items-center gap-1 font-['JetBrains_Mono',monospace]">
            <span>Crafted for RVCE Builders</span>
            <Heart className="w-3 h-3 text-[#EA4335] fill-[#EA4335]" />
            <span>2026</span>
          </div>
        </div>
      </div>

      {/* Attributions Modal */}
      {showAttributions && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAttributions(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-2xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#4285F4] shrink-0" />
                <h3 className="font-['Space_Grotesk',sans-serif] font-bold text-lg text-[var(--text-primary)]">
                  Open Source Attributions &amp; Licenses
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAttributions(false)}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 shrink-0" />
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              {OPEN_SOURCE_ATTRIBUTIONS.map((item) => (
                <div
                  key={item.name}
                  className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-hairline)] text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[var(--text-primary)]">
                      {item.name}
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-[10px] text-[var(--text-muted)]">
                      {item.license}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4285F4] hover:underline inline-block pt-1 font-mono text-[11px]"
                  >
                    {item.sourceUrl}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border-hairline)] flex justify-end">
              <button
                type="button"
                onClick={() => setShowAttributions(false)}
                className="px-4 py-2 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-xs font-semibold text-[var(--text-primary)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
