vec3 scanline(vec2 coord, vec3 screen)
{
	screen.rgb -= sin((coord.y + (iTime * 29.0))) * 0.02;
	return screen;
}

vec2 crt(vec2 coord, float bend)
{
	// put in symmetrical coords
	coord = (coord - 0.5) * 2.0;

	coord *= 1.1;	

	// deform coords
	coord.x *= 1.0 + pow((abs(coord.y) / bend), 2.0);
	coord.y *= 1.0 + pow((abs(coord.x) / bend), 2.0);

	// transform back to 0.0 - 1.0 space
	coord  = (coord / 2.0) + 0.5;

	return coord;
}

vec3 sampleSplit(sampler2D tex, vec2 coord)
{
	vec3 frag;
	frag.r = texture(tex, vec2(coord.x - 0.01 * sin(iTime), coord.y)).r;
	frag.g = texture(tex, vec2(coord.x                          , coord.y)).g;
	frag.b = texture(tex, vec2(coord.x + 0.01 * sin(iTime), coord.y)).b;
	return frag;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
	uv.y = 1.0 - uv.y; // flip tex
	vec2 crtCoords = crt(uv, 3.2);

	// shadertoy has tiling textures. wouldn't be needed
	// if you set up your tex params properly
	if (crtCoords.x < 0.0 || crtCoords.x > 1.0 || crtCoords.y < 0.0 || crtCoords.y > 1.0)
		discard;

	// Split the color channels
	fragColor.rgb = sampleSplit(iChannel0, crtCoords);

	// HACK: this bend produces a shitty moire pattern.
	// Up the bend for the scanline
	vec2 screenSpace = crtCoords * iResolution.xy;
	fragColor.rgb = scanline(screenSpace, fragColor.rgb);
}
