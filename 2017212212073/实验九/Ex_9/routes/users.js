var express = require('express');
var router = express.Router();
var app = express();

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
