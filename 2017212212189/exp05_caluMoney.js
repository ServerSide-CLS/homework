#!/usr/bin/env node

var program = require('commander');

program
    .version('0.0.1')
    .option('-n, --name <type>', 'show StudentName')
    .option('-l, --list', 'show StudentList')
    .option('-a, --stat', 'show statResult')
    .parse(process.argv);


var fs=require('fs');
fs.readFile("study.txt",function (err,data){

	if(err)
		return console.error(err);
	dataArr=[];
	dataArr=data.toString().split(/[\t\n]/);

	var flag=0;
	for(var i=0;i<process.argv.length;i++)
		if(process.argv[i]=="-n"){ //-n -l
			flag=1;
			break;
		}
	if(flag&&!program.list&&!program.stat){  //n
				sum=0;
				for(var i=0;i<dataArr.length;i++)
					if(dataArr[i]==program.name){
						sum+=parseInt(dataArr[i+3]);
					}
				console.log(sum);
	}
	else if(!flag&&program.list&&!program.stat){ //-l
		dataMap={};
		
		for(var i=0;i<dataArr.length;i+=4){
			if(!dataMap.hasOwnProperty(dataArr[i])){
				dataMap[dataArr[i]]=parseInt(dataArr[i+3]);
			}
			else{
				dataMap[dataArr[i]]+=parseInt(dataArr[i+3]);
			}
		}
		
		for(let key  in dataMap){
			
       		console.log(key,dataMap[key]);
  		}
	}
	else if(flag&&program.list&&!program.stat){   //-n -l
		for(var i=0;i<dataArr.length;i++){ 
			str="";
			if(dataArr[i]==program.name){
				for(var j=i;j<i+4;j++)
					str+=dataArr[j]+"\t";

				console.log(str);
			}
			
		}
	}
	else if(!flag&&!program.list&&program.stat){  //-a
		dataMap={};
		
		for(var i=0;i<dataArr.length;i+=4){
			if(!dataMap.hasOwnProperty(dataArr[i])){
				dataMap[dataArr[i]]=parseInt(dataArr[i+3]);
			}
			else{
				dataMap[dataArr[i]]+=parseInt(dataArr[i+3]);
			}
		}
		
		var max=0;
		var min=10000;
		maxStu="";
		minStu="";
		for(let key  in dataMap){
			
       		if(dataMap[key]>max){
       			max=dataMap[key];
				maxStu=key;
       		}
			if(dataMap[key]<min){
				min=dataMap[key];
				minStu=key;
			}
  		}
		

		dataMap1={};
		for(var i=1;i<dataArr.length;i+=4){
			if(!dataMap1.hasOwnProperty(dataArr[i])){
				dataMap1[dataArr[i]]=parseInt(dataArr[i+2]);
			}
			else{
				dataMap1[dataArr[i]]+=parseInt(dataArr[i+2]);
			}
		}

		max=0;
		min=10000;
		maxDate="";
		minDate="";
		for(let key  in dataMap1){
			
       		if(dataMap1[key]>max){
       			max=dataMap1[key];
				maxDate=key;
       		}
			if(dataMap1[key]<min){
				min=dataMap1[key];
				minDate=key;
			}
  		}

		console.log("赚钱最多的学生:\t"+maxStu);
		console.log("赚钱最少的学生:\t"+minStu);
		console.log("赚钱最多的日子:\t"+maxDate);
		console.log("赚钱最少的日子:\t"+minDate);
	}


});
