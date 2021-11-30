# Estate

`提示: 本文档仍然处于草案阶段，未来会随时修改完善，请确保看到最新版。`

Estate 是一种不可替代的数字资产，维护在牛顿区块链智能合约中。Estate是由LAND组合而成，方便转移与管理。


## TokenURI内容格式

```json
{
    "name":"Estate 3",
    "description":"Andverse Estate. Each Estate is a unique (non-fungible) token lying on the public NewChain blockchain (NRC-7).",
    "image":"https://api.andverse.org/estate/3.jpg",
    "andverse":{
        "name":"Crypto City",
        "description":"The first-ever crypto city.",
        "image":"https://api.andverse/estates/3313/logo.jpg"
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

其中，
- name: 地产名称
- description: 地产描述
- image: 地产图片，系统根据周围环境自动生成
- andverse： 用户自定义内容，包含 name, description 和 image字段
- properties：元数据中包含的属性数组
- external_url: andverse.org指定地块的编号
