var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const pageSum = Array.from(Array(56), (number, i) => i + 1)
  const length = pageSum.length;
  const pageLength = 8 
  const pageCount = Math.ceil(length / pageLength)
  const page = req.query.page || 1 
  const data = pageSum.slice((page - 1) * pageLength, page * pageLength) 
  const pageList = Array.from(Array(pageCount), (number, i) => i + 1)
  const List = pageList.map(value => {
    return {
      v: value,
      flag_choose: page == value ? true : false,    
      flag_not_choose: page != value ? true : false 
    }
  })
  const prepage = page - 1 > 0 ? page - 1 : 1; 
  const nextpage = parseInt(page) < parseInt(pageCount) ? parseInt(page) + 1 : pageCount; 
 
  res.render('index', {
    prepage: prepage,
    nextpage: nextpage,
    data: data,
    List: List,
  });
});

module.exports = router;
