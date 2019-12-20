var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/',function(req,res){

  
    //从前台传过来的的密码，确认密码和输入的验证码
    var code = req.query.code;
    var secret1 = req.query.secret1;
    var secret2 = req.query.secret2;
    var definecode = req.session.definecode;
    var email = req.query.email;
    var flag=0;

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
        list ={
                "email":email,
                "secret":secret1
            }
        fs.readFile('./views/data/user.json','utf8',function (err, data) {
            if(err){
                return console.error(err);
            }
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(data);//将字符串转换为json对象
            person.data.push(list);//将传来的对象push进数组对象中
            var str = JSON.stringify(person);//把json对象转换成字符串重新写入json文件中
            fs.writeFile('./views/data/user.json',str,function(err){
                if(err){
                    console.log(err);
                }
                res.end('success');
            })
        });
    
    }
})

//导出模块
module.exports = router;