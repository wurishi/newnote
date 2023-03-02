import Example, { iInitParams } from '@/libs/example'
import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class extends Example {
  protected init(params: iInitParams) {
    super.init(params)
    const camera = this.utils.createPerspectiveCamera(
      {
        fov: 36,
        near: 0.25,
        far: 16,
      },
      [0, 1.3, 3]
    )
    this.camera = camera

    const scene = new THREE.Scene()
    this.scene = scene

    scene.add(new THREE.AmbientLight(0x505050))

    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.angle = Math.PI / 5
    spotLight.penumbra = 0.2
    spotLight.position.set(2, 3, 3)
    spotLight.castShadow = true
    spotLight.shadow.camera.near = 3
    spotLight.shadow.camera.far = 10
    spotLight.shadow.mapSize.set(1024, 1024)
    scene.add(spotLight)

    const dirLight = this.utils.createDirectionalLight(
      0x55505a,
      [0, 3, 0],
      [1, -1, -1, 1, 1, 10]
    )
    dirLight.shadow.mapSize.set(1024, 1024)
    scene.add(dirLight)

    const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8)
    const globalPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1)

    const material = new THREE.MeshPhongMaterial({
      color: 0x80ee10,
      shininess: 100,
      side: THREE.DoubleSide,

      clippingPlanes: [localPlane],
      clipShadows: true,
    })

    const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20)

    const object = new THREE.Mesh(geometry, material)
    object.castShadow = true
    this.object = object
    scene.add(object)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9, 1, 1),
      new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    this.renderer.shadowMap.enabled = true

    const globalPlanes = [globalPlane]
    const Empty: any = Object.freeze([])

    this.renderer.clippingPlanes = Empty
    this.renderer.localClippingEnabled = true

    const controls = new OrbitControls(camera, this.renderer.domElement)
    controls.target.set(0, 1, 0)
    controls.update()
    this.controls = controls

    const gui = new GUI()
    const renderer = this.renderer
    const folderLocal = gui.addFolder('Local Clipping')
    const propsLocal = {
      get Enabled() {
        return renderer.localClippingEnabled
      },
      set Enabled(v) {
        renderer.localClippingEnabled = v
      },
      get Shadows() {
        return material.clipShadows
      },
      set Shadows(v) {
        material.clipShadows = v
      },
      get Plane() {
        return localPlane.constant
      },
      set Plane(v) {
        localPlane.constant = v
      },
    }

    const folderGlobal = gui.addFolder('Global Clipping')
    const propsGlobal = {
      get Enabled() {
        return renderer.clippingPlanes !== Empty
      },
      set Enabled(v) {
        renderer.clippingPlanes = v ? globalPlanes : Empty
      },
      get Plane() {
        return globalPlane.constant
      },
      set Plane(v) {
        globalPlane.constant = v
      },
    }

    folderLocal.add(propsLocal, 'Enabled')
    folderLocal.add(propsLocal, 'Shadows')
    folderLocal.add(propsLocal, 'Plane', 0.3, 1.25)
    folderLocal.open()

    folderGlobal.add(propsGlobal, 'Enabled')
    folderGlobal.add(propsGlobal, 'Plane', -0.4, 3)
    folderGlobal.open()

    const spotLightProps = {
      get penumbra() {
        return spotLight.penumbra
      },
      set penumbra(v) {
        spotLight.penumbra = v
      },
      get visible() {
        return spotLight.visible
      },
      set visible(v) {
        spotLight.visible = v
      },
    }
    const folderSpotLight = gui.addFolder('聚光灯')
    folderSpotLight.add(spotLightProps, 'visible')
    folderSpotLight.add(spotLightProps, 'penumbra', 0, 1)
    folderSpotLight.open()

    return () => {
      gui.destroy()
    }
  }

  private object?: THREE.Mesh
  private time = 0

  public run() {
    const delta = super.run()

    this.time += delta

    if (this.object) {
      this.object.position.y = 0.8
      this.object.rotation.x = this.time * 0.5
      this.object.rotation.y = this.time * 0.2
      this.object.scale.setScalar(Math.cos(this.time) * 0.125 + 0.875)
    }

    return delta
  }
}
