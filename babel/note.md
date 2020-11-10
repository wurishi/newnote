[link](https://www.babeljs.cn/docs/)

# 1. 指南

## 1.1 Babel 是什么?

### Babel 是一个 JavaScript 编译器

Babel 是一个工具链, 主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法, 以便能够运行在当前和旧版本的浏览器或其他环境中. 下面列出的是 Babel 能够做的事情:

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性(通过 `@babel/polyfill` 模块)
- 源码转换 (codemods)
- 更多!

```js
// Babel 输入: ES2015 箭头函数
[1, 2, 3].map((n) => n + 1);

// Babel 输出: ES5 语法实现的同等功能
[1, 2, 3].map(function(n) {
    return n + 1;
});
```

### ES2015 及更新版本

Babel 通过语法转换器来支持新版本的 JavaScript 语法.

### JSX 与 React

Babel 能够转换 JSX 语法! 具体参考 `@babel/preset-react`.  通过和 babel-sublime 一起使用还可以把语法高亮的功能提升到一个新的水平.

```bash
npm i -D @babel/preset-react
```

并将 `@babel/preset-react`添加到 Babel 配置文件中.

### 类型注释 (Flow 和 TypeScript)

Babel 可以删除类型注释! 要注意的是 Babel 不做类型检查, 你仍然需要安装 Flow 或 TypeScript 来执行类型检查的工作.

安装 flow preset

```bash
npm i -D @babel/preset-flow
```

安装 typescript preset

```bash
npm i -D @babel/preset-typescript
```

### 插件化

Babel 构建在插件之上. 使用现有的或者自己编写的插件可以组成一个转换管道. 通过使用或创建一个 preset 即可轻松使用一组插件.

使用 astexplorer.net 可以立即创建一个插件, 或者使用 generator-bable-plugin 生成一个插件模板.

### 可调试

由于 Babel 支持 Source map, 因此你可以轻松调试编译后的代码.

### 符合规范

Babel 尽最大可能遵循 ECMAScript 标准. 不过, Babel 还提供了特定的选项来对标准和性能做权衡.

### 代码紧凑

Babel 尽可能用最少的代码并且不依赖太大量的运行环境.

有些情况是很难达成这一愿望的, 因此 Babel 提供了 "loose" 参数, 用以在特定的转换情况下在符合规范, 文件大小和速度之间做折中.

## 1.2 使用指南

Babel 工具链中有很多工具可以让你使用 Babel 时更方便.

### 总览

演示如果将 ES2015+ 的语法编译成当前浏览器可用的 JavaScript 代码. 主要涉及语法转换和 polyfilling(填充)缺少的功能.

1. 安装

   ```bash
   npm i -D @babel/core @babel/cli @babel/preset-env
   npm i @babel/polyfill
   ```

2. 创建 babel.config.json 配置

   ```json
   {
     "presets": [
       [
         "@babel/env",
         {
           "targets": {
             "edge": "17",
             "firefox": "60",
             "chrome": "67",
             "safari": "11.1"
           },
           "useBuiltIns": "usage"
         }
       ]
     ]
   }
   ```

   可以按自己的需求修改支持浏览器的版本.

3. 使用命令编译 src 目录下的代码到 lib 目录

   ```bash
   npx babel src --out-dir lib
   ```

### CLI 的基本用法

#### 核心 library

Babel 的核心功能位于 `@babel/core` 模块中.

```bash
npm i -D @babel/core
```

然后就可以直接在 JavaScript 中 `require` 它.

```js
const babel = require('@babel/core');
babel.transform('code', optionsObject);
```

当然了, 一般情况下我们不会直接使用 babel 的 API, 更多的是安装其他的工具(如 `webpack`), 一起协同使用.

#### CLI 工具

`@babel/cli` 允许你从终端使用 babel. 安装与用法示例:

```bash
npm i -D @babel/core @babel/cli
npx src --out-dir lib
# 或者
./node_modules/.bin/babel src --out-dir lib
```

### 插件 (plugins) 和预设 (presets)

代码转换是以插件的形式出现的, 这些插件其实就是一段 JavaScript 程序, 它们用来指示 Babel 如何进行代码转换. 如果有需要, 你也可以自己编写插件按你的需求转换代码.

以下演示一个官方插件 `@babel/plugin-transform-arrow-functions`, 用来将所有箭头函数转换成 ES5 兼容的函数表达式.

```bash
npm i -D @babel/plugin-transform-arrow-functions
npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

我们往往需要非常多的插件才能完成所有 ES2015+ 的代码转换. 这时候我们可以使用一个 preset(预设), 它包含了一组预先设定好的插件. 

和插件一样, 我们也可以自己创建预设来设置所有我们需要的插件. 一般而言, 会使用一个官方的预设, 名为 env:

```bash
npm i -D @babel/preset-env
npx babel src --out-dir lib --presets=@babel/env
```

以上都是在终端使用 CLI 传递预设选项的, 更合理的情况是将选项放到配置中.

### 配置

根据需要, 有好几种使用配置文件的方法. 具体请参考 *1.3 配置 Babel*.

babel.config.json

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

此时, env 预设将仅加载目标浏览中不提供的功能转换插件.

### Polyfill

> 从 Babel 7.4.0 开始不建议使用 `core-js/stable`(用来 polyfill ECMAScript 功能) 和 `regenerator-runtime/runtime`(用来转换 Generator 函数)

`@babel/polyfill`模块包含了 `core-js`和自定义的 `regenerator runtime`用来模拟完整的 ES2015+ 环境.

意味着你可以使用 `Promise`或 `WeakMap`, 静态方法比如 `Array.from`或 `Object.assign`, 实例方法如 `Array.prototype.includes`以及生成器函数. 另外 polyfill 还会增加全局作用域的类型如 `String`.

这些功能有时候对于使用者来说可能会太多了. 比如你其实并不一定需要 `Array.prototype.includes`, 这时候你可以使用 `transform runtime`插件来代替 `@babel/polyfill`

首先你需要先从 `core-js`中获取你需要 polyfill 的功能.

然后安装 `@babel/polyfill`

```bash
npm i @babel/polyfill --save
```

要注意的是这样使用的是 `--save`而非 `--save-dev`. 因为 polyfill 需要在你的源代码之前先运行.

幸运的是, 我们可以直接在 `env`预设的配置中使用 `"useBuiltIns"`选项, 并设置为 `"usage"`. 它会自动应用一个优化, Babel 会检查所有的代码, 以了解目标环境中缺少的功能, 并且仅 `require`需要的 polyfill.

例如:

```js
Promise.resolve().finally();
```

因为在 Edge 17 中没有, 所以会转换成这样:

```js
require("core-js/modules/es7.promise.finally");
// ...
Promise.resolve().finally();
```

## 1.3 配置 Babel

### 根据你的项目需求可以使用不同的配置.

- 使用了 monorepo

- 想要编译 `node_modules`

  > 使用 `babel.config.json`

- 仅项目中的某个单一部分

  > 使用 `.babelrc.json`

`babel.config.json`

可以使用 json 配置, 或者使用 JavaScript 代码形式(最好将文件名改为 `babel.config.js`, json 文件和 js 文件 babel 都会去识别, 但同一目录下仅能存在两者之一 )

`babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);

  const presets = [];
  const plugins = ['@babel/plugin-transform-arrow-functions'];

  return {
    presets,
    plugins,
  };
};
```

`.babelrc.json`

可以针对项目中的某一部分配置 babel.

`package.json`

另外, 还可以直接将 babel 的配置写在 `package.json`中, 使用 `babel`作为键即可:

package.json:

```json
{
    "name": "my-package",
    "version": "1.0.0",
    "babel": {
        "presets": [],
        "plugins": []
    }
}
```

### JavaScript 配置文件

在 `babel.config.json`和 `.babelrc.json`文件中可以使用 JavaScript.

如果使用了 JavaScript , 那么还支持使用 Node.js 的 API, 比如:

```js
const presets = [];
const plugins = [];

if(process.env['ENV'] === 'prod') {
    plugins.push('@babel/plugin-transform-arrow-functions');
}

module.exports = {
    presets,
    plugins,
};
```

## 1.4 ECMA Script 2015

这里列出了 ECMAScript 2015 的新功能.

### 箭头函数

```js
() => {}
```

### 类

```js
class Demo extends THREE.Mesh {
    
}
```

### 对象属性赋值

```js
const handler = () => {};
const obj = {
    handler, // 等同于 handler: handler
}
```

### 模板字符串

```js
const name = 'Bob';
const str = `Hello ${Bob}`;
```

### 解构

```js
const [a, , b] = [1, 2, 3]; // a === 1, b === 3
const {p1, p2: { p3 }} = obj;
function fn({x, y, z=10}) {
    return x + y + z;
}
fn({x: 100, y: 200}); // return 310
```

### 函数参数默认值和 `rest`

```js
function fn(x, y = 12, ...rest) {
    return x + y + rest.length;
}
```

### 展开运算符

```js
function fn(x, y, z) {
    return x + y + z;
}
fn(...[1, 2, 3]); // return 6
```

### `Let` 和 `Const`

### 迭代器和 `for...of`

```js
let tmp = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1;
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return { done: false, value: cur };
            }
        }
    }
}

for(const n of tmp) {
    if(n > 1000)
        break;
    console.log(n);
}
```

TypeScript 类型:

```typescript
interface IteratorResult {
    done: boolean;
    value: any;
}
interface Iterator {
    next(): IteratorResult;
}
interface Iterable {
    [Symbol.iterator](): Iterator;
}
```

### 生成器函数

```js
const tmp = {
    [Symbol.iterator]: function* () {
        let pre = 0, cur = 1;
        for(;;) {
            [pre, cur] = [cur, pre + cur];
            yield cur;
        }
    }
};
for(const n of tmp) {
    if(n > 1000)
        break;
    console.log(n);
}
```

TypeScript 类型:

```typescript
interface Generator extends Iterator {
    next(value? :any): IteratorResult;
    throw(exception: any);
}
```

### UniCode

### 模块

```js
export
export default
import
```

### 类型 `Map` `Set` `WeakMap` `WeakSet`

### 代理

```js
const target = {};
const handler = {
  get: function (receiver, name) {
    return `Hello, ${name}`;
  },
};

const p = new Proxy(target, handler);
console.log(p.world); // Hello, world
```

```js
const target = () => 'I am the target';
const handler = {
  apply: (receiver, ...args) => 'I am the proxy',
};
const p = new Proxy(target, handler);
console.log(p()); // I am the proxy
```

Proxy 的所有操作:

| Proxy handler            | 行为                                                         |
| ------------------------ | ------------------------------------------------------------ |
| get                      | `target.prop`                                                |
| set                      | `target.prop = value`                                        |
| has                      | `'prop' in target`                                           |
| deleteProperty           | `delete target.prop`                                         |
| apply                    | `target(...args)`                                            |
| construct                | `new target(...args)`                                        |
| getOwnPropertyDescriptor | `Object.getOwnPropertyDescriptor(target, 'prop')`            |
| defineProperty           | `Object.defineProperty(target, 'prop', descriptor)`          |
| getPrototypeOf           | `Object.getPrototypeOf(target)`, `Reflect.getPrototypeOf(target)`, `target.__proto__`, `object.isPrototypeof(target)`, `object instanceof target` |
| setPrototypeOf           | `Object.setPrototypeOf(target)`, `Reflect.setPrototypeOf(target)` |
| enumerate                | `for(let i in target) {}`                                    |
| ownKeys                  | `Object.keys(target)`                                        |
| preventExtensions        | `Object.preventExtensions(target)`                           |
| isExtensible             | `Object.isExtensible(target)`                                |

### 符号

```js
const key = Symbol('key');
```

### 继承内置类

```js
class MyArray extends Array {
    
}
// Array, Date, DOM 的 Element 都可以被继承
```

### Math, Number, String, Object API

```js
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN('NaN') // false

Math.acosh(3) // 1.762xxxxx
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

'abcde'.includes('cd') // true
'abc'.repeat(3) // abcabcabc

Array.from(document.querySelectorAll('*'))
Array.of(1, 2, 3)
[0, 0, 0].fill(7, 1) // [0, 7, 7]
[1, 2, 3].findIndex(x => x == 2) // 1
['a', 'b', 'c'].entries() // iterator [0, 'a'], [1, 'b'], [2, 'c']
['a', 'b', 'c'].keys() // iterator 0, 1, 2
['a', 'b', 'c'].values() // iterator 'a', 'b', 'c'

Object.assign(Point, { origin: new Point(0, 0) })
```

### 二进制和八进制

```js
0b111110111 === 503
0o767 === 503
// Babel 只支持转换 0o767 不支持 Number('0o767')
```

### Promise

### Reflect API

```js
const O = {a: 1};
Object.defineProperty(O, 'b', {value: 2});
O[Symbol('c')] = 3;

Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

function C(a, b) {
    this.c = a + b;
}
var instance = Reflect.construct(C, [20, 22]);
instance.c; // 43
```

### Tail Calls

在尾部进行递归调用不会造成堆栈溢出.

```js
function factorial(n, acc = 1) {
    if(n <= 1) return acc;
    return factorial(n - 1, n * acc);
}
factorial(1000000);
// 在支持 Tail Calls 的浏览器里不会出现堆栈溢出的报错
```

# 2. 概览

## 2.1 编辑器语法高亮

目前, 大部分流行的编辑器都支持 ES2015+ 语法高亮, 并且开箱即用. 以下介绍一些编辑器可能需要安装额外的扩展来支持语法高亮功能.

### Atom

安装 `language-babel`软件包.

### Sublime Text 3

安装 `Package Control`, 然后从中安装 `Babel`软件包.

### Vim

安装 `vim-javascript`插件.

或者使用 `yajs.vim`和 `es.next.syntax`.

### Visual Studio Code

安装 `sublime-babel-vscode`扩展.

### WebStorm

WebStorm 现在不需要安装任何扩展就能支持 ES2015+, 但是可能需要[开启此功能.](https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/)

## 2.2 插件

Babel 是一个编译器 (输入源码 => 输出编译后的代码). 编译过程分为三个阶段: 解析, 转换和打印输出.

现在, Babel 虽然开箱即用, 但是什么动作都不会做. 它基本上类似于 `const babel = code => code`, 即将代码解析之后原样输出. 如果想要 Babel 做一些实际工作, 就需要为其添加插件.

除了一个一个的添加插件, 还可以以 preset (预设)的形式启用一组插件.

### 转换插件

这些插件用于转换你的代码.

> 注意, 转换插件将启用相应的语法插件, 因此你不需要同时指定这两种插件.

### ES3

- 对象成员属性表达式 (member-expression-literals)

  当对象属性名是关键字时, 转换为["关键字"]的形式.

  In:

  ```js
  obj.foo = 'isValid';
  obj.const = 'isKeyword';
  obj["var"] = 'isKeyword';
  ```

  Out:

  ```js
  obj.foo = 'isValid';
  obj["const"] = 'isKeyword';
  obj["var"] = "isKeyword";
  ```

  安装:

  ```bash
  npm i -D @babel/plugin-transform-member-expression-literals
  ```

- 对象属性 (property-literals)

  省略对象属性定义时的多余 `"`

  In:

  ```js
  var foo = {
      // 以下会转换
      "bar": function() {},
      "1": function() {},
      // 以下不会转换
      "default": 1, // 关键字
      [a]: 2,
      foo: 1
  }
  ```

  Out:

  ```js
  var foo = {
      bar: function() {},
      1: function() {},
      "default": 1,
      [a]: 2,
      foo: 1
  }
  ```

  安装:

  ```bash
  npm i -D @babel/plugin-transform-property-literals
  ```

- 保留关键字 (reserved-words)

  当变量名是保留关键字时, 增加前缀 `_`

  In:

  ```js
  var abstract = 1;
  var x = abstrace + 1;
  ```

  Out:

  ```js
  var _abstrace = 1;
  var x = _abstrace + 1;
  ```

  安装:

  ```bash
  npm i -D @babel/plugin-transform-reserved-words
  ```

[ES3 关键字参考](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf#page=26)

### ES5

- 属性赋值函数 (property-mutators)

  对象的 `get/set`替换成使用 `Object.defineProperties`API定义, 以明确该属性是否可枚举等.

  In:

  ```js
  var foo = {
      get bar() {
          return this._bar;
      },
      set bar(value) {
          this._bar = value;
      }
  }
  ```

  Out:

  ```js
  var foo = Object.defineProperties({}, {
      bar: {
          get: function() {
              return this._bar;
          },
          set: function(value) {
              this._bar = value;
          },
          configurable: true,
          enumerable: true
      }
  });
  ```

  安装:

  ```bash
  npm i -D @babel/plugin-transform-property-mutators
  ```

### ES2015

- 箭头函数转换 (arrow-functions)

  将箭头函数转换为 ES5 的函数表达式, 并通过 `_this`来解决作用域问题.

  In:

  ```js
  const a = () => {};
  const b = (b) => b;
  const bob = {
      _name: 'Bob',
      _friends: ['Sally', 'Tom'],
      printFriends() {
          this._friends.forEach(f => 
              console.log(this._name + ' knows ' + f);
          );
      }
  };
  ```

  Out:

  ```js
  const a = function() {};
  const b = function(b) {
      return b;
  }
  const bob = {
      _name: 'Bob',
      _friends: ['Sally', 'Tom'],
      printFriends() {
          var _this = this;
          this._friends.forEach(function(f) {
              return console.log(_this._name + ' knows ' + f);
          });
      }
  };
  ```

  安装:

  ```bash
  npm i -D @babel/plugin-transform-arrow-functions
  ```

  ```json
  {
      "plugins": [
          ["@babel/plugin-transform-arrow-functions", {"spec": true}]
      ]
  }
  ```

  参数:

  | 参数名 | 类型                   | 作用                                                         |
  | ------ | ---------------------- | ------------------------------------------------------------ |
  | spec   | boolean 默认为 `false` | (1) 使用 `.bind(this)`修复函数的 `this`指向, 而不是用 `_this`.(2) 添加运行时检查, 确保函数没有实例化功能. (3) 给箭头函数添加名称. |

- 块级作用域函数 (block-scoped-functions)

  使用 `let fnName = function() {}`代替 `function fnName()`, 使得函数声明被正确放到了块级作用域内.

  In

  ```js
  {
      function name(n) {
          return n;
      }
  }
  ```

  Out

  ```js
  {
      let name = function (n) {
          return n;
      };
  }
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-block-scoped-functions
  ```

- 块级作用域 (block-scoping)

  会将变量定义从 `let`转换为 `var`.

  另外插件会把所有 `const`也转换为 `var`, 并且如果发现代码中有修改行为, 会在运行时报错.

  In

  ```js
  {
      let a = 3;
  }
  let a = 3;
  ```

  Out

  ```js
  {
      var _a = 3;
  }
  var a = 3;
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-block-scoping
  ```

  参数

  | 参数名                 | 类型                   | 作用                                                         |
  | ---------------------- | ---------------------- | ------------------------------------------------------------ |
  | throwIfClosureRequired | boolean 默认值 `false` | 当 Bable 编译时, 如果代码中存在类似 `for(let i=0;i<5;i++){setTimeout(()=>console.log(i), 1)}`这种必须要 let 作用域的变量时, 会抛出错误. |
  | tdz                    | boolean 默认值 `false` | 代码中如果存在先使用后定义的情况, 如果开启此选项, 会在运行时抛出一个变量未定义的错误. (默认情况下, 因为是 `var`所以不会报错) |

  

- 类转换 (classes)

  将 `classes`转换成函数形式.

  注意: 如果继承的是原生类(比如, `class MyArray extends Array`), 类的方法使用的是 `Object.setPrototypeOf`或 `__proto__`来定义的, 这在 IE 10 以下是不支持的. 所以在这些浏览器里面无法支持继承原生类.

  In

  ```js
  class Test {
      constructor(name) {
          this.name = name;
      }
      logger() {
          console.log('Hello', this.name);
      }
  }
  ```

  Out

  ```js
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var Test = function() {
      function Test(name) {
          _classCallCheck(this, Test);
          this.name = name;
      }
      Test.prototype.logger = function logger() {
          console.log('Hello', this.name);
      };
      return Test;
  }();
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-classes
  ```

  参数

  | 参数名 | 类型                     | 作用                                                         |
  | ------ | ------------------------ | ------------------------------------------------------------ |
  | loose  | boolean 默认值为 `false` | 设置为 true 将使用松散模式定义类的方法, (1) 这会让类的方法变成可枚举的, 这可能会造成一些错误. (2) 另外如果父类的方法是 `set bar()`那么子类如果将 bar 定义为普通方法, 会抛出错误. |

- 转换计算属性 (computed-properties)

  In

  ```js
  var obj = {
      ['x' + foo]: 'heh',
      ['y' + bar]: 'noo',
      foo: 'foo',
      bar: 'bar'
  }
  ```

  Out

  ```js
  var _obj;
  function _defineProperty(obj, key, value) {
      if(key in obj) {
          Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
          });
      } else {
          obj[key] = value;
      }
      return obj;
  }
  var obj = (
  	_obj = {},
      _defineProperty(_obj, 'x' + foo, 'heh'),
      _defineProperty(_obj, 'y' + bar, 'noo'),
      _defineProperty(_obj, 'foo', 'foo'),
      _defineProperty(_obj, 'bar', 'bar'),
      _obj
  );
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-computed-properties
  ```

  参数

  | 参数名 | 类型                     | 作用 |
  | ------ | ------------------------ | ---- |
  | loose  | boolean 默认值为 `false` |      |

- 解构转换 (destructuring)

  In

  ```js
  let {x, y} = obj;
  let [a, b, ...rest] = arr;
  ```

  Out

  ```js
  function _toArray(arr) {
  	// ...
  }
  
  let _obj = obj;
  x = _obj.x;
  y = _obj.y;
  
  let _arr = arr, _arr2 = _toArray(_arr);
  a = _arr2[0];
  b = _arr2[1];
  rest = _arr2.slice(2);
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-destructuring
  ```

  参数

  | 参数名      | 类型                     | 作用                                          |
  | ----------- | ------------------------ | --------------------------------------------- |
  | loose       | boolean 默认值为 `false` |                                               |
  | useBuiltIns | boolean 默认值为 `false` | 设置为 true 时, 直接使用 `Object.assign`实现. |

- 处理重复键 (duplicate-keys)

  处理的最终结果需要由 `@babel/plugin-transform-computed-properties`再处理.

  In

  ```js
  var x = {a: 5, b: 6};
  ```

  Out

  ```js
  var x = {a: 5, ['a']: 6};
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-duplicate-keys
  ```

- for-of

  使用原生 for 循环遍历迭代器

  安装

  ```bash
  npm i -D @babel/plugin-transform-for-of
  ```

  参数

  | 参数名      | 类型                     | 作用 |
  | ----------- | ------------------------ | ---- |
  | loose       | boolean 默认值为 `false` |      |
  | assumeArray | boolean 默认值为 `false` |      |

- function-name

  In

  ```js
  let number = (x) => x;
  ```

  Out

  ```js
  var number = function number(x) {
  	return x;
  };
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-function-name
  ```

- instanceof

  In

  ```js
  foo instanceof Bar;
  ```

  Out

  ```js
  function _instanceof(left, right) {
      if(right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
          return right[Symbol.hasInstance](left);
      } else {
          return left instanceof right;
      }
  }
  _instanceof(foo, Bar)
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-instanceof
  ```

- 字面常量转换 (literals)

  转换二进制, 八进制和 unicode 字面量.

  In

  ```js
  var b = 0b11; // 二进制
  var o = 0o7; // 八进制
  const u = 'Hello\u{000A}\u{0009}!';
  ```

  Out

  ```js
  const b = 3;
  const o = 7;
  const u = 'Hello\n\t';
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-literals
  ```

- new-target

  安装

  ```bash
  npm i -D @babel/plugin-transform-new-target
  ```

- object-super

  处理 super

  安装

  ```bash
  npm i -D @babel/plugin-transform-object-super
  ```

- parameters

  将 ES2015 的函数参数转换为 ES5 支持的版本. 包括:

  - 参数解构
  - 参数默认值
  - 剩余参数

  安装

  ```bash
  npm i -D @babel/plugin-transform-parameters
  ```

- shorthand-properties

  对象简单赋值和对象方法简写

  In

  ```js
  var o = {a, b, c};
  var cat = {
      getName() {
          return name;
      }
  };
  ```

  Out

  ```js
  var o = {a: a, b: b, c: c};
  var cat = {
      getName: function() {
          return name;
      }
  }
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-shorthand-properties
  ```

- 转换展开运算符 (spread)

  In

  ```js
  var a = ['a', 'b', 'c'];
  var b = [...a, 'foo'];
  var c = foo(...a);
  ```

  Out

  ```js
  var a = ['a', 'b', 'c'];
  var b = a.concat(['foo']);
  var c = foo.apply(void 0, a);
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-spread
  ```

  参数

  | 参数名 | 类型                     | 作用                                     |
  | ------ | ------------------------ | ---------------------------------------- |
  | loose  | boolean 默认值为 `false` | 在 loose 模式下, 所有迭代器都假定为数组. |

- sticky-regex

  正则表达式使用 `new RegExp`

  In

  ```js
  const a = /o+/y;
  ```

  Out

  ```js
  var a = new RegExp('o+', 'y');
  ```

  安装

  ```bash
  npm i -D  @babel/plugin-transform-sticky-regex
  ```

- template-literals

  In

  ```js
  `foo${bar}`
  ```

  Out

  ```js
  "foo".concat(bar)
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-template-literals
  ```

  参数

  | 参数名 | 类型                   | 作用                                     |
  | ------ | ---------------------- | ---------------------------------------- |
  | loose  | boolean 默认值为 false | 设置 true 时使用运算符 `+`代替 `concat`. |

- typeof-symbol

  In

  ```js
  typeof Symbol() === 'symbol';
  ```

  Out

  ```js
  var _typeof = function (obj) {
      return obj && obj.constructor === Symbol ? 'symbol' : typeof obj;
  };
  _typeof(Symbol()) === 'symbol';
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-typeof-symbol
  ```

- unicode-regex

  In

  ```js
  var string = "foo💩bar";
  var match = string.match(/foo(.)bar/u);
  ```

  Out

  ```js
  var string = "foo💩bar";
  var match = string.match(/foo((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))bar/);
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-unicode-regex
  ```

### ES2016

- exponentiation-operator

  In

  ```js
  let x = 10 ** 2;
  x **= 3;
  ```

  Out

  ```js
  let x = Math.pow(10, 2);
  x = Math.pow(x, 3);
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-exponentiation-operator
  ```

### ES2017

- async-to-generator

  > 在 Babel 7 中, `transform-async-to-module-method`被合并到这个插件中.

  In

  ```js
  async function foo() {
      await bar();
  }
  ```

  Out

  ```js
  var _asyncToGenerator = function(fn) {};
  var foo = _asyncToGenerator(function* () {
      yield bar();
  });
  ```

  如果使用 Bluebird coroutine 选项:

  ```js
  var Bluebird = require('bluebird');
  var foo = Bluebird.coroutine(function* () {
      yield bar();
  });
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-async-to-generator
  ```

  使用 bluebird:

  ```json
  {
      "plugins": [
          [
              "@babel/plugin-transform-async-to-generator",
              {
                  "module": "bluebird",
                  "method": "coroutine"
              }
          ]
      ]
  }
  ```

### ES2018

- async-generator-functions

  安装

  ```bash
  npm i -D @babel/plugin-proposal-async-generator-functions
  ```

- dotall-regex

  In

  ```js
  /./s;
  /./su;
  ```

  Out

  ```js
  /[\0-\uFFFF]/;
  /[\0-\u{10FFFF}]/u;
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-dotall-regex
  ```

- named-capturing-groups-regex

  此插件默认基于 ES6 的正则表达式, 如果要支持旧版本浏览器, 需要设置 `runtime: false`

  In

  ```js
  var re = /(?<year>\d{4})-(?<month>\d{2})-?(?<day>\d{2})/;
  console.log(re.exec('1999-02-29').groups.year);
  ```

  Out

  ```js
  var re = _wrapRegExp(/(\d{4})-(\d{2})-(\d{2})/, { year: 1, month: 2, day: 3});
  console.log(re.exec('1999-02-29').groups.year);
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-named-capturing-groups-regex
  ```

- object-rest-spread

  ```js
  let {x, y, ...z} = {x:1, y:2, a:3, b:4};
  // x = 1, y = 2, z = {a: 3, b: 4}
  ```

  安装

  ```bash
  npm i -D  @babel/plugin-proposal-object-rest-spread
  ```

  参数

  | 参数名      | 类型                     | 作用 |
  | ----------- | ------------------------ | ---- |
  | loose       | boolean 默认值为 `false` |      |
  | useBuiltIns | boolean 默认值为 `false` |      |

- optional-catch-binding

  安装

  ```bash
  npm i -D @babel/plugin-proposal-optional-catch-binding
  ```

- unicode-property-regex

  安装

  ```bash
  npm i -D @babel/plugin-proposal-unicode-property-regex
  ```

### Modules

- modules-amd

  ```bash
  npm i -D @babel/plugin-transform-modules-amd
  ```

- modules-commonjs

  ```bash
  npm i -D @babel/plugin-transform-modules-commonjs
  ```

- modules-systemjs

  ```bash
  npm i -D @babel/plugin-transform-modules-systemjs
  ```

- modules-umd

  ```bash
  npm i -D @babel/plugin-transform-modules-umd
  ```

### Experimental

- class-properties

  ```bash
  npm i -D @babel/plugin-proposal-class-properties
  ```

- decorators

  安装

  ```bash
  npm i -D @babel/plugin-proposal-decorators
  ```

  参数

  | 参数名                 | 类型                     | 作用                              |
  | ---------------------- | ------------------------ | --------------------------------- |
  | decoratorsBeforeExport | boolean 默认值为 `false` | 见下                              |
  | legacy                 | boolean 默认值为 `false` | 是否使用 legacy (stage 1)的装饰器 |

  ```js
  // decoratorBeforeExport: false
  export @decorator class Bar {}
  
  // decoratorBeforeExport: true
  @decorator
  export class Foo {}
  ```

- do-expressions

  ```bash
  npm i -D @babel/plugin-proposal-do-expressions
  ```

- export-default-from

  ```bash
  npm i -D @babel/plugin-proposal-export-default-from
  ```

- export-namespace-from

  ```bash
  npm i -D @babel/plugin-proposal-export-namespace-from
  ```

- function-bind

  ```bash
  npm i -D @babel/plugin-proposal-function-bind
  ```

- function-sent

  ```bash
  npm i -D @babel/plugin-proposal-function-sent
  ```

- logical-assignment-operators

  ```bash
  npm i -D @babel/plugin-proposal-logical-assignment-operators
  ```

- nullish-coalescing-operator

  ```bash
  npm i -D @babel/plugin-proposal-nullish-coalescing-operator
  ```

- numeric-separator

  ```bash
  npm i -D @babel/plugin-proposal-numeric-separator
  ```

- optional-chaining

  ```bash
  npm i -D @babel/plugin-proposal-optional-chaining
  ```

- partial-application

  ```bash
  npm i -D @babel/plugin-proposal-partial-application
  ```

- pipeline-operator

  ```bash
  npm i -D @babel/plugin-proposal-pipeline-operator
  ```

- private-methods

  ```bash
  npm i -D @babel/plugin-proposal-private-methods
  ```

- throw-expressions

  ```bash
  npm i -D @babel/plugin-proposal-throw-expressions
  ```

### Minification

- inline-consecutive-adds

  In

  ```js
  const foo = {};
  foo.a = 42;
  foo.b = ['hi'];
  const bar = [];
  bar.push(1);
  bar.push(2);
  ```

  Out

  ```js
  const foo = {
      a: 42,
      b: ['hi'],
  };
  const bar = [1, 2];
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-inline-consecutive-adds
  ```

- inline-environment-variables

  In

  ```js
  process.env.NODE_ENV
  ```

  Out

  ```js
  'development'
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-inline-environment-variables
  ```

- member-expression-literals

  见 ES3

- merge-sibling-variables

  In

  ```js
  var foo = 'bar';
  var bar = 'foo';
  foobar();
  var i = 0;
  for(var x = 0; x < 10; x++) {}
  ```

  Out

  ```js
  var foo = 'bar',
      bar = 'foo';
  foobar();
  for(var i = 0, x = 0; x < 10; x++) {}
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-merge-sibling-variables
  ```

- minify-booleans

  `true/false` 转换为 `!0/!1`

  In

  ```js
  true;
  false;
  ```

  Out

  ```js
  !0;
  !1;
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-minify-booleans
  ```

- minify-builtins

  In

  ```js
  Math.floor(a) + Math.floor(b)
  ```

  Out

  ```js
  var _MathFloor = Math.floor;
  _Mathfloor(a) + _MathFloor(b);
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-builtins
  ```

- minify-constant-folding

  合并静态计算

  In

  ```js
  'a' + 'b'
  2 * 3
  4 | 3
  'b' + a + 'c' + 'd'
  ```

  Out

  ```js
  'ab'
  6
  7
  'b' + a + 'cd'
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-constant-folding
  ```

- minify-dead-code-elimination

  清理未使用的代码

  In

  ```js
  function foo() { var x = 1; }
  function bar() { var x = f(); }
  ```

  Out

  ```js
  function foo() {}
  function bar() { f(); }
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-dead-code-elimination
  ```

- minify-flip-comparisons

  In

  ```js
  const foo = a === 1;
  if (bar !== null) {
      var baz = 0;
  }
  ```

  Out

  ```js
  const foo = 1 === a;
  if (null !== bar) {
      var baz = 0;
  }
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-flip-comparisons
  ```

- minify-guarded-expressions

  In

  ```js
  !x && foo();
  alert(0 && new Foo());
  ```

  Out

  ```js
  x || foo();
  alert(0);
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-guarded-expressions
  ```

- minify-infinity

  In

  ```js
  Infinity;
  ```

  Out

  ```js
  1 / 0;
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-infinity
  ```

- minify-mangle-names

  In

  ```js
  var lobalVariableName = 42;
  function foo() {
      var longLocalVariableName = 1;
      if (longLocalVariableName) {
          console.log(longLocalVariableName);
      }
  }
  ```

  Out

  ```js
  var globalVariableName = 43;
  function foo() {
      var a = 1;
      if (a) {
          console.log(a);
      }
  }
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-mangle-names
  ```

  参数

  | 参数名        | 类型                   | 作用                       |
  | ------------- | ---------------------- | -------------------------- |
  | exclude       | Object 默认值为 {}     | 排除转换                   |
  | eval          | boolean 默认值为 false | 在 eval 可访问的代码中禁用 |
  | keepFnName    | boolean 默认值为 false | 保持方法名不转换           |
  | topLevel      | boolean 默认值为 false |                            |
  | keepClassName | boolean 默认值为 false | 保持类名不转换             |

- minify-numeric-literals

  In

  ```js
  [1000, -20000]
  ```

  Out

  ```js
  [1e3, -2e4]
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-numeric-literals
  ```

- minify-replace

  配置

  ```js
  [
      {
          identifierName: '__DEV__',
          replacement: {
              type: 'numericLiteral',
              value: 0
          }
      }
  ]
  ```

  In

  ```js
  if(!__DEV__) {
      foo();
  }
  if(a.__DEV__) {
      foo();
  }
  ```

  Out

  ```js
  if(!0) {
      foo();
  }
  if(a.__DEV__) {
      foo();
  }
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-replace
  ```

- minify-simplify

  In

  ```js
  function foo() {
      if(x) a();
  }
  function foo2() {
      if(x) a();
      else b();
  }
  undefined
  foo['bar']
  Number(foo)
  ```

  Out

  ```js
  function foo() {
      x && a();
  }
  function foo2() {
      x ? a() : b();
  }
  void 0
  foo.bar
  +foo
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-simplify
  ```

- minify-type-constructors

  In

  ```js
  Boolean(x);
  Number(x);
  String(x);
  Array(3);
  Array(3, 1);
  Object({foo: 'bar'});
  ```

  Out

  ```js
  !!x;
  +x;
  x + '';
  [,,,];
  [3, 1];
  {foo: 'bar'};
  ```

  安装

  ```bash
  npm i -D babel-plugin-minify-type-constructors
  ```

  参数

  `array`/ `boolean`/ `number`/ `object`/ `string`

- node-env-inline

  In

  ```js
  process.env.NODE_ENV === 'development';
  process.env.NODE_ENV === 'production';
  ```

  Out

  ```bash
  NODE_ENV=development babel in.js --plugins transform-node-env-inline
  ```

  ```js
  true;
  false;
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-node-env-inline
  ```

- property-literals

  见 ES5

- regexp-constructors

  In

  ```js
  const foo = 'ab+';
  var a = new RegExp(foo+'c', 'i');
  ```

  Out

  ```js
  const foo = 'ab+';
  var a = /ab+c/i;
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-regexp-constructors
  ```

- remove-console

  删除 console 语句 (非安全删除)

  ```js
  console.log(b=a+b);
  c = b * 100;
  // 无法识别 console.log 执行表达式, 删除 console.log 会导致 c 的结果不正确. 所以是非安全删除.
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-remove-console
  ```

- remove-debugger

  安装

  ```bash
  npm i -D babel-plugin-transform-remove-debugger
  ```

- remove-undefined

  In

  ```js
  let a = void 0;
  function foo() {
      var b = undefined;
      return undefined;
  }
  ```

  Out

  ```js
  let a;
  function foo() {
      var b;
      return;
  }
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-remove-undefined
  ```

- simplify-comparison-operators

  In

  ```js
  typeof foo === 'object';
  ```

  Out

  ```js
  typeof foo == 'object';
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-simplify-comparison-operators
  ```

- undefined-to-void

  In

  ```js
  foo === undefined;
  ```

  Out

  ```js
  foo === void 0;
  ```

  安装

  ```bash
  npm i -D babel-plugin-transform-undefined-to-void
  ```

### React

- react-constant-elements

  In

  ```jsx
  const Hr = () => {
      return <hr className="hr" />
  }
  ```

  Out

  ```jsx
  const _ref = <hr className="hr" />;
  const Hr = () => {
      return _ref;
  }
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-react-constant-elements
  ```

- react-display-name

  In

  ```js
  var foo = React.createClass({}); // React <= 15
  var bar = createReactClass({}); // React 16+
  ```

  Out

  ```js
  var foo = React.createClass({
      displayName: 'foo'
  });
  var bar = createReactClass({
      displayName: 'bar'
  });
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-react-display-name
  ```

- react-inline-elements

  In

  ```jsx
  <Baz foo="bar" key="1"></Baz>;
  ```

  Out

  ```js
  babelHelpers.jsx(Bax, {
      foo: "bar"
  }, "1");
  
  /* Instead of
  *  React.createElement(Baz, {
  *    foo: "bar", key: "1"
  *  });
  */
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-react-inline-elements
  ```

- react-jsx

  In

  ```jsx
  const profile = (
  	<div>
      	<img src="avatar.png" className="profile" />
          <h3>{[user.firstName, user.lastName].join(' ')}</h3>
      </div>
  );
  ```

  Out

  ```js
  const profile = React.createElement('div', null,
  	React.createElement('img', { src: 'avatar.png', className: 'profile' }),
  	React.createElement('h3', null, [user.firstName, user.lastName].join(' '))
  );
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-react-jsx
  ```

  参数

  | 参数名           | 类型                                  | 作用 |
  | ---------------- | ------------------------------------- | ---- |
  | pragma           | string 默认值为 `React.createElement` |      |
  | pragmaFrag       | string 默认值为 `React.Fragment`      |      |
  | useBuiltIns      | boolean 默认值为 `false`              |      |
  | useSpread        | boolean 默认值为 `false`              |      |
  | throwIfNamespace | boolean 默认值为 `true`               |      |

- react-jsx-compat

  In

  ```jsx
  var profile = <div>
      <img src="avatar.png" class="profile" />
      <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>;
  ```

  Out

  ```js
  var profile = React.DOM.div(null,
  	React.DOM.img({src: 'avatar.png', 'class': 'profile' }),
  	React.DOM.h3(null, [user.firstName, user.lastName].join(' '))
  );
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-react-jsx-compat
  ```

- react-jsx-self

  In

  ```jsx
  <sometag />
  ```

  Out

  ```jsx
  <sometag __self={this} />
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-react-jsx-self
  ```

- react-jsx-source

  In

  ```jsx
  <sometag />
  ```

  Out

  ```jsx
  <sometag __source={{fileName: 'this/file.js', lineNumber: 10}} />
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-react-jsx-source
  ```

### 其他

- external-helpers

  ```bash
  npm i -D @babel/plugin-external-helpers
  ```

- flow-strip-types

  In

  ```js
  function foo(one: any, two: number, three?): string {}
  ```

  Out

  ```js
  function foo(one, two, three) {}
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-flow-strip-types
  ```

  参数

  | 参数名           | 类型                    | 作用                                                         |
  | ---------------- | ----------------------- | ------------------------------------------------------------ |
  | all              | boolean, 默认值为 false | 如果设置 true, 将只解析 Flow 的特定功能. 如果不设置, 则会将 `f<T>(e)`解析为一个嵌套的二元表达式 `f < T > e` |
  | requireDirective | boolean, 默认值为 false |                                                              |

- jscript

  In

  ```js
  var foo = function bar() {};
  ```

  Out

  ```js
  "use strict";
  var foo = (function () {
      function bar() {};
      return bar;
  })();
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-jscript
  ```

- object-assign

  In

  ```js
  Object.assign(a, b);
  ```

  Out

  ```js
  var _extends = ...;
  _extends(a, b);
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-object-assign
  ```

- object-set-prototype-of-to-assign

  In

  ```js
  Object.setPrototypeOf(bar, foo);
  ```

  Out

  ```js
  var _defaults = ...;
  _defaults(bar, foo);
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-object-set-prototype-of-to-assign
  ```

- proto-to-assign

  ```bash
  npm i -D @babel/plugin-transform-proto-to-assign
  ```

- regenerator

  安装

  ```bash
  npm i -D @babel/plugin-transform-regenerator
  ```

  参数

  | 参数名          | 类型 | 作用 |
  | --------------- | ---- | ---- |
  | asyncGenerators | true |      |
  | generators      | true |      |
  | async           | true |      |

- runtime

  安装

  ```bash
  npm i -D @babel/plugin-transform-runtime
  ```

  参数

  | 参数名          | 类型                            | 作用                                                         |
  | --------------- | ------------------------------- | ------------------------------------------------------------ |
  | corejs          | `false`/ `2` / `3`              | false: `npm i @babel/runtime`; 2: `npm i @babel/runtime-corejs2`; 3: `npm i @babel/runtime-corejs3` |
  | helpers         | true                            |                                                              |
  | polyfill        | v7 版本开始选项已经被删除       |                                                              |
  | regenerator     | true                            |                                                              |
  | useBuiltIns     | v7 版本开始选项已经被删除       |                                                              |
  | useESModules    | false                           |                                                              |
  | absoluteRuntime | boolean / string 默认值为 false |                                                              |
  | version         |                                 |                                                              |

- strict-mode

  In

  ```js
  foo();
  ```

  Out

  ```js
  "use strict";
  foo();
  ```

  安装

  ```bash
  npm i -D @babel/plugin-transform-strict-mode
  ```

- typescript

  In

  ```typescript
  const x:number = 0;
  ```

  Out

  ```js
  const x = 0;
  ```

  安装

  ```bash
  npm i -D  @babel/plugin-transform-typescript
  ```

  参数

  | 参数名          | 类型                  | 作用 |
  | --------------- | --------------------- | ---- |
  | isTSX           | false                 |      |
  | jsxPragma       | string 默认值为 React |      |
  | allowNamespaces | false                 |      |

### 语法插件

语法插件只允许 Babel 解析(parse)特定类型的语法(而不是转换).

注意: 转换插件会自动启用语法插件.

### 插件 / Preset 路径

如果插件在 npm 上, 可以直接输入插件的名称, babel 会自动检查它们是否已经被安装到 `node_modules`目录下.

```json
{
    "plugins": ["babel-plugin-myPlugin"]
}
```

也可以指定插件的相对/绝对路径.

```json
{
    "plugins": ["./node_modules/asdf/plugin"]
}
```

### 插件的短名称

如果插件名称的前缀为 `babel-plugin-`, 你还可以使用它的短名称:

```json
{
    "plugins": [
        "myPlugin",
        "babel-plugin-myPlugin" // 两个插件实际是同一个
    ]
}
```

这也适用于带有冠名 (scope) 的插件:

```json
{
    "plugins": [
        "@org/babel-plugin-name",
        "@org/name" // 两个插件实际是同一个
    ]
}
```

### 插件顺序

插件的排列排序很重要.

如果两个转换插件都将处理程序中的某个代码片段, 则将根据转换插件或 preset 的排列顺序依次执行.

- 插件在 Presets 前运行.
- 插件顺序从前往后排列.
- Preset 顺序是颠倒的 (从后往前).

例如:

```json
{
    "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

先执行 `transform-decorators-legacy`, 再执行 `transform-class-properties`

重要的是, preset 的顺序是颠倒的.

```json
{
    "plugins": ["es2015", "react", "stage-2"]
}
```

 将按如下顺序执行: `stage-2`, `react`最后是 `es2015`

### 插件参数

插件和 preset 都可以接受参数, 参数由插件名和参数对象组成一个数组, 可以在配置文件中设置.

```json
{
    "plugins": [
        [
            "transform-async-to-module-method",
            {
                "module": "bluebird",
                "method": "coroutine"
            }
        ]
    ]
}
```

preset 的设置参数的工作原理是完全相同的:

```json
{
    "presets": [
        [
            "env",
            {
                "loose": true,
                "modules": false
            }
        ]
    ]
}
```

### 插件开发

请参考 [babel-handbook](https://github.com/jamiebuilds/babel-handbook)

一个简单的用于反转名称顺序的插件:

```js
export default function() {
    return {
        visitor: {
            Identifier(path) {
                const name = path.node.name;
                path.node.name = name.split("").reverse().join("");
            }
        }
    };
}
```

## 2.3 预设 (Presets)

### 官方 Preset

#### @babel/preset-env

预设将根据指定的目标环境, 将检索并传递给 Babel 需要参与编译的插件列表.

该预设不支持 `stage-x`插件.

##### 安装

```bash
npm i -D @babel/preset-env
```

##### Browserslist 集成

对于基于浏览器或 Electron 的项目, 建议使用 `.browserslistrc`文件来指定目标. 该配置文件还会被生态系统中的许多工具使用到, 比如 `autoprefixer`, `stylelint`, `eslint-plugin-compat`等.

默认情况下, 除非设置了 `targets`或 `ignoreBrowserslistConfig`选项, 否则该预设将使用browserslist作为配置源.

例如, 仅包括浏览器具有 > 0.25% 市场份额的用户需要的 polyfill 和代码转换. (将忽略 IE10, BlackBerry等没有安全更新的浏览器)

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry"
            }
        ]
    ]
}
```

.browserslistrc

```
> 0.25%
not dead
```

或 package.json

```json
{
    "browserslist": "> 0.25%, not dead"
}
```

##### 选项

###### targets

`string` | `Array<string>` | `{ [string]: string }`, 默认为 `{}`.

描述了项目支持的目标环境.

```json
{
    "targets": "> 0.25%, not deat", // 可以是兼容的浏览器查询字符串
    "targets": { // 可以是最低环境版本的对象
        "chorme": "58",
        "ie": "11"
        // 具体的值可以是: chrome, opera, edge, firefox, safari, ie, ios, android, node, electron
    }
}
```

如果未指定目标, 默认将转换所有 ECMAScript 2015+ 的代码.

###### targets.esmodules

`boolean`

指定为支持 ES 模块的浏览器. 指定此选项后, 目标浏览器配置将被忽略.

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "esmodules": true
                }
            }
        ]
    ]
}
```

###### targets.node

`string`| `"current"`| `true`

如果要针对当前 Node.js 版本进行编译, 可以指定 `true`/ `"current"`. 它们等价于 `"node": process.versions.node`

###### targets.safari

`string`| `"tp"`

如果要针对 Safari 的预览版(technology preview)进行编译, 可以指定 `"safari": "tp"`

###### targets.browsers

`string`| `Array<string>`

浏览器结果会覆盖 `targets`中的项目, 在更高版本中将删除该字段.

###### spec

`boolean` 默认值为 false

允许预设中所有支持的插件启用更多符合规范的选项.

###### loose

`boolean`默认值为 false

允许预设中所有插件启用宽松(loose)转换.

###### modules

`"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false` 默认为 `"auto"`.

启用将 ES6 模块语法转换为其他模块类型的功能.

设置为 `false`不会转换模块.

`cjs`只是 `commonjs`的别名.

###### debug

`boolean` 默认 false

将使用到的插件的版本数据输出到 `console.log`.

###### include

`Array<string|RegExp>` 默认为 []

总是要包含的一些插件. 包括:

- Babel 插件
- 内置插件 (如 `es.map` , `es.set`, `es.object.assign`等)

###### exclude

`Array<string|RegExp>` 默认为 []

总是要排除的一些插件.

###### useBuiltIns

`"usage" | "entry" | false` 默认为 false

此选项用来配置如何处理 polyfill.

由于从 v7.4.0 开始 `@babel/polyfill`已弃用, 建议使用 `core-js`并通过 `corejs`选项添加和设置版本.

```bash
npm i -D core-js@3
# or
npm i -D core-js@2
```

###### (一): useBuiltIns: 'entry'

> 注意: `import "core-js"`和 `import "regenerator-runtime/runtime"`在整个应用程序中只能执行一次. 所以如果已经使用了 `@babel/polyfill`, 则它已经包含了 `core-js`和 `regenerator-runtime`, 两次导入将引发错误, 所以建议在项目中创建一个仅包含 `import`语句的单个文件.

此选项将启用一个新插件, 该插件可以根据环境替换 `import "core-js/stable"`等.

In

```js
import 'core-js';
```

Out (根据环境而异)

```js
import "core-js/modules/es.string.pad-start";
import "core-js/modules/es.string.pad-end";
```

`core-js`为每个可能的 ECMAScript 功能导入 polyfill, 如果只需要其中一部分的话, 可以使用 `core-js@3`, 预设将会优化每个单个 `core-js`的入口点及其组合. 

In

```js
import 'core-js/es/array';
import 'core-js/proposals/math-extensions';
```

Out (根据环境而异)

```js
import 'core-js/modules/es.array.unscopables.flat';
import 'core-js/modules/es.array.unscopables.flat-map';
import "core-js/modules/esnext.math.clamp";
import "core-js/modules/esnext.math.deg-per-rad";
import "core-js/modules/esnext.math.degrees";
import "core-js/modules/esnext.math.fscale";
import "core-js/modules/esnext.math.rad-per-deg";
import "core-js/modules/esnext.math.radians";
import "core-js/modules/esnext.math.scale";
```

###### (二): useBuiltIns: 'usage'

在每个文件中, 如果需要使用 polyfill, 将添加特定的导入. 利用了 bundle 最终只会加载一次相同 polyfill 的特性.

In

```js
// a.js
var a = new Promise();

// b.js
var b = new Map();
```

Out (如果环境不支持)

```js
// a.js
import 'core-js/modules/es.promise';
var a = new Promise();

// b.js
import 'core-js/modules/es.map';
var b = new Map();
```

Out (如果环境支持)

```js
// a.js
var a = new Promise();

// b.js
var b = new Map();
```

###### (三): useBuiltIns: false

不为每个文件自动添加 polyfill, 也不要将 `import 'core-js'`或 `import '@babel/polyfill'`更改为单个 polyfill.

###### corejs

`2 | 3` 默认为 2

###### forceAllTransforms

`boolean` 默认为 false

默认情况下, 预设将针对目标环境进行转换. 如果要强制运行所有的转换, 请启用该选项. 如果通过 UglifyJS 或仅支持 ES5 的环境运行, 则很有用.

###### configPath

`string` 默认为 `process.cwd()`

配置开始搜索 browserslist 配置的起点路径, 然后不断的往上一直提升到系统根目录直到找到配置.

###### ignoreBrowserslistConfig

`boolean` 默认为 false

是否切换 browserslist 配置源.

###### shippedProposals

`boolean` 默认为 false

切换启用对浏览器附带的内置功能建议的支持. 

#### @babel/preset-flow

此预设包含如下插件:

- @babel/plugin-transform-flow-strip-types

#### @babel/preset-react

此预设包含如下插件:

- @babel/plugin-syntax-jsx
- @babel/plugin-transform-react-jsx
- @babel/plugin-transform-react-display-name

并带有以下 `development`选项

- @babel/plugin-transform-react-jsx-self
- @babel/plugin-transform-react-jsx-source

注意, 在 v7 中不再启用 flow 语法支持, 如果需要请自行安装.

##### 安装

```bash
npm i -D @babel/preset-react
```

#### @babel/preset-typescript

该预设包含如下插件:

- @babel/plugin-transform-typescript

### Stage-X (实验性质的 Presets)

stage-x 预设中的任何语法转换都是对语言本身的更改, 而这些更改尚未被纳入 JavaScript 标准中.

> 注意: 这些提案可能会发生变化. 因此, 特别是处于 stage-3 之前的任何提案, **请务必谨慎使用**. Babel 计划在每次 TC39 会议之后, 如果有可能, 根据提案变更更新 stage-x 的 预设.

TC39 将提案分为以下几个阶段:

- Stage 0 - 设想 (Strawman): 只是一个想法, 可能有 Babel 插件.
- Stage 1 - 建议 (Proposal): 这是值得跟进的.
- Stage 2 - 草案 (Draft): 初始规范.
- Stage 3 - 候选 (Candidate): 完成规范并在浏览器上初步实现.
- Stage 4 - 完成 (Finished): 将添加到下一个年度版本发布中.

### 创建 Preset

如需创建一个自己的预设, 只需导出一份配置即可.

```js
module.exports = function() {
    return {
        plugins: [
            'pluginA',
            'pluginB',
            'pluginC',
        ]
    }
}
```

preset 也可以包含其他的 preset, 以及带有参数的插件.

```js
module.exports = () => ({
    presets: [
        require('@babel/preset-env'),
    ],
    plugins: [
        [require('@babel/plugin-proposal-class-properties'), {loose: true}],
        require('@babel/plugin-proposal-object-rest-spread'),
        'pluginA'
    ]
});
```

### Preset 的路径

如果预设在 npm 上, 可以输入 preset 的名称, babel 将检查是否已经将其安装到 `node_modules`目录下.

```json
{
    "presets": ["babel-preset-myPreset"]
}
```

 还可以指定为 preset 的绝对或相对路径.

```json
{
    "presets": ["./myProject/myPreset"]
}
```

### Preset 的短名称

如果预设的名称前缀为 `babel-preset-`, 则还可以使用它的短名称:

```json
{
    "presets": [
        "myPreset",
        "babel-preset-myPreset"
    ]
}
```

这也适用于带有冠名 (scope) 的预设:

```json
{
    "presets": [
        "@org/babel-preset-name",
        "@org/name"
    ]
}
```

### Preset 的排列顺序

预设是逆序排列的 (从后往前)

```json
{
    "presets": [
        "a", "b", "c"
    ]
}
```

将按如下顺序执行: c -> b -> a

### Preset 的参数

插件和 preset 都可以接受参数, 参数由插件名和参数对象组成一个数组

## 2.4 附加说明

### Polyfills

为了使某些功能能够正常工作. 可以通过引入 `@babel/polyfill`来满足 Babel 功能的所有需求:

| 功能                        | 需求                               |
| --------------------------- | ---------------------------------- |
| Async functions, Generators | regenerator runtime                |
| Array destructuring, For of | Symbol, prototype[Symbol.iterator] |
| Spread                      | Array.from                         |

### 类 (Classes)

内置类, 例如 `Date`, `Array`, `DOM`等, 是无法正确的进行子类化的, 这是由于 ES5 的限制 (针对 `transform-classes`插件而言). 可以尝试使用基于 `Ojbect.setPrototypeOf`和 `Reflect.construct`而构建的 `babel-plugin-transform-builtin-extend`插件, 不过仍然会存在一些限制.

### ES5

由于 Babel 假定代码在 ES5 环境中执行, 因此使用的都是 ES5 函数. 如果使用的运行环境对 ES5 的支持有限或不支持, 例如低版本的 IE, 那么就需要使用 `@babel/polyfill`来满足需求.

### IE 浏览器

#### 类 (Classes) (版本 10 及以下)

如果继承自一个类 (class), 那么静态属性 (static properties) 也会通过 `__proto__`一起被继承. 这种方式是被广泛支持的, 但是在很老旧的浏览器上可能会遇到问题.

注意: IE <= 10 不支持 `__proto__`, 因此静态属性将不会被继承. 请参考 protoToAssig 了解可用的解决方案.

对于有 `父类(super)`的类 (classes), 父类不能被正确解析. 可以通过 `transform-classes`插件中开启 `loose`参数来解决这个问题.

#### Getters/Setters (版本 8 及以下)

IE8 的 `Object.defineProperty`只能用在 DOM 对象上. 如果你打算支持 IE8 以更低版本的话, 不建议使用 getter 和 setter .

#### 模块 (Modules)

默认情况下, 当在 Babel 下使用模块 (modules)时, 将导出(export)一个不可枚举的 `__esModule`属性. 这是通过 `Object.defineProperty`实现的, 但是在 IE8 及以下版本中不支持. 解决方法是在相应的用于支持模块 (module) 的插件中开启 `loose`参数.