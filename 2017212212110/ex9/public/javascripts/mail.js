const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: "2393208310@qq.com",
        pass: "vdnzacuzlqkcdjja" // smtp授权码
    }
});

module.exports = function (mail){
    var checkCode = "";
    var code = ('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    for (var i=0;i<4;i++){
        var num = parseInt(Math.random() * code.length);
        checkCode += code[num];
    }
    transporter.sendMail({
        from:"2393208310@qq.com",
        to:mail,
        subject:"验证码",
        html:"您的验证码为" + checkCode
    },function (err,res) {
        if(err){
            return {status:500};
        }
    });
    return {status: 200,checkCode:checkCode};
};
