const authCodeService = require('../services/authCodeService');

function sendAuthCode(req, res) {
    const { email } = req.query;
    const emailRegex = new RegExp(/^\w+@\w+\.com$/);
    let result = {
        success: false,
        message: '',
    }

    if(!email){
        result.message = '参数缺失';
    }else if (emailRegex.test(email) !== true) {
        result.message = '邮箱格式错误';
    } else {
        result = authCodeService.sendAuthCode(email);
    }

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
}

module.exports = sendAuthCode;