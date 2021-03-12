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

# 1. Fovea detector

![1](assets/1.png)

# 2. yonatan fractal

![2](assets/2.jpg)

# 3. Trig-less Hash

![3](assets/3.jpg)

# 4. Creation by Silexars

![4](assets/4.jpg)

# 5. tiny

![5](assets/5.jpg)

# 6. Flame

![6](assets/6.jpg)

# 7. Star Nest

![7](assets/7.jpg)

# 8. Fractal Land

![8](assets/8.jpg)

# 9. Curvature - Parametric 3D

![9](assets/9.jpg)

# 10. Elephant Ear Plants

![10](assets/10.jpg)

# 11. Isopleth

![11](assets/11.jpg)

# 12. Alloy Plated Voronoi

![12](assets/12.jpg)

# 13. Voronoi - smooth

![13](assets/13.jpg)

# 14. Seascape

![14](assets/14.jpg)

# 15. Mystify Screensaver

# 16. Ray Marching: Part 6

![16](assets/16.jpg)

# 17. HCL Color Range

![17](assets/17.png)

# 18. Very fast procedural ocean

![18](assets/18.jpg)

# 19. Planet #2

![19](assets/19.jpg)

# 20. Liberation of the True Self

![20](assets/20.jpg)

# 21. neuron 1512 "lol"

![21](assets/21.jpg)

# 22. Synthesis ideas

![22](assets/22.png)

# 23. Fork MANO fract NikolaErce 337

![23](assets/23.jpg)