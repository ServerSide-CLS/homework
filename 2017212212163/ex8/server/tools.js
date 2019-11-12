var fs = require("fs");
var path = require('path');

//随机六位数
exports.createSixNum = function() {
    var Num = "";
    for(var i=0;i<6;i++){
        Num+=Math.floor(Math.random()*10);
    }
    //console.log(Num);
    return Num;
}

 //email格式验证
exports.Format = function(email) {
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(reg.test(email)){
        console.log("邮箱格式正确");
        return true;
	}else{
        console.log("邮箱格式不正确");
        return false;
	}
}

exports.Confirm = function(p1,p2) {
    if(p1 != p2){
        return false;
    }
    else{
        return true;
    }
}

exports.FileJson = async function(msg) {
    var userJson = JSON.stringify(msg,"","\t");  //将js对象转换为json字符串
    
    fs.writeFile(path.join(__dirname,'user.json'), userJson, function(err){
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------")
        console.log("读取写入的数据！");
        fs.readFile(path.join(__dirname,'user.json'), function (err, data) {
           if (err) {
              return console.error(err);
           }
           console.log("异步读取文件数据: " + data.toString());
        });
    })
}


