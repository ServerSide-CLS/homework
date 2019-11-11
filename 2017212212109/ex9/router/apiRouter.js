const express = require('express');
const apiRouter = express.Router();
const sendAuthCode = require('../api/sendAuthCode');
const signUp = require('../api/signUp');
const signIn = require('../api/signIn');
const getUserInfoList = require('../api/getUserInfoList');

apiRouter.post('/sendAuthCode', (req, res) => {
    sendAuthCode(req, res);
});

apiRouter.post('/signUp', (req, res) => {
    signUp(req, res);
});

apiRouter.post('/signIn', (req, res) => {
    signIn(req, res);
});

apiRouter.get('/getUserInfoList', (req, res) => {
    getUserInfoList(req, res);
});

module.exports = apiRouter;