var express = require("express");
var methods = require("../public/js/methods");
var mail = require("../public/js/mailConfig");
var mongoDB = require("../src/mongoConfig");
var router = express.Router();

router.get('/', (req,res) => {
   res.render("registerPart.hbs", {layouts: "register"});
});

router.get('/sendEmail/:email', (req, res) => {
   try {
      methods.ValidateEmail(req.params.email);
      let code = methods.GenerateCode();
      mongoDB.User.find({email: req.params.email}, (err, response) => {
         if(err) {
            res.send({code: 500, msg: err.toString()});
         }
         if (response.length != 0) {
            res.send({code: 500, msg: "该邮箱已被注册!"})
         } else {
            mail.send(req.params.email, code, (status) => {
               if (status == 200) {
                  // process.env[req.params.email] = code;
                  let newUser  = new mongoDB.User({
                     email: req.params.email,
                     password: "-1",
                     code: code,
                     valid: new Date().getTime()/1000
                  });
                  newUser.save(function (err, User) {
                     if (err) {
                        res.send({ msg: err.toString(), code: 500 })
                     } 
                  });
                  res.send({msg: "邮件发送成功", code: 200});
               } else {
                  res.send({msg: "邮件发送失败，请检查邮箱地址", code: 500});
               }
            })
         }
      });
      
   } catch (err) {
      res.send({msg: err.toString(), code: 500});
   }
});

router.post('/register', (req, res) => {
   let userInfo = req.body;
   try {
      methods.ValidateEmail(userInfo.email);
      methods.ValidatePwd(userInfo.pwd1, userInfo.pwd2);
      methods.ValidateCode(userInfo.email, userInfo.code);
      mongoDB.User.find({email: userInfo.email, code: userInfo.code}, (err, response) => {
         if(err) {
            res.send({code: 500, msg: err.toString()});
         }
         if(response.length == 0) {
            res.send({code: 500, msg: "验证码不正确"});
         } else if(response.code == "-1") {
            res.send({code: 500, msg: "该邮箱已注册"});
         } else if(response.valid + 180 < new Date().getTime()/1000) {
            res.send({code: 500, msg: "验证码失效"});
         } else {
            mongoDB.User.updateOne({email: userInfo.email}, {password: userInfo.pwd1, code: "-1"}, (err, response) => {
               if(err) {
                  res.send({code: 500, msg: err.toString()});
               }
               res.send({code: 200, msg: "注册成功!"});
            });
         }
      });
   } catch (err) {
      res.send({msg: err.toString(), code: 500});
   }
});

router.get('/login', (req, res) => {
   res.render("loginPart.hbs", {layouts: "login"});
});

router.post('/toLogin', (req, res) => {
   let user = req.body;
   try {
      methods.ValidateEmail(user.email);
      mongoDB.User.find({email: user.email, password: user.password}, (err, response) => {
      if(err) {
         res.send({msg: err.toString(), code: 500});
      }
      if (response.length == 0) {
         res.send({msg: "邮箱或密码不正确,若没有注册请先注册", code: 500});
      } else {
         res.send({msg: "欢迎登陆", code: 200});
      }
   });
   } catch(err) {
      res.send({msg: err.toString(), code: 500});
   }
});

router.get('/admin', (req, res) => {
   mongoDB.User.find(function(err, response) {
      if(err) {
         res.send("error.hbs", {msg: err.toString()});
      }
      res.render("homePart.hbs", {layouts: "home", userData: response});
   });
});

module.exports = router;