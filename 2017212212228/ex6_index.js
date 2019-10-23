const express = require('express')
const app = express()
app.get('/', (req, res) => {
    res.send('Hello world.')
})
app.get('/time', (req, res) => {
    var date = new Date();
    var day = date.getDate()>=10?date.getDate():'0'+date.getDate();
    var year = date.getFullYear();
    var month = (date.getMonth()+1)>=10?date.getMonth()+1:'0'+(date.getMonth()+1);
    var hour = date.getHours()>=10?date.getHours():'0'+date.getHours();
    var minute = date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes();
    var second = date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds();
    res.send(year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second)
})
app.post('/user', (req, res) => {
    var fs = require("fs");
    var data = fs.readFileSync('/etc/passwd');
    res.send(data)
})
app.get('/phone/:id', function(req, res){
    var test = /^[1][3,4,5,6,7,8,9][0-9]{9}/;
    if(req.params.id.match(test)){
        res.send('OK');
    }
    else{
        res.send('No');
    }
});
app.listen(8900)
