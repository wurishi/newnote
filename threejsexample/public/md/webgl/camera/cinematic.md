- link
  - 127
  - 129
  - 130
  - 133

## 选中检测

本例中使用 `Raycaster` 的 `intersectObjects` 来作选中检测。

```typescript
// x,y 需要转换成统一坐标[-1, 1]之间
const onMouseMove = (event: MouseEvent) => {
  event.preventDefault()
  this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}
// ...
// 指定坐标和摄像机
this.raycaster.setFromCamera(this.mouse, this.camera)
// 获取所有与从指定坐标发射的射线有交点的物体，第二个参数表示不需要检测子物体
const intersects = this.raycaster.intersectObjects(this.scene.children, false)
if (intersects.length > 0) {
  // 如果有元素被检测到，则第[0]个元素就是离摄像机最近的信息
  const targetDistance = intersects[0].distance
}
```

## 电影相机的渲染方式

```typescript
const cc = this.camera as CinematicCamera
if (cc.postprocessing.enabled) {
  // 使用电影相机的后期处理渲染
  cc.renderCinematic(this.scene, this.renderer)
} else {
  // 如果中途关闭了后期处理渲染
  this.scene.overrideMaterial = null // 需要将 overrideMaterial 清空
  this.renderer.clear() // 并执行清屏操作
  this.renderer.render(this.scene, cc) // 然后以普通的渲染方式调用 render
}
```