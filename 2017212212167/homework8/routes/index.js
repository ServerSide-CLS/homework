var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
var fsPath = "./user.json";
var ckCode="";
var lastEmail="";
var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;

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
 		var str = JSON.stringify(req.body,"","\t");
 		str="\n"+str;
 		fs.appendFile('user.json',str,function(err){
			if (err) {res.status(500).send('Server is error...')}
		})
		res.send("注册成功(*^▽^*)！");
 	}
});

module.exports = router;
