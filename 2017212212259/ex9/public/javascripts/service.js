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
 			$("#emailButton").attr("value","验证邮箱有效性");
 			$('#emailButton').attr("disabled",false);
 		}else{
 			$('#emailButton').attr("disabled",true);
 		}
 	}
 }
 function register(){
 	window.location.href = "/";

 }
  function login(){
 	window.location.href = "login";

 }