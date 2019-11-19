var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var hbs = require('express-handlebars')
var Mail = require("./public/javascripts/mail.js");

var app = express();

let checkCode;

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
app.use("/views/",express.static(path.join(__dirname,"views")));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/account');
let accountSchema = mongoose.Schema({
    email:String,
    password:String
});
let accountDb = mongoose.model("account",accountSchema);

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

app.listen(8900,() => console.log('listening on port 8900'))

app.get("/",function(req,res){
  res.render("register",{layout:"default"});
});

app.post('/register',function (req,res) {
  let mail = req.body.Email;
  let pwd = req.body.password;
  let repPwd = req.body.checkPassword;
  let check = req.body.code;
  let flag = req.body.flag;
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if(pwd !== repPwd){
      res.send({status:"error",why:"两次密码不一致！"});
  }
  else if(!reg.test(mail)){
      res.send({status:"error",why:"邮箱格式错误！"});
  }
  else if(check !== code){
      res.send({status:"error",why:"验证码错误！"});
  }
  else if(!flag){
      res.send({status:"error",why:"邮箱已存在！"});
  }
  else {
    res.send({status:"success"});
    let account = new accountDb({
        email:mail,
        password:pwd
      });
    account.save(function(err){
        console.log('save status:', err ? 'failed' : 'success');
    });
  }

});

app.post('/check',function (req,res) {
  let mail = req.body.Email;
  let result = sendEmails(mail);
  checkCode = result.code;
  if(result.status === 200 ){
    res.status(200).send("success");
  }else {
    res.status(500).send("error");
  }
});

app.post("/checkEmail",function(req,res){
    let email = req.body.Email;
    accountDb.find({email:email},function(err,account){
        //若不存在
        if(account.length === 0){
            res.send("No");
        }
        else{
            res.send("Yes");
        }
    });
});

app.get("/admin",function (req,res) {
    accountDb.find(function (err,account) {
      let info = "";
      for(let each in account) {
          info += "邮箱:" + account[each].Email + '<br>'+"密码:" + account[each].password ;
      }
      res.send(info);
  })
});

app.post("/login",function (req,res) {
    let ID = req.body.Email;
    let password = req.body.password;
    accountDb.find({email:ID},function (err,account) {
        if(account.length ===0){
            res.send("accountError");
        }
        else {
            if(account[0].password !== password){
                res.send("pwdError");
            }
            else {
                res.send("success");
            }
        }
    })
});