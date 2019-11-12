var express=require('express');

var router = express.Router();

router.get('/',function(req,res,nex){
	const items = Array.from(Array(28),(v,k) => k+1)
	const count = items.length
	var itemimg = [];
	for(var i =0 ;i<count;i++){
		itemimg.push("/images/"+(i+1)+".jpg")
	}
	const pageSize = 4
	const pageCount = Math.ceil(count/pageSize)
	const page = req.query.page || 1
	const imgdata = itemimg.slice((page -1)* pageSize,page * pageSize )
	const data = items.slice((page -1)* pageSize,page * pageSize )
	const pageCountList = Array.from(Array(pageCount),(v,k) => k+1)
	res.render('index',{
		layout: 'default',
		page:page,
		pageCount:pageCount,
		pageCountList:pageCountList,
		imgdata:imgdata,
		data:data,
	});
});


module.exports = router;