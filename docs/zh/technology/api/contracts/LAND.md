# Land

## LAND合约

### 主要的View读函数

1. encodeTokenId、decodeTokenId

把tokenId与(x,y)相互相互转换的函数，坐标转换参考 [坐标体系](../../../specs/land.md#坐标体系)

2. tokenMetadata

```bash
function tokenMetadata(uint256 assetId) external view returns (string);
function landData(int x, int y) external view returns (string);
```

- 查询指定id或者(x,y)的metadata
- 如果该地块的owner是合约，并且合约支持GET_METADATA，则调用合约的metadata函数
- metadata是一个字符串文本或者ipns
  - 解析方式？
  - 并不是每个都有metadata


### 主要的Write写函数

3. createEstate、createEstateWithMetadata

```
function createEstate(int[] x, int[] y, address beneficiary, string metadata) external;
function createEstateWithMetadata(int[] x, int[] y, address beneficiary, string metadata) external;
```

指定一批坐标，为指定的地址beneficiary，创建Estate并设置metadata
