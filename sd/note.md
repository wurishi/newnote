# Prompts

## 内容型提示词

人物及主体特征

- 服饰穿搭: white dress
- 发型发色: blonde hair, long hair
- 五官特点: small eyes, big mouth
- 面部表情: smiling
- 肢体动作: stretching arms

场景特征

- 室内、室外: indoor / outdoor
- 大场景: forest, city, street
- 小细节: tree, bush, white flower

环境光照

- 白天黑夜: day / night
- 特定时段: morning, sunset
- 光环境: sunlight, bright, dark
- 天空: blue sky, starry sky

补充：画幅视角

- 距离: close-up, distant
- 人物比例: full body, upper body
- 观察视角: from above, view of back
- 镜头类型: wide angle, Sony A7 III

## 画质提示词

通用高画质

best quality, ultra-detailed, masterpiece, hires, 8k

特定高分辨率类型

extremely detailed CG unity 8k wallpaper （超精细的8K Unity 游戏CG）
unreal engine rendered （虚幻引擎渲染）

## 画风提示词

- 插画风: illustration, painting, paintbrush
- 二次元: anime, comic, game CG
- 写实系: photorealistic, realistic, photograph

通用模板
- 描述人物
- 描述场景
- 描述环境（时间，光照）
- 描述画幅视角
- 其他画面要素

- 高品质标准化
- 画风标准化
- 其他特殊要求

## 提示词权重

`(prompt)`: 权重 x1.1 倍，套三次就是 x1.331 倍

`(prompt:num)`: 指定权重为 num 倍

`{prompt}`: 权重 x1.05 倍

`[prompt]`: 权重 x0.9 倍

## 进阶语法

混合

混合两个描述同一对象的提示词要素

`white | yellow flower`: 生成黄色和白色混合的花

迁移

连续生成具有多个不同特征的对象，不断迁移

`[white|red|blue] flower`: 先生成白花，再生成红花，再生成蓝花

迭代

与采样进程关联，一定阶段以后再生成特定对象

`(white flower:bush:0.8)`: 进程到 80%(0.8) 之前生成白花，之后再生成灌木

## 负面提示词（Negative Prompts）

- 低质量: low quality, low res
- 单色灰度: monochrome, grayscale
- 样貌身形: bad proportions, ugly
- 四肢问题: missing hands, extra fingers