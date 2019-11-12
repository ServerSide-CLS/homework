const userService = require('../services/userService');

function signIn(req, res) {
    const { email, password } = req.query;
    const result = {
        success: false,
        message: '',
    }
    const emailRegex = new RegExp(/^\w+@\w+\.com$/);

    if (!email || !password) {
        result.message = '参数缺失';
    } else if (emailRegex.test(email) !== true) {
        result.message = '邮箱格式错误';
    }

    userService.getUserInfoByEmail(email).then(userInfo => {
        if (!userInfo) {
            result.message = '用户不存在';
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        } else {
            if (userInfo.userPassword !== password) {
                result.message = '邮箱或密码错误';
            } else {
                result.success = true;
                req.session.email = userInfo.userEmail;
            }

            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        }
    });
}

module.exports = signIn;