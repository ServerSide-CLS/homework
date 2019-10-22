const express = require('express');
const app = express();

// 以 yyyy-mm-dd hh:mm:ss 返回当前时间
app.get('/time', (req, res) => {
	var now = new Date();

    var year = now.getFullYear();     //年
    var month = now.getMonth() + 1;   //月
    var day = now.getDate();          //日
    var hh = now.getHours();          //时
    var mm = now.getMinutes();        //分
    var ss = now.getSeconds();        //秒
    var clock = year + "-";
    // 月份前补0
    if(month < 10)
        clock += "0";
    clock += month + "-";
    // 天数前补0
    if(day < 10)
        clock += "0";
    clock += day + " ";
    // 小时前补0
    if(hh < 10)
        clock += "0";
    clock += hh + ":";
    // 分钟前补0
    if (mm < 10) clock += '0';
    clock += mm + ":";
    // 秒数前补0
    if (ss < 10) clock += '0';
    clock += ss;
    // 回送数据
    res.send(clock);
});

// 显示 /etc/passwd 中所有的用户名
app.post('/user', (req, res) => {
	let array = [];
	let userName="";
	//读取passwd文件内容
	var fs = require('fs');
	var data=fs.readFile('/etc/passwd');
	var line=data.toString().split('\n');  
	line.forEach( element => {
   		array = element.split(":");
    	userName += array[0] + '\n';
    });
   // 回送数据
   res.send(userName);
});

// 检测传入id的格式是否为有效的移动电话
app.get('/phone/:id', (req, res) => {
	var isId=/^[1][3,4,5,7,8][0-9]{9}$/;
	var id=req.params.id;
	// console.log(id);
	if(isId.test(id))
    	res.send('OK');
    else
    	res.send('NO');
});

// 错误处理路由
app.get('*', (req, res) => {
   res.send('404. Sorry, this is an invalid URL.');
});

// 创建Expree服务器
app.listen(8900,() => console.log('listening on port 8900'));
