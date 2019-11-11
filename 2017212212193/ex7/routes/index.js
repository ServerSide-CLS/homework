var express = require('express');
var router = express.Router();

router.get('/', function(req, res,next){
  let ret = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',"16",'17','18','19','20','21','22','23']
  let ret_new=[]
  let count = ret.length
  let pagesize = 4//一页的产品数量
  var pageNumber = 1;//当前page
  let pageCount = Math.ceil(count/pagesize)//页面总数
  pageNumber = req.query.pageNumber || 1//获取url参数

  if(pageNumber <= pageCount){
    for(var i = 0,j = (pageNumber-1)*pagesize; i < pagesize, j < (pageNumber)*pagesize; i++,j++){
      if(j < count){
        ret_new[i] = ret[j]
      }
    }
  }

  if(pageNumber < 3){
    pageNumber = 2
  }
  if(pageNumber >= pageCount){
    pageNumber = pageCount-1
  }

  pageNumber_add1 = parseInt(pageNumber)+1
  pageNumber_del1 = parseInt(pageNumber)-1
 
  res.render('form',{
    ret,
    ret_new,
    pageCount,
    pageNumber,
    pageNumber_add1,
    pageNumber_del1,
    count
  })
})

module.exports = router;




