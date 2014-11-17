/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14-11-14
 * @description
 *
 */

var postController  = require("../../controllers"),
    postStarApi     = require("../../api").PostStar;
    should          = require("should"),
    request         = require("supertest"),
    app             = require("../../index.js");

describe('A test of route/post', function () {
    var reqData = {
            post_id:99,
            type:'star'
        },
        newPostStar = {
            id:99,
            postID:99,
            star:0,
            hate:0
        },
        agent = request.agent(app);

    before(function (done) {
        postStarApi.add(newPostStar).then(function (data) {
            done();
        });
    });

    describe('#get /post.html', function() {
        it('should be ok', function (done) {
            agent.get('/post.html')
                .expect('Content-Type', /html/)
                .expect(200)
                .end(function (err , res) {
                    done(err);
                });
        });
    });

    describe('#get /fapi/post/get-rating ', function() {
        describe('#will get success', function () {
            it('should be ok', function (done) {
                agent.get('/fapi/post/get-rating?post_id='+reqData.post_id)
                    .set('Accept','application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        if (!('post_id' in res.body)) return "missing post_id key";
                        if (!('starNum' in res.body)) throw new Error("missing starNum key");
                        if (!('hateNum' in res.body)) throw new Error("missing hateNum key");
                    })
                    .end(done);
            });
        });
        describe('#will get failed', function () {
            it('should be ok', function (done) {
                agent.get('/fapi/post/get-rating?post_id=null')
                    .set('Accept','application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        if (!('status' in res.body)) return "missing status key";
                        if (!('info' in res.body)) throw new Error("missing info key");
                    })
                    .end(done);
            });
        });

    });

    describe('#post /fapi/post/rating ', function() {
        describe('#对存在的文章点赞', function () {
            it('should be ok', function (done) {
                agent.post('/fapi/post/rating')
                    .set('Accept','application/json')
                    .send(reqData)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        if (!('status' in res.body)) return "missing status key";
                    })
                    .end(done);
            });
        });
        describe('#对不存在的文章点赞', function () {
            it('should be ok', function (done) {
                agent.post('/fapi/post/rating')
                    .set('Accept','application/json')
                    .send({post_id:100})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        if (!('status' in res.body)) return "missing status key";
                    })
                    .end(done);
            });
            after(function (done) {
                postStarApi.findByPostId(100).then(function (data) {
                    postStarApi.delete(data).then(function () {
                        done();
                    });
                });
            });
        });
        describe('#cookie存在的时候，点赞', function () {
            it('should be ok', function (done) {
                agent.post('/fapi/post/rating')
                    .set('Accept','application/json')
                    .send({post_id:99})
                    .set('set-cookie','99=true,Path=/')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        if (!('status' in res.body)) {
                            return "missing status key";
                        }
                    })
                    .end(done);
            });
        });
    });

    describe('#post /fapi/post/cancel-rating', function () {
        describe('#cookie不存在的时候，取消赞', function () {
            it('should be ok', function (done) {
                agent.post('/fapi/post/cancel-rating')
                    .set('Accept','application/json')
                    .send({post_id:99})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        if (!('status' in res.body)) {
                            return "missing status key";
                        }
                    })
                    .end(done);
            });
        });
        describe('#cookie存在的时候，取消赞', function () {
            it('should be ok', function (done) {
                agent.post('/fapi/post/cancel-rating')
                    .set('Accept','application/json')
                    .set('set-cookie','99=true,Path=/')
                    .send({post_id:99})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        if (!('status' in res.body)) {
                            return "missing status key";
                        }
                    })
                    .end(done);
            });
        });
    })
});
