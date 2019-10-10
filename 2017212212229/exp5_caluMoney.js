var arguments = process.argv.splice(2);
var flag_n = false;//是否有-n参数
var flag_l = false;//是否有-l参数
var flag_a = false;//是否有-a参数
var str = new Array();
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
	str.push(line.split(/\s+/));
});
objReadline.on('pause', ()=>{   //当文本读完后开始操作
	for(i = 0;i < str.length;i ++)
	{
		if(str[i][0]==NAME)
			total_money+=parseInt(str[i][3]);
		if(str[i][3]< MIN){
			MIN = str[i][3];
			MIN_TIME=str[i][1];
		}
		if(str[i][3] > MAX){
			MAX = str[i][3];
			MAX_TIME=str[i][1];
		}
	}
	var dic = new Array();
	for(i = 0;i < str.length;i ++)
	{
		if(str[i][0] in dic)
			dic[str[i][0]]+=parseInt(str[i][3]);
		else
			dic[str[i][0]]=parseInt(str[i][3]);
	}
	dic.sort();
	var Name=new Array();
	for (var key in dic) {
       		Name.push(key);
    	}
	if(flag_n && flag_l){	//当-n和-l同时出现
		for(i = 0;i < str.length;i ++)
		{
			if(str[i][0]==NAME)
				console.log(str[i][0].padEnd(9," "),str[i][1],"  " + str[i][2].padEnd(6," "),str[i][3]);
		}
	}
	else if(flag_n){	//当只有-n时
		console.log(NAME,total_money);
	}
	else if(flag_l){	//当只有-l时
		for (var key in dic) {
               		console.log(key.padEnd(8," ") , dic[key]);
            	}
	}
	else if(flag_a){	//当只有-a时
		console.log("赚钱最多的学生：  ",Name[Name.length-1]);
		console.log("赚钱最少的学生：  ",Name[0]);
		console.log("赚钱最多的日子：  ",MAX_TIME);	
		console.log("赚钱最少的日子：  ",MIN_TIME);
		
	}
	
});
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString: ''));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
}

