var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
var fsPath = "./user.json";
var ckCode="";
var lastEmail="";
var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/gxy_db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',() => {
   console.log('connceted to database.')
});

var userSchema = mongoose.Schema({
	email: String,
    password: String,
});

var User = mongoose.model("User", userSchema);

router.get('/login', function(req, res){
    res.render('login',{
        layout:false,
    });
});

router.post('/login', function(req, res){
	var userInfo = req.body;
	if(!userInfo.email || !userInfo.password)
	{
		res.send("信息不完整QAQ");
	}
	else
	{	
		User.find(function(err, response){
			var flag=0,isChecked=0;
			for(var i in response)
			{
				if(userInfo.email==response[i].email)
				{
					flag=1;
					if(userInfo.password==response[i].password)
						isChecked=1;
					break;
				}
			}
			if(flag==1)
			{
				if(isChecked==1)
					res.send("1");
				else
					res.send("密码不正确！");
			}
			else
			{
				res.send("用户不存在，快去注册吧！");
			}
    	});
	}
});

router.get('/admin', function(req, res){
	User.find(function(err, response){
		var str="",id=0;
		for(var i in response)
		{
			str+="user"+(++id)+":<br/>";
			str+="e-mail address: "+response[i].email+"<br/>";
			str+="password: "+response[i].password+"<br/><br/>";
		}
    	res.send(str);
   });
});

router.get('/index', function(req, res){
	res.render('indexPage',{
        layout:false,
    });
});

var transporter = nodemailer.createTransport({
    host: 'smtp.163.com', 
    port: 465, // 端口号
    secure: true, 
    auth: {
        user: "duoduobao25@163.com", // 发送方邮箱地址
        pass: "gxy123" // smtp 验证码
    }
});

router.get('/', function(req, res){
	res.render('index');
});

router.post('/sendCode',function(req, res)
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
			from: 'duoduobao25@163.com', // 发送方邮箱及标题
			to: address, // 对方邮箱地址
			subject: '验证码来啦！', // 
			text: ckCode, // 邮件内容
		};
		transporter.sendMail(mailObj);
		res.send("验证码邮件发送成功，请登录邮箱查看验证码>.<");
	}
	else
	{
		res.send("请输入正确的邮箱地址！");
	}
});

router.post('/', function(req, res){
 	if(req.body.email!=lastEmail)//邮箱不一致
 	{
 		res.send("邮箱不一致！");
 	}
 	else if(req.body.checkcode!=ckCode)//验证码不正确
 	{
 		res.send("验证码不正确！");
 	}
 	else if(req.body.password!=req.body.comfirm)//两次密码不一致
 	{
 		res.send("两次密码不一致！");
 	}
 	else
 	{
 		var flag=false;
		var s=req.body.email;
		User.find(function(err, response){
			for(var i in response)
			{
				if(s==response[i].email)
				{
					flag=true;
					break;
				}
			}
			if(flag==true)
	   		{
	   			res.send("这个邮箱已经被注册过了qwq");
	   		}
	   		else
	   		{
	   			var newUser = new User({
			       	email: req.body.email,
			        password: req.body.password,
			    });
			    newUser.save(function(err, Person){
		            if(err) res.render('showmsg', {message: "Database error", layout:false,type: "error"});
		      	});
	   			res.send("注册成功(*^▽^*)！");
	   		}
    	});
 	}
});

module.exports = router;
