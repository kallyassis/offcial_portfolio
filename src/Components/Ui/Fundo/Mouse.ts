import * as THREE from "three";

export interface MouseOptions {
  autoIntensity: number;
  takeoverDuration: number;
  onInteract?: () => void;
}

/**
 * Tracks mouse / touch position and computes per-frame diff.
 * Also manages the smooth "takeover" transition when the user
 * reclaims control from the auto-driver.
 */
export class Mouse {
  mouseMoved = false;
  coords = new THREE.Vector2();
  coords_old = new THREE.Vector2();
  diff = new THREE.Vector2();

  isHoverInside = false;
  hasUserControl = false;
  isAutoActive = false;
  autoIntensity: number;
  takeoverDuration: number;
  onInteract: (() => void) | undefined;

  private takeoverActive = false;
  private takeoverStartTime = 0;
  private takeoverFrom = new THREE.Vector2();
  private takeoverTo = new THREE.Vector2();

  private timer: ReturnType<typeof setTimeout> | null = null;
  private container: HTMLElement | null = null;
  private listenerTarget: Window | null = null;
  private docTarget: Document | null = null;

  // Stable bound handlers so addEventListener/removeEventListener match
  private readonly _onMouseMove = this.handleMouseMove.bind(this);
  private readonly _onTouchStart = this.handleTouchStart.bind(this);
  private readonly _onTouchMove = this.handleTouchMove.bind(this);
  private readonly _onTouchEnd = this.handleTouchEnd.bind(this);
  private readonly _onDocLeave = this.handleDocLeave.bind(this);

  constructor(opts: MouseOptions) {
    this.autoIntensity = opts.autoIntensity;
    this.takeoverDuration = opts.takeoverDuration;
    this.onInteract = opts.onInteract;
  }

  init(container: HTMLElement): void {
    this.container = container;
    this.docTarget = container.ownerDocument;
    this.listenerTarget = this.docTarget?.defaultView ?? window;

    this.listenerTarget.addEventListener("mousemove", this._onMouseMove);
    this.listenerTarget.addEventListener("touchstart", this._onTouchStart, { passive: true });
    this.listenerTarget.addEventListener("touchmove", this._onTouchMove, { passive: true });
    this.listenerTarget.addEventListener("touchend", this._onTouchEnd);
    this.docTarget?.addEventListener("mouseleave", this._onDocLeave);
  }

  dispose(): void {
    this.listenerTarget?.removeEventListener("mousemove", this._onMouseMove);
    this.listenerTarget?.removeEventListener("touchstart", this._onTouchStart);
    this.listenerTarget?.removeEventListener("touchmove", this._onTouchMove);
    this.listenerTarget?.removeEventListener("touchend", this._onTouchEnd);
    this.docTarget?.removeEventListener("mouseleave", this._onDocLeave);

    this.listenerTarget = null;
    this.docTarget = null;
    this.container = null;
  }

  /** Convert client-space coords to normalized [-1, 1] space and store them. */
  setFromClientXY(clientX: number, clientY: number): void {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;
    this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
    this.mouseMoved = true;

    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = setTimeout(() => { this.mouseMoved = false; }, 100);
  }

  /** Set coords directly in normalized [-1, 1] space (used by AutoDriver). */
  setNormalized(nx: number, ny: number): void {
    this.coords.set(nx, ny);
    this.mouseMoved = true;
  }

  update(): void {
    if (this.takeoverActive) {
      const elapsed = performance.now() - this.takeoverStartTime;
      const t = elapsed / (this.takeoverDuration * 1000);

      if (t >= 1) {
        this.takeoverActive = false;
        this.coords.copy(this.takeoverTo);
        this.coords_old.copy(this.coords);
        this.diff.set(0, 0);
      } else {
        // Smooth-step
        const k = t * t * (3 - 2 * t);
        this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
      }
    }

    this.diff.subVectors(this.coords, this.coords_old);
    this.coords_old.copy(this.coords);

    if (this.coords_old.x === 0 && this.coords_old.y === 0) {
      this.diff.set(0, 0);
    }

    if (this.isAutoActive && !this.takeoverActive) {
      this.diff.multiplyScalar(this.autoIntensity);
    }
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private isInsideContainer(clientX: number, clientY: number): boolean {
    if (!this.container) return false;
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return false;
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  private beginUserTakeover(clientX: number, clientY: number): void {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;

    this.takeoverFrom.copy(this.coords);
    this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
    this.takeoverStartTime = performance.now();
    this.takeoverActive = true;
    this.hasUserControl = true;
    this.isAutoActive = false;
  }

  private handleMouseMove(e: MouseEvent): void {
    this.isHoverInside = this.isInsideContainer(e.clientX, e.clientY);
    if (!this.isHoverInside) return;

    this.onInteract?.();

    // Smooth handoff from auto → user
    if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
      this.beginUserTakeover(e.clientX, e.clientY);
      return;
    }

    this.setFromClientXY(e.clientX, e.clientY);
    this.hasUserControl = true;
  }

  private handleTouchStart(e: TouchEvent): void {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    this.isHoverInside = this.isInsideContainer(t.clientX, t.clientY);
    if (!this.isHoverInside) return;

    this.onInteract?.();
    this.setFromClientXY(t.clientX, t.clientY);
    this.hasUserControl = true;
  }

  private handleTouchMove(e: TouchEvent): void {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    this.isHoverInside = this.isInsideContainer(t.clientX, t.clientY);
    if (!this.isHoverInside) return;

    this.onInteract?.();
    this.setFromClientXY(t.clientX, t.clientY);
  }

  private handleTouchEnd(): void {
    this.isHoverInside = false;
  }

  private handleDocLeave(): void {
    this.isHoverInside = false;
  }
}
