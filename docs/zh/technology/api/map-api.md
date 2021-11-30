# Api.Andverse


## V1.0

### 功能描述

- 提供仙女座全局坐标
  - 可筛选坐标范围
  - 可筛选持有者
  - 可筛选状态



### 数据结构 (MongoDB)


### land 

| Field      | Type     | description                     |
| ---------- | -------- | ------------------------------- |
| _id         | ObjectId      | 主键（默认） |
| coordinate | Point | 坐标 地图坐标/1000, 比如: {x:109,y:163}, 存储为:(0.109, 0.163) |
| x | Int | 坐标 x |
| y | Int | 坐标 y |
| contract    | String   | 合约地址 |
| owner    | String   | 持有者地址 |
| mint_time | int | Mint 时间 |
| mint_block | NumberLong | Mint 区块高度 |
| mint_tx | String | Mint txid |
| status     | int      | 状态:  -1.不可购买 0.没有mint（可购买） 1.已经mint |
| created_at | int | 创建时间                        |
| updated_at | int | 更新时间                        |



### API 数据格式



#### land/query

查询条件：

| Param            | Type   | description                                                  |
| ---------------- | ------ | ------------------------------------------------------------ |
| return_type    | String | array / keyvalue                                  |
| near             | Json   | 坐标 [103,222] <br />[x,y]                                   |
| distance         | Int    | 距离（坐标半径）    **配合 near 使用** ；一格的距离大约是 100 |
| geo_box          | Json   | [-125.0, 35.0, -100.0, 40.0] <br />[x1,y1,x2,y2] <br />x1,y1 左下角坐标 x2,y2右上角坐标 |
| contract_address | String | 指定某个合约（多星球时）                                     |
| owner_address    | String | 持有人地址                                                   |
| status           | int    | 状态:  -1 不可购买 0 没有mint（可购买） 1已经mint            |
| type           | int     | 地块销售类型           |
| lasttime         | int    | 时间戳 timestamp , 上次请求返回的 lasttime，可用于请求之后的最新数据            |

返回结果：

```json
{
  "lands": {
    "103,103": {
      "x": 103,
      "y": 103,
      "type": 1,
      "owner": "0x863ab07eee6f1849293521e8b50565a4420787b1"
    },
    "103,104": {
      "x": 103,
      "y": 104,
      "type": 1,
      "owner": "0x863ab07eee6f1849293521e8b50565a4420787b1"
    }
    ...
  }
  "lasttime": "1636684369"
}

```


#### estate/query

查询条件：

| Param            | Type   | description                                                  |
| ---------------- | ------ | ------------------------------------------------------------ |
| return_type    | String | array / keyvalue                                  |
| near             | Json   | 坐标 [103,222] <br />[x,y]                                   |
| distance         | Int    | 距离（坐标半径）    **配合 near 使用** ；一格的距离大约是 100 |
| geo_box          | Json   | [-125.0, 35.0, -100.0, 40.0] <br />[x1,y1,x2,y2] <br />x1,y1 左下角坐标 x2,y2右上角坐标 |
| contract_address | String | 指定某个合约（多星球时）                                     |
| owner_address    | String | 持有人地址                                                   |
| status           | int    | 状态:  -1 不可购买 0 没有mint（可购买） 1已经mint            |
| type           | int     | 地块销售类型           |
| lasttime         | int    | 时间戳 timestamp , 上次请求返回的 lasttime，可用于请求之后的最新数据            |

返回结果：

```json
{
  "estate": {
    "10001": {
      "name":"estate",
      "description": "estate description",
      "tokenURI":"",
      "lands": {
          "103,103": {
          "x": 103,
          "y": 103,
          "type": 1,
          "owner": "0x863ab07eee6f1849293521e8b50565a4420787b1"
          },
          "103,104": {
            "x": 103,
            "y": 104,
            "type": 1,
            "owner": "0x863ab07eee6f1849293521e8b50565a4420787b1"
          }
      }
    }
    ...
  }
  "lasttime": "1636684369"
}

```


### 缓存方案

#### A
- 首次通过 land/query 获取数据，返回数据中带有最后更新的时间戳 [lasttime]
- 再次请求的时候，传入 [lasttime], 只获取最新变动数据

#### B 
- 首次通过 land/query 获取数据，返回数据中带有最后更新的时间戳 [lasttime]
- 通过 land/lasttime 获取数据最后更新时间 
- 比对时间戳，如果数据较老，重新获取数据


