import * as THREE from "three";
import type { Mouse } from "./Mouse";

export interface AutoDriverOptions {
  enabled: boolean;
  speed: number;
  resumeDelay: number;
  rampDuration: number;
}

/**
 * Drives the mouse autonomously when the user is idle and
 * the cursor is outside the component. Stops immediately
 * when the user moves inside the component.
 */
export class AutoDriver {
  enabled: boolean;
  speed: number;
  resumeDelay: number;
  rampDurationMs: number;

  private mouse: Mouse;
  private getLastInteraction: () => number;

  private active = false;
  private current = new THREE.Vector2(0, 0);
  private target = new THREE.Vector2();
  private lastTime = performance.now();
  private activationTime = 0;
  private readonly margin = 0.2;
  private readonly _tmpDir = new THREE.Vector2();

  constructor(
    mouse: Mouse,
    getLastInteraction: () => number,
    opts: AutoDriverOptions,
  ) {
    this.mouse = mouse;
    this.getLastInteraction = getLastInteraction;
    this.enabled = opts.enabled;
    this.speed = opts.speed;
    this.resumeDelay = opts.resumeDelay;
    this.rampDurationMs = opts.rampDuration * 1000;
    this.pickNewTarget();
  }

  forceStop(): void {
    this.active = false;
    this.mouse.isAutoActive = false;
  }

  update(): void {
    if (!this.enabled) return;

    const now = performance.now();
    const idle = now - this.getLastInteraction();

    // Respect idle/hover guards
    if (idle < this.resumeDelay || this.mouse.isHoverInside) {
      if (this.active) this.forceStop();
      return;
    }

    if (!this.active) {
      this.active = true;
      this.current.copy(this.mouse.coords);
      this.lastTime = now;
      this.activationTime = now;
    }

    this.mouse.isAutoActive = true;

    let dtSec = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (dtSec > 0.2) dtSec = 0.016; // Guard against tab-switch spikes

    const dir = this._tmpDir.subVectors(this.target, this.current);
    const dist = dir.length();

    if (dist < 0.01) {
      this.pickNewTarget();
      return;
    }

    dir.normalize();

    // Ease in at activation
    const ramp =
      this.rampDurationMs > 0
        ? smoothStep(Math.min(1, (now - this.activationTime) / this.rampDurationMs))
        : 1;

    const move = Math.min(this.speed * dtSec * ramp, dist);
    this.current.addScaledVector(dir, move);
    this.mouse.setNormalized(this.current.x, this.current.y);
  }

  private pickNewTarget(): void {
    const r = Math.random;
    this.target.set(
      (r() * 2 - 1) * (1 - this.margin),
      (r() * 2 - 1) * (1 - this.margin),
    );
  }
}

function smoothStep(t: number): number {
  return t * t * (3 - 2 * t);
}
