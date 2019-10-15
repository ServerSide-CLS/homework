//读取text文件内容
var fs = require("fs");
//异步读取
//参数1：文件路径
//参数2：读取文件后的回调

var readline = require('readline');


//创建文件流读取器
var rl = readline.createInterface({

    input:fs.createReadStream("./study.txt")
});

//设置编码为utf8
rl.setEncoding('UTF8');


rl.on('line', function (line) {

    //按多个空格,回车,换行等空白符分割
    arr.push(line.split(/\s+/))
});

rl.on('close', function () {
    if (argv.n) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == argv.n) {
                count += parseInt(arr[i][3]);
            }
        }
        console.log(argv.n, count);
    }
        
    else if (argv.l) {
        let sum = {}
        for (let i = 0; i < arr.length; i++) {
            if (sum[arr[i][0]]) {
                sum[arr[i][0]] += parseInt(arr[i][3]);
            }
            else {
                sum[arr[i][0]] = parseInt(arr[i][3]);
            }
        }
        for (i in sum) {
            console.log(i.padEnd(10," ")+ sum[i]);
        }
    }

    else if (argv.n && argv.l) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == argv.n) {
                console.log(arr[i][0] + " " + arr[i][1] + " " + arr[i][2] + " " + arr[i][3]);
            }
        }
    }

    //统计并输出结果
    else if (argv.a) {
        let sum = {}
        for (let i = 0; i < arr.length; i++) {
            if (sum[arr[i][0]]) {
                sum[arr[i][0]] += parseInt(arr[i][3]);
            }
            else {
                sum[arr[i][0]] = parseInt(arr[i][3]);
            }
        }
        let keysort = Object.keys(sum).sort((a, b) => sum[b] - sum[a]);//排序
        console.log("赚钱最多的学生：" + keysort[0])
        console.log("赚钱最少的学生：" + keysort[keysort.length - 1])
        let daysort=arr.sort(((a, b) => parseInt(b[3]) - parseInt(a[3])))
        console.log("赚钱最多的日子：" + daysort[0][1])
        console.log("赚钱最少的日子：" + daysort[daysort.length - 1][1])
    }
    else { 
        console.log('参数不正确')
        console.log('正确参数形式：')
        console.log('caluMoney.js -n wang -l')
        console.log('caluMoney.js -n wang')
        console.log('caluMoney.js -l')
        console.log('caluMoney.js -a')
    }

})
