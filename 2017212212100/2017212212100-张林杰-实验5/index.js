#! /user/bin/env node
var argv = require('yargs').argv; //yargs模块引入并解析命令行参数
var func = require("./func"); // 相关功能函数引入


if (argv.n && !argv.l && !argv.a) {
    let result = func.showStudentEarnTotalMoney(argv.n);
    console.log(`姓名:${argv.n} 总额：${result[argv.n]}`)
} else if (argv.n && argv.l == true && !argv.a) {
    func.showOneStudentRecord(argv.n);
} else if (!argv.n && argv.l && !argv.a) {
    let result = func.showStudentEarnTotalMoney();
    Object.keys(result).forEach((key) => {
        console.log(`姓名:${key} 总额：${result[key]}`)
    })
} else if (argv.a == true && !argv.n && !argv.l && Object.keys(argv).length == 3) {
    func.showTotal();
} else {
    console.log('输入参数不符合要求');
    process.exit(-1);
}