var express = require('express');
let User = require('./tools/mongo');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('login', {layout: 'layout', title: 'login'});
});

var apiResult = {
    status: 1,
    msg: ""
};

router.post('/login', function (req, res) {

    var userInfo = req.body;

    User.find(userInfo,
        function(err, response){
            if (err){
                res.render('error', {layout: 'layout', title: 'error', message: err.toString()});
                return;
            }

            if (response.length === 0) {
                apiResult.status = '9';
                apiResult.msg = "密码错误或用户不存在";
                res.send(apiResult);
                return;
            }else{
                apiResult.status = '1';
                apiResult.msg = "登录成功";
                res.send(apiResult);
                return;
            }
        });

})

router.get('/admin', function (req, res) {
    User.find(function(err, response){
        res.render('admin', {layout: 'layout', data: response});
    });
});

module.exports = router;
