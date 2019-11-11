const path = require('path');
const express = require('express');
const pageRouter = express.Router();

pageRouter.get('/', (req, res, next) => {
    res.redirect('/signUp');
});
pageRouter.get('/signUp', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../pages/signUp.html'));
});
pageRouter.get('/signIn', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../pages/signIn.html'));
});
pageRouter.get('/index', (req, res, next) => {
    if (req.session.email) {
        res.sendFile(path.resolve(__dirname, '../pages/index.html'));
    } else {
        res.redirect('/signIn');
    }
});
pageRouter.get('/admin', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../pages/admin.html'));
});

module.exports = pageRouter;