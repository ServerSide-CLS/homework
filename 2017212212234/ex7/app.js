
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

// 引用handlebars模块
var hbs = require('express-handlebars')

var help = {
    format: function () {
     $(document).ready(function() {
    if($("#pagination")){
        var pagecount =10;
        var pagesize = 2;
        var currentpage =1;
        var counts,pagehtml="";
        if(pagecount%pagesize==0){
            counts = parseInt(pagecount/pagesize);
        }else{
            counts = parseInt(pagecount/pagesize)+1;
        }
      
        if(pagecount<=pagesize){pagehtml="";}
     
        if(pagecount>pagesize){
            if(currentpage>1){
               
                pagehtml+= '<li><a href="">上一页</a></li>';
            }
            for(var i=0;i<counts;i++){
                if(i>=(currentpage-3) && i<(currentpage+3)){
                    if(i==currentpage-1){
                        pagehtml+= '<li class="active"><a href="">'+(i+1)+'</a></li>';
                        
                    }else{
                        pagehtml+= '<li><a href="">'+(i+1)+'</a></li>';
                        
                    }
                    
                }
            }
            if(currentpage<counts){
                pagehtml+= '<li><a href="">下一页</a></li>';
            }
        }
        $("#pagination").html(pagehtml);
    }
});
    },
};
// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))



// 设置handlebars参数
app.engine( '.hbs', hbs( {
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir:  __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: help,
}));