# 01. 从一个对象生成一个联合类型

```typescript
export const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 26,
};

type SingleFruitCount =
  | { apple: number }
  | { banana: number }
  | { pear: number };

const singleFruitCount: SingleFruitCount = {
  banana: 12,
};
```

想要根据 `fruitCounts`对象生成联合类型, 像 `SingleFruitCount`这样虽然可行, 但后期维护相当麻烦, 并且看起来写的不够**高级**.

所以我们可以首先根据 `fruitCounts` 定义一个类型

```typescript
type FruitCounts = typeof fruitCounts;
```

然后定义一个新类型, 让它的 key 就是 FruitCounts 中的所有的 key

```typescript
type NewSingleFruitCount = {
    [K in keyof FruitCounts]: {}
}
```

此时我们使用这个类型大概是这样的:

```typescript
const singleFruitCount: NewSingleFruitCount = {
  apple: {},
  banana: {},
  pear: {},
}
```

由于 fruitCounts 中每个类型的值为数字, 所以我们需要进一步定义每个 key 下面的值为数字类型, 大概是这样:

```typescript
type NewSingleFruitCount = {
  [K in keyof FruitCounts]: {
    [K2 in K]: number;
  };
};

const singleFruitCount2: NewSingleFruitCount = {
  pear: { pear: 4 },
  apple: { apple: 1 },
  banana: { banana: 26 },
};
```

但这仍然不是我们想要的, 它的结构看起来太复杂了. 所以我们需要再进一步.

```typescript
type NewSingleFruitCount = {
  [K in keyof FruitCounts]: {
    [K2 in K]: number;
  };
}[keyof FruitCounts];
```

到这个时候, 我们就可以很轻松的使用这个类型了:

```typescript
const singleFruitCount2: NewSingleFruitCount = {
  pear: 4,
  apple: 1,
  banana: 26,
};
```

# 02. 增强联合类型

当想要把以下的联合类型:

```typescript
export type Entity = { type: 'user' } | { type: 'post' } | { type: 'comment' };
```

转换成以下类型, 即根据 type 的不同添加不同的 xxxId 类型, 类似这样:

```typescript
type EntityWithId =
  | { type: 'user'; userId: string }
  | { type: 'post'; postId: string }
  | { type: 'comment'; commentId: string };
```

如上期一样, 如果更优雅的转换呢?

```typescript
type EntityWithId = {
  [EntityType in Entity['type']]: {
    type: EntityType;
  }
}
```

此时我们大概可以这样使用:

```typescript
const result: EntityWithId = {
  comment: {
    type: 'comment'
  }
}
```

但这还不够, 我们的目标是将它变成一个联合类型, 所以和上次一样, 我们改造 EntityWithId 变成这样:

```typescript
type EntityWithId = {
  [EntityType in Entity['type']]: {
    type: EntityType;
  };
}[Entity['type']];
```

但是此时我们只是创造了一个和 `Entity` 相同的类型, 接下来我们可以往里面增加我们需要的内容.

```typescript
type EntityWithId = {
  [EntityType in Entity['type']]: {
    type: EntityType;
  } & Record<`${EntityType}Id`, string>;
}[Entity['type']];
```

使用 `& Record<>` 我们扩展了 `EntityWithId`, 并且在定义 Record 的 key 时, 我们规定了 key 的名称必须使用以 type 为开头的 xxxId.

# 03. ts-toolbelt

```typescript
// 我们有这样一个 query 字符串
const query = `/home?a=foo&b=wow`

// 最终我们希望得到一个这样的对象
const obj:Union.Merge<QueryParams> = {
    a: 'foo',
    b: 'wow'
}
```

并且, 当 query 改变成 `/home?a=bar&b=wow`时, 我们希望 TS 能够提示我们 obj 的 a 属性需要改变.

通过使用 ts-toolbelt :

```typescript
type Query = typeof query // /home?a=foo&b=wow

type SecondQueryPart = String.Split<Query, "?">[1]; // a=foo&b=wow

type QueryElements = String.Split<SecondQueryPart, "&">; // ['a=foo', 'b=wow']
```

接着

```typescript
type QueryParams = {
    [QueryElement in QueryElements[number]]: { // 这里的 QueryElements[number] 代表了 QueryElements 中的每一项
        [Key in String.Split<QueryElement, '='>[0]]: // 这里等于把 a=foo, b=wow 分别将 a 和 b 作为 QueryParams 类型的 key, 值就是对应的 foo 和 wow
        	String.Split<QueryElement, '='>[1];
    }
}[QueryElements[number]]
```

# 04. 函数重载

我们有这样三个函数:

```typescript
const addOne = (a: number) => {
  return a + 1;
};

const numToString = (a: number) => {
  return a.toString();
};

const stringToNum = (a: string) => {
  return parseInt(a);
};
```

然后我们希望有一个 `compose`方法能够组合以上三个函数并返回正确的函数签名, 比如说:

```typescript
const addOne1 = compose(addOne); // 我们希望 addOne1 的函数签名为 (input: number) => number

const addOneToString = compose(addOne, numToString) // 函数签名最好可以是 (input: number) => string

const fn = compose(addOne, numToString, stringToNum) // 函数签名应该为 (input: number) => number
```

此时我们可以利用 typescript 的函数签名重载功能来实现:

```typescript
export function compose<Input, FirstArg>(
  func: (input: Input) => FirstArg
): (input: Input) => FirstArg;

export function compose<Input, FirstArg, SecondArg>(
  func: (input: Input) => FirstArg,
  func2: (input: FirstArg) => SecondArg
): (input: Input) => SecondArg;

export function compose<Input, FirstArg, SecondArg, ThirdArg>(
  func: (input: Input) => FirstArg,
  func2: (input: FirstArg) => SecondArg,
  func3: (input: SecondArg) => ThirdArg
): (input: Input) => ThirdArg;

export function compose(...args: any[]) {
  // 具体的实现
}
```

# 05. 使用 extends 缩小泛型范围

假设我们有一个 `getDeepValue`方法, 可以用来查找对象深层次的属性值, 比如:

```typescript
const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: 'cool',
    d: 2,
  },
};

const result1 = getDeepValue(obj, 'foo', 'a') // true
const result2 = getDeepValue(obj, 'bar', 'd') // 2
```

我们希望当设置 `getDeepValue`的第二个参数为 'foo' 时, 第三个参数能够自动限制为 'a | b'. 

```typescript
export const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
): Obj[FirstKey][SecondKey] => {
  // 具体函数实现
};
```

此时, `getDeepValue`函数的第二个参数会自动被限制为 'foo | bar', 第三个参数也会自动根据第二个参数变化. 并且返回值也会有正确的类型.