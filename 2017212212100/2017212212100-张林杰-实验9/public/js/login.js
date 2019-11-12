$(document).ready(function () {
    $("#login").click(function () {
        var email = $("#email").val();
        if (email == '') {
            $.toast({
                text: "邮箱不能为空",
                position: "top-center"
            })
            return false;
        }
        var password = $("#password").val();
        if (password == '') {
            $.toast({
                text: "密码不能为空",
                position: "top-center"
            })
            return false;
        }
        $.ajax({
            type: "post",
            url: "/loginIn",
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                $.toast({
                    text: response.msg,
                    position: "top-center"
                })
                if(response.code!=-1){
                    setTimeout("window.location.href='/home'",3000);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    })
})