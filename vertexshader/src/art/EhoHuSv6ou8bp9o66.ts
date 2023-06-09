export default {
  name: 'sploot',
  mode: WebGLRenderingContext.POINTS,
  num: 100000,
  bg: 0xffffff,
  text: `
  #define PI radians(180.)
#define NUM_POINTS_PER_GROUP 16.0

vec3 hsv2rgb(vec3 c) {
  c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  float groupId = floor(vertexId / NUM_POINTS_PER_GROUP);
  float pointId = mod(vertexId, NUM_POINTS_PER_GROUP);
  float ps = pointId / NUM_POINTS_PER_GROUP;
  float numGroups = floor(vertexCount / NUM_POINTS_PER_GROUP);
  float down = floor(sqrt(numGroups));
  float across = floor(numGroups / down);

  float px = mod(groupId, across);
  float py = floor(groupId / across);
  float pu = px / across;
  float pv = py / down;
  
  float sv = abs(atan(pv * 2. - 1., pu * 2. - 1.) / PI);
  float sy = abs((pu * 2. - 1.) * (pv * 2. - 1.));
  float snd = texture2D(sound, vec2(mix(0.002, 0.008, sv), sy * 0.5)).a;
  float sn2 = texture2D(sound, vec2(mix(0.01, 0.3, sy), sv * 0.5)).a;
   
  float t = time + 1000.;
  float tm = t * 0.5 - ps * 0.4 * (sin(t + pu * 3. * pv * 4.) * 0.5 + 0.5);
  vec2 xy = vec2(
    pu * 2. - 1. + sin(tm + px * 0.1) * 0.1 + cos(tm * px * py *  0.000009) * 0.1,
    pv * 2. - 1. + sin(tm * 0.77 + py * 0.1) * cos(tm + px * 0.011) * 0.1
  );
  gl_Position = vec4(xy * 1.2, ps, 1);
  gl_PointSize = 12.0 + sin(time * px * py * 0.000001) * 10.;
  gl_PointSize *= resolution.x / 1600. * .5;

  float hue = 0.5 + pow(sn2, 3.0)* 0.3; //(time * 0.01 + pu * 0.2);
  v_color = vec4(hsv2rgb(vec3(hue, 1., pow(sn2 + 0.4, 6.))), mix(0.9, 0., ps));
  float pump = step(0.9, snd);
  float pumps = (snd - 0.9) * 10.;
  v_color.rgb = mix(v_color.rgb, vec3(mix(0.5, 1., pumps),0,0), pump);
  gl_PointSize *= mix(1., 2., pump);
  v_color.rgb *= v_color.a;
}`,
};
