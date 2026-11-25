'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface TourStep {
  id: string;
  stepLabel: string;
  route: '/' | '/events' | '/team';
  target:
    | 'webgl-prism'
    | 'bento-simulators'
    | 'community-scenes'
    | 'events-controls'
    | 'team-topology'
    | 'diagnostic-tools';
  accentHex: '#4285F4' | '#EA4335' | '#FBBC04' | '#34A853';
  title: string;
  description: string;
}

export const GUIDED_TOUR_STEPS: TourStep[] = [
  {
    id: 'step-1-webgl-prism',
    stepLabel: '01 / 06',
    route: '/',
    target: 'webgl-prism',
    accentHex: '#4285F4',
    title: 'Interactive 3D WebGL < > Monolith',
    description:
      'Drag the chamfered 3D GDG emblem to orbit in 60fps space, toggle CAD Wireframe mode, or switch Light/Dark themes to watch real-time shader lighting adapt.',
  },
  {
    id: 'step-2-bento-simulators',
    stepLabel: '02 / 06',
    route: '/',
    target: 'bento-simulators',
    accentHex: '#EA4335',
    title: '4-Pillar Live Engineering Simulators',
    description:
      'Test interactive Cloud Run request traces, 24-hour Hackathon sprint phases, Study Jam progressions, and live Git PR merges directly inside the architectural grid.',
  },
  {
    id: 'step-3-community-scenes',
    stepLabel: '03 / 06',
    route: '/',
    target: 'community-scenes',
    accentHex: '#FBBC04',
    title: '10-Scene Editorial Vector Studio',
    description:
      'Browse 51 locally engineered vector illustrations side-by-side or expand into the keyboard-navigable fullscreen cinema lightbox.',
  },
  {
    id: 'step-4-events-controls',
    stepLabel: '04 / 06',
    route: '/events',
    target: 'events-controls',
    accentHex: '#34A853',
    title: 'Live /api/events Mode, Calendar Matrix & Scannable QR Passes',
    description:
      'Switch to Live API mode for real latency telemetry, inspect the monthly Calendar Matrix, or open any upcoming session to issue a cryptographic pass with a phone-scannable 4-colour QR code.',
  },
  {
    id: 'step-5-team-topology',
    stepLabel: '05 / 06',
    route: '/team',
    target: 'team-topology',
    accentHex: '#4285F4',
    title: 'Chapter Circuit Topology & Dual-Sided Builder Specs',
    description:
      'Explore live vertical circuit connections, flip builder cards to inspect engineering competencies, or sign in with a fictional Demo ID in the top bar.',
  },
  {
    id: 'step-6-diagnostic-tools',
    stepLabel: '06 / 06',
    route: '/',
    target: 'diagnostic-tools',
    accentHex: '#EA4335',
    title: 'Developer Diagnostic Suite (Shift+X, CLI & /api)',
    description:
      'Press Shift + X anywhere to toggle the Blueprint X-Ray design token inspector, press ~ for the interactive CLI terminal, or inspect live REST responses in the API Drawer.',
  },
];

interface GuidedTourContextType {
  isOpen: boolean;
  currentStepIndex: number;
  currentStep: TourStep;
  steps: TourStep[];
  startTour: (stepIndex?: number) => void;
  closeTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
}

const GuidedTourContext = createContext<GuidedTourContextType | undefined>(undefined);

interface SavedStyles {
  element: HTMLElement;
  outline: string;
  outlineOffset: string;
  borderRadius: string;
}

export function GuidedTourProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const highlightedRef = useRef<SavedStyles | null>(null);

  const currentStep = GUIDED_TOUR_STEPS[currentStepIndex] ?? GUIDED_TOUR_STEPS[0];

  const clearSpotlight = useCallback(() => {
    const saved = highlightedRef.current;
    if (!saved) return;
    saved.element.style.outline = saved.outline;
    saved.element.style.outlineOffset = saved.outlineOffset;
    saved.element.style.borderRadius = saved.borderRadius;
    saved.element.removeAttribute('data-tour-active');
    highlightedRef.current = null;
  }, []);

  const applySpotlight = useCallback(
    (el: HTMLElement) => {
      if (highlightedRef.current?.element === el) {
        return;
      }
      clearSpotlight();
      highlightedRef.current = {
        element: el,
        outline: el.style.outline,
        outlineOffset: el.style.outlineOffset,
        borderRadius: el.style.borderRadius,
      };
      el.style.outline = '2px solid #4285F4';
      el.style.outlineOffset = '6px';
      el.style.borderRadius = '16px';
      el.setAttribute('data-tour-active', 'true');
    },
    [clearSpotlight]
  );

  const startTour = useCallback((stepIndex = 0) => {
    const clamped = Math.max(0, Math.min(stepIndex, GUIDED_TOUR_STEPS.length - 1));
    setCurrentStepIndex(clamped);
    setIsOpen(true);
  }, []);

  const closeTour = useCallback(() => {
    setIsOpen(false);
    clearSpotlight();
  }, [clearSpotlight]);

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev >= GUIDED_TOUR_STEPS.length - 1) {
        setIsOpen(false);
        clearSpotlight();
        return 0;
      }
      return prev + 1;
    });
  }, [clearSpotlight]);

  const prevStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToStep = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, GUIDED_TOUR_STEPS.length - 1));
    setCurrentStepIndex(clamped);
  }, []);

  // Cross-route navigation + 350ms retry loop up to 1.5s to locate & spotlight target
  useEffect(() => {
    if (!isOpen) {
      clearSpotlight();
      return;
    }

    clearSpotlight();

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    if (pathname !== currentStep.route) {
      router.push(currentStep.route);
    }

    const startTime = Date.now();
    const MAX_WAIT_MS = 1500;
    const RETRY_INTERVAL_MS = 350;

    const locateTarget = () => {
      if (cancelled) return;

      // Wait until the route actually matches before spotlighting an off-route element
      if (typeof window !== 'undefined' && window.location.pathname !== currentStep.route) {
        if (Date.now() - startTime < MAX_WAIT_MS) {
          retryTimer = setTimeout(locateTarget, RETRY_INTERVAL_MS);
        }
        return;
      }

      const targetEl = document.querySelector<HTMLElement>(
        `[data-tour="${currentStep.target}"]`
      );

      if (targetEl) {
        applySpotlight(targetEl);
        const prefersReduced =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        targetEl.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'center',
        });
        return;
      }

      if (Date.now() - startTime < MAX_WAIT_MS) {
        retryTimer = setTimeout(locateTarget, RETRY_INTERVAL_MS);
      }
    };

    // Slight initial delay if changing routes so React mounts the target cleanly
    if (pathname !== currentStep.route) {
      retryTimer = setTimeout(locateTarget, RETRY_INTERVAL_MS);
    } else {
      locateTarget();
    }

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      clearSpotlight();
    };
  }, [isOpen, currentStep, pathname, router, applySpotlight, clearSpotlight]);

  // Keyboard navigation: ArrowRight / ArrowLeft / Escape while tour is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable ||
          target.getAttribute?.('contenteditable') === 'true' ||
          Boolean(target.closest('input, textarea, select, [contenteditable="true"]')));

      if (isInput) return;

      // Do not intercept keys if a native modal dialog or custom dialog is currently open
      if (document.querySelector('dialog[open], [role="dialog"]')) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        closeTour();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeTour, nextStep, prevStep]);

  return (
    <GuidedTourContext.Provider
      value={{
        isOpen,
        currentStepIndex,
        currentStep,
        steps: GUIDED_TOUR_STEPS,
        startTour,
        closeTour,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </GuidedTourContext.Provider>
  );
}

export function useGuidedTour() {
  const ctx = useContext(GuidedTourContext);
  if (!ctx) {
    throw new Error('useGuidedTour must be used within a GuidedTourProvider');
  }
  return ctx;
}
