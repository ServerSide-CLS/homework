var express = require("express");
var router = express.Router();


/**
 * 登录成功后的主页
 */
router.get("/home", (req, res) => {
    res.render('home', { layout: 'default' })
})



module.exports = router;