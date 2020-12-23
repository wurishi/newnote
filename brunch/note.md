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

## 3.1 Brunch 的目标

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

# 8. 配置

brunch 使用配置文件 brunch-config.js (或 .coffee)来管理项目.

- paths: 从哪里获取文件以及将生成的文件放置在哪里.
- files: brunch 应该确切地生成哪些文件以及如何生成.
- npm: npm 依赖项设置.
- plugins: 单个插件的设置.

不常见的选项:

- modules: 指定 js 模块的细节, 比如 wrapper, definition, autoRequire 和 nameCleaner 等.
- conventions: 定义哪些文件可以被视为资源文件, 哪些文件应该被忽略.
- watcher: brunch 文件监视程序的底层配置.
- server: 允许使用自定义的 web 服务器.
- notifications: 配置通知级别, 标题, 图标等.
- sourceMaps, optimize: 一样简单的开关项.
- hooks: 允许在构建期间的不同时刻指定程序.

配置的所有默认设置, 可以在[这里](https://github.com/brunch/brunch/blob/master/lib/utils/config-validate.js#L9)查看源代码.

### 示例

最简单的 brunch 配置只有 6 行:

```js
module.exports = {
    files: {
        javascripts: {joinTo: 'app.js'},
        stylesheets: {joinTo: 'app.css'},
    }
}
```

每个配置都是一个可执行的脚本, 因此可以在 brunch 里面导入 node.js 模块并执行任意的 js 代码.

### 模式匹配

在 brunch 内部, 使用 [anymatch](https://github.com/micromatch/anymatch) 进行模式匹配, 它可以是字符串, glob, 正则表达式或函数.

- 字符串: 直接匹配源文件的路径, 可以使用 glob, 所以字符串中可以包含通配符 (*, ? 等).

  ```js
  joinTo: {
      'app.css': 'path/to/*.css' // 目录下所有的 css 文件
  }
  ```

- 正则表达式:

  ```js
  jsonTo: {
      'app.js': /\.js$/ // 匹配所有 js 文件
  }
  ```

- 函数: 如果需要特定的模式, 可以使用函数, 它接收文件名的字符串, 并返回 true / false 以确定是否要使用(就像 Array.filter 函数一样):

  ```js
  jsonTo: {
      'app.js': path => path.endsWith('.js') && path.length > 3 // 必须是 .js 结尾的文件, 并且文件名至少要有三个字符
  }
  ```

- 数组: 可以是任意数量的上述类型的混合数组.

  ```js
  jsonTo: {
      'app.js': [
          'path/to/specific/file.js',
          'any/**/*.js',
          /\.test\.js$/,
          path => path.incluces('tmp')
      ]
  }
  ```

  

## 8.1 paths

包含应用程序路径, 路径是简单的字符串.

- public: 构建目录的路径, 该目录包含编译输出的所有文件.
- watched: brunch 观察的所有路径, 默认: `['app', 'test', 'vendor']`.

例如:

```js
paths: {
    public: '/user/www/deploy',
}
// 如果改变了代码的默认目录, 不要忘记将此目录添加到 watched 中
paths: {
    watched: ['src']
}
```

## 8.2 files

配置了哪个编译器用于哪个文件, 输出文件应该具有什么名称等等.

- 选项类型`<type>(javascripts, stylesheets, templates)`
  - joinTo: 描述了如果编译文件并将它们连接在一起. 可用格式:
    - 'outputFilePath' 为了将所有源文件编译为一个
    - map 'outputFilePath'
  - entryPoints: (可选) 描述应用程序的入口, 将指定文件及其所有依赖合并为一个文件. 和 joinTo 类似, 但前者只包含必需的文件. 大多数情况下只需要选择使用其中之一即可, 可用格式:
    - 'entryFile.js': 'outputFilePath'
    - 'entryFile.js': map 'outputFilePath'
  - order: (可选) 定义编译顺序, vendor 文件即使该配置不存在, 它们也会比其他文件先编译.
    - before: 在匹配的文件之前加载定义的文件
    - after: 在匹配的文件之后加载
  - pluginHelpers: (可选) 指定插件包含的文件连接到输出文件(或文件数组)中.

所有 vendor 目录下的文件都会优先于项目中的文件. 所以, 即使没有 order 配置, vendor/scripts/jquery.js 文件也将优先于 app/scripts.js.

总体的排序规则为:

[before] -> [bower] -> [vendor] -> [其他文件] -> [after]

### entryPoints 说明

entryPoints 有一些限制:

- 只能分析静态的 require.

  ```js
  require('something'); // 可以
  ['a','b','c'].forEach(dep => require(dep)); // 不可以
  if(route == '/') {
      require('app/Home'); // 不可以
  }
  ```

- 两个入口不能写入同一个文件.

  ```js
  javascripts: {
      entryPoints: {
          'app/1.js': 'js/bundle.js',
          'app/2.js': 'js/bundle.js', // 不可以
      }
  }
  ```

- 每个入口都会包含 `config.npm.globals`.

- entryPoints 只能针对 javascripts 文件, 其他文件比如 templates 还是需要使用 joinTo.

## 8.3 npm

配置 npm 集成.

- npm.enabled(boolean): 是否启用集成的开关, 默认为 true.
- npm.globals(object): 往全局对象中增加模块.
- npm.styles(object): 将包名称(字符串)到相对于包根目录的样式表(路径数组)加入构建.
- npm.static(array): 直接原样包含的 npm 包中的 js 文件列表, 而无需分析它们的依赖性.
- npm.aliases(object): 别名映射.

```js
npm: {
    styles: {pikaday: ['css/pikaday.css']},
    globals: {Pikaday: 'pikaday'}
}
```

## 8.4 plugins

用于配置如何加载插件, 以及包含特定插件的配置.

- off: 已安装但不应该运行的插件.
- on: 即使 optimize 标识关闭, 也强制运行的插件.
- only: 明确列出要使用的插件, 而忽略其他已经安装的插件.
- npm: 将要编译的插件名称的数组列表. 默认为 `[]`.
- `<plugin>`: 指定插件的配置.

```js
plugins: {
    on: ['postcss-brunch'],
    off: ['jade-brunch', 'handlebars-brunch'],
    npm: ['babel-brunch'],
    autoReload: {enabled: true}
}
```

## 8.5 conventions

检查所有文件路径名.

- ignored: brunch 编译器应该忽略的文件. 默认情况下, 以下划线(_)开头的文件和目录将被忽略.
- assets: 如果匹配将不会编译文件, 而是直接拷贝到 public 目录.
- vendor: 如果匹配将不会打包到模块中.

默认的正则表达式中会将所有 vendor 目录视为第三方模块. 因此 `app/views/vendor/thing/file.js`将被视为第三方模块.

```js
conventions: {
    ignored: () => false, // 默认情况下没有需要忽略的文件
    assets: /files\// // 比如 vendor/jquery/files/jq.img
}
```

## 8.6 modules

- wrapper(string, boolean, function): 项目中非第三方模块代码如何 require. 值:

  - commonjs(默认): CommonJS require.
  - amd: 类似 AMD 的 require.
  - false: 文件直接按原样编译.
  - function

- definition(string, boolean, function): 为每个生成的 js 文件顶部添加的代码. 值:

  - commonjs(默认)
  - amd, false : 无定义
  - function

  ```js
  modules: {
      wrapper: (path, data) => {
          return `require.define({${path}: function(exports, require, module) {
  ${data}
  }});\n\n`;
      }
  }
  ```

- autoRequire: 在连接的文件未尾自动添加指定的模块.

  ```js
  modules: {
      autoRequire: {
          'js/app.js': ['app', 'foo'] // 在打包后的连接文件 js/app.js 的未尾自动添加 require('app') 和 require('foo')
      }
  }
  ```

- nameCleaner: 为模块名称设置过滤器.

  ```js
  modules: {
      nameCleaner: path => path.replace(/^app\//, '')
  }
  ```

## 8.7 notifications

通知默认为开启.

- false: 停用通知.
- 数组:
  - levels(array): 默认情况下, 只有错误会触发通知. 如果要显示成功, 警告或信息消息, 可以设置为: `['error', 'warn', 'info']`
  - app(string): 通知中使用的标题, 默认为 brunch.
  - icon(string): 设置通知弹出窗口的图标.

## 8.8 optimize

boolean: 是否启用优化器. 默认为 false. (如果运行了 `brunch build --production`则为 true).

## 8.9 server

自定义 brunch 服务器. 

## 8.10 sourceMaps

boolean: 启用或禁用代码 map 生成. 默认值为 true(启用), 当运行 `brunch build --production`时为 false(禁用).

string:

- 设置为 'old' 使用 @ 代替 #.
- 设置为 'absoluteUrl' 将设置 sourceMappingURL 为完整的 URL 路径.
- 设置为 'inline' 将设置为 sourceMappingURL 包含数据的 URI.

## 8.11 fileListInterval

设置一个以毫秒为单位的间隔, 该间隔用于确定 brunch 检查文件列表中文件的频率, 默认为 65.

## 8.12 overrides

备用配置设置, 通过命令行开关 (`--env`)激活. 使用逗号分隔列表可以一次应用多组( `--env foo,bar` ).

默认值:

```js
overrides: {
    production: {
        optimize: true,
        sourceMaps: false,
        plugins: {
            autoReload: {enabled: false}
        }
    }
}
```

## 8.13 watcher

brunch 使用 [chokidar](https://github.com/paulmillr/chokidar) 文件监视库的可选设置.

- usePolling (默认为 false): 是否使用 fs.watchFile(轮询) 或 fs.watch. 轮询速度较慢, 但更可靠.

## 9.14 hooks

用于构建周期的不同时刻执行指定的代码.

- preCompile: 在 brunch 开始编译之前调用, 如果返回 promise, 则会等待它结束.

  ```js
  hooks: {
      preCompile() {
          console.log('开始编译');
          return Promise.resolve();
      }
  }
  ```

- onCompile: 每次完成编译是调用, 回调函数包含了二个入参:

  - generatedFiles 数组, 每个数组对象包含如下属性:
    - path: 编译文件的路径
    - sourceFiles: 每个源文件的对象数组
    - allSourceFiles: 每个源文件的对象数组, 还包括了不属于原始类型的文件.
  - changedAssets 数组, 每个数组对象包含如下属性:
    - path: 资源的原始路径
    - destinationPath: 输出到 public 目录下的资源路径