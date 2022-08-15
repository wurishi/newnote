export const vertex = `#version 300 es
in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`

export const fragment = `#version 300 es
precision {PRECISION} float;

uniform vec3 iResolution;
uniform float iTime;
// uniform float iGlobalTime;
// uniform vec4 iDate;
uniform vec4 iMouse;
// uniform float iFrameRate;
uniform int iFrame;
// uniform float iChannelTime[4];
uniform float iTimeDelta;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;

// uniform vec3 iChannelResolution[4];

out vec4 outputColor;

{COMMON}

{USER_FRAGMENT}

void main() {
  mainImage(outputColor, gl_FragCoord.xy);
}
`
