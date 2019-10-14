let arguments = process.argv.splice(2);
if(arguments[0]=='-n'){
	if(arguments[2]=='-l'){
		var fs = require("fs");
		var data = '';
		var find=arguments[1];
		fs.readFile('study.txt', function (err, data) {
			if (err) {
				return console.error(err);
			}
			data=data.toString().split(/\s+/);
			for(var i=0;i<data.length/4;i++){
				if(data[i*4]==find)
				{
					console.log(data[i*4],data[i*4+1],data[i*4+2],data[i*4+3]);
				}
			}
		});
	}
	else{
		var fs = require("fs");
		var data = '';
		var find=arguments[1];
		var sum = 0;
		fs.readFile('study.txt', function (err, data) {
			if (err) {
				return console.error(err);
			}
			data=data.toString().split(/\s+/);
			for(var i=0;i<data.length/4;i++){
				if(data[i*4]==find)
				{
					sum+=parseInt(data[i*4+3]);
				}
			}
			console.log(find,sum);
		});
	}
}
else if(arguments[0]=='-l'){
	if(arguments[1]=='-n'){
		var fs = require("fs");
		var data = '';
		var find=arguments[2];
		fs.readFile('study.txt', function (err, data) {
			if (err) {
				return console.error(err);
			}
			data=data.toString().split(/\s+/);
			for(var i=0;i<data.length/4;i++){
				if(data[i*4]==find)
				{
					console.log(data[i*4],data[i*4+1],data[i*4+2],data[i*4+3]);
				}
			}
		});
	}
	else{
		var fs = require("fs");
		var data = '';
		let k=0;
		var name=new Array();
		var sum=new Array();
		fs.readFile('study.txt', function (err, data) {
			if (err) {
				return console.error(err);
			}
			data=data.toString().split(/\s+/);
			for(var i=0;i<data.length/4;i++){
				var flag=0;
				for(var j=0;j<name.length;j++){
					if(name[j]==data[i*4]){
						flag=1;
						sum[j]+=parseInt(data[i*4+3]);
					}
				}
				if(flag==0){
					name[k]=data[i*4];
					sum[k]=parseInt(data[i*4+3]);
					k++;
				}
			}
			for(var i=0;i<k-1;i++)
				console.log(name[i],sum[i]);
		});
	}
}
else if(arguments[0]=='-a'){
	var fs = require("fs");
	var data = '';
	let k=0;
	let x=0;
	var name=new Array();
	var date=new Array();
	var sum_s=new Array();
	var sum_d=new Array();
	fs.readFile('study.txt', function (err, data) {
		if (err) {
			return console.error(err);
		}
		data=data.toString().split(/\s+/);
		for(var i=0;i<data.length/4;i++){
			var flag_s=0;
			var flag_d=0;
			for(var j=0;j<name.length;j++){
				if(name[j]==data[i*4]){
					flag_s=1;
					sum_s[j]+=parseInt(data[i*4+3]);
				}
			}
			for(var j=0;j<date.length;j++){
				if(date[j]==data[i*4+1]){
					flag_d=1;
					sum_d[j]+=parseInt(data[i*4+3]);
				}
			}
			if(flag_s==0){
				name[k]=data[i*4];
				sum_s[k]=parseInt(data[i*4+3]);
				k++;
			}
			if(flag_d==0){
				date[x]=data[i*4+1];
				sum_d[x]=parseInt(data[i*4+3]);
				x++;
			}
		}
		var max_s=sum_s[0];
		var min_s=sum_s[0];
		var max_d=sum_d[0];
		var min_d=sum_d[0];
		var max_si;
		var min_si;
		var max_di;
		var min_di;
		for(var i=0;i<k-1;i++){
			if(max_s<=sum_s[i]){
				max_s=sum_s[i];
				max_si=i;
			}
			if(min_s>=sum_s[i]){
				min_s=sum_s[i];
				min_si=i;
			}
		}
		for(var i=0;i<x-1;i++){
			if(max_d<=sum_d[i]){
				max_d=sum_d[i];
				max_di=i;
			}
			if(min_d>=sum_d[i]){
				min_d=sum_d[i];
				min_di=i;
			}
		}
		console.log("赚钱最多的学生",name[max_si]);
		console.log("赚钱最少的学生",name[min_si]);
		console.log("赚钱最多的日子",date[max_di]);
		console.log("赚钱最少的日子",date[min_di]);
	});
}
