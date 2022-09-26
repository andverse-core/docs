您可以使用 `Transform` 组件设置实体的 _position_、_rotation_ 和 _scale_。这可以用于任何实体，也可以是原始形状组件（立方体、球体、平面等）或 3D 模型组件（`GLTFShape`）

```ts
// 创建一个新实体
const ball = new Entity()

// 给实体添加一个变换组件
ball.addComponent(new Transform())
ball.getComponent(Transform).position.set(5, 1, 5)
ball.getComponent(Transform).scale.set(2, 2, 2)
```

为简洁起见，您还可以创建一个 `Transform` 实体并在单个语句中为其赋予初始值，向其传递一个可以选择包含 _position_、_rotation_ 和 _scale_ 属性的对象。

```ts
let box = new Entity()
box.addComponent(new BoxShape())
box.addComponent(
  new Transform({
    position: new Vector3(5, 1, 5),
  })
)
box.addComponent(new Billboard())
engine.addEntity(box)
```

要在场景中移动、旋转或调整实体大小，请逐帧递增地更改此组件上的值。有关更多详细信息和最佳实践，请参阅 [移动实体]。您还可以使用 [utils 库](https://www.npmjs.com/package/andverse-ecs-utils) 中的辅助函数来更轻松地实现此目的。

## 位置

`position` 是一个 _3D 矢量_，它设置实体中心在所有三个轴上的位置，存储为 `Vector3` 对象。

```ts
// 使用预定义的位置创建变换
让 myTransform = new Transform({ position: new Vector3(1, 0, 1) })

// 分别设置每个轴
myTransform.position.x = 3
myTransform.position.y = 1
myTransform.position.z = 3

// 用三个数字 (x, y, z) 设置位置
myTransform.position.set(3, 1, 3)

// 用对象设置位置
myTransform.position = new Vector3(5, 1, 5)
```

> 注意：使用对象设置位置值时，您可以使用 `Vector3` 对象，也可以使用具有 _x_、_y_ 和 _z_ 字段的任何其他对象。

设置位置时，请牢记以下注意事项：

- 由单个地块组成的场景尺寸为 16m x 16m。场景的中心（在地面）位于`x:8, y:0, z:8`。如果场景由多个地块组成，那么中心将根据它们的排列而变化。

- `x:0, y:0, z:0` 指的是场景基础地块的 _South-West_ 角，位于地面。

  > 提示：查看场景预览时，场景的 (0,0,0) 点会出现一个指南针，并带有每个轴的标签作为参考。

  > 提示：拿你的_left_手，你的食指（指向前方）是_z_轴，你的中指（指向侧面）是_x_轴，你的拇指（指向上）是_y_轴。

  > 注意：您可以通过编辑 _scene.json_ 的 `base` 属性来更改场景的基本地块。

- 如果一个实体是另一个实体的子实体，那么 `x:0, y:0, z:0` 指的是其父实体的中心，无论它在场景中的什么位置。

- 场景中的每个实体必须始终位于其占据的地块范围内。如果实体离开这些边界，它将引发错误。

  > 提示：在预览模式下查看场景时，超出范围的实体以_红色_突出显示。

- 你的场景也有高度限制。组成场景的地块越多，您可以建造的越高。有关更多详细信息，请参阅 [场景限制]。

## 旋转角度

`rotation` 存储为 [_quaternion_](https://en.wikipedia.org/wiki/Quaternion)，一个由 _x_、_y_、_z_ 和 _w_ 四个数字组成的系统。

```ts
// 在四元数中使用预定义的旋转创建变换
let myTransform = new Transform({ rotation: new Quaternion(0, 0, 0, 1) })

// 用四个数字（x，y，z，w）设置旋转
myTransform.rotation.set(0, 0, 1, 0)

// 使用四元数设置旋转
myTransform.rotation = new Vector4(1, 0, 0, 0)
```

您还可以使用 [_Euler_ 角](https://en.wikipedia.org/wiki/Euler_angles) 设置旋转字段，这是最常见的 _x_、_y_ 和 _z_ 表示法，大多数人都熟悉从 0 到 360 的数字和。要使用欧拉角，请使用以下符号之一：

```ts
// 使用欧拉角的预定义旋转创建变换
let myTransform = new Transform({ rotation: Quaternion.Euler(0, 90, 0) })

// 使用 .setEuler() 函数
myTransform.rotation.setEuler(0, 90, 180)

// 设置 `eulerAngles` 字段
myTransform.rotation.eulerAngles = new Vector3(0, 90, 0)
```
当使用 _3D 矢量_ 表示欧拉角时，_x_、_y_ 和 _z_ 表示该轴上的旋转，以度为单位。一个完整的转弯需要 360 度。

> 注意：如果使用 _Euler_ 角度设置旋转，旋转值仍以四元数的形式在内部存储。

当您检索实体的旋转时，它默认返回一个四元数。要获得以欧拉角表示的旋转，请获取“.eulerAngles”字段：

```ts
myEntity.getComponent(Transform).rotation.eulerAngles
```

#### 添加旋转

另一种选择是对现有变换执行“旋转”操作，这会增加其当前旋转。 `rotate` 操作接受一个指示方向的向量和要旋转的度数。在以下示例中，我们将实体沿 X 轴倾斜 15 度，这会增加它最初的旋转：

```ts
myTransform.rotate(new Vector3(1, 0, 0), 15)
```

`rotate` 操作在处理在多个轴上旋转的实体时很有用，例如 X 和 Y。以下示例在 Y 轴上设置原始旋转，然后沿 X 轴旋转变换：

```ts
myTransform.rotation.setEuler(0, 90, 0)
myTransform.rotate(new Vector3(1, 0, 0), 15)
```

请注意，这与将初始旋转设置为 `(15, 90, 0)` 的结果不同。在该示例中，沿 X 轴的旋转不会沿变换的原始 X 轴发生，而是沿由初始旋转产生的 _tilted_ X 轴发生。

##面对玩家

将 _Billboard_ 组件添加到实体，使其始终旋转以面向玩家。

广告牌是 90 年代 3D 游戏中常用的技术，其中大多数实体是始终面向玩家的 2D 平面。同样的想法也可以用于旋转 3D 模型。

```ts
let box = new Entity()
box.addComponent(new BoxShape())
box.addComponent(
  new Transform({
    position: new Vector3(5, 1, 5),
  })
)
box.addComponent(new Billboard())
engine.addEntity(box)
```

您可以选择作为广告牌旋转的轴。例如，如果一个立方体的广告牌只在 Y 轴上旋转，它在地面移动时会跟随玩家，但玩家可以从上方或下方看到它。

创建 `Billboard` 组件时的三个可选参数是引用 _x_、_y_ 和 _z_ 轴的布尔值。默认情况下，它们都是“真”。

```ts
// rotate on all three axis
let FullBillboard = new Billboard())

// rotate only in the X axis
let XBillboard = new Billboard(true, false ,false)

// rotate only in theY axis
let YBillboard = new Billboard(false, true ,false)

// rotate only in the Z axis
let ZBillboard = new Billboard(false, false ,true)
```

提示：要旋转实体以便它在地面上跟随玩家，请给它 _Y_ 轴旋转。

广告牌也很容易添加到 _text_ 实体中，因为它使它们始终清晰易读。

实体的 `Transform` 组件的 `rotation` 值不会随着广告牌跟随玩家而改变。

如果实体同时具有 `Billboard` 组件和具有 `rotation` 值的 `Transform` 组件，玩家将看到实体旋转为广告牌。如果广告牌不影响所有轴，则剩余的轴将根据 `Transform` 组件进行旋转。

> 注意：如果有多个玩家同时在场，每个玩家都会看到面向他们的广告牌模式的实体。

##面对一组坐标

您可以在 Transform 组件上使用 `lookAt()` 来定位实体，使其面向空间中的特定点，只需传递该点的坐标即可。这是一种避免处理计算必要角度的数学的方法。

```ts
// 创建一个变换
let myTransform = new Transform()

// 旋转面对坐标 (4, 1, 2)
myTransform.lookAt(new Vector3(4, 1, 2))
```

该字段需要一个 _Vector3_ 对象作为值，或任何具有 _x_、_y_ 和 _z_ 属性的对象。该向量表示要查看的场景中点的位置坐标。

`lookAt()` 函数有第二个可选参数，用于设置 _up_ 的全局方向以用作参考。大多数情况下，您不需要设置此字段。

＃＃ 规模

`scale` 也是一个 _3D 矢量_，存储为 `Vector3` 对象，包括 _x_、_y_ 和 _z_ 轴上的比例因子。实体的形状会相应缩放，无论是原始模型还是 3D 模型。

您可以使用 `set()` 操作为三个轴中的每一个提供一个值，或者使用 `setAll()` 提供一个数字并在缩放时保持实体的比例。

默认比例为 1，因此指定一个大于 1 的值来拉伸实体，或者指定一个小于 1 的值来收缩它。

您可以单独设置每个维度，也可以使用 `set` 操作设置所有维度。

```ts
// 创建具有预定义比例的变换
让 myTransform = new Transform({ scale: new Vector3(2, 2, 2) })

// 分别设置每个维度
myTransform.scale.x = 1
myTransform.scale.y = 5
myTransform.scale.z = 1

// 用一个表达式设置整个比例 (x, y, z)
myTransform.scale.set(1, 5, 1)

// 用单个数字设置比例以保持比例
myTransform.scale.setAll(2)

// 用对象设置比例
myTransform.scale = new Vector3(1, 1, 1.5)
```

使用对象设置比例值时，您可以使用“Vector3”对象或任何其他具有 _x_、_y_ 和 _z_ 字段的对象。

## 从父级继承转换

当一个实体嵌套在另一个实体中时，子实体从父实体继承组件。这意味着如果父实体被定位、缩放或旋转，其子实体也会受到影响。子实体的位置、旋转和缩放值不会覆盖父实体的值，而是复合。

如果父实体被缩放，则其子实体的所有位置值也会被缩放。

```ts
// 创建实体
const parentEntity = new Entity()
const childEntity = new Entity()

// 将一个设置为另一个的父级
childEntity.setParent(parentEntity)

// 为父级创建一个
让 parentTransform = new Transform({
  position: new Vector3(3, 1, 1),
  scale: new Vector3（0.5，0.5，0.5），
})

parentEntity.addComponent(parentTransform)

// 为子级创建一个
让 childTransform = new Transform({
  position：new Vector3(0, 1, 0),
})

childEntity.addComponent(childTransform)

// 将实体添加到引擎
engine.addEntity(parentEntity)
```

您可以使用没有形状组件的不可见实体来包装一组其他实体。此实体在渲染场景中不可见，但可用于对其子项进行分组并对所有子项应用变换。

> 注意：子实体不应显式添加到引擎中，因为它们已通过其父实体添加。

## 将实体附加到头像

要将实体的位置固定到化身，请将 `AttachToAvatar` 组件添加到实体。

<!-- 你可以在头像上选择不同的锚点，这些点大部分都链接到玩家的骨架并跟随玩家的动画。例如，当使用“RightHand”锚点时，附加实体将在化身在奔跑时挥动或摆动手臂时移动，就像玩家将实体握在手中一样。 -->

```ts
this.addComponentOrReplace(
  new AttachToAvatar({
    avatarId: '0xAAAAAAAAAAAAAAAAAA',
    anchorPointId: AttachToAvatarAnchorPointId.NameTag,
  })
)
```

创建 `AttachToAvatar` 组件时，您必须传递具有以下数据的对象：

- `avatarId`：要附加到的玩家的 ID。对于与以太坊钱包连接的玩家，这与玩家的以太坊地址相同。
- `anchorPointId`：要附加实体的头像上的哪个锚点。


播放器上提供以下锚点：

- `NameTag`：浮动在玩家的名字标签上方，不受玩家动画的影响。

  > 注意：名牌高度会根据玩家穿戴的可穿戴设备的高度进行动态调整。因此，戴高帽子的玩家的姓名牌会比其他人高一点。

- `Position`：玩家的整体位置。

  > 注意：当前这个锚点的高度可能会因本地玩家的头像和其他玩家的不同而有所不同，这可能会在未来的版本中有所改变。 NameTag 锚点应该更可靠。

<!--
- `RightHand`：固定在玩家的右手上
- `LeftHand`：固定在玩家的左手

...ETC
-->

> 注意：未来的 SDK 版本将包括头像上的替代锚点，这些锚点将伴随头像动画。

实体渲染是在场景的每个实例上本地确定的。将实体附加到一个玩家身上不会让看到该玩家的每个人都可以看到它。

> 注意：附加到化身的实体必须保持在要渲染的场景范围内。如果玩家走出你的场景，任何附加的实体都会停止渲染，直到玩家重新走进去。智能可穿戴设备没有这个限制。


`AttachToAvatar` 组件覆盖了 `Transform` 组件，单个实体不能同时具有 `AttachToAvatar` 和 `Transform` 组件。

如果您需要定位实体，使其与头像上的锚点有偏移，或者需要不同的旋转或缩放，请将父实体附加到锚点。然后，您可以将子实体上的可见模型设置为该父实体，并为该子实体提供其自己的 Transform 组件以描述其从锚点的移动。

```ts
let parent = new Entity()

parent.addComponentOrReplace(
  new AttachToAvatar({
    avatarId: '0xAAAAAAAAAAAAAAAAA',
    anchorPointId: AttachToAvatarAnchorPointId.NameTag,
  })
)
engine.addEntity(parent)

let child = new Entity()
child.addComponent(new ConeShape())
child.addComponent(
  new Transform({
    rotation: Quaternion.Euler(0, 0, 180),
    scale: new Vector3(0.2, 0.2, 0.2),
    position: new Vector3(0, 0.4, 0),
  })
)
child.setParent(parent)
```

####获取头像Id

要将实体附加到头像，您必须在“avatarId”字段中提供用户的 ID。有多种方式来获取这些数据。

> 注意：对于那些连接以太坊钱包的玩家，他们的“userId”与他们的以太坊地址相同。

- 通过`getUserData()`获取本地玩家的`userId`。

```ts
import { getUserData } from "@andverse/Identity"

executeTask(async () => {
  let data = await getUserData()
  log(data.userId)
})
```

- 通过`getConnectedPlayers()`获取附近所有其他玩家的`userId`

```ts
executeTask(async () => {
  let players = await getConnectedPlayers()
  players.forEach((player) => {
    log("player is nearby: ", player.userId)
  })
})
```

在 [Get Player Data] 中查看获取其他用户 ID 的其他方法。

#### 使用 Attachable 附加到播放器（已弃用）

注意：不推荐使用这种将实体附加到播放器的方法。请改用 `AttachToAvatar` 组件。

将实体设置为 `Attachable.FIRST_PERSON_CAMERA` 对象的子对象，以将实体固定到玩家并跟随玩家的动作。

```ts
const followTheCamera = new Entity()
followTheCamera.addComponent(new BoxShape())
followTheCamera.addComponent(
  new Transform({
    position: new Vector3(0, 0.5, 3),
  })
)
engine.addEntity(followTheCamera)
followTheCamera.setParent(Attachable.FIRST_PERSON_CAMERA)
```

如果附加的实体有一个 Transform 组件，它将相对于玩家的位置定位，并在玩家移动或旋转时保持该相对位置。

要将实体仅在 _x_ 轴上固定到玩家的旋转，请将实体设置为 `Attachable.AVATAR` 对象的子对象。当在地面上环顾四周时，实体将与玩家一起旋转，但在向上或向下看时它不会伴随玩家的旋转。

```ts
const followAvatar = new Entity()
followAvatar.addComponent(new BoxShape())
followAvatar.addComponent(
  new Transform({
    position: new Vector3(0, 0.5, 3),
  })
)
engine.addEntity(followAvatar)
followAvatar.setParent(Attachable.AVATAR)
```

> 注意：要将实体设置为 `Attachable.FIRST_PERSON_CAMERA` 或 `Attachable.AVATAR` 的子实体，您需要先将实体添加到引擎中。如果您尝试在将实体添加到引擎之前将实体设置为玩家的子实体，则会引发错误。

`Attachable.FIRST_PERSON_CAMERA` 和 `Attachable.AVATAR` 的行为相似，但有细微的差别：

使用 `Attachable.FIRST_PERSON_CAMERA`：

- 实体在玩家的视线水平
- 第一人称：实体在所有轴上旋转，保持在相机上的固定位置。
- 第三人称：实体仅在 _y_ 轴上随相机旋转

使用 `Attachable.AVATAR`：

- 实体是玩家的手臂或腰部水平
- 第一人称：实体使用相机仅在 _y_ 轴上旋转
- 第三人称：实体仅在 _y_ 轴上随相机旋转

此 gif 说明了第一人称的差异。粉色实体使用 `Attachable.AVATAR`，白色对象使用 `Attachable.FIRST_PERSON_CAMERA`。

<img src="/images/media/gifs/attach-to-player.gif" alt="将实体附加到播放器" width="400"/>

如果几个玩家在同一个场景中，他们每个人都会体验到与自己相连的实体。他们不会看到附加到其他玩家的实体。

例如，在多人游戏场景中，玩家可以捡起箱子并四处移动，推荐的方法是让其他玩家携带的箱子不可见。这样只有当前携带盒子的玩家才能看到它们附着在自己身上。

## 场景边界

场景中的所有实体都必须适合场景边界，因为在这些边界之外的是其他玩家拥有的土地。

运行场景预览时，场景地块之外的任何实体都被涂成红色，并且它们的碰撞器将被移除。当部署到 Andverse 时，引擎根本不会渲染包裹之外的任何实体。

场景中实体的位置在移动时会不断检查，如果实体离开场景然后返回，它将被移除，然后再次正常渲染。

场景地面上的网格显示场景的范围，默认情况下，_x_ 和 _z_ 轴上的范围为 0 到 16，_y_ 轴上最多为 20。您可以自由地将实体放置在 _y_ 轴上低于 0 的地下。

> 提示：如果您的场景需要更多地块，您可以将它们添加到项目的 `scene.json` 文件中。有关说明，请参阅 [场景元数据]。添加后，您应该会看到网格扩展到覆盖其他地块。

请务必注意，_整个_3D 模型必须在场景范围内。这包括模型的_bounding box_。一些 3D 模型可能具有不必要地超出网格本身的边界框，有时很难判断何时发生这种情况。当实体超出场景边界时，您将在预览中看到一个标记这些边界框的立方体。整个立方体必须适合您的场景。



如果实体的立方体超出其网格的形状，您可能需要在外部编辑器中编辑 3D 模型以减少这些边距，或 _bake_ 模型中网格的旋转和缩放。

