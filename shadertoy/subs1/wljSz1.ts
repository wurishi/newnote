import { GUI } from 'dat.gui';
import {
  createCanvas,
  iSub,
  PRECISION_MEDIUMP,
  WEBGL_2,
  PRECISION_HIGHP,
  PRECISION_LOW,
} from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
uniform bool u_bumpy;
uniform bool u_light_source;
uniform bool u_splotches;
uniform bool u_high;

float T;
float hash(float x){
    return fract(sin(x*54265.135165416));
}

// by TinyTexel, mentioned at https://www.iquilezles.org/www/articles/smin/smin.htm
float smin(float a, float b, float k){
    float h = max(k-abs(a-b), 0.0)/k;
    return min(a, b) - h*h*h*k*(1.0/6.0);
}

// store the matrix globally so the 2D "normal map" sticks better
mat2 R;
float map(vec3 p){
    // rotate
    float r = 3.14159*sin(p.z*0.15)+T*0.25;
    R = mat2(cos(r), sin(r), -sin(r), cos(r));
    p.xy *= R;
    vec3 op = p;
    
    // per-cell random values
    float h = hash(floor(p.x+p.y+p.z));
    float h2 = 3.141*hash(floor(-p.x-p.y-p.z));
    
    // bumpy
    if(u_bumpy) {
      float f = pow(texture(iChannel2, p.xy*0.1).b,4.0);
      vec3 dd = vec3(sin(p.z*71.), cos(p.x*73.), -cos(p.y*77.))
                -0.6*vec3(cos(p.y*141.), sin(p.z*143.), -sin(p.x*147.));
      p = mix(p, p-dd*0.005, f);
    }
    
    // repeat lattice
    const float a = 1.0;
    p = mod(p, a)-a*0.5;
    
    // primitives
    // center sphere
    float v = length(p)-(0.02+(0.18*h*(0.6+0.4*sin(3.0*T+h2)) ));
    // four connecting cylinders
    v = smin(v, length(p.xy+0.01*sin(-3.2*T+13.0*op.z))-0.03, 0.2);
    v = smin(v, length(p.xz+0.01*cos(-4.1*T+11.0*(op.y-op.z)))-0.03, 0.2);
    v = smin(v, length(p.yz+0.01*sin(-5.0*T-8.0*(op.x-op.z)))-0.03, 0.2);
    
    return v;
}

vec3 normal(vec3 p){
    mat3 e = mat3(0.001);
    return normalize(vec3(map(p+e[0]), map(p+e[1]), map(p+e[2])) - map(p));
}

vec3 march(vec3 o, vec3 dir){
    vec3 p = o;
    float e = 0.0;
    for(int i = 0; i < 100; ++i){
        float d = 0.5*map(p);
        e += d;
        if(d < 0.005 || e > 12.0)
            break;
        p += d*dir;
    }
    
    return p;
}

vec4 subsurface(vec3 o, vec3 dir){
    vec3 p = o;
    float e = 0.0;
    for(int i = 0; i < 7; ++i){
        float d = map(p);
        e += -d;
        if(d > -0.001)
            break;
        p -= d*dir;
    }
    
    return vec4(p, e);
}

float G(float dotNV, float k){
	return 1.0/(dotNV*(1.0f-k)+k);
}

// from http://filmicworlds.com/blog/optimizing-ggx-shaders-with-dotlh/
float ggx(vec3 N, vec3 V, vec3 L, float roughness, float F0){
	float alpha = roughness*roughness;

	vec3 H = normalize(V+L);

	float dotNL = clamp(dot(N,L),0.,1.);
	float dotNV = clamp(dot(N,V),0.,1.);
	float dotNH = clamp(dot(N,H),0.,1.);
	float dotLH = clamp(dot(L,H),0.,1.);

	float F, D, vis;

	float alphaSqr = alpha*alpha;
	float pi = 3.14159;
	float denom = dotNH * dotNH *(alphaSqr - 1.0) + 1.0;
	D = alphaSqr/(pi * denom * denom);

	float dotLH5 = pow(1.0 - dotLH, 5.0);
	F = F0 + (1.0 - F0)*(dotLH5);

	float k = alpha * 0.5;

	return dotNL * D * F * G(dotNL,k)*G(dotNV,k);
}

float sphere(vec3 ro, vec3 rd, vec3 pos, float r){
    vec3 ce = ro-pos;
    float b = dot(rd, ce);
    return -b-sqrt(b*b-dot(ce, ce)+r*r);
}

void mainImage(out vec4 fragColor, vec2 fragCoord){
    vec2 uv = fragCoord/iResolution.xy;
    
    const float tm = 2.0;
    T = iTime*tm;
    float ot = T;
    
    // quadratic, increase this if your gpu is gpu enough
    const int samples = 2;
    
    vec3 c = vec3(0);
    for(int y = 0; y < samples; ++y)
    for(int x = 0; x < samples; ++x){
        // anti-aliasing
        vec2 p = -1.0 + 2.0 * (uv + (-0.5+(vec2(x, y)/float(samples)))/iResolution.xy);
        p.x *= iResolution.x/iResolution.y;
        
        // motion blur
        float r = texelFetch(iChannel0, ivec2(mod(fragCoord*float(samples)+vec2(x,y),1024.)),0).r;
        T = ot+(tm*r)/36.0;
        
        // camera setup
        vec3 cam = vec3(0.1*sin(T*0.51),0.1*cos(T*0.59),T);
        vec3 l = vec3(0.6*cos(T*0.83),0.6*sin(T*0.79),cam.z+3.0+0.5*sin(0.7*T));
        //vec3 l = vec3(0.6*cos(T*0.83),0.6*sin(T*0.79),cam.z+3.0);
    	vec3 dir = normalize(vec3(p, 2.0)+0.1*vec3(sin(T*0.63),cos(T*0.71),0));
        
        // solve intersection and normal
    	vec3 pos = march(cam, dir);
        vec3 mp = pos;
        mp.xy *= R;
        vec3 np = pos+vec3(0,0,-0.08*texture(iChannel1, mp.xy*4.0).r);
        vec3 n = normalize(mix(normal(np), pow(texture(iChannel2, pos.xy*2.0).xyz, vec3(2)), 0.08));
        // vec3 np = pos;
        // vec3 n = vec3(1,1,1);
        
        // shade
        vec3 ld = normalize(l-pos);
        vec3 alb = mix((vec3(0.3,0.5,0.9)),
                       (vec3(0.75,0.9,0.4)),
                       texture(iChannel2, 0.04*mp.xy).r)*1.25;
        // vec3 alb = vec3(0.3,0.5,0.9);
        float mat;
        if(u_splotches) {
          mat = smoothstep(0.1,0.8,pow(texture(iChannel2, 0.14*mp.xy).b, 3.0));
          alb = mix(alb, vec3(0.9,0.78,0.42), mat);
        }
        float dif = 0.5+0.5*dot(n, ld);
        
        float spe;
        if(u_splotches) {
          spe = ggx(n, -dir, ld, mix(0.3,0.5,mat), mix(0.7,1.0,mat));
        }
        else {
          spe = ggx(n, -dir, ld, 0.3, 0.7);
        }
        float att = 1.0+pow(distance(l, pos), 2.0);
        dif /= att;
        spe /= att;
        
        // subsurface scattering
        vec3 h = normalize(mix(-normal(pos), dir, 0.5));
        // sv.zyz contains outgoing position, w contains accumulate distance (path "tightness")
        vec4 sv = subsurface(pos+h*0.02, dir);
        // subsurface magic term
        float sss = max(0.0, 1.0-3.0*sv.w);
        // light visibility across the volume
        float ssha = max(0.0, dot(normal(sv.xyz), normalize(l-sv.xyz)));
        sss /= att;
        ssha /= att;
        
        // mix reflecting and refracting contributions
        dif = mix(dif, mix(sss, ssha, 0.2), 0.5);
        
        c += alb*dif+0.025*spe;
        
        // draw light source
        if(u_light_source) {
          float vs = max(0.0, sphere(cam, dir, l, 0.03));
          float occluded = step(distance(cam, l), distance(cam,pos));
          c += 0.4*vs * occluded;
          vec3 e = pos - cam;
          vec3 cp = cam + e * dot(e, l-cam) / dot(e, e);
          c += 1.6*max(0.0, 1.0-pow(distance(cp, l), 0.1)) * (0.5+0.5*occluded);
        }
    }
    
	fragColor.rgb = c/float(samples*samples);
    
    // "color grade" and gamma
    fragColor.rgb = mix(vec3(dot(fragColor.rgb, vec3(.2125,.7154,.0721))), fragColor.rgb, 1.4);
    if(u_high) {
      fragColor.rgb = smoothstep(0.12, 1.6, fragColor.rgb);
    }
    else {
      fragColor.rgb = smoothstep(0.0, 1.25, fragColor.rgb);
    }
    fragColor.rgb = pow(fragColor.rgb, vec3(1.0/2.2));
    fragColor.a = 1.;
}
`;

let gui: GUI;
const api = {
  u_bumpy: true,
  u_light_source: true,
  u_splotches: false,
  u_high: false,
};

export default class implements iSub {
  key(): string {
    return 'wljSz1';
  }
  name(): string {
    return 'Subsurface lattice';
  }
  sort() {
    return 200;
  }
  webgl() {
    return WEBGL_2;
  }
  tags?(): string[] {
    return [];
  }
  main(): HTMLCanvasElement {
    gui = new GUI();
    gui.add(api, 'u_bumpy');
    gui.add(api, 'u_light_source');
    gui.add(api, 'u_splotches');
    gui.add(api, 'u_high');
    return createCanvas();
  }
  userFragment(): string {
    return fragment;
  }
  fragmentPrecision?(): string {
    return PRECISION_LOW;
  }
  destory(): void {
    if (gui) {
      gui.destroy();
      gui = null;
    }
  }
  initial?(gl: WebGLRenderingContext, program: WebGLProgram): Function {
    const u_bumpy = webglUtils.getUniformLocation(gl, program, 'u_bumpy');
    const u_light_source = webglUtils.getUniformLocation(
      gl,
      program,
      'u_light_source'
    );
    const u_splotches = webglUtils.getUniformLocation(
      gl,
      program,
      'u_splotches'
    );
    const u_high = webglUtils.getUniformLocation(gl, program, 'u_high');
    return () => {
      u_bumpy.uniform1i(api.u_bumpy ? 1 : 0);
      u_light_source.uniform1i(api.u_light_source ? 1 : 0);
      u_splotches.uniform1i(api.u_splotches ? 1 : 0);
      u_high.uniform1i(api.u_high ? 1 : 0);
    };
  }
  channels() {
    return [
      webglUtils.DEFAULT_NOISE, //
      webglUtils.TEXTURE2,
      webglUtils.ROCK_TEXTURE, //
    ];
  }
}
