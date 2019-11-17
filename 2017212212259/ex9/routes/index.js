var nodemailer=require("nodemailer");
var express = require('express');
var app=express();
var bodyParser=require("body-parser");
var fs=require('fs');
var router = express.Router();
var code=''
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new_db',{ useNewUrlParser: true,useUnifiedTopology: true });
var personSchema = mongoose.Schema({
   name: String,
   pwd: String
});
var Person = mongoose.model("Person", personSchema);
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
  Person.findOneAndRemove({name: "845666403@qq.com"});
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
  let email_again='';
  let regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  Person.find({name:email},
    function(err,response){
      if(response.length!=0){
        email_again="该邮箱已经被注册";
      }

  if(!regEmail.test(email))
  	email_msg="邮箱格式不符"
  if(pro_code!=code||code=="")
  	procode_msg="验证码错误"
  if(pwd!=Cpwd||pwd=="")
  	pwd_msg="密码不一致"

  if(email_msg==''&&procode_msg==''&&pwd_msg==''&&email_again==''){
    var newPerson=new Person({
      name:email,
      pwd:pwd
    });
    newPerson.save(function(err,Person){
      if(err)
        res.render('showmsg',{message:"Database error"});
      else
        res.render('showmsg',{message:"New person add"});
    });
  	// fs.writeFileSync("user.json",JSON.stringify({'email':email,'pwd':pwd}));
  }
  else{
    res.render('home',{email_msg:email_msg,procode_msg:procode_msg,pwd_msg:pwd_msg,email_again:email_again})
  }
});

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
router.get('/login',(req,res,next)=>{
  res.render("login")
})

router.post('/login',(req,res,next)=>{
  let email=req.body.email;
  let pwd=req.body.pwd;
  Person.find({name:email},
     function(err,response){
      if(response.length==0){
        res.render("login",{emailMsg:"该邮箱不存在"})
      }
      else{
        if(response[0].pwd!=pwd){
          res.render("login",{pwdMsg:"密码输入不正确"})
        }
        else{
          res.render("ok",{success:"登录成功"})
        }
      }
     })
})
 router.get('/admin', function(req, res,next){
   Person.find(function(err, response){
      res.json(response);
   });
});
 router.delete('/people/:id', function(req, res,next){
   Person.findByIdAndRemove(req.params.id, function(err, response){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else res.json({message: "Person with id " + req.params.id + " removed."});
   });
});
 module.exports = router;