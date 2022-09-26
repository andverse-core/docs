所有场景都有一个 `scene.json` 文件，您可以在其中设置场景的元数据。此文件中的某些字段预定义了 Andverse 客户端所需的信息。

您还可以随意添加任何您想要的字段。将来，自定义字段可以由替代客户端或嵌入在交互式库存项目中的其他脚本进行检查。

## 场景地块

部署场景时，`scene.json` 文件必须包含有关 Andverse 地图中该场景将占用哪些地块的信息。 CLI 从此字段中读取此信息并直接部署到这些包裹。

```json
 "scene": {
    "parcels": [
      "54,-14"
    ],
    "base": "54,-14"
  }
```

默认场景的坐标设置为_0,0_，在离线开发场景时无需更改此信息，除非您需要占用多个地块。您需要在部署之前更改此设置，以协调您拥有部署权限的位置。

`base` 字段定义了要考虑的基本地块。如果您的场景有一个地块，则基础应该是该地块。如果您的场景有多个宗地，则基础应该是左下角（西南）宗地。所有实体位置都将参照该地块的西南角进行测量。

要在场景预览中显示多个地块，请列出您打算使用的地块数量。它们不需要是您将部署到的确切地块，但它们都应该是相邻的并且彼此之间以相同的方式排列。

```json
 "scene": {
    "parcels": [
      "54,-14",  "55,-14"
    ],
    "base": "54,-14"
  }
```

### 通过命令行设置包裹

您可以通过在场景文件夹中运行“acl coords”命令来设置场景中的地块。这对于大型场景特别有用，因为您不需要列出所涉及的每个地块。

**单个包裹**

通过场景坐标传递单个参数。该坐标也被设置为基本地块。

`acl coords <包裹>`

例如：

`acl 坐标 15,-26`

**多个包裹**

传递两个参数：西南地块和东北地块。西南宗地也被设置为基础宗地。

`acl coords <包裹> <包裹>`

> 提示：西南地块始终是 _X_ 和 _Y_ 坐标上数字最小的地块。

例如：

`acl 坐标 15,-26 17,-24`

此命令生成一个 3x3 场景，其基本地块位于 `15,-26` 中。

**自定义基础包裹**

传递三个参数：西南和东北宗地，以及用作基础宗地的宗地。

`acl coords <包裹> <包裹> <包裹>`

> 注意：基础地块必须是场景中的地块之一。

**非方形场景**

以上命令均生成矩形场景。逆向场景可以有 L 形或其他配置。您可以使用 `acl coords` 生成一个更大的正方形，然后从 `scene.json` 文件中手动删除多余的包裹。

> 注意：基础地块必须是场景中的地块之一。

## 场景标题、描述和图像

给你的场景一个标题、描述和缩略图来吸引玩家到你的场景，这样他们就知道会发生什么。

玩家在地图上选择场景的地块时会看到这些，当被另一个场景传送到那里时，他们也会在确认屏幕中看到这些。

<!-- 截图 -->

当玩家在世界中导航并进入您的场景时，他们可以从小地图下方读取场景标题。

```json
  "display": {
    "title": "My Cool Scene",
	"description": "You won't believe how cool this scene is",
	"navmapThumbnail": "images/scene-thumbnail.png",
    "favicon": "favicon_asset"
   }
```

缩略图应该是推荐大小为 _228x160_ 像素的 _.png_ 或 _.jpg_ 图像。支持的最小尺寸为 _196x143_ 像素。如果宽高比不匹配_228x160_，图像可能会被拉伸。

`navmapThumbnail` 上的图像应该是项目文件夹中图像文件的路径。它也可以是指向其他地方托管的图像的 URL 链接。

> 注意：如果您在其他地方托管图像，请确保该图像位于具有允许 CORS 策略以在其他站点上显示内容的站点中。

＃＃ 联系信息

如果您希望其他开发人员能够与您联系，您可以将联系信息添加到 `scene.json` 文件中。

```json
  "contact": {
    "name": "author-name",
    "email": "name@mail.com"
  },
```

## 生成位置

`spawnPoints` 字段定义玩家在直接访问场景时生成的位置，可以通过直接在浏览器中输入坐标或传送。

您的场景中可能有可以阻止玩家移动的物体，如果它们恰好在它们上方生成，例如树木或楼梯，或者您的场景可能有高地地形。如果他们生成在不允许他们移动的东西上，这对玩家来说将是一个糟糕的体验。这就是为什么您可以选择在临时位置设置多个生成位置选项。

```json
  "spawnPoints": [
    {
      "name": "spawn1",
      "default": true,
      "position": {
        "x": 5,
        "y": 1,
        "z": 4
      }
    }
  ],
```

该位置由场景内的坐标组成。这些数字指的是地块内的位置，类似于您在变换组件中的场景代码中用于定位实体的位置。

> 注意：所有重生点必须在构成场景的地块内。您不能在这些地块的空间之外生成玩家。

### 多个生成点

一个场景可以有多个生成点。如果他们都同时访问一个场景，这对于限制玩家的重叠很有用。要拥有许多生成点，只需将它们列为数组即可。

```json
  "spawnPoints": [
    {
      "name": "spawn1",
      "default": true,
      "position": {
        "x": 5,
        "y": 1,
        "z": 4
      }
	},
	{
      "name": "spawn2",
      "default": true,
      "position": {
        "x": 3,
        "y": 1,
        "z": 1
      }
    }
  ],
```

优先考虑标记为“默认”的生成点。当有多个生成点标记为“默认”时，将从列表中随机选择其中一个。

> 注意：在未来的版本中，当玩家尝试重生到场景中并且默认重生点被其他玩家占据时，玩家将被发送到另一个列出的位置。这将打开大门，允许玩家根据出生点的名称传送到出生点，如`scene.json`中所述。

### 生成区域

您可以将场景中的整个区域设置为生成点。通过在位置的任何维度上指定一个由两个数字组成的数组，玩家将出现在此数字范围内的随机位置。这有助于防止进入玩家的重叠。

```json
  "spawnPoints": [
    {
      "name": "spawn1",
      "default": true,
      "position": {
        "x": [1,5],
        "y": [1,1],
        "z": [2,4]
      }
    }
  ],
```

在上面的例子中，玩家可能出现在正方形的任何角落，他们的角在 _1,1,2_ 和 _5,1,4_。

＃＃＃ 回转

您还可以指定玩家在生成时的旋转，以便他们面向特定方向。这使您可以更好地控制他们的第一印象，并且在想要帮助引导他们朝着特定方向前进时会很有用。

只需将“cameraTarget”字段添加到生成点数据。 `cameraTarget` 的值应该引用空间中的位置，具有相对于场景的 _x_、_y_ 和 _z_ 坐标，就像 `position` 字段一样。

```json
  "spawnPoints": [
    {
      "name": "spawn1",
      "default": true,
      "position": {
        "x": 5,
        "y": 1,
        "z": 4
      },
      "cameraTarget": {
        "x": 10,
        "y": 1,
        "z": 4
      }
    }
  ],
```

此示例在 _5, 1, 4_ 上生成一个玩家，向东看 _10, 1, 4_。如果生成位置是一个范围，则玩家的旋转将始终与指示的目标匹配。如果有多个生成点，每个生成点都可以有自己的单独目标。

## 所需权限

`requiredPermissions` 属性管理各种可能被滥用并损害玩家体验的受控功能。

相应的特征被场景阻止使用，除非在 `scene.json` 文件中请求权限。

```json
"requiredPermissions": [
    "ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE"
  ],
```

目前，对所有内容管理以下权限：

- `ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE`：指移动玩家
- `ALLOW_TO_TRIGGER_AVATAR_EMOTE`：指在玩家头像上播放表情

便携体验和智能可穿戴设备也受到以下权限的影响：

- `USE_WEB3_API`：指与玩家的浏览器钱包交互，进行交易或签署消息。
- `USE_FETCH`：指使用 `fetch` 或 `signedFetch` 向 3rd 方服务器发送 http 请求
- `USE_WEBSOCKET`：指打开与 3rd 方服务器的 websocket 连接
- `OPEN_EXTERNAL_LINK`：指提示玩家打开外部网站的链接

如果 `scene.json` 文件中不存在 `requiredPermissions` 属性，请在 json 树的根级别创建它。

> 注意：在未来的版本中，当玩家进入具有 `requiredPermissions` 属性中列出的项目的场景时，场景将提示玩家授予这些权限。玩家将能够拒绝该场景的这些权限。

## 功能切换

有些功能可以在特定场景中禁用，以免玩家滥用这些功能。 `featureToggles` 属性管理这些权限。

默认情况下会启用相应的功能，除非在 `scene.json` 文件中指定为 _dissabled_。

```json
"featureToggles": {
    "voiceChat": "disabled"
},
```

目前，只有以下功能是这样处理的：

- `voiceChat`：指让玩家使用他们的麦克风通过语音聊天与附近的其他玩家进行对话。

如果 `scene.json` 文件中不存在 `featureToggles` 属性，请在 json 树的根级别创建它。

## 从场景代码中获取元数据

您可能需要场景代码来访问元数据中的字段，例如场景部署到的地块或生成点位置。这对于要复制的场景或要在其他场景中重用的代码特别有用。它对于智能项目也非常有用，例如智能项目的代码可能需要知道场景限制在哪里。

要访问这些数据，首先将“ParcelIdentity”库导入您的场景：

```ts
import { getParcel } from "../ParcelIdentity"
```

然后，您可以从该库中调用 `getParcel()` 函数，该函数返回一个 json 对象，其中包含 scene.json 文件的大部分内容。

下面的示例显示了从该函数的响应中获取您可能需要的几个更常见字段的路径：

```ts
import { getParcel } from "../ParcelIdentity"

executeTask(async () => {
  const parcel = await getParcel()

  // parcels
  log("parcels: ", parcel.land.sceneJsonData.scene.parcels)
  log("base parcel: ", parcel.land.sceneJsonData.scene.base)

  // spawn points
  log("spawnpoints: ", parcel.land.sceneJsonData.spawnPoints)

  // general scene data
  log("title: ", parcel.land.sceneJsonData.display?.title)
  log("author: ", parcel.land.sceneJsonData.contact?.name)
  log("email: ", parcel.land.sceneJsonData.contact?.email)

  // other info
  log("tags: ", parcel.land.sceneJsonData.tags)
})
```

> 注意：`getParcel()` 需要作为异步函数运行，因为响应在返回数据时可能会延迟几分之一秒或更长时间。