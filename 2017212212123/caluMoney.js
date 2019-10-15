// 读取文本文档内容
var fs = require("fs");
var data = fs.readFileSync('study.txt', 'utf-8');

// 处理文件数据
var study = data.toString().split("\n");
var study_line = new Array();
study.forEach(element => {
    var t = element.split(/\s+/);
    study_line.push({
        name:t[0],
        time:t[1],
        job:t[2],
        money:t[3]
    });
});
// console.log(study_line);

// 分析数据
var student = new Object();
var date = new Object();
study_line.forEach(element => {
    student[element.name] = 0;
    date[element.time] = 0;
});
study_line.forEach(element => {
    student[element.name] += Number(element.money);
    date[element.time] += Number(element.money);
});
var sorted_student = Object.keys(student).sort((a,b)=>{
    return student[a]-student[b];  // 升序
});
var minName = sorted_student[0], maxName = sorted_student.pop();
var sorted_date = Object.keys(date).sort((a,b)=>{
    return date[a]-date[b];
});
var minDate = sorted_date[0], maxDate = sorted_date.pop();
// console.log(sorted_student);
// console.log(student);
// console.log(date);

// 获取分析命令行参数
var arguments = process.argv.splice(2);
if (arguments[0] == "-n") {
    if (arguments[2] == "-l")
        study_line.forEach(element => {
            if (arguments[1] == element.name) {
                console.log(
                    element.name.toString() + "\t" + 
                    element.time.toString() + "\t" + 
                    element.job.toString() + "\t" + 
                    element.money.toString()
                );
            }
        });
    else {
        for (var name in student) {
            if (arguments[1] == name)
                console.log(student[name]);
        }
    }
}
else if (arguments[0] == "-l") {
    for (var name in student) {
        console.log(name + "\t" + student[name]);
    }
}
else if (arguments[0] == "-a") {
    console.log(
        "赚钱最多的学生:\t" + maxName +
        "\n赚钱最少的学生:\t" + minName +
        "\n赚钱最多的日子:\t" + maxDate +
        "\n赚钱最少的日子:\t" + minDate
    );
}