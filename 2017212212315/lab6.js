const express = require('express');
const app = express();
const fs=require('fs');

//获取当前时间
function getTime(){
	var time=new Date();
	var year=time.getFullYear().toString().padStart(4,"0");
	var month=(time.getMonth()+1).toString().padStart(2,"0");
	var day=time.getDate().toString().padStart(2,"0");
	var hours=time.getHours().toString().padStart(2,"0");
	var minutes=time.getMinutes().toString().padStart(2,"0");
	var seconds=time.getSeconds().toString().padStart(2,"0");
	return year+"-"+month+"-"+day+" "+hours+"-"+minutes+"-"+seconds;
}

//获得/etc/passwd中的用户名
function getUserName(){
	var userNames=new Array();
	var data=fs.readFileSync('/etc/passwd');
	data=data.toString("UTF-8").trim().split("\n");
	for(i=0;i<data.length;i++){
		value=data[i].trim().split(':');
		userNames[i]=i.toString()+":"+value[0];
	}
	return "用户名有：\n"+userNames.join('\n');
}


app.get('/time',(req,res) => {
	res.send(getTime());
});

app.post('/user',(req,res) =>{
	res.send(getUserName());
});

app.get('/phone/:id',(req,res) =>{
	//判断是否为有效的移动电话，11位为有效格式
	var reg=/^\d{11}$/.test(req.params.id);
	if(reg)
		res.send("YES");
	else
		res.send("NO");
});
app.listen(8900,() => console.log('listening on port 8900'));