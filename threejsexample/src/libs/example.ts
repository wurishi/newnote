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
      // if (this.camera instanceof THREE.PerspectiveCamera) {
      //   this.camera.aspect = window.innerWidth / window.innerHeight
      //   this.camera.updateProjectionMatrix()
      // }
      if ('aspect' in this.camera) {
        this.camera.aspect = window.innerWidth / window.innerHeight
      }
      if ('updateProjectionMatrix' in this.camera) {
        ;(this.camera as any).updateProjectionMatrix()
      }
    }

    this.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

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

  public run() {
    const delta = this.clock.getDelta()

    this.mixer?.update(delta)
    this.controls?.update()

    if (this.scene && this.camera) {
      this.renderer?.render(this.scene, this.camera)
    }

    return delta
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
      let bg = background
      if (bg === null || bg === undefined) {
        bg = 0xa0a0a0
      }
      scene.background = new THREE.Color(bg)
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
    /**
     *
     * @param lightColor ({sky: 0xffffff, ground: 0x444444})
     * @param lightPos [0, 20, 0]
     * @returns
     */
    createHemisphereLight(
      lightColor?: {
        sky?: THREE.ColorRepresentation
        ground?: THREE.ColorRepresentation
      },
      lightPos?: Array<number> | null
    ) {
      const { sky = 0xffffff, ground = 0x444444 } = lightColor || {}
      const hemiLight = new THREE.HemisphereLight(sky, ground)
      const [x = 0, y = 20, z = 0] = lightPos || []
      hemiLight.position.set(x, y, z)
      return hemiLight
    },
    /**
     *
     * @param lightColor 0xffffff
     * @param lightPos 0, 0, 0
     * @param shadowCamera top:0, bottom:0, left:0, right:0, near:0(0.1), far:0(2000)
     * @returns
     */
    createDirectionalLight(
      lightColor: THREE.ColorRepresentation | null = 0xffffff,
      lightPos?: Array<number> | null,
      shadowCamera?: Array<number> | null
    ) {
      const dirLight = new THREE.DirectionalLight(lightColor || 0xffffff)
      const [x = 0, y = 0, z = 0] = lightPos || []
      dirLight.position.set(x, y, z)
      if (shadowCamera) {
        dirLight.castShadow = true
        const [
          top = 0,
          bottom = 0,
          left = 0,
          right = 0,
          near = 0,
          far = 0,
        ] = shadowCamera
        dirLight.shadow.camera.top = top
        dirLight.shadow.camera.bottom = bottom
        dirLight.shadow.camera.left = left
        dirLight.shadow.camera.right = right
        dirLight.shadow.camera.near = near
        dirLight.shadow.camera.far = far
      }
      return dirLight
    },

    /**
     *
     * @param light.color 0xFFFFFF
     * @param light.intensity 1
     * @param light.angle ?Math.PI / 3
     * @param light.penumbra ?0
     * @param lightPos
     * @param shadowCamera.near 0.1
     * @param shadowCamera.far 2000
     * @param shadowCamera.size 512
     * @returns
     */
    createSpotLight(
      light: {
        color?: THREE.ColorRepresentation
        intensity?: number
        angle?: number
        penumbra?: number
      } | null,
      lightPos?: Array<number> | null,
      shadowCamera?: {
        near?: number
        far?: number
        size?: number
      } | null
    ) {
      const {
        color = 0xffffff,
        intensity = 1,
        angle = Math.PI / 3,
        penumbra = 0,
      } = light || {}
      const spotLight = new THREE.SpotLight(color, intensity)
      spotLight.angle = angle
      spotLight.penumbra = penumbra

      const [x = 0, y = 0, z = 0] = lightPos || []
      spotLight.position.set(x, y, z)

      if (shadowCamera) {
        const { near = 0.1, far = 2000, size = 512 } = shadowCamera
        spotLight.castShadow = true
        spotLight.shadow.camera.near = near
        spotLight.shadow.camera.far = far
        spotLight.shadow.mapSize.set(size, size)
      }
      return spotLight
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
