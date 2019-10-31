const express = require('express');
const app = express();

const PORT = 8900;
const ITEM_EACH_PAGE = 20;
const ITEM_SUM = 210;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('static'));

app.get('/', (req, res) => {
    const pageSum = Math.ceil(ITEM_SUM / ITEM_EACH_PAGE);

    if (req.query.page < 1 || req.query.page > pageSum) res.redirect('/?page=1');

    const page = parseInt(req.query.page) || 1;
    const [startIndex, endIndex] = getIndexRange(page, ITEM_EACH_PAGE);
    const paginationButtons = getPaginationButtons(page, pageSum);
    res.render('index', {
        currentPage: page,
        itemSum: ITEM_SUM,
        endIndex,
        startIndex,
        paginationButtons,
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));

function getIndexRange(page, itemEachPage) {
    const startIndex = (page - 1) * itemEachPage + 1;
    const endIndex = page * itemEachPage;
    return [startIndex, endIndex];
}

/**
 * 1. 当前页码的旁边总是有5个页码（算上自己）
 * 2. 当前页码总是尽可能在中间
 * 
 * 1 ... 7  8   9   10  11 ... 50
 * |     |      |       |      |
 * |     |      |       |      lastPageIndex
 * |     |      |       rightPageIndex
 * |     |      currentPageIndex
 * |     leftPageIndex
 * firstPageIndex
 */
function getPaginationButtons(page, pageSum) {
    const currentPageIndex = page;
    const firstPageIndex = 1;
    const lastPageIndex = pageSum;
    let leftPageIndex = Math.max(currentPageIndex - 2, 1);
    let rightPageIndex = Math.min(currentPageIndex + 2, lastPageIndex);
    const paginationButtons = [];

    if (leftPageIndex === firstPageIndex) rightPageIndex = Math.min(firstPageIndex + 4, lastPageIndex);
    if (rightPageIndex === lastPageIndex) leftPageIndex = Math.max(lastPageIndex - 4, firstPageIndex);

    paginationButtons.push({ content: "&lt;", page: currentPageIndex === firstPageIndex ? -1 : currentPageIndex - 1 });

    if (leftPageIndex >= firstPageIndex + 1) {
        paginationButtons.push({ content: firstPageIndex, page: firstPageIndex });
        if (leftPageIndex != firstPageIndex + 1) paginationButtons.push({ content: "..." });
    }

    for (let pageIndex = leftPageIndex; pageIndex <= rightPageIndex; pageIndex += 1) {
        paginationButtons.push({ content: pageIndex, page: pageIndex });
    }

    if (rightPageIndex <= lastPageIndex - 1) {
        if (rightPageIndex != lastPageIndex - 1) paginationButtons.push({ content: "..." });
        paginationButtons.push({ content: lastPageIndex, page: lastPageIndex });
    }

    paginationButtons.push({ content: "&gt;", page: currentPageIndex === lastPageIndex ? -1 : currentPageIndex + 1 });

    return paginationButtons;
}