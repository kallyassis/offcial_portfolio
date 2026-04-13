import * as THREE from "three";
import { Common } from "./Common";
import { Mouse } from "./Mouse";
import { AutoDriver } from "./AutoDriver";
import { Simulation } from "./Simulation";
import { face_vert, color_frag } from "./shaders";
import type { LiquidEtherProps } from "./types";

function makePaletteTexture(stops: string[]): THREE.DataTexture {
  const arr =
    stops.length === 0
      ? ["#ffffff", "#ffffff"]
      : stops.length === 1
        ? [stops[0], stops[0]]
        : stops;
  const data = new Uint8Array(arr.length * 4);

  arr.forEach((hex, i) => {
    const c = new THREE.Color(hex);
    data[i * 4 + 0] = Math.round(c.r * 255);
    data[i * 4 + 1] = Math.round(c.g * 255);
    data[i * 4 + 2] = Math.round(c.b * 255);
    data[i * 4 + 3] = 255;
  });

  const tex = new THREE.DataTexture(data, arr.length, 1, THREE.RGBAFormat);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Top-level coordinator. Created once per mount, disposed on unmount.
 * All subsystems (Common, Mouse, AutoDriver, Simulation) are owned here.
 */
export class WebGLManager {
  readonly simulation: Simulation;

  private common: Common;
  private mouse: Mouse;
  private autoDriver: AutoDriver;

  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private outputMesh: THREE.Mesh;

  private running = false;
  private rafId: number | null = null;
  private lastUserInteraction = performance.now();

  private readonly _loop = this.loop.bind(this);
  private readonly _onResize = this.resize.bind(this);
  private readonly _onVisibility = this.handleVisibilityChange.bind(this);

  private isVisible = true;

  constructor(container: HTMLElement, props: Required<LiquidEtherProps>) {
    // Bootstrap subsystems
    this.common = new Common();
    this.common.init(container);

    this.mouse = new Mouse({
      autoIntensity: props.autoIntensity,
      takeoverDuration: props.takeoverDuration,
      onInteract: () => {
        this.lastUserInteraction = performance.now();
        this.autoDriver.forceStop();
      },
    });
    this.mouse.init(container);

    this.autoDriver = new AutoDriver(
      this.mouse,
      () => this.lastUserInteraction,
      {
        enabled: props.autoDemo,
        speed: props.autoSpeed,
        resumeDelay: props.autoResumeDelay,
        rampDuration: props.autoRampDuration,
      },
    );

    this.simulation = new Simulation(this.common, {
      mouse_force: props.mouseForce,
      cursor_size: props.cursorSize,
      isViscous: props.isViscous,
      viscous: props.viscous,
      iterations_viscous: props.iterationsViscous,
      iterations_poisson: props.iterationsPoisson,
      dt: props.dt,
      BFECC: props.BFECC,
      resolution: props.resolution,
      isBounce: props.isBounce,
    });

    // Output pass
    const paletteTex = makePaletteTexture(props.colors);
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    this.outputMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.RawShaderMaterial({
        vertexShader: face_vert,
        fragmentShader: color_frag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          velocity: { value: this.simulation.vel0Texture },
          boundarySpace: { value: new THREE.Vector2() },
          palette: { value: paletteTex },
          bgColor: { value: new THREE.Vector4(0, 0, 0, 0) },
        },
      }),
    );
    this.scene.add(this.outputMesh);

    // Mount canvas
    container.prepend(this.common.renderer!.domElement);

    // Global listeners
    window.addEventListener("resize", this._onResize);
    document.addEventListener("visibilitychange", this._onVisibility);
  }

  applyProps(props: Required<LiquidEtherProps>): void {
    const sim = this.simulation;
    const prevRes = sim.options.resolution;

    Object.assign(sim.options, {
      mouse_force: props.mouseForce,
      cursor_size: props.cursorSize,
      isViscous: props.isViscous,
      viscous: props.viscous,
      iterations_viscous: props.iterationsViscous,
      iterations_poisson: props.iterationsPoisson,
      dt: props.dt,
      BFECC: props.BFECC,
      resolution: props.resolution,
      isBounce: props.isBounce,
    });

    this.autoDriver.enabled = props.autoDemo;
    this.autoDriver.speed = props.autoSpeed;
    this.autoDriver.resumeDelay = props.autoResumeDelay;
    this.autoDriver.rampDurationMs = props.autoRampDuration * 1000;
    this.mouse.autoIntensity = props.autoIntensity;
    this.mouse.takeoverDuration = props.takeoverDuration;

    if (props.resolution !== prevRes) sim.resize();
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this._loop();
  }

  pause(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  setVisible(visible: boolean): void {
    this.isVisible = visible;
    if (visible && !document.hidden) {
      this.start();
    } else {
      this.pause();
    }
  }

  dispose(): void {
    this.pause();
    window.removeEventListener("resize", this._onResize);
    document.removeEventListener("visibilitychange", this._onVisibility);
    this.mouse.dispose();
    this.common.dispose();
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private resize(): void {
    this.common.resize();
    this.simulation.resize();
  }

  private renderFrame(): void {
    this.autoDriver.update();
    this.mouse.update();
    this.common.update();
    this.simulation.update(this.mouse);

    if (this.common.renderer) {
      this.common.renderer.setRenderTarget(null);
      this.common.renderer.render(this.scene, this.camera);
    }
  }

  private loop(): void {
    if (!this.running) return;
    this.renderFrame();
    this.rafId = requestAnimationFrame(this._loop);
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      this.pause();
    } else if (this.isVisible) {
      this.start();
    }
  }
}
