var Designer = require("../mongodb/designer")
function designerfind(email) {
  return new Promise((resolve, reject) => {
    Designer.find({ email: email }, function (err, docs) {
      if (err) {
        reject(err)
      }
      else {
        resolve(docs)
      }
    })
  })
}
function designerinsert(email, lasttime, code) {
  return new Promise((resolve, reject) => {
    Designer.insertMany([{ email: email, lasttime: lasttime, code: code }], function (err, docs) {
      if (err) {
        reject(err)
      }
      else {
        resolve(docs)
      }
    })
  })
}
function designerremove(email) {
  return new Promise((resolve, reject) => {
    Designer.deleteOne({ email: email}, function (err, docs) {
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
  designerfind,
  designerinsert,
  designerremove
}