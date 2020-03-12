# 1. ECS Entity Component System 入门学习1

使用的是2015年谷歌(是 Wooga 的) 在 Github 上发布的一个名叫 Entitas 的 ECS 框架.

[Github地址](https://github.com/sschmid/Entitas-CSharp/wiki)

## 1.1 什么是 ECS 框架?

其实 Unity 本身的组件开发就是 ECS 框架. 但是在 Unity 中写脚本, 拖到每一个 GameObject 下, 其实都是一个 MonoBehaviour, 这个脚本中往往既包含了数据, 又包含了方法. 而 Entitas 的目标是让数据和方法分离. 在 GameObject 下只添加数据, 而方法由其他系统完成.

在 Entitas 下, GameObject 的组件不能有任何方法, 只保存数据, 数据代表特性, 拥有一样特性的执行逻辑(也就是方法)会在特定时间点上统一执行.

数据和方法的解耦, 会有以下的好处:

1. 添加的功能可以逐个做单元测试.
2. 代码共享方便.
3. 在 GameObject 下只有数据, 没有任何方法或者说没有逻辑上的代码.
4. 很容易查询到拥有相同类型数据的对象.
5. 效率高.

## 1.2 框架中的四种概念

```
+------------------+
|     Context      |
|------------------|
|    e       e     |      +-----------+
|        e     e---|----> |  Entity   |
|  e        e      |      |-----------|
|     e  e       e |      | Component |
| e            e   |      |           |      +-----------+
|    e     e       |      | Component-|----> | Component |
|  e    e     e    |      |           |      |-----------|
|    e      e    e |      | Component |      |   Data    |
+------------------+      +-----------+      +-----------+
  |
  |
  |     +-------------+  Groups:
  |     |      e      |  Subsets of entities in the context
  |     |   e     e   |  for blazing fast querying
  +---> |        +------------+
        |     e  |    |       |
        |  e     | e  |  e    |
        +--------|----+    e  |
                 |     e      |
                 |  e     e   |
                 +------------+
```

### Entity 实体

Entity 就是一个数据的集合, **只有数据, 没有方法**. 你可以以组件形式 (`IComponent`) 添加, 替代, 删除这些数据, Entity会触发相应的事件以处理数据的变化.

### Context 环境

Context 就是创建销毁 Entity 的工厂, 你可以使用它来过滤出你所感兴趣的 Entity.

### Group 组

组在 Context 中可以进行快速过滤, 它能不间断的更新以保持当前的组中的 Entity 是最新的.

组和组内过滤到的 Entity 会被缓存下来, 所以即使多次调用 `GetGroup` 获取组的方法, 对性能也不会造成多大的影响.

同时组拥有 `OnEntityAdded` , `OnEntityRemove` 和 `OnEntityUpdated` 方法, 来处理拥有相同类型数据 Entity 的行为.

### Collector 收集器

Collector 提供了一种简单的方法来处理 Group 中 Entity 变化的反应. 与组中直接添加方法的区别是, 它能汇总处理 Entity, 并且很方便的实现特定情况下的处理方式.

## 1.3 举个栗子

1. 首先在 Assets 目录下创建一个新目录, 并将 Entitas.zip 解压到目录下.

2. 打开 Tools > Jenny > Preferences 打开窗口, 选择 Auto Import 后, 点击 Generate 生成一些默认脚本. 主要是自动生成了 Contexts Feature 代码文件, 和对应环境的一些代码. (默认有 Game 和 Input 二个目录)

3. 创建一个 Component

   ```c#
   // Chapter1/DebugMessageComponent.cs
   using Entitas; // Entitas的命名空间
   
   [Game] // 标签是必须的, 不然没法通过 context 找到这个 component
   // 其实也不是必须的, 不写的话默认会被添加进 Game 的 context.(应该是自动添加进第一个环境)
   
   // 继承于 IComponent
   public class DebugMessageComponent : IComponent {
       public string message; // 属性数据
   }
   ```

   创建完后要重新生成一下代码 (快捷键 Ctrl + Shift + G).

4. 编写处理 Component 的方法

   ```c#
   // Chapter1/DebugMessageSystem.cs
   // 继承 ReactiveSystem, 功能是只要 Component 的值一发生变化, 本 System 的 Execute 就会执行
   public class DebugMessageSystem : ReactiveSystem<GameEntity> {
       // 将环境中的 game 环境传入
       public DebugMessageSystem(Context contexts) : base(contexts.game) {}
       // 获取指定 Component 的 Entity, 这里是必须拥有 DebugMessageComponent 的 Entity 才能被获取
       protected override ICollector<GameEntity> GetTrigger(IContext<GameEntity> context) {
           // 创建并返回一个 Collector 收集器
           // GameMatcher.DebugMessage 是由上一步生成代码时自动生成的
           // 内部是使用 Entitas 中的 Matcher.AllOf 进行查找, 高阶使用时可能需要自己做查找
           return context.CreateCollector(GameMatcher.DebugMessage);
       }
       // 上面是针对一组 GameEntity 进行查找的, 这里的过滤主要针对单一的 Entity 判断.
       protected override bool Filter(GameEntity entity) {
           // hasDebugMessage 也是由上一步生成代码时自动生成的
           return entity.hasDebugMessage;
       }
       // 针对上面二步过滤后拿到的 Components 进行统一的操作
       protected override void Execute(List<GameEntity> entities) {
           foreach(var e in entities) {
               Debug.Log(e.debugMessage.message);
           }
       }
   }
   ```

   在 ECS 框架中, 处理每一个 Component 的就是 System. System 本身是一个 Collector 的子类, 拥有过滤 Entity, 并执行的作用.

5. 将所有 System 添加入一个 Feature 中.

   ```c#
   // Chapter1/Chapter1Feature.cs
   public class Chapter1Feature : Feature {
       public Chapter1Feature(Contexts contexts) : base("Chapter1Feature") {
           Add(new DebugMessageSystem(contexts));
       }
   }
   ```

   Feature 是 Systems 的子类, 它拥有统一执行所有 System 方法的能力.

   Feature 这个子类主要是方便开发与调试, 如果是在 Unity 编辑器模式下, 会在场景中生成一个 System 节点, 方便查看当前创建的所有 System 以及其消耗的性能. 

6. 创建一个与 Unity 交互的 MonoBehaviour

   ```c#
   // Chapter1/Chapter1.cs
   public class Chapter1 : MonoBehaviour {
       Systems _systems;
       void Start() {
           // 获取当前环境, 里面包含了 game 和 input
           var contexts = Contexts.sharedInstance;
           // 创建一个系统集, 将自定义的 Chapter1Feature 添加进去.
           _systems = new Feature("System")
               .Add(new Chapter1Feature(contexts));
           // 初始化, 会执行系统里面所有实现 IInitialzeSystem 的 Initialize 方法
           _systems.Initialize();
       }
       void Update() {
           _systems.Execute();
           _systems.Cleanup();
       }
   }
   ```

   在场景中创建一个空对象并绑定上面的脚本即可执行.

   注意此时的控制台不会有任何输出, 主要是因为并没有做任何创建 Entity 的操作. 但可以在 Hierarchy 列表中看到 Game, Input 的二个对象, 选中 Game, 在 Inspector 中点击 Create Entity 按钮, 然后 Add Component 添加一个 DebugMessage 组件, 此时就会在控制台输出 null, 尝试修改 message 属性, 每次修改后回车, 会在控制台看到效果.

7. 创建一个初始化 System

   ```c#
   // Chapter1/HelloWorldSystem.cs
   // 继承于 IInitializeSystem, 作用是在程序启动时, 执行一次 Initialize 方法
   public class HelloWorldSystem : IInitializeSystem {
       private readonly GameContext _context;
       public HelloWorldSystem(Contexts contexts) {
           // 创建时拿到 game 环境
           _context = contexts.game;
       }
       public void Initialize() {
           // 创建一个 Entity
           // 并在 Entity 上添加一个 DebugMessageComponent, 并给于 message 默认值 "Hello World"
           // 这里的 AddDebugMessage 是上面按了生成按钮自动生成的
           _context.CreateEntity()
               .AddDebugMessage("Hello World");
       }
   }
   
   // Chapter1/Chapter1Feature.cs
   // 别忘了 Add(new HelloWorldSystem(contexts));
   ```

   注 1: 这里的 `Initialize` 方法是在 Chapter1.cs 中的 `Start` 方法中的 `_systems.Initialize` 触发的.

   注 2: `AddDebugMessage` 方法会根据 Componet 属性的变化, 每次按自动生成代码时发生变化. 所以一般 Component 属性确定后尽量不要去改动. 当然也可能用以下另一种方法代替 `AddDebugMessage` 方法.

   ```c#
   var index = GameComponentsLookup.DebugMessage;
   var type = typeof(DebugMessageComponent);
   var entity = _context.CreateEntity();
   var component = entity.CreateComponent(index, type) as DebugMessageComponent;
   // 或 component = entity.CreateComponent<DebugMessageComponent>(index);
   component.message = "Hello";
   entity.AddComponent(index, component);
   ```

   这里可以看到 `CreateComponent` 和 `AddComponent` 方法都需要指定一个 index , 这里是通过 `GameComponentsLookup.DebugMessage` 来获取的, 所以如果要部分热更新代码, 绝对不能依赖这段自动生成的代码.

在 Chapter1.cs 中我们会看到 `Execute` 方法是在 `Update` 中每帧都执行的, 但 message 为什么只打印一次?

这就是 `ReactiveSystem` 的特性, 它只会在 Component 的属性发生变化时才会执行 `Execute`.