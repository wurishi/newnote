import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
// For a single octave
//#define NOISE noise

// For multiple octaves
#define NOISE fbm
#define NUM_NOISE_OCTAVES 5

float hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }
float hash(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }

float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), u);
}


float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

	// Four corners in 2D of a tile
	float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    // Simple 2D lerp using smoothstep envelope between the values.
	// return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
	//			mix(c, d, smoothstep(0.0, 1.0, f.x)),
	//			smoothstep(0.0, 1.0, f.y)));

	// Same code, with the clamps in smoothstep and common subexpressions
	// optimized away.
    vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}


float noise(vec3 x) {
    const vec3 step = vec3(110, 241, 171);

    vec3 i = floor(x);
    vec3 f = fract(x);
 
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the 
    // incremental change to the 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}


float fbm(float x) {
	float v = 0.0;
	float a = 0.5;
	float shift = float(100);
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}


float fbm(vec2 x) {
	float v = 0.0;
	float a = 0.5;
	vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {
		v += a * noise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}


float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}


//////////////////////////////////////////////////////////////////////////////////////
// Visualization:
const float pi          = 3.1415926535;
const float inf         = 1.0 / 0.0;
float square(float x) { return x * x; }
float infIfNegative(float x) { return (x >= 0.0) ? x : inf; }

// C = sphere center, r = sphere radius, P = ray origin, w = ray direction
float  intersectSphere(vec3 C, float r, vec3 P, vec3 w) {	
	vec3 v = P - C;
	float b = -dot(w, v);
	float c = dot(v, v) - square(r);
	float d = (square(b) - c);
	if (d < 0.0) { return inf; }	
	float dsqrt = sqrt(d);
	
	// Choose the first positive intersection
	return min(infIfNegative((b - dsqrt)), infIfNegative((b + dsqrt)));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	float v = 0.0;
	
	// Visualize 1D, 2D, and 3D
	if (fragCoord.y > iResolution.y / 2.0) {
		if (fragCoord.x < iResolution.x / 2.0) {
			// 1D
			float coord = fragCoord.x * 0.05 + iTime * 5.0 - 10.0;
			float height = NOISE(coord) * iResolution.y / 2.0;
			v = clamp((height - fragCoord.y + iResolution.y / 2.0) / (iResolution.y * 0.02), 0.0, 1.0);
		} else if (fragCoord.x < iResolution.x / 2.0 + 1.0) {
			fragColor.rgb = vec3(1.0);
			return;
		} else {
			// 2D
			vec2 coord = fragCoord.xy * 0.1 - vec2(iTime * 5.0, iResolution.y / 2.0);
			v = NOISE(coord);
		}
	} else if (fragCoord.y > iResolution.y / 2.0 - 1.0) {
		fragColor.rgb = vec3(1.0);
		return;
	} else {
		// Ray-sphere
		const float verticalFieldOfView = 25.0 * pi / 180.0;
			
	    vec3 P = vec3(sin(iTime) * 2.0, 0, 5.0);
		vec3 w = normalize(vec3(fragCoord.xy - iResolution.xy / vec2(2.0, 4.0), 
								(iResolution.y / 2.0) / (-2.0 * tan(verticalFieldOfView / 2.0))));

		float t = min(intersectSphere(vec3(0, 0, 0), 1.0, P, w),
					  intersectSphere(vec3(0, -2000, 0), 2000.0 - 1.0, P, w));
		if (t < inf) {
			vec3 X = P + w * t;
			// Fake lighting to make surfaces appear nicely
			v = NOISE(X * 10.0) * clamp(X.y * 0.75 + 1.0 - min(X.z * 0.05, 0.0), 0.0, 1.0) + 
				clamp((length(X.xz) - 0.75) * 0.15, 0.0, 0.1);
		} else {
			// Background
			v = 0.5;
		}
	}

    // Visualize with a fun color map	
	fragColor.rgb = pow(v, 0.35) * 1.3 * normalize(vec3(0.5, fragCoord.xy / iResolution.xy)) + vec3(v * 0.25);
  fragColor.a = 1.;
}
`;

export default class implements iSub {
  key(): string {
    return '4dS3Wd';
  }
  name(): string {
    return '1D, 2D & 3D Value Noise';
  }
  sort() {
    return 193;
  }
  tags?(): string[] {
    return [];
  }
  main(): HTMLCanvasElement {
    return createCanvas();
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
}
