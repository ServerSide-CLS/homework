const express = require('express')
const fs = require("fs")

const app = express()
app.listen(8900, () => console.log('listening on port 8900'))

//router = express.Router();
// 获取当前时间
app.get('/time', (req, res) => {
    date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    res.send(year+'-'+month+'-'+day+'- '+hour+':'+minute+':'+second)
})

// 获取用户名 
app.post('/user', (req, res) => {
    var data = fs.readFileSync('/etc/passwd');
    var lines = data.toString().split('\n');
    var data_array = new Array();

    lines.forEach(element => {
        if((element=='')){
            return true;
        }
        temp = element.split(':');
        flag = element.split('/');
        if(( flag.pop()=='bash')){
            data_array.push(temp[0])
        }
    })
    
    res.send(data_array)

})


app.get('/phone/:id', (req, res) => {
	var reg= /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    info = ""
    if(( reg.test(req.params.id) )){
        info = "OK"
    }
    else{
        info = "NO"
    }
    res.send(info)
})