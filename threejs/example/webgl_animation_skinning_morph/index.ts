import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Main {
  private container: HTMLElement;

  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private clock: THREE.Clock;
  private renderer: THREE.Renderer;

  private model: THREE.Group;

  private state: any;

  constructor() {
    this.init();
    this.animate();
  }

  private init(): void {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      1000
    );
    this.camera.position.set(-5, 3, 10);
    this.camera.lookAt(0, 2, 0);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe0e0e0);
    this.scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

    this.clock = new THREE.Clock();

    let light: THREE.Light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    this.scene.add(light);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    this.scene.add(light);

    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    this.scene.add(mesh);

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    (grid.material as THREE.Material).opacity = 0.2;
    (grid.material as THREE.Material).transparent = true;
    this.scene.add(grid);

    const loader = new GLTFLoader();
    loader.load('./robot.glb', (gltf) => {
      this.model = gltf.scene;
      this.scene.add(this.model);

      this.createGUI(this.model, gltf.animations);
    });

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(renderer.domElement);
    this.renderer = renderer;
  }

  private createGUI(
    model: THREE.Group,
    animations: THREE.AnimationClip[]
  ): void {}

  private animate = (): void => {
    const dt = this.clock.getDelta();

    requestAnimationFrame(this.animate);

    this.renderer.render(this.scene, this.camera);
  };
}

new Main();
