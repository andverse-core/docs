# Estate

- Estate是一个NEP7资产。
- Estate是两个或多个直接相邻的土地地块的组合。这些地块必须直接相邻，不能被任何其他地块隔开。

## Estate合约

### 主要的View读函数

1. 基本函数

- EstateId 与 LandId对应函数

2. getFingerprint、verifyFingerprint

```
function getFingerprint(uint256 estateId) public view returns (bytes32 result);
function verifyFingerprint(uint256 estateId, bytes fingerprint) public view returns (bool);
```

- getFingerprint基于地产名下的地皮ID进行checksum
- verifyFingerprint用来校验地产是否有增减地块

3. tokenURI

- EstateId对应的tokenURI地址如下：

```
<baseTokenURI>/<EstateId>   
```

tokenURI的内容参考 [TokenURI内容格式](../../../specs/estate.md#TokenURI内容格式)

4. getEstateSize

```
function getEstateSize(uint256 estateId) external view returns (uint256);
```

返回指定地产的地块数量

### 主要的Write写函数


1. mint

```
function mint(int256[] memory x, int256[] memory y, address to) external onlyRegistry returns (uint256);
```

基于指定(x,y)的Land坐标数组，给指定的地址to 创建Estate

- 参数：
  - x,y: (x,y)坐标数组
  - to: 指定地址铸造地产
- 返回值：
  - 地产ID
- 权限：
  - 指定的地产需要提前授权给Estate合约
  - 仅LAND的owner可以创建地产

2. addLandToEstate

```
addLandToEstate(int[] memory x, int[] memory y, uint256 estateId)
```

增加指定LAND到指定的地产estateId

- 参数：
  - x,y: (x,y)坐标数组
  - estateId: 地产Id
- 权限：
  - 指定地产需要提前授权给Estate合约
  - 仅LAND的owner可以调用
  - 仅estateId的owner可以调用

3. transferLand

```
transferLand(uint256 estateId, uint256 landId, address destinatary)
```

转移指定地产estateId里的指定地块landId到指定地址destinatary

- 参数
  - estateId: 地产Id
  - landId: 需要被转移的LAND的Id
  - destinatary: 接口landId的地址
- 权限
  - 仅estateId调用

4. transferManyLands

```
transferManyLands(uint256 estateId, uint256[] memory landIds, address destinatary)
```

转移指定地产estateId里的多个landId到指定地址destinatary

- 参数
  - estateId: 地产Id
  - landIds: 需要被转移的LAND的Id的数组
  - destinatary: 接口landId的地址
- 权限
  - 仅estateId调用


### 日志

1. 基本的ERC721/NRC7的Event

2. CreateEstate

```
event CreateEstate(
  address indexed _owner,
  uint256 indexed _estateId
);
```

创建地产，仅在mint函数被调用

3. AddLand

```
event AddLand(
    uint256 indexed _estateId,
    uint256 indexed _landId
);
```

增加地块

在mint函数及addLandToEstate函数中被调用

4. RemoveLand

```
event RemoveLand(
  uint256 indexed _estateId,
  uint256 indexed _landId,
  address indexed _destinatary
);
```

从地产里移除地块

在transferManyLands和transferLand合约里被调用
