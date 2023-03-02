import Example, { iInitParams } from '@/libs/example'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class extends Example {
  protected init(p: iInitParams) {
    super.init(p)

    const textureLoader = new THREE.TextureLoader()
    const decalDiffuse = textureLoader.load(
      'assets/textures/decals/decal-diffuse.png'
    )
    const decalNormal = textureLoader.load(
      'assets/textures/decals/decal-normal.jpg'
    )
    const decalMaterial = new THREE.MeshPhongMaterial({
      specular: 0x444444,
      map: decalDiffuse,
      normalMap: decalNormal,
      normalScale: new THREE.Vector2(1, 1),
      shininess: 30,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      wireframe: false,
    })

    const decals = new Array<THREE.Mesh>()
    const position = new THREE.Vector3()
    const orientation = new THREE.Euler()
    const size = new THREE.Vector3(10, 10, 10)

    const params = {
      minScale: 10,
      maxScale: 20,
      rotate: true,
      clear: () => {
        decals.forEach((d) => {
          this.scene?.remove(d)
        })
        decals.length = 0
      },
    }

    const scene = new THREE.Scene()
    this.scene = scene

    const camera = this.utils.createPerspectiveCamera({ far: 1000 }, [
      0,
      0,
      120,
    ])
    this.camera = camera

    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.minDistance = 50
    controls.maxDistance = 200
    this.controls = controls

    scene.add(new THREE.AmbientLight(0x443333))

    const dirLight1 = this.utils.createDirectionalLight(0xffddcc, [
      1,
      0.75,
      0.5,
    ])
    scene.add(dirLight1)
    const dirLight2 = this.utils.createDirectionalLight(0xccccff, [
      -1,
      0.75,
      -0.5,
    ])
    scene.add(dirLight2)

    const geometry = new THREE.BufferGeometry()
    geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()])

    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial())
    scene.add(line)

    loadLeePerrySmith(scene).then((mesh) => {
      this.mesh = mesh
    })

    const mouseHelper = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 10),
      new THREE.MeshNormalMaterial()
    )
    mouseHelper.visible = false
    scene.add(mouseHelper)
    this.mouseHelper = mouseHelper

    let moved = false

    const onControlChange = () => {
      moved = true
    }
    controls.addEventListener('change', onControlChange)

    const onWindowPointerdown = () => {
      moved = false
    }
    const onWindowPointerup = (event: PointerEvent) => {
      if (!moved) {
        this.checkIntersection(event.clientX, event.clientY)
      }
    }
    const onWindowPointerMove = () => {}
    window.addEventListener('pointerdown', onWindowPointerdown)
    return () => {
      controls.removeEventListener('change', onControlChange)
      window.removeEventListener('pointerdown', onWindowPointerdown)
    }
  }

  private intersection = {
    intersects: false,
    point: new THREE.Vector3(),
    normal: new THREE.Vector3()
  }
  private mesh?: THREE.Mesh
  private mouse = new THREE.Vector2()
  private raycaster = new THREE.Raycaster()
  private intersects = new Array<THREE.Intersection<THREE.Object3D>>()
  private mouseHelper?: THREE.Mesh

  checkIntersection = (x: number, y: number) => {
    if (!this.mesh || !this.camera) {
      return
    }
    const mouse = this.mouse
    mouse.x = (x / window.innerWidth) * 2 - 1
    mouse.y = -(y / window.innerHeight) * 2 + 1

    const raycaster = this.raycaster
    raycaster.setFromCamera(mouse, this.camera)
    raycaster.intersectObject(this.mesh, false, this.intersects)

    if (this.intersects.length > 0) {
      const inter = this.intersects[0]
      const p = inter.point
      this.mouseHelper?.position.copy(p)
      this.intersection.point.copy(p)

      const n = inter.face!.normal.clone()
      n.transformDirection(this.mesh.matrixWorld)
      n.multiplyScalar(10)
      n.add(inter.point)

      this.intersection.normal.copy(inter.face!.normal)
      this.mouseHelper?.lookAt(n)

      // const positions = 
    }
  }
}

function loadLeePerrySmith(scene: THREE.Scene) {
  return new Promise<THREE.Mesh>((resolve) => {
    const textureLoader = new THREE.TextureLoader()
    const loader = new GLTFLoader()
    const path = 'assets/models/gltf/LeePerrySmith/'
    loader.load(`${path}LeePerrySmith.glb`, (gltf) => {
      const mesh = gltf.scene.children[0] as THREE.Mesh
      mesh.material = new THREE.MeshPhongMaterial({
        specular: 0x111111,
        map: textureLoader.load(`${path}Map-COL.jpg`),
        specularMap: textureLoader.load(`${path}Map-SPEC.jpg`),
        normalMap: textureLoader.load(
          `${path}Infinite-Level_02_Tangent_SmoothUV.jpg`
        ),
        shininess: 25,
      })
      scene.add(mesh)
      mesh.scale.set(10, 10, 10)
      resolve(mesh)
    })
  })
}
