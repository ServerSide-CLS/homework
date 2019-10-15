var fs = require('fs');
var arg = process.argv.splice(2);
var arr = [];
if(arg != ""){
	arr = arg.toString().split(",");
}
if(arr.length == 0){
	console.log("Please input parameter");
}
else if(arr.length > 3){
	console.log("Please input correct number of parameter");
}
else{
	var data = fs.readFileSync('study.txt','utf8');
	var line = data.split("\r\n");
	var stu = [];
	var money = [];
	var num = 0;
	for(i = 0;i < line.length;i++){
		var temp = line[i].trim().split(/\s+/);
		var flag = 1;
		for(j = 0;j < num;j++){
			if(stu[j]==temp[0]){
				flag = 0;
				money[j] += 1*temp[temp.length - 1];
			}
		}
		if(flag){
			stu[num] = temp[0];
			money[num] = temp[temp.length - 1]*1;
			num++;
		}
	}
	if(arr.length == 1){
		if(arr[0] == "-l"){
			for(i = 0;i < stu.length;i++){
				console.log(stu[i] + "\t" + money[i]);
			}
		}
		else if(arr[0] == "-a"){
			var maxx = money[0];
			var minn = money[0];
			var maxstu = stu[0];
			var minstu = stu[0];
			for(i = 1;i < stu.length;i++){
				if(money[i]*1 > maxx*1){
					maxx = money[i];
					maxstu = stu[i];
				}
				else if(money[i]*1 < minn*1){
					minn = money[i];
					minstu = stu[i];
				}
			}
			console.log("赚钱最多的学生:\t",maxstu);
			console.log("赚钱最少的学生:\t",minstu);
			var temp = line[0].trim().split(/\s+/);
			var maxdate = temp[1];
			var mindate = temp[1];
			var maxmoney = temp[3] * 1.0;
			var minmoney = temp[3] * 1.0;
			for(i = 0;i < line.length;i++){
				var temp = line[i].trim().split(/\s+/);
				if(temp[3]*1 > maxmoney*1){
					maxmoney = temp[3]*1;
					maxdate = temp[1];
				}
				else if(temp[3]*1 < minmoney*1){
					minmoney = temp[3]*1;
					mindate = temp[1];
				}
			}
			console.log("赚钱最多的日子:\t",maxdate);
			console.log("赚钱最少的日子:\t",mindate);	
		}
		else{
			console.log("Please check your parameter");
		}
	}
	else if(arr.length == 2){
		for(i = 0;i < stu.length;i++){
			if(stu[i] == arr[1]){
				console.log(money[i]);
			}
		}
	}
	else{
		if(arr[0] == "-n"&&arr[2] == "-l"){
			for(i = 0;i < line.length;i++){
				var temp = line[i].trim().split(/\s+/);
				if(temp[0] == arr[1]){
					console.log(line[i]);
				}
			}
		}
		else{
			console.log("Please check your parameter");
		}		
	}
}