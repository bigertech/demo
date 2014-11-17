/**
 * Created by JerryC on 14-11-11.
 */

var express         = require('express'),
    bodyParser      = require('body-parser'),
    cookieParser    = require("cookie-parser"),
    routes          = require('./routes'),
    http            = require("http"),
    path            = require("path"),
    app             = express();

//  设置端口为process.env.PORT或者3000
app.set('port', process.env.PORT || 3000);

//  设置body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  设置cookie解析组件
app.use(cookieParser());

//  静态资源路径
app.use(express.static(path.join(__dirname, 'public')));

//  注册路由
app.use('/fapi/post',routes.post);

http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;