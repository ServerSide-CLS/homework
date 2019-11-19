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

var help = {
	if_eq:function(v1,v2,opts){
		if(v1 == v2)
			return opts.fn(this);
		else
			return opts.inverse(this);
	},
};

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
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));
app.use(multer());
app.use(express.static('public'));
app.use(logger('dev'));

app.use('/',index);
app.use('/user',user);



module.exports = app;
app.listen(3000);
