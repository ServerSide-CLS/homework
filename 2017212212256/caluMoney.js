var fs = require('fs');
var data = fs.readFileSync('study.txt').toString();
var val = data.split(/\s+/);
var arguments = process.argv.splice(2);

if(arguments.includes('-n')){
	location = arguments.indexOf('-n');
	name = arguments[location+1]
//-n+-l
	if(arguments.includes('-l')){
		for(var i = 0;i<val.length;i+=4){
			if(val[i]==name){
				console.log(val[i]+"\t"+val[i+1]+"\t"+val[i+2]+"\t"+val[i+3])
			}
		}
	}
//-n
	else{
		var sum = 0;
		for(var i = 0;i<val.length;i+=4){
			if(val[i]==name){
				sum += parseInt(val[i+3]);
			}
		}
		console.log(name+"\t"+sum)
	}

}
//-l
else if(arguments.includes('-l')&&arguments.includes('-n')==false){
	var person=[];
	var sum;
	for(var i = 0;i<val.length;i+=4){
		if(person.includes(val[i])==false){
			sum=0;
			name = val[i];
			person += name;
			for(var j=i;j<val.length;j+=4){
				if(name == val[j]){
					sum += parseInt(val[j+3]);
				}
			}
			console.log(name+"\t"+sum);
		}
	}
}
//-a
else if(arguments.includes('-a')){
	var person=[];
	var sum;
	var max = -1;
	var min;
	var maxname;
	var minname;
	var maxdata = val[1];
	var mindata = val[1];
	var maxmon = parseInt(val[3]);
	var minmon = parseInt(val[3]);

	for(var i = 0;i<val.length;i+=4){
		if(person.includes(val[i])==false){
			sum=0;
			name = val[i];
			person += name;
			for(var j=i;j<val.length;j+=4){
				if(name == val[j]){
					sum += parseInt(val[j+3]);
				}
			}
			if(max == -1){
				max = sum;
				maxname = name;
				min = sum;
				minname = name;
			}
			else{
				if(max<sum){
					max = sum;
					maxname = name;
				}
				if(min>sum){
					min = sum;
					minname = name;
				}
			}
		}
		if(maxmon<parseInt(val[i+3])){
			maxmon = parseInt(val[i+3]);
			maxdata = val[i+1];
		}
		if(minmon>parseInt(val[i+3])){
			minmon = parseInt(val[i+3]);
			mindata = val[i+1];
		}
	}
	console.log('賺錢最多的學生：'+"\t"+maxname);
	console.log('賺錢最少的學生：'+"\t"+minname);
	console.log('賺錢最多的日子：'+"\t"+maxdata);
	console.log('賺錢最少的日子：'+"\t"+mindata);
}
