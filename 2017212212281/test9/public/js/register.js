$(document).ready(function () {
    var time = 180;
    //点击获取验证码
    $("#getCode").click(function(){
        //获取收件人地址
        let email = $("#Email").val();
        $.post("/getCode",
        {
            "email":email
        },
        function(result){
            if(result == "success"){
                $("#getCode").text("已发送");
            }
            else{
                alert("获取验证码失败");
            }
        });
        //设置按钮冷却时间
        $("#getCode").attr("disabled",true);
		function cd(){
			time--;
			if(time==0){
				$("#getCode").attr("disabled",false);
            	$("#getCode").text("获取验证码");
			}else{
				$("#getCode").text("已发送，"+time+"s后可重发");
			}
		}
		var getCodeCd = setInterval(cd, 1000);
    });
    $("#mailRegister").click(function(){
        let email = $("#Email").val(),
        pwd = $("#pwd").val(),
        pwdConfirm = $("#pwdConfirm").val(),
        checkNum = $("#checkNum").val();
        $.post("/registerPost",
        {
            "email":email,
            "pwd":pwd,
            "pwdConfirm":pwdConfirm,
            "checkNum":checkNum
        },
        function(result){
            if(result.status == "success"){
                alert("注册成功");
            }
            else{
                alert(result.reason);
            }
        });

        return false;
    });
});
