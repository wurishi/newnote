import Example, { iInitParams } from '@/libs/example'
import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const params: any = {
  animate: true,
  planeX: {
    constant: 0,
    negated: false,
    displayHelper: false,
  },
  planeY: {
    constant: 0,
    negated: false,
    displayHelper: false,
  },
  planeZ: {
    constant: 0,
    negated: false,
    displayHelper: false,
  },
}

export default class extends Example {
  private object?: THREE.Object3D
  private planeObjects?: THREE.Mesh[]
  private planes?: THREE.Plane[]

  protected init(p: iInitParams) {
    super.init(p)

    const scene = new THREE.Scene()
    this.scene = scene

    const camera = this.utils.createPerspectiveCamera({ fov: 36 }, [2, 2, 2])
    this.camera = camera

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const dirLight = this.utils.createDirectionalLight(
      0xffffff,
      [5, 10, 7.5],
      [2, -2, -2, 2, 0.1, 2000]
    )
    dirLight.shadow.mapSize.set(1024, 1024)
    scene.add(dirLight)

    const planes = [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
    ]
    this.planes = planes
    const planeHelpers = planes.map(
      (p) =>
        new THREE.PlaneHelper(
          p,
          2,
          new THREE.Color().setHSL(Math.random(), 0.5, 0.5).getHex()
        )
    )
    planeHelpers.forEach((ph) => {
      ph.visible = false
      scene.add(ph)
    })

    const geometry = new THREE.TorusKnotGeometry(0.4, 0.15, 220, 60)
    const object = new THREE.Group()
    this.object = object
    scene.add(object)

    const planeObjects = new Array<THREE.Mesh>()
    this.planeObjects = planeObjects
    const planeGeom = new THREE.PlaneGeometry(4, 4)

    for (let i = 0; i < 3; i++) {
      const poGroup = new THREE.Group()
      const plane = planes[i]
      const stencilGroup = createPlaneStencilGroup(geometry, plane, i + 1)

      const planeMat = new THREE.MeshStandardMaterial({
        color: 0xe91e63,
        metalness: 0.1,
        roughness: 0.75,
        clippingPlanes: planes.filter((p) => p !== plane),

        stencilWrite: true,
        stencilRef: 0,
        stencilFunc: THREE.NotEqualStencilFunc,
        stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,
      })
      const po = new THREE.Mesh(planeGeom, planeMat)
      po.onAfterRender = (renderer) => {
        renderer.clearStencil()
      }
      po.renderOrder = i + 1.1

      object.add(stencilGroup)
      poGroup.add(po)
      planeObjects.push(po)
      scene.add(poGroup)
    }

    const material = new THREE.MeshStandardMaterial({
      color: 0xffc107,
      metalness: 0.1,
      roughness: 0.75,
      clippingPlanes: planes,
      clipShadows: true,
      shadowSide: THREE.DoubleSide,
    })

    const cilppedColorFront = new THREE.Mesh(geometry, material)
    cilppedColorFront.castShadow = true
    cilppedColorFront.renderOrder = 6
    object.add(cilppedColorFront)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9, 1, 1),
      new THREE.ShadowMaterial({
        color: 0x000000,
        opacity: 0.25,
        side: THREE.DoubleSide,
      })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1
    ground.receiveShadow = true
    scene.add(ground)

    this.renderer.shadowMap.enabled = true
    this.renderer.setClearColor(0x263238)
    this.renderer.localClippingEnabled = true

    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.minDistance = 2
    controls.maxDistance = 20
    controls.update()

    const gui = new GUI()
    gui.add(params, 'animate')
    ;['planeX', 'planeY', 'planeZ'].forEach((key, i) => {
      const folder = gui.addFolder(key)
      folder
        .add(params[key], 'displayHelper')
        .onChange((v) => (planeHelpers[i].visible = v))
      const d = folder
        .add(params[key], 'constant', -1, 1, 0.01)
        .onChange((d) => (planes[i].constant = d))
      folder.add(params[key], 'negated').onChange(() => {
        planes[i].negate()
        params[key].constant = planes[i].constant
        d.updateDisplay()
      })
      folder.open()
    })

    return () => {
      gui.destroy()
    }
  }

  public run() {
    const delta = super.run()

    if (params.animate) {
      if (this.object) {
        this.object.rotation.x += delta * 0.5
        this.object.rotation.y += delta * 0.2
      }
    }

    this.planeObjects?.forEach((po, i) => {
      const plane = this.planes![i]
      plane.coplanarPoint(po.position)
      po.lookAt(
        po.position.x - plane.normal.x,
        po.position.y - plane.normal.y,
        po.position.z - plane.normal.z
      )
    })

    return delta
  }
} // end class

function createPlaneStencilGroup(
  geometry: THREE.BufferGeometry,
  plane: THREE.Plane,
  renderOrder: number
) {
  const group = new THREE.Group()
  const baseMat = new THREE.MeshBasicMaterial()
  baseMat.depthWrite = false
  baseMat.depthTest = false
  baseMat.colorWrite = false
  baseMat.stencilWrite = true
  baseMat.stencilFunc = THREE.AlwaysStencilFunc

  const mat0 = baseMat.clone()
  mat0.side = THREE.BackSide
  mat0.clippingPlanes = [plane]
  mat0.stencilFail = THREE.IncrementWrapStencilOp
  mat0.stencilZFail = THREE.IncrementWrapStencilOp
  mat0.stencilZPass = THREE.IncrementWrapStencilOp

  const mesh0 = new THREE.Mesh(geometry, mat0)
  mesh0.renderOrder = renderOrder
  group.add(mesh0)

  const mat1 = baseMat.clone()
  mat1.side = THREE.FrontSide
  mat1.clippingPlanes = [plane]
  mat1.stencilFail = THREE.DecrementWrapStencilOp
  mat1.stencilZFail = THREE.DecrementWrapStencilOp
  mat1.stencilZPass = THREE.DecrementWrapStencilOp

  const mesh1 = new THREE.Mesh(geometry, mat1)
  mesh1.renderOrder = renderOrder

  group.add(mesh1)

  return group
}
