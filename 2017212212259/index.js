var fs=require('fs');
var data=fs.readFileSync('study.txt');
var vals=data.toString().split(/\s+/);
var len=vals.length;
var argument=process.argv.splice(2);
var maxname,minname,maxdate,mindate;
if(argument.includes('-n')&&argument.includes('-l')){
	for(var i=0;i<len;i++){
		if(vals[i]==argument[1]){
			console.log(vals[i]+"\t"+vals[i+1]+"\t"+vals[i+2]+"\t"+vals[i+3]);
		}
	}
}
else if(argument.includes('-n')){
	let money=0;
	for(i=0;i<len;i++){
		if(vals[i]==argument[1]){
			money+=parseInt(vals[i+3]);
		}
	}
	console.log(argument[1]+"\t"+money);
}
else if(argument.includes('-l')||argument.includes('-a')){
	var name=new Array;
	var namemon=new Array;
	var max=0;
	var min=999;
	var date=new Array;
	for(i=0;i<len;i++){
		if(i%4==0&&name.includes(vals[i])==false&&vals[i]!=''){
			name.push(vals[i]);
		}
	}
	for(i=0;i<name.length;i++){
		let money=0;
		for(var j=0;j<len;j=j+4){
			if(vals[j]==name[i]){
				money+=parseInt(vals[j+3]);
			}
			date[vals[j+1]]=vals[j+3];
		}
		if(argument.includes('-l')&&argument.includes('-a')==false){
			console.log(name[i]+"\t"+money);
		}
		namemon[name[i]]=money;
	}
	Object.keys(namemon).forEach(key=>{
		if(namemon[key]>max){
			max=namemon[key];
			maxname=key;
		}
		if(namemon[key]<min){
			min=namemon[key];
			minname=key;
		}

	})
	if(argument.includes('-a')&&argument.includes('-l')==false){
		console.log("赚钱最多的学生:"+'\t'+maxname);
		console.log("赚钱最少的学生:"+'\t'+minname);
		max=0;
		min=999;
		Object.keys(date).forEach(key=>{
		if(date[key]>max){
			max=date[key];
			maxdate=key;
		}
		if(date[key]<min){
			min=date[key];
			mindate=key;
		}
	})
		console.log("赚钱最多的日子:"+'\t'+maxdate);
		console.log("赚钱最少的日子:"+'\t'+mindate);
	}

}