export default {
    name: 'mousebal',
    mode: WebGLRenderingContext.LINE_STRIP,
    num: 100000,
    bg:0xffffff,
    text: `
    void main() {
        float v=vertexId/30.0;
        int num=int(mouse.x*10.0+10.0);
        int den=int(exp(mouse.y*3.0+3.0));
        float frac=1.0-float(num)/float(den);
        vec2 xy=vec2(sin(v),cos(v)*sin(v*frac))/2.0;
        vec2 aspect = vec2(1, resolution.x / resolution.y);
        gl_Position = vec4(xy * aspect, 0, 1);
        v_color = vec4(0,0,0, 1);
      }`,
};