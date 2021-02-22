import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { Demo } from './constant';
import BoxGeometry from './boxgeometry';
import CircleGeometry from './circlegeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ConeGeometry from './conegeometry';
import CylinderGeometry from './cylindergeometry';
import DodecahedronGeometry from './dodecahedrongeometry';
import ExtrudeGeometry from './extrudegeometry';
import ExtrudeGeometryOutline from './extrudegeometryoutline';
import IcosahedronGeometry from './icosahedrongeometry';
import LatheGeometry from './lathegeometry';

const style = document.createElement('style');
document.head.appendChild(style);
(style.sheet as any).insertRule('html body {' + 'margin:0;' + '}');

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.domElement.style.width = window.innerWidth + 'px';
renderer.domElement.style.height = window.innerHeight + 'px';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 2000);
camera.position.set(0, 0, 20);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const ignoreArr: THREE.Object3D[] = [];

const light = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(light);
light.position.set(0, 10, 0);
ignoreArr.push(light);

function render() {
  requestAnimationFrame(render);

  if (
    renderer.domElement.width != window.innerWidth ||
    renderer.domElement.height != window.innerHeight
  ) {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
}
requestAnimationFrame(render);

const gui = new GUI();
const demo: any = {
  盒子: BoxGeometry,
  平面圆: CircleGeometry,
  锥形: ConeGeometry,
  圆柱: CylinderGeometry,
  十二面体: DodecahedronGeometry,
  受挤压体: ExtrudeGeometry,
  受挤压体Outline: ExtrudeGeometryOutline,
  二十面体: IcosahedronGeometry,
  旋转线体: LatheGeometry,
};
const api: any = {
  demo: '',
};
gui.add(api, 'demo', Object.keys(demo)).onChange((val) => {
  f && gui.removeFolder(f);
  f = null;
  const Class = demo[val];
  if (Class) {
    for (let i = scene.children.length - 1; i >= 0; i--) {
      if (ignoreArr.indexOf(scene.children[i]) < 0) {
        scene.remove(scene.children[i]);
      }
    }
    const demo: Demo = new Class();
    f = gui.addFolder('Params');
    demo.main(scene);
    const demoAPI = demo.getAPI();
    const keys = Object.keys(demoAPI);
    keys.forEach((key) => {
      api[key] = demoAPI[key];
      f.add(api, key).onChange(() => {
        demo.update(api);
      });
    });
    f.open();
  }
});

let f = gui.addFolder('Params');
f.open();
