/*
code:
401:两次密码输入不一致
402:验证码错误
403:
405:数据库查询出错
406:数据库写入出错
407:邮箱已存在
408:邮箱不存在
*/

var express = require('express');
var router = express.Router();
// var code;
var sendCode = require('../public/javascripts/sendCode');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_db');


var personSchema = mongoose.Schema({
   email: String,
   password: String
});
var Person = mongoose.model("Person", personSchema);


/* GET home page. */


// register
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/sendCode',function(req,res){
  code = sendCode(req.body.addr);
  res.send(code);
});

router.post('/register',function(req,res){
  console.log('我拿到数据了');

  if(req.body.password!=req.body.repeatPassword){
  	res.send("401");
  }
  else if(code!=req.body.code || req.body.originAddr!=req.body.email){
  	res.send("402");
  }

  Person.find({"email": req.body.email}, function(err, response){
  	if(err){
  		res.send("405");
  	}
  	if(response.length == 0){
        var tmpPerson = new Person({
	      "email":req.body.email,
	      "password":req.body.password
        });
        tmpPerson.save(function(err, Person){
          if(err)
            res.send("406");
          else
            res.send("200");
        });
    }else{
    	res.send("407")
    }
  });
})



//login
router.get('/login',function(req,res){
  res.render('login');
})

router.post('/verifyLogin',function(req,res){
  var tmpPerson = req.body;
  Person.find(tmpPerson, function(err, response){
  	if(err){
  		res.send("405");
  	}
    if(response.length==0){
      res.send('408');
    }
    else{
      res.send("200");
    }
  });
})


//home
router.get('/home', function(req, res) {
  res.render('home');
});


//admin
router.get('/admin',function(req,res){
  Person.find(function(err, response){
        res.send(res);
    })
})


module.exports = router;
