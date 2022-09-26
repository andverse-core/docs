通过将材料设置为组件，可以将材料应用于使用原始形状（立方体、球体、平面等）的实体。

您可以设置 `Material` 或 `BasicMaterial` 组件。每个实体只能有其中之一。这两个组件都有几个字段，允许您配置材质的属性、添加纹理和设置纹理的映射。

您不能将材料组件添加到 _glTF_ 模型。 _glTF_ 模型包括它们自己的材质，这些材质与模型一起隐式导入到场景中。

导入带有自己材质的 3D 模型时，请记住并不是所有着色器都受 Andverse 引擎支持。仅支持标准材质和 PBR（基于物理的渲染）材质。有关详细信息，请参阅 [外部 3D 模型注意事项]。

## 创建和应用材质

下面的示例创建一个材质，设置它的一些字段以赋予它红色和金属属性，然后将该材质应用于也具有“boxShape”组件的实体。

```ts
//创建实体并指定形状
const myEntity = new Entity()
myEntity.addComponent(new BoxShape())

//创建材质并配置其字段
const myMaterial = new Material()
myMaterial.albedoColor = Color3.Blue()
myMaterial.metallic = 0.9
myMaterial.roughness = 0.1

//将材质分配给实体
myEntity.addComponent(myMaterial)
```

## 基础材料

您可以通过 `BasicMaterial` 实体定义材质，而不是 `Material` 组件。这会创建无阴影且不受光线影响的材料。这对于创建应该始终保持明亮的用户界面很有用，它也可以用于为您的场景提供更简约的外观。

```ts
const myMaterial = new BasicMaterial()
```

> 注意：基本材料有一些与普通材料不同的属性名称。例如，它使用 `texture` 而不是 `albedoTexture`。

##材质颜色

给材料一个简单的颜色。在 `BasicMaterial` 组件中，您设置 `color` 字段。在 `Material` 组件中，设置 `albedoColor` 字段。反照率颜色对光线有反应，并且可以在其上包含阴影。

所有颜色字段都是“Color3”或“Color4”类型。 `Color3` 包含三个值，分别是 _Red_、_Green_ 和 _Blue_。这些数字中的每一个都在_0_和_1_之间。 `Color4` 包含相同的三个值和 _Alpha_ 的第四个值，也在 _0_ 和 _1_ 之间，其中 _0_ 是完全透明的，_1_ 是完全不透明的。

```ts
myMaterial.albedoColor = new Color3(0.5, 0, 0.5)
```

> 注意：如果将`albedoColor`中的任何颜色设置为高于_1_的值，它将显示为_emissive_，值越高强度越大。例如，`new Color3(15, 0, 0)` 会产生非常明亮的红色发光颜色。

您还可以使用“Color3”对象的以下函数来选择预定颜色：

```ts
let red = Color3.Red()

let green = Color3.Green()

let blue = Color3.Blue()

let black = Color3.Black()

let white = Color3.White()

let purple = Color3.Purple()

let magenta = Color3.Magenta()

let yellow = Color3.Yellow()

let gray = Color3.Gray()

let teal = Color3.Teal()
```

否则，您可以使用以下函数选择随机颜色：

```ts
// 选择一个随机颜色
let green = Color3.Random()
```

如果您喜欢使用十六进制值指定颜色，就像在 JavaScript Web 开发中经常做的那样，您可以使用 `.FromHexString()` 函数来实现

```ts
let gray = Color3.FromHexString("#CCCCCCC")
```

`Color3` 对象还包括许多其他函数来添加、减去、比较、lerp 或转换颜色格式。

您还可以在“材料”组件中编辑以下字段，以微调其颜色的感知方式：

- _emissiveColor_：材质发出的颜色。
- _ambientColor_：在其他命名法中也称为 _Diffuse Color_。
- _reflectionColor_：材质反射的颜色。
- _reflectivityColor_：在其他命名法中也称为 _Specular Color_。

#### 逐渐改变颜色

使用 `.Lerp()` 函数通过两种颜色之间的线性插值逐渐改变颜色。

```ts
// 这个变量将存储两种颜色之间的比例
让 colorRatio = 0

// 定义颜色
const red = Color3.Red()
const yellow = Color3.Yellow()

// 创建材质
const myMaterial = new Material()

// 本系统每帧改变colorRatio的值，并在材质上设置新的颜色
export class ColorSystem implements ISystem {
  update(dt: number) {
    myMaterial.albedoColor = Color3.Lerp(red, yellow, colorRatio)
    if (colorRatio < 1) {
      colorRatio += 0.01
    }
  }
}

// 将系统添加到引擎
engine.addSystem(ColorSystem)
```

上面的示例将材质的颜色从红色更改为黄色，并在每一帧上递增地移动它。

## 使用纹理

参考通过创建 `Texture` 组件将图像文件作为纹理。然后，您可以在 `Material` 和 `BasicMaterial` 组件的字段中引用此纹理组件。

在 `Material` 组件中，您可以将 `albedoTexture` 字段设置为纹理图像。反照率纹理对光有反应，并且可以在其上包含阴影。

```ts
//创建实体并指定形状
const myEntity = new Entity()
myEntity.addComponent(new BoxShape())

//创建纹理
const myTexture = new Texture("materials/wood.png")

//创建材质
const myMaterial = new Material()
myMaterial.albedoTexture = myTexture

//将材质分配给实体
myEntity.addComponent(myMaterial)
```

在创建纹理时，您还可以传递其他参数：

- `samplingMode`：确定纹理中的像素在渲染时如何拉伸或压缩
- `wrap`：确定纹理如何平铺到对象上（参见 [Texture Wrapping](#texture-wrapping)）

```ts
let smokeTexture = new Texture("textures/smoke-puff3.png", {
  wrap: 0,
})
```

#### 来自外部 URL 的纹理

您可以将材质的纹理指向外部 URL，而不是场景项目中的内部路径。

```ts
const myTexture = new Texture(
  "https://wearable-api.andverse.org/v2/collections/community_contest/wearables/cw_tuxedo_tshirt_upper_body/thumbnail"
)

const myMaterial = new Material()
myMaterial.albedoTexture = m
```

URL 必须以 `https` 开头，不支持 `http` URL。托管图像的站点还应具有允许外部访问它的 [CORS 策略（跨源资源共享）]（https://en.wikipedia.org/wiki/Cross-origin_resource_sharing）。

#### 基础材质上的纹理

在 `BasicMaterial` 组件中，您可以将 `texture` 字段设置为图像纹理。这将渲染不受光照影响的纹理。

```ts
//创建实体并指定形状
const myEntity = new Material()
myEntity.addComponent(new BoxShape())

//创建纹理
const myTexture = new Texture("materials/wood.png")

//创建材质并配置其字段
const myMaterial = new BasicMaterial()
myMaterial.texture = myTexture

//将材质分配给实体
myEntity.addComponent(myMaterial)
```

#### 多层纹理

它还允许您使用多个图像文件作为图层来组合更逼真的纹理，例如包括“bumpTexture”和“refractionTexture”。

```ts
//创建实体并指定形状
const myEntity = new Material()
myEntity.addComponent(new BoxShape())

//创建纹理
const myTexture = new Texture("materials/wood.png")

//创建第二个纹理
const myBumpTexture = new Texture("materials/woodBump.png")

//创建材质并配置其字段
const myMaterial = new Material()
myMaterial.albedoTexture = myTexture
myMaterial.bumpTexture = myBumpTexture

//将材质分配给实体
myEntity.addComponent(myMaterial)
```

在上面的示例中，材质的图像位于“materials”文件夹中，该文件夹位于场景项目文件夹的根级别。

> 提示：我们建议将纹理图像文件单独保存在场景内的“/materials”文件夹中。

> 提示：一个材质可以有多个纹理层，您可以在源代码编辑器中通过单击“.”并让自动完成菜单向您显示列表来查看它们是什么。

#### 纹理包裹

如果您希望将纹理映射到实体上的特定比例或对齐方式，则需要在 [shape components] 上配置 _uv_ 属性。

您在纹理的 2D 图像上设置 _u_ 和 _v_ 坐标以对应于形状的顶点。实体的顶点越多，需要在纹理上定义的 _uv_ 坐标就越多，例如，一个平面需要定义 8 个 _uv_ 点，其两个面各有 4 个。

```ts
//创建材质并配置字段
const myMaterial = new BasicMaterial()
let myTexture = new Texture("materials/atlas.png", { wrap: 1, samplingMode: 0 })
myMaterial.texture = myTexture

//创建形状组件
const plane = new PlaneShape()

// 将纹理映射到平面的四个角中的每一个
plane.uvs = [
  0, 0.75,

  0.25, 0.75,

  0.25, 1,

  0, 1,

  0, 0.75,

  0.25, 0.75,

  0.25, 1,

  0, 1,
]

//创建实体并指定形状和材质
const myEntity = new Entity()
myEntity.addComponent(plane)
myEntity.addComponent(myMaterial)
```

下面的例子包括一个简化 uvs 设置的函数。这里定义的 `setUVs` 函数接收许多行和列作为参数，并设置 uvs 以使纹理图像重复特定次数。

```ts
const myMaterial = new BasicMaterial()
let myTexture = new Texture("materials/atlas.png", { wrap: 1, samplingMode: 0})
myMaterial.texture = myTexture

const myPlane = new Entity()
const plane = new PlaneShape()
myPlane.addComponent(plane)

engine.addEntity(myPlane)
myPlane.addComponent(myMaterial)
plane.uvs = setUVs(3, 3)

function setUVs(rows: number, cols: number) {
  return [
    // North side of unrortated plane
    0, //lower-left corner
    0,

    cols, //lower-right corner
    0,

    cols, //upper-right corner
    rows,

    0, //upper left-corner
    rows,

    // South side of unrortated plane
    cols, // lower-right corner
    0,

    0, // lower-left corner
    0,

    0, // upper-left corner
    rows,

    cols, // upper-right corner
    rows,
  ]
}
```

对于为 `BoxShape` 组件设置 UV，同样的结构适用。立方体的 6 个面中的每一个都有 4 个值，每个角一个。所有这 24 个值都被列为单个数组。

如果映射跨度超过纹理图像的尺寸，您还可以定义如何平铺纹理。 `Texture` 组件允许您通过设置 `wrap` 字段来配置包装模式。包装模式可以是 `CLAMP`、`WRAP` 或 `MIRROR`。

- `CLAMP`：纹理仅以指定大小显示一次。网格的其余部分保持透明。
- `WRAP`：纹理在网格中重复多次，使用指定的大小。
- `MIRROR`：与 wrap 一样，纹理会根据需要重复多次，但这些重复的方向是镜像的。

> 注意： `wrap` 属性必须在实例化纹理时设置，之后它是一个只读属性。

```ts
let myTexture = new Texture("materials/atlas.png", { wrap: 2 })
```

上面的示例将包装模式设置为“MIRROR”。

> 注意：Uv 属性目前仅在 `PlaneShape` 和 `BoxShape` 组件上可用。

#### 纹理缩放

当纹理被拉伸或收缩到与原始纹理图像不同的大小时，有时会产生伪影。在 3D 环境中，透视效果自然会导致这种情况。存在各种 [纹理过滤](https://en.wikipedia.org/wiki/Texture_filtering) 算法以不同方式对此进行补偿。 `Texture` 对象默认使用 _bilinear_ 算法，但它允许您通过设置 `samplingMode` 属性将其配置为使用 _nearest neighbor_ 或 _trilinear_ 算法。

```ts
const myTexture = new Texture("materials/myTexture.png", { samplingMode: 1 })
```

上面的示例使用最近邻算法。此设置非常适合像素艺术风格的图形，因为当纹理在屏幕上看到更大而不是模糊时，轮廓将保持清晰标记。

##头像头像

要显示任何玩家的缩略图，请创建一个“AvatarTexture”，并传递现有玩家的地址。这会根据玩家的 256x256 图像创建纹理，显示头部和肩部。显示玩家穿着当前服务器最后记录的一组可穿戴设备。

```ts
让 myTexture = new AvatarTexture("0xAAAAAAAAAAAAAAAAAA")
const myMaterial = new Material()
myMaterial.albedoTexture = myTexture
```

## 透明材质

要使具有纯色透明的材质，只需将颜色定义为“Color4”，并将第 4 个值设置为 _0_ 和 _1_ 之间的值。越接近 _1_，它就越不透明。

```typescript
let transparentRed = Color4(1, 0, 0, 0.5)
```

要使材质透明，请执行以下操作：

- 在 `alphaTexture` 中设置图像。

> 注意：这必须是单通道图像。在此图像中，使用红色来确定真实纹理的哪些部分应该是透明的。

- 可选择将 `transparencyMode` 设置为： - `OPAQUE`：完全不透明 - `ALPHATEST`：每个像素要么完全不透明，要么完全透明，基于阈值。 - `ALPHABLEND`：中间值可能基于每个像素的值。

* 如果将 `transparencyMode` 设置为 `ALPHATEST`，您可以微调用于确定每个像素是否透明的阈值。在 _0_ 和 _1_ 之间设置 `alphaTest` 属性。默认情况下，其值为 _0.5_。

```ts
const myTexture = new Texture("materials/texture.png")
const alphaTexture = new Texture("materials/alpha.png")

// 带有 ALPHABLEND 的材质
const myMaterial = 新材料（）
myMaterial.albedoTexture = myTexture
myMaterial.alphaTexture = alphaTexture

// 带有 ALPHATEST 的材质
const myMaterial2 = new Material()
myMaterial2.albedoTexture = myTexture
myMaterial2.alphaTexture = alphaTexture
myMaterial.transparencyMode = 1 // ALPHATEST
myMaterial.alphaTest = 0.3
```

## 不投射阴影

为了防止材质在其他对象上投射阴影，`Material` 和 `BasicMaterial` 都有一个可以设置为 _false_ 的 `castShadows` 属性。默认情况下，此属性始终为 _true_。

```ts
let noShadowMaterial = new Material()
noShadowMaterial.albedoColor = Color4.White()
noShadowMaterial.castShadows = falsealse
```

##重复使用材料

如果场景中的多个实体使用相同的材​​质，则无需为每个实体创建材质组件的实例。所有实体可以共享一个相同的实例，这使您的场景更容易加载并防止您超过最大数量的材料 p呃场景。

```ts
//创建实体并分配形状
const box = new BoxShape()
const myEntity = new Entity()
myEntity.addComponent(box)
const mySecondEntity = new Entity()
mySecondEntity.addComponent(box)
const myThirdEntity = new Entity()
myThirdEntity.addComponent(box)

//创建材质并配置字段
const myMaterial = new Material()
myMaterial.albedoColor = Color3.Blue()

//为所有实体分配相同的材质
myEntity.addComponent(myMaterial)
mySecondEntity.addComponent(myMaterial)
myThirdEntity.addComponent(myMaterial)
```

##视频播放

要将视频从 URL 流式传输到材料中，或从存储在场景中的文件播放视频，请参阅 [视频播放]。

视频用作材质上的纹理，您可以设置材质的任何其他属性来改变视频屏幕的外观