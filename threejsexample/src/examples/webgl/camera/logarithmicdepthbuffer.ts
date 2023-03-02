import Example, { iInitParams } from '@/libs/example'
import * as THREE from 'three'

import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { includeStyleElement, removeStyleElement } from '@/libs/styles'

interface iView {
  container: HTMLElement
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
}

const NEAR = 1e-6
const FAR = 1e27

const labeldata = [
  { size: 0.01, scale: 0.0001, label: 'microscopic (1µm)' }, // FIXME - triangulating text fails at this size, so we scale instead
  { size: 0.01, scale: 0.1, label: 'minuscule (1mm)' },
  { size: 0.01, scale: 1.0, label: 'tiny (1cm)' },
  { size: 1, scale: 1.0, label: 'child-sized (1m)' },
  { size: 10, scale: 1.0, label: 'tree-sized (10m)' },
  { size: 100, scale: 1.0, label: 'building-sized (100m)' },
  { size: 1000, scale: 1.0, label: 'medium (1km)' },
  { size: 10000, scale: 1.0, label: 'city-sized (10km)' },
  { size: 3400000, scale: 1.0, label: 'moon-sized (3,400 Km)' },
  { size: 12000000, scale: 1.0, label: 'planet-sized (12,000 km)' },
  { size: 1400000000, scale: 1.0, label: 'sun-sized (1,400,000 km)' },
  { size: 7.47e12, scale: 1.0, label: 'solar system-sized (50Au)' },
  { size: 9.4605284e15, scale: 1.0, label: 'gargantuan (1 light year)' },
  { size: 3.08567758e16, scale: 1.0, label: 'ludicrous (1 parsec)' },
  { size: 1e19, scale: 1.0, label: 'mind boggling (1000 light years)' },
]

export default class extends Example {
  private SCREEN_WIDTH = 0
  private SCREEN_HEIGHT = 0
  private screensplit = 0.25
  private screensplit_right = 0
  private object: Record<string, iView> = {}
  private border?: HTMLElement

  constructor() {
    super()
    ;(this.renderer as any) = null
  }

  protected init(params: iInitParams) {
    this.SCREEN_WIDTH = window.innerWidth
    this.SCREEN_HEIGHT = window.innerHeight

    const { container } = params
    includeStyleElement(
      `
      #app {
        display: flex;
        flex-direction: row;
      }

      #container_border {
        position: absolute;
        top: 0;
        left: 25%;
        bottom: 0;
        width: 2px;
        z-index: 10;
        opacity: 0.8;
        background: #ccc;
        border: 1px inset #ccc;
        cursor: col-resize;
      }
    `,
      'logarithmicdepthbuffer'
    )

    const normal = this.createContainer(container, 'normal')
    const border = this.createContainer(container, 'border')
    const onBorderPointerMove = (evt: MouseEvent) => {
      this.screensplit = Math.max(
        0,
        Math.min(1, evt.clientX / window.innerWidth)
      )
    }
    const onBorderPointerUp = () => {
      window.removeEventListener('pointermove', onBorderPointerMove)
      window.removeEventListener('pointerup', onBorderPointerUp)
    }
    const borderPointerDown = () => {
      window.addEventListener('pointermove', onBorderPointerMove)
      window.addEventListener('pointerup', onBorderPointerUp)
    }
    border.addEventListener('pointerdown', borderPointerDown)
    this.border = border
    const logzbuf = this.createContainer(container, 'logzbuf')

    const loader = new FontLoader()
    loader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
      this.initScene(font)

      this.object.normal = this.initView(normal, 'normal', false)
      this.object.logzbuf = this.initView(logzbuf, 'logzbuf', true)
    })

    const onMouseMove = (evt: MouseEvent) => {
      this.mouse[0] = evt.clientX / window.innerWidth
      this.mouse[1] = evt.clientY / window.innerHeight
    }
    const onMouseWheel = (evt: WheelEvent) => {
      const amount = evt.deltaY
      if (amount === 0) return
      const dir = amount / Math.abs(amount)
      this.zoomspeed = dir / 10

      this.minzoomspeed = 0.001
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('wheel', onMouseWheel)
    return () => {
      removeStyleElement('logarithmicdepthbuffer')
      container.removeChild(normal)
      container.removeChild(logzbuf)
      container.removeChild(border)
      border.removeEventListener('pointerdown', borderPointerDown)
      Object.keys(this.object).forEach((key) => {
        const view = this.object[key]
        view.renderer.dispose()
        view.container.removeChild(view.renderer.domElement)
      })

      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('wheel', onMouseWheel)
    }
  }

  private createContainer = (container: Element, name: string) => {
    const div = document.createElement('div')
    div.id = `container_${name}`
    container.appendChild(div)
    return div
  }

  private initScene = (font: Font) => {
    const scene = new THREE.Scene()
    scene.add(new THREE.AmbientLight(0x222222))
    this.scene = scene

    const light = this.utils.createDirectionalLight(null, [100, 100, 100])
    scene.add(light)

    const materialargs = {
      color: 0xffffff,
      specular: 0x050505,
      shininess: 50,
      emissive: 0x000000,
    }

    const geometry = new THREE.SphereGeometry(0.5, 24, 12)

    labeldata.forEach((ldata) => {
      const scale = ldata.scale || 1
      const labelgeo = new TextGeometry(ldata.label, {
        font,
        size: ldata.size,
        height: ldata.size / 2,
      })
      labelgeo.computeBoundingSphere()
      labelgeo.translate(-labelgeo.boundingSphere!.radius, 0, 0)
      ;(materialargs.color as THREE.ColorRepresentation) = new THREE.Color().setHSL(
        Math.random(),
        0.5,
        0.5
      )
      const material = new THREE.MeshPhongMaterial(materialargs)

      const group = new THREE.Group()
      group.position.z = -ldata.size * scale
      scene.add(group)

      const textmesh = new THREE.Mesh(labelgeo, material)
      textmesh.scale.set(scale, scale, scale)
      textmesh.position.z = -ldata.size * scale
      textmesh.position.y = (ldata.size / 4) * scale
      group.add(textmesh)

      const dotmesh = new THREE.Mesh(geometry, material)
      dotmesh.position.y = (-ldata.size / 4) * scale
      dotmesh.scale.multiplyScalar(ldata.size * scale)
      group.add(dotmesh)
    })
    return scene
  }

  initView = (
    framecontainer: HTMLElement,
    name: string,
    logDepthBuf: boolean
  ): iView => {
    const scene = this.scene!

    const camera = new THREE.PerspectiveCamera(
      50,
      (this.screensplit * this.SCREEN_WIDTH) / this.SCREEN_HEIGHT,
      NEAR,
      FAR
    )
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: logDepthBuf,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT)
    renderer.domElement.id = `renderer_${name}`
    framecontainer.appendChild(renderer.domElement)

    return {
      container: framecontainer,
      renderer,
      scene,
      camera,
    }
  }

  protected onResize = () => {
    this.updateRendererSizes()
  }

  private updateRendererSizes = () => {
    this.SCREEN_WIDTH = window.innerWidth
    this.SCREEN_HEIGHT = window.innerHeight

    this.screensplit_right = 1 - this.screensplit

    const normal = this.object.normal
    if (normal) {
      normal.renderer.setSize(
        this.screensplit * this.SCREEN_WIDTH,
        this.SCREEN_HEIGHT
      )
      normal.camera.aspect =
        (this.screensplit * this.SCREEN_WIDTH) / this.SCREEN_HEIGHT
      normal.camera.updateProjectionMatrix()
      normal.camera.setViewOffset(
        this.SCREEN_WIDTH,
        this.SCREEN_HEIGHT,
        0,
        0,
        this.SCREEN_WIDTH * this.screensplit,
        this.SCREEN_HEIGHT
      )
      normal.container.style.width = this.screensplit * 100 + '%'
    }

    const logzbuf = this.object.logzbuf
    if (logzbuf) {
      logzbuf.renderer.setSize(
        this.screensplit_right * this.SCREEN_WIDTH,
        this.SCREEN_HEIGHT
      )
      logzbuf.camera.aspect =
        (this.screensplit_right * this.SCREEN_WIDTH) / this.SCREEN_HEIGHT
      logzbuf.camera.updateProjectionMatrix()
      logzbuf.camera.setViewOffset(
        this.SCREEN_WIDTH,
        this.SCREEN_HEIGHT,
        this.SCREEN_WIDTH * this.screensplit,
        0,
        this.SCREEN_WIDTH * this.screensplit_right,
        this.SCREEN_HEIGHT
      )
      logzbuf.container.style.width = this.screensplit_right * 100 + '%'
    }
    if (this.border) this.border.style.left = this.screensplit * 100 + '%'
  }

  private zoompos = -100
  private minzoomspeed = 0.015
  private zoomspeed = 0.015
  private mouse = [0.5, 0.5]
  public run() {
    const delta = super.run()

    const minzoom = labeldata[0].size * labeldata[0].scale * 1
    const maxzoom =
      labeldata[labeldata.length - 1].size *
      labeldata[labeldata.length - 1].scale *
      100
    let damping = Math.abs(this.zoomspeed) > this.minzoomspeed ? 0.95 : 1.0

    const zoom = THREE.MathUtils.clamp(
      Math.pow(Math.E, this.zoompos),
      minzoom,
      maxzoom
    )
    this.zoompos = Math.log(zoom)

    if (
      (zoom === minzoom && this.zoomspeed < 0) ||
      (zoom === maxzoom && this.zoomspeed > 0)
    ) {
      damping = 0.85
    }

    this.zoompos += this.zoomspeed
    this.zoomspeed *= damping

    const normal = this.object.normal
    if (normal) {
      normal.camera.position.set(
        Math.sin(0.5 * Math.PI * (this.mouse[0] - 0.5)) * zoom,
        Math.sin(0.25 * Math.PI * (this.mouse[1] - 0.5)) * zoom,
        Math.cos(0.5 * Math.PI * (this.mouse[0] - 0.5)) * zoom
      )
      normal.camera.lookAt(normal.scene.position)
    }

    const logzbuf = this.object.logzbuf
    if (logzbuf && normal) {
      logzbuf.camera.position.copy(normal.camera.position)
      logzbuf.camera.quaternion.copy(normal.camera.quaternion)
    }

    if (this.screensplit_right != 1 - this.screensplit && this.object.normal) {
      this.updateRendererSizes()
    }

    this.object.normal?.renderer.render(
      this.object.normal.scene,
      this.object.normal.camera
    )
    this.object.logzbuf?.renderer.render(
      this.object.logzbuf.scene,
      this.object.logzbuf.camera
    )
    return delta
  }
}
