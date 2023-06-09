export default {
    name: 'wwww',
    mode: WebGLRenderingContext.TRIANGLES,
    num: 100000,
    text: `

#define PI radians(180.0)

vec3 hsv2rgb(vec3 c) {
  c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


mat4 rotX(float angleInRadians) {
    float s = sin(angleInRadians);
    float c = cos(angleInRadians);
  	
    return mat4( 
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1);  
}

mat4 rotY(float angleInRadians) {
    float s = sin(angleInRadians);
    float c = cos(angleInRadians);
  	
    return mat4( 
      c, 0,-s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1);  
}

mat4 rotZ(float angleInRadians) {
    float s = sin(angleInRadians);
    float c = cos(angleInRadians);
  	
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

// times 2 minus 1
float t2m1(float v) {
  return v * 2. - 1.;
}

// times .5 plus .5
float t5p5(float v) {
  return v * 0.5 + 0.5;
}

float inv(float v) {
  return 1. - v;
}


float m1p1(float v) {
  return v * 2. - 1.;
}


float goop(float t) {
  return sin(t) + sin(t * 0.27) + sin(t * 0.13) + sin(t * 0.73);
}

float Hash( vec2 p) {
     vec3 p2 = vec3(p.xy,1.0);
    return fract(sin(dot(p2,vec3(37.1,61.7, 12.4)))*3758.5453123);
}


float noise(in vec2 p) {
    vec2 i = floor(p);
     vec2 f = fract(p);
     f *= f * (3.0-2.0*f);

    return mix(mix(Hash(i + vec2(0.,0.)), Hash(i + vec2(1.,0.)),f.x),
               mix(Hash(i + vec2(0.,1.)), Hash(i + vec2(1.,1.)),f.x),
               f.y);
}

float fbm(vec2 p) {
     float v = 0.0;
     v += noise(p*1.0)*.5;
     v += noise(p*2.)*.25;
     v += noise(p*4.)*.125;
     return v;
}

float crv(float v) {
  return fbm(vec2(v, v * 1.23));
  //float o = sin(v) + sin(v * 2.1) + sin(v * 4.2) + sin(v * 8.9); 
  //return o / 4.;
}


vec3 getCenterPoint(const float id, vec2 seed) {
  float a0 = id + seed.x;
  float a1 = id + seed.y;
  return vec3(crv(a0), crv(a1), 0);
  return vec3(crv(a0), crv(a1), crv(a0 + a1 * 0.134));
//  return vec3(
//    (sin(a0 * 0.39) + sin(a0 * 0.73) + sin(a0 * 1.27)) / 3.,
//    (sin(a1 * 0.43) + sin(a1 * 0.37) + cos(a1 * 1.73)) / 3.,
//    0);
}

void getQuadPoint(const float quadId, const float mult, const float pointId, float thickness, vec2 seed, out vec3 pos, out vec2 uv) {
  vec3 p0 = getCenterPoint(quadId + mult * 0., seed);
  vec3 p1 = getCenterPoint(quadId + mult * 1., seed);
  vec3 p2 = getCenterPoint(quadId + mult * 2., seed);
  vec3 p3 = getCenterPoint(quadId + mult * 3., seed);
  vec3 perp0 = normalize(p2 - p0).yxz * vec3(-1, 1, 0) * thickness;
  vec3 perp1 = normalize(p3 - p1).yxz * vec3(-1, 1, 0) * thickness;
  
  float id = pointId;
  float ux = mod(id, 2.);
  float vy = mod(floor(id / 2.) + floor(id / 3.), 2.); // change that 3. for cool fx
  
  pos = vec3(mix(p1, p2, vy) + mix(-1., 1., ux) * mix(perp0, perp1, vy)); 
  uv  = vec2(ux, vy);
}

#define POINTS_PER_LINE 3000.
#define QUADS_PER_LINE (POINTS_PER_LINE / 6.)
void main() {
  float lineId = floor(vertexId / POINTS_PER_LINE);
  float numLines = floor(vertexCount / POINTS_PER_LINE);
  float quadCount = POINTS_PER_LINE / 6.; 
  float pointId = mod(vertexId, 6.);
  float quadId = floor(mod(vertexId, POINTS_PER_LINE) / 6.);
  vec3 pos;
  vec2 uv;
  
  float qn = quadId / quadCount;
  float ln = lineId / numLines;
  float pn = (quadId + mod(pointId, 2.)) / quadCount;
  float snd0 = texture2D(sound, vec2(mix(0.1, 0.3, ln), mix(0.0, 0.1, pn))).a;
  float snd1 = texture2D(sound, vec2(mix(0.1, 0.3, ln), mix(0.02, 0.12, pn))).a;
  
  snd0 = 0.6;
  snd1 = 0.7;
//  snd1 = snd0;
  
  float mult = .002;
  getQuadPoint(
    //pn + time * 0.5 + ln * .2, 
    (quadId + mod(pointId, 2.)) * mult + time * 0.1 + ln * .42,
    mult,
    pointId, 
    pow(snd0, 5.0) * 0.25, 
    vec2(
      pow(snd0, 2.), 
      pow(snd1, 2.)), 
    pos, 
    uv); 
  
  float across = floor(sqrt(numLines));
  float down = floor(numLines / across);
  float xx = mod(lineId, across);
  float yy = floor(lineId / across);
  float ux = xx / (across - 1.);
  float vy = yy / (down - 1.);
  
  float aspect = resolution.x / resolution.y;
 
  mat4 mat = scale(vec3(1, aspect, 1) * .15);
  mat *= trans((vec3(ux, vy, 0) * 2. - 1.) * 2.);
  gl_Position = mat * vec4((pos * 2. - 1.) * mix(5., 15., sin(time * 0.1 + qn) * .5 + .5), 1);
  gl_Position.xyz /= gl_Position.w;
  gl_Position.z = -pn;
  gl_Position.w = 1.;

  float hue = mix(0.95, 1.5, ln * 0.3 + qn * 00.) + time * 0.01;
  float sat = 1. + sin(time) * .5;
  float val = 1.;
  v_color = vec4(hsv2rgb(vec3(hue, sat, val)), pn);
  v_color = vec4(v_color.rgb * v_color.a, v_color.a);
 // v_color.a = 1.;
}`,
};
