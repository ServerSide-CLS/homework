const express = require('express');
const fs = require('fs');
const app = express();

app.listen(8900, () => console.log('listening on port 8900'));

app.get('/time',(req,res)=>{
	data = new Date();
	var year = data.getFullYear();
	var month = data.getMonth()+1;
	var day = data.getDate();
	var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var flag=year+'-'+month+'-'+day+'  '+hour+':'+minute+':'+second;
    res.send(flag);
})

app.post('/user',(req,res)=>{
	var data = fs.readFileSync('/ect/passwd');
	var dataLines = data.split('\n');
	var userArray="";
	dataLines.forEach(line=>{
		var userdata = line.split(":");
		userArray += userdata[0]+"\n";
	});
	res.send(userArray);
})

app.get('/phone/:id',(req,res)=>{
	var phone = /^1[3|5|7|8]\d{9}$/;
	var isphone=phone.test(req.params.id)?"OK":"NO";
	res.send(isphone);
})

