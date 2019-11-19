var express = require('express');
var router = express.Router();
var email =require('./email');
var fs = require("fs");
let code = 100000+parseInt(Math.random()*900000);

function isemail(email){
  if(!email.search(/\S*@\S*\.\S*/)) return true;
  else return false;
}

function writein(username,email,password){
	var userString = JSON.stringify(userData);
	var str = userString.slice(0,-1)+","+JSON.stringify({"username":username,"email":email,"password":password})+userString.slice(-1);
	fs.writeFileSync("./user.json",str);
}

router.get('/email',(req,res,next) => {
  email.sendMail(req,res,code);
})

router.get('/', function (req, res, next) {
  res.render('signupBody', {
    layout: 'signup',
  });
});

router.post('/', function (req, res) {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let codeid = req.body.code;
    let password = req.body.password;
    let confirm = req.body.confirm;
    if (username == "") {
        res.send('请输入用户名')
    }else if (email == "") {
        res.send('请输入邮箱');
    }else if(codeid == ""){
        res.send('请输入验证码');
    }else if(password == ""){
        res.send('请输入密码');
    }else if(confirm == ""){
        res.send('请再输入一遍密码');
    }
    if(isemail(email))
    {
      if (codeid == code) {
        if (password == confirm) {
          fs.readFile("./user.json", function (err, data) {
            if(err){
            　console.log(err);
            } else {
              userData=JSON.parse(data);
              let flag=true;
              for(let i=0;i<userData.length;i++){
                let record=userData[i];
                if(record['email']==email)
                  flag=false;
              }
              if(flag){
                res.send({status:"success"});
                writein(username,email,password);
              }else{
                 res.send("邮箱已被注册");
              }
      　　	}
          });  
        } else {
            res.send('密码不一致');
        }
      } 
      else {
          res.send('验证码错误');
      }
    } else{
      res.send("请输入正确的邮箱");
    }
});
module.exports = router;
