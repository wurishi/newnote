export default {
    name: 'eswng',
    mode: WebGLRenderingContext.LINE_LOOP,
    num: 5000,
    text: `
    #define PI 3.14159
    #define NUM_SEGMENTS 21.0
    #define NUM_POINTS (NUM_SEGMENTS * 2.0)
    #define STEP 5.0
    #define ACROSS 100.0
    #define TOTAL 5000.0
    #define DOWN (TOTAL / ACROSS)
    //#define FIT_VERTICAL
    
    vec3 hsv2rgb(vec3 c) {
      c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    void main() {
      
      float count = mod(vertexId, TOTAL) + time * 0.0;
      float xId  = mod(vertexId, ACROSS);
      float yId  = floor(vertexId / ACROSS);
      float xr   = xId / ACROSS;
      float yr   = yId / DOWN;
      float invX = 1.0 - xr;
      float invY = 1.0 - yr;
      float x    = xr * 2.0 - 1.0;
      float y    = yr * 2.0 - 1.0;
      
    
      vec2 aspect = vec2(1, resolution.x / resolution.y);
    
      vec2 xy = vec2(x, y);
    
      float dd = length(xy);
      float x2 = xr;
      float y2 = yr;
      float snd = pow(texture2D(sound, vec2(abs(dd) * 0.2, dd * 0.05)).a, 5.0);
      gl_PointSize = pow(snd, 1.0) * 20.0;
     
    //  xy = xy + xy * snd ;
      gl_Position = vec4(xy * aspect * pow(snd + 0.4, 2.0), 0, 1);
      
      float hue = (snd * 0.2) + time;
      v_color = vec4(mix(hsv2rgb(vec3(hue, 1, 1)), vec3(1,1,1), pow(snd, 0.5)), 1.0);
      v_color = vec4(v_color.rgb * v_color.a, v_color.a);
    }`,
};