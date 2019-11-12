var button = document.getElementById("button");
button.onclick = function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    axios.post('/login', { email: email, password: password }).then(function (response) {
        if (response.data.code == 20000) {
            //登录成功跳转到index页面
            Msg(response.data.message, 0);
            setTimeout(()=>window.location.href='index',3000);
        }
        else {
            Msg(response.data.message, 2);
        }
    })


}
