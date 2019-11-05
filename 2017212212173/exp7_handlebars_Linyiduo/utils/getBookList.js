const bookdata = require('./bookData');

function getBookList(pageNow) {
    let totalPointer = 1;
    let list = new Array();
    let temp = new Array();
    
    for (let i = 0; i < bookdata.books.length; i++) {
        if ((totalPointer) % 9 != 0){
            temp.push(bookdata.books[totalPointer-1]);
        }
        else {
            list.push(temp);
            temp = new Array();
        }
        totalPointer++;
    }
    let pagesNum = list.length;

	return {pageNow, pagesNum, book: list[pageNow - 1],
	}
}

module.exports = {getBookList};