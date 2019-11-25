var fs = require("fs");
var path = require("path");
var us=require("./user.json")
function checkemail(email){
	var flag=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if(!flag.test(email))
		throw new Error("邮箱格式错误");
	
}

function checkemail2(email){
	for (var i = 0,m=us.length; i <m; i++) {
		if(us[i].email==email)
			throw new Error("已注册");
	}
}

function checkpassword(pwd,pwdag){
	if(pwd!=pwdag)
		throw new Error("密码不一致");
}
function checkemailnum(num,reqnum){
	if(num!=reqnum)
		throw new Error("验证码错误");
}
function writedata(data){
	fs.writeFileSync(path.resolve(__dirname + "/user.json"),JSON.stringify(data));
}
module.exports={
	checkemail,
	checkemail2,
	checkpassword,
	checkemailnum,
	writedata
}