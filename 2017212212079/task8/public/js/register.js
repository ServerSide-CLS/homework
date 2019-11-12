$(document).ready(function () {
    var waitTime = 30;
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
        $(this).attr("disabled",true);
        let checkTime = window.setInterval(function(){
            let tempStr = (waitTime--) + "s后可重新获取";
            $("#waitTimeTip").html(tempStr);
        },1000);
        setTimeout(function(){
            window.clearInterval(checkTime);
            $("#waitTimeTip").html("");
            $("#getCode").attr("disabled",false);
            $("#getCode").text("获取验证码");
        },30000);
    });
    $("#registerConfirm").click(function(){
        let email = $("#Email").val(),
        pwd = $("#pwd").val(),
        pwdConfirm = $("#pwdConfirm").val(),
        checkNum = $("#checkNum").val();
        $.post("/formPost",
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