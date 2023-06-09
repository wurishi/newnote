// returns the average of the vec2((uv.x-e, uv.x+e),uv.y)
float smootherSample(vec2 uv,float e) 
{
	e*=3.0; 
	return (
		 texture(iChannel0,uv-vec2(e*-0.5,0.0)).x
		+texture(iChannel0,uv-vec2(e*-0.4,0.0)).x
		+texture(iChannel0,uv-vec2(e*-0.3,0.0)).x
		+texture(iChannel0,uv-vec2(e*-0.2,0.0)).x
		+texture(iChannel0,uv-vec2(e*-0.1,0.0)).x
		+texture(iChannel0,uv-vec2(e*+0.0,0.0)).x
		+texture(iChannel0,uv-vec2(e*+0.1,0.0)).x
		+texture(iChannel0,uv-vec2(e*+0.2,0.0)).x
		+texture(iChannel0,uv-vec2(e*+0.3,0.0)).x
		+texture(iChannel0,uv-vec2(e*+0.4,0.0)).x
		+texture(iChannel0,uv-vec2(e*+0.5,0.0)).x
		)/11.0;
}

float getWaveformValue(float x, float mode,float e)
{
	return smootherSample(vec2(x,mode),e);
}
	
float getWaveformDeriv(float x, float mode, float e)
{
	return (smootherSample(vec2(x+e*0.5,mode),e)
		-smootherSample(vec2(x-e*0.5,mode),e))/e;
}


vec4 osc(float mode,float offset, float amp, vec2 uv, vec2 dudv)
{
	//this draws the waveform
	//the frame is split into columns
	//each column has a small interval of black pixels
	//that build up the waveform
	//getWaveformValue - the position of the small interval - called height in the code
	//getWaveformDeriv - the size of the interval - called width in the code
	
	float base_width = 2.0*dudv.y;
	
	float height = amp*(getWaveformValue(uv.x,mode,dudv.x/iResolution.x)-0.5);
	float heightderiv = amp*getWaveformDeriv(uv.x,mode,dudv.x/iResolution.x);
	float final_width = dot(vec2(base_width,abs(dudv.x*0.6*heightderiv))/iResolution.xy,vec2(1.0,1.0));
	float value = ((height-uv.y+offset)/final_width);
	float v = abs(value);

	v = clamp(0.0,v,1.0); // value of the current pixel
	
	//return vec4(v);

	vec4 colorLCD;

	float color_split = 1.0;
	float color_power = 1.0-color_split;
	
	//color split for LCD screens == higher resolution
	if ((heightderiv<0.0 ^^ value<0.0)) //orange vec3(1.0,0.5,0.0);
	{
		colorLCD.r = (1.0+2.0*color_split)*v;
		colorLCD.g = colorLCD.r*0.5;
		colorLCD.b = colorLCD.r-color_split;
		colorLCD = clamp(vec4(0,0,0,0),colorLCD,vec4(1,1,1,1));
	}
	else //blue vec3(0.0,0.5,1.0);
	{
		colorLCD.b = (1.0+2.0*color_split)*v;
		colorLCD.g = colorLCD.b*0.5;
		colorLCD.r = colorLCD.b-color_split;
		colorLCD = clamp(vec4(0.0),colorLCD,vec4(1.0));
	}
	
	return colorLCD;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
	
	vec4 color = vec4(1,1,1,1);
	color *= osc(1.0,0.83,0.33,uv,vec2(1.0));
	color *= osc(0.0,0.50,0.33,uv,vec2(1.0));
	color *= osc(0.0,0.17,0.33,vec2(pow(uv.x,2.0),uv.y),vec2(2.0*(uv.x),1.0));
	
	fragColor = color;
}