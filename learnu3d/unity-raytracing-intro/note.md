[link](https://learn.u3d.cn/tutorial/unity-raytracing-intro#)

# 1. 配置 HDRP 项目支持实时光照追踪

## 1.1 首先创建一个HDRP模板项目

## 1.2 打开 HD Render Pipeline Wizard 面板

通过菜单打开 Window -> Render Pipeline -> HD Render Pipeline Wizard

## 1.3 从 HDRP 切换到 HDRP + DXR

切换后会有部分功能需要 Fix, 可使用 Fix All 按钮先进行全部修复, 修复完后会提示重启 Unity.

## 1.4 重启 Unity 后再次进入 HD Render Pipeline Wizard 面板

还有一些 Warning 需要手动修复. (这些功能是非必选项, 根据项目实际情况可以自行决定是否需要启用)

## 1.5 打开 Project Settings 面板

通过菜单打开 Edit -> Project Settings 面板.

## 1.6 创建新的 HDRP + DXR 的配置文件

1. 在 Project Settings 面板中选择 Quality , 并点击 Add Quality Level, 创建一个新的 Level, 并命名(Raytracing). 

2. 在项目目录中创建一个新的配置文件, 右键 -> Create -> Renering -> High Definition Render Pipeline Asset.

3. 将 Quality 中选择的 Raytracing Level 的 Rendering 指向为新创建的这个 Asset.

4. 选择 Quality 中的 Default 指向为 Raytracing, 确保该 Level 成为默认 Level.

   > 注意此时, Graphics 选项中的 Pipeline Settings 虽然指向的是 HDRPMediumQuality(默认)配置, 但此时生效的是 Quality 中我们指定的默认 Raytracing 中我们自定义的配置文件. 如果将 Raytracing 指向的配置删除, 才会使用 Graphic 中的配置.

5. 指定新的配置后, 可能还需要 Fix All 一次.

## 1.7 开启额外功能 (非必选)

在 Quality HDRP 下可以看到并选择 HDRPRaytracing 进行编辑. 也可以在项目目录中找到 HDRPRaytracing 这个配置文件, 在 Inspector 面板中进行编辑.

在 Rending 下 Realtime Raytracing (Preview) 选择已经选上了, 表示当前项目已经支持实时光线追踪.

在 Lighting 下 Screen Space Ambient Occlusion 也已经选上了, 表示当前项目已经支持屏幕空间的环境光遮蔽效果.

另外在 Lighting 可以打开 Screen Space Global Illumination 用来开启基于屏幕空间的全局光照.

在 Lighting -> Reflections 下可以找到 Screen Space Reflection 用来打开基于屏幕空间的反射功能, 如果需要支持透明度, 还要打开 Transparent 选项.

在 Lighting -> Shadows 下找到 Screen Space Shadows 打开基于屏幕空间的阴影功能.

此时 Warning 部分已被修复, 但是屏幕空间反射会提示默认相机的帧设置里仍然禁用, 此时在 Project Settings -> HDRP Default Settings 下找到 Default Frame Settings For, 选择 Camera, 在 Lighting 中检查选项是否和上述配置文件开启的相同. 最后可以重新打开 HD Render Pipeline Wizard 面板检查.

## 1.8 确保 Unity 的 Scene 下能够观察到接近 HDRP + DXR 的预览效果

在 Scene 面板, 选择 Camera 图标, 找到 Camera Anti-aliasing 选项, 选择 Temporal Antialiasing 选项.

此外, 要让这个选项生效, 还需要在 Scene 面板的 effect 小图标里面勾上 Always Refresh 选项.

# 2. HDRP 中应用实时光线追踪的方式

## 2.1 在传统光照贴图, 反射探针和光照探针的基础上添加光追功能

环境光遮蔽, 屏幕空间反射, 屏幕空间阴影等功能在普通的 HDRP 项目中也可以使用, 他们会使用传统的光栅化算法实现. 如果项目升级成支持 DXR 时, 则会使用光追算法实现.

## 2.2 使用光追版本的屏幕空间全局光替代传统光照贴图 (继续使用反射探针和光照探针)

可以不再使用烘焙的光照信息, 因为从 2020.2.2 版本开始, 可以直接使用 Screen Space Global Illumination 功能(屏幕空间全局光照功能), 为场景添加间接光照信息. 注意, 启用 SSGI 后, 将不再使用烘焙后的光照信息.

## 2.3 使用 Volume 上的 Path Tracing 一站式光追算法

启用 Path Tracing 后, 之前使用的 Ambient Occlusion, Screen Space Reflection, Recursive Rendering, SubSurface Scattering, Screen Space Global Illumination 等功能将失效, 因为 Path Tracing 将使用自己的一整套光追算法, 为场景生成阴影, 反射, 折射和全局光照. 无需再使用, 反射探针, 光照探针和光照贴图.

# 3. Ambient Occlusion 环境光遮蔽

AO 效果一般是比较细节上的变化, 可以通过菜单打开 Window -> Render Pipeline -> Render Piepline Debug 面板, 选择 Lighting 选项, 找到 Fullscreen Debug Mode 选择 ScreenSpaceAmbientOcclusion 模式. 在此模型下可以更直观的观察到 AO 效果打开/关闭的效果变化.

光栅化必须依赖当前帧的深度缓冲信息(Depth Buffer), 当屏幕中物体离开屏幕或者被完全遮挡时, 针对这个物体的环境光遮蔽效果就会失效, 光追版本算法不会有这个问题.

| 属性                     | 效果         |
| ------------------------ | ------------ |
| Intensity                | 控制AO的强度 |
| Direct Lighting Strength | 直接光照强度 |
| Layer Mask               | 层遮罩       |
| Quality                  | 质量设置     |

# 4. Screen Space Reflection 屏幕空间反射

在 HDRP 中, 系统会按以下顺序会场景提供反射信息, 

Screen Space Reflection -> Reflection Probes(反射探针) -> Volume 中 HDRI Sky 配置的来自天空的反射.

当使用光栅化版本时, 如果物体离开屏幕, 则反射效果就会失效, 使用光追版本算法则不会有这个问题.

| 属性                  | 效果                                                         |
| --------------------- | ------------------------------------------------------------ |
| Minimum Smoothness    | 最小光滑度 (当材质的 Smoothness 值大于本值时才会显示反射. 本质上就是材质足够光滑才会有反射信息) |
| Smoothness Fade Start | 反射开始消失的光滑度                                         |
| Max Ray Length        | 最大射线长度 (只有当射线长度足够长, 才能命中需要参与反射计算的物体) |
| Denoise               | 降噪                                                         |

Mode 为 Performance 性能模式

| 属性            | 效果                                              |
| --------------- | ------------------------------------------------- |
| Full Resolution | 全屏分辨率 (禁用可提升运行效率, 但会增加屏幕噪点) |

Mode 为 Quality 质量模式

| 属怀         | 效果                                                         |
| ------------ | ------------------------------------------------------------ |
| Sample Count | 采样值                                                       |
| Bounce Count | 反弹数量 (举例, 如果有两面对照的镜子, 反弹数量越大, 镜子中的镜子的嵌套数量也就越多) |

# 5. Screen Space Global Illumination 屏幕空间全局光照

如果在 Volume 中启用 SSGI 无效, 需要检查默认相机的 Custom Frame Setting 或者 Project Setting 中的 HDRP Default Setting 中 Frame Settings for Camera 的配置中是否启用了 SSGI.

另外还要检查场景中所有 Material(材质)是否启用了 Receive SSR/SSGI 选项.

当使用光栅化算法时, 会在烘焙所得的光照贴图的基础上再叠加一层从屏幕空间全局光照算法上得到的全局光信息.

而一旦启用光追算法, 烘焙所得的光照贴图就无效了, 画面中的全局光照效果将都来自于 SSGI.

| 属性                               | 效果                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| Max Ray Length                     | 最大射线长度.                                                |
| Clamp Value                        | 强制数值. (如果发现启用效果后屏幕偏暗, 可以加大该数值. 但数值越大, 噪点就可能越多) |
| Denoise                            | 降噪功能                                                     |
| Denoise - Half Resolution Denoiser | 降噪时应用一半的当前分辨率                                   |
| Denoiser Radius                    | 降噪半径                                                     |
| Second Denoiser Pass               | 二次降噪                                                     |

Mode 为 Performance 性能模式

| 属性            | 效果                                                         |
| --------------- | ------------------------------------------------------------ |
| Full Resolution | 全分辨率. (启用时, 会在每一帧为每个像素指定一条射线. 关闭时, 则会为每四个像素指定一条射线) |
| Upscale Radius  | 提升半径值. (HDRP 计算全局光照时, 会使用的周边临近物体的数量, 半径值越大, 参与计算的临近物体就会越多) |

Mode 为 Quality 质量模式

| 属性         | 效果                                         |
| ------------ | -------------------------------------------- |
| Sample Count | 采样数. (控制每帧中每个像素发出的射线数量)   |
| Bounce Count | 反弹次数. (控制光追射线在物体表面的反弹次数) |

# 6. Light Cluster 结构

要让 Light Cluster 有效, 在 Volume 中至少需要启用以下几个重载之一:

- Screen Space Reflection
- Screen Space Global Illumination
- Recursive Rendering
- SubSurface Scattering

因为这几个重载用到了 Light Cluster.

Light Cluster 是以上几个功能的光追版本的基础设施.

当光追射线与物体表面相遇时, 需要知道周围空间中的灯光才能将它们用于具体的光追计算. HDRP 会在计算当前光追效果时, 以当前相机的位置为中心点, 在相机周围创建一个与坐标轴对齐的网格结构. 这个网格结构由多个单元格组成, 每个单元格保存了影响此区域的所有光照信息.

| 属性                 | 效果                            |
| -------------------- | ------------------------------- |
| Camera Cluster Range | 控制网格结构离开相机的最远距离. |

该选项主要是用于观察每个单元格中实际的灯光数量是否超过了配置中的最大灯光数量 (最大配置为24).

单元格中最大灯光数量选项在:

Project Settings -> Quality -> HDRP -> 当前的配置信息 (HDRPRaytracing) 中的 Lighting -> Lights 中的 Maximum Lights per Cell (Ray Tracing) .

在 Render Pipeline Debug 中, Fullscreen Debug Mode 使用 LightCluster 后, 如果该单元格的实际灯光数超过配置的最大灯光数时, 该区域就会出现漏光现象, 在 LightCluster Mode 下整个单元格会变成红色.

另外可以通过在 LightCluster Mode 中观察网格覆盖区域(因为覆盖区域是以当前相机为中心点扩展的), 如果网格区域未覆盖到, 也会有漏光现象.