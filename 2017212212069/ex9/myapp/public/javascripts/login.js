jQuery(function ($) {

    $("#toSignUp").click(function () {
      window.location = rootPath + 'signUp';
    })

    $("#login").click(function () {
        $.ajax({
            type: "POST",
            url: rootPath + "login",
            dataType: "json",
            data: {
                email: $("#email").val(),
                password: $("#password").val()
            },
            success: function (data) {
                if (data.status == '1') {
                    window.location = rootPath + "index";
                }else if (data.status == '9'){
                    alert(data.msg);
                }else{
                    alert("登录失败");
                }
            },
            error: function () {
                alert("服务器请求失败")
            }
        })
    })
})