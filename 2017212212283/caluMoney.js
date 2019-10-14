var fs = require('fs');
var data = fs.readFileSync('study.txt');

var rowData=data.toString().split("\r\n");
console.log();

var arguments = process.argv.splice(2);
var Arr=[];
var Arr2=[];

for(i=0;i<rowData.length;i++){
	var person=rowData[i].trim().split(/\s+/);

	var flag=0;
	var flag2=0;
	for(j=0;j<Arr.length;j++){
		if(Arr[j].name==person[0]){
			Arr[j].money+=parseInt(person[3]);
			flag=1;
		}
	}

	for(j=0;j<Arr2.length;j++){
		if(Arr2[j].date==person[1]){
			Arr2[j].date+=parseInt(person[3]);
			flag2=1;
		}
	}

	if(flag==0)
		Arr.push({name:person[0],money:parseInt(person[3])});

	if(flag2==0)
		Arr2.push({date:person[1],money:parseInt(person[3])});
}

var cmp= function(prop){
	return function(obj1,obj2){
		var val1=obj1.money;
		var val2=obj2.money;
		if(val1<val2)
			return -1;
		else if(val1>val2)
			return 1;
		else
			return 0;
	}
}

Arr.sort(cmp("money"));
Arr2.sort(cmp("money"));

// for(i=0;i<Arr.length;i++){
// 	console.log(Arr[i].name,Arr[i].money);
// }

var flag=0;
if(arguments.length==3){
	var findName;
	var F=0;
	if(arguments[0]=="-n"&&arguments[2]=="-l")
	{
		findName=arguments[1];
		F=1;
	}

	if(arguments[0]=="-l"&&arguments[1]=="-n")
	{
		findName=arguments[2];
		F=1;
	}

	if(F){
		for(i=0;i<rowData.length;i++){
			var person=rowData[i].trim().split(/\s+/);

			if(person[0]==findName){
				console.log(person[0],person[1],person[2],person[3]);
			}
		}
	}
}

if(arguments.length==2)
{
	if(arguments[0]=="-n"){
		for(i=0;i<Arr.length;i++){
			if(Arr[i].name==arguments[1])
				console.log(Arr[i].money);
		}
	}
}

if(arguments.length==1){
	if(arguments[0]=="-a"){
		console.log("赚钱最多的学生:    "+Arr[Arr.length-1].name);
		console.log("赚钱最少的学生:    "+Arr[0].name);
		console.log("赚钱最多的日子:    "+Arr2[Arr2.length-1].date);
		console.log("赚钱最少的日子:    "+Arr2[0].date);
	}else if(arguments[0]=="-l"){
		for(i=0;i<Arr.length;i++){
			console.log(Arr[i].name,Arr[i].money);
		}
	}
}