import Example, { iInitDestroy, iInitParams } from '@/libs/example'
import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const params = {
  clipIntersection: true,
  planeConstant: 0,
  showHelpers: false,
}

const clipPlanes = [
  new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
]

export default class extends Example {
  protected init(p: iInitParams) {
    super.init(p)

    this.renderer.localClippingEnabled = true

    const scene = new THREE.Scene()
    this.scene = scene

    const camera = this.utils.createPerspectiveCamera(
      { fov: 40, near: 1, far: 200 },
      [-1.5, 2.5, 3.0]
    )
    this.camera = camera

    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.addEventListener('change', this.run)
    controls.minDistance = 1
    controls.maxDistance = 10
    controls.enablePan = false

    const light = this.utils.createHemisphereLight(
      {
        ground: 0x080808,
      },
      [-1.25, 1, 1.25]
    )
    light.intensity = 1.5
    scene.add(light)

    const group = new THREE.Group()
    for (let i = 1; i <= 30; i += 2) {
      const geometry = new THREE.SphereGeometry(i / 30, 48, 24)
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
        side: THREE.DoubleSide,
        clippingPlanes: clipPlanes,
        clipIntersection: params.clipIntersection,
      })
      group.add(new THREE.Mesh(geometry, material))
    }
    scene.add(group)

    const helpers = new THREE.Group()
    helpers.add(new THREE.PlaneHelper(clipPlanes[0], 2, 0xff0000))
    helpers.add(new THREE.PlaneHelper(clipPlanes[1], 2, 0x00ff00))
    helpers.add(new THREE.PlaneHelper(clipPlanes[2], 2, 0x0000ff))
    helpers.visible = false
    scene.add(helpers)

    const gui = new GUI()
    gui
      .add(params, 'clipIntersection')
      .name('clip intersection')
      .onChange((value) => {
        const children = group.children
        children.forEach((ch) => {
          ;((ch as THREE.Mesh)
            .material as THREE.MeshLambertMaterial).clipIntersection = value
        })
        this.run()
      })
    gui
      .add(params, 'planeConstant', -1, 1, 0.01)
      .name('plane constant')
      .onChange((value) => {
        clipPlanes.forEach((clip) => {
          clip.constant = value
        })
        this.run()
      })
    gui
      .add(params, 'showHelpers')
      .name('show helpers')
      .onChange((value) => {
        helpers.visible = value
        this.run()
      })

    return () => {
      controls.removeEventListener('change', this.run)
      gui.destroy()
    }
  }
}
