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

在 Lighting 下 Screen Space Ambient Occlusion 也已经选上了, 表示当前项目已经支持屏幕空间的环境光遮敝效果.

另外在 Lighting 可以打开 Screen Space Global Illumination 用来开启基于屏幕空间的全局光照.

在 Lighting -> Reflections 下可以找到 Screen Space Reflection 用来打开基于屏幕空间的反射功能, 如果需要支持透明度, 还要打开 Transparent 选项.

在 Lighting -> Shadows 下找到 Screen Space Shadows 打开基于屏幕空间的阴影功能.

此时 Warning 部分已被修复, 但是屏幕空间反射会提示默认相机的帧设置里仍然禁用, 此时在 Project Settings -> HDRP Default Settings 下找到 Default Frame Settings For, 选择 Camera, 在 Lighting 中检查选项是否和上述配置文件开启的相同. 最后可以重新打开 HD Render Pipeline Wizard 面板检查.

## 1.8 确保 Unity 的 Scene 下能够观察到接近 HDRP + DXR 的预览效果

在 Scene 面板, 选择 Camera 图标, 找到 Camera Anti-aliasing 选项, 选择 Temporal Antialiasing 选项.

此外, 要让这个选项生效, 还需要在 Scene 面板的 effect 小图标里面勾上 Always Refresh 选项.