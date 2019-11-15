var nodemailer=require("nodemailer");
var express = require('express');
var app=express();
var bodyParser=require("body-parser");
var fs=require('fs');
var router = express.Router();
var code='';
var transporter=nodemailer.createTransport({
  host:"smtp.163.com", 
  secureConnection:false, 
  port:465,
  auth:{
      user:"qwe15325223309@163.com",
      pass:"haowei1818"
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
router.get('/', function(req, res, next) {
	res.render("home");
});

router.post('/', function(req, res, next) {
	let email=req.body.email;
	let pro_code=req.body.pro_code;
	let pwd=req.body.pwd;
	let Cpwd=req.body.Cpwd;
	let email_msg="";
	let procode_msg="";
	let pwd_msg="";

  let regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if(!regEmail.test(email))
  	email_msg="邮箱格式不符"
  if(pro_code!=code||code=="")
  	procode_msg="验证码错误"
  if(pwd!=Cpwd||pwd=="")
  	pwd_msg="密码不一致"


  res.render('home',{email_msg:email_msg,procode_msg:procode_msg,pwd_msg:pwd_msg})
  if(email_msg==''&&procode_msg==''&&pwd_msg==''){
  	fs.writeFileSync("user.json",JSON.stringify({'email':email,'pwd':pwd}));
  }
});

 router.get('/sendEmail',(req,res,next)=>{
 	var EMAIL=req.query.email;
 	code=1000 + Math.round(Math.random() * 10000 - 1000);
 	var mailOption={
 		from:"qwe15325223309@163.com",
      to:EMAIL,
      subject:"注册校验码",
      html:"<h1>注册系统，注册验证码为："+code+"</h1>"
  };
  transporter.sendMail(mailOption,function(error,info){
  	if(error){
  		return console.info(error);
  	}
  })

})
 module.exports = router;