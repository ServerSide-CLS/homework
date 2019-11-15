var express = require('express');
var router = express.Router();
var a = require('../public/javascript/sixNum.js');
var fs=require('fs');
var userfile="user.json";

//渲染home表单到初始页面的body
router.get('/', function(req, res,next){
  res.render('home',{
  })
});

router.post('/', function(req, res){
  //初始化表单

  //判断邮箱格式、验证码、密码和确认密码是否相等
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;//用来判断
  var isInUser = false;//isIisnUser判断email是否已经注册
  //打开user.json文件并读取
  fs.readFile(userfile,function(err,data){
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);//将字符串转换为json对象

    var length = person.data.length;
    for(var i=0; i < length; i++){
      if(req.body.email == person.data[i].user){
        isInUser = true;
      }
    }
    if(reg.test(req.body.email)){
      if(!isInUser){
        if(req.body.pwd == req.body.pwd_again){
          if(req.body.ValidateCode == a.sixNum){
            res.send("注册成功");
            //往user.josn文件里写入用户名和密码
            var params = {
              user:req.body.email,
              password:req.body.pwd
            };
            person.data.push(params);//将传来的对象push进数组对象中
            //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(userfile,JSON.stringify(person,"","\t"),function(err){
              if(err){
                  console.error(err);
              }
              console.log('----------新增成功-------------');
            })
          }
          else{
            res.send("注册失败");
          }
        }
        else{
          res.send("两次密码不匹配");
        }
      }
      else{
        res.send("此邮箱已被注册");
      }
    }
    else{
      res.send("邮箱格式有误");
    }
  });
});

module.exports = router;




