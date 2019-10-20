const express = require('express')
const app = express()

app.get('/time',(req,res)=>{
    var time=new Date();
    var d1=time.toLocaleDateString();
    var d2=time.toTimeString().substr(0,8);
    res.send(d1+' '+d2+'\n');
});


app.post('/user',(req,res)=>{
    var fs=require("fs");
    var data=fs.readFileSync('/etc/passwd').toString();
    //用列表储存每一行
    var data=data.split('\n');
    var str='';
    for(var i in data){
        str=str+data[i].split(':')[0]+'\n';
    }
    //控制空行
    str=str.trimRight();
    str+='\n'
    res.send(str);
});


app.get('/phone:id',(req,res)=>{
    //正则判断
    var myreg = /^:+(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    if (!myreg.test(req.params.id) ){
        res.send("NO\n")
    } else {
        res.send("OK\n")
    }
    res.send(req.params.id.sub(1))
});


app.get('*', function(req, res){
    res.send('404. Sorry, this is an invalid URL.');
 });

app.listen(8900, () => console.log('listening on port 8900'))