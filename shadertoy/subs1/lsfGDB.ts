import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
uniform float u_sc;
uniform int u_mode;

// Elegant way to intersect a planar coordinate system (3x3 linear system)
vec3 intersectCoordSys1( in vec3 o, in vec3 d, vec3 c, vec3 u, vec3 v )
{
	vec3 q = o - c;
	return vec3(
        dot( cross(u,v), q ),
		dot( cross(q,u), d ),
		dot( cross(v,q), d ) ) / 
        dot( cross(v,u), d );
}

// Ugly (but faster) way to intersect a planar coordinate system: plane + projection
vec3 intersectCoordSys0( in vec3 o, in vec3 d, vec3 c, vec3 u, vec3 v )
{
	vec3  q = o - c;
	vec3  n = cross(u,v);
    float t = -dot(n,q)/dot(d,n);
    float r =  dot(u,q + d*t);
    float s =  dot(v,q + d*t);
    return vec3(t,s,r);
}

vec3 hash3( float n )
{
    return fract(sin(vec3(n,n+1.0,n+2.0))*vec3(43758.5453123,12578.1459123,19642.3490423));
}

vec3 shade( in vec4 res )
{
    float ra = length(res.yz);
    float an = atan(res.y,res.z) + 8.0*iTime;
    float pa = sin(3.0*an);

    vec3 cola = 0.5 + 0.5*sin( (res.w/64.0)*3.5 + vec3(0.0,1.0,2.0) );
	
	vec3 col = vec3(0.0);
	col += cola*0.4*(1.0-smoothstep( 0.90, 1.00, ra) );
    col += cola*1.0*(1.0-smoothstep( 0.00, 0.03, abs(ra-0.8)))*(0.5+0.5*pa);
    col += cola*1.0*(1.0-smoothstep( 0.00, 0.20, abs(ra-0.8)))*(0.5+0.5*pa);
	col += cola*0.5*(1.0-smoothstep( 0.05, 0.10, abs(ra-0.5)))*(0.5+0.5*pa);
    col += cola*0.7*(1.0-smoothstep( 0.00, 0.30, abs(ra-0.5)))*(0.5+0.5*pa);

	return col*0.3;
}

vec3 render( in vec3 ro, in vec3 rd )
{
  	// raytrace
    vec3 col = vec3( 0.0 );
	for( int i=0; i<64; i++ )
	{
		// position disk
	    vec3 r = 2.5*(-1.0 + 2.0*hash3( float(i) ));
      r *= u_sc;		
        // orientate disk
		vec3 u = normalize( r.zxy );
        vec3 v = normalize( cross( u, vec3(0.0,1.0,0.0 ) ) );						   
		
        // intersect coord sys
        vec3 tmp;
        if(u_mode == 1) {
          tmp = intersectCoordSys1( ro, rd, r, u, v );
        }
        else {
          tmp = intersectCoordSys0( ro, rd, r, u, v );
        }
        tmp /= u_sc;		
	    if( dot(tmp.yz,tmp.yz)<1.0 && tmp.x>0.0 ) 
	    {
            // shade			
		    col += shade( vec4(tmp,float(i)) );
	    }
	}

    return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 q = fragCoord.xy / iResolution.xy;
    vec2 p = -1.0 + 2.0 * q;
    p.x *= iResolution.x/iResolution.y;

    // camera
	vec3 ro = 2.0*vec3(cos(0.5*iTime*1.1),0.0,sin(0.5*iTime*1.1));
    vec3 ta = vec3(0.0,0.0,0.0);
    // camera matrix
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );
    vec3 vv = normalize( cross(uu,ww));
	// create view ray
	vec3 rd = normalize( p.x*uu + p.y*vv + 1.0*ww );

    vec3 col = render( ro*u_sc, rd );
    
    fragColor = vec4( col, 1.0 );
}

void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
{
    vec3 col = render( fragRayOri + vec3(0.0,0.0,0.0), fragRayDir );

    fragColor = vec4( col, 1.0 );
}
`;

let gui: GUI;
const api = {
  u_sc: 3,
  u_mode: 1,
};

export default class implements iSub {
  key(): string {
    return 'lsfGDB';
  }
  name(): string {
    return 'Disk - intersection';
  }
  sort() {
    return 118;
  }
  tags?(): string[] {
    return [];
  }
  main(): HTMLCanvasElement {
    gui = new GUI();
    gui.add(api, 'u_sc', 0, 10, 0.1);
    gui.add(api, 'u_mode', [0, 1]);
    return createCanvas();
  }
  userFragment(): string {
    return fragment;
  }
  fragmentPrecision?(): string {
    return PRECISION_MEDIUMP;
  }
  destory(): void {
    if (gui) {
      gui.destroy();
      gui = null;
    }
  }
  initial?(gl: WebGLRenderingContext, program: WebGLProgram): Function {
    const u_sc = webglUtils.getUniformLocation(gl, program, 'u_sc');
    const u_mode = webglUtils.getUniformLocation(gl, program, 'u_mode');
    return () => {
      u_sc.uniform1f(api.u_sc);
      u_mode.uniform1i(api.u_mode);
    };
  }
}
