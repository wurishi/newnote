import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
#define DITHERING
#define BACKGROUND

//#define TONEMAPPING

//-------------------
#define pi 3.14159265
#define R(p, a) p=cos(a)*p+sin(a)*vec2(p.y, -p.x)

// iq's noise
float noise( in vec3 x )
{
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = textureLod( iChannel0, (uv+ 0.5)/256.0, 0.0 ).yx;
	return 1. - 0.82*mix( rg.x, rg.y, f.z );
}

float fbm(vec3 p)
{
   return noise(p*.06125)*.5 + noise(p*.125)*.25 + noise(p*.25)*.125 + noise(p*.4)*.2;
}

float length2( vec2 p )
{
	return sqrt( p.x*p.x + p.y*p.y );
}

float length8( vec2 p )
{
	p = p*p; p = p*p; p = p*p;
	return pow( p.x + p.y, 1.0/8.0 );
}


float Disk( vec3 p, vec3 t )
{
    vec2 q = vec2(length2(p.xy)-t.x,p.z*0.5);
    return max(length8(q)-t.y, abs(p.z) - t.z);
}

const float nudge = 0.9;	// size of perpendicular vector
float normalizer = 1.0 / sqrt(1.0 + nudge*nudge);	// pythagorean theorem on that perpendicular to maintain scale
float SpiralNoiseC(vec3 p)
{
    float n = 0.0;	// noise amount
    float iter = 2.0;
    for (int i = 0; i < 8; i++)
    {
        // add sin and cos scaled inverse with the frequency
        n += -abs(sin(p.y*iter) + cos(p.x*iter)) / iter;	// abs for a ridged look
        // rotate by adding perpendicular and scaling down
        p.xy += vec2(p.y, -p.x) * nudge;
        p.xy *= normalizer;
        // rotate on other axis
        p.xz += vec2(p.z, -p.x) * nudge;
        p.xz *= normalizer;
        // increase the frequency
        iter *= 1.733733;
    }
    return n;
}

float NebulaNoise(vec3 p)
{
    float final = Disk(p.xzy,vec3(2.0,1.8,1.25));
    final += fbm(p*90.);
    final += SpiralNoiseC(p.zxy*0.5123+100.0)*3.0;

    return final;
}

float map(vec3 p) 
{
	R(p.xz, iMouse.x*0.008*pi+iTime*0.1);

	float NebNoise = abs(NebulaNoise(p/0.5)*0.5);
    
	return NebNoise+0.07;
}
//--------------------------------------------------------------

// assign color to the media
vec3 computeColor( float density, float radius )
{
	// color based on density alone, gives impression of occlusion within
	// the media
	vec3 result = mix( vec3(1.0,0.9,0.8), vec3(0.4,0.15,0.1), density );
	
	// color added to the media
	vec3 colCenter = 7.*vec3(0.8,1.0,1.0);
	vec3 colEdge = 1.5*vec3(0.48,0.53,0.5);
	result *= mix( colCenter, colEdge, min( (radius+.05)/.9, 1.15 ) );
	
	return result;
}

bool RaySphereIntersect(vec3 org, vec3 dir, out float near, out float far)
{
	float b = dot(dir, org);
	float c = dot(org, org) - 8.;
	float delta = b*b - c;
	if( delta < 0.0) 
		return false;
	float deltasqrt = sqrt(delta);
	near = -b - deltasqrt;
	far = -b + deltasqrt;
	return far > 0.0;
}

// Applies the filmic curve from John Hable's presentation
// More details at : http://filmicgames.com/archives/75
vec3 ToneMapFilmicALU(vec3 _color)
{
	_color = max(vec3(0), _color - vec3(0.004));
	_color = (_color * (6.2*_color + vec3(0.5))) / (_color * (6.2 * _color + vec3(1.7)) + vec3(0.06));
	return _color;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{  
    const float KEY_1 = 49.5/256.0;
	const float KEY_2 = 50.5/256.0;
	const float KEY_3 = 51.5/256.0;
    float key = 0.0;
    key += 0.7*texture(iChannel1, vec2(KEY_1,0.25)).x;
    key += 0.7*texture(iChannel1, vec2(KEY_2,0.25)).x;
    key += 0.7*texture(iChannel1, vec2(KEY_3,0.25)).x;

	// ro: ray origin
	// rd: direction of the ray
	vec3 rd = normalize(vec3((fragCoord.xy-0.5*iResolution.xy)/iResolution.y, 1.));
	vec3 ro = vec3(0., 0., -6.+key*1.6);
    
	// ld, td: local, total density 
	// w: weighting factor
	float ld=0., td=0., w=0.;

	// t: length of the ray
	// d: distance function
	float d=1., t=0.;
    
    const float h = 0.1;
   
	vec4 sum = vec4(0.0);
   
    float min_dist=0.0, max_dist=0.0;

    if(RaySphereIntersect(ro, rd, min_dist, max_dist))
    {
       
	t = min_dist*step(t,min_dist);
   
	// raymarch loop
	for (int i=0; i<64; i++) 
	{
	 
		vec3 pos = ro + t*rd;
  
		// Loop break conditions.
	    if(td>0.9 || d<0.1*t || t>10. || sum.a > 0.99 || t>max_dist) break;
        
        // evaluate distance function
        float d = map(pos);
		       
		// change this string to control density 
		d = max(d,0.0);
        
        // point light calculations
        vec3 ldst = vec3(0.0)-pos;
        float lDist = max(length(ldst), 0.001);

        // the color of light 
        vec3 lightColor=vec3(1.0,0.5,0.25);
        
        sum.rgb+=(vec3(0.67,0.75,1.00)/(lDist*lDist*10.)/80.); // star itself
        sum.rgb+=(lightColor/exp(lDist*lDist*lDist*.08)/30.); // bloom
        
		if (d<h) 
		{
			// compute local density 
			ld = h - d;
            
            // compute weighting factor 
			w = (1. - td) * ld;
     
			// accumulate density
			td += w + 1./200.;
		
			vec4 col = vec4( computeColor(td,lDist), td );
            
            // emission
            sum += sum.a * vec4(sum.rgb, 0.0) * 0.2;	
            
			// uniform scale density
			col.a *= 0.2;
			// colour by alpha
			col.rgb *= col.a;
			// alpha blend in contribution
			sum = sum + col*(1.0 - sum.a);  
       
		}
      
		td += 1./70.;

        #ifdef DITHERING
        vec2 uv = fragCoord.xy / iResolution.xy;
        uv.y*=120.;
        uv.x*=280.;
        d=abs(d)*(.8+0.08*texture(iChannel2,vec2(uv.y,-uv.x+0.5*sin(4.*iTime+uv.y*4.0))).r);
        #endif 
		
        // trying to optimize step size near the camera and near the light source
        t += max(d * 0.1 * max(min(length(ldst),length(ro)),1.0), 0.01);
        
	}
    
    // simple scattering
	sum *= 1. / exp( ld * 0.2 ) * 0.6;
        
   	sum = clamp( sum, 0.0, 1.0 );
   
    sum.xyz = sum.xyz*sum.xyz*(3.0-2.0*sum.xyz);
    
	}

    #ifdef BACKGROUND
    // stars background
    if (td<.8)
    {
        vec3 stars = vec3(noise(rd*500.0)*0.5+0.5);
        vec3 starbg = vec3(0.0);
        starbg = mix(starbg, vec3(0.8,0.9,1.0), smoothstep(0.99, 1.0, stars)*clamp(dot(vec3(0.0),rd)+0.75,0.0,1.0));
        starbg = clamp(starbg, 0.0, 1.0);
        sum.xyz += starbg; 
    }
	#endif
   
    #ifdef TONEMAPPING
    fragColor = vec4(ToneMapFilmicALU(sum.xyz*2.2),1.0);
	#else
    fragColor = vec4(sum.xyz,1.0);
	#endif
}
`;

export default class implements iSub {
  key(): string {
    return 'MdKXzc';
  }
  name(): string {
    return 'Supernova remnant';
  }
  sort() {
    return 421;
  }
  tags?(): string[] {
    return [];
  }
  webgl() {
    return WEBGL_2;
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
      { type: 3 },
      webglUtils.DEFAULT_NOISE3,
    ];
  }
}
