var fs = require("fs");
var path = require("path");
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/newdb');
var personSchema = mongoose.Schema({
   name: String,
   pwd: String
});
var Person = mongoose.model("Person", personSchema);
function checkemail(email){
	var flag=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if(!flag.test(email))
		throw new Error("邮箱格式不符合要求");
	
}

function checkpassword(pwd,pwdag)
{
	if(pwd!=pwdag)
		throw new Error("密码不一致");
}
function checkemailnum(num,reqnum){
	if(num!=reqnum)
		throw new Error("验证码错误");
}
function writedata(req,res,email,pwd)
{	console.log(email)
	var newPerson=new Person({
		name:email,
		pwd:pwd
	  });
	  newPerson.save(function(err,Person)
	  {
		if(err)
            return res.render('login', {message: "Database error"});
		else
            res.render('login', {message: "New person added"});
	  });
}
module.exports=
{
	checkemail,
	checkpassword,
	checkemailnum,
	writedata,
	Person
}