var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();

// 引用handlebars模块
var hbs = require('express-handlebars')
var indexRouter = require('./routes/index')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// 设置handlebars参数
app.engine( '.hbs', hbs( {
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir:  __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers:require('./public/javascripts/pageActive')
    //注册自定义helpers

}));

app.get('/',(req,res) => {
	res.render('index',{
		layout:'default',
	});

})

app.listen(8000);
//监听8000端口

module.exports = app;


