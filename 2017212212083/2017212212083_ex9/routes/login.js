/**
 * @Author 薛
 * @Date 2019/11/11
 * @Version v1.0
 */
var express = require('express');
var router = express.Router();
let Mongo = require("./module/mongo");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'login'});
});

router.post('/', function (req, res, next) {
    let userInfo = req.body;
    console.log(req.body);
    Mongo.user.find(userInfo, function (err, result) {
        if (err) {
            res.send({massage: err.toString(), status: -1});
        }
        console.log(result);
        if (result.length === 0) {
            res.send({massage: "用户不存在或用户名密码错误", status: -1});
        } else {
            res.send({massage: "登录成功", status: 200});
        }
    })
});

module.exports = router;