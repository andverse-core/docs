# Estate

`Tips: This document is still in the draft stage.`

Estate is a non-fungible digital asset on newton blockchain. An estate is an association of two or more directly adjacent parcels of LAND.
- These parcels must be directly adjacent and cannot be separated by any other parcel. By connecting parcels to form Estates, you can more easily manage your larger LAND holdings.


## TokenURI Format

```json
{
    "name":"Estate #3",
    "description":"Andverse Estate. Each Estate is a unique (non-fungible) token lying on the public NewChain blockchain (NRC-7).",
    "image":"https://api.andverse.org/estate/3.jpg",
    "andverse":{
        "name":"Crypto City",
        "description":"The first-ever crypto city.",
        "image":"https://api.andverse/estates/3313/logo.jpg",
        "website":"https://andverse.org"
    },
    "properties":[
        {
            "trait_type":"Size",
            "value": 62,
            "display_type":"number"
        }
    ],
    "external_url":"https://www.andverse.org/expolor/3"
}
```

- name: the name of estate
- description: the description of estate
- image:  the description of estate, auto, automatically generated according to the surrounding environment
- andverse：user custom data, including name, description, website and image
- properties: metadata of properties
- external_url: the url to andverse.org
