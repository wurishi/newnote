import Example, { iInitDestroy, iInitParams } from '@/libs/example'
import { includeStyleElement, removeStyleElement } from '@/libs/styles'
import { GUI, GUIController } from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface iUI {
  setInactive: () => void
  setActive: () => void
}

export default class E_Blending extends Example {
  private model?: THREE.Group
  private skeleton?: THREE.SkeletonHelper
  private numAnimations = 0
  private allActions: THREE.AnimationAction[] = []
  private baseActions: Record<
    string,
    { weight: number; action?: THREE.AnimationAction }
  > = {
    idle: { weight: 1 },
    walk: { weight: 0 },
    run: { weight: 0 },
  }
  private additiveActions: Record<
    string,
    { weight: number; action?: THREE.AnimationAction }
  > = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 },
  }
  private currentBaseAction = 'idle'

  protected init(params: iInitParams): void | iInitDestroy {
    super.init(params)

    const scene = this.utils.createScene(null, [])
    this.scene = scene

    this.renderer.shadowMap.enabled = true

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(3, 10, 10)
    dirLight.castShadow = true
    dirLight.shadow.camera.top = 2
    dirLight.shadow.camera.bottom = -2
    dirLight.shadow.camera.left = -2
    dirLight.shadow.camera.right = 2
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 40
    scene.add(dirLight)

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    scene.add(mesh)

    let uiDestroy: () => unknown

    const loader = new GLTFLoader()
    loader.load('assets/models/gltf/Xbot.glb', (gltf) => {
      const model = gltf.scene
      this.model = model
      scene.add(model)

      model.traverse((object) => {
        if (object instanceof THREE.Mesh && object.isMesh) {
          object.castShadow = true
        }
      })

      const skeleton = new THREE.SkeletonHelper(model)
      this.skeleton = skeleton
      skeleton.visible = false
      scene.add(skeleton)

      const animations = gltf.animations
      const mixer = new THREE.AnimationMixer(model)
      this.mixer = mixer

      this.numAnimations = animations.length

      for (let i = 0; i < this.numAnimations; i++) {
        let clip = animations[i]
        const name = clip.name
        if (this.baseActions[name]) {
          const action = mixer.clipAction(clip)
          this.activateAction(action)
          this.baseActions[name].action = action
          this.allActions.push(action)
        } else if (this.additiveActions[name]) {
          THREE.AnimationUtils.makeClipAdditive(clip)
          if (clip.name.endsWith('_pose')) {
            clip = THREE.AnimationUtils.subclip(clip, clip.name, 2, 3, 30)
          }

          const action = mixer.clipAction(clip)
          this.activateAction(action)
          this.additiveActions[name].action = action
          this.allActions.push(action)
        }
      }

      uiDestroy = this.createPanel(params.ui)
    })

    const camera = this.utils.createPerspectiveCamera(null, [-1, 2, 3])
    this.camera = camera

    const controls = new OrbitControls(camera, this.renderer.domElement)
    this.controls = controls
    controls.enablePan = false
    controls.enableZoom = false
    controls.target.set(0, 1, 0)
    controls.update()

    return () => {
      uiDestroy && uiDestroy()
    }
  }

  private panelSettings: Record<string, any> = {
    'modify time scale': 1.0,
  }
  private crossFadeControls: GUIController[] = []

  private createPanel = (root: Element) => {
    const panel = new GUI({ width: 310 })

    const folder1 = panel.addFolder('Base Actions')
    const folder2 = panel.addFolder('Additive Action Weights')
    const folder3 = panel.addFolder('General Speed')

    const baseNames = ['None', ...Object.keys(this.baseActions)]
    baseNames.forEach((name) => {
      const settings = this.baseActions[name]
      this.panelSettings[name] = () => {
        const currentSettings = this.baseActions[this.currentBaseAction]
        const currentAction = currentSettings ? currentSettings.action : null
        const action = settings ? settings.action : null

        if (currentAction !== action) {
          this.prepareCrossFade(currentAction!, action!, 0.35)
        }
      }

      this.crossFadeControls.push(folder1.add(this.panelSettings, name))
    })
    Object.keys(this.additiveActions).forEach((name) => {
      const settings = this.additiveActions[name]
      this.panelSettings[name] = settings.weight
      folder2
        .add(this.panelSettings, name, 0.0, 1.0, 0.01)
        .listen()
        .onChange((weight) => {
          this.setWeight(settings.action!, weight)
          settings.weight = weight
        })
    })
    folder3
      .add(this.panelSettings, 'modify time scale', 0.0, 1.5, 0.01)
      .onChange((speed) => {
        this.mixer && (this.mixer.timeScale = speed)
      })

    folder1.open()
    folder2.open()
    folder3.open()

    this.crossFadeControls.forEach((control) => {
      ;((control as any) as iUI).setInactive = () => {
        control.domElement.parentElement!.classList.add('control-inactive')
      }
      ;((control as any) as iUI).setActive = () => {
        control.domElement.parentElement!.classList.remove('control-inactive')
      }

      const settings = this.baseActions[control.property]
      if (!settings || !settings.weight) {
        ;((control as any) as iUI).setInactive()
      }
    })

    includeStyleElement(
      `
    .control-inactive {
      color: #888;
    }
    `,
      'blending'
    )

    return () => {
      panel.destroy()
      removeStyleElement('blending')
    }
  }

  private prepareCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number
  ) => {
    if (this.currentBaseAction === 'idle' || !startAction || !endAction) {
      this.executeCrossFade(startAction, endAction, duration)
    } else {
      this.synchronizeCrossFade(startAction, endAction, duration)
    }
    if (endAction) {
      const clip = endAction.getClip()
      this.currentBaseAction = clip.name
    } else {
      this.currentBaseAction = 'None'
    }
    this.crossFadeControls.forEach((control) => {
      const name = control.property
      if (name === this.currentBaseAction) {
        ;((control as any) as iUI).setActive()
      } else {
        ;((control as any) as iUI).setInactive()
      }
    })
  }

  private executeCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number
  ) => {
    if (endAction) {
      this.setWeight(endAction, 1)
      endAction.time = 0
      if (startAction) {
        startAction.crossFadeTo(endAction, duration, true)
      } else {
        endAction.fadeIn(duration)
      }
    } else {
      startAction.fadeOut(duration)
    }
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

  private activateAction = (action: THREE.AnimationAction) => {
    const clip = action.getClip()
    const settings =
      this.baseActions[clip.name] || this.additiveActions[clip.name]
    if (settings) {
      this.setWeight(action, settings.weight)
      action.play()
    }
  }

  private setWeight = (action: THREE.AnimationAction, weight: number) => {
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(weight)
  }
}
