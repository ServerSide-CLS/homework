var express = require('express');
var path = require('path');
var hbs = require('express-handlebars')
var bodyParser = require('body-parser');


// 引用handlebars模块
var hbs = require('express-handlebars')
var express = require('express');
var app = express();
var path = require('path')
var index = require('./routes');

// 设置模板引擎
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

// 解析 application/json
app.use(bodyParser.json());

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true }));

// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'signup',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.use('/', index);

app.listen(9000);