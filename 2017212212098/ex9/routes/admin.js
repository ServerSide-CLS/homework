var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

router.get('/',function (req,res,next) {

  User.find(function(err, msg) {
    res.render('admin', { title: 'Admin' ,msg:msg});
  })

});
module.exports = router;
