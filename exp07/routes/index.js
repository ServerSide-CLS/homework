var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const allpages = Array.from(Array(56), (number, i) => i + 1)
  const length = allpages.length;
  const pageSize = 8    //每一页显示的最多的内容数量
  const pageCount = Math.ceil(length / pageSize)  //总的页码数量
  const page = req.query.page || 1 //当前页码
  const data = allpages.slice((page - 1) * pageSize, page * pageSize)   //当前页所显示的内容数据
  const pageCountList = Array.from(Array(pageCount), (number, i) => i + 1)
  //传一个List来确认是否被选中，从而显示当前页面的页码的不同
  const List = pageCountList.map(value => {
    return {
      b: value,
      flag_choose: page == value ? true : false,    
      flag_not_choose: page != value ? true : false 
    }
  })
  console.log(List);
  const prepage = page - 1 > 0 ? page - 1 : 1; //前一页的页码    
  const nextpage = parseInt(page) < parseInt(pageCount) ? parseInt(page) + 1 : pageCount;   //后一页的页码
 
  res.render('home', {
    prepage: prepage,
    nextpage: nextpage,
    List: List,
    data: data,
  });
});

module.exports = router;
