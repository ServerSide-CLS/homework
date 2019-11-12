const authCodeService = require('../services/authCodeService');
const userService = require('../services/userService');

function signUp(req, res) {
    const { email, authCode, password, passwordAgain } = req.query;
    const result = {
        success: false,
        message: '',
    }
    const emailRegex = new RegExp(/^\w+@\w+\.com$/);

    if (!email || !authCode || !password || !passwordAgain) {
        result.message = '参数缺失';
    } else if (emailRegex.test(email) !== true || password !== passwordAgain) {
        result.message = '参数不符合要求';
    } else if (authCodeService.verifyAuthCode(email, authCode) !== true) {
        result.message = '验证码错误';
    }

    if (result.message !== '') {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    } else {
        userService.getUserInfoByEmail(email).then(userInfo => {
            if (userInfo) {
                result.message = '用户已存在';
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            } else {
                result.success = true;
                userService.addUser(email, password).then(() => {
                    res.set('Content-Type', 'application/json');
                    res.send(JSON.stringify(result));
                });
            }
        });
    }
}

module.exports = signUp;