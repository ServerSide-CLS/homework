var fs = require('fs');
// 异步读取
// 参数1：文件路径，
// 参数2：读取文件后的回调
// fs.readFile('D:\study.txt', function (err, data) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("异步读取: " + data.toString());
//  });
var study = fs.readFileSync('study.txt', 'utf-8');
var data=study.toString().split("\n");
var data_row = new Array();

data.forEach(element => {
    var arr = element.split(/\s+/);
    data_row.push({
        name:arr[0],
        time:arr[1],
        job:arr[2],
        money:arr[3]
    });
});

var student = new Object();
var study = new Object();

data_row.forEach(element => {
    student[element.name] = 0;
    study[element.time] = 0;
});
data_row.forEach(element => {
    student[element.name] += Number(element.money);
    study[element.time] += Number(element.money);
});

// nodejs获取命令行参数
// process是一个全局对象，argv返回的是一组包含命令行参数的数组。第一项为”node”，
// 第二项为执行的js的完整路径，后面是附加在命令行后的参数，splice(2)是第一个参数arg1。
// console.log('所传递的参数是：', arguments);
// 所传递的参数是： [ '-n', 'wang', '-l' ]

var arguments = process.argv.splice(2);

if (arguments[0] == "-n" && arguments[2] == "-l") {
    data_row.forEach(element => {

        if (arguments[1] == element.name) {
            console.log(
                element.name.toString() + "\t" + 
                element.time.toString() + "\t" + 
                element.job.toString() + "\t" + 
                element.money.toString()
            );
        }
        
    });
}

else if (arguments[0] == "-l") {
    for (var name in student) {
        console.log(name + "\t" + student[name]);
    }
}

else if (arguments[0] == "-n") {
    for (var name in student) {
        if (arguments[1] == name)
            console.log(student[name]);
    }
}

else if (arguments[0] == "-a") {
    var maxName, minName, maxDate, minDate;
    var maxMoney1 = 0, minMoney1 = 10000;
    var maxMoney2 = 0, minMoney2 = 10000;
    for (var name in student) {
        if (maxMoney1 < student[name]) {
            maxName = name;
            maxMoney1 = student[name];
        }
        if (minMoney1 > student[name]) {
            minName = name;
            minMoney1 = student[name];
        }
    }
    for (var day in date) {
        if (maxMoney2 < date[day]) {
            maxDate = day;
            maxMoney2 = date[day];
        }
        if (minMoney2 > date[day]) {
            minDate = day;
            minMoney2 = date[day];
        }
    }
    console.log(
        "赚钱最多的学生:\t" + maxName +
        "\n赚钱最少的学生:\t" + minName +
        "\n赚钱最多的日子:\t" + maxDate +
        "\n赚钱最少的日子:\t" + minDate
    );
}