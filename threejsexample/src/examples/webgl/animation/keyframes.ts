import * as THREE from 'three'
import Example, { iInitParams } from '../../../libs/example'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class E_Keyframes extends Example {
  
  protected override init(params:iInitParams) {
    super.init(params)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbfe3dd)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 100)
    camera.position.set(5, 2, 8)

    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.target.set(0, 0.5, 0)
    controls.update()
    controls.enablePan = false
    controls.enableDamping = true

    this.scene = scene
    this.camera = camera
    this.controls = controls

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/assets/draco/gltf/')

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader)
    loader.load('/assets/models/gltf/LittlestTokyo.glb', gltf => {
      const model = gltf.scene
      model.position.set(1, 1, 0)
      model.scale.set(0.01, 0.01, 0.01)
      scene.add(model)

      const mixer = new THREE.AnimationMixer(model)
      this.mixer = mixer
      mixer.clipAction(gltf.animations[0]).play()

    },undefined,err => console.error(err))
  }
}
