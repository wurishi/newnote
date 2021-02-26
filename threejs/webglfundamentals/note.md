[link](https://webglfundamentals.org/webgl/lessons/zh_cn/)

```bash
# 首次运行先生成 dll
npx webpack --config webpack.dll.config.js
# 开启 webpack 测试服务器
npx webpack-dev-server
```

# 基础概念

## 一. WebGL 基础概念

WebGL 经常被当成 3D API, 人们总想"我可以使用 WebGL 和一些神奇的东西做出炫酷的 3D 作品". 事实上 WebGL 仅仅是一个光栅化引擎, 它可以根据你的代码绘制出点, 线和三角形. 想要利用 WebGL 完成更复杂任务, 取决于你能否提供合适的代码, 组合使用点, 线和三角形代替实现.

WebGL 在电脑的 GPU 中运行. 因此你需要使用能够在 GPU 上运行的代码. 这样的代码需要提供成对的方法. 每对方法中一个叫顶点着色器, 另一个叫片断着色器, 并且使用一种和 C 或 C++ 类似的强类型的语言 GLSL (GL 着色语言). 每一对组合起来称作一个 program (着色程序).

顶点着色器的作用是计算顶点的位置. 根据计算出的一系列顶点位置, WebGL 可以对点, 线和三角形在内的一些图元进行光栅化处理. 当对这些图元进行光栅化处理时需要使用片断着色器方法. 片断着色器的作用是计算出当前绘制图元中每个像素的颜色值.

几乎整个 WebGL API 都是关于如何设置这些成对方法的状态值以及运行它们. 对于想要绘制的每个对象, 都需要先设置一系列状态值, 然后通过 `gl.drawArrays`或 `gl.drawElements`运行一个着色方法对, 使得着色器对能够在 GPU 上运行.

这些方法对所需的任何数据都需要发送到 GPU,  这里有着色器获取数据的4种方法.

1. 属性(Attributes)和缓冲

   缓冲是发送到 GPU 的一些二进制数据序列, 通常情况下缓冲数据包括位置, 法向量, 纹理坐标, 顶点颜色值等. 你可以用来存储任何数据.

2. 全局变量(Uniforms)

   全局变量在着色程序运行前赋值, 在运行过程中全局有效.

3. 纹理(Textures)

   纹理是一个数据序列, 可以在着色程序运行中随意读取其中的数据. 大多数情况存放的是图像数据, 但是纹理仅仅是数据序列, 你也可以随意存放除了颜色数据以外的其它数据.

4. 可变量(Varyings)

   可变量是一种顶点着色器给片断着色器传值的方式, 依照渲染的图元是点, 线还是三角形, 顶点着色器中设置的可变量会在片断着色器运行中获取不同的插值.

#### WebGL Hello World

WebGL 只关心两件事, 裁剪空间中的坐标值和颜色值. 使用 WebGL 只需要给它提供这两个东西. 你需要提供两个着色器来做这两件事, 一个顶点着色器提供裁剪空间坐标值, 一个片断着色器提供颜色值.

要注意, 无论你的画布有多大, 裁剪空间的坐标范围永远是-1到1.

##### 初始化代码

###### 1. 顶点着色器

```glsl
// 一个属性值, 将会从缓冲中获取数据
attribute vec4 a_position;

// 所有着色器都有一个 main 方法
void main() {
  // gl_Position 是一个顶点着色器主要设置的变量
  gl_Position = a_position;
}
```

如果用 JavaScript 代替 GLSL, 当它运行时, 它做了类似的事情:

```js
// 伪代码
const positionBuffer = [
    0, 0, 0, 0,
    0, 0.5, 0, 0,
    0.7, 0, 0, 0,
];
const attributes = {};
let gl_Position;

function drawArrays(..., offset, count) {
    const stride = 4;
    const size = 4;
    for(let i = 0; i < count; i++) {
        // 从 positionBuffer 复制接下来的4个值给a_position属性
        const start = offset + i * stride;
        attributes.a_position = positionBuffer.slice(start, start + size);
        runVertexShader(); // 运行顶点着色器
        
        doSomethingWith_gl_Position();
    }
}
```

实际情况没有这么简单, 因为 `positionBuffer`将会被转换成二进制数据, 所以真实情况下从缓冲中读取数据会有些麻烦, 这个例子只是用来参考顶点着色器是怎么执行的.

###### 2. 片断着色器

```glsl
// 片断着色器没有默认精度, 需要设置一个精度
// mediump 代表 "medium precision" 中等精度
precision mediump float;

void main() {
  // gl_FragColor 是一个片断着色器主要设置的变量
  gl_FragColor = vec4(1, 0, 0.5, 1); // 红紫色
}
```

这里我们设置 `gl_FragColor`为 `1, 0, 0.5, 1`它们分别代表红色, 绿色, 蓝色和阿尔法通道值. 在 WebGL 中的颜色范围从 0 到 1.

有了两个着色器方法后, 就可以开始使用 WebGL 了.

###### 3. 创建 WebGL 渲染上下文 (WebGLRenderingContext)

首先需要一个 canvas (画布)对象, 并从中创建一个 WebGL 渲染上下文.

```js
const canvas = WebGLUtils.createCanvas();
const gl = canvas.getContext('webgl');
if (!gl) {
  // 不能使用 WebGL!
}
```

###### 4. 编译着色器并提交到 GPU

获得 gl 后, 需要编译着色器然后提交到 GPU. 着色器的代码本质上就是字符串, 你可以通过利用 JavaScript 创建字符串的方式创建 GLSL 字符串, 用 AJAX, 用多行文本数据等都可以.

事实上, 大多数三维引擎是在运行时利用模板, 串联等方式创建 GLSL 的. 本例中不需要这么复杂.

```js
// 编译顶点着色器
const vertexShader = WebGLUtils.compileShader(gl, vertex, gl.VERTEX_SHADER);
// 编译片断着色器
const fragmentShader = WebGLUtils.compileShader(gl, fragment, gl.FRAGMENT_SHADER);
```

###### 5. 将两个着色器链接到一个着色程序

```js
const program = WebGLUtils.createProgram(gl, vertexShader, fragmentShader);
```

现在我们已经在 GPU 上创建了一个 GLSL 着色程序, 我们还需要给它提供数据. WebGL 的主要任务就是设置好状态并为 GLSL 着色程序提供数据. 

###### 6. 寻找属性位置

在这个例子中, GLSL 着色程序的唯一输入是一个属性值 `a_position`, 所以接下来做的第一件事就是从刚才创建的 GLSL 着色程序中找到这个属性值所在的位置.

```js
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
```

寻找属性位置应该在初始化的时候完成, 而不是在渲染循环中.

###### 7. 创建缓冲

属性值是从缓冲中获取数据的, 所以要创建一个缓冲.

```js
const positionBuffer = gl.createBuffer();
```

###### 8. 绑定缓冲

WebGL 通过绑定点来操控全局范围内的数据, 你可以把绑定点想象成一个 WebGL 内部的全局变量. 首先绑定一个数据源到绑定点, 然后可以引用绑定点指向该数据源. 绑定位置信息缓冲 (下面的绑定点就是 `ARRAY_BUFFER`).

```js
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
```

###### 9. 通过绑定点向缓冲中存放数据

```js
const positions = [
    0, 0, 
    0, 0.5, 
    0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
```

这里首先有一个 JavaScript 数组的 `positions`, 因为 WebGL 需要强类型数据, 所以用 `new Float32Array(positions)`创建了 32 位浮点型数据序列, 并从 `positions`中复制数据到序列中, 然后 `gl.bufferData`复制这些数据到 GPU 的 `positionBuffer`对象上. 它最终会传递到 `positionBuffer`上是因为在前一步已经将它绑定到 `ARRAY_BUFFER`这个绑定点上了.

最后一个参数 `gl.STATIC_DRAW`是提示 WebGL 我们将怎么使用这些数据. WebGL 会根据提示做出一些优化. `gl.STATIC_DRAW`提示 WebGL 我们不会经常改变这些数据.

以上的代码是**初始化代码**, 这些代码在页面加载时只会运行一次, 接下来的代码是**渲染代码**, 这些代码需要在每次渲染或者绘制时执行.

##### 渲染代码

###### 10. 调整画布尺寸

在绘制之前, 我们应该调整画布的尺寸以匹配它的显示尺寸(画布和图片一样有两个尺寸, 一个是它拥有的实际像素个数, 另一个是它显示的大小). 应该尽可能的使用 CSS 设置所需画布的显示大小, 因为它相对其他方式更灵活.

```js
WebGLUtils.resizeCanvasToDisplaySize(canvas, true);
```

###### 11. 裁剪空间坐标对应到画布像素坐标

```js
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
```

这样等于告诉 WebGL 裁剪空间的 `-1 -> +1` 分别对应到 x 轴的 `0 -> gl.canvas.width`和 y 轴的 `0 -> gl.canvas.height`.

###### 12. 清空画布

```js
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
```

###### 13. 运行着色程序

```js
gl.useProgram(program);
```

###### 14. 告诉 WebGL 怎么从缓冲中获取数据给着色器中的属性

首先要启用对应的属性

```js
gl.enableVertexAttribArray(positionAttributeLocation);
```

然后指定从缓冲中读取数据的方式

```js
// 将绑定点绑定到缓冲数据
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 告诉属性怎么从 positionBuffer 中读取数据 (ARRAY_BUFFER)
const size = 2; // 每次迭代运行提取两个单位数据
const type = gl.FLOAT; // 每个单位数据类型是 32位浮点型
const normalize = false; // 不需要归一化数据
const stride = 0; // 0 = 移动单位数量 * 每个单位占用内存 (sizeof(type)), 即每次迭代运行运行多少内存到下一个数据开始点
let offset = 0; // 从缓冲起始位置开始读取
gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
);
```

一个隐藏信息是, `gl.vertexAttribPointer`是将属性绑定到当前的 `ARRAY_BUFFER`. 换句话说, 就是属性绑定到了 `positionBuffer`上. 这就意味着, 在这之后即使将绑定点 `ARRAY_BUFFER`绑定到其他数据上, 该属性 `positionAttributeLocation`依然是从 `positionBuffer`上读取数据的.

要注意在 GLSL 的顶点着色器中的 `a_position`属性的数据类型是 `vec4`, `vec4`是一个有四个浮点数据的数据类型, 在 JavaScript 中可以把它想象成 `a_position = {x:0, y:0, z:0, w:0}`. 之前设置了 `size = 2`, 由于属性的默认值是 `0,0,0,1`, 所以属性将会从缓冲中获取前两个值(x和y), z和w还会是默认值0和1.

###### 15. 运行 GLSL 着色程序

```js
const primitiveType = gl.TRIANGLES; // 图元类型
offset = 0;
const count = 3;
gl.drawArrays(primitiveType, offset, count);
```

因为 `count = 3`, 所以顶点着色器将会运行三次, 每次从缓冲中读取两个值赋值给属性 `a_position.x`和 `a_position.y`

另外因为我们设置了图元类型为 `gl.TRIANGLES(三角形)`, 顶点着色器每运行三次, WebGL 将会根据三个 `gl_Position`值绘制一个三角形, 并且不论画布大小是多少, 在裁剪空间中每个方向的坐标范围都是 -1 到 1.

WebGL 将会把顶点着色器中的值转换到屏幕空间上, 所以如果画布大小是 400x300, 我们会得到类似以下的转换.

```
裁剪空间			屏幕空间
0  , 0		->		200, 150
0  , 0.5	->		200, 225
0.7, 0		->		340, 150
```

现在 WebGL 将渲染出这个三角形, 绘制每个像素时, WebGL 都会调用片断着色器, 因为片断着色器只是简单设置 `gl_FragColor = vec4(1, 0, 0.5, 1) `, 由于画布每个通道宽度为8位, 这表示 WebGL 最终在画布上会绘制 `rgba(255, 0, 127, 255)`.

上例中, 顶点着色器只是简单的传递了位置信息, 如果想做三维渲染, 其实需要提供合适的着色器将三维坐标转换到裁剪空间坐标上, 因为 WebGL 只是一个光栅化 API.

#### 像素坐标转换到裁剪空间

[代码](./webglhelloworldp/index.ts)

WebGL 认为左下角是 0, 0. 如果想像传统二维 API 那样起点在左上角, 只需要翻转 y 轴即可.

```diff
- gl_Position = vec4(clipSpace, 0, 1);
+ gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
```

#### 随机位置, 随机大小, 随机颜色的矩形

[代码](./webglhelloworld2/index.ts)

## 二. WebGL 工作原理

WebGL 在 GPU 上的工作基本上分为两部分, 第一部分是将顶点 (或数据流)转换到裁剪空间坐标, 第二部分是基于第一部分的结果绘制像素点.

当你调用:

```js
const primitiveType = gl.TRIANGLES;
const offset = 0;
const count = 9;
gl.drawArrays(primitiveType, offset, count);
```

这里的9表示"处理9个顶点", 所以将会有9个顶点被转换.

![2.vertex-shader-anim](assets/2.vertex-shader-anim.gif)

左侧是你提供的数据, 中间的顶点着色器 (Vertex Shader) 是你写进 GLSL 的一个方法, 每个顶点调用一次, 在这个方法中做一些数学运算后设置到一个特殊的 `gl_Position`变量, 这个变量就是该顶点转换到裁剪空间中的坐标值, GPU 接收该值并将其保存起来.

假设你正在画三角形, 顶点着色器每完成三次顶点处理, WebGL 就会用这三个顶点画一个三角形. 它计算出这三个顶点对应的像素后, 就会光栅化这个三角形, "光栅化"其实就是"用像素画出来"的花哨叫法. 对于每一个像素, 它会调用你的片断着色器询问你需要使用什么颜色, 通过给片断着色器中的一个特殊变量 `gl_FragColor`设置颜色值, 将实现自定义像素颜色.

使用它们可以做出非常有趣的东西, 到目前为止的例子中, 处理每个像素时片断着色器可用的信息很少, 幸运的是可以给它传递更多信息, 想要从顶点着色器传值到片断着色器, 可以定义"可变量 (varyings)".

[代码](./2/index.ts)

首先在顶点着色器定义一个 varying(可变量)用来给片断着色器传值.

```glsl
attribute vec2 a_position;
uniform mat3 u_matrix;
varying vec4 v_color;

void main() {
    gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);

    // 从裁减空间转换到颜色空间
    // 裁判空间范围 -1.0 到 +1.0
    // 颜色空间范围 0.0 到 1.0
    v_color = gl_Position * 0.5 + 0.5;
}
```

然后在片断着色器中定义同名 varying(可变量).

```glsl
precision mediump float;

varying vec4 v_color;

void main() {
    gl_FragColor = v_color;
}
```

WebGL 会将同名的可变量从顶点着色器输入到片断着色器中.

要注意的是, 我们只计算了三个顶点, 调用了三次顶点着色器, 所以也只计算出了三个颜色值, 但是最终显示的三角形却有很多颜色, 这就是称之为可变量 varying 的原因.

WebGL 先获得顶点着色器中计算的三个颜色值, 在光栅化三角形时将会根据这三个值进行插值. 每一个像素在调用片断着色器时, 可变量的值是与之对应的插值.

顶点

| x    | y    |
| ---- | ---- |
| 0    | -100 |
| 150  | 125  |
| -175 | 100  |

写入 gl_Position 的值

| x      | y      |
| ------ | ------ |
| 0.000  | 0.660  |
| 0.750  | -0.830 |
| -0.875 | -0.660 |

写入 v_color 的值

| r      | g     | b    |
| ------ | ----- | ---- |
| 0.5000 | 0.830 | 0.5  |
| 0.8750 | 0.086 | 0.5  |
| 0.0625 | 0.170 | 0.5  |



# 杂项

## WebGL 设置和安装

## WebGL 样板

WebGL 复杂的原因之一是需要两个方法, 一个顶点着色器和一个片断着色器. 这两个方法通常是在 GPU 上运行的, 这也是高速运行的保障. 所以它们是一种自定义语言, 目的是能够在 GPU 上良好的运行. 并且这两个方法需要编译并链接在一起, 而这个过程在 99% 的 WebGL 应用中是一样的.

所以可以将编译着色器, 链接2个着色器到一个着色器程序中等的代码作为一个工具类提供, 减少项目中样板代码.

[代码](./webgl-utils.ts)

## WebGL 重置画布尺寸

每个画布都有两个尺寸, 一个是 drawingbuffer 的尺寸, 这个表示画布中有多少个像素. 另一个是画布显示的尺寸, 由 CSS 决定画布显示的尺寸.

可以通过两种方式设置画布的 drawingbuffer 尺寸.

一种是使用 HTML:

```html
<canvas id="c" width="400" height="300"></canvas>
```

另一种是使用 JavaScript:

```js
const canvas = document.querySelector('#c');
canvas.width = 400;
canvas.height = 300;
```

如果没有使用 CSS 影响画布的显示尺寸, 则画布的显示尺寸和 drawingbuffer 尺寸相同. 所以上述两个例子中画布的 drawingbuffer 尺寸和显示尺寸都是 400x300.

下方的例子则会让画布的显示尺寸是 400x300, drawingbuffer 是 10x15.

```html
<canvas id="#c" width="10" height="15" style="width: 400px; height: 300px;"></canvas>
```

此时画布中的图像是模糊的, 因为浏览器得到了一个 10x15 像素的画布, 并将它拉伸到 400x300 像素, 并且在拉伸过程中进行了插值.

如果要让画布的 drawingbuffer 的尺寸和画布显示尺寸一致, 可以使用 `clientWidth`和 `clientHeight`属性, 这两个属性是所有 HTML 元素都有的属性, 可以让 JavaScript 获取元素显示的尺寸.

```typescript
export function resize(canvas: HTMLCanvasElement): void {
  // 获取浏览器中画布的显示尺寸
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // 检测尺寸是否相同
  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    // 设置为相同尺寸
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}
```

修改后会发现显示的内容并没有覆盖整个区域, 原因是重置画布尺寸的时候还需要调用 `gl.viewport`设置视域, `gl.viewport`告诉 WebGL 如何将裁剪空间(-1 到 +1)中的点转换到像素空间, 也就是画布内的 drawingbuffer. 当第一次创建 WebGL 上下文的时候 WebGL 会设置视域大小和画布大小匹配, 但是在那之后如果改变了画布大小就需要你自己去设置 WebGL 新的视域大小.

```typescript
function drawScene() {
    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
```

可能会有疑问, 为什么 WebGL 不在画布尺寸改变的时候自动修改视域? 原因是它并不知道你如何以及为什么使用视域, 你可以渲染到一个帧缓冲或者做其他的事情需要不同的视域尺寸.

#### HD-DPI 该怎么办?

当使用 CSS 像素值声明画布的尺寸时, 这个叫做 CSS 像素值, 但它可能并不是真实像素值. 大多数现代智能手机有叫做高清显示(HD-DPI)或苹果叫它"Retina Display"的特性. 对于文本和大多数 CSS 样式浏览器会自动绘制 HD-DPI 图形, 但是对于 WebGL, 由于是由你来控制绘制图形的, 所以需要你自己来决定是绘制一般分辨率还是 "HD-DPI" 品质.

可以通过 `window.devicePixelRatio`的值获得1个 CSS 像素对应多少个实际像素.

```typescript
export function resize(canvas: HTMLCanvasElement): void {
  // 1个CSS像素对应多少个实际像素
  const realToCSSPixels = window.devicePixelRatio;

  // 获取浏览器中画布的显示尺寸
  const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
  const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  // 检测尺寸是否相同
  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    // 设置为相同尺寸
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}
```

是否需要根据 HD-DPI 做调整取决于你自己, 如果想要绘制用于打印的图形, 可能会希望支持 HD-DPI, 如果是游戏, 可能会想给用户多种选择, 让他们根据自己的机器调整配置, 控制显示分辨率.