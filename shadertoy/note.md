[shadertoy](https://www.shadertoy.com)

| 类型      | 名称                  | 描述                                                         |
| --------- | --------------------- | ------------------------------------------------------------ |
| vec3      | iResolution           | 视口分辨率 (z 为 像素对应的实际像素, 默认为1)                |
| float     | iTime                 | 当前时间 (秒)                                                |
| float     | iTimeDelta            | Time it takes to render a frame, in seconds                  |
| int       | iFrame                | Current frame                                                |
| float     | iFrameRate            | Number of frames rendered per second                         |
| float     | iChannelTime[4]       | Time for channel (if video or sound), in seconds             |
| vec3      | iChannelResolution[4] | Input texture resolution for each channel                    |
| vec4      | iMouse                | xy = current pixel coords (if LMB is down). zw = click pixel |
| sampler2D | iChannel{i}           | Sampler for input textures i                                 |
| vec4      | iDate                 | Year, month, day, time in seconds in .xyzw                   |
| float     | iSampleRate           | The sound sample rate (typically 44100)                      |

`gl_FragCoord`

![webgl-pixels](assets/webgl-pixels.png)

```bash
# 首次运行先生成 dll
npx webpack --config webpack.dll.config.js
# 开启 webpack 测试服务器
npx webpack-dev-server
```

# GLSL - API

| Syntax                         粗体为方法名(占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符) | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| genType **pow**(genType x, genType y)                        | x的y次方. **如果x小于0, 结果为 undefined. 如果x=0且y<=0, 结果也是 undefined.** |
| genType **dFdx**(genType p)                                  | 偏导数. GPU 会同时跑片元着色器的多个实例, 但并不是一个像素一个像素去执行的. 而是会组织在2x2的一组pixels块中并行执行. 偏导数就是通过像素块中变量的差值(变化率)而计算出来的. dFdx 表示的是像素块中右边像素的值减去左边像素的值 |
| genType **dFdy**(genType p)                                  | 下面像素的值减去上面像素的值.                                |
| genType **fract**(genType x)                                 | 返回 x 的小数部分.                                           |
| genType **clamp**(genType x, genType minVal, genType maxVal) | 夹具函数, 取三个参数中中间值. **如果 minVal > maxVal, 返回 undefined.** |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |



# 1. Fovea detector

4dsXzM

![1](assets/1.png)

# 2. yonatan fractal

tlyfzt

![2](assets/2.jpg)

# 3. Trig-less Hash

WlyBRd

![3](assets/3.jpg)

# 4. Creation by Silexars

XsXXDn

![4](assets/4.jpg)

# 5. tiny

tiny

![5](assets/5.jpg)

# 6. Flame

MdX3zr

![6](assets/6.jpg)

# 7. Star Nest

XlfGRj

![7](assets/7.jpg)

# 8. Fractal Land

XsBXWt

![8](assets/8.jpg)

# 9. Curvature - Parametric 3D

XlfXR4

![9](assets/9.jpg)

# 10. Elephant Ear Plants

XsVGzm

![10](assets/10.jpg)

# 11. Isopleth

Mllfzl

![11](assets/11.jpg)

# 12. Alloy Plated Voronoi

XdfyWM

![12](assets/12.jpg)

# 13. Voronoi - smooth

ldB3zc

![13](assets/13.jpg)

# 14. Seascape

Ms2SD1

![14](assets/14.jpg)

# 15. Mystify Screensaver

MsKcRh

# 16. Ray Marching: Part 6

4tcGDr

![16](assets/16.jpg)

# 17. HCL Color Range

MtjBWR

![17](assets/17.png)

# 18. Very fast procedural ocean

MdXyzX

![18](assets/18.jpg)

# 19. Planet #2

fdX3zr

![19](assets/19.jpg)

# 20. Liberation of the True Self

tlGfzd

![20](assets/20.jpg)

# 21. neuron 1512 "lol"

fdlGRH

![21](assets/21.jpg)

# 22. Synthesis ideas

WlycRW

![22](assets/22.png)

# 23. Fork MANO fract NikolaErce 337

sdX3zH

![23](assets/23.jpg)

# 24. Fork Analys Cub NikolaErce 538

sdfGzH

![24](assets/24.png)

# 25. Cellular noise collection

tlcBDs

![25](assets/25.png)

# 26. font zoom explorer

NsXGz8

![26](assets/26.png)

# 27. Layer Slice display

NdX3RH

![27](assets/27.png)

# 28. ANU - Strategic Management

sdX3Rr

![28](assets/28.jpg)

# 29. Fractal 38_gaz

fdfGR8

![29](assets/29.jpg)

# 30. Tidal

NdXGRr

![30](assets/30.png)

# 31. fractal pyramid

tsXBzS

![31](assets/31.jpg)

# 32. Neural Stanford Bunny (5 kb)

wtVyWK

![32](assets/32.jpg)

# 33. CineShader Lava

3sySRK

![33](assets/33.jpg)

# 34. Cyber Fuji 2020

Wt33Wf

![34](assets/34.jpg)

# 35. Phantom Star for CineShader

ttKGDt

![35](assets/35.jpg)

# 36. DVD Bounce

wtcSzN

![36](assets/36.jpg)

# 37. CineShader Test

wlVGWd

![37](assets/37.jpg)

# 38. FWA logo

tt3XDn

![38](assets/38.jpg)

# 39. Octagrams

tlVGDt

![39](assets/39.jpg)

# 40. Planetary Soup

ttKBDd

![40](assets/40.jpg)

# 41. Base warp fBM

tdG3Rd

![41](assets/41.jpg)

# 42. Prism sdf,test

tlyBW3

![42](assets/42.jpg)

# 43. GLSL ray tracing test

3sc3z4

![43](assets/43.jpg)

# 44. Happy Jumping

3lsSzf

![44](assets/44.jpg)

# 45. Bandlimited Synthesis 1

WtScDt

![45](assets/45.jpg)

# 46. Raymarching - Primitives

Xds3zN

![46](assets/46.jpg)

# 47. Plasma Globe

XsjXRm

![47](assets/47.jpg)

# 48. Clouds

XslGRr

![48](assets/48.jpg)

# 49. Auroras

XtGGRt

![49](assets/49.jpg)

# 50. IQ_TUT: Greek Holiday 2021

fdl3z8

![50](assets/50.jpg)

# 51. stretching white vs blue noise

fdsGz8

![51](assets/51.png)

# 52. Fractal 39_gaz

sss3R8

![52](assets/52.jpg)

# 53. Pencilvester's orthodoodle

wlyfWK

![53](assets/53.jpg)

# 54. Extruded Truchet Pattern

ttVBzd

![54](assets/54.jpg)

# 55. Faux Layered Extrusion

Wsc3Ds

![55](assets/55.jpg)

# 56. 4.8^2 Truchet

MlyBRG

![56](assets/56.jpg)

# 57. Snail

ld3Gz2

![57](assets/57.jpg)

# 58. 3d simplex noise

XsX3zB

![58](assets/58.jpg)

# 59. Noise Lab (3D)

4sc3z2

![59](assets/59.jpg)

# 60. Hash without Sine

4djSRW

![60](assets/60.jpg)

# 61. 4.6.12 Truchet

llyBRG

![61](assets/61.jpg)

# 62. 4.6.12 Truchet Weave

WsyXWR

![62](assets/62.jpg)

# 63. Diamond Octagon Truchet Pattern

wdBSRm

![63](assets/63.jpg)

# 64. Hologram Boxes

3tX3R4

![64](assets/64.jpg)

# 65. 4.8^2 Truchet Weave

3dVSRm

![65](assets/65.jpg)

# 66. Integer Hash - I

llGSzw

![66](assets/66.jpg)

# 67. Integer Hash - II

XlXcW4

![67](assets/67.jpg)

# 68. Integer Hash - III

4tXyWN

![68](assets/68.jpg)

# 69. Filtered grid (box, 2D)

XtBfzz

![69](assets/69.jpg)

# 70. filtered checker (box, 2D)

XlcSz2

![70](assets/70.jpg)

# 71. Filtered checker (box, 3D)

XlXBWs

![71](assets/71.jpg)

# 72. Filtered checker (triangle, 3D)

llffWs

![72](assets/72.jpg)

# 73. Filtered xor (box, 2D)

tdBXRW

![73](assets/73.jpg)

# 74. Integrating a square wave

MtffWs

![74](assets/74.png)

# 75. Phantom Mode

MtScWW

![75](assets/75.jpg)or![75-1](assets/75-1.jpg)

# 76. Palettes

ll2GD3

![76](assets/76.jpg)

# 77. Bandlimited Synthesis 2

wtXfRH

![77](assets/77.jpg)

# 78. Bandlimited fbm (box, 2D)

3tScWd

![78](assets/78.jpg)

# 79. webgl2 grid noise

4tfyW4

![79](assets/79.jpg)

# 80. Noise animation - 3D

XdfXRj

![80](assets/80.jpg)

# 81. Noise - Value - 2D - Deriv

4dXBRH

![81](assets/81.jpg)

# 82. Analytic Normals 2D

MdsSRs

![82](assets/82.jpg)

# 83. Noise - Gradient - 2D - Deriv

XdXBRH

![83](assets/83.jpg)

# 84. Noise - Value - 3D - Deriv

XsXfRH

![84](assets/84.jpg)

# 85. Noise - Gradient - 3D - Deriv

4dffRH

![85](assets/85.jpg)

# 86. Noise - value - 2D

lsf3WH

![86](assets/86.jpg)

# 87. Noise - gradient - 2D

XdXGW8

![87](assets/87.jpg)

# 88. Noise - value - 3D

4sfGzS

![88](assets/88.jpg)

# 89. Noise - gradient - 3D

Xsl3Dl

![89](assets/89.jpg)

# 90. Noise - simplex - 2D

Msf3WH

![90](assets/90.jpg)

# 91. Noise - wave - 2D

tldSRj

![91](assets/91.jpg)

# 92. interesting noise algorithm

wttSRj

![92](assets/92.jpg)

# 93. Analytic Normals 3D

XttSz2

![93](assets/93.jpg)

# 94. Voronoise

Xd23Dh

![94](assets/94.jpg)

# 95. Voronoi - distances

ldl3W8

![95](assets/95.jpg)

# 96. Voronoi - hierarchical

Xll3zX

![96](assets/96.jpg)

# 97. Fractal 43_gaz

sssGWS

![97](assets/97.jpg)

# 98. 7dsGWS

7dsGWS

![98](assets/98.jpg)

# 99. Parallax view on Cineshader

wtdSR8

![99](assets/99.jpg)

# 100. Will it blend

lsdGzN

![100](assets/100.jpg)

# 101. 3d color space visualization

XddGRN

![101](assets/101.jpg)

# 102. Smooth HSV

MsS3Wc

![102](assets/102.jpg)

# 103. Cube lines

NslGRN

![103](assets/103.jpg)

# 104. Bilinear Patch - intersection

ltKBzG

![104](assets/104.jpg)

# 105. Strange Crystal

tsVXzh

![105](assets/105.jpg)

# 106. Tubularity

WlffDn

![106](assets/106.jpg)

# 107. Box - fake soft shadow

WslGz4

![107](assets/107.jpg)

# 108. BUG Nvidia const to array

NslGR4

bug tested and works Nvidia 960 and 750, OpenGL and Vulkan

# 109. Box - intersection

ld23DV

![109](assets/109.jpg)

# 110. Goursat - intersection

3lj3DW

![110](assets/110.jpg)

# 111. Sphere4 - intersection

3tj3DW

![111](assets/111.jpg)

# 112. Parallelogram - intersection

4tlBDs

![112](assets/112.jpg)

# 113. Quad - intersection

XtlBDs

![113](assets/113.jpg)

# 114. Triangle - intersection

MlGcDz

![114](assets/114.jpg)

# 115. Torus - intersection

4sBGDy

![115](assets/115.jpg)

# 116. Rounded Cone - intersection

MlKfzm

![116](assets/116.jpg)

# 117. Rounded Box - intersection

WlSXRW

![117](assets/117.jpg)

# 118. Disk - intersection

lsfGDB

![118](assets/118.jpg)

# 119. Cone - intersection

llcfRf

![119](assets/119.jpg)

# 120. Capsule - intersection

Xt3SzX

![120](assets/120.jpg)

# 121. Box - occlusion clipping

4sSXDV

![121](assets/121.jpg)

# 122. Box - occlusion

4djXDy

![122](assets/122.jpg)

# 123. Triangle - occlusion

XdjSDy

![123](assets/123.jpg)

# 124. Sphere - occlusion

4djSDy

![124](assets/124.jpg)

# 125. Ellipsoid - occlusion

MlsSzn

![125](assets/125.jpg)

# 126. Capsule - occlusion

llGyzG

![126](assets/126.jpg)

# 127. Capsule - bounding box

3s2SRV

![127](assets/127.jpg)

# 128. Box - fog density

Ml3GR8

![128](assets/128.jpg)

# 129. Sphere - fog density

XljGDy

![129](assets/129.jpg)

# 130. Box - gradient 2D

wlcXD2

![130](assets/130.jpg)

# 131. Stained Lights

WlsSzM

![131](assets/131.jpg)

# 132. Brush Experiment 3

ltj3Wc

![132](assets/132.jpg)

# 133. Rainier mood

ldfyzl

![133](assets/133.jpg)

# 134. Texture - Better Filtering

XsfGDn

![134](assets/134.jpg)

# 135. Warping - procedural 2

lsl3RH

![135](assets/135.jpg)

# 136. (no Music) - Pirates

ldXXDj

![136](assets/136.jpg)

# 137. [SIG2014] - Total Noob

XdlSDs

![137](assets/137.jpg)

# 138. edge glow

Mdf3zr

视频在网盘 shadertoy.zip

![138](assets/138.jpg)

# 139. I/O

XsfGDS

![139](assets/139.jpg)

# 140. Brush Experiment 2

lt23D3

![140](assets/140.jpg)

# 141. Brush Smear

Xt2GWc

![141](assets/141.jpg)

# 142. Grid Paper (+mouse)

4tj3DG

![142](assets/142.jpg)

# 143. 2pic

![143](assets/143.jpg)

# 144. 38911 BASIC BYTES FREE

MljGWG

![144](assets/144.jpg)

# 145. Pixellated Plasma + mouse

4tjGWy

![145](assets/145.jpg)

# 146. Floyd-Steinberg Dithering WIP

Xst3W7

![146](assets/146.jpg)

# 147. 2D Primitive Distance Functions

XtjGzt

![147](assets/147.jpg)

# 148. Hex Master 140ch

ltlSW4

![148](assets/148.jpg)

# 149. Palette Quantization & Dithering

4ddGWr

![149](assets/149.jpg)

# 150. Distance field drawing methods

ltBGzt

![150](assets/150.jpg)

# 151. Quantization & Dithering 2

Xdt3Wr

![151](assets/151.jpg)

# 152. Palettization + OrderedDithering

Xdt3Dr

![152](assets/152.jpg)

# 153. website background #2

4st3DS

![153](assets/153.jpg)

# 154. Neon Hypno Bands

MdcGW4

![154](assets/154.jpg)

# 155. Backyard Starleaves

Mdyyzt

![155](assets/155.jpg)

# 156. Time-o-matic

MlfXz8

![156](assets/156.jpg)

# 157. Keep up little square

wlsXD2

![157](assets/157.jpg)

# 158. Donuts can be beautiful too

wtfSW8

![158](assets/158.jpg)

# 159. Disk - bounding box

ll3Xzf

![159](assets/159.jpg)

# 160. Cylinder - bounding box

MtcXRf

![160](assets/160.jpg)

# 161. Ellipse - bounding box

Xtjczw

![161](assets/161.jpg)

# 162. Cone - bounding box

WdjSRK

![162](assets/162.jpg)

# 163. Cubic Bezier - 2D BBox

XdVBWd

![163](assets/163.jpg)

# 164. Quadratic Bezier - 3D

ldj3Wh

![164](assets/164.jpg)

# 165. Quadratic Bezier - 2D BBox

lsyfWc

![165](assets/165.jpg)

# 166. Box occlusion optimized

ttlBWf

![166](assets/166.jpg)

# 167. HexTile Truchet Marching

WlByW3

![167](assets/167.jpg)

# 168. Unstable Universe

wtlfz8

![168](assets/168.jpg)

# 169. Clooud City

tt3Bz2

![169](assets/169.jpg)

# 170. RME4 - Crater

MlSBDt

![170](assets/170.jpg)

# 171. Purple Haze

XdSGWy

![171](assets/171.jpg)

# 172. Sphere - soft shadow

4d2XWV

![172](assets/172.jpg)

# 173. Triangulated Heightfield Trick

XlcBRX

![173](assets/173.jpg)

# 174. Balls and shadows

lsSSWV

![174](assets/174.jpg)

# 175. Repelling

XdjXWK

![175](assets/175.jpg)

# 176. Ellipsoid - soft shadow

llsSzn

![176](assets/176.jpg)

# 177. Capsule - soft shadow

MlGczG

![177](assets/177.jpg)

# 178. Cylinder - intersection

4lcSRn

![178](assets/178.jpg)

# 179. Hexprism - intersection

tljBWy

![179](assets/179.jpg)

# 180. Hexagonal Grid Traversal - 3D

WtSfWK

![180](assets/180.jpg)

# 181. Cylinder - distance

wdXGDr

![181](assets/181.jpg)