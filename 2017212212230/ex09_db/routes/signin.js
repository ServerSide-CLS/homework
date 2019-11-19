const express = require('express');
const router = express.Router();
const url = require('url');

const auth = require('../utils/auth');

/* GET signin page. */
router.get('/', (req, res) => {
  console.log(req.body)
  res.render('signin', {
    title: 'Sign in',
  });
});

router.get('/verify', (req, res) => {
  let { email, pwd } = url.parse(req.url, true).query
  console.log(email, pwd)
  
  // const User = require('../models/user');
  const User = require('mongoose').model('User');
  User.findOne({ email: email, pwd: pwd }, function (err, doc) {
    console.log('doc' + doc)
    if (err) return console.log(err)
    if (doc) {
      const token = auth.signToken(JSON.stringify(doc));
      console.log(token)
      res.send({
        result: 1,
        token: token,
      })
    } else res.send({ result: 0 })
  })
})

module.exports = router;
