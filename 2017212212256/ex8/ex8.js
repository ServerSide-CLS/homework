var express=require('express');
var hbs=require('express-handlebars');
var multer = require('multer');
var bodyParser= require('body-parser');
var logger = require('morgan');
var path = require('path');
var index = require('./routes/index');
var user = require('./routes/user');
var cookieParser = require('cookie-parser');
var session = require('express-session');



var opt = {
	secret:'keyboard cat',
	resave:true,
	saveUninitialized:true,
	cookie:{maxAge:60000}
}

var app=express();


app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

app.engine('.hbs',hbs({
	extname:'.hbs',
	defaultLayout:'default',
	layoutsDir:__dirname+'/views/layouts/',
	partialsDir:__dirname+'/views/partials/'
}));


app.use(cookieParser());
app.use(session(opt));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(multer());
app.use(express.static('public'));
app.use(logger('dev'));

app.use('/',index);
app.use('/user',user);

app.use(function(req,res,next){
	next(createError(404));
});
app.use(function(err,req,res,next){
	res.locals.message = err.message
});

app.listen(3000);
