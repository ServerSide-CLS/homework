const URL_ROOT = 'http://localhost:8900/';
let intervalId = null;
let time = 0; // 发送验证码的倒计时

document.getElementById('send-auth-code').onclick = () => {
    const email = document.getElementById('email').value;
    const emailRegex = new RegExp("^\w+@\w+\.com$");

    if (email === '') {
        alert('请输入邮箱');
        return;
    }
    if (emailRegex.test(email)) {
        alert('请输入合法的邮箱');
        return;
    }

    sendAuthCode(email);
}

document.getElementById('sign-up').onclick = () => {
    const email = document.getElementById('email').value;
    const authCode = document.getElementById('auth-code').value;
    const password = document.getElementById('password').value;
    const passwordAgain = document.getElementById('password-again').value;

    let alertMessage = '';

    if (email === '') alertMessage = '请输入邮箱';
    else if (authCode === '') alertMessage = '请输入验证码';
    else if (password === '') alertMessage = '请输入密码';
    else if (passwordAgain === '') alertMessage = '请确认密码';
    else if (password !== passwordAgain) alertMessage = '两次输入的密码不一致';

    if (alertMessage !== '') {
    	alert(alertMessage);
    	return;
    }

    const url =
        URL_ROOT +
        `api/signUp?email=${email}&authCode=${authCode}` +
        `&password=${password}&passwordAgain=${passwordAgain}`;

    fetch(url, { method: 'POST' }).then(response => {
        if (response.status !== 200) {
            console.error('不期望的状态码：' + response.status);
        }

        return response.json();
    }).then(result => {
        if (result.success !== true) {
            alert(result.message);
            return;
        }

        alert('注册成功');
    });
}

function sendAuthCode(email) {
    time = 60 * 3;
    document.getElementById('send-auth-code').classList.add('disabled');
    document.getElementById('send-auth-code').setAttribute('disabled', true);
    document.getElementById('send-auth-code').innerText = `${time} 秒后重试`;
    intervalId = setInterval(() => {
        time -= 1;
        document.getElementById('send-auth-code').innerText = `${time} 秒后重试`;
        if (time === 0) {
            clearInterval(intervalId);
            document.getElementById('send-auth-code').classList.remove('disabled')
            document.getElementById('send-auth-code').removeAttribute('disabled');
            document.getElementById('send-auth-code').innerText = '发送验证码';
        }
    }, 1000);

    fetch(URL_ROOT + 'api/sendAuthCode?email=' + email, { method: 'POST' }).then(response => {
        if (response.status !== 200) {
            console.error('不期望的状态码：' + response.status);
        }

        return response.json();
    }).then(result => {
        if (result.success !== true) alert(result.message);

        alert(`验证码是 ${result.data.authCode}`);
    });
}