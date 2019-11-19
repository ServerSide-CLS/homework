var express = require('express');
var router = express.Router();
var tools = require('../server/tools');
var Person = require('../server/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup',{emailConfirm: ''});
});

router.post('/', function(req, res){
  
      var confirmEmail  = tools.Format(req.body.email);   //email格式验证
      var confirmPwd = tools.Confirm(req.body.password,req.body.Cpassword); //密码确认
      var confirmCode = tools.Confirm(req.body.confirm, req.session.code);  //验证码验证


      if(confirmEmail && confirmPwd && confirmCode){
          console.log('注册成功！')

          var msg = {
              userName: req.body.userName,
              password: req.body.password,
              email: req.body.email,
          }

          var newPerson = new Person(msg);
          //注册成功写入用户信息
          //tools.FileJson(msg);
          newPerson.save(function(err, Person){
            if(err)
               res.send("Database error")
            else{
                console.log(Person)
                res.redirect('/login');
            }
                
         });
         
      }
      else{
          var error = (confirmEmail?"":"email格式错误 ") + "<br>" + (confirmPwd?"":"两次密码不匹配 ") + "<br>" +  (confirmCode?"":"验证码错误");
          console.log(confirmEmail, confirmPwd,confirmCode);
          console.log(error);
          res.send(error);
      }



});


module.exports = router;
