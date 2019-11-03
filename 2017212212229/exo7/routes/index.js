var express = require('express');
var router = express.Router();
const data = require('../imgData');

/* GET home page. */
router.get('/', function(req, res, next) {
	let imgData = data.imgData
	let imgItems = new Array()
	imgData.forEach(item => {
		imgItems.push(item.src)
	})
	let count = imgItems.length
	let pagesize = 6
	let pageCount = Math.ceil(count/pagesize)
	let pageNumber = parseInt(req.query.page) || 1
	let Data = imgItems.slice((pageNumber-1)*pagesize,pageNumber*pagesize)
	let lastPage = pageNumber > 1 ? pageNumber-1 : 1
	let nextPage = pageNumber < pageCount ? pageNumber+1 : pageCount
	let pagination = new Array()
	for(let i = 1 ; i <= pageCount ; i++)
		pagination.push(i)
	res.render('index', {
		lastPage:lastPage,
  		nextPage:nextPage,
  		pagination:pagination,
  		pageNumber:pageNumber,
		data:Data
	}); 
});

module.exports = router;
