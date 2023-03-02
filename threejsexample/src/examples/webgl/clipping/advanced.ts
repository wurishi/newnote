import Example, { iInitParams } from '@/libs/example'
import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const planeToMatrix = (function () {
  const xAxis = new THREE.Vector3(),
    yAxis = new THREE.Vector3(),
    trans = new THREE.Vector3()

  return function planeToMatrix(plane: THREE.Plane) {
    const zAxis = plane.normal,
      matrix = new THREE.Matrix4()

    if (Math.abs(zAxis.x) > Math.abs(zAxis.z)) {
      yAxis.set(-zAxis.y, zAxis.x, 0)
    } else {
      yAxis.set(0, -zAxis.z, zAxis.y)
    }

    xAxis.crossVectors(yAxis.normalize(), zAxis)

    plane.coplanarPoint(trans)

    return matrix.set(
      xAxis.x,
      yAxis.x,
      zAxis.x,
      trans.x,
      //
      xAxis.y,
      yAxis.y,
      zAxis.y,
      trans.y,
      //
      xAxis.z,
      yAxis.z,
      zAxis.z,
      trans.z,
      //
      0,
      0,
      0,
      1
    )
  }
})()

const Vertices = [
  new THREE.Vector3(+1, 0, +Math.SQRT1_2),
  new THREE.Vector3(-1, 0, +Math.SQRT1_2),
  new THREE.Vector3(0, +1, -Math.SQRT1_2),
  new THREE.Vector3(0, -1, -Math.SQRT1_2),
]
const Indices = [0, 1, 2, 0, 2, 3, 0, 3, 1, 1, 3, 2]

const Planes = planesFromMesh(Vertices, Indices)

const PlaneMatrices = Planes.map(planeToMatrix)

const GlobalClippingPlanes = cylindricalPlanes(5, 2.5)

const Empty = Object.freeze([])

//--------

function assignTransformedPlanes(
  planesOut: THREE.Plane[],
  planesIn: THREE.Plane[],
  matrix: THREE.Matrix4
) {
  for (let i = 0, n = planesIn.length; i < n; i++) {
    planesOut[i].copy(planesIn[i]).applyMatrix4(matrix)
  }
}

function setObjectWorldMatrix(
  scene: THREE.Scene,
  object: THREE.Object3D,
  matrix: THREE.Matrix4
) {
  const parent = object.parent!
  scene.updateMatrixWorld()
  object.matrix.copy(parent.matrixWorld).invert()
  object.applyMatrix4(matrix)
}

function planesFromMesh(vertices: THREE.Vector3[], indices: number[]) {
  const n = indices.length / 3
  const result = new Array<THREE.Plane>(n)

  for (let i = 0, j = 0; i < n; i++, j += 3) {
    const a = vertices[indices[j]],
      b = vertices[indices[j + 1]],
      c = vertices[indices[j + 2]]

    result[i] = new THREE.Plane().setFromCoplanarPoints(a, b, c)
  }
  return result
}

function createPlanes(n: number) {
  const result = new Array<THREE.Plane>(n)
  for (let i = 0; i < n; i++) {
    result[i] = new THREE.Plane()
  }
  return result
}

function cylindricalPlanes(n: number, innerRadius: number) {
  const result = createPlanes(n)

  for (let i = 0; i < n; i++) {
    const plane = result[i],
      angle = (i * Math.PI * 2) / n

    plane.normal.set(Math.cos(angle), 0, Math.sign(angle))
    plane.constant = innerRadius
  }

  return result
}

// -------

export default class extends Example {
  private clipMaterial?: THREE.MeshPhongMaterial

  protected init(p: iInitParams) {
    super.init(p)

    const camera = this.utils.createPerspectiveCamera(
      { fov: 36, near: 0.25, far: 16 },
      [0, 1.5, 3]
    )
    this.camera = camera

    const scene = new THREE.Scene()
    this.scene = scene

    scene.add(new THREE.AmbientLight(0xffffff, 0.3))

    const spotLight = this.utils.createSpotLight(
      {
        intensity: 0.5,
        angle: Math.PI / 5,
        penumbra: 0.2,
      },
      [2, 3, 3],
      { near: 3, far: 10, size: 1024 }
    )
    scene.add(spotLight)

    const dirLight = this.utils.createDirectionalLight(
      0xffffff,
      [0, 2, 0],
      [1, -1, -1, 1, 1, 10]
    )
    dirLight.intensity = 0.5
    dirLight.shadow.mapSize.set(1024, 1024)
    scene.add(dirLight)

    const clippingPlanes = createPlanes(Planes.length)
    const clipMaterial = new THREE.MeshPhongMaterial({
      color: 0xee0a10,
      shininess: 100,
      side: THREE.DoubleSide,
      clippingPlanes,
      clipShadows: true,
    })
    this.clipMaterial = clipMaterial

    const object = new THREE.Group()

    const geometry = new THREE.BoxGeometry(0.18, 0.18, 0.18)

    for (let z = -2; z <= 2; z++) {
      for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
          const mesh = new THREE.Mesh(geometry, clipMaterial)
          mesh.position.set(x / 5, y / 5, z / 5)
          mesh.castShadow = true
          object.add(mesh)
        }
      }
    }
    scene.add(object)
    this.object = object

    const planeGeometry = new THREE.PlaneGeometry(3, 3, 1, 1)
    const color = new THREE.Color()

    const volumeVisualization = new THREE.Group()
    volumeVisualization.visible = false
    this.volumeVisualization = volumeVisualization

    for (let i = 0, n = Planes.length; i < n; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: color.setHSL(i / n, 0.5, 0.5).getHex(),
        side: THREE.DoubleSide,
        opacity: 0.2,
        transparent: true,

        clippingPlanes: clippingPlanes.filter((_, j) => j !== i),
      })

      const mesh = new THREE.Mesh(planeGeometry, material)
      mesh.matrixAutoUpdate = false
      volumeVisualization.add(mesh)
    }

    scene.add(volumeVisualization)

    const ground = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 10 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.scale.multiplyScalar(3)
    ground.receiveShadow = true
    scene.add(ground)

    this.renderer.shadowMap.enabled = true

    const globalClippingPlanes = createPlanes(GlobalClippingPlanes.length)
    this.globalClippingPlanes = globalClippingPlanes
    this.renderer.localClippingEnabled = true
    this.renderer.clippingPlanes = Empty as any

    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.minDistance = 1
    controls.maxDistance = 8
    controls.target.set(0, 1, 0)
    controls.update()

    const gui = new GUI()
    const renderer = this.renderer!
    const folder = gui.addFolder('Local Clipping')
    const props = {
      get Enabled() {
        return renderer.localClippingEnabled
      },
      set Enabled(v) {
        renderer.localClippingEnabled = v
        if (!v) {
          volumeVisualization.visible = false
        }
      },
      get Shadows() {
        return clipMaterial.clipShadows
      },
      set Shadows(v) {
        clipMaterial.clipShadows = v
      },
      get Visualize() {
        return volumeVisualization.visible
      },
      set Visualize(v) {
        if (renderer.localClippingEnabled) {
          volumeVisualization.visible = v
        }
      },
    }
    folder.add(props, 'Enabled')
    folder.add(props, 'Shadows')
    folder.add(props, 'Visualize').listen()
    folder.open()

    const globalFolder = gui.addFolder('Global Clipping')
    globalFolder.add(
      {
        get Enabled() {
          return renderer.clippingPlanes !== (Empty as any)
        },
        set Enabled(v) {
          renderer.clippingPlanes = v ? globalClippingPlanes : (Empty as any)
        },
      },
      'Enabled'
    )
    globalFolder.open()

    return () => {
      gui.destroy()
    }
  }

  private object?: THREE.Group
  private transform = new THREE.Matrix4()
  private tmpMatrix = new THREE.Matrix4()
  private volumeVisualization?: THREE.Group
  private globalClippingPlanes?: THREE.Plane[]

  public run() {
    const delta = super.run()
    const time = this.clock.getElapsedTime()

    if (this.object) {
      this.object.position.y = 1
      // this.object.rotation.set(time * 0.5, time * 0.2, this.object.rotation.z)
      this.object.rotation.x = time * 0.5
      this.object.rotation.y = time * 0.2

      this.object.updateMatrix()

      this.transform.copy(this.object.matrix)

      const bouncy = Math.cos(time * 0.5) * 0.5 + 0.7
      this.transform.multiply(this.tmpMatrix.makeScale(bouncy, bouncy, bouncy))

      assignTransformedPlanes(
        this.clipMaterial!.clippingPlanes,
        Planes,
        this.transform
      )

      const planeMeshes = this.volumeVisualization!.children

      planeMeshes.forEach((mesh, i) => {
        this.tmpMatrix.multiplyMatrices(this.transform, PlaneMatrices[i])
        setObjectWorldMatrix(this.scene!, mesh, this.tmpMatrix)
      })

      this.transform.makeRotationY(time * 0.1)

      assignTransformedPlanes(
        this.globalClippingPlanes!,
        GlobalClippingPlanes,
        this.transform
      )
    }

    return delta
  }
}
