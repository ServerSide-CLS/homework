var fs = require('fs');
const readline = require('readline');
// 需要  npm i yargs
var argv = require('yargs').argv;

var arr = []
const rl = readline.createInterface({
    input: fs.createReadStream('./study.txt')
});

rl.on('line', function (line) {
    arr.push(line.split(/\s+/))
})

rl.on('close', function () {
    //-n和-l同时存在，输出该为同学所有的信息
    //样例 node caluMoney.js -n wang -l
    if (argv.n && argv.l) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == argv.n) {
                console.log(arr[i][0] + " " + arr[i][1] + " " + arr[i][2] + " " + arr[i][3]);
            }
        }
    }
    //只有-n输出改为同学一共赚的钱
    //样例 node caluMoney.js -n wang
    else if (argv.n) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == argv.n) {
                count += parseInt(arr[i][3]);
            }
        }
        console.log(argv.n, count);
    }
    //只用-l输出所有同学一共赚的钱
    //样例 node caluMoney.js -l
    else if (argv.l) {
        let info = {}
        for (let i = 0; i < arr.length; i++) {
            if (info[arr[i][0]]) {
                info[arr[i][0]] += parseInt(arr[i][3]);
            }
            else {
                info[arr[i][0]] = parseInt(arr[i][3]);
            }
        }
        for (i in info) {
            console.log(i.padEnd(10," ")+ info[i])
        }
    }
    //统计结果
    //样例 node caluMoney.js -a
    else if (argv.a) {
        let info = {}
        for (let i = 0; i < arr.length; i++) {
            if (info[arr[i][0]]) {
                info[arr[i][0]] += parseInt(arr[i][3]);
            }
            else {
                info[arr[i][0]] = parseInt(arr[i][3]);
            }
        }
        let keysort = Object.keys(info).sort((a, b) => info[b] - info[a]);
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







