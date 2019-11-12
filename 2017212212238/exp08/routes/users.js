var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/about', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
