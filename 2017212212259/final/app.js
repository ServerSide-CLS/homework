var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars')
var indexRouter = require('./routes/index');
var bodyparser=require("body-parser");
var session = require('express-session');
app.use(cookieParser('session'));
app.use(session({
      saveUninitialized:false,               //是否将刚创建的session存到store中
      resave:false,                          //是否定期更新已经存到store中的session
      secret:"ergwe",                        //用于加密connect.sid(用于寻找session的id，存在于cookie中)
      rolling:true,                          //是否在用户每次请求时重置cookie(connect.sid)的生存时间
      cookie:{maxAge:30*60*1000}             //cookie（connect.sid）的生存时间，也是session的生存时间
  }));
var help = {
	if_eq: function (v1,v2,opts) {
		if(v1 == v2)
			return opts.fn(this);
		else
			return opts.inverse(this);
	},
};
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs',hbs({
	extname:"hbs",
	defaultLayout:"default",
	layoutsDir:__dirname+"/views/layouts",
	partialsDir:__dirname+"/views/partials"
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);

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
  res.send(err.message);
});
app.listen(3000);
module.exports = app;