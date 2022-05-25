# 1. 从一个对象生成一个联合类型

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

# 2. 增强联合类型

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