import Example, { iInitParams } from '@/libs/example'
import * as THREE from 'three'

export default class extends Example {
  private AMOUNT = 6

  private ASPECT_RATIO = 1.0
  private WIDTH = 0
  private HEIGHT = 0
  private mesh?: THREE.Mesh

  protected init(params: iInitParams) {
    super.init(params)

    this.ASPECT_RATIO = window.innerWidth / window.innerHeight

    this.WIDTH = (window.innerWidth / this.AMOUNT) * window.devicePixelRatio
    this.HEIGHT = (window.innerHeight / this.AMOUNT) * window.devicePixelRatio

    const cameras = []

    for (let y = 0; y < this.AMOUNT; y++) {
      for (let x = 0; x < this.AMOUNT; x++) {
        const subcamera = new THREE.PerspectiveCamera(
          40,
          this.ASPECT_RATIO,
          0.1,
          10
        )
        ;(subcamera as any).viewport = new THREE.Vector4(
          Math.floor(x * this.WIDTH),
          Math.floor(y * this.HEIGHT),
          Math.ceil(this.WIDTH),
          Math.ceil(this.HEIGHT)
        )
        subcamera.position.set(
          x / this.AMOUNT - 0.5,
          0.5 - y / this.AMOUNT,
          1.5
        )
        subcamera.position.multiplyScalar(2)
        subcamera.lookAt(0, 0, 0)
        subcamera.updateMatrixWorld()
        cameras.push(subcamera)
      }
    }

    const camera = new THREE.ArrayCamera(cameras)
    camera.position.z = 3
    this.camera = camera

    const scene = new THREE.Scene()
    this.scene = scene

    scene.add(new THREE.AmbientLight(0x222244))

    const light = this.utils.createDirectionalLight(0xffffff, [0.5, 0.5, 1])
    light.castShadow = true
    light.shadow.camera.zoom = 4
    scene.add(light)

    const geometryBackground = new THREE.PlaneGeometry(100, 100)
    const materialBackground = new THREE.MeshPhongMaterial({ color: 0x000066 })

    const background = new THREE.Mesh(geometryBackground, materialBackground)
    background.receiveShadow = true
    background.position.set(0, 0, -1)
    scene.add(background)

    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    )
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)
    this.mesh = mesh

    this.renderer.shadowMap.enabled = true
  }

  protected onResize = () => {
    this.ASPECT_RATIO = window.innerWidth / window.innerHeight

    this.WIDTH = (window.innerWidth / this.AMOUNT) * window.devicePixelRatio
    this.HEIGHT = (window.innerHeight / this.AMOUNT) * window.devicePixelRatio

    if (this.camera instanceof THREE.ArrayCamera) {
      this.camera.aspect = this.ASPECT_RATIO
      this.camera.updateProjectionMatrix()

      for (let y = 0; y < this.AMOUNT; y++) {
        for (let x = 0; x < this.AMOUNT; x++) {
          const subcamera = this.camera.cameras[this.AMOUNT * y + x]

          ;(subcamera as any).viewport.set(
            Math.floor(x * this.WIDTH),
            Math.floor(y * this.HEIGHT),
            Math.ceil(this.WIDTH),
            Math.ceil(this.HEIGHT)
          )

          subcamera.aspect = this.ASPECT_RATIO
          subcamera.updateProjectionMatrix()
        }
      }
    }

    this.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

  public run() {
    if (this.mesh) {
      this.mesh.rotation.x += 0.005
      this.mesh.rotation.z += 0.01
    }
    const delta = super.run()
    return delta
  }
}
