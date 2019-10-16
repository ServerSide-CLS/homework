const express = require('express');
const utils = require('./utils.js');
const app = express();

app.get('/time', (req, res) => {
    res.send(utils.getTime());
});

app.post('/user', (req, res) => {
    let list = utils.readFile('/etc/passwd');
    var tempStr = "";
    for (let i=0; i<list.length; i++){
        tempStr += list[i] + '</br>';
    }
    res.send(tempStr);
});

app.get('/phone/:id', (req, res) => {
    res.send(utils.isvalidPhoneNum(req.params.id));
});

app.get('*', function(req, res){
    res.send('404 NOT FOUND!');
});

app.listen(8900, () =>
    console.log('listening on port 3000')
);