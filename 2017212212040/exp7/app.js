var hbs = require('express-handlebars');
var express = require('express');
var app = express();
var path = require('path')
var indexRouter = require('./routes/index');

app.set('view engine','hbs')//使用hbs模板引擎
app.set('views',path.join(__dirname,'views'))//设置模板放在views文件夹下
app.use(express.static(path.join(__dirname, 'public')))//将静态的图片，文件，css等放在public下

app.engine('.hbs',hbs({
    extname:'.hbs',
    defaultLayout:'default',//默认加载
    layoutsDir:__dirname+'/views/layouts',
    partialsDir:__dirname+'/views/partials'
}));

app.use('/', indexRouter);
app.listen(3000);
console.log('Server running at http://localhost:3000');