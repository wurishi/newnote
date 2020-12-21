import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from 'babylonjs';

export default function () {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  const engine = new Engine(canvas);

  const scene = new Scene(engine);
  const camera = new ArcRotateCamera(
    'camera',
    -Math.PI,
    Math.PI / 2.5,
    3,
    new Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  const box = MeshBuilder.CreateBox('box', {}, scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
}
