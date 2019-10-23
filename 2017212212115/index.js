var fs = require('fs');
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello world.')
})

// app.get('/about', (req, res) => {
//     res.send('About page.')
// })


function getDate() {
    let dateString = new Date().toISOString();
    let [date, time] = dateString.split('T');
    let [hour, minute, second] = time.replace(/\..+$/, '').split(":");
    hour = (parseInt(hour) + 8) % 24;
    time = [hour, minute, second].join(':');
    dateString = [date, time].join(' ');
    return dateString;
}
app.get('/time', (req, res) => res.send(getDate()));

app.post('/user', (req, res) => {
    let passwords = [];
    if (fs.existsSync("password.txt")) {
        const file = fs.readFileSync("password.txt", { encoding: "utf8" });
        passwords = file.split('\n');
    }
    res.send(JSON.stringify(passwords));
});

app.get('/phone/:id', (req, res) => {
    let phone = /^[1][3,4,5,7,8][0-9]{9}$/
    if (phone.test(req.params.id)) {
        res.send('OK');
    } else {
        res.send('NO');
    }
})

app.listen(8900, () => console.log('listening on port 8900'))
