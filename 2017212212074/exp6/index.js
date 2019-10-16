const fs = require('fs');
const readline = require('readline');
// express 需要npm i express
const express = require('express');
const app = express();
//  第三方时间日期处理库 需要npm i moment
const moment = require('moment');

// 移动手机号段
const yidongNum = ['134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '172', '178', '182', '183', '184', '187', '188', '198'];
// 判断是否为移动手机号
function isPhoneAvailable(phonenum) {
    //判断手机号是否为11位数字
    if (/^\d{11}$/.test(phonenum)) {
        //判断手机号前三位段号是否在移动手机号段范围中
        let flag = false
        yidongNum.forEach(value => {
            if (value == phonenum.substring(0, 3)) {
                flag = true
            }
        })
        return flag
    }
}

app.get("/time", (req, res) => {
    //获取当前时间并格式化并返回前端
    res.send(moment().format("YYYY-MM-DD hh:mm:ss"));
}
)
app.post("/user", (req, res) => {
    var arr = []
    //逐行读取passwd文件
    const rl = readline.createInterface({
        input: fs.createReadStream('/etc/passwd')
    });
    rl.on('line', function (line) {
        //每一行按照冒号进行分割，第一个字符串即是用户名
        arr.push(line.split(':')[0])
    })
    rl.on('close', function () {
        //返回所有用户名的数组
        res.send(arr)
    })
}
)

app.get("/phone/:id", (req, res) => {
    // 获取得到动态参数即手机号码
    let phonenum = req.params.id
    // 使用函数进行判断是否为移动手机号码
    if (isPhoneAvailable(phonenum)) {
        res.send("OK")
    }
    else {
        res.send("NO")
    }
}
)
//当访问的路由不是以上三个时，显示路由错误信息
app.use('*', function (req, res) {
    res.send('404. Sorry, this is an invalid URL.');
})

//监听8900端口信息
app.listen(8900, () => console.log('listening on port 8900'))