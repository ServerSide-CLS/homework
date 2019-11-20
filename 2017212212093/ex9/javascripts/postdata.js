$(document).ready(function() {
	var waitTime=30;
	$("#sendCode").click(function() {
		/* Act on the event */
		let email=$("#email").val();
		

		$.post('/getCode', {"email": email}, function(result) {
			/*optional stuff to do after success */
			if(result=="success"){
				$("#sendCode").text("已发送");
			}
			else{
				alert("获取失败");
			}
		});

		setTime();

        function setTime(){
          if(waitTime==0){
            $("#sendCode").attr("disabled",false);
            $("#sendCode").html("发送验证码");
            $("#sendCode").remove("disabled");
            waitTime=30;
            return;

          }else{
            $("#sendCode").addClass('disabled');
            $("#sendCode").attr("disabled",true);
            $("#sendCode").html("重新发送（"+waitTime+")");
            waitTime--;
          }
          setTimeout(setTime,1000);
        }

	});


	$("#formSend").click(function() {
		/* Act on the event */
		$.$.post('/formSend', {"email": $("#email").val(),
			                   "checkCode":$("#check").val(),
			                   "pwd":$("#pwdcode").val(),
			                   "checkPwd":$("#checkpwd").val()},

 			function(result) {
			/*optional stuff to do after success */
			if(result.status=="s"){
				alert("注册成功！");
			}
			else if(result.status=="f"){
				alert(result.reason);
			}
		});
	});
});