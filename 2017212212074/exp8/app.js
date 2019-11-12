var express = require('express');
var app = express();
var path = require('path');

//使用body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 引用handlebars模块
var hbs = require('express-handlebars')

// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/src')));
// 设置handlebars参数
app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

//路由
const router = require("./router/index")
app.use("/",router);

app.listen(3000, () => console.log(`listen on 3000! go to http://localhost:3000`));