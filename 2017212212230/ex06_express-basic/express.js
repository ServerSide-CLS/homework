const express = require('express')
const app = express()
const fs = require('fs')

app.all('/', (req, res) => {
  res.send('Hello Express!\n')
})

app.get('/time', (req, res) => {
  res.send(getDate())
})

app.post('/user', (req, res) => {
  const readerStream = fs.createReadStream('/etc/passwd')
  readerStream.setEncoding('UTF8')
  let data = null
  // 读取文本
  readerStream.on('data', chunk => {
    data += chunk
  })
  readerStream.on('end', () => {
    res.send(data.split(/\n/g).map(value => {
      return value.split(/:/)[0]
    }).slice(0, -1))
  })
})

app.get('/phone/:id', (req, res) => {
  res.send(req.params.id.match(/\d{11}/) ? 'OK' : 'NO')
})

app.listen(8900, () => console.log('listening on port 8900'))

getDate = () => {
  const date = new Date()
  return [
    [
      date.getFullYear(),
      getPadStart(date.getMonth() + 1),
      getPadStart(date.getDay())
    ].join('-'),
    [
      getPadStart(date.getHours()),
      getPadStart(date.getMinutes()),
      getPadStart(date.getSeconds())
    ].join(':')
  ].join(' ')
}

getPadStart = t => { return t.toString().padStart(2, '0') }

// Date.prototype.format = function (fmt) {
//   var o = {
//       "M+": this.getMonth() +1 , //月份
//       "d+": this.getDate(), //日
//       "h+": this.getHours(), //小时
//       "m+": this.getMinutes(), //分
//       "s+": this.getSeconds(), //秒
//       "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//       "S": this.getMilliseconds() //毫秒
//   };
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//   for (var k in o)
//       if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//   return fmt;
// }