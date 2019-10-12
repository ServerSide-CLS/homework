var fs = require('fs');
var readline = require('readline');
var arguments = process.argv.splice(2);
var len=arguments.length;
var data=fs.readFileSync('study.txt')
var lines=data.toString().split('\n')
var array=new Array()
var name=new Array()
var cost=new Array()
var day=new Array()
var sum1=0
var max_earn=-1,min_earn=10000
var position1=0,position2=0,postion3=0,postion4=0
for(var i=0;i<lines.length;i++){
	array.push(lines[i].split(/\s+/))
	name[i]=array[i][0]
	cost[i]=0
	day[i]=0
}


for(var i=0;i<lines.length;i++){
	for(var j=0;j<lines.length;j++){
		if(array[i][0]==array[j][0]){
			cost[i]=cost[i]+parseInt(array[j][3])
		}
		else
			continue
	}
	if(cost[i]>=max_earn){
		max_earn=cost[i]
		position1=i
	}
	if(cost[i]<=min_earn){
		min_earn=cost[i]
		position2=i
	}
}
var max_earn=-1,min_earn=10000
for(var i=0;i<lines.length;i++){
	for(var j=0;j<lines.length;j++){
		if(array[i][1]==array[j][1]){
			day[i]=day[i]+parseInt(array[j][3])
		}
		else
			continue
	}
	if(day[i]>=max_earn){
		max_earn=day[i]
		position3=i
	}
	if(day[i]<=min_earn){
		min_earn=day[i]
		position4=i
	}
}


if(len==1){
	if(arguments[0]=='-l'){
		for(var i=0;i<lines.length;i++){
			for(var j=0;j<i;j++){
				sum1=sum1+1
				if(array[i][0]==array[j][0]){
					break
				}
			}
			if(sum1==i && i!=j+1){
				console.log(array[i][0]+"   "+String(cost[i]))
			}
			sum1=0
		}
	}
	else if(arguments[0]=='-a'){
		console.log("赚钱最多的学生：  "+array[position1][0])
		console.log("赚钱最少的学生：  "+array[position2][0])
		console.log("赚钱最多的日子    "+array[position3][1])
		console.log("赚钱最少的日子    "+array[position4][1])
	}
}
else if(len==2){
	if(arguments[0]=="-n"){
		for(var i=0;i<lines.length;i++){
			if(array[i][0]==arguments[1]){
				console.log(arguments[1]+"    "+String(cost[i]))
				break
			}
		}
	}
}
else if(len==3){
	if(arguments[0]=="-n"&&arguments[2]=="-l"){
		for(var i=0;i<lines.length;i++){
			if(array[i][0]==arguments[1]){
				console.log(arguments[1]+"    "+array[i][1]+"   "+array[i][2]+"   "+array[i][3])
			}
		}
	}
}
