function codeButton() {
    let data = {};
    data.email = $("#user_name").val();
    if (!isCorrectEmail(data.email)) {
        alert("邮箱格式错误");
    } else {
        $.post("http://127.0.0.1:3000/sendCode", data, function(data) {
            console.log(data);
            if (data == 0) {
                alert("数据库查询失败");
            } else if (data == 1) {
                alert("该邮箱已被注册");
            }
        });
    }
    var code = $("#code");
    code.attr("disabled", "disabled");
    setTimeout(function() {
        code.css("color", "white");
    }, 1000)
    var time = 10;
    var minute = 2;
    var set = setInterval(function() {
        if (time == 0) {
            minute--;
            time = 10;
        }
        code.val(minute + "分" + --time + "秒后重新获取");
    }, 1000);
    setTimeout(function() {
        code.attr("disabled", false).val("重新获取验证码");
        clearInterval(set);
    }, 180000);
}

//验证邮箱
function isCorrectEmail(s) {
    var $re = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!$re.test(s)) return false;
    return true;
}