export const vertex = `
varying vec4 v_color;
uniform float time;
uniform float vertexId;
uniform vec2 resolution;
uniform vec2 mouse;

{USER_VERTEX}
`;

export const fragment = `
precision mediump float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`;

export interface iSub {
  name(): string;
  key(): string;
  main(): HTMLCanvasElement;
  userVertex(): string;
  sort?(): number;
}
