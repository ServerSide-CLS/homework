var nodemailer=require("nodemailer");
var express = require('express');
var app=express();
var code = "";
var bodyParser=require("body-parser");
var fs=require('fs');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new_db');
var personSchema = mongoose.Schema({
   name: String,
   pwd: String
});
var Person = mongoose.model("Person", personSchema);

var transporter=nodemailer.createTransport({
  host:"smtp.qq.com", 
  port:465,
  auth:{
      user:"1353842553@qq.com",
      pass:"sljlsraessqpebbg"
  }
});
 router.get('/send',(req,res,next)=>{
  var EMAIL=req.query.email;
    var number= ('1234567890abcdefghijklmnopqrstuvwxyz');
    for (var i=0;i<4;i++){
        var num = parseInt(Math.random() * number.length);
        code += number[num];
    }
    transporter.sendMail({
      from:"2351413993@qq.com",
      to:EMAIL,
      subject:"验证码",
      html:"<h1>验证码为："+Code+"</h1>"
    },function (err,info) {
        if(err){
           return console.info(error);
        }
    });

});

router.post('/', function(req, res, next) {
	let email=req.body.email;
	let pro_code=req.body.pro_code;
	let pwd=req.body.pwd;
	let Cpwd=req.body.Cpwd;
    let regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  Person.find({name:email},function(err,response){
      if(response.length!=0){
       res.render('index',{message:"该邮箱已存在"});
      }
     else if(!regEmail.test(email)){
  	   res.render('index',{message:"邮箱格式错误"});
      }
     else if(pro_code!=code||code==""){
  	   res.render('index',{message:"验证码错误"});
      }
     else if(pwd!=Cpwd||pwd==""){
  	   res.render('index',{message:"密码不一致"});
      }
     else{
    	var newPerson=new Person({
      		name:email,
      		pwd:pwd
   		 });
    	newPerson.save(function(err,Person){
      		if(err)
        		res.render('index',{message:"error"});
      		else
       		 res.render('index',{message:"注册成功"});
    		});
  	// fs.writeFileSync("user.json",JSON.stringify({'email':email,'pwd':pwd}));
  		}
	});

});

 router.get('/login',(req,res,next)=>{
  res.render("login")
});

 router.post('/login',(req,res,next)=>{
  let email=req.body.email;
  let pwd=req.body.pwd;
  Person.find({name:email},function(err,response){
      if(response.length==0){
        res.render("login",{lmessage:"该邮箱不存在"})
      }
      else{
        if(response[0].pwd!=pwd){
          res.render("login",{lmessage:"密码输入不正确"})
        }
        else{
          res.render("index1");
        }
      }
     })
});
router.get('/index',(req,res,next)=>{
  res.render("index1")
});
 router.get('/admin', function(req, res,next){
   Person.find(function(err, response){
      res.json(response);
   });
});

module.exports = router;

