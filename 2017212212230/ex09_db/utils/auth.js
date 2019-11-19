const jwt = require('jsonwebtoken');

const secret = 'yourSecret';

const signToken = function (obj) {
  return jwt.sign(JSON.parse(obj), secret, { expiresIn: 1 })
}

const verifyToken = function (req, res, next) {
  var t = req.headers.authorization;

  console.log('auth' + t)

  if (t) {
    jwt.verify(t, secret, (err, decoded) => {
      if (err) {
        console.log(err)
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        req.currentUser = decoded.usr;
        next();
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
}

module.exports = {
  signToken: signToken,
  verifyToken: verifyToken
}
