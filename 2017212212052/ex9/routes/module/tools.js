

function checkEmail(email) {
    if (email === "") {
        throw  new Error("邮箱不能为空");
    }
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!reg.test(email)) {
        throw new Error("邮箱填写不正确");
    }
}

function checkPassword(password, rePassword) {
    if (password === "" || rePassword === "") {
        throw new Error("密码不能为空");
    }
    if (password !== rePassword) {
        throw new Error("两次密码不同");
    }
}

function checkCode(code, ans) {
    if (code === "") {
        throw new Error("验证码不能为空");
    }
    if (code !== ans) {
        throw new Error("验证码不正确");
    }
}

module.exports = {
    checkEmail,
    checkPassword,
    checkCode,
};