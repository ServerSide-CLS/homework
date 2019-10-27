const express = require('express')
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();
app.get('/',(req,res) => {
    res.send("Hello world")
})

app.get('/time',(req,res) => {
    var date=new Date();
    var year= date.getFullYear();
    var month= date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    res.send(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
})
app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this route!");
 });

 app.post('/user',(req, res) =>{
    let data = fs.readFileSync("/etc/passwd").toString().split(" ").map((item)=>{
        return item.split(":")[0]
      });
    
    res.send(data)
  });
// curl -X POST http://localhost:8900/user
app.get('/phone/:id',(req,res) => {
  var params = req.params;
  var reg = /^[1][3-9][0-9]{9}$/;
  console.log(params)
  if(reg.test(params.id)){
      res.send('correct');
  }
  else{
      console.log(params);
      res.send('wrong');
  }
});

app.listen(8900,() => console.log('listening on port 8900'))