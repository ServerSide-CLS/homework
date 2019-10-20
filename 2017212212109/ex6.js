const express = require('express');
const fs = require("fs");
const app = express();
const port = 8900;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/time', (req, res) => res.send(getDate()));

app.post('/user', (req, res) => {
    let passwords = [];
    if (fs.existsSync("password.txt")) {
        const file = fs.readFileSync("password.txt", { encoding: "utf8" });
        passwords = file.split('\n');
    }
    res.send(JSON.stringify(passwords));
});

app.get('/phone/:phone', (req, res) => {
    const phone = req.params.phone;
    let isPhoneValid = true;
    if (phone.length !== 11) isPhoneValid = false;
    res.send(`${phone} is ${isPhoneValid ? "OK" : "not OK"}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getDate() {
    let dateString = new Date().toISOString();
    let [date, time] = dateString.split('T');
    let [hour, minute, second] = time.replace(/\..+$/, '').split(":");
    hour = (parseInt(hour) + 8) % 24;
    time = [hour, minute, second].join(':');
    dateString = [date, time].join(' ');
    return dateString;
}