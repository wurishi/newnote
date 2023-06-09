export default {
    name: 'Lee',
    mode: WebGLRenderingContext.LINES,
    num: 9632,
    text: `
    #define PI radians(180.)
#define NUM_SEGMENTS 4.0
#define NUM_POINTS (NUM_SEGMENTS * 2.0)
#define STEP 5.0

vec3 rgb(vec3 c) {
  c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  float point = mod(floor(vertexId / 2.0) + mod(vertexId, 2.0) * STEP, NUM_SEGMENTS);
  float count = floor(vertexId / NUM_POINTS);
  float snd = texture2D(sound, vec2(fract(count / 128.0), fract(count / 20000.0))).a;
  float offset = count * 0.02;
  float angle = point * PI * 2.0 / NUM_SEGMENTS + offset;
  float radius = 0.2 * pow(snd, .0);
  float c = cos(angle + time) * radius;
  float s = sin(angle + time) * radius;
  float orbitAngle =  count * 0.0;
  float innerRadius = count * 0.001;
  float oC = sin(orbitAngle + time * 0.3 + count * 0.1) * innerRadius;
  float oS = tan(orbitAngle + time + count * 0.1) * innerRadius;

  vec2 aspect = vec2(1, resolution.x / resolution.y);
  vec2 xy = vec2(
      oC + c,
      oS + s);
  gl_Position = vec4(xy * aspect + mouse * 0.1, 0, 1);

  float hue = (time * 0.01 + count * 1.001);
  v_color = vec4(rgb(vec3(hue, 1, 1)), 1);
}`,
};