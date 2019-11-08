const express = require(`express`)
const router = express.Router()

//数据库操作异步方法
var { userfind } = require("../until/user")
var { designerfind, designerinsert, designerremove } = require("../until/designer")

//随机数生成
var { captchaNumber } = require('../until/until.js')

//邮件发送方法
var sendMail = require('../until/email');

//发送验证码
router.post('/sendemail', async function (req, res) {
    let email = req.body.email;
    //获取用户数据
    let userData = await userfind({ email: email });
    //邮箱已存在
    if (userData.length > 0) {
        res.send({ code: 30000, message: "邮箱已存在" })
        return;
    }
    else {//邮箱不存在
        let designData = await designerfind(email);
        //是否曾经验证过
        //曾经验证过，那么根据时间戳判断有没有过期，过期进行删除覆盖，没过期三分钟防刷
        if (designData.length > 0) {
            let now = (new Date()).valueOf()
            if (now - parseInt(designData[0].lasttime) >= 180000) {
                //过期，去除过期信息
                await designerremove(email)
            }
            else {
                res.send({ code: 30000, message: "请再三分钟后再次尝试" })
                return;
            }
        }
        //在design表中写入注册信息
        let code = captchaNumber()
        await designerinsert(email, (new Date()).valueOf() + "", code);

        //发送邮件
        let result = await sendMail(email, code).catch(e => {
            res.send(e);
            return;
        });
        res.send(result);
    }
});

module.exports = router;