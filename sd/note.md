https://cloud.tencent.com/developer/article/2273366?from=20783

https://www.esheep.com/model/1569

# Sampler (采样器/采样方法)

- Euler: 最简单，最快。
- Euler a (Eular ancestral): 可以以较少的步数产生很大的多样性，不同的步数可能有不同的结果。而非 ancestral 采样器都会产生基本相同的图像。但是太高步数(>30)效果不会更好。
- DPM: 相关的采样器通常具有不错的效果，但耗时也会相应增加。
- DDIM: 收敛快，但效率相对较低，因为需要很多 step 才能获得好的结果，适合在重绘时使用。
- LMS: 是 Euler 的衍生，它们使用一种相关但稍有不同的方法（平均过去的几个步骤以提高准确性）。大概 30step 可以得到稳定结果。
- PLMS: 是 Euler 的衍生，可以更好的处理神经网络结构中的奇异性。
- DPM2: 是一种神奇的方法，它旨在改进 DDIM ，减少步骤以获得良好的结果。它需要每一步运行两次去噪，它的速度大约是 DDIM 的两倍，生图效果也非常好。但是如果在进行调试提示词的实验，这个采样器可能会有点慢。
- UniPC: 效果较好且速度非常快，对平面，卡通的表现较好，推荐使用。

- Steps20-30 测试艺术，动漫，真实类的模型表现都很好，真实类使用 DPM2 Karras 更好。
  - Euler a: prompt测试时使用
  - Euler: prompt框架调整时使用
  - DPM2: 适合单抽，20以内变化不大
  - DPM2 Karras: 出图快效果不错，30步以后不好把控
  - DPM2++2M SDE: 25-30效果最佳，40步以上可单抽
  - DPM++ 2M Karras: 15步效果理想，对prompt的贴合度高
- Steps30+
  - DPM2: 推荐30-35
  - DPM2++ 2S a: 生成无关文字几率大，记得用反向词。质感，光效不错，人物细节表现好，40步以上推荐
  - DPM2++ 2M: 步数越高细节补充越好（40最佳）
- Steps40+
  - LMS Karras: 40以下面部异常，40后效果不错，20步以内变化不大，可以单抽
  - DPM2 fast: 45步以上才出效果，描述宽泛时可以使用
  - PLMS: 50步以上

# ControlNet

## 可用预处理/模型

- canny: 用于识别输入图像的边缘信息
- depty: 用于识别输入图像的深度信息
- hed: 用于识别输入图像的边缘信息，但边缘更柔和
- mlsd: 用于识别输入图像的边缘信息，一种轻量级的边缘检测。它对横平竖直的线条非常敏感，因此更适合于室内图的生成
- normal: 用于识别输入图像的法线信息
- openpose: 用于识别输入图像的动作信息
- scribble: 将输入图像作为线稿识别，如果线稿是白色背景，务必勾选“Invert Input Color”
- fake_scribble: 识别输入图像的线稿，然后再将它作为线稿生成图像
- segmentation: 识别输入图像各区域分别是什么类型的物品，再用此构图信息生成图像



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

`[to:when]`: 在指定数量的 step 后，将 to 处的提示词添加到提示

`[from::when]`: 在指定数量的 step 后，从提示中删除 from 处的提示词

`[from:to:when]`: 在指定数量的 step 后，将 from 处的提示词换为 to 处的提示词 

## 负面提示词（Negative Prompts）

- 低质量: low quality, low res
- 单色灰度: monochrome, grayscale
- 样貌身形: bad proportions, ugly
- 四肢问题: missing hands, extra fingers