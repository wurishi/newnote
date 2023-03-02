# 1. WebGLRenderer

渲染器

- `new WebGLRenderer({ antialias })`:
  - `antialias?: boolean`: 设置防锯齿，默认为 false
  - `logarithmicDepthBuffer? boolean`: 深度缓冲区，默认为 false

- `.setPixelRatio(value)`: 设置渲染器像素比例
  - `value: number`

- `.setSize(width, height, updateStyle)`: 设置渲染尺寸
  - `width: number`
  - `height: number`
  - `updateStyle?: boolean`: 是否随着尺寸的变化而更新画面的样式（style），默认为 true

- `.outputEncoding: TextureEncoding`: 设置渲染的输出格式

- `.shadowMap: WebGLShadowMap`: 阴影渲染相关，能形成阴影的光源只有 `DirectionalLight` 和 `SpotLight`。能够表现阴影的材质只有 `LambertMaterial` 和 `PhongMaterial`
  - `.enabled`: 是否开启阴影，默认值为 false

- `.physicallyCorrectLights`: 是否启用物理校正光源，默认值为 false
  - 以下为仅开启后才生效的属性
  - `SpotLight.decay`: 衰减
  - `SpotLight.power`: 功率
  - `PointLight.decay`
  - `PointLight.power`

- `.autoClear`: 调用渲染前是否自动清屏，默认为 true

- `.clear()`: 手动清屏

- `.setViewport(vec4)`:
- `.setViewport(x, y, width, height)`: 指定视口

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

透视投影相机

- `new PerspectiveCamera(fov, aspect, near, far)`:
  - `fov?: number`: 50
  - `aspect?: number`: 1
  - `near?: number`: 0.1
  - `far?: number`: 2000

- `.setViewOffset(fullWidth, fullHeight, x, y, width, height)`:
  - `fullWidth: number`:
  - `fullHeight: number`:
  - `x: number`:
  - `y: number`:
  - `width: number`:
  - `height: number`:

# 4. Object3D

- `.traverse(callback)`: 遍历所有子元素
  - `callback: (object: Object3D) => void`

- `.lookAt(vector)`: 旋转对象使得自己面向指定的位置
  - `vector: Vector3`: 世界坐标

- `.lookAt(x, y, z)`: `lookAt` 的另一个函数签名，可以直接指定XYZ坐标

- `.getObjectByName(name: string): Object3D | undefined`: 根据名字查找 

- `.renderOrder: number`: 覆盖物体在场景中的默认渲染顺序，由低到高排序后渲染。不透明的和透明的物体会在不同的列表中保持独立排序。为 `Group` 对象设置此属性后，它的所有子对象也将一起参与排序和渲染。默认值为 0

# 5. Mesh

- `.receiveShadow`: 是否接收阴影

- `.morphTargetDictionary`: 变形目标字典

- `.morphTargetInfluences`: 变形目标影响权重

# 6. Material

材质

- `.opacity`: 透明度，默认值为 1.0

- `.transparent`: 是否透明，默认值为 false。只有设置为 true，`opacity` 才有效。

- `.side`: 渲染面片的哪些面。默认为正面 `FrontSide`，还可以设置为反而 `BackSide` 或双面 `DoubleSide`

- `.clipIntersection`: 是否剪切交叉点，更改剪裁平面的行为，以便仅剪切其交叉点，而不是它们的并集。默认值为 false

# 7. Color

颜色

- `.setHSL(h, s, l, colorSpace)`: 
  - `h: number`: 色相 0-1 之间
  - `s: number`: 饱和度 0-1 之间
  - `l: number`:
  - `colorSpace?: ColorSpace`:

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

- `.enabled`: 是否启用

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

- `.loop: AnimationActionLoopStyles`: 动画循环类型，默认值为 `LoopRepeat`
  - `AnimationActionLoopStyles`:
    - `LoopOnce`: 只播放一次，不循环
    - `LoopRepeat`: 循环
    - `LoopPingPong`: 循环往复

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

太阳光常常被看作平行光，这是因为相对地球上物体的尺寸而言，太阳离我们的距离足够远。对于任意平行的平面，平行光照射的亮度也是相同的，与平面所在位置无关。

平行光的位置非常重要，给平行光设置了位置，并不意味着光是从位置所在的点射出的（这样就成了点光源）。假设为平行光设置了位置 `light.position.set(2, 5, 3)` 此时平行光将以矢量 `(-2, -5, -3)` 的方向照射到所有平面。因此，平面的亮度与平面的位置无关，而只与平面的法向量相关。

- `new DirectionalLight(color, intensity)`:
  - `color?: ColorRepresentation`: 光线颜色
  - `intensity?: number`: 强度，默认值为 1

- `.castShadow`: 是否将阴影渲染到渲染器的 `shadowMap` 中，默认值为 false。只有设置为 true，并且渲染器打开了 `shadowMap.enabled` 之后，该光照照射的物体才会显示阴影。（该物体 `mesh.castShadow` 也需要设置为 true），被投影的物体也需要设置 `mesh.receiveShadow` 才能显示阴影

- `.shadow: DirectionalLightShadow`: 阴影的相关配置
  - `.camera: OrghographicCamera`: 可以通过调整阴影摄像机，控制阴影的范围

# 110. AmbientLight

环境光源，是场景整体的光照效果。类似于场景内若干光源进行多次反射后形成的亮度一致的光照效果。通常用来为整个场景提供一个基础亮度。环境光源没有明确的光源位置，它在各处形成的亮度也是一致的。

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

- `new MeshBasicMaterial(params)`:
  - `params: MeshBasicMaterialParameters`:
    - `wireframe: boolean`: 是否显示线框图

# 114. TransformControls

变换控制器，可以针对场景中的某个具体物体进行移动，缩放，旋转操作。

- `.size`: 控制器的大小，默认值为 1

- `.showX, .showY, .showZ`: 控制X/Y/Z坐标轴是否显示，默认都为 true

- `.space`: `'world'`/`'local'`

- `.attach()`: 

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

# 118. GridHelper

网格辅助类

- `new GridHelper(size, divisions, color1, color2)`: 
  - `size?: number`: 网格大小，默认值为 10
  - `divisions?: number`: 用多少行列分隔，默认值为 10
  - `color1?: ColorRepresentation`: 中心十字线的颜色，默认值为 0x444444
  - `color2?: ColorRepresentation`: 其余线的颜色，默认值为 0x888888

# 119. CameraHelper

摄像机辅助类

# 120. PlaneGeometry

平面几何图形

- `new PlaneGeometry(width, height, widthSegments, heightSegments)`: 
  - `width: number`: X轴的大小，默认为 1
  - `height: number`: Y轴的大小，默认为 1
  - `widthSegments: number`: 沿 `width` 分段的数量，默认为 1
  - `heightSegments: number`: 沿 `height` 分段的数量，默认为 1

# 121. MeshPhongMaterial

是符合 `Phone` 光照模型的材质，和 `Lambert` 不同的是，该模型考虑了镜面反射的效果，因此对于金属，镜面的表现尤为适合。

- `new MeshPhongMaterial(params)`:
  - `params: MeshPhongMaterialParameters`:
    - `color?: ColorRepresentation`: 默认值为 0xffffff
    - `emissive?: ColorRepresentation`: 该材质发射的颜色，它并不是一个光源，只是一种纯粹的不受其他光照影响的颜色，默认为 0x000000
    - `specular?: ColorRepresentation`: 指定材质的光亮程度及高光部分颜色，如果设置成和 `color` 相同，将得到一种类似金属的材质，如果设置成灰色，则更像塑料
    - `shininess?: number`: 高光部分的亮度，默认为 30

# 122. SkeletonUtils

- `.clone(souce)`: 克隆一个 `Object3D`

# 123. OrthographicCamera

正投影相机

- `new OrthographicCamera(left, right, top, bottom, near, far)`:
  - `left: number`: 摄像机视锥体左侧面
  - `right: number`: 
  - `top: number`:
  - `bottom: number`:
  - `near: number`: 0.1
  - `far: number`: 2000

# 124. SphereGeometry

球形几何体，围绕Y轴（水平）和Z轴（垂直），创建出类似于球体切片的几何体

- `new SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)`:
  - `radius?: number`: 50
  - `widthSegments?: number`: 8
  - `heightSegments?: number`: 6

# 125. BufferGeometry

直接指定顶点

- `.setAttribute(name, attribute)`:

- `.computeBoundingSphere()`: 计算一个边界球体

- `.boundingSphere: Sphere`: 需要先执行 `.computeBoundingSphere()` ，然后才能访问本属性

# 126. PointsMaterial

点材质

# 127. MathUtils

- `.randFloatSpread(range)`: 生成 `-range/2` 到 `range/2` 的随机数
  - `range: number`

- `.degToRad(degress)`: 角度转弧度

- `.radToDeg(radians)`: 弧度转角度

# 128. ArrayCamera

多个相机

# 129. CinematicCamera

模拟电影相机

- `.postprocessing`: 后期处理的选项
  - `.bokeh_uniforms`:
    - `.vignetting`: 模拟四周暗角，默认值为 false

# 130. MeshLambertMaterial

符合 `Lambert` 光照模型的材质，主要特点是只考虑漫反射而不考虑镜面反射的效果，因而对于金属，镜子等需要镜面反射效果的物体就不适应了，对于其他大部分物体的漫反射效果都是适用的。

一般用来渲染看上去暗淡不光亮的表面，该材质会对场景中的光源产生反应。

# 131. PointLight

点光源不计算光源的大小，可以看作是一个点发出的光源。点光源照到不同物体表面的亮度是线性递减的。因此，离点光源越远的物体，会显得越暗。

# 132. SpotLight

聚光灯是一种特殊的点光源，它能够朝着一个指定方向投射光线，投射出的是类似圆锥形的光线，这与现实中的聚光灯是一致的。

- `new SpotLight(color, intensity, distance, angle, penumbra, decay)`:
  - `color?: ColorRepresentation`:
  - `intensity?: number`:
  - `distance?: number`: 0
  - `angle?: number`: 聚光灯的张角，默认值为 `Math.PI / 3`，最大值为 `Math.PI / 2`
  - `penumbra?: number`: 边缘半影，默认值为 0 ，边缘没有半影
  - `decay?: number`: 2

# 133. Raycaster

射线投射器

- `.setFromCamera(coords, camera)`: 
  - `coords: {x:number, y:number}`: 鼠标的二维坐标，X与Y 应该介于 -1 到 1 之间
  - `camera: Camera`: 射线来自于哪台摄像机

- `.intersectObjects(objects, recursive, optionalTarget)`: 检查射线和所有指定对象之间的所有交点。返回的交点按距离从近到远排序。
  - `objects: Object3D[]`:
  - `recursive?: boolean`: 如果为 `true` 则还会检查指定对象的所有子对象。默认值为 true
  - `optionalTarget?: Array<Intersection<TIntersected>>`: 指定结果数组，如果不指定则会返回一个新的数组。如果手动指定数组，则在调用之前别忘记清除此数组（`array.length = 0`）
  - `return Array<Intersection<TIntersected>>`:
    - `.distance`: 距离
  
# 134. FontLoader

字体加载器

# 135. TextGeometry

文字几何图形

# 136. PlaneHelper

辅助显示 Plane

# 137. ShadowMaterial

仅将接收到的阴影显示出来的材质