import * as THREE from "three";
import type { Common } from "./Common";
import type { Mouse } from "./Mouse";
import type { SimOptions, FBOMap } from "./types";
import { Advection, ExternalForce, Viscous, Divergence, Poisson, Pressure } from "./passes";

const DEFAULT_OPTIONS: SimOptions = {
  iterations_poisson: 32,
  iterations_viscous: 32,
  mouse_force: 20,
  resolution: 0.5,
  cursor_size: 100,
  viscous: 30,
  isBounce: false,
  dt: 0.014,
  isViscous: false,
  BFECC: true,
};

/**
 * Owns all FBOs and shader passes that implement the fluid simulation.
 * Call `update()` every frame after Common.update().
 */
export class Simulation {
  options: SimOptions;
  fboSize = new THREE.Vector2();
  cellScale = new THREE.Vector2();
  boundarySpace = new THREE.Vector2();

  private fbos!: FBOMap;
  private advection!: Advection;
  private externalForce!: ExternalForce;
  private viscous!: Viscous;
  private divergence!: Divergence;
  private poisson!: Poisson;
  private pressure!: Pressure;
  private common: Common;

  constructor(common: Common, options?: Partial<SimOptions>) {
    this.common = common;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.calcSize();
    this.fbos = this.createFBOs();
    this.createPasses();
  }

  get vel0Texture(): THREE.Texture {
    return this.fbos.vel_0.texture;
  }

  resize(): void {
    this.calcSize();
    for (const fbo of Object.values(this.fbos)) {
      fbo.setSize(this.fboSize.x, this.fboSize.y);
    }
  }

  update(mouse: Mouse): void {
    this.boundarySpace.copy(this.options.isBounce ? new THREE.Vector2(0, 0) : this.cellScale);

    this.advection.update(this.common, {
      dt: this.options.dt,
      isBounce: this.options.isBounce,
      BFECC: this.options.BFECC,
    });

    this.externalForce.update(this.common, mouse, {
      mouseForce: this.options.mouse_force,
      cursorSize: this.options.cursor_size,
      cellScale: this.cellScale,
    });

    let vel: THREE.WebGLRenderTarget = this.fbos.vel_1;

    if (this.options.isViscous) {
      const result = this.viscous.update(this.common, {
        viscous: this.options.viscous,
        iterations: this.options.iterations_viscous,
        dt: this.options.dt,
      });
      if (result) vel = result;
    }

    this.divergence.update(this.common, vel);

    const pressure = this.poisson.update(this.common, {
      iterations: this.options.iterations_poisson,
    });

    if (pressure) {
      this.pressure.update(this.common, vel, pressure);
    }
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private calcSize(): void {
    const w = Math.max(1, Math.round(this.options.resolution * this.common.width));
    const h = Math.max(1, Math.round(this.options.resolution * this.common.height));
    this.cellScale.set(1 / w, 1 / h);
    this.fboSize.set(w, h);
  }

  private createFBOs(): FBOMap {
    const type: THREE.TextureDataType = /iPad|iPhone|iPod/i.test(navigator.userAgent)
      ? THREE.HalfFloatType
      : THREE.FloatType;

    const opts = {
      type,
      depthBuffer: false,
      stencilBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    } as const;

    const make = (): THREE.WebGLRenderTarget =>
      new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);

    return {
      vel_0: make(),
      vel_1: make(),
      vel_viscous0: make(),
      vel_viscous1: make(),
      div: make(),
      pressure_0: make(),
      pressure_1: make(),
    };
  }

  private createPasses(): void {
    const { fbos, cellScale, boundarySpace, options: o } = this;

    this.advection = new Advection({
      cellScale,
      fboSize: this.fboSize,
      dt: o.dt,
      src: fbos.vel_0,
      dst: fbos.vel_1,
    });

    this.externalForce = new ExternalForce({
      cellScale,
      cursorSize: o.cursor_size,
      dst: fbos.vel_1,
    });

    this.viscous = new Viscous({
      cellScale,
      boundarySpace,
      viscous: o.viscous,
      src: fbos.vel_1,
      dst: fbos.vel_viscous1,
      dst_: fbos.vel_viscous0,
      dt: o.dt,
    });

    this.divergence = new Divergence({
      cellScale,
      boundarySpace,
      src: fbos.vel_viscous0,
      dst: fbos.div,
      dt: o.dt,
    });

    this.poisson = new Poisson({
      cellScale,
      boundarySpace,
      src: fbos.div,
      dst: fbos.pressure_1,
      dst_: fbos.pressure_0,
    });

    this.pressure = new Pressure({
      cellScale,
      boundarySpace,
      src_p: fbos.pressure_0,
      src_v: fbos.vel_viscous0,
      dst: fbos.vel_0,
      dt: o.dt,
    });
  }
}
