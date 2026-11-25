'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

/* ================================================================
   WebGLPrismCanvas — Studio-grade 60fps Three.js < > Monolith
   ================================================================
   • Raw THREE.WebGLRenderer — no @react-three/fiber (React 19 safe)
   • ResizeObserver + IntersectionObserver for perf
   • Full GPU disposal on unmount
   • GLSL blueprint floor shader
   • 4-colour orbiting satellites
   • Drag-to-orbit w/ momentum damping
   • Dual-theme lighting sync (no context recreation)
   • Wireframe + resetView props
   ================================================================ */

// ── Google brand colours ──
const BLUE = '#4285F4';
const RED = '#EA4335';
const YELLOW = '#FBBC04';
const GREEN = '#34A853';

// ── GLSL: Blueprint floor shader ──
const FLOOR_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FLOOR_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;

  float circle(vec2 uv, float r, float blur) {
    float d = length(uv - 0.5);
    return 1.0 - smoothstep(r - blur, r + blur, d);
  }

  void main() {
    vec2 c = vUv - 0.5;
    float dist = length(c);

    // Radial edge fade
    float edgeFade = 1.0 - smoothstep(0.3, 0.5, dist);

    // Concentric radar rings (5 rings)
    float rings = 0.0;
    for (float i = 1.0; i <= 5.0; i += 1.0) {
      float r = i * 0.09;
      float ring = smoothstep(r - 0.003, r, dist) - smoothstep(r, r + 0.003, dist);
      rings += ring * 0.6;
    }

    // Radial coordinate ticks (every 30 degrees = 12 ticks)
    float angle = atan(c.y, c.x);
    float tickAngle = mod(angle + 3.14159265, 3.14159265 / 6.0);
    float tick = 1.0 - smoothstep(0.0, 0.015, abs(tickAngle - 3.14159265 / 12.0));
    tick *= step(0.06, dist) * step(dist, 0.44);
    tick *= 0.3;

    // Animated pulse wave expanding outward
    float pulse = sin(dist * 30.0 - uTime * 2.5) * 0.5 + 0.5;
    pulse *= smoothstep(0.0, 0.1, dist) * (1.0 - smoothstep(0.35, 0.5, dist));
    pulse *= 0.15;

    float intensity = (rings + tick + pulse) * edgeFade;

    gl_FragColor = vec4(uColor, intensity * uOpacity);
  }
`;

// ── Props ──
interface WebGLPrismCanvasProps {
  wireframeMode: boolean;
  resetTrigger: number;
  reducedMotion: boolean;
}

// ── Scene state type ──
interface SceneState {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  chevronGroup: THREE.Group;
  satelliteGroup: THREE.Group;
  floorMaterial: THREE.ShaderMaterial;
  armMaterials: THREE.MeshPhysicalMaterial[];
  edgeLines: THREE.LineSegments[];
  satellites: THREE.Mesh[];
  orbitalRings: THREE.Line[];
  keyLight: THREE.DirectionalLight;
  rimLights: THREE.PointLight[];
  ambientLight: THREE.AmbientLight;
  clock: THREE.Clock;
  isDragging: boolean;
  prevPointer: { x: number; y: number };
  rotVelX: number;
  rotVelY: number;
  targetRotX: number;
  targetRotY: number;
  hoveredChevron: 'left' | 'right' | null;
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
  leftGroup: THREE.Group;
  rightGroup: THREE.Group;
  resetAnimating: boolean;
  resetStart: number;
  resetFromX: number;
  resetFromY: number;
}

// ── Build a single chevron arm shape (2D profile) ──
function createArmShape(
  tipX: number, tipY: number,
  endX: number, endY: number,
  thickness: number
): THREE.Shape {
  const shape = new THREE.Shape();
  // Direction from tip to end
  const dx = endX - tipX;
  const dy = endY - tipY;
  const len = Math.sqrt(dx * dx + dy * dy);
  // Normal
  const nx = -dy / len * thickness;
  const ny = dx / len * thickness;

  shape.moveTo(tipX, tipY);
  shape.lineTo(endX + nx, endY + ny);
  shape.lineTo(endX - nx, endY - ny);
  shape.closePath();
  return shape;
}

export function WebGLPrismCanvas({ wireframeMode, resetTrigger, reducedMotion }: WebGLPrismCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Persist mutable refs across renders without re-creating the scene
  const sceneRef = useRef<SceneState | null>(null);

  const animFrameRef = useRef<number | null>(null);
  const isInViewRef = useRef(true);
  const wireframeModeRef = useRef(wireframeMode);
  const themeRef = useRef(theme);
  const reducedMotionRef = useRef(reducedMotion);

  // Keep refs in sync with props
  wireframeModeRef.current = wireframeMode;
  themeRef.current = theme;
  reducedMotionRef.current = reducedMotion;

  // ─── Detect WebGL capability ───
  const supportsWebGL = useCallback((): boolean => {
    try {
      const testCanvas = document.createElement('canvas');
      const ctx = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      return !!ctx;
    } catch {
      return false;
    }
  }, []);

  // ─── Theme-dependent lighting update ───
  const updateThemeLighting = useCallback((s: SceneState, isDark: boolean) => {
    // Key light
    s.keyLight.intensity = isDark ? 1.2 : 1.8;
    s.keyLight.color.set(isDark ? '#c8d6e5' : '#ffffff');

    // Ambient
    s.ambientLight.intensity = isDark ? 0.35 : 0.5;
    s.ambientLight.color.set(isDark ? '#1e293b' : '#f1f5f9');

    // Rim lights intensity
    s.rimLights.forEach(l => { l.intensity = isDark ? 0.7 : 0.45; });

    // Floor shader opacity
    s.floorMaterial.uniforms.uOpacity.value = isDark ? 0.55 : 0.4;
    s.floorMaterial.uniforms.uColor.value.set(BLUE);
  }, []);

  // ─── Wireframe edge visibility ───
  const updateWireframeEdges = useCallback((s: SceneState, show: boolean) => {
    s.edgeLines.forEach(line => {
      line.visible = show;
      if (show) {
        (line.material as THREE.LineBasicMaterial).opacity = 1.0;
      }
    });

    // In wireframe mode, make arm materials semi-transparent
    s.armMaterials.forEach(mat => {
      mat.transparent = true;
      mat.opacity = show ? 0.35 : 1.0;
      mat.wireframe = false; // We use EdgesGeometry instead
    });
  }, []);

  // ─── Main init + loop ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!supportsWebGL()) return; // Fallback handled by parent
    if (sceneRef.current) return; // Already initialised

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'none';

    // ── Scene + Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.6, 6.8);
    camera.lookAt(0, -0.2, 0);

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight('#f1f5f9', 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#ffffff', 1.8);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    // 4-colour rim point lights
    const rimColours = [BLUE, RED, YELLOW, GREEN];
    const rimPositions = [
      new THREE.Vector3(-3, 1, 2),
      new THREE.Vector3(3, 2, -1),
      new THREE.Vector3(-2, -1, 3),
      new THREE.Vector3(2, -1, -2),
    ];
    const rimLights: THREE.PointLight[] = rimColours.map((col, i) => {
      const light = new THREE.PointLight(col, 0.45, 12);
      light.position.copy(rimPositions[i]);
      scene.add(light);
      return light;
    });

    // ── Chevron Monolith ──
    const chevronGroup = new THREE.Group();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
    };

    // Left < bracket — upper arm (Red) & lower arm (Blue)
    const leftGroup = new THREE.Group();

    const leftUpperShape = createArmShape(
      -0.5, 0,  // tip (vertex of <)
      0.9, 1.2,  // end upper
      0.18
    );
    const leftLowerShape = createArmShape(
      -0.5, 0,  // tip
      0.9, -1.2, // end lower
      0.18
    );

    const leftUpperGeo = new THREE.ExtrudeGeometry(leftUpperShape, extrudeSettings);
    const leftLowerGeo = new THREE.ExtrudeGeometry(leftLowerShape, extrudeSettings);

    // Center the extrude depth
    leftUpperGeo.translate(0, 0, -0.275);
    leftLowerGeo.translate(0, 0, -0.275);

    const matRed = new THREE.MeshPhysicalMaterial({
      color: RED,
      roughness: 0.24,
      metalness: 0.15,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });
    const matBlue = new THREE.MeshPhysicalMaterial({
      color: BLUE,
      roughness: 0.24,
      metalness: 0.15,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });

    const leftUpperMesh = new THREE.Mesh(leftUpperGeo, matRed);
    const leftLowerMesh = new THREE.Mesh(leftLowerGeo, matBlue);
    leftGroup.add(leftUpperMesh, leftLowerMesh);
    leftGroup.position.x = -1.1;

    // Right > bracket — upper arm (Green) & lower arm (Yellow)
    const rightGroup = new THREE.Group();

    const rightUpperShape = createArmShape(
      0.5, 0,   // tip (vertex of >)
      -0.9, 1.2, // end upper
      0.18
    );
    const rightLowerShape = createArmShape(
      0.5, 0,   // tip
      -0.9, -1.2,// end lower
      0.18
    );

    const rightUpperGeo = new THREE.ExtrudeGeometry(rightUpperShape, extrudeSettings);
    const rightLowerGeo = new THREE.ExtrudeGeometry(rightLowerShape, extrudeSettings);

    rightUpperGeo.translate(0, 0, -0.275);
    rightLowerGeo.translate(0, 0, -0.275);

    const matGreen = new THREE.MeshPhysicalMaterial({
      color: GREEN,
      roughness: 0.24,
      metalness: 0.15,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });
    const matYellow = new THREE.MeshPhysicalMaterial({
      color: YELLOW,
      roughness: 0.24,
      metalness: 0.15,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });

    const rightUpperMesh = new THREE.Mesh(rightUpperGeo, matGreen);
    const rightLowerMesh = new THREE.Mesh(rightLowerGeo, matYellow);
    rightGroup.add(rightUpperMesh, rightLowerMesh);
    rightGroup.position.x = 1.1;

    chevronGroup.add(leftGroup, rightGroup);

    // Store arm materials for wireframe toggling
    const armMaterials = [matRed, matBlue, matGreen, matYellow];

    // ── Wireframe edge overlays ──
    const allMeshes = [leftUpperMesh, leftLowerMesh, rightUpperMesh, rightLowerMesh];
    const edgeColors = [RED, BLUE, GREEN, YELLOW];
    const edgeLines: THREE.LineSegments[] = allMeshes.map((mesh, i) => {
      const edgesGeo = new THREE.EdgesGeometry(mesh.geometry, 15);
      const edgesMat = new THREE.LineBasicMaterial({
        color: edgeColors[i],
        transparent: true,
        opacity: 1.0,
        linewidth: 1,
      });
      const lineSegments = new THREE.LineSegments(edgesGeo, edgesMat);
      lineSegments.visible = false; // Hidden by default
      mesh.add(lineSegments);
      return lineSegments;
    });

    // Position the whole chevron group
    chevronGroup.position.y = 0.3;
    chevronGroup.rotation.set(0.12, -0.28, 0);
    scene.add(chevronGroup);

    // ── GLSL Blueprint Floor ──
    const floorGeo = new THREE.CircleGeometry(4.2, 64);
    const floorMaterial = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERT,
      fragmentShader: FLOOR_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.4 },
        uColor: { value: new THREE.Color(BLUE) },
      },
    });
    const floor = new THREE.Mesh(floorGeo, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.65;
    scene.add(floor);

    // ── 4 Orbiting Satellites ──
    const satelliteGroup = new THREE.Group();
    const satColors = [BLUE, RED, YELLOW, GREEN];
    const satGeos = [
      new THREE.OctahedronGeometry(0.14, 0),
      new THREE.IcosahedronGeometry(0.12, 0),
      new THREE.OctahedronGeometry(0.13, 0),
      new THREE.IcosahedronGeometry(0.11, 0),
    ];
    const satellites: THREE.Mesh[] = [];
    const orbitalRings: THREE.Line[] = [];

    satColors.forEach((col, i) => {
      const satMat = new THREE.MeshPhysicalMaterial({
        color: col,
        roughness: 0.3,
        metalness: 0.2,
        clearcoat: 0.6,
        emissive: col,
        emissiveIntensity: 0.15,
      });
      const sat = new THREE.Mesh(satGeos[i], satMat);
      satellites.push(sat);
      satelliteGroup.add(sat);

      // Orbital ring (hair-thin)
      const ringPoints: THREE.Vector3[] = [];
      const a = 2.4 + i * 0.25;
      const b = 1.6 + i * 0.15;
      for (let t = 0; t <= 64; t++) {
        const angle = (t / 64) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(
          Math.cos(angle) * a,
          0,
          Math.sin(angle) * b
        ));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.12,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      // Tilt each orbital ring
      ring.rotation.x = 0.2 + i * 0.15;
      ring.rotation.z = i * 0.4;
      ring.position.y = -0.2;
      orbitalRings.push(ring);
      satelliteGroup.add(ring);
    });

    scene.add(satelliteGroup);

    // ── Interaction state ──
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const clock = new THREE.Clock();

    const state: SceneState = {
      renderer, scene, camera, chevronGroup, satelliteGroup,
      floorMaterial, armMaterials, edgeLines, satellites, orbitalRings,
      keyLight, rimLights, ambientLight, clock,
      isDragging: false,
      prevPointer: { x: 0, y: 0 },
      rotVelX: 0, rotVelY: 0,
      targetRotX: 0.12, targetRotY: -0.28,
      hoveredChevron: null,
      raycaster, pointer,
      leftGroup, rightGroup,
      resetAnimating: false,
      resetStart: 0,
      resetFromX: 0, resetFromY: 0,
    };

    sceneRef.current = state;

    // Apply initial theme
    const isDark = themeRef.current === 'dark';
    updateThemeLighting(state, isDark);

    // ── Resize handling ──
    const handleResize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // ── IntersectionObserver for offscreen pause ──
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => { isInViewRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // ── Pointer events ──
    const onPointerDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.prevPointer = { x: e.clientX, y: e.clientY };
      state.rotVelX = 0;
      state.rotVelY = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (state.isDragging) {
        const dx = e.clientX - state.prevPointer.x;
        const dy = e.clientY - state.prevPointer.y;
        state.rotVelY = dx * 0.005;
        state.rotVelX = dy * 0.005;
        state.targetRotY += state.rotVelY;
        state.targetRotX += state.rotVelX;
        state.prevPointer = { x: e.clientX, y: e.clientY };
      }

      // Raycast for hover
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const leftHits = raycaster.intersectObjects(leftGroup.children, true);
      const rightHits = raycaster.intersectObjects(rightGroup.children, true);

      if (leftHits.length > 0) {
        state.hoveredChevron = 'left';
      } else if (rightHits.length > 0) {
        state.hoveredChevron = 'right';
      } else {
        state.hoveredChevron = null;
      }
    };
    const onPointerUp = () => {
      state.isDragging = false;
    };

    const el = renderer.domElement;
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointerleave', onPointerUp);

    // ── Render loop ──
    const HERO_ROT_X = 0.12;
    const HERO_ROT_Y = -0.28;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isInViewRef.current) return;

      const dt = state.clock.getDelta();
      const elapsed = state.clock.getElapsedTime();

      // Update floor shader time
      state.floorMaterial.uniforms.uTime.value = elapsed;

      // Theme sync (every frame is cheap — just comparisons)
      const curDark = themeRef.current === 'dark';
      updateThemeLighting(state, curDark);

      // Wireframe edges sync
      updateWireframeEdges(state, wireframeModeRef.current);

      // ── Rotation: either reset animation or drag/idle ──
      if (state.resetAnimating) {
        const t = Math.min((elapsed - state.resetStart) / 0.8, 1);
        const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
        state.targetRotX = state.resetFromX + (HERO_ROT_X - state.resetFromX) * ease;
        state.targetRotY = state.resetFromY + (HERO_ROT_Y - state.resetFromY) * ease;
        if (t >= 1) state.resetAnimating = false;
      } else if (!state.isDragging) {
        // Momentum damping
        state.rotVelX *= 0.92;
        state.rotVelY *= 0.92;
        state.targetRotY += state.rotVelX * 0.5;
        state.targetRotX += state.rotVelY * 0.5;

        // Gentle idle rotation
        if (!reducedMotionRef.current) {
          state.targetRotY += dt * 0.08;
        }
      }

      // Smooth interpolation to target
      const lerpFactor = 1 - Math.pow(0.05, dt);
      chevronGroup.rotation.x += (state.targetRotX - chevronGroup.rotation.x) * lerpFactor;
      chevronGroup.rotation.y += (state.targetRotY - chevronGroup.rotation.y) * lerpFactor;

      // ── Hover scale & emissive ──
      const targetLeftScale = state.hoveredChevron === 'left' ? 1.04 : 1.0;
      const targetRightScale = state.hoveredChevron === 'right' ? 1.04 : 1.0;
      const hoverLerp = 1 - Math.pow(0.01, dt);

      leftGroup.scale.lerp(new THREE.Vector3(targetLeftScale, targetLeftScale, targetLeftScale), hoverLerp);
      rightGroup.scale.lerp(new THREE.Vector3(targetRightScale, targetRightScale, targetRightScale), hoverLerp);

      // Emissive boost on hover
      const leftEmissive = state.hoveredChevron === 'left' ? 0.15 : 0;
      const rightEmissive = state.hoveredChevron === 'right' ? 0.15 : 0;
      matRed.emissiveIntensity = leftEmissive;
      matBlue.emissiveIntensity = leftEmissive;
      matRed.emissive.set(leftEmissive > 0 ? RED : '#000000');
      matBlue.emissive.set(leftEmissive > 0 ? BLUE : '#000000');
      matGreen.emissiveIntensity = rightEmissive;
      matYellow.emissiveIntensity = rightEmissive;
      matGreen.emissive.set(rightEmissive > 0 ? GREEN : '#000000');
      matYellow.emissive.set(rightEmissive > 0 ? YELLOW : '#000000');

      // ── Float/bob the chevron ──
      if (!reducedMotionRef.current) {
        chevronGroup.position.y = 0.3 + Math.sin(elapsed * 0.8) * 0.08;
      }

      // ── Orbiting satellites ──
      if (!reducedMotionRef.current) {
        satellites.forEach((sat, i) => {
          const speed = 0.3 + i * 0.08;
          const a = 2.4 + i * 0.25;
          const b = 1.6 + i * 0.15;
          const angle = elapsed * speed + (i * Math.PI / 2);
          const tiltX = 0.2 + i * 0.15;
          const tiltZ = i * 0.4;

          // Position on tilted ellipse
          const x = Math.cos(angle) * a;
          const z = Math.sin(angle) * b;
          const y = -0.2;

          // Apply ring tilt rotation manually
          const cosX = Math.cos(tiltX);
          const sinX = Math.sin(tiltX);
          const cosZ = Math.cos(tiltZ);
          const sinZ = Math.sin(tiltZ);

          // Rotate around X axis
          const y2 = y * cosX - z * sinX;
          const z2 = y * sinX + z * cosX;
          // Rotate around Z axis
          const x3 = x * cosZ - y2 * sinZ;
          const y3 = x * sinZ + y2 * cosZ;

          sat.position.set(x3, y3, z2);
          sat.rotation.x = elapsed * 1.5;
          sat.rotation.y = elapsed * 2;
        });
      }

      renderer.render(scene, camera);
    };

    if (!reducedMotionRef.current) {
      animate();
    } else {
      // Single static render
      updateWireframeEdges(state, wireframeModeRef.current);
      renderer.render(scene, camera);
    }

    // ── Cleanup ──
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointerleave', onPointerUp);

      // GPU disposal
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        } else if (obj instanceof THREE.Line || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            (obj.material as THREE.Material).dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── React to wireframeMode changes after init ───
  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;
    updateWireframeEdges(s, wireframeMode);
    if (reducedMotionRef.current) {
      s.renderer.render(s.scene, s.camera);
    }
  }, [wireframeMode, updateWireframeEdges]);

  // ─── React to theme changes after init ───
  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;
    updateThemeLighting(s, theme === 'dark');
    if (reducedMotionRef.current) {
      s.renderer.render(s.scene, s.camera);
    }
  }, [theme, updateThemeLighting]);

  // ─── React to resetTrigger ───
  useEffect(() => {
    const s = sceneRef.current;
    if (!s || resetTrigger === 0) return;
    s.resetAnimating = true;
    s.resetStart = s.clock.getElapsedTime();
    s.resetFromX = s.targetRotX;
    s.resetFromY = s.targetRotY;
    s.rotVelX = 0;
    s.rotVelY = 0;
  }, [resetTrigger]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10"
      style={{ cursor: 'grab' }}
      aria-label="Interactive 3D GDG chevron sculpture — drag to orbit"
      role="img"
    />
  );
}
