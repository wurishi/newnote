import { GUI } from 'dat.gui';
import * as Stats from 'stats.js';
import { iSub, fragment, vertex, PRECISION_MEDIUMP } from './libs';
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

const mainFolder = gui.addFolder('主菜单');
const api: any = {
  menu: '',
  run: true,
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
      const name = `(${sort}) ${sub.name()}`;
      menuList.push({ name, sort });
      menuMap[name] = sub;
    }
  }
});
menuList.sort((a, b) => a.sort - b.sort);
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

mainFolder.open();

function destoryPrev() {
  uuid = -1;
  if (canvas) {
    canvas.removeEventListener('mousemove', mouseMove);
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
    },
  });

  threeMesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), shaderMaterial);
  threeScene.add(threeMesh);

  threeSM = shaderMaterial;
}

let mouseX = 0;
let mouseY = 0;

function mouseMove(e: MouseEvent) {
  // mouseX = e.clientX / canvas.clientWidth;
  // mouseY = e.clientY / canvas.clientHeight;
}

function activeSub(name: string) {
  uuid = Date.now();
  const sub = menuMap[name] as iSub;
  _sub = sub;

  const key = sub.key();
  if (key) {
    link.href = 'https://www.shadertoy.com/view/' + key;
    link.textContent = key;
  } else {
    link.href = '';
    link.textContent = '无';
  }

  canvas = sub.main();
  document.body.appendChild(canvas);
  canvas.addEventListener('mousemove', mouseMove);

  gl = canvas.getContext('webgl');

  let _uuid = uuid;

  if (!gl) return;

  initTHREE();

  let f = fragment.replace(
    '{PRECISION}',
    sub.fragmentPrecision ? sub.fragmentPrecision() : PRECISION_MEDIUMP
  );
  f = f.replace('{USER_FRAGMENT}', sub.userFragment());

  const program = webglUtils.createProgram2(gl, vertex, f);

  const a_position = webglUtils.getAttribLocation(gl, program, 'a_position');
  a_position.setFloat32(
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
  );

  const iResolution = webglUtils.getUniformLocation(gl, program, 'iResolution');
  const iTime = webglUtils.getUniformLocation(gl, program, 'iTime');
  const iMouse = webglUtils.getUniformLocation(gl, program, 'iMouse');

  let fn = sub.initial ? sub.initial(gl, program) : null;

  addThreeBox(f);

  requestAnimationFrame(render);

  let then = 0;
  let time = 0;
  function render(now: number) {
    if (_uuid !== uuid) {
      return;
    }

    now *= 0.001;
    const elapsedTime = Math.min(now - then, 0.1);
    then = now;

    if (api.run) {
      time += elapsedTime;

      webglUtils.resizeCanvasToDisplaySize(canvas);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      a_position.bindBuffer();

      iResolution.uniform3f(canvas.width, canvas.height, 1);
      iTime.uniform1f(time);
      iMouse.uniform4fv([mouseX, mouseY, 0, 0]);

      fn && fn();

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      threeSM && (threeSM.uniforms.iTime.value = time);

      threeRenderer.render(threeScene, threeCamera);
    }

    stats.update();
    requestAnimationFrame(render);
  }
}
