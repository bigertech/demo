评论Demo API
===

###用户权限：

1. 用户对文章发表评论
2. 用户对评论点赞
3. 用户删除自己的评论
3. 获取文章评论数
4. 获取文章的评论
5. 获取文章的评论的子评论

###管理员权限：

5. 管理员删除评论
6. 管理员修改评论状态
7. 管理员查看评论

TODO:

1. “获取评论”和“获取评论的子评论功能”的comment相关字段都是假的，有待更新


---

##用户对文章发表评论

###URL
/user/comments/create

###支持格式
JSON

###HTTP请求方式
POST

###是否需要登录
是

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| thread_id  | true | String | 要查询文章的id |
| user_id      | true      |   String |  用户的id|
| content      | true      |   String |  评论的内容|


###返回结果
```
//成功
{
    "status":"success"
}

//失败
{
	"status":"error",
	"info":"error info"
}
```

---

##用户对评论点赞

###URL
/user/comments/rating

###支持格式
JSON

###HTTP请求方式
POST

###是否需要登录
否

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| post_id  | true | String | 文章的id |
| user_id      | false      |   String |  用户的id|
| type      | true      |   String |  类型，'star'：赞一次、'hate'：踩一次|

###返回结果

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

---

##用户删除自己的评论

###URL
/user/comments/delete

###支持格式
JSON

###HTTP请求方式
DELETE

###是否需要登录
是

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| user_id	  | true | int | 用户的id |
| comment_id      | false      |   String |  评论的id|

###返回结果

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

---

##获取文章评论数

###URL
/user/comments/counts

###支持格式
JSON

###HTTP请求方式
GET

###是否需要登录
否

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| thread_id      | false      |   String |  文章的id|

###返回结果

```
{
	thread_id:"3674083",
	comments_counts:"20"
}
```

###返回参数说明

*thread_id string*

文章的id

*comments_counts int*

文章评论数

---

##获取文章的评论

###URL
/user/comments/list

###支持格式
JSON

###HTTP请求方式
GET

###是否需要登录
否

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| thread_id      | true      |   String |  文章的id|
| page      | true      |   String |  要获取第几页|
| limit      | true      |   String |  每一页显示的条数|


###返回结果

```
"thread":{
	"thread_id":"1213447420692660225",
	"title": "我曾经问个不休",
    "created_at": "2014-07-07T15:08:26+08:00",
    "comment_counts": 50,
},
"comments":{
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	}
}
```

---

##获取文章的评论的子评论

###URL
/user/comments/childList

###支持格式
JSON

###HTTP请求方式
GET

###是否需要登录
否

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| thread_id      | true      |   String |  文章的id|
| comment_id      | true      |   String |  评论的id|
| page      | true      |   String |  要获取第几页|
| limit      | true      |   String |  每一页显示的条数|


###返回结果

```
"thread":{
	"thread_id":"1213447420692660225",
	"title": "我曾经问个不休",
    "created_at": "2014-07-07T15:08:26+08:00",
    "comment_counts": 50,
},
"parent_comment":{
	"thread_id":"1213447420692660225",
	"comment_id":"1213447420692660260",
	"user_id":"2120851",
	“content”:"官方的观点是发的发的所发生的",
	"create_at":"2014-07-18T15:04:20+08:00",
	"parent_id":"1213447420692660278",
	"to_user_id":"2150841",
	"star":"10",
	"hate":'20	
}
"child_comments":{
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	}
}
```

---

##管理员删除评论

###URL
/admin/comments/delete

###支持格式
JSON

###HTTP请求方式
DELETE

###是否需要登录
是

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| commentList    | true      |   Array |  要删除的评论的id数组|

示例：

```
{
	"commentList":[
		"1213447420692660260",
		"1213447420692660260",
		"1213447420692660260",
		"1213447420692660260"
	]
}
```


###返回结果

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


##管理员修改评论的状态

###URL
/admin/comments/update

###支持格式
JSON

###HTTP请求方式
PUT

###是否需要登录
是

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| commentList    | true      |   array |  要删除的评论的id数组|
| status    | true      |   string |要修改为的状态，有以下值："pending","passed","discarded","deleted"|

###返回结果

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


##管理员查评论

###URL
/admin/comments/lookup

###支持格式
JSON

###HTTP请求方式
GET

###是否需要登录
是

###请求参数
|               |        必选           |   类型  |说明
| ------  |:-------------:| -----:|-----:|
| thread_id    | true[flase]      |   string |  文章的id|
| user_id    | true[false]      |   string |	用户的id|
| status    | false      |   string |	评论的状态，如果为null，则表示全部状态|
| page      | true      |   String |  要获取第几页|
| limit      | true      |   String |  每一页显示的条数|

ps : "user_id"和"thread_id"至少有一个不为null

###返回结果

```
"comments":{
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		"status":"passed"
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		"status":"passed"
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20		
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		"status":"passed"
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20			
	},
	"1213447420692660260":{
		"thread_id":"1213447420692660225",
		"user_id":"2120851",
		"status":"passed"
		“content”:"官方的观点是发的发的所发生的",
		"create_at":"2014-07-18T15:04:20+08:00",
		"parent_id":"1213447420692660278",
		"to_user_id":"2150841",
		"star":"10",
		"hate":'20			
	}
}
```