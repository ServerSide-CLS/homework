var fs = require("fs");
var data = fs.readFileSync('study.txt');
var data1 = data.toString();
lines=data1.split("\n");
var l=lines.length;
//计算记录长度
for(var i=0;i<l;i++){
 if (!lines[i])
	l=l-1;
}
//查找赚钱最多最少日子&&将每行数据存入数组中
var moneymax=parseInt(lines[0].split(/\s+/)[3]);
var moneymin=parseInt(lines[0].split(/\s+/)[3]);
var mmaxd=-1;
var mmind=-1;
var line=[];
var kv={};
for(var i=0;i<l;i++){
line.push(lines[i].split(/\s+/));
var max=parseInt(lines[i].split(/\s+/)[3]);
var min=parseInt(lines[i].split(/\s+/)[3]);
if(max>moneymax){
	moneymax=max;
	mmaxd=i;
}
if(min<moneymin){
	moneymin=min;
	mmind=i;
}
}
//产生键值对
for(var i=0;i<l;i++){
if(kv[line[i][0]]){
	kv[line[i][0]]+=parseInt(line[i][3]);
	continue;
}
	kv[line[i][0]]=parseInt(line[i][3]);
}


//获取参数
var arguments = process.argv.splice(2);
var la=arguments.length;
//排序函数
function sortNumber(a,b)
{
return a - b
}
//参数输入时的4种情况
if(la==1){
if(arguments[0]=='-l'){
	for(let[key,val] of Object.entries(kv)) {
  	console.log(`${key.padEnd(9,' ')}${val}`)
}
}
if(arguments[0]=='-a'){
	var c=[];
	var maxname='';
	var minname='';	
	for(key in kv){
		c.push(parseInt(kv[key]));
	}
	c.sort(sortNumber);
	var cl=c.length;
	for(key in kv){
	if(kv[key]==c[0])
		minname=key;
	if(kv[key]==c[cl-1])
		maxname=key;
}
	console.log("赚钱最多的学生:    "+maxname);
	console.log("赚钱最少的学生:    "+minname)
	console.log("赚钱最多的日子:    "+line[mmaxd][1]);
	console.log("赚钱最少的日子:    "+line[mmind][1]);
	
}
}
else if(la==2){
	if(arguments[0]=='-n')
		console.log(kv[arguments[1]]);
}
else if(la==3){
	if(arguments[0]=='-n'&&arguments[2]=='-l'){
	for(var i =0;i<l;i++){
		if(arguments[1]==line[i][0])
			console.log(line[i][0].padEnd(9,' ')+line[i][1].padEnd(13,' ')+line[i][2].padEnd(6,' ')+line[i][3]);
	}
}
	
}



