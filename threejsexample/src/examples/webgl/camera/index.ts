import Example, { iInitParams } from '@/libs/example'
import { GUI } from 'dat.gui'
import * as THREE from 'three'

export default class E_Camera extends Example {
  private cameraPerspective?: THREE.PerspectiveCamera
  private cameraPerspectiveHelper?: THREE.CameraHelper
  private cameraOrtho?: THREE.OrthographicCamera
  private cameraOrthoHelper?: THREE.CameraHelper

  private activeCamera?: THREE.Camera
  private activeHelper?: THREE.CameraHelper

  private cameraRig?: THREE.Group
  private mesh?: THREE.Mesh

  protected init(params: iInitParams) {
    super.init(params)

    this.SCREEN_WIDTH = window.innerWidth
    this.SCREEN_HEIGHT = window.innerHeight
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT
    const frustumSize = 600

    const scene = new THREE.Scene()
    this.scene = scene

    const camera = this.utils.createPerspectiveCamera(
      { fov: 50, aspect: 0.5 * this.aspect, far: 10000 },
      [0, 0, 2500]
    )
    this.camera = camera

    const cameraPerspective = this.utils.createPerspectiveCamera({
      fov: 50,
      aspect: 0.5 * this.aspect,
      near: 150,
      far: 1000,
    })
    this.cameraPerspective = cameraPerspective

    const cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective)
    this.cameraPerspectiveHelper = cameraPerspectiveHelper
    scene.add(cameraPerspectiveHelper)

    const cameraOrtho = new THREE.OrthographicCamera(
      (0.5 * frustumSize * this.aspect) / -2,
      (0.5 * frustumSize * this.aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      150,
      1000
    )
    this.cameraOrtho = cameraOrtho
    const cameraOrthoHelper = new THREE.CameraHelper(cameraOrtho)
    this.cameraOrthoHelper = cameraOrthoHelper
    scene.add(cameraOrthoHelper)

    this.activeCamera = cameraPerspective
    this.activeHelper = cameraPerspectiveHelper

    cameraOrtho.rotation.y = Math.PI
    cameraPerspective.rotation.y = Math.PI

    const cameraRig = new THREE.Group()
    this.cameraRig = cameraRig
    cameraRig.add(cameraPerspective, cameraOrtho)

    scene.add(cameraRig)

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(100, 16, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      })
    )
    this.mesh = mesh
    scene.add(mesh)

    const mesh2 = new THREE.Mesh(
      new THREE.SphereGeometry(50, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    )
    mesh2.position.y = 150
    mesh.add(mesh2)

    const mesh3 = new THREE.Mesh(
      new THREE.SphereGeometry(5, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
    )
    mesh3.position.z = 150
    cameraRig.add(mesh3)

    const geometry = new THREE.BufferGeometry()
    const vertices = []

    for (let i = 0; i < 10000; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(2000))
      vertices.push(THREE.MathUtils.randFloatSpread(2000))
      vertices.push(THREE.MathUtils.randFloatSpread(2000))
    }
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )

    const particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color: 0x888888 })
    )
    scene.add(particles)

    this.renderer.autoClear = false

    const gui = new GUI()
    const cfg = {
      type: 'Perspective',
    }
    gui
      .add(cfg, 'type', ['Perspective', 'Ortho'])
      .name('当前摄像机')
      .onChange((type) => {
        if (type === 'Perspective') {
          this.activeCamera = this.cameraPerspective
          this.activeHelper = this.cameraPerspectiveHelper
        } else {
          this.activeCamera = this.cameraOrtho
          this.activeHelper = this.cameraOrthoHelper
        }
      })

    return () => {
      gui.destroy()
    }
  }

  private SCREEN_WIDTH: number = 0
  private SCREEN_HEIGHT: number = 0
  private aspect: number = 1.0

  protected onResize = () => {
    this.SCREEN_WIDTH = window.innerWidth
    this.SCREEN_HEIGHT = window.innerHeight
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT

    this.renderer?.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT)

    if (this.camera && this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = 0.5 * this.aspect
      this.camera.updateProjectionMatrix()
    }

    if (this.cameraPerspective) {
      this.cameraPerspective.aspect = 0.5 * this.aspect
      this.cameraPerspective.updateProjectionMatrix()
    }

    if (this.cameraOrtho) {
      const frustumSize = 600
      this.cameraOrtho.left = (-0.5 * frustumSize * this.aspect) / 2
      this.cameraOrtho.right = (0.5 * frustumSize * this.aspect) / 2
      this.cameraOrtho.top = frustumSize / 2
      this.cameraOrtho.bottom = -frustumSize / 2
      this.cameraOrtho.updateProjectionMatrix()
    }
  }

  public run() {
    const r = Date.now() * 0.0005

    if (this.mesh) {
      this.mesh.position.set(
        700 * Math.cos(r),
        700 * Math.sin(r),
        700 * Math.sin(r)
      )

      this.mesh.children[0].position.x = 70 * Math.cos(2 * r)
      this.mesh.children[0].position.z = 70 * Math.sin(r)
    }

    if (this.activeCamera) {
      if (this.activeCamera === this.cameraPerspective) {
        this.cameraPerspective!.fov = 35 + 50 * Math.sin(0.5 * r)
        this.cameraPerspective!.far = this.mesh?.position.length() || 0
        this.cameraPerspective!.updateProjectionMatrix()

        this.cameraPerspectiveHelper!.update()
        this.cameraPerspectiveHelper!.visible = true

        this.cameraOrthoHelper!.visible = false
      } else if (this.activeCamera === this.cameraOrtho) {
        this.cameraOrtho!.far = this.mesh?.position.length() || 0
        this.cameraOrtho!.updateProjectionMatrix()

        this.cameraOrthoHelper!.update()
        this.cameraOrthoHelper!.visible = true

        this.cameraPerspectiveHelper!.visible = false
      }
    }

    this.cameraRig?.lookAt(this.mesh?.position || new THREE.Vector3())

    this.renderer.clear()

    this.activeHelper!.visible = false

    this.renderer.setViewport(0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT)
    if (this.scene && this.activeCamera) {
      this.renderer.render(this.scene!, this.activeCamera!)
    }

    this.activeHelper!.visible = true

    this.renderer.setViewport(
      this.SCREEN_WIDTH / 2,
      0,
      this.SCREEN_WIDTH / 2,
      this.SCREEN_HEIGHT
    )
    if (this.scene && this.camera) {
      this.renderer.render(this.scene!, this.camera!)
    }

    return r
  }
}
