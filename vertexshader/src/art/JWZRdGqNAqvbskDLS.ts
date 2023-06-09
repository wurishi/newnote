export default {
  name: 'Heart',
  mode: WebGLRenderingContext.TRIANGLE_FAN,
  num: 1000,
  text: `
  /*------------------------------------------------------------------------
Author					: Jina Hyun
Assignment Name/Number	: Shader/3 (Extra Credit)
Course Name				: CS230
Term					: Spring 2019
------------------------------------------------------------------------*/

#define SIZE 0.1
#define SPEED 10.0
#define SCALE_OFFSET 0.1

void main(void)
{  
  // Heart Shape
  float x = 16. * sin(vertexId) * sin(vertexId) * sin(vertexId);
  float y = 13. * cos(vertexId) - 5. * cos(2. * vertexId) - 2. * cos(3. * vertexId) - cos(4. * vertexId);
    
  // Map -1 to 1
  float size = 0.17 * SIZE;
  x = x * size;
  y = y * size;
  
  // Set Scale
  float scale = (abs(sin(time * SPEED) * SCALE_OFFSET) + 0.5);
  x = x * scale * 0.75;
  y = y * scale;
    
  gl_Position = vec4(x + mouse.x, y + mouse.y, 0.0, 1.0);  
  v_color = vec4(abs(sin(time * mouse.x)), abs(cos(time * mouse.y)), abs((mouse.x + mouse.y)/2.), 1.);
}`,
};