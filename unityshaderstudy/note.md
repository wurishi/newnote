# Unity Shader 的学习笔记

# 1

1.1 shader 是运行在 GPU 上的程序.

1.2 目前主流针对 GPU 编程的技术有:

- HLSL: 微软研发, 只能供 Direct3D 使用.
- GLSL: 是用来在 OpenGL 中编程的着色器语言
- CG: NVIDIA 和微软合作开发, 独立的三维编程接口, 不依赖于 D3D 和 OpenGL, 可以和这两种图形渲染库结合起来使用.

1.3 Unity 中的着色器可以分为三类

- 固定管线着色器: 为了兼容老一代 GPU 而设计, 最早的图形学版本都是基于这个着色器来编写
- 顶点片元着色器: 比固定管线着色器要新, 功能强大, 可编程, 缺点是不支持光照
- 表面着色器: Unity 官方推荐的着色器, 可编程, 支持光照, 自定义光照模型, 自由度高

1.4 Unity shader 编程语言:

ShaderLab 基本语法结构:

```glsl
Shader "name" {
    [Properties] // 属性
    Subshaders {} // 子着色器
    [Fallback] // 降级着色器
}
```

1.4.1 在 Properties 块中代表的是着色器中使用到的所有属怀, 这些参数可以在 Inspector 中进行编辑和调整.

Properies 的示例语法:

```glsl
属性名("Inspector显示的名字", 数据类型) = 初始值
数据类型有:
Range(min, max), Float, Int, Color(num, num, num, num), Vector(num, num, num, num), 2D, 3D 等
```

真正用于呈现渲染的代码都放在 SubShader 块, 其主要由可选标签, 通用状态以及一个通道列表构成.

每个 Shader 都包含一个 SubShader 列表, 游戏运行时会根据实际的运行环境从上到下选择一个合适的 SubShader 来使用. 



1.4.2 SubShader 语法结构:

```glsl
SubShader {
    [Tags]
    [CommonState]
    Pass {}
}
```

重要的代码和核心渲染逻辑基本都在 Pass 块中, 一个 SubShader 可以包含多个 Pass 块, Pass 的语法:

```glsl
Pass {
    [Name and Tags]
    [RenderSetup] // 可以设置显卡的各种状态
    // 例如:
    // Lighting (光照, 开启或者关闭对应 On 和 Off)
    // Material {材质块}
    // SeparateSpecular (开启或者关闭顶点光照相关的镜面高光颜色, 允许高光有不同的颜色)
    [TextureSetup]
}
```

1.4.3 最后是使用降级着色器 Fallback , 作用是当编写的 Shader 无法完成渲染任务时备选的渲染方案, 以防渲染程序报错崩溃.

