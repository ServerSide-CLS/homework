var express = require("express");
var methods = require("../public/js/methods");
var mail = require("../public/js/mailConfig");
var router = express.Router();

router.get('/', (req,res) => {
   res.render("index.hbs", {layouts: "register"});
});

router.get('/sendEmail/:email', (req, res) => {
   // 本来不打算在这里写逻辑处理，想再method内写成方法在此调用，但是由于回调次数太多无奈在这里写
   try {
      methods.ValidateEmail(req.params.email);
      let code = methods.GenerateCode();
      mail.send(req.params.email, code, (status) => {
         if (status == 200) {
            console.log(req.params.email);
            process.env[req.params.email] = code;
            res.send({msg: "邮件发送成功", code: 200});
         } else {
            throw new Error("邮件发送失败，请检查邮箱地址");
         }
      })
   } catch (err) {
      res.send({msg: err.toString(), code: 500});
   }
});

router.post('/register', (req, res) => {
   let userInfo = req.body;
   let obj = methods.register(userInfo);
   if (obj.code == 200) {
      res.send({msg: obj.msg, code: 200});
   } else {
      res.send({msg: obj.msg, code: 500});
   }
});

module.exports = router;