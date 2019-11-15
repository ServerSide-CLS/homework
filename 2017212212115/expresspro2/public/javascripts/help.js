$(() => {
    $('#submit').click( async () => {
        await fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                email:              $('#email').val(),
                captcha:            $('#captcha').val(),
                password:           $('#password').val(),
                passwordConfirm:    $('#passwordConfirm').val()
            }),
            headers: {
                'Content-Type':     'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data));
            if(data.code === 200){
                alertMsg(data.msg, 'alert-info');
                $('input').val('');
            }
            else{
                alertMsg(data.msg, 'alert-danger');
            }
        })
        .catch(error => console.error(error));
    });

    $("#sendCaptcha").click( async () => {
        countDown(180);
        await fetch('/captcha/', {
            method: 'POST',
            body: JSON.stringify({
                email:              $('#email').val()
            }),
            headers: {
                'Content-Type':     'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === 200){
                alertMsg(data.msg, 'alert-info');
            }
            else{
                alertMsg(data.msg, 'alert-danger');
            }
        })
        .catch(error => console.error(error));
    });

    const countDown = (time) => {
        $("#sendCaptcha").attr('disabled',"true");
        let timeOut = () => {
            let start = Date.now();
            $("sendCaptcha").text(`${time}秒`);
            time--;
            if(time === -1){
                $("sendCaptcha").text(`获取验证邮箱有效性`);
                $("sendCaptcha").removeAttr("disabled");
            }
            else{
                setTimeout(timeOut, start + 1000 - Date.now());
            }
        };
        timeOut();
    }

    // 显示响应信息
    const alertMsg = (msg, type) => {
        $('.alert').alert('close');
        $('#registerDiv').prepend(
            `<div class="alert ${type}">
            <a href="" class="close" data-dismiss="alert">&times;</a>
            <strong>${msg}</strong>
            </div>`
        );
    };
});