var fs = require("fs");

//创建学生对象数组
var students =new Array();
var studentName=new Array();
//总计金额数组
var studentSum=new Array();

var i;
var j=0;

fs.readFile('study.txt', function (err, data) {
	if (err) {
		return console.error(err);
	}
	var data=data.toString().trim().split("\n");
	//将文本读入students对象数组
	for(i=0;i<data.length;i++){
		value=data[i].trim().split(/\s+/);
		students[i]=new Object();
		students[i].name=value[0];
		students[i].date=value[1];
		students[i].job=value[2];
		students[i].money=parseFloat(value[3]);
		//修改studentSum数组使它等于对应的金额总数
		if(studentName.indexOf(value[0])==-1){
			j=studentName.push(students[i].name)-1;
			studentSum[j]=students[i].money;
		}
		else{
			j=studentName.indexOf(value[0]);
			studentSum[j]+=students[i].money;
		}
	}
	arg=process.argv.splice(2);
	//-a参数
	if(arg.indexOf('-a')!=-1){
		if(arg.indexOf('-n')!=-1||arg.indexOf('-l')!=-1){
			return console.error("-a只能单独使用");
		}
		var maxStu=0;
		var minStu=0;
		var maxDate=0;
		var minDate=0;
		studentSum.forEach(function (value,index){
			if(value>studentSum[maxStu]){
				maxStu=index;
			}
			if(value<studentSum[minStu]){
				minStu=index;
			}
		});
		students.forEach(function (value,index){
			if(value.money>students[maxDate].money){
				maxDate=index;
			}
			if(value.money<students[minDate].money){
				minDate=index;
			}
		});
		console.log("赚钱最多的学生: "+studentName[maxStu]);
		console.log("赚钱最少的学生: "+studentName[minStu]);
		console.log("赚钱最多的日子: "+students[maxDate].date);
		console.log("赚钱最少的日子: "+students[minDate].date);
	}
	//-n参数
	else if(arg.indexOf('-n')!=-1){
		var n=arg.indexOf('-n')+1;
		var sum=0;
		for(i=0;i<students.length;i++){
			if(students[i].name==arg[n]){
				sum+=students[i].money;
				if(arg.indexOf('-l')!=-1){
					console.log(students[i].name.padEnd(10," "),students[i].date.padEnd(13," "),students[i].job.padEnd(10," "),students[i].money);
				}
			}
		}
		if(arg.indexOf('-l')==-1){
			console.log(sum);
		}
	}
	//-l参数
	else if(arg.indexOf('-l')!=-1){
		for(i=0;i<studentName.length;i++){
			console.log(studentName[i].padEnd(7," "),studentSum[i]);
		}
	}
});
