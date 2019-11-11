var express = require('express');
var router = express.Router();

var datas=require("../datas");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.sendFile('/home/clq/script/ex7/public/images/1.jpg');
  page = req.query.page||1;
  console.log(page);
  module.exports=page;
  var data="{\"products\":[";
  datas.products.forEach(function(x){
    if(x.id<page*6 && x.id>=(page-1)*6)
      data +="{ \"image\": \""+x.image+"\", \"name\": \""+x.name+ "\"},";
  })
  data +="]}";
  data =eval('(' + data + ')');
  console.log(data);

  pre = parseInt(page)-1>0?parseInt(page)-1:parseInt(page);
  next = parseInt(page)+1<6?parseInt(page)+1:parseInt(page);

  var now = page;
  if(page <=1 ){
    page = 2;
  }else if(page>=5){
    page = 4;
  }

  res.render('home', {layout: 'default', items: data.products,pre:pre,next:next,l1:parseInt(page)-1,l2:parseInt(page),l3:parseInt(page)+1});
});

module.exports = router;
