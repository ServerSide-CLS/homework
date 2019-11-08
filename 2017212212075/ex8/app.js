const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const sendEmails = require("./public/javascripts/sendEmails.js");
const fs = require("fs");
let checkCode;

app.listen(8400);
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"));

app.engine(".hbs",hbs({
    extname:".hbs",
    defaultLayout: "default",
    layoutsDir:  __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));

app.get("/",function(req,res){
    res.render("register",{layout:"default"});
});

app.post('/register',function (req,res) {
    let mail = req.body.mail;
    let pwd = req.body.pwd;
    let repPwd = req.body.repPwd;
    let check = req.body.checkCode;
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
    else {
        res.send({status:"success"});
        fs.writeFileSync("user.json",JSON.stringify({email:mail,pwd:pwd}));
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