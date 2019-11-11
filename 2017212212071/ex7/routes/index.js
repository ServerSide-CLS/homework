var express = require('express');
var router = express.Router();
var data = require('../public/javascripts/data/data');

/* GET home page. */
router.get('/',function(req, res, next) {
  res.redirect("/1");
});

router.get('/:page', function(req, res, next) {
  const recentPage = req.param("page");
  const countPage =  Math.ceil(data.count/data.limit);
  const id = data.id.slice((recentPage-1)*data.limit,(recentPage-1)*data.limit+data.limit);
  const pages = new Array(countPage).fill('').map( (item, index) => index+1);
  res.render('index', {id,pages,countPage});
});

module.exports = router;
