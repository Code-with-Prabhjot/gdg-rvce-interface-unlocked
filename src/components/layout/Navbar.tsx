'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Command, Menu, X, ArrowUpRight, Compass, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useCommandPalette } from '@/context/CommandPaletteContext';
import { useDemoAuth } from '@/context/DemoAuthContext';
import { useGuidedTour } from '@/context/GuidedTourContext';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/team', label: 'Team' },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { open: openCommandPalette } = useCommandPalette();
  const { session, isHydrated, signOut } = useDemoAuth();
  const { isOpen: isTourOpen, startTour } = useGuidedTour();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const shortDisplayName = session
    ? (() => {
        const parts = session.displayName.trim().split(/\s+/);
        if (parts.length > 1) {
          return `${parts[0]} ${parts[1][0]}.`;
        }
        return parts[0];
      })()
    : '';

  // Ephemeral Theme Mode Telemetry Toast state
  const [themeToast, setThemeToast] = useState<{ mode: 'light' | 'dark' } | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Trigger telemetry pill for 1.4s on theme changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setThemeToast({ mode: theme });
    toastTimerRef.current = setTimeout(() => {
      setThemeToast(null);
    }, 1400);

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/85 backdrop-blur-md transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] rounded-lg p-1 -ml-1 transition-transform"
          aria-label="GDG on Campus RV College of Engineering — Home"
        >
          {/* Official GDG < > Mark */}
          <div className="relative w-8 h-6 flex items-center justify-center">
            {/* SVG Mark inline for instant rendering */}
            <svg
              viewBox="0 0 120 64"
              fill="none"
              className="w-8 h-5 transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              <path
                d="M46 11L22 32"
                stroke="#EA4335"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 32L46 53"
                stroke="#4285F4"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M74 11L98 32"
                stroke="#34A853"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M98 32L74 53"
                stroke="#FBBC04"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-['Space_Grotesk',sans-serif] font-bold text-lg tracking-tight text-[var(--text-primary)]">
              GDG RVCE
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-['JetBrains_Mono',monospace] font-semibold uppercase tracking-wider bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
              ON CAMPUS
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-hairline)] shadow-xs"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-150 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-indicator"
                    className="absolute inset-0 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-strong)] -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Guided Tour Pill Button */}
          <button
            type="button"
            onClick={() => startTour(0)}
            aria-pressed={isTourOpen}
            aria-label="Start Interactive Guided Tour"
            className={`hidden lg:inline-flex min-h-[36px] items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] ${
              isTourOpen
                ? 'bg-[#4285F4]/15 border-[#4285F4] text-[var(--accent-blue-text)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0 text-[#4285F4]" />
            <span>Guided Tour</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={openCommandPalette}
            className="min-h-[36px] inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] whitespace-nowrap"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)]" />
            <span className="hidden xl:inline text-[var(--text-muted)]">Search or jump</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] font-semibold text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border-hairline)] rounded">
              {isMac ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="min-w-[36px] min-h-[36px] p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-hairline)] transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
            aria-label={`Toggle color theme. Current theme is ${theme}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4 shrink-0 text-[#FBBC04]" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4 shrink-0 text-[#EA4335]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {isHydrated && session && (
            <div className="hidden lg:flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg text-xs font-mono font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-2xs whitespace-nowrap"
                title={`Sample Persona: ${session.displayName} (${session.demoId})`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: session.badgeColor }}
                />
                <span>Sample Persona</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[11px]" style={{ color: session.badgeColor }}>
                  {shortDisplayName}
                </span>
              </span>
              <button
                type="button"
                onClick={signOut}
                aria-label="Exit sample persona"
                title="Exit Sample Persona"
                className="min-h-[36px] min-w-[36px] p-2 rounded-lg text-[#EA4335] hover:text-white bg-[#EA4335]/10 hover:bg-[#EA4335] border border-[#EA4335]/30 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          )}

          {/* Primary CTA Button */}
          <Link
            href="/events"
            className="hidden lg:inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] shadow-sm hover:shadow transition-all duration-150 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4285F4] whitespace-nowrap"
          >
            <span>Explore Events</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-hairline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium min-h-[44px] transition-colors ${
                      isActive
                        ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    startTour(0);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-mono font-semibold text-[var(--text-primary)] bg-[var(--bg-subtle)] border border-[var(--border-hairline)] min-h-[44px]"
                >
                  <Compass className="w-4 h-4 text-[#4285F4]" />
                  <span>Start Guided Tour</span>
                </button>

                {isHydrated && session && (
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-semibold text-[var(--text-primary)] bg-[var(--bg-subtle)] border border-[var(--border-strong)] min-h-[44px]"
                      title={`Sample Persona: ${session.displayName} (${session.demoId})`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: session.badgeColor }}
                      />
                      <span>Sample Persona · {shortDisplayName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={signOut}
                      aria-label="Exit sample persona"
                      title="Exit Sample Persona"
                      className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-[#EA4335] bg-[#EA4335]/10 border border-[#EA4335]/30 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <Link
                  href="/events"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] shadow-sm min-h-[44px]"
                >
                  <span>Explore Events</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Ephemeral Theme Mode Telemetry Toast */}
      <AnimatePresence>
        {themeToast && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full mt-2 right-4 z-50 pointer-events-none"
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-lg backdrop-blur-md">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  themeToast.mode === 'dark' ? 'bg-[#4285F4]' : 'bg-[#FBBC04]'
                } animate-pulse`}
              />
              <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold text-[var(--text-primary)] tracking-wider whitespace-nowrap">
                {themeToast.mode === 'dark'
                  ? 'THEME // OBSIDIAN_IDE'
                  : 'THEME // DAYLIGHT_BLUEPRINT'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
