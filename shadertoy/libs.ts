export const vertex = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

export const fragment = `
precision {PRECISION} float;

uniform vec3 iResolution;
uniform float iTime;

{USER_FRAGMENT}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export const PRECISION_MEDIUMP = 'mediump';
export const PRECISION_HIGHP = 'highp';

export interface iSub {
  key(): string;
  name(): string;
  tags?(): string[];
  main(): HTMLCanvasElement;
  userFragment(): string;
  fragmentPrecision?(): string;
  destory(): void;
  initial?(gl: WebGLRenderingContext, program: WebGLProgram): Function;
  ignore?(): boolean;
}

export function createCanvas(
  width = '100%',
  height = '100%'
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.style.width = width;
  canvas.style.height = height;
  return canvas;
}
