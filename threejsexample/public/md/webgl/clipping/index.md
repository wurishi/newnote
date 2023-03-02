- link
  - 132

## 自我裁剪

通过设置：

```typescript
const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8)
// ...
const material = new THREE.MeshPhongMaterial({
  color: 0x80ee10,
  shininess: 100,
  side: THREE.DoubleSide, // 因为会被裁剪，所以要设置为 DoubleSide
  clippingPlanes: [localPlane],
  clipShadows: true, // 不指定的话阴影会显示完整的而非裁剪后的
})
```

## 全局裁剪

通过改变 `renderer.clippingPlanes` 可以改变全局裁剪使用的 `Plane`：

```typescript
const globalPlanes = [globalPlane]
const Empty: any = Object.freeze([])
// ...
this.renderer.clippingPlanes = Empty
this.renderer.localClippingEnabled = true // 启用裁剪
```

