/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14-11-14
 * @description 测试api/PostStar 的 add()、update()、delete()、findByPostId()方法
 *
 */

var PostStarApi = require("../../api/index").PostStar;

describe('Api/PostStar', function () {
    var newPostStar =  {
        postID:99
    };
    after(function (done) {
        PostStarApi.findByPostId(newPostStar.postID).then(function (data) {
            if(data){
                PostStarApi.delete(data);
            }
            done()
        });
    });

    describe('#add & #findByPostId & #delete', function () {
        before(function (done) {
            return PostStarApi.findByPostId(newPostStar.postID).then(function (data) {
                if(data){
                    PostStarApi.delete(data);
                }
                done()
            });
        });
        it('should return data object', function (done) {
            PostStarApi.add(newPostStar).then(function (data) {
                data.toJSON().should.have.property('postID',99);
                done();
            });
        });
    });

    describe('#update', function () {

        it('should be ok', function (done) {
            PostStarApi.findByPostId(newPostStar.postID).then(function (data) {
                PostStarApi.update(data,{star:1}).then(function (data) {
                    data.toJSON().should.have.property('star',1);
                    done();
                });
            });
        });
    });
});