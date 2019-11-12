const express = require('express');
const router = express.Router();
const pageRouter = require('./pageRouter');
const apiRouter = require('./apiRouter');

router.use('/', pageRouter);
router.use('/api', apiRouter);

module.exports = router;