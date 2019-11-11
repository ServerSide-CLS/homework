var wait;
function time(btn) {
    if (wait == 1) {
        btn.removeAttribute("disabled");
        btn.innerHTML = "获取验证码";
    } else {
        wait--;
        btn.setAttribute("disabled", true);
        btn.innerHTML = wait + "秒后再次发送";
        setTimeout(function () {
            time(btn);
        }, 1000)
    }
}

$(document).ready(() => {


    // 获取验证码
    $("#getCAPTCHA").click(() => {
        let email = $("#Email").val();
        var reg = /^\w+@[a-z0-9]+\.[a-z]+$/i;
		if(reg.test(email)){
            console.log(email);
            $.get("/getCAPTCHA/" + email, (res) => {
                console.log(res);//debug
                if (res.code != -1) {
                    wait = 180;
                    time(document.getElementById("getCAPTCHA"));
                } else {
                    alert("发送失败");
                }
            });
		}else{
            alert("邮箱格式不正确");
		}
    });


    // 开始执行注册操作
    $("#register").click(function () {
        var userInfo = {
            email: $("#Email").val(),
            password: $("#password").val(),
            checkPassword: $("#checkPassword").val(),
            CAPTCHA: $("#CAPTCHA").val(),
        }
        var reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;
        if(userInfo.email != ''){
            if(reg.test(userInfo.password)){
                if(userInfo.password == userInfo.checkPassword){
                    $.ajax({
                        url: "/register",
                        method: "post",
                        data: userInfo,
                        success: function (res) {
                            console.log(res);
                            if (res.code != -1) {
                                alert(res.msg)
                            } else {
                                alert(res.msg)
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                }
                else{
                    alert("两次密码不相同");
                }
            }
            else{
                alert("密码格式不正确");
            }
        }
        else{
            alert("邮箱不得为空");
        }
    });

})