- link
  - 102
  - 103
  - 104
  - 110
  - 111
  - 112
  - 113
  - 114
  - 115
  - 116

## 控制手臂

本例中，使用 `TransformControls` 让用户可以自己在一定范围内容控制场景中人物的左手。 然后利用 `CCDIKSolver`，模拟了整条手臂骨骼的运动。

```typescript
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
```

## 头部朝向

以下代码保证头部始终朝向了场景中的水晶球：

```typescript
if (this.conf.turnHead) {
  this.OOI.sphere.getWorldPosition(this.v0)
  this.OOI.head.lookAt(this.v0)
  this.OOI.head.rotation.set(
    this.OOI.head.rotation.x,
    this.OOI.head.rotation.y + Math.PI,
    this.OOI.head.rotation.z
  )
}
```

## 水晶球

以下代码将场景预先渲染一遍，并将材质赋给场景中的水晶球，以实现通过观察水晶球看到整个场景的效果：

```js
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
```

## 环境光照

```js
this.renderer.physicallyCorrectLights = true
```

启用了物理校正光源选项，确保环境光的正确性。

## Controls 冲突

在变换控制器(`TransformControls`)的鼠标按下的事件中，暂时将 `orbitControls` 控制器禁用，确保二个控制器不会冲突。

```js
const tMouseDown = () => (orbitControls.enabled = false)
const tMouseUp = () => (orbitControls.enabled = true)
// ...
transformControls.addEventListener('mouseDown', tMouseDown)
transformControls.addEventListener('mouseUp', tMouseUp)
```