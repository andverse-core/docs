

Andverse 中的三维场景基于 [Entity-Component](https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system) 模型，其中场景中的一切都是 _entity_，每个实体都可以包含塑造其特征和功能的 _components_。

实体的渲染形状取决于它使用的组件。每个实体只能分配一个形状组件。

## 原始形状

可以将几种基本形状（通常称为_primitives_）添加到实体中。

可以使用以下原始形状组件：

- `盒子形状`
- `球形`
- `平面形状`
- `圆柱形状`
- `锥形`

这些组件中的每一个都有特定于该形状的某些字段，例如_圆柱体_形状具有`arc`、`radiusTop`、`radiusBottom`等。

要将组件应用于实体，您可以实例化一个新组件并在一次操作中将其全部分配：

```ts
myEntity.addComponent（新 SphereShape（））
```

或者您可以先创建组件实例，然后将其分配给实体。

```ts
让 sphere = new SphereShape()
myEntity.addComponent(sphere)
```

原始形状不包括材料。要为其赋予颜色或纹理，您必须将 [材质组件] 分配给同一实体。

## 3D模型

对于更复杂的形状，您可以在 Blender 等外部工具中构建 3D 模型，然后将它们导入 _.glTF_ 或 _.glb_（二进制 _.glTF_）。 [glTF](https://www.khronos.org/gltf)（GL 传输格式）是 Khronos 的一个开放项目，它为 3D 资产提供了一种通用的、可扩展的格式，该格式既高效又与现代网络技术高度互操作。

要将外部模型添加到场景中，请将“GLTFShape”组件添加到实体，并将其“src”设置为包含模型的 glTF 文件的路径

```ts
myEntity.addComponent(new GLTFShape("models/House.gltf"))
```

由于 `src` 字段是必需的，因此在构造组件时必须给它一个值。

在上面的示例中，模型位于场景项目文件夹根级别的“models”文件夹中。

> 提示：我们建议将您的模型单独保存在场景内的 `/models` 文件夹中。

glTF 模型可以包含它们自己的嵌入式纹理、材质、碰撞器和动画。有关这方面的更多信息，请参阅 [3D 模型]。

请记住，所有模型、它们的着色器和它们的纹理都必须在 [场景限制] 的参数范围内。

#### 3D 模型的免费库

除了构建自己的 3d 模型，您还可以从几个免费或付费的库中下载它们。

为了帮助您入门，下面列出了包含免费或相对便宜的内容的库：

- [来自 Builder 的资产](https://github.com/andverse/builder-assets/tree/master/assets)
- [SketchFab](https://sketchfab.com/)
- [Clara.io](https://clara.io/)
- [Archive3D](https://archive3d.net/)
- [SketchUp 3D 仓库](https://3dwarehouse.sketchup.com/)
- [Thingiverse](https://www.thingiverse.com/)（3D 模型主要用于 3D 打印，但适用于虚拟世界）
- [ShareCG](https://www.sharecg.com/)
- [CGTrader](https://www.cgtrader.com/)

> 注意：请注意您下载的内容所具有的许可限制。

请注意，在其中几个站点中，您可以选择下载模型的格式。如果可用，请始终选择 _.glTF_ 格式。如果不可用，则必须先将它们转换为 _glTF_，然后才能在场景中使用它们。为此，我们建议将它们导入 Blender。

## 碰撞

启用碰撞的实体占据空间并阻挡玩家的路径，没有碰撞的实体可以被玩家的化身穿过。

碰撞设置目前不影响其他实体之间的交互方式，实体总是可以重叠的。碰撞设置仅影响实体与玩家头像的交互方式。

Andverse 当前没有物理引擎，因此如果您希望实体跌落、碰撞或弹跳，您必须将此行为编码到场景中。

实体默认不使用碰撞。根据它所具有的形状组件的类型，可以按如下方式启用碰撞：

- 对于 _primitive_ 形状（盒子、球体、平面等），您可以通过将形状组件的 `withCollisions` 字段设置为 _true_ 来启用碰撞。

  这个例子定义了一个不能被遍历的盒子实体。

  ```ts
  let box = new BoxShape()
  box.withCollisions = true
  myEntity.addComponent(box)
  ```

> 注意：飞机只阻挡一个方向的运动。

- 要在 _glTF_ 形状中使用碰撞，您可以：

  - 用原始形状覆盖一个不可见的实体，并将 `withCollisions` 字段设置为 _true_。
  - 在 Blender 等外部工具中编辑模型以包含 _collider object_。碰撞器必须命名为 _x_collider_，其中 _x_ 是模型的名称。因此对于名为 _house_ 的模型，碰撞器必须命名为 _house_collider_。

_collider_ 是一组几何形状或平面，用于定义模型的哪些部分被碰撞。这允许更大的控制并且对系统的要求要低得多，因为碰撞对象通常比原始模型简单得多（顶点更少）。

有关如何将碰撞器添加到 3D 模型的更多详细信息，请参阅 [3D 模型]。

## 指针阻塞

默认情况下，所有形状都会阻止玩家 [按钮事件]，例如，玩家无法点击墙壁，或捡起锁在箱子内的东西。

但是，您可以在任何形状上禁用此行为，无论它是原始模型还是导入的 3D 模型。

为此，请将形状组件的 `isPointerBlocker` 属性设置为 _false_。

```ts
let box = new BoxShape()
box.isPointerBlocker = false
myEntity.addComponent(box)
```

例如，通过使用此属性，您可以拥有一堵玩家无法穿过的隐形墙，但这确实允许他们点击墙另一侧的项目。

## 使不可见

您可以通过在其形状组件中设置“可见”字段来使实体不可见。在将形状用作对撞机时，这样做特别有用。

默认情况下，原始形状和 3D 模型的所有组件都是可见的。

```ts
const myEntity = 新实体（）
myEntity.addComponent（新 BoxShape（））
myEntity.getComponent(BoxShape).visible = false
```

如果实体是不可见的，它的碰撞器可以阻挡玩家的路径，但不能被点击。要使实体既不可见又可点击，请将 `visible` 属性设置为 _true_，并改为赋予其 100% 透明度的 [material] 

