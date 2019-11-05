var express = require('express');
var router = express.Router();
var data = require('../data');

router.get('/', function(req, res, next) {
  page = req.query.page || 1;
  module.exports = page;
  datas = "{\"photo\":[";
  data.photo.forEach(function(x){
    if (x.id < page * 6 && x.id >= (page - 1) * 6)
      datas += "{ \"image\": \"" + x.image + "\"},";
  });
  datas += "]}";
  datas = eval('(' + datas + ')');

  page = 2;

  res.render('home', {layout: 'default', photo: datas.photo, l1: parseInt(page) - 1, l2: parseInt(page)});

});

module.exports = router;