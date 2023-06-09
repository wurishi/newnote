float time;
vec2 t;

vec3 rotateX(float a, vec3 v)
{
	return vec3(v.x, cos(a) * v.y + sin(a) * v.z,
				cos(a) * v.z - sin(a) * v.y);
}

vec3 rotateY(float a, vec3 v)
{
	return vec3(cos(a) * v.x + sin(a) * v.z, v.y,
				cos(a) * v.z - sin(a) * v.x);
}

vec2 rotate(float a, vec2 v)
{
	return vec2(cos(a) * v.x + sin(a) * v.y, cos(a) * v.y - sin(a) * v.x);
}

// Returns the distance from p to the nearest point on a square
// of size 2 centered at the origin.
float square(vec2 p)
{
	return length(max(vec2(0.0), abs(p) - vec2(1.0)));
}

// Returns two square-shaped masks, one defining the inner region
// of a window and the other defining the outer region.
vec2 window(vec2 p, vec2 o, vec2 s)
{
	float s0 = square((p - o) / s);
	float s1 = square((p - o) / (s + 0.1));
	return vec2(step(s0, 1e-3), step(1e-3, s1));
}

// Returns the line-segment intersection of a ray and a cube of
// size 2 centered at the origin.
vec2 cubeInterval(vec3 ro, vec3 rd)
{
	vec3 slabs0 = (vec3(+1.0) - ro) / rd;
	vec3 slabs1 = (vec3(-1.0) - ro) / rd;
	
	vec3 mins = min(slabs0, slabs1);
	vec3 maxs = max(slabs0, slabs1);
	
	return vec2(max(max(mins.x, mins.y), mins.z), min(min(maxs.x, maxs.y), maxs.z));
	
}

// Returns the line segment interval of the given ray with the scene's geometry,
// scaled by sc (sc is the reciprocal of the geometry's scale).
vec2 geom(vec3 ro, vec3 rd, float sc)
{
	return cubeInterval(ro * sc, rd * sc);
}

// Returns the image value of the scene (as seen through a window) at the 
// given coordinates.
float scene(vec2 p, int i)
{
	vec3 ro = vec3(0.0, 0.0, 3.0), rd = vec3(p, -1.0);

	float x = time + float(i);
	float y = time + float(i);
	
	ro = rotateX(x, rotateY(y, ro));
	rd = rotateX(x, rotateY(y, rd));
	
	vec2 ci0 = geom(ro, rd, 0.8);
	vec2 ci1 = geom(ro, rd, 0.74);
	
	float m0 = step(ci0.x, ci0.y);
	float m1 = step(ci1.x, ci1.y);
	
	return mix(0.5, mix(0.0, 1.0, m0), m1);
}

// Returns the input value adjusted by a screenspace pattern.
vec3 tonerise(float c)
{
	vec2 p0 = rotate(-0.1, t.xy * 10.0);
	p0.x += 0.5 * mod(floor(p0.y), 2.0);
	vec2 p1 = fract(p0);
	c += step(distance(p1, vec2(0.5)), 0.4) * 0.07 * c;
	return vec3(c);
}

// Returns a value representing the current scene configuration in it's
// integer part and the transition stage in it's floating part.
float transition()
{
	return time / 5.0 + 0.2;
}

// Takes an image value and returns a colour based on it. The colour
// is chosen based on the current scene configuration.
vec3 colourise(float c)
{
	float d = mod(transition(), 3.0); 
	
	vec3 f = mix(vec3(1.0, 1.0, 0.5),
				 mix(vec3(1.0, 0.5, 1.0),
					 vec3(0.5, 0.5, 1.0), step(2.0, d)), step(1.0, d));
	
	return pow(tonerise(c), f);
}

// Takes a value representing a smoothened border around the final image
// and uses it to create a mask formed of circles.
float border(float d)
{
    d = clamp(d, 0.0, 1.0);
	
	vec2 p0 = rotate(0.1, t.xy * 9.0);
	p0.x += 0.5 * mod(floor(p0.y), 2.0);
	vec2 p1 = fract(p0);
	
	return step(distance(p1, vec2(0.5)), d);
}

// Uses the transition value to mask out the final image so that scene configuration
// switches (alterations to the colours) are not abrupt.
float transitionMask()
{
	float m = 1.0;
	float f = fract(transition());
	float h = 2.0 - (smoothstep(0.0, 0.05, f) - smoothstep(0.95, 1.0, f)) * 2.0;
	
	for(int j = 0; j < 4; ++j)
	{
		vec2 p = rotate(float(j) * 9.0, vec2(0.4, 0.3));
		m = min(m, step(h, distance(t.xy, p)));
	}
	
	return m;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
	t = uv * 2.0 - vec2(1.0);
	t.x *= iResolution.x / iResolution.y;
	time = iTime;
	
	float b = 0.2;
	
	// Accumulate the 5 windows.
	for(int i = 0; i < 5; ++i)
	{
		vec2 p = rotate(float(i) * 123.0, t.xy) * 1.8;
		float f = float(i) * 17.0 + floor(transition());
		vec2 o = vec2(cos(f) * 0.6, sin(f) * 0.7);
		vec2 s = vec2(0.5 + 0.2 * cos(f * 8.0), 0.5 + 0.2 * sin(f * 2.0));
		vec2 w0 = window(p, o, s);
		
		b = mix(mix(0.02, scene((p - o) * 2.0, i), w0.x), b, w0.y);
	}
	
	float v = clamp(1.0 - dot(t.xy, t.xy) * 0.3, 0.0, 1.0);
	float c = border(1.0 - pow(min(1.0, abs(t.x)), 4.0) - pow(min(1.0, abs(t.y)), 4.0));
	
	fragColor.rgb = colourise(b) * v * c * transitionMask();
	fragColor.a = 1.0;
}
