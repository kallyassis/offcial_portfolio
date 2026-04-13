import * as THREE from "three";

/**
 * Holds shared WebGL renderer state (size, clock, renderer instance).
 * Instantiated once per LiquidEther mount, passed around by reference.
 */
export class Common {
  width = 0;
  height = 0;
  aspect = 1;
  pixelRatio = 1;
  time = 0;
  delta = 0;

  container: HTMLElement | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  clock: THREE.Clock | null = null;

  init(container: HTMLElement): void {
    this.container = container;
    this.pixelRatio = Math.min(window.devicePixelRatio ?? 1, 2);
    this.resize();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.autoClear = false;
    this.renderer.setClearColor(new THREE.Color(0x000000), 0);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height);

    const canvas = this.renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    this.clock = new THREE.Clock();
    this.clock.start();
  }

  resize(): void {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.width = Math.max(1, Math.floor(rect.width));
    this.height = Math.max(1, Math.floor(rect.height));
    this.aspect = this.width / this.height;
    this.renderer?.setSize(this.width, this.height, false);
  }

  update(): void {
    if (!this.clock) return;
    this.delta = this.clock.getDelta();
    this.time += this.delta;
  }

  dispose(): void {
    if (this.renderer) {
      const canvas = this.renderer.domElement;
      canvas.parentNode?.removeChild(canvas);
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }
    this.clock = null;
    this.container = null;
  }
}
