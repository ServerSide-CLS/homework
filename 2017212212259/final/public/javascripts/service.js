//判断用户名输入是否正确
function checkUsername(){
	var username=$("#reg_username").val();
	if(isCorrectUser(username)){
		$("#check_username").html("*用户名输入正常").css("color","green");
	}
	else{

		$("#check_username").html("*用户名输入格式不正常").css("color","red");
	}
}
function isCorrectUser(s){
	var re=/^[a-zA-Z][0-9\w\-]{5,17}$/;
	if(!re.test(s)){
		return false; 
	}
	return true;
}
//判断密码输入是否正确
function checkPwd(){
	var pwd=$("#reg_pwd").val();
	if(isCorrectPwd(pwd)){
		$("#check_pwd").html("*密码输入正常").css("color","green");
	}
	else{

		$("#check_pwd").html("*密码输入格式不正常").css("color","red");
	}
}
function isCorrectPwd(s){
	var re=/^.{6,16}$/;
	if(!re.test(s))
		return false
	return true;
}
function issamePwd(){
	var sPwd=$("#reg_pwd_again").val();
	var Pwd=$("#reg_pwd").val();
	if(sPwd==Pwd){
		$("#check_pwd_again").html("*密码输入一致！").css("color","green");
	}else{
		$("#check_pwd_again").html("*密码输入不一致").css("color","red");
	}
}
//检查邮箱格式
function checkEmail(){
	var email=$("#email").val();
	if(isCorrectEmail(email)){
		$("#check_email").html("*邮箱格式正确").css("color","green");
	}else{
		$("#check_email").html("*邮箱格式不正确").css("color","red");
	}

}
function isCorrectEmail(s){
	var re=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!re.test(s))
		return false
	return true;
}
//发送邮件
function sendEmail(){
	var time=60;
	var email=$("#email").val();
	$.get('/sendEmail',{ email:email})
	var mytime=setInterval(function(){
		subs();
	},1000)
	function subs(){
		time--;
		$("#emailButton").attr("value","请在"+time+"秒后再试");
		if(time==0){
			clearInterval(mytime);
			$("#emailButton").attr("value","发送验证码");
			$('#emailButton').attr("disabled",false);
		}else{
			$('#emailButton').attr("disabled",true);
		}
	}
}
//注销
function quit(){
	window.location.href = "/logout";
}

 //登录，点击登录显示登录框
 $("#login-link").click(function () {
 	$("#login-box").show();
 	$("#shadow").show();
 });
 //关闭登录框，点击关闭按钮关闭
 $("#close-login-btn").click(function () {
 	$("#login-box").hide();
 	$("#shadow").hide();
 });
