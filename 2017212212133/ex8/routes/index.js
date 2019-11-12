var express = require('express');
var router = express.Router();
var sendCode = require('../public/javascripts/sendCode');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '注册' });
});

router.post('/register',function(req,res){

  if(req.body.password!=req.body.repeatPassword){
  	res.send("401");
  }
  else if(code!=req.body.code || req.body.originAddr!=req.body.email){
  	res.send("402");
  }

  var params = {
    "email":req.body.email,
    "password":req.body.password
  }

  writeJson(params);

  // var str = JSON.stringify(params,null,"\t");
  // console.log(params);
  // console.log("准备写入文件");
  // fs.writeFile('data.json', params, function(err) {
  //   if (err) {
  //     console.log("数据写入失败！");
  //     console.error(err);
  //     res.send("403");
  //   }
  // });
  res.send("200");
})

router.post('/sendCode',function(req,res){
  code = sendCode(req.body.addr);
  res.send(code);
})


function writeJson(params){
      //现将json文件读出来
      fs.readFile('data.json',function(err,data){
          if(err){
            res.send("403");
          }
          var person = data.toString();//将二进制的数据转换为字符串
          person = JSON.parse(person);//将字符串转换为json对象
          person.data.push(params);//将传来的对象push进数组对象中
          person.total = person.data.length;//定义一下总条数，为以后的分页打基础
          console.log(person.data);
          var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
          fs.writeFile('data.json',str,function(err){
              if(err){
              res.send("403");
              }
              res.send("200");
          })
      })
  }


module.exports = router;
