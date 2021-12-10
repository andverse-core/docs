# Land

## LAND Contracts

### Main View function

1. encodeTokenId, decodeTokenId

functions convert `tokenId` and `(x,y)` to each other, coordinate conversion reference [coordinate system](../../../specs/land.md#coordinate system)

### Main write function

2. createLand, createLandFor

```
function createLand(int[] x, int[] y) external;
function createLandFor(int[] x, int[] y, address beneficiary) external;
function createLandWithType(int[] x, int[] y, address beneficiary, uint256 landType) external;
```

- create land for `beneficiary` with `(x, y)` array
