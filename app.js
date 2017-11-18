var express = require('express');//requery加载第三方插件
var path = require('path');//node内置的模块，主要功能是取出与路径有关的相关信息
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/stu.js');//commonJS标准的模块
//模块的导入require，模块的导出module.exports=对象，模块=文件

var app = express();//app服务器的应用程序。操作服务器的接口


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());//POST请求数据如果是json，那么来把它编程js对象
app.use(bodyParser.urlencoded({ extended: false }));//POST请求的字符串处理
app.use(cookieParser());//如果请求中带有COOKIE，这个插件会经行处理
app.use(express.static( 'public'));//设置静态资源的访问路径

app.use('/index', index);//带有/stu请求的才能经过stu

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("404,not found");
});
app.listen(3000,function(){
  console.log('node is OK');
})

module.exports = app;
