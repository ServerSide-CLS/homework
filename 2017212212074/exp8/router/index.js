const express = require(`express`)
const router = express.Router()

const renderpage = require("./rederpage");
const register = require("./register");
const sendemail = require("./sendemail");

//渲染页面
router.use("/", renderpage);
//验证码邮件发送
router.use("/", sendemail);
//注册
router.use("/", register);

//进入不存在路径
router.use('*', function (req, res) {
    res.render('error', { layout: false });
})

module.exports = router;