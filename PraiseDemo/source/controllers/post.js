/**
 * Created by JerryC on 14-11-12.
 */

var api     = require("../api"),
    uuid    = require("node-uuid"),
    post;

function addLog(reqData) {
    reqData.time = new Date();
    return api.StarLog.add(reqData).then(function (data) {
        return data;
    });
}

post = {
    rating : function (req,res) {
        // 获取数据
        var reqData = {
            postID  : req.body['post_id'],
            type    : req.body['type'],
            userID  : req.body['userID'] || null,
            behavior: 'add'
        };

        // 通过cookie判断是否对这篇文章点过赞
        if(req.cookies[reqData.postID]){
            // 表态过,返回error and info
            return res.json({status:'error',info:'you are has been rated'});
        }

        // 操作 点赞或者踩 , 并且更新cookie
        api.PostStar.findByPostId(reqData.postID).then(function (data) {
            // 如果文章不存在，新增一篇文章
            if(!data) {
                return api.PostStar.add({postID: reqData.postID});
            }else{
                return data;
            }
        }).then(function (data) {
            // 准备更新数据
            var currentCount = data.get(reqData.type);
            var update = new Object();
            update[reqData.type] = currentCount+1;

            // 更新
            api.PostStar.update(data,update).then(function (data) {
                // 更新失败
                if(!data){
                    return res.json({status:'error',info:'update failed'});
                }

                // 增加一条log失败
                addLog(reqData).then(function (data) {
                    if(!data) {
                        console.log('add log failed');
                    }
                });

                res.cookie(reqData.postID,true);
                return res.json({status:'success'});
            });
        }).catch(function (err) {
            console.log('something wrong.....');
            console.log(err);
        });
    },
    cancelRating : function (req,res) {
        // 获取数据
        var reqData = {
            postID  : req.body['post_id'],
            type    : req.body['type'],
            userID  : req.body['userID'],
            behavior: 'cancel'
        };


        // 通过cookie判断是否对这篇文章点过赞
        if(!req.cookies[reqData.postID]){
            // 表态过或者不存在cookie,返回error and info
            return res.json({status:'error',info:'you are have not rate before'});
        }

        // 操作 赞或者踩 , 并且更新cookie
        api.PostStar.findByPostId(reqData.postID).then(function (data) {
            // 如果文章不存在，返回错误信息
            if(!data){
                return res.json({status:'error',info:'can not find the post:'+reqData.postID});
            }

            // 准备更新数据
            var currentCount = data.get(reqData.type);
            var update = new Object();
            update[reqData.type] = currentCount-- > 0 ? currentCount : 0 ;

            // 更新
            api.PostStar.update(data,update)
                .then(function (data) {
                    // 更新失败
                    if(!data){
                        return res.json({status:'error',info:'update failed'});
                    }
                    // 增加一条log失败
                    addLog(reqData).then(function (data) {
                        if(!data) {
                            console.log('add log failed');
                        }
                    });

                    res.clearCookie(reqData.postID);
                    return res.json({status:'success'});
                });
        });
    },
    getRating : function (req, res) {
        var data    = req.query,
            postID  = data.post_id,
            type    = data.type;

        api.PostStar.findByPostId(postID)
            .then(function (data) {
                if(!data){
                    return res.json({status:'error',info:'can not find the post:'+postID});
                }
                switch (type){
                    case 'star':
                        res.json({
                            post_id:data.get('postID'),
                            starNum:data.get('star')
                        });
                        break;
                    case 'hate':
                        res.json({
                            post_id:data.get('postID'),
                            hateNum:data.get('hate')
                        });
                        break;
                    default :
                        res.json({
                            post_id:data.get('postID'),
                            starNum:data.get('star'),
                            hateNum:data.get('hate')
                        });
                        break;
                }
            });
    }
};
module.exports = post;
