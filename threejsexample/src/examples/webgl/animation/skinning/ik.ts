import Example, { iInitDestroy, iInitParams } from '@/libs/example'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import DracoUrl from 'three/examples/jsm/libs/draco/gltf/draco_decoder.js?url'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import {
  CCDIKHelper,
  CCDIKSolver,
  IKS,
} from 'three/examples/jsm/animation/CCDIKSolver'
import { GUI } from 'dat.gui'

export default class E_Ik extends Example {
  private OOI: Record<string, THREE.Object3D> = {}
  private transformControls?: TransformControls

  private ikSolver?: CCDIKSolver
  private iks: IKS[] = []

  private start = false
  private mirrorSphereCamera?: THREE.CubeCamera

  protected init(params: iInitParams): void | iInitDestroy {
    super.init(params)

    const scene = this.utils.createScene(0xdddddd, null, [0xffffff, 0.17])
    this.scene = scene

    const camera = this.utils.createPerspectiveCamera(
      {
        fov: 55,
        near: 0.001,
        far: 5000,
      },
      [0.9728517749133652, 1.1044765132727201, 0.7316689528482836],
      scene.position.toArray()
    )
    this.camera = camera

    const ambientLight = new THREE.AmbientLight(0xffffff, 8)
    scene.add(ambientLight)

    this.renderer.physicallyCorrectLights = true

    const orbitControls = new OrbitControls(camera, this.renderer.domElement)
    this.controls = orbitControls
    orbitControls.minDistance = 0.2
    orbitControls.maxDistance = 1.5
    orbitControls.enableDamping = true

    const tMouseDown = () => (orbitControls.enabled = false)
    const tMouseUp = () => (orbitControls.enabled = true)

    let destroy: () => void

    this.initGLTF().then((gltf) => {
      scene.add(gltf.scene)

      orbitControls.target.copy(this.OOI.sphere.position)
      this.OOI.hand_l.attach(this.OOI.sphere)

      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024)
      const mirrorSphereCamera = new THREE.CubeCamera(
        0.05,
        50,
        cubeRenderTarget
      )
      this.mirrorSphereCamera = mirrorSphereCamera
      scene.add(mirrorSphereCamera)
      const mirrorSphereMaterial = new THREE.MeshBasicMaterial({
        envMap: cubeRenderTarget.texture,
      })
      ;(this.OOI.sphere as THREE.Mesh).material = mirrorSphereMaterial

      const transformControls = new TransformControls(
        camera,
        this.renderer.domElement
      )
      this.transformControls = transformControls
      transformControls.size = 0.75
      transformControls.showX = false
      transformControls.space = 'world'
      transformControls.attach(this.OOI.target_hand_l)
      scene.add(transformControls)
      transformControls.addEventListener('mouseDown', tMouseDown)
      transformControls.addEventListener('mouseUp', tMouseUp)

      this.OOI.kira.add((this.OOI.kira as THREE.SkinnedMesh).skeleton.bones[0])

      this.iks.push({
        target: 22, // 'target_hand_l
        effector: 6, // hand_l
        links: [
          {
            index: 5, // 'lowerarm_l
            rotationMin: new THREE.Vector3(1.2, -1.8, -0.4),
            rotationMax: new THREE.Vector3(1.7, -1.1, 0.3),
          },
          {
            index: 4, // "Upperarm_l"
            rotationMin: new THREE.Vector3(0.1, -0.7, -1.8),
            rotationMax: new THREE.Vector3(1.1, 0, -1.4),
          },
        ],
      } as any)
      const ikSolver = new CCDIKSolver(
        this.OOI.kira as THREE.SkinnedMesh,
        this.iks
      )
      this.ikSolver = ikSolver
      const ccdikhelper = new CCDIKHelper(
        this.OOI.kira as THREE.SkinnedMesh,
        this.iks,
        0.01
      )
      scene.add(ccdikhelper)

      destroy = this.createGUI(params.ui)

      this.start = true
    })

    return () => {
      this.transformControls?.removeEventListener('mouseDown', tMouseDown)
      this.transformControls?.removeEventListener('mouseUp', tMouseUp)

      destroy && destroy()
    }
  }

  private conf = {
    followSphere: false,
    turnHead: true,
    ik_solver: true,
  }

  private createGUI = (root: Element) => {
    const gui = new GUI()
    root.appendChild(gui.domElement.parentElement!)

    const conf = this.conf
    gui.add(conf, 'followSphere').name('follow sphere')
    gui.add(conf, 'turnHead').name('turn head')
    gui.add(conf, 'ik_solver').name('IK auto update')
    gui.add(this.ikSolver!, 'update').name('IK manual update()')
    gui.open()

    return () => {
      gui.destroy()
    }
  }

  private initGLTF = async () => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(
      DracoUrl.substring(0, DracoUrl.lastIndexOf('/') + 1)
    )
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    const gltf = await gltfLoader.loadAsync('assets/models/gltf/kira.glb')
    const OOI = this.OOI
    gltf.scene.traverse((n) => {
      if (n.name === 'head') OOI.head = n
      if (n.name === 'lowerarm_l') OOI.lowerarm_l = n
      if (n.name === 'Upperarm_l') OOI.Upperarm_l = n
      if (n.name === 'hand_l') OOI.hand_l = n
      if (n.name === 'target_hand_l') OOI.target_hand_l = n
      if (n.name === 'boule') OOI.sphere = n
      if (n.name === 'Kira_Shirt_left') OOI.kira = n
      if (n instanceof THREE.Mesh && n.isMesh) n.frustumCulled = false
    })
    return gltf
  }

  private v0 = new THREE.Vector3()

  public run() {
    if (!this.start) {
      return 0
    }

    if (this.mirrorSphereCamera) {
      this.OOI.sphere.visible = false
      this.OOI.sphere.getWorldPosition(this.mirrorSphereCamera.position)
      this.mirrorSphereCamera.update(this.renderer, this.scene!)
      this.OOI.sphere.visible = true
    }

    if (this.conf.followSphere) {
      this.OOI.sphere.getWorldPosition(this.v0)
      ;(this.controls as OrbitControls).target.lerp(this.v0, 0.1)
    }

    if (this.conf.turnHead) {
      this.OOI.sphere.getWorldPosition(this.v0)
      this.OOI.head.lookAt(this.v0)
      this.OOI.head.rotation.set(
        this.OOI.head.rotation.x,
        this.OOI.head.rotation.y + Math.PI,
        this.OOI.head.rotation.z
      )
    }

    if (this.conf.ik_solver) {
      this.ikSolver?.update()
    }

    this.controls?.update()
    this.renderer.render(this.scene!, this.camera!)

    return 0
  }
}
