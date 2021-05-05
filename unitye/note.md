# 1. 窗口界面介绍

## 1.1 Scene 场景编辑

可以自由漫游整个场景, 并可以选择场景中的物体对其进行编辑.

快捷键:

- Q (Hand Tool): 鼠标左键可以拖动场景以在场景中移动, 鼠标右键拖动场景则可以在场景中旋转视角, 滑动鼠标滚轮可以缩放整个场景.

  按住右键后, 可以使用键盘的 WSADQE 进行前后左右上下位移.

- W (Move Tool): 移动选中的物体, 可以拖动物体移动, 也可以拖动物体上的坐标轴仅沿某个方向位移.

- E (Rotate Tool): 相对旋转选中的物体, 拖动物体可以任意旋转, 也可以拖动物体上的坐标轴仅沿某个方向进行旋转.

- R (Scale Tool): 对选中的物体进行缩放, 拖动物体中心为xyz等比缩放, 拖动指定轴则仅缩放拖动轴.

- T (Rect Tool): 根据 Rect 编辑物体.

- Y : 移动, 旋转, 缩放物体.

- 按住Ctrl: 移动旋转缩放将按 Snap 中设置的数值一单位一单位的进行变化.

## 1.2 Game 游戏运行

游戏运行时玩家所看到的画面.

- Free Aspect: 调节屏幕长宽比.
- Maximize On Play: 播放时是否全屏.
- Mute Audio: 禁用声音.
- Stats: 运行时的帧数等信息.
- Gizmos: 是否显示光源等标记.

## 1.3 Hierarchy 场景物体

场景中的所有物体的名字都会以列表的形式显示在 Hierarchy 窗口中, 双击某个名字, 场景就会自动定位到这个物体.

通过搜索框可以按物体的名字或类型进行搜索, 不符合搜索条件的物体在场景中将会呈现灰色.

## 1.4 Project 项目资源

项目中所有资源都会在 Project 窗口中显示.

## 1.5 Inspector 属性编辑

选中场景中的物体会在 Inspector 中显示该物体所有附加的组件以及组件属性.

选中项目中的资源会在 Inspector 中显示该资源的属性.

## 1.6 其他常用调节窗口

# 2. 基础组件

## 2.1 Camera 摄像机组件

至少需要有一个摄像机, 多个摄像机时, 按摄像机的 Depth 深度越大越晚渲染. 通过 Clear Flags 选择成 Depth only, 即可实现多个摄像机叠加显示的效果.

## 2.2 Light 灯光组件

- Directional Light (平行光):

  Intensity 强度越高优先级也越高, 在 Forward 渲染模式下, 只能识别一个平行光所提供的 Shadow 阴影, 此时如果不修改 Render Mode, 则以 Intensity 强度作为优先级.

- Point Light (点光)

- Spotlight (光束)

- Area Light (区域光): 一般仅用于烘焙场景. 仅限 Static 的物体.

## 2.3 Texture 贴图材质与着色器

Texture 贴图有以下几种:

- 界面 UI
- Mesh 模型
- 粒子效果
- 视频资源
- Render Texture 渲染贴图

## 2.4 Joint 关节

- HingeJoint (链条关节)
- FixedJoint (固定关节)
- SpringJoint (弹簧关节)
- CharacterJoint (角色关节)
- ConfigurableJoint (可配置关节)