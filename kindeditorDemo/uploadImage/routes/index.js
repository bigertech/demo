var express = require('express');
var router = express.Router();
var Upload = require('../controller/Upload');
var getImageList = require('../controller/getImageList');

var index= function(req, res) {
  res.render('index', { title: 'Express' });
};

/* GET home page. */
router.get('/', index);
router.get('/kind',Upload.index)
router.post('/upload',Upload.upload);
router.get('/getImageList',getImageList.index);



module.exports = router;
