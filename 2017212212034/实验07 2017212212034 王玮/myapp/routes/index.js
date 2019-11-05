var express = require('express');
var methods = require('../public/javascripts/methods');
var router = express.Router();

router.get('/good', (req, res) => {
  let query = {
    page: 1,
    limit: 9
  };
  if(req.query && Object.keys(req.query).length != 0){
    query = req.query;
  }
  // console.log(query.page, query.limit)
  res.render("home", {layout: "default.hbs", list: methods.getGoodListByPage(query.page, query.limit)});
});



module.exports = router;