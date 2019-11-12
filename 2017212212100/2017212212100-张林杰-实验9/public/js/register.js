var wait;


/**
 * 按钮使用倒计时1分钟,测试10s中
 * @param {按钮实体--jquery}} btn 
 */
function time(btn) {
    if (wait == 1) {
        btn.removeAttribute("disabled");
        btn.innerHTML = "获取验证码";
    } else {
        wait--;
        btn.setAttribute("disabled", true);
        btn.innerHTML = wait + "秒才能再次点击";
        setTimeout(function () {
            time(btn);
        }, 1000)
    }
}


$(document).ready(() => {


    // 获取验证码
    $("#getCode").click(() => {
        let email = $("#email").val();
        if (email == "") {
            $.toast({
                text: '邮箱不能为空',
                position: "top-center"
            })
            return false;
        }
        $.get("/getCode/" + email, (res) => {
            console.log(res);//debug
            if (res.code != -1) {
                $.toast({
                    text: res.msg,
                    position: "top-center"
                })
                wait = 180;
                time(document.getElementById("getCode"));
            } else {
                $.toast({
                    text: res.msg,
                    position: "top-center"
                })
            }
        });
    });


    // 开始执行注册操作
    $("#register").click(function () {
        var userInfo = {
            email: $("#email").val(),
            password: $("#password").val(),
            passwordAgain: $("#passwordAgain").val(),
            code: $("#code").val(),
        }
        $.ajax({
            url: "/register",
            method: "post",
            data: userInfo,
            success: function (res) {
                console.log(res);
                if (res.code != -1) {
                    $.toast({
                        text: res.msg,
                        position: "top-center"
                    })
                    setTimeout("window.location.href='/login'", 3000);
                } else {
                    $.toast({
                        text: res.msg,
                        position: "top-center"
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

})