'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Terminal,
  Activity,
  ShieldCheck,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { useApiInspector, ApiInspectorPreset } from '@/context/ApiInspectorContext';

const PRESETS: ApiInspectorPreset[] = [
  {
    id: 'preset-chapter',
    label: 'GET /api/chapter',
    method: 'GET',
    endpoint: '/api/chapter',
    badgeColor: '#4285F4',
    description: 'Chapter & Design Tokens Manifest',
  },
  {
    id: 'preset-events',
    label: 'GET /api/events (Filtered)',
    method: 'GET',
    endpoint: '/api/events?status=Upcoming&track=Hackathon',
    badgeColor: '#EA4335',
    description: 'Live Filtered Events Query',
  },
  {
    id: 'preset-team',
    label: 'GET /api/team (Web & Cloud)',
    method: 'GET',
    endpoint: '/api/team?vertical=Web%20%26%20Cloud',
    badgeColor: '#34A853',
    description: 'Filtered Fictional Builders',
  },
  {
    id: 'preset-pass-post',
    label: 'POST /api/pass/verify',
    method: 'POST',
    endpoint: '/api/pass/verify',
    badgeColor: '#FBBC04',
    textColor: '#111827',
    description: 'Issue Stateless Sample Pass',
    defaultBody: JSON.stringify(
      { slug: 'gemini-multimodal-buildathon' },
      null,
      2
    ),
  },
  {
    id: 'preset-pass-get',
    label: 'GET /api/pass/verify',
    method: 'GET',
    endpoint:
      '/api/pass/verify?slug=gemini-multimodal-buildathon&passId=RVCE-GDG-2026-BC5395',
    badgeColor: '#4285F4',
    description: 'Verify Pass Signature',
  },
];

interface ResponseState {
  status: number | null;
  statusText: string;
  data: unknown | null;
  latencyMs: number | null;
  payloadBytes: number | null;
  error?: string;
}

/**
 * Syntax highlighted line formatter for JSON viewer
 */
function renderJsonValue(valStr: string) {
  let hasComma = false;
  let clean = valStr.trim();
  if (clean.endsWith(',')) {
    hasComma = true;
    clean = clean.slice(0, -1).trim();
  }

  let element: React.ReactNode = clean;

  if (clean.startsWith('"') && clean.endsWith('"')) {
    element = <span className="text-[#4ADE80]">{clean}</span>;
  } else if (clean === 'true' || clean === 'false') {
    element = <span className="text-[#F87171] font-bold">{clean}</span>;
  } else if (clean === 'null') {
    element = <span className="text-[#94A3B8] italic">null</span>;
  } else if (!Number.isNaN(Number(clean)) && clean !== '') {
    element = <span className="text-[#FCD34D] font-mono">{clean}</span>;
  } else {
    element = <span className="text-[#E2E8F0]">{clean}</span>;
  }

  return (
    <>
      {element}
      {hasComma && <span className="text-[#94A3B8]">,</span>}
    </>
  );
}

function JsonLineRenderer({ line, index }: { line: string; index: number }) {
  const keyMatch = line.match(/^(\s*)(".*?"):\s*(.*)$/);
  if (keyMatch) {
    const [, indent, key, rest] = keyMatch;
    return (
      <div className="leading-5 font-mono text-xs hover:bg-white/5 px-2 rounded-xs transition-colors">
        <span className="text-[#94A3B8] select-none mr-3 text-[10px] w-6 inline-block text-right">
          {index + 1}
        </span>
        <span className="whitespace-pre">{indent}</span>
        <span className="text-[#60A5FA] font-medium">{key}</span>
        <span className="text-[#CBD5E1]">: </span>
        {renderJsonValue(rest)}
      </div>
    );
  }

  return (
    <div className="leading-5 font-mono text-xs hover:bg-white/5 px-2 rounded-xs transition-colors">
      <span className="text-[#94A3B8] select-none mr-3 text-[10px] w-6 inline-block text-right">
        {index + 1}
      </span>
      <span className="whitespace-pre text-[#E2E8F0]">{line}</span>
    </div>
  );
}

export function ApiInspectorModal() {
  const {
    isOpen,
    close,
    activeMethod: contextMethod,
    activeEndpoint: contextEndpoint,
    activeBody: contextBody,
  } = useApiInspector();

  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [endpoint, setEndpoint] = useState<string>('/api/chapter');
  const [bodyText, setBodyText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseState, setResponseState] = useState<ResponseState>({
    status: null,
    statusText: '',
    data: null,
    latencyMs: null,
    payloadBytes: null,
  });

  const [copiedResponse, setCopiedResponse] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevIsOpen = useRef(false);

  // Sync state from context when opened or when context preset changes
  useEffect(() => {
    if (isOpen) {
      setMethod(contextMethod);
      setEndpoint(contextEndpoint);
      setBodyText(contextBody);
    }
  }, [isOpen, contextMethod, contextEndpoint, contextBody]);

  // Execute request (optional override eliminates stale state closures when firing presets)
  const handleSend = useCallback(
    async (override?: { method: 'GET' | 'POST'; endpoint: string; bodyText?: string }) => {
      const targetMethod = override?.method ?? method;
      const targetEndpoint = override?.endpoint ?? endpoint;
      const targetBody = override?.bodyText !== undefined ? override.bodyText : bodyText;

      setIsLoading(true);
      const start = performance.now();

      try {
        const options: RequestInit = {
          method: targetMethod,
          headers: {
            Accept: 'application/json',
            ...(targetMethod === 'POST' ? { 'Content-Type': 'application/json' } : {}),
          },
          ...(targetMethod === 'POST' && targetBody ? { body: targetBody } : {}),
        };

        const res = await fetch(targetEndpoint, options);
        const text = await res.text();
        const roundTrip = Number((performance.now() - start).toFixed(1));

        let parsed: unknown = text;
        try {
          parsed = JSON.parse(text);
        } catch {
          // Leave as string if not JSON
        }

        setResponseState({
          status: res.status,
          statusText: res.statusText || (res.ok ? 'OK' : 'Error'),
          data: parsed,
          latencyMs: roundTrip,
          payloadBytes: new Blob([text]).size,
        });
      } catch (err: unknown) {
        const roundTrip = Number((performance.now() - start).toFixed(1));
        setResponseState({
          status: 500,
          statusText: 'Network Error',
          data: {
            error: err instanceof Error ? err.message : 'Failed to fetch endpoint',
          },
          latencyMs: roundTrip,
          payloadBytes: 0,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [method, endpoint, bodyText]
  );

  // Auto-send request on initial open if not yet executed
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      handleSend({
        method: contextMethod,
        endpoint: contextEndpoint,
        bodyText: contextBody,
      });
    }
    prevIsOpen.current = isOpen;
  }, [isOpen, handleSend, contextMethod, contextEndpoint, contextBody]);

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  const selectPreset = (preset: ApiInspectorPreset) => {
    const nextBody = preset.defaultBody || '';
    setMethod(preset.method);
    setEndpoint(preset.endpoint);
    setBodyText(nextBody);
    handleSend({
      method: preset.method,
      endpoint: preset.endpoint,
      bodyText: nextBody,
    });
  };

  const handleCopyResponse = () => {
    if (!responseState.data) return;
    const str =
      typeof responseState.data === 'string'
        ? responseState.data
        : JSON.stringify(responseState.data, null, 2);
    navigator.clipboard.writeText(str);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const handleCopyCurl = () => {
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://gdg-rvce-interface-unlocked.vercel.app';
    let curl = `curl -X ${method} "${origin}${endpoint}" \\\n  -H "Accept: application/json"`;
    if (method === 'POST' && bodyText) {
      curl += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${bodyText.replace(/\n/g, '')}'`;
    }
    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const formattedJsonLines = responseState.data
    ? JSON.stringify(responseState.data, null, 2).split('\n')
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="api-inspector-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0f17] text-white border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0e1420] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#4285F4]/15 border border-[#4285F4]/30 flex items-center justify-center text-[#60A5FA]">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      id="api-inspector-title"
                      className="font-mono text-sm sm:text-base font-bold text-white tracking-tight"
                    >
                      GDG RVCE Live Backend &amp; API Inspector
                    </h2>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#34A853]/15 text-[#4ADE80] border border-[#34A853]/30 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                      App Router v15
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] font-mono">
                    Stateless Next.js route handlers · Zero PII · Zero tracking
                  </p>
                </div>
              </div>

              {/* Close Button with 44px tap target */}
              <button
                type="button"
                onClick={close}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close API Inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Presets Bar */}
            <div className="px-5 py-2.5 bg-[#080b11] border-b border-white/10 flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] shrink-0 mr-1 flex items-center gap-1">
                <Code2 className="w-3 h-3 text-[#60A5FA]" />
                Presets:
              </span>
              {PRESETS.map((preset) => {
                const isActive =
                  endpoint === preset.endpoint && method === preset.method;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectPreset(preset)}
                    className={`min-h-[44px] md:min-h-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all shrink-0 cursor-pointer border ${
                      isActive
                        ? 'bg-white/15 text-[#F8FAFC] border-white/40 shadow-xs ring-1 ring-white/20'
                        : 'bg-white/5 hover:bg-white/10 text-[#CBD5E1] hover:text-[#F8FAFC] border-white/15'
                    }`}
                    title={preset.description}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: preset.badgeColor }}
                    />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Request Bar */}
            <div className="p-4 bg-[#0e1420] border-b border-white/10 space-y-3 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* Method Selector */}
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as 'GET' | 'POST')}
                  className="px-3 py-2 bg-[#141b2b] border border-white/20 rounded-lg text-xs font-mono font-bold text-[#F8FAFC] focus:outline-none focus:border-[#4285F4] cursor-pointer"
                  aria-label="HTTP Method"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>

                {/* Endpoint Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder="/api/..."
                    className="w-full px-3.5 py-2 bg-[#141b2b] border border-white/20 rounded-lg text-xs font-mono text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4]"
                    aria-label="API Route URL"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="min-h-[44px] md:min-h-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-95 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-lg transition-all cursor-pointer shadow-md shrink-0"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Fetching...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* POST Body Editor */}
              {method === 'POST' && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span>JSON Request Body:</span>
                    <span>Content-Type: application/json</span>
                  </div>
                  <textarea
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    rows={3}
                    placeholder='{ "slug": "gemini-multimodal-buildathon" }'
                    className="w-full px-3 py-2 bg-[#141b2b] border border-white/15 rounded-lg text-xs font-mono text-[#FCD34D] focus:outline-none focus:border-[#4285F4] resize-none"
                    aria-label="Request Payload Body"
                  />
                </div>
              )}
            </div>

            {/* Response Telemetry Ribbon */}
            <div className="px-5 py-2.5 bg-[#090d14] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
              <div className="flex flex-wrap items-center gap-3">
                {/* Status Pill */}
                {responseState.status !== null ? (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold border ${
                      responseState.status < 400
                        ? 'bg-[#34A853]/15 text-[#4ADE80] border-[#34A853]/40'
                        : 'bg-[#EA4335]/15 text-[#F87171] border-[#EA4335]/40'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        responseState.status < 400 ? 'bg-[#4ADE80]' : 'bg-[#F87171]'
                      }`}
                    />
                    {responseState.status} {responseState.statusText}
                  </span>
                ) : (
                  <span className="text-white/40">Ready to execute</span>
                )}

                {/* Latency */}
                {responseState.latencyMs !== null && (
                  <span className="text-white/60 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-[#60A5FA]" />
                    <span>{responseState.latencyMs} ms</span>
                  </span>
                )}

                {/* Size */}
                {responseState.payloadBytes !== null && (
                  <span className="text-white/40">
                    {(responseState.payloadBytes / 1024).toFixed(1)} KB
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCurl}
                  className="min-h-[44px] md:min-h-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Copy cURL command"
                >
                  {copiedCurl ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="text-[#4ADE80] font-bold">cURL Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/50" />
                      <span>Copy cURL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyResponse}
                  disabled={!responseState.data}
                  className="min-h-[44px] md:min-h-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer disabled:opacity-40"
                  title="Copy JSON Response"
                >
                  {copiedResponse ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="text-[#4ADE80] font-bold">Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/50" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* JSON Response Viewport */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#070a10] min-h-[260px] max-h-[460px]">
              {isLoading ? (
                <div className="h-full min-h-[220px] flex flex-col items-center justify-center gap-3 text-white/50">
                  <div className="w-7 h-7 border-2 border-[#4285F4]/30 border-t-[#4285F4] rounded-full animate-spin" />
                  <span className="font-mono text-xs">
                    Executing stateless Route Handler...
                  </span>
                </div>
              ) : formattedJsonLines.length > 0 ? (
                <div className="space-y-0.5">
                  {formattedJsonLines.map((line, idx) => (
                    <JsonLineRenderer key={idx} line={line} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-white/40 font-mono text-xs space-y-2">
                  <Terminal className="w-8 h-8 text-white/20" />
                  <span>Click &quot;Send Request&quot; or pick a preset to inspect live payload.</span>
                </div>
              )}
            </div>

            {/* Compliance Footer */}
            <div className="px-5 py-2.5 bg-[#0e1420] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#94A3B8] shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80]" />
                <span>Zero Tracking · Zero RSVP Storage · Fictional Sample Content Only</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[#CBD5E1]">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px]">
                  ESC
                </kbd>
                <span>to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
