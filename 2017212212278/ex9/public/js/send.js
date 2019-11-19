function send(){
 	var time=180;
 	var email=$("#email").val();
 	$.get('/send',{ email:email})
 	var mytime=setInterval(function(){
 		abc();
 	},1000)
 	function abc(){
 		time--;
 		$("#check").attr("value","请在"+time+"秒后再试");
 		if(time==0){
 			clearInterval(mytime);
 			$("#check").attr("value","验证邮箱有效性");
 			$('#check').attr("disabled",false);
 		}else{
 			$('#check').attr("disabled",true);
 		}
 	}
 }
