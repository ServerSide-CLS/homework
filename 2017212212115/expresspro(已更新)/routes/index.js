var express = require('express');
var router = express.Router();
var data = require('../data');

router.get('/', function(req, res, next) {
  page = req.query.page || 1;
  module.exports = page;

  var datas = "{\"message\":[";
  data.message.forEach(function(x){
    if (x.id < page * 8 && x.id >= (page - 1) * 8)
      datas += "{ \"text\": \"" + x.text + "\"},";
      // console.log(x);
  });
  datas += "]}";
  datas = eval('(' + datas + ')');

  page = 2;
  res.render('home', {layout: 'default', messages: datas.message, l1: parseInt(page) - 1, l2: parseInt(page)});
});

module.exports = router;