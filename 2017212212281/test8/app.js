const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");
const Email = require("./public/js/email.js");
const fs = require("fs");
var userData;
var code;//验证码
// 监听端口
app.listen("3000");
//资源开放Email
app.use("/node_modules/",express.static(path.join(__dirname,"node_modules")));
app.use("/public/",express.static(path.join(__dirname,"public")));
app.use("/userData/",express.static(path.join(__dirname,"user")));

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
		//checkUserData
		fs.readFile("./userData/user.json", function (err, data) {
　　	if(err){
　　　　	console.log(err);
　　	} else {
			userData=JSON.parse(data);
			let flag=true;
			for(let i=0;i<userData.length;i++){
				let record=userData[i];
				if(record['email']==email)
					flag=false;
			}
			if(flag){
				res.send({status:"success"});
    	    	writeIntoUser(email,pwd);
			}else{
				 res.send({status:"error",reason:"用户已存在"});
			}
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
//写入json
function writeIntoUser(email,pwd){
	var userString = JSON.stringify(userData);
	var str = userString.slice(0,-1)+","+JSON.stringify({"email":email,"pwd":pwd})+userString.slice(-1);
	fs.writeFileSync("./userData/user.json",str);
}
