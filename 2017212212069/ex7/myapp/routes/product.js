var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    let id = parseInt(req.query.id) || 1;
    res.render('product', {layout: 'default', headMessage: '产品' + id});
})

module.exports = router;
