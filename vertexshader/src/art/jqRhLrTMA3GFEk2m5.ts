export default {
    name: 'pointsprite plasma 3D',
    mode: WebGLRenderingContext.POINTS,
    num: 100000,
    text: `
    //time vertexId gl_Position v_color resolution

// 3d plasma
// maybe I will polygonize this in my next code

#define width 384.0
#define height 256.0

float plasma(vec2 pos)
{
  float c = 0.0;
  c = sin(sin(pos.x) + sin(3.4 * pos.y) + sin(3.0 * pos.x + pos.y + 3.0 * time) + sin(pos.x + sin(pos.y + 2.0 * time))) + (sin(pos.x * pos.y - 3.0 * time) * 0.5 + 0.25);
  return c;
}

void main() {
  float ratio = resolution.x / resolution.y;
  float w = width;
  float h = height / ratio;

  float vId = float(vertexId);
  float px = (mod(vId, w) - w / 2.0) / (w / 2.0);
  float py = (floor(vId / w) - h / 2.0) / (h / 0.5) + 0.5;
  
  //gl_Position = vec4(px, py, 0, 1);
  float y = -0.75 + py;
  float c = sin(plasma(vec2(px+0.5, py) * 4.0)) * 0.5 + 0.25;
  gl_Position = vec4(px / py, (y + c * 0.15) / py, 0.0, 1);
  gl_PointSize = 24.0;

  
  v_color = vec4(0.5 + c, 0.5 + c, 1.5 + c, 1) * 0.75;
}`,
};