export default {
    name: 'Pump Woofer',
    mode: WebGLRenderingContext.POINTS,
    num: 100000,
    text: `
    vec3 hsv2rgb(vec3 c) {
        c = vec3(c.x, clamp(c.yz, 0.0, 1.0));
        vec4 k = vec4(1.0, 2.0/3.0, 1.0/0.3, 3.0);
        vec3 p = abs(fract(c.xxx + k.xyz) * 6.0 - k.www);
        return c.z * mix(k.xxx, clamp(p - k.xxx, 0.0, 1.0), c.y);
      }
      
      #define PI radians(180.0)
      
      void main() {
        float down = floor(sqrt(vertexCount));
        float across = floor(vertexCount / down);
        
        float x = mod(vertexId, across);
        float y = floor(vertexId / across);
        
        float u = x / (across - 1.0);
        float v = y / (across - 1.0);
        
        float su = abs(u - 0.5) * 2.0;
        float sv = abs(v - 0.5) * 2.0;
        
        float au = abs(atan(su, sv)) / PI;
        float av = length(vec2(su, sv));
        
        float snd = texture2D(sound, vec2(av * 0.05, av * 0.05)).a;
        
        float ux = u * 2.0 - 1.0;
        float vy = sin(v * snd) * 2.5 - 1.;
        
        vec2 xy = vec2(ux, vy);
        
        gl_Position = vec4(xy, 0, 1);
        
        float soff = sin(snd * 1.2 + x * y);
        
        gl_PointSize = pow(snd + 0.1, 0.5) * 30.0 + soff;
        gl_PointSize *= 20.0 / across;
        gl_PointSize *= resolution.x / 1900.0;
        
        float hue = sin(u * 0.1) + snd * 0.2 + time * 0.1;
        float sat = mix(0.0, 1.0, snd);
        float val = mix(0.0, pow(snd + 2., 6.0), snd);
        v_color = vec4(hsv2rgb(vec3(hue, sat, val)), 1);
      }
      `,
};