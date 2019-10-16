// index.js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.send("time\nuser\nphone")
})

app.get('/time', (req, res) => {
	var date = new Date();
    var month = date.getMonth() + 1;
    var month = month <= 9?"0"+month:month;
    var strDate = date.getDate() <= 9?"0"+date.getDate():date.getDate(),
    strHour = date.getHours() <= 9?"0"+date.getHours():date.getHours(),
	strMinute = date.getMinutes() <= 9?"0"+date.getMinutes():date.getMinutes(),
    strSecond = date.getSeconds() <= 9?"0"+date.getSeconds():date.getSeconds();

    var currentdate = date.getFullYear() + "-" + month + "-" + strDate + " " + strHour + ":" + strMinute + ":" + strSecond;
    // var currentdate = date.getFullYear() + "-" + month <= 9?"0"+month:month + "-" + date.getDate() <= 9?"0"+date.getDate():date.getDate() 
    // + " " + date.getHours() <= 9?"0"+date.getHours():date.getHours() + ":" + date.getMinutes() <= 9?"0"+date.getMinutes():date.getMinutes() 
    // + ":" + date.getSeconds() <= 9?"0"+date.getSeconds():date.getSeconds();
	res.send(currentdate);
})

app.post('/user', (req, res) => {
	var fs = require('fs');
	var data = fs.readFileSync('/etc/passwd', 'UTF-8');
	var dataLines = data.split('\n');
	var userString = "";
	dataLines.forEach(line =>{
		var userdata = line.split(":");
		userString += userdata[0]+"\n";
	});
    res.send(userString);
})


app.get('/phone/:id', (req, res) => {
	var len = req.params.id.length;
	var phone = req.params.id.substring(1, len);
    if(/^1\d{10}$/.test(phone)){ 
        res.send("OK");
    } else{
    	res.send("NO");
    }
})

app.get('*', function(req, res){
   res.send('404. Sorry, this is an invalid URL.');
});

app.listen(3000, () => console.log('listening on port 3000'))
