var fs = require('fs');
var data = fs.readFileSync('study.txt');
var str_new = [];
var str = data.toString().split("\r\n");//str里存入文档内容

//将str里的内容处理成二重数组保存在str_new里
for(var i = 0; i < str.length; i++){
	str_new[i] = str[i].split(" "); 
}
for(var i = 0; i < str_new.length; i++){
	for(var j = 0; j < str_new[i].length; j++){
		if(str_new[i][j] == ''){
			str_new[i].splice(j,1);
			j = j-1;
		}
	}
};

//arguments表示传入的参数 类型：数组
var arguments = process.argv.splice(2);

//-n参数表示学生名称，比如 caluMoney -n wang输出wang的赚的全部钱 95
if(arguments.length == 2 && arguments[0] == '-n'){
	var money = 0;
	for(var i = 0; i < str_new.length; i++){
		if(str_new[i][0] == arguments[1]){
			money += str_new[i][3] * 1;
		}
	}
	console.log(arguments[1] + '赚的全部钱：' + money);
}

//-l参数表示输出列表，比如 caluMoney -l输出全部学生赚的全部钱列表
if(arguments.length == 1 && arguments[0] == '-l'){
	var name = [];
	var money = [];
	
	for(var i = 0,j = 0; i < str_new.length; i++){
		if(str_new[i][0] == '...'){break;}
		var flag = 1;
		for(var k = 0 ;k < j; k++){
			if(str_new[i][0] == name[k]){
				money[k] += str_new[i][3] * 1;
				flag = 0;
			}
		}
		if(flag != '0'){
			name[j] = str_new[i][0];
			money[j] = str_new[i][3] * 1;
			j+=1;
		}	
	}

	for(var i = 0; i < money.length; i++){
		console.log(name[i].padEnd(6) + ":" + money[i]);
	}
}

//-n参数和-l参数可以一起使用，比如caluMoney -n wang -l输出wang的列表
if(arguments.length == 3 && arguments[0] == '-n' && arguments[2] == '-l'){
	for(var i = 0; i < str_new.length; i++){
		if(str_new[i][0] == '...'){break;}
		if(str_new[i][0] == arguments[1]){
			console.log(str_new[i][0].padEnd(6) + str_new[i][1].padEnd(12) + str_new[i][2].padEnd(5) + str_new[i][3].padEnd(6));
		}
	}
}

//-a参数表示统计结果，比如 caluMoney -a输出, a参数不能和上面参数混用
if(arguments.length == 1 && arguments[0] == '-a'){
	var name = [];
	var money = [];
	var day = [];
	var money_day = [];

	var makeMoney_max_symbol = 0;
	var makeMoney_min_symbol = 0;
	var makeMoney_day_max_symbol = 0;
	var makeMoney_day_min_symbol = 0;

	var max = money[0];
	var min = money[0];
	var max1 = money_day[0];
	var min1 = money_day[0];

	for(var i = 0,j = 0; i < str_new.length; i++){
		if(str_new[i][0] == '...'){break;}
		var flag = 1;
		var flag1 =1;
		for(var k = 0 ;k < j; k++){
			if(str_new[i][0] == name[k]){
				money[k] += str_new[i][3] * 1;
				flag = 0;
			}
		}
		if(flag != '0'){
			name[j] = str_new[i][0];
			money[j] = str_new[i][3] * 1;
			j+=1;
		}	
	}
	
	for(var i = 0,j = 0; i < str_new.length; i++){
		if(str_new[i][0] == '...'){break;}
		var flag1 =1;
		for(var k = 0 ;k < j; k++){
			if(str_new[i][1] == day[k]){
				money_day[k] += str_new[i][3] * 1;
				flag1 = 0;
			}
		}
		if(flag1 != '0'){
			day[j] = str_new[i][1];
			money_day[j] = str_new[i][3] * 1;
			j+=1;
		}	
	}

	for(var i = 0; i < name.length; i++){
		if(money[i] > max){
			max = money[i];
			makeMoney_max_symbol = i;
		}
		if(money[i] < min)
		{
			min = money[i];
			makeMoney_min_symbol = i;
		}
	}

	for(var i = 0; i < day.length; i++){
		if(money_day[i] > max1){
			max1 = money_day[i];
			makeMoney_day_max_symbol = i;
		}
		if(money_day[i] < min1){
			min1 = money_day[i];
			makeMoney_day_min_symbol = i;
		}
	}

	console.log("赚钱最多的学生：" + name[makeMoney_max_symbol]);
	console.log("赚钱最少的学生：" + name[makeMoney_min_symbol]);
	console.log("赚钱最多的日子：" + day[makeMoney_day_max_symbol]);
	console.log("赚钱最少的日子：" + day[makeMoney_day_min_symbol]);
}