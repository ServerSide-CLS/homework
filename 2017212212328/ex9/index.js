var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var hbs = require('express-handlebars')
var Users = [];

function checkSignIn(req, res, next){
  if(req.session.user){
    next()    //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err)  //Error, trying to access unauthorized page!
  }
}

// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
// 设置handlebars参数
app.engine( '.hbs', hbs( {
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

// 用户注册页面渲染
app.get('/signup', function(req, res){
   res.render('signup');
});

// 用户注册逻辑
app.post('/signup', function(req, res){
  if (Users.length>0) {
    Users.filter((user)=>{
      if(user.id === req.body.id){
        res.render('signup', { message: "User Already Exists!"});
      }else{
        var newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('protected');
      }
    })
  }else{
    var newUser = {id: req.body.id, password: req.body.password};
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect('protected');
  }
});

// 用户登录逻辑
app.post('/login', function(req, res){
  if (Users.length>0) {
    Users.filter((user)=>{
      if(user.id === req.body.id && user.password === req.body.password){
        req.session.user = user;
        res.redirect('/protected');
      }else{
        res.render('login', {message: "Invalid input!"});
      }
    })
   }else{
      res.render('login', {message: "Invalid input!"});
   }
});

// 用户登出页面渲染
app.get('/logout', function(req, res){
  req.session.destroy(()=>{ console.log("user logged out.") });
  res.redirect('/login');
});

// 保护数据页面渲染
app.get('/protected', checkSignIn, function(req, res){
   res.render('protected', {id: req.session.user.id})
});


app.get('/person', function(req, res){
   res.render('person');
});


app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information

   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });

      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

app.use(function(err, req, res, next) {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

app.get('/', function(req, res){
   //创建一个错误并且将其传递到下个函数
   var err = new Error("Something went wrong");
   next(err);
});

/*
 * .... other route handlers and middleware here
 */

//错误处理中间件
app.use(function(err, req, res, next) {
   res.status(500);
   res.send("something went wrong.")
});



var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
  if (err) throw err
  var db = client.db('animals')
  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
  })
})

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_db');

app.get('/person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information

   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });

      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});




app.listen(8000);