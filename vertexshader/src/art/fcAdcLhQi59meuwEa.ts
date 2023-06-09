export default {
    name: 'amoebia',
    mode: WebGLRenderingContext.LINE_STRIP,
    num: 72000,
    text: `
    
#define PI radians(180.0)
 
#define kShapeVertexCount 36.0
#define kVertexPerShape 6.0
#define numberOfShapesPerGroup 7.0
#define fakeVerticeNumber 100000.

const float dim = 120.;
const float off = 0.1;
const vec3 vAlb = vec3(0.5);


//////////////////////////////
//K Machine parameters
/////////////////////////////

//KDrawmode=GL_LINE_STRIP 


#define tubeSpeedFactor 2.3 //KParameter 0.>>4. 
#define cudeSpeedFactor 80. //KParameter 0.>>150.
#define SizeFactorX  100.1 //KParameter 1.>>10.
#define radiusSizeFactor 0.8 //KParameter 0.05>>0.2
#define cubeSizeFactor 1. //KParameter 0.5>>40.
#define cubeScaleFactorY 1. //KParameter 0.5>>40.
#define soundFactor 1. //KParameter 1.>>3.

#define cubeScaleFactorZ 1.

mat4 rotZ(float _radAngle) { 
    float s = sin(_radAngle);
    float c = cos(_radAngle);
  	
    return mat4( 
      c,-s, 0, 0, 
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1); 
}

mat4 scale(vec3 _s) {
  return mat4(
    _s[0], 0, 0, 0,
    0, _s[1], 0, 0,
    0, 0, _s[2], 0,
    0, 0, 0, 1);
}

mat4 persp(float _fov, float _aspect, float _zNear, float _zFar) {
  float f = tan(PI * 0.5 - 0.5 * _fov);
  float rInv = 1.0 / (_zNear - _zFar);

  return mat4(
    f / _aspect, 0., 0., 0.,
    0., f, 0., 0.,
    0., 0., (_zNear + _zFar) * rInv, -1.,
    0., 0., _zNear * _zFar * rInv * 2., 0.);
}

mat4 lookAt(vec3 _eye, vec3 _targ, vec3 _up) {
  vec3 zAx = normalize(_eye - _targ);
  vec3 xAx = normalize(cross(_up, zAx));
  vec3 yAx = cross(zAx, xAx);

  return mat4(
    xAx, 0.,
    yAx, 0.,
    zAx, 0.,
    _eye, 1.);
}

mat4 inverse(mat4 _m) {
  float
      a00 = _m[0][0], a01 = _m[0][1], a02 = _m[0][2], a03 = _m[0][3],
      a10 = _m[1][0], a11 = _m[1][1], a12 = _m[1][2], a13 = _m[1][3],
      a20 = _m[2][0], a21 = _m[2][1], a22 = _m[2][2], a23 = _m[2][3],
      a30 = _m[3][0], a31 = _m[3][1], a32 = _m[3][2], a33 = _m[3][3],

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

vec3 getTrajPoint(const float _id) {
  return vec3(
    sin(_id * 0.99+time/100.),
    sin(_id * 2.43+time/100.),
    sin(_id * 1.57+time/100.));
}
 
float getFLoatLiss(const float _id, const float _time)
{
  return sin(0.99+_time) +sin( 2.43+_time) +sin( 1.57)/30.;
}

void getPosAndAxisMat(const float _rel, const float _delta, out mat3 _axis, out mat3 _pos)
{
  
  float pg = _rel + _delta;
  
  vec3 r0 = getTrajPoint(pg + off * 0.);
  vec3 r1 = getTrajPoint(pg + off * 1.);
  vec3 r2 = getTrajPoint(pg + off * 2.);
  
  _pos = mat3(
    getTrajPoint(pg + off * 0.),
    getTrajPoint(pg + off * 1.),
    getTrajPoint(pg + off * 2.));
  
  vec3 s0 = normalize(_pos[1] - _pos[0]);
  vec3 s1 = normalize(_pos[2] - _pos[1]);
  
  vec4 zaxis = vec4(normalize(s1 - s0),1.);
  vec4 xaxis = vec4(normalize(cross(s0, s1)),1.);
  vec4 yaxis = vec4(normalize(cross(zaxis.xyz, xaxis.xyz)),1.);
 
  _axis = mat3(
    xaxis,
    yaxis,
    zaxis);


}

void getTrajMat(float _shapeId, float _shapeCount, float _timeB, out mat4 _wmat, out mat4 _emat) {
  
  
  float prog = (_shapeId / _shapeCount)+_timeB;
  
  mat3 axis, mPos;

  getPosAndAxisMat((_shapeId / _shapeCount), _timeB, axis, mPos);

  //pos mtx
  _wmat = mat4(
    vec4(axis[0], 0),
    vec4(axis[1], 0),
    vec4(axis[2], 0),
    vec4(mPos[0] * dim, 1)); 
  
  //orient mtx
  vec3 eye    = mPos[0] * dim + axis[2] * 1.;
  vec3 target = mPos[1] * dim + axis[2];
  vec3 up     = axis[1];
  
  mat4 cmat = lookAt(eye, target, up);
  _emat = inverse(cmat);
  
  
}


#define kShapeVertexCount 36.0
#define kVertexPerShape 6.0

vec3 shapeVertex(float _vId, out vec4 _nI)
{
    float faceId = floor(_vId / kVertexPerShape);
    float vtxId = mod(_vId, kVertexPerShape);
    vec2 fp;
    vec3 v;
    
    if(vtxId <= 1.0) {
        fp = vec2(1.0, 1.0);
    }
    else if(vtxId == 2.0) {
        fp = vec2(-1.0, 1.0);
    }
    else if(vtxId == 3.0) {
        fp = vec2(1.0, -1.0);
    }
    else {
        fp = vec2(-1.0, -1.0);
    }
    
    if(faceId == 0.0) {
        
        v = vec3(fp.x, fp.y, 1.0);
        _nI = vec4(0.0, 0.0, 1.0, faceId);
    }
    else if(faceId == 1.0) {
        
        v = vec3(-fp.x, fp.y, -1.0);
        _nI = vec4(0.0, 0.0, -1.0, faceId);
    }
    else if(faceId == 2.0) {
        
        v = vec3(fp.x, 1.0, -fp.y);
        _nI = vec4(0.0, 1.0, 0.0, faceId);
    }
    else if(faceId == 3.0) {
        
        v = vec3(fp.x, -1.0, fp.y);
        _nI = vec4(0.0, -1.0, 0.0, faceId);
    }
    else if(faceId == 4.0) {
        
        v = vec3(-1.0, fp.y, -fp.x);
        _nI = vec4(-1.0, 0.0, 0.0, faceId);
    }
    else {
        
        v = vec3(1.0, fp.y, fp.x);
        _nI = vec4(1.0, 0.0, 0.0, faceId);
    }
    
    return v;
}


mat4 rotMatx(vec3 _axis, float _angle)
{
    _axis = normalize(_axis);
    float s = sin(_angle);
    float c = cos(_angle);
    float oc = 1.0 - c;
    
    return mat4(oc * _axis.x * _axis.x + c,           oc * _axis.x * _axis.y - _axis.z * s,  oc * _axis.z * _axis.x + _axis.y * s,  0.0,
                oc * _axis.x * _axis.y + _axis.z * s,  oc * _axis.y * _axis.y + c,           oc * _axis.y * _axis.z - _axis.x * s,  0.0,
                oc * _axis.z * _axis.x - _axis.y * s,  oc * _axis.y * _axis.z + _axis.x * s,  oc * _axis.z * _axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}


void addPtLight( vec3 vLightPos, vec3 vLightColor, in vec3 _pos, in vec3 _norm, inout vec3 vDiffuse, inout vec3 vSpecular )
{
  vec3 vLightDir = normalize(vLightPos - _pos);
  vec3 vViewDir = normalize(-_pos);
  
  float NdotL = max( 0.0, dot( vLightDir, _norm ) );
  
  vec3 vHalfAngle = normalize( vViewDir + vLightDir );

  float NdotH = max( 0.0, dot( vHalfAngle, _norm ) );
  
  vDiffuse += NdotL * vLightColor;

  float fPower = 80.0;
  vSpecular += pow( NdotH, fPower ) * (fPower * 8.0 * PI) * NdotL * vLightColor;
}

void addDirLight( vec3 _vLDir, vec3 _vLColor, in vec3 _pos, in vec3 _norm, inout vec3 _vDiff, inout vec3 _vSpec )
{
  vec3 vViewDir = normalize(-_pos);
  
  float NdotL = max( 0.0, dot( _vLDir, _norm ) );
  
  vec3 vHalfAngle = normalize( vViewDir + _vLDir );

  float NdotH = max( 0.0, dot( vHalfAngle, _norm ) );
  
  _vDiff += NdotL * _vLColor;

  float fPower = 80.0;
  _vSpec += pow( NdotH, fPower ) * (fPower * 8.0 * PI) * NdotL * _vLColor;
}

vec3 lightget(const vec3 vAlbedo, const vec3 _pos, const vec3 _eyePos, const vec3 _norm )
{   
  vec3 vDiffuseLight = vec3(0.8,0.8, 0.8);
  vec3 vSpecLight = vec3(0.8,0.8, 0.8);

  vec3 vAmbient = vec3(0.8,0.8, 0.8);
  vDiffuseLight += vAmbient;
  vSpecLight += vAmbient;


  //addPtLight( vec3(3.0, 2.0, 30.0), vec3( 0.2, 0.2,0.2),_pos, _norm, vDiffuseLight, vSpecLight );
 
  //addDirLight( normalize(vec3(0.0, -1.0, 0.0)*dim), vAmbient * 0.1, _pos, _norm, vDiffuseLight, vSpecLight );
  
  vec3 vViewDir = normalize(-_eyePos);
  
  float fNdotD = clamp(dot(_norm, vViewDir), 0.0, 1.0);
  vec3 vR0 = vec3(0.04);
  vec3 vFresnel = vR0 + (1.0 - vR0) * pow(1.0 - fNdotD, 5.0);
  
  
  vec3 vColor = mix( vDiffuseLight * vAlbedo, vSpecLight, vFresnel );
  
  return vColor;
}


vec3 lightPost( vec3 _vColor )
{
  float exposure = 1.0;
  _vColor = vec3(1.0) - exp2( _vColor * -exposure );

  _vColor = pow( _vColor, vec3(1.0 / 2.2) );

  return _vColor;
}

void processSymX(inout vec3 _pos, inout vec3 _norm, float _xSym)
{
  _pos.x = (_xSym - _pos.x);
  _norm.x = -_norm.x;//(_xSym - _norm.x);;
}

vec3 hsv2rgb(vec3 c) {
  c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
  
#define EYE_STATIC true
//#define STOP_TRAJ true
//#define DYN_GROUPID true
#define SOUND_REACT true

void main() {
  
    float finalVertexId = mod(vertexId,fakeVerticeNumber);
    float finalVertexCount = min(vertexCount,fakeVerticeNumber);
  
    bool bSym = false;
    //Handle the sym
    if(finalVertexId>=vertexCount/2.)
    {
       finalVertexId-= vertexCount/2.;
       bSym = true;
    }
   
  
    //shape
    float shapeCount = floor(finalVertexCount / kShapeVertexCount);
    float shapeId = floor(finalVertexId / kShapeVertexCount);
    float shapeVertexId = mod(finalVertexId, kShapeVertexCount);
    float shapeRelId = shapeId/shapeCount;
    
    //group
    float groupId = floor(shapeId/numberOfShapesPerGroup);
    float groupCount = floor(shapeCount/numberOfShapesPerGroup);
    float shapeIdInGroup = mod(shapeId,numberOfShapesPerGroup);
    float relShapeGroupId = shapeIdInGroup/numberOfShapesPerGroup;
    float relGroupId = groupId/groupCount;
  
   #ifdef SOUND_REACT
   float snd = 1.+soundFactor*texture2D(sound, vec2(0., (1.-relGroupId))).a;
   #else
   float snd = 1.;
   #endif
    
  
  #ifdef STOP_TRAJ
  float timeB = 14.;
  #else
  float timeB = time * tubeSpeedFactor;
  #endif
  

 
  //Static eye
  #ifdef EYE_STATIC
  /*
  vec3 eye = vec3(0.5, 0.5, 3.5)*dim;
  vec3 target = vec3(0.5, 0.5, 1.)*dim;
  vec3 up     = vec3(0., 1., 0.);
*/
  vec3 eye = vec3(sin(0.22*time), 1.5*cos(0.99*time), 6.*cos(0.13*time))*dim;
  vec3 target = vec3(0.5*sin(0.22*time), 0.5, 1.)*dim;
  vec3 up     = vec3(0., 1., 0.);
  #else
   //Following eye
  mat3 axis, sPos;// = getAxisMat(0., timeB);
  getPosAndAxisMat(0., timeB, axis, sPos);
  vec3 eye = sPos[0] * dim + axis[0].xyz * 1.;
  vec3 target = sPos[2] * dim + axis[2];
  vec3 up = axis[1];
  #endif
  
  
 mat4 vmat = inverse(lookAt(eye, target, up));
  

    vec4 cNorm;
  
    vec3 cubep = shapeVertex(shapeVertexId, cNorm);;
      
   
    mat4 scaleMat = scale(vec3(cubeSizeFactor,cubeScaleFactorY*cubeSizeFactor*snd,cubeScaleFactorZ*cubeSizeFactor));
    
    cubep = (scaleMat*vec4(cubep,1.)).xyz;
  
    mat4 zrot = rotZ(relShapeGroupId*2.*PI);//shape orientation
    cubep = (zrot*vec4(cubep,1.)).xyz;
  
    cNorm *= zrot;
     //create the circle group
    float radius =100.*radiusSizeFactor*getFLoatLiss(groupId, 0.)*snd;
    cubep.x+= radius*sin(2.*PI*relShapeGroupId);
    cubep.y+= radius*cos(2.*PI*relShapeGroupId);
  //cubep.z = mod(time*2.,3.);
  //cubep = vec3(cubep.x , cubep.y+sndFactor*snd, cubep.z+lineId*patternSize +mod(time*speedFactor,patternSize));//position
    
  vec3 pos;
  
  //shapeId = mod(shapeId+time, shapeCount);

  mat4 posmat, rotmat;

  #ifdef DYN_GROUPID
  getTrajMat(mod(groupId-time*cudeSpeedFactor,groupCount), groupCount, timeB, posmat, rotmat);
  #else
   getTrajMat(groupId, groupCount/10., timeB, posmat, rotmat);
  #endif
  
  //shape orientation
  cubep = (vec4(cubep.xyz,1.)*rotmat).xyz;
  cNorm *= rotmat;
  
  //shape position
  cubep+= (posmat * vec4(0.,0.,0., 1)).xyz;
 
  //Sym
  if(bSym)
  processSymX(cubep, cNorm.xyz, dim/2.);

  float colorIndex = mod(shapeIdInGroup,2.);
  
  vec3 alb = vec3(0.,0.,1.);
  if(colorIndex == 0.)
  {
    alb = vec3(1.,1.,0.);

  }
  
  
  vec3 finalColor = alb;
  lightPost(finalColor);
  
  gl_PointSize = 2.;
  mat4 pmat = persp(radians(60.0), resolution.x / resolution.y, .1, 1000.0);
  gl_Position = pmat * vmat * vec4(cubep, 1);
  
  v_color = vec4(finalColor,1.);
}
`,
};