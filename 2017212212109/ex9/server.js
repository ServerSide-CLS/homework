const express = require('express');
const session = require('express-session');
const router = require('./router/router');
const dbService = require('./services/dbService');

const app = express();
const PORT = 8900;

app.use(session({
    secret: 'ex9',
    resave: false, //cSpell: disable-line
    saveUninitialized: true,
}));
app.use(express.static('static'));
app.use('/', router);

async function startServer(){
    await dbService.open();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
}

startServer();