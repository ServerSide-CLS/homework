var fs = require("fs");
var path = require("path");
var Mongo = require("../src/mongo");

/**
 * 邮箱格式校验
 * @param {String} email 邮箱
 */
function validateEmail(email) {
    if (email == "") {
        throw new Error("邮箱不能为空");
    }
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!reg.test(email)) {
        throw new Error("邮箱格式不符合要求");
    }
}


/**
 * 两次密码输入校验
 * @param {String} pass 第一次密码输入
 * @param {String} passAgain 第二次密码输入
 */
function validatePass(pass, passAgain) {
    if (pass == "" || passAgain == "") {
        throw new Error("密码不能为空")
    }
    if (pass != passAgain) {
        throw new Error("两次密码输入不一致");
    }
}


/**
 * 邮箱验证码校验
 * @param {String} email 邮箱
 * @param {String} code 验证码
 */
function checkCode(email, code) {
    if (email == "") {
        throw new Error("邮箱不能为空");
    }
    if (code == "") {
        throw new Error("验证码不能为空");
    }
    if (process.env[email] != code) {
        throw new Error("验证码错误");
    }
}



module.exports = {
    validateEmail,
    validatePass,
    checkCode,
}
