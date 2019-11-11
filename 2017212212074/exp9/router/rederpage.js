const express = require("express");
const router = express.Router();

var { userfind } = require("../until/user")

//注册页面
router.get('/', function (req, res) {
    res.render('design', { layout: 'default' });
});
//登录页面
router.get('/login', function (req, res) {
    res.render('login', { layout: 'default' });
});
//index页面
router.get('/index', function (req, res) {
    res.render('index', { layout: 'default2' });
});
//admin页面
router.get('/admin', async function (req, res) {
    let user = await userfind({});
    res.render('admin', { layout: 'default2', user: user });
});

module.exports = router;