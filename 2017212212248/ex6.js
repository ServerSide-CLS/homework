//实验六
//创建服务器
var fs = require("fs");
const express = require('express');
const app = express();

//以get方法访问 /time显示当前时间
app.get('/time',(req,res) => {
	//获取日期时间
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();

    //以yyyy-mm-dd hh:mm:ss的方式输出
    var now = year+"-"+cover(month)+"-"+cover(date)+" "
    +cover(h)+":"+cover(m)+":"+cover(s);

    function cover(s){
        return s < 10 ? '0' + s : s;
    }
    res.send(now)
});

//以post方法访问 读取用户名
app.post('/user',(req,res) => {
    var dataFile = fs.readFileSync('/etc/passwd');
    var dataLine = dataFile.toString().split("\n");
    var name = "";
    dataLine.forEach(item => {
        var data = item.trim().split(":");
        name += data[0]+'\n';
    });
    res.send(name);
});

//以get方法访问 /phone 检测输入是否为有效电话号
app.get('/phone/:id',(req,res) => {
    var params = req.params;
    var reg = /^[1][3-9][0-9]{9}$/;
    console.log(params)
    if(reg.test(params.id)){
        res.send('OK');
    }
    else{
        console.log(params);
        res.send('NO');
    }
});

//其余参数访问 输出错误信息
app.get('*',function(req,res){
    res.send('404. Sorry, this is an invalid URL.');
});

app.listen(3000);