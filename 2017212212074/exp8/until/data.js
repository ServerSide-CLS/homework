var fs = require('fs'); //文件模块
function getData(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
          if (err) {
            reject(err)
            return
          }
          resolve(JSON.parse(data))
        })
      })
}
function writeData(path,data) {
  return new Promise((resolve, reject) => {
      fs.writeFile(path,JSON.stringify(data), (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
}
module.exports = {
  getData,
  writeData
}