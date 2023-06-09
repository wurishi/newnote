export default {
    name: 'unnamed',
    mode: WebGLRenderingContext.POINTS,
    num: 15000,
    bg: 0x8e9c92,
    text: `
    void main() {
        float aspect = resolution.x / resolution.y;
        float phi = vertexId * .3;
        float radius = fract(vertexId / (10. + sin(time * .01 + phi * .1))) * .6;
        phi += radius * 5.;
        radius += (sin(phi * 5.) * .5 + .5) * .1;
        float tau = acos(-1.) * 2.;
        phi += clamp(fract(time * 80. / 60.) * 3., 0., 1.) * tau / 5.;
        radius += .5 * radius * texture2D(sound, vec2(abs(fract(phi / tau - .25) - .5) * .25, 0.)).r;
        gl_PointSize = mix(1., 3., fract(phi * .1));
        vec3 pos = vec3(radius * cos(phi), radius * sin(phi), 0.);
        pos.x /= aspect;
        gl_Position = vec4(pos, 1);
        vec3 color = vec3(0);
        v_color = vec4(color, 1.);
      
      }`,
};
