/**
 * Created by Tracy on 14/11/12.
 */

var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var config = require('../config');
var uploadImageDir = '/public/upload';

module.exports = {
    upload :function(req,res,next){
        var form = new formidable.IncomingForm();
        form.keepExtensions = true; //keep .jpg/.png
        var folderName = new Date().getMonth() + 1;
        var dirPath = config.root + uploadImageDir + '/' + folderName + '/';
        var urlPath = '/' + folderName + '/';

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        form.uploadDir = dirPath;

        form.parse(req, function(err, fields, files) {
            if(err) {
                console.log(err);
            }


            var resData = {
                error:0,
                url:'http://localhost:3000' + urlPath + (files.imgFile.path.toString()).split('/').pop()
            };
            res.json(resData);
        });
    },
    index : function (req,res,next) {
        res.render("kind");

    }
};

