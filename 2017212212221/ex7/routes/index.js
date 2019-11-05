var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var totProduction=new Array(99); 
  for(var i=1;i<=99;i++)totProduction[i-0]=i;
  var pages=parseInt(totProduction.length*1.0/8+0.5);

  var page=req.query.page?parseInt(req.query.page):1;
  var lastpage=page-1>0?page-1:1;
  var nextpage=page+1>=pages?pages:page+1;

  var curProduction=totProduction.slice((page-1)*8,page*8);
  var lpages=new Array(pages);
  for(var i=1;i<=pages;i++)lpages[i-0]=i;
  
  res.render('home',{
    lastpage:lastpage,
    nextpage:nextpage,
    lpages:lpages,
    curProduction:curProduction
  });
});

module.exports = router;
