# Map


### Database (MongoDB)


### land 

| Field      | Type     | description                     |
| ---------- | -------- | ------------------------------- |
| _id         | ObjectId      | Primary Key |
| coordinate | Point | x=pointer.x/1000; y=pointer.y/1000, For example: {x:109,y:163}, save as:(0.109, 0.163) |
| x | Int | pointer x |
| y | Int | pointer y |
| land_type | Int | land type |
| contract    | String   | Contract Address |
| owner    | String   | Owner Address |
| token_id | int | token id |
| uri | String | token uri |
| mint_time | int | Mint Time |
| mint_block | NumberLong | Mint Block Number |
| mint_tx | String | Mint txid |
| estate_token_id | int | estate token id |
| created_at | int | created time |
| updated_at | int | updated time |


### estate 

| Field      | Type     | description                     |
| ---------- | -------- | ------------------------------- |
| _id         | ObjectId      | Primary Key |
| contract    | String   | contract address |
| owner    | String   | owner address |
| token_id | Long | token id |
| uri | String | token uri |
| minter | String | minter address |
| mint_time | int | Mint Time |
| mint_block | NumberLong | Mint Block Number |
| mint_tx | String | Mint txid |
| land_number | int | land number |
| name | String | owner custom name |
| description | String | owner custom description |
| image | String | owner custom image uri |
| status | int | status |
| created_at | int | created time |
| updated_at | int | updated time |

### API 

#### land/query

params：

| Param            | Type   | description                                                  |
| ---------------- | ------ | ------------------------------------------------------------ |
| near             | Json   | pointer [103,222] <br />[x,y]                                   |
| distance         | Int    | coordinate radius: Use with `near` (100 ≈ 1 pointer) |
| geo_box          | Json   | [-125.0, 35.0, -100.0, 40.0] <br />[x1,y1,x2,y2] <br />x1,y1 left bottom pointer x2,y2 right top pointer |
| contract_address | String | Contract Address                                     |
| owner_address    | String | Owner Address                                                   |
| type             | int    |      land_type      |
| lasttime         | int    | timestamp, add this parameter to query data after the specified time            |

Result：

```json
{
  "error_code": 1,
  "result": {
    "data": {
      "103,103": {
        "x": 103,
        "y": 103,
        "type": 1,
        "owner": "",
        "estate_token_id": -1
      },
      "103,104": {
        "x": 103,
        "y": 104,
        "type": 1,
        "owner": "",
        "estate_token_id": -1
      }
    }, 
    "lasttime": 1638366584
  }
}
```


#### estate/query

Params：

| Param            | Type   | description                                                  |
| ---------------- | ------ | ------------------------------------------------------------ |
| contract_address | String | contract address                                      |
| owner_address    | String | owner address                                                   |
| token_id         | Int    | estate token id                                                  |

Result：

```json
{
    "error_code":1,
    "result":{
        "data":{
            "0":{
                "name":"estate 0",
                "description":"Andverse is a decentralized multigalactic metaverse.",
                "tokenURI":"https://andverse-api.newtonproject.dev.diynova.com/api/v1/estate/0",
                "owner":"0x97549e368acafdcae786bb93d98379f1d1561a29",
                "lands":{
                    "212,152":{
                        "x":212,
                        "y":152,
                        "type":3,
                        "owner":"0x9bb40de2248645be20679819b78b75900bd08846"
                    }
                }
            },
            "1":{
                "name":"estate 1",
                "description":"Andverse is a decentralized multigalactic metaverse.",
                "tokenURI":"https://andverse-api.newtonproject.dev.diynova.com/api/v1/estate/1",
                "owner":"0x97549e368acafdcae786bb93d98379f1d1561a29",
                "lands":{
                    "210,153":{
                        "x":210,
                        "y":153,
                        "type":3,
                        "owner":"0x9bb40de2248645be20679819b78b75900bd08846"
                    },
                    "211,152":{
                        "x":211,
                        "y":152,
                        "type":3,
                        "owner":"0x9bb40de2248645be20679819b78b75900bd08846"
                    },
                    "211,153":{
                        "x":211,
                        "y":153,
                        "type":3,
                        "owner":"0x9bb40de2248645be20679819b78b75900bd08846"
                    },
                    "212,153":{
                        "x":212,
                        "y":153,
                        "type":3,
                        "owner":"0x9bb40de2248645be20679819b78b75900bd08846"
                    }
                }
            },
            "2":{
                "name":"estate 2",
                "description":"Andverse is a decentralized multigalactic metaverse.",
                "tokenURI":"https://andverse-api.newtonproject.dev.diynova.com/api/v1/estate/2",
                "owner":"0xb6a9ed97417ce2086c1ec0114a88ac3671f4a687",
                "lands":{
                    "197,123":{
                        "x":197,
                        "y":123,
                        "type":3,
                        "owner":"0x9bb40de2248645be20679819b78b75900bd08846"
                    },
                    "198,123":{
                        "x":198,
                        "y":123,
                        "type":3,
                        "owner":"0x9bb40de2248645be20679819b78b75900bd08846"
                    }
                }
            }
        },
        "lasttime":1638366584
    }
}
```




#### estate/metadata/update

**Params**

| Param            | Type   | description                                                  |
| ---------------- | ------ | ------------------------------------------------------------ |
| contract_address | String | contract address                                   |
| token_id    | String | token id                                                    |
| name    | String | name                                                    |
| description         | String    |  description           |
| image         | String    |  image url           |
| signature         | String    |  signature |


**Signature Method**
```


1. splicing the signature string
  
  signString = "metadata:name={$name}&description={$description}&image={$image}"

2. NewMask sign

    web3.eth.sign(web3.eth.coinbase, nonce, function(err, signature){
       console.log(err);
       console.log(signature);
    });

    // OR

    web3.personal.sign(nonce, web3.eth.coinbase, function(err, signature){
        console.log(err);
        console.log(signature);
    });

```


Result：

```json
{
    "error_code":1,
    "result":{

    }
}

```



### Cache

- The first time the data is fetched via land/query, will return the last updated timestamp [lasttime].
- When requesting again, pass in [lasttime] to get only the latest changes



