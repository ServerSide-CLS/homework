var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var Users = [];
var mail=require("./public/javascripts/SendEmail.js");
var check=require("./public/javascripts/check.js");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', hbs ({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "Your secret key",
  resave:true,
  saveUninitialized:true,
  cookie:{secure:false}
}));
app.use(express.static(path.join(__dirname, 'public')));
//渲染主页
app.get('/',function(req,res){
	res.render('signup');
})
//点击发送验证码时提交表单
app.post('/check',function(req,res){
  let email=req.body.account;
  let num=Math.floor(Math.random()*(10000-1000))+1000;
  try{
    check.checkemail(email);
    mail.send(email,num);
  }
  catch(e){
    res.render('signup',{msg:e.toString()})
  }
  var emailnum={email:req.body.account,num:num};
  req.session.emailnum=emailnum;
  req.session.save();
})
//点击注册时提交表单
app.post('/signup',function(req,res){
  let user=req.body;
  try{
    check.checkemailnum(user.checknum,req.session.emailnum.num);
    check.checkpassword(user.password,user.passwordagain);
    var newUser={account:req.session.emailnum.email,password:user.password,checknum:user.checknum};
    Users.push(newUser);
    check.writedata(Users);
    res.send({msg:"注册成功"})
  }catch(e){
    res.send({msg:e.toString()});
  }
})
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next) { 
  next(createError(404));
});

app.listen(3000);
console.log("http://localhost:3000");
module.exports = app;