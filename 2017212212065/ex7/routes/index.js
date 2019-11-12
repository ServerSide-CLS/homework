var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const In = Array.from(Array(53),(a,b)=>b + 1);;
  const num = In.length;
  const sz = 8;
  const pagen = parseInt((num-1)/sz)+1;
  const page = req.query.page || 1;
  const data = In.slice((page-1)*sz,page*sz);
  const pagelst = Array.from(Array(pagen),(a,b)=>b + 1);
  const nextpage = parseInt(page) + 1 > pagen?pagen:parseInt(page) + 1;
  const prepage = parseInt(page) - 1 < 1? 1:parseInt(page) - 1;
  res.render('index', { 
    data:data,
    pageLst:pagelst,
    page:page,
    nextpage:nextpage,
    prepage:prepage,
  });
});
module.exports = router;