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

    let flag = false;
    $("#submit").click(function () {
        let pwd = $("#pwd").val();
        let repPwd = $("#repPwd").val();
        let mail = $("#email").val();
        let checkCode = $("#check").val();
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

    $("#email").blur(function(){
        let email = $("#email").val();
        $.post("/checkEmail",
            {
                "email":email
            },
            function(result){
                if(result === "Yes"){
                    flag = false;
                    alert("邮箱已存在");
                    $("#email").val("");
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