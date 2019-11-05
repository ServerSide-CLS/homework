var express = require('express');
var router = express.Router();

/* GET content page. */
router.get('/', function(req, res, next) {
  let array = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
  let nowpage = 1;
  let thispagearray = [];
  let pagenum = 2;
  let pagesize = Math.ceil(array.length/3);
  pagenum = req.query.pagenum || 1;

  thispagearray.push((parseInt(pagenum)-1)*3+1);
  thispagearray.push((parseInt(pagenum)-1)*3+2);
  thispagearray.push((parseInt(pagenum)-1)*3+3);

  //当前页面
  nowpage = pagenum;

  //返回上一页
  if(pagenum < 2){
    pagenum = 2;
  }

  //前往下一页
  if(pagenum >= (parseInt(pagesize) - 2) ){
    pagenum = parseInt(pagesize) - 2;
  }

  pagenum1 = parseInt(pagenum) - 1;
  pagenum2 = parseInt(pagenum) + 1;




  res.render('content',
   { layout:   'default',
     params:   'm-home',
     pagenum:  pagenum,
     pagesize: pagesize,
     pagenum1: pagenum1,
     pagenum2: pagenum2,
     thispagearray: thispagearray,
     nowpage: nowpage,
  });
})


//导出模块
module.exports = router;