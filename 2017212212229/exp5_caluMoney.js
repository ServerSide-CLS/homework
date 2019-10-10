var arguments = process.argv.splice(2);
var flag_n = false;//是否有-n参数
var flag_l = false;//是否有-l参数
var flag_a = false;//是否有-a参数
var str = new Array();
var name = new Array();//记录所有名字
var time = new Array();//记录所有时间
var work = new Array();//记录所有工作
var money = new Array();//记录所有收入
var NAME;//记录n参数后的名字
var MIN=2000000;
var MAX=-1;
var MIN_TIME;//记录赚钱最少的日子
var MAX_TIME;//记录赚钱最多的日子
var total_money=0;
if(arguments[0] == '-n'){
	NAME = arguments[1];
	flag_n = true;
	if(arguments[2] == '-l')
		flag_l = true;
}
else if(arguments[0] == '-l')
	flag_l = true;	
else if(arguments[0] == '-a'){
	flag_a = true;
	if(arguments.length>1){		//当a和其他参数混用，退出程序
		console.log("-a参数不能和其他参数混用");
		return;
	}
		
}

var fs = require("fs");
var readline = require('readline');	//为了逐行读
var readerStream = fs.createReadStream('study.txt');
var objReadline = readline.createInterface({
	input: readerStream
});

objReadline.on('line', (line)=>{
	str.push(line);
});
objReadline.on('pause', ()=>{   //当文本读完后开始操作
	for(i = 0;i < str.length;i ++)
	{
		var str1=str[i].split(/\s+/);
		name.push(str1[0]);
		time.push(str1[1]);
		work.push(str1[2]);
		money.push(str1[3]);
		if(name[i]==NAME)
			total_money+=parseInt(money[i]);
		if(money[i] < MIN){
			MIN = money[i];
			MIN_TIME=time[i];
		}
		if(money[i] > MAX){
			MAX = money[i];
			MAX_TIME=time[i];
		}
	}
	var dic = new Array();
	for(i = 0;i < str.length;i ++)
	{
		if(name[i] in dic)
			dic[name[i]]+=parseInt(money[i]);
		else
			dic[name[i]]=parseInt(money[i]);
	}
	dic.sort();
	var Name=new Array();
	for (var key in dic) {
       		Name.push(key);
    	}
	if(flag_n && flag_l){	//当-n和-l同时出现
		for(i = 0;i < str.length;i ++)
		{
			if(name[i]==NAME)
				console.log(name[i],time[i],work[i],money[i]);
		}
	}
	else if(flag_n){	//当只有-n时
		console.log(NAME,total_money);
	}
	else if(flag_l){	//当只有-l时
		for (var key in dic) {
               		console.log(key + " " + dic[key]);
            	}
	}
	else if(flag_a){	//当只有-a时
		console.log("赚钱最多的学生：  ",Name[Name.length-1]);
		console.log("赚钱最少的学生：  ",Name[0]);
		console.log("赚钱最多的日子：  ",MAX_TIME);	
		console.log("赚钱最少的日子：  ",MIN_TIME);
		
	}
	
});

