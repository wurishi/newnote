import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
#define HIGH_QUALITY

#ifdef HIGH_QUALITY
#define STEPS 130
#define ALPHA_WEIGHT 0.015
#define BASE_STEP 0.025
#else
#define STEPS 50
#define ALPHA_WEIGHT 0.05
#define BASE_STEP 0.1
#endif

#define time iTime
vec2 mo;
vec2 rot(in vec2 p, in float a){float c = cos(a), s = sin(a);return p*mat2(c,s,-s,c);}
float hash21(in vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
float noise(in vec3 p)
{
	vec3 ip = floor(p), fp = fract(p);
    fp = fp*fp*(3.0-2.0*fp);
	vec2 tap = (ip.xy+vec2(37.0,17.0)*ip.z) + fp.xy;
	vec2 cl = textureLod( iChannel0, (tap + 0.5)/256.0, 0.0 ).yx;
	return mix(cl.x, cl.y, fp.z);
}

float fbm(in vec3 p, in float sr)
{
    p *= 3.5;
    float rz = 0., z = 1.;
    for(int i=0;i<4;i++)
    {
        float n = noise(p-time*.6);
        rz += (sin(n*4.4)-.45)*z;
        z *= .47;
        p *= 3.5;
    }
    return rz;
}

vec4 map(in vec3 p)
{
    float dtp = dot(p,p);
	p = .5*p/(dtp + .2);
    p.xz = rot(p.xz, p.y*2.5);
    p.xy = rot(p.xz, p.y*2.);
    
    float dtp2 = dot(p, p);
    p = (mo.y + .6)*3.*p/(dtp2 - 5.);
    float r = clamp(fbm(p, dtp*0.1)*1.5-dtp*(.35-sin(time*0.3)*0.15), 0. ,1.);
    vec4 col = vec4(.5,1.7,.5,.96)*r;
    
    float grd = clamp((dtp+.7)*0.4,0.,1.);
    col.b += grd*.6;
    col.r -= grd*.5;    
    vec3 lv = mix(p,vec3(0.3),2.);
    grd = clamp((col.w - fbm(p+lv*.05,1.))*2., 0.01, 1.5 );
    col.rgb *= vec3(.5, 0.4, .6)*grd + vec3(4.,0.,.4);
    col.a *= clamp(dtp*2.-1.,0.,1.)*0.07+0.87;
    
    return col;
}

vec4 vmarch(in vec3 ro, in vec3 rd)
{
	vec4 rz = vec4(0);
	float t = 2.5;
    t += 0.03*hash21(gl_FragCoord.xy);
	for(int i=0; i<STEPS; i++)
	{
		if(rz.a > 0.99 || t > 6.)break;
		vec3 pos = ro + t*rd;
        vec4 col = map(pos);
        float den = col.a;
        col.a *= ALPHA_WEIGHT;
		col.rgb *= col.a*1.7;
		rz += col*(1. - rz.a);
        t += BASE_STEP - den*(BASE_STEP-BASE_STEP*0.015);
	}
    return rz;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
	vec2 p = fragCoord.xy/iResolution.xy*2. - 1.;
	p.x *= iResolution.x/iResolution.y*.85;
    p *= 1.1;
	mo = 2.0*iMouse.xy/iResolution.xy;
    mo = (mo==vec2(.0))?mo=vec2(0.5,1.):mo;
	
	vec3 ro = 4.*normalize(vec3(cos(2.75-2.0*(mo.x+time*0.05)), sin(time*0.22)*0.2, sin(2.75-2.0*(mo.x+time*0.05))));
	vec3 eye = normalize(vec3(0) - ro);
	vec3 rgt = normalize(cross(vec3(0,1,0), eye));
	vec3 up = cross(eye,rgt);
	vec3 rd = normalize(p.x*rgt + p.y*up + (3.3-sin(time*0.3)*.7)*eye);
	
	vec4 col = clamp(vmarch(ro, rd),0.,1.);
    col.rgb = pow(col.rgb, vec3(.9));
    /*col.rb = rot(col.rg, 0.35);
    col.gb = rot(col.gb, -0.1);*/
    
    fragColor = vec4(col.rgb, 1.0);
}
`;

export default class implements iSub {
  key(): string {
    return 'XlB3zV';
  }
  name(): string {
    return 'Magnetismic';
  }
  sort() {
    return 302;
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
      webglUtils.DEFAULT_NOISE
    ]
  }
}
