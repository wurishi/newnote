import * as THREE from 'three'
import Example, { iInitDestroy, iInitParams } from '@/libs/example'
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'
import { GUI } from 'dat.gui'

export default class E_Cinematic extends Example {
  protected init(params: iInitParams) {
    super.init(params)

    const camera = new CinematicCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.setLens(5)
    camera.position.set(2, 1, 500)
    this.camera = camera

    const scene = this.utils.createScene(0xf0f0f0)
    this.scene = scene

    const light = this.utils.createDirectionalLight()
    light.position.set(1, 1, 1).normalize()
    scene.add(light)

    const geometry = new THREE.BoxGeometry(20, 20, 20)

    for (let i = 0; i < 1500; i++) {
      const object = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({
          color: Math.random() * 0xffffff,
        })
      )
      object.position.set(
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400
      )
      scene.add(object)
    }

    const raycaster = new THREE.Raycaster()
    this.raycaster = raycaster

    const d = this.initGUI(params.ui)

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault()

      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    const onMouseClick = () => {
      if (this.checkUI.check) {
        this.check = true
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onMouseClick)
    return () => {
      d && d()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onMouseClick)
    }
  }

  private initGUI = (root: Element) => {
    const cfg = {
      focalLength: 15,
      fstop: 2.0,
      showFocus: false,
      focalDepth: 3,

      maxblur: 1.0,

      manualdof: false,
      vignetting: false, // 四周暗角
      depthblur: false,

      threshold: 0.5,
      gain: 2.0,
      bias: 0.5,
      fringe: 0.7,

      noise: true,
      pentagon: false,

      dithering: 0.0001,
    }

    const gui = new GUI()
    root.appendChild(gui.domElement.parentElement!)

    let first = true
    const matChanger = () => {
      const c = this.camera as CinematicCamera
      if (c) {
        const config: any = cfg
        Object.keys(config).forEach((e: any) => {
          if (e in c.postprocessing.bokeh_uniforms) {
            first && console.log(e, 'in')
            ;(c.postprocessing.bokeh_uniforms as any)[e].value = config[e]
          } else {
            first && console.log(e, 'not in')
          }
        })

        first = false
        c.postprocessing.bokeh_uniforms['znear'].value = c.near
        c.postprocessing.bokeh_uniforms['zfar'].value = c.far
        c.setLens(cfg.focalLength, undefined, cfg.fstop, c.coc)
        cfg.focalDepth = c.postprocessing.bokeh_uniforms['focalDepth'].value
      }
    }
    gui.add(cfg, 'focalLength', 1, 135, 0.01).onChange(matChanger)
    gui.add(cfg, 'fstop', 1.8, 22, 0.01).onChange(matChanger)
    gui.add(cfg, 'focalDepth', 0.1, 100, 0.001).onChange(matChanger)

    gui.add(cfg, 'maxblur', 1, 100, 1).onChange(matChanger)
    gui.add(cfg, 'manualdof').onChange(matChanger)
    gui.add(cfg, 'vignetting').onChange(matChanger)
    gui.add(cfg, 'depthblur').onChange(matChanger)
    gui.add(cfg, 'threshold').onChange(matChanger)
    gui.add(cfg, 'gain').onChange(matChanger)
    gui.add(cfg, 'bias').onChange(matChanger)
    gui.add(cfg, 'fringe').onChange(matChanger)
    gui.add(cfg, 'noise').onChange(matChanger)
    gui.add(cfg, 'pentagon').onChange(matChanger)
    gui.add(cfg, 'dithering').onChange(matChanger)

    gui.add(cfg, 'showFocus', true).onChange(matChanger)

    gui.add(this.checkUI, 'enable').onChange((enable) => {
      const c = this.camera as CinematicCamera
      if (c) {
        c.postprocessing.enabled = enable
      }
    })
    gui.add(this.checkUI, 'check')

    matChanger()
    return () => {
      gui.destroy()
    }
  }

  private raycaster?: THREE.Raycaster
  private mouse = new THREE.Vector2()
  private theta = 0
  private INTERSECTED?: THREE.Object3D | null
  private INTERSECTED_COLOR = 0
  private checkUI = {
    check: false,
    enable: true,
  }
  private check = false

  public run() {
    this.theta += 0.1
    const radius = 100

    this.camera?.position.set(
      radius * Math.sin(THREE.MathUtils.degToRad(this.theta)),
      radius * Math.sin(THREE.MathUtils.degToRad(this.theta)),
      radius * Math.cos(THREE.MathUtils.degToRad(this.theta))
    )
    this.scene && this.camera?.lookAt(this.scene.position)
    this.camera?.updateMatrixWorld()

    if (this.raycaster && this.camera && this.scene && this.check) {
      this.check = false
      this.raycaster.setFromCamera(this.mouse, this.camera)

      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        false
      )

      // console.log(intersects)
      if (intersects.length > 0) {
        const targetDistance = intersects[0].distance

        ;(this.camera as CinematicCamera).focusAt(targetDistance)

        if (this.INTERSECTED !== intersects[0].object) {
          this.setMeshLambertEmissive(this.INTERSECTED!, this.INTERSECTED_COLOR)

          this.INTERSECTED = intersects[0].object
          this.INTERSECTED_COLOR = this.getMeshLambertEmissive(this.INTERSECTED)
          this.setMeshLambertEmissive(this.INTERSECTED, 0xff0000)
        }
      } else {
        this.setMeshLambertEmissive(this.INTERSECTED!, this.INTERSECTED_COLOR)
        this.INTERSECTED = null
      }
    }

    const cc = this.camera as CinematicCamera
    if (this.scene && cc) {
      if (cc.postprocessing.enabled) {
        cc.renderCinematic(this.scene, this.renderer)
      } else {
        this.scene.overrideMaterial = null

        this.renderer.clear()
        this.renderer.render(this.scene, cc)
      }
    }

    return 0
  }

  private getMeshLambertEmissive = (object: THREE.Object3D) => {
    const mesh = object as THREE.Mesh
    const material = mesh?.material as THREE.MeshLambertMaterial
    return material?.emissive.getHex()
  }

  private setMeshLambertEmissive = (object: THREE.Object3D, hex: number) => {
    const mesh = object as THREE.Mesh
    const material = mesh?.material as THREE.MeshLambertMaterial
    material && material.emissive.setHex(hex)
  }
}
