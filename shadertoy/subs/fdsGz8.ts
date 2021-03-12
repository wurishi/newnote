import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
// float mod(float x, float y) {
//   float r = fract(x / y);
//   return r * y;
// }

// vec2 mult=(2.0*v_texCoord - 1.0)/(2.0*texScale);
//     gl_FragColor = texture2D(textureSample,mult);

vec4 texelFetch(sampler2D textureSampler, vec2 texCoord, float t) {
  vec2 mult = (2.0 * texCoord - 1.0) / (2.0);
  return texture2D(textureSampler, mult);
}

void mainImage( out vec4 O, vec2 U )
{
    float L = iResolution.x/2.,
          z = exp2(1.5*(cos(iTime)-1.)),                                // stretching
          x = mod(U.x,L) * z;                                           // stretched z
    O-=O;
    float mx = mod(x, 256.);
    float my = mod(U.y, 256.);
    float m1 = mod(x, 1024.);
    float m2 = mod(U.y, 1024.);
    if ( fract(x) < z )                                                 // first pixel in a stretched texel
        O = vec4( ( U.x < L 
                      ? texelFetch(iChannel0, vec2(mx, my), 0.0 ).r  // left: white noise
                      : texelFetch(iChannel1, vec2(m1, m2), 0.0 ).r  // right: blue noise
                  ) > .98 );
                  
    if( int(U.x) == int(L) ) O.r++;                                     // separator
}
`;

export default class implements iSub {
  key(): string {
    return 'fdsGz8';
  }
  name(): string {
    return 'texelFetch模拟失败';
  }
  tags?(): string[] {
    return [];
  }
  main(): HTMLCanvasElement {
    const canvas = createCanvas();
    canvas.style.backgroundColor = 'black';
    return canvas;
  }
  userFragment(): string {
    return fragment;
  }
  fragmentPrecision?(): string {
    return PRECISION_MEDIUMP;
  }
  destory(): void {}
  initial?(gl: WebGLRenderingContext, program: WebGLProgram): Function {
    return () => {};
  }
  channels() {
    return [
      { type: 0, path: './textures/fdsGz8_1.png' },
      { type: 0, path: './textures/fdsGz8_2.png' },
    ];
  }
}
