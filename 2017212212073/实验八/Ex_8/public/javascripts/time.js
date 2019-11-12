// 验证码计时
window.onload = function () {
    var send = document.getElementById('send'), //按钮ID
        times = 20,
        timer = null;
        send.onclick = function () {
        // 计时开始
        send.disabled = true;
        timer = setInterval(function () {
            times--;
            if (times &lt; = 0) {
                send.value = '获取验证码';
                clearInterval(timer);
                times = 60;
                send.disabled = false;
            } else {
                send.value = times + '秒后重试'
                send.disabled = true;
            } console.log(times)
        }, 1000);
        // 发送请求获取验证码
        console.log("sending...")
    }
}