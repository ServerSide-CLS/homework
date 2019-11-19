var express = require('express');
var router = express.Router();

const User = require('../models/user');
const auth = require('../utils/auth').verifyToken;

/* GET admin page. */
router.get('/', function (req, res) {
  User.find(function(err, users) {
    console.log(users)
    res.render('admin', {
      title: 'Admin',
      users: users,
    });
  })
});

module.exports = router;
