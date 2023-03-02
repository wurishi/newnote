- link
  - 105
  - 106
  - 107
  - 108
  - 109
  - 117

## 动画切换

将模型中的动画分成了 `baseActions` 和 `additiveActions`，基础动作包括“待机”，”行走“，”跑“等。这些动作的切换，使用以下三个方法来过渡：

```js
if (endAction) {
  this.setWeight(endAction, 1)
  endAction.time = 0
  if (startAction) {
    startAction.crossFadeTo(endAction, duration, true)
  } else {
    endAction.fadeIn(duration)
  }
} else {
  startAction.fadeOut(duration)
}
```

对于 `additiveActions` 而言，可以直接附加到基础动作上，调节这些动作的权重值即可：

```typescript
private setWeight = (action: THREE.AnimationAction, weight: number) => {
  action.enabled = true
  action.setEffectiveTimeScale(1)
  action.setEffectiveWeight(weight)
}
```