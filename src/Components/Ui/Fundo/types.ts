import type * as THREE from "three";

export interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

export interface SimOptions {
  iterations_poisson: number;
  iterations_viscous: number;
  mouse_force: number;
  resolution: number;
  cursor_size: number;
  viscous: number;
  isBounce: boolean;
  dt: number;
  isViscous: boolean;
  BFECC: boolean;
}

export interface FBOMap {
  vel_0: THREE.WebGLRenderTarget;
  vel_1: THREE.WebGLRenderTarget;
  vel_viscous0: THREE.WebGLRenderTarget;
  vel_viscous1: THREE.WebGLRenderTarget;
  div: THREE.WebGLRenderTarget;
  pressure_0: THREE.WebGLRenderTarget;
  pressure_1: THREE.WebGLRenderTarget;
}

export type ShaderUniformValue =
  | boolean
  | number
  | THREE.Texture
  | THREE.Vector2
  | THREE.Vector4;

export type ShaderUniforms = Record<string, THREE.IUniform<ShaderUniformValue>>;
