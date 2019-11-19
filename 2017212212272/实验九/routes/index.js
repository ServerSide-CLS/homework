var express = require('express');
var router = express.Router();
var email =require('./email');
var mongoose = require('mongoose');
var User;

mongoose.connect('mongodb://127.0.0.1:27017/user');

var personSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});
var Person = mongoose.model("Person", personSchema);

let code = 100000+parseInt(Math.random()*900000);

function isemail(email){
  if(!email.search(/\S*@\S*\.\S*/)) return true;
  else return false;
}

router.get('/email',(req,res,next) => {
  email.sendMail(req,res,code);
})

router.get('/', function (req, res, next) {
  res.render('signupBody', {
    layout: 'signup',
  });
});

router.get('/login', function(req,res){
  res.render('loginBody', {
    layout: 'login',
  });
})



router.get("/admin",function(req,res){
  Person.find(function(err,response){
    let personList = new Array();
    response.forEach((personItem)=>{
      personList.push({username:personItem.username,email:personItem.email,password:personItem.password});
    });
    res.json(personList);
  });
});

router.post('/', function (req, res) {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let codeid = req.body.code;
    let password = req.body.password;
    let confirm = req.body.confirm;
    if (username == "") {
        res.send('请输入用户名')
    }else if (email == "") {
        res.send('请输入邮箱');
    }else if(codeid == ""){
        res.send('请输入验证码');
    }else if(password == ""){
        res.send('请输入密码');
    }else if(confirm == ""){
        res.send('请再输入一遍密码');
    }
    if(isemail(email))
    {
      if (codeid == code) {
        if (password == confirm) {
          Person.find({ email: email }, function (err, data) {
            if (err) {
              console.log(err)
            } else {
              if (data.length != 0) {
                res.send("邮箱已被注册");
              }
              else{
                Person.create({
                  username: username,
                  email: email,
                  password: password
                }, function (err, data) {
                  if (err) {
                    console.log(err)
                  }
                  else{
                    res.redirect('/login')
                  }
                });
              }
            }
          })
          
        } else {
            res.send('密码不一致');
        }
      } 
      else {
          res.send('验证码错误');
      }
    } else{
      res.send("请输入正确的邮箱");
    }
});

router.post('/logincheck',function(req,res){
  let user = req.body.user;
  let passwd =req.body.password;
  Person.find({ email: user }, (err, response) => {
    if (response.length == 0) {
      res.send("没有该用户");
    }
    else if (response[0].password != passwd) {
      res.send("密码错误");
    }
    else {
      User=user;
      res.redirect('/index');
    }
  })
})

router.get('/index', function(req,res){
  res.render('indexBody', {
    layout: 'index',
    user: User
  });
})

module.exports = router;
