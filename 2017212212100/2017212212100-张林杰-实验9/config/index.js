// mongoDB ip地址
const mongoIp = 'mongodb://127.0.0.1:27017/new_db';

// email发送配置
const emailSetting = {
    emailSender: "1176789241@qq.com",// 邮箱发送人邮箱地址
    authCode: "puhukiinkyswhbac",// 对应的授权码
    // 所选则的服务配置
    // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    emailService: "qq",
    emailPort: 465
}


module.exports = {
    mongoIp,
    emailSetting
}