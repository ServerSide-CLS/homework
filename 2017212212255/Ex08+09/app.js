var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
// var multer = require('multer');
// var session = require('express-session')
// var cookieParser = require('cookie-parser')
var hbs = require('express-handlebars')
var indexRoute = require('./routes/index')

// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'public')))
// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true })); 

// 解析 multipart/form-data
// app.use(multer()); 


// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use('/',indexRoute);

app.listen(8000)

