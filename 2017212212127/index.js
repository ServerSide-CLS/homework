
var fs = require("fs");
const express = require('express')
const app = express()
//当前时间
app.get('/time',(req,res)=>{
	var d =new Date();
	var year=d.getFullYear();
	var month=d.getMonth()+1;
	var date=d.getDate();
	var hour=d.getHours();
	var minute=d.getMinutes();
	var second=d.getSeconds();
	  if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
	  if (date >= 1 && date <= 9) {
            date = "0" + date;
        }
	  if (hour >= 1 && hour <= 9) {
            hour = "0" + hour;
        }
	  if (minute >= 1 && minute <= 9) {
            minute = "0" + minute;
        }
	  if (second >= 1 && second <= 9) {
            second = "0" + second;
        }
	var str='-'
	var str1=':'
	var time=year+str+month+str+date+' '+hour+str1+minute+str1+second
	res.send(time)
})
//获取/etc/passwd中的用户名
app.post('/user',(req,res)=>{
	var data=[]
	fs.readFileSync('/etc/passwd').toString().split(/\n/).forEach((val)=>{
	data=[...data,val.split(':')]
})
	var l=data.length
	var str=''
	for(var i=0;i<l;++i)
		if(data[i])
		str+=data[i][0]+'\n'
	res.send(str)
})
//手机号码，正则表达式
app.get('/phone/:id',function(req,res){
	var p=/^1(3|4|5|7|8)\d{9}$/;
	var str=p.test(req.params.id)?'OK':'NO';
	res.send(str)
});


app.listen(8900, () => console.log('listening on port 8900'))
