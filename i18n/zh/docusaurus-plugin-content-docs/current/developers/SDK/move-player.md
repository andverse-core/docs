​​​要更改玩家在场景中的位置，请使用“movePlayerTo()”函数。这个函数有两个参数：​​​ 

- `position` : 将玩家移动到哪里，表示为具有 x 、y 和 z 属性的对象

- `cameraTarget` : （可选）玩家面向的方向，表示为具有_x_ 、_y_和_z_属性的对象，这些属性表示要注视的空间点的坐标。如果没有提供值，玩家将保持与移动前相同的旋转。 
```ts
import { movePlayerTo } from '@decentraland/RestrictedActions'
const respawner = new Entity()
respawner.addComponent(new BoxShape())
respawner.addComponent(new Transform({ position: new Vector3(8, 0, 8) }))
respawner.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 1, y: 0, z: 1 }, { x: 8, y: 1, z: 8 })
    },
    { hoverText: "Move player" }
  )
)

engine.addEntity(respawner)
```
玩家的移动会立即发生，无需任何确认屏幕或摄像机转换

> 注意：只有已经站在场景边界内的玩家才能移动，并且只能移动到场景边界内的位置。您不能使用`movePlayerTo()`将玩家传送到另一个场景

您必须先将`ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE`权限添加到`scene.json`文件，然后才能使用此功能。
如果还没有，请在 JSON 文件的根级别创建`requiredPermissions`属性来为其分配此权限。

```json 
"requiredPermissions":
[ "ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE" ]
```

> 注意：为防止可能损害玩家体验的滥用行为，移动玩家的能力被视为许可。目前，此权限对玩家体验场景的方式没有影响。将来，在 `scene.json` 文件中使用此权限进入场景的玩家将被要求授予场景移动他们的能力。

