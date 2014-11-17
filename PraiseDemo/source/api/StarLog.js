/**
 * Created by JerryC on 14-11-11.
 */

var Promise         = require('bluebird'),
    dataProvider    = require('../models'),
    StarLog ;

StarLog = {
    add:function(obj){
        return new dataProvider.StarLog(obj)
            .save({},{method:"insert"})
            .then(function(log){
                if(log)console.log('A StarLog object saved!');
                else{console.log('StarLog object save failed');}
                return log;
            }).catch(function (err) {
                return err;
            });
    },
    update:function(obj,update){
        return obj.save(update,{patch:true})
            .then(function(log){
                if(log) console.log('A StarLog object updated!');
                else{console.log('StarLog object update failed');}
                return log
            }).catch(function (err) {
                return err;
            });
    },
    delete:function(obj) {
        obj.destroy().catch(function (err) {
            return err;
        });
    },
    findById:function(id){
        return new dataProvider.StarLog({id:id})
            .fetch()
            .then(function (data) {
                return data;
            });
    }
};

module.exports = StarLog;