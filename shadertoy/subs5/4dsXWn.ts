import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
vec3 sunLight  = normalize( vec3(  0.35, 0.14,  0.3 ) );
const vec3 sunColour = vec3(1.0, .7, .55);
float gTime, cloudy;
vec3 flash;

#define CLOUD_LOWER 2800.0
#define CLOUD_UPPER 3800.0

#define TEXTURE_NOISE

#define MOD2 vec2(.16632,.17369)
#define MOD3 vec3(.16532,.17369,.15787)


//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
float Hash( float p )
{
	vec2 p2 = fract(vec2(p) * MOD2);
    p2 += dot(p2.yx, p2.xy+19.19);
	return fract(p2.x * p2.y);
}
float Hash(vec3 p)
{
	p  = fract(p * MOD3);
    p += dot(p.xyz, p.yzx + 19.19);
    return fract(p.x * p.y * p.z);
}

//--------------------------------------------------------------------------
#ifdef TEXTURE_NOISE

//--------------------------------------------------------------------------
float Noise( in vec2 f )
{
    vec2 p = floor(f);
    f = fract(f);
    f = f*f*(3.0-2.0*f);
    float res = textureLod(iChannel0, (p+f+.5)/256.0, 0.0).x;
    return res;
}
float Noise( in vec3 x )
{
    #if 0
    return texture(iChannel2, x*0.05).x;
    #else
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = textureLod( iChannel0, (uv+ 0.5)/256.0, 0.0 ).yx;
	return mix( rg.x, rg.y, f.z );
    #endif
}
#else

//--------------------------------------------------------------------------


float Noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0;
    float res = mix(mix( Hash(n+  0.0), Hash(n+  1.0),f.x),
                    mix( Hash(n+ 57.0), Hash(n+ 58.0),f.x),f.y);
    return res;
}
float Noise(in vec3 p)
{
    vec3 i = floor(p);
	vec3 f = fract(p); 
	f *= f * (3.0-2.0*f);

    return mix(
		mix(mix(Hash(i + vec3(0.,0.,0.)), Hash(i + vec3(1.,0.,0.)),f.x),
			mix(Hash(i + vec3(0.,1.,0.)), Hash(i + vec3(1.,1.,0.)),f.x),
			f.y),
		mix(mix(Hash(i + vec3(0.,0.,1.)), Hash(i + vec3(1.,0.,1.)),f.x),
			mix(Hash(i + vec3(0.,1.,1.)), Hash(i + vec3(1.,1.,1.)),f.x),
			f.y),
		f.z);
}
#endif

const mat3 m = mat3( 0.00,  0.80,  0.60,
                    -0.80,  0.36, -0.48,
                    -0.60, -0.48,  0.64 ) * 1.7;
//--------------------------------------------------------------------------
float FBM( vec3 p )
{
	p*= .0005;
    float f;
	
	f = 0.5000 * Noise(p); p = m*p; //p.y -= gTime*.2;
	f += 0.2500 * Noise(p); p = m*p; //p.y += gTime*.06;
	f += 0.1250 * Noise(p); p = m*p;
	f += 0.0625   * Noise(p); p = m*p;
	f += 0.03125  * Noise(p); p = m*p;
	f += 0.015625 * Noise(p);
    return f;
}
//--------------------------------------------------------------------------
float FBMSH( vec3 p )
{
	p*= .0005;
        
    float f;
	
	f = 0.5000 * Noise(p); p = m*p; //p.y -= gTime*.2;
	f += 0.2500 * Noise(p); p = m*p; //p.y += gTime*.06;
	f += 0.1250 * Noise(p); p = m*p;
	f += 0.0625   * Noise(p); p = m*p;
//	f += 0.03125  * Noise(p); p = m*p;
///	f += 0.015625 * Noise(p);
    return f;
}

//--------------------------------------------------------------------------
float MapSH(vec3 p)
{
	
	float h = -(FBM(p)-cloudy-.6);
    //h *= smoothstep(CLOUD_LOWER, CLOUD_LOWER+100., p.y);
    //h *= smoothstep(CLOUD_LOWER-500., CLOUD_LOWER, p.y);
    h *= smoothstep(CLOUD_UPPER+100., CLOUD_UPPER, p.y);
	return h;
}

//--------------------------------------------------------------------------

float SeaNoise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0;
    float res = mix(mix( Hash(n+  0.0), Hash(n+  1.0),f.x),
                    mix( Hash(n+ 57.0), Hash(n+ 58.0),f.x),f.y);
    return res;
}
float SeaFBM( vec2 p )
{
    p*= .001;
    float f;
	f = (sin(sin(p.x *1.22+gTime) + cos(p.y *.14)+p.x*.15+p.y*1.33-gTime)) * 1.0;
    
	f += (sin(p.x *.9+gTime + p.y *.3-gTime)) * 1.0;
    f += (cos(p.x *.7-gTime - p.y *.4-gTime)) * .5;
    f += 1.5000 * (.5-abs(SeaNoise(p)-.5)); p =  p * 2.05;
    f += .75000 * (.5-abs(SeaNoise(p)-.5)); p =  p * 2.02;
    f += 0.2500 * SeaNoise(p); p =  p * 2.07;
    f += 0.1250 * SeaNoise(p); p =  p * 2.13;
    //f += 0.0625 * Noise(p);

	return f;
}

//--------------------------------------------------------------------------
float Map(vec3 p)
{
	float h = -(FBM(p)-cloudy-.6);
    
	return h;
}

//--------------------------------------------------------------------------
float SeaMap(in vec2 pos)
{

	return SeaFBM(pos) * (20.0 + cloudy*170.0);
}

//--------------------------------------------------------------------------
vec3 SeaNormal( in vec3 pos, in float d, out float height)
{
	float p = .005 * d * d / iResolution.x;
	vec3 nor  	= vec3(0.0,		    SeaMap(pos.xz), 0.0);
	vec3 v2		= nor-vec3(p,		SeaMap(pos.xz+vec2(p,0.0)), 0.0);
	vec3 v3		= nor-vec3(0.0,		SeaMap(pos.xz+vec2(0.0,-p)), -p);
    height = nor.y;
	nor = cross(v2, v3);
	return normalize(nor);
}

//--------------------------------------------------------------------------
float GetLighting(vec3 p, vec3 s)
{
    float l = MapSH(p)-MapSH(p+s*200.);
    return clamp(-l*2., 0.05, 1.0);
}



//--------------------------------------------------------------------------
// Grab all sky information for a given ray from camera
vec3 GetSky(in vec3 pos,in vec3 rd, out vec2 outPos)
{
	float sunAmount = max( dot( rd, sunLight), 0.0 );
	// Do the blue and sun...	
	vec3  sky = mix(vec3(.0, .1, .4), vec3(.3, .6, .8), 1.0-rd.y);
	sky = sky + sunColour * min(pow(sunAmount, 1500.0) * 5.0, 1.0);
	sky = sky + sunColour * min(pow(sunAmount, 10.0) * .6, 1.0);
	
	// Find the start and end of the cloud layer...
	float beg = ((CLOUD_LOWER-pos.y) / rd.y);
	float end = ((CLOUD_UPPER-pos.y) / rd.y);
	
	// Start position...
	vec3 p = vec3(pos.x + rd.x * beg, 0.0, pos.z + rd.z * beg);
	outPos = p.xz;
    beg +=  Hash(p)*150.0;

	// Trace clouds through that layer...
	float d = 0.0;
	vec3 add = rd * ((end-beg) / 55.0);
	vec2 shade;
	vec2 shadeSum = vec2(0.0, .0);
	shade.x = 1.0;
	// I think this is as small as the loop can be
	// for a reasonable cloud density illusion.
	for (int i = 0; i < 55; i++)
	{
		if (shadeSum.y >= 1.0) break;
		float h = Map(p);
		shade.y = max(h, 0.0); 

        shade.x = GetLighting(p, sunLight);

		shadeSum += shade * (1.0 - shadeSum.y);

		p += add;
	}
	//shadeSum.x /= 10.0;
	//shadeSum = min(shadeSum, 1.0);
	
	vec3 clouds = mix(vec3(pow(shadeSum.x, .6)), sunColour, (1.0-shadeSum.y)*.4);
    //vec3 clouds = vec3(shadeSum.x);
	
	//clouds += min((1.0-sqrt(shadeSum.y)) * pow(sunAmount, 4.0), 1.0) * 2.0;
   
    clouds += flash * (shadeSum.y+shadeSum.x+.2) * .5;

	sky = mix(sky, min(clouds, 1.0), shadeSum.y);
	
	return clamp(sky, 0.0, 1.0);
}

//--------------------------------------------------------------------------
vec3 GetSea(in vec3 pos,in vec3 rd, out vec2 outPos)
{
	vec3 sea;
	float d = -pos.y/rd.y;
	vec3 p = vec3(pos.x + rd.x * d, 0.0, pos.z + rd.z * d);
	outPos = p.xz;
	
	float dis = length(p-pos);
    float h = 0.0;
	vec3 nor = SeaNormal(p, dis, h);

	vec3 ref = reflect(rd, nor);
	ref.y = max(ref.y, 0.0015);
	sea = GetSky(p, ref, p.xz);
	h = h*.005 / (1.0+max(dis*.02-300.0, 0.0));
   	float fresnel = max(dot(nor, -rd),0.0);
    fresnel = pow(fresnel, .3)*1.1;
    
	sea = mix(sea*.6, (vec3(.3, .4, .45)+h*h) * max(dot(nor, sunLight), 0.0), min(fresnel, 1.0));
	
	float glit = max(dot(ref, sunLight), 0.0);
	sea += sunColour * pow(glit, 220.0) * max(-cloudy*100.0, 0.0);
	
	return sea;
}

//--------------------------------------------------------------------------
vec3 CameraPath( float t )
{
    return vec3(4000.0 * sin(.16*t)+12290.0, 0.0, 8800.0 * cos(.145*t+.3));
} 

//--------------------------------------------------------------------------
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float m = (iMouse.x/iResolution.x)*30.0;
	gTime = iTime*.5 + m + 75.5;
	cloudy = cos(gTime * .25+.4) * .26;
    float lightning = 0.0;
    
    if (cloudy >= .2)
    {
        float f = mod(gTime+1.5, 2.5);
        if (f < .8)
        {
            f = smoothstep(.8, .0, f)* 1.5;
        	lightning = mod(-gTime*(1.5-Hash(gTime*.3)*.002), 1.0) * f;
        }
    }
    
    flash = clamp(vec3(1., 1.0, 1.2) * lightning, 0.0, 1.0);
       
	
    vec2 xy = fragCoord.xy / iResolution.xy;
	vec2 uv = (-1.0 + 2.0 * xy) * vec2(iResolution.x/iResolution.y,1.0);
	
	vec3 cameraPos = CameraPath(gTime - 2.0);
	vec3 camTar	   = CameraPath(gTime - .0);
	camTar.y = cameraPos.y = sin(gTime) * 200.0 + 300.0;
	camTar.y += 370.0;
	
	float roll = .1 * sin(gTime * .25);
	vec3 cw = normalize(camTar-cameraPos);
	vec3 cp = vec3(sin(roll), cos(roll),0.0);
	vec3 cu = cross(cw,cp);
	vec3 cv = cross(cu,cw);
	vec3 dir = normalize(uv.x*cu + uv.y*cv + 1.3*cw);
	mat3 camMat = mat3(cu, cv, cw);

	vec3 col;
	vec2 pos;
	if (dir.y > 0.0)
	{
		col = GetSky(cameraPos, dir, pos);
	}else
	{
		col = GetSea(cameraPos, dir, pos);
	}
	float l = exp(-length(pos) * .00002);
	col = mix(vec3(.6-cloudy*1.2)+flash*.3, col, max(l, .2));
	
	// Do the lens flares...
	float bri = dot(cw, sunLight) * 2.7 * clamp(-cloudy+.2, 0.0, .2);
	if (bri > 0.0)
	{
		vec2 sunPos = vec2( dot( sunLight, cu ), dot( sunLight, cv ) );
		vec2 uvT = uv-sunPos;
		uvT = uvT*(length(uvT));
		bri = pow(bri, 6.0)*.6;

		float glare1 = max(1.2-length(uvT+sunPos*2.)*2.0, 0.0);
		float glare2 = max(1.2-length(uvT+sunPos*.5)*4.0, 0.0);
		uvT = mix (uvT, uv, -2.3);
		float glare3 = max(1.2-length(uvT+sunPos*5.0)*1.2, 0.0);

		col += bri * sunColour * vec3(1.0, .5, .2)  * pow(glare1, 10.0)*25.0;
		col += bri * vec3(.8, .8, 1.0) * pow(glare2, 8.0)*9.0;
		col += bri * sunColour * pow(glare3, 4.0)*10.0;
	}
	
	vec2 st =  uv * vec2(.5+(xy.y+1.0)*.3, .02)+vec2(gTime*.5+xy.y*.2, gTime*.2);
	// Rain...
#ifdef TEXTURE_NOISE
 	float f = texture(iChannel0, st, -100.0).y * texture(iChannel0, st*.773, -100.0).x * 1.55;
#else
	float f = Noise( st*200.5 ) * Noise( st*120.5 ) * 1.3;
#endif
	float rain = clamp(cloudy-.15, 0.0, 1.0);
	f = clamp(pow(abs(f), 15.0) * 5.0 * (rain*rain*125.0), 0.0, (xy.y+.1)*.6);
	col = mix(col, vec3(0.15, .15, .15)+flash, f);
	col = clamp(col, 0.0,1.0);

	// Stretch RGB upwards... 
	//col = (1.0 - exp(-col * 2.0)) * 1.1565;
	//col = (1.0 - exp(-col * 3.0)) * 1.052;
	col = pow(col, vec3(.7));
	//col = (col*col*(3.0-2.0*col));

	// Vignette...
	col *= .55+0.45*pow(70.0*xy.x*xy.y*(1.0-xy.x)*(1.0-xy.y), 0.15 );	
	
	fragColor=vec4(col, 1.0);
}

//--------------------------------------------------------------------------

`;

export default class implements iSub {
  key(): string {
    return '4dsXWn';
  }
  name(): string {
    return 'Weather';
  }
  sort() {
    return 558;
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
      {
        ...webglUtils.DEFAULT_NOISE,
        ...webglUtils.TEXTURE_MIPMAPS,
        ...webglUtils.NO_FLIP_Y,
      }, //
      { type: 3 },
    ];
  }
}
