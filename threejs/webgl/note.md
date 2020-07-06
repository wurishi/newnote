---
typora-root-url: assets
---

![webgl25a](/webgl25a.png)

[参考链接](http://www.yanhuangxueyuan.com/WebGL_course.html)

# 一. WebGL零基础快速入门

## 1. WebGL 绘制一个点

[代码](1.html)

### 创建 Canvas 画布

### Canvas 对象方法 .getContext()

```javascript
canvas.getContext('webgl'); // 返回一个可以使用 WebGL API 的上下文
```

### 着色器语言 GLSL ES

WebGL 的着色器代码由  GLSL ES 来编写, 是直接运行于 GPU 之上的.

与 OpenGL API 相配合的着色器语言是 GLSL.

与 OpenGL ES API 相配合的着色器语言是 GLSL ES.

OpenGL 标准应用的是客户端, OpenGL ES 应用的是移动端, WebGL 标准应用的是浏览器平台.

顶色着色器定义了顶点的渲染位置和点的渲染像素大小.

```html
<script id='vertexShader' type="x-shader/x-vertex">
    void main() {
        // 给内置变量gl_PointSize赋值像素大小
        gl_PointSize = 20.0;
        // 顶点位置, 位于坐标原点
        gl_Position = vec4(0.0,0.0,0.0,1.0);
    }
</script>
```

片元着色器定义了点的渲染结果像素的颜色值.

```html
<script id='fragmentShader' type="x-shader/x-fragment">
    void main() {
        // 定义片元颜色
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
</script>
```

gl_PointSize, gl_Position, gl_FragColor 都是内置变量, 不需要声明即可使用.

### WebGL API

通过 `canvas.getContext('webgl')` 返回的对象有着一系列绘制渲染方法, 这些方法就是 WebGL API.

顶点着色器和片元着色器都需要编译后才能使用.

### 绘制方法

`gl.drawArrays()`的作用就是通知 GPU 执行着色器代码, 然后根据着色器在 Canvas 上进行渲染绘制.

### 着色器代码

着色器代码在 Javascript 中是以字符串形式存在的, 为了编写方便, 可以把着色器代码写在 script 标签中, 然后使用元素的 .innerText 获取字符串, 或者使用 ``.

## 2. WebGL 绘制一个矩形

[代码](2.html)

### gl.drawArrays(mode, first, count)

mode: 为绘制模式

first: 从第几个点开始绘制

count: 绘制几个点

### attribute 关键字

声明:

```html
<script id='vertexShader' type="x-shader/x-vertex">
    // 声明 vec4 类型的变量 apos
    attribute vec4 apos;
    void main() {
        // 将顶点坐标apos赋值给内置变量gl_Position
        gl_Position = apos;
    }
</script>
```

在 js 中使用:

```javascript
// 创建缓冲区
const buffer = gl.createBuffer();
// 绑定缓冲区对象, 激活buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// 将顶点数组data数据传入缓冲区
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
// 将缓冲区中的数据按照一定的规律传递给位置变量apos
gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
// 允许数据传递
gl.enableVertexAttribArray(aposLocation);
```

### drawArray 整体执行顺序

![webgl91](/webgl91.jpg)

## 3. WebGL 坐标系(投影)

[代码](3.html)

### gl.vertexAttribPointer(index, size, type, normalized, stride, offset)

size: 拿几个数据放到 attribute 里, 如果 attribute 类型是 vec4, 但指定的数据不够4个, 也会自动补全.

## 4. WebGL 平移变换

### 要求: 沿X轴平移-0.4

```javascript
const data = new Float32Array([
    0.0, 0.0, 1.0,
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0
]);
```

### 方法一

```javascript
// 将三个顶点的x坐标分别减0.4
const data = new Float32Array([
    -0.4, 0.0, 1.0,
    -0.4, 1.0, 0.0,
     0.6, 0.0, 0.0,
]);
```

### 方法二

```javascript
for(let i = 0; i < 9; i+=3) {
    data[i] += -0.4;
}
```

### 方法三

```
// 在顶点着色器中计算
gl_Position = vec4(apos.x - 0.4, apos.y, apos.z, 1);
```

### 方法四

```javascript
// 创建平移矩阵
// 1	0	0	-0.4
// 0	1	0	0
// 0	0	1	0
// 0	0	0	1
mat4 m4 = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, -0.4,0,0,1);
gl_Position = m4 * apos;

/*
┌ 1 0 0 Tx ┐   ┌ x ┐   ┌ x+Tx ┐
│ 0 1 0 Ty │ * │ y │ = │ y+Ty │
│ 0 0 1 Tz │   │ z │   │ z+Tz │
└ 0 0 0 1  ┙   └ 1 ┙   └  1   ┙
*/
```

## 5. WebGL 绘制立方体

[代码](5.html)

### 着色器内置函数

- radians() : 角度值转化为弧度值, 参数是浮点数float, 所以45必须写成45.0.
- cos, sin : 余弦, 正弦函数, 参数要求为弧度值且是浮点数.

## 6. WebGL 顶点索引绘制

在上一节的绘制立方体时, 虽然立方体本身只需要8个顶点, 但因为使用 drawArrays() 方法的线模式(gl.LINES), 所以绘制直线至少需要两个顶点, 使得顶点在数组中多次出现, 造成数据重复.

要解决数据重复, 可以将立方体的8个顶点声明在一个数组中, 再声明一个索引数组并多次指向这8个顶点. **(多数更复杂的三维模型都会建立顶点索引来复用顶点数据)**

WebGL 为了复用顶点数据引了一个绘制方法 drawElements(), 它和 drawArrays() 的功能类似, 主要区别就是 drawArray() 方法调用的是顶点数组数据, 而 drawElements() 是通过一个索引数组访问顶点数据的.

## 7. varying 变量和颜色插值

之前一系列顶点通过顶点着色器逐顶点处理后, 再经过图元装配, 光栅化环节后会得到原始未定义颜色的片元. 然后经过片元着色器逐片元添加颜色后, 得到一副图像.

在片元着色器程序中编写代码 `gl_FragColor = vec4(1.0,0.0,0.0,1.0)` 就表示所有经过光栅化生成的未定义颜色的片元经过片元着色器处理后所有片元赋值红色, 得到一个个红色的像素. 如果希望不同片元定义不同的颜色怎么编写代码? 比如立方体每个面的颜色不同, 更具体点比如代码 `gl.drawElements(gl.TRIANGLES, 0, gl.UNSIGNED_BYTE, 6);` 表示利用6个顶点, 每三个顶点绘制一个三角形面, 如果希望这两个三角面的颜色不同, 该如何实现?

这时就需要学习新的顶点数据, 之前学习了**顶点位置数据**, 现在来讲**顶点颜色数据**, 以及顶点颜色使用关键字 varying 实现颜色插值计算.

[颜色插值](7.html)

- varying : 将二个顶点变量的颜色 a_color 赋值给 varying vec4 v_color 即: v_color = a_color 后, GPU 会自动内插出两个点之间的所有像素, 这个过程即像素的线性插值.

[1. 彩色三角形](7-1.html)

[2. 两个单色三角面](7-2.html)

[3. 颜色插值 (位置,颜色使用一个缓冲区)](7-3.html)

## 8. WebGL 彩色立方体

[代码](8.html)

- gl.enable(gl.DEPTH_TEST) : 深度测试, 执行 drawArrays() 方法后, GPU 默认绘制规则是后生成的像素覆盖前面生成的像素, 如果不做深度测试, 显示的立方体将安全按照给定的立方体面数据的前后顺序绘制. 开启后, 才会按照坐标信息中的 z 坐标, 判断前后位置关系.

[颜色相同测试](8-1.html)

把所有颜色改为红色后, 会发现没有立体视觉效果, 在现实生活中单色物体也有立体感, 这好像不符合生活常识. 事实上, 生活中绝大部分单色物体, 在一个自然光的环境下, 反射到眼睛里的每个像素点颜色还是有微小的差异的, 所以这里还是将不同面的红色作一些细微修改, 使其有立体感. 真正在实现上应该是以模拟自然界的各种光线来实现的.

## 9. WebGL 光照渲染立方体

### 9.1 光照模型

#### 9.1.1 漫反射

$$
漫反射光的颜色 = 几何体表面基色 × 光线颜色 × 光线入射角余弦值
$$

$$
(R2,G2,B2) = (R1,G1,B1) × (R0,G0,B0) × cosθ
$$

#### 9.1.2 镜面反射

$$
镜面反射光的颜色 = 几何体表面基色 × 光线颜色 × 视线与反射光线的夹角余弦值n
$$

#### 9.1.3 环境光照

$$
环境反射光颜色 = 几何体表面基色 × 环境光颜色
$$

多数情况下, 室内室外环境光颜色通常全是 RGB 相同的白色到黑色之间的值, (1,1,1)表示最强的环境光照颜色, (0,0,0)相当于处于完全没有光照的黑色环境中.

#### 9.1.4 复合光照

$$
总反射光线 = 漫反射光线 + 镜面反射光线 + 环境反射光线
$$

使用光照渲染模型的时候往往会使用多种光照模型, 然后把每个光照模型颜色相乘的结果 RGB 分别相加, 这时候要注意, 多种模型的光照颜色相加后RGB的值要保证在区间[0,1], 因为 WebGL 的 RGB 颜色模型默认 RGB 分量的最大值是1, 注意分配比例即可.

#### 9.1.5 法向量

垂直与面的直线就是面的法线, 对于平面而言面上所有位置的法线方向是相同的, 对于曲面而言不同的位置, 法线的方向是变化的. 在三维笛卡尔坐标系中, 可以使用向量 (x,y,z) 来表示法向量, 根据几何体表面的法向量和光线的方向, 就可以求解出光线入射角的余弦值. 为了方便计算, 着色器语言内置了一个方法 `dot()` 用来求解两个向量之间的余弦值.
$$
→a●→b = |a||b|cosθ
$$

$$
→a●→b = x1x2 + y1y2 + z1z2
$$

### 9.2 立方体添加平行光

[代码](9-2.html)

着色器语言中声明变量的关键词:

- attribute

  声明的变量一般与顶点数据相关, 如: 顶点位置坐标, 顶点颜色值,和顶点法向量数据等.

  顶点变量可以通过方法 `getAttribLocation()` 获取顶点数据的索引位置, 然后利用 `vertexAttribPointer()` 可以把类型数组创建的顶点数据传递给顶点着色器, 然后**逐顶点处理**计算.

- uniform

  它和 attribute 一样也可以接收数据, 不同点是接收的数据往往是会被重复利用的单一值. 它可以通过 `getUniformLocation()` 和 `uniform3f()` 来获取索引和传递数据.

- varying

  一般在颜色插值计算中使用. 它的赋值计算等于是告诉渲染管线对离散的顶点颜色进行插值计算, 去填充顶点之间的片元像素值.

光照计算

- normalize() : 着色器的一个内置函数, 它的作用就是把向量归一化, 具体点说就是如果向量的模长不是1, 在不改变向量方向的情况下, 把模长变为1, 也就是把向量转化为单位向量, 称之为向量归一化. 如果一个vec3数据是(1,1,1), 那么它的模长就是3的平方根, 这时候就需要把每个1全部除以3的平方根, 才可以把单位向量转化为单位向量.
- dot() : 是着色器的一个内置函数, 它的参数是两个向量, 执行结果是两个向点的点积, 如果光线方向向量和顶点法向量两个向量都是**单位向量**, 求解的结果就是平行光线与物体表面法线夹角的余弦值. 这也是什么要先执行 normalize().
- max() : dot 计算的结果可能是[-1,1]之间, 颜色不存在负值要舍去[-1,0), 这个时候就可以使用 max(dot(xxx), 0.0).

顶点法向量

normalData 的数据参考此图:

![9-2-normal](/9-2-normal.png)

### 9.3 立方体添加点光源

[代码](9-3.html)

点光源的光线是发散的, 所以点光源与每一顶点连线的方向都需要单独计算. 只要确定点光源的位置坐标, 然后与某个顶点的位置坐标进行减法运算, 计算的结果就是光源射到该顶点的方向.

## 10. WebGL 立方体旋转动画

[代码](10.html)

## 11. WebGL 绘制多个几何体

### 11.1 绘制两个相同的立方体

[代码](11-1.html)

#### WebGL 坐标系

```
着色器对顶点先旋转还是先平移会影响最终的结果:
// 先平移再旋转
// gl_Position = Tx * mx * my * apos;
// 先旋转再平移
// gl_Position = mx * my * Tx * apos;
```

### 11.2 给两个立方体添加旋转动画

[代码](11-2.html)

先旋转还是先平移会影响最终的结果.

## 12. WebGL 纹理贴图

![uv](/uv.png)

[代码](12.html)

图片的像素尺寸要保证为2的n次幂

gl.pixelStorei(UNPACK, flag) : 第一个参数可以是 gl.UNPACK_FLIP_Y_WEBGL 或 gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 第二个参数控制第一个参数是false 还是 true.

- gl.UNPACK_FLIP_Y_WEBGL : 是否将图片倒置左上角与UV坐标原点重合.
- gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL : 是否将图像像素值的 RGB 三个分量逐分量乘以透明度分量 A.

activeTexture() : 激活纹理缓冲区的某个子单元, 具体数量取决于显卡硬件和浏览器的 WebGL 图形系统设置, WebGL 至少支持8个纹理单元. (gl.TEXTURE0 到 gl.TEXTURE7)

bindTexture() :第一个参数可以是 gl.TEXTURE_2D 表示二维纹理贴图, gl.TEXTURE_CUBE_MAP 表示立方体纹理贴图.

texParameteri() : 用来设置纹理贴图的填充方式

| 纹理参数              | 填充模式 | 默认值                   |
| --------------------- | -------- | ------------------------ |
| gl.TEXTURE_MAG_FILTER | 纹理放大 | gl.LINEAR                |
| gl.TEXTURE_MIN_FILTER | 纹理缩小 | gl.NEAREST_MIPMAP_LINEAR |
| gl.TEXTURE_WRAP_S     | 水平填充 | gl.REPEAT                |
| gl.TEXTURE_WRAP_T     | 垂直填充 | gl.REPEAT                |

gl.TEXTURE_MAG_FILTER 和 gl.TEXTURE_MIN_FILTER 主要用于纹理贴图缩放, 对应值:

| 值         | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| gl.NEAREST | 纹理坐标乘以纹理图片需要缩放的倍数得到像素的选取坐标, 选择坐标对应的像素, 多余的舍弃掉. (锯齿) |
| gl.LINEAR  | 选择纹理坐标对应的像素周围的像素颜色进行加权平均, 相比 gl.NEAREST的效果更好, 但更消耗硬件资源. (平滑) |

gl.TEXTURE_WRAP_S 和 gl.TEXTURE_WRAP_T 往往用在贴图阵列的场景.

| 值                 | 含义                       |
| ------------------ | -------------------------- |
| gl.REPEAT          | 平铺方式                   |
| gl.MIRRORED_REPEAT | 镜像方式                   |
| gl.CLAMP_TO_EDGE   | 绘制区域边缘使用贴图的部分 |

texImage2D() : 将纹理数据传入绑定的纹理缓冲区中激活的纹理单元. 

第三个参数表示纹理图片的格式, 第四个参数表示从图片数据采样抽取过来的纹理数据的格式. jpg格式是RGB结构, png格式是RGBA结构.

| 格式               | 含义             | 图片格式   |
| ------------------ | ---------------- | ---------- |
| gl.RGB             | 红, 绿, 蓝三原色 | .jpg, .bmp |
| gl.RGBA            | 三原色+透明度    | .png       |
| gl.LUMINANCE       | 流明             | 灰度图     |
| gl.LUMINANCE_ALPHA | 透明度           | 灰度图     |

第五个参数表示像素分量占多少字节数.

| 格式                       | 含义                                 |
| -------------------------- | ------------------------------------ |
| gl.UNSIGNED_BYTE           | 无符号整型, 每个颜色分量一个字节长度 |
| gl.UNSIGNED_SHORT_5_6_5    | RGB: RGB每个分量对应长度5, 6, 5位    |
| gl.UNISIGNED_SHORT_4_4_4_4 | RGBA: RGBA每个分量对应长度4位        |
| gl.UNISIGNED_SHORT_5_5_5_1 | RGBA: RGB每个分量对应长度5位, A是1位 |

## 13. 彩色图转灰度图

亮度公式
$$
亮度 = 0.299 × R + 0.587 × G + 0.114 × B
$$
[代码](13.html)

- 改变顶点坐标, 即能拉伸图片

## 14. 切换着色器程序

[代码](14.html)

## 15. WebGL透明度与 α 融合

[代码](15.html)

- gl.enable() : 开启的这些功能模块都处于渲染管线这条流水线上的不同位置, 相互配合完成工作. 深度检测, α 融合都是对 RGBA 像素相关的数据进行处理, 也就是说渲染管线上的这些测试单元都位于顶点着色器, 片元着色器的后面, 用来处理经过顶点着色器, 光栅器, 片元着色器处理后的相关数据.

  | 参数                   | 功能                         |
  | ---------------------- | ---------------------------- |
  | gl.DEPTH_TEST          | 深度测试, 清除看不到的隐藏面 |
  | gl.BLEND               | α 融合, 实现颜色融合叠加     |
  | gl.POLYGON_OFFSET_FILL | 多边形偏移, 解决深度冲突     |

- gl.enable(gl.BLEND) : 表示开启 GPU 渲染管线的 α 融合功能, 比如源颜色像素值是 (R1, G1, B1, A1), 目标颜色像素值是 (R2, G2, B2, A2), 融合后的像素值计算方法如下:

  ```javascri
  R3 = R1 x A1 + R2 x (1 - A1)
  G3 = G1 x A1 + G2 x (1 - A1)
  B3 = B1 x A1 + B2 x (1 - A1)
  ```

- gl.blendFunc() : 定义了源颜色和目标颜色融合的计算方式, 即对应上面的公式定义了二个自定义参数:

  ```
  R3 = R1 x 参数1 + R2 x 参数2
  G3 = G1 x 参数1 + G2 x 参数2
  B3 = B1 x 参数1 + B2 x 参数2
  ```

  | 参数                   | 红色R分量系数 | 绿色G分量系数 | 蓝色B分量系数 |
  | ---------------------- | ------------- | ------------- | ------------- |
  | gl.ZERO                | 0             | 0             | 0             |
  | gl.ONE                 | 1             | 1             | 1             |
  | gl.SRC_COLOR           | Rs            | Gs            | Bs            |
  | gl.ONE_MINUS_SRC_COLOR | 1 - Rs        | 1 - Gs        | 1 - Bs        |
  | gl.DST_COLOR           | Rd            | Gd            | Bd            |
  | gl.ONE_MINUS_DST_COLOR | 1 - Rd        | 1 - Gd        | 1 - Bd        |
  | gl.SRC_ALPHA           | As            | As            | As            |
  | gl.ONE_MINUS_SRC_ALPHA | 1 - As        | 1 - As        | 1 - As        |
  | gl.DST_ALPHA           | Ad            | Ad            | Ad            |
  | gl.ONE_MINUS_DST_ALPHA | 1 - Ad        | 1 - Ad        | 1 - Ad        |
  | gl.SRC_ALPHA_SATURATE  | min(As, Ad)   | min(As, Ad)   | min(As, Ad)   |

## 16. 深度测试与 α 融合

[代码](16.html)

- 片元的深度值 Z : 如果开启了深度检测, 该单元会比较当前将要绘制的片元与相同屏幕坐标的片元坐标深度 Z, 如果将要绘制的片元更靠近观察位置, 那么新的片元的像素值才会取代旧片元的像素值, 深度测试是逐片元比较的.

  ![test](/test.png)

- 透明度分量 A : 如果同时开启了 α 融合与深度测试, 那么 α 融合将不再起作用, 因为深度测试是比较先后绘制两个片元的深度值决定取舍的, 而 α 融合是要把先后绘制的两个片元的 RGB 值分别乘以一个系数得到新的 RGB 值, 再覆盖替换原来颜色缓冲区中同屏幕坐标的 RGB 值的. 所以了为解决这个问题, WebGL 提供了一个可以关闭深度缓冲区的方法 `gl.depthMask(false)`

  ![blend](/blend.png)

- gl.depthMask(false) : 关闭深度缓冲区
