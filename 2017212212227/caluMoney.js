var fs = require("fs");
var dataArray = new Array();
var Money = new Object();
var Time = new Object();
var maxName;
var minName;
var maxTime;
var minTIme;

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);


var readerStream = fs.createReadStream('study.txt');

var data = fs.readFileSync('study.txt', 'UTF-8');

var lines = data.split('\n');

lines.forEach(line =>{
	dataArray.push(line.trim().split(/\s+/));
});

dataArray.forEach(line =>{
	if(Money.hasOwnProperty(line[0]))
		Money[line[0]] += parseInt(line[3]);
	else
		Money[line[0]] = parseInt(line[3]);
});

dataArray.forEach(line =>{
	if(Time.hasOwnProperty(line[1]))
		Time[line[1]] += parseInt(line[3]);
	else
		Time[line[1]] = parseInt(line[3]);
});



var maxS = 0;
var minS = 100000;
for(var key in Money){
	if(Money[key] > maxS){
		maxS = Money[key];
		maxName = key;
	}
	if(Money[key] < minS){
		minS = Money[key];
		minName = key;
	}
}

maxS = 0;
minS = 100000;

for(var key in Time){
	if(Time[key] > maxS){
		maxS = Time[key];
		maxTime = key;
	}
	if(Time[key] < minS){
		minS = Time[key];
		minTime = key;
	}
}
	

if(arguments[0] == "-a"){
	console.log("赚钱最多的学生:",maxName);
	console.log("赚钱最少的学生:",minName);
	console.log("赚钱最多的日子:",maxTime);
	console.log("赚钱最少的日子:",minTime);
}
else if(arguments[0] == "-l"){
	for(var key in Money)
		console.log(key,"   ",Money[key]);
}
else{
	if(arguments[2] == "-l"){
		dataArray.forEach(line =>{
			if(line[0] == arguments[1])
				console.log(line[0],line[1],line[2],line[3]);
		});
	}
	else{
		console.log(arguments[1],"   ",Money[arguments[1]]);
	}
}

