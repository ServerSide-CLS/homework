var Person=require('../mongodb/persondb');
var Personinfo=require('../mongodb/person_info');
module.exports = {
	checkReg(req,res,Person,code){
		let username=req.body.reg_username;
		let pwd=req.body.reg_pwd;
		let sPwd=req.body.reg_pwd_again;
		let email=req.body.email;
		let pro_code=req.body.pro_code;
		let is_true=true;
		let msg='';
		let re_username=/^[a-zA-Z][0-9\w\-]{5,17}$/;
		let re_pwd=/^.{6,16}$/;
		let re_email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(!re_username.test(username)){
			is_true=false;
			msg+="用户名输入错误 ";
		}
		if(!re_pwd.test(pwd)){
			is_true=false;
			msg+="密码输入错误 ";
		}
		if(pwd!=sPwd){
			is_true=false;
			msg+="两次密码输入不一致 ";
		}
		if(!re_email.test(email)){
			is_true=false;
			msg+="邮箱输入错误 "
		}
		if(pro_code!=code||code==''){
			is_true=false;
			msg+="验证码输入错误 "
		}
		Person.find((err,response)=>{
			for(var i=0;i<response.length;i++){
				if(response[i]["email"]==email){
					msg+="该邮箱已被注册过了 ";
				}
				if(response[i]["name"]==username){
					msg+="该用户名已被注册过了 ";
				}
			}
			if(is_true){
				var newPerson=new Person({
					name:username,
					pwd:pwd,
					email:email,
					headPic:"/img/person_pic.png"
				});
				var newPerson_info=new Personinfo({
					name: username,
					realname:"",
					sex:"",
					birth:"",
					place:"",
					job:"",
					info:""
				})
				newPerson_info.save(function(err,Personinfo){
					if(err)
						res.render("isCorrectRegister",{fail:"数据库连接失败"});
				})
				newPerson.save(function(err,Person){
					if(err)
						res.render("isCorrectRegister",{fail:"数据库连接失败"});
					else
						res.render("Signin",{register_success:"注册成功!您现在可以登陆了"});
				});
			}else{
				res.render("register",{tips:msg});
			}
		});
	}
}