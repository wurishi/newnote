| 类型      | 名称                  | 描述                                          |
| --------- | --------------------- | --------------------------------------------- |
| vec3      | iResolution           | 视口分辨率 (z 为 像素对应的实际像素, 默认为1) |
| float     | iTime                 | 当前时间 (秒)                                 |
| float     | iTimeDelta            |                                               |
| int       | iFrame                |                                               |
| float     | iFrameRate            |                                               |
| float     | iChannelTime[4]       |                                               |
| vec3      | iChannelResolution[4] |                                               |
| vec4      | iMouse                |                                               |
| sampler2D | iChannel{i}           |                                               |
| vec4      | iDate                 |                                               |
| float     | iSampleRate           |                                               |

`gl_FragCoord`

![webgl-pixels](assets/webgl-pixels.png)

```bash
# 首次运行先生成 dll
npx webpack --config webpack.dll.config.js
# 开启 webpack 测试服务器
npx webpack-dev-server
```

