function sendEmailid() {
    var time = 180;
    const email = $('#email').val();
    console.log('defaults.hbs :' + email)
    $.get('/email', {
        email: email
    },
    function (data) {
        console.log(data)
    });
    var myTime = setInterval(() => {
        subs();
    }, 1000)
    function subs() {
        time--;
        $('#emailcore').attr("value", "请" + time + "秒后再试");
        if (time === 0) {
            clearInterval(myTime);
            $('#emailcore').attr("value", "发送验证码");
            $('#emailcore').attr("disabled", false);
        }
        else {
            $('#emailcore').attr("disabled", true);
        }
    }
}