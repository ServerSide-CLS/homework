var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var Users = [];
var mail=require("./source/mail.js");
var proof=require("./source/proof.js");
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', hbs ({
  extname: '.hbs',
  defaultLayout: 'layout',
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

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

//渲染主页
app.get('/',function(req,res){
	res.render('signup');
})
//点击发送验证码时提交表单，表单包括邮箱地址。
app.post('/check',function(req,res){
  let email=req.body.account;
  let num=Math.floor(Math.random()*(10000-1000))+1000;
  try{
    proof.checkemail(email);
    mail.send(email,num);
   // console.log(num);
  }
  catch(e){
    res.render('signup',{msg:e.toString()})
  }
  var emailnum={email:req.body.account,num:num};
  req.session.emailnum=emailnum;
  //console.log(req.session.emailnum.email);
  req.session.save();
})
//点击注册时提交表单，内容包括验证码，密码，确认密码，邮箱地址存在req.session.email.num中
app.post('/signup',function(req,res){
  let user=req.body;
  try{
    proof.checkemailnum(user.checknum,req.session.emailnum.num);
    proof.checkpassword(user.password,user.passwordagain);
    var newUser={account:req.session.emailnum.email,password:user.password,checknum:user.checknum};
    //console.log(user);
    Users.push(newUser);
    proof.writedata(Users);
    res.send({msg:"注册成功"})
  }catch(e){
    res.send({msg:e.toString()});
  }
})



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
app.listen(3000);
module.exports = app;
