var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const sendEmail = require("./public/javascripts/sendEmail.js");
var nodemailer = require("nodemailer");
const fs = require("fs");
var app = express();

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
  if (err) throw err
  var db = client.db('animals')
  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
  })
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(".hbs",hbs({
    extname:".hbs",
    defaultLayout: "default",
    layoutsDir:  __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));

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



var code;
 app.post('/getCode',function(req,res){
      var result=sendCode(req.body.email); 
        code=result.code;
        if(result.status==200)
          res.send("success");
        else
          res.send("fail");
 });
    
 

app.post('/formSend', function(req, res){
    var personInfo = req.body; //Get the parsed information
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
      var newPerson = new Person({
        email: req.body.email,
        pwd:req.body.pwd
     });

     newPerson.save(function(err, Person){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else
           res.render('show_message', {
              message: "New person added", type: "success", person: personInfo});
     });
  }
       res.send({status:"s"}); 

      //  if (Users.length>0) {
      //       Users.filter((user)=>{
      //       if(user.email === req.body.email){
      //         alert( "User Already Exists!");
      //     }
      //    else{
      //       var newUser = {email: req.body.email, password: req.body.pwd};
      //       Users.push(newUser);
      //     }
      //   });
      // }else{
      //   var newUser = {email: req.body.email, password: req.body.pwd};
      //   Users.push(newUser);
      //   req.session.user = newUser;
      // }
      fs.writeFileSync("/user.json",JSON.stringify({"email":req.body.email,"pwd":req.body.pwd}));
      
    });

var nodemailer = require("nodemailer");
var code = Math.random()*9000+1000;

var transport = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: false,
    port: 465,
    auth: {
        user: "3100628841@qq.com",
        pass: 123456
    }
});

function sendEmail(email){
      transport.sendMail({
        from:"3100628841@qq.com",
        to:email,
        subject:"邮箱验证",
        html:"验证码:" + code
    },
    function(error,info){
       if(error){
         console.log(error.message);
        }
        console.log("Successful");
    });
    return {status:200,code:code};
    transport.close();
}


module.exports = app;
