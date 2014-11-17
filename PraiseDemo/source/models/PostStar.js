/**
 * Created by JerryC on 14-11-12.
 */

var Promise         = require("bluebird"),
    appBookshelf    = require("./base.js"),
    PostStar;

PostStar = appBookshelf.Model.extend({
    tableName:'post_star'
});

module.exports = PostStar;