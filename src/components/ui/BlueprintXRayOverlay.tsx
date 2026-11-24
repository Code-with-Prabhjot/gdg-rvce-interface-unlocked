'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useXRay } from '@/context/XRayContext';
import { useTheme } from '@/context/ThemeContext';

interface HoveredElementInfo {
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  tag: string;
  id: string;
  role: string;
  fontFamily: string;
  fontSize: string;
  color: string;
}

export function BlueprintXRayOverlay() {
  const { isXRayActive, disableXRay } = useXRay();
  const { theme } = useTheme();
  const [hoveredInfo, setHoveredInfo] = useState<HoveredElementInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Mousemove element inspector with requestAnimationFrame throttling
  useEffect(() => {
    if (!isXRayActive) {
      setHoveredInfo(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        // Element under cursor
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el) {
          setHoveredInfo(null);
          return;
        }

        // Ignore overlay itself or its children
        if (el.closest('[data-xray-ignore]')) {
          setHoveredInfo(null);
          return;
        }

        // Avoid selecting root html or body
        if (el === document.body || el === document.documentElement) {
          setHoveredInfo(null);
          return;
        }

        // Find closest semantic element or container
        const target =
          (el.closest(
            'section, article, header, footer, nav, main, aside, button, a, h1, h2, h3, h4, [data-xray], [role="button"], form, [class*="card"], [class*="bento"]'
          ) as HTMLElement | null) || (el as HTMLElement);

        if (!target || target === document.body || target === document.documentElement) {
          setHoveredInfo(null);
          return;
        }

        const bRect = target.getBoundingClientRect();
        const computed = window.getComputedStyle(target);

        // Clean font-family string (first font)
        const rawFont = computed.fontFamily || '';
        const cleanFont = rawFont
          .split(',')[0]
          .replace(/['"]/g, '')
          .trim();

        const info: HoveredElementInfo = {
          rect: {
            left: bRect.left,
            top: bRect.top,
            width: bRect.width,
            height: bRect.height,
          },
          tag: target.tagName.toUpperCase(),
          id: target.id ? `#${target.id}` : '',
          role: target.getAttribute('role') ? `[role="${target.getAttribute('role')}"]` : '',
          fontFamily: cleanFont || 'sans-serif',
          fontSize: computed.fontSize || '16px',
          color: computed.color || '#FFFFFF',
        };

        setHoveredInfo(info);

        // Compute clamped tooltip coordinates to prevent horizontal or vertical overflow
        const tooltipW = 290;
        const tooltipH = 150;
        const pad = 16;

        let x = e.clientX + 16;
        if (x + tooltipW > window.innerWidth - pad) {
          x = e.clientX - tooltipW - 16;
        }
        x = Math.max(pad, Math.min(x, window.innerWidth - tooltipW - pad));

        let y = bRect.bottom + 12;
        if (y + tooltipH > window.innerHeight - pad) {
          y = bRect.top - tooltipH - 12;
        }
        y = Math.max(pad, Math.min(y, window.innerHeight - tooltipH - pad));

        setTooltipPos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isXRayActive]);

  if (!isXRayActive) return null;

  return (
    <>
      {/* ======================================================== */}
      {/* 1. TOP-CENTER FLOATING STATUS PILL (POINTER-EVENTS-AUTO) */}
      {/* ======================================================== */}
      <div
        data-xray-ignore="true"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto select-none transition-all duration-300"
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#0A0E1A]/92 hover:bg-[#0A0E1A]/98 text-white border border-[#4285F4]/60 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
          {/* Pulsing Google Blue dot */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-pulse shrink-0" />

          {/* Status Label */}
          <span className="font-['JetBrains_Mono',monospace] text-xs font-bold tracking-wider text-slate-100 hidden sm:inline">
            BLUEPRINT X-RAY ACTIVE · HOVER ANY ELEMENT
          </span>
          <span className="font-['JetBrains_Mono',monospace] text-xs font-bold tracking-wider text-slate-100 sm:hidden">
            X-RAY ACTIVE
          </span>

          {/* One-click Exit ESC Button */}
          <button
            type="button"
            onClick={disableXRay}
            className="min-h-[36px] px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-['JetBrains_Mono',monospace] text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
            aria-label="Exit Blueprint X-Ray (Escape)"
          >
            <span>Exit</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-black/60 border border-white/20 text-slate-300">
              ESC
            </kbd>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. SUBTLE GLOBAL ARCHITECTURAL STRUCTURAL GRID (8px/64px)*/}
      {/* ======================================================== */}
      <div
        data-xray-ignore="true"
        className="fixed inset-0 z-[55] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg className="w-full h-full opacity-70" aria-hidden="true">
          <defs>
            <pattern id="xray-subgrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="rgba(66, 133, 244, 0.035)"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern id="xray-majorgrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <rect width="64" height="64" fill="url(#xray-subgrid)" />
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="rgba(66, 133, 244, 0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xray-majorgrid)" />
        </svg>

        {/* Viewport Boundary Dimension Marks */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-[#4285F4]/60 bg-black/40 px-2 py-0.5 rounded border border-[#4285F4]/20 backdrop-blur-xs">
          (0, 0)
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-[#4285F4]/60 bg-black/40 px-2 py-0.5 rounded border border-[#4285F4]/20 backdrop-blur-xs">
          X-RAY // GRID: 8px/64px
        </div>

        {/* ======================================================== */}
        {/* 3. ELEMENT BOUNDING BOX & 4 GOOGLE-COLOURED CORNER TICKS */}
        {/* ======================================================== */}
        {hoveredInfo && (
          <div
            className="fixed transition-all duration-75 pointer-events-none"
            style={{
              left: `${hoveredInfo.rect.left}px`,
              top: `${hoveredInfo.rect.top}px`,
              width: `${hoveredInfo.rect.width}px`,
              height: `${hoveredInfo.rect.height}px`,
              border: '1.5px dashed #4285F4',
              backgroundColor: 'rgba(66, 133, 244, 0.04)',
            }}
          >
            {/* 4 Google-Colour Corner L-Ticks (8px x 8px) */}
            {/* Top-Left: Google Blue #4285F4 */}
            <div
              className="absolute -top-[3px] -left-[3px] w-2.5 h-2.5 border-t-[2.5px] border-l-[2.5px] border-[#4285F4]"
              aria-hidden="true"
            />
            {/* Top-Right: Google Red #EA4335 */}
            <div
              className="absolute -top-[3px] -right-[3px] w-2.5 h-2.5 border-t-[2.5px] border-r-[2.5px] border-[#EA4335]"
              aria-hidden="true"
            />
            {/* Bottom-Right: Google Yellow #FBBC04 */}
            <div
              className="absolute -bottom-[3px] -right-[3px] w-2.5 h-2.5 border-b-[2.5px] border-r-[2.5px] border-[#FBBC04]"
              aria-hidden="true"
            />
            {/* Bottom-Left: Google Green #34A853 */}
            <div
              className="absolute -bottom-[3px] -left-[3px] w-2.5 h-2.5 border-b-[2.5px] border-l-[2.5px] border-[#34A853]"
              aria-hidden="true"
            />

            {/* Width Dimension Badge (Top-Center) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A0E1A] text-[#60A5FA] px-1.5 py-0.2 rounded border border-[#4285F4]/40 text-[9px] font-mono font-bold whitespace-nowrap shadow-xs">
              {Math.round(hoveredInfo.rect.width)}px
            </div>

            {/* Height Dimension Badge (Left-Center) */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 -translate-x-full bg-[#0A0E1A] text-[#60A5FA] px-1.5 py-0.2 rounded border border-[#4285F4]/40 text-[9px] font-mono font-bold whitespace-nowrap shadow-xs">
              {Math.round(hoveredInfo.rect.height)}px
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. CLAMPED FLOATING JETBRAINS MONO HUD TOOLTIP          */}
        {/* ======================================================== */}
        {hoveredInfo && (
          <div
            className="fixed z-[70] pointer-events-none transition-all duration-75 select-none"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              width: '280px',
            }}
          >
            <div className="rounded-xl bg-[#090D16]/96 border border-[#4285F4]/70 p-3 shadow-2xl backdrop-blur-xl text-white font-['JetBrains_Mono',monospace] text-xs space-y-2">
              {/* Tooltip Header: Tag & Component Role */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4] shrink-0" />
                  <span className="font-bold text-[#60A5FA] text-[11px] truncate">
                    &lt;{hoveredInfo.tag}
                    {hoveredInfo.id}
                    {hoveredInfo.role}&gt;
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                  TOKEN HUD
                </span>
              </div>

              {/* Exact Rendered Dimensions */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Dimensions:</span>
                <span className="font-bold text-white bg-white/10 px-1.5 py-0.5 rounded">
                  {Math.round(hoveredInfo.rect.width)} × {Math.round(hoveredInfo.rect.height)} px
                </span>
              </div>

              {/* Computed Typography */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Typography:</span>
                <span className="font-semibold text-[#FCD34D] truncate max-w-[170px]" title={hoveredInfo.fontFamily}>
                  {hoveredInfo.fontFamily} · {hoveredInfo.fontSize}
                </span>
              </div>

              {/* Active Theme & Google 4-Color Badges */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-slate-400">
                  {theme === 'dark' ? 'OBSIDIAN_IDE' : 'DAYLIGHT_BLUEPRINT'}
                </span>
                {/* 4 Google Colors Pill */}
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4]" title="Blue #4285F4" />
                  <span className="w-2 h-2 rounded-full bg-[#EA4335]" title="Red #EA4335" />
                  <span className="w-2 h-2 rounded-full bg-[#FBBC04]" title="Yellow #FBBC04" />
                  <span className="w-2 h-2 rounded-full bg-[#34A853]" title="Green #34A853" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
