#图片上传API定义

###URL
---
http://www.*****.com/uploadImage

###HTTP请求方式
---
POST

###是否需要登录
---
需要

##请求参数
---
无

###返回结果

####成功结果

> 状态码  200
返回图片url地址

```
{
    code:   // 状态码 //
    message: ''' //
}
```

#### 失败结果

- 所传文件不是图片(error:"Not image");
- 文件超过限定大小(error:"More than the size limit ");
- 文件破损(error:"File is damaged ");


    **Example**

| name | 是否必须| 类型 | 说明，默认值，可选值等等|
| ------------ | ------------- | ------------ |------------ |
| code | Yes  | Number | 响应的状态码 (1:表示成功，2：表示失败)|
|message|Yes|String|成功返回图片地址，失败返回错误信息|
