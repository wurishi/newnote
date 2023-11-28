https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

# 2. 获取函数返回类型

不使用 `ReturnType` 实现 TS 的 `ReturnType<T>` 泛型

```ts
const fn = (v: boolean) => v ? 1 : 2
type a = MyReturnType<typeof fn> // 1 | 2
```

```ts
type MyReturnType<T> = any
// 1. 通过 infer 推断函数返回类型并返回
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never
// 2. any 可能不雅观，改成 unknown
type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never
// 3. unknown 也不好，改成 never
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never
```

# 3. 实现 Omit

不使用 `Omit` ，实现 TS 中的 `Omit<T, K>` 泛型

`Omit<T, K>` 会创建一个省略 `K` 中字段的 T 对象

```ts
interface Todo {
    title: string
    description: string
    completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'> // {completed: boolean}
```

```ts
type MyOmit<T, K> = any
// 1.
type MyOmit<T, K> = {
    [key in keyof T extends K ? never : key]: T[key]
}
// 2. 会报一个错误：'key' has a circular constraint
type MyOmit<T, K> = {
    [key in keyof T as key extends K ? never : key]: T[key]
}
```

# 4. 实现 Pick

不使用 `Pick<T, K>`，实现 TS 内置的 `Pick<T, K>` 功能

```ts
interface Todo {
    title: string
    description: string
    completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'> // {title: string, completed: boolean}
```

```ts
type MyPick<T, K> = any
// 1.
type MyPick<T, 期望K是一个元组，并且每一项都应该是T拥有的> = any
// 2. keyof T 即是 T 拥有的所有属性, 然后让 K extends 所有属性的元组
type MyPick<T, K extends keyof T> = any
// 3.
type MyPick<T, K extends keyof T> = {[遍历 K]: T对应的值}
// 4.
type MyPick<T, K extends keyof T> = {[key in K]: T[key]}
```

# 7. 对象属性只读

不使用内置的 `Readonly<T>`，自己实现一个

```ts
interface Todo {
    title: string
    description: string
}
const todo: MyReadonly<Todo> = {
    title: 'Hello',
    description: 'World',
}
todo.title = 'foo' // Error
todo.description = 'bar' // Error
```

```ts
type MyReadonly<T> = any
// 1. 
type MyReadonly<T> = {[遍历T] : T对应的值}
// 2.
type MyReadonly<T> = {[K in keyof T]: T[K]}
// 3. 
type MyReadonly<T> = {设置为只读[K in keyof T]: T[K]}
// 4.
type MyReadonly<T> = {readonly [K in keyof T]: T[K]}
```

# 11. 元组转换为对象

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应

```ts
const tuple = ['tesla', 'model 3'] as const;
type result = TupleToObject<typeof tuple> // {tesla: 'tesla', 'model 3': 'model 3'}
```

```ts
type TupleToObject<T extends readonly any[]> = any
// 1.
type TupleToObject<T extends readonly any[]> = {
    [P in <T的值>]: P
}
// 2. 因为 T 是数组，所以使用 in T[number] 即可遍历数组的每个值
type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P
} 
```

# 13. Hello World

# 14. 第一个元素

实现一个 `First<T>` 泛型，它接受一个数组 `T` 并返回它的第一个元素的类型

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 'a'
type head2 = First<arr2> // 3
```

```ts
type First<T extends any[]> = any
// 1. 取第一项
type First<T extends any[]> = T[0] 
// 2. 上面的定义在 Expect<Equal<First<[]>, never>> 时会报错, 所以需要一些手段判断传入元组是否为空
// 2.1 如果是空数组返回 never 否则返回 T[0]
type First<T extends any[]> = T extends [] ? never : T[0]
// 2.2 如果 'length' 为 0 返回 never 否则返回 T[0]
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
// 2.3 如果是 [F, ...rest] 则返回 F 否则返回 never
type First<T extends any[]> = T extends [infer F, ...infer Rest] ? F : never
```

# 18. 获取元组长度

创建一个 `Length` 泛型，这个泛型只接受一个只读的元组，并返回这个元组的长度

```ts
type tesla = ['tesla', 'model 3']
type spaceX = [1, 2, 3]

type teslaLength = Length<tesla> // 2
type spaceXLength = Length<spaceX> // 3
```

```ts
type Length<T> = any
// 1. 
type Length<T只接受一个只读元组> = any
// 2. 
type Length<T extends readonly any[]> = any
// 3.
type Length<T extends readonly any[]> = 访问 T 的长度属性 
// 4. 
type Length<T extends readonly any[]> = T['length']
// 5. 如果要检测 T 是否有 length 属性，可以写成这样
type Length<T extends readonly any[]> = T extends { length: infer L } ? L : never
```

# 43. 实现 Exclude

实现内置的 `Exclude<T, U>` 类型

`Exclude<T, U>：从联合类型 T 中排除 U 中的类型，来构造一个新的类型`

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

```ts
type MyExclude<T, U> = any
// 1.
type MyExclude<T, U> = 只要 T 是继承于 U 就返回 never 否则返回 T
// 2.
type MyExclude<T, U> = T extends U ? never : T
```

# 189. Awaited

假如有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，使用 Promise<T> 中的 T 来描述这个返回的类型。

实现一个类型，可以获取这个 T 类型

```ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

```ts
type MyAwaited<T> = any
// 1. 使用 PromiseLike
type MyAwaited<T> = T extends PromiseLike<infer U> ? U : never
// 2. 这种写法无法解决 type Z = Promise<Promise<string | number>> 即 Promise<T> T 又是一个 Promise
type MyAwaited<T> = T extends PromiseLike<infer U>
    ? 如果 U 又是一个 Promise
    : never
// 3.
type MyAwaited<T> = T extends PromiseLike<infer U>
    ? U extends PromiseLike<unknow>
        ? MyAwaited<U>
        : U
    : never
// 4. 如果不能使用 PromiseLike 就自己定义一个
type Thenable<T> = { then: (onfulfilled: (...args: T[]) => unknown ) => unknown }
type ExtendedPromise<T> = Promise<T> | Thenable<T> // Promise<T> 或者任何有 .then 的类型
type MyAwaited<T> = T extends ExtendedPromise<infer U>
    ? U extends ExtendedPromise<unknow>
        ? MyAwaited<U>
        : U
    : never
```

# 268. If

实现一个 `If` 类型，`If<C, T, F>` 接收一个条件类型 `C`，判断为真时返回 `T`，判断为假时返回 `F`。`C` 只能是 `true / false`

```ts
type A = If<true, 'a', 'b'> // a
type B = If<false, 'a', 'b'> // b
```

```ts
type If<C, T, F> = any
// 1. 使用三元
type If<C extends boolean, T, F> = C extends true ? T : F
```

要特别注意 boolean 他作为类型时，是个联合类型

```ts
type Q = boolean extends true ? 1 : 2 // return 2
// 因为 boolean = true | false
// (true extends true === true) &&( false extends true === false)
// true && false === false
```

# 533. Concat

在类型系统中实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该是按照输入参数从左到右的顺序合并为一个新的数组

```ts
type Result = Concat<[1], [2]> // [1, 2]
```

```ts
type Concat<T, U> = any
// 1. 利用 ... 解构运算符
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]
// 2. Concat<typeof tuple, typeof tuple>, [1, 1]> 会报错, 根据错误提示加上 readonly
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U]
```

# 898. Includes

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true`，要么是 `false`

```ts
type isPillarMen = Includes<['Kars', 'Esidisi'], 'Dio'> // false
```

```ts
type Includes<T extends readonly any[], U> = any
// 1. 一开始是想以三元作为判断
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false
// 2. 但对于引用类型，联合类型等测试用例都不过
type Includes<T extends readonly any[], U> = 在 JS 中可以用一个对象记录 T 里面的所有值，然后遍历 U 看看在不在这个对象中
// 3.
type Includes<T extends readonly any[], U> = {
    [P in T[number]]: true
}[U] extends true ? true : false
// 4. 但对于 Includes<[false, 2, 3, 5, 6, 7], false> 和 联合类型仍然有部分测试用例不过
// 5. 最后只能写一个 IsEqual 帮助类型
type IsEqual<X, Y> = 
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2)
        ? true
        : false
// 6. 然后一个一个拿出来比较
type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Rest]
    ? IsEqual<First, U> extends true
        ? true
        : Includes<Rest, U>
    : false
```

# 3057. Push

在类型系统中实现 `Array.push`

```ts
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

```ts
type Push<T, U> = any
// 1. 
type Push<T extends any[], U> = U extends any[] ? [...T, ...U] : [...T, U]
// 2. 在 boolean 判断时再次发生问题 Push<[1], boolean> => [1, true] || [1, false] 
type Push<T extends unknown[], U> = [U] extends [T[number]] ? T : [...T, U]
// 3. 但在碰到 Push<['1', 2, '3', boolean], boolean> 这种情况时，上述方法仍不正确
```

# 3060. Unshift

在类型系统中实现 `Array.unshift`

```ts
type Result = Unshift<[1, 2], 0> // [0, 1, 2]
```

```ts
type Unshift<T, U> = any
// 1. 
type Unshift<T extends unknown[], U> = U extends any[] ? [...U, ...T] : [U, ...T]
// 2. 同样的 Unshift<[1], boolean> = [1, true] | [1, false]
type Unshift<T extends unknown[], U> = [U] extends [T[number]] ? T : [U, ...T]
// 3. 同样的如果 T 中有 U 时，结果不正确
```

# 3312. Parameters

实现内置的 `Parameters` 类型

```ts
const foo = (arg1: string, arg2: number): void => {}
type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

```ts
type MyParameters<T extends (...args: any[]) => any> = any
// 1. 通过 infer 把 ...args: any[] 变成一个内部泛型
type MyParameters<T extends (...args: any[]) => any> = T extends (...any: infer S) => any ? S : any
```
