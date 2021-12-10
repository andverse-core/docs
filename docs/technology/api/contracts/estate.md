# Estate

- Estate is a NEP7 on newton newchain
- An estate is an association of two or more directly adjacent parcels of LAND.

## Estate contracts

### main view function

1. basic function

EstateId and LandId convert function, such as:

```
// From Estate to list of owned LAND ids (LANDs)
function estateLandIds(uint256 estateId) returns (uint256[] landIds);

// From LAND id (LAND) to its owner Estate id
function landIdEstate(uint256 landId) returns (uint256 estateId);

// From Estate id to mapping of LAND id to index on the array above (estateLandIds)
function estateLandIndex(uint256 estateId, uint256 index) returns (uint256 landId);
```

2. getFingerprint、verifyFingerprint

```
function getFingerprint(uint256 estateId) public view returns (bytes32 result);
function verifyFingerprint(uint256 estateId, bytes fingerprint) public view returns (bool);
```

- getFingerprint base the lands of a estate to checksum
- verifyFingerprint to check whethere land updated

3. tokenURI

- the tokenURI of EstateId is as follow：

```
<baseTokenURI>/<EstateId>   
```

tokenURI reference [TokenURI](../../../specs/estate.md#TokenURI)

4. getEstateSize

```
function getEstateSize(uint256 estateId) external view returns (uint256);
```

return the lands number of estateId

### main write function


1. mint

```
function mint(int256[] memory x, int256[] memory y, address to) external onlyRegistry returns (uint256);
```

base on (x,y) of land array, create estate to address `to`

- Input:
  - x,y: (x,y) Coordinate arrays
  - to: the address receipt the estate
- returns:
  - EsateId
- Permission:
  - Designated properties need to be authorized in advance to the Estate contract
  - only the owner of a land can create esate

2. addLandToEstate

```
addLandToEstate(int[] memory x, int[] memory y, uint256 estateId)
```

add Lands to esateId

- Input:
  - x,y: (x,y) Coordinate arrays
  - estateId: estate id
- Permission:
  - Designated properties need to be authorized in advance to the Estate contract
  - only the owner of a land can create esate
  - only the owner of estateId can call this function

3. transferLand

```
transferLand(uint256 estateId, uint256 landId, address destinatary)
```

Transfer the specified `landId` in the specified `estateId` to the specified address `destinatary`

- Input:
  - estateId: Estate Id
  - landId: The `landId` need to be transferred
  - destinatary:  the address who receive the landId
- Permission
  - only the owner of estateId can call this function

4. transferManyLands

```
transferManyLands(uint256 estateId, uint256[] memory landIds, address destinatary)
```

Transfer many `landIds` in the specified `estateId` to the specified address `destinatary`

- Input:
  - estateId: Estate Id
  - landIds: The `landIds` need to be transferred
  - destinatary:  the address who receive the landId
- Permission
  - only the owner of estateId can call this function

### Event

1. basic ERC721/NRC7 Event

2. CreateEstate

```
event CreateEstate(
  address indexed _owner,
  uint256 indexed _estateId
);
```

- emit in `mint` function

3. AddLand

```
event AddLand(
    uint256 indexed _estateId,
    uint256 indexed _landId
);
```

- emit in `mint` and `addLandToEstate` function

4. RemoveLand

```
event RemoveLand(
  uint256 indexed _estateId,
  uint256 indexed _landId,
  address indexed _destinatary
);
```


- emit in `transferManyLands` and `transferLand` function
