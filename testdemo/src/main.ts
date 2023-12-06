import { createCanvas, createProgram, fragment, getAttribLocation, getUniformLocation, vertex } from "./webgl";
import S from './test'

(() => {
  const canvas = createCanvas();
  document.body.appendChild(canvas);
  const gl = canvas.getContext('webgl2')!;
  if (!gl) {
    return;
  }

  const v = vertex;
  const f = fragment.replace('{USER_FRAGMENT}', S)

  const program = createProgram(gl, v, f);

  const a_pos = getAttribLocation(gl, program, 'a_position');
  a_pos.setFloat32(new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]))

  const iTime = getUniformLocation(gl, program, 'iTime');
  
})()