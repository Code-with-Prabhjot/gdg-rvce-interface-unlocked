'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  Calendar,
  Users,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '@/context/ThemeContext';
import { useCommandPalette } from '@/context/CommandPaletteContext';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Appearance' | 'Community';
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  run: () => void;
}

export function CommandPalette() {
  const { isOpen, close, toggle } = useCommandPalette();
  const router = useRouter();
  const { theme, toggleTheme, setTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle, close]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const fireGoogleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'],
      ticks: 200,
    });
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Home Page',
      subtitle: 'Overview, hero marquee & chapter highlights',
      category: 'Navigation',
      icon: Home,
      accentColor: '#4285F4',
      run: () => {
        close();
        startTransition(() => router.push('/'));
      },
    },
    {
      id: 'nav-events',
      title: 'Events & Sprints',
      subtitle: 'Browse hackathons, codelabs & technical workshops',
      category: 'Navigation',
      icon: Calendar,
      accentColor: '#EA4335',
      run: () => {
        close();
        startTransition(() => router.push('/events'));
      },
    },
    {
      id: 'nav-team',
      title: 'Core Chapter Team',
      subtitle: 'Student leads, mentors & engineering domains',
      category: 'Navigation',
      icon: Users,
      accentColor: '#34A853',
      run: () => {
        close();
        startTransition(() => router.push('/team'));
      },
    },
    {
      id: 'theme-toggle',
      title: theme === 'dark' ? 'Switch to Daylight Blueprint' : 'Switch to Obsidian IDE',
      subtitle: `Toggle UI mode (currently ${theme === 'dark' ? 'Dark Mode' : 'Light Mode'})`,
      category: 'Appearance',
      icon: theme === 'dark' ? Sun : Moon,
      accentColor: '#FBBC04',
      run: () => {
        toggleTheme();
        close();
      },
    },
    {
      id: 'theme-light',
      title: 'Light Theme (Daylight Blueprint)',
      subtitle: 'Optimal high-contrast mode for daytime reading',
      category: 'Appearance',
      icon: Sun,
      accentColor: '#EA4335',
      run: () => {
        setTheme('light');
        close();
      },
    },
    {
      id: 'theme-dark',
      title: 'Dark Theme (Obsidian IDE)',
      subtitle: 'Deep slate aesthetic tailored for late-night hacking',
      category: 'Appearance',
      icon: Moon,
      accentColor: '#4285F4',
      run: () => {
        setTheme('dark');
        close();
      },
    },
    {
      id: 'action-confetti',
      title: 'Celebrate GDG RVCE',
      subtitle: 'Fire official Google 4-colour victory confetti',
      category: 'Community',
      icon: Sparkles,
      accentColor: '#34A853',
      run: () => {
        fireGoogleConfetti();
        close();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? (filteredCommands.length || 1) - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredCommands[selectedIndex];
      if (target) {
        target.run();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-2xl overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Quick Command Palette"
          >
            {/* Input Header */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-[var(--border-hairline)]">
              <Search className="w-5 h-5 text-[var(--text-muted)] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or jump to page..."
                className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] text-base focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-['JetBrains_Mono',monospace] font-semibold text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border-hairline)] rounded">
                ESC
              </kbd>
            </div>

            {/* Command Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-sm text-[var(--text-muted)]">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => cmd.run()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] border border-transparent hover:bg-[var(--bg-subtle)]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${cmd.accentColor}18`,
                            color: cmd.accentColor,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                            <span>{cmd.title}</span>
                            <span className="text-[10px] font-['JetBrains_Mono',monospace] px-1.5 py-0.2 rounded text-[var(--text-muted)] bg-[var(--bg-canvas)] border border-[var(--border-hairline)]">
                              {cmd.category}
                            </span>
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            {cmd.subtitle}
                          </div>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="flex items-center gap-1 text-[var(--text-muted)]">
                          <span className="text-[10px] font-['JetBrains_Mono',monospace]">Execute</span>
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--border-strong)]" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Guide */}
            <div className="px-4 py-2.5 bg-[var(--bg-subtle)] border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-['JetBrains_Mono',monospace]">
              <div className="flex items-center gap-4">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <div className="flex items-center gap-1">
                <span>GDG RVCE</span>
                <span className="text-[#4285F4]">&lt;</span>
                <span className="text-[#EA4335]">&gt;</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
