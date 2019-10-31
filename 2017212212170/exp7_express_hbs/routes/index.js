const express = require('express')
const utils = require('../utils')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
	let page = req.query.page || 1
	let data = utils.getBooks(page)
	res.render('index', {...data})
})

router.get('/item/:id', (req, res, next) => {
	let id = req.params.id
	let book = utils.getBookById(id)
	console.log(book)
	res.render('item', {book: utils.getBookById(id)})
})

module.exports = router
