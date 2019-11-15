// 验证码生成
function randomVerifyCode(len = 6) {
  let verifyCode = ''
  for (let i = 0; i < len; i++) {
    const type = Math.floor(Math.random() * (3 - 0)) + 1
    switch (type) {
      case 1:
        verifyCode += Math.floor(Math.random() * 10)
        break
      case 2:
        verifyCode += String.fromCharCode(Math.floor(Math.random() * 26 + 65))
        break
      default:
        verifyCode += String.fromCharCode(Math.floor(Math.random() * 26 + 97))
    }
  }
  return verifyCode
};

// res.render参数
function renderParams() {
  let defaultSetting = {
    title: 'Express-Signup',
    verifying: false,
    verifyTime: 0,
    msg: null,
  }
  try {
    for (let [k, v] of Object.entries(arguments[0])) {
      if (k === 'msg') v.color = v.status === 'error' ? 'red' : v.status === 'warn' ? '#ef8f00' : '#68af02';
      defaultSetting[k] = v
    }
    // console.log(defaultSetting)
    return defaultSetting
  } catch { return {} }
}

// 写入用户信息
// function addUesr(email, userInfo) {
//   let msg = {}
//   fs.readFileSync('./user.json', 'utf8', (err, data) => {
//     if (err) return msg = {
//       message: '文件读取错误！',
//       status: 'error'
//     }
//     data = JSON.parse(data)
//     data[email] = userInfo
//     data = JSON.stringify(data, null, 2)
    
//     fs.writeFileSync('./user.json', data, 'utf8', err => {
//       if (err) return msg = {
//         message: '文件写入错误！',
//         status: 'error'
//       }
//       return msg = {
//         message: '恭喜，注册成功！',
//         status: 'success'
//       }
//     })
//   })
//   return msg
// }

module.exports = {
  randomVerifyCode,
  renderParams,
}
