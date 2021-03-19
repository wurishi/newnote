export const vertex = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

export const vertex2 = `#version 300 es
in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

export const fragment = `
precision {PRECISION} float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec4 iMouse;
uniform float iFrameRate;
uniform int iFrame;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;

{USER_FRAGMENT}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export const fragment2 = `#version 300 es
precision {PRECISION} float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec4 iMouse;
uniform float iFrameRate;
uniform int iFrame;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;

out vec4 outputColor;

{USER_FRAGMENT}

void main() {
  mainImage(outputColor, gl_FragCoord.xy);
}
`;

export const PRECISION_MEDIUMP = 'mediump';
export const PRECISION_HIGHP = 'highp';

export const WEBGL_1 = 'webgl';
export const WEBGL_2 = 'webgl2';

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
  sort?(): number;
  channels?(): { path: string; type: number }[];
  webgl?(): string;
}

export function createCanvas(style?: { bg?: string }): HTMLCanvasElement {
  style = style || {};
  const canvas = document.createElement('canvas');
  canvas.style.width = '400px';
  canvas.style.height = '300px';
  if (style) {
    if (style.bg) {
      canvas.style.backgroundColor = style.bg;
    }
  }
  return canvas;
}
