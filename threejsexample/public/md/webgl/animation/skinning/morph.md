- link
  - 103
  - 105
  - 106
  - 108
  - 109
  - 118
  - 120
  - 121

## 表情

本例中，表情变化都保存在 `Head_4` 中，通过访问 `.morphTargetDictionary` 可以获取不同的表情key, 然后通过调整 `.morphTargetInfluences` 的数值来改变表情。

## 改变动画的 `loop`

部分动作并不需要循环播放，可以设置为 `action.loop = THREE.LoopOnce`，另外之后监听事件不在监听 `loop`，而是监听 `finished` 事件。