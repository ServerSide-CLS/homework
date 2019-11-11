const express = require("express");
const router = express.Router();

//注册页面
router.get('/', function (req, res) {
    res.render('home', { layout: 'default' });
});

module.exports = router;