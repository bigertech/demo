/**
 * Created by JerryC on 14-11-11.
 */

// # StarLog Model
var Promise        = require('bluebird'),
    appBookshelf   = require('./base.js'),
    StarLog;


StarLog = appBookshelf.Model.extend({
    tableName: 'star_logs',
    destroying:function(model,options){
        console.log(model);
    },
    destroyed:function(model,options){
        console.log('model destroyed');
        console.log(model);
    },
    saving:function(model, attrs, options){
        console.log('model saving');
    }
});

module.exports = StarLog;
