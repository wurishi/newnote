import * as THREE from 'three';
import Example, { iInitDestroy, iInitParams } from '@/libs/example';

export default class E_Blending extends Example {
  protected override init(params: iInitParams): void | iInitDestroy {
    super.init(params);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(1, 2, -3);
    camera.lookAt(0, 1, 0);
    this.camera = camera;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
    this.scene = scene;

    const hemLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemLight.position.set(0, 20, 0);
    scene.add(hemLight);

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

    scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
  }
}
