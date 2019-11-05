const Handlebars = require('handlebars');

Handlebars.registerHelper('pageChoose', function(pageNow, pagesNum){
	pageNow = parseInt(pageNow);
	pagesNum = parseInt(pagesNum);
	
	let pageChoose = `
		<ul class="pagination">
			<li>
				<a href="/?pageNow=${pageNow - 1 == 0 ? 1 : pageNow - 1}">
				<<
			</li>`;
	
	for (let i = 1; i <= pagesNum; i++) {
		pageChoose += `<li class="${i == pageNow ? 'active' : ''}"><a href="/?pageNow=${i}">${i}</a></li>`;
	}

	pageChoose += `
			<li>
				<a href="/?pageNow=${pageNow + 1 > pagesNum ? pagesNum : pageNow + 1}">
				>>
			</li>
		</ul>`;

	return new Handlebars.SafeString(pageChoose);
    
});