const URL_ROOT = 'http://localhost:8900/';

document.getElementById('sign-in').onclick = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let alertMessage = '';

    if (email === '') alertMessage = '请输入邮箱';
    else if (password === '') alertMessage = '请输入密码';

    if (alertMessage !== '') {
        alert(alertMessage);
        return;
    };

    const url = URL_ROOT + `api/signIn?email=${email}&&password=${password}`;

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

        location.href = "./index";
    });
}
