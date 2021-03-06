var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var Users = [];
var mail=require("./src/mail.js");
var error=require("./src/error.js");
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user');
var userSchema = mongoose.Schema({
  //保存username和password
   username:String,
   password:String
});

var User = mongoose.model("User", userSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', hbs ({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts'
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

function checkSignIn(req, res, next){
  if(req.session.user){
    next()    //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err)  //Error, trying to access unauthorized page!
  }
}


//点击发送验证码时提交表单，表单包括邮箱地址。
app.post('/check',function(req,res){
  let email=req.body.email;
  let num=Math.floor(Math.random()*(10000-1000))+1000;
  try{
    error.checkemail(email);
    User.find({username:email},
    function(err,response){
      if(err) throw err;
      if(response.length!=0)
        res.render('signup',{msg:"注册邮箱已存在"});
      else
         mail.send(email,num); 
    }); 
  }
  catch(e){
    res.render('signup',{msg:e.toString()})
  }
  var emailnum={email:req.body.email,num:num};
  req.session.emailnum=emailnum;
  req.session.save();
})
//点击注册时提交表单，内容包括验证码，密码，确认密码，邮箱地址存在req.session.email.num中
app.post('/signup',function(req,res){
  let user=req.body;
  try{
    error.checkemailnum(user.checknum,req.session.emailnum.num);
    error.checkpassword(user.password,user.passwordagain);
    var newUser=new User({username:req.session.emailnum.email,password:user.password});
    //console.log(user);
    newUser.save(function(err,User){
      if(err) throw err;
      req.session.user={username:req.session.emailnum.email,password:user.password};
      res.redirect('index');
    })
  }catch(e){
    res.render('signup',{msg:e.toString()});
  }
})
app.post('/login',function(req,res){
  let user=req.body;
  User.find({username:user.username,password:user.userpassword},
    function(err,response){
      if(err)
        res.send(err.toString());
      if(response.length==0){
        res.redirect('login');
      }
      else{
        req.session.user={username:user.username,password:user.userpassword}
        res.redirect('index');
      }
    });

})
//渲染主页
app.get('/',function(req,res){
  res.render('login');
})
app.get('/login',function(req,res){
  res.render('login');
})
app.get('/signup',function(req,res){
  res.render('signup');
})
app.get('/index',checkSignIn,function(req,res){
  res.render('index',{user:req.session.user.username});
})
app.get('/admin',function(req,res){
  User.find(function(err,response){
      res.render('admin',{userlists:response});
    });
});


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