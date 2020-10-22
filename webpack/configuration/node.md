[link](https://www.webpackjs.com/configuration/)

# 1. 配置

webpack 是需要传入一个配置对象(configuration object). 取决于你如何使用 webpack, 可以通过两种方式之一: 终端或 Node.js.

[参考](./1/webpack.config.js)

# 2. 使用不同语言进行配置 (configuration languages)

webpack 接受以多种编程和数据语言编写的配置文件. 支持的文件扩展名列表, 可以在 node-interpret 包中找到. 使用 node-interpret, webpack 可以处理许多不同类型的配置文件.

## 2.1 TypeScript

为了使用 TypeScript 书写 webpack 的配置文件, 必须先安装相关依赖:

```bash
npm i -D typescript ts-node @types/node @types/webpack
```

webpack 版本 >= 2.7, 或者, 在 `tsconfig.json`文件中, 具有 `esModuleInterop`和 `allowSyntheticDefaultImports`这两个新的编译器选项的较新版本的 TypeScript.

### 问题

注意, 还需要核对 `tsconfig.json`文件. 如果 `tsconfig.json`中的 `compilerOptions`中的 module 字段是 `commonjs`, 则配置正确. 因为 `ts-node`仅支持 `commonjs`模块语法.

#### 解决方案一: 修改 tsconfig.json

打开 `tsconfig.json`文件并查找 `compilerOptions`. 将 `target`设置为 `"ES5"`, 以及将 `module`设置为 `"CommonJS"`(或者完全移除 `module`选项).

#### 解决方案二: 使用 tsconfig-paths

如果不能修改 `tsconfig.json`, 则可以安装 `tsconfig-paths`包:

```bash
npm i -D tsconfig-paths
```

然后, 为 webpack 专门创建一个单独的 TypeScript 配置:

tsconfig-for-webpack-config.json

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5"
    }
}
```

> `ts-node`可以使用 `tsconfig-path`提供的环境变量来解析 `tsconfig.json`文件

然后设置 `tsconfig-path`提供的环境变量 `process.env.TS_NODE_PROJECT`:

package.json

```json
{
    "scripts": {
        "build": "TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
    }
}
```

## 2.2 CoffeeScript

```bash
npm i -D coffee-script
```

## 2.3 Babel and JSX

首先安装依赖:

```bash
npm i -D babel-register jsxobj babel-preset-es2015
```

.babelrc

```json
{
    "presets": ["es2015"]
}
```

webpack.config.babel.js

```jsx
import jsxobj from 'jsxobj';

const CustomPlugin = config => ({
    ...config,
    name: 'custom-plugin'
});

export default (
	<webpack target="web" watch mode="production">
    	<entry path="src/index.js" />
        <resolve>
        	<alias {...{
                    react: 'preact-compat',
                    'react-dom': 'preact-compat'
                }} />
        </resolve>
        <plugins>
        	<uglify-js opts={{
                    compression: true,
                    mangle: false
                }} />
            <CustomPlugin foo="bar" />
        </plugins>
    </webpack>
)
```

> 如果你在其他地方也使用了 Babel 并且把 `模块(modules)`设置为了 `false`, 那么你要么同时维护两份单独的 `.babelrc`文件, 要么使用 `const jsxobj = require('jsxobj');` 并且使用 `module.exports`而不是新版本的 `import`和 `export`语法. 这是因为尽管 Node.js 已经支持了许多 ES6 的新特性, 然而还无法支持 ES6 模块语法.