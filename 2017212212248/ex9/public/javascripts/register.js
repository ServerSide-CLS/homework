let emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
let codeBtn = $("#codeBtn");
let tick = 0;

//验证码的发送 180秒倒计时
    function sendCode() {
        if(tick == 0){
            codeBtn.removeAttr("disabled");
            codeBtn.html("获取验证码");
        }
        else{
            tick--;
            codeBtn.attr("disabled","true");
            codeBtn.html(tick + "秒后重新获取");
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
                console.log(1);
                $.get("/email/"+email, (res) => {
                    console.log(res);
                    if(res.status == "success"){
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

