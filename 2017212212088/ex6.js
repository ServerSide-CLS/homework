const express = require('express')
const app = express()

app.get('/time', (req, res) => {
    var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	res.send(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
})

app.get('/user', (req, res) => {
	var fs = require('fs');
	var data = fs.readFileSync('/etc/passwd');
	var Da = data.toString().split(/[\n]/g);
	var IDs = "";
	for (var i in Da){
		var ID_ = "";
		for (var j in Da[i]){
			if(Da[i][j] == ':'){
				break;
			}
			ID_ = ID_ + Da[i][j];
		}
		IDs = IDs + ID_ + ' ';
	}
	res.send(IDs);
})

app.get('/phone/:id', function(req, res){
   var regPhone = /^1[3456789]{1}\d{9}$/;
   if(!regPhone.test(req.params.id)) {
   		res.send("NO");
   }
   else{
   		res.send("OK");
   }
});

app.listen(8900, () => console.log('listening on port 8900'))
