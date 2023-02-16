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

# 2. Scene

- `.environment`: 若该值不为 null，则该纹理贴图将会被设为场景中所有物理材质的环境贴图。该属性不能覆盖已经存在并分配给 `MeshStandardMaterial.envMap` 的贴图。默认为 null

- `.background: Color | Texture`: 设置背景色，默认为 null

# 3. PerspectiveCamera

- `new PerspectiveCamera(fov, aspect, near, far)`:
  - `fov?: number`: 50
  - `aspect?: number`: 1
  - `near?: number`: 0.1
  - `far?: number`: 2000

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

- `.enablePan`: 设置为 false 时，控制器将不再接受平移操作（鼠标右键拖动）。默认值为 true

- `.enableDamping`: 移动阻尼，默认值为 false

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
  - `clip: AnimationClip`: 动画剪辑