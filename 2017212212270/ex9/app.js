var express = require("express");
var createError = require('http-errors');
var logger = require('morgan');
var app = express();
var path = require("path");
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var fs = require("fs");
var nodemailer = require('./routes/nodemailer');


// 设置模板引擎
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"));

app.engine(".hbs",hbs({
    extname:".hbs",
    defaultLayout: "default",
    layoutsDir:  __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));
// app.get("/",function(req,res){
//     res.render("index",{layout:"default"});
// });
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req, res, next) {
	res.render("index");
});
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyparser.json());  
// app.use(bodyparser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', nodemailer);

app.listen(3000, () => console.log(`listen on 3000!`));

module.exports = app;