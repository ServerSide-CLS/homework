var express = require('express');
var app = express();
var router = express.Router();
var nodemailer=require('../js/nodemailer');
var bodyParser = require('body-parser');
var Users=require('../js/connect');

var users=[];

Users.find(function(err,res){
    users=res;
})
router.get('/',function(req,res){
    res.render("admin",{user:users});
});


module.exports = router;
