# Land

## LAND合约

### 主要的View读函数

1. encodeTokenId、decodeTokenId

把tokenId与(x,y)相互相互转换的函数，坐标转换参考 [坐标体系](../../../specs/land.md#坐标体系)


### 主要的Write写函数

3. createEstate、createEstateWithMetadata

```
function createEstate(int[] x, int[] y, address beneficiary, string metadata) external;
function createEstateWithMetadata(int[] x, int[] y, address beneficiary, string metadata) external;
```

指定一批坐标，为指定的地址beneficiary，创建Estate并设置metadata
