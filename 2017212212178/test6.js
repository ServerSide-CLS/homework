//获取express服务器
const express = require('express')
//获取app对象
const app = express()

//首页内容设置
app.get('/',(req,res) => {
    res.send('Helle World!')
})

//获取当前时间
app.get('/time', (req,res) => {
    date = new Date();
    //获取本地日期
    myDate = date.toLocaleDateString();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    //规范化时分秒
    if(hour < 10){
      hour = '0' + hour.toString();
    }
    if(minute < 10){
      minute = '0' + minute.toString();
    }
    if(second < 10){
      second = '0' + second.toString();
    }
    res.send('当前时间为: ' + myDate + ' ' + hour + ':' + minute + ':' + second);
})

//显示所用用户名
app.post('/user', (req,res) => {
    //文件导入模块
    var fs = require('fs');
    //读取passwd文本
    var data = fs.readFileSync('/etc/passwd');
    var array = [];
    var arrayColumn = [];
    var user = '';
    //文本按行分入数组
    array = data.toString().split('\n');
    for(i = 0; i < array.length; i++){
      //每一行按照:x:划分成两部分，前一部分为用户名，后一部分为用户的信息
      arrayColumn[i] = array[i].split(':x:');
      //用户名存入user进行拼接
      user += arrayColumn[i][0] + ',';
    }
    res.send('显示所有用户名: ' + '\n' +user);
})

//验证移动号码是否正确
app.get('/phone/:id', (req,res) =>{
    //正则表达式首位为1，后一位从3，4，5，7，8中选出一位，之后9位从0-9数字里选出
    var phoneTrue = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!phoneTrue.test(req.params.id)) {
      flag = '号码输入错误';
    } else {
      flag =  '号码输入正确';
    }
    res.send(flag);
})

//当访问到未知的位置时错误提醒
app.get('*', function(req, res){

    res.send('404. Sorry, this is an invalid URL.');
 });
 
 //监听8900端口
app.listen(8900,() => console.log('Listening on port 8900'));