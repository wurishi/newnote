https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

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
// 5. 
```