## Land

LAND 是一种不可替代的数字资产，维护在牛顿区块链智能合约中。 LAND 采用仙女座[坐标体系](#坐标体系)。
每个 LAND 都包含其坐标值、其所有者以及类型。

### 坐标体系

仙女座采用一套公开且兼容现有区块链元宇宙（DecenterLand）、互联网元宇宙项目（例如，Facebook改名后的Meta）的坐标体系。
其基本结构如下：

```
Ω(1, 2, 3, (4, 5))
```

其中，
- Ω：代表了此套坐标体系，采用本坐标体系，固定使用该字符。

该值需要采用`constant string AND_SYMBOL = "Ω"`记录在合约中

- 1: Metaverse ID, 所属元宇宙编号，代表了元宇宙项目

参考 [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md),

元宇宙ID注册如下：

Metaverse ID | Symbol | Metaverse
--|--|--
0 | NEW | Newton Metaverse
1 | AND | Andverse
2 | META | Facebook (META)
3 | LAND | Decentraland
4 | SAND | SandBox

元宇宙及其包含的星系、星球、土地等，均需提供`function metaverseId()`来返回元宇宙ID。

- 2: Galaxy ID, 所属星系编号。该编号由各个元宇宙单独维护，其中仙女座元宇宙的星系编号如下：

Galaxy ID | Name
--|--
0 | 仙女座星系

星系及其包含的星球、土地等，均需提供`function galaxyId()`来返回星系ID。

- 3： Planet ID, 所在星球编号。该编号由各个元宇宙单独维护，其中仙女座星系中星球编号如下：

Planet ID | Name
--|--
0 | 0号星球（蓝色星球、生命起源）

星球及其包含的土地等，据需提供`functin planetId()`来返回星球ID

- (4, 5): 在笛卡尔坐标体系中的土地的坐标

### 3号星球坐标分布

- 第一次售卖坐标范围
  - 从 (103,103) 到 (256,256)
  - 系统保留坐标：
    - 符合 x == y 或者 x + 1 == y 或者 x - 1 == y 的地块
    - 在 (165,165) 到 (194, 194) 之间

```bash
function isAllowed(int x, int y) public pure returns (bool) {
    if ((x == y) || (x + 1 == y) || (x - 1 == y)) return false; // x3
    if (165 <= x && x <= 194 && 165 <= y && y <= 194) return false; // 30 x 30
    if (103 <= x && x <= 256 && 103 <= y && y <= 256) return true; // [103, 256]

    return false;
}
```
