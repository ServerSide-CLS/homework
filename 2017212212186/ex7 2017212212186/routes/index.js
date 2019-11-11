var express = require('express');
var router = express.Router();
const utils = require('../utils')

/* GET home page. */
router.get('/', (req, res, next) => {
	let page = req.query.page || 1
	let data = utils.getBooks(page)
	res.render('index', {...data})
})

module.exports = router;
