export default {
    name: 'flwr',
    mode: WebGLRenderingContext.TRIANGLES,
    num: 23736,
    bg: 0xfffc79,
    text: `
    
#define PI radians(180.0)

vec3 hsv2rgb(vec3 c) {
  c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

mat4 rotY( float angle ) {
    float s = sin( angle );
    float c = cos( angle );
  	
    return mat4( 
      c, 0,-s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1);  
}


mat4 rotZ( float angle ) {
    float s = sin( angle );
    float c = cos( angle );
  	
    return mat4( 
      c,-s, 0, 0, 
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1); 
}

mat4 trans(vec3 trans) {
  return mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    trans, 1);
}

mat4 ident() {
  return mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1);
}

mat4 scale(vec3 s) {
  return mat4(
    s[0], 0, 0, 0,
    0, s[1], 0, 0,
    0, 0, s[2], 0,
    0, 0, 0, 1);
}

mat4 uniformScale(float s) {
  return mat4(
    s, 0, 0, 0,
    0, s, 0, 0,
    0, 0, s, 0,
    0, 0, 0, 1);
}

mat4 persp(float fov, float aspect, float zNear, float zFar) {
  float f = tan(PI * 0.5 - 0.5 * fov);
  float rangeInv = 1.0 / (zNear - zFar);

  return mat4(
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (zNear + zFar) * rangeInv, -1,
    0, 0, zNear * zFar * rangeInv * 2., 0);
}

mat4 trInv(mat4 m) {
  mat3 i = mat3(
    m[0][0], m[1][0], m[2][0], 
    m[0][1], m[1][1], m[2][1], 
    m[0][2], m[1][2], m[2][2]);
  vec3 t = -i * m[3].xyz;
    
  return mat4(
    i[0], t[0], 
    i[1], t[1],
    i[2], t[2],
    0, 0, 0, 1);
}

mat4 transpose(mat4 m) {
  return mat4(
    m[0][0], m[1][0], m[2][0], m[3][0], 
    m[0][1], m[1][1], m[2][1], m[3][1],
    m[0][2], m[1][2], m[2][2], m[3][2],
    m[0][3], m[1][3], m[2][3], m[3][3]);
}

mat4 lookAt(vec3 eye, vec3 target, vec3 up) {
  vec3 zAxis = normalize(eye - target);
  vec3 xAxis = normalize(cross(up, zAxis));
  vec3 yAxis = cross(zAxis, xAxis);

  return mat4(
    xAxis, 0,
    yAxis, 0,
    zAxis, 0,
    eye, 1);
}

mat4 inverse(mat4 m) {
  float
      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  return mat4(
      a11 * b11 - a12 * b10 + a13 * b09,
      a02 * b10 - a01 * b11 - a03 * b09,
      a31 * b05 - a32 * b04 + a33 * b03,
      a22 * b04 - a21 * b05 - a23 * b03,
      a12 * b08 - a10 * b11 - a13 * b07,
      a00 * b11 - a02 * b08 + a03 * b07,
      a32 * b02 - a30 * b05 - a33 * b01,
      a20 * b05 - a22 * b02 + a23 * b01,
      a10 * b10 - a11 * b08 + a13 * b06,
      a01 * b08 - a00 * b10 - a03 * b06,
      a30 * b04 - a31 * b02 + a33 * b00,
      a21 * b02 - a20 * b04 - a23 * b00,
      a11 * b07 - a10 * b09 - a12 * b06,
      a00 * b09 - a01 * b07 + a02 * b06,
      a31 * b01 - a30 * b03 - a32 * b00,
      a20 * b03 - a21 * b01 + a22 * b00) / det;
}

mat4 cameraLookAt(vec3 eye, vec3 target, vec3 up) {
  #if 1
  return inverse(lookAt(eye, target, up));
  #else
  vec3 zAxis = normalize(target - eye);
  vec3 xAxis = normalize(cross(up, zAxis));
  vec3 yAxis = cross(zAxis, xAxis);

  return mat4(
    xAxis, 0,
    yAxis, 0,
    zAxis, 0,
    -dot(xAxis, eye), -dot(yAxis, eye), -dot(zAxis, eye), 1);  
  #endif
  
}

// hash function from https://www.shadertoy.com/view/4djSRW
float hash(float p) {
	vec2 p2 = fract(vec2(p * 5.3983, p * 5.4427));
    p2 += dot(p2.yx, p2.xy + vec2(21.5351, 14.3137));
	return fract(p2.x * p2.y * 95.4337);
}

float m1p1(float v) {
  return v * 2. - 1.;
}

float p1m1(float v) {
  return v * 0.5 + 0.5;
}

float inv(float v) {
  return 1. - v;
}

#define NUM_PARTS_PER_PETAL 20.
#define NUM_EDGE_POINTS_PER_CIRCLE 4.
#define NUM_SUBDIVISIONS_PER_CIRCLE 4.
#define NUM_POINTS_PER_DIVISION (NUM_EDGE_POINTS_PER_CIRCLE * 6.)
#define NUM_POINTS_PER_CIRCLE (NUM_SUBDIVISIONS_PER_CIRCLE * NUM_POINTS_PER_DIVISION) 
void getCirclePoint(const float id, const float circleId, const float inner, const float start, const float end, out vec3 pos, out vec3 uvf, out float snd) {
  float edgeId = mod(id, NUM_POINTS_PER_DIVISION);
  float ux = floor(edgeId / 6.) + mod(edgeId, 2.);
  float vy = mod(floor(id / 2.) + floor(id / 3.), 2.); // change that 3. for cool fx
  float sub = floor(id / NUM_POINTS_PER_DIVISION);
  float subV = sub / (NUM_SUBDIVISIONS_PER_CIRCLE - 1.);
  float level = subV + vy / (NUM_SUBDIVISIONS_PER_CIRCLE - 1.);
  float u = ux / NUM_EDGE_POINTS_PER_CIRCLE;
  float v = 1.;//mix(inner, 1., level);
  float ringId = sub + vy;
  float ringV = ringId / NUM_SUBDIVISIONS_PER_CIRCLE;
  float a = mix(start, end, u) * PI * 2. + PI * 0.0;
  float skew = 1. - step(0.5, mod(ringId - 2., 3.));
  snd = 0.;//texture2D(sound, vec2((0.02 + abs(u * 2. - 1.)) * 0.20, ringV * 0.25)).a;
  
  
  float z = mix(inner, 1., level);
  a += 1. / NUM_EDGE_POINTS_PER_CIRCLE * PI * 2. * 20. + sin(time * 1. + (circleId + z) * 0.1) + snd * 1.5;
  float s = sin(a);
  float c = cos(a);
  float x = c * v;
  float y = s * v;
  pos = vec3(x, y, z);  
  uvf  = vec3(floor(edgeId / 6.) / NUM_EDGE_POINTS_PER_CIRCLE, subV, floor(id / 6.));
}

float goop(float t) {
  return (sin(t) + sin(t * 0.27) + sin(t * 1.53) + sin(t * 1.73)) / 4.;
}

void main() {
  float circleId = floor(vertexId / NUM_POINTS_PER_CIRCLE);
  float petalId = floor(circleId / NUM_PARTS_PER_PETAL);
  circleId = mod(circleId, NUM_PARTS_PER_PETAL);
  float pointId = mod(vertexId, NUM_POINTS_PER_CIRCLE);
//  float sideId = floor(circleId / 2.);
//  float side = mix(-1., 1., step(0.5, mod(circleId, 2.)));
  float numCircles = floor(vertexCount / NUM_POINTS_PER_CIRCLE / 12.);
  float cu = circleId / numCircles;
  vec3 pos;
  float inner = 0.0;
  float start = 0.;//time * -0.1;
  float end   = start + 1.;
  float snd;
  vec3 uvf;
  getCirclePoint(pointId, circleId, inner, start, end, pos, uvf, snd); 
  
  vec3 offset = vec3(0);
  //offset   += vec3(m1p1(hash(circleId)) * 0.5, m1p1(hash(circleId * 0.37)), -m1p1(circleId / numCircles));
  //offset.x += goop(circleId + time * 0.3) * 0.4;
  //offset.y += goop(circleId + time * 0.13) * 0.1;
  offset.z += circleId * 2.6;
//  vec3 aspect = vec3(1, resolution.x / resolution.y, 1);
  float edgeId = circleId + pos.z * 0.76;
  
  float ss = texture2D(sound, vec2(0.053, edgeId / numCircles * 1.)).a;
  
  vec3 camera = vec3(0, 50., -0.01);
  vec3 target = vec3(0, 0, 0);
  vec3 up = vec3(0, 1, 0);
  
  mat4 mat = ident(); 
  mat *= persp(radians(65. * resolution.y / resolution.x), resolution.x / resolution.y, 0.1, 100.);
  mat *= rotZ(sin(time * 0.1));
  mat *= cameraLookAt(camera, target, up);
  mat *= rotY(petalId / 12. * PI * 2. + sin(time * 0.4 + 3. + edgeId * mix(0.1, 0.5, p1m1(sin(time * 0.1)))) * 0.3);
  mat *= trans(offset);
//  mat *= uniformScale(mix(0.1, 0.4, hash(circleId) * exp(snd)));
  float sc = mix(0.5, 5., mix(1., 2., pow(edgeId / numCircles, 10.))
                 *  (pow(ss + 0.2, 5.0) + pow(goop((time * 0.1 + 38. + edgeId) * 0.1), 3.)));
  mat *= scale(vec3(sc, sc, 2.));
  gl_Position = mat * vec4(pos, 1);
  gl_PointSize = 4.;
  
  float hue = mix(0.0, 0.5, mod(uvf.z, 2.)) + time * 0.1;
  float sat = 1.; mod(uvf.z, 2.);
  float val = mix(0.5, 1., fract((edgeId)* 0.25 - time));
  v_color = vec4(hsv2rgb(vec3(hue, sat, val)), 1.);
//  v_color = mix(v_color.rgba, vec4(1,1,1,1), );
}`,
};
