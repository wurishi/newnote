import { GUI } from 'dat.gui';
import * as Stats from 'stats.js';
import { fragment, iSub, vertex } from './lib';
import * as webglUtils from './webgl-utils';

const context = (require as any).context('./art', false, /.ts$/);
const keys = context.keys();

const gui = new GUI();
gui.domElement.style.marginTop = '50px';
const stats = new Stats();
stats.dom.style.left = '';
stats.dom.style.right = '0';
document.body.appendChild(stats.dom);

const artFolder = gui.addFolder('ART');
const api = {
  menu: '',
  count: 10000,
  bg: 0,
  type: WebGLRenderingContext.POINTS,
};
const menuList: { name: string; sort: number }[] = [];
const menuMap: any = {};
let arr: number[] = [];
for (let i = 0; i < api.count; i++) {
  arr.push(i);
}

keys.forEach((key: string) => {
  const Cls = context(key).default;
  const sub: iSub = new Cls();
  if (sub.name()) {
    const sort = sub.sort ? sub.sort() : Number.MIN_SAFE_INTEGER;
    const name = `(${sub.sort()}) ${sub.name()}`;
    menuList.push({ name, sort });
    menuMap[name] = sub;
  }
});
menuList.sort((a, b) => a.sort - b.sort);
api.menu = menuList[0].name;
activeSub(menuList[0].name);

artFolder
  .add(
    api,
    'menu',
    menuList.map((v) => v.name)
  )
  .onChange((name) => {
    destoryPrev();
    activeSub(name);
  });
const countList: number[] = [];
for (let i = 1000; i <= 100000; i += 1000) {
  countList.push(i);
}
artFolder.add(api, 'count', countList);
artFolder.addColor(api, 'bg').onChange((color) => {
  updateCanvasBG(color);
});
artFolder.add(api, 'type', {
  POINTS: WebGLRenderingContext.POINTS,
  LINE_STRIP: WebGLRenderingContext.LINE_STRIP,
  LINE_LOOP: WebGLRenderingContext.LINE_LOOP,
  LINES: WebGLRenderingContext.LINES,
  TRI_STRIP: WebGLRenderingContext.TRIANGLE_STRIP,
  TRI_FAN: WebGLRenderingContext.TRIANGLE_FAN,
  TRIANGLE: WebGLRenderingContext.TRIANGLE_FAN,
});

artFolder.open();

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let _sub: iSub;

function destoryPrev() {
  if (canvas) {
    document.body.removeChild(canvas);
    canvas = null;
  }
  if (_sub) {
    _sub = null;
  }
  gl = null;
}

async function activeSub(name: string) {
  const sub = menuMap[name] as iSub;
  _sub = sub;

  canvas = sub.main();
  document.body.appendChild(canvas);
  updateCanvasBG(api.bg);

  gl = canvas.getContext('webgl') as WebGLRenderingContext;

  let v = vertex;
  v = v.replace('{USER_VERTEX}', sub.userVertex());
  const f = fragment;
  const program = webglUtils.createProgram2(gl, v, f);

  const a_pos = webglUtils.getAttribLocation(gl, program, 'a_pos');
  console.log(arr.length);
  a_pos.setFloat32(new Float32Array(arr));

  const time = webglUtils.getUniformLocation(gl, program, 'time');
  const resolution = webglUtils.getUniformLocation(gl, program, 'resolution');
  const mouse = webglUtils.getUniformLocation(gl, program, 'mouse');
  const vertexCount = webglUtils.getUniformLocation(gl, program, 'vertexCount');

  requestAnimationFrame(render);

  function render(now: number) {
    if (canvas && gl) {
      webglUtils.resizeCanvasToDisplaySize(canvas);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      let update = false;
      if (arr.length > api.count) {
        arr.length = api.count;
        update = true;
      } else if (arr.length < api.count) {
        for (let i = api.count - arr.length; i < api.count; i++) {
          arr.push(i);
        }
        update = true;
      }
      if (update) {
        a_pos.updateBuffer(new Float32Array(arr));
      }
      a_pos.bindBuffer();

      time.uniform1f(now * 0.001);
      resolution.uniform2f(canvas.width, canvas.height);
      mouse.uniform2f(0.5, 0.5);
      vertexCount.uniform1f(api.count);

      gl.drawArrays(api.type, 0, api.count);
    }
    stats.update();
    requestAnimationFrame(render);
  }
}

function updateCanvasBG(c: number) {
  if (canvas) {
    const [r, g, b] = webglUtils.numberToRGBA(c);
    canvas.style.backgroundColor = `rgb(${r},${g},${b})`;
  }
}
