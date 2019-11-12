    let emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let codeBtn = $("#codeBtn");
    let tick = 0;


    //验证码的发送 180秒倒计时
    function sendCode() {
        if(tick == 0){
            codeBtn.attr("disabled","false");
            codeBtn.innerHTML = "获取验证码";
        }
        else{
            tick--;
            codeBtn.setAttribute("disabled","true");
            codeBtn.innerHTML = tick + "秒后重新获取";
            setTimeout(function () {
                sendCode();
            }, 1000)
        }
    }


    //邮箱的格式验证和验证码的发送
    $("#codeBtn").on('click', () =>{
        let email = $("#email").val();
        console.log(email)
        if(email == "" || email == null) {
            alert("邮箱不能为空！");
        }
        else{
            if(emailreg.test(email)){
                $.get("/email/"+email, (res) => {
                    console.log(res);
                    if(res.status != "fail"){
                        alert("验证码已发送，请在您的邮箱中查收");
                        tick = 180;
                        sendCode();
                    }
                    else{
                        alert("验证码发送失败！");
                    }
                });
            }
            else{
                alert("邮箱格式错误！");
            }
        }
    });

    //注册
    $("#register").on('click', () =>{
        let code = $("#code").val();
        let passwd = $("#passwd").val();
        let repasswd = $("#rePasswd").val();
        if(code == "" || code == null || passwd == "" || passwd == null
            || repasswd == "" || repasswd == null || email == "" || email == null) {
            alert("信息不能为空！");
        }

        else{
            if(passwd != repasswd) {
                alert("两次密码不一致！");
            }

            else{
                $.post("/register",{
                    "email":    email,
                    "code":     code,
                    "passwd":   passwd,
                    "repasswd": repasswd
                }, function (res) {
                    if(res.status == "success"){
                        alert("注册成功！");

                    }
                    else{
                        alert(res.message);
                    }
                });
            }
        }
    });
