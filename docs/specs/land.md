## Land

LAND is an irreplaceable digital asset maintained in a Newton blockchain smart contract.
LAND uses the [Andromeda coordinate system](#coordinate_system).
Each LAND contains its coordinate value, its owner, and its type.

### Coordinate System

Andromeda uses a coordinate system that is public and compatible with existing blockchain metaverse (e.g., DecenterLand) and Internet metaverse projects (e.g., Facebook's renamed Meta).
Its basic structure is as follows.

```
Ω(1, 2, 3, (4, 5))
```

- Ω: represents this set of coordinate system, using this coordinate system and fixing the use of this character.

This value needs to be recorded in the contract using the `constant string AND_SYMBOL = "Ω"`

- 1: Metaverse ID, the number of the metaverse to which it belongs, representing the metaverse item

Refer to [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md),

Metaverse ID is registered as follows.

| Metaverse ID | Symbol | Metaverse        |
| ------------ | ------ | ---------------- |
| 0            | NEW    | Newton Metaverse |
| 1            | AND    | Andverse         |
| 2            | META   | Facebook (META)  |
| 3            | LAND   | Decentraland     |
| 4            | SAND   | SandBox          |

The metaverse and the galaxies, planets, lands, etc. that it contains are required to provide `function metaverseId()` to return the metaverse ID.

- 2: Galaxy ID, the number of the galaxy it belongs to. This number is maintained separately for each metaverse, where the Andromeda metaverse has the following galaxy number.

| Galaxy ID | Name             |
| --------- | ---------------- |
| 0         | Andromeda Galaxy |

The galaxy and its planets, lands, etc., need to provide `function galaxyId()` to return the galaxy ID.

- 3: Planet ID, the planet number. This number is maintained separately for each meta-universe, where the Andromeda galaxy has the following planet IDs.

Planet ID | Name
| Name
0 | Planet 0 (blue planet, origin of life)

Planet and the land it contains, etc., according to the `functin planetId()` that needs to be provided to return the planet ID

- (4, 5): the coordinates of the land in the Cartesian coordinate system

### Coordinate distribution of planet 3

- First sale coordinates range
  - from (103,103) to (256,256)
  - Coordinates reserved by the system.
    - Plots that match x == y or x + 1 == y or x - 1 == y
    - Between (165,165) and (194, 194)

```bash
function isAllowed(int x, int y) public pure returns (bool) {
    if ((x == y) || (x + 1 == y) || (x - 1 == y)) return false; // x3
    if (165 <= x && x <= 194 && 165 <= y && y <= 194) return false; // 30 x 30
    if (103 <= x && x <= 256 && 103 <= y && y <= 256) return true; // [103, 256]

    return false;
}
```
