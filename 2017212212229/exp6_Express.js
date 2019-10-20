const express = require('express');
const app = express();
//返回当前时间
app.get('/time', (req, res) => {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
    	res.send(year+'-'+month.toString().padStart(2, '0')+'-'+day.toString().padStart(2, '0')+' '+hour.toString().padStart(2, '0')+':'+minute.toString().padStart(2, '0')+':'+second.toString().padStart(2, '0'));
});
//显示"/etc/passwd"中所有的用户名
app.post('/user', (req, res) => {
	var fs = require('fs');
	var data = fs.readFileSync('/etc/passwd');
	var users = data.toString().split('\n');
	var user="";
	users.forEach((item) => {
   		 user+=item.split(":")[0]+"\n";
	})
	res.send(user);
    			
});
//要求检测传入id的格式是否为有效的移动电话
app.get('/phone/:id', (req, res) => {
	var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
	if(reg.test(req.params.id))
		res.send('OK');
	else
		res.send('NO');		
});
//监听端口8900
app.listen(8900, () => console.log('listening on port 8900'))
