var User = require("../mongodb/user")
function userfind(email) {
  return new Promise((resolve, reject) => {
    User.find(email, function (err, docs) {
      if (err) {
        reject(err)
      }
      else {
        resolve(docs)
      }
    })
  })
}
function userinsert(email, password) {
  return new Promise((resolve, reject) => {
    User.insertMany([{ email: email, password: password }], function (err, docs) {
      if (err) {
        reject(err)
      }
      else {
        resolve(docs)
      }
    })
  })
}
module.exports = {
  userfind,
  userinsert
}