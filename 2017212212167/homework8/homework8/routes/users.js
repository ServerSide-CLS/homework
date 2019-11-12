var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
var fsPath = "./user.json";
var ckCode="";
const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则


router.get('/user', function(req, res){

});


module.exports = router;
