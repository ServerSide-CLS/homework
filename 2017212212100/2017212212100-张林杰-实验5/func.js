const fs = require('fs'); // fs模块引入

/**
 * 实体类student
 */
class Student {
    constructor(name, date, job, salary) {
        this.name = name;
        this.date = date;
        this.job = job;
        this.salary = salary;
    }
    printInfo() {
        console.log(`${this.name}   ${this.date}   ${this.job}  ${this.salary}`);
    }
}


/**
 * 将数据从文件中读出
 */
function getData() {
    let studentArray = [];
    try {
        fs.readFileSync("study.txt").toString().split('\r\n').forEach((line) => {
            studentArray.push(new Student(...line.split(/\s+|,|@|#/)))
        })
    } catch (e) {
        console.log("文件读取发生异常");
        process.exit(-1);
    }
    return studentArray;
}


/**
 * 根据姓名计算该学生所赚的钱的总额,没传参数则输出所有学生所赚钱的总额
 * @param {String} name 可空
 */
function showStudentEarnTotalMoney(name) {
    let sum = {};
    getData().forEach((student) => {
        let keys = Object.keys(sum);
        if (keys.indexOf(student.name) <= -1) {
            sum[student.name] = 0;
        }
        sum[student.name] += parseInt(student.salary);
    })
    return sum;
}



/**
 * 根据学生姓名输出该学生的记录
 * @param {String} name  不可空
 */
function showOneStudentRecord(name) {
    getData().forEach((student) => {
        if (name == student.name) {
            student.printInfo();
        }
    })
}



/**
 * 输出统计情况
 */
function showTotal() {

    let sum = showStudentEarnTotalMoney();
    let sumArray = [];
    // 对象转化为对象数组，便于使用数组的方法
    Object.keys(sum).forEach((key) => {
        sumArray.push({ name: key, sum: sum[key] });
    })
    // 结果输出
    console.log("赚钱最多的学生：" + sumArray.reduce((p, n) => p.sum < n.sum ? n : p).name);
    console.log("赚钱最少的学生：" + sumArray.reduce((p, n) => p.sum > n.sum ? n : p).name);

    // 变量重新初始化
    sumArray = JSON.parse(JSON.stringify([]));

    let data = getData();
    let temp = {}
    data.forEach((student) => {
        let key = Object.keys(temp);
        if (key.indexOf(student.date) <= -1) {
            temp[student.date] = 0;
        }
        temp[student.date] += parseInt(student.salary);
    })
    Object.keys(temp).forEach((key) => {
        sumArray.push({ date: key, sum: temp[key] });
    })
    console.log("赚钱最多的日志：" + sumArray.reduce((p, n) => p.sum < n.sum ? n : p).date);
    console.log("赚钱最少的日志：" + sumArray.reduce((p, n) => p.sum > n.sum ? n : p).date);
}




/**
 * 相关函数导出
 */
module.exports = {
    showOneStudentRecord,
    showStudentEarnTotalMoney,
    showTotal
}