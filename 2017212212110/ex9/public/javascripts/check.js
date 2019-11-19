$(document).ready(function () {
    $("#getcode").click(function () {
        var mail = $("#Email").val();
        $.post("/check",{
            "mail":mail
        },function (result) {
            if(result === "success"){
                $("#getcode").text("验证码已发送，请稍后再试");
            }
            else {
                $("#getcode").text("发送失败，请稍后再试");
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
            $("#getcode").attr("disabled",false);
            $("#getcode").text("点击获取邮箱验证码");
        },30000);
    });

    let flag = false;
    $("#submit").click(function () {
        let pwd = $("#password").val();
        let repPwd = $("#checkPassword").val();
        let mail = $("#Email").val();
        let checkCode = $("#code").val();
        $.post("/register",{
            "mail":mail,
            "pwd":pwd,
            "repPwd": repPwd,
            "checkCode":checkCode,
            "flag":flag
        },function (result) {
            if(result.status === "success"){
                alert("注册成功");
                window.location.href="/views/home.html";
            }
            else{
                alert(result.why);
                window.location.href="/views/login.html";
            }
        });
        return false;
    });

    $("#Email").blur(function(){
        let email = $("#Email").val();
        $.post("/checkEmail",
            {
                "email":email
            },
            function(result){
                if(result === "Yes"){
                    flag = false;
                    alert("邮箱已存在");
                    $("#Email").val("");
                }
                else {
                    flag = true;
                }
            });
    });
    $("#login").click(function () {
        window.location.href = "/views/login.html"
    })

});