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
};
const menuList: { name: string; sort: number }[] = [];
const menuMap: any = {};

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

  const time = webglUtils.getUniformLocation(gl, program, 'time');
  const vertexId = webglUtils.getUniformLocation(gl, program, 'vertexId');
  const resolution = webglUtils.getUniformLocation(gl, program, 'resolution');
  const mouse = webglUtils.getUniformLocation(gl, program, 'mouse');

  requestAnimationFrame(render);

  function render(now: number) {
    if (canvas) {
      webglUtils.resizeCanvasToDisplaySize(canvas);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      time.uniform1f(now * 0.001);
      resolution.uniform2f(canvas.width, canvas.height);
      mouse.uniform2f(0.5, 0.5);
      for (let i = 0; i < api.count; i++) {
        vertexId.uniform1f(i);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
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
