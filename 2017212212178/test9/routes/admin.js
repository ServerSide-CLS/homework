//显示数据库中所有的用户，信息包括邮箱和密码
var express = require('express');
var router = express.Router();
var Person = require("./connect");

router.get('/', function(req, res){
   Person.find(function(err, response){
        //转成字符长
        var string_data = JSON.stringify(response);
        //转成数组
        var string_email =eval(string_data);
        var list=[];
        for(var i = 0; i < string_email.length ; i++){
            list.push("注册邮箱:" + string_email[i].email + " 注册日期" + string_email[i].data);
        }
        res.send(list);
   });
});

//导出模块
module.exports = router;

