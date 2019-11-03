var express = require('express');
var router = express.Router();
var data=require("../public/data/data")
var count=3
const TOTAL_PRODUCT = 30;
//将数组按count分块
Array.prototype.chunk = function(count){
	let result = [];
	//遍历输出成员
	this.forEach((item,index) => {
		//
		let temp = Math.floor(index / count);
		//检验数组是否初始化
		if(!(result[temp] instanceof Array)){
			result[temp] = new Array;
		}
		result[temp].push(item);
	})
	return result;
}

router.get('/', (req, res) => {
  var page = parseInt(req.query.page) || 1
  var chunk=data.product.chunk(count)
  if (req.query.page < 1 || req.query.page > chunk.length) res.redirect('/?page=1');
 
  
  res.render('index', {
	currentPage:page,//当前页数
    numOfPage:chunk.length,//总页数
    product:chunk[page-1]//该页数据
  });
})
module.exports = router;