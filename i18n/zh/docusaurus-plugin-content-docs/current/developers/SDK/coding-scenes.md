
### 开发工具
在非常高的层次上，Andverse 软件开发工具包 (SDK) 允许您执行以下操作：

- 生成包含 Andverse 场景的默认项目，包括渲染和运行内容所需的所有资产。
- 在您的 Web 浏览器中本地构建、测试和预览场景的内容 - 完全离线，无需进行任何以太坊交易或拥有 LAND。
- 使用 Andverse API 编写 TypeScript 代码，为场景添加交互式和动态行为。
- 将场景的内容上传到内容服务器。
- 将您的 LAND 令牌链接到您上传的内容的 URL。

我们的 SDK 包括以下组件：

- <strong>Andverse CLI</strong>（命令行界面）：使用它在您自己的机器上本地生成新的 Andverse 场景，预览它们并将它们上传到内容服务器。
- <strong>场景示例</strong>：从 [场景示例](https://github.com/andverse-scenes) 中获取灵感和编码最佳实践。

### 要求
要在本地开发场景，您不需要拥有 LAND 代币。开发和测试场景可以完全离线完成，无需将场景部署到 Newton 网络（Andverse 用于建立 LAND 所有权的系统）或内容服务器。

您必须具备以下条件：

- **npm** (Node package manager)：在终端中用于处理场景依赖，需要安装Andverse CLI。

- **Andverse CLI**：用于构建、预览和上传场景。请参阅[安装指南](https://docs.andverse.org/zh/technology/installation-guide)

源代码编辑器：帮助您更快地创建场景并减少错误。源代码编辑器标记语法错误，在您编写时自动完成，甚至根据您所处的上下文向您显示智能建议。您还可以单击代码中的对象以查看其类的完整定义以及哪些属性它支持。我们推荐 [Visual Studio Code](https://code.visualstudio.com/)。

### 支持的语言和语法
**TypeScript（推荐）**
我们使用 [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) (.ts) 来创建我们的场景。

TypeScript 是 JavaScript 的超集，因此如果您熟悉 JavaScript，您会发现它几乎相同，但 TypeScript 允许您使用面向对象的编程和类型声明。自动完成和类型检查等功能加快了开发时间，并允许创建更可靠的代码库。这些功能都是积极的开发人员体验的关键组成部分。

**其他语言**
您可以使用其他工具或语言代替 TypeScript 并将其编译为 JavaScript，只要您编译的脚本包含在名为 ***game.js*** 的单个 JavaScript 文件中。所有提供的类型声明都是用 TypeScript 进行的，其他语言和转译器不受官方支持。

###场景
您部署到 LAND 的内容称为**场景**。场景是渲染内容的交互式程序，可以是游戏、交互式体验、艺术画廊，任何你想要的！

场景被部署到 Andverse 中的虚拟 LAND。 LAND 是在以太坊智能合约中维护的稀缺且不可替代的资产。部署到单个**地块**、16 米乘 16 米的土地，或部署到由多个相邻地块组成的**地产**。

我们正在开发允许玩家探索 Andverse 的网络客户端。您上传到 LAND 的所有内容都将通过此客户端呈现和查看。我们在 SDK 中包含了一个预览工具，以便您可以同时预览、测试和与您的内容交互。

### 实体和组件
Andverse 中的三维场景基于 [Entity-Component-System](https://en.wikipedia.org/wiki/Entity_component_system) 架构，其中场景中的所有内容都是*实体*，每个实体可以包含*决定其特性的组件*。

实体嵌套在其他实体中以形成树结构。如果您熟悉 Web 开发，您可能会发现将实体视为 DOM 树中的元素并将组件视为每个元素的属性很有用。

请参阅实体和组件，深入了解这两个概念以及 Andverse 场景如何使用它们。

### 游戏循环
[游戏循环](http://gameprogrammingpatterns.com/game-loop.html) 是 Andverse 场景代码的主干。它定期循环浏览部分代码并执行以下操作：

- 聆听玩家输入
- 更新场景
- 重新渲染场景
在大多数传统的软件程序中，所有事件都是由玩家动作直接触发的。在玩家单击按钮、打开菜单等之前，程序状态中的任何内容都不会改变。

但互动环境和游戏则不同。并非所有场景的变化都一定是由玩家的行为引起的。是我们的场景可以有自己移动的动画对象，甚至是拥有自己 AI 的非玩家角色。一些玩家动作也可能需要多帧才能完成，例如，如果打开一扇门需要一秒钟，那么门的旋转必须在移动时增量更新大约 30 次。

我们将循环上的每次迭代称为帧。 Andverse 场景尽可能以每秒 30 帧的速度渲染。如果一帧的渲染时间比渲染时间长，则处理的帧数会更少。

在每一帧中，场景都会更新；然后根据更新的值重新渲染场景。

在 Andverse 场景中，没有明确声明的游戏循环，而是场景系统上的 update() 函数构成了游戏循环。

场景的编译和渲染在后端进行，开发场景时无需处理。

### 系统
实体和组件是存储有关场景中对象的信息的地方。系统拥有改变存储在组件中的信息的功能。

系统使静态场景动态化，允许事物随着时间的推移或响应玩家交互而改变。

每个系统都有一个 update() 方法，该方法在游戏循环的每一帧上执行，遵循更新模式。

有关如何在场景中使用系统的更多详细信息，请参阅系统。

### 组件组
组件组跟踪场景中具有某些组件的所有实体。创建组件组后，它会自动使其列表与添加或删除的每个新实体或组件保持同步。

如果您尝试在每一帧上更新场景中的所有实体，则可能会显着降低性能。通过仅引用组件组中的实体，您可以确保您只处理相关的实体。

组件组可以被系统中的功能引用。通常，update() 函数将遍历组件组中的实体，对每个实体执行相同的操作。

###把所有东西放在一起
引擎一方面位于实体、组件和组件组之间，另一方面位于系统之间。它调用系统的函数，在添加实体时更新组等。

存储在场景组件中的所有值都代表了该时间点的场景状态。对于游戏循环的每一帧，引擎都会运行每个系统的 update() 函数来更新存储在组件中的值。

在所有系统运行后，每个实体上的组件都会有新的值。当引擎渲染场景时，它将使用这些新的更新值，玩家将看到实体发生变化以匹配他们的新状态。

```ts
// 创建一个组以使用 Transform 组件跟踪所有实体
const myGroup = engine.getComponentGroup(Transform)

// 定义一个系统
export class RotatorSystem implements ISystem {
  //  更新函数在游戏循环的每一帧上运行
  update() {
    // 该函数遍历 myGroup 中的所有实体
    for (let entity of myGroup.entities) {
      const transform = entity.getComponent(Transform)
      transform.rotate(Vector3.Left(), 0.1)
    }
  }
}

// 将系统添加到引擎
engine.addSystem(new RotatorSystem())

//  创建一个实体
const cube = new Entity()

cube.addComponent(
  new Transform({
    position: new Vector3(5, 1, 5),
  })
)

// 给这个entity一个盒子形状
cube.addComponent(new BoxShape())

engine.addEntity(cube)
```

在上面的例子中，一个立方体实体和一个 RotatorSystem 系统被添加到引擎中。立方体实体有一个 Transform 和一个 BoxShape 组件。在游戏循环的每一帧中，都会调用 RotationSystem 的 update() 函数，它会改变立方体实体的 Transform 组件中的旋转值。

请注意，上面的大部分代码在加载场景时只执行一次。系统的 update() 方法是个例外，它在游戏循环的每一帧都会被调用。

###场景解耦
您的场景不会在与引擎（也就是主线程）相同的上下文中运行。我们以与渲染引擎完全分离的方式创建了 SDK。出于安全和性能原因，我们将其设计为这样。

由于这种解耦，您的场景代码无法访问 DOM 或窗口对象，因此您无法访问玩家浏览器或地理位置等数据。

解耦使用 RPC 协议工作，该协议分配一小部分客户端仅渲染场景和控制事件。

我们还抽象了通信协议。这允许我们在 WebWorker 中本地运行场景。

我们不希望开发人员干预引擎的内部，甚至不需要知道引擎内部的内容。我们需要确保玩家在整个 Andverse 地图中获得一致的体验，