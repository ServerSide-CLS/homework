//实验五：兼职项目

// 读取txt数据
var fs = require("fs");
var dataTable = fs.readFileSync('study.txt','UTF-8');

//获取参数
var args = process.argv.splice(2);

//将txt中数据转化为数组,每行进行分割
var dataLine = new Array();
var list = dataTable.split("\n");
list.forEach(item =>{
	var data = item.trim().split(/\s+/);
	dataLine.push({name:data[0],date:data[1],job:data[2],money:data[3]});
});

//按学生姓名、日期存入money
var stuName = [];
var stuDate = {};
dataLine.forEach(item =>{
	stuName[item.name] = 0;
	stuDate[item.date] = 0;
});
dataLine.forEach(item => {
	stuName[item.name] += parseInt(item.money);
	stuDate[item.date] += parseInt(item.money);

});

//按名称、日期进行排序
var sortName = Object.keys(stuName).sort((a,b)=>{
	return stuName[a] - stuName[b];
})
var sortDate = Object.keys(stuDate).sort((a,b)=>{
	return stuDate[a] - stuDate[b];
})

//参数判断
//node caluMoney.js -n XXX
if(args.length == 2 && args[0] == "-n"){
	for(var name in stuName){
		if(name == args[1]){
			console.log(name+"\t"+stuName[name]);
			break;
		}
		else{
			console.log("无匹配学生");
		}
	}
}

//node caluMoney.js -l
else if(args.length == 1 && args[0] == "-l"){
	for(var name in stuName){
		console.log(name+"\t"+stuName[name]);
	}
}

//node caluMoney.js -n XXX -l
else if(args[0] == "-n" && args[2] == "-l"){
	let name = args[1];
	dataLine.forEach(item => {
		if(item.name == name){
			let str = `${item.name}\t${item.date}\t${item.job}\t${item.money}`;
			console.log(str)
		}
		else{
			console.log("无匹配学生");
		}
	});
}

//node caluMoney.js -a
else if(args.length == 1 && args[0] == "-a"){
	var stuLength = sortName.length;
	var dateLength = sortDate.length;
	let str = `赚钱最多的学生:\t${sortName[stuLength - 1]}\n`+
	`赚钱最少的学生:\t${sortName[0]}\n`+
	`赚钱最多的学生:\t${sortDate[dateLength - 1]}\n`+
	`赚钱最少的学生:\t${sortDate[0]}\n`;
	console.log(str);
}

else{
	console.log("参数输入有误");
}

	




