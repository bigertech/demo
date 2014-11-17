获取文章赞和踩数
---
###URL
/fapi/post/rating
###支持格式
JSON
###HTTP请求方式
GET
###是否需要登录
否
###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| post_id  | true | String | 要查询文章的id |
| type      | false      |   String |  获取类型，'star'：只返回赞数、'hate'：只返回踩数、没有type的话则返回赞数和踩数|

###返回结果
**JSON示例**

```
{
    "post_id": "eb0c2ff9-17c6-435c-ab75-c9f9ce4424f7",
    "starNum": 11,
    "hateNum": 12
}
```

----

赞 or 踩
---
###URL
/fapi/post/rating
###支持格式
JSON
###HTTP请求方式
POST
###是否需要登录
否
###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| post_id  | true | int | 要查询文章的id |
| type      | true      |   String |  类型，'star'：赞一次、'hate'：踩一次|
| user_id      | false      |   int |  已登录用户的id|

###返回结果
**JSON示例**

```
//成功
{
    "status":"success"
}

//失败
{
    "status":"error",
    "info":"error message"
}
```

----

取消赞 or 取消踩
---
###URL
/fapi/post/cancel_rating
###支持格式
JSON
###HTTP请求方式
POST
###是否需要登录
否
###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| post_id  | true | int | 要查询文章的id |
| type      | true      |   String |  类型，'star'：取消赞一次、'hate'：取消踩一次|
| user_id      | false      |   int |  已登录用户的id|

###返回结果
**JSON示例**

```
//成功
{
    "status":"success"
}

//失败
{
    "status":"error",
    "info":"error message"
}
```