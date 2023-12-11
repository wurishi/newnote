import { fragment, vertex } from "./webgl";
import S from './test'
import WebGLCanvas from "./lib/WebGLCanvas";

(() => {
  let webGL = new WebGLCanvas();
  document.body.appendChild(webGL.canvas);

  const v = vertex;
  const f = fragment.replace('{USER_FRAGMENT}', S);

  webGL.createProgram(v, f);
  const uiCount = webGL.getUniformLocation('count');

  let then = 0, time = 0, frame = 0;
  const render = (now: number) => {
    now *= 0.001;
    const elapsedTime = Math.min(now - then, 0.1);
    then = now;
    frame++;
    time += elapsedTime;
    uiCount.uniform1i(1)
    webGL.resizeCanvasToDisplaySize()
    webGL.render({
      time, frame
    });
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})()