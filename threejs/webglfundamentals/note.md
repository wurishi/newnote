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

### 从顶点着色器传值到片断着色器

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

最后利用这三个值进行插值后传进每个像素运行的片断着色器中.

[2D代码模拟](2-fragment-shader-anim/index.ts)

### 从外部(JS)传值到片断着色器

如果想要直接通过 JavaScript 传值给片断着色器, 可以先把值传递给顶点着色器, 然后由顶点着色器再传给片断着色器.

[代码](2-1/index.ts)

```typescript
function setColors(gl: WebGLRenderingContext) {
    const [r1, b1, g1, r2, b2, g2] = [0, 0, 0, 0, 0, 0].map((v) => Math.random());

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            r1,b1,g1,1,
            r1,b1,g1,1,
            r1,b1,g1,1,
            r2,b2,g2,1,
            r2,b2,g2,1,
            r2,b2,g2,1
        ]),
        gl.STATIC_DRAW
    );
}
// 需要给每个顶点传一个颜色值, 因为传给每个三角形的点的颜色是相同的, 所以插值结果就是相同的颜色. 只需要给每个顶点传递不同的颜色, 就可以看到插值的颜色了.

function setColors(gl: WebGLRenderingContext) {
    const [r1, b1, g1, r2, b2, g2] = [0, 0, 0, 0, 0, 0].map((v) => Math.random());

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([ // 每个顶点都随机一个颜色
            Math.random(), Math.random(), Math.random(), 1,
            Math.random(), Math.random(), Math.random(), 1,
            Math.random(), Math.random(), Math.random(), 1,
            Math.random(), Math.random(), Math.random(), 1,
            Math.random(), Math.random(), Math.random(), 1,
            Math.random(), Math.random(), Math.random(), 1,
        ]),
        gl.STATIC_DRAW
    );
}

```

### 关于 buffer 和 attribute 的代码是干什么的?

缓冲操作是在 GPU 上获取顶点和其他顶点数据的一种方式. `gl.createBuffer`创建一个缓冲. `gl.bindBuffer`是设置缓冲为当前使用的缓冲. `gl.bufferData`会将数据拷贝到缓冲, 这个操作一般在初始化时完成.

一旦数据存到缓冲中, 还需要告诉 WebGL 怎么从缓冲中提取数据传给顶点着色器的属性.

要做这些, 首先需要获取 WebGL 给属性分配的地址:

```js
// 询问顶点数据应该放在哪里
const positionLocation = gl.getAttribLocation(program, 'a_position');
```

一旦知道了属性的地址, 在绘制前还需要发出三个命令:

```js
gl.enableVertexAttribArray(location); // 告诉 WebGL 我们想从缓冲中提供数据.

gl.bindBuffer(gl.ARRAY_BUFFER, someBuffer); // 将缓冲绑定到 ARRAY_BUFFER 绑定点, 它是 WebGL 内部的一个全局变量

gl.vertexAttribPointer(location, numComponents, typeOfData, normalizeFlag, strideToNextPieceOfData, offsetIntoBuffer);
// 告诉 WebGL 从 ARRAY_BUFFER 绑定点当前绑定的缓冲中获取数据. (将从 ARRAY_BUFFER 绑定点绑定的 buffer 中获取数据放到 location 里)
// 每个顶点有几个单位的数据(1-4之间)
// 单位数据类型是什么(BYTE, FLOAT, INT, UNSIGNED_SHORT 等)
// 是否标准化
// 每个数据之间要跳过多少位
// 数据在缓冲的超始位置
```

如果每个类型的数据都用一个缓冲存储, stride 和 offset 都是 0. 

对于 stride 来说, 0 表示用符合单位类型和单位个数的大小. 

对于 offset 来说, 0 表示从缓冲起始位置开始读取.

标准化标记 (normalizeFlag)适用于所有非浮点型数据. 如果传递 false 就解读原数据类型. BYTE 类型的范围是从 -128 到 127, UNSIGNED_BYTE 类型的范围是从 0 到 255, SHORT 类型的范围是从 - 32768 到 32767 等等.

如果设置为 true, 所有类型都会被转换到 -1.0 到 +1.0 之间. (UNSIGNED_BYTE 则变成 0.0 到 +1.0 之间).

最常用的标准化数据是颜色, 大多数情况颜色值范围为 0.0 到 +1.0. 如果使用4个浮点型数据存储颜色, 每个顶点的颜色将会占用 16 字节空间, 如果转换为使用4个 UNSIGNED_BYTE, 则每个顶点只需要4字节存储颜色, 省了 75% 空间.

```js
gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, true, 0, 0);

// 这些数据在存入缓冲时将被截取成 Uint8Array 类型
const r1 = Math.random() * 256;
const g1 = Math.random() * 256;
const b1 = Math.random() * 256;
const r2 = Math.random() * 256;
const g2 = Math.random() * 256;
const b2 = Math.random() * 256;

gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([
    r1, b1, g1, 255,
    r1, b1, g1, 255,
    r1, b1, g1, 255,
    r2, b2, g2, 255,
    r2, b2, g2, 255,
    r2, b2, g2, 255,
]), gl.STATIC_DRAW);
```

## 三. WebGL 着色器和 GLSL

WebGL 每次绘制需要两个着色器, 一个顶点着色器和一个片断着色器, 每一个着色器都是一个方法. 一个顶点着色器和一个片断着色器链接在一起放入一个着色程序中. 一个典型的 WebGL 应用会有多个着色程序.

### 顶点着色器

一个顶点着色器的工作是生成裁剪空间坐标值, 通常是以下的形式:

```glsl
void main() {
    gl_Position = doMathToMakeClipspaceCoordinates;
}
```

每个顶点调用一次顶点着色器, 每次调用都需要设置一个特殊的全局变量 `gl_Position`, 该变量的值就是裁减空间坐标值.

顶点着色器需要的数据, 可以通过以下三种方式获得.

1. Attributes 属性: 从缓冲中获取的数据.
2. Uniforms 全局变量: 在一次绘制中对所有顶点保持一致值.
3. Textures 纹理: 从像素或纹理元素中获取的数据.

#### Attributes 属性

最常用的方法是缓冲和属性.

创建缓冲:

```js
const buf = gl.createBuffer(); 
```

将数据存入缓冲:

```js
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, someData, gl.STATIC_DRAW);
```

在初始化时, 从着色器程序中找到属性所在地址:

```js
const positionLoc = gl.getAttribLocation(someShaderProgram, 'a_position');
```

在渲染时告诉 WebGL 怎么从缓冲中获取数据传递给属性:

```js
// 开启从缓冲中获取数据
gl.enableVertexAttribArray(positionLoc);

const numComponents = 3; // (x, y, z)
const type = gl.FLOAT; // 32位浮点数据
const normalize = false; // 不标准化
const offset = 0; // 从缓冲起始位置开始获取
const stride = 0; // 到下一个数据跳多少位内存
// 0 = 表示使用当前单位个数和单位长度 (3 * Float32Array.BYTES_PER_ELEMENT)
gl.vertexAttribPointer(positionLoc, numComponents, type, false, stride, offset);
```

最后将数据传递给 `gl_Position`:

```glsl
attribute vec4 a_position;

void main() {
    gl_Position = a_position;
}
```

属性可以用 `float, vec2, vec3, vec4, mat2, mat3, mat4`数据类型.

#### Uniforms 全局变量

全局变量在一次绘制过程中传递给着色器的值都是一样的.

在上一个例子的基础上, 给顶点着色器添加一个偏移量:

```glsl
attribute vec4 a_position;
uniform vec4 u_offset;

void main() {
    gl_Position = a_position + u_offset;
}
```

先找到全局变量的地址:

```js
const offsetLoc = gl.getUniformLocation(someProgram, 'u_offset');
```

然后在绘制前设置全局变量:

```js
gl.uniform4fv(offsetLoc, [1, 0, 0, 0]); // 向右偏移一半屏幕宽度
```

要注意的是全局变量属于单个着色程序, 如果有多个着色程序有相同的全局变量, 需要找到每个全局变量并设值. 每次调用 `gl.uniform???`时, 只会设置**当前着色程序**的全局变量, **当前着色程序**是指传递给 `gl.useProgram`的最后一个程序.

全局变量有很多类型, 对应的类型有对应的设置方法.

```js
gl.uniform1f (floatUniformLoc, v);                 // float
gl.uniform1fv(floatUniformLoc, [v]);               // float 或 float array
gl.uniform2f (vec2UniformLoc,  v0, v1);            // vec2
gl.uniform2fv(vec2UniformLoc,  [v0, v1]);          // vec2 或 vec2 array
gl.uniform3f (vec3UniformLoc,  v0, v1, v2);        // vec3
gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);      // vec3 或 vec3 array
gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);    // vec4
gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // vec4 或 vec4 array

gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // mat2 或 mat2 array
gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // mat3 或 mat3 array
gl.uniformMatrix4fv(mat4UniformLoc, false, [ 16x element array ])  // mat4 或 mat4 array

gl.uniform1i (intUniformLoc,   v);                 // int
gl.uniform1iv(intUniformLoc, [v]);                 // int 或 int array
gl.uniform2i (ivec2UniformLoc, v0, v1);            // ivec2
gl.uniform2iv(ivec2UniformLoc, [v0, v1]);          // ivec2 或 ivec2 array
gl.uniform3i (ivec3UniformLoc, v0, v1, v2);        // ivec3
gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);      // ivec3 or ivec3 array
gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);    // ivec4
gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // ivec4 或 ivec4 array

gl.uniform1i (sampler2DUniformLoc,   v);           // sampler2D (textures)
gl.uniform1iv(sampler2DUniformLoc, [v]);           // sampler2D 或 sampler2D array

gl.uniform1i (samplerCubeUniformLoc,   v);         // samplerCube (textures)
gl.uniform1iv(samplerCubeUniformLoc, [v]);         // samplerCube 或 samplerCube array
```

##### 数组

一个数组可以一次设置所有的全局变量.

```js
// 着色器里
uniform vec2 u_someVec2[3];

// JavaScript 初始化时
const someVec2Loc = gl.getUniformLocation(someProgram, 'u_someVec2');

// 渲染时, 设置数组 u_someVec2
gl.uniform2fv(someVec2Loc, [1, 2, 3, 4, 5, 6]);
```

如果想单独设置数组中的某个值, 就要单独找到该值的地址.

```js
// JavaScript 初始化时
const someVec2Element0Loc = gl.getUniformLocation(someProgram, 'u_someVec2[0]');
const someVec2Element1Loc = gl.getUniformLocation(someProgram, 'u_someVec2[1]');
const someVec2Element2Loc = gl.getUniformLocation(someProgram, 'u_someVec2[2]');

// 渲染时
gl.uniform2fv(someVec2Element0Loc, [1, 2]); // set element 0
gl.uniform2fv(someVec2Element1Loc, [3, 4]); // set element 1
gl.uniform2fv(someVec2Element2Loc, [5, 6]); // set element 2
```

##### 结构体

在顶点着色器中还可以创建一个结构体:

```glsl
struct SomeStruct {
    bool active;
    vec2 someVec2;
};
uniform SomeStruce u_someThing;
```

这时在 JavaScript 需要找到每个元素的地址:

```js
const someThingActiveLoc = gl.getUniformLocation(someProgram, 'u_someThing.active');
const someThingSomeVec2Loc = gl.getUniformLocation(someProgram, 'u_someThing.someVec2');
```

#### Textures 纹理

同片断着色器中的 Textures 纹理.

### 片断着色器

一个片断着色器的工作是为当前光栅化的像素提供颜色值, 通常是以下的形式:

```glsl
precision mediump float;

void main() {
    gl_FragColor = doMathToMakeAColor;
}
```

每个像素都将调用一次片断着色器, 每次调用需要会从特殊的全局变量 `gl_FragColor`中获取颜色信息.

片断着色器所需的数据, 可以通过以下三种方式获取.

1. Uniforms 全局变量: 在一次绘制中, 所有像素保持相同的值.
2. Textures 纹理: 从像素或纹理元素中获取的数据.
3. Varyings 可变量: 从顶点着色器传递过来并进行插值的数据.

#### Uniforms 全局变量

同顶点着色器中的 Uniforms 全局变量.

#### Textures 纹理

先创建一个 `sampler2D`类型的全局变量, 然后用 GLSL 的方法 `texture2D`从纹理中提取信息.

```glsl
precision mediump float;

uniform sampler2D u_texture;

void main() {
    vec2 texcoord = vec2(0.5, 0.5); // 中心点
    gl_FragColor = texture2D(u_texture, texcoord); // 获取纹理中心的值
}
```

从纹理中获取的数据取决于很多设置, 至少需要创建并给纹理填充数据.

```js
const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);

const level = 0;
const width = 2;
const height = 1;
const data = new Uint8Array([
    255, 0, 0, 255, // 一个红色的像素
    0, 255, 0, 255, // 一个绿色的像素
]);
gl.texImage2D(gl.TEXTURE_2D, level, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
```

然后在初始化时找到全局变量的地址:

```js
const someSamplerLoc = gl.getUniformLocation(someProgram, 'u_texture');
```

在渲染的时候, WebGL 要求纹理必须绑定到一个纹理单元上:

```js
const unit = 5; // 挑选一个纹理单元
gl.activeTexture(gl.TEXTURE0 + unit);
gl.bindTexture(gl.TEXTURE_2D, tex);
```

最后告诉着色器你要使用的纹理在哪个纹理单元中.

```js
gl.uniform1i(someSamplerLoc, unit);
```

#### Varyings 可变量

可变量是一种顶点着色器给片断着色器传值的方式.

为了使用可变量, 要在两个着色器中定义同名的可变量. 然后给顶点着色器中可变量设置的值, 会作为参考值进行内插, 在绘制像素时传给片断着色器的可变量.

顶点着色器

```glsl
attribute vec4 a_position;
uniform vec4 u_offset;
varying vec4 v_positionWithOffset;

void main() {
    gl_Position = a_position + u_offset;
    v_positionWithOffset = a_position + u_offset;
}
```

片断着色器

```glsl
precision mediump float;

varying vec4 v_positionWithOffset;

void main() {
    // 从裁剪空间(-1 -> +1) 转换到颜色空间(0 -> 1)
    vec4 color = v_positionWithOffset * 0.5 + 0.5;
    gl_FragColor = color;
}
```

### GLSL

GLSL 全称是 Graphics Library Shader Language (图形库着色器语言), 是着色器使用的语言. 它有一些不同于 JavaScript 的特性, 主要目的是为栅格化图形提供常用的计算功能. 所以它内建的数据类型例如 `vec2`, `vec3`和 `vec4`分别代表两个值, 三个值和四个值, 类似的还有 `mat2`, `mat3`和 `mat4`分别代表 2x2, 3x3 和 4x4 矩阵. 你可以做一些运算例如常量和矢量的乘法.

```glsl
vec4 a = vec4(1, 2, 3, 4);
vec4 b = a * 2.0;
// b 现在是 vec4(2, 4, 6, 8);
```

同样也可以做矩阵乘法以及矢量和矩阵的乘法

```glsl
mat4 a = ???;
mat4 b = ???;
mat4 c = a * b;

vec4 v = ???;
vec4 y = c * v;
```

对矢量数据还提供多种分量选择器, 例如 vec4:

- v.x 和 v.s 以及 v.r, v[0] 表达的是同一个分量.
- v.y 和 v.t 以及 v.g, v[1] 表达的是同一个分量.
- v.z 和 v.p 以及 v.b, v[2] 表达的是同一个分量.
- v.w 和 v.q 以及 v.a, v[3] 表达的是同一个分量.

它还支持矢量调制, 意味着你可以交换或重复分量.

```glsl
v.yyyy;
vec4(v.y, v.y, v.y, v.y);
// 是一样的

v.bgra;
vec4(v.b, v.g, v.r, v.a);
// 是一样的

vec4(v.rgb, 1);
vec4(v.r, v.g, v.b, 1);
// 是一样的

vec4(1);
vec4(1, 1, 1, 1);
// 是一样的
```

GLSL 是一个强类型的语言.

```glsl
float f = 1; // 错误, 1是int类型, 不能将int型赋值给float

// 正确的方式
float f = 1.0; // 使用 float
float f = float(1); // 将 integer 转换为 float

vec4(v.rgb, 1); // 不会因为 1 报错, 因为 vec4 内部使用了类似 float(1) 进行了转换
```

GLSL 有一系列内置方法, 其中大多数运行支持多种数据类型, 并且一次可以运算多个分量, 例如:

```glsl
T sin(T angle);
// T 可以是 float, vec2, vec3, vec4

vec4 v = vec4(1, 1, 1, 1);

vec4 s = sin(v);
vec4 s = vec4(sin(v.x), sin(v.y), sin(v.z), sin(v.w));
// 是一样的

vec4 m = mix(v1, v2, f);
vec4 m = vec4(
	mix(v1.x, v2.x, f),
    mix(v1.y, v2.y, f),
    mix(v1.z, v2.z, f),
    mix(v1.w, v2.w, f)
);
// 是一样的
```

### 参考

[WebGL 引用表](assets/webgl-reference-card-1_0.pdf)

[GLSL规范](assets/opengles_shading_language.pdf)

## 四. WebGL 演示

[链接](https://webglfundamentals.org/webgl/lessons/resources/webgl-state-diagram.html)

# 图像处理

## 五. WebGL 图像处理

在 WebGL 中绘制图片需要使用纹理. 和 WebGL 渲染时需要裁剪空间坐标相似, 渲染纹理时需要纹理坐标, 而不是像素坐标. 无论纹理是什么尺寸, 纹理坐标范围始终是 0.0 到 1.0.

因为我们只用画一个矩形 (其实是两个三角形), 所以需要告诉 WebGL 矩形中每个顶点对应的纹理坐标. 我们将使用 Varying 可变量将纹理坐标从顶点着色器传到片断着色器, WebGL 会对顶点着色器中可变量的值进行插值, 然后传给对应像素执行的片断着色器.

[代码](5/index.ts)

[卷积内核](5-1/index.ts)

### 为什么 `u_image`没有设置还能正常运行?

全局变量默认为 0, 所以 u_image 默认使用纹理单元 0. 纹理单元 0 默认为当前活跃纹理, 所以调用 `bindTexture`会将纹理绑定到单元 0.

WebGL 有一个纹理单元队列, 每个 sampler 全局变量的值对应着一个纹理单元, 它会从对应的单元寻找纹理数据, 你可以将纹理设置到你想要用的纹理单元.

```js
const textureUnitIndex = 6; // 使用单元 6
const u_imageLoc = gl.getUniformLocation(program, 'u_image');
gl.uniform1i(u_imageLoc, textureUnitIndex);

// 纹理纹理到单元 6
gl.activeTexture(gl.TEXTURE6);
gl.bindTexture(gl.TEXTURE_2D, someTexture);

// 或者
gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
gl.bindTexture(gl.TEXTURE_2D, someTexture);
```

所有支持 WebGL 的环境, 在片断着色器中至少有8个纹理单元, 顶点着色器中可以是0个. 所以如果要使用超过8个纹理单元就应该调用 `gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)`查看单元个数, 或者调用 `gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)`查看顶点着色器中可以用几个纹理单元. 超过 99% 的机器在顶点着色器中至少有4个纹理单元.

### 在 GLSL 中为什么变量的前缀都是 `a_`, `u_`或 `v_`?

这只是一个命名约定, `a_`代表属性, 值从缓冲中提供. `u_`代表全局变量, 直接使用 API 进行设置. `v_`代表可变量, 是从顶点着色器的顶点中插值出来的.

## 六. WebGL 进一步处理图像

图像处理的下一个问题是如何同时施加多种效果?

可以试着在运行时创建着色器, 根据用户从交互界面选择的一些效果, 创建一个可以全部实现的着色器, 但是大部分情况下是不适合的.

一个更灵活的方式是使用2个或以上的纹理, 然后交替渲染它们, 像乒乓球一样每次渲染一种效果, 传给另一个渲染下一个效果.

```
原始图像	->[模糊]	->纹理 1
纹理 1	->[锐化]	->纹理 2
纹理 2	->[边缘检测]	->纹理 1
纹理 1	->[模糊]	->纹理 2
纹理 2	->[平滑]	->画布
```

这个操作需要使用帧缓冲来实现. 在 WebGL 和 OpenGL 中, 帧缓冲是一个糟糕的名字. WebGL/OpenGL 中的帧缓冲只是一系列状态, 但在绑定一个纹理后, 可以将渲染结果写入那个纹理.

[代码](6/index.ts)

调用 `gl.bindFramebuffer`设置为 `null`是告诉 WebGL 要在画布上绘制, 而不是在帧缓冲上.

# 二维

## 七. WebGL 二维平移

平移就是普通意义的"移动"物体.

假设我们想要平移一个由六个三角形组成的 'F', 像这样:

![7.polygon-f](assets/7.polygon-f.png)

可以这样写:

```js
function setGeometry(gl, x, y) {
    const width = 100;
    const height = 150;
    const thickness = 30;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        // 左竖
        x,y,
        x+thinckness,y,
        x,y+height,
        x,y+height,
        x+thickness,y,
        x+thickness,y+height,
        
        // 上横
        x+thickness,y,
        x+width,y,
        x+thickness,y+thickness,
        x+thickness,y+thickness,
        x+width,y,
        x+width,y+thickness,
        
        // 中横
        x+thickness,y+thickness*2,
        x+width*2/3,y+thickness*2,
        x+thickness,y+thickness*3,
        x+thickness,y+thickness*3,
        x+width*2/3,y+thickness*2,
        x+width*2/3,y+thickness*3
    ]), gl.STATIC_DRAW);
}
```

这样做会有一个问题, 如果我们想绘制一个含有成百上千个线条的几何图形, 将会有很复杂的代理, 最重要的是, 每次绘制 JavaScript 都要更新所有的点.

更好的方案是将平移代码放进顶点着色器:

```glsl
attribute vec2 a_position;

uniform vec2 u_resolution;
// 平移坐标
uniform vec2 u_translation;

void main() {
    // 整体平移
    vec2 position = a_position + u_translation;
    vec2 zeroToOne = position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
```

[代码](7/index.ts)

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