/**
 * Created by Tracy on 14/11/13.
 */

var path    = require('path');
var fs      = require('fs');
var Promise = require('bluebird');
var moment  = require('moment');
var getHost = require('../api/getHost');
var config  = require('../config');





function getDirInfo(dirName){
    var moveup_dir_path;
    var current_dir_path;
    var current_url;
    var total_count;
    var result = {};

    return  new Promise(function (resolve, reject) {
        fs.readdir(dirName, function(err, files){
            //err 为错误 , files 文件名列表包含文件夹与文件
            if(err){
                console.log('error:\n' + err);
                reject();
                return;
            }
            resolve(files);
        })
    }).then(function(files){
            return getFilesInfo(files,dirName);

        });
}
function getFilesInfo(files,dirName){
    var promiseFiles = [];
    var fileArray = [];

    files.forEach(function(file){
        promiseFiles.push(new Promise(function (resolve, reject) {
            fs.stat(dirName + '/' + file, function(err, stat){
                var fileStat = {

                    is_dir:true,
                    has_file :true,
                    filesize :0,
                    is_photo :false,
                    filetype : "",
                    filename :file

                };
                if(err){console.log(err); reject();}
                if(stat.isDirectory()){
                    // 如果是文件夹遍历

                }else{
                    // 读出所有的文件
                    fileStat.is_dir = false;
                    fileStat.has_file = false;
                    fileStat.filesize = stat.size;
                    fileStat.is_photo = true;
                    fileStat.filetype = path.extname(file);
                    fileStat.datetime = moment(stat.ctime).format("YYYY-MM-DD HH:mm:ss");
                    fileStat.dir_path = "";
                }
                fileArray.push(fileStat);

                resolve();
            });


        }));
    });
    return Promise.all(promiseFiles).then(function() {
        var result ={
            moveup_dir_path : "",
            current_dir_path : "",
            current_url :   "/upload/11/",
            total_count : files.length,
            file_list : fileArray

        };
        return result;

    });
}






module.exports = {
    index : function (req, res, next){

        getDirInfo(config.root + '/public/upload/11').then(function (data) {
            res.json(data);
        });
    }

}