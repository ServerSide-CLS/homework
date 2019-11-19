$(document).ready(function () {
    $("#loginIn").click(function () {
        let accountID = $("#emailInput").val();
        let pwd = $("#pwdInput").val();
        $.post("/login",{
            "email":accountID,
            "password":pwd
        },function (result) {
            if(result ==="accountError"){
                alert("邮箱错误！");
            }
            else if(result === "pwdError"){
                alert("密码错误！");
            }
            else {
                alert("登录成功！");
                window.location.href="/views/home.html";
            }
        });
        return false;
    });
});