<h1>视频播放</h1>

有两种不同的方式可以在场景中显示视频。一种是从外部源流式传输视频，另一种是将视频文件与场景打包并从那里播放。

在这两种情况下，您都可以将视频分配给一个 `VideoTexture`，它可以用于 [material](/creator/development-guide/materials)，然后应用于任何[primitive-shape](/creator/development-guide/shape-components.md)，例如平面、立方体，甚至是圆锥体。

> 提示：由于视频是添加到材质中的纹理，您还可以尝试使用材质的其他属性，例如用颜色着色，添加其他纹理层

## 显示视频

以下说明适用于流式传输和显示文件中的视频：

1. 创建一个 `VideoClip` 对象，引用流式 URL 或视频文件的路径。

2. 创建一个 `VideoTexture` 对象，并将 `VideoClip` 分配给它。

3. 创建一个`Material`或`BasicMaterial`，并将其`albedoTexture`或`texture`设置为你创建的`VideoTexture`。

4. 然后将该 `Material` 添加到具有原始形状的实体，例如 `PlaneShape` 或 `BoxShape`。

5. 播放视频纹理

下面的示例使用视频流：

```ts
// #1
const myVideoClip = new VideoClip(
  'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875'
)

// #2
const myVideoTexture = new VideoTexture(myVideoClip)

// #3
const myMaterial = new Material()
myMaterial.albedoTexture = myVideoTexture
myMaterial.roughness = 1
myMaterial.specularIntensity = 0
myMaterial.metallic = 0


// #4
const screen = new Entity()
screen.addComponent(new PlaneShape())
screen.addComponent(
  new Transform({
    position: new Vector3(8, 1, 8),
  })
)
screen.addComponent(myMaterial)
screen.addComponent(
  new OnPointerDown(() => {
    myVideoTexture.playing = !myVideoTexture.playing
  })
)
engine.addEntity(screen)

// #5
myVideoTexture.play()
```

要使用视频文件，只需将第一步更改为引用文件的路径：
```ts
const myVideoClip = new VideoClip("videos/myVideo.mp3")
```


## 视频材质

对许多人来说，材质的默认属性使视频在屏幕上看起来非常不透明，但您可以通过更改材质的其他属性来增强它。

```ts
const myMaterial = new Material()
myMaterial.albedoTexture = videoTexture
myMaterial.roughness = 1
myMaterial.specularIntensity = 0
myMaterial.metallic = 0
```

如果你想让屏幕发光一点，你甚至可以将材质的 `emissiveTexture` 设置为与 `albedoTexture` 相同的 `VideoTexture`。

```ts
const myMaterial = new Material()
myMaterial.albedoTexture = videoTexture
myMaterial.roughness = 1.0
myMaterial.specularIntensity = 0
myMaterial.metallic = 0
myMaterial.emissiveTexture = videoTexture
myMaterial.emissiveColor = Color3.White()
myMaterial.emissiveIntensity = 0.6
```

## 关于流媒体

流媒体的来源必须是 _https_ URL（不支持 _http_ URL），并且来源应具有 [CORS 策略（跨源资源共享）]（https://en.wikipedia.org/wiki/Cross-origin_resource_sharing ) 允许外部访问它。如果不是这种情况，您可能需要设置一个服务器来充当代理并以有效的方式公开流。

要启动您自己的视频流服务器，我们建议使用 [Node Media Server](https://github.com/illuspas/Node-Media-Server)，它可以提供您开箱即用的大部分内容。

请记住，流媒体视频需要播放器的机器付出巨大的努力。我们建议每个场景一次显示的视频流不超过一个。还要避免流式传输非常高分辨率的视频，不要使用高于_HD_的任何内容。我们还建议仅在播放器执行操作或接近屏幕时才激活流，以避免影响相邻场景。

## 关于视频文件

支持以下文件格式：

- _.mp4_
- _.ogg_
- _.webm_

请记住，视频文件会增加场景的总大小，这使得进入场景的玩家需要更长的时间来下载场景。视频大小也可能使您超出 [场景限制](/docs/technology/sdk/scene-limitation.md)，因为每个包裹最多可以使用 15 MB。我们建议尽可能地压缩视频，这样就不会出现问题。

我们还建议在播放器靠近或执行相应操作时开始播放视频。当您的场景加载到地平线很远时开始播放视频会在玩家访问相邻场景时不必要地影响性能。


## 处理一个视频文件

从文件播放视频时，您可以执行以下操作：

- `play()`：播放视频。它将从 `seek` 属性指示的位置开始。

- `pause()`：停止视频播放，但将其 `seek` 属性保留在视频上次所在的位置。最后播放的帧仍然可见。

- `reset()`：停止视频播放并将其 `seek` 属性发送回视频的开头。显示视频的第一帧。

- `seekTime()`：将 `seek` 属性设置为特定值，以便视频从该点开始播放。它以视频原始开始后的秒数表示。

您还可以更改以下属性：

- `loop`：布尔值，用于确定视频是否在循环中连续播放，或者是否在播放一次后停止。 _false_ 默认情况下。

- `playbackRate`：改变视频的播放速度。 _1_ 默认情况下。

- `volume`：让你改变音频的音量。 _1_ 默认情况下。

- `seek`：允许您在视频上设置不同的起始位置。它以视频原始开始后的秒数表示。 _-1_ 默认情况下，这使它在视频的实际开始处开始。