var fs = require("fs");


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
    if(process.env[email] != code) {
        throw new Error("验证码错误");
    }
}

function WriteToFile(userInfo) {
    let data = JSON.parse(fs.readFileSync("user.json"));
    data.push(userInfo);
    fs.writeFileSync("user.json", JSON.stringify(data));
}

function register(userInfo) {
    try {
        ValidateEmail(userInfo.email);
        ValidatePwd(userInfo.pwd1, userInfo.pwd2);
        ValidateCode(userInfo.email, userInfo.code);
        let record = {
            email: userInfo.email,
            password: userInfo.pwd1,
        }
        WriteToFile(record);
        process.env[userInfo.email] = GenerateCode();
        // return code = 200;
        return {
            code: 200,
            msg: "注册成功"
        }
    } catch (err) {
        return {
            code: 500,
            msg: err.toString()
        };
    }
}

module.exports = {
    register,
    ValidateEmail,
    GenerateCode,
}