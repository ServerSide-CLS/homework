var express = require('express');
var app = express();
var path = require('path');

// 引用handlebars模块
var hbs = require('express-handlebars')

//工具方法引入
var { isEmail, captchaNumber } = require('./until/until.js')

// 异步读取写入文件数据
var { getData, writeData } = require('./until/data');

//邮件发送方法
var sendMail = require('./until/email');

//使用body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 设置模板引擎
app.set('view engine', 'hbs')
// 设置静态资源目录
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/src')));
// 设置handlebars参数
app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

//注册页面
app.get('/', function (req, res) {
  res.render('home', { layout: 'default' });
});
//发送邮箱验证码
app.post('/sendemail', async function (req, res) {
  let email = req.body.email;
  //获取用户数据
  let userData = await getData('./data/user.json');
  let flag = false;
  for (let i = 0; i < userData.user.length; i++) {
    if (userData.user[i].email == email) {
      flag = true
      break
    }
  }
  //邮箱已存在
  if (flag) {
    res.send({ code: 3000, message: "邮箱已存在" })
    return;
  }
  else {//邮箱不存在
    let designData = await getData('./data/design.json');
    //是否曾经验证过
    let flag2 = -1;
    for (let i = 0; i < designData.design.length; i++) {
      if (designData.design[i].email == email) {
        flag2 = i
        break
      }
    }
    //曾经验证过，那么根据时间戳判断有没有过期，过期进行删除覆盖，没过期三分钟防刷
    if (flag2 != -1) {
      let now = (new Date()).valueOf()
      if (now - parseInt(designData.design[flag2].lasttime) >= 180000) {
        //过期，去除过期信息
        designData.design.splice(flag2, 1)
      }
      else {
        res.send({ code: 3000, message: "请再三分钟后再次尝试" })
        return;
      }
    }
    //在design表中写入注册信息
    let code = captchaNumber()
    let obj = { email: email, lasttime: (new Date()).valueOf() + "", code: code }
    designData.design.push(obj)
    writeData('./data/design.json', designData)
    //发送邮件
    let result = await sendMail(email, code).catch(e=>{
      res.send(e);
      return ;
    });
    res.send(result);
  }
});
//注册
app.post('/register', async function (req, res) {
  let { email, code, password, password2 } = req.body;
  //检测邮箱是否已经存在再user.json
  let userData = await getData('./data/user.json');
  let flag = false;
  for (let i = 0; i < userData.user.length; i++) {
    if (userData.user[i].email == email) {
      flag = true
      break
    }
  }
  if (flag) {
    res.send({ code: 3000, message: "邮箱已存在" })
    return;
  }
  // 检测邮箱格式
  if (!isEmail(email)) {
    res.send({ code: 3000, message: "邮箱格式错误" })
    return;
  }
  // 检测两次密码输入是否一致
  if (password != password2) {
    res.send({ code: 3000, message: "两次密码输入不一致" })
    return;
  }
  // 从design表中提取出验证码
  let designData = await getData('./data/design.json');
  let codeHere = ""
  let last = "";
  for (let i = 0; i < designData.design.length; i++) {
    if (designData.design[i].email == email) {
      codeHere = designData.design[i].code
      last = designData.design[i].lasttime
      break
    }
  }
  let now = (new Date()).valueOf()
  //输入的验证码和json中的验证码是否一样。若一样则注册成功,将邮箱和密码加入东user.json中
  if (codeHere == code) {
    //如果验证码超过三分钟，过期
    if (now - parseInt(last) >= 180000) {
      res.send({ code: 2000, message: "验证码已过期，请重新获取" })
    }
    else {//未过期，注册成功
      userData.user.push({ email: email, password: password })
      writeData('./data/user.json', userData)
      res.send({ code: 2000, message: "注册成功" })
    }
  }
  else {
    res.send({ code: 3000, message: "验证码错误" })
  }
});

//进入不存在路径
app.use('*', function (req, res) {
  res.render('error', { layout: false });
})

app.listen(3000, () => console.log(`listen on 3000! go to http://localhost:3000`));
