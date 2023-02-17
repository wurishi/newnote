# 1. WebGLRenderer

渲染器

- `new WebGLRenderer({ antialias })`:
  - `antialias?: boolean`: 设置防锯齿，默认为 false

- `.setPixelRatio(value)`: 设置渲染器像素比例
  - `value: number`

- `.setSize(width, height, updateStyle)`: 设置渲染尺寸
  - `width: number`
  - `height: number`
  - `updateStyle?: boolean`: 是否随着尺寸的变化而更新画面的样式（style），默认为 true

- `.outputEncoding: TextureEncoding`: 设置渲染的输出格式

- `.shadowMap: WebGLShadowMap`: 阴影渲染相关
  - `.enabled`: 是否开启阴影，默认值为 false

- `.physicallyCorrectLights`: 是否启用物理校正光源，默认值为 false
  - 以下为仅开启后才生效的属性
  - `SpotLight.decay`: 衰减
  - `SpotLight.power`: 功率
  - `PointLight.decay`
  - `PointLight.power`

# 2. Scene

- `.environment`: 若该值不为 null，则该纹理贴图将会被设为场景中所有物理材质的环境贴图。该属性不能覆盖已经存在并分配给 `MeshStandardMaterial.envMap` 的贴图。默认为 null

- `.background: Color | Texture`: 设置背景色，默认为 null

- `.fog: FogBase`: 给场景添加雾
  - `new Fog(color, near, far)`: 线性雾，根据参数会随着距离的增加而线性增加的雾，雾生成的范围在最大距离和最小距离之间
    - `color: ColorRepresentation`: 雾的颜色。可以是 `Color` 类，也可以是表示颜色的数字或字符串
    - `near?: number`: 最小距离
    - `far?: number`: 最大距离
  - `new FogExp2(hex, desity)`: 线性雾，随着距离呈指数级增长的雾
    - `hex: number | string`: 雾的颜色
    - `density?: number`: 雾的增长速度，默认值为 0.00025

# 3. PerspectiveCamera

- `new PerspectiveCamera(fov, aspect, near, far)`:
  - `fov?: number`: 50
  - `aspect?: number`: 1
  - `near?: number`: 0.1
  - `far?: number`: 2000

# 4. Object3D

- `.traverse(callback)`: 遍历所有子元素
  - `callback: (object: Object3D) => void`

- `.lookAt(vector)`: 旋转对象使得自己面向指定的位置
  - `vector: Vector3`: 世界坐标

- `.lookAt(x, y, z)`: `lookAt` 的另一个函数签名，可以直接指定XYZ坐标

# 5. Mesh

- `.receiveShadow`: 是否接收阴影

# 101. PMREMGenerator

Mipmapped Radiance Environment Map(PMREM)。

该类可以从一个 CubeMap 环境纹理中生成一个预过滤的环境纹理。通过这种方式计算出来的环境贴图，拥有一个平稳的漫反射照明，并被限制了采样计算。

- `new PMREMGenerator(renderer)`:
  - `renderer: THREE.WebGLRenderer`

- `.fromScene(scene, sigma, near, far): WebGLRenderTarget`:
  - `scene: THREE.Scene`: 指定场景
  - `sigma?: number`: 指定一个以弧度为单位的模糊半径。默认值为 0
  - `near?: number`: number 近平面值，默认值为 0.1
  - `far?: number`: number 远平面值，默认值为 100
  - `return WebGLRenderTarget`: 返回一个渲染缓冲，GPU 会在后台将场景中的内容渲染到缓冲中
    - `.texture: Texture`: 该纹理保存了渲染缓冲中的像素，可以作为后续进一步处理的输入值

# 102. OrbitControls

轨道控制器

- `.enabled`: 是否启效

- `.enablePan`: 设置为 false 时，控制器将不再接受平移操作（鼠标右键拖动）。默认值为 true

- `.enableDamping`: 移动阻尼，默认值为 false

- `.minDistance`: 摄像机最多能推到多近

- `.maxDistance`: 摄像机最多能推到多远

# 103. GLTFLoader

glb 模型格式加载器

- `.setDRACOLoder(dracoLoader)`: 设置解压器

- `.load(url, onLoad, onProgress, onError)`: 加载模型
  - `url: string`: 模型路径
  - `onLoad: (gltf:GLTF) => void`: 加载成功
    - `gltf.scene`: 主场景
    - `gltf.scenes`: 所有场景
    - `gltf.animations`: 所有动画  
  - `onProgress?: (event: ProgressEvent<EventTarget>) => void`: 加载进度
  - `onError?: (event: ErrorEvent) => void`: 加载失败

# 104. DRACOLoader

glb 模型的解压加载器，一个 `wasm` 的解码器。

- `.setDecoderPath(path)`: 指定 `.wasm` 和 `.js` 文件的路径。

# 105. AnimationMixer

动画混合器

- `new AnimationMixer(model)`: 
  - `model: Object3D | AnimationObjectGroup`: 包含了一个或多个动画剪辑信息的模型

- `.clipAction(clip, root, blendMode): AnimationAction`: 剪辑动画
  - `clip: AnimationClip`: 动画剪辑，一般包含在模型中

- `.addEventListener(type, listener)`: 添加事件监听
  - `type: string`: 事件类型
    - `"loop"`: 一次动画循环播放完（像是移动等动画本身是无限循环的）
  - `listener: (event: THREE.Event & type & AnimationMixer) => void`: 事件回调

- `.removeEventListener(type, listener)`: 移除事件监听

- `.update(deltaTime)`: 更新动画播放
  `deltaTime: number`: 增量时间，已经过去了多长时间

# 106. AnimationAction

控制动画的播放，暂停，速率等。

- `.enabled`: 是否生效，默认值为 true。设置为 false 之后，针对 Action 的所有操作 `play` ，`stop` 等都将失效

- `.play()`: 开始播放

- `.stop()`: 停止播放

- `.paused`: 是否暂停，默认值为 false

- `.time`: 当前时间，默认值为 0

- `.timeScale`: 时间比例，用来调节动画的播放速度，默认值为 1.0

- `.crossFadeTo(fadeInAction, duration, wrap)`: 从当前动画逐渐过渡到另一个动画
  - `fadeInAction: AnimationAction`: 要过渡到的动画
  - `duration: number`: 过渡的持续时间
  - `wrap: boolean`:

- `.getEffectiveWeight(): number`: 获得当前权重

- `.setEffectiveTimeScale(timeScale)`:

- `.setEffectiveWeight(weight)`: 设置当前权重

# 107. SkeletonHelper

用来模拟骨骼 `Skeleton` 的辅助对象。该对象使用 `LineBasicMaterial` 材质。

- `new SkeletonHelper(object)`: 模型中必须要有骨骼，才能够获取到

- `.visible`: 是否可见，默认值为 true

# 108. HemisphereLight

半球光

- `new HemisphereLight(skyColor, groundColor, intensity)`: 
  - `skyColor?: ColorRepresentation`: 天空颜色
  - `groundColor?: ColorRepresentation`: 地面反射的颜色
  - `intensity?: number`: 强度，默认值为 1

# 109. DirectionalLight

平行光

- `new DirectionalLight(color, intensity)`:
  - `color?: ColorRepresentation`: 光线颜色
  - `intensity?: number`: 强度，默认值为 1

- `.castShadow`: 是否将阴影渲染到渲染器的 `shadowMap` 中，默认值为 false。只有设置为 true，并且渲染器打开了 `shadowMap.enabled` 之后，该光照照射的物体才会显示阴影。（该物体 `mesh.castShadow` 也需要设置为 true），被投影的物体也需要设置 `mesh.receiveShadow` 才能显示阴影

- `.shadow: DirectionalLightShadow`: 阴影的相关配置
  - `.camera: OrghographicCamera`: 可以通过调整阴影摄像机，控制阴影的范围

# 110. AmbientLight

环境光源

# 111. CubeCamera

立方体相机，创建一个从相机为起点的六面等距的摄像机

- `new CubeCamera(near, far, renderTarget)`:
  - `near: number`:
  - `far: number`:
  - `renderTarget: WebGLCubeRenderTarget`:

# 112. WebGLCubeRenderTarget

提供给 `CubeCamera` 使用

# 113. MeshBasicMaterial

基础网格材质，这种材质不考虑场景中的光照，但会对场景中的雾化有反应。使用这种材质一般会用作渲染简单的平面多边形，或者几何体的线框。

# 114. TransformControls

变换控制器，可以针对场景中的某个具体物体进行移动，缩放，旋转操作。

- `.size`: 控制器的大小，默认值为 1

- `.showX, .showY, .showZ`: 控制X/Y/Z坐标轴是否显示，默认都为 true

- `.space`: `'world'`/`'local'`

# 115. CCDIKSolver

基于 CCD 算法的骨骼解码器，即移动骨骼上的某个节点后，都会以 CCD 算法模拟出整个骨骼的运动状态。适用于 `SkinnedMesh`。

# 116. CCDIKHelper

`CCDIKSolver` 的辅助类，用于渲染骨骼节点。

# 117. AnimationUtils

- `makeClipAdditive(targetClip, referenceFrame, referenceClip, fps)`:
  - `targetClip: AnimationClip`:
  - `referenceFrame?: number`: 默认值为 0
  - `referenceClip?: AnimationClip`:
  - `fps?: number`: 默认值为 30

- `subclip(sourceClip, name, startFrame, endFrame, fps): AnimationClip`: 创建一个新的动画片段
  - `sourceClip: AnimationClip`: 源动画
  - `name: string`: 新动画片段的名字
  - `startFrame: number`: 剪辑开始帧
  - `endFrame: number`: 剪辑结束帧
  - `fps?: number`: 帧率，默认值为 30