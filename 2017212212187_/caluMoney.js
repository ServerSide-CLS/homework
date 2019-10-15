var fs = require('fs');
var array1 = [];
var mostS = 0,mostSName;
var leastS = 0,leastSName;
var mostD = 0,mostDTime;
var leastD = 1000,leastDTime;

// 异步读取
fs.readFile('study.txt', function (err, data) {
	if (err) {
		return console.error(err);
	}
	//按行划分
	var array = data.toString().split('\r\n');
	for(i = 0;i < array.length;i++){
		array1[i] = array[i].split();
		//每个数据分开
		array1[i] = array1[i][0].replace(/\s+/g, ' ').split(' ');
	}

	//初始化数据
	mostSName = array1[0][0];
	leastSName = array1[0][0];
	mostDTime = array1[0][1];
	leastDTime = array1[0][1];

	//获取传入参数
	var arguments = process.argv.splice(2);

	//-n 输入学生名称，输出学生赚得全部钱数 + -l 输出该学生赚钱列表
	if(arguments[1] == '-n'){
		total=0;
		if(arguments[3] == '-l'){
			for(i = 0;i < array1.length;i++){
				if(arguments[2] == array1[i][0]){
					console.log(array[i]); 
				}
			}
		}
		else{
			for(i = 0;i < array1.length;i++){
				if(arguments[2] == array1[i][0]){
					total += parseInt(array1[i][3]);
				}	
			}
			console.log(arguments[2]+ "  " + total); 
		}
	}
	
	//-l 输出全部学生赚的全部钱数列表
	else if(arguments[1] == '-l'){
		for(i = 0;i < array.length;i++){
			if(i>0){
				for(j = 0;j < i;j++){
					if(array1[i][0] == array1[j][0]);
					flag = 0;		
				}
			}
			if(flag = 1){
				total1 = parseInt(array1[i][3]);
				for(k = i + 1;k < array.length;k++){
					if(array1[i][0] == array1[k][0])
						total1 += parseInt(array1[k][3]);
				}
				console.log(array1[i][0] + "  " + total1);
			}
		}
	}

	//-a 统计结果
	else if(arguments[1] == '-a'){
		for(i = 0;i < array.length;i++){
			flag1 = 1;
			flag2 = 1;
			if(i>0){
				for(j = 0;j < i;j++){
					if(array1[i][0] == array1[j][0]);
						flag1 = 0;
					if(array1[i][1] == array1[j][1]);
						flag2 = 0;		
				}
			}
			if(flag1 = 1){
				total2 = parseInt(array1[i][3]);
				for(k = i + 1;k < array.length;k++){
					if(array1[i][0] == array1[k][0])
						total2 += parseInt(array1[k][3]);
				}
				if(total2 > mostS){
					mostS = total2;
					mostSName = array1[i][0] //赚钱最多的人
				}
				if(total2 < leastS){
					leastS = total2;
					leastSName = array1[i][0] //赚钱最少的人
				}
			}

			if(flag2 = 1){
				total3 = parseInt(array1[i][3]);
				for(m = i + 1;m < array.length;m++){
					if(array1[i][1] == array1[m][1])
						total3 += parseInt(array1[k][3]);
				}
				if(total3 > mostD){
					mostD = total3;
					mostDTime = array1[i][1]; //赚钱最多的日子
				}
				if(total3 < leastD){
					leastD = total3;
					leastDTime = array1[i][1]; //赚钱最少的日子
				}
			}
			
		}
		console.log('赚钱最多的学生：      ' + mostSName);
		console.log('赚钱最少的学生：      ' + leastSName);
		console.log('赚钱最多的日子：      ' + mostDTime);
		console.log('赚钱最少的日子：      ' + leastDTime);
	}
});
