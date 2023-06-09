/*
	by kioku / System K
*/
struct Ray
{
	vec3 org;
	vec3 dir;
};
struct Sphere
{
	vec3 center;
	float radius;
};
struct Plane
{
	vec3 p;
	vec3 n;
};

struct Intersection
{
	float t;
	vec3 p;     // hit point
	vec3 n;     // normal
	int hit;
};

Sphere sphere[3];
Plane plane;
float aspectRatio = 16.0/9.0;
int seed = 0;

void shpere_intersect(Sphere s, Ray ray, inout Intersection isect)
{
	vec3 rs = ray.org - s.center;
	float B = dot(rs, ray.dir);
	float C = dot(rs, rs) - (s.radius * s.radius);
	float D = B * B - C;

	if (D > 0.0)
	{
		float t = -B - sqrt(D);
		if ( (t > 0.0) && (t < isect.t) )
		{
			isect.t = t;
			isect.hit = 1;

			// calculate normal.
			isect.p = ray.org + ray.dir * t;
			isect.n = normalize(isect.p - s.center);
		}
	}
}
void plane_intersect(Plane pl, Ray ray, inout Intersection isect)
{
	float d = -dot(pl.p, pl.n);
	float v = dot(ray.dir, pl.n);

	if (abs(v) < 1.0e-6) {
		return;
	} else {
		float t = -(dot(ray.org, pl.n) + d) / v;

		if ( (t > 0.0) && (t < isect.t) )
		{
			isect.hit = 1;
			isect.t   = t;
			isect.n   = pl.n;
			isect.p = ray.org + t * ray.dir;
		}
	}
}


void Intersect(Ray r, inout Intersection i)
{
	for (int c = 0; c < 3; c++)
	{
		shpere_intersect(sphere[c], r, i);
	}
	plane_intersect(plane, r, i);
}

		
void orthoBasis(out vec3 basis[3], vec3 n)
{
	basis[2] = vec3(n.x, n.y, n.z);
	basis[1] = vec3(0.0, 0.0, 0.0);

	if ((n.x < 0.6) && (n.x > -0.6))
		basis[1].x = 1.0;
	else if ((n.y < 0.6) && (n.y > -0.6))
		basis[1].y = 1.0;
	else if ((n.z < 0.6) && (n.z > -0.6))
		basis[1].z = 1.0;
	else
		basis[1].x = 1.0;


	basis[0] = cross(basis[1], basis[2]);
	basis[0] = normalize(basis[0]);

	basis[1] = cross(basis[2], basis[0]);
	basis[1] = normalize(basis[1]);

}


float random()
{
	seed = int(mod(float(seed)*1364.0+626.0,509.0));
	return float(seed)/509.0;
}

vec3 computeAO(inout Intersection isect)
{
	const int ntheta = 8;
	const int nphi   = 8;
	const float eps  = 0.0001;

	// Slightly move ray org towards ray dir to avoid numerical problem.
	vec3 p = isect.p + eps * isect.n;

	// Calculate orthogonal basis.
	 vec3 basis[3];
	orthoBasis(basis, isect.n);

	float occlusion = 0.0;

	for (int j = 0; j < ntheta; j++)
	{
		for (int i = 0; i < nphi; i++)
		{
			// Pick a random ray direction with importance sampling.
			// p = cos(theta) / 3.141592
			float r = random();
			float phi = 2.0 * 3.141592 * random();

			vec3 ref;
			float s, c;
			s = sin(phi);
			c = cos(phi);
			ref.x = c * sqrt(1.0 - r);
			ref.y = s * sqrt(1.0 - r);
			ref.z = sqrt(r);

			// local -> global
			vec3 rray;
			rray.x = ref.x * basis[0].x + ref.y * basis[1].x + ref.z * basis[2].x;
			rray.y = ref.x * basis[0].y + ref.y * basis[1].y + ref.z * basis[2].y;
			rray.z = ref.x * basis[0].z + ref.y * basis[1].z + ref.z * basis[2].z;

			vec3 raydir = vec3(rray.x, rray.y, rray.z);

			Ray ray;
			ray.org = p;
			ray.dir = raydir;
			
			Intersection occIsect;
			occIsect.hit = 0;
			occIsect.t = 1.0e30;
			occIsect.n = occIsect.p = vec3(0);
			Intersect(ray, occIsect);
			occlusion += (occIsect.hit != 0 ? 1.0 : 0.0);
		}
	}

	// [0.0, 1.0]
	occlusion = (float(ntheta * nphi) - occlusion) / float(ntheta * nphi);
	return vec3(occlusion, occlusion, occlusion);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;	
	vec3 dir = normalize(vec3((uv-0.5)*2.0*vec2(1.0,1.0/aspectRatio),-1.0));
	Ray ray;
	ray.org = vec3(0,0,0);
	ray.dir = dir;
	Intersection it;
	it.hit = 0;
	it.n = vec3(0,0,0);
	it.p = vec3(0,0,0);
	it.t = 10000.0;
			
	sphere[0].center = vec3(-2.0, 0.0, -3.5);
	sphere[0].radius = 0.5;
	sphere[1].center = vec3(-0.5, 0.0, -3.0);
	sphere[1].radius = 0.5;
	sphere[2].center = vec3(1.0, 0.0, -2.2);
	sphere[2].radius = 0.5;
	plane.p = vec3(0,-0.5, 0);
	plane.n = vec3(0, 1.0, 0);
	Intersect(ray,it);
	
	seed = int(mod((dir.x+0.5) * (dir.y+0.5) * 452534.0, 65536.0));
	fragColor = 	vec4(computeAO(it),1.0);
}