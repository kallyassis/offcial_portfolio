import * as THREE from "three";
import type { Common } from "./Common";
import type { Mouse } from "./Mouse";
import type { ShaderUniforms } from "./types";
import {
  face_vert,
  line_vert,
  mouse_vert,
  advection_frag,
  divergence_frag,
  externalForce_frag,
  poisson_frag,
  pressure_frag,
  viscous_frag,
} from "./shaders";

// ── Base ────────────────────────────────────────────────────────────────────

interface ShaderPassProps {
  material?: {
    vertexShader: string;
    fragmentShader: string;
    uniforms: ShaderUniforms;
    blending?: THREE.Blending;
    depthWrite?: boolean;
    transparent?: boolean;
  };
  output?: THREE.WebGLRenderTarget | null;
  output0?: THREE.WebGLRenderTarget | null;
  output1?: THREE.WebGLRenderTarget | null;
}

class ShaderPass {
  protected props: ShaderPassProps;
  protected uniforms: ShaderUniforms | undefined;
  protected scene: THREE.Scene;
  protected camera: THREE.Camera;
  protected material: THREE.RawShaderMaterial | null = null;

  constructor(props: ShaderPassProps) {
    this.props = props;
    this.uniforms = props.material?.uniforms;
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    if (this.uniforms && props.material) {
      this.material = new THREE.RawShaderMaterial(props.material);
      const geo = new THREE.PlaneGeometry(2, 2);
      this.scene.add(new THREE.Mesh(geo, this.material));
    }
  }

  protected render(common: Common): void {
    if (!common.renderer) return;
    common.renderer.setRenderTarget(this.props.output ?? null);
    common.renderer.render(this.scene, this.camera);
    common.renderer.setRenderTarget(null);
  }
}

// ── Advection ───────────────────────────────────────────────────────────────

interface AdvectionInit {
  cellScale: THREE.Vector2;
  fboSize: THREE.Vector2;
  dt: number;
  src: THREE.WebGLRenderTarget;
  dst: THREE.WebGLRenderTarget;
}

export class Advection extends ShaderPass {
  private line: THREE.LineSegments;

  constructor(init: AdvectionInit) {
    super({
      material: {
        vertexShader: face_vert,
        fragmentShader: advection_frag,
        uniforms: {
          boundarySpace: { value: init.cellScale },
          px: { value: init.cellScale },
          fboSize: { value: init.fboSize },
          velocity: { value: init.src.texture },
          dt: { value: init.dt },
          isBFECC: { value: true },
        },
      },
      output: init.dst,
    });

    // Boundary line (bounce effect)
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0,
          -1, -1, 0,
        ]),
        3,
      ),
    );
    const mat = new THREE.RawShaderMaterial({
      vertexShader: line_vert,
      fragmentShader: advection_frag,
      uniforms: this.uniforms!,
    });
    this.line = new THREE.LineSegments(geo, mat);
    this.scene.add(this.line);
  }

  update(
    common: Common,
    opts: { dt: number; isBounce: boolean; BFECC: boolean },
  ): void {
    if (!this.uniforms) return;
    this.uniforms.dt.value = opts.dt;
    this.uniforms.isBFECC.value = opts.BFECC;
    this.line.visible = opts.isBounce;
    this.render(common);
  }
}

// ── ExternalForce ────────────────────────────────────────────────────────────

interface ExternalForceInit {
  cellScale: THREE.Vector2;
  cursorSize: number;
  dst: THREE.WebGLRenderTarget;
}

interface ExternalForceUniforms extends Record<string, THREE.IUniform<THREE.Vector2>> {
  px: THREE.IUniform<THREE.Vector2>;
  force: THREE.IUniform<THREE.Vector2>;
  center: THREE.IUniform<THREE.Vector2>;
  scale: THREE.IUniform<THREE.Vector2>;
}

export class ExternalForce extends ShaderPass {
  private readonly mouseUniforms: ExternalForceUniforms;

  constructor(init: ExternalForceInit) {
    super({ output: init.dst });

    this.mouseUniforms = {
      px: { value: init.cellScale },
      force: { value: new THREE.Vector2(0, 0) },
      center: { value: new THREE.Vector2(0, 0) },
      scale: { value: new THREE.Vector2(init.cursorSize, init.cursorSize) },
    };

    const mat = new THREE.RawShaderMaterial({
      vertexShader: mouse_vert,
      fragmentShader: externalForce_frag,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: this.mouseUniforms,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    this.scene.add(mesh);
  }

  update(
    common: Common,
    mouse: Mouse,
    opts: { mouseForce: number; cursorSize: number; cellScale: THREE.Vector2 },
  ): void {
    const { mouseForce, cursorSize, cellScale } = opts;
    const forceX = (mouse.diff.x / 2) * mouseForce;
    const forceY = (mouse.diff.y / 2) * mouseForce;

    const padX = cursorSize * cellScale.x;
    const padY = cursorSize * cellScale.y;
    const centerX = Math.min(
      Math.max(mouse.coords.x, -1 + padX + cellScale.x * 2),
      1 - padX - cellScale.x * 2,
    );
    const centerY = Math.min(
      Math.max(mouse.coords.y, -1 + padY + cellScale.y * 2),
      1 - padY - cellScale.y * 2,
    );
    this.mouseUniforms.force.value.set(forceX, forceY);
    this.mouseUniforms.center.value.set(centerX, centerY);
    this.mouseUniforms.scale.value.set(cursorSize, cursorSize);

    this.render(common);
  }
}

// ── Viscous ──────────────────────────────────────────────────────────────────

interface ViscousInit {
  cellScale: THREE.Vector2;
  boundarySpace: THREE.Vector2;
  viscous: number;
  src: THREE.WebGLRenderTarget;
  dst: THREE.WebGLRenderTarget;
  dst_: THREE.WebGLRenderTarget;
  dt: number;
}

export class Viscous extends ShaderPass {
  constructor(init: ViscousInit) {
    super({
      material: {
        vertexShader: face_vert,
        fragmentShader: viscous_frag,
        uniforms: {
          boundarySpace: { value: init.boundarySpace },
          velocity: { value: init.src.texture },
          velocity_new: { value: init.dst_.texture },
          v: { value: init.viscous },
          px: { value: init.cellScale },
          dt: { value: init.dt },
        },
      },
      output: init.dst,
      output0: init.dst_,
      output1: init.dst,
    });
  }

  update(
    common: Common,
    opts: { viscous: number; iterations: number; dt: number },
  ): THREE.WebGLRenderTarget | undefined {
    if (!this.uniforms) return;
    this.uniforms.v.value = opts.viscous;
    this.uniforms.dt.value = opts.dt;

    let fboIn = this.props.output0;
    let fboOut = this.props.output1;

    for (let i = 0; i < opts.iterations; i++) {
      fboIn = i % 2 === 0 ? this.props.output0 : this.props.output1;
      fboOut = i % 2 === 0 ? this.props.output1 : this.props.output0;
      this.uniforms.velocity_new.value = fboIn!.texture;
      this.props.output = fboOut;
      this.render(common);
    }

    return fboOut ?? undefined;
  }
}

// ── Divergence ───────────────────────────────────────────────────────────────

interface DivergenceInit {
  cellScale: THREE.Vector2;
  boundarySpace: THREE.Vector2;
  src: THREE.WebGLRenderTarget;
  dst: THREE.WebGLRenderTarget;
  dt: number;
}

export class Divergence extends ShaderPass {
  constructor(init: DivergenceInit) {
    super({
      material: {
        vertexShader: face_vert,
        fragmentShader: divergence_frag,
        uniforms: {
          boundarySpace: { value: init.boundarySpace },
          velocity: { value: init.src.texture },
          px: { value: init.cellScale },
          dt: { value: init.dt },
        },
      },
      output: init.dst,
    });
  }

  update(common: Common, vel: THREE.WebGLRenderTarget): void {
    if (this.uniforms) this.uniforms.velocity.value = vel.texture;
    this.render(common);
  }
}

// ── Poisson ──────────────────────────────────────────────────────────────────

interface PoissonInit {
  cellScale: THREE.Vector2;
  boundarySpace: THREE.Vector2;
  src: THREE.WebGLRenderTarget;
  dst: THREE.WebGLRenderTarget;
  dst_: THREE.WebGLRenderTarget;
}

export class Poisson extends ShaderPass {
  constructor(init: PoissonInit) {
    super({
      material: {
        vertexShader: face_vert,
        fragmentShader: poisson_frag,
        uniforms: {
          boundarySpace: { value: init.boundarySpace },
          pressure: { value: init.dst_.texture },
          divergence: { value: init.src.texture },
          px: { value: init.cellScale },
        },
      },
      output: init.dst,
      output0: init.dst_,
      output1: init.dst,
    });
  }

  update(
    common: Common,
    opts: { iterations: number },
  ): THREE.WebGLRenderTarget | undefined {
    let pIn = this.props.output0;
    let pOut = this.props.output1;

    for (let i = 0; i < opts.iterations; i++) {
      pIn = i % 2 === 0 ? this.props.output0 : this.props.output1;
      pOut = i % 2 === 0 ? this.props.output1 : this.props.output0;
      if (this.uniforms) this.uniforms.pressure.value = pIn!.texture;
      this.props.output = pOut;
      this.render(common);
    }

    return pOut ?? undefined;
  }
}

// ── Pressure ─────────────────────────────────────────────────────────────────

interface PressureInit {
  cellScale: THREE.Vector2;
  boundarySpace: THREE.Vector2;
  src_p: THREE.WebGLRenderTarget;
  src_v: THREE.WebGLRenderTarget;
  dst: THREE.WebGLRenderTarget;
  dt: number;
}

export class Pressure extends ShaderPass {
  constructor(init: PressureInit) {
    super({
      material: {
        vertexShader: face_vert,
        fragmentShader: pressure_frag,
        uniforms: {
          boundarySpace: { value: init.boundarySpace },
          pressure: { value: init.src_p.texture },
          velocity: { value: init.src_v.texture },
          px: { value: init.cellScale },
          dt: { value: init.dt },
        },
      },
      output: init.dst,
    });
  }

  update(
    common: Common,
    vel: THREE.WebGLRenderTarget,
    pressure: THREE.WebGLRenderTarget,
  ): void {
    if (this.uniforms) {
      this.uniforms.velocity.value = vel.texture;
      this.uniforms.pressure.value = pressure.texture;
    }
    this.render(common);
  }
}
