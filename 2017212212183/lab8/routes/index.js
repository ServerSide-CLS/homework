var express = require('express');
var router = express.Router();
var fs=require('fs');
let sendMail=require('./nodemailer');
let Code="000000";

function createCode(){
   let str="";
   for(let i=0;i<6;i++){
      str+=Math.floor(Math.random()*10);
   }
   return str;
}

function emailTest(email) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(email);
}

router.get('/email', function(req, res, next) {
   //res.render('index', { title: 'Express' });
    Code=createCode();
   console.log(Code);
   sendMail.sendMailFn(req,res,Code);
});

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index');
});

var http=require("http");
var url=require("url");

router.post('/',function (req,res) {
   //console.log("yyy1");
   let email=req.body.email;
   let comfirmed=req.body.comfirmed;
   let passWord=req.body.password;
   let code=req.body.code;
   console.log("hhh:"+comfirmed+" "+email);
   console.log("hhh: "+Code+"  "+code);
  if(emailTest(email)){
   if(passWord!=comfirmed){
     res.send("password error,please again!");
   }else{
      if(Code==code){
         res.send("register successfully!");
         console.log("okokokoo")
         fs.readFile('' + 'user.json','utf8',function (err,data) {
             if(err){
                console.log(err);
             }
             var newUser={'email':email,"passwd":passWord}
             var users=JSON.parse(data);
             users.data.push(newUser);
             var userStr=JSON.stringify(users,"","\t")
             console.log(userStr)
             fs.writeFileSync('user.json',userStr);
         })
      }else{
         res.send("please input correct password!");
      }
   }
  }else{
      res.send("please input correct email!");
  }
})




//--------------------------------------------------------------


module.exports = router;
