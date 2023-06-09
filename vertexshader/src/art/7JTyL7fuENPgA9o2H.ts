export default {
    name: 'strg',
    mode: WebGLRenderingContext.TRIANGLES,
    num: 100000,
    text: `
    // terrain

#define PI radians(180.0)

vec3 hsv2rgb(vec3 c) {
  c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


mat4 rotX(float angle) {

    float s = sin( angle );
    float c = cos( angle );

    return mat4(
      1, 0, 0, 0,
      0, c, s, 0,
      0,-s, c, 0,
      0, 0, 0, 1);
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
  #if 0
  return mat4(
    1, 0, 0, trans[0],
    0, 1, 0, trans[1],
    0, 0, 1, trans[2],
    0, 0, 0, 1);
  #else
  return mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    trans, 1);
  #endif
}

mat4 ident() {
  return mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1);
}

mat4 uniformScale(float s) {
  return mat4(
    s, 0, 0, 0,
    0, s, 0, 0,
    0, 0, s, 0,
    0, 0, 0, 1);
}

mat4 scale(vec3 s) {
  return mat4(
    s[0], 0, 0, 0,
    0, s[1], 0, 0,
    0, 0, s[2], 0,
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


float m1p1(float v) {
  return v * 2. - 1.;
}

float p1m1(float v) {
  return v * .5 + .5;
}

float inRange(float v, float minV, float maxV) {
  return step(minV, v) * step(v, maxV);
}

float at(float v, float target) {
  return inRange(v, target - 0.1, target + 0.1);
}

// terrain function from mars shader by reider
// https://www.shadertoy.com/view/XdsGWH
const mat2 mr = mat2 (0.84147,  0.54030,
					  0.54030, -0.84147 );
float hash( in float n )
{
	return fract(sin(n)*43758.5453);
}
float noise(in vec2 x)
{
	vec2 p = floor(x);
	vec2 f = fract(x);
		
	f = f*f*(3.0-2.0*f);	
	float n = p.x + p.y*57.0;
	
	float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
					mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
	return res;
}
float fbm( in vec2 p )
{
    float su = fract(p.x * 0.0125);
    float sv =  1. - (p.y + 0.5) / soundRes.y;
    float s = 
      sin(time + su * 11.2) + 
      sin(time + sin(su * sv * 2.) * 17.2) + 
      sin(time + sv * 40.0) +
      sin(time * -5. + sv * 33.) * .2;
    s *= 0.15;
    // texture2D(sound, vec2(mix(0.002, 0.253, su), sv)).a;
    return pow(s, 1.) * 0.5;
    //return sin(p.y * 4.);
    //return sin(p.x * PI) * sin(p.y * PI) * 0.5;
	float f;
    p.y += time * 0.1;
	f  =      0.5000*noise( p ); p = mr*p*2.02;
	f +=      0.2500*noise( p ); p = mr*p*2.33;
	f +=      0.1250*noise( p ); p = mr*p*2.01;
	f +=      0.0625*noise( p ); p = mr*p*5.21;
	
	return f * 0.5;///(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
}

vec3 getQuadPoint(const float id, const float scale, const vec3 off) {
  float outId = mix(id, 8. - id, step(2.5, id));
  float ux = floor(outId / 6.) + mod(outId, 2.);
  float vy = mod(floor(outId / 2.) + floor(outId / 3.), 2.); 
  vec3 p = vec3(ux, 0, vy) + off;
  vec3 pos = p * scale + vec3(0, fbm(p.xz) * 0., 0);
  return pos;
}

vec3 grad(float v) {
  v = fract(v) * 4.0;
  vec3 c  = step(v, 1.) * mix(vec3(1, 1, 1), vec3(0, 0, 1), clamp(v - 0., 0., 1.));
  c += mix(vec3(0, 0, 1), vec3(1, 0, 0), clamp(v - 1., 0., 1.));
  return c;
}

#define POINTS_PER_QUAD 6.
void main() {
  float quadPnt  = mod(vertexId, 6.);
  float quadId   = floor(vertexId / POINTS_PER_QUAD);
  float numQuads = floor(vertexCount / POINTS_PER_QUAD);
  float across   = floor(sqrt(numQuads) * 0.5);
  float down     = floor(numQuads / across);
  
  float qx = mod(quadId, across);
  float qz = floor(quadId / across);
  float qu = qx / across;
  float qv = qz / down;
  vec3 q = vec3(qx, 0, qz);
  
  
  float s = 16. / across;
  
  float nId = floor(quadPnt / 3.) * 3.;
  vec3 n0 = getQuadPoint(nId + 0., s, q);
  vec3 n1 = getQuadPoint(nId + 1., s, q);
  vec3 n2 = getQuadPoint(nId + 2., s, q);
  vec3 n = (cross(normalize(n1 - n0), normalize(n2 - n1)));// * mix(vec3(1,1,1), vec3(-1,-1,-1), step(2.5, nId));
  vec3 lightDir = normalize(vec3(-1, 1, -2));
  float l = abs(dot(n, lightDir));
  
  vec3 p = getQuadPoint(quadPnt, s, vec3(0));
//  p = vec3(qx, 0, qz);
  
//  float ss = texture2D(sound, vec2(fract(hash(qu + qv) + qv + time * 0.5), 0.)).a;
  float ss = texture2D(sound, vec2(qu * 0.5, qv * 0.5)).a * -200.;

  float ct = time * 0.3;
//  vec3 cameraPos    = vec3(mouse.x * 4., mix(5., 1., p1m1(mouse.y)), -3);
  vec3 cameraPos    = vec3(sin(ct), 1., sin(ct) + 1.);
  vec3 cameraTarget = vec3(cameraPos.x, 0, 4. + sin(ct));
  vec3 cameraUp     = normalize(vec3(sin(ct + 2.5) * 0.3, 1, 0));
  
  mat4 m = persp(radians(45.), resolution.x / resolution.y, 0.1, 100.);
  m *= cameraLookAt(cameraPos, cameraTarget, cameraUp);
  m *= trans(vec3(-across / 2. * s, 0, 0));
  
  m *= trans(q * s);
  mat4 m2 = rotY(sin(time * 1.114 + qu) + sin((time * 0.94 + qu * 3.0) * 0.73)+ sin((time + qv * 4.7) * 0.211)
         + qv);
//  m *= inverse(trans(q));

      m2 *= trans(vec3(
          sin((time        + qu *  0.913)) * 105. + 
          sin((time * 0.23 + qu *  2.713)) *  55. +
          sin((time * 0.51 + qu *  4.317)) *  23. +
          sin((time * 0.78 + qu *  8.111)) *  17. +
          sin((time * 1.37 + qu * 15.111)) *   6. ,
          qu + ss,
          cos((time        + qv *  1.177)) * 66. + 
          cos((time * 1.03 + qv *  2.177)) * 33. + 
          cos((time * 0.91 + qv *  4.177)) * 16. + 
          cos((time * 0.76 + qv *  8.177)) *  8. + 
          cos((time * 0.37 + qv * 16.177)) *  4. 
          ) * 0.01);
                 /*
      let smat = m3.translation(4, 6);
      smat = m3.multiply(smat, mat);
      setTransform(smat);
      ctx.fillStyle = '#000';
      ctx.fillRect(-2, -2, cellSize + 4, cellSize + 6);
      const d = m3.distance(mat[6], mat[7], xBase, yBase) / dist;
 
  */
  
  
  gl_Position = m * m2 * vec4(p, 1);
  
  float d = length(vec3(m2[3]));
  float hue = d * 0.2;0.6 + qu * 0. + p.y * 0.1;//1.;m1p1(n.z);
  float sat = 1.;pow(1. - p.y, 2.);//.3;abs(n.z);
  float val = 1.; mix(0.05, 1., l);
  
  float pop = step(0.6, ss);
//  val = mix(val, 1., pop);
//  hue = mix(hue, hue + .5, pop);
  
  float cback = 1. - pow(qv, 5.);
  float cacross = 1. - pow(abs((qu * 2. - 1.)), 5.);
  v_color = vec4(hsv2rgb(vec3(hue, sat, val)), 1.);
  v_color = mix(v_color, background, 1. - cback * cacross);
  v_color.rga *= v_color.a;
  v_color.rgb = grad(d);
  
  gl_PointSize = 10.0;
}`,
};