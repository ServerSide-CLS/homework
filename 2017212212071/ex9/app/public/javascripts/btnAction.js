jQuery(function ($) {
    function emailTest(email) {
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(email);
    }
    function EmailClick() {
        let time = 180;
        const email = $('#email').val();
        if (!emailTest(email)) {
            alert("请填写正确邮箱");
            return;
        }
        $.get('/register/email', {
                email: email
            },
            function (data) {
                console.log(data)
            }
        );

        let mytime = setInterval(function () {
            subs();
        }, 1000);

        function subs() {
            time--;
            $('#emialcore').attr("value", "请" + time + "秒后再试");
            if (time === 0) {
                clearInterval(mytime);
                $('#emialcore').attr("value", "发送验证码");
                $('#emialcore').attr("disabled", false);//按键可用
            } else {
                $('#emialcore').attr("disabled", true);//按键不可用
            }
        }
    }
    $("#registerButton").click(function () {
        var userInfo = {
            email: $("#email").val(),
            password: $("#password").val(),
            passwordAgain: $("#rePassword").val(),
            code: $("#verification").val(),
        };
        $.ajax({
            url: "/register",
            type: "post",
            data: userInfo,
            success: function (response) {
                console.log(response);
                alert(response.massage);
                if (response.status === 200) {
                    window.location.href = '/login';
                }
            },
            error: function (e) {
                console.log(e);
            }
        })
    });
})