#!/usr/bin/env node
var fs = require('fs');

var arguments = process.argv.splice(2);
//console.log(arguments);

var data = fs.readFileSync('study.txt', 'UTF-8');
var dataLines = data.toString().split('\n');
var dataArray = new Array();
dataLines.forEach(line=>{
	//去掉首尾空格分段
	dataArray.push(line.trim().split(/\s+/));
});


//每个学生赚的钱
var everyStudentMoney={};
dataArray.forEach(line=>{
	//console.log(line[0]);
	//查看everyStudentMoney中是否已经有“键”
	if(everyStudentMoney.hasOwnProperty(line[0])){
		everyStudentMoney[line[0]] += parseInt(line[3]);
	}
	else{
		everyStudentMoney[line[0]] = parseInt(line[3]);
	}

});


//每天赚的钱
var everyDayMoney={};

dataArray.forEach(line=>{
	if(everyDayMoney.hasOwnProperty(line[1])){
		everyDayMoney[line[1]] += parseInt(line[3]);
	}
	else{
		everyDayMoney[line[1]] = parseInt(line[3]);
	}
});

//计算赚的最多最少的学生和日子
function getStatistics(){
	var maxStudent=0, minStudent=10000;
	var maxName, minName;
	for(var key in everyStudentMoney){
		if(maxStudent < everyStudentMoney[key]){
			maxStudent = everyStudentMoney[key];
			maxName = key;
		}
		if(minStudent > everyStudentMoney[key]){
			minStudent = everyStudentMoney[key];
			minName = key;
		}
	}

	var maxDate = 0, minDate = 10000;
	var maxDay, minDay;
	for(var key in everyDayMoney){
		if(maxDate < everyDayMoney[key]){
			maxDate = everyDayMoney[key];
			maxDay = key;
		}
		if(minDate > everyDayMoney[key]){
			minDate = everyDayMoney[key];
			minDay = key;
		}
	}
	console.log("赚钱最多的学生:   "+maxName);
	console.log("赚钱最少的学生:   "+minName);
	console.log("赚钱最多的日子:   "+maxDay);
	console.log("赚钱最少的日子:   "+minDay);
}





	if(arguments[0]=="-n"){
		if(arguments[2]=="-l"){
			var name = arguments[1];
			dataArray.forEach(line =>{
				if(line[0]==name){
					console.log(line[0]+" "+line[1]+" "+line[2]+" "+line[3]);
				}
			});
		}
		else{
			var name = arguments[1];
			console.log(everyStudentMoney[name]);
		}
	}

	if(arguments[0]=="-l"){
		var isExistence={};
		dataArray.forEach(line =>{
			if(isExistence.hasOwnProperty(line[0])){
				
			}else{
				console.log(line[0]+" "+everyStudentMoney[line[0]]);
				isExistence[line[0]] = 1;
			}
		});
	}

	if(arguments[0]=="-a"){
		getStatistics();
	}




