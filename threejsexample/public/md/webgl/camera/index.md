- link
  - 113
  - 119
  - 123
  - 124
  - 125
  - 126
  - 127

## 星星

本例中通过直接批量指定顶点，模拟星空效果：

```typescript
const geometry = new THREE.BufferGeometry()
const vertices = []

for (let i = 0; i < 10000; i++) {
  vertices.push(THREE.MathUtils.randFloatSpread(2000))
  vertices.push(THREE.MathUtils.randFloatSpread(2000))
  vertices.push(THREE.MathUtils.randFloatSpread(2000))
}
geometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(vertices, 3)
)

const particles = new THREE.Points(
  geometry,
  new THREE.PointsMaterial({ color: 0x888888 })
)
scene.add(particles)
```

## 左右屏渲染

首先通过设置 `renderer.autoClear = false` 关闭自动清屏，然后二次调用 `setViewport()` 与 `render()` 实现左右屏分别渲染：

```typescript
// 设置左半边视口
this.renderer.setViewport(0, 0, width / 2, height)
// 渲染左半边
this.renderer.render(this.scene, this.activeCamera)

// 设置右半边视口
this.renderer.setViewport(width / 2, 0, width / 2, height)
// 渲染右半边
this.renderer.render(this.scene, this.camera)
```

要注意的是不但 `renderer.autoClear = false` 需要设置，另外 `scene` 必须没有 `background`。一旦指定了背景色，那么在 `render()` 被调用时一样会因为 `forceClear` 而强制清屏。