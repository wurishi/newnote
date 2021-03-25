import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
// shader (https://www.shadertoy.com/view/XdSGWy), and simplified the geometrically 
// impossible cases, and optimized coefficients. One can probably do better than 
// this though...


// Other intersectors: http://iquilezles.org/www/articles/intersectors/intersectors.htm
//
// Box:             https://www.shadertoy.com/view/ld23DV
// Triangle:        https://www.shadertoy.com/view/MlGcDz
// Capsule:         https://www.shadertoy.com/view/Xt3SzX
// Ellipsoid:       https://www.shadertoy.com/view/MlsSzn
// Sphere:          https://www.shadertoy.com/view/4d2XWV
// Capped Cylinder: https://www.shadertoy.com/view/4lcSRn
// Disk:            https://www.shadertoy.com/view/lsfGDB
// Capped Cone:     https://www.shadertoy.com/view/llcfRf
// Rounded Box:     https://www.shadertoy.com/view/WlSXRW
// Rounded Cone:    https://www.shadertoy.com/view/MlKfzm
// Torus:           https://www.shadertoy.com/view/4sBGDy
// Sphere4:         https://www.shadertoy.com/view/3tj3DW
// Goursat:         https://www.shadertoy.com/view/3lj3DW
// Hexagonal Prism: https://www.shadertoy.com/view/tljBWy

// f(x) = (|x|² + R² - r²)² - 4·R²·|xy|² = 0
float iTorus( in vec3 ro, in vec3 rd, in vec2 tor )
{
    float po = 1.0;

    
    float Ra2 = tor.x*tor.x;
    float ra2 = tor.y*tor.y;
	
    float m = dot(ro,ro);
    float n = dot(ro,rd);
	
    float k = (m - ra2 - Ra2)/2.0;
    float k3 = n;
    float k2 = n*n + Ra2*rd.z*rd.z + k;
    float k1 = k*n + Ra2*ro.z*rd.z;
    float k0 = k*k + Ra2*ro.z*ro.z - Ra2*ra2;
	
    #if 1
    // prevent |c1| from being too close to zero
    if( abs(k3*(k3*k3 - k2) + k1) < 0.01 )
    {
        po = -1.0;
        float tmp=k1; k1=k3; k3=tmp;
        k0 = 1.0/k0;
        k1 = k1*k0;
        k2 = k2*k0;
        k3 = k3*k0;

    }
	#endif

    float c2 = 2.0*k2 - 3.0*k3*k3;
    float c1 = k3*(k3*k3 - k2) + k1;
    float c0 = k3*(k3*(-3.0*k3*k3 + 4.0*k2) - 8.0*k1) + 4.0*k0;

    
    c2 /= 3.0;
    c1 *= 2.0;
    c0 /= 3.0;
    
    float Q = c2*c2 + c0;
    float R = 3.0*c0*c2 - c2*c2*c2 - c1*c1;
    
	
    float h = R*R - Q*Q*Q;
    float z = 0.0;
    if( h < 0.0 )
    {
    	// 4 intersections
        float sQ = sqrt(Q);
        z = 2.0*sQ*cos( acos(R/(sQ*Q)) / 3.0 );
    }
    else
    {
        // 2 intersections
        float sQ = pow( sqrt(h) + abs(R), 1.0/3.0 );
        z = sign(R)*abs( sQ + Q/sQ );
    }		
    z = c2 - z;
	
    float d1 = z   - 3.0*c2;
    float d2 = z*z - 3.0*c0;
    if( abs(d1) < 1.0e-4 )
    {
        if( d2 < 0.0 ) return -1.0;
        d2 = sqrt(d2);
    }
    else
    {
        if( d1 < 0.0 ) return -1.0;
        d1 = sqrt( d1/2.0 );
        d2 = c1/d1;
    }

    //----------------------------------
	
    float result = 1e20;

    h = d1*d1 - z + d2;
    if( h > 0.0 )
    {
        h = sqrt(h);
        float t1 = -d1 - h - k3; t1 = (po<0.0)?2.0/t1:t1;
        float t2 = -d1 + h - k3; t2 = (po<0.0)?2.0/t2:t2;
        if( t1 > 0.0 ) result=t1; 
        if( t2 > 0.0 ) result=min(result,t2);
    }

    h = d1*d1 - z - d2;
    if( h > 0.0 )
    {
        h = sqrt(h);
        float t1 = d1 - h - k3;  t1 = (po<0.0)?2.0/t1:t1;
        float t2 = d1 + h - k3;  t2 = (po<0.0)?2.0/t2:t2;
        if( t1 > 0.0 ) result=min(result,t1);
        if( t2 > 0.0 ) result=min(result,t2);
    }

    return result;
}

// df(x)/dx
vec3 nTorus( in vec3 pos, vec2 tor )
{
	return normalize( pos*(dot(pos,pos)- tor.y*tor.y - tor.x*tor.x*vec3(1.0,1.0,-1.0)));
}

#define AA 2

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // camera movement	
	float an = 0.5*iTime;
	vec3 ro = vec3( 2.5*cos(an), 1.0, 2.5*sin(an) );
    vec3 ta = vec3( 0.0, 0.1, 0.0 );

   // camera matrix
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );
    vec3 vv = normalize( cross(uu,ww));

    
    vec3 tot = vec3(0.0);
    
    #if AA>1
    for( int m=0; m<AA; m++ )
    for( int n=0; n<AA; n++ )
    {
        // pixel coordinates
        vec2 o = vec2(float(m),float(n)) / float(AA) - 0.5;
        vec2 p = (-iResolution.xy + 2.0*(fragCoord+o))/iResolution.y;
        #else    
        vec2 p = (-iResolution.xy + 2.0*fragCoord)/iResolution.y;
        #endif

	    // create view ray
	    vec3 rd = normalize( p.x*uu + p.y*vv + 1.5*ww );

        // raytrace
	
	    // raytrace-plane
        vec2 torus = vec2(1.0,0.5);
	    float t = iTorus( ro, rd, torus );

        // shading/lighting	
	    vec3 col = vec3(0.08)*(1.0-0.3*length(p)) + 0.02*rd.y;
	    if( t>0.0 )
	    {
            vec3 pos = ro + t*rd;
		    vec3 nor = nTorus( pos, torus );
            vec3 lig = normalize(vec3(0.7,0.6,0.3));
            vec3 hal = normalize(-rd+lig);
		    float dif = clamp( dot(nor,lig), 0.0, 1.0 );
		    float amb = clamp( 0.5 + 0.5*nor.y, 0.0, 1.0 );
#if 0
            col = vec3(0.8);
#else
            const float fr = 3.14159*8.0;
            vec2 uv = vec2(0.8*atan(pos.x,pos.y),atan(pos.z,length(pos.xy)-torus.y));
            col = vec3(0.6);
            col += 0.4*smoothstep(-0.01,0.01,cos(uv.x*fr*0.5)*cos(uv.y*fr*0.5)); 
            float wi = smoothstep(-1.0,-0.98,cos(uv.x*fr))*smoothstep(-1.0,-0.98,cos(uv.y*fr));
            col *= wi;
#endif      
		    col *= vec3(0.15,0.25,0.35)*amb + 1.05*vec3(1.0,0.9,0.7)*dif;
            col += wi*0.3*pow(clamp(dot(hal,nor),0.0,1.0),32.0)*dif;
	    }
	
        col = sqrt( col );

	    tot += col;
    #if AA>1
    }
    tot /= float(AA*AA);
    #endif

	// dither to remove banding in the background
    tot += fract(sin(fragCoord.x*vec3(13,1,11)+fragCoord.y*vec3(1,7,5))*158.391832)/255.0;
    
    fragColor = vec4( tot, 1.0 );
}
`;

export default class implements iSub {
  key(): string {
    return '4sBGDy';
  }
  name(): string {
    return 'Torus - intersection';
  }
  sort() {
    return 115;
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
