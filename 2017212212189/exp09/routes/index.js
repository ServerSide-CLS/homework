var nodemailer=require("nodemailer");
var express = require('express');
var mongoose=require('mongoose')
var fs=require('fs');
var router = express.Router();


//邮件验证码
let code="";

//发邮件的一些设置
var transporter=nodemailer.createTransport({
  host:"smtp.qq.com", //qq smtp服务器地址
  secureConnection:false, //是否使用安全连接，对https协议的
  port:465, //qq邮件服务所占用的端口
  auth:{
      user:"1006166176@qq.com",//开启SMTP的邮箱，用来发送邮件
      pass:"cnldxqguxfzbbcbg"//授权码
}
});

//mongoose连接的一些操作
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})
mongoose.connection.on('error', () => {
  console.log('MongoDB connected error.')
})
mongoose.connect('mongodb://localhost/new_db',{useNewUrlParser: true,useUnifiedTopology: true})
var personSchema=mongoose.Schema({
  email:String,
  pwd:String
});
var Person=mongoose.model("Person",personSchema)

/**
 * GET /
 * 显示注册页面
 * */
router.get('/', function(req, res, next) {
  res.render("signUp",{ js: ["/javascripts/jquery-3.3.1.min.js",'/javascripts/myJS.js']});
});

/**
 * POST /
 * 验证各项信息是否合法
 */
router.post('/', function(req, res, next) {
  let email=req.body.email;
  let checkCode=req.body.checkCode;
  let pwd=req.body.pwd;
  let comfirmPwd=req.body.comfirmPwd;
   message="";

  //验证各项信息的合法性
  let reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if(!reg.test(email))
    message+="邮箱不合法 "
  if(checkCode!=code||code=="")
    message+="验证码错误 "
  if(pwd!=comfirmPwd||pwd=="")
    message+="密码不一致 "
  
  Person.find((err,response)=>{
    for(var i=0;i<response.length;i++){
      if(response[i]["email"]==email){
        message+="该邮箱已被注册过了 " 
          break
      }
    }
  
  if(message!="")   //如果各项信息不合法则显示错误提示
    res.render('signUp',{message:message,js: ["/javascripts/jquery-3.3.1.min.js",'/javascripts/myJS.js']})
  else{            //验证通过和用户信息加入数据库成功后，渲染注册成功信息
    
    var newPerson=new Person({
      "email":email,
      "pwd":pwd
    })

    newPerson.save((err,Person)=>{
      if(err)
        res.render('showmsg',{msg:"Database error",type:"error"})
      else 
        res.render('showmsg',{msg:"New Person added",type:"success"})
    })

   }
  })
});

/**
 * Get /sendMail
 * 发送邮件
 */
router.get('/sendEmail',(req,res,next)=>{

  while(code.length<5){
      code+=Math.floor(Math.random()*10);
  }
  var mailOption={
      from:"1006166176@qq.com",
      to:req.query.email,//收件人
      subject:"注册校验码",//纯文本
      html:"<h1>欢迎注册XX系统，您本次的注册验证码为："+code+"</h1>"
  };
  transporter.sendMail(mailOption,function(error,info){
      if(error){
          return console.info(error);
      }
  })

})

/**
 * Get /login
 * 显示登录页面
 */
router.get('/login',(req,res,next)=>{
  res.render("login")
})

/**
 * POST /login
 * 验证用户密码
 */
router.post('/login',(req,res,next)=>{
  let email=req.body.email
  let pwd=req.body.pwd

  Person.find({email:email},(err,response)=>{
    if(response.length==0)
      res.render('login',{message:"该用户没有注册"})
    else if(response[0].pwd!=pwd)
      res.render('login',{message:"密码错误"})
    else
      res.render('index',{user:email})
  })
})

/**
 * Get /admin
 * 显示用户列表
 */
router.get('/admin',(req,res,next)=>{
  str="<table border='1'>"
  str+="<tr><td>email</td><td>pwd</td></tr>"
  Person.find((err,response)=>{
    for(var i=0;i<response.length;i++){
      str+="<tr><td>"+response[i].email+"</td>"
      str+="<td>"+response[i].pwd+"</td></tr>"
    }
    str+="</table>"
    res.send(str)
  })
})
module.exports = router;
