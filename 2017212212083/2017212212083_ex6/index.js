var fs = require('fs');
var filename = "/etc/passwd"
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello world.')
})

app.get('/time', (req, res) => {
    var now = new Date();
    res.send(now.toDateString())
})

app.get('/user', (req, res) => {
    var data = fs.readFileSync(filename);
    res.send(data.toString());
})

app.get('/phone/:id', (req, res) => {
    let phone = /^[1][3,4,5,7,8][0-9]{9}$/
    if (phone.test(req.params.id)) {
        res.send('OK');
    } else {
        res.send('NO');
    }
})

app.listen(8900, () => console.log('listening on port 8900'))
