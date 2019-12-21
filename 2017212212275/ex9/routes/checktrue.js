//注册按钮的校验和成功后在数据库中注册
var express = require('express');
var router = express.Router();
var Person = require("./connect");

router.get('/',function(req,res){

    //从前台传过来的的密码，确认密码和输入的验证码
    var code = req.query.code;
    var secret1 = req.query.secret1;
    var secret2 = req.query.secret2;
    var definecode = req.session.definecode;
    var email = req.query.email;
    var flag=0;
    var day = new Date();

    if(secret1 != secret2){
        flag=0;
        res.end('fault1');
    }else{
        flag++;
    }

    if(code != definecode || code == "" || code == null){
        flag=0;
        res.end('fault2');
    }else{
        flag++;
    }

    if(flag==2){

        //邮箱密码日期添加到数据库
        if(!email || !secret1 || !day){
            res.render('show_message',{
                message:"Sorry, you provided worng info", type: "error"
            });
        }else{
            var newPerson = new Person({
                email: email,
                secret: secret1,
                data: day
            });

            newPerson.save(function(err,Person){
                if(err)
                    res.render('showmsg', {message: "Database error", type: "error"});
                else
                    res.end('success');
            });
        }

    }
})

//导出模块
module.exports = router;