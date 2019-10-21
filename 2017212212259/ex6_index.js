const express = require('express')
const app = express()

app.get('/time',(req,res)=>{
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var strdate=date.getDate();
	var hour=date.getHours();
	var min=date.getMinutes();
	var sec=date.getSeconds();
	if(month>=1&&month<=9){
		month="0"+month;
	}
	if(strdate>=1&&strdate<=9){
		strdate="0"+strdate;
	}
	if(hour>=1&&hour<=9){
		hour="0"+hour;
	}
	if(min>=1&&min<=9){
		min="0"+min;
	}
	if(sec>=1&&sec<=9){
		sec="0"+sec;
	}
	var time=year+"-"+month+"-"+strdate+" "+hour+":"+min+":"+sec;
	res.send(time);

})

app.post('/user',(req,res)=>{
	var fs=require('fs');
	var data=fs.readFileSync("/etc/passwd").toString().split("\n");
	var username=[];
	for(var i=0;i<data.length;i++){
		username.push(data[i].split(":")[0]);
	}
	res.send(username);
})

app.get('/phone/:id',(req,res)=>{
	var phonenum=req.params.id;
	if(/^1[3456789]\d{9}$/.test(phonenum)){
		res.send("OK");
	}
	else{
		res.send("NO");
	}
})

app.listen(8900,()=>console.log('listening on port 8900'))