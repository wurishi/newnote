# 2. 渲染流程

OpenGL 渲染流程：

- CPU: 
  - 模型文件 (fbx, obj 等)：包含了 uv, 顶点位置，法线，切线等渲染需要的信息。
  - MeshRender：导入模型文件后，Unity 会自动附加 MeshRender 组件，该组件负责将上述渲染需要的信息传递到 GPU。一般有二种：
    - SkinMeshRender：带蒙皮的骨骼。
    - MeshRender和MeshFilter：MeshRender 将顶点信息传递到 GPU, MeshFilter 通过 `mesh`属性将指定的形状顶点传递到 GPU。
- GPU:
  - 渲染管线
    - 顶点着色器：计算顶点颜色，将物体坐标系转换到相机坐标系。
    - 光栅化：将顶点转换为像素。
    - 片段着色器：纹理采样（从纹理像素赋给像素），像素与灯光进行计算。
      - 像素由 RGBA 四通道组成。
      - 顶点之间的像素颜色将根据顶点作插值获得。
    - Alpha 测试：挑选合格的像素显示。（根据 alpha 通道决定是否需要显示）
    - 模板测试：挑选合格的像素显示。（根据模板信息决定是否需要显示）
    - 深度测试：挑选合格的像素显示。（根据深度决定是否需要显示）
    - Blend：将当前需要渲染的像素与之前已经渲染出来的像素进行混合运算。
    - GBuffer：包含 RGBA，模板值，深度值等等信息的缓冲池。一般包含4组信息。（假设屏幕大小为800*600，GBuffer 的大小为 float(800 * 600 * 4)
    - FrontBuffer：前一次写入的 Buffer 信息。（假设屏幕大小为800*600 ，大小为 float(800 * 600)）
    - FrameBuffer：当前帧写入的 Buffer 信息。与 FrontBuffer 二者交替接受 GBuffer 中最新的 Buffer 数据。
    - 显示器

# 3. Shader 结构

## 3.1 Shader 语言

常见的有以下几种：

- OpenGL: SGI 的跨平台语言。GLSL（OpenGL Shader Language）
- DirectX: 微软平台独占的，性能更佳。HLSL（High Level Shader Language）
- CG: 微软与英传达合作开发的基于 C 语言的跨平台语言。

## 3.2 Unity 支持的 Shader 语言

OpenGL，DX，CG 都支持。

- CG 和 HLSL 包含在 `CGPROGRAM ... ENDCG`语法块内。
- GLSL 包含在 `GLSLPROGRAM ... ENDGLSL`语法块内。
- Unity 自带的 Shader Lab。

## 3.3 Unity Shader 分类

- Fixed Shader （Shader 1.0）：主要是提供了功能的开关。
- 顶点/片断着色器 (Shader 2.0) ：功能中的公式可以自定义。
- Surface Shader 。

## 3.4 Shader 的结构

```glsl
// Shader的名字会出现在 Unity 的 Inspector 中选择 Shader 的菜单中。可以用 "/" 作为分隔形成菜单路径
Shader "Shader的名字" {
  [Properties] // 属性
  
  // 可能存在多个 subshader。Unity 会在所有 subshader 列表中选择当前环境符合运动条件的第一个 subshader 运行。
  Subshaders {
    Subshader {
      [Tags] // 标签
      [CommonState] // 提供给多个 Pass 块使用的设置
      Pass {} // 可能有多个 Pass ，每个 Pass 触发一次渲染过程
    }
  }
  
  [Fallback] // 降级的着色器
}
```

# 4. 属性定义

