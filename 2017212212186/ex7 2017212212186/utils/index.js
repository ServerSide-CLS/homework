const _ = require('lodash')
const data = require('../data')

function getBookById(id) {
	let books = data.books
	let ret = null

	books.forEach(item => {
		if (item.id === id) {
			ret = {...item}
		}
	})

	return ret
}

function getBooks(page, count = 4) {
	let chunk = _.chunk(data.books, count)
	return {
		totPage: chunk.length,
		currPage: page,
		book: chunk[page - 1],
	}
}

module.exports = {
	getBookById,
	getBooks,
}
