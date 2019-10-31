const authCodeTable = new Map();

/**
 * 向邮箱发送验证码，这里不发送真实的邮件，只是将验证码返回，让前端通知用户
 * 单个邮箱限制 3 分钟发送一次
 * @param {string} email
 * @returns {object} result
 * success: 操作是否成功
 * message: 操作失败时附带的信息
 * data: 结果中附带的数据
 */
function sendAuthCodeService(email) {
    const info = authCodeTable.get(email);

    if (info && Date.now() - info.lastSendTime <= 1000 * 60 * 3) {
        return {
            success: false,
            message: '发送验证码频率超过限制',
        };
    }

    const authCode = Math.random().toString().slice(2, 6);
    authCodeTable.set(email, {
        authCode,
        lastSendTime: Date.now(),
    });

    return {
        success: true,
        data: { authCode },
    };
}

/**
 * 验证验证码是否正确
 * @param {string} email 发送过验证码的邮箱
 * @param {string} authCode 要验证的验证码
 * @returns {boolean} 如果
 * 1. 邮箱存在
 * 2. 验证码是在十分钟以内发送的
 * 3. 验证码正确
 * 返回 true，否则返回 false
 */
function verifyAuthCodeService(email, authCode) {
    const info = authCodeTable.get(email);

    if (info === undefined) return false;
    if (Date.now() - info.lastSendTime > 1000 * 60 * 10) {
        authCodeTable.delete(email);
        return false;
    }
    if (info.authCode !== authCode) return false;

    authCodeTable.delete(email);

    return true;
}

module.exports = {
    sendAuthCodeService,
    verifyAuthCodeService,
};
