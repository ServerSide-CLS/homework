var express = require('express');
var router = express.Router();
var sendMail = require('../public/javascripts/sendmail');
const Person = require("../public/javascripts/dbcon");

//注册helper
var handlebars = require("handlebars");

var code;//验证码

handlebars.registerHelper(
  'js', function(str, option) {
  var jsList = this.jsList || [];
  if(jsList.indexOf(str)<0) {
    jsList.push(str);
  }
  this.jsList = jsList.concat();
});

handlebars.registerHelper('css', function(str, option) {
  var cssList = this.cssList || [];
  if(cssList.indexOf(str)<0) {
    cssList.push(str);
  }
  this.cssList = cssList.concat();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'my ex9' });
});

router.post('/varify',function(req,res){
    let reqBody = req.body;
    let email = reqBody.email,
    pwd = reqBody.pwd1,
    pwdConfirm = reqBody.pwd2,
    checkNum = reqBody.code;
    if(pwd!=pwdConfirm){
        res.send({status:"error",reason:"pwd is not same"});
    }
    else if(!checkEmail(email)){
        res.send({status:"error",reason:"email does not meet the requirements"});
    }
    else if(checkNum != code){
        res.send({status:"error",reason:"code is not same"});
    }
    else{
      saveIntoDB(email,pwd).then((result)=>{
        console.log(result);
          res.send('200');
      }).catch((err)=>{
        console.log(err);
          res.send(JSON.parse(err));
      });
    }
})

router.post('/sendMail',function(req,res){
  console.log(req.body.addr);
  code = sendMail(req.body.addr);
  res.cookie('time', Date.now()).send('cookie set'); //Sets name = express
})

router.get("/admin",function(req,res){
  Person.find(function(err,Person){
      res.json(Person);
  });
});

module.exports = router;

//检查邮箱格式
function checkEmail(email){
  let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!check.test(email))
    return false;
return true;
}
//检查邮箱是否存在
router.post("/checkEmail",function(req,res){
  let email = req.body.email;
  Person.find({email:email},function(err,response){
      //若不存在
      if(response.length == 0){
          res.send("notExist");
      }
      else{
          res.send("exist");
      }
  });
});

//写入数据库
function saveIntoDB(email,pwd){
  return new Promise((resolve,reject)=>{
      let person = new Person({
          email:email,
          pwd:pwd
      });
      person.save(function(err,person){
          if(err){
              reject(JSON.stringify({status:"error",reason:err}));
          }
          else{
              resolve(JSON.stringify({status:"success",res:"200"}));
          }
      });
  });
}
