export default {
    name: "It's So In Vogue To Be Dead",
    mode: WebGLRenderingContext.POINTS,
    num: 100000,
    text: `
    #define PI radians(180.)

mat4 scale(float s)
{
  return mat4(
    s, 0, 0, 0,
    0, s, 0, 0,
    0, 0, s, 0,
    0, 0, 0, 1);
}

void main() {
  float segmentsPerCircle = 16.;
  float vertsPerSegment = 6.;
  
  // set base vert pos
  float bx = mod(vertexId, 2.) + floor(vertexId / 6.);
  float by = mod(floor(vertexId / 2.) + floor(vertexId / 3.), 2.);
  float angle = mod(bx, segmentsPerCircle) / segmentsPerCircle *  2. * PI;
  
  // offset circles
  float circleCount = vertexCount / (segmentsPerCircle * vertsPerSegment);
  float circlesPerRow = 45.;
  float circlesPerColumn = floor(circleCount / circlesPerRow);
  float circleId = floor(vertexId / (segmentsPerCircle * vertsPerSegment));
  float cx = mod(circleId, circlesPerRow);
  float cy = floor(circleId / circlesPerRow);
  
  float sx = cx - circlesPerRow * 0.5;
  float sy = cy - circlesPerColumn * 0.5; //cy - circlesPerColumn * 0.5;
  vec2 soundTexCoords0 = vec2(0, 0);
  float soundXTimeOffset = 0.; //sin(time) * 0.015625;
  float beatwave =
    (  1. - abs( sin( time ) ) - 1. ) * sign( sin( time * 0.5 ) );
  float sampleRange = beatwave * 0.025 + 0.125;
  soundTexCoords0.x = abs(atan(sx / sy)) / (PI * 0.5) * sampleRange;
  float maxRadius = sqrt(pow(circlesPerRow * 0.5, 2.) + pow(circlesPerColumn * 0.5, 2.));
  // lets pretend the max radius is actually a little longer.
  maxRadius *= 1.5;
  float historyDepth = 0.0625;
  float currentRadius = sqrt(pow(sx, 2.) + pow(sy, 2.)) / maxRadius;
  soundTexCoords0.y = currentRadius * historyDepth;
  vec2 soundTexCoords1 = soundTexCoords0;
  soundTexCoords1.y = historyDepth - soundTexCoords0.y + historyDepth;
  float outgoingR = texture2D(sound, soundTexCoords0).a;
  float r = outgoingR;
  r = r * (1. + soundTexCoords0.x) + 0.1;
  r = pow(r, 5.);
  float radius = by * r;
  float x = cos(angle) * radius;
  float y = sin(angle) * radius;
  
  gl_Position = vec4(x, y, -r / 2., 1);
  gl_Position += vec4(cx - circlesPerRow * 0.5, cy - circlesPerColumn * 0.5, 0, 0);
  
  // scale
  gl_Position *= scale(1. / 11.);
  
  // fix aspect
  vec4 aspect = vec4(resolution.y / resolution.x, 1, 1, 1);
  gl_Position *= aspect;
  
  float g = (sin((abs(sx) + abs(sy)) * 0.25 - time * 8.) * 0.5 + 0.5);
  v_color = vec4(r * 2. - 0.5, g, 1, 1);
  
  gl_PointSize = 4.;
}`,
};