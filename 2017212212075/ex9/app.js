const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sendEmails = require("./public/javascripts/sendEmails.js");
let checkCode;

app.listen(8400);
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/views/",express.static(path.join(__dirname,"views")));

app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"));

app.engine(".hbs",hbs({
  extname:".hbs",
  defaultLayout: "default",
  layoutsDir:  __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/"
}));

mongoose.connect('mongodb://localhost:27017/account');
let accountSchema = mongoose.Schema({
    email:String,
    password:String
});
let accountDb = mongoose.model("account",accountSchema);



app.get("/",function(req,res){
  res.render("register",{layout:"default"});
});

app.post('/register',function (req,res) {
  let mail = req.body.mail;
  let pwd = req.body.pwd;
  let repPwd = req.body.repPwd;
  let check = req.body.checkCode;
  let flag = req.body.flag;
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if(pwd !== repPwd){
      res.send({status:"error",why:"两次密码不一致！"});
  }
  else if(!reg.test(mail)){
      res.send({status:"error",why:"邮箱格式错误！"});
  }
  else if(check !== checkCode){
      res.send({status:"error",why:"验证码错误！"});
  }
  else if(!flag){
      res.send({status:"error",why:"邮箱已存在！"});
  }
  else {
    res.send({status:"success"});
    let account = new accountDb({
        email:mail,
        password:pwd
      });
    account.save(function(err){
        console.log('save status:', err ? 'failed' : 'success');
    });
  }

});


app.post('/check',function (req,res) {
  let mail = req.body.mail;
  let result = sendEmails(mail);
  checkCode = result.checkCode;
  if(result.status === 200 ){
    res.status(200).send("success");
  }else {
    res.status(500).send("error");
  }
});

app.post("/checkEmail",function(req,res){
    let email = req.body.email;
    accountDb.find({email:email},function(err,account){
        //若不存在
        if(account.length === 0){
            res.send("No");
        }
        else{
            res.send("Yes");
        }
    });
});

app.get("/admin",function (req,res) {
    accountDb.find(function (err,account) {
      let info = "";
      for(let each in account) {
          info += "邮箱:" + account[each].email + '<br>'+"密码:" + account[each].password ;
      }
      res.send(info);
  })
});

app.post("/login",function (req,res) {
    let ID = req.body.email;
    let password = req.body.password;
    accountDb.find({email:ID},function (err,account) {
        if(account.length ===0){
            res.send("accountError");
        }
        else {
            if(account[0].password !== password){
                res.send("pwdError");
            }
            else {
                res.send("success");
            }
        }
    })
});



