const express = require('express');
const fs = require('fs');
const app = express();
Date.prototype.format = function(formatStr){
  let str = formatStr;
  str=str.replace(/yyyy|YYYY/,this.getFullYear());
  str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
  str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
  str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
  str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
  str=str.replace(/ss/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
  return str;
};

app.get('/', (req, res) => {
  res.send('Hello world.')
});

app.get('/time', (req, res) => {

  res.send(new Date().format("yyyy-MM-dd HH:mm:ss"))

});

app.post('/user', (req, res) => {
  let data = fs.readFileSync("/etc/passwd").toString().split("\n").map((item)=>{
    return item.split(":")[0]
  });

  res.send(data)
});

app.get('/phone/:id', (req, res) => {
  const regPhone = /^1[3|5|7|8]\d{9}$/;
  let response= regPhone.test(req.params.id)?"OK":"NO";

  res.send(response)
});

app.listen(8900, () => console.log('listening on port 8900'));
