function codeButton() {
    let data = {};
    data.email = $("#user_name").val();
    var code = $("#code");
    code.attr("disabled", "disabled");
    setTimeout(function() {
        code.css("color", "white");
    }, 1000)
    var time = 60;
    var minute = 2;
    var set = setInterval(function() {
        if (time == 0) {
            minute--;
            time = 60;
        }
        code.val(minute + "分" + --time + "秒后重新获取");
    }, 1000);
    setTimeout(function() {
        code.attr("disabled", false).val("重新获取验证码");
        clearInterval(set);
    }, 180000);
}

function isCorrectEmail(s) {
    var $re = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!$re.test(s)) return false;
    return true;
}