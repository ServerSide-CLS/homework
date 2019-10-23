var arguments = process.argv.splice(2);
var fs = require('fs');
var list = new Array();
var MAX = -1;
var MIN = 99999;
var min_day = "";
var max_day = "";
var total = 0;
var name = "";
var dic = new Array();
var ifn = false;
var ifl = false;
var ifa = false;
if(arguments[0] == '-n'){
	name=arguments[1];
	ifn=true;
	if(arguments[2] == '-l'){
		ifl=true;
	}
}
else if(arguments[0] == '-l'){
	ifl=true;
}
else if(arguments[0] == '-a'){
	ifa=true;
	if(arguments.length > 1){
		console.log(" a参数不能和上面参数混用");
		return;
	}
}
var readline = require('readline');
var readerStream = fs.createReadStream('study.txt');
var eachline = readline.createInterface({
	input:readerStream
});
eachline.on('line', (line)=>{
	list.push(line.split(/\s+/));
});
eachline.on('pause', ()=>{
	for(i=0;i<list.length;i++){
		if(list[i][0]==name){
			total+=parseInt(list[i][3]);		
		}
		if(list[i][3]<MIN){
			MIN = list[i][3];
			min_day = list[i][1];	
		}
		if(list[i][3]>MAX){
			MAX = list[i][3];
			max_day = list[i][1];	
		}
		if(list[i][0] in dic){
			dic[list[i][0]] += parseInt(list[i][3]);
		}
		else{
			dic[list[i][0]] = parseInt(list[i][3]);
		}
	}
	dic.sort();
	var NAME = new Array();
	for(var key in dic){
		NAME.push(key);
	}
	if(ifn && ifl){
		for(i=0;i<list.length;i++){
			if(list[i][0] == name){
				console.log(list[i][0].padEnd(8,""),list[i][1],""+list[i][2].padEnd(5,""),list[i][3]);		
			}
		}
	}
	else if(ifn){
		console.log(name,total);
	}
	else if(ifl){
		for(var key in dic){
			console.log(key.padEnd(8,""),dic[key]);
		}
	}
	else if(ifa){
		console.log("赚钱最多的学生:    ",NAME[NAME.length-1]);
		console.log("赚钱最少的学生:    ",NAME[0]);
		console.log("赚钱最多的日子:    ",max_day);
		console.log("赚钱最少的日子:    ",min_day);
	}
});
