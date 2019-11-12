var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
var ckCode="";
var lastEmail="";
var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;


var transporter = nodemailer.createTransport({
  host: 'smtp.163.com', 
  secure: true, 
  auth: {
      user: '839281559@qq.com',
      pass: '123456'
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

router.post('/', function(req, res){
 	if(req.body.email!=lastEmail)
 	{
 		res.send("输入邮箱不正确");
 	}
 	else if(req.body.checkcode!=ckCode)
 	{
 		res.send("验证码不正确！");
 	}
 	else if(req.body.password!=req.body.comfirm)
 	{
 		res.send("密码错误");
 	}
 	else
 	{
 		var str = JSON.stringify(req.body,"","\t");
 		str="\n"+str;
 		fs.appendFile('user.json',str,function(err){
			if (err) {res.status(500).send('Server is error...')}
		})
		res.send("注册成功了");
 	}
});

module.exports = router;
