function GenerateCode(){
    let seed = Math.random().toString(10).substr(2,6);
    return seed;
}

function ValidateEmail(email){
    const pattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (email == "") {
        throw new Error("邮箱不能为空");
    }
    if(!pattern.test(email)) {
        throw new Error("邮箱填写有误");
    }
}

function ValidatePwd(pwd1,pwd2) {
    if(pwd1 == "" || pwd2 == "") {
        throw new Error("密码不能为空");
    }
    if(pwd1 != pwd2) {
        throw new Error("密码输入不一致");
    }
}

function ValidateCode(email, code) {
    if(email == "") {
        throw new Error("邮箱不能为空");
    }
    if(code == "") {
        throw new Error("验证码不能为空");
    }
}

module.exports = {
    ValidatePwd,
    ValidateEmail,
    GenerateCode,
    ValidateCode
}