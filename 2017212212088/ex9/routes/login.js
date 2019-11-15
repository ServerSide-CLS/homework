var express = require('express');
const login = express.Router();

login.get('/login', function(req, res){
   res.render('login', {
        layout: false,
        title: "登录",
        jquery1:"/static/js/login.js"
    });
});

module.exports = login;