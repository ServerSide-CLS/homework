var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser=require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sendCode = require("./public/javascripts/sendcode.js");
var fs = require("fs");
var Users = [];


var app = express();
 
// 引用handlebars模块
var hbs = require('express-handlebars')

// 设置模板引擎
app.set('view engine', 'hbs')

// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',

}));

app.get('/', function(req, res){
   res.render('default');
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());


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

var code;
 app.post('/sendCode',function(req,res){
      var result=sendCode(req.body.email); 
        code=result.code;
        if(result.status==200)
          res.send("s");
        else
          res.send("f");
 });
    

app.post('/data', function(req, res){
  var mail=req.body.email;
    var reg1 = /^\w{5,}@[a-z0-9]{2,3}\.[a-z]+$|\,$/;

    if(!mail.matches(reg1)){
         res.send({status:"f",reason:"邮箱格式不正确"});
    }
    else if(req.body.pwd!=req.body.checkPwd){
         res.send({status:"f",reason:"密码确认不正确!"});
    }
    else if(req.body.checkCode!=checkcode){
     res.send({status:"f",reason:"验证码不正确"});
    }
    else{
       res.send({status:"s"}); 
       if (Users.length>0) {
            Users.filter((user)=>{
            if(user.email === req.body.email){
              alert( "User Already Exists!");
          }
         else{
            var newUser = {email: req.body.email, password: req.body.pwd};
            Users.push(newUser);
          }
        });
      }else{
        var newUser = {email: req.body.email, password: req.body.pwd};
        Users.push(newUser);
        req.session.user = newUser;
      }
     fs.writeFileSync("./user.json",JSON.stringify({"email":req.body.email,"pwd":req.body.pwd}));
      }
    });

module.exports = app;


