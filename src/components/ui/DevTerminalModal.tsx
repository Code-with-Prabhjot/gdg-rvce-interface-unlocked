'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useDevTerminal } from '@/context/DevTerminalContext';
import { useApiInspector } from '@/context/ApiInspectorContext';
import { useTheme } from '@/context/ThemeContext';
import { EVENTS_DATA } from '@/data/gdgData';

interface HistoryItem {
  id: string;
  type: 'command' | 'response' | 'welcome';
  command?: string;
  output?: React.ReactNode;
}

export function DevTerminalModal() {
  const { isOpen, close } = useDevTerminal();
  const { open: openApiInspector } = useApiInspector();
  const { theme, toggleTheme, setTheme } = useTheme();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome-0',
      type: 'welcome',
      output: (
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-[#34A853] font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            <span>GDG RVCE Interactive Developer CLI [v1.0.0]</span>
          </div>
          <p className="text-[var(--text-secondary)]">
            Type <span className="text-[#4285F4] font-semibold">&quot;help&quot;</span> to see all available commands, or click any quick-command chip below.
          </p>
          <div className="h-px bg-white/10 my-2" />
        </div>
      ),
    },
  ]);

  // History tracking for ArrowUp / ArrowDown navigation
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const fireGoogleConfetti = () => {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'],
      ticks: 200,
    });
  };

  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Append to arrow-key history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const parts = trimmed.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const cmdId = `cmd-${Date.now()}`;
    const newItems: HistoryItem[] = [
      {
        id: cmdId,
        type: 'command',
        command: trimmed,
      },
    ];

    switch (cmd) {
      case 'help': {
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <div className="space-y-1.5 text-xs">
              <p className="text-[#FBBC04] font-semibold mb-2">Available Developer Commands:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono">
                <div>
                  <span className="text-[#4285F4] font-bold">whoami</span>
                  <span className="text-white/60"> - Mission, coordinates &amp; verticals</span>
                </div>
                <div>
                  <span className="text-[#4285F4] font-bold">api</span>
                  <span className="text-white/60"> - Open Live Backend API Inspector (/api)</span>
                </div>
                <div>
                  <span className="text-[#EA4335] font-bold">events</span>
                  <span className="text-white/60"> - List sprints &amp; jump to /events</span>
                </div>
                <div>
                  <span className="text-[#34A853] font-bold">team</span>
                  <span className="text-white/60"> - Open Builders roster (/team)</span>
                </div>
                <div>
                  <span className="text-[#FBBC04] font-bold">home</span>
                  <span className="text-white/60"> - Navigate to chapter home (/)</span>
                </div>
                <div>
                  <span className="text-[#4285F4] font-bold">boot</span>
                  <span className="text-white/60"> - Replay architectural &lt; &gt; prism boot</span>
                </div>
                <div>
                  <span className="text-[#4285F4] font-bold">theme [light|dark]</span>
                  <span className="text-white/60"> - Toggle or set active theme</span>
                </div>
                <div>
                  <span className="text-[#EA4335] font-bold">stack</span>
                  <span className="text-white/60"> - Display architecture manifest</span>
                </div>
                <div>
                  <span className="text-[#34A853] font-bold">celebrate</span>
                  <span className="text-white/60"> - Fire Google 4-colour confetti</span>
                </div>
                <div>
                  <span className="text-white/80 font-bold">clear</span>
                  <span className="text-white/60"> - Clear terminal screen</span>
                </div>
              </div>
            </div>
          ),
        });
        break;
      }

      case 'api': {
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#4285F4] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <span>Launching GDG RVCE Live Backend &amp; API Inspector...</span>
              </div>
              <p className="text-white/70">
                Opening interactive route tester for <span className="text-[#34A853]">/api/chapter</span>,{' '}
                <span className="text-[#EA4335]">/api/events</span>,{' '}
                <span className="text-[#FBBC04]">/api/team</span>, and{' '}
                <span className="text-[#4285F4]">/api/pass/verify</span>.
              </p>
            </div>
          ),
        });
        setTimeout(() => {
          close();
          openApiInspector();
        }, 300);
        break;
      }

      case 'whoami': {
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">GDG on Campus RV College of Engineering</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/40">
                  GDG RVCE
                </span>
              </div>
              <p className="text-white/80 leading-relaxed">
                An open student developer collective at R.V. College of Engineering building with AI, Cloud, Web, and Android through hands-on sprints and open-source craft.
              </p>
              <div className="text-[11px] text-white/70 space-y-1 pt-1">
                <div>
                  <span className="text-[#EA4335] font-semibold">📍 Coordinates:</span>{' '}
                  <span className="text-white font-mono">12.9237° N, 77.4987° E · Mysuru Road, Bengaluru</span>
                </div>
                <div>
                  <span className="text-[#34A853] font-semibold">⚡ Verticals:</span>{' '}
                  <span className="text-white font-mono">AI · Cloud · Web · Android</span>
                </div>
              </div>
            </div>
          ),
        });
        break;
      }

      case 'events': {
        const upcoming = EVENTS_DATA.filter((e) => e.status === 'Upcoming').slice(0, 4);
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <div className="space-y-2 text-xs">
              <p className="text-[#EA4335] font-semibold">
                Upcoming Sample Sprints (Navigating to /events...):
              </p>
              <div className="space-y-1.5 pl-2 border-l border-[#EA4335]/40 font-mono">
                {upcoming.map((ev) => (
                  <div key={ev.id} className="text-white/90">
                    <span className="text-[#EA4335] font-bold">[{ev.category}]</span>{' '}
                    <span className="font-semibold text-white">{ev.title}</span>{' '}
                    <span className="text-white/60">· {ev.displayDate || ev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        startTransition(() => {
          router.push('/events');
        });
        break;
      }

      case 'team': {
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <p className="text-[#34A853] text-xs font-mono">
              Opening Chapter Builders roster... (Navigating to /team)
            </p>
          ),
        });
        startTransition(() => {
          router.push('/team');
        });
        break;
      }

      case 'home': {
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <p className="text-[#4285F4] text-xs font-mono">
              Navigating to chapter home portal (/) ...
            </p>
          ),
        });
        startTransition(() => {
          router.push('/');
        });
        break;
      }

      case 'theme': {
        const sub = args[0]?.toLowerCase();
        if (sub === 'light') {
          setTheme('light');
          newItems.push({
            id: `res-${Date.now()}`,
            type: 'response',
            output: (
              <p className="text-[#FBBC04] text-xs font-mono">
                Theme set to Daylight Blueprint (Light Mode).
              </p>
            ),
          });
        } else if (sub === 'dark') {
          setTheme('dark');
          newItems.push({
            id: `res-${Date.now()}`,
            type: 'response',
            output: (
              <p className="text-[#4285F4] text-xs font-mono">
                Theme set to Obsidian IDE (Dark Mode).
              </p>
            ),
          });
        } else {
          toggleTheme();
          const targetTheme = theme === 'dark' ? 'Daylight Blueprint (Light Mode)' : 'Obsidian IDE (Dark Mode)';
          newItems.push({
            id: `res-${Date.now()}`,
            type: 'response',
            output: (
              <p className="text-[#34A853] text-xs font-mono">
                Theme toggled to: {targetTheme}
              </p>
            ),
          });
        }
        break;
      }

      case 'stack': {
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-[#4285F4] font-bold">GDG RVCE Architecture Manifest:</p>
              <ul className="space-y-0.5 text-white/80 list-disc list-inside">
                <li><span className="text-white font-semibold">Framework:</span> Next.js 15 App Router</li>
                <li><span className="text-white font-semibold">Runtime &amp; Library:</span> React 19</li>
                <li><span className="text-white font-semibold">Language:</span> TypeScript (Strict Typing)</li>
                <li><span className="text-white font-semibold">Styling:</span> Tailwind CSS v4</li>
                <li><span className="text-white font-semibold">Physics Engine:</span> Framer Motion (Reduced Motion Safe)</li>
                <li><span className="text-white font-semibold">Asset Pipeline:</span> Local Vector Asset Studio (Zero External CDNs)</li>
              </ul>
            </div>
          ),
        });
        break;
      }

      case 'celebrate': {
        fireGoogleConfetti();
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <div className="flex items-center gap-2 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-[#FBBC04]" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] font-bold">
                Interface Unlocked — Shipped with GDG RVCE!
              </span>
            </div>
          ),
        });
        break;
      }

      case 'boot': {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('gdg:replay-boot'));
        }
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <p className="text-[#4285F4] text-xs font-mono">
              Replaying architectural &lt; &gt; prism boot sequence...
            </p>
          ),
        });
        close();
        break;
      }

      case 'clear': {
        setHistory([]);
        setInputVal('');
        return;
      }

      default: {
        newItems.push({
          id: `res-${Date.now()}`,
          type: 'response',
          output: (
            <p className="text-[#EA4335] text-xs font-mono">
              command not found: &ldquo;{cmd}&rdquo;. Type <span className="text-white underline cursor-pointer" onClick={() => handleCommand('help')}>&quot;help&quot;</span> for available commands.
            </p>
          ),
        });
        break;
      }
    }

    setHistory((prev) => [...prev, ...newItems]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandHistory[nextPointer] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer] || '');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  const quickChips = ['help', 'api', 'events', 'boot', 'team', 'theme', 'stack', 'celebrate'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 pt-16 sm:pt-20">
          {/* Translucent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Terminal Drawer Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl bg-[#0A0D12] border border-[var(--border-strong)] text-[#F8FAFC] shadow-2xl overflow-hidden font-['JetBrains_Mono',monospace] flex flex-col z-10 max-h-[85vh] sm:max-h-[80vh]"
            role="dialog"
            aria-modal="true"
            aria-label="GDG RVCE Developer CLI Terminal"
          >
            {/* macOS / IDE 3-Dot Status Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#121721] border-b border-white/10 select-none shrink-0">
              <div className="flex items-center gap-2">
                {/* 3-Dot Status Buttons (Official Google Palette) */}
                <button
                  type="button"
                  onClick={close}
                  className="w-3 h-3 rounded-full bg-[#EA4335] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
                  aria-label="Close terminal"
                  title="Close (ESC)"
                >
                  <X className="w-2 h-2 text-[#111827] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCommand('theme')}
                  className="w-3 h-3 rounded-full bg-[#FBBC04] hover:opacity-80 transition-opacity cursor-pointer"
                  aria-label="Toggle theme"
                  title="Toggle theme"
                />
                <button
                  type="button"
                  onClick={() => handleCommand('celebrate')}
                  className="w-3 h-3 rounded-full bg-[#34A853] hover:opacity-80 transition-opacity cursor-pointer"
                  aria-label="Celebrate"
                  title="Celebrate"
                />
              </div>

              {/* Status Header Title */}
              <div className="flex items-center gap-1.5 text-xs text-white/70 font-semibold truncate px-2">
                <TerminalIcon className="w-3.5 h-3.5 text-[#34A853]" />
                <span className="text-[#34A853]">gdg-rvce@bengaluru</span>
                <span className="text-white/40">:</span>
                <span className="text-[#4285F4]">~/interface-unlocked$</span>
              </div>

              {/* ESC badge */}
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-white/50 bg-white/5 border border-white/10 rounded">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={close}
                  className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close terminal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Terminal History Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px] max-h-[380px] text-xs">
              {history.map((item) => {
                if (item.type === 'welcome') {
                  return <div key={item.id}>{item.output}</div>;
                }
                if (item.type === 'command') {
                  return (
                    <div key={item.id} className="flex items-center gap-2 text-white/90">
                      <span className="text-[#34A853] font-bold">➜</span>
                      <span className="text-[#4285F4] font-semibold">~/interface-unlocked</span>
                      <span className="text-white/40">$</span>
                      <span className="font-semibold text-white">{item.command}</span>
                    </div>
                  );
                }
                return (
                  <div key={item.id} className="pl-4 border-l-2 border-white/10 py-0.5 text-white/90">
                    {item.output}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Prompt Input Line */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f141d] border-t border-white/10 shrink-0">
              <span className="text-[#34A853] font-bold text-xs shrink-0">➜</span>
              <span className="text-[#4285F4] font-semibold text-xs shrink-0 hidden sm:inline">~/interface-unlocked</span>
              <span className="text-white/40 text-xs shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command ('help', 'events', 'stack')..."
                className="w-full bg-transparent text-xs text-white placeholder-white/30 focus:outline-none caret-[#4285F4] font-mono"
                aria-label="Terminal command input"
              />
            </div>

            {/* Quick Command Chips & Shortcut Guide */}
            <div className="px-4 py-2.5 bg-[#121721] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-white/40 uppercase tracking-wider mr-1">Run:</span>
                {quickChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleCommand(chip)}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="text-[10px] text-white/40 font-mono hidden md:flex items-center gap-2">
                <span>↑↓ history</span>
                <span>·</span>
                <span>` or ~ toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
