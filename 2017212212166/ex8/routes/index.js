var express = require('express');
var router = express.Router();
var sendCode = require('../public/javascripts/sendCode');
var fs = require('fs');


router.get('/', function(req, res, next) {
  res.render('index', { title: '注册' });
});

router.post('/register',function(req,res){
  //验证密码
  if(req.body.password!=req.body.repeatPassword){
    res.send("401");
  }
  //验证邮箱，验证码
  else if(code!=req.body.code || req.body.originAddr!=req.body.email){
    res.send("402");
  }

  var params = {
    "email":req.body.email,
    "password":req.body.password
  }
  writeJson(params);
  res.send("200");
})

router.post('/sendCode',function(req,res){
  //验证码
  code = sendCode(req.body.addr);
  res.send(code);
})


function writeJson(params){
      //读data
      fs.readFile('data.json',function(err,data){
          if(err){
            res.send("403");
          }
          //二进制的数据转换为字符串
          var person = data.toString();
          //字符串转换为json对象
          person = JSON.parse(person);
          //将传来的对象push进数组对象中
          person.data.push(params);
          //账号总数
          person.total = person.data.length;
          console.log(person.data);
          //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
          var str = JSON.stringify(person);
          fs.writeFile('data.json',str,function(err){
              if(err){
              res.send("403");
              }
              res.send("200");
          })
      })
  }


module.exports = router;