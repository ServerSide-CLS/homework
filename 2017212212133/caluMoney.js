//获取参数
var arguments = process.argv.splice(2);
var argLen = arguments.length;

//读取txt数据
var fs = require('fs');
var arrayMoney;
var data = fs.readFileSync('study.txt', 'UTF-8');


var dataLines = data.split('\n');

dataArray = new Array();
dataLines.forEach(line =>{
	dataArray.push(line.trim().split(/\s+/));
	// console.log(line.trim().split(/\s+/));//先去掉首尾的空格再进行切割
});

//每个学生分别赚到的钱的数组
var studentMoney = {};
dataArray.forEach(line =>{
	if(studentMoney.hasOwnProperty(line[0])){
		studentMoney[line[0]] += parseInt(line[3]);
	}else{
		studentMoney[line[0]] = parseInt(line[3]);
	}
})

//每天所有学生赚到的钱的数组
var dateMoney = {};
dataArray.forEach(line =>{
	if(dateMoney.hasOwnProperty(line[1])){
		dateMoney[line[1]] += parseInt(line[3]);
	}else{
		dateMoney[line[1]] = parseInt(line[3]);
	}
})

function getStatistics(){
	var maxStudent=0, minstudent=1000;
	var maxName, minName;
	for(var key in studentMoney){
		if(maxStudent < studentMoney[key]){
			maxStudent = studentMoney[key];
			maxName = key;
		}
		if(minstudent > studentMoney[key]){
			minstudent = studentMoney[key];
			minName = key;
		}
	}

	var maxDate = 0, minDate = 1000;
	var maxDay, minDay;
	for(var key in dateMoney){
		if(maxDate < dateMoney[key]){
			maxDate = dateMoney[key];
			maxDay = key;
		}
		if(minDate > dateMoney[key]){
			minDate = dateMoney[key];
			minDay = key;
		}
	}
	console.log("赚钱最多的学生:",maxName);
	console.log("赚钱最少的学生:",minName);
	console.log("赚钱最多的日子:",maxDay);
	console.log("赚钱最少的日子:",minDay);	
}

switch (argLen) {
	case 1:
		if(arguments[0] == "-a"){
			getStatistics();
		}else if(arguments[0] == "-l"){
			for(var i in studentMoney){
				console.log(i,studentMoney[i]);
			}
		}else{
			console.log("输入参数格式有误");
		}
		break;
	case 2:
		if(arguments[0] == "-n"){
			if(studentMoney.hasOwnProperty(arguments[1])){
				console.log(studentMoney[arguments[1]]);
			}else{
				console.log("无该学生信息，请确认学生姓名无误");
			}
		}else{
			console.log("输入参数格式有误");
		}
		break;
	case 3:
		if(arguments[0] == "-n" && arguments[2] == "-l"){
			let flag = 0;
			dataArray.forEach(line =>{
				if(line[0] == arguments[1]){
				console.log(line[0], line[1], line[2], line[3]);
					flag = 1;
				}
			})
			if(!flag){
				console.log("无该学生信息，请确认学生姓名无误");
			}
		}else{
			console.log("输入参数格式有误");
		}
		break;
	default:
		console.log("输入参数格式有误");
		break;
}

