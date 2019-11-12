var express = require("express");
var router = express.Router();
var Mongo = require("../../src/mongo");

/**
 * 登录页面
 */
router.get("/login", (req, res) => {
    res.render("login", { layout: 'default' })
})


/**
 * 用户登录
 */
router.post("/loginIn", (req, res) => {
    let userInfo = req.body;
    Mongo.Person.find(userInfo, (err, response) => {
        if (err) {
            res.send({ msg: err.toString(), code: -1 });
        }
        if (response.length == 0) {
            res.send({ msg: "该用户不存在", code: -1 })
        } else {
            res.send({ msg: "登录成功", code: 200 })
        }
    })
})


module.exports = router;