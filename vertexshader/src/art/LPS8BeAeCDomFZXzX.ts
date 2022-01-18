export default {
    name: 'omg',
    mode: WebGLRenderingContext.TRIANGLES,
    num: 14909,
    text: `
    /*

🔴

*/
































































#define PI radians(180.)

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


#define NUM_EDGE_POINTS_PER_CIRCLE 100.
#define NUM_POINTS_PER_DIVISION (NUM_EDGE_POINTS_PER_CIRCLE * 6.)
#define NUM_POINTS_PER_CIRCLE (NUM_SUBDIVISIONS_PER_CIRCLE * NUM_POINTS_PER_DIVISION) 
void getCirclePoint(const float id, const float inner, const float start, const float end, out vec3 pos, out vec4 uvf, out float snd) {
  float NUM_SUBDIVISIONS_PER_CIRCLE = floor(vertexCount / NUM_POINTS_PER_DIVISION);
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
  float numRings = vertexCount / NUM_SUBDIVISIONS_PER_CIRCLE;
  float a = mix(start, end, u) * PI * 2. + PI * 0.0;
  float skew = 1. - step(0.5, mod(ringId - 2., 3.));
  float su = fract(abs(u * 2. - 1.) + time * 0.1);
  
  a += 1. / NUM_EDGE_POINTS_PER_CIRCLE * PI * 2.;// * 20. * sin(time * 1.) + snd * 1.5;
  float s = sin(a);
  float c = cos(a);
  float z = mix(inner, 2., level) - vy / NUM_SUBDIVISIONS_PER_CIRCLE * 0.;
  float x = c * v * z;
  float y = s * v * z;
  pos = vec3(x, y, 0.);  
  uvf  = vec4(floor(edgeId / 6.) / NUM_EDGE_POINTS_PER_CIRCLE, subV, floor(id / 6.), sub);
}

float goop(float t) {
  return sin(t) + sin(t * 0.27) + sin(t * 0.13) + sin(t * 0.73);
}

float modStep(float count, float steps) {
  return mod(count, steps) / steps;
}


void main() {
  float vertsPerBlob = 6. * 45.;
  float blobId = floor(vertexId / vertsPerBlob);
  float numBlobs = floor(vertexCount / vertsPerBlob);
  float bv = blobId / numBlobs;
  float id = mod(vertexId, vertsPerBlob);
  float numQuads = floor(vertsPerBlob / 6.);
  float halfAround = floor(sqrt(numQuads));
  float around = halfAround * 2.;
  float down = numQuads / around;
  float quadId = floor(id / 6.);
  
  float qx = mod(quadId, around);
  float qy = floor(quadId / down);
    
  float edgeId = mod(id, 6.);
  float ux = floor(id / 6.) + mod(edgeId, 2.);
  float vy = mod(floor(id / 2.) + floor(id / 3.), 2.); 
  
  float qu = (qx + ux) / around;
  float qv = (qy + vy) / down;
  
  float r = sin(qv * PI);
  float x = cos(qu * PI * 2.) * r;
  float y = sin(qu * PI * 2.) * r;
  
  vec3 pos = vec3(x, y, cos(qv * PI));
  vec3 nrm = pos;
  
  float tm = time * 0.1 * 1.;
  float rd = 3.;
  mat4 pmat = persp(PI * 0.25, resolution.x / resolution.y, 0.1, 100.);
  vec3 eye = vec3(cos(tm) * rd, sin(tm * 0.9) * .0 + 0., sin(tm) * rd);
  vec3 target = vec3(0);
  vec3 up = vec3(0,1,0);
  
  float groupId = floor(blobId / 2.);
  float numGroups = floor(numBlobs / 2.);
  float gv = groupId / numGroups;
  float odd = mod(blobId, 2.);
  
  float s0 = texture2D(sound, vec2(mix(0.1, 0.5, gv), 0.)).a;
  float s1 = texture2D(sound, vec2(mix(0.5, 0.5, gv), qv)).a;
  
  mat4 cmat = lookAt(eye, target, up);  
  mat4 vmat = inverse(cmat);
  
  float t0 = floor(time);
  float t1 = floor(time + 1.);
  vec3 p0 = vec3(
    t2m1(hash(t0 * 0.123)), 
    t2m1(hash(t0 * 0.617)), 
    t2m1(hash(t0 * 0.371)));
  vec3 p1 = vec3(
    t2m1(hash(t1 * 0.123)), 
    t2m1(hash(t1 * 0.617)), 
    t2m1(hash(t1 * 0.371)));
  
  #if 1
  mat4 wmat = ident();
  wmat *= trans(t2m1(s0) * .0 + 
    mix(p0, p1, fract(time)) +
    cmat[2].xyz * -odd * 0.1);
  #endif
  wmat *= rotX(time + qv);
  wmat *= rotY(time * .77);
  wmat *= rotZ(gv);
  wmat *= uniformScale(mix(0., 1.7, pow(s0 + .2, 5.)) + odd * 0.0);
//  wmat *= scale(vec3(1, 1, 1. - odd));
//  mat *= uniformScale(0.4);
  
  gl_Position = pmat * vmat * wmat * vec4(pos, 1);
  gl_PointSize = 4.;

  float hue = quadId * .0 + id * 0.0;
  float sat = 1.;
  float val = 1. - odd;
  v_color = vec4(hsv2rgb(vec3(hue, sat, val)), 1.);
  
  vec3 n = (cmat * wmat * vec4(nrm, 0)).xyz;
  float l = dot(normalize(vec3(.5,1,-3)), n) * .2 + .8;
  v_color.rgb *= l;//mix(l, 1., pow(s0, .1));
  
  v_color.rgb *= v_color.a;
  
  #if 0
  gl_Position.xy /= gl_Position.w;
  gl_Position.z = bv;
  gl_Position.w = 1.;
  #endif
}`,
};