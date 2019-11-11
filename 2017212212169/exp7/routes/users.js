var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/', (req, res) => {
    res.render('home', { layout: 'default', params: 'm-home' });
})

module.exports = router;