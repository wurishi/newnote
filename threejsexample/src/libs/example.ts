import * as THREE from 'three'

interface iControls {
  update: () => any
}

export interface iInitParams {
  container: Element
  ui: Element
}

export interface iInitDestroy {
  (): any
}

export default class Example {
  protected renderer!: THREE.WebGLRenderer
  protected clock = new THREE.Clock()

  private _mixer?: THREE.AnimationMixer
  protected set mixer(val) {
    this._mixer = val
  }
  protected get mixer() {
    return this._mixer
  }

  private _controls?: iControls
  protected set controls(val) {
    this._controls = val
  }
  protected get controls() {
    return this._controls
  }

  private _camera?: THREE.Camera
  protected set camera(val) {
    this._camera = val
  }
  protected get camera() {
    return this._camera
  }

  private _scene?: THREE.Scene
  protected set scene(val) {
    this._scene = val
  }
  protected get scene() {
    return this._scene
  }

  constructor() {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer = renderer
  }

  protected onResize = () => {
    if (this.camera) {
      if (this.camera instanceof THREE.PerspectiveCamera) {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
      }
    }

    this.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

  // protected init = (params: iInitParams): iInitDestroy | void => {}
  protected init(params: iInitParams): iInitDestroy | void {
    const { container } = params
    container?.appendChild(this.renderer?.domElement)
  }

  public startRun = (params: iInitParams) => {
    const d = this.init(params)
    window.addEventListener('resize', this.onResize)

    return () => {
      d?.call(this)
      window.removeEventListener('resize', this.onResize)
      this.renderer?.dispose()
      this.renderer?.domElement.parentElement?.removeChild(
        this.renderer?.domElement
      )
    }
  }

  public run = (): void => {
    const delta = this.clock.getDelta()

    this.mixer?.update(delta)
    this.controls?.update()

    if (this.scene && this.camera) {
      this.renderer?.render(this.scene, this.camera)
    }
  }

  public utils = {
    /**
     * 创建一个近大远小的相机
     * @param cameraP.fov 45
     * @param cameraP.aspect window.innerWidth / window.innerHeight
     * @param cameraP.near 1
     * @param cameraP.far 100
     * @returns
     */
    createPerspectiveCamera(
      cameraParam?: {
        fov?: number
        aspect?: number
        near?: number
        far?: number
      } | null,
      cameraPos?: Array<number> | null,
      cameraLook?: Array<number> | null
    ) {
      const {
        fov = 45,
        aspect = window.innerWidth / window.innerHeight,
        near = 1,
        far = 100,
      } = cameraParam || {}
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      if (cameraPos) {
        const [x = 0, y = 0, z = 0] = cameraPos || {}
        camera.position.set(x, y, z)
      }
      if (cameraLook) {
        const [x = 0, y = 0, z = 0] = cameraLook || {}
        camera.lookAt(x, y, z)
      }
      return camera
    },

    /**
     * 
     * @param background 0xa0a0a0
     * @param fog.color 0xa0a0a0
     * @param fog.near 10
     * @param fog.far 50
     * @param fog2.hex 0xffffff
     * @param fog2.density undefined
     * @returns 
     */
    createScene(
      background?: THREE.ColorRepresentation | null,
      fog?: iFog | null,
      fog2?: iFog2 | null
    ) {
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(background || 0xa0a0a0)
      if (fog) {
        const [color = 0xa0a0a0, near = 10, far = 50] = fog
        // console.log(color, near, far)
        scene.fog = new THREE.Fog(color, near, far)
      }
      if (fog2) {
        const [hex = 0xffffff, density] = fog2
        // console.log(hex, density)
        scene.fog = new THREE.FogExp2(hex, density)
      }
      return scene
    },
  }
}

type iFog = Array<any> & {
  [0]?: THREE.ColorRepresentation
  [1]?: number
  [2]?: number
}

type iFog2 = Array<any> & {
  [0]?: string | number
  [1]?: number
}
