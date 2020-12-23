[link](https://brunch.io/docs/getting-started)

# 1. Brunch 入门

## 1.1 安装并使用

安装:

```bash
npm i brunch -g
```

创建第一个项目:

```bash
brunch new proj -s es6
```

上述命令总共做了以下三件事情:

- 创建了一个 proj 的目录.
- 克隆了 git 仓库路径`git://github.com/brunch/with-es6.git`到 proj 目录下. 这个 Git 路径被称为 "es6" skeleton.
- 运行 `npm i`安装应用需要的依赖以及 brunch 插件.

## 1.2 创建项目后的目录结构

```js
README.md
app/
	assets/	// 'assets' 目录下的文件会简单的拷贝到 'public' 目录下.
    	index.html
brunch-config.js // 项目的基本设置, 比如路径, 输出等.
node_modules/
package.json	// 描述了项目中所有的依赖以及 brunch 的插件.
public/	// 默认情况下每次 brunch 重新编译都会重新生成(output 配置)
    index.html	// 简单的从 app/assets/ 下拷贝来的内容
	app.js	// 生成的 js 文件
	app.js.map	// 生成的 mapping 文件
```

## 1.3 修改文件

app 下的 css 文件会被生成到 public/app.css

app 下的 js 代码会被打包到 public/app.js

通过命令:

```bash
# 编译
npm run prod # brunch build --production
```

## 1.4 启用监视服务

```bash
# 创建一个简易服务器 localhost:3333
npm start # brunch watch --server
```

## 1.5 引入第三方

先使用 npm 安装第三方, 然后在 app 目录下的代码中直接使用即可.

## 1.6 使用插件

如果要尝试新的 ECMAScript 201X, 遵循 ESLint 规则, 然后有超过 50 个 Brunch 插件帮助你完成这些功能. 比如:

```bash
npm i -D babel-brunch
```

然后就能在代码里面使用 ES6 的语法了.

# 2. Brunch 核心概念

所有的 Brunch 创建的项目都包含以下内容:

- brunch-config: 用于配置 brunch 以及相关插件配置.
- package.json: 记录了 brunch 使用的相关插件以及项目本身依赖.
  - brunch 相关插件允许你自定义行为用以处理 js 或 css 等文件.
- source files:  源代码文件, 最终会编译成 js 或 css.
- assets: 资源文件会直接在编译时拷贝到发布目录下. (在某些情况下, 也可以编译这些文件, 例如 Jade -> HTML)
- vendor files: 不需要任何处理的 js 和 css 文件.
- output files: 通过源文件打包生成的最终使用的 js 和 css 文件.

Brunch 本质上就做以下几件事情:

1. 使用合适的插件编译你的源代码文件.
2. 将多个编译好的文件合并到一起.
3. 将结果写入文件.
4. 拷贝资源文件.

唯一需要做的就是通过配置告诉 brunch 所需的输出文件:

```js
module.exports = {
    files: {
        javascripts: {joinTo: 'app.js'},
        stylesheets: {joinTo: 'app.css'}
    }
}
```

这会将所有的 javascript 文件连接到 public/app.js 目录下.

如果想要更多的配置, 例如将代码拆分成不同的独立文件:

```js
module.exports = {
    files: {
        javascripts: {
            joinTo: {
                'app.js': /^app/, // 所有 app/ 目录下的代码
                'vendor.js': /^(?!app)/ // 所有除了 app/ 目录以外的代码, 比如 'vendor/', 'node_modules/' 等
            }
        },
        stylesheets: {jointTo: 'app.css'}
    },
}
```

brunch 的配置是声明性的, 而不是命令性的. 你只需要告诉 brunch 你需要获得什么, 而不是如何执行.

# 3. 为什么使用 Brunch

为什么使用 brunch 而不是 webpack, grunt 或 gulp 等.

## 3.1 brunch 的目标

brunch 在构建时考虑了两点: 速度和简单性.

与 webpack, grunt 或 gulp 相比, brunch 的配置要简单一个数量级.

编译花费的时间更少. 特别是运行观察程序时, 它只会重建更改的内容, 而不是所有内容, 这可以使得增量编译在 500 毫秒内完成.

为了实现以上两个目标, brunch 确实必须对应用程序做出某些假设, 这也是 brunch 核心概念中涉及的相关配置以及配置是声明性的原因.

除了配置, brunch 在命令方面也更简单, brunch 总共只有三个命令: `new`, `build`和 `watch`. 另外 `build`和 `watch`可能会接收可选的 `production`标记, 该标记用于告知 brunch 优化 javascript 和样式表.



## 3.2 Brunch vs Webpack

两者相似的地方:

- 一流的模块支持
- 可以进行热更新(HMR)
- 有一个编译器(compiler) / 加载器(loader)的概念
- 可以 `require`样式表

brunch 无法做到的事情:

- 异步模块加载 / 代码拆分, 但 brunch 可以指定入口并生成多个 js 包.
- 可以定制处理非 js 或 css 资源.

brunch 与 webpack 不同的是:

- 不需要每次使用一个新插件时都需要指定如何编译文件. 只需要添加一个编译器插件, 就能正常工作.
- 缩短构建时间.

## 3.3 Brunch vs Grunt/Gulp

他们使用任务的概念用于运行程序, 使得你要使用大量的代码创建自定义管道.

要获得模块支持, 必须另外配置或使用 Browserify 之类的东西.

即使如此, 观察模式下的重建过程也不会是增量的, 它们会始终重新编译导致运行缓慢.

## 3.4 Brunch vs Rails Asset pipeline / LiveReload / CodeKit

使用 pipeline 都有类似的缺点, 使用 brunch 可以:

- 使用任何的后端, 例如 node.js, Rails 或 Lift. 甚至可以将前端和后端分离为单独的项目.
- 获得自动模块支持.
- 获得 npm 和 Bower 支持.
- 重新构建将是快速且增量的.

# 4. 使用插件

brunch 使用 node.js 插件来提供编译, 检查, 优化功能.

brunch 有一个插件生态系统, 可以通过各种插件实现与各种工具的互操作性.

## 4.1 插件类型

brunch 插件可以分为三大类 (一个插件可以同时属于多种)

- 编译器(Compilers): 负责将源文件编译成浏览器可以理解的内容. 例如: CoffeeScript 到 JavaScript 编译器, 或 Stylus 到 CSS 编译器.
- 代码检查(Linters): 允许在构建时防止某些类型的错误或强制执行特定的编码样式.
- 优化器(Optimizers): 优化已经编译的 JS 或 CSS 文件.

## 4.2 插件安装

通过 npm 命令安装插件:

```bash
npm i -D sass-brunch
# 安装尚未发布到 npm 且只能通过 git 访问的插件
npm i -D brunch/sass-brunch
# 删除插件
npm un sass-brunch # 或直接从 package.json 中删除
```

## 4.3 插件配置

brunch 的插件是开箱即用的. 但有时可能需要自定义它们的工作方式, 以使其适合你的项目. 一般插件的 README 中都有相关配置的详细信息. 通常情况下配置位置是在 `config.plugins.<plugin>`:

```js
module.exports = {
    plugins: {
        babel: {
            presets: ['react']
        }
    }
}
```

## 4.4 插件执行顺序

插件的执行顺序按照 package.json中定义, 当它们在相同文件(通常是目标文件)上运行时, 其顺序可能会影响其工作. 例如: `groundskeeper-brunch`要求在所有 minifiers 之前运行, 因为它们会混淆前者所依赖的某些代码结构, 以检测可修剪的代码.

## 4.5 高级插件功能

### 4.5.1: 从样式表导出到 JS

CSS 编译器插件可以为样式表生成一些 JS 输出.

比如 css 样式可能会变成类似这样:

```css
._button_xkplk_42 {
    margin: 0;
}
```

为了让 js 组件获得实际的类名, 编译器允许使用 `require`获得该 css 文件的类映射信息:

```jsx
const style = require('./button.styl');

<div className={style.button}></div>
```

### 4.5.2: 编译资源

有时候会想要将资源转换成另一种文件, 而这种文件本身不适合 brunch 的常规 js / css / template 流程. 例如将 Jade 编译成 HTML.

## 4.6 提示

不要包含不使用的插件, 它们可能会不必要地减慢构建过程.

# 5. 使用 JS 模块和 NPM

## 5.1 介绍

按模块组织代码是 brunch 的中心思想. 它允许你的文件具有各自的范围, 并且仅在需要时执行.

文件名也是它的模块名, 例如: app/config.js 模块名为 config.js. 使用 CommonJS, 可以直接让模块通过将它们放入 module.exports 来使用, 就像 node 一样.

```js
// app/config.js
module.exports = {
    api: {
        host: 'brunch.io'
    }
}
```

要在其他模块中使用它, 直接 `require`即可. 请注意, 有可能需要使用带扩展名的名称(config.js)或不带扩展名的名称(config):

```js
const config = require('config');

makeRequest(config.api, 'GET', 'plugins');
```

项目应该有一个入口模块, 该模块将加载其他模块并运行. 在浏览器中加载 HTML 时, 需要告知它加载这个入口模块. 有两种方法可以实现:

- 在 html 添加 `<script>require('initialize')</script>`, 入口模块将位于 `app/initialize.js`.

- 在配置中添加一个 autoRequire.

  ```js
  // brunch-config
  module.exports = {
      modules: {
          autoRequire: {
              // outputFileName : [ entryModule ]
              'javascripts/app.js': ['initialize']
          }
      }
  }
  ```

## 5.2 模块类型

brunch 支持以下几种 js 模块:

- CommonJS (默认)
- AMD
- 自定义模块

可以在项目中使用其中任何一种, 但是 CommonJS 正在成为通用标准, 并且 brunch 的某些功能(如 npm 集成) 仅适用于 CommonJS. 另外, 大部分文档假定使用的是 CommonJS.

### 5.2.1 使用 node 模块

默认情况下, brunch 2.3 开始启用 npm 集成, 因为不需要其他设置, 只需要 `npm i`, 然后像平时一样简单地使用 `require`引入项目中, brunch 便会找到其他的程序包.

```js
files: {
    javascripts: {
        joinTo: {
            'js/app.js': /^app/,
            'js/vendor.js': /^(?!app)/ // 正则也可以使用 /node_modules/
        }
    }
}
```

### 5.2.2 导入模块样式

通过配置 styles 属性可以让 brunch 导入模块中的样式.

```js
module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': /^app/,
        'js/vendor.js': /^(?!app)/,
      },
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^app/,
        'css/vendor.css': /^node_modules/, // 必须指定, 将 npm.styles 中指定的 css 打包到 vendor.css 中, 另外在 index.html 中不要忘了 link
      },
    },
  },
  modules: {
    autoRequire: {
      'js/app.js': ['babylonjs'],
    },
  },
  npm: {
    styles: {
      'hover.css': ['css/hover.css'], // 导入 node_modules 下 hover.css 目录下的 css
    },
  },
};
```

注意, 对于来自于 npm 包的其他资源(例如图像, 字体等), 必须手动将其复制到公用的文件夹中. 可以使用 npm 的 postinstall hook 进行复制.

### 5.3.3 将第三方包变成全局

可以将 npm 提供的第三方包, 公开给全局变量 window, 这样使用时就不需要引入该模块了. 具体操作见 brunch 配置.

## 5.3 模块热替换

brunch 使用 hmr-brunch 插件提供模块热替换

## 5.4 使用 Bower

虽然 npm 已经成为前端软件包的标准, 但 brunch 仍然可以支持 Bower, 要将包添加到项目中需要以下几步:

- 确保有 bower.json 文件, 可以使用 bower init 生成.
- 将软件包添加到 bower.json 文件中的 dependencies 字段.
- 为不使用的软件包在 bower.json 中设置 overrides 属性.
- overrides 不会影响 Bower 的行为, 但是它会改变实际构建时项目的依赖项.

使用 npm post-install 脚本:

```json
"scripts": {
    "postinstall": "cp -r node_modules/font-awesome/fonts public/fonts"
}
```

使用 overrides 属性覆盖某些依赖:

```json
"dependecies": {
    "some-awesome-package": "~0.0.1"
},
"overrides": {
    "some-awesome-package": {
        "main": "./lib/just_one_component.js"
    }
}
```

# 6. 测试

## 6.1 单元测试

当前的单元测试包括:

- 在外部 node 使用构建好的 bundle.
- 在浏览器中运行单元测试.

目前不支持在 node 中运行单元测试.

## 6.2 集成测试

在浏览器进行集成测试, 不需要其他步骤.

下面是一个加载所有以 -test 结尾的文件的示例:

```js
require.list()
	.filter(name => /-test$/.test(name))
	.forEach(require);
```

# 7. Brunch 命令

## brunch new / brunch n

使用 brunch 创建项目, 完整语法:

`brunck new [path] [-s skeleton]`

- path (可选, 默认值: `.`): 创建项目目录的名称.
- -s --skeleton (可选, 默认值: simple): 框架名称或来自 [brunch.io/skeletons](https://brunch.io/skeletons) 的 URL.

比如:

- `brunch new`: 默认框架不会添加任何库或框架
- `brunch new -s es6`: 创建一个使用 Babel 编译支持的 ECMAScript 6 项目.
- `brunch new -s react`/ `brunch new -s redux`: react 用户最爱.

可以通过 BRUNCH_INIT_SKELETON 为 new 命令指定环境变量.

```bash
BRUNCH_INIT_SKELETON = es6
# 以后的 brunch new 将等同于 brunch new -s es6
```

brunch new 会先查找命令中提供的框架名, 然后再查找 env 变量 BRUNCH_INIT_SKELETON, 如果仍未提供框架名, 则应用默认的框架.

## brunch build / brunch b

构建项目并将输出放置到 public 目录中.

参数:

- -e, --env: 使用 config.overrides[SETTING] 中的配置.
- -p, --production: 创建优化的生产版本. 和 -e production 相同.
- -j, --jobs WORKERS: 启用实验性质的多进程支持. 可能会提供大型项目的编译速度. 尝试不同的 WORKERS 数量, 找到最适合自己操作系统.
- -d, --debug: 启用详细的调试输出.

## brunch watch / brunch w

监视项目目录中的更改, 并在更改发生时重新构建整个项目.

参数:

- brunch build 中所有可用的选项.
- -s, --server: 运行一个简单的 HTTP + pushstate 服务器, 该服务器运行在 public 目录下.
- -P, --port: 指定服务器运行在哪个端口上.

## 默认框架

- 这是一开始使用 brunch 创建项目的最佳选择.
- 它提供了 brunch 的初始配置, 并已经可以正常工作.
- 干净的文件夹结构, 简单的 brunch 配置以及很少的默认插件.