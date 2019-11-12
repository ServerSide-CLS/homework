const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");
const sendEmail = require("./public/js/sendEmail.js");
const mongoose = require("mongoose");
const Person = require("./public/js/connection");
var code;//验证码
// 监听端口
app.listen("8888");
//资源开放
app.use("/node_modules/",express.static(path.join(__dirname,"node_modules")));
app.use("/public/",express.static(path.join(__dirname,"public")));
app.use("/db/",express.static(path.join(__dirname,"db")));
app.use("/views/",express.static(path.join(__dirname,"views")));

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

//注册表单提交
app.post("/formPost",function(req,res){
    let reqBody = req.body;
    let email = reqBody.email,
    pwd = reqBody.pwd,
    pwdConfirm = reqBody.pwdConfirm,
    checkNum = reqBody.checkNum;
    if(pwd!=pwdConfirm){
        res.send({status:"error",reason:"pwd is not same"});
    }
    else if(!checkEmail(email)){
        res.send({status:"error",reason:"Message format does not meet the requirements"});
    }
    else if(checkNum != code){
        res.send({status:"error",reason:"code is not same"});
    }
    else{
        saveIntoDB(email,pwd).then((result)=>{
            res.send(JSON.parse(result));
        }).catch((err)=>{
            res.send(JSON.parse(err));
        });
    }
});
//获取验证码
app.post("/getCode",function(req,res){
    let email = req.body.email;
    let sendResult = sendEmail(email);
    code = sendResult.code;
    if(sendResult.status == 200){
        res.status(200).send("success");
    }
    else{
        res.status(500).send("error");
    }
});
//检查邮箱是否存在
app.post("/checkEmail",function(req,res){
    let email = req.body.email;
    Person.find({email:email},function(err,response){
        //若不存在
        if(response.length == 0){
            res.send("notExist");
        }
        else{
            res.send("exist");
        }
    });
});
//查询用户列表
app.get("/admin",function(req,res){
    Person.find(function(err,Person){
        res.json(Person);
    });
});
//检查邮箱格式
function checkEmail(email){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(!reg.test(email)){
        return false;
    }
    return true;
}
//写入数据库
function saveIntoDB(email,pwd){
    return new Promise((resolve,reject)=>{
        let person = new Person({
            email:email,
            pwd:pwd
        });
        person.save(function(err,person){
            if(err){
                reject(JSON.stringify({status:"error",reason:err}));
            }
            else{
                resolve(JSON.stringify({status:"success"}));
            }
        });
    });
}