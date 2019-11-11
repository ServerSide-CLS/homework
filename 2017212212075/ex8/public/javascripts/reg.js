$(document).ready(function () {
    $("#btn").click(function () {
        var mail = $("#email").val();
        $.post("/check",{
            "mail":mail
        },function (result) {
            if(result === "success"){
                $("#btn").text("验证码已发送，请勿再次点击");
            }
            else {
                $("#btn").text("发送失败，请稍后再试");
            }
        });

        $(this).attr("disabled",true);
        let wait = 30;
        let checkTime = window.setInterval(function(){
            let tempStr = wait+ "s后可重新获取";
            $("#text").html(tempStr);
            wait--;
        },1000);
        setTimeout(function(){
            window.clearInterval(checkTime);
            $("#text").html("");
            $("#btn").attr("disabled",false);
            $("#btn").text("点击获取邮箱验证码");
        },30000);
    });

    $("#submit").click(function () {
        let pwd = $("#pwd").val();
        let repPwd = $("#repPwd").val();
        let mail = $("#email").val();
        let checkCode = $("#check").val();
        $.post("/register",{
            "mail":mail,
            "pwd":pwd,
            "repPwd": repPwd,
            "checkCode":checkCode
        },function (result) {
            if(result.status === "success"){
                alert("注册成功");
            }
            else{
                alert(result.why);
            }
        });
        return false;
    });
});