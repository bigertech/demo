/**
 * Created by Tracy on 14/11/14.
 */


var request = require('supertest'),
    express = require('express');

var app = require('../app.js');

describe('routes /', function(){
    describe('GET /', function(){
        it('respond with plain html', function(done){
            request(app)
                .get('/')
                .expect(200, done);
        });
    });


    describe('GET /kind', function(){
        it('respond with html', function(done){
            request(app)
                .get('/kind')
                .expect(200, done);
        });
    });

    describe('GET /getImageList', function(){
        it('respond with json', function(done){
            request(app)
                .get('/getImageList?path=&order=NAME&dir=image&1415866352479')
                .expect(200)
                .end(function(err, res){
                    if (err) throw err;
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('POST /upload', function(){
        it.skip('respond with json', function(done){
            request(app)
                .post('/upload')
                .expect(500, done);
        });
    });






});
