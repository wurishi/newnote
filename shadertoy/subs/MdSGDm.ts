import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
// draw a disk with motion blur
vec3 diskWithMotionBlur( in vec3 pcol,    // pixel color (background)
                         in vec2 puv,     // pixel coordinates
                         in vec3 dpr,     // disk (pos,rad)
                         in vec2 dv,      // disk velocity
                         in vec3 dcol )   // disk color
{
	vec2 xc = puv - dpr.xy;
	float a = dot(dv,dv);
	float b = dot(dv,xc);
	float c = dot(xc,xc) - dpr.z*dpr.z;
	float h = b*b - a*c;
	if( h>0.0 )
	{
		h = sqrt( h );
		
		float ta = max( 0.0, (-b-h)/a );
		float tb = min( 1.0, (-b+h)/a );
		
		if( ta < tb ) // we can comment this conditional, in fact
		    pcol = mix( pcol, dcol, clamp(2.0*(tb-ta),0.0,1.0) );
	}

	return pcol;
}


vec3 hash3( float n ) { return fract(sin(vec3(n,n+1.0,n+2.0))*43758.5453123); }
vec4 hash4( float n ) { return fract(sin(vec4(n,n+1.0,n+2.0,n+3.0))*43758.5453123); }

const float speed = 8.0;
vec2 getPosition( float time, vec4 id ) { return vec2(       0.9*sin((speed*(0.75+0.5*id.z))*time+20.0*id.x),        0.75*cos(speed*(0.75+0.5*id.w)*time+20.0*id.y) ); }
vec2 getVelocity( float time, vec4 id ) { return vec2( speed*0.9*cos((speed*(0.75+0.5*id.z))*time+20.0*id.x), -speed*0.75*sin(speed*(0.75+0.5*id.w)*time+20.0*id.y) ); }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 p = (2.0*fragCoord-iResolution.xy) / iResolution.y;
	
	vec3 col = vec3(0.03) + 0.015*p.y;
	
	for( int i=0; i<16; i++ )
	{		
		vec4 off = hash4( float(i)*13.13 );
        vec3 sph = vec3( getPosition( iTime, off ), 0.02+0.1*off.x );
        vec2 dv = getVelocity( iTime, off ) /24.0 ;
		vec3 sphcol = 0.55 + 0.45*sin( 3.0*off.z + vec3(4.0,0.0,2.0) );
		
        col = diskWithMotionBlur( col, p, sph, dv, sphcol );
	}		

    col = pow( col, vec3(0.4545) );
    
    col += (1.0/255.0)*hash3(p.x+13.0*p.y);

	fragColor = vec4(col,1.0);
}
`;

export default class implements iSub {
  key(): string {
    return 'MdSGDm';
  }
  name(): string {
    return 'Analytic Motionblur 2D';
  }
  sort() {
    return 250;
  }
  tags?(): string[] {
    return [];
  }
  main(): HTMLCanvasElement {
    return createCanvas({ bg: 'black' });
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
