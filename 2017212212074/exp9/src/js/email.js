var button1 = document.getElementById("sendEmail");
var button2 = document.getElementById("register");
button1.onclick = function () {
    let email = document.getElementById("email").value;
    if (isEmail(email)) {
        axios.post('/sendemail', { email: email })
            .then(function (response) {
                // handle success
                if (response.data.code == 20000) {
                    Msg(response.data.message, 0);
                    //按钮不可用
                    button1.disabled = true;
                    var count = 180
                    var time = setInterval(() => {
                        button1.innerHTML = Math.floor(count / 60) + ":" + (count % 60 + "").padStart(2, "0") + "后可用"
                        if (count == 0) {
                            //三分钟结束
                            clearInterval(time)
                            button1.disabled = false;
                            button1.innerHTML = "验证邮箱"
                        }
                        count -= 1;
                    }, 1000)
                }
                else {
                    Msg(response.data.message, 2);
                }
            })
    }
    else {
        Msg("邮箱格式不正确", 1);
    }
}
button2.onclick = function () {
    let email = document.getElementById("email").value;
    let code = document.getElementById("code").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    axios.post('/register', { email: email, code: code, password: password, password2: password2 })
        .then(function (response) {
            if(response.data.code==20000){
                //注册成功
                Msg(response.data.message, 0);
                //跳转到登录页面
                setTimeout(()=>window.location.href='login',3000);
            }
            else{
                Msg(response.data.message, 2);
            }
        })
}
function isEmail(str) {
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return reg.test(str);
}