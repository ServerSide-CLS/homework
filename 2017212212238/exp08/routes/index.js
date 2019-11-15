var express = require("express");
var sendMail = require("../public/javascripts/sendMail");
var registerck = require("../public/javascripts/register");
var router = express.Router();

router.get("/", (req, res) => {
    res.render('index', { layout: 'default' })
})

router.post("/check", (req, res) => {
    let email = req.body.email;
    try {
      console.log("1111");
        let code = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);//随机数生成
        sendMail.send(email, code, (state) => {
            console.log(state);//debug
            if (state == 1) 
            {
                process.env[email] = code;
                res.send({ msg: "邮件发送成功", code: code });
            } else {
                throw new Error("邮件发送失败");
            }
        })
    } catch (err) {
        res.send({ msg: err.toString(), code: -1 });
    }
})

router.post("/register", (req, res) => {
    let user = req.body;
    try{
      registerck.checkemailnum(user.CAPTCHA,process.env[user.email] );
      registerck.checkpassword(user.password,user.checkPassword);
      // var newUser={account:req.session.emailnum.email,password:user.password,checknum:user.checknum};
     
      // Users.push(newUser);
      registerck.writedata(user);
      res.send({msg:"注册成功"})
    }catch(e){
      res.send({msg:e.toString()});
    }
})

module.exports = router;
