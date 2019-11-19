var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
var nodemailer = require('nodemailer');
var checkCode="";
var lastEmail="";
var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Ex_9');

var userschema = mongoose.Schema({
	username : String,
	password : String,
});
var User = mongoose.model("User",userschema);

var transporter = nodemailer.createTransport({
	host: 'smtp.163.com', 
	secure: true, 
	auth: {
		user: '839281559@qq.com',
		pass: '123456'
	}
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
 });

app.get('/', function(req, res){
	res.render('index');
});

app.get('/login',(req,res,next)=>{
	res.render("login")
})

app.get('/register', function(req, res, next) {
    res.render('register');
});

app.get('/index', function(req, res, next) {
    res.render('index', {});
});

app.post('/sendCode',function(req, res)
{
	lastEmail=req.body.email;
	if(reg.test(req.body.email))
	{
		ckCode="";
		for(var i=0;i<6;i++)
		{
			ckCode+=Math.floor(Math.random()*10);
		}
		var address=req.body.email;
		var mailObj = {
			from: '839281559@qq.com',
			to: address,
			subject: '验证码', // 
			text: ckCode,
		};
		transporter.sendMail(mailObj);
		res.send("验证码邮件发送成功");
	}
	else
	{
		res.send("输入邮箱地址");
	}
});

app.post('/', function(req, res){
	if(req.body.email!=lastEmail){
		res.send("输入邮箱不正确");
	}else if(req.body.checkcode!=checkCode){
		res.send("验证码不正确！");
	}else if(req.body.password!=req.body.comfirm){
		res.send("密码错误");
	}else{
		var str = JSON.stringify(req.body,"","\t");
		str="\n"+str;
		fs.appendFile('user.json',str,function(err){
			if (err) {res.status(500).send('Server is error...')}
		})
		res.send("注册成功了");
	}
});

app.get('/admin',function(req,res)){
	User.find(function(err, response) {
        res.json(response);
    });
};

app.post('/login', function(req, res) {
    User.find({
		name: req.body.username,
		password: req.body.password
	},function(err, response) {
		console.log(response);
		if (response.length != 0) {
			res.render('index');
		} else {
			res.render('login');
		}
	});
})

app.post('/register', function(req, res) {
    let username  = req.body.username;
    let password = req.body.password;
    let checkCode  = req.body.checkCode;
    
    if (checkCode == "") {
        signUp.signUp(username, password);
    } 
    else showMessage('验证码错误！', res);
    
    res.send(req.body.username + 'signed up'); 
});

module.exports = router;
