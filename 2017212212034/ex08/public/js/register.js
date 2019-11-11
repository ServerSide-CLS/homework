var lockTime = 0;

function LockBtn(btn) {
    if (lockTime == 0) {
        btn.removeAttribute("diabled");
        btn.innerHTML = "发送验证码";
    } else {
        lockTime--;
        btn.setAttribute("disabled", true);
        btn.innerHTML = "(" + lockTime + ")";
        // 每隔一秒重新调用
        setTimeout(() => {
            LockBtn(btn);
        }, 1000);
    }
}

$(document).ready(() => {
    $("#sendCode").on('click', () => {
        let usrEmail = $("#email").val();
        if (usrEmail == "") {
            alert("email 不能为空")
        } else{
            lockTime = 180;
            LockBtn(document.getElementById("sendCode"));
            $.get("/sendEmail/" + usrEmail, (res) => {
                if(res.code == 500) {
                    alert(res.msg);
                } else if (res.code == 200) {
                    alert(res.msg);
                }
            });
        }
    });

    $("#register").on('click', () => {
        let userInfo = {
            email: $("#email").val(),
            pwd1: $("#pwd").val(),
            pwd2: $("#pwdConfirm").val(),
            code: $("#code").val() 
        }

        $.ajax({
            url: "/register",
            method: "post",
            data: userInfo,
            success: function(res) {
                if(res.code == 200) {
                    alert(res.msg);
                    location.href = "/"
                } else {
                    alert(res.msg);
                    location.href = "/"
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    })

})