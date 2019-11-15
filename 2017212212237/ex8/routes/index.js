var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
var fsPath = "./user.json";
var ckCode="";
var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;

var transporter = nodemailer.createTransport({
    host: 'smtp.163.com', 
    port: 465, // 端口号
    secure: true, 
    auth: {
		user: "hestervvv@163.com", // 发送方邮箱
        pass: "qbd123" // smtp 验证码
    }
});

router.get('/', function(req, res){
	res.render('index');
});

router.post('/sendCode',function(req, res)
{
	if(reg.test(req.body.email))
	{
		ckCode="";
		for(var i=0;i<6;i++)
		{
		    ckCode+=Math.floor(Math.random()*10);
		}
		var address=req.body.email;
	    var mailObj = {
			from: 'hestervvv@163.com', 
			to: address, 
			subject: '您的验证码', 
			text: ckCode, 
		};
		transporter.sendMail(mailObj);
		res.send("验证码发送成功，请登录邮箱查看");
	}
	else
	{
		res.send("非法邮箱");
	}
});

router.post('/', function(req, res){
 
 	if(req.body.checkcode!=ckCode)
 	{
 		res.send("输入的验证码不正确");
 	}
 	else if(req.body.password!=req.body.comfirm)
 	{
 		res.send("输入的两次密码不一致");
 	}
 	else
 	{
 		var str = JSON.stringify(req.body,"","\t");
 		str="\n"+str;
 		fs.appendFile('user.json',str,function(err){
			if (err) {res.status(500).send('Server is error...')}
		})
		res.send("注册成功");
 	}
});

module.exports = router;
