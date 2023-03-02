import Example, { iInitParams } from '@/libs/example'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

export default class E_Multiple extends Example {
  private mixers: THREE.AnimationMixer[] = []

  protected init(params: iInitParams) {
    super.init(params)

    const camera = this.utils.createPerspectiveCamera(
      { far: 1000 },
      [2, 3, -6],
      [0, 1, 0]
    )
    this.camera = camera

    const scene = this.utils.createScene(null, [undefined, undefined, 50])
    this.scene = scene

    scene.add(this.utils.createHemisphereLight())

    const dirLight = this.utils.createDirectionalLight(
      null,
      [-3, 10, -10],
      [4, -4, -4, 4, 0.1, 40]
    )
    scene.add(dirLight)

    scene.add(new THREE.CameraHelper(dirLight.shadow.camera))

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshPhongMaterial({
        color: 0x999999,
        depthWrite: false,
      })
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    scene.add(mesh)

    this.renderer.shadowMap.enabled = true

    const loader = new GLTFLoader()
    loader.load('assets/models/gltf/Soldier.glb', (gltf) => {
      gltf.scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.isMesh) {
          object.castShadow = true
        }
      })

      const model1 = SkeletonUtils.clone(gltf.scene)
      const model2 = SkeletonUtils.clone(model1)
      const model3 = SkeletonUtils.clone(model1)

      const mixer1 = new THREE.AnimationMixer(model1)
      const mixer2 = new THREE.AnimationMixer(model2)
      const mixer3 = new THREE.AnimationMixer(model3)

      mixer1.clipAction(gltf.animations[0]).play() // idle
      mixer2.clipAction(gltf.animations[1]).play() // run
      mixer3.clipAction(gltf.animations[3]).play() // walk

      model1.position.x = -2
      model2.position.x = 0
      model3.position.x = 2

      scene.add(model1, model2, model3)

      this.mixers.push(mixer1, mixer2, mixer3)
    })
  }

  public run() {
    const delta = super.run()
    this.mixers.forEach((mixer) => mixer.update(delta))
    return delta
  }
}
