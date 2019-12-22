var nodemailer=require("nodemailer");
var express = require('express');
var app=express();
var bodyParser=require("body-parser");
var fs=require('fs');
var path = require('path')
var multer  = require('multer')
var formidable=require("formidable")
var router = express.Router();
var multipart=require('connect-multiparty');
var multipartMidd=multipart(); 
var code="";

//文件连接
var send = require('./sendEmails');
var checkRegister = require('./checkRegister');
var uploadFile = require('./uploadfile');
var login=require('./login');
var Person=require('../mongodb/persondb');
var postTip=require('../mongodb/postdb');
var Personinfo=require('../mongodb/person_info');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//主页面
router.get('/', function(req, res,next) {
	if(req.session.now_user){
		postTip.find(function(err, response){
			Person.find({name:req.session.now_user.id},function(err,response1){
				res.render('home',{is_login:true,id:req.session.now_user.id,is_active1:"active",resq:response,isTable:true,img:response1[0]['headPic']});
			})
		});
	}else{
		postTip.find(function(err, response){
			res.render('home',{is_display:true,active1:"active",resq:response,isTable:true});
		});
	}
});

//登录页面
router.get('/Signin', function(req, res,next) {
	res.render('Signin',{is_display:false});
});

//注册页面
router.get('/register', function(req, res,next) {
	res.render('register',{is_display:false});
});

//注册单项检错，提交注册表单
router.post('/isCorrectRegister', function(req, res,next) {
	checkRegister.checkReg(req,res,Person,code);
});

//发送邮件
router.get('/sendEmail',(req,res,next)=>{
	code=1000 + Math.round(Math.random() * 10000 - 1000);
	send.sendEmails(req,res,code);
});

//用户登录以及session建立
router.post('/isCorrectLogin', function(req, res,next) {
	login.Login(req,res,postTip,Person);
});

//用户登出，摧毁session
router.get('/logout', function(req, res){
	req.session.destroy(()=>{ console.log("user logged out.") });
	res.redirect('/');
});

//用户点击发帖事件，判断是否登录
router.get('/postinfo', function(req, res,next) {
	if(req.session.now_user){
		Person.find({name:req.session.now_user.id},function(err,response){
			res.render('postinfo',{is_login:true,id:req.session.now_user.id,is_active2:"active",img:response[0]['headPic']});
		})
	}else{
		res.render('home',{is_display:true,noLogin:"请先登录再进行发帖操作！",active2:"active"})
	}
});

//发帖
router.post('/upload',function(req, res, next) {
	uploadFile.uploadfile(req,res,postTip);
})

//打开帖子
router.get('/openPost',function(req,res,next){
	var msg=req.query.temp;
	postTip.find({_id:msg},(err,response)=>{
		res.render("postContent",{re:response[0]['title']});
	})
})

//个人主页
router.get('/Personal_homepage',function(req,res,next){
	Person.find({name:req.session.now_user.id},function(err,response){
		var headimg=response[0]['headPic'];
		Personinfo.find({name:req.session.now_user.id},function(err,response1){
			res.render('Per_homepage',{id:req.session.now_user.id,img:headimg});
		})
	})
})

router.post('/change_info',function(req,res,next){
	let realname=req.body.realname;
	let sex=req.body.sex;
	let birth=req.body.birth;
	let place=req.body.place;
	let job=req.body.job;
	let info=req.body.info;
	Person.findOneAndUpdate({name:req.session.now_user.id}, {realname:realname},{sex:sex},{birth:birth},{place:place},{job:job},{info:info}, function(err, response) {
		res.render('Per_homepage');
	});
})
//查看用户表内容
router.get('/admin', function(req, res,next){
	Personinfo.find(function(err, response){
		res.json(response);
	});
});

//删除路由
router.delete('/people/:id', function(req, res,next){
	Person.findByIdAndRemove(req.params.id, function(err, response){
		if(err) res.json({message: "Error in deleting record id " + req.params.id});
		else res.json({message: "Person with id " + req.params.id + " removed."});
	});
});
module.exports = router;