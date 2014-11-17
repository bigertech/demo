/**
 * Created by JerryC on 14-11-12.
 */

var express = require("express"),
    PostController = require("../controllers").post,
    PostRouter  = express.Router();

PostRouter.post('/rating',PostController.rating);
PostRouter.post('/cancel-rating',PostController.cancelRating);
PostRouter.get('/get-rating',PostController.getRating);

module.exports = PostRouter;