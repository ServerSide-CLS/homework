var hbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var app = express();
var upload = multer();
var person = [];
var nodemailer = require('nodemailer');
var newaccount = {email:"",pwd:""};
var accept_code;
var logaccount = {email:"",pwd:""};
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine( '.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir:  __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/account');
var accountSchema = mongoose.Schema({
   email:String,
   pwd:String
});
var accounts = mongoose.model("accounts", accountSchema);
// 解析 application/json
app.use(bodyParser.json()); 

// 解析 url编码
app.use(bodyParser.urlencoded({ extended: true }));

// 解析 multipart/form-data
app.use(express.static('public'));
app.get('/', function(req, res){
   return res.render('form');
});
app.get('/login', function(req, res){
   return res.render('form',{layout:'login'});
});
app.get('/admin', function(req, res){
   accounts.find(function(err, response){
      res.json(response);
   });
});
app.post('/',function (req, res, next) {
	console.log(req.body);
	var fs = require('fs');
	var s_pwd = req.body.s_pwd;
	newaccount.email=req.body.email;
	newaccount.pwd=req.body.pwd;
	if(newaccount.pwd != s_pwd){
                return res.send("两次密码不一致");
	}
	else{
		accounts.find({email: newaccount.email}, function(err, response){
			if(response != ""){
				console.log(response);
				return res.send("邮箱已被注册");
			}
			else{
				if(accept_code != req.body.code){
					return res.send("验证码错误");
				}
				var newAccount = new accounts({
         				email:newaccount.email,
					pwd:newaccount.pwd
      				});
      				newAccount.save(function(err, accounts){
         				if(err){
            					return res.send("Database error");
					}
         				else{
            					return res.send("New person added");
					}
     				});
			}
		});
	}
});
app.post('/sendEmail',function (req, res, next) {
		var transporter = nodemailer.createTransport({  
		    service: 'smtp.163.com',
		    host: "smtp.163.com",
		    secureConnection: true,
		    port:465,
		    auth: {
		        user: 'cuangaiwushe@163.com',
		        pass: 'willwill1'
		    }
		});
		var code = "";
		for(var i=0;i<6;i++)
		{
			code+=Math.floor(Math.random()*10);
		}
		accept_code = code;
                console.log(code);
		var mail = {
		        from: 'cuangaiwushe@163.com',
		        subject: "接受验证码",//邮箱主题
		        to:req.body.email+',cuangaiwushe@163.com',//前台传过来的邮箱
		        text: "ex9验证码"+code//发送验证码
		};
                console.log(mail);
		transporter.sendMail(mail, function(error, info){
			if(error) {
				return console.log(error);
			}
			console.log('mail sent:', info.response);
		});
});
app.post('/login',function (req, res, next) {
	console.log(req.body);
	logaccount.email=req.body.email;
	logaccount.pwd=req.body.pwd;
	accounts.find({email: logaccount.email}, function(err, response){
			if(response == ""){
				console.log(response);
				return res.send("没有此用户");
			}
			else{
				if(response[0].pwd != logaccount.pwd){
					console.log(response);
					console.log(response[0].pwd);
					return res.send("密码错误");
				}
				else{
					return res.render('form',{layout:'index'});
				}
			}
	});
});
app.listen(8000);
