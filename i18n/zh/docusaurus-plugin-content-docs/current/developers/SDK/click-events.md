Andverse 接受来自指针点击、主按钮和辅助按钮的事件。

点击可以通过鼠标、触摸屏、完成，这些都生成相同类型的事件。

主要和次要按钮分别映射到键盘上的 E 和 F 键。

> 注意：没有形状组件的实体，或者其形状的 `visible` 字段设置为 _false_ 的实体不会响应指针事件。

## 指针事件组件

#### OnPointerDown

处理指针和按钮按下事件的最佳方法是将“OnPointerDown”组件添加到实体。

该组件要求您将一个函数作为主要参数传递给它。此函数声明当玩家指向实体时按钮按下事件发生时要做什么。

```ts
const myEntity = 新实体（）
myEntity.addComponent（新 BoxShape（））

myEntity.addComponent(
  新的 OnPointerDown((e) => {
    log("我的实体被点击", e)
  })
)
```

> 提示：为了让您的代码更易于阅读，`OnPointerDown` 中的函数可以只包含对包含所有逻辑的单独函数的调用。

`OnPointerDown` 组件有第二个可选参数，该参数是一个对象，可以包含有关事件的多个属性。在接下来的几个小节中将更详细地解释这些属性。

- `button`：从 `ActionButton` 枚举中监听哪个键：
  - `ActionButton.POINTER`（在 PC 上单击鼠标左键）
  - `ActionButton.PRIMARY`（PC 上的_E_）
  - `ActionButton.SECONDARY`（PC 上的_F_）
- `hoverText`：指向实体时在 UI 上显示的提示文本。
- `distance`：最大点击距离。

#### OnPointerUp

添加一个 `OnPointerUp` 组件来跟踪玩家在指向实体时释放鼠标按钮、主要或次要按钮的时间。

与 `OnPointerDown` 一样，`OnPointerUp` 组件需要一个 _callback 函数_，该函数声明在指向实体时发生按钮向上事件时要做什么。

该组件还接受第二个参数，该参数支持与 `OnPointerDown` 组件相同的附加字段。

```ts
const myEntity = new Entity()
myEntity.addComponent（new BoxShape()）

myEntity.addComponent(
  new OnPointerUp((e) => {
    log("指针向上", e)
  })
)
```

#### 特定按钮事件

`OnPointerDown` 和 `OnPointerUp` 组件可以响应以下不同的按钮：

- `POINTER`（鼠标左键点击PC）
- `PRIMARY`（PC上的_E_）
- `SECONDARY`（PC上的_F_）

您可以通过在组件初始化程序的第二个参数中设置 `button` 字段来配置组件。

如果未指定按钮，则使用“ActionButton.ANY”作为默认值。这会检测来自这些组件上任何可用按钮的事件。

```ts
const myEntity = 新实体（）
myEntity.addComponent（新 BoxShape（））

myEntity.addComponent(
  new OnPointerDown(
    (e) => {
      log("我的实体被点击", e)
    },
    { button：ActionButton.POINTER }
  )
)
```

#### 提示信息

当玩家将光标悬停在具有 `OnPointerDown` 或 `OnPointerUp` 组件的项目上时，光标会改变形状以向玩家提示该实体是交互式的。

您还可以在 UI 中显示一条 toast 消息，让玩家知道与实体交互时会发生什么。

```ts
myEntity.addComponent(
  new OnPointerDown(
    (e) => {
      log("myEntity clicked", e)
    },
    {
      button: ActionButton.PRIMARY,
      showFeedback: true,
      hoverText: "open",
    }
  )
)
```

在上面的示例中，`OnPointerDown` 组件的第二个参数有一个带有以下参数的对象：

- `button`：响应什么按钮
- `showFeedback`：打开或关闭反馈的布尔值。默认情况下是_true_。
- `hoverText`：当玩家指向实体时在 UI 中显示的字符串。默认情况下，此字符串拼写为 _Interact_，除非 `showFeedback` 为 _false_。

> 提示：`hoverText` 字符串应该描述交互时发生的动作。例如“打开”、“激活”、“抓取”、“选择”。这些字符串应该尽可能短，以避免从玩家身上窃取过多的注意力。

`OnPointerUp` 组件的 `hoverText` 仅在玩家已经按住相应键并指向实体时才会显示。

如果实体同时具有 `OnPointerDown` 和 `OnPointerUp` 组件，则在未按下按钮时会显示 `OnPointerDown` 的提示。仅当按下按钮并保持按下状态时，提示才会从“OnPointerUp”切换到提示。

```ts
myEntity.addComponent(
  new OnPointerDown(
    (e) => {
      log("myEntity clicked", e)
    },
    { button: ActionButton.PRIMARY, showFeedback: true, hoverText: "Drag" }
  )
)

myEntity.addComponent(
  new OnPointerUp(
    (e) => {
      log("myEntity released", e)
    },
    { button: ActionButton.PRIMARY, showFeedback: true, hoverText: "Drop" }
  )
)
```

#### 最大点击距离

当玩家在实体的近距离范围内（最大距离为 _10 米_）时可 ickable。您可以选择通过 `OnPointerDown` 和 `OnPointerUp` 组件的 `distance` 参数配置最大距离。

```ts
myEntity.addComponent(
  new OnPointerDown(
    (e) => {
      log("myEntity clicked", e)
    },
    {
      button: ActionButton.PRIMARY,
      showFeedback: true,
      hoverText: "Activate",
      distance: 8,
    }
  )
)
```

上面的示例将最大距离设置为 _8 米_。

#### 事件参数

_pointer down event_ 和 _pointer up event_ 对象分别作为 `OnPointerDown` 和 `OnPointerUp` 组件中函数的参数隐式传递。此事件对象包含可能对函数有用的各种属性。有关详细信息，请参阅 [按钮事件的属性](#properties-of-button-events)。

```ts
const myEntity = new Entity()
myEntity.addComponent(new BoxShape())

myEntity.addComponent(
  new OnPointerDown(
    (e) => {
      log("Click distance: " + e.length)
    },
    { button: ActionButton.PRIMARY }
  )
)
```

#### 实体上的多个按钮

您可能希望实体以不同的方式响应不同的按钮。每个实体只能有 _one_ `OnPointerDown` 组件和 _one_ `OnPointerUp` 组件，但您可以使用 `ActionButton.ANY` 然后在函数中将它们区分开来。

检查事件数据中的 `buttonId` 字段。该字段的值返回一个数字，该数字映射到 `ActionButton` 数组中的值，例如通过 `POINTER` 映射到 _0_，`PRIMARY` 到 _1_，`SECONDARY` 到 _2_ 等。

```ts
const myEntity = new Entity()
myEntity.addComponent(new BoxShape())

myEntity.addComponent(
  new OnPointerDown(
    (e) => {
      if (e.buttonId == 0) {
        log("Clicked pointer")
      } else if (e.buttonId == 1) {
        log("Pressed primary button")
      } else if (e.buttonId == 2) {
        log("Pressed secondary button")
      }
    },
    { button: ActionButton.ANY }
  )
)
```

玩家将鼠标悬停在实体上时会看到一个标签，因此请确保清楚有多种方式可以与之交互。

## 按钮事件的属性

来自 `OnPointerDown` 和 `OnPointerUp` 组件的事件，以及所有全局按钮事件对象，包含以下参数：

- `origin`：射线的原点，作为_Vector3_
- `direction`：射线的方向向量，作为指向同一方向的归一化_Vector3_。
- `buttonId`：触发事件的按钮的 ID（_POINTER_、_PRIMARY_ 或 _SECONDARY_）
- `hit`：_（可选）_ 描述被点击实体的对象。如果点击未命中任何特定实体，则此字段不存在。 `hit` 对象包含以下参数：

  - `length`：以米为单位的射线长度，作为_number_
  - `hitPoint`：射线和实体网格之间的交点，作为 _Vector3_
  - `meshName`：网格的名称，如果适用，作为_string_
  - `worldNormal`：命中的法线，在世界空间中，作为 _Vector3_
  - `entityId`：实体的 ID，如果适用，作为 _string_

#### 区分模型内的网格

通常，_.glTF_ 3D 模型由多个网格组成，每个网格都有一个单独的内部名称。所有按钮事件事件都包含单击了特定网格的信息，因此您可以使用此信息在每种情况下触发不同的单击行为。

要查看模型内的网格是如何命名的，您必须使用编辑工具打开 3D 模型，例如 [Blender](https://www.blender.org/)。

<img src="/images/media/mesh-names.png" alt="编辑器中的网格内部名称" width="250"/>

> 提示：您还可以通过登录并从控制台读取它来了解单击的网格的名称。

您可以将 `meshName` 属性作为 `hit` 对象的一部分访问，该对象由 click 事件返回。

在下面的示例中，我们有一个包含名为“firePlace”的网格的房屋模型。我们只想在单击相应网格时打开壁炉。

```ts
houseEntity.addComponent(
  new OnPointerDown(
    (e) => {
      log("button A Down", e.hit.meshName)
      if (e.hit.meshName === "firePlace") {
        // light fire
        fireAnimation.play()
      }
    },
    { button: ActionButton.POINTER, showFeeback: false }
  )
)
```

> 注意：由于 `OnPointerDown` 组件属于整个实体，所以当鼠标悬停在实体的任何部分上时都会看到悬停反馈。在这种情况下，房子的任何部分，不仅仅是壁炉。出于这个原因，我们将 `OnPointerDown` 组件的 `showFeedback` 参数设置为 _false_，这样就不会显示悬停反馈。为了获得更好的玩家体验，建议将壁炉作为一个单独的实体并保持悬停反馈。

## 全局按钮事件

每当玩家按下或释放输入控制器按钮时，_BUTTON_DOWN_ 和 _BUTTON_UP_ 事件就会被触发

每次按下或释放按钮时都会触发这些事件，无论玩家的指针指向何处，只要玩家站在场景边界内。

它还跟踪在场景中用于基本化身移动的键。

实例化一个 `Input` 对象并使用它的 `subscribe()` 方法来启动一个订阅了按钮事件之一的侦听器。每当事件被捕获时，它就会执行一个提供的函数。

`subscribe()` 方法有四个参数：

- `eventName`：动作类型，可以是`"BUTTON_DOWN"`或`"BUTTON_UP"`
- `buttonId`：监听哪个按钮。
  可以针对 BUTTON_DOWN 和 BUTTON_UP 事件跟踪以下按钮：

      - `POINTER`（鼠标左键点击PC）
      - `PRIMARY`（PC上的_E_）
      - `SECONDARY`（PC上的_F_）
      - `JUMP`（PC上的_空格键_）
      - `FORWARD`（PC上的_W_）
      - `左`（PC上的_A_）
      - `正确`（PC上的_D_）
      - `BACK`（PC上的_S_）
      - `WALK`（PC上的_Shift_）
      - `ACTION_3`（PC 上的_1_）
      - `ACTION_4`（PC上的_2_）
      - `ACTION_5`（PC上的_3_）
      - `ACTION_6`（PC上的_4_）

- `useRaycast`：布尔值，用于定义是否使用光线投射。如果为“false”，则按钮事件将不包含有关在事件发生时与指针对齐的任何“hit”对象的信息。当不需要有关命中对象的信息时，请避免将此字段设置为 `true`，因为它涉及额外的计算。
- `fn`：每次事件发生时执行的函数。

> 注意：PC 键盘上的其他键不会被跟踪以实现未来的跨平台兼容性，因为这组有限的键可以映射到操纵杆。要在编写文本时检测击键，请检查 [UIInputBox]。

```ts
// 实例化输入对象
const input = Input.instance

// 按钮按下事件
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, (e) => {
  log("pointer Down", e)
})

// 按钮向上事件
input.subscribe("BUTTON_UP", ActionButton.POINTER, false, (e) => {
  log("pointer Up", e)
})
```

上面的示例在每次按下或释放指针按钮时记录消息和事件对象的内容。

`BUTTON_DOWN` 和 `BUTTON_UP` 的事件对象都包含各种有用的属性。有关详细信息，请参阅 [按钮事件的属性](#properties-of-button-events)。

> 注意：订阅输入事件的代码只需要执行一次，`subscribe()`方法会一直轮询事件。不要将它添加到系统的 `update()` 函数中，因为这会在每一帧上注册一个新的侦听器。

#### 检测命中实体

如果 `subscribe()` 函数的第三个参数 (`useRaycast`) 为真，并且玩家指向具有碰撞器的实体，则事件对象包含嵌套的 `hit` 对象。 `hit` 对象包括有关碰撞和被击中实体的信息。

检测基本移动键时，光线投射不可用。它仅在跟踪以下按钮时可用：

- `指针`
- `初级`
- `中学`
- `ACTION_3`
- `ACTION_4`
- `ACTION_5`
- `ACTION_6`

全局按钮事件的光线仅检测具有碰撞器网格的实体。默认情况下，原始形状有一个对撞机网格，3D 模型需要在其中内置一个。

> 提示：有关如何将碰撞器网格添加到 3D 模型的详细信息，请参阅 [碰撞器]。

```ts
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, (e) => {
  if (e.hit) {
    let hitEntity = engine.entities[e.hit.entityId]
    hitEntity.addComponent(greenMaterial)
  }
})
```

上面的示例检查是否有任何实体被击中，如果是，它会获取实体并对其应用材质组件。

事件数据返回 `entityId` 的字符串。如果您想通过该 ID 引用实际实体以以某种方式影响它，请使用 `engine.entities[e.hit.entityId]`。

> 注意：我们建议您尽可能使用为每个要进行交互的实体添加 `OnPointerDown` 组件的方法，而不是使用全局按钮事件。除非实体具有“OnPointerDown”、“OnPointerUp”或“OnClick”组件，否则场景的代码无法提示玩家实体在其上悬停时是可交互的。

#### 跟踪玩家动作

在玩家移动的时机至关重要的实时多人游戏中，您可能希望使用 3rd 方服务器作为事实来源来跟踪每个玩家的位置。您可以通过提前收听按钮来提高响应时间，并在化身移动位置之前预测它们在您的服务器中的效果。

这种方法有助于弥补网络延迟，但肯定会导致差异，因此您还应该定期轮询玩家的当前位置以进行更正。平衡这些预测和修正可能需要大量的微调。

对于要被按钮事件的射线拦截的实体，实体的形状必须具有碰撞器网格，或者实体必须具有与按钮事件相关的组件（`OnPointerDown`、`OnPointerUp` 或 `OnClick`）。

如果另一个实体的对撞机站在玩家想要点击的实体的路上，玩家将无法点击后面的实体，除非前面的实体具有设置了“isPointerBlocker”属性的形状为假。

```ts
让 myEntity = new Entity()
让 box = new BoxShape()
box.isPointerBlocker = false
box.visible = false
myEntity.addComponent(box)
engine.addEntity(myEntity)
```

## OnHover 组件

将`OnPointerHoverEnter`和`OnPointerHoverExit`组件添加到实体中，以在玩家的光标每次开始或停止指向实体时运行回调函数。

您可以使用它来暗示某些东西可以以某种自定义方式进行交互，例如在实体周围显示发光的高光、播放微妙的声音等。它也可以用于特定的游戏机制。

```ts
myEntity.addComponent(
  new OnPointerHoverEnter((e) => {
    log("Started Pointing at entity")
  })
)

myEntity.addComponent(
  new OnPointerHoverExit((e) => {
    log("Stopped Pointing at entity")
  })
)
```

在 `OnPointerHoverEnter` 组件上，您可以设置最大距离，仅在玩家靠近实体时触发回调。

```ts
myEntity.addComponent(
  new OnPointerHoverEnter(
    (e) => {
      log("Started Pointing at entity")
    },
    {
      distance: 8,
    }
  )
)
```

> 提示：请注意，默认情况下，所有带有 `OnPointerDown` 组件的实体在悬停时都会显示 UI 提示。您可以通过将 `OnPointerDown` 组件上的 `showFeeback` 属性设置为 false 来禁用此 UI 提示。

## 按钮状态

您可以使用 _Input_ 对象检查按钮的当前状态（向上或向下）。

```ts
let buttonState = Input.instance.isButtonPressed(ActionButton.POINTER)

if(buttonState.BUTTON_DOWN){
  log("button is being held down")
} else {
  log("button is up
}
```

您可以使用 `.isButtonPressed` 函数来检查任何全局跟踪按钮的状态。该函数返回一个包含“BUTTON_DOWN”布尔字段的对象，以及按钮的当前状态。

例如，您可以在系统的 `update()` 函数中实现此功能，以定期检查按钮的状态。

```ts
class ButtonChecker implements ISystem {
  update() {
    if (Input.instance.isButtonPressed(ActionButton.FORWARD).BUTTON_DOWN) {
      log("player walking forward")
    } else {
      log("player not walking forward")
    }
  }
}

engine.addSystem(new ButtonChecker())
```

> 注意：没有形状组件的实体，或者其形状的 `visible` 字段设置为 _false_ 的实体不能被点击。