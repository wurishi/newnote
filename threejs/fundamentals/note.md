[link](https://threejsfundamentals.org/threejs/lessons/zh_cn/)

```bash
# 首次运行先生成 dll
npx webpack --config webpack.dll.config.js
# 开启 webpack 测试服务器
npx webpack-dev-server
```



# Basics

## 1. Three.js 基础

Three.js 经常会和 WebGL 混淆, WebGL 是一个只能画点, 线和三角形的非常底层的系统. 想要用 WebGL 来做一些实用的东西通常需要大量的代码, 而这时就是 Three.js 的用武之地了, three.js 其实是使用 WebGL 来绘制三维效果的, 但它还封装了诸如场景, 灯光, 阴影, 材质, 贴图, 空间运算等一系列功能, 让你不必要再从底层 WebGL 开始写起.

Three.js 应用需要创建很多对象, 并且将他们关联在一起. 下图是一个基础的 Three.js 应用结构:

<img src="assets/1.png" alt="1" style="zoom:150%;" />

- 首先有一个渲染器(Renderer). 这可以说是 Three.js 的主要对象, 需要传入一个场景(Scene)和一个摄像机(Camera)到渲染器中, 然后它会将摄像机视椎体(frustum)中的三维场景渲染成一个二维图片显示到画布(Canvas)上.

- 其次有一个场景图, 它是一个树状结构, 包含了很多对象. 比如上图中的场景包含了一个场景(Scene)对象, 多个网格(Mesh)对象, 光源(Light)对象, 群组(Group), 三维物体(Object3D), 和摄像机(Camera)对象. 一个场景(Scene)对象定义了场景图最基本的要素, 并包含了背景(backgroud)和雾(fog)等属性. 这些对象通过一个层级关系明确的树状结构来展示出各自的位置和方向. 子对象的位置和方向总是相对于父对象而言的. 比如说汽车的轮子是汽车的子对象, 这样移动和定位汽车时, 也会自动移动轮子.

  注意图中的摄像机(Camera)是一半在场景图中, 一半在场景图外的. 这表示在 Three.js 中, 摄像机(Camera)对象和其他对象不同的是, 它不一定要在场景图中才能起作用. 相同的是, 当摄像机(Camera)作为其他对象的子对象时, 同样会继承它的父对象的位置和朝向.

- 网格(Mesh)对象可以理解为用一种特定的材质(Material)来绘制的一个特定的几何体(Geometry). 材质(Material)和几何体(Geometry)可以被多个网格(Mesh)对象使用. 比如在不同的位置画两个蓝色立方体, 会需要两个网格(Mesh)对象来代表每一个立方体的位置和方向. 但只需一个几何体(Geometry)来存放立方体的顶点数据, 和一种材质(Material)来定义立方体的颜色为蓝色就可以了. 两个风格(Mesh)对象都引用了相同的几何体(Geometry)和材质(Material).

- 几何体(Geometry)对象顾名思义代表一些几何体, 如球体, 立方体, 平面, 狗, 猫, 人, 树, 建筑等物体的顶点信息. Three.js 内置了许多基本几何体. 你也可以创建自定义的几何体或从文件中加载几何体.

- 材质(Material)对象代表绘制几何体表面的属性, 包括使用的颜色, 光亮程度等. 一个材质(Material)可以引用一个或多个纹理(Texture), 纹理可以简单理解为包裹到几何体的表面的图像.

- 纹理(Texture)对象通常表示一幅要么从文件中加载, 要么在画布(Canvas)上生成, 要么由另一个场景渲染出的图像.

- 光源(Light)对象代表不同种类的光.

学习大多数编程语言的时候, 第一件事就是打印输出一个 "Hello World!". 对于三维来说, 第一件事往往就是创建一个三维的立方体. 所以有了以上基本概念后, 就来画个下图所示的 "Hello Cube"吧.

![1.1](assets/1.1.png)



Three.js 需要使用 Canvas 标签来绘制, 所以要先创建并获取它然后传给 Three.js.

```typescript
const canvas = document.createElement('canvas');
document.body.appendChild(canvas); // 也可以是 HTML 中已有的 canvas 标签, 通过 document.querySelector 获取后传给 Three.js
const renderer = new THREE.WebGLRenderer({ canvas });
```

拿到 canvas 后, 需要创建一个 WebGL渲染器(WebGLRenderer). 渲染器负责将你之后提供的所有数据渲染绘制到 canvas 上. 之前还有其他渲染器, 比如 *CSS 渲染器*(CSSRenderer), *Canvas 渲染器*(CanvasRenderer). 将来可能会有 *WebGL2 渲染器*(WebGL2Renderer)或 *WebGUP 渲染器*(WebGPURenderer). 目前在 Three.js 中我们会使用 *WebGL 渲染器*(WebGLRenderer), 它将通过 WebGL 将三维空间渲染到 canvas 上.

注意这里的一个细节. 如果没有给 Three.js 传递 canvas, Three.js 会自己创建一个, 但此时就需要你手动将它添加到 DOM 中. 如下:

```typescript
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement); // 必须将 Three.js 自己创建的 canvas 添加到 DOM 中.
```

接下来我们需要一个透视摄像机(PerspectiveCamera).

```typescript
const fov = 75;
const aspect = 2; // 相机默认值
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

- fov: 是视野范围(field of view)的缩写, 上述代码中是指垂直方向为75度. 注意, Three.js 中大多数的角用弧度表示, 但是因为某些原因, 透视摄像机使用角度表示.
- aspect: 是指定画布的宽高比, 默认情况下画布是300x150像素, 所以宽高比为300/150或者说为2.
- near 和 far: 代表近平面和远平面, 它们限制了摄像机面朝方向的可绘区域. 任何距离小于或超过这个范围的物体都将被裁剪掉(不绘制).

这四个参数定义了一个视椎(frustum). 视椎(frustum)是指一个像被削去顶部的金字塔形状. 换句话说, 可以把视椎(frustum)想象成其他三维形状如球体, 立方体, 棱柱体, 截椎体.

![1.frustum](assets/1.frustum.svg)

近平面和远平面的高度由视野范围决定, 宽度由视野范围和宽高比决定.

视椎体内部的物体将被绘制, 视椎体外的东西将不会被绘制.

摄像机默认指向Z轴负方向, 上方向朝向Y轴正方向. 默认我们会把立方体放置在坐标原点, 所以我们需要往后移一下摄像机才能显示出物体. 例如:

![1.scene.down](assets/1.scene.down.svg)

```typescript
camera.position.z = 2;
```

我们看到摄像机的位置在 `z = 2`. 它朝向Z轴负方向. 我们的视椎体范围是从摄像机前方0.1到5. 因为这张图是俯视图, 视野范围会受到宽高比的影响. 画布的宽度是高度的两倍, 所以水平视角会比我们设置的垂直视角75度要大.

然后我们创建一个场景(Scene). 场景(Scene)是 Three.js 的基本的组成部分. 需要 Three.js 绘制的东西都需要加入到场景中.

```typescript
const scene = new THREE.Scene();
```

然后创建一个包含盒子信息的立方几何体(BoxGeometry). 几乎所有希望在 three.js 中显示的物体都需要一个包含了组成三维物体的顶点信息的几何体.

```typescript
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
```

然后创建一个基本的材质并设置它的颜色, 颜色的值可以用 css 方式和十六进制来表示.

```typescript
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
```

再创建一个网格(Mesh)对象, 它包含了:

1. 几何体(Geometry): 物体的形状.
2. 材质(Material): 如果绘制物体, 光滑还是平整, 什么颜色, 什么贴图等等.
3. 对象在场景中相对于它父对象的位置, 朝向和缩放.

```typescript
const cube = new THREE.Mesh(geometry, material);
```

最后我们将网格添加到场景中.

```typescript
scene.add(cube);
```

之后将场景和摄像机传递给渲染器来渲染出整个场景.

```typescript
renderer.render(scene, camera);
```

![1.example](assets/1.example.png)

这时很难看出来这是一个三维的立方体, 因为我们是直视Z轴的负方向, 并且立方体和坐标轴是对齐的, 所以我们只能看到一个面.

我们来让立方体旋转起来, 以便更好的在三维环境中显示. 为了让它动起来我们需要用到一个渲染循环函数 `reqeustAnimationFrame`.

```typescript
function render(time: number) {
    time *= 0.001; // 时间单位从毫秒变为秒

    cube.rotation.x = time;
    cube.rotation.y = time; // 旋转角度是弧度制的, 一圈的弧度为2∏, 所以立方体每个方向旋转一周的时间为6.28秒左右.

    renderer.render(scene, camera);

    requestAnimationFrame(render); // 调用另一个帧动画继续循环.
}
requestAnimationFrame(render);// 开始渲染循环.
```

![1.example.1](assets/1.example.1.png)

效果好了一些, 但还是很难看出是三维的. 现在添加一些光照效果, 让效果更明显一些.

先创建一个平行光.

```typescript
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
```

平行光有一个位置和目标点, 默认值都为(0, 0, 0). 我们现在把灯光的位置设为(-1, 2, 4), 让它位于摄像机前面稍微左上方一点的地方. 目标点还是(0, 0, 0), 让它朝向坐标原点方向.

另外还需要改变一下立方体的材质. MeshBasicMaterial 材质不会受到灯光的影响. 现在将它改为会受灯光影响的 MeshPhongMaterial 材质.

```diff
- const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
+ const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
```

这是新的项目结构:

![1.2](assets/1.2.png)

![1.example.2](assets/1.example.2.png)

现在可以很清楚的看出是三维立方体了.

最后我们再添加两个立方体来增添点趣味性. 每个立方体会引用同一个几何体和不同的材质, 这样每个立方体将会是不同的颜色.

[代码: 1.2.ts](1/1.2.ts)

![1.example.3](assets/1.example.3.png)

现在的项目有了这样的结构:

![1.3](assets/1.3.png)

我们有三个网格(Mesh)引用了相同的立方几何体(BoxGeometry). 每个网格(Mesh)引用一个单独的MeshPhongMaterial材质来显示不同的颜色.

# Fundamentals

## 图元

three.js 有很多图元. 图元就是一些 3D 的形状, 在运行时根据大量参数生成.

使用图元是种很常见的做法, 像使用球体作为地球, 或者使用大量盒子来绘制 3D 图形. 对于大多数 3D 应用来说, 更常见的做法是让美术在 3D 建模软件中创建 3D 模型, 像 Blender, Maya 或者 Cinema4D.

在之后的章节中会创建和加载来自 3D 建模软件的模型, 现在先仅使用基本的图元.



# Tips

# Optimization

# Solutions

# WebVR

# Reference