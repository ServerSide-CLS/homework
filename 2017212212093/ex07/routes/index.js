

var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('home.hbs', {layout: 'default', params: 'm-home'});
});

module.exports = router;
//////////////////////////////////////////////////////////////////

