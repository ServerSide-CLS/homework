$(() => {
    $('#register-submit').click( async () => {
        $("#register-submit").attr('disabled',"true");
        await fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                email:              $('#register-email').val(),
                captcha:            $('#register-captcha').val(),
                password:           $('#register-password').val(),
                passwordConfirm:    $('#register-passwordConfirm').val()
            }),
            headers: {
                'Content-Type':     'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === 200){
                alertMsg(data.msg, 'alert-info', 'register-registerDiv');
                $('input').val('');
            }
            else{
                alertMsg(data.msg, 'alert-danger', 'register-registerDiv');
            }
            $("#register-submit").removeAttr("disabled");
        })
        .catch(error => console.error(error));
    });

    $("#register-sendCaptcha").click( async () => {
        countDown(180);
        await fetch('/captcha/', {
            method: 'POST',
            body: JSON.stringify({
                email:              $('#register-email').val()
            }),
            headers: {
                'Content-Type':     'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === 200){
                alertMsg(data.msg, 'alert-info', 'register-registerDiv');
            }
            else{
                alertMsg(data.msg, 'alert-danger', 'register-registerDiv');
            }
        })
        .catch(error => console.error(error));
    });

    $('#login-submit').click( async () => {
        $("#login-submit").attr('disabled',"true");
        await fetch('/login/', {
            method: 'POST',
            body: JSON.stringify({
                email:              $('#login-email').val(),
                password:           $('#login-password').val(),
            }),
            headers: {
                'Content-Type':     'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === 200){
                window.location.href = data.to;
            }
            else{
                alertMsg(data.msg, 'alert-danger', '#login-loginDiv');
            }
            $("#login-submit").removeAttr("disabled");
        })
        .catch(error => console.error(error));
    });


    const countDown = (time) => {
        $("#register-sendCaptcha").attr('disabled',"true");
        let timeOut = () => {
            let start = Date.now();
            $("#register-sendCaptcha").text(`${time}秒`);
            time--;
            if(time === -1){
                $("#register-sendCaptcha").text(`获取验证邮箱有效性`);
                $("#register-sendCaptcha").removeAttr("disabled");
            }
            else{
                setTimeout(timeOut, start + 1000 - Date.now());
            }
        };
        timeOut();
    }

    // 显示响应信息
    const alertMsg = (msg, type, place) => {
        $('.alert').alert('close');
        $(place).prepend(
            `<div class="alert ${type}">
            <a href="" class="close" data-dismiss="alert">&times;</a>
            <strong>${msg}</strong>
            </div>`
        );
    };
});
