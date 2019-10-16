//获取用户名
function getUser() {
    var fs = require("fs");
    var arrRow = new Array();
    var userName = "";
    //var arrReturn = new Array();
    //处理文件
    var data = fs.readFileSync('/etc/passwd');
    var file = data.toString().split('\n');
    //取出用户名
    file.forEach(element => {
        arrRow = element.split(":");
        userName += arrRow[0] + '\n';
        //arrReturn.push(arrRow[0]);
    });
    return (userName);
    //按行读取
    // var objReadline = readline.createInterface({
    //     input: readerStream
    // });
    // objReadline.on('line', (line) => {
    //     arr = line.split(":");
    //     a.push(arr[0]);
    // });
}

//手机号码校验
function isCorrectNumber(s) {
    var $re = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (!$re.test(s)) return false;
    return true;
}

//获取当前时间
function getNowFormatDate() {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var hours = now.getHours(); //时
    var minute = now.getMinutes(); //分
    var second = now.getSeconds(); //秒
    //处理数据标准化yyyy-mm-dd hh:mm:ss
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hours < 10)
        clock += "0";
    clock += hours + ":";
    if (minute < 10) clock += '0';
    clock += minute + ":";
    if (second < 10) clock += '0';
    clock += second;
    return (clock);
}

//import express from 'express';
const express = require('express');
var app = express();

//返回当前时间
app.get('/time', function(req, res) {
    res.send(getNowFormatDate());
});

//显示 /etc/passwd 中所有的用户名
app.post('/user', function(req, res) {
    res.send(getUser());
});

//检测传入id的格式是否为有效的移动电话，正确返回OK，否则返回NO
app.get('/phone/:id', function(req, res) {
    if (isCorrectNumber(req.params.id)) {
        res.send('OK');
    } else {
        res.send('No');
    }
});

// 错误处理路由
app.get('*', function(req, res) {
    res.send('404. Sorry, this is an invalid URL.');
});

app.listen(8900);