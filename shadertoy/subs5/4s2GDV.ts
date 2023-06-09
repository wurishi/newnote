import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
/*by musk License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

	Testing some glass material rendering.
	You can rotate the object with the mouse.

*/

//functions that build rotation matrixes
mat2 rotate_2D(float a){float sa = sin(a); float ca = cos(a); return mat2(ca,sa,-sa,ca);}
mat3 rotate_x(float a){float sa = sin(a); float ca = cos(a); return mat3(1.,.0,.0,    .0,ca,sa,   .0,-sa,ca);}
mat3 rotate_y(float a){float sa = sin(a); float ca = cos(a); return mat3(ca,.0,sa,    .0,1.,.0,   -sa,.0,ca);}
mat3 rotate_z(float a){float sa = sin(a); float ca = cos(a); return mat3(ca,sa,.0,    -sa,ca,.0,  .0,.0,1.);}



//2D texture based 3 component 1D, 2D, 3D noise
vec3 noise(float p){return texture(iChannel0,vec2(p/iChannelResolution[0].x,.0)).xyz;}
vec3 noise(vec2 p){return texture(iChannel0,p/iChannelResolution[0].xy).xyz;}
vec3 noise(vec3 p){float m = mod(p.z,1.0);float s = p.z-m; float sprev = s-1.0;if (mod(s,2.0)==1.0) { s--; sprev++; m = 1.0-m; };return mix(texture(iChannel0,p.xy/iChannelResolution[0].xy+noise(sprev).yz).xyz,texture(iChannel0,p.xy/iChannelResolution[0].xy+noise(s).yz).xyz,m);}

vec3 noise(float p, float lod){return texture(iChannel0,vec2(p/iChannelResolution[0].x,.0),lod).xyz;}
vec3 noise(vec2 p, float lod){return texture(iChannel0,p/iChannelResolution[0].xy,lod).xyz;}
vec3 noise(vec3 p, float lod){float m = mod(p.z,1.0);float s = p.z-m; float sprev = s-1.0;if (mod(s,2.0)==1.0) { s--; sprev++; m = 1.0-m; };return mix(texture(iChannel0,p.xy/iChannelResolution[0].xy+noise(sprev,lod).yz,lod).xyz,texture(iChannel0,p.xy/iChannelResolution[0].xy+noise(s,lod).yz,lod).xyz,m);}


#define t iTime

float df_obj(vec3 p)
{
	
	float a = (length(p.xz)-1.0-p.y*.15)*.85;
	a = max(abs(p.y)-1.0,a);
	float a2 = (length(p.xz)-0.9-p.y*.15)*.85;
	a = max(a,-max(-.8-p.y,a2));
	a = max(a,-length(p+vec3(.0,4.0,.0))+3.09);
	a = a;
	
	vec3 p2 = p; p2.xz*=(1.0-p.y*.15);
	float angle = atan(p2.x,p2.z);
	float mag = length(p2.xz);
	angle = mod(angle,3.14159*.125)-3.14159*.125*.5;
	p2.xz = vec2(cos(angle),sin(angle))*mag;
	a = max(a,(-length(p2+vec3(-7.0,0.0,0.0))+6.05)*.85);
	
	return a;
}


float df(vec3 p)
{
	return df_obj(p);
}

vec3 nf(vec3 p)
{
	float e = .02;
	float dfp = df(p);
	return vec3(
		(dfp+df(p+vec3(e,.0,.0)))/e,
		(dfp+df(p+vec3(.0,e,.0)))/e,
		(dfp+df(p+vec3(.0,.0,e)))/e);
}

vec3 tex(vec3 d)
{
	return pow(texture(iChannel1,d.xy).xyz*1.4,vec3(1.4));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy * 2.0 - 1.0;
	uv.x *= iResolution.x/iResolution.y;
	
	vec2 mouse = iMouse.xy/ iResolution.xy*2.0-1.0;
	mouse.x *= iResolution.x/iResolution.y*4.0;
	
	mat3 rotmat = rotate_x(mouse.y*4.0+sin(t*.1)*.3+4.2)*rotate_y(mouse.x+t*.125-1.0/t+sin(t*.35));
	
	vec3 pos = vec3(.0,.0,-5.0)*rotmat ;
	vec3 dir = normalize(vec3(uv,2.5))*rotmat;
	
	vec3 light_dir = normalize(vec3(.4,.5,.6));
	vec3 light_color = vec3(.6,.5,.4);
	
	float dist;
	
	for (int i=0; i<80; i++)
	{
		dist = df(pos);
		pos+=dir*dist;
		if (dist<.00001) break;
	}

	vec3 color = vec3(1.0);
	vec3 n = nf(pos);
	
	vec3 dfdxn = dFdx(n);
	vec3 dfdyn = dFdy(n);
	
	float lines = length((abs(dfdxn)+abs(dfdyn))*3.0);
	lines = lines*3.75;
	lines = lines-1.0;
	lines = clamp(lines,.0,1.0);
	if (lines>1.0)lines = 1.0;
	
	color = tex(dir).xyz;
	
	if (length(pos)>5.0)
	{
		//color = vec3(1.0);
	}
	else
	{
		float oa = 0.5;//df(pos+n)*.5+.5;
		float od = 1.0;

		float ior = .8;
		
		//oa -= mod(oa,.33);
		
		vec3 drefl = reflect(dir,n);
		vec3 drefr = refract(dir,n,ior);
		
		float diffuse = max(.0,dot(n,light_dir)*.8+.2)*od*oa*1.5;
		float fresnel1 = dot(-dir,n);
		
		
		vec3 pos2 = pos+drefr*.05;
		for (int i=0; i<40; i++)
		{
			float dist = df(pos2);
			pos2+=drefr*-dist;
			if (dist>-.0001) break;
		}
		vec3 n2 = nf(pos2);
		vec3 drefl2 = reflect(drefr,-n2);
		vec3 drefr2 = refract(drefr,-n2,ior);
		float fresnel2 = dot(-drefr,n2);
		
		vec3 pos3 = pos2+drefr2*.02;
		for (int i=0; i<70; i++)
		{
			float dist = df(pos3);
			pos3+=drefr * dist;
			if (dist<.0001) break;
		}
		vec3 n3 = nf(pos3);
		vec3 drefl3 = reflect(drefr2,n3);
		vec3 drefr3 = refract(drefr2,n3,ior);
		float fresnel3 = dot(-drefr2,n3);
		
		vec3 pos4 = pos3+drefr3*.02;
		for (int i=0; i<40; i++)
		{
			float dist = df(pos4);
			pos4+=drefr*-dist;
			if (dist>-.0001) break;
		}
		vec3 n4 = nf(pos4);
		vec3 drefl4 = normalize(reflect(drefr3,-n4));
		vec3 drefr4 = normalize(refract(drefr3,-n4,ior));
		float fresnel4 = dot(-drefr3,n4);
		
		
		if (df(pos4)<0.1)
		{
			color.r = tex(normalize(refract(drefr3,-n4,ior*.99))).r*.7;
			color.g = tex(normalize(refract(drefr3,-n4,ior*1.0))).g*.7;
			color.b = tex(normalize(refract(drefr3,-n4,ior*1.01))).b*.7;
			//color = mix(color,texture(iChannel1,drefl3.xy).xyz,1.0-fresnel3);
			color += vec3(.01);
		}
		else
		{
			color.r = tex(normalize(refract(drefr,-n2,ior*.99))).r;
			color.g = tex(normalize(refract(drefr,-n2,ior*1.0))).g;
			color.b = tex(normalize(refract(drefr,-n2,ior*1.01))).b;
		}
		
		color = mix(texture(iChannel1,drefl2.xy).xyz,color,pow(-fresnel2,.2));
		color = mix(tex(drefl).xyz,color*.7,pow(fresnel1,.5));
		color += vec3(.01);
		//color = n2;
	}
	
	vec3 color0 = mix(color,vec3(.0),lines);
	vec3 color1 = n*.4+.4;
	vec3 color2 = dfdxn+dfdyn;
	vec3 color3 = vec3(lines);
	
	float mt = mod(t,32.0);
	float mti = mod(t,1.0);
	
	color += noise(vec3(fragCoord.xy,t*60.0))*0.01;
	
	fragColor = vec4(pow(color,vec3(.5)),1.0);
}
`;

export default class implements iSub {
  key(): string {
    return '4s2GDV';
  }
  name(): string {
    return '缺少天空盒Empty Glass';
  }
  sort() {
    return 505;
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
      webglUtils.DEFAULT_NOISE, //
      webglUtils.WOOD_TEXTURE,
    ];
  }
}
