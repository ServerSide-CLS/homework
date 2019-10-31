const Handlebars = require('handlebars')

Handlebars.registerHelper('pagination', function (currPage, totPage) {
	let template = ''
	let _currPage = parseInt(currPage)
	let _totPage = parseInt(totPage)

	let prevArrow = `
		<li class="page-item ${1 === _currPage ? 'disabled' : ''}">
			<a class="page-link" href="/?page=${_currPage - 1}" aria-label="Previous">
				<span aria-hidden="true">&laquo;</span>
			</a>
		</li>`

	let nextArrow = `
		<li class="page-item ${_currPage === _totPage ? 'disabled' : ''}">
			<a class="page-link" href="/?page=${_currPage + 1}" aria-label="Next">
				<span aria-hidden="true">&raquo;</span>
			</a>
		</li>`

	for (let i = 1; i <= _totPage; i++) {
		template += `<li class="page-item ${i === _currPage ? 'active' : ''}"><a class="page-link" href="/?page=${i}">${i}</a></li>`
	}

	return new Handlebars.SafeString(prevArrow + template + nextArrow)
})
