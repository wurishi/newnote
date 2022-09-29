// https://en.wikipedia.org/wiki/Diamond-square_algorithm


// Dave Hoskins - Hash without Sine
// https://www.shadertoy.com/view/4djSRW
//#define hash22(v) hash22d(v)
vec2 hash22d(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);

}

#define hash22(v) hash22i(v)
vec2 hash22i( vec2 p ) // replace this by something better
{
	p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

// Hash Functions for GPU Rendering
// https://www.shadertoy.com/view/XlGcRh
//#define hash22(v) (vec2(pcg3d(uvec3(int(v * 100000.), 1u, 1u)).xy) / 1000000.)
uvec2 pcg2d(uvec2 v)
{
    v = v * 1664525u + 1013904223u;

    v.x += v.y * 1664525u;
    v.y += v.x * 1664525u;

    v = v ^ (v>>16u);

    v.x += v.y * 1664525u;
    v.y += v.x * 1664525u;

    v = v ^ (v>>16u);

    return v;
}

uvec3 pcg3d(uvec3 v) {

    v = v * 1664525u + 1013904223u;

    v.x += v.y*v.z;
    v.y += v.z*v.x;
    v.z += v.x*v.y;

    v ^= v >> 16u;

    v.x += v.y*v.z;
    v.y += v.z*v.x;
    v.z += v.x*v.y;

     return v;
}

uint lowbias32(uint x)
{
    x ^= x >> 16;
    x *= 0x7feb352dU;
    x ^= x >> 15;
    x *= 0x846ca68bU;
    x ^= x >> 16;
    return x;
}

// clean 2D hash
//#define hash22(x) bestHash(x)
#define hashi(x)   lowbias32(x)
//#define hashi(x)   triple32(x) 
#define hash(x)  ( float( hashi(x) ) / float( 0xffffffffU ) )
vec2 bestHash(vec2 x) {
    uvec2 V = uvec2(x);
    float h = hash( V.x + hashi(V.y) ); // clean 2D hash
  //float h = hash( V.x + (V.y<<16) );  // 2D hash (should be ok too )
    return vec2(h);
}
// nikat - 3d simplex noise
// https://www.shadertoy.com/view/XsX3zB

// Inigo Quilez - Noise - simplex - 2D 
// https://www.shadertoy.com/view/Msf3WH
float noise( in vec2 p )
{
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;

	vec2  i = floor( p + (p.x+p.y)*K1 );
    vec2  a = p - i + (i.x+i.y)*K2;
    float m = step(a.y,a.x); 
    vec2  o = vec2(m,1.0-m);
    vec2  b = a - o + K2;
	vec2  c = a - 1.0 + 2.0*K2;
    vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	vec3  n = h*h*h*h*vec3( dot(a,hash22(i+0.0)), dot(b,hash22(i+o)), dot(c,hash22(i+1.0)));
    return dot( n, vec3(70.0) );
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 p = fragCoord.xy / iResolution.xy;
	vec2 uv = 5.* p*vec2(iResolution.x/iResolution.y,1.0);
    uv -= vec2(2.5);

    float f = 0.;
//    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    m *= .1 * (10. - iTime);
    vec2 ouv = uv;
    f  = 0.5000*noise( uv ); uv = m*uv;
    f += 0.2500*noise( uv ); uv = m*uv;
    f += 0.1250*noise( uv ); uv = m*uv;
    f += 0.0625*noise( uv ); uv = m*uv;
	f = 0.5 + 0.5*f;
    f *= smoothstep(2.5, 0., length(ouv));
    //step(.2, length(uv));
    
    fragColor = vec4(vec3(f),1.0);
}