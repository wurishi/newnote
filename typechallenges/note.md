https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

国内镜像：
https://hub.yzuu.cf/type-challenges/type-challenges/blob/main/questions/00005-extreme-readonly-keys/README.zh-CN.md

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

# 5. 获取只读字段

实现泛型 `GetReadonlyKeys<T>`, 它返回由对象 T 所有的只读属性的键组成的联合类型

```ts
interface Todo {
    readonly title: string
    readonly description: string
    completed: boolean
}
type Keys = GetReadonlyKeys<Todo> // title | description
```

```ts
type GetReadonlyKeys<T> = any
// 1. 需要返回联合类型
type GetReadonlyKeys<T> = keyof {
    [不是readonly的K]: T[K]
}
// 2. 
type GetReadonlyKeys<T> = keyof {
    [K in keyof T as K是不是readonly extends true ? K : never]: T[K]
}
// 3.
type GetReadonlyKeys<T> = keyof {
    [K in keyof T as Equal<Pick<T, K>, Readonly<Record<K, T[K]>>> extends true ? K : never]: T[K]
}
// 4. Pick<T, K>, Readonly<Record<K, T[K]>> 再加上 Equal 导致符号太多
// 定义一个 U extends T = Readonly<T>
// Pick<T, K>, Pick<U, K>
type GetReadonlyKeys<T, U extends T = Readonly<T>> = keyof {
    [K in keyof T as Equal<Pick<T, K>, Pick<U, K>> extends true ? K : never]: T[K]
}
```

# 6. 简单的 Vue 类型

实现类似 Vue 的类型支持的简化版本

假设 `SimpleVue` 只接受带有 `data, computed, methods` 字段的 Object 作为其唯一参数

- `data` 是一个简单的函数，它返回一个提供上下文 `this` 的对象，无法在 `data` 中获取其他的计算属性或方法。
- `computed` 将 `this` 作为上下文的函数对象，进行一些计算并返回结果。在上下文中应该暴露计算出的值而不是函数。
- `methods` 是函数的对象，其上下文也是 `this`。函数可以访问 `data, computed, 其他 methods` 中暴露的字段。与 `computed` 不同之处在于 `methods` 在上下文中按原样暴露为函数。

```ts
const instance = SimpleVue({
    data() {
        return {
            firstname: 'Type',
            lastname: 'Challenges',
            amount: 10,
        }
    },
    computed: {
        fullname() {
            return this.firstname + ' ' + this.lastname;
        }
    },
    methods: {
        hi() {
            alert(this.fullname.toLowerCase());
        }
    }
})
```

```ts
declare function SimpleVue(options: any): any
// 1. D, C, M 分别对应 data, computed, methods
declare function SimpleVue<D, C, M>(options: Option<D, C, M>): Option<D, C, M>
// 2. 定义 Option，先添加 data
type Option<D, C, M> = {
    data? : D,
}
// 3. 再添加 computed ，用 ThisType 约束 computed 中的 this
type Option<D, C, M> = {
    data? : D,
    computed?: C & ThisType<D>,
}
// 4. 此时 computed 访问到的 data 类型可能是传入的函数，需要转换成返回的类型
type Option<D, C, M> = {
    //...
    computed? : C & ThisType<D extends () => infer R ? R : D>,
    // 也可以用 ReturnType<D> 代替 R
}
// 5. 添加 methods
type Option<D, C, M> = {
    //...
    methods?: M & ThisType<
        (D extends () => infer R ? R : D) // 类似 computed 处理 data 的方式
        & {[K in keyof C]: C[K] extends (...args: never[]) => any ? ReturnType<C[K]> : C[K]} // computed 需要从 Record<string, function> 转换成 Record<string, ReturnType<fun>>
        & M // methods 还能访问其他的方法
    >
}
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

# 8. 对象部分属性只读

实现一个泛型 `MyReadonly2<T, K>`，类型 K 指定 T 中要被设置为只读的属性，如果未提供 K ，则所有属性都变为只读，就像普通的 `Readonly<T>` 一样。

```ts
interface Todo {
    title: string
    discription: string
    completed: boolean
}
const todo: MyReadonly2<Todo, 'title' | 'discription'> = {}
todo.completed = true // success
todo.title = 'title' // error
```

```ts
type MyReadonly2<T, K> = any
// 1. 因为 K 可以不提供，所以需要使用 = 提供一个默认值
type MyReadonly2<T, K> = any
// 2. 
type MyReadonly2<T, K extends keyof T = keyof T> = 只读属性对象 & 其他属性对象
// 3. 可以使用内置的 Omit<> & Readonly<Pick<>> 组合
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>
// 4. 如果不使用内置的方法
type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [R in K]: T[R] } & { [O in keyof T as O extends K ? never : O]: T[O] }
```

# 9. 对象属性只读（递归）

实现一个泛型 `DeepReadonly<T>`，它会将对象的每个属性及子对象的每个属性递归地设为只读。仅考虑处理对象，不用考虑处理数组，函数，类等。

```ts
type X = {
    x: {
        a: 1,
    },
    y: 'hey',
}
type Result = DeepReadonly<X>
/*
Result = {
    readonly x: {
        readonly a: 1,
    },
    readonly y: 'hey',
}
*/
```

```ts
type DeepReadonly<T> = any
// 1.
type DeepReadonly<T> = keyof T extends never ? T : { readonly [K in keyof T]: DeepReadonly<T[K]> }
// 2. 使用 never 部分测试不通过，换用更准确的联合类型？
type Primary = string | number | boolean | Function
// 3.
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Primary
        ? T[K]
        : DeepReadonly<T[K]>
}
```

# 10. 元组转集合

实现泛型 `TupleToUnion<T>`，返回元组所有值的合集

```ts
type Arr = ['1', '2', '3']
type Test = TupleToUnion<Arr> // '1' | '2' | '3'
```

```ts
type TupleToUnion<T> = any
// 1. 使用 T[number] 表示元组的每一项
type TupleToUnion<T extends any[]> = T[number]
// 2. 或者使用 Array<infer U> 获取到元组的每一项
type TupleToUnion<T extends any[]> = T extends Array<infer ITEM> ? ITEM : never
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

# 12. 可串联构造器

在 JS 中经常会使用可串联（Chainable / Pipeline）的函数构造一个对象，在 TS 中，能够合理的给它赋上类型吗？

你需要提供两个函数 `option(key, value)` 使用提供的 key 和 value 扩展当前的对象，然后通过 `get()` 获取最终结果

另外 `key` 应该只接受字符串，而 `value` 可以是任何类型。另外 `key` 只能被使用一次。

```ts
const result = config
    .option('foo', 123)
    .option('name', 'type')
    .option('bar', { value: 'Hello World' })
    .get()
// 期望 result 的类型是：
interface Result {
    foo: number
    name: string
    bar: {
        value: string
    }
}
```

```ts
type Chainable = {
    option(key: string, value: any): any
    get(): any
}
// 1. 给 get 提供一个泛型
type Chainable<R> = {
    option(key: string, value: any): any
    get(): R
}
// 2. option() 的返回类型应该是 Chainable, 另外可以提供给 R 一个默认值 {} 或者 object
type Chainable<R = {}> = {
    option(key: string, value: any): Chainable
    get(): R
}
// 3. option() 的返回类型应该是在原有 R 的基础上增加一个{新K: 新V}
type Chainable<R = {}> = {
    option(key: string, value: any): Chainable<R & Record<key的类型, value的类型>>
    get(): R
}
// 4. 另外 K 应该指定为 string 类型
type Chainable<R = {}> = {
    option<K extends string, V>(key: K, value: V): Chainable<R & Record<K, V>>
    get(): R
}
// 5. 因为限制了 key 只能使用一次，所以要判断 K 是否已经包含在 R 的 key 中了
type Chainable<R = {}> = {
    option<K extends string, V>(key: K extends keyof R ? never : K, value: V): Chainable<R & Record<K, V>>
    get(): R
}
// 6. testcase 中 key 可以重复传入只是值的类型不同，所以增加验证只有类型相同时才返回 never
type Chainable<R = {}> = {
    option<K extends string, V>(
        key: K extends keyof R
            ? (V extends R[K] ? K : never)
            : K,
        value: V
    ): Chainable<R & Record<K, V>>
    get(): R
}
// 7. 最后 R & Record<K, V> 会合并相同 K 的不同类型的情况成为一个类型集合，所以应该使用 Omit 保证合并时，是覆盖而非创建成多类型集合
type Chainable<R = {}> = {
    option<K extends string, V>(
        key: K extends keyof R
            ? (V extends R[K] ? K : never)
            : K,
        value: V
    ): Chainable<Omit<R, K> & Record<K, V>>,
    get(): R
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

# 15. 最后一个元素

实现一个 `Last<T>` 泛型，它接受一个数组 `T` 并返回最后一个元素的类型

```ts
type arr = ['a', 1]
type tail = Last<arr> // 1
```

```ts
type Last<T extends any[]> = any
// 1. 
type Last<T extends any[]> = 访问 T 的最后一项
// 2. 因为只有 T['length'] 可用，但是它访问的是结尾后的一项，所以想办法让 T.length + 1，即整体往后移一格
type Last<T extends any[]> = [never, ...T][T['length']]
// 3. 或者用 infer 把数组前面的和最后一项分开
type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never
```

# 16. 排除最后一项

实现一个泛型 `Pop<T>`，它接受一个数组 `T` ，并返回一个由数组 T 的前 N-1 项（N 为 T 的长度）以相同的顺序组成的数组。

```ts
type arr = [3, 2, 1]
type re = Pop<arr> // [3, 2]
```

```ts
type Pop<T extends any[]> = any
// 1. 
type Pop<T extends any[]> = T extends [...infer R, any] ? R : never
// 2. Equal<Pop<[]>, []> 会报错，所以需要针对空数组单独处理
type Pop<T extends any[]> = T['length'] extends 0
    ? T
    : T extends [...infer R, any] ? R : never
```

实现 `Shift, Push, Unshift`

```ts
type Shift<T extends any[]> = T extends [infer F, ...infer R] ? R : never

type Push<T extends any[], P> = [...T, P]

type Unshift<T extends any[], P> = [P, ...T]
```

# 17. 柯里化 1

柯里化是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术

```ts
const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)
```

传递给 `Curring` 的函数可能有多个参数，需要正确反映它们的类型。这里只要求柯里化后的函数每次仅接受一个参数，接受完所有参数后，应该返回其结果

```ts
declare function Currying(fn: any): any
// 1.
declare function Currying<F>(fn: F): Curried<F>
// 2.
type Curried<F> = F extends (...args: infer A) => infer R
    ? A extends [infer AF, ...infer O]
        ? (arg: AF) => Curried<(...args: O) => R>
        : R
    : never
// 3. Equal<typeof curried3, () => true> 测试不通过
type Curried<F> = F extends (...args: infer A) => infer R
    ? A extends [infer AF, ...infer O]
        ? 如果 O 的参数总数为0 直接返回 (arg) => R 
        : R
    : never
// 4.
type Curried<F> = F extends (...args: infer A) => infer R
    ? A extends [infer AF, ...infer O]
        ? (arg: F) => O['length'] extends 0
            ? R
            : Curried<(...args: O) => R>
        : () => R
    : never
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

# 20. PromiseAll

给函数 `PromiseAll` 指定类型，它接受 Promise 或类似 Promise 的对象的数组，返回值应为 `Promise<T>`，其中 T 应该是这些 Promise 结果类型组成的数组

```ts
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo')
})

const p = PromiseAll([promise1, promise2, promise3] as const) // Promise<[number, 42, string]>
```

```ts
declare function PromiseAll(values: any): any
// 1.
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{[K in keyof T]: T[K] extends Promise<infer R> | infer R ? R : T[K]}>
```

关于为何 `Promise<{[K in keyof T]: xxx}> somehow equal Promise<[xxx, xxx, xxx]`

```ts
type Tuple = ['a', 'b']
type funcReturnTuple<T extends unknow[]> = ([...T]) => {
    [P in keyof T]: ''
}
type case = funcReturnTuple<Tuple> // ([...T]: Iterable<any> => ['', ''])
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

# 55. 联合类型转化为交叉类型

实现高级工具类型 `UnionToIntersection<U>`

```ts
type I = UnionToIntersection<'foo' | 42 | true> // 'foo' & 42 & true
```

```ts
type UnionToIntersection<U> = any
// 1. 函数的参数在逆变位置上，而根据 ts 规范，逆变位置上同一个类型的多个候选会被推断成交叉类型
type ToUnionOfFunction<T> = T extends any ? (arg: T) => any : never
// 2.
type UnionToIntersection<U> = ToUnionOfFunction<U> extends (a: infer U) => any ? U : never;
```

# 57. 获得必需的属性

实现高级工具类型 `GetRequired<T>`，该类型保留所有必需的属性

```ts
type I = GetRequired<{ foo: number, bar?: string }> // { foo: number }
```

```ts
type GetRequired<T> = any
// 1.
type GetRequired<T> = {
    [K只要K是满足 T[K] 为 Required的]: T[K]
}
// 2.
type GetRequired<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}
// 3. 或者不使用 Required<T>, 使用 -? 代替
type GetRequired<T> = {
    [K in keyof T as {[P in K]: T[K]} extends {[P in K]-?: T[K]} ? K : never]: T[K]
}
```

# 59. 获得可选属性

实现高级工具类型 `GetOptional<T>`，该类型保留所有可选属性

```ts
type I = GetOptional<{ foo: number, bar?: string }> // { bar?: string } 
```

```ts
type GetOptional<T> = any
// 1. 和 GetRequired 一样，只是 ? 后的返回换一下
type GetOptional<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? never : K]:T[K]
}
// 2. 如果无法在 TS4.1 及以上使用 as，则可以换个思路
type GetOptional<T> = Pick<T, 所有Optional属性>
// 3.
type Opt<T> = {[K in keyof T]-? : {} extends Pick<T, K> ? K : never}[keyof T] // 得到 optional key 的联合类型
// 4. 
type GetOptional<T> = Pick<T, Opt<T>>
```

# 62. 查找类型

假设想通过指定公共属性 `type` 的具体值，从联合类型中查找到此 `type` 对应的类型

```ts
interface Cat {
    type: 'cat'
    breeds: 'A' | 'B'
}
interface Dog {
    type: 'dog',
    breeds: 'C' | 'D'
    color: 'brown' | 'white'
}
type MyDog = LookUp<Cat | Dog, 'dog'> // interface Dog
```

```ts
type LookUp<U, T> = any
// 1.
type LookUp<U, T> = U extends { type: T } ? U : never
// 2. 这样写法无法保证输入的可靠性，即 LookUp<Cat | Dog, 1> 也是可以输入的，如果想在 1 这里提示必须输入 type 有的值，可以这样：
type LookUp<U extends { type: any }, T extends U['type']> = U extends { type: T } ? U : never
```

# 89. 必需的键

实现高级工具类型 `RequiredKeys<T>`, 返回 T 中所有必需属性的键组成的联合类型

```ts
type Result = RequiredKeys<{ foo: number, bar?: string }> // "foo"
```

```ts
type RequiredKeys<T> = any
// 1.
type RequiredKeys<T, K = keyof T> = K extends keyof T
    ? T extends Required<Pick<T, K>>
        ? K
        : never
    : never
// 2. 如果不使用 Required
type RequiredKeys<T> = {
    [K in keyof T]-?: Pick<T, K> 是否等于 Required<Pick<T, K>> ? K : never
}[keyof T]
// 3. IsEqual<X, Y>
type RequiredKeys<T> = {
    [K in keyof T]-?: IsEqual<{[P in K]: T[P]}, { [P in K]-? : T[P] }> extends true ? K : never
}[keyof T]
```

# 90. 可选类型的键

实现高级工具类型 `OptionalKeys<T>`，返回 T 中所有可选属性的键组成的联合类型

```ts
type OptionalKeys<T> = any
// 1. 
type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]
// 2. 或者使用 Required
type OptionalKeys<T, K = keyof T> = K extends keyof T
    ? T extends Required<Pick<T, K>> ? never : K
    : never
```

# 106. 去除左侧空白

实现 `TrimLeft<T>`，它返回的是删除了输入的 T 字符串开头空白的字符串。

```ts
type trimed = TrimLeft<' Hello World '> // 'Hello World '
```

```ts
type TrimLeft<S extends string> = any
// 1. 定义 Space
type Space = ' ' | '\t' | '\n'
// 2. 
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S;
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
