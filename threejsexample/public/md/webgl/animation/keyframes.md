- link
  - 101
  - 102
  - 103
  - 104
  - 105

## 环境纹理

```typescript
scene.environment = pmremGenerator.fromScene(
  new RoomEnvironment(),
  0.04
).texture
```

将预过滤的环境纹理指定给了场景的环境贴图，会发现在该例子中不再需要额外的光源。（因为 PMREM 计算时本身带着一个漫反射光源）
