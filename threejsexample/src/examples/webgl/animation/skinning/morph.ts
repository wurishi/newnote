import Example, { iInitDestroy, iInitParams } from '@/libs/example'
import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class E_Morph extends Example {
  private model?: THREE.Group
  private actions: Record<string, THREE.AnimationAction> = {}

  protected init(params: iInitParams): void | iInitDestroy {
    super.init(params)

    const camera = this.utils.createPerspectiveCamera(
      { near: 0.25 },
      [-5, 3, 10],
      [0, 2, 0]
    )
    this.camera = camera

    const scene = this.utils.createScene(0xe0e0e0, [0xe0e0e0, 20, 100])
    this.scene = scene

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(0, 20, 10)
    scene.add(dirLight)

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )
    mesh.rotation.x = -Math.PI / 2
    scene.add(mesh)

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
    const gm = grid.material as THREE.Material
    gm.opacity = 0.2
    gm.transparent = true
    scene.add(grid)

    let destroy: () => void
    const loader = new GLTFLoader()
    loader.load('assets/models/gltf/RobotExpressive.glb', (gltf) => {
      const model = gltf.scene
      scene.add(model)
      this.model = model

      destroy = this.createGUI(params.ui, gltf.animations)
    })

    return () => {
      destroy && destroy()
    }
  }

  private createGUI(root: Element, animations: THREE.AnimationClip[]) {
    const states = [
      'Idle',
      'Walking',
      'Running',
      'Dance',
      'Death',
      'Sitting',
      'Standing',
    ]
    const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']

    const gui = new GUI()
    root.appendChild(gui.domElement.parentElement!)

    const mixer = new THREE.AnimationMixer(this.model!)
    this.mixer = mixer

    const actions = this.actions
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip)

      actions[clip.name] = action

      if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
        action.clampWhenFinished = true
        action.loop = THREE.LoopOnce
      }
    })

    const api: Record<string, any> = {
      state: 'Walking',
    }
    const statesFolder = gui.addFolder('States')
    const clipCtrl = statesFolder.add(api, 'state').options(states)
    clipCtrl.onChange(() => {
      this.fadeToAction(api.state, 0.5)
    })
    statesFolder.open()

    const emoteFolder = gui.addFolder('Emotes')
    const restoreState = () => {
      this.mixer?.removeEventListener('finished', restoreState)

      this.fadeToAction(api.state, 0.2)
    }
    emotes.forEach((name) => {
      api[name] = () => {
        this.fadeToAction(name, 0.2)
        this.mixer?.addEventListener('finished', restoreState)
      }

      emoteFolder.add(api, name)
    })
    emoteFolder.open()

    const face = this.model?.getObjectByName('Head_4')! as THREE.Mesh

    const expressions = Object.keys(face.morphTargetDictionary!)
    const expressionFolder = gui.addFolder('Expressions')

    expressions.forEach((name, i) => {
      expressionFolder
        .add(face.morphTargetInfluences!, i.toString(), 0, 1, 0.01)
        .name(name)
    })

    this.activeAction = actions['Walking']
    this.activeAction.play()

    expressionFolder.open()

    return () => {
      gui.destroy()
    }
  }

  private previousAction?: THREE.AnimationAction
  private activeAction?: THREE.AnimationAction

  private fadeToAction = (name: string, duration: number) => {
    this.previousAction = this.activeAction
    this.activeAction = this.actions[name]

    if (this.previousAction !== this.activeAction) {
      this.previousAction?.fadeOut(duration)
    }

    this.activeAction
      ?.reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play()
  }
}
