$(document).ready(function () {
    $("#loginConfirm").click(function(){
        let Email = $("#account").val(),
        pwd = $("#pwd").val();
        $.post("/login",
        {
            "Email":Email,
            "pwd":pwd
        },
        function(result){
            if(result == "notExist"){
                alert("账号不存在");
            }
            else if(result == "passwordError"){
                alert("密码错误");
            }
            else{
                alert("登录成功");
                window.location.href="/views/index.html";
            }
        });
        return false;
    });
});