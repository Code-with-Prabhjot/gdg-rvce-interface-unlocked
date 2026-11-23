'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxOffset?: number; // Maximum offset in pixels (defaults to 6px)
}

/**
 * MagneticWrapper
 * Subtle spring-physics magnetic pull micro-interaction for primary action elements.
 * 
 * Safety & Accessibility:
 * - Disabled automatically when `useReducedMotion()` is true.
 * - Disabled automatically on touch / coarse pointer screens (`pointer: coarse`).
 * - Smooth physics via `useSpring` (stiffness: 260, damping: 20, mass: 0.5).
 */
export function MagneticWrapper({
  children,
  className = '',
  maxOffset = 6,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);

  // Raw cursor displacement motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calibrated spring physics for smooth return snap
  const springConfig = { stiffness: 260, damping: 20, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Detect touchscreens / coarse pointer devices to prevent mobile displacement glitches
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(pointer: coarse)');
      setIsCoarse(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsCoarse(e.matches);
      };

      mediaQuery.addEventListener?.('change', handleChange);
      return () => mediaQuery.removeEventListener?.('change', handleChange);
    }
  }, []);

  const shouldDisableMotion = prefersReducedMotion || isCoarse;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldDisableMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Normalize displacement ratio and clamp within [-maxOffset, maxOffset]
    const halfWidth = rect.width / 2 || 1;
    const halfHeight = rect.height / 2 || 1;

    const pullX = Math.max(-maxOffset, Math.min(maxOffset, (distanceX / halfWidth) * maxOffset));
    const pullY = Math.max(-maxOffset, Math.min(maxOffset, (distanceY / halfHeight) * maxOffset));

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: shouldDisableMotion ? 0 : springX,
        y: shouldDisableMotion ? 0 : springY,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
