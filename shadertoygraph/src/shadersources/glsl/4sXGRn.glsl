// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = (-iResolution.xy + 2.0*fragCoord)/iResolution.y;

    p *= 0.75;
    
    float a = atan( p.y, p.x );
    float r = sqrt( dot(p,p) );
    
    a += sin(0.5*r-0.5*iTime );
	
	float h = 0.5 + 0.5*cos(9.0*a);

	float s = smoothstep(0.4,0.5,h);

    vec2 uv;
    uv.x = iTime + 1.0/(r + .1*s);
    uv.y = 3.0*a/3.1416;

    vec3 col = texture( iChannel0, uv ).xyz;

    float ao = smoothstep(0.0,0.3,h)-smoothstep(0.5,1.0,h);
    col *= 1.0 - 0.6*ao*r;
	col *= r;

    fragColor = vec4( col, 1.0 );
}