import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const buffA = `

#define iTime (iTime - 7.4)

#define SPEED 0.3
#define FL_H 0.3


#define mx (10.*iMouse.x/iResolution.x)
#define rot(x) mat2(cos(x),-sin(x),sin(x),cos(x))
#define pal(a,b,c,d,e) ((a) + (b)*sin(6.28*((c)*(d) + (e))))

vec3 glowB = vec3(0);

vec3 reflAtten = vec3(1);


vec3 path (float z){
    z *= 0.5;
	return vec3(
    	sin(z + cos(z*0.7))*0.7,
    	cos(z + cos(z*1.2))*0.6,
        0.
    )*2.;
}

#define pmod(p,x) mod(p,x) - x*0.5
float map(vec3 p){
	float d = 10e6;
    
    // w is used for the lines 
    // and p is used for the tunnel
    
    vec3 w = p; 
    w = abs(w);
    
    // the tunnel is made by the next two lines, otherwise it's just to planes
	p -= path(p.z);
    
    p.xy *= rot(
        sin(w.z*2.9 + p.z*0.7 + sin( w.x*2. + w.z*4. + iTime*0. + 0.5) + w.z*0.1)*1.6
    ); 
    
    float flTop =(-p.y + FL_H )*0.3;
    float flBot =(p.y + FL_H )*0.3;
    float floors = min(flBot, flTop);
    d = min(d,floors);
    
    const float sep = 0.2; // seperation between glowy lines
    
    w.y = pmod(w.y,sep);
    
    
    vec3 z = p;
    // random attenuation to feed to the glowy lines
    float atten = pow(abs(sin(z.z*0.2 + iTime*0.1)), 50.);
    float attenC = pow(abs(sin(z.z*0.1  + sin(z.x + iTime)*0.2 + sin(z.y*3.)*4. + iTime*0.2)), 100.);
    float attenB = pow(abs(sin(w.z*0.2  + sin(w.x + iTime)*0.2 + sin(w.y*0.7)*4. + w.y*20. + iTime*0.2)), 10.);
    vec3 col = pal(0.1,0.6 - attenC*0.5,vec3(1.7  - atten*0.6,1.1,0.8),0.2 - atten*0.4 ,0.5 - attenB*0.6 );
	col = max(col, 0.);
    
    float sc = 60. - atten*55.;
    
    // distance to the glowy lines
    float dGlowzers = max(floors,-abs(w.y) + sep*0.5) - 0.02;
    
    // glow
    glowB += exp(-dGlowzers*(70.))*reflAtten*col*40.;
    d *= 0.65;
    return d;
}
float march(vec3 ro, vec3 rd, inout vec3 p, inout float t, inout bool hit){
	float d = 10e6;
	p = ro; t = 0.; hit = false;
    for (int i = 0; i < 180 ; i++){
    	d = map(p);
        //glow += exp(-d.x*20.)*0.001;
        if(d < 0.001){
        	hit = true;
            break;
        }
    	t += d;
        p = ro + rd*t;        
    }

    return d;
}

vec3 getRd(vec3 ro, vec3 lookAt, vec2 uv){
	vec3 dir = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0,1,0), dir));
    vec3 up = normalize(cross(dir, right));
	return normalize(dir + right*uv.x + up*uv.y);
}


vec3 getNormal(vec3 p){
	vec2 t = vec2(0.001,0);
    return normalize(
    	vec3(
        	map(p - t.xyy) - map(p + t.xyy),
        	map(p - t.yxy) - map(p + t.yxy),
        	map(p - t.yyx) - map(p + t.yyx)
        )
    );
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;

    uv *= 1. - dot(uv,uv)*-0.2;
    
    
    
    //uv.xy *= rot(0.1)
    vec3 col = vec3(0);
    
    vec3 ro = vec3(0);
    
    ro.z += mx*2.;
    ro.z += iTime*SPEED - sin(iTime)*SPEED*0.3;
    ro += path(ro.z);
    
    vec3 lookAt = vec3(0,0,ro.z + 1.);
    
    lookAt += path(lookAt.z);
    
    vec3 rd = getRd(ro, lookAt, uv);
    
    rd.xy *= rot(sin(iTime)*0.05);
    
    bool hit; float t; vec3 p;
    
    float bounce;
    
    float firstT = 0.;
    float d;
    for(int i = 0; i < 2 ; i++){
        d = march(ro, rd, p, t, hit);
        vec3 n = getNormal(p);
        if(i == 0)
        
        reflAtten *= vec3(0.2);
        
        rd = reflect(rd, n);
        ro = p + rd*0.2;
    }
    
	
    
    glowB = max(glowB, 0.);
    col += glowB*0.0006;
    
    col = clamp(col,0., 1.);
    col = pow(col, vec3(1.3));
    
    fragColor = vec4(col,1.0);
}`;

const fragment = `

// I fixed up the shader a bit, compared to the original and added tome color toning

// It is basically just two perpendicular planes which are rotated depending on the position of the viewer.
// Materials are reflective
// Then some glowy lines are added on top



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord/iResolution.xy;
	vec2 uvn = (fragCoord - 0.5*iResolution.xy)/iResolution.xy;
    
    // Radial blur and chromatic abberation
    float steps = 40.;
    float scale = 0.00 + pow(length(uv - 0.5),3.4)*0.1;
    float chromAb = pow(length(uv - 0.5),1.)*1.5;
    vec2 offs = vec2(0);
    vec4 radial = vec4(0);
    for(float i = 0.; i < steps; i++){
    
        scale *= 0.98;
        vec2 target = uv + offs;
        offs -= normalize(uvn)*scale/steps;
    	radial.r += texture(iChannel0, target + chromAb*1./iResolution.xy).x;
    	radial.g += texture(iChannel0, target).y;
    	radial.b += texture(iChannel0, target - chromAb*1./iResolution.xy).z;
    }
    radial /= steps;
    
    fragColor = radial*1.5; 
    
    // mimap glow
    //fragColor += texture(iChannel0,uv, 6.)*0.1;
    
    // color correction
    fragColor = mix(fragColor,smoothstep(0.,1.,fragColor), 0.14); 
    
    fragColor *= 1.;
    fragColor.g *= 1.1;
    fragColor.r *= 0.95 + uvn.x*0.7;
    fragColor.g *= 0.95 + uvn.y*0.3;
    fragColor = max(fragColor, 0.);
    // vignette
    fragColor = pow(fragColor, vec4(0.545 + dot(uvn,uvn)*2.)); 
    fragColor.a = 1.;
}

`;

export default class implements iSub {
  key(): string {
    return '3tGSR3';
  }
  name(): string {
    return 'Day 74';
  }
  sort() {
    return 645;
  }
  webgl() {
    return WEBGL_2;
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
  channels() {
    return [
      { type: 1, f: buffA, fi: 0 }, //
      webglUtils.DEFAULT_NOISE,
    ];
  }
}
