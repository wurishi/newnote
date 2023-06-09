import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
/*--------------------------------------------------------------------------------------
License CC0 - http://creativecommons.org/publicdomain/zero/1.0/
To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
----------------------------------------------------------------------------------------
^ This means do ANYTHING YOU WANT with this code. Because we are programmers, not lawyers.
-Otavio Good
*/
#define saturate(a) clamp(a, 0., 1.)

// makes a thick line and passes back gray in x and derivates for lighting in yz
vec3 ThickLine(vec2 uv, vec2 posA, vec2 posB, float radiusInv)
{
	vec2 dir = posA - posB;
	float dirLen = length(dir);
	vec2 dirN = normalize(dir);
	float dotTemp = clamp(dot(uv - posB, dirN), 0.0, dirLen);
	vec2 proj = dotTemp * dirN + posB;
	float d1 = distance(uv, proj);
	vec2 derivative = (uv - proj);

	float finalGray = saturate(1.0 - d1 * radiusInv);
	// multiply derivative by gray so it smoothly fades out at the edges.
	return vec3(finalGray, derivative * finalGray);
}

// makes a rune in the 0..1 uv space. Seed is which rune to draw.
// passes back gray in x and derivates for lighting in yz
vec3 Rune(vec2 uv, vec2 seed)
{
	vec3 finalLine = vec3(0.0, 0.0, 0.0);
	for (int i = 0; i < 4; i++)	// number of strokes
	{
		// generate seeded random line endPoints - just about any texture should work.
		// Hopefully this randomness will work the same on all GPUs (had some trouble with that)
		vec2 posA = texture(iChannel1, floor(seed+0.5) / iChannelResolution[1].xy).xy;
		vec2 posB = texture(iChannel1, floor(seed+1.5) / iChannelResolution[1].xy).xy;
		seed += 2.0;
		// expand the range and mod it to get a nicely distributed random number - hopefully. :)
		posA = fract(posA * 128.0);
		posB = fract(posB * 128.0);
		// each rune touches the edge of its box on all 4 sides
		if (i == 0) posA.y = 0.0;
		if (i == 1) posA.x = 0.999;
		if (i == 2) posA.x = 0.0;
		if (i == 3) posA.y = 0.999;
		// snap the random line endpoints to a grid 2x3
		vec2 snaps = vec2(2.0, 3.0);
		posA = (floor(posA * snaps) + 0.5) / snaps;	// + 0.5 to center it in a grid cell
		posB = (floor(posB * snaps) + 0.5) / snaps;
		//if (distance(posA, posB) < 0.0001) continue;	// eliminate dots.

		// Dots (degenerate lines) are not cross-GPU safe without adding 0.001 - divide by 0 error.
		vec3 tl = ThickLine(uv, posA, posB + 0.001, 10.0);
		if (tl.x > finalLine.x) finalLine = tl;
	}
	return finalLine.xyz;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
	uv.x *= iResolution.x / iResolution.y;
	uv.x += iTime * 0.03;	// scroll left with time
	vec3 finalColor = texture(iChannel1, uv * vec2(1.0, -1.0)).xyz;	// background texture
	finalColor = finalColor * finalColor;	// gamma correct

	//finalColor += ThickLine(uv, vec2(0.8, 0.2), vec2(0.8, 0.8), 8.0) * vec3(0.0, 10.0, 10.0);
	vec4 noise = texture(iChannel0, uv*3.0);
	uv += noise.xy*0.003;	// noise makes everything look more natural

	// make a grid for drawing the runes.
	uv *= 16.0;
	uv.y *= 0.8;
	vec2 newSeed = floor(uv);
	// the mod kills every other line. I just thought it looks better.
	vec3 finalLine = Rune(fract(uv), newSeed-0.41) * mod(newSeed.y, 2.0);

	finalColor = saturate(finalColor * (1.0 - pow(finalLine.x, 0.55)*0.97)) * (1.0+saturate(-finalLine.z)*128.0);
	//finalColor += fract(newSeed.xyy*0.123);	// view grid

	fragColor = vec4(sqrt(finalColor),1.0);
}
`;

export default class implements iSub {
  key(): string {
    return 'MsXSRn';
  }
  name(): string {
    return 'runes';
  }
  sort() {
    return 378;
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
      webglUtils.DEFAULT_NOISE,
      { ...webglUtils.ROCK_TEXTURE, ...webglUtils.TEXTURE_MIPMAPS }, //
    ];
  }
}
