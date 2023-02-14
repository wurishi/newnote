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
}
