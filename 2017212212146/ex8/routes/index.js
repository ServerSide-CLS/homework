var express = require('express');
var path = require('path');
var router = express.Router();
var sendMail = require('./sendmail');
var fs = require('fs'); // 引入fs模块

var code;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/varify',function(req,res){
  console.log(req.body);
  console.log(code);
  var checkEmail=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
　
  if(req.body.pwd1!=req.body.pwd2)
    res.send("err1");
  else if(!checkEmail.test(req.body.email))
    res.send("err2");
  else if(code!=req.body.code)
    res.send("err3");

    console.log("数据格式正确");

    var params = {
      "email":req.body.email,
      "pwd":req.body.pwd1
    }

    fs.readFile(path.join(__dirname,"../public/user.json"),function(err,data){
      if(err){
          console.error(err);
          res.send("500");
      }
      var person = data.toString();//将二进制的数据转换为字符串
      person = JSON.parse(person);//将字符串转换为json对象
      person.data.push(params);//将传来的对象push进数组对象中
      console.log(person.data);
      var str = JSON.stringify(person);//把json对象转换成字符串重新写入json文件中
      fs.writeFile(path.join(__dirname,"../public/user.json"),str,function(err){
          if(err){
              console.error(err);
              res.send("500");
          }
          console.log('新增成功');
          res.send("200");
          code = "";
      })
  })

})

router.post('/sendMail',function(req,res){
  console.log(req.body.addr);
  code = sendMail(req.body.addr);
  res.cookie('time', Date.now()).send('cookie set'); //Sets name = express
})
module.exports = router;
