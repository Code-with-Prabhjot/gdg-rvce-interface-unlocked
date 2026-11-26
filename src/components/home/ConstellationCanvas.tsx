'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

interface ConstellationCanvasProps {
  className?: string;
  mousePosRef?: React.RefObject<{ x: number; y: number } | null>;
}

const GOOGLE_COLORS = [
  '#4285F4', // Blue
  '#EA4335', // Red
  '#FBBC04', // Yellow
  '#34A853', // Green
];

export function ConstellationCanvas({ className = '', mousePosRef }: ConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const [isInView, setIsInView] = useState(true);

  // Reference for persistent nodes and animation frame
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const dimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  // Track prefers-reduced-motion
  const prefersReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotionRef.current = mediaQuery.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initialize and resize canvas
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const initNodes = (width: number, height: number) => {
      const nodeCount = Math.min(Math.floor((width * height) / 10500), 48);
      const count = Math.max(nodeCount, 26);
      const newNodes: Node[] = [];

      for (let i = 0; i < count; i++) {
        const color = GOOGLE_COLORS[i % GOOGLE_COLORS.length];
        newNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: 1.6 + Math.random() * 1.8,
          color,
          baseAlpha: 0.55 + Math.random() * 0.35,
        });
      }
      nodesRef.current = newNodes;
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      dimensionsRef.current = { width, height, dpr };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (nodesRef.current.length === 0) {
        initNodes(width, height);
      } else {
        // Clamp existing nodes to new bounds
        nodesRef.current.forEach((n) => {
          n.x = Math.min(Math.max(n.x, 0), width);
          n.y = Math.min(Math.max(n.y, 0), height);
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = theme === 'dark';
    const connectionDist = 110;
    const mouseRadius = 140;

    const render = () => {
      const { width, height, dpr } = dimensionsRef.current;
      if (width === 0 || height === 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const reducedMotion = prefersReducedMotionRef.current;
      const mousePos = mousePosRef?.current;

      // Update positions if not reduced motion
      if (!reducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) {
            n.x = 0;
            n.vx *= -1;
          } else if (n.x > width) {
            n.x = width;
            n.vx *= -1;
          }

          if (n.y < 0) {
            n.y = 0;
            n.vy *= -1;
          } else if (n.y > height) {
            n.y = height;
            n.vy *= -1;
          }

          // Gentle mouse attraction
          if (mousePos && mousePos.x >= 0 && mousePos.y >= 0) {
            const dx = mousePos.x - n.x;
            const dy = mousePos.y - n.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseRadius && dist > 1) {
              const force = (1 - dist / mouseRadius) * 0.18;
              n.x += (dx / dist) * force;
              n.y += (dy / dist) * force;
            }
          }
        }
      }

      // Draw vector links between nodes
      const lineBaseColor = isDark ? '148, 163, 184' : '15, 23, 42';
      const maxLineAlpha = isDark ? 0.16 : 0.11;

      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * maxLineAlpha;
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor connection vectors
      if (mousePos && mousePos.x >= 0 && mousePos.y >= 0) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mousePos.x;
          const dy = nodes[i].y - mousePos.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * (isDark ? 0.35 : 0.22);
            ctx.strokeStyle = `rgba(${isDark ? '66, 133, 244' : '30, 41, 59'}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const alpha = isDark ? n.baseAlpha * 0.9 : n.baseAlpha;

        // Subtle glow in dark mode
        if (isDark) {
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = n.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Architectural ring around selected nodes
        if (i % 4 === 0) {
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 0.75;
          ctx.globalAlpha = alpha * 0.45;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();

      if (!prefersReducedMotionRef.current && isInView) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    if (isInView) {
      if (prefersReducedMotionRef.current) {
        render(); // Render single static frame
      } else {
        animFrameRef.current = requestAnimationFrame(render);
      }
    }

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isInView, theme, mousePosRef]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
