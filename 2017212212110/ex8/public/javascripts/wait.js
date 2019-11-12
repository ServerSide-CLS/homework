var waitTime;

function time(btn) {
    if (waitTime == 1) {
        btn.removeAttribute("disabled");
        btn.innerHTML = "验证邮箱有效性";
    } else {
        waitTime--;
        btn.setAttribute("disabled", true);
        btn.innerHTML = waitTime + "秒后再次发送";
        setTimeout(function () {
            time(btn);
        }, 1000)
    }
}

$(document).ready(() => {
    // 验证邮箱有效性
    $("#getcode").click(() => {
        let email = $("#Email").val();
        var reg = /^\w+@[a-z0-9]+\.[a-z]+$/i;
		if(reg.test(email)){
            console.log(email);
            $.get("/getcode/" + email, (res) => {
                if (res.code != -1) {
                    waitTime = 180;
                    time(document.getElementById("getcode"));
                } else {
                    alert("发送失败");
                }
            });
		}
        else{
            alert("邮箱格式不正确");
		}
    });
});

// 执行注册操作
$("#register").click(function () {
    var userInfo = {
        email: $("#Email").val(),
        password: $("#password").val(),
        checkPassword: $("#checkPassword").val(),
        code: $("#code").val(),
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