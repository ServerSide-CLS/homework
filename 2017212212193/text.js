var express = require('express');
var app = express();

app.get('/time', function(req, res){
    var date = new Date();//获取时间
    hour = date.getHours();//获取小时
    minute = date.getMinutes();//获取分钟
    second = date.getSeconds();//获取秒
    localDate = date.toLocaleDateString();//获取日期

    //判断时、分、秒是否是一位，改为2位
    if(hour < 10)
        hour = '0' + hour.toString();
    if(minute < 10)
        minute = '0' + minute.toString();
    if(second < 10)
        second = '0' + second.toString();
    //向服务器发送请求
    res.send('当前时间：' + localDate + " " + hour + ":" + minute + ":" + second);
});

app.post('/user', function(req, res) {
    //同步打开文件
    var fs = require('fs');
    //将linux里的/etc/passwd拿出来放在C:/users/dell/etc/passwd里
    var data = fs.readFileSync('C:/users/dell/etc/passwd');
    //定义变量
    var user = '';//存储用户
    var str = [];
    var str_new = [];

    str = data.toString().split("\n");//以换行分割文件内容放在str数组里
    //将str数组里的各个字符串再次以:x:分割放在new_str里
    for(var i = 0; i < str.length; i++){
        str_new[i]= str[i].split(":x:");
        user += str_new[i][0] + ' ';//将用户名存入
    }
    res.send(user);//向服务器发送请求
});
//正则表达式判断是否是移动的手机号
//正确返回xxx是OK的电话；错误返回404. Sorry, this is an invalid URL.
 app.get('/phone/:id(13[4-9][0-9]{8}|15[012789][0-9]{8}|18[23478][0-9]{8})', function(req, res){
     res.send(req.params.id + '是OK的电话');
 });
//url错误返回404. Sorry, this is an invalid URL.
 app.get('*', function(req, res){
     res.send('404. Sorry, this is an invalid URL.');
 });
app.listen(8900);//监听8900端口