import * as THREE from 'three';
import Stats from 'stats.js';
import { GUI } from 'dat.gui';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let scene, camera, renderer;

!(function init() {
  const container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(1, 2, -3);
  camera.lookAt(0, 1, 0);

  const clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(-3, 10, -10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  //

  const mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 100),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const loader = new GLTFLoader();
  loader.load('./soldier.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
      }
    });

    const skeleton = new THREE.SkeletonHelper(model);
    // skeleton.visible = false;
    scene.add(skeleton);

    createPanel();

    const animations = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const idleAction = mixer.clipAction(animations[0]);
    const walkAction = mixer.clipAction(animations[3]);
    const runAction = mixer.clipAction(animations[1]);

    const actions = [idleAction, walkAction, runAction];

    activateAllActions();

    animate();
  });
  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const stats = new Stats();
  container.appendChild(stats.dom);
})();

function createPanel() {}

function activateAllActions() {}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
