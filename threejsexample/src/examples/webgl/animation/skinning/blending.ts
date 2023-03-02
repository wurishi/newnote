import * as THREE from 'three'
import Example, { iInitDestroy, iInitParams } from '@/libs/example'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI, GUIController } from 'dat.gui'

export default class E_Blending extends Example {
  private model?: THREE.Group
  private skeleton?: THREE.SkeletonHelper
  private actions?: THREE.AnimationAction[]
  private idleAction?: THREE.AnimationAction
  private walkAction?: THREE.AnimationAction
  private runAction?: THREE.AnimationAction
  private poseAction?: THREE.AnimationAction
  private start = false

  protected init(params: iInitParams): void | iInitDestroy {
    super.init(params)

    const camera = this.utils.createPerspectiveCamera(
      { far: 1000 },
      [1, 2, -3],
      [0, 1, 0]
    )
    this.camera = camera

    const scene = this.utils.createScene(null, [])
    this.scene = scene

    const hemLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemLight.position.set(0, 20, 0)
    scene.add(hemLight)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(-3, 10, -10)
    dirLight.castShadow = true
    dirLight.shadow.camera.top = 2
    dirLight.shadow.camera.bottom = -2
    dirLight.shadow.camera.left = -2
    dirLight.shadow.camera.right = 2
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 40
    scene.add(dirLight)

    this.renderer.shadowMap.enabled = true

    // scene.add(new THREE.CameraHelper(dirLight.shadow.camera))

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({
        color: 0x999999,
        depthWrite: false,
      })
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    scene.add(mesh)

    let panelDestroy: () => void

    const loader = new GLTFLoader()
    loader.load('assets/models/gltf/Soldier.glb', (gltf) => {
      const model = gltf.scene
      this.model = model
      scene.add(model)

      model.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh?.isMesh) {
          mesh.castShadow = true
        }
      })

      const skeleton = new THREE.SkeletonHelper(model)
      this.skeleton = skeleton
      skeleton.visible = false
      scene.add(skeleton)

      panelDestroy = this.createPanel(params.ui)

      const animations = gltf.animations
      const mixer = new THREE.AnimationMixer(model)
      this.mixer = mixer

      const idleAction = mixer.clipAction(animations[0])
      this.idleAction = idleAction
      const runAction = mixer.clipAction(animations[1])
      this.runAction = runAction
      const poseAction = mixer.clipAction(animations[2])
      this.poseAction = poseAction
      const walkAction = mixer.clipAction(animations[3])
      this.walkAction = walkAction

      this.actions = [idleAction, walkAction, runAction]

      this.activateAllActions()

      this.start = true
    })
    return () => {
      this.start = false
      panelDestroy && panelDestroy()
    }
  }

  private settings: Record<string, any> = {
    'show model': true,
    'show skeleton': false,

    'modify step size': 0.05,

    'use default duration': true,
    'set custom duration': 3.5,

    'modify idle weight': 0.0,
    'modify walk weight': 1.0,
    'modify run weight': 0.0,
    'modify time scale': 1.0,
  }

  private singleStepMode = false
  private sizeOfNextStep = 0
  private crossFadeControls: GUIController[] = []

  private createPanel = (root: Element) => {
    const panel = new GUI({ width: 310, name: 'blending' })
    root.appendChild(panel.domElement.parentElement!)

    const folder1 = panel.addFolder('Visibility')

    folder1.add(this.settings, 'show model').onChange((v) => {
      this.model && (this.model.visible = v)
    })
    folder1
      .add(this.settings, 'show skeleton')
      .onChange((v) => this.skeleton && (this.skeleton.visible = v))
    folder1.open()

    this.settings['activate all'] = this.activateAllActions
    this.settings['deactivate all'] = this.deactivateAllActions

    const folder2 = panel.addFolder('Activation/Deactivation')
    folder2.add(this.settings, 'deactivate all')
    folder2.add(this.settings, 'activate all')
    folder2.open()

    this.settings['pause/continue'] = this.pauseContinue
    this.settings['make single step'] = this.toSingleStepMode
    const folder3 = panel.addFolder('Pausing/Stepping')
    folder3.add(this.settings, 'pause/continue')
    folder3.add(this.settings, 'make single step')
    folder3.add(this.settings, 'modify step size', 0.01, 0.1, 0.001)
    folder3.open()

    this.settings['from walk to idle'] = () =>
      this.prepareCrossFade(this.walkAction!, this.idleAction!, 1.0)
    this.settings['from idle to walk'] = () =>
      this.prepareCrossFade(this.idleAction!, this.walkAction!, 0.5)
    this.settings['from walk to run'] = () =>
      this.prepareCrossFade(this.walkAction!, this.runAction!, 2.5)
    this.settings['from run to walk'] = () =>
      this.prepareCrossFade(this.runAction!, this.walkAction!, 5.0)
    const folder4 = panel.addFolder('Crossfading')
    this.crossFadeControls.push(folder4.add(this.settings, 'from walk to idle'))
    this.crossFadeControls.push(folder4.add(this.settings, 'from idle to walk'))
    this.crossFadeControls.push(folder4.add(this.settings, 'from walk to run'))
    this.crossFadeControls.push(folder4.add(this.settings, 'from run to walk'))
    folder4.add(this.settings, 'use default duration')
    folder4.add(this.settings, 'set custom duration', 0, 10, 0.01)
    folder4.open()

    const folder5 = panel.addFolder('Blend Weights')
    folder5
      .add(this.settings, 'modify idle weight', 0.0, 1.0, 0.01)
      .listen()
      .onChange((weight) => {
        this.setWeight(this.idleAction!, weight)
      })
    folder5
      .add(this.settings, 'modify walk weight', 0.0, 1.0, 0.01)
      .listen()
      .onChange((weight) => {
        this.setWeight(this.walkAction!, weight)
      })
    folder5
      .add(this.settings, 'modify run weight', 0.0, 1.0, 0.01)
      .listen()
      .onChange((weight) => {
        this.setWeight(this.runAction!, weight)
      })
    folder5.open()

    const folder6 = panel.addFolder('General Speed')
    folder6
      .add(this.settings, 'modify time scale', 0.0, 1.5, 0.01)
      .onChange((speed) => {
        this.mixer!.timeScale = speed
      })
    folder6.open()

    return () => {
      panel.destroy()
    }
  }

  private activateAllActions = () => {
    this.setWeight(this.idleAction!, this.settings['modify idle weight'])
    this.setWeight(this.walkAction!, this.settings['modify walk weight'])
    this.setWeight(this.runAction!, this.settings['modify run weight'])

    this.actions?.forEach((action) => {
      action.play()
    })
  }

  private deactivateAllActions = () => {
    this.actions?.forEach((action) => {
      action.stop()
    })
  }

  private setWeight = (action: THREE.AnimationAction, weight: number) => {
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(weight)
  }

  private pauseContinue = () => {
    if (this.singleStepMode) {
      this.singleStepMode = false
      this.unPauseAllActions()
    } else {
      if (this.idleAction?.paused) {
        this.unPauseAllActions()
      } else {
        this.pauseAllActions()
      }
    }
  }

  private unPauseAllActions = () => {
    this.actions?.forEach((action) => (action.paused = false))
  }

  private pauseAllActions = () => {
    this.actions?.forEach((action) => (action.paused = true))
  }

  private toSingleStepMode = () => {
    this.unPauseAllActions()

    this.singleStepMode = true
    this.sizeOfNextStep = this.settings['modify step size']
  }

  private prepareCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    defaultDuration: number
  ) => {
    const duration = this.setCrossFadeDuration(defaultDuration)

    this.singleStepMode = false
    this.unPauseAllActions()

    if (startAction === this.idleAction) {
      this.executeCrossFade(startAction, endAction, duration)
    } else {
      this.synchronizeCrossFade(startAction, endAction, duration)
    }
  }

  private setCrossFadeDuration = (defaultDuration: number) => {
    if (this.settings['use default duration']) {
      return defaultDuration
    } else {
      return Number(this.settings['set custom duration'])
    }
  }

  private executeCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number
  ) => {
    this.setWeight(endAction, 1)
    endAction.time = 1

    startAction.crossFadeTo(endAction, duration, true)
  }

  private synchronizeCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number
  ) => {
    const onLoopFinished = (event: any) => {
      if (event.action === startAction) {
        this.mixer?.removeEventListener('loop', onLoopFinished)
        this.executeCrossFade(startAction, endAction, duration)
      }
    }
    this.mixer?.addEventListener('loop', onLoopFinished)
  }

  private idleWeight = 0
  private walkWeight = 0
  private runWeight = 0

  public run() {
    if (!this.start) {
      return 0
    }
    this.idleWeight = this.idleAction?.getEffectiveWeight()!
    this.walkWeight = this.walkAction?.getEffectiveWeight()!
    this.runWeight = this.runAction?.getEffectiveWeight()!

    this.updateWeightSliders()
    this.updateCrossFadeControls()

    let mixerUpdateDelta = this.clock.getDelta()

    if (this.singleStepMode) {
      mixerUpdateDelta = this.sizeOfNextStep
      this.sizeOfNextStep = 0
    }

    this.mixer?.update(mixerUpdateDelta)
    this.controls?.update()

    if (this.scene && this.camera) {
      this.renderer?.render(this.scene, this.camera)
    }

    return mixerUpdateDelta
  }

  private updateWeightSliders = () => {
    this.settings['modify idle weight'] = this.idleWeight
    this.settings['modify walk weight'] = this.walkWeight
    this.settings['modify run weight'] = this.runWeight
  }

  private updateCrossFadeControls = () => {
    if (
      this.idleWeight === 1 &&
      this.walkWeight === 0 &&
      this.runWeight === 0
    ) {
      // crossFadeControls
      // d, e, d, d
    }

    if (
      this.idleWeight === 0 &&
      this.walkWeight === 1 &&
      this.runWeight === 0
    ) {
      // e, d, e, d
    }

    if (
      this.idleWeight === 0 &&
      this.walkWeight === 0 &&
      this.runWeight === 1
    ) {
      // d, d, d, e
    }
  }
}
