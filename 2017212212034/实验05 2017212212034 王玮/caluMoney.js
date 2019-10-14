// 获取参数
const argv = process.argv.splice(2);

const fs = require('fs');

var arr = [];

// 读取文件内容
var data = fs.readFileSync('study.txt');
// 清除数据中做有空格
var student = data.toString().split(/\s+/);
// 这里由于数据一行有四个参数，所以四个一循环将数据作为一个学生对象存入
var index = 0;
for (index; index < student.length; index += 4) {
    var obj = new Object();
    obj.name = student[index];
    obj.date = student[index + 1];
    obj.job = student[index + 2];
    obj.money = student[index + 3];
    arr.push(obj);
}
// 建立一个map，方便后续操作，这里是(key,value)=>(studentName,money)
var stuTotalMoneyList = new Map();

for (let i = 0; i < arr.length; i++) {
    if (!stuTotalMoneyList.has(arr[i].name)) {
        stuTotalMoneyList.set(arr[i].name, arr[i].money)
    } else {
        let tmp = parseInt(stuTotalMoneyList.get(arr[i].name)) + parseInt(arr[i].money);
        stuTotalMoneyList.set(arr[i].name, tmp);
    }
}
// 建立map，用于处理每日挣取的金额，(key,value)=>(date,money)
var dailyEarn = new Map();
for (let i = 0; i < arr.length; i++) {
    if (!dailyEarn.has(arr[i].date)) {
        dailyEarn.set(arr[i].date, arr[i].money);
    } else {
        let tmp = parseInt(dailyEarn.get(arr[i].date)) + parseInt(arr[i].money);
        dailyEarn.set(arr[i].date, tmp);
    }
}

// 参数为-a的情况
if (argv[0] === "-a" && argv.length === 1) {
    // 将map传入Array，并用sort方法按照money排序
    let handleMoneyList = Array.from(stuTotalMoneyList);
    handleMoneyList.sort((a,b) => {
       return a[1] - b[1];
    });
    let minName = handleMoneyList[0][0];
    let maxName = handleMoneyList[handleMoneyList.length - 1][0];

    let dateListList = Array.from(dailyEarn);
    dateListList.sort((a,b) => {
       return a[1] - b[1];
    });
    let minDate = dateListList[0][0];
    let maxDate = dateListList[dateListList.length - 1][0];
    console.log("赚钱最多的学生：" + maxName.padStart(9));
    console.log("赚钱最少的学生：" + minName.padStart(9));
    console.log("赚钱最多的日子：" + maxDate.padStart(14));
    console.log("赚钱最少的日子：" + minDate.padStart(14));
} else if (argv[0] === "-a" && argv.length !== 1) {
    console.log("'-a'只允许单独使用，形如‘XXX -a’");
    process.exit(0);
}else if (argv.length === 1 && argv[0] === "-l") {
    // 这里遍历一下map即可
    for (let [key,value] of stuTotalMoneyList) {
        console.log(key.padEnd(10,' ') + value);
    }
}else if (argv.length === 2 && argv[0] === "-n" &&argv[1] !== null) {
    let studentName = argv[1];
    if (!stuTotalMoneyList.has(studentName)) {
        console.log("查无此人！");
    } else {
        // 从刚刚建立的map中获取键值对即可
        console.log(studentName.padEnd(10) + stuTotalMoneyList.get(studentName));
    }
}else if (argv.length === 3 && argv[0] === "-n" && argv[1] !== null && argv[2] === "-l") {
    let studentName = argv[1];
    let flag = 0;
    for (let i = 0; i < arr.length; i++) {
        if (studentName === arr[i].name) {
            flag = 1;
            console.log(arr[i].name.padEnd(8) + arr[i].date.padEnd(10) + arr[i].job.padStart(8) + arr[i].money.padStart(6));
        }
    }
    if (flag === 0) {
        console.log("查无此人");
    }
} else {
    // 对比了一下shell脚本处理，感觉shell编程中‘getopts’相比于这里的if...else判断，对于逻辑的体现不要清晰得太多。
    console.log("错误的操作");
    console.log("-a  显示统计结果 并且不能够和其他参数混用\n-l  显示所有学生列表\n-n {name} 显示该学生的赚钱总和 \n-n {name} -l 显示该学生赚钱列表\n");
}