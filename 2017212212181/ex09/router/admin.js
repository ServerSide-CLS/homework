var express = require('express');
var app = express();
var router = express.Router();
var nodemailer=require('../router/nodemailer');
var bodyParser = require('body-parser');
var Users = require('../public/javascripts/connect');

//获取所有用户的信息
var users=[];
Users.find(function(err,res){
    users = res;
});
router.get('/',function(req,res){
    res.render("admin",{user:users});
});

module.exports = router;