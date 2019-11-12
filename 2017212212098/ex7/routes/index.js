var express = require('express');
var router = express.Router();
var data = require('../public/javascripts/data');
/* GET home page. */
router.get('/',function(req, res, next) {
  res.redirect("/1");
});
router.get('/:page', function(req, res, next) {
  const page = req.param("page") -1;
  const num =  Math.ceil(data.total/data.limit);
  let arr = [];
  for(let i=1;i<=num;i++){
    arr.push(i)
  }
  const msg = data.msg.slice(page*data.limit,page*data.limit+data.limit);
  res.render('index', {msg,arr});
});

module.exports = router;
