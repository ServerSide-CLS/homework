const express = require('express')
const app = express()
app.get('/time',(req,res)=>{
	var now = new Date();
	res.send(now.toLocaleString());
})

app.post('/user',(req,res)=>{
	var fs=require('fs');
	var data=fs.readFileSync('/etc/passwd');
	var ans=data.toString().split(/[\n\r]/);
	for(var i=0;i<ans.length;i++){
		ans[i]=ans[i].substr(0,ans[i].indexOf(":")-1);
	}
	res.send(ans);
	
})

app.get('/phone/:id([1][3,4,5,7,8][0-9]{9})',(req,res)=>{
	res.send('OK');
})

app.get('/phone/*',(req,res)=>{
	res.send('NO');
})

app.listen(8900, () => console.log('listening on port 8900'))
