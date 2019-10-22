//Author:fuu -----  Data:2019-10-22
const express = require('express');
const app = express();

//监听8900窗口
app.get('/', (req, res) => {
  res.send('Welcome to my Express Server!')
  res.end();
  console.log('Server running at http://127.0.0.1:8900/');
})
app.listen(8900, () => console.log('listening on port 8900'));

//以get方法访问 /time 以 yyyy-mm-dd hh:mm:ss 返回当前时间
app.get('/time', (req, res) => {
  var date = new Date()
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes()+ seperator2 + date.getSeconds();
    
  res.send('当前时间为：'+ currentdate );
  res.end();
  console.log('Server running at http://127.0.0.1:8900/');
})

//以post方法访问 /user 显示 /etc/passwd 中所有的用户名
app.get('/user', (req, res) => {
  var http = require('http');
  var fs = require('fs');
  var content =  fs.readFileSync('/etc/passwd', "utf-8");
  lines = content.split('\n');
  //以行为单位读入
  res.writeHead(200, {'Content-Type': 'text/plain'});
  for (var i = 0;i < lines.length;i++) {
    var line = lines[i];
    if(!line) {
      continue;
    }
    //以冒号作为分隔符
    var data = line.split(':');
    //第一个是用户名
    res.write(data[0]+"\n", "text");
        
  }
  res.end();
  console.log('Server running at http://127.0.0.1:8900/');
})

//检测传入id的格式是否为有效的移动电话，正确返回OK，否则返回NO
app.get('/phone/:id', (req, res) => {
  //只能匹配首位为1,第二位为345789中的一位的电话号码
  var reg= /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;
  if (reg.test(req.params.id)) {
    res.send('YES');
  }
  else {
    res.send('NO');
  }
  res.end();
  console.log('Server running at http://127.0.0.1:8900/');
})

//错误路径提示
app.get('*', function(req, res) {
  res.send('404. Sorry, this is an invalid URL.');
});