- link
  - 103
  - 105
  - 106
  - 107
  - 108
  - 109

## 动画之间的过渡

```typescript
private setWeight = (action: THREE.AnimationAction, weight: number) => {
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(weight)
  }

private executeCrossFade = (
    startAction: THREE.AnimationAction,
    endAction: THREE.AnimationAction,
    duration: number
  ) => {
    this.setWeight(endAction, 1)
    endAction.time = 1

    startAction.crossFadeTo(endAction, duration, true)
  }
```

通过 `crossFadeTo` 平滑地调整前后二个动画的 `effectiveWeight` 值来实现动画的平滑过渡。

## 单步播放

```typescript
if (this.singleStepMode) {
  mixerUpdateDelta = this.sizeOfNextStep
  this.sizeOfNextStep = 0
}

this.mixer?.update(mixerUpdateDelta)
```

通过限制 `mixerUpdateDelta` 来实现动画的单步播放。