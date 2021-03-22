import { GUI } from 'dat.gui';
import * as Stats from 'stats.js';
import {
  iSub,
  fragment,
  vertex,
  PRECISION_MEDIUMP,
  WEBGL_1,
  WEBGL_2,
  vertex2,
  fragment2,
} from './libs';
import * as webglUtils from './webgl-utils';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const context = (require as any).context('./subs', false, /.ts$/);
const keys = context.keys();

const gui = new GUI();
gui.domElement.style.marginTop = '50px';
const stats = new Stats();
stats.dom.style.left = '';
stats.dom.style.right = '0';
document.body.appendChild(stats.dom);

const link = document.createElement('a');
document.body.appendChild(link);
link.href = 'https://www.shadertoy.com';
link.textContent = 'SHADERTOY';
document.body.appendChild(document.createElement('br'));
const filelink = document.createElement('span');
document.body.appendChild(filelink);
document.body.appendChild(document.createElement('hr'));

const mainFolder = gui.addFolder('主菜单');
const api: any = {
  menu: '',
  run: true,
  localIndex: window.localStorage.getItem('localIndex')
    ? parseInt(window.localStorage.getItem('localIndex'))
    : 0,
};

const menuList: { name: string; sort: number }[] = [];
const menuMap: any = {};

let uuid: number = -1;
let _sub: iSub = null;
let canvas: HTMLCanvasElement = null;
let gl: WebGLRenderingContext = null;

keys.forEach((key: string) => {
  const Cls = context(key).default;
  const sub: iSub = new Cls();
  if (sub.name) {
    if (sub.ignore && sub.ignore()) {
    } else {
      const sort = sub.sort ? sub.sort() : Number.MAX_SAFE_INTEGER;
      const name = `(${
        sort == Number.MAX_SAFE_INTEGER ? '失败' : sort
      }) ${sub.name()}`;
      menuList.push({ name, sort });
      menuMap[name] = sub;
    }
  }
});
menuList.sort((a, b) => a.sort - b.sort);
api.menu = menuList[api.localIndex].name;
destoryPrev();
activeSub(api.menu);

mainFolder
  .add(
    api,
    'menu',
    menuList.map((v) => v.name)
  )
  .onChange((name) => {
    destoryPrev();
    activeSub(name);
  });

mainFolder.add(api, 'run');
mainFolder.add(api, 'localIndex', 0, menuList.length, 1).onChange((v) => {
  window.localStorage.setItem('localIndex', v);
});

mainFolder.open();

function destoryPrev() {
  uuid = -1;
  if (canvas) {
    canvas.removeEventListener('mousemove', mouseMove);
    canvas.removeEventListener('mousedown', mouseDown);
    canvas.removeEventListener('mouseup', mouseUp);
    document.body.removeChild(canvas);
    canvas = null;
  }
  if (_sub) {
    _sub.destory();
    _sub = null;
  }
  gl = null;
}

let threeRenderer: THREE.WebGLRenderer;
let threeScene: THREE.Scene;
let threeCamera: THREE.PerspectiveCamera;
let threeMesh: THREE.Mesh;
let threeSM: THREE.ShaderMaterial;

function initTHREE() {
  if (!threeRenderer) {
    threeRenderer = new THREE.WebGLRenderer({ antialias: true });
    threeRenderer.setPixelRatio(400 / 300);
    threeRenderer.setSize(400, 300);

    threeScene = new THREE.Scene();

    threeCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 10000);
    threeCamera.position.z = -100;

    const controls = new OrbitControls(threeCamera, threeRenderer.domElement);
    controls.update();

    // const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    // light.position.set(0, 20, 0);
    // threeScene.add(light);
  }
  threeRenderer.domElement.parentElement &&
    document.body.removeChild(threeRenderer.domElement);
  document.body.appendChild(threeRenderer.domElement);
}

function addThreeBox(fragment: string): void {
  threeMesh && threeScene.remove(threeMesh);

  const shaderMaterial = new THREE.ShaderMaterial({
    fragmentShader: fragment,
    uniforms: {
      iResolution: { value: [400, 300, 1] },
      iTime: { value: 0 },
      iMouse: { value: [mouseX, mouseY, clickX, clickY] },
      iFrameRate: { value: 30 },
      iFrame: { value: 0 },
    },
  });

  threeMesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), shaderMaterial);
  threeScene.add(threeMesh);

  threeSM = shaderMaterial;
}

let mouseX = 0;
let mouseY = 0;
let clickX = 0;
let clickY = 0;

function mouseMove(e: MouseEvent) {
  // mouseX = e.clientX > 400 ? 400 : e.clientX;
  // mouseY = e.clientY > 300 ? 300 : e.clientY;
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function mouseDown(e: MouseEvent) {
  if (e.button == 0) {
    clickX = e.clientX;
    clickY = e.clientY;
  }
}

function mouseUp() {
  clickX = 0;
  clickY = 0;
}

async function activeSub(name: string) {
  uuid = Date.now();
  const sub = menuMap[name] as iSub;
  _sub = sub;

  const key = sub.key();
  if (key) {
    link.href = 'https://www.shadertoy.com/view/' + key;
    link.textContent = `${key} (${
      sub.webgl ? sub.webgl() : WEBGL_1
    }) shader 字符: ${sub.userFragment().length}`;
    filelink.textContent = key + '|';
  } else {
    link.href = '';
    link.textContent = '无';
    filelink.textContent = '';
  }

  canvas = sub.main();
  document.body.appendChild(canvas);
  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mousedown', mouseDown);
  canvas.addEventListener('mouseup', mouseUp);

  const webglV = sub.webgl ? sub.webgl() : WEBGL_1;

  gl = canvas.getContext(webglV) as WebGLRenderingContext;
  console.log(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));

  let _uuid = uuid;

  if (!gl) return;

  initTHREE();

  const v = webglV === WEBGL_2 ? vertex2 : vertex;

  let f = webglV === WEBGL_2 ? fragment2 : fragment;
  f = f.replace(
    '{PRECISION}',
    sub.fragmentPrecision ? sub.fragmentPrecision() : PRECISION_MEDIUMP
  );
  f = f.replace('{USER_FRAGMENT}', sub.userFragment());
  console.log(f);

  const program = webglUtils.createProgram2(gl, v, f);

  const a_position = webglUtils.getAttribLocation(gl, program, 'a_position');
  a_position.setFloat32(
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
  );

  const iResolution = webglUtils.getUniformLocation(gl, program, 'iResolution');
  const iTime = webglUtils.getUniformLocation(gl, program, 'iTime');
  const iMouse = webglUtils.getUniformLocation(gl, program, 'iMouse');
  const iFrameRate = webglUtils.getUniformLocation(gl, program, 'iFrameRate');
  const iFrame = webglUtils.getUniformLocation(gl, program, 'iFrame');

  const channelList = await createChannelList(gl, program, sub);

  let fn = sub.initial ? sub.initial(gl, program) : null;

  addThreeBox(f);

  requestAnimationFrame(render);

  let then = 0;
  let time = 0;
  let iframe = 0;
  function render(now: number) {
    if (_uuid !== uuid) {
      return;
    }

    now *= 0.001;
    const elapsedTime = Math.min(now - then, 0.1);
    then = now;
    iframe++;

    if (api.run) {
      time += elapsedTime;

      webglUtils.resizeCanvasToDisplaySize(canvas);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      a_position.bindBuffer();

      iResolution.uniform3f(canvas.width, canvas.height, 1);
      iTime.uniform1f(time);
      iMouse.uniform4fv([mouseX, mouseY, clickX, clickY]);
      iFrameRate.uniform1f(30);
      iFrame.uniform1i(iframe);

      channelList.forEach((fn) => fn());

      fn && fn();

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (threeSM) {
        threeSM.uniforms.iTime.value = time;
        threeSM.uniforms.iMouse.value = [mouseX, mouseY, clickX, clickY];
        threeSM.uniforms.iFrameRate.value = 30;
        threeSM.uniforms.iFrame.value = iframe;
      }

      threeRenderer.render(threeScene, threeCamera);
    }

    stats.update();
    requestAnimationFrame(render);
  }
}

async function createChannelList(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  sub: iSub
): Promise<any[]> {
  const res: any[] = [];
  if (sub.channels) {
    const channels = sub.channels();
    if (channels && channels.length > 0) {
      for (let i = 0; i < channels.length; i++) {
        const c = channels[i];
        if (c.type == 0) {
          const image = await createChannelFromImage(c.path);
          const tmp = webglUtils.getTexture(
            gl,
            program,
            'iChannel' + i,
            image,
            i
          );
          res.push(() => {
            tmp.bindTexture();
          });
        }
      }
    }
  }
  return res;
}

function createChannelFromImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      // gl.TEXTURE_2D
      resolve(image);
    };
  });
}
