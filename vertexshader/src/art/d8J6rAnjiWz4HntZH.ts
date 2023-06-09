export default {
    name: 'musicBox',
    mode: WebGLRenderingContext.POINTS,
    num: 100000,
    bg:0xffffff,
    text: `
    //test test test



#define PI radians(180.)
#define NUM_SEGMENTS 2.0
#define NUM_POINTS (NUM_SEGMENTS * 2.0)

float slerping( float n ) { 
  return fract(sin(n)*100000.0);
}

vec3 hsv2rgb(vec3 c) {
  c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
   float i = slerping(vertexId);
  float f = i;
   float snd = texture2D(sound, vec2(f, i)).a * cos(i);
  snd = pow(snd, 0.5);
  vec2 uv;
 
  float count = floor(vertexId / NUM_POINTS);
  
 
  float radius = pow(count * 0.00014, sin(time));  
  float orbitAngle =  pow(count * 0.025, 0.8);
  float innerRadius = pow(count * 0.0005,.0);
  float oC = cos(orbitAngle + count * 0.0001) * innerRadius;
  float oS = sin(orbitAngle + count * 0.0001) * innerRadius;

  vec2 aspect = vec2(1, resolution.x / resolution.y);
  vec2 xy = vec2(
       oS*innerRadius*cos(snd)+0.7,
      snd*.9)-0.05*snd*oC*2.0*innerRadius-0.7;
  gl_Position = vec4(xy * aspect, 0, 1.5);

  
  v_color = vec4(hsv2rgb(vec3(snd,snd, snd)), snd);

  
  



}

`,
};