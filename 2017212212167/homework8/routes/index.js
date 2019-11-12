var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
var fsPath = "./user.json";
var ckCode="";

var transporter = nodemailer.createTransport({
    host: 'smtp.163.com', 
    port: 465, // 端口号
    secure: true, 
    auth: {
        user: "duoduobao@163.com", // 发送方邮箱地址
        pass: "gxy123" // smtp 验证码
    }
});


router.get('/', function(req, res){
	res.render('index');
	for(var i=0;i<6;i++)
	{
	    ckCode+=Math.floor(Math.random()*10);
	}
});

router.post('/sendCode',function(req, res)
{
	console.log(req.body);
	var address=req.body.email;
    	var mailObj = {
		    from: 'duoduobao@163.com', // 发送方邮箱及标题
		    to: address, // 对方邮箱地址
		    subject: '验证码来啦！', // 
		    text: ckCode, // 邮件内容
		};
		transporter.sendMail(mailObj);
});

router.post('/', function(req, res){
    var str = JSON.stringify(req.body,"","\t");
 
    //}
    fs.writeFile('user.json',str,function(err){
		if (err) {res.status(500).send('Server is error...')}
	})
});

module.exports = router;
