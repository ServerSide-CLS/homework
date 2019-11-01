const { sendAuthCodeService, verifyAuthCodeService } = require('./services/authCodeService');
const express = require('express');
const path = require("path");
const fs = require('fs');
const app = express();

const PORT = 8900;
const userSet = new Set();

app.use(express.static('pages'));

app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'pages/login.html'), err => {
        if (err) next(err);
    });
});

app.post('/api/sendAuthCode', (req, res) => {
    const { email } = req.query;
    const result = sendAuthCodeService(email);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.post('/api/signUp', (req, res) => {
    const { email, authCode, password, passwordAgain } = req.query;
    const result = {
        success: false,
        message: '',
    }
    const emailRegex = new RegExp(/^\w+@\w+\.com$/);

    if (!email || !authCode || !password || !passwordAgain) {
        result.message = '参数缺失';
    } else if (emailRegex.test(email) !== true || password !== passwordAgain) {
        result.message = '参数不符合要求';
    } else if (verifyAuthCodeService(email, authCode) !== true) {
        result.message = '验证码错误';
    } else if (userSet.has(email)) {
        result.message = '用户已存在';
    } else {
        result.success = true;
    }

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
    
    if(result.success){
        userSet.add(email);
        fs.writeFile('./users.txt', email + ' ' + password + '\n', { flag: 'a' }, err => {
            if (err) throw err;
        });
    }
});

const usersTxt = fs.readFileSync("./users.txt", { encoding: "utf8" });
usersTxt.split('\n').forEach(userInfo => {
    const email = userInfo.split(' ')[0];
    if (email) userSet.add(email);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));