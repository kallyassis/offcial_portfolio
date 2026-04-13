import React, { useEffect, useRef } from "react";
import { WebGLManager } from "./WebGLManager";
import type { LiquidEtherProps } from "./types";
import "./LiquidEther.css";

const DEFAULT_COLORS = ["#5227FF", "#FF9FFC", "#B19EEF"];

const DEFAULT_PROPS = {
  mouseForce: 20,
  cursorSize: 100,
  isViscous: false,
  viscous: 30,
  iterationsViscous: 32,
  iterationsPoisson: 32,
  dt: 0.014,
  BFECC: true,
  resolution: 0.5,
  isBounce: false,
  colors: DEFAULT_COLORS,
  style: {} as React.CSSProperties,
  className: "",
  autoDemo: true,
  autoSpeed: 0.5,
  autoIntensity: 2.2,
  takeoverDuration: 0.25,
  autoResumeDelay: 1000,
  autoRampDuration: 0.6,
} satisfies Required<LiquidEtherProps>;

/**
 * LiquidEther — WebGL fluid simulation component.
 *
 * Split into focused modules:
 *   shaders.ts      — GLSL source strings
 *   types.ts        — shared TypeScript interfaces
 *   Common.ts       — WebGL renderer + clock
 *   Mouse.ts        — pointer input & takeover logic
 *   AutoDriver.ts   — idle auto-animation
 *   passes.ts       — individual shader passes (Advection, Poisson, …)
 *   Simulation.ts   — FBO management & per-frame simulation step
 *   WebGLManager.ts — top-level coordinator
 */
export default function LiquidEther(props: LiquidEtherProps): React.ReactElement {
  const resolved = { ...DEFAULT_PROPS, ...props } as Required<LiquidEtherProps>;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const managerRef = useRef<WebGLManager | null>(null);

  // ── Mount / unmount ────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const manager = new WebGLManager(container, resolved);
    managerRef.current = manager;
    manager.start();

    // Pause when scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => manager.setVisible(entry.isIntersecting && entry.intersectionRatio > 0),
      { threshold: [0, 0.01, 0.1] },
    );
    io.observe(container);

    // Trigger resize when container dimensions change
    let resizeRaf: number | null = null;
    const ro = new ResizeObserver(() => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => managerRef.current?.["resize"]());
    });
    ro.observe(container);

    return () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      manager.dispose();
      managerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally runs once — prop changes handled below

  // ── Prop sync (no remount) ─────────────────────────────────────────────────
  useEffect(() => {
    managerRef.current?.applyProps(resolved);
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={`liquid-ether-container ${props.className ?? ""}`.trim()}
      style={{ position: "relative", overflow: "hidden", ...props.style }}
    />
  );
}