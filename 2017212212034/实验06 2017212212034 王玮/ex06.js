const express = require('express');
const app = express();
const fs = require('fs');
// 这里引用了网上的方法，拓展一个Date的Format方法，不用此方法的话也可以一个一个获取年月日然后进行拼接
Date.prototype.Format = function(fmt)   
{ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

app.get('/', (req,res)=>{
    res.send("Hello World");
});

app.get('/time',(req,res)=>{
    let currentTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    res.send(currentTime.toLocaleString());
});

app.post('/user',(req,res)=>{
    let data = fs.readFileSync('/etc/passwd');
    let line = data.toString().split('\n');
    let userArray = new Array();
    /** 
     * 每一行用户记录的各个数据段用“：”分隔，分别定义了用户的各方面属性:
     * 注册名：口令：用户标识号：组标识号：用户名：用户主目录：命令解释程序
     * */  
    line.forEach(item => {
        let temp = item.split(':');
        if(temp[4] !== '' && item !== '') {
            userArray.push(temp[4]);
        }
    });
    res.send(userArray);
});

app.get('/phone/:id',(req,res)=>{
    let myPattern = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(myPattern.test(req.params.id)) {
        res.send("OK");
    } else {
        res.send("NO")
    }
});

app.listen(8900, () => console.log("Listening on port 8900"));