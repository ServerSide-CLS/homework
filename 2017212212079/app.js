const express = require("express");
const app = express();
const fs = require("fs");
app.get("/",(req,res)=>{
    res.send("hello");
});
//获取时间
app.get("/time",(req,res)=>{
    let myDate = new Date();
    let myTime = myDate.toLocaleDateString();
    let hour = myDate.getHours().toString(),
    min = myDate.getMinutes().toString(),
    second = myDate.getSeconds().toString();
    let timeStr = myTime + " " + hour.padStart(2,"0") + ":" + min.padStart(2,"0") + ":" + second.padStart(2,"0");
    res.send(timeStr);
});
//判断电话
app.get("/phone/:id",(req,res)=>{
    let phoneNum = req.params.id;
    if(phoneNum.match(/^[1][0-9]{10}$/)){
        res.send("OK");
    }
    else{
        res.send("NO");
    }
});
//获取用户
app.post("/user",(req,res)=>{
    try {
        let data = fs.readFileSync("/etc/passwd").toString().split("\r\n");
        let result = [];
        data.forEach(item=>{
            result.push(item.split(":")[0]);
        });
        res.send(result);
    } 
    catch (error) {
        res.send(error);
    }
});
app.get("*",(req,res)=>{
    res.send("404 not found");
});
app.listen(8900,()=>{
    console.log("server is running");
});