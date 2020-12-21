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
# 创建一个简易服务器 localhost:3333
npm start # brunch watch --server

# 编译
npm run prod # brunch build --production
```

