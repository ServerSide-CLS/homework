//读取文件
var fs = require("fs");
//逐行读入
var readline = require('readline');

//创建可读流
var readerStream = fs.createReadStream('study.txt');
var objReadline = readline.createInterface({
	input:readerStream
});

//记录输入的学生姓名
var name;
//判断是否输入n
var flag_n = 0;
//判断是否输入l （输出全部学生赚的钱）
var flag_l = 0;
//判断是否输入a （统计结果）
var flag_a = 0;

var total = 0;
var MIN = 10000;
var MAX = -1;
var MAX_DAY;
var MIN_DAY;
var dict = {}

//获取判断命令行参数
var arguments = process.argv.splice(2);
if(arguments[0] == '-n'){
	name = arguments[1];
	flag_n = 1;
	if(arguments[2] == '-l'){
		flag_l = 1;
	}
}
else if(arguments[0] == '-l'){
	flag_l = 1;
}
else if(arguments[0] == '-a'){
	flag_a = 1;
	if(arguments.length > 1){
		console.log("-a 参数不能与-n -l 参数混用");
		return;
	}
}

//声明数组array保存数据
var arr = new Array();

//输入-a
if(flag_a){
	objReadline.on('line',(line) =>{
		arr = line.split(/\s+/);
		if(dict[arr[0]] == undefined){
			dict[arr[0]] = 0;
			dict[arr[0]] +=parseInt(arr[3]);
		}
		else{
			dict[arr[0]] + parseInt(arr[3]);
		}
		if(arr[3] > MAX){
			MAX = arr[3];
			MAX_DAY = arr[1];
		}
		if(arr[3] < MIN){
			MIN = arr[3];
			MIN_DAY = arr[1];
		}
	});
	//字典排序
	objReadline.on('close', function(){
		var i = 1;
		var res = Object.keys(dict).sort(function(a, b) {return dict[b] - dict[a];});
		for(var key in res){
			if(i == 1){
				console.log('赚钱最多的学生: ' + res[key]);
				break;
			}
		} 
		console.log('赚钱最少的学生: ' + res.pop());
        console.log('赚钱最多的日子: ' + MAX_DAY);
        console.log('赚钱最少的日子: ' + MIN_DAY);
	});
}

//输入-n && -l
else if(flag_n && flag_l){
	objReadline.on('line', (line) => {
        arr = line.split(/\s+/);
        if (arr[0] == name) {
            console.log(line);
        }
    });
}

//输入-l
else if (flag_l) {
    var dict = {};
    objReadline.on('line', (line) => {
        arr = line.split(/\s+/);
        if (dict[arr[0]] == undefined) {
            dict[arr[0]] = 0;
            dict[arr[0]] += parseInt(arr[3]);
        } else {
            dict[arr[0]] += parseInt(arr[3]);
        }
    });
    objReadline.on('close', function() {
        var res = Object.keys(dict).sort(function(a, b) { return dict[a] - dict[b]; });
        for (var key in res) {　　
            console.log(res[key], dict[res[key]]);
        }
    });
}

//输入-n
else if(flag_n) {
    objReadline.on('line', (line) => {
        arr = line.split(/\s+/);
        if (arr[0] == name) {
            total += parseInt(arr[3]);
        }
    });
    objReadline.on('close', function() {
        console.log(total);
    });
}