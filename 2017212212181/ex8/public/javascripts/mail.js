$(document).ready(function () {
    $("#find").click(function () {
        var mail = $("#email").val();
        $.post("/check",{
            "mail":mail
        },function (result) {
            if(result === "success"){
                $("#find").text("验证码已发送");
            }
            else {
                $("#find").text("发送失败");
            }
        });
    });

    $("#submit").click(function () {
        let password = $("#password").val();
        let passwordRepeat = $("#passwordRepeat").val();
        let mail = $("#email").val();
        let Code = $("#check").val();
        $.post("/index",{
            "mail":mail,
            "password":password,
            "passwordRepeat": passwordRepeat,
            "Code":Code
        },function (result) {
            if(result.status === "success"){
                alert("success");
            }
            else{
                alert(result.re);
            }
        });
        return false;
    });
});