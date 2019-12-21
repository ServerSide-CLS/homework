//登陆页面判断
var express = require('express');
var router1 = express.Router();
var Person = require("./connect");

router1.get('/',function(req,res){

    var key = 0;

    //刚刚从前台传过来的邮箱和密码
    var email = req.query.email;
    var secret = req.query.secret;

    //获取数据库用户名
    Person.find(function(err, response){

        //转成字符长
        var string_data = JSON.stringify(response);
        //转成数组
        var string_email =eval(string_data);

        if(string_data != null ){
            for(var i = 0; i < string_email.length ; i++){
                if(string_email[i].email == email && string_email[i].secret == secret){
                    key++;
                }
            }
            if( key>0 ){
                res.send('success');
            }else{
                res.send('false');
            }
        }
   });
})

//导出模块
module.exports = router1;