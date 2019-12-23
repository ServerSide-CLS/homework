var express = require('express');
var router = express.Router();

var data = require('../public/images/imgData');

/* GET home page. */

router.get('/', function(req, res,next) {
	let imgData = data.imgData
	let imgItems = new Array()
	imgData.forEach(item => {
		imgItems.push(item.src)
	})
	let count = imgItems.length
	let pagesize = 6
	let pageCount = Math.ceil(count/pagesize)
	let pageNumber = parseInt(req.query.page) || 1
	let lastPage = pageNumber > 1 ? pageNumber-1 : 1
	let nextPage = pageNumber < pageCount ? pageNumber+1 : pageCount
	let pagination = new Array()
//	console.log(pageCount)
//	console.log(pageNumber)
	let Data = Array()
	for(var i = 1;i <= pageCount; i++)
	{
		Data[i] = imgItems.slice((i - 1) * pagesize,i * pagesize);
	}
	for(let i = 1 ; i <= pageCount ; i++)
		pagination.push(i)
	
	
	res.render('index', {
		lastPage:lastPage,
		nextPage:nextPage,
		pagination:pagination,
		pageNumber:pageNumber,
		data:Data[pagination[pageNumber - 1]]
	});
});

module.exports = router;
