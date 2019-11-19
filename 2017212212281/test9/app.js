const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");
const Email = require("./public/js/email.js");
const Person = require("./public/js/connection.js");
var userData;
var code;//验证码
// 监听端口
app.listen("3000");
//资源开放Email
app.use("/node_modules/",express.static(path.join(__dirname,"node_modules")));
app.use("/public/",express.static(path.join(__dirname,"public")));
app.use("/userData/",express.static(path.join(__dirname,"user")));
app.use("/db/",express.static(path.join(__dirname,"db")));

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
//登录
app.get("/login.html",function(req,res){
     res.render("login",{layout:"default"});
});
app.get("/index.html",function(req,res){
     res.render("index",{layout:"default"});
});
app.post("/loginCheck",function(req,res){
 	let reqBody = req.body;
    let email = reqBody.Email,
    pwd = reqBody.pwd;
    Person.find({email:email},function(err,response){
		console.log(response);
        if(response.length == 0){
            res.send("notExist");
        }
        else{
            if(response[0].pwd!=pwd){
                res.send("fail");
            }
            else{
               res.send("success");
            }
        }
    });
});
//查询用户列表
app.get("/admin",function(req,res){
    Person.find(function(err,response){
        let personList = new Array();
        response.forEach((personItem)=>{
            personList.push({Email:personItem.email,pwd:personItem.pwd});
        });
        res.json(personList);
    });
});
//注册表单提交
app.post("/registerPost",function(req,res){
    let reqBody = req.body;
    let email = reqBody.email,
    pwd = reqBody.pwd,
    pwdConfirm = reqBody.pwdConfirm,
    checkNum = reqBody.checkNum;
    if(pwd!=pwdConfirm){
        res.send({status:"error",reason:"两次密码不同"});
    }
    else if(!checkEmail(email)){
		console.log(email);
        res.send({status:"error",reason:"邮箱格式有误"});
    }
    else if(checkNum != code){
        res.send({status:"error",reason:"验证码有误"});
    }
    else{
		Person.find({email:email},function(err,response){
       		if(response.length == 0){
           		saveIntoDB(email,pwd).then((result)=>{
            		res.send(JSON.parse(result));
       			}).catch((err)=>{
            		res.send(JSON.parse(err));
        		});
        	}
        	else{
        	    res.send({status:"error",reason:"用户已存在"});
        	}
   		});
    }
});

//获取验证码
app.post("/getCode",function(req,res){
    let email = req.body.email;
    let sendResult = Email(email);
    code = sendResult.code;
	console.log(code);
    if(sendResult.status == 200){
		console.log("200");
        res.status(200).send("success");
    }
    else{
		console.log("500");
        res.status(500).send("error");
    }
});
//检查邮箱格式
function checkEmail(email){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(!reg.test(email)){
        return false;
    }
    return true
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
