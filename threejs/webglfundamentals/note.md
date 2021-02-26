[link](https://webglfundamentals.org/webgl/lessons/zh_cn/)

```bash
# 首次运行先生成 dll
npx webpack --config webpack.dll.config.js
# 开启 webpack 测试服务器
npx webpack-dev-server
```

# 基础概念

## WebGL 基础概念

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

无论你的画布有多大, 裁剪空间的坐标范围永远是-1到1.

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