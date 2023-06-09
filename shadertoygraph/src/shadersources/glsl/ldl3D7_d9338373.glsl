float sphere(vec2 pos, vec4 beats)
{
	float PI = 3.14159265358;
	float w = iResolution.x / iResolution.y;
	vec2 center = vec2(w / 2., 0.5);
	float radius = .3;
	float rotation = iTime;
	
	vec2 offset1 = center + beats[0] * vec2(
		sin(rotation),
		cos(rotation)
	);
	
	vec2 offset2 = center + beats[1] * vec2(
		sin(rotation + PI / 2.),
		cos(rotation + PI / 2.)	
	);
	
	vec2 offset3 = center + beats[2] * vec2(
		sin(rotation + PI),
		cos(rotation + PI)
	);
	
	vec2 offset4 = center + beats[3] * vec2(
		sin(rotation - PI / 2.),
		cos(rotation - PI / 2.)	
	);
	
	float minDistance = distance(pos, offset1);
    minDistance = min(minDistance, distance(pos, offset2));
    minDistance = min(minDistance, distance(pos, offset3));
    minDistance = min(minDistance, distance(pos, offset4));
	
	return minDistance;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float PI = 3.14159265358;
	vec2 uv = fragCoord.xy / iResolution.y;
	float w = iResolution.x / iResolution.y;
	vec2 center = vec2(w / 2., 0.5);
	vec2 offsetCenter = center +.02 * vec2(
		sin(iTime) * 5. * PI,
		cos(iTime) * 5. * PI
	);
	
	float beatBasis = iTime * 2.;
	vec4 beats = vec4(
		.3 - floor(mod(beatBasis + 0., 4.) / 3.) * sin(beatBasis * PI) * .5,
		.3 + floor(mod(beatBasis + 1., 4.) / 3.) * sin(beatBasis * PI) * .5,
		.3 - floor(mod(beatBasis + 2., 4.) / 3.) * sin(beatBasis * PI) * .5,
		.3 + floor(mod(beatBasis + 3., 4.) / 3.) * sin(beatBasis * PI) * .5
	);
	
	vec3 color = vec3(.1, .3, sin(uv.y + .5) * .7) * .8;
	vec3 antiColor = vec3(cos(uv.y), cos(uv.x), .7) * .5;
	
	color *= vec3(1.0 - floor(distance(uv, vec2(w * 0.5, 0.5)) / .12) * 2.8);
	color = mix(antiColor, color, clamp(floor(sphere(uv, beats) / .18), .0, 1.2));
	color *= 1. + exp(-fract(beatBasis) * .6) * .6;
	
	fragColor = vec4(color, 1.0);
}