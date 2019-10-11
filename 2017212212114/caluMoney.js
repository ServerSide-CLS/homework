var fs = require("fs");
var readline = require('readline');

// 创建可读流
var readerStream = fs.createReadStream('study.txt');
// console.log(readerStream);

// 设置编码为 utf8
readerStream.setEncoding('UTF8');

//按行读取
var objReadline = readline.createInterface({
    input: readerStream
});

// 存取学生名称
var name = '';
// 判断是否有表示输出列表的参数
var list = 0;
// 判断是否有表示统计结果的参数
var all = 0;

//获取命令行参数
process.argv.forEach(function(val, index, array) {
    //console.log(index + ': ' + val);
    if (val == "-n") {
        name = array[index + 1];
    }
    if (val == "-l") {
        list = 1;
    }
    if (val == "-a") {
        all = 1;
    }
});

// 声明一个数组来保存分割的字符串
var arr = new Array();

function findKey(obj, value, compare = (a, b) => a === b) {
    return Object.keys(obj).find(k => compare(obj[k], value))
}

//统计结果
if (all && list == 0 && name == "") {
    var sum = 0;
    var maxDay = '';
    var max = 0;
    var minDay = '';
    var min = 9999999;
    var dict = {};
    objReadline.on('line', (line) => {
        arr = line.split(/\s+/);
        if (dict[arr[0]] == undefined) {
            dict[arr[0]] = 0;
            dict[arr[0]] += parseInt(arr[3]);
            //console.log(dict[arr[0]]);
        } else {
            dict[arr[0]] += parseInt(arr[3]);
            //console.log(dict[arr[0]]);
        }
        if (arr[3] > max) {
            max = arr[3];
            maxDay = arr[1];
        }
        if (arr[3] < min) {
            min = arr[3];
            minDay = arr[1];
        }
    });
    objReadline.on('close', function() {
        var i = 1;
        var res = Object.keys(dict).sort(function(a, b) { return dict[b] - dict[a]; });
        for (var key in res) {　　
            //console.log(key, res[key]);
            if (i == 1)　 {
                console.log('赚钱最多的学生: ' + res[key]);
                break;
            }
        }
        console.log('赚钱最少的学生: ' + res.pop());
        console.log('赚钱最多的日子: ' + maxDay);
        console.log('赚钱最少的日子: ' + minDay);
    });
}

// 输出某个学生的列表
else if (name != '' && list && all == 0) {
    objReadline.on('line', (line) => {
        //arr.push(line);
        arr = line.split(/\s+/);
        if (arr[0] == name) {
            //sum += parseInt(arr[3]);
            console.log(line);
        }
    });
    objReadline.on('close', function() {});
}

//每个同学各自共赚到多少钱，并排序数据
else if (list && name == '' && all == 0) {
    var dict = {};
    objReadline.on('line', (line) => {
        arr = line.split(/\s+/);
        if (dict[arr[0]] == undefined) {
            dict[arr[0]] = 0;
            dict[arr[0]] += parseInt(arr[3]);
            //console.log(dict[arr[0]]);
        } else {
            dict[arr[0]] += parseInt(arr[3]);
            //console.log(dict[arr[0]]);
        }
    });
    objReadline.on('close', function() {
        var res = Object.keys(dict).sort(function(a, b) { return dict[a] - dict[b]; });
        for (var key in res) {　　
            console.log(res[key], dict[res[key]]);
        }
    });
}

// 统计某个学生赚到的总钱数
else if (name != '' && list == 0 && all == 0) {
    var sum = 0;
    objReadline.on('line', (line) => {
        //arr.push(line);
        arr = line.split(/\s+/);
        if (arr[0] == name) {
            sum += parseInt(arr[3]);
        }
    });
    objReadline.on('close', function() {
        console.log(sum);
    });
} else {
    console.log("参数输入不正确");
    console.log("a参数不能和-l,-n参数混用");
}