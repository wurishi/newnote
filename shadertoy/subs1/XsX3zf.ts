import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
float det(vec2 a, vec2 b) { return a.x*b.y-b.x*a.y; }

vec2 closestPointInSegment( vec2 a, vec2 b )
{
  vec2 ba = b - a;
  return a + ba*clamp( -dot(a,ba)/dot(ba,ba), 0.0, 1.0 );
}

// From: http://research.microsoft.com/en-us/um/people/hoppe/ravg.pdf
vec2 get_distance_vector(vec2 b0, vec2 b1, vec2 b2) {
	
  float a=det(b0,b2), b=2.0*det(b1,b0), d=2.0*det(b2,b1); // ð›¼,ð›½,ð›¿(ð‘)
  
  if( abs(2.0*a+b+d) < 1000.0 ) return closestPointInSegment(b0,b2);
	
  float f=b*d-a*a; // ð‘“(ð‘)
  vec2 d21=b2-b1, d10=b1-b0, d20=b2-b0;
  vec2 gf=2.0*(b*d21+d*d10+a*d20);
  gf=vec2(gf.y,-gf.x); // âˆ‡ð‘“(ð‘)
  vec2 pp=-f*gf/dot(gf,gf); // ð‘â€²
  vec2 d0p=b0-pp; // ð‘â€² to origin
  float ap=det(d0p,d20), bp=2.0*det(d10,d0p); // ð›¼,ð›½(ð‘â€²)
  // (note that 2*ap+bp+dp=2*a+b+d=4*area(b0,b1,b2))
  float t=clamp((ap+bp)/(2.0*a+b+d), 0.0 ,1.0); // ð‘¡Ì…
  return mix(mix(b0,b1,t),mix(b1,b2,t),t); // ð‘£ð‘–= ð‘(ð‘¡Ì…)

}

float approx_distance(vec2 p, vec2 b0, vec2 b1, vec2 b2) {
  return length(get_distance_vector(b0-p, b1-p, b2-p));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 xy = fragCoord.xy;
	
	vec2 b0 = vec2(0.25, .5) * iResolution.xy;
	// vec2 b1 = vec2(0.5, .75 + .1*sin(iTime)) * iResolution.xy;
	vec2 b1 = iMouse.xy;
	vec2 b2 = vec2(.75, .5) * iResolution.xy;
	vec2 mid = .5*(b0+b2) + vec2(0.0,0.01);
	
	float d = approx_distance(xy, b0, b1, b2);
	float thickness = 1.0;
	
	float a;
	
	if(d < thickness) {
	  a = 1.0;
	} else {
	  // Anti-alias the edge.
	  a = 1.0 - smoothstep(d, thickness, thickness+1.0);
	}
	
	//fragColor = vec4(a,1.0,1.0, 1.0);
	
	fragColor = vec4(mod(d/50.0, 1.0),a,a, 1.0);
}
`;

export default class implements iSub {
  key(): string {
    return 'XsX3zf';
  }
  name(): string {
    return 'Quadratic Bezier Stroke';
  }
  sort() {
    return 184;
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
