// displacement amount
#define DISP_SCALE 2.0

// chromatic dispersion samples
#define SAMPLES 64

// contrast
#define SIGMOID_CONTRAST 12.0

// channels to use for displacement, either xy or zw
#define CH xy


vec3 contrast(vec3 x) {
	return 1.0 / (1.0 + exp(-SIGMOID_CONTRAST * (x - 0.5)));    
}

vec2 normz(vec2 x) {
	return x == vec2(0) ? vec2(0) : normalize(x);
}

/*
	This function supplies a weight vector for each color channel.
	It's analogous to (but not a physically accurate model of)
	the response curves for each of the 3 cone types in the human eye.
	The three functions for red, green, and blue have the same integral
    over [0, 1], which is 1/3.
    Here are some other potential terms for the green weight that 
	integrate to 1/3:
        2.0*(1-x)*x
        10.0*((1-x)*x)^2
        46.667*((1-i)*i)^3
        210.0*((1-x)*x)^4
        924.0*((1-x)*x)^5
    By the way, this series of coefficients is OEIS A004731 divided by 3,
    which is a pretty interesting series: https://oeis.org/A002457
*/
vec3 sampleWeights(float i) {
	return vec3(i * i, 46.6666*pow((1.0-i)*i,3.0), (1.0 - i) * (1.0 - i));
}

vec3 sampleDisp(vec2 uv, vec2 dispNorm, float disp) {
    vec3 col = vec3(0);
    const float SD = 1.0 / float(SAMPLES);
    float wl = 0.0;
    vec3 denom = vec3(0);
    for(int i = 0; i < SAMPLES; i++) {
        vec3 sw = sampleWeights(wl);
        denom += sw;
        col += sw * texture(iChannel1, uv + dispNorm * disp * wl).xyz;
        wl  += SD;
    }
    
    // For a large enough number of samples,
    // the return below is equivalent to 3.0 * col * SD;
    return col / denom;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec2 texel = 1. / iResolution.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;

    vec2 n  = vec2(0.0, texel.y);
    vec2 e  = vec2(texel.x, 0.0);
    vec2 s  = vec2(0.0, -texel.y);
    vec2 w  = vec2(-texel.x, 0.0);

    vec2 d   = texture(iChannel0, uv).CH;
    vec2 d_n = texture(iChannel0, fract(uv+n)).CH;
    vec2 d_e = texture(iChannel0, fract(uv+e)).CH;
    vec2 d_s = texture(iChannel0, fract(uv+s)).CH;
    vec2 d_w = texture(iChannel0, fract(uv+w)).CH; 

    // antialias our vector field by blurring
    vec2 db = 0.4 * d + 0.15 * (d_n+d_e+d_s+d_w);

    float ld = length(db);
    vec2 ln = normz(db);

	vec3 col = sampleDisp(uv, ln, DISP_SCALE * ld);
    
    fragColor = vec4(contrast(col), 1.0);

}