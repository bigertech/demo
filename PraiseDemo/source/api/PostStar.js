/**
 * Created by JerryC on 14-11-12.
 */

var Promise         = require("bluebird"),
    dataProvider    = require("../models"),
    PostStar;

PostStar = {
    add: function (obj) {
        var newPostStar = new dataProvider.PostStar(obj);

        return newPostStar.save({},{method:"insert"})
            .then(function(data){
                if (data) {
                    console.log('A PostStar save success!');
                }
                else {
                    console.log('PostStar save failed');
                }
                return data;
            }).catch(function (err) {
                return err;
            });
    },
    update: function (obj,update) {
        return obj.save(update,{patch:true})
            .then(function(data){
                if (data) {
                    console.log('A PostStar update success!');
                }
                else {
                    console.log('PostStar update failed');
                }
                return data;
            }).catch(function (err) {
                return err;
            });
    },
    delete: function (obj) {
        return obj.destroy().catch(function (err) {
            return err;
        });
    },
    findByPostId: function (postID) {
        return new dataProvider.PostStar({'postID':postID}).fetch()
            .then(function (data) {
                return data;
            });
    }
};

module.exports = PostStar;