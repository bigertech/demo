/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14-11-14
 * @description  测试api/StarLog 的 add()、update()、delete()、findById()方法
 *
 */

var StarLogApi  = require("../../api").StarLog,
    should      = require("should");

describe('StarLogApi', function () {
    var newStarLog = {
        id:99,
        postID:99,
        userID:null,
        time:new Date(),
        type:'star',
        behavior:'test'
    };

    after(function (done) {
        return StarLogApi.findById(newStarLog.id).then(function (data) {
            if (data){
                StarLogApi.delete(data);
            }
            done();
        });
    });

    describe('#add #findById #delete', function () {
        before(function (done) {
            StarLogApi.findById(newStarLog.id).then(function (data) {
                if (data){
                    StarLogApi.delete(data);
                }
                done();
            });
        });

        it('should be ok when the id = 99', function (done) {
            StarLogApi.add(newStarLog).then(function (data) {
                data.toJSON().should.have.property('id',99);
                done();
            });
        });
    });

    describe('#update', function () {
        it('should be ok when the type = hate', function (done) {
            StarLogApi.findById(newStarLog.id).then(function (data) {
                StarLogApi.update(data,{type:'hate'}).then(function (data) {
                    data.toJSON().should.have.property('type','hate');
                    done();
                });
            });
        });
    });
});