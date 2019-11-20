var express = require('express');
var router = express.Router();
var app = express();
const Handlebars = require('handlebars')
var nodemailer = require('nodemailer');
var fs = require('fs');
let cookieParser = require("cookie-parser")
var bodyParser = require('body-parser');
var session = require('express-session');
const jsdom = require('jsdom');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user');

var check_code;

var personSchema = mongoose.Schema({
   name: String,
   password: String,
});
var Person = mongoose.model("users", personSchema);

const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
const $ = require('jquery')(window);
var c_code;


var codeMap = new Map();


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/admin', function(req, res, next) {
  Person.find(function(err, response){
    let info = "";
    for(let each in response) {
        info += "用户名:" + response[each].name + "<br>"+"密码:" + response[each].password + "<br><br>";
    }
    res.send(info);
  });
});


//发送验证码
function sendCode(email) {
    var code = "";
    while (code.length < 6) {
        code += Math.floor(Math.random() * 10);
    }
    c_code = code;
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '740185140@qq.com',
            pass: 'cblumftpnzgebcib' //授权码,通过QQ获取

        }
    });
    var mailOptions = {
        from: '740185140@qq.com', // 发送者
        to: email, // 接受者,可以同时发送多个,以逗号隔开
        subject: '注册', // 标题
        html: "<h1>欢迎注册，您本次的注册验证码为：" + code + "</h1>"
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            throw console.error(err);
        }
    });
}

router.post('/sendCode', function(req, res, next) {
	let email = req.body.email;
  Person.find({name: email},
  function(err, response){
            if (response == "") { //如果数据库中没有这个用户名
              sendCode(email);
            }else{  //如果数据库中有这个用户名
              res.send("0");
            }
      }); 
});

router.post('/login', function(req, res, next) {
    let username = req.body.username;
    let pwd = req.body.pwd;
    Person.find({name:username}, 
      function(err, response){
          if (response[0].password == pwd) {
              res.render('index',{layout: 'index'});
          }else{
              res.render('index',{layout: 'login'});
          }
      });
});

router.post('/', function(req, res, next) {
   	let code1 = req.body.code1;
   	let PWD = req.body.PWD;
   	let RE_PWD = req.body.RE_PWD;
    let email = req.body.E_mail;
   	if(PWD == RE_PWD){
   		if(code1 == c_code){
        var newPerson = new Person({
         name: email,
         password: req.body.PWD
        });
	   		newPerson.save(function(err, Person){
		        if(err)
		            return console.error(err);
		        else
            res.render('index',{layout: 'login'});//注册成功就跳转到登录界面
        });
   		}else{
   			res.send("验证码错误");
   		}
   	}else{
   		res.send("两次密码不一样");
   	}
});

module.exports = router;
