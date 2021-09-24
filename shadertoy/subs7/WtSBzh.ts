import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
      vec2 uv = fragCoord/iResolution.xy;
    vec3 col = vec3(0.);
    float b = sqrt(64.);
    float v1 = distance(uv.y,0.5)*0.005+0.0002;
    for(float i = -0.5*b;i<=0.5*b;i++)
    for(float j=-0.5*b;j<=0.5*b;j++)
    {
    col += texture(iChannel0,uv+vec2(i,j)*v1).xyz;
    }
    col/=64.;
    float m = (1.-distance(uv.x,0.5))*(1.-distance(uv.y,0.5));
    fragColor = vec4(pow(col,vec3(mix(2.,1.,m))),1.);
}
`;

const sound = `
float rd(float t) { return fract(sin(dot(floor(fract(t*0.05)*20.),84.259))*7846.236);}
float no (float t){return mix(rd(t),rd(t+1.),smoothstep(0.,1.,fract(t)));}
float it(float t){float r=0.;float a=0.5;for(int i =0; i<5;i++){
r +=no(t/a)*a;a*=0.5;
}return r;}
float hash(float x){return fract(sin(x) * 897612.531);}
float voc(float t, float f, float ft,float t2){float x = fract(t * f) / f;
float a=(sin(x*6.5*ft)*.4+sin(x*13.*ft)+sin(x*24.*ft)*.2);
   return a* min(x * 1000., 1.) * exp(x * -200.);}
vec2 inst2(float t, float var,float t2){
    vec2 v = vec2(0., 0.);
    for(int i = 0; i < 16; ++i){
        float h = float(i);
       	float m = voc(t + h / 3., 50. + pow(2.01, (h - 8.) * .2), var,t2);
        float pan = hash(h);
        v.x += m * pan;
        v.y += m * (1. - pan);
    }
    return v * .1;
}
vec2 sons ( float time) {float tt = time*1.1;
    float vrt = smoothstep(0.2,1.,pow(it(time*0.7),2.))*30.+1.;
    float bt = pow(fract(vrt/3.14),0.2);
    float v = sin(bt*50.)*it(time*24.);
    
    float v2 =  (fract(sin(dot(time,84.259))*7846.236)-0.5);
    float v3 = v2 * smoothstep(0.,1.,(1.-pow(fract(vrt/3.14),0.1))); 
    float v4 = sin(time*250.)*(smoothstep(1.,0.,sin(vrt)*0.5+0.5));
    float f1 = sin(time*200.+it(tt*0.1)*300.)*it(tt*0.3)  ;
    float va = 50.+50.*no(time*0.5);
    return vec2((v4+v*0.05+v3*0.05)+f1*0.5)+ inst2(time,va,time)*0.25;}
vec2 mainSound( in int samp, float time )
{
    
     float ta = 0.01;    
    vec2 rev = vec2(0.);
    float sum = 0.;
    for(float t = 0.; t<2.;t +=ta){      
    float rand = fract(120.*sin(t*1000.));
    float t2 = t + ta*rand*5.;
    float amp = exp2(-t2);
    rev += sons( time - t2 ) * amp;
    sum += amp;}
    rev /= sum;    
    rev *= 10.; 
    vec2 s2 = sons(time);
    vec2 f =  clamp(mix(vec2(s2.x,rev.x),vec2(rev.y,s2.y),it(time*18.)),-1.,1.);
    return clamp(f*1.5,0.,1.);
}`;

const buffA = `

vec2 isphe ( in vec3 ro, in vec3 rd, in vec3 cen , in float rad)
{
ro -= cen;
float b = dot(rd,ro);
float c =dot(ro,ro)-rad*rad;
float h = b*b-c;
if(h<0.)return vec2(-1.);
h = sqrt(h);
return vec2(-b-h,-b+h);
}
float pi = 3.141592653589793;
void moda(inout vec2 p, float r){
float pe = (2.*pi)/r;float a=atan(p.y,p.x);
a = mod(a,pe)-pe*0.5; p = vec2(cos(a),sin(a))*length(p);
}
vec3 rore(vec3 p, float r){
float pe = (2.*3.14)/r;
float a = atan (p.z,p.x);
a = mod (a,pe)-pe*0.5;
vec2 pp = vec2 (cos(a),sin(a))*length(p.xz);
return vec3(pp.x,p.y,pp.y);}
float ov(float a, float b){return a<0.5? (2.*a*b) : (1.-2.*(1.-a)*(1.-b));}
vec3 ov (vec3 a, vec3 b) {return vec3(ov(a.x,b.x),ov(a.y,b.y),ov(a.z,b.z));}
mat2 rot (float t){float c=cos(t);float s=sin(t);return mat2(c,-s,s,c);}
float oc (vec3 p, float s){p = abs(p);return (p.x+p.y+p.z-s)*0.57735027;}
float cap (vec3 p, vec3 a, vec3 b, float r){
vec3 pa = p-a; vec3 ba = b-a; float h = clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
return length(pa-ba*h)-r;}
float smin (float a, float b, float f){float h=clamp(0.5+0.5*(b-a)/f,0.,1.);
return mix(b,a,h)-f*h*(1.-h);}
float rd(float t) { return fract(sin(dot(floor(fract(t*0.05)*20.),84.259))*7846.236);}
float no (float t){return mix(rd(t),rd(t+1.),smoothstep(0.,1.,fract(t)));}
float it(float t){float r=0.;float a=0.5;for(int i =0; i<5;i++){
r +=no(t/a)*a;a*=0.5;
}return r;}
float rd(vec2 t) { return fract(sin(dot(floor(t),vec2(957.23,84.259)))*7846.236);}
float hs(vec2 t) { return fract(sin(dot((t),vec2(957.23,84.259)))*7846.236);}
float hs2(vec2 t) { return fract(sin(dot((t),vec2(957.23,84.259)))*7846.236+iTime*3.);}
float no(vec2 t) {vec2 e= vec2(1.,0.);float a =rd(t);float b=rd(t+e.xy);float c=rd(t+e.yx);float d=rd(t+e.xx);
vec2 h = smoothstep(0.,1.,fract(t));return mix(mix(a,b,h.x),mix(c,d,h.x),h.y);}
float it(vec2 t){float r=0.;float a=0.5;for(int i =0; i<4;i++){
r +=no(t/a)*a;a*=0.5;
}return r;}
float rd2(vec2 t) { return fract(sin(dot(floor(t),vec2(957.23,84.259)))*7846.236+iTime*2.);}
float no2(vec2 t) {vec2 e= vec2(1.,0.);float a =rd2(t);float b=rd2(t+e.xy);float c=rd2(t+e.yx);float d=rd2(t+e.xx);
vec2 h = smoothstep(0.,1.,fract(t));return mix(mix(a,b,h.x),mix(c,d,h.x),h.y);}
float it2(vec2 t){float r=0.;float a=0.5;for(int i =0; i<4;i++){
r +=no2(t/a)*a;a*=0.5;
}return r;}
float vt = 0.;
float t2 = 0.;
float map(vec3 p){
float vrt = smoothstep(0.2,1.,pow(it(iTime*0.7),2.))*30.+1.; 
//float vrt = 15.;
float tt = iTime*1.1;
vec3 p2 = p*vec3(1.,0.8,1.);
p2.xz *= rot(iTime*1.1);
moda (p2.xz,vrt);
float s1 = oc(p2,3.);
t2 = ov(it(p2.xz*1.2),mix(rd(p2.xz*100.),0.5,0.8));
vec3 p3 = p;
p3.xz*=rot(p.y*it((p.x+p.z+tt*0.1)*0.3)*0.2);
p3.y += (it(p.x*0.3+tt)+it(p.z*0.3+tt))*-1.;
moda (p3.xz,vrt);
float s2 =length(p3);
for (int i =0;i<18;i ++){
float v1 = no(tt+float(i)*98.236);
float v2 = no(tt+float(i)*15.76);
float v3 = no(tt+float(i)*125.236);
float vr = iTime+float(i)*26.265+v3;
float cc = cap (p3 , vec3(sin(vr)*3.,v3,cos(vr)*3.5),vec3(sin(vr+v1*0.5)*3.5,v2,cos(vr+v1*0.5)*3.),v1*0.2);
float cc2 = length (p3+vec3(sin(tt+float(i)*48.236+v2)*3.5,v3,cos(tt+float(i)*48.236+v2)*3.5))-v3*0.2;
s2 = smin (s2,cc,0.8);
s2 = smin(s2,cc2,0.8);

}
vt =s2;
return min(s1,s2);}
vec3 nor( vec3 p ){ vec2 e = vec2(0.01,0.);return normalize(map(p)-vec3(map(p-e.xyy),map(p-e.yxy),map(p-e.yyx)));}
vec3 sky (vec3 p){return max(smoothstep(-1.,1.,dot(p,vec3(1,0.,0.)))*vec3(0.2,0.4,0.4),smoothstep(0.5,0.8,dot(p,vec3(0,1.,0.))));}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
float time = iTime;
float tau = 6.28318530717958647692;
    vec2 uv = -1. + 2. * fragCoord/iResolution.xy;
    uv.x*= iResolution.x/iResolution.y;
    float t1 = time;
    vec3 e = vec3(0.,0.,-6.);
    vec3 r = normalize(vec3(uv,1.));
    float vm1 = (it(time*0.7)-0.4)*0.5;
    e.yz *= rot(vm1);
    r.yz *= rot(vm1);
    vec3 p = e;
   
    float side =sign(map(p));
    vec3 col ;
    float dd = 0.;
    float prod  = 1.;
    vec2 vol = isphe (e,r,vec3(0.,0.8,0.), 4.);
    if(vol.y>0.0)
    {
    for (int i = 0; i< 48; i ++){
    float d = map(p)*side;
    if(dd>20.){dd = 20.;break;}
    if(d<0.001){
    float tex = mix(0.9,1.,smoothstep(0.3,0.8,t2));
    vec3 n = nor(p)*side;
    float opa = smoothstep(0.1,0.,vt);
     vec3 l1 = sky(reflect(r,n*tex))*0.8;
     //float oc =mix(smoothstep(-1.,1.,map(p+n*0.3)/0.3),1.,opa);
     //l1*=oc;
     //vec3 r1 = mix(sky(r),l1*0.8,1.-clamp(map(p),0.,1.));
     col = l1;
    side=-side;
    d=0.01;
    r = refract(r,n,1.+0.1*side);
    //prod *= 0.;
    if(opa==0.)break;
    //break;
    }
    p += r*d;
    dd +=d;
    }
    }
    else {dd = 20.;}
  
     //vec3 col = nor(p);
     //vec3 l1 = sky(reflect(r,col))*0.5;
     //l1 += smoothstep(.8,-0.5,pow(dot(col,-r),0.3));
     //float m = clamp(map(p),0.,1.);
     
     
     float m = smoothstep(0.,15.,dd);
     vec3 c2 = mix(col,(3.*abs(1.-2.*fract(m*2.5+vec3(0.,-1./3.,1./3.)))-1.)*col,0.07);
     vec3 r1 = mix(c2*0.8,sky(r),m);
     vec3 gr = vec3(hs2(uv),hs2(uv+59.236),hs2(uv+958.236));
     vec3 r2 = ov(r1,mix(vec3(0.5),gr,0.2));
     vec3 f1 = pow(r2,vec3(0.5));
    float fno = it2(uv*5.);
    float fo1 = smoothstep(0.75,0.9,fno);
    float fo2 = smoothstep(0.78,0.9,fno);
    float rgo = smoothstep(0.3,1.,it(time*5.));
    float fo3 = (fo1-fo2)+0.5-fo2*0.5;
    vec3 f2 =ov(f1,vec3(mix(0.5,1.-fo3,rgo*0.7)));
    fragColor = vec4(f2,1.);
}`;

export default class implements iSub {
    key(): string {
        return 'WtSBzh';
    }
    name(): string {
        return 'prism liquid';
    }
    sort() {
        return 724;
    }
    tags?(): string[] {
        return [];
    }
    main(): HTMLCanvasElement {
        return createCanvas();
    }
    webgl() {
        return WEBGL_2;
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
        ];
    }
}
