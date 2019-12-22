var nodemailer=require("nodemailer");
var express = require('express');
var app=express();
var bodyParser=require("body-parser");
var fs=require('fs');
var router = express.Router();
var transporter=nodemailer.createTransport({
	host:"smtp.163.com", 
	secureConnection:false, 
	port:465,
	auth:{
		user:"qwe15325223309@163.com",
		pass:"haowei1818"
	}
});
module.exports = {
	sendEmails(req,res,code){
		var EMAIL=req.query.email;
		var mailOption={
			from:"qwe15325223309@163.com",
			to:EMAIL,
			subject:"注册校验码",
			html:"<h1>【NDSC】欢迎注册NDSC IT论坛，您的注册验证码为(Welcome to register for NDSC it forum. Your registration verification code is): "+code+" 如非本人操作，请忽略这条信息，希望您在论坛中使用愉快！</h1>"+"<p>谢谢！NDSC团队</p>"
		};
		transporter.sendMail(mailOption,function(error,info){
			if(error){
				return console.info(error);
			}
		})
	}
}