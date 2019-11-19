var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mail=require("./routes/sendMails.js");
var check=require("./routes/check.js");
var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',() => {
  console.log('connceted to database.')
});
//保存username和password
var userSchema = mongoose.Schema({
   username:String,
   password:String

});

var User = mongoose.model("User", userSchema);

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

function checkSignIn(req, res, next){
  if(req.session.user){
    next()    
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err)  
  }
}

app.post('/check',function(req,res){
  let email=req.body.account;
  let num=Math.floor(Math.random()*(10000-1000))+1000;


  try{
    check.checkemail(email);
    User.find({username:email},
    function(err,response){
      if(err) throw err;
      if(response.length!=0)
        res.render('signup',{msg:"注册邮箱已存在"})
      else
         mail.send(email,num); 
    }); 
   
  }
  catch(e){
    
    res.render('signup',{msg:e.toString()})
  }
  var emailnum={email:req.body.account,num:num};
  req.session.emailnum=emailnum;
  
  req.session.save();
})

app.post('/signup',function(req,res){
  let user=req.body;
  try{
    check.checkemailnum(user.checknum,req.session.emailnum.num);
    check.checkpassword(user.password,user.passwordagain);
    var newUser=new User({username:req.session.emailnum.email,password:user.password});
    newUser.save(function(err,User){
        if(err)
          res.send("database error");
        else{
          req.session.user={username:req.session.emailnum.email,password:user.password};
          res.redirect('login');
        }
    });

  }catch(e){
    
    res.send({msg:e.toString()});
  }
})

app.post('/login',function(req,res){
  let user=req.body;
  User.find({username:user.username,password:user.userpassword},
    function(err,response){
      if(err)res.send(err.toString());
      
      if(response.length==0){
        res.redirect('login');
      }
      else{
        req.session.user={username:user.username,password:user.userpassword}
        res.redirect('index');
      }
    });

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

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
console.log("Server is running on http://localhost:3000/login")
module.exports = app;
