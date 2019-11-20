var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var nodemailer = require('nodemailer');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/demo');
var check_code;
var personSchema = mongoose.Schema({
   username: String,
   password: String,
});
var Person = mongoose.model("users", personSchema);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});
router.get('/admin', function(req, res, next) {
  Person.find(function(err, response){
    let info = "";
    for(let each in response) {
        info += "用户名:" + response[each].username + "<br>"+"密码:" + response[each].password + "<br><br>";
    }
    res.send(info);
  });
});
router.post('/', function(req, res, next) {
   	let code = req.body.code;
   	let pwd = req.body.pwd;
   	let apwd = req.body.apwd;
   	if(pwd == apwd){
   		if(code == check_code){
        var newPerson = new Person({
         username: req.body.email,
         password: req.body.pwd
        });
        newPerson.save(function(err, Person){
          if(err)
            res.render("注册失败");
         else
            res.render('signup',{layout: 'login'});//注册成功就跳转到登录界面
        });
   		}else{
   			res.send("验证码错误");
   		}
   	}else{
   		res.send("两次密码不一样");
   	}
});
router.post('/sendCode', function(req, res, next) {
	let email = req.body.email;
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(reg.test(email)){
      Person.find({username: email}, 
         function(err, response){
            if (response == "") { //如果数据库中没有这个用户名
              sendCode(email);
              res.send("1");
            }else{  //如果数据库中有这个用户名
              res.send("2");
            }
      });
		  
    }else{
    	res.send("0");
    }
   	
});
router.post('/login', function(req, res, next) {
    let username = req.body.username;
    let pwd = req.body.pwd;
    Person.find({username:username}, 
    function(err, response){
        if (response[0].password == pwd) {
            res.render('signup',{layout: 'index'});
        }else{
            res.render('signup',{layout: 'login'});
        }
    });
});
function sendCode(email) {
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '905430093@qq.com',
            pass: 'ujmjompglvvzbbbh' 

        }
    });
    var code = "";
    while (code.length < 4) {
        code += Math.floor(Math.random() * 10);
    }
    check_code = code;
    console.log(code);
    var mailOptions = {
        from: '905430093@qq.com', 
        to: email, 
        subject: '验证码', 
        html: "验证码为：" + code
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            console.log(code);
            return;
        }
    });

}

module.exports = router;
